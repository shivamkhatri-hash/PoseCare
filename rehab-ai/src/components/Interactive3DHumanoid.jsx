import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function Interactive3DHumanoid() {
  const mountRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const sceneRefs = useRef({
    scene: null,
    camera: null,
    renderer: null,
    skeletonMaster: null,
    isDragging: false,
    prevMousePos: { x: 0, y: 0 },
    rotationY: 0.25,
    rotationX: 0.05,
    zoomDist: 4.6
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 520;

    // 1. Scene & Perspective Camera Setup (Optimized for full-height skeleton display)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0.05, sceneRefs.current.zoomDist);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting for Natural Cortical Ivory Bone Shading
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xdbeafe, 1.5);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffef5, 1.85);
    keyLight.position.set(3.5, 6.5, 4.5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 0.95);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x0d9488, 0.65);
    fillLight.position.set(0, -3.5, 2.5);
    scene.add(fillLight);

    // 4. Ground Studio Grid & Soft Ambient Occlusion Shadow
    const grid = new THREE.GridHelper(3.8, 16, 0x0d9488, 0xe2e8f0);
    grid.position.y = -1.95;
    scene.add(grid);

    const shadowGeo = new THREE.CircleGeometry(1.2, 32);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.10 });
    const groundShadow = new THREE.Mesh(shadowGeo, shadowMat);
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.y = -1.94;
    scene.add(groundShadow);

    // 5. Authentic Natural Ivory Bone Material
    const boneMat = new THREE.MeshStandardMaterial({
      color: 0xf7f2e6,
      roughness: 0.38,
      metalness: 0.08
    });

    // 6. Master Skeleton Group & GLTF Loader
    const skeletonMaster = new THREE.Group();
    skeletonMaster.position.set(0, 0.05, 0);
    scene.add(skeletonMaster);

    const loader = new GLTFLoader();
    loader.load(
      '/Skeleton.glb',
      (gltf) => {
        const model = gltf.scene;

        // Compute Bounding Box & Scale to fill ~85% of viewport height
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const targetHeight = 3.45;
        const scaleFactor = targetHeight / Math.max(size.y, 0.1);
        model.scale.set(scaleFactor, scaleFactor, scaleFactor);
        model.position.set(-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor);

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = boneMat.clone();
          }
        });

        skeletonMaster.add(model);
        sceneRefs.current.skeletonMaster = skeletonMaster;
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.warn('GLTF load fallback:', error);
        setIsLoading(false);
      }
    );

    sceneRefs.current = {
      ...sceneRefs.current,
      scene,
      camera,
      renderer,
      skeletonMaster
    };

    // 7. Interactive 360° Mouse & Touch Drag Controls
    const handleMouseDown = (e) => {
      sceneRefs.current.isDragging = true;
      sceneRefs.current.prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!sceneRefs.current.isDragging) return;
      const deltaX = e.clientX - sceneRefs.current.prevMousePos.x;
      const deltaY = e.clientY - sceneRefs.current.prevMousePos.y;

      sceneRefs.current.rotationY += deltaX * 0.011;
      sceneRefs.current.rotationX = Math.max(-0.45, Math.min(0.45, sceneRefs.current.rotationX + deltaY * 0.007));
      sceneRefs.current.prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      sceneRefs.current.isDragging = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      sceneRefs.current.zoomDist = Math.max(2.4, Math.min(7.5, sceneRefs.current.zoomDist + e.deltaY * 0.003));
      camera.position.z = sceneRefs.current.zoomDist;
    };

    const canvasEl = renderer.domElement;
    canvasEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvasEl.addEventListener('wheel', handleWheel, { passive: false });

    const handleTouchStart = (e) => {
      if (e.touches.length === 0) return;
      sceneRefs.current.isDragging = true;
      sceneRefs.current.prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchMove = (e) => {
      if (!sceneRefs.current.isDragging || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - sceneRefs.current.prevMousePos.x;
      const deltaY = e.touches[0].clientY - sceneRefs.current.prevMousePos.y;
      sceneRefs.current.rotationY += deltaX * 0.011;
      sceneRefs.current.rotationX = Math.max(-0.45, Math.min(0.45, sceneRefs.current.rotationX + deltaY * 0.007));
      sceneRefs.current.prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    canvasEl.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    // 8. 60 FPS Render Loop (Smooth Gentle Auto-Orbit + Mouse Drag)
    let animId;
    let lastTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const currentTime = performance.now();
      const delta = Math.min(0.1, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      // Gentle continuous ambient auto-orbit when not actively dragging
      if (!sceneRefs.current.isDragging) {
        sceneRefs.current.rotationY += delta * 0.28;
      }
      skeletonMaster.rotation.y = sceneRefs.current.rotationY;
      skeletonMaster.rotation.x = sceneRefs.current.rotationX;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvasEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvasEl.removeEventListener('wheel', handleWheel);
      canvasEl.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] sm:h-[540px] rounded-3xl bg-gradient-to-b from-slate-50/90 via-white to-slate-100/60 border border-slate-200/90 shadow-xl overflow-hidden cursor-grab active:cursor-grabbing">
      <div ref={mountRef} className="w-full h-full" />

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center gap-2 text-xs font-bold text-slate-600">
          <span className="animate-spin text-lg">⚙️</span> Loading 3D Skeleton...
        </div>
      )}

      {/* Subtle Bottom Interaction Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/75 backdrop-blur text-white text-[10px] font-semibold px-4 py-1.5 rounded-full pointer-events-none select-none flex items-center gap-2 shadow-md">
        <span>🖱️ Drag with Mouse to Rotate in 3D</span>
        <span>•</span>
        <span>Scroll to Zoom</span>
      </div>
    </div>
  );
}
