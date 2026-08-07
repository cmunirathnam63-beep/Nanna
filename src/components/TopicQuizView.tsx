import React, { useState, useEffect } from "react";
import { getTopicQuiz } from "../data/topicQuizzes";
import { LESSONS_DATA } from "../data/lessons";
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  Sparkles, 
  RefreshCw, 
  ArrowRight, 
  Lightbulb, 
  BookOpen, 
  ChevronDown, 
  ArrowLeft, 
  Clock, 
  User, 
  ShieldCheck, 
  FileText, 
  Check, 
  AlertCircle,
  RotateCcw,
  Flag,
  Grid
} from "lucide-react";

interface TopicQuizViewProps {
  chapterId: string;
  chapterTitle: string;
  selectedTopicTitle?: string | null;
  topicList?: string[];
  onQuizComplete?: (pointsWon: number, solvedCount: number) => void;
  onQuizStateChange?: (isCompleted: boolean) => void;
  onBackToChapters?: () => void;
  selectedGrade?: number;
  selectedSubject?: string;
}

function formatSubjectName(subj?: string): string {
  if (!subj) return "MATHEMATICS";
  if (subj === "maths") return "MATHEMATICS";
  if (subj === "social_science") return "SOCIAL SCIENCE";
  if (subj === "physics") return "PHYSICS";
  if (subj === "chemistry") return "CHEMISTRY";
  if (subj === "evs") return "EVS";
  if (subj === "telugu") return "TELUGU";
  if (subj === "hindi") return "HINDI";
  if (subj === "english") return "ENGLISH";
  return subj.toUpperCase();
}

export type QuestionStatus = 
  | "ANSWERED_MARKED" 
  | "MARKED" 
  | "ANSWERED" 
  | "NOT_ANSWERED" 
  | "NOT_VISITED";

