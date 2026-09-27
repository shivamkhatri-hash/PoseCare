# PoseCare — AI Rehabilitation & Motion Intelligence Platform

**Smart India Hackathon 2026** | **Problem Statement:** SIH26196 | **Theme:** Fitness & Sports  
**Team Name:** IceCube | **Project:** PoseCare  

---

## 1. PROBLEM STATEMENT

Physical rehabilitation after orthopedic surgery, sports injuries, or chronic joint conditions requires weeks to months of repetitive exercise. Today, the standard model of care relies on clinic visits spaced days or weeks apart, with patients expected to perform physical therapy routines independently at home between visits.

This at-home model breaks down for three reasons:

1. **High Non-Adherence (65–70%)**: Repetitive exercise routines done in isolation are boring and demotivating. Without interactive engagement, most patients abandon their prescribed therapy before completing their recovery arc.
2. **Invisible Bad Form & Secondary Injury Risk**: When patients exercise at home with no therapist watching, they unknowingly compensate with bad posture—such as leaning their torso, hiking their shoulders, or rushing movements. This reduces the therapeutic value of the exercise and can lead to re-injury.
3. **The Clinician Data Blindspot**: Doctors and physiotherapists have no objective data on what happened between appointments. They cannot verify whether the patient completed their reps, reached their target Range of Motion (ROM), or struggled with joint pain.
4. **Privacy & Infrastructure Hurdles**: Traditional tele-rehab platforms that stream live video of patients in their homes to cloud servers raise serious privacy concerns and fail over slow, intermittent internet connections in rural or semi-urban areas.

---

## 2. OUR IDEA / SOLUTION

**PoseCare** is an edge-AI physical therapy platform that turns any standard laptop, tablet, or smartphone camera into an intelligent rehabilitation station.

Instead of streaming video to remote servers, PoseCare runs a high-speed computer vision model directly inside the user's web browser using WebAssembly. The model identifies 33 3D skeletal landmarks in real time, calculates precise joint angles at up to 60 frames per second, and detects bad posture the instant it happens.

To eliminate boredom, PoseCare replaces dry counting with **six interactive canvas gaming engines** where physical body movements directly control the action—such as flying an avatar through altitude gates using elbow flexion or blooming flowers during isometric knee holds. 

To bridge the clinician gap, PoseCare connects the patient to a **structured medical governance loop**: doctors set safe physiological range-of-motion limits and precautions, physiotherapists configure weekly volume and day-by-day schedules, and patients receive real-time audio and visual biofeedback. Only lightweight numerical summaries (reps completed, peak angles, form accuracy scores) sync to the medical portal—raw video never leaves the patient's device.

---

## 3. WHAT MAKES US DIFFERENT

Unlike generic fitness counting apps or simple computer vision demos, PoseCare is engineered specifically for clinical rehabilitation:

* **100% On-Device Edge AI (Zero Video Egress)**: Video frames are processed strictly in-memory on the patient's device. No video or camera images are ever recorded, saved to disk, or transmitted over the internet. This complies natively with strict healthcare privacy standards and requires zero cloud GPU compute costs.
* **4-Stage Biomechanical Finite State Machine**: Generic apps count reps with simple angle threshold crossing, which allows patients to cheat by rushing or twitching. PoseCare uses a 4-stage state machine (`Rest` &rarr; `Moving` &rarr; `Target Hold` &rarr; `Return`) that enforces minimum movement durations ($\ge 900\text{ ms}$), minimum range excursions ($\ge 25^\circ$), and steady hold verification before crediting a repetition.
* **Multi-Joint Kinetic Compensation Detection**: PoseCare does not just look at the primary exercising joint; it checks secondary anchor joints simultaneously. For example, during a bicep curl, it monitors torso vertical tilt and shoulder elevation to catch back-swinging or shoulder-shrugging compensations in real time.
* **Two-Tier Clinical Governance**: A doctor (orthopedic surgeon) sets the diagnosis and safe range limits, while a physiotherapist calibrates daily sets, reps, and hold times. This mirrors real-world hospital workflows.
* **Offline-First Resilience**: Sessions run fully offline using browser storage. If the internet drops during training, metrics and pain reports are queued locally and automatically sync to the clinician portal when connectivity returns.
* **Bilingual Vernacular Voice Coaching**: Live audio feedback is provided in both English and Hindi, ensuring accessibility for non-English speaking patients across India.

