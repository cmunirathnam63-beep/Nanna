import React, { useState } from "react";
import { getTopicQuiz } from "../data/topicQuizzes";
import { HelpCircle, CheckCircle2, XCircle, Award, Sparkles, RefreshCw, ArrowRight, Lightbulb, BookOpen, Layers } from "lucide-react";

interface TopicQuizViewProps {
  chapterId: string;
  chapterTitle: string;
  onQuizComplete?: (pointsWon: number, solvedCount: number) => void;
}

export default function TopicQuizView({ chapterId, chapterTitle, onQuizComplete }: TopicQuizViewProps) {
  const quizData = getTopicQuiz(chapterId, chapterTitle);

  const [activeTab, setActiveTab] = useState<"mcqs" | "assertion_reasons">("mcqs");
  const [currentMcqIdx, setCurrentMcqIdx] = useState<number>(0);
  const [currentArIdx, setCurrentArIdx] = useState<number>(0);

  const [mcqAnswers, setMcqAnswers] = useState<Record<number, string>>({});
  const [arAnswers, setArAnswers] = useState<Record<number, string>>({});

  const [showMcqHint, setShowMcqHint] = useState<boolean>(false);
  const [showArHint, setShowArHint] = useState<boolean>(false);

  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Score Calculations
  const correctMcqsCount = quizData.mcqs.reduce((acc, q, idx) => {
    return mcqAnswers[idx] === q.correctAnswer.trim() ? acc + 1 : acc;
  }, 0);

  const correctArCount = quizData.assertionReasons.reduce((acc, q, idx) => {
    return arAnswers[idx] === q.correctAnswer.trim() ? acc + 1 : acc;
  }, 0);

  const totalScore = correctMcqsCount + correctArCount;
  const totalQuestions = quizData.mcqs.length + quizData.assertionReasons.length; // 20

  const handleSelectMcqOption = (optLetter: string) => {
    setMcqAnswers((prev) => ({ ...prev, [currentMcqIdx]: optLetter }));
  };

  const handleSelectArOption = (optLetter: string) => {
    setArAnswers((prev) => ({ ...prev, [currentArIdx]: optLetter }));
  };

  const handleFinishQuiz = () => {
    setIsCompleted(true);
    if (onQuizComplete) {
      const pointsWon = totalScore * 10 + 50;
      onQuizComplete(pointsWon, totalQuestions);
    }
  };

  const handleRestartQuiz = () => {
    setMcqAnswers({});
    setArAnswers({});
    setCurrentMcqIdx(0);
    setCurrentArIdx(0);
    setShowMcqHint(false);
    setShowArHint(false);
    setIsCompleted(false);
    setActiveTab("mcqs");
  };

  if (isCompleted) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 text-center animate-fade-in space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto border-2 border-amber-300 shadow-sm">
          <Award size={36} />
        </div>

        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Topic Quiz Scorecard
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-2">
            Quiz Completed for {chapterTitle}!
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto leading-relaxed">
            You tackled 10 Multiple Choice Questions & 10 Assertion-Reasoning Questions to test your mastery.
          </p>
        </div>

        {/* Score Badge Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto">
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 text-center">
            <span className="text-[10px] font-extrabold uppercase text-sky-700">Total Score</span>
            <div className="text-2xl font-black text-sky-900 mt-0.5">
              {totalScore} <span className="text-xs text-sky-600">/ {totalQuestions}</span>
            </div>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-center">
            <span className="text-[10px] font-extrabold uppercase text-indigo-700">10 MCQs</span>
            <div className="text-xl font-black text-indigo-900 mt-0.5">
              {correctMcqsCount} / {quizData.mcqs.length}
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] font-extrabold uppercase text-emerald-700">10 Reason & Assertion</span>
            <div className="text-xl font-black text-emerald-900 mt-0.5">
              {correctArCount} / {quizData.assertionReasons.length}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleRestartQuiz}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs flex items-center gap-2 cursor-pointer transition shadow-2xs"
          >
            <RefreshCw size={15} />
            <span>Retake Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  const currentMcq = quizData.mcqs[currentMcqIdx];
  const userMcqAns = mcqAnswers[currentMcqIdx];
  const isMcqSubmitted = userMcqAns !== undefined;

  const currentAr = quizData.assertionReasons[currentArIdx];
  const userArAns = arAnswers[currentArIdx];
  const isArSubmitted = userArAns !== undefined;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden" id="topic_quiz_container">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-sky-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-sky-500/20 text-sky-300 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-sky-400/30">
              Targeted Topic Quiz
            </span>
            <span className="text-xs text-slate-300 font-bold">10 MCQs + 10 Assertion-Reason</span>
          </div>
          <h2 className="text-base sm:text-lg font-black mt-1 text-white tracking-wide">
            {chapterTitle}
          </h2>
        </div>

        {/* Tab Switcher: Part 1 MCQs vs Part 2 Assertion-Reason */}
        <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl border border-white/15 w-full sm:w-auto shrink-0">
          <button
            onClick={() => setActiveTab("mcqs")}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "mcqs"
                ? "bg-sky-500 text-white shadow-xs"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>📝</span> <span>Part 1: 10 MCQs</span>
            <span className="text-[9px] opacity-80 bg-black/20 px-1.5 py-0.2 rounded-full">
              {Object.keys(mcqAnswers).length}/{quizData.mcqs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("assertion_reasons")}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "assertion_reasons"
                ? "bg-amber-500 text-white shadow-xs"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>⚖️</span> <span>Part 2: 10 Assertion & Reason</span>
            <span className="text-[9px] opacity-80 bg-black/20 px-1.5 py-0.2 rounded-full">
              {Object.keys(arAnswers).length}/{quizData.assertionReasons.length}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 space-y-6">

        {/* ========================================================= */}
        {/* PART 1: 10 MCQs VIEW                                      */}
        {/* ========================================================= */}
        {activeTab === "mcqs" && currentMcq && (
          <div className="space-y-5 animate-fade-in">
            {/* Question Progress Dots */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                  MCQ Question {currentMcqIdx + 1} of {quizData.mcqs.length}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {quizData.mcqs.map((q, idx) => {
                  const answered = mcqAnswers[idx] !== undefined;
                  const isCur = idx === currentMcqIdx;
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentMcqIdx(idx);
                        setShowMcqHint(false);
                      }}
                      className={`w-7 h-7 rounded-lg text-xs font-black transition cursor-pointer flex items-center justify-center ${
                        isCur
                          ? "bg-sky-600 text-white ring-2 ring-sky-300"
                          : answered
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MCQ Card */}
            <div className="bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-4">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug">
                {currentMcqIdx + 1}. {currentMcq.question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentMcq.options.map((opt) => {
                  const letter = opt.trim().charAt(0);
                  const isSelected = userMcqAns === letter;
                  const isCorrectOpt = currentMcq.correctAnswer.trim() === letter;

                  let style = "bg-white border-slate-200 hover:border-sky-400 text-slate-700";
                  if (isMcqSubmitted) {
                    if (isCorrectOpt) {
                      style = "bg-emerald-50 border-emerald-500 text-emerald-900 font-extrabold shadow-2xs";
                    } else if (isSelected) {
                      style = "bg-rose-50 border-rose-400 text-rose-900 font-extrabold";
                    } else {
                      style = "bg-white/50 border-slate-200 text-slate-400 opacity-70";
                    }
                  } else if (isSelected) {
                    style = "bg-sky-50 border-sky-500 text-sky-900 font-extrabold shadow-2xs ring-1 ring-sky-400";
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectMcqOption(letter)}
                      className={`p-3 rounded-xl border-2 text-xs font-medium text-left transition flex items-start gap-2.5 cursor-pointer ${style}`}
                    >
                      <span className="font-mono font-black shrink-0 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[10px]">
                        {letter}
                      </span>
                      <span className="leading-relaxed flex-1">{opt.replace(/^[A-D]\)\s*/, "")}</span>
                      {isMcqSubmitted && isCorrectOpt && <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />}
                      {isMcqSubmitted && isSelected && !isCorrectOpt && <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>

              {/* Hint button & toggle */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/60">
                <button
                  onClick={() => setShowMcqHint(!showMcqHint)}
                  className="text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 cursor-pointer bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 transition"
                >
                  <Lightbulb size={14} className="text-amber-600" />
                  <span>{showMcqHint ? "Hide Hint" : "Need a Hint?"}</span>
                </button>

                {isMcqSubmitted && (
                  <div className={`text-xs font-black flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                    userMcqAns === currentMcq.correctAnswer.trim()
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                  }`}>
                    {userMcqAns === currentMcq.correctAnswer.trim() ? (
                      <>
                        <CheckCircle2 size={15} /> <span>Correct Answer!</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={15} /> <span>Incorrect (Correct: {currentMcq.correctAnswer})</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Hint Content */}
              {showMcqHint && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 animate-fade-in flex items-start gap-2">
                  <span className="text-base">💡</span>
                  <div>
                    <strong className="font-bold">Hint: </strong> {currentMcq.hint}
                  </div>
                </div>
              )}

              {/* Explanation Card */}
              {isMcqSubmitted && (
                <div className="p-3.5 bg-sky-50/90 border border-sky-200 rounded-xl text-xs text-sky-950 animate-fade-in space-y-1">
                  <div className="font-bold flex items-center gap-1 text-sky-800">
                    <Sparkles size={14} /> <span>Explanation:</span>
                  </div>
                  <p className="leading-relaxed">{currentMcq.explanation}</p>
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentMcqIdx === 0}
                onClick={() => {
                  setCurrentMcqIdx((prev) => prev - 1);
                  setShowMcqHint(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-extrabold bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                ← Previous MCQ
              </button>

              {currentMcqIdx < quizData.mcqs.length - 1 ? (
                <button
                  onClick={() => {
                    setCurrentMcqIdx((prev) => prev + 1);
                    setShowMcqHint(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-black bg-sky-600 hover:bg-sky-700 text-white flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                >
                  <span>Next MCQ ({currentMcqIdx + 2}/{quizData.mcqs.length})</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab("assertion_reasons")}
                  className="px-4 py-2 rounded-xl text-xs font-black bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 transition cursor-pointer shadow-2xs animate-pulse"
                >
                  <span>Go to Part 2: Assertion-Reason</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PART 2: 10 ASSERTION & REASON QUESTIONS VIEW              */}
        {/* ========================================================= */}
        {activeTab === "assertion_reasons" && currentAr && (
          <div className="space-y-5 animate-fade-in">
            {/* Progress Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Assertion & Reason {currentArIdx + 1} of {quizData.assertionReasons.length}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {quizData.assertionReasons.map((q, idx) => {
                  const answered = arAnswers[idx] !== undefined;
                  const isCur = idx === currentArIdx;
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentArIdx(idx);
                        setShowArHint(false);
                      }}
                      className={`w-7 h-7 rounded-lg text-xs font-black transition cursor-pointer flex items-center justify-center ${
                        isCur
                          ? "bg-amber-600 text-white ring-2 ring-amber-300"
                          : answered
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Assertion & Reason Card */}
            <div className="bg-amber-50/40 rounded-2xl p-4 sm:p-5 border border-amber-200/80 space-y-4">
              
              {/* Assertion Box */}
              <div className="bg-white p-3.5 rounded-xl border border-amber-300 shadow-2xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-600 text-white font-black text-[10px] uppercase px-2 py-0.5 rounded">
                    Assertion (A)
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-extrabold text-slate-800 leading-relaxed pt-1">
                  {currentAr.assertion}
                </p>
              </div>

              {/* Reason Box */}
              <div className="bg-white p-3.5 rounded-xl border border-teal-300 shadow-2xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-teal-600 text-white font-black text-[10px] uppercase px-2 py-0.5 rounded">
                    Reason (R)
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-extrabold text-slate-800 leading-relaxed pt-1">
                  {currentAr.reason}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                  Select the correct choice below:
                </span>

                <div className="grid grid-cols-1 gap-2">
                  {currentAr.options.map((opt) => {
                    const letter = opt.trim().charAt(0);
                    const isSelected = userArAns === letter;
                    const isCorrectOpt = currentAr.correctAnswer.trim() === letter;

                    let style = "bg-white border-slate-200 hover:border-amber-400 text-slate-700";
                    if (isArSubmitted) {
                      if (isCorrectOpt) {
                        style = "bg-emerald-50 border-emerald-500 text-emerald-900 font-extrabold shadow-2xs";
                      } else if (isSelected) {
                        style = "bg-rose-50 border-rose-400 text-rose-900 font-extrabold";
                      } else {
                        style = "bg-white/50 border-slate-200 text-slate-400 opacity-70";
                      }
                    } else if (isSelected) {
                      style = "bg-amber-50 border-amber-500 text-amber-950 font-extrabold shadow-2xs ring-1 ring-amber-400";
                    }

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectArOption(letter)}
                        className={`p-3 rounded-xl border-2 text-xs font-medium text-left transition flex items-start gap-2.5 cursor-pointer ${style}`}
                      >
                        <span className="font-mono font-black shrink-0 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[10px]">
                          {letter}
                        </span>
                        <span className="leading-relaxed flex-1">{opt.replace(/^[A-D]\)\s*/, "")}</span>
                        {isArSubmitted && isCorrectOpt && <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />}
                        {isArSubmitted && isSelected && !isCorrectOpt && <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status & Explanation */}
              {isArSubmitted && (
                <div className="p-3.5 bg-amber-100/80 border border-amber-300 rounded-xl text-xs text-amber-950 animate-fade-in space-y-1">
                  <div className={`font-bold flex items-center gap-1.5 ${
                    userArAns === currentAr.correctAnswer.trim() ? "text-emerald-800" : "text-rose-800"
                  }`}>
                    {userArAns === currentAr.correctAnswer.trim() ? (
                      <>
                        <CheckCircle2 size={15} /> <span>Correct Choice!</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={15} /> <span>Incorrect Choice (Correct: {currentAr.correctAnswer})</span>
                      </>
                    )}
                  </div>
                  <p className="leading-relaxed text-slate-800 pt-1">
                    <strong className="font-extrabold">Explanation: </strong> {currentAr.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentArIdx === 0}
                onClick={() => {
                  setCurrentArIdx((prev) => prev - 1);
                  setShowArHint(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-extrabold bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                ← Previous A-R Question
              </button>

              {currentArIdx < quizData.assertionReasons.length - 1 ? (
                <button
                  onClick={() => {
                    setCurrentArIdx((prev) => prev + 1);
                    setShowArHint(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-black bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                >
                  <span>Next A-R ({currentArIdx + 2}/{quizData.assertionReasons.length})</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={handleFinishQuiz}
                  className="px-5 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 transition cursor-pointer shadow-md animate-bounce"
                >
                  <Award size={16} />
                  <span>Finish & View Scorecard</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
