# PoseCare — Video Presentation & Demo Script
**Smart India Hackathon 2026** | **Problem Statement:** SIH26196 | **Theme:** Fitness & Sports  
**Project:** PoseCare | **Team:** IceCube  
**Target Duration:** 3.5 to 4 Minutes (Ideal for SIH Video Submissions & Jury Evaluations)  

---

## 🎬 Video Overview & Guidelines
* **Tone**: Confident, energetic, clear, and clinical yet engaging.
* **Format**: Picture-in-picture (Speaker in corner + high-resolution screen recording of live demo).
* **Key Demonstration Highlights**:
  1. Real-time in-browser pose tracking & 60 FPS live angle overlay.
  2. Live form correction & bilingual Hindi/English voice coach.
  3. Interactive gamification modes (Zen Bloom / Flappy Rehab).
  4. Clinical governance workflow (Doctor &rarr; Physiotherapist &rarr; Patient).
  5. Zero video egress (Privacy-first Edge AI) & Offline sync demo.

---

## ⏱️ Detailed Scene-by-Scene Script

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 VIDEO TIMELINE SUMMARY                                 │
│                                                                                        │
│  [0:00 - 0:35]  The Hook & Real-World Rehabilitation Problem                           │
│  [0:35 - 1:15]  Introducing PoseCare: The Privacy-First Edge-AI Solution               │
│  [1:15 - 2:25]  Live Patient Experience Demo (Calibration, Gamification & Form Guard) │
│  [2:25 - 3:15]  The Clinician Governance Loop (Doctor & Physiotherapist Portals)       │
│  [3:15 - 3:45]  Offline-First Architecture & Privacy Verification                      │
│  [3:45 - 4:15]  Impact, Scalability & Strong Closing Summary                           │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### Scene 1: The Hook & Real-World Rehabilitation Problem (0:00 – 0:35)

| Time | Visual / Screen Action | Spoken Voiceover (Speaker Script) |
|---|---|---|
| **0:00 – 0:12** | **On-Screen**: Camera on speaker / team lead. Background shows hospital rehab clinic or post-op patient struggling with paper exercise sheets.<br><br>**Overlay Graphic**: *"70% of physical therapy patients drop out before full recovery."* | "Every year, millions of people undergo orthopedic surgeries or suffer sports injuries. But their recovery doesn't happen in the hospital—it happens at home. And that’s where the system breaks down." |
| **0:12 – 0:35** | **On-Screen**: Cut to close-up of speaker holding up a smartphone/laptop, then transitioning to PoseCare landing page.<br><br>**Text Callouts**: <br>1. High non-adherence.<br>2. Invisible bad posture & re-injury.<br>3. Doctor data blindspots. | "Over 70% of patients fail to complete their prescribed home therapy because exercises are boring, there's no feedback on whether their form is right, and doctors have zero visibility between visits. Streaming live video to cloud servers isn't the answer—it's expensive and violates privacy.<br><br>We are **Team IceCube**, and we built **PoseCare**." |

---

### Scene 2: Introducing PoseCare & Edge AI (0:35 – 1:15)

| Time | Visual / Screen Action | Spoken Voiceover (Speaker Script) |
|---|---|---|
| **0:35 – 0:55** | **On-Screen**: Clean shot of the PoseCare Landing Page showing the tagline, animated joint viewer, and edge-AI badge.<br><br>**Graphic Pop-up**: *"100% In-Browser Edge AI (WASM / GPU) — Sub-16ms Latency"*. | "**PoseCare** is an AI-powered physical therapy platform that turns any standard laptop or phone camera into an intelligent, clinical-grade rehabilitation station.<br><br>Using Google MediaPipe running directly in the browser via WebAssembly, PoseCare tracks 33 skeletal joint coordinates in real time at 60 frames per second on the user's GPU." |
| **0:55 – 1:15** | **On-Screen**: Show the Privacy Edge Indicator badge turning green.<br><br>**Text Banner**: *"🔒 Zero Video Egress: Raw video never leaves the client device."* | "Our core breakthrough: **Zero raw video ever leaves the patient's device**. All image processing happens in-memory locally. Only lightweight numerical summaries—like repetition counts and angle ranges—sync to the medical team." |

---

### Scene 3: Live Patient Experience Demo (1:15 – 2:25)

| Time | Visual / Screen Action | Spoken Voiceover (Speaker Script) |
|---|---|---|
| **1:15 – 1:35** | **On-Screen**: Switch to live Patient View. Click 'Start Workout'.<br><br>**Live Demo**: Show the **Pre-Exercise Calibration Modal** checking bounding box height ($30\% - 92\%$) and joint visibility.<br><br>Demonstrate stepping back until the banner turns green (*"Positioning Optimal"*). | "Let’s see it in action from the patient’s perspective.<br><br>When a patient opens their daily routine, PoseCare performs an automated spatial calibration. It checks distance, lighting, and joint visibility—prompting the user to step back or adjust framing before tracking begins." |
| **1:35 – 2:00** | **On-Screen**: Patient selects **Bicep Curl** and switches to **Zen Bloom Garden** or **Flappy Rehab**.<br><br>**Live Demo**: Patient performs a curl with intentional bad form (leaning torso back by $25^\circ$).<br><br>**Visual Alert**: HUD flashes amber: *"Torso leaning by 24° — maintain upright spine"*. Audio speaks correction in Hindi / English. | "As the patient moves, our 4-stage Biomechanical State Machine evaluates form. Notice what happens when I lean my torso backward: the system immediately flags the kinetic compensation with visual HUD alerts and instant voice coaching.<br><br>*[Voice Prompt Plays: 'मुद्रा सीधी रखें और संतुलन बनाए रखें']*<br><br>If form breaks during an isometric hold, the timer pauses automatically." |
| **2:00 – 2:25** | **On-Screen**: Patient performs a clean rep to $85^\circ$ flexion and returns smoothly.<br><br>**Visual**: Screen flashes green (*"Rep 1 / 15 Complete"*). Show the plant in Zen Bloom growing or the flyer soaring in Flappy Rehab. | "When a clean, controlled movement completes the full prescribed Range of Motion, the rep is validated, XP is awarded, and the daily allowance updates in real time across our 6 interactive game engines." |

