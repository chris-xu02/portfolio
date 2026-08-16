"use client";

import { useEffect, useRef } from "react";
import "./HeroPortraitCube.css";

const FACES = [
  { id: "front", src: "/images/hero-cube/front.webp", face: "hpc-front" },
  { id: "right", src: "/images/hero-cube/right.webp", face: "hpc-right" },
  { id: "back", src: "/images/hero-cube/back.webp", face: "hpc-back" },
  { id: "left", src: "/images/hero-cube/left.webp", face: "hpc-left" },
  { id: "top", src: "/images/hero-cube/top.webp", face: "hpc-top" },
  { id: "bottom", src: "/images/hero-cube/bottom.webp", face: "hpc-bottom" },
] as const;

const CYCLE = 22;

function pose(time: number, yawOffset: number, pitchOffset: number) {
  const phase = (Math.PI * 2 * time) / CYCLE;
  const yaw = -26 + (360 * time) / CYCLE + yawOffset;
  const pitch = 24 * Math.sin(phase - 0.4) + pitchOffset;
  const roll = 1.6 * Math.sin(phase * 2);
  return `rotateX(${pitch}deg) rotateY(${yaw}deg) rotateZ(${roll}deg)`;
}

export function HeroPortraitCube() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const stage = stageRef.current;
    const cube = cubeRef.current;
    if (!scene || !stage || !cube) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let start = performance.now();
    let elapsed = 0;
    let playing = !media.matches;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let yawOffset = 0;
    let pitchOffset = 0;

    const paint = (time: number) => {
      cube.style.transform = pose(time, yawOffset, pitchOffset);
    };

    const applyMotion = () => {
      const reduced = media.matches;
      scene.classList.toggle("hpc-reduced", reduced);
      playing = !reduced && !dragging;
      if (playing) start = performance.now() - elapsed * 1000;
      if (reduced) cube.style.transform = "";
    };

    const tick = (now: number) => {
      if (playing) {
        elapsed = (now - start) / 1000;
        paint(elapsed);
      }
      frame = requestAnimationFrame(tick);
    };

    applyMotion();
    if (!media.matches) paint(0);
    frame = requestAnimationFrame(tick);

    const onDown = (event: PointerEvent) => {
      if (media.matches) return;
      dragging = true;
      playing = false;
      lastX = event.clientX;
      lastY = event.clientY;
      stage.classList.add("hpc-dragging");
      stage.setPointerCapture(event.pointerId);
    };

    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      yawOffset += dx * 0.32;
      pitchOffset = Math.max(-18, Math.min(18, pitchOffset - dy * 0.18));
      paint(elapsed);
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      stage.classList.remove("hpc-dragging");
      playing = !media.matches;
      start = performance.now() - elapsed * 1000;
    };

    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);
    media.addEventListener("change", applyMotion);

    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
      media.removeEventListener("change", applyMotion);
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="hpc-scene"
      role="img"
      aria-label="A glass cube showing six cinematic portraits of Christopher Xu, one centered portrait on each face."
    >
      <div className="hpc-fit">
        <div className="hpc-halo" aria-hidden="true" />
        <div className="hpc-orbit-back" aria-hidden="true">
          <span className="hpc-ring" />
        </div>
        <div ref={stageRef} className="hpc-stage">
          <div className="hpc-floating">
            <div ref={cubeRef} className="hpc-cube">
              {FACES.map((face) => (
                <div key={face.id} className={`hpc-face ${face.face}`}>
                  <img src={face.src} alt="" draggable={false} decoding="async" />
                  <span className="hpc-tone" />
                  <span className="hpc-sheen" />
                  <span className="hpc-glass" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hpc-orbit-front" aria-hidden="true">
          <span className="hpc-ring" />
        </div>
        <div className="hpc-orbit-path" aria-hidden="true">
          <span className="hpc-orb" />
        </div>
        <div className="hpc-pool" aria-hidden="true" />
        <div className="hpc-glow" aria-hidden="true" />
      </div>
    </div>
  );
}
