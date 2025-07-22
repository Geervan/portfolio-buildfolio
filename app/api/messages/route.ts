// Full content for: /app/api/messages/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Import our reusable prisma instance

// GET: Fetch all messages
export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: 'desc', // Show the newest messages first
      },
    });
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json({ error: 'Failed to fetch messages.' }, { status: 500 });
  }
}

// POST: Create a new message
export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();

    // Simple validation
    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required.' }, { status: 400 });
    }
    if (name.length > 50 || message.length > 300) {
        return NextResponse.json({ error: 'Name or message is too long.' }, { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: {
        name: name.trim(),
        message: message.trim(),
      },
    });
    return NextResponse.json(newMessage, { status: 201 }); // 201 means "Created"
  } catch (error) {
    console.error("Failed to create message:", error);
    return NextResponse.json({ error: 'Failed to create message.' }, { status: 500 });
  }
}

// DELETE: Admin function to delete a message
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const providedKey = request.headers.get('Authorization');

    // Security Check: Ensure the admin key is correct
    if (providedKey !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required.' }, { status: 400 });
    }

    await prisma.message.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: 'Message deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete message:", error);
    return NextResponse.json({ error: 'Failed to delete message.' }, { status: 500 });
  }
}