---

### Scene 4: The Clinician Governance Loop (2:25 – 3:15)

| Time | Visual / Screen Action | Spoken Voiceover (Speaker Script) |
|---|---|---|
| **2:25 – 2:45** | **On-Screen**: Transition to **Doctor Dashboard** (`DoctorDashboard.jsx`).<br><br>**Show**: Patient Roster, 3D Anatomical Joint Viewer showing knee ACL flexion arc, and Prescription Builder sliders. | "PoseCare isn't just a fitness game—it's an end-to-end clinical governance platform.<br><br>On the **Doctor Dashboard**, orthopedic surgeons set medical diagnoses, safe Range of Motion bounds, and precautions. Doctors can inspect dynamic 3D joint articulations for conditions like ACL repairs or rotator cuff injuries." |
| **2:45 – 3:00** | **On-Screen**: Quick jump to **Physiotherapist Portal** (`PhysioDashboard.jsx`).<br><br>**Show**: Weekly exercise plan progression with daily volume assignment and day-of-week checkboxes. | "The prescription flows seamlessly to the **Physiotherapist Portal**, where therapists calibrate weekly sets, reps, and hold schedules to individualize recovery." |
| **3:00 – 3:15** | **On-Screen**: Back on Doctor Dashboard. Click **View Assessment / Create Medical Evaluation PDF**.<br><br>**Show**: High-resolution print-ready Medical Evaluation Report with recovery curves and digital signature stamp. | "Doctors get longitudinal recovery curves, adherence rate matrices, and can generate a formal, print-ready Medical Evaluation PDF report with one click for hospital records and insurance." |

---

### Scene 5: Offline-First Architecture & Reliability (3:15 – 3:45)

| Time | Visual / Screen Action | Spoken Voiceover (Speaker Script) |
|---|---|---|
| **3:15 – 3:35** | **On-Screen**: In Patient View, toggle browser to **Offline Mode** (or disable Wi-Fi).<br><br>**Show**: Status badge turns amber (*"Offline Mode (1 queued)"*). Patient completes another rep. Re-enable Wi-Fi.<br><br>**Show**: Badge flashes sky-blue & turns green (*"Synced to cloud"*). | "In real-world Indian conditions, internet connectivity can drop. PoseCare features an **Offline-First Sync Engine** using browser IndexedDB.<br><br>Even in airplane mode, exercise tracking and daily allowance progress run completely uninterrupted. The moment connection returns, queued telemetry syncs automatically in the background." |
| **3:35 – 3:45** | **On-Screen**: Show quick multi-language toggle (English &rarr; Hindi) in Navbar. | "With built-in bilingual voice coaching in both Hindi and English, PoseCare is accessible to diverse populations across Tier-1, Tier-2, and rural healthcare centers." |

---

### Scene 6: Impact, Scalability & Strong Closing Pitch (3:45 – 4:15)

| Time | Visual / Screen Action | Spoken Voiceover (Speaker Script) |
|---|---|---|
| **3:45 – 4:15** | **On-Screen**: Return to full-screen speaker with PoseCare hero graphics in background.<br><br>**Key Metric Tiles**: <br>• 0 Cloud GPU Costs<br>• 100% Privacy Compliant<br>• Works on any browser device<br><br>**Final Slide**: Team IceCube & PoseCare Logo with contact info. | "By running clinical-grade AI directly on consumer edge devices, PoseCare eliminates expensive cloud computing costs while safeguarding patient privacy by design.<br><br>We are bridging the gap between clinical physical therapy and at-home recovery—making rehabilitation engaging, accurate, and accessible for everyone.<br><br>**PoseCare: Precision Motion Intelligence for Faster, Safer Recovery.** Thank you!" |

---

## 💡 Quick Tips for a Winning Video Recording

1. **Camera Framing & Lighting**: Keep your face well-lit. When demoing the patient workout, make sure your upper body or full body is clearly visible in the webcam window to trigger the 60 FPS skeleton overlay immediately.
2. **Audio Clarity**: Use a headset or dedicated microphone. Ensure your system audio records clearly when demonstrating the real-time Hindi voice coach alert (*"मुद्रा सीधी रखें"*).
3. **Pacing**: Speak at a steady, confident pace. Let the visual screen recordings match your spoken words.
4. **Resolution**: Record your screen at 1080p (1920x1080) at 60 FPS for smooth canvas game animations.
