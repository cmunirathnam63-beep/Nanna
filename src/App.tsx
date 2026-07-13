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
  GRADE_9_SOCIALSCIENCE_CHAPTERS,
  GRADE_9_PHYSICS_CHAPTERS,
  GRADE_9_CHEMISTRY_CHAPTERS,
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
  
  // Subject state
  const [selectedSubject, setSelectedSubject] = useState<"maths" | "evs" | "telugu" | "hindi" | "english" | "social_science" | "physics" | "chemistry">("maths");
  const [showGrade1Topics, setShowGrade1Topics] = useState<boolean>(false);
  const [showGrade6And9Topics, setShowGrade6And9Topics] = useState<boolean>(false);

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
      if (selectedSubject === "social_science") return GRADE_9_SOCIALSCIENCE_CHAPTERS;
      if (selectedSubject === "physics") return GRADE_9_PHYSICS_CHAPTERS;
      if (selectedSubject === "chemistry") return GRADE_9_CHEMISTRY_CHAPTERS;
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
  const [activeTool, setActiveTool] = useState<"fraction" | "numberline" | "placevalue" | "perimeter" | "typesofnumbers" | "clock">("fraction");
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
      {/* Top Header */}
      <header className="bg-natural-beige-light border-b border-natural-beige-dark px-4 md:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs shrink-0 select-none">
        {/* App Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-natural-primary flex items-center justify-center text-white font-black shadow-md shadow-natural-primary/20 text-lg">
            Σ
          </div>
          <div>
            <h1 className="text-sm md:text-base font-black text-natural-dark tracking-tight">CBSE Math & Learning Companion</h1>
            <p className="text-[9px] md:text-[10px] text-natural-sage font-bold uppercase tracking-wider">Interactive, Gamified Self-Study</p>
          </div>
        </div>

        {/* Student Profile Stats Card */}
        <div className="flex flex-wrap items-center justify-center gap-3 bg-white border border-natural-beige-dark/60 p-2 md:p-2.5 rounded-2xl shadow-xs">
          <div className="flex items-center gap-2 px-3 border-r border-slate-100">
            <span className="text-base">👨‍🏫</span>
            <div>
              <span className="text-[8px] font-bold text-natural-sage block leading-none">Student</span>
              <span className="text-xs font-black text-slate-800">{studentName}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 border-r border-slate-100">
            <span className="text-amber-500 text-sm">⭐</span>
            <div>
              <span className="text-[8px] font-bold text-natural-sage block leading-none">XP Points</span>
              <span className="text-xs font-black text-amber-600 font-mono">{scorePoints}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 border-r border-slate-100">
            <Flame size={14} className="fill-current text-natural-terracotta" />
            <div>
              <span className="text-[8px] font-bold text-natural-sage block leading-none">Streak</span>
              <span className="text-xs font-black text-natural-dark font-mono">{streakDays} Days</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3">
            <CheckCircle size={13} className="text-natural-primary" />
            <div>
              <span className="text-[8px] font-bold text-natural-sage block leading-none">Completed</span>
              <span className="text-xs font-black text-slate-700 font-mono">{completedQuizzes} Tests</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tab Bar */}
      <nav className="bg-white border-b border-natural-beige-dark sticky top-0 z-40 shadow-xs select-none">
        <div className="max-w-5xl mx-auto px-4 flex justify-around md:justify-start gap-1 md:gap-4 py-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: Trophy, onClick: () => { setActiveSection("dashboard"); setShowChapters(false); } },
            { id: "visualtools", label: "Math Lab", icon: Compass, onClick: () => { setActiveTool("fraction"); setActiveSection("visualtools"); } },
            { id: "tutor", label: "Mitra (AI)", icon: Sparkles, onClick: () => setActiveSection("tutor") },
            { id: "achievements", label: "Trophy Room", icon: Award, onClick: () => setActiveSection("achievements") }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id || 
              (tab.id === "dashboard" && (activeSection === "lessons" || activeSection === "quiz"));
            return (
              <button
                key={tab.id}
                onClick={tab.onClick}
                className={`flex items-center gap-2 py-2 px-3 md:px-4 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  isActive
                    ? "bg-natural-primary text-white shadow-sm"
                    : "text-natural-sage hover:text-natural-dark hover:bg-natural-beige-light/50"
                }`}
                id={`nav_${tab.id}`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Workspace Column */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 lg:p-8 space-y-6" id="app_workspace">
        {/* Render the active viewport nicely */}
        <div className="bg-white border border-natural-beige-dark rounded-3xl shadow-xs overflow-hidden flex flex-col min-h-[500px]" id="workspace_viewport">
          
          {/* 1. DASHBOARD VIEW */}
          {activeSection === "dashboard" && (
            <div className="p-6 space-y-6 animate-fade-in" id="dashboard_screen_wrapper">
              
              {/* Grade Selector / Subjects Section */}
              {!showChapters ? (
                <div className="space-y-6 animate-fade-in" id="grade_selection_view">
                  <div className="bg-natural-beige-light border border-natural-beige-dark/60 rounded-2xl p-6 shadow-sm">
                    <span className="text-[10px] font-black uppercase text-natural-sage tracking-wider block mb-4 text-center">
                      Select Grade Level / తరగతిని ఎంచుకోండి
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="grade_selector_group">
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
                            setShowGrade6And9Topics(false);
                          }}
                          className="p-5 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-2 bg-white hover:bg-natural-cream text-natural-dark border-natural-beige-dark/60 hover:border-natural-primary/40 hover:scale-[1.02] duration-200 shadow-xs"
                          id={`btn_grade_${item.g}`}
                        >
                          <span className="text-3xl">{item.emoji}</span>
                          <span className="text-sm font-black">{item.label}</span>
                          <span className="text-[10px] font-extrabold opacity-75 block leading-none">{item.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Warm "Nanna" Fatherly Tutor Card */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-200/80 rounded-2xl p-6 text-natural-dark flex flex-col sm:flex-row gap-4 shadow-xs relative overflow-hidden" id="nanna_tutor_card">
                    <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 opacity-10 text-9xl select-none hidden sm:block">👨‍👧‍👦</div>
                    <div className="w-14 h-14 rounded-full bg-orange-100 shrink-0 flex items-center justify-center text-3xl shadow-inner border border-orange-200 mx-auto sm:mx-0">
                      👨‍🏫
                    </div>
                    <div className="space-y-2 flex-1 z-10 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 flex-wrap">
                        <span className="bg-orange-600 text-white px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider">
                          Fatherly Tutor
                        </span>
                        <span className="text-xs font-extrabold text-orange-700 tracking-tight font-serif">నాన్న ట్యూటర్</span>
                      </div>
                      <h4 className="font-extrabold text-lg text-orange-950 tracking-tight leading-snug flex items-center justify-center sm:justify-start gap-1.5" id="nanna_tutor_heading">
                        <span className="bg-orange-600 text-white px-2 py-0.5 rounded-lg font-black font-serif shadow-xs inline-block text-lg">నాన్న</span> (Nanna)
                      </h4>
                      <p className="text-xs md:text-sm text-orange-900/90 leading-relaxed font-serif max-w-2xl">
                        "నాయనా/అమ్మా! చదువు మన జీవితానికి వెలుగు. నీకు ఏ తరగతి కావాలో పైన ఉన్న బటన్ల ద్వారా ఎంచుకో, మనం కలిసి ఎంతో సరదాగా చదువుకుందాం!"
                      </p>
                      <div className="text-[10px] text-orange-800/80 font-mono italic mt-1.5 font-semibold flex items-center justify-center sm:justify-start gap-1">
                        <span>🧡</span>
                        <span>Supportive, caring fatherly learning helper</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in" id="syllabus_chapters_view">
                  {/* Selected Syllabus Header with Back Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-natural-beige-light border border-natural-beige-dark/60 rounded-2xl p-4 shadow-xs" id="chapters_view_header">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {selectedGrade === 1 ? "🌱" : selectedGrade === 6 ? "📙" : "🚀"}
                      </span>
                      <div>
                        <h4 className="font-extrabold text-sm text-natural-dark leading-none">
                          Grade {selectedGrade} Syllabus
                        </h4>
                        <p className="text-[10px] text-natural-sage mt-1 font-bold uppercase tracking-wider">
                          {selectedGrade === 1 
                            ? (!showGrade1Topics ? "Select a Subject" : `${selectedSubject} Module`) 
                            : (!showGrade6And9Topics ? "Select a Subject" : `NCERT ${selectedSubject === "maths" ? "Mathematics" : selectedSubject === "social_science" ? "Social Science" : selectedSubject.toUpperCase()}`)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowChapters(false);
                        setShowGrade1Topics(false);
                        setShowGrade6And9Topics(false);
                      }}
                      className="flex items-center gap-1.5 text-xs font-extrabold text-natural-primary bg-white hover:bg-natural-cream border border-natural-beige-dark/60 px-4 py-2 rounded-xl cursor-pointer transition shadow-xs hover:scale-[1.02] duration-150"
                    >
                      <ArrowLeft size={12} /> Change Grade
                    </button>
                  </div>

                  {/* Subject Selector */}
                  {selectedGrade === 1 ? (
                    <div className="space-y-6">
                      {!showGrade1Topics ? (
                        <div className="bg-natural-beige-light border border-natural-beige-dark/60 rounded-2xl p-5 space-y-4 animate-fade-in" id="grade_1_vertical_subject_selector">
                          <span className="text-[10px] font-black uppercase text-natural-sage tracking-wider block text-center mb-1">
                            సబ్జెక్ట్ ఎంచుకోండి / Select Subject
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="subject_selector_group_vertical">
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
                                className={`p-4 rounded-2xl border text-left transition duration-200 cursor-pointer flex gap-3.5 items-center ${
                                  selectedSubject === item.s ? item.activeBg : item.inactiveBg
                                }`}
                              >
                                <span className="text-3xl shrink-0">{item.emoji}</span>
                                <div className="space-y-0.5">
                                  <h4 className="font-extrabold text-sm">{item.label}</h4>
                                  <p className="text-[10px] opacity-80 leading-normal">{item.desc}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <button
                            onClick={() => setShowGrade1Topics(false)}
                            className="flex items-center gap-1 text-xs font-bold text-natural-sage hover:text-natural-dark transition cursor-pointer"
                          >
                            <ArrowLeft size={12} /> Back to Subjects
                          </button>
                          
                          <h3 className="text-xs font-extrabold text-natural-sage uppercase tracking-widest mb-2.5 flex items-center justify-between">
                            <span>{selectedSubject.toUpperCase()} Topics</span>
                            <span className="text-[10px] text-natural-sage font-semibold">{currentChapters.length} Chapters</span>
                          </h3>

                          {currentChapters.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {currentChapters.map((chapter) => (
                                <button
                                  key={chapter.id}
                                  onClick={() => handleChapterSelect(chapter)}
                                  className={`p-4 rounded-2xl border text-left transition duration-200 cursor-pointer flex justify-between items-center group relative overflow-hidden shadow-xs bg-white border-natural-beige-dark hover:border-natural-primary/50 hover:bg-natural-cream/20`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-natural-beige-light flex items-center justify-center text-lg shadow-inner group-hover:scale-105 transition shrink-0">
                                      {chapter.id === "g1_counting" && <Layers size={18} className="text-natural-primary" />}
                                      {chapter.id === "g1_shapes" && <Compass size={18} className="text-natural-terracotta" />}
                                      {chapter.id === "g1_comparison" && <Ruler size={18} className="text-natural-primary" />}
                                      {chapter.id === "g1_clock" && <Clock size={18} className="text-natural-primary animate-pulse" />}
                                      {chapter.id === "g1_compare" && <Hash size={18} className="text-natural-terracotta" />}
                                      {chapter.id === "g1_evs_family" && <User size={18} className="text-natural-primary" />}
                                      {chapter.id === "g1_evs_animals" && <Sparkles size={18} className="text-natural-primary animate-pulse" />}
                                      {chapter.id === "g1_evs_seasons" && <Compass size={18} className="text-natural-terracotta" />}
                                      {chapter.id === "g1_tel_achulu" && <BookOpen size={18} className="text-natural-primary" />}
                                      {chapter.id === "g1_tel_words" && <Layers size={18} className="text-natural-primary animate-pulse" />}
                                      {chapter.id === "g1_hin_swar" && <BookOpen size={18} className="text-natural-primary" />}
                                      {chapter.id === "g1_hin_fruits" && <Sparkles size={18} className="text-natural-primary animate-pulse" />}
                                      {chapter.id === "g1_hin_gintee" && <Hash size={18} className="text-natural-sage" />}
                                      {chapter.id === "g1_eng_alphabet" && <BookOpen size={18} className="text-natural-primary" />}
                                      {chapter.id === "g1_eng_nouns" && <Ruler size={18} className="text-natural-primary" />}
                                      {chapter.id === "g1_eng_verbs" && <Sparkles size={18} className="text-natural-primary animate-pulse" />}
                                    </div>
                                    <div>
                                      <span className="text-[8px] font-bold text-natural-sage uppercase tracking-wider">{chapter.badge}</span>
                                      <h4 className="font-extrabold text-xs sm:text-sm text-natural-dark tracking-tight leading-none mt-0.5 group-hover:text-natural-primary transition">
                                        {chapter.title}
                                      </h4>
                                      <p className="text-[10px] text-natural-sage leading-tight mt-1 max-w-[200px] truncate">
                                        {chapter.topicSummary}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-bold text-natural-primary bg-natural-beige-light px-3 py-1 rounded-full border border-natural-beige-dark/50 shrink-0">
                                    Open
                                  </span>
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-200/80 rounded-2xl p-6 text-center space-y-4 animate-fade-in shadow-xs">
                              <span className="text-4xl block">👨‍🏫</span>
                              <h4 className="font-extrabold text-sm text-orange-950 font-serif leading-tight">
                                బంగారం! నాన్న మీకోసం కొత్త పాఠాలు సిద్ధం చేస్తున్నారు!
                              </h4>
                              <p className="text-xs text-orange-900/90 leading-relaxed max-w-sm mx-auto font-serif">
                                "నాన్న బంగారం! <b>Grade {selectedGrade} {selectedSubject.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</b> పాఠాలు త్వరలోనే నాన్న నీకోసం ఇక్కడ సిద్ధం చేస్తారు. అప్పటివరకు మన అందమైన గణితం (Maths) నేర్చుకుందాం!"
                              </p>
                              <button
                                onClick={() => setSelectedSubject("maths")}
                                className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer shadow-xs hover:scale-[1.02] duration-150 inline-block"
                              >
                                📐 Let's Study Maths
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {!showGrade6And9Topics ? (
                        <div className="bg-natural-beige-light border border-natural-beige-dark/60 rounded-2xl p-5 space-y-4 animate-fade-in" id="grade_6_9_subject_selector">
                          <span className="text-[10px] font-black uppercase text-natural-sage tracking-wider block text-center mb-1">
                            సబ్జెక్ట్ ఎంచుకోండి / Select Subject
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="subject_selector_group_6_9">
                            {(selectedGrade === 9
                              ? [
                                  { s: "maths" as const, label: "Maths / గణితం", desc: "Master advanced geometry, algebra, and number systems!", emoji: "🍎", activeBg: "bg-slate-800 border-slate-800 text-white shadow-md", inactiveBg: "bg-white hover:bg-orange-50/40 text-natural-dark border-natural-beige-dark/60" },
                                  { s: "physics" as const, label: "Physics / భౌతిక శాస్త్రం", desc: "Discover kinematics, forces, motion, and Newton's laws!", emoji: "⚡", activeBg: "bg-slate-800 border-slate-800 text-white shadow-md", inactiveBg: "bg-white hover:bg-sky-50/40 text-natural-dark border-natural-beige-dark/60" },
                                  { s: "chemistry" as const, label: "Chemistry / రసాయన శాస్త్రం", desc: "Learn about states of matter, atoms, molecules, and chemical bonds!", emoji: "🧪", activeBg: "bg-slate-800 border-slate-800 text-white shadow-md", inactiveBg: "bg-white hover:bg-teal-50/40 text-natural-dark border-natural-beige-dark/60" },
                                  { s: "telugu" as const, label: "Telugu / తెలుగు", desc: "Explore prose, classical literature, and grammar!", emoji: "✍️", activeBg: "bg-slate-800 border-slate-800 text-white shadow-md", inactiveBg: "bg-white hover:bg-rose-50/40 text-natural-dark border-natural-beige-dark/60" },
                                  { s: "english" as const, label: "English / ఆంగ్లం", desc: "Improve vocabulary, prose comprehension, and advanced grammar!", emoji: "🔤", activeBg: "bg-slate-800 border-slate-800 text-white shadow-md", inactiveBg: "bg-white hover:bg-blue-50/40 text-natural-dark border-natural-beige-dark/60" },
                                  { s: "social_science" as const, label: "Social Science / సామాజిక శాస్త్రం", desc: "Explore history, geography, economics, and democratic systems!", emoji: "🌍", activeBg: "bg-slate-800 border-slate-800 text-white shadow-md", inactiveBg: "bg-white hover:bg-indigo-50/40 text-natural-dark border-natural-beige-dark/60" }
                                ]
                              : [
                                  { s: "maths" as const, label: "Maths / గణితం", desc: "Learn playing with numbers, decimals, fractions, and algebra!", emoji: "🍎", activeBg: "bg-slate-800 border-slate-800 text-white shadow-md", inactiveBg: "bg-white hover:bg-orange-50/40 text-natural-dark border-natural-beige-dark/60" },
                                  { s: "telugu" as const, label: "Telugu / తెలుగు", desc: "Discover intermediate telugu prose, poetry, and sweet idioms!", emoji: "✍️", activeBg: "bg-slate-800 border-slate-800 text-white shadow-md", inactiveBg: "bg-white hover:bg-rose-50/40 text-natural-dark border-natural-beige-dark/60" },
                                  { s: "english" as const, label: "English / ఆంగ్లం", desc: "Practice creative writing, essential grammar, and classic stories!", emoji: "🔤", activeBg: "bg-slate-800 border-slate-800 text-white shadow-md", inactiveBg: "bg-white hover:bg-blue-50/40 text-natural-dark border-natural-beige-dark/60" }
                                ]
                            ).map((item) => (
                              <button
                                key={item.s}
                                onClick={() => {
                                  setSelectedSubject(item.s);
                                  setShowGrade6And9Topics(true);
                                }}
                                className={`p-5 rounded-2xl border text-left transition duration-200 cursor-pointer flex flex-col justify-between items-stretch gap-4 bg-white border-natural-beige-dark/60 hover:border-natural-primary/40 hover:scale-[1.01] hover:bg-natural-cream/10`}
                              >
                                <div className="flex gap-4 items-start">
                                  <span className="text-3xl shrink-0 mt-0.5">{item.emoji}</span>
                                  <div className="space-y-1">
                                    <h4 className="font-extrabold text-sm text-natural-dark">{item.label}</h4>
                                    <p className="text-[10px] text-natural-sage leading-normal">{item.desc}</p>
                                  </div>
                                </div>
                                <div className="pt-3 border-t border-natural-beige-dark/30 flex justify-end">
                                  <span className="text-[10px] font-bold text-natural-primary bg-natural-beige-light hover:bg-natural-primary hover:text-white px-3 py-1.5 rounded-full border border-natural-beige-dark/50 transition duration-150 flex items-center gap-1">
                                    📖 Topics Button
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <button
                            onClick={() => setShowGrade6And9Topics(false)}
                            className="flex items-center gap-1 text-xs font-bold text-natural-sage hover:text-natural-dark transition cursor-pointer"
                          >
                            <ArrowLeft size={12} /> Back to Subjects
                          </button>
                          
                          <div className="space-y-3">
                            <h3 className="text-xs font-extrabold text-natural-sage uppercase tracking-widest mb-1 flex items-center justify-between">
                              <span>{selectedSubject === "maths" ? "NCERT Syllabus Topics" : `${selectedSubject.replace('_', ' ').toUpperCase()} Topics`}</span>
                              <span className="text-[10px] text-natural-sage font-semibold">{currentChapters.length} Chapters</span>
                            </h3>

                            {currentChapters.length > 0 ? (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {currentChapters.map((chapter) => (
                                  <button
                                    key={chapter.id}
                                    onClick={() => handleChapterSelect(chapter)}
                                    className={`p-4 rounded-2xl border text-left transition duration-200 cursor-pointer flex justify-between items-center group relative overflow-hidden shadow-xs bg-white border-natural-beige-dark hover:border-natural-primary/50 hover:bg-natural-cream/20`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-xl bg-natural-beige-light flex items-center justify-center text-lg shadow-inner group-hover:scale-105 transition shrink-0">
                                        {chapter.id === "g9_numbersystems" && <Layers size={18} className="text-natural-primary" />}
                                        {chapter.id === "g9_polynomials" && <Sparkles size={18} className="text-natural-primary animate-pulse" />}
                                        {chapter.id === "g9_coordinate" && <Compass size={18} className="text-natural-terracotta" />}
                                        {chapter.id === "g9_physics_motion" && <Compass size={18} className="text-sky-600 animate-pulse" />}
                                        {chapter.id === "g9_physics_force" && <Ruler size={18} className="text-violet-600" />}
                                        {chapter.id === "g9_chem_matter" && <Layers size={18} className="text-emerald-600" />}
                                        {chapter.id === "g9_chem_atoms" && <Sparkles size={18} className="text-amber-600 animate-pulse" />}
                                        {chapter.id === "g9_french_revolution" && <BookOpen size={18} className="text-red-600" />}
                                        {chapter.id === "g9_physical_features" && <Compass size={18} className="text-amber-700" />}
                                        {chapter.id === "g9_democracy" && <Award size={18} className="text-indigo-600" />}
                                        {chapter.id === "numbersystem" && <Layers size={18} className="text-natural-primary animate-pulse" />}
                                        {chapter.id === "fractions" && <Pizza size={18} className="text-natural-terracotta" />}
                                        {chapter.id === "decimals" && <Coins size={18} className="text-natural-primary" />}
                                        {chapter.id === "algebra" && <Sparkle size={18} className="text-natural-primary animate-pulse" />}
                                        {chapter.id === "integers" && <Hash size={18} className="text-natural-sage" />}
                                        {chapter.id === "geometry" && <Compass size={18} className="text-natural-terracotta" />}
                                        {chapter.id === "mensuration" && <Ruler size={18} className="text-natural-primary" />}
                                      </div>
                                      <div>
                                        <span className="text-[8px] font-bold text-natural-sage uppercase tracking-wider">{chapter.badge}</span>
                                        <h4 className="font-extrabold text-xs sm:text-sm text-natural-dark tracking-tight leading-none mt-0.5 group-hover:text-natural-primary transition">
                                          {chapter.title}
                                        </h4>
                                        <p className="text-[10px] text-natural-sage leading-tight mt-1 max-w-[200px] truncate">
                                          {chapter.topicSummary}
                                        </p>
                                      </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-natural-primary bg-natural-beige-light px-3 py-1 rounded-full border border-natural-beige-dark/50 shrink-0">
                                      Open
                                    </span>
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-200/80 rounded-2xl p-6 text-center space-y-4 animate-fade-in shadow-xs">
                                <span className="text-4xl block">👨‍🏫</span>
                                <h4 className="font-extrabold text-sm text-orange-950 font-serif leading-tight">
                                  బంగారం! నాన్న మీకోసం కొత్త పాఠాలు సిద్ధం చేస్తున్నారు!
                                </h4>
                                <p className="text-xs text-orange-900/90 leading-relaxed max-w-sm mx-auto font-serif">
                                  "నాన్న బంగారం! <b>Grade {selectedGrade} {selectedSubject.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</b> పాఠాలు త్వరలోనే నాన్న నీకోసం ఇక్కడ సిద్ధం చేస్తారు. అప్పటివరకు మన అందమైన గణితం (Maths) నేర్చుకుందాం!"
                                </p>
                                <button
                                  onClick={() => {
                                    setSelectedSubject("maths");
                                    setShowGrade6And9Topics(true);
                                  }}
                                  className="bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer shadow-xs hover:scale-[1.02] duration-150 inline-block"
                                >
                                  📐 Let's Study Maths
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* AI Buddy Prompt Callout */}
                  <div className="bg-natural-cream border border-natural-beige-dark/60 rounded-2xl p-5 text-natural-dark flex flex-col sm:flex-row gap-4 shadow-xs relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-15 text-9xl text-natural-terracotta hidden sm:block">🎓</div>
                    <div className="w-12 h-12 rounded-full bg-white shrink-0 flex items-center justify-center text-2xl shadow-inner border border-natural-beige-dark mx-auto sm:mx-0">
                      👩‍🏫
                    </div>
                    <div className="space-y-1.5 flex-1 text-center sm:text-left z-10">
                      <span className="bg-natural-beige-dark text-natural-dark px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider inline-block">AI Math Companion</span>
                      <h4 className="font-black text-xs sm:text-sm text-natural-dark leading-snug">Stuck on Homework?</h4>
                      <p className="text-xs text-natural-sage leading-normal">
                        Ask your buddy **Ganit Mitra**! He teaches with fun pizza slices and matchstick patterns.
                      </p>
                      <button
                        onClick={() => setActiveSection("tutor")}
                        className="mt-2 bg-natural-primary text-white px-4 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer hover:bg-natural-primary/90 transition shadow-xs"
                      >
                        Chat with Ganit Mitra
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. CHAPTER LESSON VIEW */}
          {activeSection === "lessons" && (
            <div className="p-6 space-y-4 animate-fade-in">
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

          {/* 3. WORKSHEET QUIZ VIEW */}
          {activeSection === "quiz" && (
            <div className="p-6 space-y-4 animate-fade-in">
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

          {/* 4. VISUAL TOOLS VIEW */}
          {activeSection === "visualtools" && (
            <div className="p-6 space-y-4 animate-fade-in">
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

          {/* 5. AI TUTOR CHAT VIEW */}
          {activeSection === "tutor" && (
            <div className="p-6 h-[600px] flex flex-col animate-fade-in">
              <TutorChat
                currentChapterId={selectedChapter.title}
                activeToolId={activeTool}
                onTutorAction={handleTutorAction}
              />
            </div>
          )}

          {/* 6. ACHIEVEMENTS VIEW */}
          {activeSection === "achievements" && (
            <div className="p-6 space-y-6 animate-fade-in" id="achievements_screen_wrapper">
              <h3 className="text-xs font-extrabold text-natural-sage uppercase tracking-widest">
                Your CBSE Trophy Room
              </h3>
              
              <div className="bg-white border border-natural-beige-dark rounded-2xl p-6 text-center flex flex-col items-center shadow-xs">
                <Trophy size={48} className="text-natural-terracotta mb-3 animate-bounce" />
                <h4 className="font-extrabold text-sm md:text-base text-natural-dark">Junior Mathematician</h4>
                <p className="text-xs text-natural-sage max-w-sm mt-1 leading-normal">
                  Every task solved, question asked, and visual explored brings you closer to CBSE excellence!
                </p>
                
                {/* Total progress bar */}
                <div className="w-full bg-natural-beige-light rounded-full h-2 mt-5 relative max-w-md">
                  <div
                    style={{ width: `${Math.min((scorePoints / 500) * 100, 100)}%` }}
                    className="bg-natural-primary h-2 rounded-full transition-all duration-300"
                  />
                </div>
                <span className="text-xs font-bold text-natural-terracotta block mt-2.5 font-mono">
                  {scorePoints} / 500 XP to next rank
                </span>
              </div>

              {/* Medal Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                      onClick={() => isUnlocked && handleBadgeClick(item.title)}
                      className={`p-4 rounded-2xl border text-center relative flex flex-col items-center justify-center transition ${
                        isUnlocked
                          ? "bg-white border-natural-beige-dark hover:border-natural-primary/50 cursor-pointer shadow-xs text-natural-dark"
                          : "bg-natural-beige-light/40 border-natural-beige-dark/40 opacity-60 grayscale select-none text-natural-sage"
                      }`}
                    >
                      <span className="text-3xl mb-2">{item.icon}</span>
                      <h4 className="font-extrabold text-xs text-natural-dark leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-natural-sage mt-1.5 leading-normal">
                        {item.desc}
                      </p>
                      {isUnlocked ? (
                        <span className="absolute top-2.5 right-2.5 text-[9px] bg-natural-cream text-natural-terracotta border border-natural-terracotta/20 rounded-full px-2 py-0.5 font-extrabold font-mono">
                          Unlocked
                        </span>
                      ) : (
                        <span className="text-[8px] font-bold text-natural-sage/70 bg-slate-100 px-1.5 py-0.5 rounded-md mt-2">
                          Criteria: {item.criteria}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Beautiful Footer callout */}
        <div className="bg-gradient-to-r from-natural-dark to-[#494933] border border-natural-dark/50 rounded-2xl p-5 text-white flex gap-4 items-center shadow-xs">
          <span className="text-3xl shrink-0">🇮🇳</span>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-natural-beige-dark">Indian Math Heritage</h4>
            <p className="text-[11px] text-natural-beige-light/90 mt-0.5 leading-relaxed">
              Ancient Indian scholars like Brahmagupta and Aryabhata discovered fundamental mathematical principles such as Zero, decimals, and negative numbers. Today, CBSE Grade 6 builds these powerful foundations for you!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
