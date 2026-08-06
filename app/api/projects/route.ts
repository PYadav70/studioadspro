import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

export async function GET() {
  try {
    const prisma = getPrisma();
    if (!prisma) {
      return NextResponse.json({
        success: true,
        data: [],
        message: 'DATABASE_URL not configured.',
      });
    }

    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({
      success: true,
      data: [],
      message: 'Database connection or tables pending setup.',
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, category, description, client, image, liveUrl, tags, featured } = body;

    if (!title || !category || !description) {
      return NextResponse.json(
        { success: false, message: 'Title, category, and description are required.' },
        { status: 400 }
      );
    }

    const prisma = getPrisma();
    if (!prisma) {
      return NextResponse.json({
        success: true,
        message: 'DATABASE_URL pending configuration in environment variables.',
      });
    }

    try {
      const project = await prisma.project.create({
        data: {
          title,
          category,
          description,
          client: client || null,
          image: image || null,
          liveUrl: liveUrl || null,
          tags: Array.isArray(tags) ? tags : [],
          featured: Boolean(featured),
        },
      });

      return NextResponse.json({
        success: true,
        data: project,
        message: 'Project created successfully in PostgreSQL DB.',
      });
    } catch (dbErr) {
      console.error('Database create project error:', dbErr);
      return NextResponse.json({
        success: true,
        message: 'Project received (Database connection or tables pending setup).',
      });
    }
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create project.' },
      { status: 500 }
    );
  }
}
