"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Coordinate } from "@/types/map";
import { detectWebGLSupport, getWebGLDiagnostics, WebGLDiagnosticInfo } from "@/lib/browser/webgl";
import { normalizeLongitude } from "@/lib/utils/coordinates";
import { useWorkspaceStore } from "@/stores/workspaceStore";

interface PlanetaryGlobeProps {
  interactive?: boolean;
  rotationEnabled?: boolean;
  selectedCoordinate?: Coordinate | null;
  reducedMotion?: boolean;
  viewMode?: "GLOBE" | "MAP" | "OBSERVATION";
  scrollProgressGetter?: () => number;
  onCoordinateSelect?: (coord: Coordinate) => void;
  className?: string;
}

export const PlanetaryGlobe: React.FC<PlanetaryGlobeProps> = ({
  interactive = true,
  rotationEnabled = true,
  selectedCoordinate,
  reducedMotion = false,
  viewMode = "GLOBE",
  scrollProgressGetter,
  onCoordinateSelect,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglError, setWebglError] = React.useState<string | null>(null);
  const [diagnostics, setDiagnostics] = React.useState<WebGLDiagnosticInfo | null>(null);

  useEffect(() => {
    const isSupported = detectWebGLSupport();
    const info = getWebGLDiagnostics();
    setDiagnostics(info);

    if (!isSupported) {
      setWebglError("WebGL support not detected.");
      useWorkspaceStore.getState().setViewMode("MAP");
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || webglError) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth || 1200;
    const height = container.clientHeight || window.innerHeight || 800;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    const initialCamZ = 3.6;
    camera.position.set(0, 0, initialCamZ);

    // 2. High-Performance Renderer with DPR Clamp
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
      const errorMsg = e instanceof Error ? e.message : String(e);
      console.warn("Failed to initialize WebGLRenderer:", e);
      setWebglError(`Renderer init failed: ${errorMsg}`);
      useWorkspaceStore.getState().setViewMode("MAP");
      return;
    }

    // 3. Very Sparse, Subtle Deep-Space Points (Nearly Invisible)
    const starCount = 300;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 40;
      starPositions[i + 1] = (Math.random() - 0.5) * 40;
      starPositions[i + 2] = -10 - Math.random() * 20;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xf4f7fa,
      size: 0.03,
      transparent: true,
      opacity: 0.25,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 4. Procedural Earth Sphere with Scientific GLSL Shader
    const globeRadius = 1.45; // Dominant planetary scale
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 96, 96);

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
      uniform float uHoverActive;
      uniform float uScrollProgress;

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
        for (int i = 0; i < 5; ++i) {
          v += a * noise(p);
          p *= 2.05;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 lightDir = normalize(uSunDirection);
        float diffuse = max(dot(normal, lightDir), 0.0);

        // Procedural geographic landmasses
        vec2 sphereUv = vUv * vec2(8.0, 4.0);
        float land = fbm(sphereUv);

        // Deep oceanic blue vs continental terrain
        vec3 oceanDeep = vec3(0.015, 0.035, 0.07);
        vec3 oceanShelf = vec3(0.025, 0.065, 0.11);
        vec3 landColor = vec3(0.065, 0.12, 0.14);
        vec3 highlands = vec3(0.12, 0.20, 0.22);
        vec3 coastGlow = vec3(0.08, 0.32, 0.40);

        vec3 surfaceColor = mix(oceanDeep, oceanShelf, smoothstep(0.3, 0.45, land));
        if (land > 0.45) {
          surfaceColor = mix(coastGlow, landColor, smoothstep(0.45, 0.52, land));
          surfaceColor = mix(surfaceColor, highlands, smoothstep(0.58, 0.72, land));
        }

        // --- PHASE 01.7: SCROLL-DRIVEN MODALITIES ---
        // 1. NDVI / Multispectral (Red/Infrared aesthetic)
        vec3 ndviColor = mix(vec3(0.05, 0.0, 0.15), vec3(0.8, 0.1, 0.2), smoothstep(0.4, 0.8, land));
        float ndviMix = smoothstep(0.4, 0.5, uScrollProgress) - smoothstep(0.5, 0.6, uScrollProgress);
        surfaceColor = mix(surfaceColor, ndviColor, max(0.0, ndviMix));

        // 2. SAR / Radar (Monochrome high-contrast texture)
        float sarNoise = noise(sphereUv * 20.0);
        vec3 sarColor = mix(vec3(0.1), vec3(0.8, 0.85, 0.9), sarNoise) * step(0.45, land);
        float sarMix = smoothstep(0.5, 0.6, uScrollProgress) - smoothstep(0.65, 0.75, uScrollProgress);
        surfaceColor = mix(surfaceColor, sarColor, max(0.0, sarMix));

        // 3. Change Detection / Data Grid
        float gridData = step(0.7, fract(vUv.x * 250.0)) * step(0.7, fract(vUv.y * 125.0));
        vec3 dataColor = vec3(1.0, 0.2, 0.3) * gridData * step(0.45, land);
        float dataMix = smoothstep(0.65, 0.85, uScrollProgress);
        surfaceColor = mix(surfaceColor, dataColor, max(0.0, dataMix));
        // --------------------------------------------

        // Faint Coordinate Grid Lines (Appears gently during hover/interaction)
        float latLines = step(0.985, fract(vUv.y * 18.0));
        float lonLines = step(0.985, fract(vUv.x * 36.0));
        float grid = max(latLines, lonLines) * (0.08 + uHoverActive * 0.12);
        surfaceColor += vec3(0.45, 0.90, 1.0) * grid;

        // Subtle night-side settlement illumination
        float night = 1.0 - diffuse;
        float nightFade = 1.0 - smoothstep(0.3, 0.5, uScrollProgress); // Turn off lights as we analyze data
        vec3 nightLights = vec3(0.55, 0.88, 1.0) * step(0.56, land) * night * 0.22 * nightFade;

        // Illumination
        vec3 finalColor = (surfaceColor * (diffuse * 0.92 + 0.14)) + nightLights;

        // Thin Rayleigh limb atmospheric glow
        vec3 viewDir = normalize(-vPosition);
        float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.5);
        finalColor += vec3(0.45, 0.85, 1.0) * fresnel * 0.55;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const earthMaterial = new THREE.ShaderMaterial({
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
      uniforms: {
        uSunDirection: { value: new THREE.Vector3(1.6, 0.7, 1.6).normalize() },
        uTime: { value: 0 },
        uHoverActive: { value: 0.0 },
        uScrollProgress: { value: 0.0 },
      },
    });

    const earthMesh = new THREE.Mesh(globeGeometry, earthMaterial);
    // Initial orientation: Center Asia/India
    earthMesh.rotation.y = 3.65;
    earthMesh.rotation.x = 0.32;
    scene.add(earthMesh);

    // 5. Delicate Atmospheric Outer Shell (Physical Rim Glow)
    const atmosphereGeometry = new THREE.SphereGeometry(globeRadius * 1.02, 64, 64);
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
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
          gl_FragColor = vec4(0.45, 0.88, 1.0, 1.0) * intensity * 0.38;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphereMesh);

    // 6. Selected Coordinate Reticle Marker on Globe Surface
    const markerGeometry = new THREE.RingGeometry(0.018, 0.032, 24);
    const markerMaterial = new THREE.MeshBasicMaterial({
      color: 0x73e6ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);

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

    // 7. Raycasting Setup for Live Pointer Coordinates on Earth
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    // Invert sphere coordinates to get exact mathematical latitude and longitude
    const getCoordinatesFromLocalIntersection = (localPoint: THREE.Vector3) => {
      const r = localPoint.length();
      const phi = Math.acos(Math.max(-1, Math.min(1, localPoint.y / r)));
      const lat = 90 - (phi * 180) / Math.PI;
      const theta = Math.atan2(localPoint.z, -localPoint.x);
      const lng = (theta * 180) / Math.PI - 180;
      return {
        latitude: Number(lat.toFixed(4)),
        longitude: Number(normalizeLongitude(lng).toFixed(4)),
      };
    };

    // 8. Interaction State & Damped Movement
    let isDragging = false;
    let hasDraggedSignificantly = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotationX = earthMesh.rotation.x;
    let targetRotationY = earthMesh.rotation.y;
    let targetCamZ = initialCamZ;
    let lastInteractionTime = Date.now();

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      isDragging = true;
      hasDraggedSignificantly = false;
      lastInteractionTime = Date.now();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousMouseX = clientX;
      previousMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      // Update normalized device coordinates for raycaster
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      // Raycast to check if pointer is over Earth surface
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(earthMesh);
      if (intersects.length > 0) {
        earthMaterial.uniforms.uHoverActive.value = 1.0;
        const localPoint = earthMesh.worldToLocal(intersects[0].point.clone());
        const coord = getCoordinatesFromLocalIntersection(localPoint);
        useWorkspaceStore.getState().setHoveredCoordinate(coord);
      } else {
        earthMaterial.uniforms.uHoverActive.value = 0.0;
        useWorkspaceStore.getState().setHoveredCoordinate(null);
      }

      if (isDragging && interactive) {
        lastInteractionTime = Date.now();
        const deltaX = clientX - previousMouseX;
        const deltaY = clientY - previousMouseY;

        if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
          hasDraggedSignificantly = true;
        }

        targetRotationY += deltaX * 0.004;
        targetRotationX += deltaY * 0.004;
        targetRotationX = Math.max(-1.1, Math.min(1.1, targetRotationX));

        previousMouseX = clientX;
        previousMouseY = clientY;
      }
    };

    const onPointerUp = (e: MouseEvent | TouchEvent) => {
      if (!hasDraggedSignificantly && interactive && !("touches" in e)) {
        // Physical selection click on Earth
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObject(earthMesh);
        if (intersects.length > 0) {
          const localPoint = earthMesh.worldToLocal(intersects[0].point.clone());
          const coord = getCoordinatesFromLocalIntersection(localPoint);
          const fullCoord = {
            latitude: coord.latitude,
            longitude: coord.longitude,
            label: "STUDY REGION",
          };

          useWorkspaceStore.getState().setSelectedLocation(fullCoord);
          if (onCoordinateSelect) {
            onCoordinateSelect(fullCoord);
          }

          updateMarkerPosition(coord.latitude, coord.longitude);

          // Subtly rotate Earth toward selected point
          const targetPhi = (90 - coord.latitude) * (Math.PI / 180);
          const targetTheta = (coord.longitude + 180) * (Math.PI / 180);
          targetRotationY = -(targetTheta - Math.PI / 2);
          targetRotationX = (targetPhi - Math.PI / 2);
        }
      }
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      if (!interactive) return;
      e.preventDefault();
      lastInteractionTime = Date.now();
      const zoomSpeed = 0.002;
      targetCamZ = Math.max(2.1, Math.min(5.5, targetCamZ + e.deltaY * zoomSpeed));
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    dom.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);
    dom.addEventListener("wheel", onWheel, { passive: false });

    // 9. Animation Loop with Parallax & Camera Damping
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const delta = clock.getDelta();
      earthMaterial.uniforms.uTime.value += delta;

      const p = scrollProgressGetter ? scrollProgressGetter() : 0;
      earthMaterial.uniforms.uScrollProgress.value = p;

      // Handle Continuous Orbit vs Camera Dive
      if (viewMode === "MAP") {
        // Dive toward surface
        targetCamZ = 1.48;
      } else {
        // Planetary cinematic dive driven by scroll timeline
        // 0.0 -> initialCamZ (3.6)
        // 0.85 -> 1.5
        targetCamZ = Math.max(1.5, initialCamZ - (p * 2.5));
      }

      // Smooth camera position interpolation
      camera.position.z += (targetCamZ - camera.position.z) * 0.06;

      // Slow planetary rotation if motion enabled and not dragging
      const idleTime = Date.now() - lastInteractionTime;
      if (rotationEnabled && !reducedMotion && idleTime > 2000 && !isDragging) {
        targetRotationY += 0.0006 + (p * 0.002); // Accelerate rotation as we scroll down
      }

      // Smooth rotational damping
      earthMesh.rotation.y += (targetRotationY - earthMesh.rotation.y) * 0.08;
      earthMesh.rotation.x += (targetRotationX - earthMesh.rotation.x) * 0.08;

      // Subtle reticle pulse
      const markerScale = 1.0 + Math.sin(Date.now() * 0.003) * 0.12;
      markerMesh.scale.set(markerScale, markerScale, 1);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 10. Resize Observer
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

    // 11. Complete Memory Cleanup
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
      starGeo.dispose();
      starMat.dispose();
      markerGeometry.dispose();
      markerMaterial.dispose();
      renderer.dispose();

      if (dom.parentNode) {
        dom.parentNode.removeChild(dom);
      }
    };
  }, [interactive, rotationEnabled, selectedCoordinate, reducedMotion, viewMode, onCoordinateSelect, webglError, scrollProgressGetter]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${interactive && !webglError ? 'cursor-grab active:cursor-grabbing' : ''} ${className || ""}`}
      role="region"
      aria-label="3D Interactive Planetary Earth Model"
    >
      {/* Dev Diagnostic Overlay */}
      {process.env.NODE_ENV !== "production" && diagnostics && (
        <div className="absolute top-4 right-4 z-50 bg-black/90 border border-space-faint p-4 font-mono text-[10px] text-space-white w-72 pointer-events-none">
          <div className="font-bold mb-2 text-cyan-accent border-b border-space-faint pb-1">WEBGL DIAGNOSTIC (DEV ONLY)</div>
          <div className="flex justify-between"><span>SUPPORTED:</span> <span>{diagnostics.supported ? "YES" : "NO"}</span></div>
          <div className="flex justify-between mt-1"><span>RENDERER:</span> <span className="text-right truncate ml-2" title={diagnostics.renderer}>{diagnostics.renderer}</span></div>
          <div className="flex justify-between mt-1"><span>VENDOR:</span> <span className="text-right truncate ml-2" title={diagnostics.vendor}>{diagnostics.vendor}</span></div>
          {webglError && (
            <div className="mt-2 text-red-500 font-bold whitespace-normal">
              ERROR: {webglError}
            </div>
          )}
          {containerRef.current && (
            <div className="mt-2 pt-2 border-t border-space-faint text-space-muted flex flex-col gap-1">
              <div className="flex justify-between"><span>CANVAS CSS:</span> <span>{containerRef.current.clientWidth}x{containerRef.current.clientHeight}</span></div>
              <div className="flex justify-between"><span>DPR:</span> <span>{typeof window !== "undefined" ? window.devicePixelRatio : 1}</span></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
