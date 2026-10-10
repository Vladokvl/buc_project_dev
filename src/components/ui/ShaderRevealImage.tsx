"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ShaderRevealImageProps {
  imagePrimary: string;
  imageHover: string;
  alt: string;
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    v_uv.y = 1.0 - v_uv.y;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  varying vec2 v_uv;
  uniform sampler2D u_tex0;
  uniform sampler2D u_tex1;
  uniform vec2 u_scale0;
  uniform vec2 u_scale1;
  uniform float u_hover;
  uniform vec2 u_mouse;

  vec2 coverUV(vec2 uv, vec2 scale) {
    return vec2(
      0.5 + (uv.x - 0.5) * scale.x,
      uv.y * scale.y
    );
  }

  void main() {
    vec2 uv = v_uv;
    float dist = distance(uv, u_mouse);

    // Minimal transition-only tension (0 at rest and 0 when fully hovered)
    float transitionPhase = sin(u_hover * 3.14159265);
    vec2 dir = normalize(uv - u_mouse + vec2(0.0001));
    vec2 disp = dir * transitionPhase * 0.0025 * exp(-dist * 3.0);

    // Subtle depth scale during transition
    vec2 center = vec2(0.5);
    vec2 baseUv0 = center + (uv - center) * (1.0 - u_hover * 0.025) + disp;
    vec2 baseUv1 = center + (uv - center) * (1.025 - u_hover * 0.025) - disp;

    vec2 uv0 = clamp(coverUV(baseUv0, u_scale0), 0.001, 0.999);
    vec2 uv1 = clamp(coverUV(baseUv1, u_scale1), 0.001, 0.999);

    vec4 tex0 = texture2D(u_tex0, uv0);
    vec4 tex1 = texture2D(u_tex1, uv1);

    // Clean soft reveal mask expanding from cursor
    float mask = smoothstep(0.0, 1.0, u_hover * 1.35 - dist * 0.32 * (1.0 - u_hover));
    gl_FragColor = mix(tex0, tex1, mask);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ShaderRevealImage({
  imagePrimary,
  imageHover,
  alt,
}: ShaderRevealImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglReady, setWebglReady] = useState(false);
  const stateRef = useRef({
    hoverTarget: 0,
    hoverCurrent: 0,
    mouseX: 0.5,
    mouseY: 0.5,
    targetX: 0.5,
    targetY: 0.5,
    velo: 0,
    isVisible: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: true });
    if (!gl) return;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTex0 = gl.getUniformLocation(program, "u_tex0");
    const uTex1 = gl.getUniformLocation(program, "u_tex1");
    const uScale0 = gl.getUniformLocation(program, "u_scale0");
    const uScale1 = gl.getUniformLocation(program, "u_scale1");
    const uHover = gl.getUniformLocation(program, "u_hover");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    let loadedCount = 0;
    const textures: WebGLTexture[] = [];
    const scales: [number, number][] = [
      [1, 1],
      [1, 1],
    ];
    const containerAspect = 4 / 5;

    [imagePrimary, imageHover].forEach((src, index) => {
      const tex = gl.createTexture();
      if (!tex) return;
      textures[index] = tex;
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const imgAspect =
          (img.naturalWidth || 4) / (img.naturalHeight || 5);
        scales[index] = [
          Math.min(1.0, containerAspect / imgAspect),
          Math.min(1.0, imgAspect / containerAspect),
        ];

        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        loadedCount += 1;
        if (loadedCount === 2) setWebglReady(true);
      };
      img.src = src;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        stateRef.current.isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let rafId = 0;

    const render = () => {
      rafId = requestAnimationFrame(render);
      const s = stateRef.current;
      if (!s.isVisible || loadedCount < 2) return;

      s.hoverCurrent += (s.hoverTarget - s.hoverCurrent) * 0.08;
      s.mouseX += (s.targetX - s.mouseX) * 0.14;
      s.mouseY += (s.targetY - s.mouseY) * 0.14;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures[0]);
      gl.uniform1i(uTex0, 0);
      gl.uniform2f(uScale0, scales[0][0], scales[0][1]);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textures[1]);
      gl.uniform1i(uTex1, 1);
      gl.uniform2f(uScale1, scales[1][0], scales[1][1]);

      gl.uniform1f(uHover, s.hoverCurrent);
      gl.uniform2f(uMouse, s.mouseX, s.mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [imagePrimary, imageHover]);

  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden bg-[#f4f4f5]"
      onMouseEnter={() => {
        stateRef.current.hoverTarget = 1;
      }}
      onMouseLeave={() => {
        stateRef.current.hoverTarget = 0;
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        stateRef.current.targetX = (e.clientX - rect.left) / rect.width;
        stateRef.current.targetY = (e.clientY - rect.top) / rect.height;
      }}
    >
      {/* Fallback Next.js Image until WebGL textures finish loading */}
      <Image
        src={imagePrimary}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className={`object-cover object-top transition-opacity duration-500 ${
          webglReady ? "opacity-0" : "opacity-100"
        }`}
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={800}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          webglReady ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
