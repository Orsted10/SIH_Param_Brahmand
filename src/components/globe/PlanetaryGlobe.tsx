"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Coordinate } from "@/types/map";
import { GlobeFallback } from "./GlobeFallback";
import { detectWebGLSupport } from "@/lib/browser/webgl";

interface PlanetaryGlobeProps {
  interactive?: boolean;
  rotationEnabled?: boolean;
  selectedCoordinate?: Coordinate | null;
  reducedMotion?: boolean;
  onCoordinateSelect?: (coord: Coordinate) => void;
  className?: string;
}

export const PlanetaryGlobe: React.FC<PlanetaryGlobeProps> = ({
  interactive = true,
  rotationEnabled = true,
  selectedCoordinate,
  reducedMotion = false,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const webglSupported = useRef<boolean>(true);

  useEffect(() => {
    webglSupported.current = detectWebGLSupport();
  }, []);

  useEffect(() => {
    if (!containerRef.current || !webglSupported.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 800;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 4.2);

    // 2. Renderer with DPR clamp (Math.min(window.devicePixelRatio, 1.75))
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.75);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("Failed to initialize WebGLRenderer:", e);
      return;
    }

    // 3. Procedural Earth Sphere with GLSL Shader
    const globeRadius = 1.35;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);

    const earthVertexShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const earthFragmentShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      uniform vec3 uSunDirection;
      uniform float uTime;

      // Simplex-like pseudo noise for procedural continental landmasses
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                   mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p *= 2.1;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 lightDir = normalize(uSunDirection);
        float diffuse = max(dot(normal, lightDir), 0.0);

        // Procedural terrain sampling
        vec2 sphereUv = vUv * vec2(8.0, 4.0);
        float land = fbm(sphereUv);

        // Oceanic deep space blue vs continental terrain
        vec3 oceanColor = vec3(0.02, 0.06, 0.12);
        vec3 landColor = vec3(0.07, 0.15, 0.18);
        vec3 coastGlow = vec3(0.12, 0.45, 0.55);

        vec3 surfaceColor = oceanColor;
        if (land > 0.46) {
          surfaceColor = mix(coastGlow, landColor, smoothstep(0.46, 0.52, land));
        }

        // Coordinate Grid Lines (Equator, Prime Meridian, Tropics)
        float latLines = step(0.98, fract(vUv.y * 18.0));
        float lonLines = step(0.98, fract(vUv.x * 36.0));
        float grid = max(latLines, lonLines) * 0.18;
        surfaceColor += vec3(0.45, 0.9, 1.0) * grid;

        // Night-side city / calibration telemetry emission
        float night = 1.0 - diffuse;
        vec3 nightLights = vec3(0.45, 0.9, 1.0) * step(0.58, land) * night * 0.35;

        // Final illuminated surface
        vec3 finalColor = (surfaceColor * (diffuse * 0.95 + 0.15)) + nightLights;

        // Limb atmospheric Fresnel rim
        vec3 viewDir = normalize(-vPosition);
        float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.2);
        finalColor += vec3(0.45, 0.88, 1.0) * fresnel * 0.65;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const earthMaterial = new THREE.ShaderMaterial({
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
      uniforms: {
        uSunDirection: { value: new THREE.Vector3(1.5, 0.8, 1.8).normalize() },
        uTime: { value: 0 },
      },
    });

    const earthMesh = new THREE.Mesh(globeGeometry, earthMaterial);
    // Initial Earth orientation centered towards Asia/India
    earthMesh.rotation.y = 3.6;
    earthMesh.rotation.x = 0.35;
    scene.add(earthMesh);

    // 4. Subtle Outer Atmosphere Glow Shell
    const atmosphereGeometry = new THREE.SphereGeometry(globeRadius * 1.025, 48, 48);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          gl_FragColor = vec4(0.45, 0.9, 1.0, 1.0) * intensity * 0.4;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphereMesh);

    // 5. Orbital Calibration Ring & Data Arc
    const orbitCurve = new THREE.EllipseCurve(0, 0, globeRadius * 1.22, globeRadius * 1.22, 0, 2 * Math.PI, false, 0);
    const orbitPoints = orbitCurve.getPoints(90);
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(
      orbitPoints.map((p) => new THREE.Vector3(p.x, 0, p.y))
    );
    const orbitMaterial = new THREE.LineBasicMaterial({
      color: 0x73e6ff,
      transparent: true,
      opacity: 0.18,
    });
    const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
    orbitLine.rotation.x = 1.1;
    orbitLine.rotation.y = 0.4;
    scene.add(orbitLine);

    // 6. Selected Coordinate Target Marker on Globe Surface
    const markerGeometry = new THREE.RingGeometry(0.022, 0.038, 24);
    const markerMaterial = new THREE.MeshBasicMaterial({
      color: 0x73e6ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);

    // Convert lat/lng to 3D coordinates on Earth sphere
    const updateMarkerPosition = (lat: number, lng: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const r = globeRadius * 1.002;

      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);

      markerMesh.position.set(x, y, z);
      markerMesh.lookAt(new THREE.Vector3(0, 0, 0));
    };

    const targetCoord = selectedCoordinate || { latitude: 20.5937, longitude: 78.9629 };
    updateMarkerPosition(targetCoord.latitude, targetCoord.longitude);
    earthMesh.add(markerMesh);

    // 7. Dynamic User Interaction (Pointer Drag, Inertia, Clamped Zoom)
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotationX = earthMesh.rotation.x;
    let targetRotationY = earthMesh.rotation.y;
    let lastInteractionTime = Date.now();

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      isDragging = true;
      lastInteractionTime = Date.now();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousMouseX = clientX;
      previousMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !interactive) return;
      lastInteractionTime = Date.now();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - previousMouseX;
      const deltaY = clientY - previousMouseY;

      targetRotationY += deltaX * 0.005;
      targetRotationX += deltaY * 0.005;
      // Clamp vertical pitch so user doesn't flip Earth upside down
      targetRotationX = Math.max(-1.1, Math.min(1.1, targetRotationX));

      previousMouseX = clientX;
      previousMouseY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      if (!interactive) return;
      e.preventDefault();
      lastInteractionTime = Date.now();
      const zoomSpeed = 0.0025;
      camera.position.z = Math.max(2.2, Math.min(6.5, camera.position.z + e.deltaY * zoomSpeed));
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    dom.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);
    dom.addEventListener("wheel", onWheel, { passive: false });

    // 8. Animation Loop (Respects document.hidden and reducedMotion)
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const delta = clock.getDelta();
      earthMaterial.uniforms.uTime.value += delta;

      // Slow planetary rotation if motion enabled and not currently dragging
      const idleTime = Date.now() - lastInteractionTime;
      if (rotationEnabled && !reducedMotion && idleTime > 1500) {
        targetRotationY += 0.0007;
      }

      // Smooth damping interpolation
      earthMesh.rotation.y += (targetRotationY - earthMesh.rotation.y) * 0.08;
      earthMesh.rotation.x += (targetRotationX - earthMesh.rotation.x) * 0.08;

      // Subtle pulse on selected coordinate ring
      const markerScale = 1.0 + Math.sin(Date.now() * 0.003) * 0.12;
      markerMesh.scale.set(markerScale, markerScale, 1);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 9. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // 10. Memory Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      dom.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      dom.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      dom.removeEventListener("wheel", onWheel);

      globeGeometry.dispose();
      earthMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      orbitGeometry.dispose();
      orbitMaterial.dispose();
      markerGeometry.dispose();
      markerMaterial.dispose();
      renderer.dispose();

      if (dom.parentNode) {
        dom.parentNode.removeChild(dom);
      }
    };
  }, [interactive, rotationEnabled, selectedCoordinate, reducedMotion]);

  if (!webglSupported.current) {
    return <GlobeFallback selectedCoordinate={selectedCoordinate} />;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none ${className || ""}`}
      role="region"
      aria-label="3D Interactive Planetary Earth Model"
    />
  );
};
