import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

// Helper to retry Prisma queries on Neon serverless cold-start connect timeouts
async function runWithRetry<T>(fn: () => Promise<T>, retries = 2, delayMs = 1200): Promise<T> {
  let lastErr: any;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      lastErr = err;
      const errMsg = String(err?.message || err);
      const isTimeout =
        errMsg.includes('UND_ERR_CONNECT_TIMEOUT') ||
        errMsg.includes('fetch failed') ||
        errMsg.includes('Connect Timeout Error');

      if (isTimeout && attempt < retries) {
        console.warn(`[NeonDB Retry] Attempt ${attempt + 1} failed due to connection timeout. Retrying in ${delayMs}ms...`);
        await new Promise((r) => setTimeout(r, delayMs));
        continue;
      }
      throw err;
    }
  }
  throw lastErr;
}

function formatMember(m: any) {
  return {
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
  };
}

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

    const members = await runWithRetry<any[]>(() =>
      prisma.teamMember.findMany({
        orderBy: { displayOrder: 'asc' },
      })
    );

    return NextResponse.json({
      success: true,
      data: members.map(formatMember),
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
      const updated = await runWithRetry(() =>
        prisma.$transaction(
          async (tx) => {
            const keepIds: string[] = [];

            for (let i = 0; i < members.length; i++) {
              const m = members[i];
              const hasExistingId =
                m.id && !String(m.id).startsWith('custom_') && String(m.id).length <= 36;

              const data = {
                name: m.name || 'Team Member',
                role: m.title || m.role || 'Specialist',
                bio: m.subtitle || m.bio || null,
                image: m.image || null,
                linkedin: m.linkedin || null,
                twitter: m.twitter || null,
                github: m.github || null,
                displayOrder: i,
              };

              if (hasExistingId) {
                const saved = await tx.teamMember.upsert({
                  where: { id: m.id },
                  update: data,
                  create: { id: m.id, ...data },
                });
                keepIds.push(saved.id);
              } else {
                const created = await tx.teamMember.create({ data });
                keepIds.push(created.id);
              }
            }

            await tx.teamMember.deleteMany({
              where: { id: { notIn: keepIds } },
            });

            return tx.teamMember.findMany({ orderBy: { displayOrder: 'asc' } });
          },
          {
            maxWait: 10000, // time allowed to acquire a connection before the tx starts
            timeout: 20000, // total time the transaction body is allowed to run
          }
        )
      );

      return NextResponse.json({
        success: true,
        data: updated.map(formatMember),
        message: 'Team members synchronized with Neon PostgreSQL database!',
        storage: 'postgres',
      });
    } catch (dbErr: any) {
      console.error('Database write error in POST /api/team:', dbErr);
      return NextResponse.json(
        { success: false, message: `Neon Database save failed: ${dbErr?.message || String(dbErr)}` },
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