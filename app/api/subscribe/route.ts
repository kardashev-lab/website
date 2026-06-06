import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email: string | undefined = body?.email?.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  console.log('[subscribe] RESEND_API_KEY set:', !!process.env.RESEND_API_KEY);
  console.log('[subscribe] RESEND_NOTIFY_TO:', process.env.RESEND_NOTIFY_TO);

  try {
    // Add to audience if configured
    if (process.env.RESEND_AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
        unsubscribed: false,
      });
    }

    // Notify owner
    if (process.env.RESEND_NOTIFY_TO) {
      const from = process.env.RESEND_FROM_EMAIL
        ? `Kardashev Labs <${process.env.RESEND_FROM_EMAIL}>`
        : 'Kardashev Labs <onboarding@resend.dev>';

      const result = await resend.emails.send({
        from,
        to: process.env.RESEND_NOTIFY_TO,
        subject: `New lab notes subscriber: ${email}`,
        text: `${email} just subscribed to Kardashev Labs lab notes.`,
      });

      console.log('[subscribe] resend result:', JSON.stringify(result));

      if (result.error) {
        console.error('[subscribe] resend error:', result.error);
        return NextResponse.json({ error: result.error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[subscribe] caught:', err);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
