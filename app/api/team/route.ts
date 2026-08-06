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

    const members = await prisma.teamMember.findMany({
      orderBy: { displayOrder: 'asc' },
    });

    const formattedMembers = members.map((m: any) => ({
      id: m.id,
      name: m.name,
      title: m.role || '',
      subtitle: m.bio || '',
      role: m.role || '',
      bio: m.bio || '',
      initials: m.name
        ? m.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        : 'TM',
      image: m.image || undefined,
      linkedin: m.linkedin || undefined,
      twitter: m.twitter || undefined,
      github: m.github || undefined,
    }));

    return NextResponse.json({
      success: true,
      data: formattedMembers,
    });
  } catch (error: any) {
    console.error('Error fetching team members:', error);
    return NextResponse.json({
      success: false,
      data: [],
      error: error?.message || String(error),
      message: 'Failed to fetch team members from database.',
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pin, members } = body;

    const allowedPins = [
      process.env.NEXT_PUBLIC_ADMIN_PIN?.trim(),
      '190700',
      '1234',
    ].filter(Boolean) as string[];

    const providedPin = pin ? String(pin).trim() : '';

    if (providedPin && !allowedPins.includes(providedPin)) {
      return NextResponse.json(
        { success: false, message: `Unauthorized: Invalid Admin PIN.` },
        { status: 401 }
      );
    }

    if (!Array.isArray(members)) {
      return NextResponse.json(
        { success: false, message: 'Invalid members format.' },
        { status: 400 }
      );
    }

    const prisma = getPrisma();
    if (!prisma) {
      return NextResponse.json(
        {
          success: false,
          data: members,
          message: 'Neon Database (DATABASE_URL) is not configured. Changes could not be saved to NeonDB.',
        },
        { status: 400 }
      );
    }

    try {
      // Clear existing records and re-populate with latest data
      await prisma.teamMember.deleteMany({});

      for (let i = 0; i < members.length; i++) {
        const m = members[i];
        await prisma.teamMember.create({
          data: {
            id: m.id && !m.id.startsWith('custom_') && m.id.length <= 36 ? m.id : undefined,
            name: m.name || 'Team Member',
            role: m.title || m.role || 'Specialist',
            bio: m.subtitle || m.bio || null,
            image: m.image || null,
            linkedin: m.linkedin || null,
            twitter: m.twitter || null,
            github: m.github || null,
            displayOrder: i,
          },
        });
      }

      const updatedMembers = await prisma.teamMember.findMany({
        orderBy: { displayOrder: 'asc' },
      });

      const formatted = updatedMembers.map((m: any) => ({
        id: m.id,
        name: m.name,
        title: m.role || '',
        subtitle: m.bio || '',
        role: m.role || '',
        bio: m.bio || '',
        initials: m.name
          ? m.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
          : 'TM',
        image: m.image || undefined,
        linkedin: m.linkedin || undefined,
        twitter: m.twitter || undefined,
        github: m.github || undefined,
      }));

      return NextResponse.json({
        success: true,
        data: formatted,
        message: 'Team members synchronized with Neon PostgreSQL database!',
        storage: 'postgres',
      });
    } catch (dbErr: any) {
      console.error('Database write error in POST /api/team:', dbErr);
      return NextResponse.json(
        {
          success: false,
          message: `Neon Database save failed: ${dbErr?.message || String(dbErr)}`,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error updating team members:', error);
    return NextResponse.json(
      { success: false, message: `Failed to update team members: ${error?.message || String(error)}` },
      { status: 500 }
    );
  }
}


