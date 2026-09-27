import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    exerciseLibrary: 'Exercise Library',
    forDoctors: 'For Doctors',
    accuracyBench: '⚡ Accuracy Bench',
    login: 'Log In',
    logout: 'Log Out',
    register: 'Sign Up',
    patientPortal: 'Patient Portal',
    doctorPortal: 'Doctor Portal',
    physioPortal: 'Physio Portal',
    adminPortal: 'Admin Portal',
    hello: 'Hello',

    // Language
    language: 'Language',
    english: 'English',
    hindi: 'हिन्दी',

    // Common Buttons & Labels
    startWorkout: 'Start Exercise',
    pauseWorkout: 'Pause',
    resumeWorkout: 'Resume',
    stopWorkout: 'End Session',
    reset: 'Reset',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    loading: 'Loading...',
    completed: 'Completed',
    progress: 'Progress',
    targetReps: 'Target Reps',
    completedReps: 'Completed Reps',
    holdTime: 'Hold Time',
    accuracy: 'Accuracy',
    rangeOfMotion: 'Range of Motion (ROM)',
    currentAngle: 'Current Angle',
    targetAngle: 'Target Angle',
    voiceCoach: 'Voice Coach',
    voiceCoachOn: 'Voice Coach: ON',
    voiceCoachOff: 'Voice Coach: OFF',
    viewTutorial: 'View Technique Tutorial',
    discomfortReport: 'Report Discomfort / Stop',

    // Calibration & Guidance
    calibrationTitle: 'Pre-Exercise Calibration',
    calibrationDesc: 'Position your entire body in full camera view with good lighting.',
    alignBody: 'Align your body with the frame guidelines',
    holdStill: 'Hold still for 3 seconds to calibrate baseline',
    calibratedSuccess: 'Calibration Complete! Get ready to begin.',

    // Feedback & Voice Prompts
    greatJob: 'Great job! Keep going.',
    repCompleted: 'Repetition completed!',
    holdPosition: 'Hold the position...',
    almostThere: 'Almost there! Push a little further.',
    watchPosture: 'Watch your posture. Maintain steady control.',
    goodForm: 'Excellent form!',
    slowDown: 'Perform the movement with smooth control.',
    halfwayThere: 'Halfway there! Keep it up.',
    workoutFinished: 'Workout Completed! Exceptional effort today.',
    
    // Exercise Categories
    // Patient Dashboard Tabs
    tabOverview: 'Overview',
    tabWorkout: "Today's Exercise",
    tabStats: 'Stats & Progress',
    tabQuests: 'Daily Quests',

    // Patient Dashboard Headers & Directives
    welcomeBack: 'Welcome back',
    level: 'Level',
    expert: 'Expert',
    rookie: 'Rookie',
    totalXPText: 'Total XP',
    focusAreaLabel: 'Focus Area',
    voiceCoachOn: '🔊 Voice Coach On',
    voiceCoachOff: '🔇 Voice Coach Off',
    doctorPrescriptionTitle: "Doctor's Medical Prescription & Safety Directives",
    doctorPrescriptionSub: 'Established by attending physician • Calibrated & verified by your Physiotherapist',
    verifiedByPhysio: '✓ Verified by Physio',
    inPhysioCalibration: '⏳ In Physio Calibration',
    primaryDiagnosis: 'Primary Diagnosis',
    pathology: 'Pathology / Joint',
    movementRestrictions: 'Movement Restrictions',
    safetyPrecautions: 'Safety Precautions',

    // Daily Workout & Routine Cards
    todaysRoutineTitle: "Today's Prescribed Routine",
    todaysRoutineSub: 'Complete your daily sets to maintain your recovery streak and earn XP.',
    allCompletedBanner: '🎉 All scheduled exercises for today have been completed!',
    restDayTitle: 'Rest & Recovery Day',
    restDaySub: 'No exercises scheduled for today. Rest and allow your muscles to recover.',
    dailyAllowance: 'Daily Target',
    remaining: 'Remaining',
    setsRepsInfo: 'Sets & Reps',
    sessionsPerDay: 'Sessions/Day',
    restTime: 'Rest Time',
    watchTutorialBtn: 'Watch Tutorial',
    startWorkoutBtn: 'Start Exercise',
    reportDiscomfortBtn: 'Report Discomfort / Stop',

    // Metrics & Quick Stats
    streakTitle: 'Active Streak',
    streakDays: 'Days Active',
    totalRepsTitle: 'Total Reps Completed',
    avgAccuracyTitle: 'Avg Form Accuracy',
    completedSessionsTitle: 'Sessions Logged',

    // Stats & Progress Tab
    statsTabTitle: 'Recovery Analytics & Biomechanical Progression',
    chartReps: 'Repetitions',
    chartAccuracy: 'Accuracy %',
    chartRom: 'Peak ROM (°)',
    filterGameMode: 'Filter by Game',
    allGames: 'All Games',
    filterExercise: 'Filter by Exercise',
    recentActivity: 'Recent Workout History',
    noHistory: 'No workout history recorded yet. Complete your first exercise!',
    achievementsTitle: 'Achievements & Milestones',
    unlockedBadge: 'Unlocked',
    lockedBadge: 'Locked',

    // Daily Quests Tab
    dailyQuestsTitle: 'Daily Rehabilitation Quests',
    dailyQuestsSub: 'Earn bonus clinical XP and level up your recovery profile.',
    leaderboardTitle: 'Patient Community Leaderboard',

    // Exercise Categories
    allExercises: 'All Exercises',
    kneeRehab: 'Knee Rehab',
    shoulderRehab: 'Shoulder Rehab',
    elbowRehab: 'Elbow Rehab',
    coreSpine: 'Core & Spine',
    balanceMobility: 'Balance & Mobility',

    // Privacy & Tech
    edgePrivacy: 'Edge AI Privacy',
    edgePrivacyDesc: 'Webcam video is processed locally in real-time. No video is ever recorded or uploaded.'
  },
  hi: {
    // Navigation
    home: 'होम',
    exerciseLibrary: 'व्यायाम लाइब्रेरी',
    forDoctors: 'डॉक्टरों के लिए',
    accuracyBench: '⚡ सटीकता बेंच',
    login: 'लॉग इन करें',
    logout: 'लॉग आउट',
    register: 'साइन अप करें',
    patientPortal: 'मरीज़ पोर्टल',
    doctorPortal: 'डॉक्टर पोर्टल',
    physioPortal: 'फिजियो पोर्टल',
    adminPortal: 'एडमिन पोर्टल',
    hello: 'नमस्ते',

    // Language
    language: 'भाषा',
    english: 'English',
    hindi: 'हिन्दी',

    // Common Buttons & Labels
    startWorkout: 'व्यायाम शुरू करें',
    pauseWorkout: 'रोकें',
    resumeWorkout: 'फिर से शुरू करें',
    stopWorkout: 'सत्र समाप्त करें',
    reset: 'रीसेट करें',
    close: 'बंद करें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    loading: 'लोड हो रहा है...',
    completed: 'पूर्ण',
    progress: 'प्रगति',
    targetReps: 'लक्ष्य रेप्स',
    completedReps: 'पूरे किए गए रेप्स',
    holdTime: 'रोकने का समय',
    accuracy: 'सटीकता',
    rangeOfMotion: 'गति का दायरा (ROM)',
    currentAngle: 'वर्तमान कोण',
    targetAngle: 'लक्ष्य कोण',
    voiceCoach: 'वॉयस कोच',
    voiceCoachOn: '🔊 वॉयस कोच चालू',
    voiceCoachOff: '🔇 वॉयस कोच बंद',
    viewTutorial: 'तकनीकी ट्यूटोरियल देखें',
    discomfortReport: 'असुविधा रिपोर्ट करें / रोकें',

    // Calibration & Guidance
    calibrationTitle: 'व्यायाम-पूर्व अंशांकन (कैलिब्रेशन)',
    calibrationDesc: 'अच्छी रोशनी में अपने पूरे शरीर को कैमरे के सामने रखें।',
    alignBody: 'अपने शरीर को स्क्रीन की गाइडलाइन के अनुसार सीधा करें',
    holdStill: 'आधार रेखा तय करने के लिए 3 सेकंड स्थिर रहें',
    calibratedSuccess: 'कैलिब्रेशन पूरा हुआ! शुरू करने के लिए तैयार रहें।',

    // Feedback & Voice Prompts
    greatJob: 'बहुत बढ़िया! गति बनाए रखें।',
    repCompleted: 'रेप पूरा हुआ!',
    holdPosition: 'इस स्थिति को बनाए रखें...',
    almostThere: 'बस थोड़ा और! आगे बढ़ें।',
    watchPosture: 'अपनी मुद्रा पर ध्यान दें। संतुलन बनाए रखें।',
    goodForm: 'उत्कृष्ट फॉर्म!',
    slowDown: 'आंदोलन को धीमी और नियंत्रित गति से करें।',
    halfwayThere: 'आधा रास्ता तय हो गया! लगे रहें।',
    workoutFinished: 'व्यायाम पूरा हुआ! आज आपका प्रदर्शन शानदार रहा।',

    // Patient Dashboard Tabs
    tabOverview: 'अवलोकन',
    tabWorkout: 'आज का व्यायाम',
    tabStats: 'आंकड़े और प्रगति',
    tabQuests: 'दैनिक लक्ष्य',

    // Patient Dashboard Headers & Directives
    welcomeBack: 'स्वागत है',
    level: 'स्तर',
    expert: 'विशेषज्ञ',
    rookie: 'प्रशिक्षु',
    totalXPText: 'कुल एक्सपी',
    focusAreaLabel: 'फ़ोकस क्षेत्र',
    doctorPrescriptionTitle: 'डॉक्टर का मेडिकल पर्चा और सुरक्षा निर्देश',
    doctorPrescriptionSub: 'उपचारक चिकित्सक द्वारा निर्धारित • आपके फिजियोथेरेपिस्ट द्वारा कैलिब्रेटेड और सत्यापित',
    verifiedByPhysio: '✓ फिजियो द्वारा सत्यापित',
    inPhysioCalibration: '⏳ फिजियो समीक्षा में',
    primaryDiagnosis: 'प्राथमिक निदान',
    pathology: 'पैथोलॉजी / जोड़',
    movementRestrictions: 'आंदोलन प्रतिबंध',
    safetyPrecautions: 'सुरक्षा सावधानियां',

    // Daily Workout & Routine Cards
    todaysRoutineTitle: 'आज का निर्धारित व्यायाम दिनचर्या',
    todaysRoutineSub: 'अपनी रिकवरी लड़ी (Streak) बनाए रखने और एक्सपी अर्जित करने के लिए आज के सेट पूरे करें।',
    allCompletedBanner: '🎉 आज के सभी निर्धारित व्यायाम पूरे हो चुके हैं!',
    restDayTitle: 'विश्राम और रिकवरी दिवस',
    restDaySub: 'आज के लिए कोई व्यायाम निर्धारित नहीं है। आराम करें और अपनी मांसपेशियों को ठीक होने दें।',
    dailyAllowance: 'दैनिक लक्ष्य',
    remaining: 'शेष',
    setsRepsInfo: 'सेट और रेप्स',
    sessionsPerDay: 'सत्र प्रति दिन',
    restTime: 'विश्राम समय',
    watchTutorialBtn: 'ट्यूटोरियल देखें',
    startWorkoutBtn: 'व्यायाम शुरू करें',
    reportDiscomfortBtn: 'असुविधा रिपोर्ट करें / रोकें',

    // Metrics & Quick Stats
    streakTitle: 'सक्रिय लड़ी (Streak)',
    streakDays: 'दिन सक्रिय',
    totalRepsTitle: 'कुल पूर्ण रेप्स',
    avgAccuracyTitle: 'औसत फॉर्म सटीकता',
    completedSessionsTitle: 'दर्ज सत्र',

    // Stats & Progress Tab
    statsTabTitle: 'रिकवरी विश्लेषण और बायोमैकेनिकल प्रगति',
    chartReps: 'रेप्स',
    chartAccuracy: 'सटीकता %',
    chartRom: 'अधिकतम कोण (°)',
    filterGameMode: 'गेम के अनुसार फ़िल्टर करें',
    allGames: 'सभी खेल',
    filterExercise: 'व्यायाम के अनुसार फ़िल्टर करें',
    recentActivity: 'हालिया वर्कआउट इतिहास',
    noHistory: 'अभी तक कोई वर्कआउट इतिहास दर्ज नहीं हुआ है। अपना पहला व्यायाम पूरा करें!',
    achievementsTitle: 'उपलब्धियां और पदक',
    unlockedBadge: 'अनलॉक किया गया',
    lockedBadge: 'लॉक किया गया',

    // Daily Quests Tab
    dailyQuestsTitle: 'दैनिक पुनर्वास लक्ष्य',
    dailyQuestsSub: 'बोनस क्लिनिकल एक्सपी अर्जित करें और अपना रिकवरी स्तर बढ़ाएं।',
    leaderboardTitle: 'मरीज़ समुदाय लीडरबोर्ड',

    // Exercise Categories
    allExercises: 'सभी व्यायाम',
    kneeRehab: 'घुटने का पुनर्वास',
    shoulderRehab: 'कंधे का पुनर्वास',
    elbowRehab: 'कोहनी का व्यायाम',
    coreSpine: 'कोर और रीढ़ की हड्डी',
    balanceMobility: 'संतुलन और गतिशीलता',

    // Privacy & Tech
    edgePrivacy: 'एज एआई गोपनीयता',
    edgePrivacyDesc: 'वेबकैम वीडियो वास्तविक समय में स्थानीय रूप से प्रोसेस होता है। कोई वीडियो रिकॉर्ड या अपलोड नहीं किया जाता।'
  }
};

