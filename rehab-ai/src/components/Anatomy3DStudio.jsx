import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// ============================================================================
// 1. ANATOMICAL CATALOG & CLINICAL PATHOLOGY DEFINITIONS
// ============================================================================
export const ANATOMY_MODELS = [
  {
    id: 'skeleton',
    name: 'Full Human Skeleton',
    icon: '🩻',
    category: 'Full-Body Osteology',
    badge: '206+ Anatomical Bones',
    glbFile: '/Skeleton.glb',
    targetHeight: 3.4,
    structures: ['Cranium & Mandible', 'Spinal Column (C1-L5)', 'Thoracic Ribcage (1-12) & Sternum', 'Pelvis & Sacrum', 'Upper Limbs (Humerus, Radius, Ulna)', 'Lower Limbs (Femur, Tibia, Fibula, Feet)'],
    exercises: [
      { id: 'squat', name: 'Bilateral Squat Flexion', minAngle: 45, maxAngle: 140, defaultAngle: 90, target: '90° - 135°', metric: 'Knee & Hip Flexion' },
      { id: 'bicep', name: 'Bicep Arm Flexion', minAngle: 20, maxAngle: 150, defaultAngle: 90, target: '45° - 85°', metric: 'Elbow Humeroulnar' },
      { id: 'shoulder', name: 'Shoulder Overhead Abduction', minAngle: 15, maxAngle: 175, defaultAngle: 120, target: '150° - 170°', metric: 'Glenohumeral Abduction' },
      { id: 'neutral', name: 'Anatomical Neutral Stance', minAngle: 170, maxAngle: 180, defaultAngle: 180, target: '180° Neutral', metric: 'Postural Plumb Line' }
    ]
  },
  {
    id: 'knee',
    name: 'Detailed Knee Joint Complex',
    icon: '🦵',
    category: 'Lower Extremity Articulation',
    badge: 'Femur • Tibia • Patella • Meniscus',
    glbFile: '/Joints.glb',
    targetHeight: 3.2,
    structures: ['Distal Femoral Condyles & Trochlea', 'Proximal Tibial Plateau & Tuberosity', 'Fibula Head & Neck', 'Patella (Kneecap)', 'Cruciate Ligaments (ACL / PCL)', 'Collateral Ligaments (MCL / LCL)', 'Medial & Lateral Meniscus Pads'],
    exercises: [
      { id: 'knee_flexion', name: 'Active Knee Flexion', minAngle: 0, maxAngle: 145, defaultAngle: 90, target: '90° - 135°', metric: 'Tibiofemoral ROM' },
      { id: 'terminal_ext', name: 'Terminal Knee Extension', minAngle: 0, maxAngle: 25, defaultAngle: 10, target: '0° - 10°', metric: 'Vastus Medialis Loading' },
      { id: 'isometric_hold', name: 'Isometric Knee Hold (90°)', minAngle: 80, maxAngle: 100, defaultAngle: 90, target: '90° Hold', metric: 'Patellar Tendon Stress' }
    ]
  },
  {
    id: 'shoulder',
    name: 'Shoulder Girdle (Glenohumeral)',
    icon: '💪',
    category: 'Upper Extremity Articulation',
    badge: 'Glenoid • Clavicle • Humerus',
    glbFile: '/Joints.glb',
    targetHeight: 3.2,
    structures: ['Humeral Head & Greater Tubercle', 'Scapular Glenoid Fossa & Acromion', 'Coracoid Process & Clavicle', 'Rotator Cuff (Supraspinatus Tendon)', 'Subacromial Bursa & Labrum', 'Glenohumeral Joint Capsule'],
    exercises: [
      { id: 'scaption', name: 'Scapular Plane Elevation', minAngle: 0, maxAngle: 175, defaultAngle: 120, target: '150° - 170°', metric: 'Supraspinatus Clearance' },
      { id: 'abduction', name: 'Lateral Arm Abduction', minAngle: 0, maxAngle: 180, defaultAngle: 90, target: '90° - 160°', metric: 'Acromial Subluxation Index' },
      { id: 'rotation', name: 'External / Internal Rotation', minAngle: -45, maxAngle: 90, defaultAngle: 45, target: '45° - 85°', metric: 'Infraspinatus Glide' }
    ]
  },
  {
    id: 'hip',
    name: 'Pelvic Acetabulofemoral Joint',
    icon: '🩻',
    category: 'Core & Pelvic Girdle',
    badge: 'Ilium • Acetabulum • Femur',
    glbFile: '/Joints.glb',
    targetHeight: 3.2,
    structures: ['Iliac Wing & Iliac Crest', 'Acetabular Fossa & Fibrocartilage Labrum', 'Femoral Head & Angled Neck (125°)', 'Greater & Lesser Trochanters', 'Pubic Symphysis & Ischial Spine', 'Iliofemoral Ligament of Bigelow'],
    exercises: [
      { id: 'hip_flexion', name: 'Sagittal Hip Flexion', minAngle: 0, maxAngle: 125, defaultAngle: 75, target: '90° - 120°', metric: 'Iliopsoas & Rectus Femoris' },
      { id: 'hip_abduction', name: 'Standing Hip Abduction', minAngle: 0, maxAngle: 50, defaultAngle: 35, target: '35° - 45°', metric: 'Gluteus Medius Activation' },
      { id: 'hip_extension', name: 'Posterior Hip Extension', minAngle: 0, maxAngle: 30, defaultAngle: 15, target: '15° - 25°', metric: 'Gluteus Maximus Drive' }
    ]
  },
  {
    id: 'elbow',
    name: 'Elbow Joint (Humeroulnar)',
    icon: '🏋️',
    category: 'Upper Extremity Articulation',
    badge: 'Trochlea • Olecranon • Radius',
    glbFile: '/Joints.glb',
    targetHeight: 3.2,
    structures: ['Distal Humeral Trochlea & Capitulum', 'Medial & Lateral Epicondyles', 'Ulna with Olecranon Beak Process', 'Radial Head & Annular Ligament Ring', 'Ulnar Collateral Ligament (UCL)', 'Bicipital Tuberosity'],
    exercises: [
      { id: 'elbow_flex', name: 'Elbow Flexion Arc', minAngle: 0, maxAngle: 150, defaultAngle: 90, target: '45° - 85° Flexion', metric: 'Humeroulnar Glide' },
      { id: 'pronation', name: 'Forearm Pronation / Supination', minAngle: -85, maxAngle: 85, defaultAngle: 0, target: '-80° to +80°', metric: 'Radioulnar Rotation' }
    ]
  },
  {
    id: 'spine',
    name: 'Segmented Human Vertebral Column',
    icon: '🧘',
    category: 'Axial Skeletal Kinematics',
    badge: 'Cervical • Thoracic • Lumbar',
    glbFile: '/Skeleton.glb',
    targetHeight: 3.4,
    structures: ['C1 Atlas & C2 Axis Cervical Vertebrae', 'T1-T12 Thoracic Spine with Costal Facets', 'L1-L5 Lumbar Vertebrae & Spinous Processes', '23 Intervertebral Discs (Annulus & Nucleus)', 'Sacrum & Coccyx Base', 'Ligamentum Flavum & Canal'],
    exercises: [
      { id: 'spine_flex', name: 'Lumbar Sagittal Flexion', minAngle: 0, maxAngle: 65, defaultAngle: 30, target: '0° - 50° Safe Zone', metric: 'L4-L5 Disc Shear Pressure' },
      { id: 'lateral_bend', name: 'Coronal Lateral Bending', minAngle: -35, maxAngle: 35, defaultAngle: 0, target: '-25° to +25°', metric: 'Facet Joint Glide' },
      { id: 'neutral_spine', name: 'Neutral Axial Decompression', minAngle: 0, maxAngle: 10, defaultAngle: 0, target: '0° Neutral', metric: 'Lordotic Curvature Index' }
    ]
  },
  {
    id: 'muscular',
    name: 'Muscular System & Biomechanics',
    icon: '⚡',
    category: 'Superficial Musculoskeletal',
    badge: '1000+ Myofascial Meshes',
    glbFile: '/Muscles.glb',
    targetHeight: 3.4,
    structures: ['Quadriceps Femoris (Rectus, Vastus Medialis)', 'Hamstrings (Biceps Femoris, Semitendinosus)', 'Deltoids (Anterior, Lateral, Posterior)', 'Biceps Brachii & Brachioradialis', 'Pectoralis Major & Rectus Abdominis', 'Gluteal Complex & Gastrocnemius (Calf)'],
    exercises: [
      { id: 'quad_fire', name: 'Quadriceps Isometric Loading', minAngle: 0, maxAngle: 135, defaultAngle: 90, target: '92% Peak Myo', metric: 'Vastus Medialis Oblique (VMO)' },
      { id: 'deltoid_press', name: 'Overhead Deltoid Contraction', minAngle: 0, maxAngle: 170, defaultAngle: 120, target: '88% Peak Myo', metric: 'Anterior & Medial Deltoid' },
      { id: 'bicep_curl', name: 'Biceps Brachii Peak Contraction', minAngle: 20, maxAngle: 150, defaultAngle: 85, target: '96% Peak Myo', metric: 'Biceps Short & Long Head' }
    ]
  }
];