export default function TopicQuizView({
  chapterId,
  chapterTitle,
  selectedTopicTitle,
  topicList,
  onQuizComplete,
  onQuizStateChange,
  onBackToChapters,
  selectedGrade,
  selectedSubject
}: TopicQuizViewProps) {
  // Available topic titles for this chapter
  const availableTopics = topicList || LESSONS_DATA[chapterId]?.steps?.map((s) => s.title) || [];

  // Scope: 'chapter' = covers entire chapter, 'topic' = covers particular topic
  const [quizScope, setQuizScope] = useState<"chapter" | "topic">(selectedTopicTitle ? "topic" : "chapter");
  const [activeTopicName, setActiveTopicName] = useState<string | null>(selectedTopicTitle || null);

  // Derive quiz data dynamically based on active chapter and selected topic scope
  const quizData = React.useMemo(() => {
    return getTopicQuiz(
      chapterId,
      chapterTitle,
      quizScope === "topic" ? activeTopicName : null
    );
  }, [chapterId, chapterTitle, quizScope, activeTopicName]);

  // React if selectedTopicTitle prop changes
  useEffect(() => {
    if (selectedTopicTitle) {
      setQuizScope("topic");
      setActiveTopicName(selectedTopicTitle);
    } else {
      setQuizScope("chapter");
      setActiveTopicName(null);
    }
  }, [selectedTopicTitle]);

  // Active section tab: 'mcqs' | 'assertion_reasons' | 'short_qs'
  const [activeTab, setActiveTab] = useState<"mcqs" | "assertion_reasons" | "short_qs">("mcqs");
  const [currentMcqIdx, setCurrentMcqIdx] = useState<number>(0);
  const [currentArIdx, setCurrentArIdx] = useState<number>(0);
  const [currentSqIdx, setCurrentSqIdx] = useState<number>(0);

  // User responses
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, string>>({});
  const [arAnswers, setArAnswers] = useState<Record<number, string>>({});
  const [sqAnswers, setSqAnswers] = useState<Record<number, string>>({});

  // JEE CBT Question Palette States: Visited & Marked for Review
  const [visitedQuestions, setVisitedQuestions] = useState<Record<string, boolean>>({ "mcqs_0": true });
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});

  // Hints and solutions
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});
  const [showMcqHint, setShowMcqHint] = useState<boolean>(false);
  const [showArHint, setShowArHint] = useState<boolean>(false);
  const [showSqHint, setShowSqHint] = useState<boolean>(false);

  // Exam completion and timer
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(1800); // 30 minutes JEE CBT timer
  const [showConfirmSubmitModal, setShowConfirmSubmitModal] = useState<boolean>(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState<boolean>(false);
  const [showMobilePalette, setShowMobilePalette] = useState<boolean>(false);

  // Mark active question as visited whenever tab/index changes
  useEffect(() => {
    let key = "";
    if (activeTab === "mcqs") key = `mcqs_${currentMcqIdx}`;
    else if (activeTab === "assertion_reasons") key = `ar_${currentArIdx}`;
    else if (activeTab === "short_qs") key = `sq_${currentSqIdx}`;

    if (key) {
      setVisitedQuestions((prev) => ({ ...prev, [key]: true }));
    }
  }, [activeTab, currentMcqIdx, currentArIdx, currentSqIdx]);

  // Countdown timer effect
  useEffect(() => {
    if (isCompleted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isCompleted]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Reset quiz progress whenever chapter, topic, or scope changes
  useEffect(() => {
    setCurrentMcqIdx(0);
    setCurrentArIdx(0);
    setCurrentSqIdx(0);
    setMcqAnswers({});
    setArAnswers({});
    setSqAnswers({});
    setVisitedQuestions({ "mcqs_0": true });
    setMarkedForReview({});
    setRevealedSolutions({});
    setShowMcqHint(false);
    setShowArHint(false);
    setShowSqHint(false);
    setIsCompleted(false);
    setShowConfirmSubmitModal(false);
    setTimeLeft(1800);
    setActiveTab("mcqs");
  }, [chapterId, quizScope, activeTopicName]);

  // Notify parent component about quiz completion state
  useEffect(() => {
    if (onQuizStateChange) {
      onQuizStateChange(isCompleted);
    }
  }, [isCompleted, onQuizStateChange]);

  // Score Calculations
  const correctMcqsCount = quizData.mcqs.reduce((acc, q, idx) => {
    return mcqAnswers[idx] === q.correctAnswer.trim() ? acc + 1 : acc;
  }, 0);

  const correctArCount = quizData.assertionReasons.reduce((acc, q, idx) => {
    return arAnswers[idx] === q.correctAnswer.trim() ? acc + 1 : acc;
  }, 0);

  const totalScore = correctMcqsCount + correctArCount;
  const totalQuestions = quizData.mcqs.length + quizData.assertionReasons.length;

  // Helper to determine question status in JEE NTA format
  const getQuestionStatus = (section: "mcqs" | "ar" | "sq", idx: number): QuestionStatus => {
    const key = `${section}_${idx}`;
    let hasAns = false;
    if (section === "mcqs") hasAns = mcqAnswers[idx] !== undefined;
    else if (section === "ar") hasAns = arAnswers[idx] !== undefined;
    else if (section === "sq") hasAns = !!sqAnswers[idx]?.trim();

    const isMarked = !!markedForReview[key];
    const isVisited = !!visitedQuestions[key];

    if (hasAns && isMarked) return "ANSWERED_MARKED";
    if (!hasAns && isMarked) return "MARKED";
    if (hasAns) return "ANSWERED";
    if (isVisited) return "NOT_ANSWERED";
    return "NOT_VISITED";
  };

  // Count overall statuses for summary palette
  const getStatusCounts = () => {
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let answeredMarked = 0;
    let notVisited = 0;

    const checkStatus = (section: "mcqs" | "ar" | "sq", count: number) => {
      for (let i = 0; i < count; i++) {
        const st = getQuestionStatus(section, i);
        if (st === "ANSWERED") answered++;
        else if (st === "NOT_ANSWERED") notAnswered++;
        else if (st === "MARKED") marked++;
        else if (st === "ANSWERED_MARKED") answeredMarked++;
        else notVisited++;
      }
    };

    checkStatus("mcqs", quizData.mcqs.length);
    checkStatus("ar", quizData.assertionReasons.length);
    checkStatus("sq", quizData.shortQuestions?.length || 0);

    return { answered, notAnswered, marked, answeredMarked, notVisited };
  };

  const statusCounts = getStatusCounts();

  // Navigation & Action Handlers (NTA Standard Actions)
  const handleSaveAndNext = () => {
    let key = "";
    if (activeTab === "mcqs") {
      key = `mcqs_${currentMcqIdx}`;
      setMarkedForReview((prev) => ({ ...prev, [key]: false }));
      if (currentMcqIdx < quizData.mcqs.length - 1) {
        setCurrentMcqIdx((prev) => prev + 1);
      } else {
        setActiveTab("assertion_reasons");
        setCurrentArIdx(0);
      }
    } else if (activeTab === "assertion_reasons") {
      key = `ar_${currentArIdx}`;
      setMarkedForReview((prev) => ({ ...prev, [key]: false }));
      if (currentArIdx < quizData.assertionReasons.length - 1) {
        setCurrentArIdx((prev) => prev + 1);
      } else {
        setActiveTab("short_qs");
        setCurrentSqIdx(0);
      }
    } else if (activeTab === "short_qs") {
      key = `sq_${currentSqIdx}`;
      setMarkedForReview((prev) => ({ ...prev, [key]: false }));
      if (currentSqIdx < (quizData.shortQuestions?.length || 0) - 1) {
        setCurrentSqIdx((prev) => prev + 1);
      } else {
        setShowConfirmSubmitModal(true);
      }
    }
    setShowMcqHint(false);
    setShowArHint(false);
    setShowSqHint(false);
  };

  const handleClearResponse = () => {
    let key = "";
    if (activeTab === "mcqs") {
      key = `mcqs_${currentMcqIdx}`;
      setMcqAnswers((prev) => {
        const copy = { ...prev };
        delete copy[currentMcqIdx];
        return copy;
      });
    } else if (activeTab === "assertion_reasons") {
      key = `ar_${currentArIdx}`;
      setArAnswers((prev) => {
        const copy = { ...prev };
        delete copy[currentArIdx];
        return copy;
      });
    } else if (activeTab === "short_qs") {
      key = `sq_${currentSqIdx}`;
      setSqAnswers((prev) => {
        const copy = { ...prev };
        delete copy[currentSqIdx];
        return copy;
      });
    }
    setMarkedForReview((prev) => ({ ...prev, [key]: false }));
  };

  const handleMarkForReviewAndNext = () => {
    let key = "";
    if (activeTab === "mcqs") {
      key = `mcqs_${currentMcqIdx}`;
      setMarkedForReview((prev) => ({ ...prev, [key]: true }));
      if (currentMcqIdx < quizData.mcqs.length - 1) {
        setCurrentMcqIdx((prev) => prev + 1);
      } else {
        setActiveTab("assertion_reasons");
        setCurrentArIdx(0);
      }
    } else if (activeTab === "assertion_reasons") {
      key = `ar_${currentArIdx}`;
      setMarkedForReview((prev) => ({ ...prev, [key]: true }));
      if (currentArIdx < quizData.assertionReasons.length - 1) {
        setCurrentArIdx((prev) => prev + 1);
      } else {
        setActiveTab("short_qs");
        setCurrentSqIdx(0);
      }
    } else if (activeTab === "short_qs") {
      key = `sq_${currentSqIdx}`;
      setMarkedForReview((prev) => ({ ...prev, [key]: true }));
      if (currentSqIdx < (quizData.shortQuestions?.length || 0) - 1) {
        setCurrentSqIdx((prev) => prev + 1);
      } else {
        setShowConfirmSubmitModal(true);
      }
    }
    setShowMcqHint(false);
    setShowArHint(false);
    setShowSqHint(false);
  };

  const handleFinishQuiz = () => {
    setShowConfirmSubmitModal(false);
    setIsCompleted(true);
    if (onQuizComplete) {
      const pointsWon = totalScore * 10 + 50;
      onQuizComplete(pointsWon, totalQuestions);
    }
  };

  const handleRestartQuiz = () => {
    setMcqAnswers({});
    setArAnswers({});
    setSqAnswers({});
    setVisitedQuestions({ "mcqs_0": true });
    setMarkedForReview({});
    setRevealedSolutions({});
    setCurrentMcqIdx(0);
    setCurrentArIdx(0);
    setCurrentSqIdx(0);
    setShowMcqHint(false);
    setShowArHint(false);
    setShowSqHint(false);
    setIsCompleted(false);
    setShowConfirmSubmitModal(false);
    setTimeLeft(1800);
    setActiveTab("mcqs");
  };

  // Helper to render NTA Status Badge
  const renderStatusBadge = (st: QuestionStatus, label: string) => {
    switch (st) {
      case "ANSWERED":
        return (
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs border border-emerald-500">
            {label}
          </div>
        );
      case "NOT_ANSWERED":
        return (
          <div className="w-8 h-8 rounded-lg bg-rose-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs border border-rose-500">
            {label}
          </div>
        );
      case "MARKED":
        return (
          <div className="w-8 h-8 rounded-full bg-purple-700 text-white font-extrabold text-xs flex items-center justify-center shadow-xs border border-purple-500">
            {label}
          </div>
        );
      case "ANSWERED_MARKED":
        return (
          <div className="relative w-8 h-8 rounded-full bg-purple-700 text-white font-extrabold text-xs flex items-center justify-center shadow-xs border border-purple-500">
            {label}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <Check size={8} className="text-white stroke-[3]" />
            </span>
          </div>
        );
      case "NOT_VISITED":
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-300">
            {label}
          </div>
        );
    }
  };

  // =========================================================================
  // SUBMITTED RESULT SCORECARD VIEW (Light Theme JEE CBT Scorecard)
  // =========================================================================
  if (isCompleted) {
    const answeredSqCount = Object.keys(sqAnswers).filter((k) => sqAnswers[Number(k)]?.trim()).length;
    const accuracy = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

    return (
      <div className="bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 shadow-xl p-4 sm:p-6 lg:p-8 animate-fade-in space-y-6 max-w-5xl mx-auto my-4 font-sans" id="jee_result_container">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 p-5 rounded-2xl border border-slate-700 text-center text-white space-y-3 relative overflow-hidden shadow-md">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <ShieldCheck size={16} />
            <span>Official JEE CBT Scorecard Generated</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
            NTA JEE Online CBT Assessment Report
          </h2>
          <p className="text-xs sm:text-sm text-sky-200/90 max-w-xl mx-auto font-medium">
            Chapter: <strong className="text-white font-bold">{chapterTitle}</strong> | Grade {selectedGrade || 6} {formatSubjectName(selectedSubject)}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-extrabold text-sky-300">
            <span>⏱️ Time Remaining: {formatTime(timeLeft)}</span>
            <span>🎯 Total Accuracy: {accuracy}%</span>
          </div>
        </div>

        {/* Score Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700">Total Score</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {totalScore * 4} <span className="text-xs text-sky-600 font-mono">/ {totalQuestions * 4} Marks</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5">+4 for Correct, 0 for Unattempted</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">Section 1: MCQs</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {correctMcqsCount} / {quizData.mcqs.length}
            </div>
            <p className="text-[10px] text-emerald-700 mt-0.5">MCQs Solved Correctly</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">Section 2: A & R</span>
            <div className="text-2xl font-black text-amber-600 mt-1">
              {correctArCount} / {quizData.assertionReasons.length}
            </div>
            <p className="text-[10px] text-amber-700 mt-0.5">Assertion-Reasons Correct</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700">Section 3: Subjective</span>
            <div className="text-2xl font-black text-purple-600 mt-1">
              {answeredSqCount} / {quizData.shortQuestions?.length || 0}
            </div>
            <p className="text-[10px] text-purple-700 mt-0.5">2-Mark Questions Attempted</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          {onBackToChapters && (
            <button
              onClick={onBackToChapters}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer transition border border-slate-300"
            >
              <ArrowLeft size={15} />
              <span>Back to Chapters</span>
            </button>
          )}

          <button
            onClick={handleRestartQuiz}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer transition shadow-md"
          >
            <RefreshCw size={15} />
            <span>Retake JEE CBT Test</span>
          </button>
        </div>

        {/* Detailed Solutions Section */}
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
            <BookOpen size={18} className="text-sky-600" />
            <span>Detailed Question-by-Question Solution Analysis</span>
          </h3>

          <div className="space-y-3">
            {quizData.mcqs.map((q, idx) => {
              const userAns = mcqAnswers[idx];
              const isCorrect = userAns === q.correctAnswer.trim();

              return (
                <div key={q.id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 text-xs shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900">MCQ Q{idx + 1}: {q.question}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      isCorrect ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-rose-100 text-rose-800 border border-rose-300"
                    }`}>
                      {isCorrect ? "Correct (+4)" : userAns ? "Incorrect (0)" : "Unattempted (0)"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 pt-1">
                    <div>Your Choice: <strong className="text-slate-900 font-mono">{userAns || "None"}</strong></div>
                    <div>Correct Answer: <strong className="text-emerald-700 font-mono">{q.correctAnswer}</strong></div>
                  </div>

                  <p className="text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
                    <strong className="text-sky-700">Explanation: </strong> {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active question references
  const currentMcq = quizData.mcqs[currentMcqIdx];
  const userMcqAns = mcqAnswers[currentMcqIdx];

  const currentAr = quizData.assertionReasons[currentArIdx];
  const userArAns = arAnswers[currentArIdx];

  const currentSq = quizData.shortQuestions?.[currentSqIdx];

  // =========================================================================
  // MAIN JEE CBT EXAMINATION INTERFACE (Light Theme & Locked Screen Viewport)
  // =========================================================================
  return (
    <div className="bg-slate-100 text-slate-900 rounded-none sm:rounded-2xl border-0 sm:border border-slate-300 shadow-xl overflow-hidden h-full flex flex-col flex-1 font-sans w-full relative min-h-0" id="jee_cbt_workspace">
      
      {/* ----------------------------------------------------------------- */}
      {/* 1. NTA JEE EXAM TOP BANNER & CANDIDATE BAR                       */}
      {/* ----------------------------------------------------------------- */}
      <header className="bg-slate-900 text-white border-b border-slate-300 p-3 sm:p-4 shrink-0 space-y-3 shadow-sm">
        {/* NTA Main Title Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-600 text-white font-black flex items-center justify-center text-xs shadow-md border border-sky-400 shrink-0">
              NTA
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider leading-tight">
                National Testing Agency - JEE Online CBT Examination Portal
              </h1>
              <p className="text-[10px] text-sky-300 font-semibold tracking-wide">
                GyanSetu CBSE Assessment System | Grade {selectedGrade || 6} {formatSubjectName(selectedSubject)}
              </p>
            </div>
          </div>

          {/* Clock Timer */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-950 border border-sky-500/50 px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-sky-200 font-mono text-xs sm:text-sm font-black shadow-inner">
              <Clock size={16} className="text-sky-400 animate-pulse" />
              <span>Time Left: {formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={() => setShowInstructionsModal(true)}
              className="text-[11px] font-extrabold text-sky-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-xl border border-slate-700 transition cursor-pointer shrink-0 hidden sm:flex items-center gap-1"
            >
              <FileText size={13} />
              <span>Instructions</span>
            </button>
          </div>
        </div>

        {/* Candidate & Scope Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Candidate Profile Badge */}
          <div className="flex items-center gap-2.5 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700 shrink-0">
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
              <User size={13} />
            </div>
            <div>
              <span className="text-[10px] text-slate-300 block leading-tight">Candidate:</span>
              <span className="font-extrabold text-white text-[11px] leading-tight">GyanSetu Student</span>
            </div>
          </div>

          {/* Chapter / Topic Scope Selector */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] font-extrabold uppercase text-sky-300 shrink-0 hidden sm:inline">
              Subject Module:
            </span>
            <select
              value={quizScope === "chapter" ? "ALL" : (activeTopicName || "CUSTOM")}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "ALL") {
                  setQuizScope("chapter");
                  setActiveTopicName(null);
                } else {
                  setQuizScope("topic");
                  setActiveTopicName(val);
                }
              }}
              className="bg-slate-800 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl border border-slate-700 focus:border-sky-400 outline-none cursor-pointer truncate max-w-[200px] sm:max-w-[280px]"
            >
              <option value="ALL">📚 Full Chapter: {chapterTitle}</option>
              {availableTopics.map((topic, idx) => (
                <option key={idx} value={topic}>🎯 Topic {idx + 1}: {topic}</option>
              ))}
            </select>
          </div>

          {/* Toggle Palette on Mobile */}
          <button
            onClick={() => setShowMobilePalette(!showMobilePalette)}
            className="lg:hidden text-xs font-bold bg-sky-800 text-white border border-sky-600 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shrink-0"
          >
            <Grid size={14} />
            <span>Question Palette ({statusCounts.answered}/{totalQuestions})</span>
          </button>
        </div>
      </header>

      {/* ----------------------------------------------------------------- */}
      {/* 2. MAIN TEST WORKSPACE (QUESTION AREA + PALETTE SIDEBAR)          */}
      {/* ----------------------------------------------------------------- */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden relative">

        {/* LEFT COLUMN: QUESTION CONTENT & ACTION BAR */}
        <div className="flex-1 min-h-0 flex flex-col p-3 sm:p-4 gap-3 overflow-hidden">

          {/* Section Selector Tabs across top */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shrink-0 shadow-2xs">
            <button
              onClick={() => setActiveTab("mcqs")}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === "mcqs"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <span>Section 1: MCQs ({quizData.mcqs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("assertion_reasons")}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === "assertion_reasons"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <span>Section 2: Assertion-Reason ({quizData.assertionReasons.length})</span>
            </button>

            {quizData.shortQuestions && quizData.shortQuestions.length > 0 && (
              <button
                onClick={() => setActiveTab("short_qs")}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "short_qs"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <span>Section 3: Subjective ({quizData.shortQuestions.length})</span>
              </button>
            )}
          </div>

          {/* QUESTION PANEL: SECTION 1 (MCQs) */}
          {activeTab === "mcqs" && currentMcq && (
            <div className="flex-1 min-h-0 flex flex-col space-y-3 overflow-y-auto pr-1 animate-fade-in">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 shrink-0">
                <h2 className="text-sm sm:text-base font-black text-slate-900">
                  Question No. {currentMcqIdx + 1}
                </h2>
                <span className="text-[10px] font-mono font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                  Marks: +4 | 0
                </span>
              </div>

              {/* Question Text Box */}
              <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl space-y-4 shadow-xs">
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                  {currentMcq.question}
                </p>

                {/* MCQ Options */}
                <div className="grid grid-cols-1 gap-2.5 pt-1">
                  {currentMcq.options.map((opt) => {
                    const letter = opt.trim().charAt(0);
                    const isSelected = userMcqAns === letter;

                    return (
                      <button
                        key={opt}
                        onClick={() => setMcqAnswers((prev) => ({ ...prev, [currentMcqIdx]: letter }))}
                        className={`p-3.5 rounded-xl border-2 text-xs font-medium text-left transition flex items-center gap-3 cursor-pointer ${
                          isSelected
                            ? "bg-sky-50 border-sky-600 text-sky-950 font-extrabold shadow-xs ring-1 ring-sky-500"
                            : "bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-800"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-mono font-black text-[11px] shrink-0 ${
                          isSelected ? "border-sky-600 bg-sky-600 text-white" : "border-slate-300 bg-white text-slate-700"
                        }`}>
                          {letter}
                        </div>
                        <span className="leading-relaxed flex-1">{opt.replace(/^[A-D]\)\s*/, "")}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Hint Toggle */}
                {showMcqHint && (
                  <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 animate-fade-in flex items-start gap-2">
                    <Lightbulb size={16} className="text-amber-600 shrink-0 mt-0.5" />
                    <div><strong className="font-bold">Hint: </strong>{currentMcq.hint}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* QUESTION PANEL: SECTION 2 (ASSERTION & REASONING) */}
          {activeTab === "assertion_reasons" && currentAr && (
            <div className="flex-1 min-h-0 flex flex-col space-y-3 overflow-y-auto pr-1 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 shrink-0">
                <h2 className="text-sm sm:text-base font-black text-slate-900">
                  Assertion & Reason Question No. {currentArIdx + 1}
                </h2>
                <span className="text-[10px] font-mono font-extrabold text-amber-800 bg-amber-50 border border-amber-300 px-2.5 py-0.5 rounded-full">
                  Marks: +4 | 0
                </span>
              </div>

              <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl space-y-4 shadow-xs">
                {/* Assertion Box */}
                <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200 space-y-1">
                  <span className="bg-amber-600 text-white font-black text-[10px] uppercase px-2 py-0.5 rounded">
                    Assertion (A)
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 pt-1 leading-relaxed">
                    {currentAr.assertion}
                  </p>
                </div>

                {/* Reason Box */}
                <div className="bg-teal-50/80 p-3.5 rounded-xl border border-teal-200 space-y-1">
                  <span className="bg-teal-600 text-white font-black text-[10px] uppercase px-2 py-0.5 rounded">
                    Reason (R)
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 pt-1 leading-relaxed">
                    {currentAr.reason}
                  </p>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {currentAr.options.map((opt) => {
                    const letter = opt.trim().charAt(0);
                    const isSelected = userArAns === letter;

                    return (
                      <button
                        key={opt}
                        onClick={() => setArAnswers((prev) => ({ ...prev, [currentArIdx]: letter }))}
                        className={`p-3.5 rounded-xl border-2 text-xs font-medium text-left transition flex items-center gap-3 cursor-pointer ${
                          isSelected
                            ? "bg-amber-50 border-amber-600 text-amber-950 font-extrabold shadow-xs ring-1 ring-amber-500"
                            : "bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-800"
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-mono font-black text-[11px] shrink-0 ${
                          isSelected ? "border-amber-600 bg-amber-600 text-white" : "border-slate-300 bg-white text-slate-700"
                        }`}>
                          {letter}
                        </div>
                        <span className="leading-relaxed flex-1">{opt.replace(/^[A-D]\)\s*/, "")}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* QUESTION PANEL: SECTION 3 (SUBJECTIVE / SHORT ANSWER) */}
          {activeTab === "short_qs" && currentSq && (
            <div className="flex-1 min-h-0 flex flex-col space-y-3 overflow-y-auto pr-1 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 shrink-0">
                <h2 className="text-sm sm:text-base font-black text-slate-900">
                  2-Mark Subjective Question No. {currentSqIdx + 1}
                </h2>
                <span className="text-[10px] font-mono font-extrabold text-purple-800 bg-purple-50 border border-purple-300 px-2.5 py-0.5 rounded-full">
                  Marks: +2 | 0
                </span>
              </div>

              <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl space-y-4 shadow-xs">
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                  {currentSq.question}
                </p>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-purple-800">
                    ✍️ Type Your Working / Calculations / Response:
                  </label>
                  <textarea
                    value={sqAnswers[currentSqIdx] || ""}
                    onChange={(e) => setSqAnswers((prev) => ({ ...prev, [currentSqIdx]: e.target.value }))}
                    placeholder="Type out your step-by-step calculations or answer..."
                    rows={4}
                    className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:border-purple-500 focus:bg-white outline-none transition font-sans"
                  />
                </div>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------- */}
          {/* NTA ACTION CONTROL BAR (SAVE & NEXT, CLEAR, MARK FOR REVIEW)    */}
          {/* --------------------------------------------------------------- */}
          <div className="bg-white border border-slate-200 p-3 sm:p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-2.5 shrink-0 mt-auto shadow-xs">
            {/* Left Action Cluster: Save & Next + Clear Response */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleSaveAndNext}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer active:scale-95"
                title="Save answer and proceed to next question"
                id="jee_save_next_btn"
              >
                <CheckCircle2 size={15} />
                <span>Save & Next</span>
              </button>

              <button
                onClick={handleClearResponse}
                className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 border border-slate-300 transition cursor-pointer active:scale-95"
                title="Clear selected option"
                id="jee_clear_response_btn"
              >
                <RotateCcw size={14} />
                <span>Clear Response</span>
              </button>
            </div>

            {/* Middle Action Cluster: Mark for Review & Next */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleMarkForReviewAndNext}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer active:scale-95"
                title="Mark question for review and proceed"
                id="jee_mark_review_btn"
              >
                <Flag size={14} />
                <span>Mark for Review & Next</span>
              </button>
            </div>

            {/* Right Action Cluster: Submit Test */}
            <button
              onClick={() => setShowConfirmSubmitModal(true)}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md border border-rose-500/30 transition cursor-pointer active:scale-95 ml-auto"
              id="jee_submit_test_btn"
            >
              <Award size={15} />
              <span>Submit Test</span>
            </button>
          </div>

        </div>

        {/* ----------------------------------------------------------------- */}
        {/* RIGHT COLUMN: OFFICIAL NTA QUESTION PALETTE SIDEBAR               */}
        {/* ----------------------------------------------------------------- */}
        <aside className={`lg:w-80 bg-slate-50 border-l border-slate-200 p-4 space-y-4 shrink-0 overflow-y-auto h-full min-h-0 ${
          showMobilePalette ? "block fixed inset-0 z-50 bg-white p-6" : "hidden lg:block"
        }`}>
          {/* Mobile Header Close Button */}
          {showMobilePalette && (
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 lg:hidden">
              <h3 className="font-extrabold text-slate-900 text-sm">Question Palette</h3>
              <button
                onClick={() => setShowMobilePalette(false)}
                className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-xs font-bold"
              >
                Close ✖
              </button>
            </div>
          )}

          {/* Palette Legend Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3.5 space-y-2.5 shadow-xs">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-sky-800 border-b border-slate-100 pb-1.5">
              Question Palette Legend
            </h4>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center">
                  {statusCounts.answered}
                </div>
                <span className="text-slate-700 truncate">Answered</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-rose-600 text-white text-[10px] font-black flex items-center justify-center">
                  {statusCounts.notAnswered}
                </div>
                <span className="text-slate-700 truncate">Not Answered</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-purple-700 text-white text-[10px] font-black flex items-center justify-center">
                  {statusCounts.marked}
                </div>
                <span className="text-slate-700 truncate">Marked for Review</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative w-5 h-5 rounded-full bg-purple-700 text-white text-[10px] font-black flex items-center justify-center">
                  {statusCounts.answeredMarked}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full" />
                </div>
                <span className="text-slate-700 truncate">Ans & Marked</span>
              </div>

              <div className="flex items-center gap-2 col-span-2">
                <div className="w-5 h-5 rounded bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-black flex items-center justify-center">
                  {statusCounts.notVisited}
                </div>
                <span className="text-slate-600 truncate">Not Visited</span>
              </div>
            </div>
          </div>

          {/* Section 1 MCQ Palette Grid */}
          <div className="space-y-2">
            <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-sky-800 flex items-center justify-between">
              <span>Section 1: MCQs</span>
              <span>{quizData.mcqs.length} Qs</span>
            </h5>

            <div className="grid grid-cols-5 gap-2">
              {quizData.mcqs.map((_, idx) => {
                const st = getQuestionStatus("mcqs", idx);
                const isCur = activeTab === "mcqs" && currentMcqIdx === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveTab("mcqs");
                      setCurrentMcqIdx(idx);
                      setShowMobilePalette(false);
                    }}
                    className={`relative cursor-pointer transition transform active:scale-90 ${isCur ? "ring-2 ring-sky-600 scale-105" : ""}`}
                  >
                    {renderStatusBadge(st, String(idx + 1))}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2 Assertion & Reason Palette Grid */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 flex items-center justify-between">
              <span>Section 2: Assertion-Reason</span>
              <span>{quizData.assertionReasons.length} Qs</span>
            </h5>

            <div className="grid grid-cols-5 gap-2">
              {quizData.assertionReasons.map((_, idx) => {
                const st = getQuestionStatus("ar", idx);
                const isCur = activeTab === "assertion_reasons" && currentArIdx === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveTab("assertion_reasons");
                      setCurrentArIdx(idx);
                      setShowMobilePalette(false);
                    }}
                    className={`relative cursor-pointer transition transform active:scale-90 ${isCur ? "ring-2 ring-amber-600 scale-105" : ""}`}
                  >
                    {renderStatusBadge(st, String(idx + 1))}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3 Short Qs Palette Grid */}
          {quizData.shortQuestions && quizData.shortQuestions.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-purple-800 flex items-center justify-between">
                <span>Section 3: Subjective</span>
                <span>{quizData.shortQuestions.length} Qs</span>
              </h5>

              <div className="grid grid-cols-5 gap-2">
                {quizData.shortQuestions.map((_, idx) => {
                  const st = getQuestionStatus("sq", idx);
                  const isCur = activeTab === "short_qs" && currentSqIdx === idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveTab("short_qs");
                        setCurrentSqIdx(idx);
                        setShowMobilePalette(false);
                      }}
                      className={`relative cursor-pointer transition transform active:scale-90 ${isCur ? "ring-2 ring-purple-600 scale-105" : ""}`}
                    >
                      {renderStatusBadge(st, String(idx + 1))}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 3. SUBMIT TEST CONFIRMATION MODAL                                 */}
      {/* ----------------------------------------------------------------- */}
      {showConfirmSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-5 text-slate-900 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center border border-rose-200">
                <AlertCircle size={22} />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">Submit Examination Confirmation</h3>
                <p className="text-[11px] text-slate-500">NTA JEE Online CBT Assessment</p>
              </div>
            </div>

            {/* Breakdown Table */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs">
              <h4 className="font-extrabold text-sky-800 uppercase tracking-wider text-[10px]">
                Question Attempt Summary
              </h4>

              <div className="space-y-1.5 pt-1 text-slate-700">
                <div className="flex items-center justify-between">
                  <span>Answered Questions:</span>
                  <strong className="text-emerald-700 font-mono">{statusCounts.answered}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Not Answered Questions:</span>
                  <strong className="text-rose-700 font-mono">{statusCounts.notAnswered}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Marked for Review:</span>
                  <strong className="text-purple-700 font-mono">{statusCounts.marked}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Answered & Marked for Review:</span>
                  <strong className="text-purple-800 font-mono">{statusCounts.answeredMarked}</strong>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-1">
                  <span>Not Visited Questions:</span>
                  <strong className="text-slate-600 font-mono">{statusCounts.notVisited}</strong>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Are you sure you want to finish and submit the test? You will not be able to change your answers once submitted.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmSubmitModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition border border-slate-300"
              >
                Return to Test
              </button>

              <button
                onClick={handleFinishQuiz}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs cursor-pointer transition shadow-md"
              >
                Final Submit & View Scorecard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* 4. INSTRUCTIONS MODAL                                              */}
      {/* ----------------------------------------------------------------- */}
      {showInstructionsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 text-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-black text-slate-900 text-base">NTA JEE CBT Test Instructions</h3>
              <button
                onClick={() => setShowInstructionsModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-sm"
              >
                ✖
              </button>
            </div>

            <div className="text-xs text-slate-700 space-y-2.5 leading-relaxed max-h-80 overflow-y-auto pr-1">
              <p>1. The clock has been set at the server and countdown timer in top right displays remaining time.</p>
              <p>2. To answer a question, click on the option button and then click on <strong className="text-emerald-700">Save & Next</strong>.</p>
              <p>3. To mark a question for review, select an option (optional) and click <strong className="text-indigo-700">Mark for Review & Next</strong>.</p>
              <p>4. To unselect a chosen response, click <strong className="text-slate-700">Clear Response</strong>.</p>
              <p>5. Questions Answered & Marked for Review WILL be evaluated in JEE Main evaluation.</p>
            </div>

            <div className="text-right pt-2">
              <button
                onClick={() => setShowInstructionsModal(false)}
                className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs cursor-pointer transition"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
