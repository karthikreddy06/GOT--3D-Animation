'use client';

import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('./components/Hero'), { ssr: false });

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#03141f', overflow: 'hidden' }}>
      <Hero />
    </main>
  );
}