export const VIEW_PRESETS = {
  front: { name: 'Front View (AP)', rotY: 0, rotX: 0, dist: 4.8 },
  back: { name: 'Back View (PA)', rotY: Math.PI, rotX: 0, dist: 4.8 },
  left: { name: 'Left Lateral', rotY: -Math.PI / 2, rotX: 0, dist: 4.8 },
  right: { name: 'Right Lateral', rotY: Math.PI / 2, rotX: 0, dist: 4.8 },
  isometric: { name: '3D Isometric', rotY: 0.35, rotX: 0.08, dist: 5.0 }
};

export default function Anatomy3DStudio({
  initialModel = 'skeleton',
  initialExercise = 'squat',
  onMetricChange = null
}) {
  const mountRef = useRef(null);

  // Studio State
  const [activeModelId, setActiveModelId] = useState(initialModel);
  const activeModel = useMemo(() => ANATOMY_MODELS.find(m => m.id === activeModelId) || ANATOMY_MODELS[0], [activeModelId]);

  const [activeExerciseId, setActiveExerciseId] = useState(activeModel.exercises[0].id);
  const activeExercise = useMemo(() => activeModel.exercises.find(e => e.id === activeExerciseId) || activeModel.exercises[0], [activeModel, activeExerciseId]);

  // View & Rendering Options
  const [renderMode, setRenderMode] = useState('bone'); // 'bone' | 'xray' | 'wireframe' | 'cartilage'
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Manual ROM Angle Control Slider (in degrees)
  const [manualAngle, setManualAngle] = useState(activeExercise.defaultAngle);
  const [isManualControl, setIsManualControl] = useState(false);

  // Clickable Highlighted Part
  const [selectedPartName, setSelectedPartName] = useState(null);

  useEffect(() => {
    setActiveExerciseId(activeModel.exercises[0].id);
    setManualAngle(activeModel.exercises[0].defaultAngle);
    setSelectedPartName(null);
  }, [activeModelId]);

  useEffect(() => {
    setManualAngle(activeExercise.defaultAngle);
  }, [activeExerciseId]);

  // Three.js Scene References
  const sceneState = useRef({
    scene: null,
    camera: null,
    renderer: null,
    rootGroup: null,
    loadedModel: null,
    boneMeshes: {},
    isDragging: false,
    prevMouse: { x: 0, y: 0 },
    rotY: 0.35,
    rotX: 0.08,
    zoomDist: 5.0
  });

  // ==========================================================================
  // 2. THREE.JS GLTF MEDICAL MODEL LOADER & RENDER LOOP
  // ==========================================================================
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    setIsLoading(true);
    const width = container.clientWidth || 540;
    const height = container.clientHeight || 460;

    // A. Setup Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.05, sceneState.current.zoomDist);

    // B. Setup High-Precision WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // C. Studio Medical Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xdfe7ee, 1.45);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffef6, 1.8);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 1.0);
    rimLight.position.set(-4, 3.5, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x0d9488, 0.75);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    // D. Ground Studio Grid
    const grid = new THREE.GridHelper(3.8, 16, 0x0d9488, 0xe2e8f0);
    grid.position.y = -1.95;
    scene.add(grid);

    const shadowGeo = new THREE.CircleGeometry(1.25, 32);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.08 });
    const groundShadow = new THREE.Mesh(shadowGeo, shadowMat);
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.y = -1.94;
    scene.add(groundShadow);

    // E. Material Setup
    const isXray = renderMode === 'xray';
    const isWire = renderMode === 'wireframe';
    const isCart = renderMode === 'cartilage';

    const boneMat = new THREE.MeshStandardMaterial({
      color: isXray ? 0x38bdf8 : isCart ? 0x0d9488 : 0xf6f0e2,
      roughness: isXray ? 0.2 : 0.38,
      metalness: isXray ? 0.35 : 0.08,
      wireframe: isWire,
      transparent: isXray || isCart,
      opacity: isXray ? 0.85 : isCart ? 0.45 : 1.0,
      emissive: isXray ? 0x0284c7 : isCart ? 0x0d9488 : 0x000000,
      emissiveIntensity: isXray ? 0.45 : isCart ? 0.4 : 0.0
    });

    const rootGroup = new THREE.Group();
    rootGroup.position.set(0, 0.05, 0);
    scene.add(rootGroup);

    const boneMeshMap = {};

    // F. Load Medical GLB Model Asset
    const loader = new GLTFLoader();
    loader.load(
      activeModel.glbFile,
      (gltf) => {
        const model = gltf.scene;

        // Compute Bounding Box & Scale to 80% Viewer Height
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const targetH = activeModel.targetHeight || 3.4;
        const scaleFactor = targetH / Math.max(size.y, 0.1);
        model.scale.set(scaleFactor, scaleFactor, scaleFactor);
        model.position.set(-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor);

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = boneMat.clone();
            if (child.name) {
              boneMeshMap[child.name] = child;
            }
          }
        });

        rootGroup.add(model);
        sceneState.current.loadedModel = model;
        sceneState.current.boneMeshes = boneMeshMap;
        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.warn('Failed loading GLTF model:', err);
        setIsLoading(false);
      }
    );

    // Save references
    sceneState.current = {
      ...sceneState.current,
      scene,
      camera,
      renderer,
      rootGroup
    };

    // G. Mouse & Touch Controls
    const handleMouseDown = (e) => {
      sceneState.current.isDragging = true;
      sceneState.current.prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!sceneState.current.isDragging) return;
      const dx = e.clientX - sceneState.current.prevMouse.x;
      const dy = e.clientY - sceneState.current.prevMouse.y;

      sceneState.current.rotY += dx * 0.011;
      sceneState.current.rotX = Math.max(-0.45, Math.min(0.45, sceneState.current.rotX + dy * 0.007));
      sceneState.current.prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      sceneState.current.isDragging = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      sceneState.current.zoomDist = Math.max(2.2, Math.min(8.0, sceneState.current.zoomDist + e.deltaY * 0.003));
      camera.position.z = sceneState.current.zoomDist;
    };

    const canvasEl = renderer.domElement;
    canvasEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvasEl.addEventListener('wheel', handleWheel, { passive: false });

    const handleTouchStart = (e) => {
      if (e.touches.length === 0) return;
      sceneState.current.isDragging = true;
      sceneState.current.prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchMove = (e) => {
      if (!sceneState.current.isDragging || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - sceneState.current.prevMouse.x;
      const dy = e.touches[0].clientY - sceneState.current.prevMouse.y;
      sceneState.current.rotY += dx * 0.011;
      sceneState.current.rotX = Math.max(-0.45, Math.min(0.45, sceneState.current.rotX + dy * 0.007));
      sceneState.current.prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    canvasEl.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    // H. 60 FPS Render Loop
    let animId;
    let lastTime = performance.now();
    let totalElapsed = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const currentTime = performance.now();
      const delta = Math.min(0.1, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      // Auto-Orbit
      if (isAutoRotate && !sceneState.current.isDragging) {
        sceneState.current.rotY += delta * 0.35;
      }
      rootGroup.rotation.y = sceneState.current.rotY;
      rootGroup.rotation.x = sceneState.current.rotX;

      // Kinematic ROM Angle
      if (isPlaying && !isManualControl) {
        totalElapsed += delta * playbackSpeed;
        const cycle = (Math.sin(totalElapsed * 2.2) + 1) / 2;
        const range = activeExercise.maxAngle - activeExercise.minAngle;
        const currentAngleDeg = Math.round(activeExercise.minAngle + cycle * range);
        setManualAngle(currentAngleDeg);
      }

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
  }, [activeModelId, activeExerciseId, renderMode, isPlaying, playbackSpeed, isAutoRotate, isManualControl]);

  // View Preset Controls
  const applyViewPreset = (presetKey) => {
    const preset = VIEW_PRESETS[presetKey];
    if (!preset) return;
    sceneState.current.rotY = preset.rotY;
    sceneState.current.rotX = preset.rotX;
    sceneState.current.zoomDist = preset.dist;
    if (sceneState.current.camera) {
      sceneState.current.camera.position.z = preset.dist;
    }
  };

  const handleZoom = (delta) => {
    sceneState.current.zoomDist = Math.max(2.2, Math.min(8.0, sceneState.current.zoomDist + delta));
    if (sceneState.current.camera) {
      sceneState.current.camera.position.z = sceneState.current.zoomDist;
    }
  };

  const handleResetCamera = () => {
    applyViewPreset('isometric');
    setIsAutoRotate(false);
  };

  const romStatus = useMemo(() => {
    const targetMin = activeExercise.minAngle + (activeExercise.maxAngle - activeExercise.minAngle) * 0.4;
    const targetMax = activeExercise.maxAngle;
    if (manualAngle >= targetMin && manualAngle <= targetMax) {
      return { label: 'Optimal Recovery ROM', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500' };
    } else if (manualAngle < targetMin) {
      return { label: 'Sub-Target Flexion', color: 'text-amber-700 bg-amber-50 border-amber-200', dot: 'bg-amber-500' };
    } else {
      return { label: 'Terminal Limit Alert', color: 'text-rose-700 bg-rose-50 border-rose-200', dot: 'bg-rose-500' };
    }
  }, [manualAngle, activeExercise]);

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden font-sans">
      
      {/* 1. TOP HEADER & MODEL SELECTOR TABS */}
      <div className="bg-slate-900 text-white px-5 py-4 border-b border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center text-lg shadow-inner">
              {activeModel.icon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black tracking-tight text-white">{activeModel.name}</h2>
                <span className="text-[10px] font-mono font-bold text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded-full border border-teal-800/60">
                  {activeModel.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">{activeModel.category} • Authentic Medical 3D Asset</p>
            </div>
          </div>

          {/* Quick View Presets */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 px-2">Views:</span>
            {Object.keys(VIEW_PRESETS).map((key) => (
              <button
                key={key}
                onClick={() => applyViewPreset(key)}
                className="px-2.5 py-1 rounded-xl font-bold bg-slate-900/60 hover:bg-teal-600 hover:text-white text-slate-300 transition-all border border-slate-700/60 hover:border-teal-500"
              >
                {key.toUpperCase()}
              </button>
            ))}
            <div className="h-4 w-px bg-slate-700 mx-1"></div>
            <button
              onClick={() => handleZoom(-0.6)}
              className="px-2 py-1 bg-slate-900/60 hover:bg-slate-700 text-slate-300 font-bold rounded-xl border border-slate-700"
              title="Zoom In"
            >
              🔍 +
            </button>
            <button
              onClick={() => handleZoom(0.6)}
              className="px-2 py-1 bg-slate-900/60 hover:bg-slate-700 text-slate-300 font-bold rounded-xl border border-slate-700"
              title="Zoom Out"
            >
              🔍 -
            </button>
            <button
              onClick={handleResetCamera}
              className="px-2.5 py-1 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-xs"
              title="Reset Camera Orientation"
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* Anatomical Model Selection Strip (7 Clinical Models) */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3.5 pb-1 scrollbar-thin scrollbar-thumb-slate-700">
          {ANATOMY_MODELS.map((model) => {
            const isSelected = activeModelId === model.id;
            return (
              <button
                key={model.id}
                onClick={() => setActiveModelId(model.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-md shadow-teal-500/20 font-black scale-[1.02]'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span className="text-sm">{model.icon}</span>
                <span>{model.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN 3D STUDIO WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 bg-slate-50/50">
        
        {/* LEFT COLUMN: MODEL CONTROLS & EXERCISE SELECTION */}
        <div className="lg:col-span-3 space-y-4">
          
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Rehabilitation Exercise</h3>
            <div className="space-y-1.5">
              {activeModel.exercises.map((ex) => {
                const isSelected = activeExerciseId === ex.id;
                return (
                  <button
                    key={ex.id}
                    onClick={() => {
                      setActiveExerciseId(ex.id);
                      setIsManualControl(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-teal-50 text-teal-900 border-teal-300 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{ex.name}</span>
                      <span className="text-[10px] font-mono text-teal-700 font-semibold">{ex.target}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Manual Interactive ROM Slider */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Manual ROM Drive</h3>
              <span className="text-xs font-mono font-black text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                {manualAngle}°
              </span>
            </div>

            <input
              type="range"
              min={activeExercise.minAngle}
              max={activeExercise.maxAngle}
              value={manualAngle}
              onChange={(e) => {
                setIsManualControl(true);
                setIsPlaying(false);
                setManualAngle(Number(e.target.value));
              }}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />

            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono font-bold">
              <span>Min: {activeExercise.minAngle}°</span>
              <span>Target: {activeExercise.target}</span>
              <span>Max: {activeExercise.maxAngle}°</span>
            </div>

            <div className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${romStatus.color}`}>
              <span className={`w-2 h-2 rounded-full ${romStatus.dot} animate-pulse`}></span>
              <span>{romStatus.label}</span>
            </div>
          </div>

          {/* Diagnostic Shading Mode */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Diagnostic Shading</h3>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
              <button
                onClick={() => setRenderMode('bone')}
                className={`py-2 px-2.5 rounded-xl border transition-all ${
                  renderMode === 'bone' ? 'bg-slate-900 text-white border-slate-900 shadow-xs' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🩻 Ivory Bone
              </button>
              <button
                onClick={() => setRenderMode('xray')}
                className={`py-2 px-2.5 rounded-xl border transition-all ${
                  renderMode === 'xray' ? 'bg-sky-600 text-white border-sky-500 shadow-xs' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ⚡ X-Ray Blue
              </button>
              <button
                onClick={() => setRenderMode('cartilage')}
                className={`py-2 px-2.5 rounded-xl border transition-all ${
                  renderMode === 'cartilage' ? 'bg-teal-600 text-white border-teal-500 shadow-xs' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🔬 Soft Tissue
              </button>
              <button
                onClick={() => setRenderMode('wireframe')}
                className={`py-2 px-2.5 rounded-xl border transition-all ${
                  renderMode === 'wireframe' ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                📐 CAD Mesh
              </button>
            </div>
          </div>

          {/* Baseline vs Current Progress Comparison */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900">Rehab Progress Comparison</span>
              <button
                onClick={() => setIsComparisonMode(!isComparisonMode)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all border ${
                  isComparisonMode ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                {isComparisonMode ? 'ON' : 'OFF'}
              </button>
            </div>
            {isComparisonMode && (
              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between font-medium text-slate-500">
                  <span>Pre-Rehab Baseline:</span>
                  <span className="font-bold text-slate-700">62° ROM</span>
                </div>
                <div className="flex justify-between font-medium text-teal-700">
                  <span>Current Active Session:</span>
                  <span className="font-black font-mono">{manualAngle}° ROM</span>
                </div>
                <div className="bg-teal-50 border border-teal-200 p-2 rounded-xl text-[11px] font-bold text-teal-900 text-center">
                  +{Math.max(0, manualAngle - 62)}° Functional Gain ({Math.round(((manualAngle - 62) / 62) * 100)}%)
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CENTER COLUMN: INTERACTIVE 3D WEBGL VIEWPORT */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          
          <div className={`relative w-full h-[420px] sm:h-[480px] rounded-3xl border border-slate-200/90 overflow-hidden cursor-grab active:cursor-grabbing shadow-inner transition-colors duration-500 ${
            renderMode === 'xray'
              ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-sky-950'
              : 'bg-gradient-to-b from-slate-50/90 via-white to-slate-100/60'
          }`}>
            <div ref={mountRef} className="w-full h-full" />

            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center gap-2 text-xs font-bold text-slate-600">
                <span className="animate-spin text-lg">⚙️</span> Loading Medical 3D Asset ({activeModel.badge})...
              </div>
            )}

            {/* Live Goniometric Telemetry Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur border border-slate-200/90 px-4 py-2.5 rounded-2xl shadow-lg">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">Live Kinematic Angle</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black font-mono text-teal-600">{manualAngle}°</span>
                <span className="text-xs font-bold text-slate-500 font-sans">ROM</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">{activeExercise.metric}</p>
            </div>

            {/* Viewport Playback & Orbit Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 backdrop-blur p-1.5 rounded-2xl border border-slate-200 shadow-md text-xs">
              <button
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  setIsManualControl(false);
                }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl"
                title={isPlaying ? 'Pause Kinematics' : 'Play Kinematics'}
              >
                {isPlaying ? '⏸ Pause' : '▶ Play'}
              </button>
              <button
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                className={`px-2.5 py-1 font-bold rounded-xl transition-all ${
                  isAutoRotate ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title="Toggle 360° Auto-Orbit"
              >
                🔄 360°
              </button>
              <button
                onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 0.5 : 1)}
                className="px-2 py-1 bg-slate-100 text-slate-700 font-bold rounded-xl"
              >
                {playbackSpeed}x
              </button>
            </div>

            {/* Guidance Overlay */}
            <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur text-white text-[10px] font-semibold px-3 py-1.5 rounded-full pointer-events-none select-none flex items-center gap-1.5">
              <span>🖱️ Drag to Orbit 360°</span>
              <span>•</span>
              <span>Scroll to Zoom</span>
            </div>

            {/* Clinical Target Card */}
            <div className="absolute bottom-3 right-3 max-w-[210px] bg-white/95 backdrop-blur border border-teal-200/80 p-3 rounded-2xl shadow-xl space-y-1">
              <span className="text-[10px] font-black uppercase text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                {activeExercise.name}
              </span>
              <p className="text-xs font-black text-slate-900 truncate">{activeModel.name}</p>
              <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-teal-600">
                <span>Target ROM:</span>
                <span>{activeExercise.target}</span>
              </div>
            </div>
          </div>

          {/* Model Structural Summary */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-2">
              <strong className="text-slate-900">Anatomical Focus:</strong> {activeModel.badge}
            </span>
            <span className="text-[11px] font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
              60 FPS GPU Kinematics
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: CLINICAL ANATOMY DETAILS & METRICS */}
        <div className="lg:col-span-3 space-y-4">
          
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Anatomical Components</h3>
            <div className="space-y-1.5">
              {activeModel.structures.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPartName(item)}
                  className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-2 ${
                    selectedPartName === item
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Kinematic Telemetry */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Kinematic Telemetry</h3>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Kinematic Axis:</span>
                <span className="font-bold text-slate-800">Sagittal / Coronal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Coordinate System:</span>
                <span className="font-bold text-slate-800">Three.js Local TRS</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Bone Load Factor:</span>
                <span className="font-bold text-teal-600">94.8% Safe</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">WASM Engine:</span>
                <span className="font-mono font-bold text-slate-700">1-Euro Adaptive</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="bg-teal-50 border border-teal-200 p-3 rounded-xl space-y-1">
                <p className="text-[11px] font-black text-teal-900">Clinical Governance Notice</p>
                <p className="text-[10px] text-teal-800 leading-relaxed font-medium">
                  3D goniometric ranges calibrated against standard Orthopedic & Physiotherapy norms (SIH26196).
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
