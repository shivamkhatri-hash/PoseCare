import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PoseCareLogo from '../components/PoseCareLogo';
import { authStorage } from '../utils/authStorage';
import { useLanguage } from '../context/LanguageContext';
import Interactive3DHumanoid from '../components/Interactive3DHumanoid';

const BIO_GAMES = [
  {
    id: 'zen',
    name: 'Zen Bloom Garden',
    category: 'Isometric Holds & Tendon Loading',
    desc: 'Grow lush procedural botanical gardens as you maintain strict isometric hold angles.',
    icon: '🌸',
    badge: 'Hold Endurance',
    accent: 'text-rose-600 bg-rose-50 border-rose-200'
  },
  {
    id: 'flappy',
    name: 'Flappy Rehab Flight',
    category: 'Dynamic Flexion & Velocity Control',
    desc: 'Control flight altitude with rhythmic joint flexion arcs to glide through clinical rings.',
    icon: '🕊️',
    badge: 'Dynamic ROM',
    accent: 'text-sky-600 bg-sky-50 border-sky-200'
  },
  {
    id: 'mannequin',
    name: '3D Hologram Mannequin',
    category: 'Spatial Anatomical Inspection',
    desc: 'Full 360-degree spatial skeleton viewer mapping your real-time 33 body coordinates.',
    icon: '🤖',
    badge: '3D Biomechanics',
    accent: 'text-cyan-600 bg-cyan-50 border-cyan-200'
  },
  {
    id: 'shadow',
    name: 'Posture Shadow Match',
    category: 'Proprioceptive Alignment',
    desc: 'Match target clinical postures and shadow silhouettes to correct bad kinetic compensations.',
    icon: '👥',
    badge: 'Spinal Alignment',
    accent: 'text-amber-600 bg-amber-50 border-amber-200'
  },
  {
    id: 'beat',
    name: 'BeatRehab Rhythm',
    category: 'Cadence & Velocity Control',
    desc: 'Slice rhythmic rehabilitation targets matching strict repetition tempo and eccentric control.',
    icon: '🎵',
    badge: 'Neuromuscular',
    accent: 'text-purple-600 bg-purple-50 border-purple-200'
  },
  {
    id: 'standard',
    name: 'Clinical Goniometer',
    category: 'Hospital-Grade Diagnostics',
    desc: 'Sub-degree digital goniometric overlay with 1-Euro adaptive smoothing and clinical bounds.',
    icon: '🩺',
    badge: 'Clinical Telemetry',
    accent: 'text-teal-600 bg-teal-50 border-teal-200'
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const user = authStorage.getUser();
  const token = authStorage.getToken();
  const targetRoute = user && token ? authStorage.getRolePath(user.role) : '/auth';
  const { t } = useLanguage();

  const [activeGovernanceTab, setActiveGovernanceTab] = useState('patient');
  const [activeGameId, setActiveGameId] = useState('zen');

  // Interactive Sandbox state
  const [interactiveSimAngle, setInteractiveSimAngle] = useState(85);
  const [liveSimReps, setLiveSimReps] = useState(8);

  const handleSliderChange = (newVal) => {
    setInteractiveSimAngle(newVal);
    if (newVal <= 88 && interactiveSimAngle > 88) {
      setLiveSimReps((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (CLEAN WHITE THEME + TRUE 3D WEBGL MANNEQUIN)             */}
      {/* ========================================================================= */}
      <section className="relative bg-white border-b border-slate-200/80 pt-12 pb-20 overflow-hidden">
        {/* Soft Ambient Background Blobs */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-teal-50/70 rounded-full blur-3xl -z-10 translate-x-32 -translate-y-24"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/60 rounded-full blur-3xl -z-10 -translate-x-28 translate-y-24"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Column: Hero Pitch & Value Props */}
            <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                <span>Clinical Computer Vision & Biomechanical Diagnostics</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight">
                Intelligent Biomechanics for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600">
                  Precision Rehabilitation.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Empowering orthopedic clinicians and patients with real-time kinematic angle tracking, sub-degree digital goniometry, and prescription-aligned therapeutic biofeedback—executed entirely on-device with zero cloud video latency.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                <Link
                  to={targetRoute}
                  className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span>{user && token ? 'Go to Active Clinical Portal' : 'Begin Clinical Assessment'}</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              {/* Verified Metric Tiles */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100 max-w-lg mx-auto lg:mx-0">
                <div className="bg-slate-50/80 border border-slate-200/80 p-3.5 rounded-2xl text-center shadow-xs">
                  <p className="text-base font-black text-teal-600">±1.5°</p>
                  <p className="text-[11px] text-slate-500 font-semibold">ROM Angle Precision</p>
                </div>
                <div className="bg-slate-50/80 border border-slate-200/80 p-3.5 rounded-2xl text-center shadow-xs">
                  <p className="text-base font-black text-cyan-600">Real-Time</p>
                  <p className="text-[11px] text-slate-500 font-semibold">Voice & Biofeedback</p>
                </div>
                <div className="bg-slate-50/80 border border-slate-200/80 p-3.5 rounded-2xl text-center shadow-xs">
                  <p className="text-base font-black text-emerald-600">100%</p>
                  <p className="text-[11px] text-slate-500 font-semibold">Private & On-Device</p>
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity 3D WebGL Volumetric Humanoid */}
            <div className="lg:w-1/2 w-full max-w-xl">
              <Interactive3DHumanoid selectedExercise="squat" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE BIO-GAMING UNIVERSE SHOWCASE (WHITE THEME)                 */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
              6 Built-In Gamification Engines
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Gamified Adherence, Clinical Precision
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Transform repetitive physical therapy into engaging bio-game worlds calibrated to medical prescriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BIO_GAMES.map((game) => {
              const isSelected = activeGameId === game.id;
              return (
                <div
                  key={game.id}
                  onClick={() => setActiveGameId(game.id)}
                  className={`p-6 rounded-3xl bg-white border transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 ${
                    isSelected
                      ? 'border-teal-500 shadow-xl shadow-teal-600/10 ring-2 ring-teal-500/20'
                      : 'border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl p-2.5 rounded-2xl bg-slate-50 border border-slate-200">{game.icon}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${game.accent}`}>
                        {game.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-1">{game.name}</h3>
                    <p className="text-xs font-bold text-teal-600 mb-2">{game.category}</p>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{game.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Explore Mode</span>
                    <span className="text-teal-600">&rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. 3-TIER CLINICAL GOVERNANCE LOOP (WHITE THEME)                          */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
              Full Clinical Governance
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              A Complete Medical Hierarchy
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Bridging orthopedic surgeons, physiotherapists, and patients into a synchronized loop.
            </p>
          </div>

          {/* Role Tab Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'patient', label: '🏃 1. Patient Experience' },
              { id: 'physio', label: '🏋️‍♂️ 2. Physiotherapist Plan' },
              { id: 'doctor', label: '🩺 3. Orthopedic Surgeon' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveGovernanceTab(tab.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                  activeGovernanceTab === tab.id
                    ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Role Feature Showcase Card */}
          <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
            {activeGovernanceTab === 'patient' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">Patient Edge Portal</span>
                  <h3 className="text-2xl font-black text-slate-900">Daily Guided Workouts & Voice Coach</h3>
                  <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                    <li className="flex items-center gap-2">✅ <strong>Spatial Pre-Calibration</strong> ensures distance and camera framing before tracking.</li>
                    <li className="flex items-center gap-2">✅ <strong>Bilingual Voice Coach (Hindi & English)</strong> provides real-time posture alerts.</li>
                    <li className="flex items-center gap-2">✅ <strong>Offline-First IndexedDB Sync</strong> — workouts run uninterrupted without internet.</li>
                  </ul>
                  <Link to={targetRoute} className="inline-block mt-2 text-xs font-black text-teal-600 hover:text-teal-700">
                    Open Patient Workout &rarr;
                  </Link>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center space-y-3">
                  <p className="text-xs font-bold text-slate-500">Live Voice Coaching HUD</p>
                  <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 font-mono text-sm font-bold">
                    &quot;मुद्रा सीधी रखें और संतुलन बनाए रखें&quot;
                  </div>
                  <p className="text-[11px] text-slate-500">Instant audio feedback triggers when torso leans backward during curls.</p>
                </div>
              </div>
            )}

            {activeGovernanceTab === 'physio' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">Physiotherapist Portal</span>
                  <h3 className="text-2xl font-black text-slate-900">Weekly Progression & Load Calibration</h3>
                  <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                    <li className="flex items-center gap-2">✅ <strong>Weekly Schedule Builder</strong> (Sets, Reps, Hold seconds & day-of-week checkboxes).</li>
                    <li className="flex items-center gap-2">✅ <strong>1-Click Doctor Prescription Import</strong> to configure plans in seconds.</li>
                    <li className="flex items-center gap-2">✅ <strong>Audit History & Plan Versioning</strong> to track clinical recovery curves.</li>
                  </ul>
                  <Link to="/physio" className="inline-block mt-2 text-xs font-black text-emerald-600 hover:text-emerald-700">
                    Open Physiotherapist Portal &rarr;
                  </Link>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center space-y-3">
                  <p className="text-xs font-bold text-slate-500">Weekly Assignment Matrix</p>
                  <div className="grid grid-cols-5 gap-1.5 text-[10px] font-bold">
                    <span className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700">Mon: 15 reps</span>
                    <span className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700">Tue: 15 reps</span>
                    <span className="p-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500">Wed: Rest</span>
                    <span className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700">Thu: 15 reps</span>
                    <span className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700">Fri: 20 reps</span>
                  </div>
                </div>
              </div>
            )}

            {activeGovernanceTab === 'doctor' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200">Doctor Clinical Portal</span>
                  <h3 className="text-2xl font-black text-slate-900">Medical Prescriptions & 3D Joint Arc Bounds</h3>
                  <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                    <li className="flex items-center gap-2">✅ <strong>Interactive 3D Anatomical Joint Viewer</strong> showing safe flexion arcs.</li>
                    <li className="flex items-center gap-2">✅ <strong>Print-Ready Medical Evaluation PDF</strong> with digital signature stamps.</li>
                    <li className="flex items-center gap-2">✅ <strong>Safety Contraindication Guards</strong> preventing unsafe over-extension.</li>
                  </ul>
                  <Link to="/doctor" className="inline-block mt-2 text-xs font-black text-cyan-600 hover:text-cyan-700">
                    Open Doctor Dashboard &rarr;
                  </Link>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center space-y-3">
                  <p className="text-xs font-bold text-slate-500">Clinical Evaluation Report</p>
                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-left text-[11px] font-mono text-slate-700 space-y-1 shadow-xs">
                    <p>● Diagnosis: ACL Reconstruction (Right Knee)</p>
                    <p>● Target ROM: 90° - 135° Flexion</p>
                    <p className="text-emerald-600 font-bold">● Adherence Compliance: 94.2%</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CALL TO ACTION & FOOTER                                                */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-t border-slate-200/80 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Ready to Experience Next-Gen Physical Rehabilitation?
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Zero specialized hardware required. Run clinical-grade motion tracking directly on your web browser today.
          </p>
          <div className="pt-2">
            <Link
              to={targetRoute}
              className="inline-flex items-center gap-2 px-10 py-4 bg-teal-600 hover:bg-teal-700 text-white font-black text-base rounded-2xl shadow-xl shadow-teal-600/20 hover:shadow-2xl hover:shadow-teal-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>{user && token ? 'Go to Your Active Portal' : 'Start Your Free Exercise Session'}</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Clean White Footer */}
      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <PoseCareLogo size="md" variant="full" />
          </div>
          <p className="text-xs text-slate-400 font-medium text-center md:text-right">
            © {new Date().getFullYear()} PoseCare Precision AI Rehabilitation. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}