---

## 4. HOW IT WORKS — THE PATIENT EXPERIENCE, STEP BY STEP

### Step 1: Login and Daily Routine View
The patient logs into their portal. On first login, they verify their identity with a 6-digit one-time code sent to their email. Once logged in, the patient sees their personalized **Daily Allowance Routine**—the exact exercises prescribed for that specific day of the week by their physiotherapist, along with their progress toward the daily target.

### Step 2: Camera Setup & Pre-Exercise Spatial Calibration
When the patient selects an exercise and clicks **Start Session**, the camera feed initializes and an automatic **Pre-Exercise Calibration Check** begins before any tracking or rep counting is allowed:
1. **Distance & Framing Verification**: The system calculates the patient's bounding box height. If the patient is too close (body height $> 92\%$ of frame), the screen prompts them with a yellow banner to *"Step back slightly for full visibility"*. If they are too far ($< 30\%$), it prompts them to *"Step closer"*.
2. **Key Joint Visibility Check**: The camera scans for the specific joints required for that exercise (e.g., hip, knee, and ankle for leg exercises). If any joint is blocked by furniture or bad camera angles, the system flags the occluded joint.
3. **Lighting & Stability Check**: The patient is asked to stand still in their resting pose for a brief moment while the system stabilizes landmark confidence filters.
4. **Baseline Range-of-Motion Test (Optional)**: If taking a baseline measurement, the user moves through their maximum comfortable range once so the system can set a personalized baseline angle.

Once all framing and visibility checks pass (green checkmarks), the tracking interface unlocks.

### Step 3: Starting the Exercise and Selecting an Interface
The patient can choose how they want to visualize their workout from six modes:
* **Standard Mirror**: Clean mirrored webcam view with skeleton bone overlays and live angle arcs.
* **Zen Bloom Garden**: A calming garden where isometric holds cause procedural plants to grow and bloom.
* **Flappy Rehab Flight**: A flying avatar whose altitude rises and falls in direct proportion to joint extension and flexion.
* **3D Hologram Mannequin**: A 3D avatar showing active muscular tension regions.
* **Shadow Match**: A keyhole puzzle where the patient aligns their body with target silhouette poses.
* **BeatRehab Slicer**: Rhythm cues synced to cadence that the patient slices by reaching target angles.

### Step 4: Live Posture & Form Correction
As the patient moves, PoseCare continuously evaluates their biomechanics:
* **What the system checks**: Primary joint angle, secondary kinetic compensations (torso lean, shoulder hitching, knee collapse), repetition cadence, and static hold stability.
* **Examples of bad form detection**:
  * *Bicep Curl*: Leaning the upper body backward by more than $22^\circ$ or dropping the upper arm below shoulder level.
  * *Shoulder Abduction*: Bending the elbow ($< 145^\circ$) or shrugging the neck/shoulder ($> 14^\circ$ lateral tilt).
  * *Squats*: Pitching the chest excessively forward ($< 65^\circ$ trunk angle).
  * *Straight Leg Raise*: Bending the knee ($< 160^\circ$) instead of keeping it straight.
* **How correction is delivered**:
  * **Visual**: Real-time HUD banner turns red or amber with clear text (e.g., *"Torso leaning by 24° — maintain upright spine"*).
  * **Spoken**: The voice coach immediately speaks the correction in the patient's chosen language (e.g., *"मुद्रा सीधी रखें और संतुलन बनाए रखें"*).
  * **Hold Penalties**: If form breaks during an isometric hold, the hold timer pauses until correct posture is restored.

