import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { clientIp, rateLimit, validateEmail } from '@/lib/rate-limit';

// Lazy: the Resend constructor throws without an API key, which would
// break `next build` in environments where the secret isn't set.
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = rateLimit(`subscribe:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } },
    );
  }

  const body = await req.json().catch(() => null);
  const email = validateEmail(body?.email);

  if (!email) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  // Honeypot: bots that fill hidden fields get a silent success
  if (body?.website) {
    return NextResponse.json({ ok: true });
  }

  const resend = getResend();
  if (!resend) {
    console.error('[subscribe] RESEND_API_KEY not configured');
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }

  try {
    if (process.env.RESEND_AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
        unsubscribed: false,
      });
    }

    if (process.env.RESEND_NOTIFY_TO) {
      const from = process.env.RESEND_FROM_EMAIL
        ? `Kardashev Labs <${process.env.RESEND_FROM_EMAIL}>`
        : 'Kardashev Labs <onboarding@resend.dev>';

      const result = await resend.emails.send({
        from,
        to: process.env.RESEND_NOTIFY_TO,
        subject: 'New lab notes subscriber',
        text: `A new subscriber joined Kardashev Labs lab notes.`,
      });

      if (result.error) {
        console.error('[subscribe] resend error');
        return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    console.error('[subscribe] request failed');
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
