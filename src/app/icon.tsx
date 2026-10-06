import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffd43b', color: '#0f1522', fontSize: 26, fontWeight: 800, letterSpacing: -1, borderRadius: 12 }}>WST</div>, size);
}
