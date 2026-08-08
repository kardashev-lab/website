import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { clientIp, rateLimit, validateEmail } from '@/lib/rate-limit';

const LAB_NOTES_SEGMENT = 'Lab Notes';

// Lazy: the Resend constructor throws without an API key, which would
// break `next build` in environments where the secret isn't set.
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

// Warm-instance cache so we don't list/create the segment on every request.
let cachedSegmentId: string | null = null;

function isAlreadyExistsError(message: string | undefined): boolean {
  const m = (message ?? '').toLowerCase();
  return m.includes('already') || m.includes('exists') || m.includes('duplicate');
}

async function resolveSegmentId(resend: Resend): Promise<string> {
  const fromEnv =
    process.env.RESEND_SEGMENT_ID?.trim() ||
    process.env.RESEND_AUDIENCE_ID?.trim();
  if (fromEnv) return fromEnv;
  if (cachedSegmentId) return cachedSegmentId;

  const listed = await resend.segments.list();
  if (listed.error) {
    throw new Error(listed.error.message || 'Failed to list Resend segments');
  }

  const existing = listed.data?.data?.find((s) => s.name === LAB_NOTES_SEGMENT);
  if (existing?.id) {
    cachedSegmentId = existing.id;
    return existing.id;
  }

  const created = await resend.segments.create({ name: LAB_NOTES_SEGMENT });
  if (created.error || !created.data?.id) {
    throw new Error(created.error?.message || 'Failed to create Lab Notes segment');
  }

  cachedSegmentId = created.data.id;
  return created.data.id;
}

async function upsertLabNotesContact(
  resend: Resend,
  email: string,
  segmentId: string,
): Promise<void> {
  const created = await resend.contacts.create({
    email,
    unsubscribed: false,
    segments: [{ id: segmentId }],
  });

  if (!created.error) return;

  if (!isAlreadyExistsError(created.error.message)) {
    throw new Error(created.error.message || 'Failed to create contact');
  }

  // Contact already exists globally — ensure it is on the Lab Notes segment.
  const added = await resend.contacts.segments.add({
    email,
    segmentId,
  });

  if (added.error && !isAlreadyExistsError(added.error.message)) {
    throw new Error(added.error.message || 'Failed to add contact to segment');
  }
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
    const segmentId = await resolveSegmentId(resend);
    await upsertLabNotesContact(resend, email, segmentId);

    if (process.env.RESEND_NOTIFY_TO) {
      const from = process.env.RESEND_FROM_EMAIL
        ? `Kardashev Labs <${process.env.RESEND_FROM_EMAIL}>`
        : 'Kardashev Labs <onboarding@resend.dev>';

      const result = await resend.emails.send({
        from,
        to: process.env.RESEND_NOTIFY_TO,
        subject: 'New lab notes subscriber',
        text: `New lab notes subscriber: ${email}`,
      });

      if (result.error) {
        console.error('[subscribe] resend notify error', result.error);
        // Contact was stored; don't fail the signup on notify delivery.
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[subscribe] request failed', err);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
