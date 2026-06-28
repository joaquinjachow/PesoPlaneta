import { ImageResponse } from 'next/og'

export const SHARE_PREVIEW_ALT = 'Peso Planetario — Calculadora de peso en otros planetas'
export const SHARE_PREVIEW_SIZE = { width: 1200, height: 630 }
export const SHARE_PREVIEW_CONTENT_TYPE = 'image/png'

export function createSharePreviewImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #030712 0%, #1e1b4b 50%, #4c1d95 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {Array.from({ length: 40 }).map((_, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: `${(index % 5) + 1}px`,
              height: `${(index % 5) + 1}px`,
              borderRadius: '50%',
              background: 'rgba(196, 181, 253, 0.8)',
              left: `${(index * 17) % 100}%`,
              top: `${(index * 23) % 100}%`,
            }}
          />
        ))}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '24px',
          }}
        >
          <div style={{ fontSize: 72 }}>🚀</div>
          <div style={{ fontSize: 72 }}>🪐</div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            background: 'linear-gradient(90deg, #c4b5fd, #a78bfa, #ec4899)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '16px',
          }}
        >
          Peso Planetario
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#c4b5fd',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Descubre cuánto pesarías en Mercurio, Marte, Júpiter y más
        </div>
      </div>
    ),
    { ...SHARE_PREVIEW_SIZE },
  )
}