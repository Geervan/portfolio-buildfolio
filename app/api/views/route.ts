// Full code for: /app/api/views/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// This function finds or creates our single counter row
async function getCounter() {
  const counter = await prisma.counter.upsert({
    where: { id: 'views' },
    update: {}, // No update needed if it exists
    create: { id: 'views', count: 0 }, // Create it if it doesn't exist
  });
  return counter;
}

// GET: Fetch the current view count
export async function GET() {
  try {
    const counter = await getCounter();
    return NextResponse.json({ count: counter.count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch view count.' }, { status: 500 });
  }
}

// POST: Increment the view count
export async function POST() {
  try {
    const updatedCounter = await prisma.counter.update({
      where: { id: 'views' },
      data: {
        count: {
          increment: 1, // Atomically increment the count by 1
        },
      },
    });
    return NextResponse.json({ count: updatedCounter.count }, { status: 200 });
  } catch (error) {
    // If the counter doesn't exist yet, create it.
    // This is a fallback in case the first visitor triggers a POST before a GET.
    await getCounter();
    return NextResponse.json({ error: 'Failed to increment view count, counter created.' }, { status: 500 });
  }
}