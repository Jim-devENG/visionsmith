"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  phase: number;
};

export function ChaosField({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let raf = 0;
    let start = 0;
    const SETTLE_MS = 2200;

    function layout() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.max(6, Math.round(width / 64));
      const rows = Math.max(4, Math.round(height / 64));
      const gapX = width / cols;
      const gapY = height / rows;

      const next: Point[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const toX = gapX * (c + 0.5);
          const toY = gapY * (r + 0.5);
          next.push({
            x: reduceMotion ? toX : Math.random() * width,
            y: reduceMotion ? toY : Math.random() * height,
            fromX: Math.random() * width,
            fromY: Math.random() * height,
            toX,
            toY,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
      points = next;
    }

    function easeOutExpo(t: number) {
      return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function draw(now: number) {
      if (!start) start = now;
      const elapsed = now - start;
      const settleT = reduceMotion ? 1 : Math.min(1, elapsed / SETTLE_MS);
      const eased = easeOutExpo(settleT);

      ctx!.clearRect(0, 0, width, height);

      const dotColor = variant === "dark" ? "rgba(217, 119, 6, 0.7)" : "rgba(201, 106, 27, 0.55)";
      const lineColor = variant === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(23, 20, 15, 0.06)";

      for (const p of points) {
        p.x = p.fromX + (p.toX - p.fromX) * eased;
        p.y = p.fromY + (p.toY - p.fromY) * eased;
      }

      if (settleT >= 1) {
        const t = elapsed / 1000;
        for (const p of points) {
          p.x = p.toX + Math.sin(t * 0.6 + p.phase) * 3;
          p.y = p.toY + Math.cos(t * 0.5 + p.phase) * 3;
        }

        ctx!.strokeStyle = lineColor;
        ctx!.lineWidth = 1;
        const reach = Math.max(width, height) / 10;
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const a = points[i];
            const b = points[j];
            const dx = a.toX - b.toX;
            const dy = a.toY - b.toY;
            if (Math.hypot(dx, dy) < reach) {
              ctx!.beginPath();
              ctx!.moveTo(a.x, a.y);
              ctx!.lineTo(b.x, b.y);
              ctx!.stroke();
            }
          }
        }
      }

      ctx!.fillStyle = dotColor;
      for (const p of points) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!reduceMotion || settleT < 1) {
        raf = requestAnimationFrame(draw);
      } else {
        raf = requestAnimationFrame(draw);
      }
    }

    layout();
    raf = requestAnimationFrame(draw);

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
