import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req: NextRequest) {
  try {
    let fileStr: string | null = null;
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const mime = file.type || 'image/jpeg';
        fileStr = `data:${mime};base64,${buffer.toString('base64')}`;
      }
    } else {
      const body = await req.json();
      fileStr = body.file || body.image || null;
    }

    if (!fileStr) {
      return NextResponse.json(
        { success: false, message: 'No file or base64 image data provided for upload.' },
        { status: 400 }
      );
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || process.env.CLOUDINARY_UPLOAD_PRESET;

    // 1. Server-side authenticated Cloudinary API (highest security & quality)
    if (cloudName && apiKey && apiSecret) {
      // Validate credentials are not obvious placeholders
      if (
        cloudName.includes('your_') ||
        apiKey.includes('your_') ||
        apiSecret.includes('your_')
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              'Cloudinary environment variables contain placeholder values. Please set valid credentials.',
          },
          { status: 400 }
        );
      }

      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
      });

      try {
        const uploadResult = await cloudinary.uploader.upload(fileStr, {
          folder: 'studioadspro_team',
          resource_type: 'image',
          quality: 'auto:best',
        });

        if (!uploadResult.secure_url) {
          throw new Error('Cloudinary response did not contain a valid secure_url');
        }

        return NextResponse.json({
          success: true,
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
          provider: 'cloudinary',
        });
      } catch (cloudinaryErr: any) {
        console.error('Cloudinary SDK upload exception:', cloudinaryErr);
        const rawMsg = cloudinaryErr?.message || String(cloudinaryErr);
        const is403 = rawMsg.includes('403') || cloudinaryErr?.http_code === 403;

        return NextResponse.json(
          {
            success: false,
            message: is403
              ? 'Cloudinary 403 Forbidden: Invalid credentials or account restrictions. Please verify CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
              : `Cloudinary upload failed: ${rawMsg}`,
            isCloudinaryError: true,
            httpCode: is403 ? 403 : 500,
          },
          { status: is403 ? 403 : 500 }
        );
      }
    }

    // 2. Unsigned upload preset via Cloudinary REST API
    if (cloudName && uploadPreset) {
      const formData = new FormData();
      formData.append('file', fileStr);
      formData.append('upload_preset', uploadPreset);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.secure_url) {
        return NextResponse.json({
          success: true,
          url: data.secure_url,
          public_id: data.public_id,
          provider: 'cloudinary_preset',
        });
      } else {
        throw new Error(data.error?.message || 'Cloudinary unsigned upload failed');
      }
    }

    // 3. Strict requirement: Do not save locally if Cloudinary is missing
    return NextResponse.json(
      {
        success: false,
        message:
          'Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in environment variables.',
      },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Failed to process image upload to Cloudinary.',
      },
      { status: 500 }
    );
  }
}

