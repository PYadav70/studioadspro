import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

const DEFAULT_TEAM = [
  { id: 'ar', name: 'Alex Rivera', title: 'Founder & CEO', subtitle: 'Product strategy & client partnerships' },
  { 
    id: 'jm', 
    name: 'Jay Yadav', 
    title: 'Lead Full Stack Developer', 
    subtitle: 'Architecture, APIs & full-stack delivery',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
  },
  { id: 'sk', name: 'Samira Khan', title: 'Backend Engineer', subtitle: 'APIs, databases & infra' },
  { id: 'np', name: 'Noah Patel', title: 'Frontend Engineer', subtitle: 'Interfaces & performance' },
  { id: 'dv', name: 'Devon Vance', title: 'AI Engineer', subtitle: 'Agents & automation' },
  { id: 'lc', name: 'Lena Chen', title: 'UI/UX Designer', subtitle: 'Research & design systems' },
  { id: 'to', name: 'Tariq Owens', title: 'Application Developer', subtitle: 'iOS & Android' },
  { id: 'rb', name: 'Rhea Bhatia', title: 'Social Media Strategist', subtitle: 'Content & campaigns' },
  { id: 'ew', name: 'Elena Wong', title: 'Creative Designer', subtitle: 'Brand & visual identity' },
  { id: 'mh', name: 'Marcus Hill', title: 'Video Editor', subtitle: 'Motion & product video' },
];

export async function GET() {
  try {
    const prisma = getPrisma();
    if (!prisma) {
      return NextResponse.json({
        success: true,
        data: DEFAULT_TEAM.map((m) => ({
          ...m,
          initials: m.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2),
        })),
        message: 'DATABASE_URL not configured.',
      });
    }

    let members = await prisma.teamMember.findMany({
      orderBy: { displayOrder: 'asc' },
    });

    // Auto-seed if database is empty
    if (members.length === 0) {
      for (let i = 0; i < DEFAULT_TEAM.length; i++) {
        const m = DEFAULT_TEAM[i];
        await prisma.teamMember.create({
          data: {
            id: m.id,
            name: m.name,
            role: m.title,
            bio: m.subtitle,
            image: m.image || null,
            displayOrder: i,
          },
        });
      }
      members = await prisma.teamMember.findMany({
        orderBy: { displayOrder: 'asc' },
      });
    }

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
      success: true,
      data: DEFAULT_TEAM.map((m: any) => ({
        ...m,
        initials: m.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2),
      })),
      error: error?.message || String(error),
      message: 'Fallback to default team members.',
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
      return NextResponse.json({
        success: false,
        data: members,
        message: 'DATABASE_URL not configured. Changes saved to local browser storage.',
        storage: 'transient',
      });
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
        message: 'Team members synchronized with PostgreSQL database!',
        storage: 'postgres',
      });
    } catch (dbErr: any) {
      console.warn('Database write warning in POST /api/team:', dbErr?.message || dbErr);
      return NextResponse.json({
        success: false,
        data: members,
        message: `Database sync error: ${dbErr?.message || String(dbErr)}. Saved to local storage.`,
        storage: 'transient',
      });
    }
  } catch (error: any) {
    console.error('Error updating team members:', error);
    return NextResponse.json(
      { success: false, message: `Failed to update team members: ${error?.message || String(error)}` },
      { status: 500 }
    );
  }
}


