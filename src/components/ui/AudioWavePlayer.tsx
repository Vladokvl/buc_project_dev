"use client";

import React, { useState, useEffect, useRef } from "react";

interface AudioWavePlayerProps {
  quote: string;
  labelPlay: string;
  labelPause: string;
}

export default function AudioWavePlayer({
  quote,
  labelPlay,
  labelPause,
}: AudioWavePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Folk pentatonic melody frequencies (A minor / Carpathian folk motif)
  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      return;
    }

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const notes = [220, 261.63, 293.66, 329.63, 392.0, 329.63, 293.66, 246.94];
    let step = 0;

    const playNote = () => {
      if (!audioCtxRef.current) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(notes[step % notes.length], now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.07, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
      step += 1;
    };

    playNote();
    intervalRef.current = window.setInterval(playNote, 520);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  // 60fps reactive wave canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext("2d");
    if (!c) return;

    let rafId = 0;
    let phase = 0;

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      const w = canvas.width;
      const h = canvas.height;
      c.clearRect(0, 0, w, h);

      const bars = 38;
      const gap = w / bars;
      phase += isPlaying ? 0.14 : 0.025;

      c.fillStyle = isPlaying ? "#171717" : "#A1A1AA";

      for (let i = 0; i < bars; i++) {
        const norm = i / bars;
        const amp = isPlaying
          ? (Math.sin(i * 0.45 + phase) * 0.45 +
              Math.cos(i * 0.9 - phase * 1.3) * 0.35 +
              0.3) *
            Math.sin(norm * Math.PI)
          : 0.12 + Math.sin(i * 0.5 + phase) * 0.04;

        const barH = Math.max(3, amp * (h - 6));
        const x = i * gap + 2;
        const y = (h - barH) / 2;

        c.fillRect(x, y, Math.max(2, gap - 3), barH);
      }
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying]);

  return (
    <div className="mt-6 border border-black/12 bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setIsPlaying((prev) => !prev)}
          className="flex shrink-0 cursor-pointer items-center gap-2.5 bg-[#171717] px-3.5 py-2 text-[11px] font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#FC46BA] active:scale-[0.98]"
        >
          <span>{isPlaying ? "❚❚" : "▶"}</span>
          <span>{isPlaying ? labelPause : labelPlay}</span>
        </button>

        <canvas
          ref={canvasRef}
          width={220}
          height={34}
          className="h-8 w-full max-w-[200px]"
        />
      </div>

      <p className="mt-3 border-l border-[#171717]/25 pl-3 text-xs sm:text-sm italic text-[#58595B]">
        {quote}
      </p>
    </div>
  );
}
