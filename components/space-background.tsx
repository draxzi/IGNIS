'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  layer: number; // 0, 1, 2 for parallax depth
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  decay: number;
  active: boolean;
}

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive star counts
    const isMobile = width < 768;
    const countLayer0 = isMobile ? 80 : 180;
    const countLayer1 = isMobile ? 40 : 90;
    const countLayer2 = isMobile ? 20 : 40;

    const colors = ['#FBE5D8', '#D1A9A7', '#F3A65B']; // Cream, Rose, Amber

    const stars: Star[] = [];

    const createStarsForLayer = (count: number, layer: number, minR: number, maxR: number) => {
      for (let i = 0; i < count; i++) {
        // Colors: mostly cream (65%), rose (25%), rare amber (10%)
        const rand = Math.random();
        const color = rand < 0.65 ? colors[0] : rand < 0.9 ? colors[1] : colors[2];
        const baseAlpha = 0.2 + Math.random() * 0.7;

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: minR + Math.random() * (maxR - minR),
          color,
          alpha: baseAlpha,
          baseAlpha,
          twinkleSpeed: 0.015 + Math.random() * 0.03,
          twinklePhase: Math.random() * Math.PI * 2,
          layer,
        });
      }
    };

    createStarsForLayer(countLayer0, 0, 0.4, 0.9); // background, smallest
    createStarsForLayer(countLayer1, 1, 0.9, 1.4); // midground
    createStarsForLayer(countLayer2, 2, 1.4, 2.2); // foreground, largest

    // Shooting star state
    let shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      length: 0,
      speed: 0,
      angle: 0,
      alpha: 0,
      decay: 0,
      active: false,
    };

    let nextShootingStarTime = Date.now() + 3000 + Math.random() * 5000;

    const spawnShootingStar = () => {
      const angle = (25 + Math.random() * 35) * (Math.PI / 180); // downward angle
      shootingStar = {
        x: Math.random() * width * 0.8,
        y: Math.random() * (height * 0.4),
        length: 80 + Math.random() * 120,
        speed: 12 + Math.random() * 10,
        angle,
        alpha: 1,
        decay: 0.018 + Math.random() * 0.012,
        active: true,
      };
      nextShootingStarTime = Date.now() + 8000 + Math.random() * 6000;
    };

    // Parallax tracking
    let cursorX = 0;
    let cursorY = 0;
    let targetCursorX = 0;
    let targetCursorY = 0;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetCursorX = (e.clientX / width - 0.5) * 40;
      targetCursorY = (e.clientY / height - 0.5) * 40;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Reposition stars inside new bounds
      stars.forEach((s) => {
        s.x = Math.random() * width;
        s.y = Math.random() * height;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Render loop
    const render = () => {
      // Pause if tab is hidden
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth cursor parallax interpolation
      if (!isReducedMotion) {
        cursorX += (targetCursorX - cursorX) * 0.05;
        cursorY += (targetCursorY - cursorY) * 0.05;
      }

      // Draw stars with parallax and twinkle
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (!isReducedMotion) {
          star.twinklePhase += star.twinkleSpeed;
          star.alpha = star.baseAlpha + Math.sin(star.twinklePhase) * 0.3;
          if (star.alpha < 0.1) star.alpha = 0.1;
          if (star.alpha > 1) star.alpha = 1;
        }

        // Parallax multipliers based on layer depth
        const parallaxFactor = (star.layer + 1) * 0.4;
        const scrollOffset = scrollY * 0.08 * (star.layer + 0.5);

        let drawX = star.x + cursorX * parallaxFactor;
        let drawY = ((star.y - scrollOffset) % height + height) % height;

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Extra soft glow for foreground stars
        if (star.layer === 2 && star.radius > 1.6) {
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.radius * 2.5, 0, Math.PI * 2);
          ctx.globalAlpha = star.alpha * 0.18;
          ctx.fill();
        }
      }

      // Handle shooting stars
      if (!isReducedMotion) {
        const now = Date.now();
        if (!shootingStar.active && now >= nextShootingStarTime) {
          spawnShootingStar();
        }

        if (shootingStar.active) {
          const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
          const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

          const grad = ctx.createLinearGradient(
            shootingStar.x,
            shootingStar.y,
            tailX,
            tailY
          );
          grad.addColorStop(0, `rgba(209, 169, 167, ${shootingStar.alpha})`);
          grad.addColorStop(0.3, `rgba(251, 229, 216, ${shootingStar.alpha * 0.7})`);
          grad.addColorStop(1, 'rgba(209, 169, 167, 0)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          // Movement
          shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
          shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
          shootingStar.alpha -= shootingStar.decay;

          if (
            shootingStar.alpha <= 0 ||
            shootingStar.x > width + 100 ||
            shootingStar.y > height + 100
          ) {
            shootingStar.active = false;
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Deep Void Plum Base with Drifting Nebula Purple & Dusty Mauve Clouds */}
      <div className="absolute inset-0 bg-void" />

      {/* Nebula Cloud 1: Top Right */}
      <div
        className="absolute -top-[15%] right-[-10%] h-[750px] w-[750px] rounded-full opacity-60 blur-[130px] animate-cloud-drift-1"
        style={{
          background: 'radial-gradient(circle, #2B124C 0%, #7F5276 45%, transparent 75%)',
        }}
      />

      {/* Nebula Cloud 2: Bottom Left */}
      <div
        className="absolute top-[45%] -left-[12%] h-[800px] w-[800px] rounded-full opacity-50 blur-[140px] animate-cloud-drift-2"
        style={{
          background: 'radial-gradient(circle, #512A59 0%, #2B124C 50%, transparent 80%)',
        }}
      />

      {/* Nebula Cloud 3: Mid Center subtle depth */}
      <div
        className="absolute top-[20%] left-[30%] h-[550px] w-[550px] rounded-full opacity-35 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #7F5276 0%, #180018 70%)',
        }}
      />

      {/* 4. Aurora Ribbons: Morphed Conic / Linear Blend */}
      <div
        className="absolute -top-[25%] left-[10%] h-[600px] w-[1000px] mix-blend-screen opacity-25 blur-[90px] animate-aurora-morph"
        style={{
          background:
            'conic-gradient(from 120deg at 50% 50%, #7F5276 0deg, #2B124C 140deg, #512A59 280deg, #7F5276 360deg)',
        }}
      />

      {/* 5. Orbital Hairlines with Travelling Rose Dots */}
      <svg
        className="absolute top-[5%] right-[2%] h-[650px] w-[650px] opacity-30 animate-orbit-rotate"
        viewBox="0 0 600 600"
        fill="none"
      >
        <ellipse
          cx="300"
          cy="300"
          rx="270"
          ry="150"
          stroke="#512A59"
          strokeWidth="1"
          strokeDasharray="4 6"
          transform="rotate(-25 300 300)"
        />
        {/* Satellite dot */}
        <circle cx="530" cy="240" r="3" fill="#D1A9A7" />
      </svg>

      <svg
        className="absolute -bottom-[10%] left-[5%] h-[750px] w-[750px] opacity-20 animate-orbit-rotate-reverse"
        viewBox="0 0 700 700"
        fill="none"
      >
        <ellipse
          cx="350"
          cy="350"
          rx="320"
          ry="190"
          stroke="#512A59"
          strokeWidth="1"
          strokeDasharray="5 7"
          transform="rotate(35 350 350)"
        />
        {/* Satellite dot */}
        <circle cx="120" cy="270" r="2.5" fill="#D1A9A7" />
      </svg>

      {/* 7. Planet / Celestial Sphere with Rim Light (partially cropped near hero edge) */}
      <div
        className="absolute -top-[120px] -right-[120px] h-[480px] w-[480px] rounded-full opacity-60 shadow-[0_0_80px_rgba(209,169,167,0.15)]"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, rgba(209, 169, 167, 0.35) 0%, rgba(127, 82, 118, 0.25) 45%, rgba(43, 18, 76, 0.4) 75%, #180018 95%)',
          border: '1px solid rgba(209, 169, 167, 0.18)',
        }}
      />

      {/* 2 & 3. Canvas Starfield & Shooting Stars */}
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />

      {/* 6. Hairline 32px Grid with Radial Mask Fade */}
      <div className="hairline-grid-masked absolute inset-0 opacity-40" />

      {/* Film-grain noise overlay (SVG feTurbulence, 3% opacity) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="ignis-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ignis-noise)" />
      </svg>
    </div>
  );
}
