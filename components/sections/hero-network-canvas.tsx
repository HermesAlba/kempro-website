"use client";

import { useEffect, useRef } from "react";

// Lightweight canvas "plexus" animation for the home Hero background — real
// moving dots and connecting lines (not a photo/video). Unlike a generic
// random-drift particle field, every node shares the same upward-right
// heading (FLOW_ANGLE) with only a little per-node jitter, so the whole
// network visibly streams in one direction instead of wandering — meant to
// read as forward momentum/propulsion, tying the motion to the Hero title
// ("Impulsamos tu empresa con tecnología, automatización e IA") rather than
// being decorative motion for its own sake. Nodes that drift off the
// top/right edge re-enter from the bottom/left (wrap, not bounce), so the
// "current" never breaks or reverses.
//
// Entrance: for the first INTRO_DURATION_MS after mount, the network is
// denser (INTRO_EXTRA_NODES extra, temporary nodes on top of the steady
// NODE_COUNT) and faster (speedScale eases down from 1+INTRO_SPEED_BOOST to
// 1). The extra nodes each get a random expiry within that window and fade
// out individually over FADE_MS rather than all vanishing at once, so the
// network visibly "settles" into its normal calmer state instead of
// starting there.
const NODE_COUNT = 55;
const MAX_LINK_DISTANCE = 140; // css px, pre-DPR scaling
const NODE_RADIUS = 2.5;
// Each node gets a random color from here, drawing from the site's indigo
// range: the hc-blue/hc-blue-dark tokens, the CtaBand/"Empieza aquí"
// gradient indigos, a lighter primary-400 tone for variety, and accent-600
// (the cyan family used for the blog's "tecnología" and "tendencias"
// categories — the one entry NOT part of the indigo remap).
const NODE_PALETTE = [
  "#2F3293", // hc-blue-dark (primary-900)
  "#7682F8", // hc-blue (primary-500)
  "#5D5FEF", // CtaBand/"Empieza aquí" gradient start (primary-600)
  "#4949D6", // CtaBand/"Empieza aquí" gradient end (primary-700)
  "#0891b2", // accent-600
  "#90A2FE", // lighter accent tone for variety (primary-400)
];
// Lines stay a single neutral indigo regardless of which two node colors
// they connect — only the dots vary, so the network doesn't turn into
// visual noise.
const LINK_COLOR_RGB = "73, 73, 214"; // "#4949D6" as an rgb() triple, for alpha blending
const LINK_MAX_ALPHA = 0.35;

// -28° from horizontal: rightward and gently upward — an "ascending" flow
// rather than a flat sideways scroll.
const FLOW_ANGLE = (-28 * Math.PI) / 180;
const FLOW_SPEED = 0.22; // css px per frame, before jitter/speedScale
const JITTER = 0.06; // per-node random component, so the flow reads as organic, not mechanical

const INTRO_EXTRA_NODES = 35;
const INTRO_DURATION_MS = 1800;
const INTRO_SPEED_BOOST = 1.8; // initial speed multiplier is 1 + this, easing down to 1
const FADE_MS = 500; // how long an expiring intro-only node takes to fade out

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  opacity: number;
  /** Intro-only nodes get removed once they've faded out; steady-state
   * nodes (temporary === false) live forever, recycled via wrap in step(). */
  temporary: boolean;
  /** ms timestamp (performance.now()); only set for temporary nodes. */
  expiresAt?: number;
};

function randomColor(): string {
  return NODE_PALETTE[Math.floor(Math.random() * NODE_PALETTE.length)];
}

function randomVelocity() {
  return {
    vx: Math.cos(FLOW_ANGLE) * FLOW_SPEED + (Math.random() - 0.5) * JITTER,
    vy: Math.sin(FLOW_ANGLE) * FLOW_SPEED + (Math.random() - 0.5) * JITTER,
  };
}

export function HeroNetworkCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let animationFrame = 0;
    const introStart = performance.now();

    function makeNode(temporary: boolean): Node {
      const { vx, vy } = randomVelocity();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        color: randomColor(),
        opacity: 1,
        temporary,
        expiresAt: temporary
          ? introStart + Math.random() * INTRO_DURATION_MS
          : undefined,
      };
    }

    function seedNodes() {
      // Scattered across the whole canvas on first paint (rather than only
      // at the bottom-left "source" edge) so the initial frame isn't empty
      // on the upper-right side — nodes that later wrap back in via step()
      // do spawn from the bottom-left, keeping the flow direction honest.
      const steady = Array.from({ length: NODE_COUNT }, () => makeNode(false));
      // Skip the temporary burst nodes entirely under reduced motion — there's
      // no animated fade-out to settle them, so they'd otherwise sit there
      // permanently instead of just being the normal steady-state count.
      const burst = prefersReducedMotion
        ? []
        : Array.from({ length: INTRO_EXTRA_NODES }, () => makeNode(true));
      nodes = [...steady, ...burst];
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    }

    function step() {
      const now = performance.now();
      const introT = Math.min(1, (now - introStart) / INTRO_DURATION_MS);
      const eased = 1 - Math.pow(1 - introT, 3); // easeOutCubic
      const speedScale = 1 + INTRO_SPEED_BOOST * (1 - eased);

      const margin = 20;
      for (const node of nodes) {
        node.x += node.vx * speedScale;
        node.y += node.vy * speedScale;

        if (node.temporary && node.expiresAt !== undefined && now >= node.expiresAt) {
          node.opacity = Math.max(0, 1 - (now - node.expiresAt) / FADE_MS);
        }

        // Wrap: re-enter from the opposite edge so the current never
        // reverses or pools up against a wall.
        if (node.x > width + margin || node.y < -margin) {
          node.x = -margin + Math.random() * margin;
          node.y = height + Math.random() * margin;
          const { vx, vy } = randomVelocity();
          node.vx = vx;
          node.vy = vy;
          node.color = randomColor();
        }
      }

      // Remove fully-faded intro nodes so they don't sit at the back of
      // the array forever doing nothing.
      nodes = nodes.filter((node) => !(node.temporary && node.opacity <= 0));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Links first, so node dots paint on top of the line endpoints.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > MAX_LINK_DISTANCE) continue;
          const alpha =
            (1 - dist / MAX_LINK_DISTANCE) * LINK_MAX_ALPHA * Math.min(a.opacity, b.opacity);
          ctx!.strokeStyle = `rgba(${LINK_COLOR_RGB}, ${alpha})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      for (const node of nodes) {
        ctx!.globalAlpha = node.opacity;
        ctx!.fillStyle = node.color;
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    function frame() {
      step();
      draw();
      animationFrame = requestAnimationFrame(frame);
    }

    resize();
    draw();
    if (!prefersReducedMotion) {
      animationFrame = requestAnimationFrame(frame);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