### Step 5: Repetition Counting & Validation
When the patient performs a full, controlled repetition that reaches the prescribed success angle and returns to baseline without violating form rules, the system increments the rep counter, displays a green flash, and the voice coach announces *"Rep complete!"*. Rushed or incomplete movements are rejected with guidance to *"Complete full controlled motion"*.

### Step 6: Session Completion & Telemetry Sync
When the daily target is reached or the patient clicks **Finish Workout**:
* The system computes full session metrics: valid reps, invalid reps, peak ROM achieved, average ROM, hold seconds, consistency score, and logged form violations.
* If the patient felt pain during the workout, they can submit an optional **Discomfort Report** (1–10 pain scale with notes), which flags the session for clinician review.
* Experience points (XP), streak multipliers, and badges are awarded to the patient.
* The session summary is saved to the database. If offline, it is stored locally in the browser's IndexedDB and synchronizes automatically when internet access returns.

---

## 5. DASHBOARDS AND VIEWS

### 1. Patient Portal (`PatientView.jsx`)
* **Dashboard Tab**: Overview of current XP, tier rank (Bronze to Diamond), active streak, total minutes trained, and doctor prescription notes.
* **Workout Tab**: Interactive daily routine checklist showing today's target reps, sets completed, and remaining allowances for each scheduled exercise.
* **Training Interface**: The live camera screen featuring the 6 game modes, spatial calibration checks, real-time angle gauges, and voice coaching.
* **Stats & Progress Tab**: Filterable session history, Range of Motion trend charts, form accuracy distributions, and CSV export.
* **Quests & Badges Tab**: Milestone reward cards and daily rehabilitation challenges.

### 2. Doctor Clinical Dashboard (`DoctorDashboard.jsx`)
* **Patient Roster**: List of assigned patients with status pills (*Active*, *Pending Verification*).
* **Clinical Prescription Builder**: Customizer for setting patient diagnosis, targeted joint, safe success/failure angle thresholds, hold durations, and contraindications.
* **3D Anatomical Joint Viewer**: Interactive 3D visualizer showing joint flexion arcs and active pathology (e.g., ACL repair, rotator cuff impingement).
* **Recovery Overview Curves**: Dual-curve graph plotting patient activity minutes against joint flexion progress across a 6-to-12 week recovery curve.
* **Session Telemetry Matrix**: Searchable, filterable log of every workout session showing valid reps, peak angles, hold times, and form violations.
* **Clinical Report Generator**: One-click tool that generates a print-ready formal Medical Evaluation PDF and full CSV export.
* **Consultation Scheduler**: Calendar tool for booking and managing patient follow-up appointments.
* **Telehealth Consultation Hub**: A patient communication view (currently simulated with sample clinical consultation threads in the frontend).

### 3. Physiotherapist Portal (`PhysioDashboard.jsx`)
* **Prescription Review**: Review queue where the physiotherapist inspects doctor diagnoses and verifies target angle limits.
* **Weekly Plan Builder**: Detailed scheduling interface to assign specific daily volume (sets, reps, hold durations) and active days of the week (Monday through Sunday) with plan versioning.
* **Daily Allowance Monitor**: Real-time tracker showing which patients have completed their assigned exercises for the day.

### 4. Administrator Dashboard (`AdminDashboard.jsx`)
* **Platform KPIs**: Total registered users, active doctors, physiotherapists, patients, and total completed sessions.
* **Clinician Verification Roster**: Approval panel where administrators verify and approve doctor and physiotherapist medical credentials before portal access is granted.
* **Care-Team Assignment**: Interface for linking specific doctors and physiotherapists to individual patients.

### 5. Exercise Library (`Library.jsx`)
* Searchable clinical encyclopedia covering 18 rehabilitation exercises with anatomical muscle diagrams, target joints, step-by-step guidance, and camera positioning tips.

