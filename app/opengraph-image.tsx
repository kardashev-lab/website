import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const runtime = 'edge';

export const alt = `${SITE_NAME} - Open-source tools for US grid intelligence`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  // Fetched by URL rather than colocated + bundled: a colocated asset gets
  // base64-inlined into the edge function bundle, which blew past Vercel's
  // 1MB function-size limit. Fetching from /public keeps the bundle tiny.
  const bgSrc = new URL('/network-schematic.png', SITE_URL).toString();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#0A0A0A',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgSrc}
          alt=""
          width={1200}
          height={630}
          style={{ position: 'absolute', inset: 0, objectFit: 'cover' }}
        />

        {/* Legibility scrim for text over the schematic */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.55) 55%, rgba(10,10,10,0.92) 100%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '56px',
          }}
        >
          {/* Top: wordmark */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#EEEDE8',
                letterSpacing: '-0.01em',
              }}
            >
              Kardashev
            </span>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#FFB020' }}>
              Labs
            </span>
          </div>

          {/* Bottom: headline + status line */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgba(238,237,232,0.55)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              <div style={{ width: '8px', height: '8px', background: '#FFB020' }} />
              Open source · 5 ISOs · 60s refresh
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                fontSize: '52px',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#EEEDE8',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
              }}
            >
              <span>Grid data the way&nbsp;</span>
              <span style={{ color: '#FFB020' }}>operators</span>
              <span>&nbsp;see it.</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
