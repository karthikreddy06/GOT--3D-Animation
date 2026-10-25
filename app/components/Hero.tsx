'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

export interface CollectionItem {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  studio: string;
  title: string[];
  subtitle: string;
  quote: string;
  folder: string;
  frameCount: number;
  primaryColor: string;
  secondaryColor: string;
  accentGlow: string;
  badgeBg: string;
  bgDark: string;
  vignette: string;
  cta: string;
  chapters: { n: string; title: string; text: string }[];
  lore: { title: string; detail: string }[];
}

const COLLECTIONS: CollectionItem[] = [
  {
    id: 'moana',
    name: 'Moana',
    icon: '🌊',
    tagline: 'Walt Disney Animation Studios',
    studio: 'Disney Motunui Voyager',
    title: ['MOANA'],
    subtitle: 'The Ocean Chose Her',
    quote: 'On the sun-drenched shores of Motunui, the living ocean parts its waves for young Moana and entrusts her with the ancient Heart of Te Fiti.',
    folder: 'moana',
    frameCount: 181,
    primaryColor: '#00e1d9',
    secondaryColor: '#f59e0b',
    accentGlow: 'rgba(0, 225, 217, 0.55)',
    badgeBg: 'rgba(0, 225, 217, 0.12)',
    bgDark: '#03141f',
    vignette: 'linear-gradient(to right, rgba(3,20,31,0.85) 0%, rgba(3,20,31,0.42) 28%, transparent 54%), linear-gradient(180deg, rgba(3,20,31,0.65) 0%, transparent 16%, transparent 76%, rgba(3,20,31,0.92) 100%)',
    cta: 'Voyage Beyond Reef ··',
    chapters: [
      { n: '01', title: 'The Call of the Sea', text: 'The crystal ocean parts to welcome young Moana, placing the glowing jade Heart of Te Fiti into her hands.' },
      { n: '02', title: 'Master Wayfinder', text: 'Crossing the vast barrier reef with demigod Maui, navigating ancient star paths across the Pacific.' },
    ],
    lore: [
      { title: 'The Heart of Te Fiti', detail: 'An ancient pounamu gemstone carrying the gift of life and prosperity for all Pacific islands.' },
      { title: 'Maui the Demigod', detail: 'Legendary hero of Polynesian lore with a magical fishhook, master shapeshifter and voyager.' },
      { title: 'The Living Ocean', detail: 'A conscious, playful force of nature that guides and protects Moana on her voyage.' },
    ],
  },
  {
    id: 'got',
    name: 'Game of Thrones',
    icon: '🐺',
    tagline: 'HBO Original Series',
    studio: 'Home Box Office',
    title: ['GAME', 'OF', 'THRONES'],
    subtitle: 'Winter is Coming',
    quote: 'Nine noble families clash for dominion over the Seven Kingdoms of Westeros. Blood will be spilled. Kingdoms will crumble.',
    folder: 'got%20hero',
    frameCount: 211,
    primaryColor: '#d4a34b',
    secondaryColor: '#ef4444',
    accentGlow: 'rgba(212, 163, 75, 0.5)',
    badgeBg: 'rgba(212, 163, 75, 0.12)',
    bgDark: '#06050a',
    vignette: 'linear-gradient(to right, rgba(6,5,10,0.85) 0%, rgba(6,5,10,0.45) 24%, transparent 48%), linear-gradient(180deg, rgba(6,5,10,0.65) 0%, transparent 16%, transparent 76%, rgba(6,5,10,0.92) 100%)',
    cta: 'Enter Westeros ··',
    chapters: [
      { n: '01', title: 'Winter is Coming', text: 'The ancient Wall guards the realms of men as whispers of the Night King grow louder.' },
      { n: '02', title: 'The Iron Throne', text: 'Eight seasons. 73 episodes. The legendary saga of conquest, honor, and betrayal.' },
    ],
    lore: [
      { title: 'House Stark', detail: 'Rulers of the freezing North, staunch defenders of the realm under the direwolf standard.' },
      { title: 'House Targaryen', detail: 'Ancient dragonlords of Old Valyria who forged the Iron Throne in dragonfire.' },
      { title: 'House Lannister', detail: 'The gilded lions of Casterly Rock whose immense wealth fuels their quest for total power.' },
    ],
  },
  {
    id: 'godzilla',
    name: 'Godzilla',
    icon: '🌋',
    tagline: 'Legendary MonsterVerse',
    studio: 'Toho · Legendary Pictures',
    title: ['GODZILLA'],
    subtitle: 'King of the Monsters',
    quote: 'The ancient primordial alpha predator rises from subterranean oceans to unleash bio-atomic fury and restore equilibrium to planet Earth.',
    folder: 'godzilla',
    frameCount: 240,
    primaryColor: '#00f0ff',
    secondaryColor: '#a855f7',
    accentGlow: 'rgba(0, 240, 255, 0.55)',
    badgeBg: 'rgba(0, 240, 255, 0.12)',
    bgDark: '#040810',
    vignette: 'linear-gradient(to right, rgba(4,8,16,0.85) 0%, rgba(4,8,16,0.42) 24%, transparent 48%), linear-gradient(180deg, rgba(4,8,16,0.65) 0%, transparent 16%, transparent 76%, rgba(4,8,16,0.92) 100%)',
    cta: 'Unleash Titan ··',
    chapters: [
      { n: '01', title: 'Sub-Surface Alpha', text: 'Dormant for eons beneath the Pacific trenches, the ultimate apex guardian awakens.' },
      { n: '02', title: 'Atomic Breath', text: 'Concentrated thermonuclear energy lights up stormy skies, vanquishing extraterrestrial titans.' },
    ],
    lore: [
      { title: 'Titanus Gojira', detail: 'Stands over 393 feet tall, harnessing nuclear radiation as clean metabolic energy.' },
      { title: 'Hollow Earth', detail: 'A vast subterranean continent where gigantic prehistoric beasts still reign supreme.' },
      { title: 'Monarch', detail: 'A secretive global scientific organization that monitors giant titan activity.' },
    ],
  },
  {
    id: 'dinosaur',
    name: 'Dinosaur',
    icon: '🦖',
    tagline: 'Prehistoric Earth',
    studio: 'Cretaceous Wilderness',
    title: ['DINOSAUR'],
    subtitle: 'The Primordial Era',
    quote: 'Embark on an epic voyage 65 million years into the primeval past, where mighty apex predators roam untamed volcanic wilderness.',
    folder: 'dinosur',
    frameCount: 240,
    primaryColor: '#4ade80',
    secondaryColor: '#fbbf24',
    accentGlow: 'rgba(74, 222, 128, 0.5)',
    badgeBg: 'rgba(74, 222, 128, 0.12)',
    bgDark: '#07120a',
    vignette: 'linear-gradient(to right, rgba(7,18,10,0.85) 0%, rgba(7,18,10,0.42) 24%, transparent 48%), linear-gradient(180deg, rgba(7,18,10,0.65) 0%, transparent 16%, transparent 76%, rgba(7,18,10,0.92) 100%)',
    cta: 'Explore Epoch ··',
    chapters: [
      { n: '01', title: 'Cretaceous Forest', text: 'Lush prehistoric ferns and towering conifers shelter colossal herbivore migrations.' },
      { n: '02', title: 'The Apex Hunt', text: 'Tyrannosaur packs dominate primeval riverbeds in the unforgiving struggle for survival.' },
    ],
    lore: [
      { title: 'Tyrannosaurus Rex', detail: 'The most ferocious terrestrial predator ever discovered, with an unmatched crushing bite.' },
      { title: 'The Great Migration', detail: 'Thousands of prehistoric beasts trekking across arid badlands toward the nesting haven.' },
      { title: 'Primordial Ecology', detail: 'A high-oxygen biosphere supporting massive biological growth and titan scales.' },
    ],
  },
];