### 6. Accuracy Benchmarking Suite (`AccuracyBench.jsx`)
* Engineering diagnostic tool comparing raw MediaPipe coordinate streams against filtered signals to evaluate latency, jitter reduction, and angular precision.

---

## 7. TECH STACK

* **Frontend**: React 19, Vite, Tailwind CSS, React Router, HTML5 Canvas API, SVG Articulation Engines.
* **Backend**: Node.js, Express.js.
* **Database**: MongoDB Atlas (Cloud Database), Mongoose ORM.
* **Computer Vision & AI**: Google MediaPipe Tasks Vision (WebAssembly binary with GPU/WebGL delegate).
* **Client-Side Storage**: Browser IndexedDB API (Offline Sync Engine).
* **Authentication & Cryptography**: JSON Web Tokens (JWT), Bcrypt password hashing.

---

## 8. APIS AND EXTERNAL SERVICES USED

* **Google MediaPipe Tasks Vision API**: High-speed on-device machine learning library used to detect 33 3D body landmark coordinates from video frames in real time inside the browser.
* **Web Speech API (`window.speechSynthesis`)**: Browser-native text-to-speech engine used to deliver real-time spoken coaching and posture alerts in English and Hindi.
* **WebRTC Media Capture API (`navigator.mediaDevices.getUserMedia`)**: Browser hardware interface used to access the user's local webcam stream in-memory.
* **Nodemailer / SMTP Email Delivery**: Cloud email service used to transmit 6-digit first-time login verification codes and password reset tokens to users.
* **MongoDB Atlas Cloud API**: Managed database service used for persistent storage of user accounts, prescriptions, exercise plans, and workout logs.

---

## 9. DATABASE

PoseCare uses **MongoDB Atlas** with structured document models:

* **User Accounts & Roles**: Stores credentials, user role (Doctor, Physiotherapist, Patient, Admin), account verification flags, and links connecting patients to their attending clinicians.
* **Medical Prescriptions**: Stores doctor diagnoses, affected joint types, safe minimum/maximum angle boundaries, hold duration recommendations, and medical precautions.
* **Weekly Exercise Plans**: Stores versioned schedules published by physiotherapists, containing individual exercise assignments, daily set/rep targets, hold times, and assigned days of the week.
* **Daily Progress Records**: Timezone-safe daily records tracking how much of today's prescribed workout volume a patient has completed, whether daily targets were met, and any logged discomfort flags.
* **Session Telemetry Logs**: Granular logs of completed workouts, including valid reps, invalid reps, peak ROM achieved, average ROM, consistency score, form violations detected, and game modes played.
* **Appointments**: Stores scheduled consultations, follow-up dates, session durations, and clinician preparation notes.

---

## 10. IMPACT AND BENEFITS

### For Patients
* **Prevents Re-Injury**: Immediate posture corrections stop patients from developing harmful compensatory movement patterns during home recovery.
* **Higher Adherence Through Gamification**: Transforming physical therapy into interactive games turns a boring chore into an engaging daily habit.
* **Accessible Anywhere**: Works on low-cost consumer devices without specialized wearable sensors, and functions smoothly even over offline or unstable connections.
* **Language Inclusivity**: Hindi and English voice coaching allows patients across diverse demographics in India to use the platform comfortably.

### For Doctors & Physiotherapists
* **Objective Longitudinal Data**: Clinicians see actual Range of Motion recovery curves, repetition volume, and adherence rates instead of relying on patient memory.
* **Time Savings**: One-click printable medical PDF reports streamline documentation for clinical reviews and insurance claims.
* **Seamless Collaboration**: Doctors set high-level medical guardrails while physiotherapists manage day-to-day progression, reducing administrative friction.

### For Healthcare Systems
* **Scalable & Cost-Effective**: Running AI on the user's device eliminates expensive cloud GPU server costs, allowing hospitals and government health programs to scale tele-rehab to thousands of patients at low cost.
* **Patient Privacy by Design**: Zero video leaves the patient's device, satisfying global medical data privacy regulations natively.
