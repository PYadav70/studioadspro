import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';

// GET: Fetch all leads with optional status, search filter, and summary statistics
export async function GET(req: NextRequest) {
  try {
    const prisma = getPrisma();

    if (!prisma) {
      return NextResponse.json(
        { error: 'Database connection is not configured.' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'all';
    const search = (searchParams.get('search') || '').trim().toLowerCase();
    const sortBy = searchParams.get('sortBy') || 'newest';

    // Fetch all leads to compute stats and apply search
    const allLeads = await prisma.contactLead.findMany({
      orderBy: {
        createdAt: sortBy === 'oldest' ? 'asc' : 'desc',
      },
    });

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Compute aggregated statistics
    const stats = {
      total: allLeads.length,
      newCount: allLeads.filter((l) => (l.status || 'new').toLowerCase() === 'new').length,
      contactedCount: allLeads.filter((l) => (l.status || '').toLowerCase() === 'contacted').length,
      convertedCount: allLeads.filter((l) => (l.status || '').toLowerCase() === 'converted').length,
      archivedCount: allLeads.filter((l) => (l.status || '').toLowerCase() === 'archived').length,
      todayCount: allLeads.filter((l) => new Date(l.createdAt) >= todayStart).length,
    };

    // Filter by status if specified
    let filteredLeads = allLeads;
    if (status && status !== 'all') {
      filteredLeads = filteredLeads.filter(
        (lead) => (lead.status || 'new').toLowerCase() === status.toLowerCase()
      );
    }

    // Filter by search query if provided
    if (search) {
      filteredLeads = filteredLeads.filter((lead) => {
        const nameMatch = lead.fullName?.toLowerCase().includes(search);
        const emailMatch = lead.email?.toLowerCase().includes(search);
        const phoneMatch = lead.phone?.toLowerCase().includes(search);
        const serviceMatch = lead.service?.toLowerCase().includes(search);
        const budgetMatch = lead.budget?.toLowerCase().includes(search);
        const messageMatch = lead.message?.toLowerCase().includes(search);
        return nameMatch || emailMatch || phoneMatch || serviceMatch || budgetMatch || messageMatch;
      });
    }

    return NextResponse.json({
      success: true,
      stats,
      leads: filteredLeads,
    });
  } catch (error: any) {
    console.error('Admin Leads GET error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch leads from database' },
      { status: 500 }
    );
  }
}

// POST: Add a new manual lead from Admin Panel
export async function POST(req: NextRequest) {
  try {
    const prisma = getPrisma();

    if (!prisma) {
      return NextResponse.json(
        { error: 'Database connection is not configured.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { fullName, email, phone, service, budget, message, status = 'new' } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'Full name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const newLead = await prisma.contactLead.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        service: service || null,
        budget: budget || null,
        message,
        status: status || 'new',
      },
    });

    return NextResponse.json({
      success: true,
      lead: newLead,
    });
  } catch (error: any) {
    console.error('Admin Leads POST error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create lead in database' },
      { status: 500 }
    );
  }
}

// PATCH: Update lead status or details
export async function PATCH(req: NextRequest) {
  try {
    const prisma = getPrisma();

    if (!prisma) {
      return NextResponse.json(
        { error: 'Database connection is not configured.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { id, status, fullName, email, phone, service, budget, message } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Lead ID is required for update.' },
        { status: 400 }
      );
    }

    const updateData: Record<string, any> = {};
    if (status !== undefined) updateData.status = status;
    if (fullName !== undefined) updateData.fullName = fullName;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (service !== undefined) updateData.service = service;
    if (budget !== undefined) updateData.budget = budget;
    if (message !== undefined) updateData.message = message;

    const updatedLead = await prisma.contactLead.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      lead: updatedLead,
    });
  } catch (error: any) {
    console.error('Admin Leads PATCH error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to update lead' },
      { status: 500 }
    );
  }
}

// DELETE: Remove lead by ID
export async function DELETE(req: NextRequest) {
  try {
    const prisma = getPrisma();

    if (!prisma) {
      return NextResponse.json(
        { error: 'Database connection is not configured.' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Lead ID is required for deletion.' },
        { status: 400 }
      );
    }

    await prisma.contactLead.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `Lead ${id} successfully deleted.`,
    });
  } catch (error: any) {
    console.error('Admin Leads DELETE error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to delete lead from database' },
      { status: 500 }
    );
  }
}