export const exerciseTranslations = {
  'Bicep Curl': {
    nameHi: 'बाइसेप कर्ल',
    jointsHi: 'कोहनी का जोड़',
    descHi: 'बाइसेप्स मांसपेशियों को मजबूत करने के लिए कोहनी मोड़ने का व्यायाम।',
    guidanceHi: 'अपनी ऊपरी बांह को अपनी पसलियों के पास स्थिर रखें। कोहनी को धीरे-धीरे मोड़ें।',
    tipHi: 'कैमरे के सामने सीधे खड़े हों। कोहनी को आगे-पीछे हिलाने से बचें।'
  },
  'Bicep Curl (Standing)': {
    nameHi: 'स्टैंडिंग बाइसेप कर्ल',
    jointsHi: 'कोहनी का जोड़',
    descHi: 'खड़े होकर बाइसेप्स मांसपेशियों के लिए पारंपरिक व्यायाम।',
    guidanceHi: 'ऊपरी बांह को सीधा रखें और कोहनी को 85 डिग्री तक मोड़ें।',
    tipHi: 'शरीर को स्थिर रखें और झटके से बांह न उठाएं।'
  },
  'Mini Squat': {
    nameHi: 'मिनी स्क्वैट',
    jointsHi: 'घुटने और कूल्हे के जोड़',
    descHi: 'घुटने के पुनर्वास और जांघ की मांसपेशियों के लिए सुरक्षित आंशिक स्क्वैट।',
    guidanceHi: 'घुटनों को लगभग 125 डिग्री तक मोड़ें, पीठ सीधी रखें और धीरे-धीरे ऊपर उठें।',
    tipHi: 'घुटनों को पंजों के आगे न जाने दें।'
  },
  'Seated Knee Extension': {
    nameHi: 'सीटेड नी एक्सटेंशन',
    jointsHi: 'घुटने का जोड़',
    descHi: 'बैठकर घुटने को सीधा करने का व्यायाम, जो क्वाड्रिसेप्स को मजबूत करता है।',
    guidanceHi: 'कुर्सी पर सीधे बैठें, पैर को धीरे-धीरे सीधा करें और 2 सेकंड रोकें।',
    tipHi: 'झटका न दें, घुटने को नियंत्रित गति से सीधा करें।'
  },
  'Straight Leg Raise': {
    nameHi: 'स्ट्रेट लेग रेज़',
    jointsHi: 'कूल्हे और घुटने',
    descHi: 'सीधे पैर को ऊपर उठाने का व्यायाम, जो जांघ और कूल्हे की ताकत बढ़ाता है।',
    guidanceHi: 'घुटने को पूरी तरह सीधा रखते हुए पैर को लगभग 45 डिग्री तक उठाएं।',
    tipHi: 'पैर को मोड़ें नहीं, कोर को टाइट रखें।'
  },
  'Push-up': {
    nameHi: 'पुश-अप',
    jointsHi: 'कोहनी और कंधे',
    descHi: 'छाती, कंधे और ट्राइसेप्स की मजबूती के लिए क्लासिक व्यायाम।',
    guidanceHi: 'शरीर को एक सीधी रेखा में रखें, कोहनियों को 90 डिग्री तक नीचे लाएं।',
    tipHi: 'कमर को नीचे न झुकने दें।'
  },
  'Crunch': {
    nameHi: 'क्रंच',
    jointsHi: 'कोर और पेट की मांसपेशियां',
    descHi: 'पेट की मांसपेशियों (एब्स) के स्थिरीकरण के लिए।',
    guidanceHi: 'कंधों को फर्श से थोड़ा ऊपर उठाएं और पेट को सिकोड़ें।',
    tipHi: 'गर्दन पर दबाव न डालें, छाती से ऊपर उठें।'
  },
  'Standing Knee Flexion': {
    nameHi: 'स्टैंडिंग नी फ्लेक्सियन',
    jointsHi: 'घुटने का जोड़ (हैमस्ट्रिंग)',
    descHi: 'खड़े होकर घुटने को पीछे मोड़ना, हैमस्ट्रिंग मांसपेशियों की रिकवरी के लिए।',
    guidanceHi: 'खड़े होकर एड़ी को धीरे-धीरे नितंब की ओर उठाएं।',
    tipHi: 'जांघों को एक सीध में रखें, संतुलन के लिए सहारा लें।'
  },
  'Standing Hip Abduction': {
    nameHi: 'स्टैंडिंग हिप एब्डक्शन',
    jointsHi: 'कूल्हे का बाहरी जोड़',
    descHi: 'पैर को बाहर की तरफ उठाना, कूल्हे के स्टेबलाइजर्स के लिए।',
    guidanceHi: 'पैर को सीधा रखते हुए धीरे-धीरे साइड में बाहर उठाएं।',
    tipHi: 'शरीर को एक तरफ न झुकाएं, सीधा खड़े रहें।'
  },
  'Shoulder Flexion': {
    nameHi: 'शोल्डर फ्लेक्सियन',
    jointsHi: 'कंधे का जोड़',
    descHi: 'हाथ को सीधा ऊपर उठाना, कंधे की गतिशीलता के लिए।',
    guidanceHi: 'हाथ को सीधा रखते हुए धीरे-धीरे सिर के ऊपर उठाएं।',
    tipHi: 'कंधों को सिकोड़ें नहीं, सहज गति रखें।'
  },
  'Wall Slides': {
    nameHi: 'वॉल स्लाइड्स',
    jointsHi: 'कंधे और स्कैपुला',
    descHi: 'दीवार के सहारे बाहों को ऊपर-नीचे खिसकाना।',
    guidanceHi: 'पीठ और कोहनियों को दीवार से सटाकर रखें और ऊपर स्लाइड करें।',
    tipHi: 'कोहनी को दीवार से अलग न होने दें।'
  },
  'Calf Raise': {
    nameHi: 'काफ रेज़',
    jointsHi: 'टखना और पिंडली',
    descHi: 'पिंडलियों को मजबूत करने और टखने की स्थिरता के लिए पंजों पर उठना।',
    guidanceHi: 'पंजों के बल धीरे-धीरे ऊपर उठें और शीर्ष पर 1 सेकंड रुकें।',
    tipHi: 'धीमी और नियंत्रित गति से नीचे आएं।'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('posecare_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('posecare_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key) => {
    if (!translations[language]) return translations.en[key] || key;
    return translations[language][key] || translations.en[key] || key;
  };

  const getExerciseInfo = (name, field) => {
    const tr = exerciseTranslations[name];
    if (!tr) return null;
    if (language === 'hi') {
      if (field === 'name') return tr.nameHi;
      if (field === 'joints') return tr.jointsHi;
      if (field === 'desc') return tr.descHi;
      if (field === 'guidance') return tr.guidanceHi;
      if (field === 'tip') return tr.tipHi;
    }
    return null;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, getExerciseInfo }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
