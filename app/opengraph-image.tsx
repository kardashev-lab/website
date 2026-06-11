import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/site';

export const runtime = 'edge';

export const alt = `${SITE_NAME} — Open-source tools for US grid intelligence`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #030712 0%, #0c1829 50%, #030712 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          position: 'relative',
        }}
      >
        {/* Glow orb top-right */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
          }}
        />
        {/* Glow orb bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Top: brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            Kardashev
          </span>
          <span style={{ fontSize: '18px', fontWeight: '600', color: '#60a5fa' }}>
            Labs
          </span>
          <div
            style={{
              marginLeft: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#60a5fa',
              }}
            />
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Open Source · Kardashev Type I
            </span>
          </div>
        </div>

        {/* Center: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: '700',
              color: '#ffffff',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
            }}
          >
            Building tools that{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #34d399 100%)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              accelerate
            </span>
            <br />
            humanity&apos;s energy future
          </div>
          <p
            style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.5,
              maxWidth: '680px',
              margin: '0',
            }}
          >
            {SITE_DESCRIPTION}
          </p>
        </div>

        {/* Bottom: tool pills */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { label: 'Interconnection Queue Tracker', color: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)', dot: '#60a5fa' },
            { label: 'Grid Demand Dashboard', color: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', dot: '#34d399' },
            { label: 'Curtailment Tracker', color: 'rgba(251,113,133,0.12)', border: 'rgba(251,113,133,0.3)', dot: '#fb7185' },
            { label: 'LMP Dashboard', color: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)', dot: '#a78bfa' },
          ].map((tool) => (
            <div
              key={tool.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '999px',
                background: tool.color,
                border: `1px solid ${tool.border}`,
              }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: tool.dot }} />
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontWeight: '500' }}>
                {tool.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
