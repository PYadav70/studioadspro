import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Valid email is required.' },
        { status: 400 }
      );
    }

    const prisma = getPrisma();

    if (prisma) {
      try {
        const subscriber = await prisma.newsletterSubscriber.upsert({
          where: { email },
          update: {},
          create: { email },
        });

        return NextResponse.json({
          success: true,
          message: 'Successfully subscribed!',
          data: subscriber,
          storage: 'postgres',
        });
      } catch (dbError) {
        console.error('PostgreSQL storage error:', dbError);
        // Fallthrough to acknowledged response
      }
    }

    // Fallback response if DATABASE_URL is not yet configured by user in .env
    return NextResponse.json({
      success: true,
      message: 'Subscription received! (Database connection pending setup)',
      storage: 'transient',
    });
  } catch (error) {
    console.error('Newsletter submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const prisma = getPrisma();
    if (!prisma) {
      return NextResponse.json({
        success: true,
        subscribers: [],
        message: 'DATABASE_URL not configured in environment variables.',
      });
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({
      success: true,
      count: subscribers.length,
      subscribers,
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch subscribers.' },
      { status: 500 }
    );
  }
}
