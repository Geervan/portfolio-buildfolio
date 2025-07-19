// The complete code for: /app/api/send-email/route.ts

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Instantiate Resend with the API key from your .env.local file
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Extract the data from the request body sent by the ContactModal
    const { name, from, message } = await request.json();

    // Basic validation: check if all required fields are present
    if (!name || !from || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Use the Resend SDK to send the email
    const { data, error } = await resend.emails.send({
      // IMPORTANT: `from` must be a verified domain or the Resend sandbox email.
      // For development, 'onboarding@resend.dev' is perfect.
      from: 'Portfolio Contact <onboarding@resend.dev>',
      
      // This is YOUR email address where you'll receive the messages.
      to: ['geervan99@gmail.com'], 
      
      // The subject line of the email you will receive.
      subject: `New Message from ${name} via Portfolio`,
      
      // Use the sender's email in the "reply_to" field for convenience
      replyTo: from,
      
      // The body of the email, formatted with HTML for readability.
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>New Contact Form Submission</h2>
          <p>You have received a new message from your portfolio's contact form.</p>
          <hr>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${from}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    });

    // If Resend returns an error, send a server error response
    if (error) {
      console.error({ error });
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    // If successful, send a success response
    return NextResponse.json({ message: 'Email sent successfully!', data }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}