"use client";

import { useEffect, useRef } from "react";

export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const patternSize = 200;
    const patternScaleX = 1;
    const patternScaleY = 1;
    const patternRefreshInterval = 3;
    const patternAlpha = 18;

    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternCtx = patternCanvas.getContext("2d");
    if (!patternCtx) return;

    const imageData = patternCtx.createImageData(patternSize, patternSize);
    const data = imageData.data;
    const pixelCount = patternSize * patternSize * 4;

    let frame = 0;
    let rafId: number;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(patternScaleX, patternScaleY);
    };

    const draw = () => {
      if (frame % patternRefreshInterval === 0) {
        for (let i = 0; i < pixelCount; i += 4) {
          const v = 255 * Math.random();
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
          data[i + 3] = patternAlpha;
        }
        patternCtx.putImageData(imageData, 0, 0);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = ctx.createPattern(patternCanvas, "repeat") as CanvasPattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      frame++;
      rafId = window.requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="noise-overlay z-40" aria-hidden="true" />;
}
