import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Kardashev Labs - Accelerating humanity toward Kardashev Type I';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '60px',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#ffffff',
              margin: '0 0 24px 0',
              lineHeight: 1.1,
            }}
          >
            Kardashev Labs
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#94a3b8',
              margin: '0 0 40px 0',
              maxWidth: '800px',
              lineHeight: 1.3,
            }}
          >
            Accelerating humanity toward Kardashev Type I
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '20px',
              color: '#64748b',
            }}
          >
            <span>Open source at the core</span>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
              }}
            />
            <span>Coming Soon</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
