import { ImageResponse } from 'next/og';

export const alt = 'Krish Home Appliances — Genuine Spare Parts & Multi-Brand Repair in Nalasopara East';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0d2847 0%, #1a5fb4 50%, #0d3d7a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(227, 107, 18, 0.15)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            left: '40%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        />

        {/* Top row — branding */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-1px',
            }}
          >
            Krish Home Appliances
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#e36b12',
              textTransform: 'uppercase' as const,
              letterSpacing: '4px',
            }}
          >
            Genuine Spare Parts & Multi-Brand Service
          </div>
        </div>

        {/* Middle — headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.15,
              letterSpacing: '-2px',
              maxWidth: '800px',
            }}
          >
            Walk-In Store for AC, Fridge & Washing Machine Parts
          </div>
          <div
            style={{
              fontSize: 22,
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '700px',
              lineHeight: 1.4,
            }}
          >
            Compressors • Capacitors • Copper Pipes • Refrigerant Gases • Motors • PCB Boards • Wiring
          </div>
        </div>

        {/* Bottom row — location + CTA */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
              Kanti Avenue, Nalasopara East, Maharashtra 401208
            </div>
            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
              Open 7 Days • 10 AM – 10 PM
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: '#e36b12',
              color: 'white',
              padding: '14px 32px',
              borderRadius: '14px',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            📞 +91 9867392552
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
