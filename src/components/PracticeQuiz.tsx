import React, { useState, useEffect } from "react";
import { HelpCircle, ChevronRight, ChevronLeft, CheckCircle2, XCircle, Award, RotateCcw, MessageSquare, Loader, Bookmark } from "lucide-react";
import { QuizQuestion, Worksheet } from "../types";
import TopicQuizView from "./TopicQuizView";

interface PracticeQuizProps {
  chapterId: string;
  chapterTitle: string;
  onQuizComplete: (points: number, solvedCount: number) => void;
  onAskTutor: (question: string) => void;
}

export default function PracticeQuiz({
  chapterId,
  chapterTitle,
  onQuizComplete,
  onAskTutor
}: PracticeQuizProps) {
  const [worksheet, setWorksheet] = useState<Worksheet | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  
  // Quiz Score stats
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [retryAttempt, setRetryAttempt] = useState<number>(0);

  // Mode Selection: selection, topic_quiz (5 MCQs + 5 Assertion-Reason), mcq_in_one (JEE style online exam), cbse_exam (traditional step-by-step)
  const [quizMode, setQuizMode] = useState<"selection" | "topic_quiz" | "mcq_in_one" | "cbse_exam">("topic_quiz");
  const [showMcqHints, setShowMcqHints] = useState<Record<number, boolean>>({});

  // JEE Mode specific states
  const [currentMcqIdx, setCurrentMcqIdx] = useState<number>(0);
  const [stagedOption, setStagedOption] = useState<string | null>(null);
  const [mcqStatuses, setMcqStatuses] = useState<Record<number, "not_visited" | "not_answered" | "answered" | "marked" | "marked_answered">>({});
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState<boolean>(false);
  const [showPalette, setShowPalette] = useState<boolean>(false);

  // Load CBSE worksheet on mount or chapter change
  useEffect(() => {
    setRetryAttempt(0);
    loadWorksheet(0);
  }, [chapterId]);

  const loadWorksheet = async (attemptToLoad = retryAttempt) => {
    setLoading(true);
    setWorksheet(null);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);
    setCorrectCount(0);
    setQuizFinished(false);
    setUserAnswers({});
    setQuizMode("selection");
    setShowMcqHints({});
    
    // Reset JEE states
    setCurrentMcqIdx(0);
    setStagedOption(null);
    setMcqStatuses({});
    setConfirmSubmitOpen(false);

    try {
      const response = await fetch("/api/generate-worksheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          chapter: chapterTitle,
          chapterId: chapterId,
          attempt: attemptToLoad
        })
      });
      const data = await response.json();
      setWorksheet(data);
    } catch (err) {
      console.error("Failed to generate worksheet from server:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (opt: string) => {
    if (isSubmitted) return;
    // Extract the letter (A, B, C, D) from option text like "A) 5/12"
    const letter = opt.trim().charAt(0);
    setSelectedOption(letter);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || !worksheet) return;
    
    setIsSubmitted(true);
    const correctLetter = worksheet.problems[currentIdx].correctAnswer.trim();
    
    // Store user choice
    setUserAnswers(prev => ({ ...prev, [currentIdx]: selectedOption }));

    if (selectedOption === correctLetter) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!worksheet) return;

    if (currentIdx < worksheet.problems.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setShowHint(false);
    } else {
      // Finish Quiz
      setQuizFinished(true);
      const pointsWon = correctCount * 20;
      onQuizComplete(pointsWon, worksheet.problems.length);
    }
  };

  const handlePrevQuestion = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
      const prevAns = userAnswers[currentIdx - 1];
      setSelectedOption(prevAns || null);
      setIsSubmitted(!!prevAns);
      setShowHint(false);
    }
  };

  const handleRecheck = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);
    setCorrectCount(0);
    setQuizFinished(false);
    setUserAnswers({});
    setQuizMode("selection");
    setShowMcqHints({});
    
    // Reset JEE
    setCurrentMcqIdx(0);
    setStagedOption(null);
    setMcqStatuses({});
    setConfirmSubmitOpen(false);
  };

  const handleBackToSelection = () => {
    setQuizMode("selection");
    setIsSubmitted(false);
    setUserAnswers({});
    setCorrectCount(0);
    setCurrentIdx(0);
    setSelectedOption(null);
    setQuizFinished(false);
    setConfirmSubmitOpen(false);
  };

  // JEE Actions
  const initJeeMode = () => {
    setQuizMode("mcq_in_one");
    setIsSubmitted(false);
    setUserAnswers({});
    setCorrectCount(0);
    setCurrentMcqIdx(0);
    setStagedOption(null);
    setConfirmSubmitOpen(false);
    setShowPalette(false);
    
    const initialStatuses: Record<number, "not_visited" | "not_answered" | "answered" | "marked" | "marked_answered"> = {};
    for (let i = 0; i < 20; i++) {
      initialStatuses[i] = i === 0 ? "not_answered" : "not_visited";
    }
    setMcqStatuses(initialStatuses);
  };

  const handleJeeSaveAndNext = () => {
    if (!worksheet) return;
    
    if (stagedOption) {
      setUserAnswers(prev => ({ ...prev, [currentMcqIdx]: stagedOption }));
      setMcqStatuses(prev => ({ ...prev, [currentMcqIdx]: "answered" }));
    } else {
      setMcqStatuses(prev => ({ ...prev, [currentMcqIdx]: "not_answered" }));
    }

    if (currentMcqIdx < worksheet.problems.length - 1) {
      const nextIdx = currentMcqIdx + 1;
      setCurrentMcqIdx(nextIdx);
      setStagedOption(userAnswers[nextIdx] || null);
      setMcqStatuses(prev => {
        if (prev[nextIdx] === "not_visited") {
          return { ...prev, [nextIdx]: "not_answered" };
        }
        return prev;
      });
    }
  };

  const handleJeeMarkForReview = () => {
    if (!worksheet) return;
    const status = stagedOption ? "marked_answered" : "marked";
    
    if (stagedOption) {
      setUserAnswers(prev => ({ ...prev, [currentMcqIdx]: stagedOption }));
    } else {
      setUserAnswers(prev => {
        const updated = { ...prev };
        delete updated[currentMcqIdx];
        return updated;
      });
    }
    
    setMcqStatuses(prev => ({ ...prev, [currentMcqIdx]: status }));

    if (currentMcqIdx < worksheet.problems.length - 1) {
      const nextIdx = currentMcqIdx + 1;
      setCurrentMcqIdx(nextIdx);
      setStagedOption(userAnswers[nextIdx] || null);
      setMcqStatuses(prev => {
        if (prev[nextIdx] === "not_visited") {
          return { ...prev, [nextIdx]: "not_answered" };
        }
        return prev;
      });
    }
  };

  const handleJeeClearResponse = () => {
    setStagedOption(null);
    setUserAnswers(prev => {
      const updated = { ...prev };
      delete updated[currentMcqIdx];
      return updated;
    });
    setMcqStatuses(prev => ({ ...prev, [currentMcqIdx]: "not_answered" }));
  };

  const handleJeePrev = () => {
    if (currentMcqIdx > 0) {
      const prevIdx = currentMcqIdx - 1;
      setCurrentMcqIdx(prevIdx);
      setStagedOption(userAnswers[prevIdx] || null);
      setMcqStatuses(prev => {
        if (prev[prevIdx] === "not_visited") {
          return { ...prev, [prevIdx]: "not_answered" };
        }
        return prev;
      });
    }
  };

  const handleJeeNext = () => {
    if (!worksheet) return;
    if (currentMcqIdx < worksheet.problems.length - 1) {
      const nextIdx = currentMcqIdx + 1;
      setCurrentMcqIdx(nextIdx);
      setStagedOption(userAnswers[nextIdx] || null);
      setMcqStatuses(prev => {
        if (prev[nextIdx] === "not_visited") {
          return { ...prev, [nextIdx]: "not_answered" };
        }
        return prev;
      });
    }
  };

  const handlePaletteClick = (idx: number) => {
    setCurrentMcqIdx(idx);
    setStagedOption(userAnswers[idx] || null);
    setMcqStatuses(prev => {
      if (prev[idx] === "not_visited") {
        return { ...prev, [idx]: "not_answered" };
      }
      return prev;
    });
  };

  const submitJeeExam = () => {
    if (!worksheet) return;
    
    let correct = 0;
    worksheet.problems.forEach((prob, idx) => {
      if (userAnswers[idx] === prob.correctAnswer) {
        correct++;
      }
    });

    setCorrectCount(correct);
    setIsSubmitted(true);
    setQuizFinished(true);
    setConfirmSubmitOpen(false);
    
    const pointsWon = correct * 20;
    onQuizComplete(pointsWon, worksheet.problems.length);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center bg-white border border-natural-beige-dark rounded-2xl h-[450px]">
        <div className="relative w-16 h-16 mb-4">
          <Loader className="animate-spin text-natural-primary w-full h-full" />
          <span className="absolute inset-0 flex items-center justify-center text-xl">📝</span>
        </div>
        <h3 className="font-extrabold text-natural-dark text-lg">Generating CBSE Practice Sheet...</h3>
        <p className="text-xs text-natural-sage max-w-sm mt-1.5 leading-relaxed">
          Gemini is selecting curriculum-aligned problems, helpful hints, and step-by-step explanations for {chapterTitle}.
        </p>
      </div>
    );
  }

  if (!worksheet || worksheet.problems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-natural-beige-dark rounded-2xl h-[400px]">
        <XCircle size={40} className="text-natural-terracotta mb-3" />
        <h3 className="font-extrabold text-natural-dark">Worksheet Unavailable</h3>
        <p className="text-xs text-natural-sage max-w-xs mt-1.5 leading-relaxed">
          There was an issue retrieving the math question sheet. Please check your internet or try refreshing.
        </p>
        <button
          onClick={() => loadWorksheet()}
          className="mt-4 px-4 py-2 bg-natural-primary hover:bg-natural-primary/90 text-white rounded-xl text-xs font-bold cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Progressive difficulty level helper based on problem index (0-indexed)
  const getProblemDifficulty = (idx: number) => {
    if (idx < 7) return { label: "Beginner", color: "text-[#3c5030] bg-[#e7f0e3] border-[#3c5030]/20", dot: "🟢" };
    if (idx < 14) return { label: "Intermediate", color: "text-[#854d0e] bg-[#fef9c3] border-[#eab308]/30", dot: "🟡" };
    return { label: "Expert", color: "text-natural-terracotta bg-natural-cream border-natural-terracotta/20", dot: "🔴" };
  };

  const currentProblem = worksheet.problems[currentIdx];
  const isCorrect = selectedOption === currentProblem.correctAnswer;

  return (
    <div className={`w-full ${quizMode === "topic_quiz" || quizMode === "mcq_in_one" ? "h-full flex flex-col flex-1 min-h-0 overflow-hidden" : "overflow-hidden"}`} id="quiz_viewport">
      {/* Quiz Progress header */}
      <div className="bg-natural-beige-light border-b border-natural-beige-dark p-4 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-natural-sage tracking-wider">Practice Worksheet</span>
            {retryAttempt > 0 && (
              <span className="bg-natural-terracotta/10 text-natural-terracotta text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-natural-terracotta/20 animate-pulse">
                Retake Attempt #{retryAttempt + 1}
              </span>
            )}
          </div>
          <h3 className="font-bold text-natural-dark text-sm tracking-wide">{worksheet.title}</h3>
        </div>
        {!quizFinished && quizMode !== "selection" && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleBackToSelection}
              className="text-[9px] font-bold text-natural-sage hover:text-natural-terracotta transition uppercase tracking-wider bg-white px-2 py-1 rounded border border-natural-beige-dark"
            >
              ← Change Mode
            </button>
            {quizMode === "cbse_exam" ? (
              <span className="bg-natural-cream border border-natural-terracotta/20 text-natural-terracotta font-mono text-xs font-black px-2.5 py-1 rounded-full">
                Q {currentIdx + 1} of {worksheet.problems.length}
              </span>
            ) : (
              <span className="bg-natural-primary/10 border border-natural-primary/20 text-natural-primary font-mono text-[10px] font-black px-2 py-1 rounded-full">
                JEE EXAM Mode
              </span>
            )}
          </div>
        )}
      </div>

      {quizMode === "topic_quiz" ? (
        <div className="h-full w-full flex flex-col flex-1 min-h-0 overflow-hidden">
          <TopicQuizView
            chapterId={chapterId}
            chapterTitle={chapterTitle}
            onQuizComplete={onQuizComplete}
          />
        </div>
      ) : quizMode === "selection" ? (
        /* MODE SELECTION VIEW */
        <div className="p-6 text-center space-y-5 animate-fade-in" id="quiz_mode_selection">
          <div className="w-12 h-12 rounded-full bg-natural-cream flex items-center justify-center mx-auto text-xl border border-natural-beige-dark/60 shadow-xs">
            🎯
          </div>
          <div>
            <h3 className="font-extrabold text-natural-dark text-sm tracking-tight">Choose Your Practice Mode</h3>
            <p className="text-[11px] text-natural-sage mt-1 max-w-xs mx-auto leading-relaxed">
              Solve the worksheet for <strong className="text-natural-dark font-semibold">{chapterTitle}</strong> in your favorite learning format.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3.5 max-w-sm mx-auto">
            {/* TOPIC QUIZ BUTTON (10 MCQs + 10 Reason-Assertion) */}
            <button
              onClick={() => setQuizMode("topic_quiz")}
              className="group flex flex-col items-start p-4 bg-gradient-to-br from-sky-50 to-indigo-50 hover:from-sky-100 hover:to-indigo-100 border-2 border-sky-300 rounded-2xl cursor-pointer transition-all duration-200 text-left shadow-sm hover:shadow-md relative"
              id="btn_mode_topic_quiz"
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-[8px] font-black uppercase tracking-wider text-sky-800 bg-sky-200/80 px-2 py-0.5 rounded border border-sky-300">Recommended</span>
                <span className="text-base shrink-0 group-hover:scale-110 transition">🎯</span>
              </div>
              <h4 className="font-black text-xs text-sky-950 mt-1.5 tracking-tight transition">
                TOPIC QUIZ (10 MCQs + 10 Assertion & Reason)
              </h4>
              <p className="text-[10px] text-sky-900/80 leading-relaxed mt-1">
                Targeted chapter knowledge test with 10 MCQs and 10 Assertion-Reason questions with instant explanations & scorecard.
              </p>
              <div className="mt-2.5 text-[8px] font-black text-sky-800 bg-white/80 px-2 py-0.5 rounded border border-sky-200">
                ⚡ 10 MCQs + 10 Reason & Assertion Questions
              </div>
            </button>

            {/* MCQ IN ONE BUTTON */}
            <button
              onClick={initJeeMode}
              className="group flex flex-col items-start p-4 bg-gradient-to-br from-white to-natural-cream hover:to-[#fcf9f2] border border-natural-beige-dark hover:border-natural-terracotta/50 rounded-2xl cursor-pointer transition-all duration-200 text-left shadow-2xs hover:shadow-xs relative"
              id="btn_mode_mcq_in_one"
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-[8px] font-black uppercase tracking-wider text-natural-terracotta bg-natural-cream px-2 py-0.5 rounded border border-natural-terracotta/15">Full Worksheet</span>
                <span className="text-base shrink-0 group-hover:scale-110 transition">📋</span>
              </div>
              <h4 className="font-black text-xs text-natural-dark mt-1.5 tracking-tight group-hover:text-natural-terracotta transition">
                MCQ IN ONE (20 Questions)
              </h4>
              <p className="text-[10px] text-natural-sage leading-relaxed mt-1">
                JEE EXAM style console. 20 questions ordered from beginner to expert. Navigate with interactive question palette and submit all.
              </p>
              <div className="mt-2.5 text-[8px] font-black text-natural-terracotta bg-natural-cream px-2 py-0.5 rounded border border-natural-terracotta/10">
                ⚡ JEE style console with 1-20 Question Palette
              </div>
            </button>

            {/* CBSE EXAM BUTTON */}
            <button
              onClick={() => {
                setQuizMode("cbse_exam");
                setIsSubmitted(false);
                setUserAnswers({});
                setCorrectCount(0);
                setCurrentIdx(0);
                setSelectedOption(null);
              }}
              className="group flex flex-col items-start p-4 bg-gradient-to-br from-white to-natural-cream hover:to-[#fcf9f2] border border-natural-beige-dark hover:border-natural-primary/50 rounded-2xl cursor-pointer transition-all duration-200 text-left shadow-2xs hover:shadow-xs relative"
              id="btn_mode_cbse_exam"
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-[8px] font-black uppercase tracking-wider text-natural-primary bg-natural-cream px-2 py-0.5 rounded border border-natural-primary/15">Step-by-Step</span>
                <span className="text-base shrink-0 group-hover:scale-110 transition">⏱️</span>
              </div>
              <h4 className="font-black text-xs text-natural-dark mt-1.5 tracking-tight group-hover:text-natural-primary transition">
                CBSE EXAM
              </h4>
              <p className="text-[10px] text-natural-sage leading-relaxed mt-1">
                Standard step-by-step interactive practice. Answer questions one by one with immediate scoring, clues, and explanations.
              </p>
              <div className="mt-2.5 text-[8px] font-black text-natural-primary bg-natural-cream px-2 py-0.5 rounded border border-natural-primary/10">
                📖 Step-by-step feedback & hints
              </div>
            </button>
          </div>
        </div>
      ) : quizFinished ? (
        /* QUIZ COMPLETION / REPORT CARD VIEW */
        <div className="p-5 flex flex-col items-center animate-fade-in" id="quiz_report_card">
          <div className="w-14 h-14 rounded-full bg-natural-cream flex items-center justify-center mb-3 text-2xl border border-natural-beige-dark">
            🏆
          </div>
          <h2 className="text-lg font-black text-natural-dark uppercase tracking-wide">Excellent Effort!</h2>
          <p className="text-[11px] text-natural-sage text-center max-w-sm mt-0.5 leading-relaxed">
            You completed the worksheet for <strong className="text-natural-dark">{chapterTitle}</strong>.
          </p>

          {/* Scoreboard Card */}
          <div className="my-5 bg-natural-beige-light border border-natural-beige-dark rounded-2xl p-5 w-full max-w-sm shadow-2xs">
            <span className="text-[9px] text-natural-sage font-bold uppercase tracking-wider block text-center">Scoreboard ({quizMode === "mcq_in_one" ? "JEE EXAM Style" : "CBSE EXAM"})</span>
            <div className="text-4xl font-black text-natural-primary my-1 text-center">
              {correctCount} / {worksheet.problems.length}
            </div>
            <p className="text-[11px] text-natural-dark text-center">
              Questions Solved Correctly
            </p>
            <div className="mt-3.5 pt-3 border-t border-natural-beige-dark flex justify-between items-center text-[11px] font-bold text-natural-dark">
              <span>Points Earned:</span>
              <span className="text-natural-terracotta bg-natural-cream px-2.5 py-0.5 rounded border border-natural-terracotta/20 font-black">
                +{correctCount * 20} Points
              </span>
            </div>
            <div className="mt-2.5 pt-2 border-t border-dashed border-natural-beige-dark flex justify-between items-center text-[11px]">
              <span className="text-[10px] text-natural-sage font-semibold">Self-Check:</span>
              <button
                onClick={handleRecheck}
                className="text-[10px] font-extrabold text-natural-primary hover:text-natural-primary/80 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={10} /> Recheck Here
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md justify-center items-center">
            <button
              onClick={() => {
                const nextAttempt = retryAttempt + 1;
                setRetryAttempt(nextAttempt);
                loadWorksheet(nextAttempt);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-natural-cream hover:bg-natural-cream/80 text-natural-terracotta border-2 border-natural-terracotta rounded-xl text-xs font-black transition cursor-pointer shadow-xs"
            >
              <RotateCcw size={13} /> Retake with 20 New Questions
            </button>
            <button
              onClick={() => {
                onAskTutor(`I just scored ${correctCount}/${worksheet.problems.length} on the ${chapterTitle} test! Can you review the concepts we covered?`);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-natural-primary hover:bg-natural-primary/90 text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
            >
              <MessageSquare size={13} /> Discuss with Tutor
            </button>
          </div>

          {/* DETAILED PAPER REVIEW SECTION */}
          <div className="mt-8 pt-6 border-t border-natural-beige-dark w-full text-left space-y-4">
            <h4 className="font-black text-xs text-natural-dark uppercase tracking-wider flex items-center gap-1.5 px-1">
              📋 Detailed Exam Review (1-20)
            </h4>
            
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
              {worksheet.problems.map((prob, idx) => {
                const userAnswer = userAnswers[idx];
                const isCorrectAns = userAnswer === prob.correctAnswer;
                const diff = getProblemDifficulty(idx);

                return (
                  <div key={idx} className={`p-4 rounded-xl border transition text-xs space-y-2 ${
                    isCorrectAns 
                      ? "bg-[#e7f0e3]/30 border-natural-primary/20" 
                      : userAnswer 
                        ? "bg-natural-cream/30 border-natural-terracotta/20" 
                        : "bg-slate-50 border-slate-200"
                  }`}>
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-natural-dark">
                        Question {idx + 1}
                      </span>
                      <div className="flex gap-1.5 items-center">
                        <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${diff.color}`}>
                          {diff.dot} {diff.label}
                        </span>
                        {isCorrectAns ? (
                          <span className="text-[#3c5030] bg-[#e7f0e3] px-2 py-0.5 rounded text-[9px] font-black">
                            🎉 Correct (+20)
                          </span>
                        ) : userAnswer ? (
                          <span className="text-natural-terracotta bg-natural-cream px-2 py-0.5 rounded text-[9px] font-black">
                            ❌ Incorrect (0)
                          </span>
                        ) : (
                          <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-[9px] font-black border border-slate-200">
                            ⚪ Skipped (0)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Question text */}
                    <p className="font-bold text-natural-dark text-[11px] leading-relaxed">
                      {prob.question}
                    </p>

                    {/* Answer Info */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] py-1 px-2 bg-white/70 border border-natural-beige-dark/40 rounded-lg">
                      <span>
                        <strong className="text-natural-dark">Correct: </strong> 
                        <span className="font-black text-natural-primary">{prob.correctAnswer}</span>
                      </span>
                      <span>
                        <strong className="text-natural-dark">Your Answer: </strong>
                        {userAnswer ? (
                          <span className={`font-black ${isCorrectAns ? "text-natural-primary" : "text-natural-terracotta"}`}>
                            {userAnswer}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">None</span>
                        )}
                      </span>
                    </div>

                    {/* Explanation */}
                    <div className="text-[11px] text-natural-sage pt-1 border-t border-dashed border-natural-beige-dark/50">
                      <strong className="text-natural-dark font-bold">Explanation: </strong>
                      {prob.explanation}
                    </div>

                    {/* Chat Question Link */}
                    <button
                      onClick={() => {
                        onAskTutor(`For question ${idx + 1} in the ${chapterTitle} quiz: "${prob.question}". The answer is ${prob.correctAnswer}. Can you explain the solution step-by-step?`);
                      }}
                      className="text-[10px] font-black text-natural-primary hover:text-natural-primary/80 flex items-center gap-1 pt-1 cursor-pointer"
                    >
                      💡 Clarify with Ganit Mitra
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : quizMode === "mcq_in_one" ? (
        /* MCQ IN ONE: MAXIMIZED DIVISION VIEW */
        <div className="p-4 sm:p-6 space-y-5 animate-fade-in" id="mcq_in_one_active_view">
          {/* Top Control Bar: Status + Palette Drawer Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-natural-beige-dark/60">
            <div className="flex items-center gap-2">
              <span className="bg-natural-primary/10 text-natural-primary font-mono text-xs font-black px-3 py-1 rounded-full border border-natural-primary/20">
                Question {currentMcqIdx + 1} of {worksheet.problems.length}
              </span>
              <span className={`text-[10px] uppercase font-extrabold border px-2.5 py-0.5 rounded-md ${getProblemDifficulty(currentMcqIdx).color}`}>
                {getProblemDifficulty(currentMcqIdx).dot} {getProblemDifficulty(currentMcqIdx).label}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPalette(prev => !prev)}
                className="text-[10px] font-bold text-natural-dark bg-natural-beige-light hover:bg-natural-beige-dark/50 border border-natural-beige-dark px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1"
              >
                {showPalette ? "📐 Hide Palette" : "📊 Question Palette (1-20)"}
              </button>
            </div>
          </div>

          {/* Collapsible Palette Grid */}
          {showPalette && (
            <div className="space-y-2 p-3 bg-natural-beige-light/40 border border-natural-beige-dark/60 rounded-xl animate-fade-in">
              <div className="flex justify-between items-center text-[10px] px-1 font-bold text-natural-sage uppercase tracking-wider">
                <span>Question Palette</span>
                <span className="text-natural-primary">Saved: {Object.keys(userAnswers).length} / 20</span>
              </div>

              {/* Grid of 20 Palette Squares */}
              <div className="grid grid-cols-10 gap-1.5 justify-center py-2 bg-white/80 border border-natural-beige-dark/50 rounded-xl p-2">
                {worksheet.problems.map((_, idx) => {
                  const status = mcqStatuses[idx] || "not_visited";
                  const isActive = currentMcqIdx === idx;
                  
                  let btnStyle = "bg-white border-slate-300 text-slate-700 hover:bg-slate-50";
                  
                  if (status === "answered") {
                    btnStyle = "bg-[#16a34a] border-[#15803d] text-white";
                  } else if (status === "marked") {
                    btnStyle = "bg-[#7c3aed] border-[#6d28d9] text-white";
                  } else if (status === "marked_answered") {
                    btnStyle = "bg-[#7c3aed] border-[#6d28d9] text-white relative after:content-[''] after:absolute after:bottom-0.5 after:right-0.5 after:w-1.5 after:h-1.5 after:bg-[#16a34a] after:rounded-full after:border after:border-white";
                  } else if (status === "not_answered") {
                    btnStyle = "bg-natural-terracotta border-[#b91c1c] text-white";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handlePaletteClick(idx)}
                      className={`w-7 h-7 text-[10px] font-black rounded-lg border transition-all flex items-center justify-center cursor-pointer ${btnStyle} ${
                        isActive ? "ring-2 ring-natural-dark ring-offset-1 scale-105" : ""
                      }`}
                      title={`Question ${idx + 1}: ${status}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend Map */}
              <div className="grid grid-cols-4 gap-1 text-[8px] font-black uppercase text-center bg-white/60 p-1.5 border border-natural-beige-dark/30 rounded-lg text-natural-sage">
                <div className="flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded bg-[#16a34a]" /> Saved
                </div>
                <div className="flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded bg-natural-terracotta" /> Skip/Not Ans
                </div>
                <div className="flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded bg-[#7c3aed]" /> Marked
                </div>
                <div className="flex items-center justify-center gap-1">
                  <span className="w-2.5 h-2.5 rounded border border-slate-300 bg-white" /> Not Visited
                </div>
              </div>
            </div>
          )}

          {/* MAXIMIZED QUESTION DIVISION */}
          {worksheet.problems[currentMcqIdx] && (
            <div className="border border-natural-beige-dark rounded-2xl p-5 sm:p-7 bg-white space-y-6 shadow-xs min-h-[260px] flex flex-col justify-between" id="jee_question_box">
              {/* Question Text */}
              <div className="space-y-2">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-natural-sage">
                  Question {currentMcqIdx + 1} of {worksheet.problems.length}
                </div>
                <h3 className="font-extrabold text-base sm:text-lg text-natural-dark leading-relaxed">
                  {worksheet.problems[currentMcqIdx].question}
                </h3>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {worksheet.problems[currentMcqIdx].options.map((opt, oIdx) => {
                  const letter = opt.trim().charAt(0);
                  const isStaged = stagedOption === letter;

                  let buttonStyle = "bg-white border-2 border-natural-beige-dark/80 hover:border-natural-sage hover:bg-natural-beige-light/30 text-natural-dark";
                  if (isStaged) {
                    buttonStyle = "bg-natural-cream border-2 border-natural-terracotta text-natural-dark font-extrabold shadow-xs";
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => setStagedOption(letter)}
                      className={`p-4 rounded-xl text-xs sm:text-sm font-bold text-left transition-all duration-150 flex items-center justify-between cursor-pointer ${buttonStyle}`}
                    >
                      <span>{opt}</span>
                      {isStaged && <span className="text-[10px] text-natural-terracotta bg-white border border-natural-terracotta/30 px-2.5 py-1 rounded-full font-black shrink-0">Selected</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* MAXIMIZED NAVIGATION ACTION BAR (PREV / SAVE & NEXT / NEXT) */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleJeePrev}
              disabled={currentMcqIdx === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white disabled:opacity-40 disabled:cursor-not-allowed border-2 border-natural-beige-dark rounded-xl text-xs font-black text-natural-dark hover:bg-natural-beige-light/40 transition cursor-pointer shadow-2xs"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            <div className="flex items-center gap-2 flex-1 justify-end">
              <button
                onClick={handleJeeClearResponse}
                className="text-[10px] font-bold text-natural-sage hover:text-natural-dark bg-natural-beige-light/50 hover:bg-natural-beige-light border border-natural-beige-dark px-3 py-2 rounded-xl transition cursor-pointer hidden sm:block"
              >
                Clear Selection
              </button>

              <button
                onClick={handleJeeMarkForReview}
                className="text-[10px] font-extrabold text-white bg-[#7c3aed] hover:bg-[#6d28d9] px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center gap-1 uppercase tracking-wider shadow-2xs hidden sm:flex"
              >
                <Bookmark size={12} /> Mark & Next
              </button>

              <button
                onClick={handleJeeSaveAndNext}
                className="px-5 py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl text-xs font-black shadow-xs transition cursor-pointer text-center uppercase tracking-wider flex items-center gap-1"
              >
                Save & Next <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Submit Exam Section */}
          <div className="pt-3 border-t border-dashed border-natural-beige-dark/70 text-center">
            {confirmSubmitOpen ? (
              <div className="bg-natural-cream/80 border border-natural-terracotta/30 rounded-xl p-3.5 text-xs space-y-2.5 animate-fade-in max-w-md mx-auto">
                <p className="font-extrabold text-natural-dark">
                  Are you ready to submit the exam paper?
                </p>
                <p className="text-[10px] text-natural-sage">
                  Saved responses: {Object.keys(userAnswers).length} / {worksheet.problems.length}.
                </p>
                <div className="flex justify-center gap-2.5">
                  <button
                    onClick={() => setConfirmSubmitOpen(false)}
                    className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg font-bold text-[10px] text-slate-700 cursor-pointer"
                  >
                    Keep Working
                  </button>
                  <button
                    onClick={submitJeeExam}
                    className="px-4 py-1.5 bg-natural-terracotta hover:bg-natural-terracotta/95 text-white rounded-lg font-black text-[10px] cursor-pointer shadow-2xs"
                  >
                    Yes, Submit Now
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmSubmitOpen(true)}
                className="w-full py-2.5 bg-natural-primary hover:bg-natural-primary/95 text-white font-black text-xs rounded-xl shadow-xs transition cursor-pointer uppercase tracking-wider"
              >
                Submit Exam Paper
              </button>
            )}
          </div>
        </div>
      ) : (
        /* CBSE EXAM (STANDARD CBSE STEP-BY-STEP) ACTIVE PROBLEM VIEW */
        <div className="p-6 space-y-6" id="quiz_active_problem">
          {/* Question text */}
          <div className="bg-natural-cream/60 border border-natural-beige-dark rounded-xl p-4">
            <p className="font-extrabold text-sm text-natural-dark leading-relaxed">
              {currentProblem.question}
            </p>
          </div>

          {/* Options List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="quiz_options">
            {currentProblem.options.map((opt, idx) => {
              const letter = opt.trim().charAt(0);
              const isSelected = selectedOption === letter;
              const isCorrectAnswer = letter === currentProblem.correctAnswer;
              
              let buttonStyle = "bg-white border border-natural-beige-dark hover:border-natural-sage/50 text-natural-dark hover:bg-natural-beige-light/30";
              if (isSelected) {
                buttonStyle = "bg-natural-cream border-2 border-natural-terracotta text-natural-dark";
              }
              if (isSubmitted) {
                if (isCorrectAnswer) {
                  buttonStyle = "bg-[#e7f0e3] border-2 border-natural-primary text-natural-dark";
                } else if (isSelected) {
                  buttonStyle = "bg-natural-cream border-2 border-natural-terracotta text-natural-terracotta";
                } else {
                  buttonStyle = "bg-white border border-natural-beige-dark/50 text-natural-sage opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(opt)}
                  disabled={isSubmitted}
                  className={`p-3.5 rounded-xl text-xs font-bold text-left transition-all duration-150 flex items-center justify-between cursor-pointer ${buttonStyle}`}
                >
                  <span>{opt}</span>
                  {isSubmitted && isCorrectAnswer && <CheckCircle2 size={16} className="text-natural-primary shrink-0" />}
                  {isSubmitted && isSelected && !isCorrectAnswer && <XCircle size={16} className="text-natural-terracotta shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Bottom Action bar */}
          <div className="pt-4 border-t border-natural-beige-dark flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevQuestion}
                disabled={currentIdx === 0}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white disabled:opacity-40 disabled:cursor-not-allowed border-2 border-natural-beige-dark rounded-xl text-xs font-black text-natural-dark hover:bg-natural-beige-light/40 transition cursor-pointer shadow-2xs"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              {!isSubmitted ? (
                <button
                  onClick={() => setShowHint(prev => !prev)}
                  className="text-xs font-bold text-natural-terracotta hover:text-natural-terracotta/90 bg-natural-cream border border-natural-terracotta/20 px-3 py-1.5 rounded-lg cursor-pointer transition animate-pulse"
                >
                  {showHint ? "💡 Hide Hint" : "💡 Need a Hint?"}
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs font-extrabold">
                  {isCorrect ? (
                    <span className="text-[#3c5030] bg-[#e7f0e3] border border-natural-primary/30 px-3 py-1.5 rounded-lg flex items-center gap-1">
                      🎉 Correct! (+20 Pts)
                    </span>
                  ) : (
                    <span className="text-natural-terracotta bg-natural-cream border border-natural-terracotta/30 px-3 py-1.5 rounded-lg flex items-center gap-1">
                      💪 Solution below
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {!isSubmitted ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={!selectedOption}
                  className="px-4 py-2 bg-natural-terracotta hover:bg-natural-terracotta/90 disabled:bg-natural-beige-light disabled:text-natural-sage text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-1.5 px-4 py-2 bg-natural-primary hover:bg-natural-primary/90 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  {currentIdx === worksheet.problems.length - 1 ? "Finish Test" : "Next Question"} <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Show Hint card */}
          {showHint && !isSubmitted && (
            <div className="bg-natural-cream border border-natural-terracotta/30 rounded-xl p-4 text-xs text-natural-dark leading-relaxed flex gap-3 animate-fade-in">
              <span className="text-lg">💡</span>
              <div>
                <strong className="font-bold block mb-0.5 text-natural-terracotta">Hint clue:</strong>
                {currentProblem.hint}
              </div>
            </div>
          )}

          {/* Show Step-by-Step explanation after submission */}
          {isSubmitted && (
            <div className="bg-natural-beige-light border border-natural-beige-dark rounded-xl p-4 text-xs leading-relaxed flex gap-3 animate-fade-in">
              <span className="text-lg">✏️</span>
              <div className="space-y-1">
                <strong className="font-bold text-natural-dark block">Step-by-Step Solution:</strong>
                <p className="text-natural-sage">{currentProblem.explanation}</p>
                <button
                  onClick={() => {
                    onAskTutor(`In the ${chapterTitle} worksheet, question was: "${currentProblem.question}". Can you explain in more detail why the answer is ${currentProblem.correctAnswer}?`);
                  }}
                  className="mt-2 text-[10px] font-bold text-natural-primary hover:text-natural-dark flex items-center gap-1 cursor-pointer"
                >
                  Discuss this question with Ganit Mitra <ChevronRight size={10} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
