import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }

    const leads = await Lead.find(filter).sort({ submittedAt: -1 });
    return NextResponse.json({ data: leads, total: leads.length });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Honeypot check for bots
    if (body.website_bot) {
      return NextResponse.json({ ok: true });
    }

    const newLead = new Lead({
      brand: body.brand,
      website: body.website,
      contactName: body.contactName,
      contactRole: body.contactRole,
      budget: body.budget,
      timeline: body.timeline,
      collabTypes: body.collabTypes,
      niches: body.niches,
      goals: body.goals,
    });

    await newLead.save();
    return NextResponse.json({ ok: true, referenceId: newLead.referenceId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