export default function Hero() {
  const [activeId, setActiveId] = useState<string>('moana');
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [showLore, setShowLore] = useState<boolean>(false);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState<number>(90);

  const active = COLLECTIONS.find(c => c.id === activeId) || COLLECTIONS[0];

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Cache images per collection so switching is instant
  const cacheRef = useRef<Record<string, (HTMLImageElement | null)[]>>({});
  const targetFrameRef = useRef<number>(Math.floor(active.frameCount / 2));
  const currentFrameRef = useRef<number>(Math.floor(active.frameCount / 2));
  const rafId = useRef<number | null>(null);
  const lastMouseMoveRef = useRef<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioGainRef = useRef<GainNode | null>(null);

  // Maintain backing canvas buffer matched to high-DPI display
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 3);
    const targetW = Math.round((rect.width || window.innerWidth) * dpr);
    const targetH = Math.round((rect.height || window.innerHeight) * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }
  }, []);

  // Draw frame on canvas with high-quality smoothing and integer pixel alignment
  const drawFrame = useCallback((frameIndex: number, currentCollection = active) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frames = cacheRef.current[currentCollection.id];
    if (!frames) return;

    const clamped = Math.max(0, Math.min(currentCollection.frameCount - 1, Math.round(frameIndex)));
    const img = frames[clamped];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    if (cw === 0 || ch === 0 || iw === 0 || ih === 0) return;

    // Enforce high-quality resampling on every frame draw
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Cover math preserving aspect ratio
    const scale = Math.max(cw / iw, ch / ih);
    const drawW = Math.round(iw * scale);
    const drawH = Math.round(ih * scale);
    const drawX = Math.round((cw - drawW) / 2);
    const drawY = Math.round((ch - drawH) / 2);

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, [active]);

  // Handle Resize and DPR changes (e.g. multi-monitor setups or browser zoom)
  useEffect(() => {
    const handleResize = () => {
      updateCanvasDimensions();
      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let dprMediaQuery: MediaQueryList | null = null;
    const setupDprListener = () => {
      if (typeof window === 'undefined') return;
      if (dprMediaQuery) {
        dprMediaQuery.removeEventListener('change', handleResize);
      }
      dprMediaQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dpr)`);
      dprMediaQuery.addEventListener('change', () => {
        handleResize();
        setupDprListener();
      });
    };
    setupDprListener();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (dprMediaQuery) {
        dprMediaQuery.removeEventListener('change', handleResize);
      }
    };
  }, [updateCanvasDimensions, drawFrame]);

  // Preload collection frames with error handling
  useEffect(() => {
    const col = active;
    const count = col.frameCount;
    targetFrameRef.current = Math.floor(count / 2);
    currentFrameRef.current = Math.floor(count / 2);

    if (!cacheRef.current[col.id]) {
      cacheRef.current[col.id] = new Array(count).fill(null);
    }
    const frames = cacheRef.current[col.id];

    // Prioritize center frame first for instant view
    const centerIdx = Math.floor(count / 2);
    if (!frames[centerIdx]) {
      const centerImg = new Image();
      centerImg.src = `/${col.folder}/ezgif-frame-${String(centerIdx + 1).padStart(3, '0')}.jpg`;
      centerImg.onload = () => {
        frames[centerIdx] = centerImg;
        drawFrame(centerIdx, col);
        setLoadedCount(prev => prev + 1);
        setCurrentFrameDisplay(centerIdx + 1);
      };
      centerImg.onerror = () => {
        console.warn(`Failed to load initial frame for ${col.name}`);
      };
    } else {
      drawFrame(centerIdx, col);
    }

    // Load remaining frames
    for (let i = 0; i < count; i++) {
      if (i === centerIdx && frames[centerIdx]) continue;
      if (!frames[i]) {
        const img = new Image();
        img.src = `/${col.folder}/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;
        img.onload = () => {
          frames[i] = img;
          setLoadedCount(prev => Math.min(count, prev + 1));
          if (Math.round(currentFrameRef.current) === i) {
            drawFrame(i, col);
          }
        };
        img.onerror = () => {
          console.warn(`Failed to load frame ${i + 1} for ${col.name}`);
        };
      }
    }
  }, [active, drawFrame]);

  // Smooth Render & Lerp Loop
  useEffect(() => {
    const startTime = performance.now();

    const loop = (now: number) => {
      const col = active;
      const elapsed = now - startTime;
      const idleTime = Date.now() - lastMouseMoveRef.current;

      // Auto-patrol if toggled or idle after 2.8s
      if (isAutoPlay || idleTime > 2800) {
        const middle = (col.frameCount - 1) / 2;
        const wave = Math.sin(elapsed * 0.0012) * (col.frameCount * 0.42);
        targetFrameRef.current = Math.max(0, Math.min(col.frameCount - 1, middle + wave));
      }

      // Smooth lerp interpolation
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.04) {
        currentFrameRef.current += diff * 0.16;
        drawFrame(currentFrameRef.current, col);
        setCurrentFrameDisplay(Math.round(currentFrameRef.current) + 1);
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [active, isAutoPlay, drawFrame]);

  // Mouse / Touch Tracking
  const updateTargetFromClientX = useCallback((clientX: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const r = section.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    targetFrameRef.current = ratio * (active.frameCount - 1);
    lastMouseMoveRef.current = Date.now();
  }, [active.frameCount]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      updateTargetFromClientX(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateTargetFromClientX(e.touches[0].clientX);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [updateTargetFromClientX]);

  // Entrance animations on collection switch
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(contentRef.current, { opacity: 0, x: -30, filter: 'blur(6px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' })
      .fromTo(bottomRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.4');
  }, [activeId]);

  // Gentle Oceanic Sound Synthesizer via Web Audio API
  const toggleAudio = () => {
    if (isAudioPlaying) {
      if (audioGainRef.current && audioCtxRef.current) {
        audioGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
        setTimeout(() => {
          audioCtxRef.current?.suspend();
          setIsAudioPlaying(false);
        }, 500);
      }
      return;
    }

    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Generate pink noise for soft rolling ocean waves
        const bufferSize = ctx.sampleRate * 3;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        // LFO for rhythmic surge of waves
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.2, ctx.currentTime); // ~5-second wave cycle
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(220, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        whiteNoise.start();
        lfo.start();
        audioGainRef.current = masterGain;
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      audioGainRef.current?.gain.setTargetAtTime(0.35, audioCtxRef.current.currentTime, 0.8);
      setIsAudioPlaying(true);
    } catch (err) {
      console.warn('Web Audio playback error:', err);
    }
  };

  const loadPercent = Math.min(100, Math.round((loadedCount / active.frameCount) * 100));

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: active.bgDark,
        userSelect: 'none',
        transition: 'background 0.8s ease',
      }}
    >
      {/* ── Interactive 180° Head Tracking Canvas ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: isAutoPlay ? 'default' : 'ew-resize',
        }}
      />

      {/* ── Dynamic Atmospheric Vignette Gradient ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: active.vignette,
          transition: 'background 0.8s ease',
        }}
      />

      {/* ── TOP NAV BAR ── */}
      <header
        ref={navRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(0.9rem, 2.2vh, 1.4rem) clamp(1.2rem, 3.5vw, 2.8rem)',
          zIndex: 20,
        }}
      >
        {/* Studio / Movie Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <span style={{ fontSize: '1.25rem', filter: `drop-shadow(0 0 10px ${active.primaryColor})` }}>
            {active.icon}
          </span>
          <div>
            <span
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 900,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#ffffff',
                textShadow: `0 0 18px ${active.accentGlow}`,
                display: 'block',
                lineHeight: 1.1,
              }}
            >
              {active.name}
            </span>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.46rem',
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.48)',
                textTransform: 'uppercase',
              }}
            >
              {active.studio}
            </span>
          </div>
        </div>

        {/* Cinematic Collection Switcher Tabs */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'rgba(10, 16, 26, 0.65)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '40px',
            padding: '0.22rem 0.3rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {COLLECTIONS.map(item => {
            const isSelected = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '0.52rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '0.36rem 0.85rem',
                  borderRadius: '30px',
                  border: isSelected ? `1px solid ${item.primaryColor}` : '1px solid transparent',
                  cursor: 'pointer',
                  background: isSelected ? item.primaryColor : 'transparent',
                  color: isSelected ? '#03131e' : 'rgba(255,255,255,0.65)',
                  fontWeight: isSelected ? 800 : 500,
                  boxShadow: isSelected ? `0 0 16px ${item.accentGlow}` : 'none',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
                onMouseEnter={e => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.65)';
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  }
                }}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Ambient controls & Audio */}
        <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
          {/* Ambient Soundscape Toggle */}
          <button
            onClick={toggleAudio}
            title="Toggle Ambient Shore Waves"
            style={{
              fontFamily: 'monospace',
              fontSize: '0.45rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              padding: '0.36rem 0.8rem',
              borderRadius: '30px',
              border: `1px solid ${isAudioPlaying ? active.primaryColor : 'rgba(255,255,255,0.14)'}`,
              background: isAudioPlaying ? active.badgeBg : 'rgba(10,16,26,0.6)',
              backdropFilter: 'blur(12px)',
              color: isAudioPlaying ? active.primaryColor : 'rgba(255,255,255,0.65)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease',
            }}
          >
            <span>{isAudioPlaying ? '🔊' : '🔈'}</span>
            <span>{isAudioPlaying ? 'Waves ON' : 'Ambient'}</span>
          </button>

          {/* Auto Glance / Wander Mode */}
          <button
            onClick={() => setIsAutoPlay(prev => !prev)}
            title="Toggle Continuous Auto Glance"
            style={{
              fontFamily: 'monospace',
              fontSize: '0.45rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              padding: '0.36rem 0.8rem',
              borderRadius: '30px',
              border: `1px solid ${isAutoPlay ? active.primaryColor : 'rgba(255,255,255,0.14)'}`,
              background: isAutoPlay ? active.badgeBg : 'rgba(10,16,26,0.6)',
              backdropFilter: 'blur(12px)',
              color: isAutoPlay ? active.primaryColor : 'rgba(255,255,255,0.65)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease',
            }}
          >
            <span>{isAutoPlay ? '⏸' : '▶'}</span>
            <span>{isAutoPlay ? 'Glancing' : 'Interactive'}</span>
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT (Left Showcase) ── */}
      <div
        ref={contentRef}
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-52%)',
          left: 'clamp(1.5rem, 5.5vw, 4.5rem)',
          maxWidth: 'clamp(260px, 34vw, 440px)',
          zIndex: 15,
        }}
      >
        {/* Studio Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.24rem 0.65rem',
            borderRadius: '20px',
            background: active.badgeBg,
            border: `1px solid ${active.accentGlow}`,
            marginBottom: '0.8rem',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: active.primaryColor, boxShadow: `0 0 8px ${active.primaryColor}` }} />
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '0.46rem',
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              color: active.primaryColor,
              margin: 0,
              fontWeight: 700,
            }}
          >
            {active.tagline}
          </p>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(2.4rem, 6.2vw, 5.6rem)',
            fontWeight: 950,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#ffffff',
            lineHeight: 0.92,
            margin: '0 0 clamp(0.6rem, 1.6vh, 1.1rem)',
            textShadow: `0 0 45px ${active.accentGlow}, 0 4px 28px rgba(0,0,0,0.95)`,
          }}
        >
          {active.title.map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              {line}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(0.72rem, 1.1vw, 0.92rem)',
            fontStyle: 'italic',
            color: active.secondaryColor,
            marginBottom: '0.6rem',
            letterSpacing: '0.04em',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          {active.subtitle}
        </p>

        {/* Synopsis */}
        <p
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(0.62rem, 0.88vw, 0.74rem)',
            fontWeight: 400,
            lineHeight: 1.68,
            color: 'rgba(255,255,255,0.72)',
            marginBottom: 'clamp(1rem, 2.5vh, 1.8rem)',
            textShadow: '0 2px 8px rgba(0,0,0,0.85)',
          }}
        >
          {active.quote}
        </p>

        {/* Interactive Buttons */}
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => setShowLore(true)}
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '0.48rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              padding: '0.6rem 1.3rem',
              borderRadius: '6px',
              border: 'none',
              background: `linear-gradient(135deg, ${active.primaryColor}, ${active.secondaryColor})`,
              color: '#03131e',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: `0 0 26px ${active.accentGlow}`,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px) scale(1.02)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 35px ${active.accentGlow}`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 26px ${active.accentGlow}`;
            }}
          >
            {active.cta}
          </button>


        </div>

        {/* Interactive Mouse Guide Hint */}
        <div style={{ marginTop: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <span style={{ fontSize: '0.75rem', animation: 'pulse 1.8s infinite' }}>↔</span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.42rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
            Move cursor horizontally to turn head (180° look)
          </span>
        </div>
      </div>

      {/* ── BOTTOM CINEMATIC DOCK & FRAME SCRUBBER ── */}
      <footer
        ref={bottomRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          height: 'clamp(54px, 8vh, 72px)',
          background: 'rgba(4, 10, 18, 0.78)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '0 clamp(1.2rem, 3.5vw, 2.8rem)',
          zIndex: 15,
        }}
      >


        {/* Chapter Story Highlights */}
        {active.chapters.map((item, i) => (
          <div
            key={item.n}
            onClick={() => setShowLore(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.7rem',
              padding: '0 clamp(1rem, 2.2vw, 2rem)',
              borderRight: i === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              flex: 1,
              minWidth: 0,
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.65rem',
                color: active.primaryColor,
                flexShrink: 0,
                fontWeight: 800,
              }}
            >
              {item.n}
            </span>
            <div style={{ minWidth: 0 }}>
              <span
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '0.52rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  display: 'block',
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </span>
              <p
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(0.48rem, 0.68vw, 0.58rem)',
                  color: 'rgba(255,255,255,0.48)',
                  lineHeight: 1.35,
                  margin: 0,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {item.text}
              </p>
            </div>
          </div>
        ))}

        {/* Interactive Frame Scrubber & Status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.9rem',
            paddingLeft: 'clamp(1rem, 2.2vw, 2rem)',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            flexShrink: 0,
          }}
        >
          {/* Progress / Frame counter */}
          <div style={{ textAlign: 'right' }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.46rem',
                letterSpacing: '0.2em',
                color: active.primaryColor,
                fontWeight: 700,
                display: 'block',
              }}
            >
              FRAME {String(currentFrameDisplay).padStart(3, '0')} / {active.frameCount}
            </span>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.38rem',
                letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
              }}
            >
              {loadPercent < 100 ? `Loading ${loadPercent}%` : '180° Panoramic Glance'}
            </span>
          </div>

          {/* Interactive Range Slider Scrubber */}
          <input
            type="range"
            min={1}
            max={active.frameCount}
            value={currentFrameDisplay}
            onChange={e => {
              const val = Number(e.target.value);
              targetFrameRef.current = val - 1;
              currentFrameRef.current = val - 1;
              setCurrentFrameDisplay(val);
              drawFrame(val - 1);
              lastMouseMoveRef.current = Date.now();
            }}
            style={{
              width: '90px',
              accentColor: active.primaryColor,
              cursor: 'pointer',
            }}
          />
        </div>
      </footer>



      {/* ── EXPANDED LORE & STORY MODAL ── */}
      {showLore && (
        <div
          onClick={() => setShowLore(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.82)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1.5rem',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '680px',
              background: 'rgba(10, 16, 26, 0.95)',
              border: `1px solid ${active.primaryColor}`,
              borderRadius: '20px',
              padding: '2rem 2.4rem',
              boxShadow: `0 0 50px ${active.accentGlow}`,
            }}
          >
            <button
              onClick={() => setShowLore(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.15)',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              ✕
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
              <span style={{ fontSize: '1.8rem' }}>{active.icon}</span>
              <div>
                <h2
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    margin: 0,
                  }}
                >
                  {active.name} Archives
                </h2>
                <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: active.secondaryColor, fontSize: '0.85rem' }}>
                  {active.subtitle}
                </span>
              </div>
            </div>

            <p style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, fontSize: '0.82rem', marginBottom: '1.5rem' }}>
              {active.quote}
            </p>

            <h3 style={{ fontFamily: 'monospace', fontSize: '0.55rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: active.primaryColor, marginBottom: '0.8rem' }}>
              Key Characters & Legends
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', marginBottom: '1.8rem' }}>
              {active.lore.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '0.85rem 1.1rem',
                  }}
                >
                  <h4 style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '0.82rem', fontWeight: 700, color: '#fff', margin: '0 0 0.25rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.5 }}>
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
              <button
                onClick={() => setShowLore(false)}
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.5rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  padding: '0.55rem 1.2rem',
                  borderRadius: '6px',
                  background: active.primaryColor,
                  color: '#03131e',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Close Archives ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
