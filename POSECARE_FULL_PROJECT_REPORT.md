# PoseCare: AI-Powered Telerehabilitation & Biomechanical Motion Intelligence Platform

**Smart India Hackathon 2026 Project Report**  
**Problem Statement ID:** SIH26196  
**Theme:** Fitness & Sports (Digital Health & Assistive Technologies)  
**Team Name:** IceCube  
**Workspace:** `E:\rehab-ai-platform-main`  
**Document Version:** 2.0 (Comprehensive Project Report)  

---

## Table of Contents
1. [Executive Summary & Problem Statement](#1-executive-summary--problem-statement)
2. [High-Level System Architecture](#2-high-level-system-architecture)
3. [The 5 Architectural Pillars](#3-the-5-architectural-pillars)
4. [Edge AI & Biomechanics Engine Pipeline](#4-edge-ai--biomechanics-engine-pipeline)
5. [Clinical Gamification Suite (6 Canvas Engines)](#5-clinical-gamification-suite-6-canvas-engines)
6. [Four-Role Clinical Governance Workflow](#6-four-role-clinical-governance-workflow)
7. [Offline-First Synchronization Layer](#7-offline-first-synchronization-layer)
8. [Doctor Analytics, Recovery Curves & Clinical Reporting](#8-doctor-analytics-recovery-curves--clinical-reporting)
9. [Bilingual Voice Coaching & Accessibility](#9-bilingual-voice-coaching--accessibility)
10. [Database Schemas & API Specification](#10-database-schemas--api-specification)
11. [Privacy & Security Audit (Zero Video Egress)](#11-privacy--security-audit-zero-video-egress)
12. [SIH 2026 Competitive Advantage & Future Roadmap](#12-sih-2026-competitive-advantage--future-roadmap)

---

## 1. Executive Summary & Problem Statement

### 1.1 The Clinical Challenge
Musculoskeletal disorders, post-operative orthopedic recovery (e.g., ACL reconstruction, joint replacements), and neurological rehabilitation require long-term, repetitive physical therapy regimens. In India and worldwide, patients face significant barriers to effective recovery:
* **Severe Non-Adherence (65–70%)**: Repetitive home exercise regimens cause patient fatigue and high dropout rates.
* **Lack of Real-Time Form Validation**: Without a physiotherapist present, patients inadvertently perform compensatory movements (e.g., torso leaning, shoulder hiking), causing secondary injuries or suboptimal tendon healing.
* **Clinician Blindspots**: Doctors and physiotherapists lack objective longitudinal data on actual joint range of motion (ROM), repetition velocity, or form accuracy between clinic appointments.
* **Privacy Concerns & Bandwidth Barriers**: Streaming raw high-definition video of patients in their homes to cloud servers violates patient privacy and fails in rural or low-bandwidth environments.

### 1.2 The PoseCare Solution
**PoseCare** is an edge-AI digital physical therapy platform that transforms any standard consumer laptop or smartphone with a webcam into an intelligent, clinical-grade rehabilitation station.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   POSECARE AT A GLANCE                                 │
│                                                                                        │
│  🔒 100% On-Device Edge AI        🎮 6 Canvas Game Engines      🩺 4-Role Governance   │
│  Zero video egress; WASM pose    Gamified biofeedback that     Doctor Directives,      │
│  inference runs in-browser at     eliminates exercise boredom   Physio Calibration,     │
│  60 FPS on user's GPU/CPU.       and boosts adherence.         and Patient Tracking.   │
│                                                                                        │
│  📡 Offline-First Architecture   🔊 Bilingual Voice Coach      📄 Formal Clinical PDF  │
│  IndexedDB local queue syncs     Real-time English & Hindi     Standardized evaluation │
│  automatically on reconnect.     audio biomechanics cues.      reports & CSV telemetry.│
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. High-Level System Architecture

PoseCare is architected as a decoupled, multi-tier system designed for low latency, patient privacy, and clinical governance.

```mermaid
graph TB
    subgraph Client ["Client Presentation & Edge-AI Layer (React 19 + Vite + Tailwind)"]
        UI["Patient / Clinician SPA View"]
        WASM["MediaPipe Pose Landmarker (WASM / GPU)"]
        CONF["Adaptive Confidence Filter"]
        EURO["1€ Signal Filter & Landmark Smoother"]
        FSM["4-Stage Biomechanics Engine (FSM)"]
        GAMES["6 Canvas Gamification Engines"]
        IDB[("IndexedDB Local Offline Store")]
        
        UI -->|Camera Frame Stream| WASM
        WASM -->|33 Raw Joint Coords| CONF
        CONF -->|Confidence-Weighted Coords| EURO
        EURO -->|Smoothed Kinematic Vectors| FSM
        FSM -->|Angles & Rep State| GAMES
        FSM -->|Session Telemetry| IDB
    end

    subgraph Backend ["Security & API Layer (Node.js + Express 5)"]
        AUTH["JWT & OTP Auth Engine"]
        RBAC["RBAC Role Guards (Admin / Doctor / Physio / Patient)"]
        SYNC["Telemetry & Allowance Ingestion Endpoint"]
        MAIL["Nodemailer OTP Dispatcher"]
    end

    subgraph Database ["Clinical Data Store (MongoDB Atlas)"]
        COLL_U[("Users Collection")]
        COLL_P[("Prescriptions Collection")]
        COLL_EP[("ExercisePlans Collection")]
        COLL_DP[("DailyProgress Collection")]
        COLL_SL[("SessionLogs Collection")]
        COLL_AP[("Appointments Collection")]
    end

    IDB <-->|Background JSON Sync| SYNC
    UI <-->|REST API Requests (JWT)| AUTH
    AUTH --> RBAC
    RBAC --> COLL_U
    RBAC --> COLL_P
    RBAC --> COLL_EP
    RBAC --> COLL_DP
    RBAC --> COLL_SL
    RBAC --> COLL_AP
    AUTH -.->|Dispatch Verification Codes| MAIL
```

---

## 3. The 5 Architectural Pillars

### Pillar 1: Presentation & Gamification Layer
* **Technology**: React 19, Vite 8, Tailwind CSS 3.4, HTML5 Canvas, SVG visualizers.
* **Capabilities**: Single-page application rendering role-tailored workspaces, real-time skeleton bone overlays, 3D anatomical joint models, muscular activation diagrams, and 6 interactive canvas games.

### Pillar 2: Security & API Layer
* **Technology**: Node.js, Express 5, JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `cors`, `nodemailer`.
* **Capabilities**: Role-based access control (`requireAdmin`, `requireDoctor`, `requirePhysio`, `requireClinician`), password encryption, 6-digit first-time patient OTP verification, and secure 10-minute password reset OTP workflows.

### Pillar 3: Clinical Data Layer
* **Technology**: MongoDB Atlas cloud cluster, Mongoose 9 ORM.
* **Capabilities**: Granular relational-like document mapping between medical diagnoses, versioned physical therapy schedules, timezone-safe daily allowances, and high-frequency biomechanical session logs.

### Pillar 4: Edge AI & Biomechanical Motion Intelligence
* **Technology**: Google MediaPipe Tasks Vision (`@mediapipe/tasks-vision` v1.0.1 WebAssembly binary), GPU/WebGL delegate.
* **Capabilities**: 33 landmark extraction, 3D angular dot-product computations, 1-Euro adaptive frequency filtering, spatial framing calibration, and 4-stage finite state machine rep validation.

### Pillar 5: Monitoring, Analytics & Reporting
* **Technology**: Custom SVG curve generators, Recharts, HTML5 Print Stylesheets, CSV data serialisation.
* **Capabilities**: Longitudinal Range of Motion (ROM) tracking, weekly adherence rate percentages, kinetic compensation counters, and one-click printable clinical evaluation PDF reports.

---

## 4. Edge AI & Biomechanics Engine Pipeline

```mermaid
flowchart LR
    A["Raw Camera Frame (HTML5 Video)"] --> B["MediaPipe WASM (33 3D Landmarks)"]
    B --> C["Adaptive Confidence Filter (Noise / Occlusion Damping)"]
    C --> D["1-Euro Frequency Filter (Jitter Elimination)"]
    D --> E["Kinetic Angle & Vector Geometry Engine"]
    E --> F["Compensation Detector (Torso Lean / Shoulder Hike)"]
    F --> G["4-Stage Finite State Machine (Rep Counter)"]
    G --> H["Real-Time Visual / Voice Biofeedback"]
```

### 4.1 Spatial Calibration & Framing Engine
Before starting an exercise, the platform performs real-time spatial calibration (`calibrationEngine.js` & `PreExerciseCalibrationModal.jsx`):
* **Bounding Box Analysis**: Checks if patient body height is between 30% and 92% of frame height.
* **Occlusion Guard**: Verifies that primary exercise joints have visibility $\ge 0.55$.
* **Framing Guidance**: Dynamically advises *"Step closer"*, *"Step back"*, or *"Adjust camera angle"*.

### 4.2 Adaptive Confidence Filtering
In challenging home lighting or momentary joint occlusion (e.g., wrist passing behind torso), raw coordinates can spike. The `AdaptiveConfidenceFilter` prevents phantom reps:
* **High Confidence ($\ge 0.75$)**: Direct tracking with velocity smoothing.
* **Medium Confidence ($0.45 - 0.75$)**: Blends velocity-projected position with raw landmark reading:
  $$\vec{P}_{\text{filtered}} = \alpha \vec{P}_{\text{raw}} + (1 - \alpha) (\vec{P}_{\text{prev}} + \vec{V} \cdot \Delta t)$$
* **Low Confidence / Occlusion ($< 0.45$)**: Freezes coordinate in place while damping velocity ($0.85\times$ per frame) up to a 15-frame grace period before flagging full occlusion.

### 4.3 1-Euro Frequency Smoothing
High-frequency webcam jitter at rest is eliminated using the 1-Euro filter (`oneEuroFilter.js`), dynamically adjusting the cutoff frequency $\alpha$ based on instantaneous movement velocity:
$$f_c = f_{c,\text{min}} + \beta \cdot |\dot{x}|$$
This delivers zero perceived latency during fast exercise strokes while maintaining steady joint angles during static holds.

### 4.4 Four-Stage Biomechanical Finite State Machine (FSM)
Repetitions are tracked via a strict state machine (`biomechanicsEngine.js`) rather than simple threshold crossing:

```
           ┌──────────────────────────────────────────────┐
           │                                              │
           ▼                                              │
      ┌─────────┐   Concentric Motion   ┌──────────┐      │
      │  REST   │ ────────────────────> │  MOVING  │      │
      └─────────┘                       └──────────┘      │
           ▲                                  │           │
           │                            Angle in Zone     │
           │                                  │           │
           │                                  ▼           │
      ┌─────────┐   Eccentric Return    ┌─────────────┐   │
      │ RETURN  │ <──────────────────── │ TARGET_HOLD │   │
      └─────────┘                       └─────────────┘   │
           │                                              │
           └──────────────────────────────────────────────┘
```

1. **`REST`**: Baseline posture resting state.
2. **`MOVING`**: Concentric movement phase tracking velocity and secondary kinetic compensations.
3. **`TARGET_HOLD`**: Triggers when target angle is reached; counts required consecutive validation frames (default: 4 frames) or hold duration (e.g., 5s–10s for isometric holds).
4. **`RETURN`**: Eccentric return to baseline. Validates minimum ROM excursion ($\ge 25^\circ$) and minimum rep duration ($\ge 900\text{ ms}$) to prevent rushed, invalid repetitions.

### 4.5 Kinetic Compensation Detection Matrix

| Exercise Protocol | Monitored Joints | Primary Target | Checked Secondary Kinetic Compensations |
|---|---|---|---|
| **Bicep Curl (Standing)** | 11, 13, 15 (Elbow) | $45^\circ - 85^\circ$ | 1. Torso sagittal sway ($> 22^\circ$ deviation)<br>2. Upper arm dropping below horizontal shoulder line |
| **Mini Squat** | 23, 25, 27 (Knee/Hip) | $120^\circ - 135^\circ$ | 1. Excessive forward trunk pitch ($< 65^\circ$ hip angle)<br>2. Asymmetric knee flexion |
| **Seated Knee Extension** | 23, 25, 27 (Knee) | $160^\circ - 180^\circ$ | 1. Terminal knee extension lag<br>2. Pelvic shift and hip hike |
| **Shoulder Abduction** | 23, 11, 13 (Shoulder) | $135^\circ - 170^\circ$ | 1. Contralateral shoulder hitching ($> 14^\circ$ tilt)<br>2. Elbow bending ($< 145^\circ$ elbow angle) |
| **Straight Leg Raise** | 11, 23, 25 (Hip/Knee) | $45^\circ - 60^\circ$ | 1. Knee flexion compensation ($< 160^\circ$ locked knee)<br>2. Pelvic anterior tilt |

---

## 5. Clinical Gamification Suite (6 Canvas Engines)

To solve patient boredom and dropout, PoseCare features 6 HTML5 Canvas gamification modes that map physiological joint angles to game mechanics:

```
┌──────────────────────────┬──────────────────────────┬──────────────────────────┐
│ 1. Standard Mirror       │ 2. Zen Bloom Garden      │ 3. Flappy Rehab Flight   │
│ Live mirrored webcam     │ Procedural botany grows  │ Joint flexion drives     │
│ overlaid with skeleton   │ and blooms dynamically   │ flyer altitude through   │
│ bones and angle arcs.    │ during isometric holds.  │ neon obstacle gates.     │
├──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ 4. 3D Hologram Avatar    │ 5. Shadow Match Keyhole  │ 6. BeatRehab Slicer      │
│ Rotatable 3D mannequin   │ Match movement to target │ Rhythm targets spawned to│
│ visualizing muscular     │ silhouette keyholes in   │ music tempo; slice with  │
│ activation gradients.    │ a spatial puzzle.        │ calibrated joint reach.  │
└──────────────────────────┴──────────────────────────┴──────────────────────────┘
```

* **Dynamic XP & Tier Progression**: Patients earn 10 XP per valid rep, 5 XP per second held, and 50 XP per completed session. Tiers scale from *Bronze Rookie* &rarr; *Silver Ace* &rarr; *Gold Master* &rarr; *Platinum Titan* &rarr; *Diamond Legend* (250 XP/level).
* **Clinical Badges**: 8 achievements rewarding biomechanical milestones (e.g., *Sniper Form* for 100% accuracy, *Zen Master* for static holds, *Consistency Titan* for 3-day active streaks).

---

## 6. Four-Role Clinical Governance Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Admin as System Admin
    actor Doctor as Orthopedic Doctor
    actor Physio as Physiotherapist
    actor Patient as Patient

    Admin->>Doctor: Verify & Approve Clinical License
    Admin->>Physio: Verify & Approve Physiotherapist Account
    Admin->>Patient: Bind Doctor & Physio to Patient
    
    Doctor->>Doctor: Formulate Diagnosis & Safe ROM Target
    Doctor->>Physio: Issue Prescription (Status: "Pending Physio Review")
    
    Physio->>Physio: Calibrate Daily Sets, Reps & Days of Week
    Physio->>Patient: Publish Exercise Plan (Status: "Verified by Physio")
    
    Patient->>Patient: Open Today's Routine & Exercise at 60 FPS
    Patient->>Doctor: Auto-Sync Session Telemetry & ROM Records
    
    Doctor->>Doctor: Review Longitudinal Recovery Curves & Adherence
    Doctor->>Patient: Export Formal Medical PDF & Adjust Protocol
```

### Role Matrix & Permissions

| Role | Portal Page | Core Responsibilities & Permissions |
|---|---|---|
| **Administrator** | `AdminDashboard.jsx` | User management, RBAC enforcement, clinician license verification, and care-team binding (linking Doctor + Physio to Patient). |
| **Orthopedic Doctor** | `DoctorDashboard.jsx` | Intake diagnosis, pathology selection, safe joint angle limits, precautions/contraindications, recovery curve inspection, and report generation. |
| **Physiotherapist** | `PhysioDashboard.jsx` | Prescription review, weekly versioned exercise plan creation (sets, reps, hold durations, active days), and daily progress monitoring. |
| **Patient** | `PatientView.jsx` | Exercise execution across 6 games, live audio/visual coaching, daily allowance tracking, discomfort reporting, and offline workout execution. |

---

## 7. Offline-First Synchronization Layer

To operate reliably in Indian environments with intermittent connectivity, PoseCare implements a comprehensive client-side offline sync layer (`offlineSyncEngine.js`):

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          OFFLINE SYNC ARCHITECTURE                          │
│                                                                             │
│  [ WebCam + Edge AI ] ───> [ Offline Sync Engine (IndexedDB) ]              │
│                                  │                                          │
│         ┌────────────────────────┼────────────────────────┐                 │
│         ▼                        ▼                        ▼                 │
│  queued_sessions          queued_progress          queued_discomfort        │
│  (Reps, ROM, Violations)  (Daily Increments)       (Pain Reports)           │
│         │                        │                        │                 │
│         └────────────────────────┼────────────────────────┘                 │
│                                  ▼                                          │
│                     [ Online Status Detector ]                              │
│                                  │                                          │
│                   Auto-Flushes to Backend (REST API)                        │
│                   POST /api/sessions                                        │
│                   POST /api/daily-progress/increment                        │
│                   POST /api/daily-progress/report-discomfort                │
└─────────────────────────────────────────────────────────────────────────────┘
```

* **Client Stores**: IndexedDB object stores for `queued_sessions`, `queued_progress`, `queued_discomfort`, `cached_prescriptions`, and `cached_routines`.
* **Zero Interruption**: Patients can launch routines, calibrate, and complete workouts without internet access.
* **Automatic Reconnection Flush**: Listens to `window.addEventListener('online')` and automatically synchronizes queued records to the cloud with exponential backoff.
* **Live Status Badge**: UI indicator in patient header showing *Cloud Connected*, *Offline Mode (N queued)*, or *Syncing...*.

---

## 8. Doctor Analytics, Recovery Curves & Clinical Reporting

### 8.1 Granular Adherence & Recovery Metrics
* **Weekly Adherence Rate**: Percent of prescribed workout days completed relative to weekly target:
  $$\text{Adherence Rate} = \min\left(100, \frac{\text{Unique Workout Dates}}{\text{Target Days per Week}} \times 100\right)$$
* **ROM Target Achievement Rate**: Percent of completed sessions reaching doctor-prescribed clinical range.
* **Kinetic Consistency Score**: Temporal standard deviation score measuring smoothness of movement across repetitions.

### 8.2 Dual-Curve Recovery Overview Chart
Renders an SVG multi-curve comparison plotting weekly activity minutes against joint flexion/extension angles across a 6-to-12 week trajectory.

### 8.3 Multi-Filter Session Telemetry Table
The doctor dashboard includes real-time telemetry inspection with:
* Instant text search and exercise/game-mode filtering.
* Valid vs. attempted reps breakdown.
* Peak ROM vs. prescribed target angles.
* Logged form compensations and discomfort alert flags.

### 8.4 Exportable Medical Evaluation Reports
* **Print-Optimized PDF**: Formal medical assessment document with clinic letterhead, patient demographics, Range of Motion recovery curves, telemetry summaries, doctor clinical notes, and digital signature stamp (`window.print()`).
* **Raw CSV Export**: Comprehensive raw telemetry spreadsheet export for clinical research or EHR integration.

---

## 9. Bilingual Voice Coaching & Accessibility

PoseCare includes an integrated voice engine (`LanguageContext.jsx` & Web Speech API `window.speechSynthesis`):
* **Instant Language Toggle**: Switch between **English** and **Hindi (हिन्दी)** with one click in the navigation header.
* **Real-Time Coaching Prompts**:
  * *Count updates*: "Rep complete!" / "रेप पूरा हुआ!"
  * *Hold instructions*: "Hold for 10 seconds..." / "10 सेकंड स्थिति बनाए रखें..."
  * *Correction alerts*: "Maintain upright spine, torso leaning" / "मुद्रा सीधी रखें और संतुलन बनाए रखें।"
  * *Daily completion*: "Congratulations! Daily target completed!" / "बधाई हो! आज का दैनिक लक्ष्य पूरा हुआ!"

---

## 10. Database Schemas & API Specification

### 10.1 Key MongoDB Collections (`rehab-backend/server.js`)

```
┌──────────────────┐       ┌──────────────────────┐       ┌──────────────────────┐
│   User Model     │       │  Prescription Model  │       │  ExercisePlan Model  │
├──────────────────┤       ├──────────────────────┤       ├──────────────────────┤
│ name             │1    * │ doctorId             │1    * │ physioId             │
│ email (unique)   │──────>│ patientId            │──────>│ patientId            │
│ role (enum)      │       │ diagnosis            │       │ prescriptionId       │
│ assignedDoctorId │       │ pathology            │       │ version (Number)     │
│ assignedPhysioId │       │ restrictions         │       │ isCurrent (Boolean)  │
│ focusArea        │       │ precautions          │       │ assignments [{       │
│ password (bcrypt)│       │ clinicalGoals        │       │   assignmentId       │
│ isVerified (bool)│       │ exercises [{         │       │   exerciseName       │
│ timezone         │       │   exerciseName       │       │   sets, reps, hold   │
└──────────────────┘       │   successAngle       │       │   daysOfWeek [0-6]   │
                           │   failureAngle       │       │ }]                   │
                           │   holdTime           │       └──────────────────────┘
                           │ }]                   │                  │
                           │ status (enum)        │                  │
                           └──────────────────────┘                  │
                                      │                              ▼
                                      │                   ┌──────────────────────┐
                                      │                   │ DailyProgress Model  │
                                      │                   ├──────────────────────┤
                                      │                   │ patientId            │
                                      │                   │ assignmentId         │
                                      │                   │ date (YYYY-MM-DD)    │
                                      │                   │ completedWork        │
                                      │                   │ isCompleted (bool)   │
                                      │                   │ isDiscomfortReported │
                                      │                   └──────────────────────┘
                                      ▼                              │
                           ┌──────────────────────┐                  │
                           │   SessionLog Model   │                  │
                           ├──────────────────────┤                  │
                           │ patientId            │<─────────────────┘
                           │ exerciseName         │
                           │ reps_completed       │
                           │ max_angle_achieved   │
                           │ gamePlayed           │
                           │ success_rate         │
                           │ consistency_score    │
                           │ form_violations []   │
                           │ stoppedEarly (bool)  │
                           │ date (Timestamp)     │
                           └──────────────────────┘
```

### 10.2 REST API Endpoint Inventory
The backend exposes 35 structured REST endpoints across Authentication, Administration, Clinician Roster, Prescriptions, Exercise Plans, Daily Allowances, Appointments, and Session Telemetry.

---

## 11. Privacy & Security Audit (Zero Video Egress)

### 11.1 Zero Video Egress Proof
* **In-Memory Video Binding**: The browser camera stream from `navigator.mediaDevices.getUserMedia` is bound exclusively to a local HTML5 `<video>` element inside [usePoseLandmarker.js](file:///e:/rehab-ai-platform-main/rehab-ai/src/hooks/usePoseLandmarker.js).
* **Local WASM Execution**: Video frames are analyzed in-memory at 60 FPS via `@mediapipe/tasks-vision` WASM using the client's GPU.
* **No Video/Image Transmission**: Audit confirmed zero instances of `toDataURL()`, canvas image base64 serializations, binary frame streaming, or WebRTC server relays across the entire repository.
* **Data Transferred**: Only discrete numerical session telemetry (e.g. `{ reps: 15, maxAngle: 128, accuracy: 94, duration: 45 }`) is transmitted via HTTPS to `/api/sessions`.

---

## 12. SIH 2026 Competitive Advantage & Future Roadmap

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        WHY POSECARE STANDS OUT FOR SIH 2026                            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  1. Real-Time Edge Processing : Sub-16ms latency with zero cloud GPU compute costs.   │
│  2. Strict Privacy Compliance : Meets global HIPAA & India Digital Personal Data Act.  │
│  3. Multi-Tier Clinical Governance: Doctor Directives -> Physio Calibration -> Patient.│
│  4. Proven Adherence Engines  : 6 diverse canvas games turn clinical chore into play. │
│  5. Robust in Rural India     : Works fully offline with local IndexedDB queueing.     │
│  6. Vernacular Accessibility  : Integrated Hindi and English real-time voice coaching.│
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Future Roadmap:
1. **Wearable IMU Sensor Fusion**: Combining webcam edge AI with Bluetooth BLE IMU sensors (smart knee braces).
2. **Predictive Recovery ML Models**: Time-series LSTM predicting expected discharge dates based on early-week ROM slope.
3. **FHIR / ABDM Integration**: Exporting telemetry directly to India's Ayushman Bharat Digital Mission (ABDM) electronic health records.
