import React, { useState, useEffect } from "react";
import { 
  BookOpen, Sparkles, Trophy, Award, Flame, Wifi, Battery, Clock, ArrowLeft, 
  HelpCircle, CheckCircle, TrendingUp, Compass, Ruler, Hash, Pizza, Coins,
  Smartphone, User, Star, StarOff, Play, ShieldAlert, Sparkle, Target, Layers
} from "lucide-react";
import { Chapter, StudentStats } from "./types";
import { 
  CHAPTERS_DATA, 
  GRADE_1_CHAPTERS, 
  GRADE_6_CHAPTERS, 
  GRADE_9_CHAPTERS,
  GRADE_1_MATHS_CHAPTERS,
  GRADE_1_EVS_CHAPTERS,
  GRADE_1_TELUGU_CHAPTERS,
  GRADE_1_HINDI_CHAPTERS,
  GRADE_1_ENGLISH_CHAPTERS
} from "./data/lessons";
import LessonSection from "./components/LessonSection";
import PracticeQuiz from "./components/PracticeQuiz";
import VisualTools from "./components/VisualTools";
import TutorChat from "./components/TutorChat";

export default function App() {
  // Grade state
  const [selectedGrade, setSelectedGrade] = useState<1 | 6 | 9>(6);
  
  // Subject state for Grade 1
  const [selectedSubject, setSelectedSubject] = useState<"maths" | "evs" | "telugu" | "hindi" | "english">("maths");
  const [showGrade1Topics, setShowGrade1Topics] = useState<boolean>(false);

  const getChaptersForGrade = (grade: 1 | 6 | 9): Chapter[] => {
    if (grade === 1) {
      if (selectedSubject === "evs") return GRADE_1_EVS_CHAPTERS;
      if (selectedSubject === "telugu") return GRADE_1_TELUGU_CHAPTERS;
      if (selectedSubject === "hindi") return GRADE_1_HINDI_CHAPTERS;
      if (selectedSubject === "english") return GRADE_1_ENGLISH_CHAPTERS;
      return GRADE_1_MATHS_CHAPTERS;
    }
    if (grade === 9) {
      if (selectedSubject === "maths") return GRADE_9_CHAPTERS;
      return [];
    }
    // grade === 6
    if (selectedSubject === "maths") return GRADE_6_CHAPTERS;
    return [];
  };

  const currentChapters = getChaptersForGrade(selectedGrade);

  // Application Screen state
  const [activeSection, setActiveSection] = useState<"dashboard" | "lessons" | "quiz" | "visualtools" | "tutor" | "achievements">("dashboard");
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(GRADE_6_CHAPTERS[0]);
  const [showChapters, setShowChapters] = useState<boolean>(false);

  useEffect(() => {
    if (currentChapters && currentChapters.length > 0) {
      setSelectedChapter(currentChapters[0]);
    }
  }, [selectedGrade, selectedSubject]);
  const [activeTool, setActiveTool] = useState<"fraction" | "numberline" | "placevalue" | "perimeter" | "typesofnumbers">("fraction");
  const [activeHighlightMode, setActiveHighlightMode] = useState<string>("all");

  // Indian CBSE Student Profile States
  const [studentName] = useState<string>("నాన్న");
  const [studentRoll] = useState<string>("CBSE-6-Roll14");
  const [schoolName] = useState<string>("Delhi Public School, R.K. Puram");
  
  const [scorePoints, setScorePoints] = useState<number>(140);
  const [completedQuizzes, setCompletedQuizzes] = useState<number>(2);
  const [streakDays, setStreakDays] = useState<number>(4);
  const [solvedProblemsCount, setSolvedProblemsCount] = useState<number>(12);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([
    "Welcome Scholar",
    "Fraction Fanatic",
  ]);

  // Current Indian Clock Time (calculated reactively or using local metadata)
  const [currentTimeStr, setCurrentTimeStr] = useState<string>("10:30 AM");
  
  useEffect(() => {
    // Read current local time formatted nicely for the phone status bar
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Audio/Vibe notifications
  const triggerNotification = (title: string, msg: string) => {
    console.log(`Notification: ${title} - ${msg}`);
  };

  const handleActionComplete = (points: number, badgeUnlocked?: string) => {
    setScorePoints((prev) => prev + points);
    if (badgeUnlocked && !unlockedBadges.includes(badgeUnlocked)) {
      setUnlockedBadges((prev) => [...prev, badgeUnlocked]);
      triggerNotification("New Badge Unlocked! 🏅", badgeUnlocked);
    }
  };

  const handleQuizComplete = (pointsWon: number, problemsCount: number) => {
    setScorePoints((prev) => prev + pointsWon);
    setCompletedQuizzes((prev) => prev + 1);
    setSolvedProblemsCount((prev) => prev + problemsCount);
    
    // Auto-unlock specific achievement
    if (pointsWon >= 80 && !unlockedBadges.includes("Math Topper")) {
      setUnlockedBadges((prev) => [...prev, "Math Topper"]);
    }
    if (completedQuizzes + 1 >= 3 && !unlockedBadges.includes("CBSE Champion")) {
      setUnlockedBadges((prev) => [...prev, "CBSE Champion"]);
    }
  };

  const handleTutorAction = (points: number) => {
    setScorePoints((prev) => prev + points);
  };

  const launchCustomTutorQuestion = (query: string) => {
    setActiveSection("tutor");
    // Handled internally in TutorChat via props/trigger
  };

  const handleBadgeClick = (badge: string) => {
    triggerNotification("Award Info", `Badge: ${badge}`);
  };

  // Chapter Click actions
  const handleChapterSelect = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setActiveSection("lessons");
  };

  return (
    <div className="min-h-screen bg-natural-bg text-slate-800 font-sans flex flex-col antialiased" id="root_viewport">
      {/* Immersive Classroom Header Bar (Desktop Only) */}
      <header className="hidden md:flex bg-natural-beige-light border-b border-natural-beige-dark px-8 py-4 items-center justify-between shadow-xs shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-natural-primary flex items-center justify-center text-white font-black shadow-md shadow-natural-primary/20">
            Σ
          </div>
          <div>
            <h1 className="text-base font-extrabold text-natural-dark tracking-tight">CBSE Grade 6 Math Companion</h1>
            <p className="text-[10px] text-natural-sage font-medium">Empowering interactive, gamified self-learning in Mathematics</p>
          </div>
        </div>
        
        {/* Real-time board details */}
        <div className="flex items-center gap-6 text-xs font-semibold text-natural-sage">
          <div className="flex items-center gap-2 bg-white border border-natural-beige-dark px-3 py-1.5 rounded-lg">
            <span className="w-2 h-2 bg-natural-primary rounded-full animate-ping" />
            <span className="text-natural-dark">Student Sync: Online</span>
          </div>
          <div>
            Board: <strong className="text-natural-terracotta font-bold uppercase">CBSE (NCERT)</strong>
          </div>
          <div>
            Standard: <strong className="text-natural-primary font-bold">Class VI</strong>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col lg:flex-row p-4 md:p-6 lg:p-8 gap-6 justify-center items-stretch max-w-7xl w-full mx-auto overflow-hidden">
        
        {/* LEFT COLUMN: SLEEK ANDROID MOCKUP CONTAINER */}
        <div className="w-full lg:w-[410px] shrink-0 flex flex-col items-center justify-center" id="android_phone_frame">
          <div className="w-full max-w-[390px] h-[800px] bg-[#5a5a40] rounded-[48px] p-3.5 shadow-2xl border-4 border-[#4a4a35] flex flex-col overflow-hidden relative">
            
            {/* Phone Notch/Punch Hole */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-black rounded-full z-40 flex items-center justify-center">
              {/* Speaker & Camera glass circles */}
              <div className="w-2.5 h-2.5 bg-slate-800 rounded-full mr-4" />
              <div className="w-12 h-1 bg-slate-900 rounded-full" />
            </div>

            {/* Simulated Android Status Bar */}
            <div className="bg-natural-beige-light px-6 pt-3 pb-2 flex justify-between items-center text-[11px] font-black text-natural-dark rounded-t-[34px] z-30 select-none border-b border-natural-beige-dark/40">
              <span className="font-semibold text-natural-dark">{currentTimeStr}</span>
              <div className="flex items-center gap-1.5 text-natural-sage">
                <Wifi size={11} className="stroke-[2.5]" />
                <span className="font-bold">5G</span>
                <Battery size={13} className="stroke-[2.5]" />
                <span className="font-bold text-[10px]">100%</span>
              </div>
            </div>

            {/* ACTIVE SCREEN PORT (The actual mobile application UI) */}
            <div className="flex-1 bg-natural-bg flex flex-col overflow-hidden rounded-b-[34px] relative" id="active_phone_screen">
              
              {/* Header Profile Bar (Adaptive to different screens) */}
              <div className="bg-gradient-to-br from-natural-dark to-[#494933] p-4 text-white shrink-0 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 bottom-0 translate-y-2 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-lg text-natural-cream shadow-inner">
                      👨‍🏫
                    </div>
                    <div>
                      <h4 className="font-black text-sm tracking-wide leading-none">{studentName}</h4>
                    </div>
                  </div>
                  {/* points display */}
                  <div className="bg-white/10 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-white/15 flex items-center gap-1.5 shadow-sm">
                    <span className="text-amber-300 text-sm">⭐</span>
                    <span className="font-mono text-xs font-black text-white">{scorePoints}</span>
                  </div>
                </div>

                {/* Score Stats bar below header */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-center text-white">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-[11px] font-black text-natural-terracotta">
                      <Flame size={12} className="fill-current text-natural-terracotta" />
                      <span className="text-white">{streakDays} Days</span>
                    </div>
                    <span className="text-[8px] text-natural-beige-light/80 uppercase font-bold tracking-wider mt-0.5">Study Streak</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-white/10">
                    <div className="flex items-center gap-1 text-[11px] font-black text-natural-primary">
                      <CheckCircle size={11} className="text-natural-primary" />
                      <span className="text-white">{completedQuizzes} Tests</span>
                    </div>
                    <span className="text-[8px] text-natural-beige-light/80 uppercase font-bold tracking-wider mt-0.5">Completed</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-[11px] font-black text-natural-cream">
                      <TrendingUp size={11} className="text-natural-cream" />
                      <span className="text-white">{solvedProblemsCount}</span>
                    </div>
                    <span className="text-[8px] text-natural-beige-light/80 uppercase font-bold tracking-wider mt-0.5">Solved Task</span>
                  </div>
                </div>
              </div>

              {/* SCREEN NAVIGATION PORTPORT */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" id="screen_viewport_scrollable">
                
                {/* 1. DASHBOARD SCREEN */}
                {activeSection === "dashboard" && (
                  <div className="space-y-4 animate-fade-in" id="dashboard_screen_wrapper">
                    


                    {/* Grade Selector buttons */}
                    {!showChapters ? (
                      <div className="space-y-4 animate-fade-in" id="grade_selection_view">
                        <div className="bg-natural-beige-light border border-natural-beige-dark/60 rounded-2xl p-4 shadow-sm">
                          <span className="text-[10px] font-black uppercase text-natural-sage tracking-wider block mb-3 text-center">
                            Select Grade Level / తరగతిని ఎంచుకోండి
                          </span>
                          <div className="grid grid-cols-3 gap-2.5" id="grade_selector_group">
                            {[
                              { g: 1 as const, label: "Grade 1", emoji: "🌱", sub: "Class I" },
                              { g: 6 as const, label: "Grade 6", emoji: "📙", sub: "Class VI" },
                              { g: 9 as const, label: "Grade 9", emoji: "🚀", sub: "Class IX" }
                            ].map((item) => (
                              <button
                                key={item.g}
                                onClick={() => {
                                  setSelectedGrade(item.g);
                                  setShowChapters(true);
                                  setShowGrade1Topics(false);
                                }}
                                className="p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5 bg-white hover:bg-natural-cream text-natural-dark border-natural-beige-dark/60 hover:border-natural-primary/40 hover:scale-[1.02] duration-200 shadow-xs"
                                id={`btn_grade_${item.g}`}
                              >
                                <span className="text-xl">{item.emoji}</span>
                                <span className="text-xs font-black">{item.label}</span>
                                <span className="text-[9px] font-extrabold opacity-75 block leading-none">{item.sub}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Warm "Nanna" Fatherly Tutor Card */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-200/80 rounded-2xl p-4.5 text-natural-dark flex gap-3.5 shadow-xs relative overflow-hidden" id="nanna_tutor_card">
                          <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-10 text-8xl select-none">👨‍👧‍👦</div>
                          <div className="w-12 h-12 rounded-full bg-orange-100 shrink-0 flex items-center justify-center text-2xl shadow-inner border border-orange-200">
                            👨‍🏫
                          </div>
                          <div className="space-y-1.5 flex-1 z-10">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="bg-orange-600 text-white px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider">
                                Fatherly Tutor
                              </span>
                              <span className="text-[11px] font-extrabold text-orange-700 tracking-tight font-serif">నాన్న ట్యూటర్</span>
                            </div>
                            <h4 className="font-extrabold text-[15px] text-orange-950 tracking-tight leading-snug flex items-center gap-1.5" id="nanna_tutor_heading">
                              <span className="bg-orange-600 text-white px-2 py-0.5 rounded-lg font-black font-serif shadow-xs inline-block text-[15px]">నాన్న</span> (Nanna)
                            </h4>
                            <p className="text-[10px] text-orange-900/90 leading-relaxed font-serif">
                              "నాయనా/అమ్మా! చదువు మన జీవితానికి వెలుగు. నీకు ఏ తరగతి కావాలో పైన ఉన్న బటన్ల ద్వారా ఎంచుకో, మనం కలిసి ఎంతో సరదాగా చదువుకుందాం!"
                            </p>
                            <div className="text-[9px] text-orange-800/80 font-mono italic mt-1 font-semibold flex items-center gap-1">
                              <span>🧡</span>
                              <span>Supportive, caring fatherly learning helper</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 animate-fade-in" id="syllabus_chapters_view">
                        {/* Selected Syllabus Header with Back Button */}
                        <div className="flex items-center justify-between bg-natural-beige-light border border-natural-beige-dark/60 rounded-2xl p-3 shadow-xs" id="chapters_view_header">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">
                              {selectedGrade === 1 ? "🌱" : selectedGrade === 6 ? "📙" : "🚀"}
                            </span>
                            <div>
                              <h4 className="font-extrabold text-xs text-natural-dark leading-none">
                                Grade {selectedGrade} Syllabus
                              </h4>
                              <p className="text-[9px] text-natural-sage mt-0.5 font-bold uppercase tracking-wider">
                                {selectedGrade === 1 ? `${selectedSubject} Module` : "NCERT Mathematics"}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setShowChapters(false);
                              setShowGrade1Topics(false);
                            }}
                            className="flex items-center gap-1 text-[10px] font-extrabold text-natural-primary bg-white hover:bg-natural-cream border border-natural-beige-dark/60 px-3 py-1 rounded-xl cursor-pointer transition shadow-xs hover:scale-[1.02] duration-150"
                          >
                            <ArrowLeft size={10} /> Change Grade
                          </button>
                        </div>

                        {/* Subject Selector for all grades */}
                        {selectedGrade === 1 ? (
                          <div className="space-y-4">
                            {!showGrade1Topics ? (
                              <div className="bg-natural-beige-light border border-natural-beige-dark/60 rounded-2xl p-4 space-y-3.5 animate-fade-in" id="grade_1_vertical_subject_selector">
                                <span className="text-[10px] font-black uppercase text-natural-sage tracking-wider block text-center mb-1">
                                  సబ్జెక్ట్ ఎంచుకోండి / Select Subject
                                </span>
                                <div className="flex flex-col gap-2.5" id="subject_selector_group_vertical">
                                  {[
                                    { s: "maths" as const, label: "Maths / గణితం", desc: "Learn numbers, counting, & basic shapes!", emoji: "🍎", activeBg: "bg-orange-600 border-orange-600 text-white shadow-md", inactiveBg: "bg-white hover:bg-orange-50/40 text-natural-dark border-natural-beige-dark/60" },
                                    { s: "evs" as const, label: "EVS / పరిసరాల విజ్ఞానం", desc: "Learn about family, animals, & seasons!", emoji: "🌳", activeBg: "bg-emerald-600 border-emerald-600 text-white shadow-md", inactiveBg: "bg-white hover:bg-emerald-50/40 text-natural-dark border-natural-beige-dark/60" },
                                    { s: "telugu" as const, label: "Telugu / తెలుగు", desc: "Learn alphabets & sweet words!", emoji: "✍️", activeBg: "bg-rose-600 border-rose-600 text-white shadow-md", inactiveBg: "bg-white hover:bg-rose-50/40 text-natural-dark border-natural-beige-dark/60" },
                                    { s: "hindi" as const, label: "Hindi / హిందీ", desc: "Learn letters, counting, & simple fruits!", emoji: "🍇", activeBg: "bg-teal-600 border-teal-600 text-white shadow-md", inactiveBg: "bg-white hover:bg-teal-50/40 text-natural-dark border-natural-beige-dark/60" },
                                    { s: "english" as const, label: "English / ఆంగ్లం", desc: "Learn phonics, naming words, & action words!", emoji: "🔤", activeBg: "bg-blue-600 border-blue-600 text-white shadow-md", inactiveBg: "bg-white hover:bg-blue-50/40 text-natural-dark border-natural-beige-dark/60" }
                                  ].map((item) => (
                                    <button
                                      key={item.s}
                                      onClick={() => {
                                        setSelectedSubject(item.s);
                                        setShowGrade1Topics(true);
                                      }}
                                      className={`p-3 rounded-xl border text-left transition duration-200 cursor-pointer flex items-center gap-3.5 hover:scale-[1.01] ${
                                        selectedSubject === item.s
                                          ? `${item.activeBg} font-extrabold`
                                          : `${item.inactiveBg} font-semibold`
                                      }`}
                                      id={`btn_subject_${item.s}`}
                                    >
                                      <span className="text-xl bg-white/20 p-2 rounded-xl flex items-center justify-center">{item.emoji}</span>
                                      <div className="flex-1 min-w-0">
                                        <span className="text-xs font-black block tracking-tight leading-tight">{item.label}</span>
                                        <span className={`text-[9px] block leading-tight mt-0.5 truncate ${selectedSubject === item.s ? 'text-white/80' : 'text-natural-sage'}`}>
                                          {item.desc}
                                        </span>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-4 animate-fade-in" id="grade_1_topics_page">
                                {/* Back Button to return to subject list */}
                                <div className="flex items-center justify-between">
                                  <button
                                    onClick={() => setShowGrade1Topics(false)}
                                    className="flex items-center gap-1.5 text-[10px] font-extrabold text-natural-primary bg-white hover:bg-natural-cream border border-natural-beige-dark/60 px-3.5 py-1.5 rounded-xl cursor-pointer transition shadow-xs hover:scale-[1.01]"
                                  >
                                    <ArrowLeft size={12} /> Subjects / సబ్జెక్టులు
                                  </button>
                                  
                                  <div className="flex items-center gap-1.5 bg-natural-beige-light border border-natural-beige-dark/40 px-3 py-1 rounded-xl text-xs font-extrabold text-natural-dark">
                                    <span>
                                      {selectedSubject === "maths" && "🍎 Maths / గణితం"}
                                      {selectedSubject === "evs" && "🌳 EVS / పరిసరాల విజ్ఞానం"}
                                      {selectedSubject === "telugu" && "✍️ Telugu / తెలుగు"}
                                      {selectedSubject === "hindi" && "🍇 Hindi / హిందీ"}
                                      {selectedSubject === "english" && "🔤 English / ఆంగ్లం"}
                                    </span>
                                  </div>
                                </div>

                                {/* Learning Topics / Chapters list for Grade 1 */}
                                <div className="space-y-2.5">
                                  {currentChapters.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-2.5">
                                      {currentChapters.map((chapter) => (
                                        <button
                                          key={chapter.id}
                                          onClick={() => handleChapterSelect(chapter)}
                                          className={`p-3.5 rounded-2xl border text-left transition duration-200 cursor-pointer flex justify-between items-center group relative overflow-hidden shadow-xs bg-white border-natural-beige-dark hover:border-natural-primary/50 hover:bg-natural-cream/20`}
                                        >
                                          <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-natural-beige-light flex items-center justify-center text-lg shadow-inner group-hover:scale-105 transition">
                                              {chapter.id === "g1_counting" && <Layers size={16} className="text-natural-primary" />}
                                              {chapter.id === "g1_shapes" && <Compass size={16} className="text-natural-terracotta" />}
                                              {chapter.id === "g1_comparison" && <Ruler size={16} className="text-natural-primary" />}
                                              {chapter.id === "g1_clock" && <Clock size={16} className="text-natural-primary animate-pulse" />}
                                              {chapter.id === "g1_compare" && <Hash size={16} className="text-natural-terracotta" />}
                                              {chapter.id === "g1_evs_family" && <User size={16} className="text-natural-primary" />}
                                              {chapter.id === "g1_evs_animals" && <Sparkles size={16} className="text-natural-primary animate-pulse" />}
                                              {chapter.id === "g1_evs_seasons" && <Compass size={16} className="text-natural-terracotta" />}
                                              {chapter.id === "g1_tel_achulu" && <BookOpen size={16} className="text-natural-primary" />}
                                              {chapter.id === "g1_tel_words" && <Layers size={16} className="text-natural-primary animate-pulse" />}
                                              {chapter.id === "g1_hin_swar" && <BookOpen size={16} className="text-natural-primary" />}
                                              {chapter.id === "g1_hin_fruits" && <Sparkles size={16} className="text-natural-primary animate-pulse" />}
                                              {chapter.id === "g1_hin_gintee" && <Hash size={16} className="text-natural-sage" />}
                                              {chapter.id === "g1_eng_alphabet" && <BookOpen size={16} className="text-natural-primary" />}
                                              {chapter.id === "g1_eng_nouns" && <Ruler size={16} className="text-natural-primary" />}
                                              {chapter.id === "g1_eng_verbs" && <Sparkles size={16} className="text-natural-primary animate-pulse" />}
                                            </div>
                                            <div>
                                              <span className="text-[8px] font-bold text-natural-sage uppercase tracking-wider">{chapter.badge}</span>
                                              <h4 className="font-extrabold text-xs text-natural-dark tracking-tight leading-none mt-0.5 group-hover:text-natural-primary transition">
                                                {chapter.title}
                                              </h4>
                                              <p className="text-[9px] text-natural-sage leading-tight mt-1 max-w-[200px] truncate">
                                                {chapter.topicSummary}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex flex-col items-end shrink-0">
                                            <span className="text-[9px] font-bold text-natural-primary bg-natural-beige-light px-2 py-0.5 rounded-full border border-natural-beige-dark/50">
                                              Open
                                            </span>
                                          </div>
                                        </button>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-200/80 rounded-2xl p-5 text-center space-y-3.5 animate-fade-in shadow-xs">
                                      <span className="text-4xl block">👨‍🏫</span>
                                      <h4 className="font-extrabold text-sm text-orange-950 font-serif leading-tight">
                                        బంగారం! నాన్న మీకోసం కొత్త పాఠాలు సిద్ధం చేస్తున్నారు!
                                      </h4>
                                      <p className="text-[10.5px] text-orange-900/90 leading-relaxed max-w-[250px] mx-auto font-serif">
                                        "నాన్న బంగారం! <b>Grade {selectedGrade} {selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)}</b> పాఠాలు త్వరలోనే నాన్న నీకోసం ఇక్కడ సిద్ధం చేస్తారు. అప్పటివరకు మన అందమైన గణితం (Maths) నేర్చుకుందాం!"
                                      </p>
                                      <button
                                        onClick={() => setSelectedSubject("maths")}
                                        className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-[10px] px-4 py-2 rounded-xl transition cursor-pointer shadow-xs hover:scale-[1.02] duration-150 inline-block"
                                      >
                                        📐 Let's Study Maths
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <>
                            <div className="bg-natural-beige-light border border-natural-beige-dark/60 rounded-2xl p-3 space-y-2 animate-fade-in" id="grade_subject_selector">
                              <span className="text-[9px] font-black uppercase text-natural-sage tracking-wider block text-center">
                                Select Subject / సబ్జెక్ట్ ఎంచుకోండి
                              </span>
                              <div className="grid grid-cols-5 gap-1" id="subject_selector_group">
                                {[
                                  { s: "maths" as const, label: "Maths", emoji: "🍎", activeBg: "bg-slate-800 border-slate-800 text-white shadow-sm", inactiveBg: "bg-white hover:bg-orange-50/30 text-natural-dark border-natural-beige-dark/60" },
                                  { s: "evs" as const, label: "EVS", emoji: "🌳", activeBg: "bg-slate-800 border-slate-800 text-white shadow-sm", inactiveBg: "bg-white hover:bg-emerald-50/30 text-natural-dark border-natural-beige-dark/60" },
                                  { s: "telugu" as const, label: "Telugu", emoji: "✍️", activeBg: "bg-slate-800 border-slate-800 text-white shadow-sm", inactiveBg: "bg-white hover:bg-rose-50/30 text-natural-dark border-natural-beige-dark/60" },
                                  { s: "hindi" as const, label: "Hindi", emoji: "🍇", activeBg: "bg-slate-800 border-slate-800 text-white shadow-sm", inactiveBg: "bg-white hover:bg-teal-50/30 text-natural-dark border-natural-beige-dark/60" },
                                  { s: "english" as const, label: "English", emoji: "🔤", activeBg: "bg-slate-800 border-slate-800 text-white shadow-sm", inactiveBg: "bg-white hover:bg-blue-50/30 text-natural-dark border-natural-beige-dark/60" }
                                ].map((item) => (
                                  <button
                                    key={item.s}
                                    onClick={() => setSelectedSubject(item.s)}
                                    className={`py-2 px-0.5 rounded-xl border text-center transition duration-200 cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                                      selectedSubject === item.s
                                        ? `${item.activeBg} font-extrabold scale-[1.03]`
                                        : `${item.inactiveBg} font-semibold`
                                    }`}
                                    id={`btn_subject_${item.s}`}
                                  >
                                    <span className="text-sm">{item.emoji}</span>
                                    <span className="text-[8px] font-black tracking-tight block leading-none">{item.label}</span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Learning Topics / Chapters list (Selected Grade & Subject) */}
                            <div>
                              <h3 className="text-xs font-extrabold text-natural-sage uppercase tracking-widest mb-2.5 flex items-center justify-between">
                                <span>{selectedSubject === "maths" ? "NCERT Syllabus Topics" : `${selectedSubject.toUpperCase()} Topics`}</span>
                                <span className="text-[10px] text-natural-sage font-semibold">{currentChapters.length} Chapters</span>
                              </h3>
                              
                              {currentChapters.length > 0 ? (
                                <div className="grid grid-cols-1 gap-2.5">
                                  {currentChapters.map((chapter) => (
                                    <button
                                      key={chapter.id}
                                      onClick={() => handleChapterSelect(chapter)}
                                      className={`p-3.5 rounded-2xl border text-left transition duration-200 cursor-pointer flex justify-between items-center group relative overflow-hidden shadow-xs bg-white border-natural-beige-dark hover:border-natural-primary/50 hover:bg-natural-cream/20`}
                                    >
                                      <div className="flex items-center gap-3">
                                        {/* Icon container */}
                                        <div className="w-9 h-9 rounded-xl bg-natural-beige-light flex items-center justify-center text-lg shadow-inner group-hover:scale-105 transition">
                                          {chapter.id === "g1_counting" && <Layers size={16} className="text-natural-primary" />}
                                          {chapter.id === "g1_shapes" && <Compass size={16} className="text-natural-terracotta" />}
                                          {chapter.id === "g1_comparison" && <Ruler size={16} className="text-natural-primary" />}
                                          {chapter.id === "g1_evs_family" && <User size={16} className="text-natural-primary" />}
                                          {chapter.id === "g1_evs_animals" && <Sparkles size={16} className="text-natural-primary animate-pulse" />}
                                          {chapter.id === "g1_evs_seasons" && <Compass size={16} className="text-natural-terracotta" />}
                                          {chapter.id === "g1_tel_achulu" && <BookOpen size={16} className="text-natural-primary" />}
                                          {chapter.id === "g1_tel_words" && <Layers size={16} className="text-natural-primary animate-pulse" />}
                                          {chapter.id === "g1_hin_swar" && <BookOpen size={16} className="text-natural-primary" />}
                                          {chapter.id === "g1_hin_fruits" && <Sparkles size={16} className="text-natural-primary animate-pulse" />}
                                          {chapter.id === "g1_hin_gintee" && <Hash size={16} className="text-natural-sage" />}
                                          {chapter.id === "g1_eng_alphabet" && <BookOpen size={16} className="text-natural-primary" />}
                                          {chapter.id === "g1_eng_nouns" && <Ruler size={16} className="text-natural-primary" />}
                                          {chapter.id === "g1_eng_verbs" && <Sparkles size={16} className="text-natural-primary animate-pulse" />}
                                          {chapter.id === "g9_numbersystems" && <Layers size={16} className="text-natural-primary" />}
                                          {chapter.id === "g9_polynomials" && <Sparkle size={16} className="text-natural-primary" />}
                                          {chapter.id === "g9_coordinate" && <Compass size={16} className="text-natural-terracotta" />}
                                          {chapter.id === "numbersystem" && <Layers size={16} className="text-natural-primary animate-pulse" />}
                                          {chapter.id === "fractions" && <Pizza size={16} className="text-natural-terracotta" />}
                                          {chapter.id === "decimals" && <Coins size={16} className="text-natural-primary" />}
                                          {chapter.id === "algebra" && <Sparkle size={16} className="text-natural-primary animate-pulse" />}
                                          {chapter.id === "integers" && <Hash size={16} className="text-natural-sage" />}
                                          {chapter.id === "geometry" && <Compass size={16} className="text-natural-terracotta" />}
                                          {chapter.id === "mensuration" && <Ruler size={16} className="text-natural-primary" />}
                                        </div>
                                        <div>
                                          <span className="text-[8px] font-bold text-natural-sage uppercase tracking-wider">{chapter.badge}</span>
                                          <h4 className="font-extrabold text-xs text-natural-dark tracking-tight leading-none mt-0.5 group-hover:text-natural-primary transition">
                                            {chapter.title}
                                          </h4>
                                          <p className="text-[9px] text-natural-sage leading-tight mt-1 max-w-[200px] truncate">
                                            {chapter.topicSummary}
                                          </p>
                                        </div>
                                      </div>
                                      
                                      {/* Simple arrow or progress status */}
                                      <div className="flex flex-col items-end shrink-0">
                                        <span className="text-[9px] font-bold text-natural-primary bg-natural-beige-light px-2 py-0.5 rounded-full border border-natural-beige-dark/50">
                                          Open
                                        </span>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              ) : (
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-200/80 rounded-2xl p-5 text-center space-y-3.5 animate-fade-in shadow-xs">
                                  <span className="text-4xl block">👨‍🏫</span>
                                  <h4 className="font-extrabold text-sm text-orange-950 font-serif leading-tight">
                                    బంగారం! నాన్న మీకోసం కొత్త పాఠాలు సిద్ధం చేస్తున్నారు!
                                  </h4>
                                  <p className="text-[10.5px] text-orange-900/90 leading-relaxed max-w-[250px] mx-auto font-serif">
                                    "నాన్న బంగారం! <b>Grade {selectedGrade} {selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)}</b> పాఠాలు త్వరలోనే నాన్న నీకోసం ఇక్కడ సిద్ధం చేస్తారు. అప్పటివరకు మన అందమైన గణితం (Maths) నేర్చుకుందాం!"
                                  </p>
                                  <button
                                    onClick={() => setSelectedSubject("maths")}
                                    className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-[10px] px-4 py-2 rounded-xl transition cursor-pointer shadow-xs hover:scale-[1.02] duration-150 inline-block"
                                  >
                                    📐 Let's Study Maths
                                  </button>
                                </div>
                              )}
                            </div>
                          </>
                        )}

                        {/* AI Buddy Prompt Callout */}
                        <div className="bg-natural-cream border border-natural-beige-dark/60 rounded-2xl p-4 text-natural-dark flex gap-3.5 shadow-xs relative overflow-hidden">
                          <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-15 text-8xl text-natural-terracotta">🎓</div>
                          <div className="w-12 h-12 rounded-full bg-white shrink-0 flex items-center justify-center text-2xl shadow-inner border border-natural-beige-dark">
                            👩‍🏫
                          </div>
                          <div className="space-y-1">
                            <span className="bg-natural-beige-dark text-natural-dark px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">AI Math Companion</span>
                            <h4 className="font-black text-xs text-natural-dark leading-snug">Stuck on Homework?</h4>
                            <p className="text-[9px] text-natural-sage leading-normal">
                              Ask your buddy **Ganit Mitra**! He teaches with fun pizza slices and matchstick patterns.
                            </p>
                            <button
                              onClick={() => setActiveSection("tutor")}
                              className="mt-2 bg-natural-primary text-white px-3 py-1 rounded-lg text-[9px] font-extrabold cursor-pointer hover:bg-natural-primary/90 transition shadow-xs"
                            >
                              Chat with Ganit Mitra
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. CHAPTER LESSON VIEW IN THE PHONE SCREEN */}
                {activeSection === "lessons" && (
                  <div className="space-y-4 animate-fade-in">
                    <button
                      onClick={() => setActiveSection("dashboard")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-natural-sage hover:text-natural-dark transition cursor-pointer mb-2"
                    >
                      <ArrowLeft size={14} /> Back to Chapters
                    </button>
                    <LessonSection
                      selectedChapter={selectedChapter}
                      onOpenTool={(toolId, highlightMode) => {
                        setActiveTool(toolId);
                        setActiveHighlightMode(highlightMode || "all");
                        setActiveSection("visualtools");
                      }}
                      onOpenWorksheet={() => setActiveSection("quiz")}
                      onActionComplete={handleTutorAction}
                    />
                  </div>
                )}

                {/* 3. WORKSHEET QUIZ IN THE PHONE SCREEN */}
                {activeSection === "quiz" && (
                  <div className="space-y-4 animate-fade-in">
                    <button
                      onClick={() => setActiveSection("lessons")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-natural-sage hover:text-natural-dark transition cursor-pointer mb-2"
                    >
                      <ArrowLeft size={14} /> Back to Lesson
                    </button>
                    <PracticeQuiz
                      chapterId={selectedChapter.id}
                      chapterTitle={selectedChapter.title}
                      onQuizComplete={handleQuizComplete}
                      onAskTutor={launchCustomTutorQuestion}
                    />
                  </div>
                )}

                {/* 4. VISUAL TOOLS IN THE PHONE SCREEN */}
                {activeSection === "visualtools" && (
                  <div className="space-y-4 animate-fade-in">
                    <button
                      onClick={() => setActiveSection("lessons")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-natural-sage hover:text-natural-dark transition cursor-pointer mb-2"
                    >
                      <ArrowLeft size={14} /> Back to Lesson
                    </button>
                    <VisualTools
                      chapterId={selectedChapter.id}
                      initialTool={activeTool}
                      initialHighlightMode={activeHighlightMode}
                      onActionComplete={handleActionComplete}
                    />
                  </div>
                )}

                {/* 5. AI TUTOR CHAT IN THE PHONE SCREEN */}
                {activeSection === "tutor" && (
                  <div className="h-[520px] flex flex-col animate-fade-in">
                    <TutorChat
                      currentChapterId={selectedChapter.title}
                      activeToolId={activeTool}
                      onTutorAction={handleTutorAction}
                    />
                  </div>
                )}

                {/* 6. ACHIEVEMENTS SCREEN */}
                {activeSection === "achievements" && (
                  <div className="space-y-4 animate-fade-in" id="achievements_screen_wrapper">
                    <h3 className="text-xs font-extrabold text-natural-sage uppercase tracking-widest mb-3">
                      Your CBSE Trophy Room
                    </h3>
                    
                    <div className="bg-white border border-natural-beige-dark rounded-2xl p-5 text-center flex flex-col items-center shadow-xs">
                      <Trophy size={44} className="text-natural-terracotta mb-2.5 animate-bounce" />
                      <h4 className="font-extrabold text-sm text-natural-dark">Junior Mathematician</h4>
                      <p className="text-[10px] text-natural-sage max-w-xs mt-1 leading-normal">
                        Every task solved, question asked, and visual explored brings you closer to CBSE excellence!
                      </p>
                      
                      {/* Total progress bar */}
                      <div className="w-full bg-natural-beige-light rounded-full h-2 mt-4 relative">
                        <div
                          style={{ width: `${Math.min((scorePoints / 500) * 100, 100)}%` }}
                          className="bg-natural-primary h-2 rounded-full transition-all duration-300"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-natural-terracotta block mt-2 font-mono">
                        {scorePoints} / 500 XP to next rank
                      </span>
                    </div>

                    {/* Medal Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { title: "Welcome Scholar", desc: "For launching your Class 6 study course.", icon: "🎒" },
                        { title: "Fraction Fanatic", desc: "For exploring division slice geometry.", icon: "🍕" },
                        { title: "Math Topper", desc: "Scored over 80% on any practice worksheet.", icon: "🥇" },
                        { title: "CBSE Champion", desc: "Completed 3 full practice mock worksheets.", icon: "🎓" },
                        { title: "Fraction Explorer Badge", desc: "Discovered improper slices over 1 whole unit.", icon: "🚀" }
                      ].map((item, idx) => {
                        const isUnlocked = unlockedBadges.includes(item.title);
                        return (
                          <div
                            key={idx}
                            onClick={() => isUnlocked && handleBadgeClick(item.title)}
                            className={`p-3.5 rounded-2xl border text-center relative flex flex-col items-center justify-center transition ${
                              isUnlocked
                                ? "bg-white border-natural-beige-dark hover:border-natural-primary/50 cursor-pointer shadow-xs text-natural-dark"
                                : "bg-natural-beige-light/40 border-natural-beige-dark/40 opacity-60 grayscale select-none text-natural-sage"
                            }`}
                          >
                            <span className="text-2xl mb-1">{item.icon}</span>
                            <h4 className="font-extrabold text-[10px] text-natural-dark leading-tight">
                              {item.title}
                            </h4>
                            <p className="text-[8px] text-natural-sage mt-1 leading-normal">
                              {item.desc}
                            </p>
                            {isUnlocked && (
                              <span className="absolute top-1.5 right-1.5 text-[9px] bg-natural-cream text-natural-terracotta border border-natural-terracotta/20 rounded-full px-1.5 py-0.2 font-extrabold font-mono">
                                Unlocked
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>

              {/* simulated navigation bottom bar (Android native look) */}
              <div className="bg-natural-beige-light border-t border-natural-beige-dark px-4 py-3 flex justify-around items-center shrink-0 shadow-inner rounded-b-[34px] z-30 select-none">
                <button
                  onClick={() => {
                    setActiveSection("dashboard");
                    setShowChapters(false);
                  }}
                  className={`flex flex-col items-center gap-1 cursor-pointer transition ${
                    activeSection === "dashboard" ? "text-natural-primary scale-105" : "text-natural-sage hover:text-natural-dark"
                  }`}
                  id="nav_dashboard"
                >
                  <Trophy size={16} />
                  <span className="text-[9px] font-bold">Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTool("fraction");
                    setActiveSection("visualtools");
                  }}
                  className={`flex flex-col items-center gap-1 cursor-pointer transition ${
                    activeSection === "visualtools" ? "text-natural-primary scale-105" : "text-natural-sage hover:text-natural-dark"
                  }`}
                  id="nav_lab"
                >
                  <Compass size={16} />
                  <span className="text-[9px] font-bold">Math Lab</span>
                </button>
                <button
                  onClick={() => setActiveSection("tutor")}
                  className={`flex flex-col items-center gap-1 cursor-pointer transition relative ${
                    activeSection === "tutor" ? "text-natural-primary scale-105" : "text-natural-sage hover:text-natural-dark"
                  }`}
                  id="nav_tutor"
                >
                  <Sparkles size={16} className={activeSection === "tutor" ? "text-natural-primary" : "text-natural-sage"} />
                  <span className="text-[9px] font-bold">Mitra (AI)</span>
                </button>
                <button
                  onClick={() => setActiveSection("achievements")}
                  className={`flex flex-col items-center gap-1 cursor-pointer transition ${
                    activeSection === "achievements" ? "text-natural-primary scale-105" : "text-natural-sage hover:text-natural-dark"
                  }`}
                  id="nav_achievements"
                >
                  <Award size={16} />
                  <span className="text-[9px] font-bold">Trophies</span>
                </button>
              </div>

              {/* Simulated Pill-Shaped Android Navigation Bar Line */}
              <div className="bg-natural-beige-light pb-2 flex justify-center shrink-0 rounded-b-[34px]">
                <div className="w-24 h-1 bg-natural-beige-dark rounded-full mt-1.5" />
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: EXPANDED TEXTBOOK & EXERCISE DESK (Desktop view ONLY) */}
        <div className="hidden lg:flex flex-1 flex-col gap-6" id="desktop_study_desk">
          {/* Active Work Panel Display */}
          <div className="flex-1 min-h-[500px]">
            {activeSection === "dashboard" && (
              <div className="bg-white border border-natural-beige-dark rounded-2xl p-8 h-full flex flex-col justify-center items-center text-center shadow-xs">
                <div className="w-20 h-20 rounded-3xl bg-natural-cream flex items-center justify-center text-5xl mb-6 shadow-inner border border-natural-beige-dark/30">
                  📐
                </div>
                <h2 className="text-2xl font-black text-natural-dark tracking-tight">Your Digital Math Classroom</h2>
                <p className="text-sm text-natural-sage max-w-md mt-2 leading-relaxed">
                  Welcome to Grade 6 CBSE Mathematics self-study station! Use the interactive smartphone device on the left to browse topics, start lessons, take customized mock tests, and chat with Ganit Mitra.
                </p>
                <div className="grid grid-cols-3 gap-4 w-full max-w-lg mt-8">
                  <div className="bg-natural-beige-light border border-natural-beige-dark p-4 rounded-xl">
                    <span className="text-xl block">🍕</span>
                    <strong className="text-xs text-natural-dark block mt-1.5">Fractions Circle</strong>
                    <span className="text-[10px] text-natural-sage">Slice cakes interactively</span>
                  </div>
                  <div className="bg-natural-beige-light border border-natural-beige-dark p-4 rounded-xl">
                    <span className="text-xl block">🔢</span>
                    <strong className="text-xs text-natural-dark block mt-1.5">Integer Line</strong>
                    <span className="text-[10px] text-natural-sage">Jump positive & negative</span>
                  </div>
                  <div className="bg-natural-beige-light border border-natural-beige-dark p-4 rounded-xl">
                    <span className="text-xl block">📏</span>
                    <strong className="text-xs text-natural-dark block mt-1.5">Rectangle Lab</strong>
                    <span className="text-[10px] text-natural-sage">Calculate Perimeter/Area</span>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "lessons" && (
              <LessonSection
                selectedChapter={selectedChapter}
                onOpenTool={(toolId, highlightMode) => {
                  setActiveTool(toolId);
                  setActiveHighlightMode(highlightMode || "all");
                  setActiveSection("visualtools");
                }}
                onOpenWorksheet={() => setActiveSection("quiz")}
                onActionComplete={handleTutorAction}
              />
            )}

            {activeSection === "quiz" && (
              <PracticeQuiz
                chapterId={selectedChapter.id}
                chapterTitle={selectedChapter.title}
                onQuizComplete={handleQuizComplete}
                onAskTutor={launchCustomTutorQuestion}
              />
            )}

            {activeSection === "visualtools" && (
              <VisualTools
                chapterId={selectedChapter.id}
                initialTool={activeTool}
                initialHighlightMode={activeHighlightMode}
                onActionComplete={handleActionComplete}
              />
            )}

            {activeSection === "tutor" && (
              <div className="h-full min-h-[600px] flex flex-col">
                <TutorChat
                  currentChapterId={selectedChapter.title}
                  activeToolId={activeTool}
                  onTutorAction={handleTutorAction}
                />
              </div>
            )}

            {activeSection === "achievements" && (
              <div className="bg-white border border-natural-beige-dark rounded-2xl p-8 h-full shadow-xs">
                <div className="flex items-center gap-3.5 border-b border-natural-beige-dark pb-5 mb-6">
                  <Trophy size={28} className="text-natural-terracotta animate-bounce" />
                  <div>
                    <h2 className="text-lg font-black text-natural-dark">Your Math Badge Achievements</h2>
                    <p className="text-xs text-natural-sage">Earn medals by reading lessons, solving problems, and testing yourself!</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: "Welcome Scholar", desc: "For launching your Class 6 study course.", icon: "🎒", criteria: "Unlocked on startup" },
                    { title: "Fraction Fanatic", desc: "For exploring division slice geometry.", icon: "🍕", criteria: "Unlocked on visiting Fractions circle" },
                    { title: "Math Topper", desc: "Scored over 80% on any practice worksheet.", icon: "🥇", criteria: "Scored 4/5 or more on a practice test" },
                    { title: "CBSE Champion", desc: "Completed 3 full practice mock worksheets.", icon: "🎓", criteria: "Complete 3 test papers in any chapter" },
                    { title: "Fraction Explorer Badge", desc: "Discovered improper slices over 1 whole unit.", icon: "🚀", criteria: "Set numerator greater than denominator in fractions pie" }
                  ].map((item, idx) => {
                    const isUnlocked = unlockedBadges.includes(item.title);
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border flex items-start gap-4 transition ${
                          isUnlocked
                            ? "bg-white border-natural-beige-dark shadow-xs"
                            : "bg-natural-beige-light/40 border-natural-beige-dark/50 opacity-60 grayscale select-none"
                        }`}
                      >
                        <span className="text-3xl bg-natural-beige-light p-2 rounded-xl shadow-xs shrink-0">{item.icon}</span>
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-sm text-natural-dark leading-tight">
                            {item.title}
                          </h4>
                          <p className="text-xs text-natural-sage">
                            {item.desc}
                          </p>
                          <span className="text-[10px] font-bold text-natural-terracotta bg-natural-cream px-2 py-0.5 rounded-md inline-block">
                            {isUnlocked ? "Unlocked!" : `Criteria: ${item.criteria}`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          
          {/* Quick Info card below display */}
          <div className="bg-gradient-to-r from-natural-dark to-[#494933] border border-natural-dark/50 rounded-2xl p-5 text-white flex gap-4 items-center">
            <span className="text-3xl">🇮🇳</span>
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-natural-beige-dark">Indian Math Heritage Info</h4>
              <p className="text-[11px] text-natural-beige-light/90 mt-0.5 leading-relaxed">
                Ancient scholars like Brahmagupta and Aryabhata discovered fundamental mathematical principles such as Zero, decimals, and negative numbers. Today, CBSE Grade 6 builds these powerful foundations for you!
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
