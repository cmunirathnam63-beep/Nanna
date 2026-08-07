import React, { useState } from "react";
import { BookOpen, Sparkles, HelpCircle, ArrowRight, Play, FileText, ArrowLeft, ChevronLeft, ChevronRight, Monitor, RotateCcw, Volume2, CheckCircle2, Award } from "lucide-react";
import { playSpeechWithLang, playTeluguSpeech } from "../utils/teluguAudio";
import { LESSONS_DATA } from "../data/lessons";
import DefinitionDiagram from "./DefinitionDiagram";
import { Chapter } from "../types";
import TopicQuizView from "./TopicQuizView";
import Grade1InteractiveGame from "./Grade1Games";
import {
  EvenNumberGame,
  OddNumberGame,
  PrimeNumberGame,
  CompositeNumberGame,
  SquareNumberGame,
  MultiplesNumberGame,
  DivisibilityGame,
  RealNumberGame,
  ImaginaryNumberGame,
  WholeNumberGame,
  IntegersGame
} from "./NumberSubpageGames";
import {
  RationalIntroTopic,
  IrrationalNumbersTopic,
  DecimalExpansionsTopic,
  OperationsRealTopic,
  RationalizingTopic,
  ExponentLawsTopic,
  ProbabilityTopic,
  AlgebraicIdentitiesTopic,
  CoordinateGeometryTopic
} from "./G9NumberSystemTopics";
import GeometryExplorer from "./GeometryExplorer";
import FractionOperationsExplorer from "./FractionOperationsExplorer";
import Grade6MathsPaper from "./Grade6MathsPaper";
import Grade6TopicExplorer from "./Grade6TopicExplorer";
import VisualTools from "./VisualTools";
import PracticeQuiz from "./PracticeQuiz";
import G6MotionSlideSimulator from "./G6MotionSlideSimulator";

function stripGradeBrackets(str: string = ""): string {
  if (!str) return "";
  return str.replace(/\s*\(\s*Grade\s*\d+[^)]*\)/gi, "").trim();
}

function cleanStepTitle(str: string = ""): string {
  if (!str) return "";
  let cleaned = stripGradeBrackets(str);
  cleaned = cleaned.replace(/^Step\s*[-:]?\s*\d+\s*[-:]?\s*/i, "").trim();
  return cleaned;
}

// Textbook-style visual renderer for mathematical formulas
function TextbookFormula({ formula }: { formula: string }) {
  // 1. Fraction Structure
  if (formula === "Fraction = Numerator / Denominator") {
    return (
      <div className="flex items-center justify-center gap-2 font-sans text-sm md:text-base text-natural-dark font-extrabold my-1 select-none">
        <span className="text-natural-dark/95">Fraction</span>
        <span className="text-natural-terracotta">=</span>
        <div className="flex flex-col items-center">
          <span className="px-3 pb-0.5 border-b-2 border-natural-dark text-center font-black text-natural-terracotta">Numerator</span>
          <span className="px-3 pt-0.5 text-center font-black text-natural-primary">Denominator</span>
        </div>
      </div>
    );
  }

  // 2. Improper to Mixed Formula
  if (formula === "Numerator ÷ Denominator = Quotient (Remainder/Denominator)") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 font-sans text-xs md:text-sm text-natural-dark font-bold my-1 select-none">
        <div className="flex flex-col items-center">
          <span className="px-2 pb-0.5 border-b-2 border-natural-dark text-center font-black text-natural-terracotta">Numerator</span>
          <span className="px-2 pt-0.5 text-center font-black text-natural-primary">Denominator</span>
        </div>
        <span className="text-natural-terracotta text-sm font-extrabold">=</span>
        <span className="bg-natural-beige-light px-2 py-0.5 rounded border border-natural-beige-dark/50 font-black text-natural-dark">Quotient</span>
        <div className="flex flex-col items-center bg-natural-cream/30 px-1.5 py-0.5 rounded border-2 border-dashed border-natural-terracotta/40">
          <span className="px-1 text-[10px] border-b border-natural-dark text-center font-black text-natural-terracotta">Remainder</span>
          <span className="px-1 text-[10px] text-center font-black text-natural-primary">Denominator</span>
        </div>
      </div>
    );
  }

  // 3. Place Value Expansion
  if (formula === "Value = Tens + Ones + (Tenths × 0.1) + (Hundredths × 0.01)") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1.5 font-sans text-xs text-natural-dark font-bold my-1 select-none">
        <span className="font-extrabold">Value</span>
        <span className="text-natural-terracotta font-extrabold">=</span>
        <span>Tens</span>
        <span>+</span>
        <span>Ones</span>
        <span>+</span>
        <div className="flex flex-col items-center px-1">
          <span className="px-1.5 pb-0.5 border-b border-natural-dark text-center text-natural-terracotta">Tenths</span>
          <span className="px-1.5 pt-0.5 text-center text-natural-primary">10</span>
        </div>
        <span>+</span>
        <div className="flex flex-col items-center px-1">
          <span className="px-1.5 pb-0.5 border-b border-natural-dark text-center text-natural-terracotta">Hundredths</span>
          <span className="px-1.5 pt-0.5 text-center text-natural-primary">100</span>
        </div>
      </div>
    );
  }

  // 4. Converting Paise to Rupee
  if (formula === "₹ = Paise ÷ 100") {
    return (
      <div className="flex items-center justify-center gap-2 font-sans text-sm md:text-base text-natural-dark font-bold my-1 select-none">
        <span className="text-natural-primary text-base font-black">₹</span>
        <span className="text-natural-terracotta font-extrabold">=</span>
        <div className="flex flex-col items-center">
          <span className="px-3 pb-0.5 border-b-2 border-natural-dark text-center font-black text-natural-terracotta">Paise</span>
          <span className="px-3 pt-0.5 text-center font-black text-natural-primary">100</span>
        </div>
      </div>
    );
  }

  // Standard multi-variable equation formatting
  return (
    <div className="font-mono text-xs md:text-sm font-extrabold text-natural-dark text-center select-none tracking-tight">
      {formula}
    </div>
  );
}

// Textbook-style vertical fraction renderer
function TextbookFraction({ num, den, size = "sm" }: { num: number | string; den: number | string; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: {
      num: "text-[11px] pb-0.5",
      den: "text-[11px] pt-0.5",
      border: "border-b",
      gap: "gap-0"
    },
    md: {
      num: "text-sm pb-0.5",
      den: "text-sm pt-0.5",
      border: "border-b-2",
      gap: "gap-0.5"
    },
    lg: {
      num: "text-base pb-1",
      den: "text-base pt-1",
      border: "border-b-2",
      gap: "gap-1"
    }
  };
  const config = sizeClasses[size];
  return (
    <span className={`inline-flex flex-col items-center justify-center align-middle ${config.gap} font-sans font-black select-none leading-none mx-1`}>
      <span className={`${config.num} ${config.border} border-natural-dark text-natural-terracotta min-w-[12px] text-center`}>{num}</span>
      <span className={`${config.den} text-natural-primary min-w-[12px] text-center`}>{den}</span>
    </span>
  );
}

function DeprecatedEvenGame() {
  const [score, setScore] = React.useState<number>(0);
  const [streak, setStreak] = React.useState<number>(0);
  const [highScore, setHighScore] = React.useState<number>(() => {
    try {
      return Number(localStorage.getItem("even_game_highscore") || "0");
    } catch {
      return 0;
    }
  });

  const [currentLevelNumbers, setCurrentLevelNumbers] = React.useState<number[]>([]);
  const [selectedNumber, setSelectedNumber] = React.useState<number | null>(null);
  const [gameFeedback, setGameFeedback] = React.useState<{
    isEven: boolean;
    message: string;
    isCorrect: boolean;
  } | null>(null);

  // Helper to generate a new round of numbers
  const generateNewRound = React.useCallback(() => {
    setSelectedNumber(null);
    setGameFeedback(null);
    
    // Generate 4 numbers: 2 even, 2 odd
    const evens: number[] = [];
    const odds: number[] = [];
    
    while (evens.length < 2) {
      const n = Math.floor(Math.random() * 20) + 1; // 1 to 20
      if (n % 2 === 0 && !evens.includes(n)) {
        evens.push(n);
      }
    }
    
    while (odds.length < 2) {
      const n = Math.floor(Math.random() * 20) + 1; // 1 to 20
      if (n % 2 !== 0 && !odds.includes(n)) {
        odds.push(n);
      }
    }
    
    // Mix them up
    const combined = [...evens, ...odds].sort(() => Math.random() - 0.5);
    setCurrentLevelNumbers(combined);
  }, []);

  // Initialize on mount
  React.useEffect(() => {
    generateNewRound();
  }, [generateNewRound]);

  const handleNumberClick = (num: number) => {
    if (selectedNumber !== null) return; // Prevent double clicking in same round
    
    setSelectedNumber(num);
    const isEven = num % 2 === 0;
    
    if (isEven) {
      const newScore = score + 10;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newScore > highScore) {
        setHighScore(newScore);
        try {
          localStorage.setItem("even_game_highscore", String(newScore));
        } catch (e) {}
      }
      setGameFeedback({
        isEven: true,
        isCorrect: true,
        message: `Super! Cookie 🍪 ${num} is an EVEN number because all its pieces can be perfectly grouped in pairs with nobody left alone! 🎉`
      });
    } else {
      setStreak(0);
      setGameFeedback({
        isEven: false,
        isCorrect: false,
        message: `Aha! Cookie 🍪 ${num} is an ODD number! When we group them in pairs of 2, there is always 1 single piece left lonely with no partner! 😢`
      });
    }
  };

  // Helper to render paired items
  const renderPairs = (count: number) => {
    const pairs = Math.floor(count / 2);
    const remainder = count % 2;
    const items = [];
    
    for (let i = 0; i < pairs; i++) {
      items.push(
        <div key={`pair-${i}`} className="inline-flex items-center gap-1 bg-emerald-100 border-2 border-emerald-300 p-2 rounded-2xl animate-bounce shadow-xs shrink-0 select-none">
          <span className="text-base">🍎</span>
          <span className="text-base">🍎</span>
        </div>
      );
    }
    
    if (remainder > 0) {
      items.push(
        <div key="remainder" className="inline-flex items-center bg-rose-100 border-2 border-rose-400 p-2 rounded-2xl shadow-xs shrink-0 relative select-none animate-pulse">
          <span className="text-base">🍎</span>
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase text-rose-700 bg-white border border-rose-300 px-1 rounded-md leading-none whitespace-nowrap">Leftover!</span>
        </div>
      );
    }
    
    return (
      <div className="flex flex-wrap items-center justify-center gap-3 border border-dashed border-slate-300 p-4 rounded-2xl bg-white w-full max-w-sm mx-auto shadow-inner">
        {items}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-5 space-y-4 shadow-sm" id="even_number_game_root">
      {/* Game Header */}
      <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-amber-200/60 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-bounce">👾</span>
          <div>
            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wide leading-tight">Even-Odd Muncher</h4>
            <p className="text-[9px] font-extrabold text-slate-500 leading-none">Feed only EVEN cookies!</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <span className="text-[8px] font-black uppercase text-slate-400 tracking-wider block">Score</span>
            <span className="text-xs font-black text-emerald-700 leading-none">{score}</span>
          </div>
          {streak > 0 && (
            <div className="text-right bg-amber-100 px-1.5 py-0.5 rounded-lg border border-amber-300">
              <span className="text-[8px] font-black uppercase text-amber-600 tracking-wider block">Streak</span>
              <span className="text-xs font-black text-amber-700 leading-none">🔥 {streak}</span>
            </div>
          )}
          <div className="text-right border-l border-slate-200 pl-2.5">
            <span className="text-[8px] font-black uppercase text-slate-400 tracking-wider block">Best</span>
            <span className="text-xs font-black text-slate-700 leading-none">{highScore}</span>
          </div>
        </div>
      </div>

      {/* Character Speech Callout */}
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="text-5xl select-none transition-all duration-300">
          {selectedNumber === null ? (
            <span className="animate-pulse block">😋</span>
          ) : gameFeedback?.isCorrect ? (
            <span className="animate-bounce block">🦖🎉</span>
          ) : (
            <span className="animate-shake block">🤢</span>
          )}
        </div>
        <div className="bg-white border-2 border-amber-100 shadow-xs rounded-2xl px-4 py-2 text-[10px] font-extrabold text-slate-700 max-w-[240px] relative mx-auto leading-normal">
          {selectedNumber === null ? (
            <span>"I am so hungry for delicious <strong className="text-emerald-700 font-black">EVEN cookies</strong>! Tap an EVEN number to feed me!"</span>
          ) : gameFeedback?.isCorrect ? (
            <span className="text-emerald-700">"YUMMY! {selectedNumber} is perfectly even! I love cookies in complete pairs!"</span>
          ) : (
            <span className="text-rose-600">"Ouch! {selectedNumber} leaves 1 leftover apple! It's ODD! My stomach hurts!"</span>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2">
        <div className="grid grid-cols-4 gap-2.5">
          {currentLevelNumbers.map((num) => {
            const isThisSelected = selectedNumber === num;
            const isThisSelectedCorrect = isThisSelected && num % 2 === 0;
            const isThisSelectedWrong = isThisSelected && num % 2 !== 0;

            return (
              <button
                key={num}
                disabled={selectedNumber !== null}
                onClick={() => handleNumberClick(num)}
                className={`py-3.5 rounded-2xl font-black text-sm transition-all duration-200 cursor-pointer shadow-sm relative overflow-hidden flex flex-col items-center justify-center gap-1 border-2 ${
                  isThisSelectedCorrect
                    ? "bg-emerald-50 border-emerald-500 text-emerald-800 scale-105 shadow-md"
                    : isThisSelectedWrong
                    ? "bg-rose-50 border-rose-500 text-rose-800 scale-95 shadow-inner"
                    : selectedNumber !== null
                    ? "bg-slate-50 border-slate-200 text-slate-300 opacity-40"
                    : "bg-white hover:bg-amber-100 hover:border-amber-400 border-amber-200 text-slate-800 hover:-translate-y-0.5 active:translate-y-0"
                }`}
                id={`cookie_number_${num}`}
              >
                <span className="text-lg">🍪</span>
                <span className="text-xs font-black tracking-tight">{num}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Demonstration Drawer */}
      {selectedNumber !== null && gameFeedback && (
        <div className="bg-white border-2 border-amber-100 rounded-2xl p-4 space-y-4 shadow-sm animate-fade-in text-center">
          <div className="space-y-1">
            <h5 className={`text-xs font-black uppercase tracking-wider ${gameFeedback.isCorrect ? "text-emerald-700" : "text-rose-600"}`}>
              {gameFeedback.isCorrect ? "Perfect! 🌟" : "Let's learn! 📚"}
            </h5>
            <p className="text-[11px] text-slate-700 font-bold leading-normal">
              {gameFeedback.message}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">
              Grouping {selectedNumber} into pairs of 2:
            </span>
            {renderPairs(selectedNumber)}
          </div>

          <button
            onClick={generateNewRound}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer transition shadow-md hover:-translate-y-0.5"
            id="btn_game_next_round"
          >
            Play Next Round ➔
          </button>
        </div>
      )}
    </div>
  );
}

interface LessonSectionProps {
  selectedChapter: Chapter;
  initialTab?: "textbook" | "interactive" | "notes" | "topic_quiz" | "worksheet";
  onOpenTool?: (toolId: "fraction" | "numberline" | "placevalue" | "perimeter" | "typesofnumbers" | "clock" | string, highlightMode?: string) => void;
  onOpenWorksheet?: () => void;
  onActionComplete?: (points: number) => void;
  onQuizComplete?: (pointsWon: number, solvedCount: number) => void;
  onBackToChapters?: () => void;
  selectedGrade?: number;
  selectedSubject?: string;
  onQuizViewToggle?: (isQuiz: boolean) => void;
}

function IstStudentExplainer() {
  const [selectedLng, setSelectedLng] = useState<number>(82.5);
  const [londonTimeHour, setLondonTimeHour] = useState<number>(12);

  const totalMins = Math.round(selectedLng * 4);
  const hrs = Math.floor(Math.abs(totalMins) / 60);
  const mins = Math.abs(totalMins) % 60;

  let localTotalMins = londonTimeHour * 60 + totalMins;
  if (localTotalMins < 0) localTotalMins += 24 * 60;
  localTotalMins = localTotalMins % (24 * 60);

  const localHour24 = Math.floor(localTotalMins / 60);
  const localMin = localTotalMins % 60;

  const formatTime = (h: number, m: number) => {
    const period = h >= 12 ? "PM" : "AM";
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const displayM = m < 10 ? `0${m}` : m;
    return `${displayH}:${displayM} ${period}`;
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-sky-950 text-white rounded-2xl p-4 sm:p-5 md:p-6 space-y-6 shadow-xl border border-indigo-700/50 min-w-0 max-w-full overflow-x-hidden" id="ist_student_explainer">
      {/* Title */}
      <div className="flex items-center justify-between gap-3 border-b border-indigo-700/60 pb-3 min-w-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 bg-amber-400 text-slate-950 font-black rounded-xl flex items-center justify-center text-lg shadow-md shrink-0">
            ⏱️
          </div>
          <div className="min-w-0 flex-1">
            <span className="bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase px-2 py-0.5 rounded border border-amber-400/30">
              Student Master Guide
            </span>
            <h3 className="text-base md:text-lg font-black text-white break-words">
              Longitude & Indian Standard Time (IST) Made Super Clear!
            </h3>
          </div>
        </div>
      </div>

      {/* 3 Step Visual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 min-w-0">
        {/* Step 1 */}
        <div className="bg-indigo-950/80 border border-indigo-600/50 rounded-xl p-3.5 sm:p-4 space-y-2 min-w-0">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase min-w-0">
            <span className="w-5 h-5 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0">1</span>
            <span className="break-words">Why 1° = 4 Minutes?</span>
          </div>
          <p className="text-xs text-indigo-100/90 leading-relaxed break-words">
            Earth takes <strong className="text-amber-300">24 hours</strong> (1,440 minutes) to spin <strong className="text-amber-300">360°</strong>.
          </p>
          <div className="bg-indigo-900/90 rounded-lg p-2 text-center text-xs font-mono font-bold text-amber-200 border border-indigo-500/30 break-words min-w-0">
            1,440 mins ÷ 360° = 4 Mins/Degree
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-indigo-950/80 border border-indigo-600/50 rounded-xl p-3.5 sm:p-4 space-y-2 min-w-0">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase min-w-0">
            <span className="w-5 h-5 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0">2</span>
            <span className="break-words">Why India Chose 82°30' E?</span>
          </div>
          <p className="text-xs text-indigo-100/90 leading-relaxed break-words">
            India is <strong>30° wide</strong> from Gujarat to Assam (a <strong>2-hour time gap</strong>!).
          </p>
          <div className="bg-indigo-900/90 rounded-lg p-2 text-center text-xs font-mono font-bold text-amber-200 border border-indigo-500/30 break-words min-w-0">
            One Central Line: Mirzapur (82.5° E)
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-indigo-950/80 border border-indigo-600/50 rounded-xl p-3.5 sm:p-4 space-y-2 min-w-0">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase min-w-0">
            <span className="w-5 h-5 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0">3</span>
            <span className="break-words">Why IST is GMT + 5h 30m?</span>
          </div>
          <p className="text-xs text-indigo-100/90 leading-relaxed break-words">
            82.5° East of London × 4 mins = <strong>330 mins</strong> = <strong>5 hours 30 mins ahead</strong>.
          </p>
          <div className="bg-indigo-900/90 rounded-lg p-2 text-center text-xs font-mono font-bold text-amber-200 border border-indigo-500/30 break-words min-w-0">
            12:00 PM London ➔ 5:30 PM India
          </div>
        </div>
      </div>

      {/* Interactive Time Machine Tool */}
      <div className="bg-slate-950/80 rounded-xl p-4 md:p-5 border border-sky-500/30 space-y-4">
        <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <span className="text-xs font-black uppercase text-sky-300 flex items-center gap-1.5">
            🎮 Interactive Time Explorer: Try Different Longitudes!
          </span>
          <span className="text-[10px] bg-sky-950 text-sky-200 border border-sky-800 px-2 py-0.5 rounded font-mono">
            Live Math Simulation
          </span>
        </div>

        {/* Preset City Buttons */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-extrabold text-slate-300">Click a location to see how its time is calculated:</label>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "🇮🇳 All India (82°30' E IST)", lng: 82.5 },
              { label: "🇬🇧 London (0° Prime Meridian)", lng: 0 },
              { label: "🌅 East India / Assam (90° E)", lng: 90 },
              { label: "🏜️ West India / Gujarat (68° E)", lng: 68 },
              { label: "🗼 Cairo, Egypt (30° E)", lng: 30 },
              { label: "🇯🇵 Tokyo, Japan (135° E)", lng: 135 },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => setSelectedLng(item.lng)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer active:scale-95 border ${
                  selectedLng === item.lng
                    ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md font-extrabold"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Longitude Slider */}
          <div className="space-y-1 bg-slate-900/90 p-3 rounded-lg border border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-bold">Longitude Position:</span>
              <span className="font-mono font-black text-amber-300">{selectedLng}° {selectedLng >= 0 ? "East" : "West"}</span>
            </div>
            <input
              type="range"
              min="0"
              max="180"
              step="0.5"
              value={selectedLng}
              onChange={e => setSelectedLng(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          {/* London Time Selector */}
          <div className="space-y-1 bg-slate-900/90 p-3 rounded-lg border border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-bold">London Time (Greenwich 0°):</span>
              <span className="font-mono font-black text-sky-300">{formatTime(londonTimeHour, 0)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="23"
              step="1"
              value={londonTimeHour}
              onChange={e => setLondonTimeHour(parseInt(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className="bg-gradient-to-r from-sky-950 to-indigo-950 border-2 border-amber-400/60 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-black text-amber-300 uppercase tracking-wide">
              📊 Step-by-Step Time Calculation Result:
            </span>
            <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full font-mono">
              Calculated Time = {formatTime(localHour24, localMin)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block uppercase">Step 1: Multiply by 4 min</span>
              <p className="font-extrabold text-amber-200 mt-0.5">{selectedLng}° × 4 min = {totalMins} minutes</p>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block uppercase">Step 2: Convert to Hours</span>
              <p className="font-extrabold text-sky-200 mt-0.5">{hrs} hrs {mins > 0 ? `${mins} mins` : ""}</p>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block uppercase">Step 3: Add to London Time</span>
              <p className="font-extrabold text-emerald-300 mt-0.5">{formatTime(londonTimeHour, 0)} + {hrs}h {mins}m = {formatTime(localHour24, localMin)}</p>
            </div>
          </div>

          {selectedLng === 82.5 && (
            <div className="bg-amber-500/20 border border-amber-400/40 p-2.5 rounded-lg text-xs text-amber-100 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <span>🇮🇳</span> Notice Indian Standard Time (IST):
              </p>
              <p className="text-[11px] leading-relaxed text-amber-200/90">
                82.5° × 4 minutes = 330 minutes = exactly <strong>5 hours and 30 minutes ahead of London</strong>! When it is {formatTime(londonTimeHour, 0)} in London, it is exactly <strong>{formatTime(localHour24, localMin)} in India</strong>!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Interactive Simulator Component for Slide Presentation Mode (Right Column)
function SlideInteractiveSimulator({
  slide,
  selectedChapter,
  onSwitchTab
}: {
  slide: any;
  selectedChapter: Chapter;
  onSwitchTab: (tab: "textbook" | "interactive" | "notes" | "topic_quiz" | "worksheet") => void;
}) {
  const [pvNumber, setPvNumber] = React.useState<number>(5321409);
  const [numSystem, setNumSystem] = React.useState<"indian" | "international">("indian");
  const [roundNum, setRoundNum] = React.useState<number>(73);
  const [roundPlace, setRoundPlace] = React.useState<10 | 100 | 1000>(10);
  const [romanNum, setRomanNum] = React.useState<number>(14);
  const [fracNum, setFracNum] = React.useState<number>(3);
  const [fracDen, setFracDen] = React.useState<number>(4);
  const [interactiveAns, setInteractiveAns] = React.useState<number | null>(null);
  const [integerVal, setIntegerVal] = React.useState<number>(-3);
  const [integerMode, setIntegerMode] = React.useState<"numberline" | "context" | "operations">("numberline");
  const [secondIntVal, setSecondIntVal] = React.useState<number>(5);
  const [compareDigits, setCompareDigits] = React.useState<number[]>([2, 8, 7, 4]);
  const [unitCategory, setUnitCategory] = React.useState<"length" | "mass" | "capacity">("mass");
  const [unitValue, setUnitValue] = React.useState<number>(5);
  const [bracketA, setBracketA] = React.useState<number>(6);
  const [bracketB, setBracketB] = React.useState<number>(108);

  // If Chapter 5 Grade 6 Physics (Measurement of Length and Motion)
  if (
    selectedChapter?.id === "g6_phys_motion" ||
    selectedChapter?.id?.includes("g6_phys_motion") ||
    slide?.id?.toLowerCase().includes("g6-phys-motion") ||
    slide?.id?.toLowerCase().includes("g6_phys_motion")
  ) {
    return <G6MotionSlideSimulator slide={slide} onSwitchTab={onSwitchTab} />;
  }

  // If slide has a SVG definition diagram
  if (slide.data?.diagramType) {
    return (
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-5 text-white flex flex-col justify-between h-full min-h-0 shadow-inner relative overflow-y-auto">
        {/* Simulator Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[11px] font-black uppercase text-sky-400 tracking-wider">
              🎮 Visual Model Simulator
            </span>
          </div>
          <span className="text-[10px] font-extrabold bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-md border border-slate-700">
            {slide.data.diagramType}
          </span>
        </div>

        {/* Canvas Diagram */}
        <div className="flex-1 min-h-0 flex flex-col justify-center items-center my-2 max-w-full overflow-hidden">
          <DefinitionDiagram diagramType={slide.data.diagramType} title={slide.data.name} />
        </div>

        {/* Footer info */}
        <div className="mt-2 pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
          <span className="text-[11px] font-semibold text-slate-400">
            💡 Touch diagram to observe structural details
          </span>
          <button
            onClick={() => onSwitchTab("interactive")}
            className="px-3 py-1 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-[11px] transition shadow-2xs cursor-pointer"
          >
            Open Visual Studio 🎨
          </button>
        </div>
      </div>
    );
  }

  // If slide has an image
  if (slide.data?.image) {
    return (
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-5 text-white flex flex-col justify-between h-full min-h-0 shadow-inner relative overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-2 shrink-0">
          <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 bg-amber-400 rounded-full" />
            📷 HD Visual Diagram
          </span>
          <span className="text-[10px] font-bold text-slate-400 truncate max-w-[150px]">
            {slide.title}
          </span>
        </div>

        <div className="flex-1 min-h-0 flex items-center justify-center rounded-2xl overflow-hidden border border-slate-700/80 my-2 bg-slate-950 p-1">
          <img src={slide.data.image} alt={slide.title} className="w-full h-auto object-cover max-h-60 rounded-xl" referrerPolicy="no-referrer" />
        </div>

        <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>🔍 Visual Concept Model</span>
          <button
            onClick={() => onSwitchTab("interactive")}
            className="text-sky-400 hover:underline text-[11px] font-bold"
          >
            Launch Visual Studio →
          </button>
        </div>
      </div>
    );
  }

  // Intro Slide Topics Overview Card
  if (slide.type === "intro") {
    const stepsList: any[] = slide.data?.steps || [];
    return (
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 border-2 border-indigo-900/80 rounded-3xl p-3.5 sm:p-4 text-white flex flex-col justify-between h-full min-h-0 shadow-xl relative overflow-hidden space-y-2">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-2 shrink-0">
          <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
            <BookOpen size={16} className="text-amber-400" />
            📋 Chapter Topics Overview
          </span>
          <span className="bg-indigo-900/80 text-indigo-200 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md border border-indigo-700">
            {stepsList.length} Topics
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 my-auto">
          {stepsList.length > 0 ? (
            stepsList.map((step: any, idx: number) => (
              <div
                key={idx}
                className="bg-slate-950/80 border border-indigo-900/60 p-2 rounded-xl flex items-center gap-2 shadow-xs hover:border-amber-500/40 transition"
              >
                <div className="w-5 h-5 rounded-md bg-amber-500/20 border border-amber-500/50 text-amber-300 font-mono font-black text-[11px] flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="text-[11px] font-extrabold text-slate-100 truncate leading-tight">
                    {cleanStepTitle(step.title)}
                  </h5>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-indigo-200/80 text-center py-4 col-span-2">
              Explore the chapter topics using the navigation arrows below.
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-indigo-900/60 flex items-center justify-between text-[10px] sm:text-[11px] text-indigo-300/80 shrink-0">
          <span>💡 Tap 'Start Lesson Presentation' or ➔ to begin</span>
          <span className="text-amber-400 font-bold">NCERT Aligned</span>
        </div>
      </div>
    );
  }

  // Outro Slide Simulator
  if (slide.type === "outro") {
    return (
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border-2 border-emerald-800/80 rounded-3xl p-5 text-white flex flex-col justify-between h-full min-h-0 shadow-xl relative overflow-y-auto space-y-4">
        <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3 shrink-0">
          <span className="text-xs font-black uppercase text-emerald-300 tracking-wider flex items-center gap-2">
            <Award size={16} className="text-amber-400" />
            Chapter Summary & Practice
          </span>
          <span className="bg-emerald-900/80 text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-md border border-emerald-700">
            Completed 🎉
          </span>
        </div>

        <div className="space-y-4 my-auto text-center">
          <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-400/40 text-emerald-300 rounded-2xl flex items-center justify-center mx-auto text-3xl shadow-inner">
            🏆
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-black text-white">
              Great Job Learning!
            </h4>
            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-xs mx-auto">
              Test your mastery with the topic quiz or practice worksheet.
            </p>
          </div>

          <div className="flex flex-col gap-2 max-w-xs mx-auto pt-1">
            <button
              onClick={() => onSwitchTab("topic_quiz")}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>🎯 Take Topic Quiz</span>
            </button>
            <button
              onClick={() => onSwitchTab("worksheet")}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-sky-200 font-extrabold text-xs rounded-xl border border-slate-700 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>✍️ Practice Worksheet</span>
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-emerald-900/60 flex items-center justify-between text-[11px] text-emerald-300/80 shrink-0">
          <span>🌟 Mastery Unlocked</span>
          <span>+10 XP Earned</span>
        </div>
      </div>
    );
  }

  // Topic specific simulators
  const titleLower = (slide.title || "").toLowerCase();

  // 1. Comparing & Forming Numbers Simulator
  if (
    titleLower.includes("comparing") ||
    titleLower.includes("forming") ||
    titleLower.includes("greatest") ||
    titleLower.includes("smallest")
  ) {
    const sortedDesc = [...compareDigits].sort((a, b) => b - a);
    const sortedAsc = [...compareDigits].sort((a, b) => a - b);
    if (sortedAsc[0] === 0 && sortedAsc.some(d => d > 0)) {
      const firstNonZeroIdx = sortedAsc.findIndex(d => d > 0);
      const temp = sortedAsc[0];
      sortedAsc[0] = sortedAsc[firstNonZeroIdx];
      sortedAsc[firstNonZeroIdx] = temp;
    }
    const greatestVal = parseInt(sortedDesc.join(""), 10);
    const smallestVal = parseInt(sortedAsc.join(""), 10);

    return (
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-5 text-white flex flex-col justify-between h-full min-h-0 shadow-inner relative overflow-y-auto space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 shrink-0">
          <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
            🔀 Comparing & Forming Numbers Simulator
          </span>
          <span className="text-[10px] bg-amber-950/80 text-amber-200 px-2 py-0.5 rounded border border-amber-700 font-mono">
            NCERT Step 1
          </span>
        </div>

        <div className="space-y-3 my-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 space-y-2 text-center">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
              Given Digits (Tap ▲ / ▼ to change):
            </span>
            <div className="flex items-center justify-center gap-2">
              {compareDigits.map((digit, idx) => (
                <div key={idx} className="flex flex-col items-center bg-slate-900 border border-amber-500/40 p-2 rounded-xl">
                  <button
                    onClick={() => {
                      const newD = [...compareDigits];
                      newD[idx] = (newD[idx] + 1) % 10;
                      setCompareDigits(newD);
                    }}
                    className="text-xs font-bold text-slate-400 hover:text-amber-400 cursor-pointer"
                  >
                    ▲
                  </button>
                  <span className="text-2xl font-black font-mono text-amber-300 my-1">{digit}</span>
                  <button
                    onClick={() => {
                      const newD = [...compareDigits];
                      newD[idx] = (newD[idx] + 9) % 10;
                      setCompareDigits(newD);
                    }}
                    className="text-xs font-bold text-slate-400 hover:text-amber-400 cursor-pointer"
                  >
                    ▼
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setCompareDigits(Array.from({ length: 4 }, () => Math.floor(Math.random() * 9) + 1));
              }}
              className="text-[11px] text-amber-400 hover:underline font-bold cursor-pointer pt-1"
            >
              🎲 Randomize Digits
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-emerald-950/80 border border-emerald-600/80 rounded-2xl p-3 text-center space-y-1">
              <span className="text-[10px] font-black uppercase text-emerald-300 block">
                👑 Greatest Number
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-200">
                {greatestVal.toLocaleString("en-IN")}
              </span>
              <span className="text-[9px] text-emerald-400/80 block font-medium">
                (Arranged Descending: {sortedDesc.join(", ")})
              </span>
            </div>

            <div className="bg-indigo-950/80 border border-indigo-600/80 rounded-2xl p-3 text-center space-y-1">
              <span className="text-[10px] font-black uppercase text-indigo-300 block">
                🌱 Smallest Number
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-indigo-200">
                {smallestVal.toLocaleString("en-IN")}
              </span>
              <span className="text-[9px] text-indigo-400/80 block font-medium">
                (Arranged Ascending: {sortedAsc.join(", ")})
              </span>
            </div>
          </div>

          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-3 text-xs text-slate-300 space-y-1">
            <span className="text-[10px] font-black uppercase text-amber-400 block">
              💡 NCERT Key Takeaway: Place Value Power
            </span>
            <p className="leading-relaxed text-[11px]">
              Moving a larger digit to the <strong>leftmost place</strong> (Thousands) dramatically increases the overall value! E.g. <strong>2,478</strong> vs <strong>8,742</strong>.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
          <span>💡 Tap ▲/▼ to change individual digits</span>
          <button onClick={() => setCompareDigits([2, 8, 7, 4])} className="text-amber-400 hover:underline font-bold cursor-pointer">
            Reset (2, 8, 7, 4)
          </button>
        </div>
      </div>
    );
  }

  // 2. Large Numbers in Practice & Unit Conversions Simulator
  if (
    titleLower.includes("conversion") ||
    titleLower.includes("conversions") ||
    titleLower.includes("unit") ||
    titleLower.includes("measurement") ||
    (titleLower.includes("practice") && titleLower.includes("number"))
  ) {
    const meters = unitValue * 1000;
    const cm = meters * 100;
    const mm = cm * 10;
    const grams = unitValue * 1000;
    const mg = grams * 1000;
    const mL = unitValue * 1000;

    return (
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-5 text-white flex flex-col justify-between h-full min-h-0 shadow-inner relative overflow-y-auto space-y-3">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2 shrink-0 gap-2">
          <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
            📏 Unit Conversion & Large Numbers Simulator
          </span>
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-[10px] font-extrabold select-none">
            <button
              onClick={() => setUnitCategory("length")}
              className={`px-2 py-1 rounded-lg transition cursor-pointer ${unitCategory === "length" ? "bg-amber-600 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"}`}
            >
              📏 Length
            </button>
            <button
              onClick={() => setUnitCategory("mass")}
              className={`px-2 py-1 rounded-lg transition cursor-pointer ${unitCategory === "mass" ? "bg-amber-600 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"}`}
            >
              ⚖️ Mass
            </button>
            <button
              onClick={() => setUnitCategory("capacity")}
              className={`px-2 py-1 rounded-lg transition cursor-pointer ${unitCategory === "capacity" ? "bg-amber-600 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"}`}
            >
              🥛 Capacity
            </button>
          </div>
        </div>

        <div className="space-y-3 my-auto">
          {/* Vertical Step-by-Step Conversion Card */}
          <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-3 sm:p-4 text-center space-y-2.5 shadow-inner">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
              Vertical Step-by-Step Conversion ({unitValue} {unitCategory === "length" ? "km" : unitCategory === "mass" ? "kg" : "L"})
            </span>

            {unitCategory === "length" && (
              <div className="space-y-1.5 text-left font-mono text-xs font-extrabold">
                <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400 font-sans font-bold text-[11px]">1. Input (Kilometers):</span>
                  <span className="text-amber-300 text-sm">{unitValue} km</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400 font-sans font-bold text-[11px]">2. Into Meters (m):</span>
                  <span className="text-indigo-300 text-sm">{unitValue} × 1,000 = {meters.toLocaleString()} m</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400 font-sans font-bold text-[11px]">3. Into Centimeters (cm):</span>
                  <span className="text-sky-300 text-sm">{meters.toLocaleString()} × 100 = {cm.toLocaleString()} cm</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400 font-sans font-bold text-[11px]">4. Into Millimeters (mm):</span>
                  <span className="text-emerald-300 text-sm">{cm.toLocaleString()} × 10 = {mm.toLocaleString()} mm</span>
                </div>
              </div>
            )}

            {unitCategory === "mass" && (
              <div className="space-y-1.5 text-left font-mono text-xs font-extrabold">
                <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400 font-sans font-bold text-[11px]">1. Input (Kilograms):</span>
                  <span className="text-amber-300 text-sm">{unitValue} kg</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400 font-sans font-bold text-[11px]">2. Into Grams (g):</span>
                  <span className="text-indigo-300 text-sm">{unitValue} × 1,000 = {grams.toLocaleString()} g</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400 font-sans font-bold text-[11px]">3. Into Milligrams (mg):</span>
                  <span className="text-emerald-300 text-sm">{grams.toLocaleString()} × 1,000 = {mg.toLocaleString()} mg</span>
                </div>
              </div>
            )}

            {unitCategory === "capacity" && (
              <div className="space-y-1.5 text-left font-mono text-xs font-extrabold">
                <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400 font-sans font-bold text-[11px]">1. Input (Liters):</span>
                  <span className="text-amber-300 text-sm">{unitValue} L</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400 font-sans font-bold text-[11px]">2. Into Milliliters (mL):</span>
                  <span className="text-emerald-300 text-sm">{unitValue} × 1,000 = {mL.toLocaleString()} mL</span>
                </div>
              </div>
            )}

            {/* Direct Total Summary Row */}
            <div className="bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-600/80 font-mono text-xs text-emerald-300 font-bold flex items-center justify-between">
              <span>Direct Summary:</span>
              <span className="text-amber-300 font-black">
                {unitCategory === "length" && `${unitValue} km = ${mm.toLocaleString()} mm`}
                {unitCategory === "mass" && `${unitValue} kg = ${mg.toLocaleString()} mg`}
                {unitCategory === "capacity" && `${unitValue} L = ${mL.toLocaleString()} mL`}
              </span>
            </div>
          </div>

          <div className="bg-indigo-950/80 border border-indigo-700/80 rounded-2xl p-3 space-y-1.5 text-xs">
            <span className="text-[10px] font-black uppercase text-indigo-300 block">
              📦 Real NCERT Example: Medicine Box Calculation
            </span>
            <p className="text-[11px] text-indigo-100 font-medium leading-relaxed">
              If a box contains <strong>2,00,000 tablets</strong> weighing <strong>25 mg each</strong>:
            </p>
            <div className="bg-slate-950/80 p-2 rounded-xl font-mono text-[11px] text-emerald-300 font-bold border border-emerald-800/60 space-y-0.5 text-left">
              <div>• Total Weight = 2,00,000 × 25 mg = 50,00,000 mg</div>
              <div>• In Grams = 50,00,000 ÷ 1,000 = 5,000 g</div>
              <div>• In Kilograms = 5,000 ÷ 1,000 = <strong>5 kg</strong>!</div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-slate-950 p-2 rounded-2xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-bold">Adjust Quantity:</span>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setUnitValue(v => Math.max(1, v - 1))} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-bold cursor-pointer">-1</button>
              <span className="font-mono font-black text-amber-300 text-sm px-2">{unitValue}</span>
              <button onClick={() => setUnitValue(v => v + 1)} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-bold cursor-pointer">+1</button>
              <button onClick={() => setUnitValue(v => v + 5)} className="px-2.5 py-1 bg-amber-900/80 hover:bg-amber-800 rounded-lg text-amber-200 font-bold cursor-pointer">+5</button>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
          <span>💡 Always multiply by 1,000 when converting to smaller metric units</span>
          <button onClick={() => setUnitValue(5)} className="text-amber-400 hover:underline font-bold cursor-pointer">Reset</button>
        </div>
      </div>
    );
  }

  // 3. Use of Brackets & Distributive Property Simulator
  if (
    titleLower.includes("bracket") ||
    titleLower.includes("brackets") ||
    titleLower.includes("distributive")
  ) {
    const bHundreds = Math.floor(bracketB / 100) * 100 || 100;
    const bRemainder = bracketB % 100;
    const step1 = `${bracketA} × (${bHundreds} + ${bRemainder})`;
    const step2 = `(${bracketA} × ${bHundreds}) + (${bracketA} × ${bRemainder})`;
    const part1 = bracketA * bHundreds;
    const part2 = bracketA * bRemainder;
    const finalAns = part1 + part2;

    // BODMAS rule demonstration state
    const numX = bracketA; // e.g. 5
    const numY = 3;
    const numZ = 4;
    const withBracketVal = (numX + numY) * numZ; // (5 + 3) * 4 = 32
    const withoutBracketVal = numX + (numY * numZ); // 5 + 3 * 4 = 17

    return (
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-5 text-white flex flex-col justify-between h-full min-h-0 shadow-inner relative overflow-y-auto space-y-3">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2 shrink-0 gap-2">
          <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
            🧮 Use of Brackets Simulator
          </span>
          <span className="text-[10px] bg-amber-950/80 text-amber-200 px-2 py-0.5 rounded border border-amber-700 font-mono">
            NCERT Grade 6
          </span>
        </div>

        <div className="space-y-3 my-auto">
          {/* Main Calculation Card */}
          <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-3 sm:p-4 text-center space-y-2.5 shadow-inner">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-700/60">
                Mental Math Trick for: {bracketA} × {bracketB}
              </span>
            </div>

            <div className="space-y-1.5 font-mono text-xs sm:text-sm font-extrabold">
              <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl text-slate-300 flex items-center justify-between">
                <span className="text-slate-400 text-[11px] font-sans font-bold">1. Break Into Brackets:</span>
                <span className="text-amber-300 font-black">{step1}</span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl text-slate-300 flex items-center justify-between">
                <span className="text-slate-400 text-[11px] font-sans font-bold">2. Distribute Multiplier:</span>
                <span className="text-indigo-300 font-black">{step2}</span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl text-slate-300 flex items-center justify-between">
                <span className="text-slate-400 text-[11px] font-sans font-bold">3. Multiply & Add:</span>
                <span className="text-emerald-300 font-black">{part1} + {part2}</span>
              </div>
            </div>

            <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono bg-emerald-950/80 py-2 rounded-xl border border-emerald-600/80 shadow-xs flex items-center justify-center gap-2">
              <span>Answer:</span>
              <span className="text-amber-300">{finalAns}</span>
            </div>
          </div>

          {/* Real Life Story Card */}
          <div className="bg-indigo-950/80 border border-indigo-700/80 rounded-2xl p-3 space-y-1 text-xs">
            <span className="text-[10px] font-black uppercase text-indigo-300 block">
              🛒 Real-Life Shopping Story
            </span>
            <p className="text-[11px] text-indigo-100 font-medium leading-relaxed">
              If you buy <strong>{bracketA} notebooks</strong> at ₹{bHundreds} each and <strong>{bracketA} pens</strong> at ₹{bRemainder} each:
            </p>
            <div className="bg-slate-950/80 p-2 rounded-xl font-mono text-[11px] text-amber-200 font-bold border border-amber-800/60 text-center">
              Total Cost = {bracketA} × ({bHundreds} + {bRemainder}) = ₹{finalAns}
            </div>
          </div>

          {/* Why Brackets Matter Card */}
          <div className="bg-amber-950/40 border border-amber-700/50 rounded-2xl p-2.5 text-xs space-y-1">
            <span className="text-[10px] font-black uppercase text-amber-300 block">
              ⚠️ Why Brackets ( ) Matter: Order of Operation!
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-center">
              <div className="bg-emerald-950/80 p-1.5 rounded-xl border border-emerald-700">
                <span className="text-[9px] text-emerald-300 font-sans block font-bold">With Brackets:</span>
                <span className="text-emerald-200 font-bold">({numX} + {numY}) × {numZ} = {withBracketVal}</span>
                <span className="text-[9px] text-emerald-400/80 block font-sans">(First add 5+3=8, then 8×4)</span>
              </div>

              <div className="bg-rose-950/80 p-1.5 rounded-xl border border-rose-700">
                <span className="text-[9px] text-rose-300 font-sans block font-bold">Without Brackets:</span>
                <span className="text-rose-200 font-bold">{numX} + {numY} × {numZ} = {withoutBracketVal}</span>
                <span className="text-[9px] text-rose-400/80 block font-sans">(First multiply 3×4=12, then +5)</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-bold">Multiplier (a):</span>
              <div className="flex items-center gap-1">
                <button onClick={() => setBracketA(a => Math.max(2, a - 1))} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded font-bold cursor-pointer text-white">-1</button>
                <span className="font-mono font-black text-amber-300 px-1">{bracketA}</span>
                <button onClick={() => setBracketA(a => Math.min(20, a + 1))} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded font-bold cursor-pointer text-white">+1</button>
              </div>
            </div>

            <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-bold">Large Number (b):</span>
              <div className="flex items-center gap-1">
                <button onClick={() => setBracketB(b => Math.max(101, b - 1))} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded font-bold cursor-pointer text-white">-1</button>
                <span className="font-mono font-black text-amber-300 px-1">{bracketB}</span>
                <button onClick={() => setBracketB(b => Math.min(999, b + 1))} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded font-bold cursor-pointer text-white">+1</button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
          <span>💡 Always perform operations inside brackets ( ) first!</span>
          <button onClick={() => { setBracketA(6); setBracketB(108); }} className="text-amber-400 hover:underline font-bold cursor-pointer">Reset (6 × 108)</button>
        </div>
      </div>
    );
  }

  // 4. Place Value & Comma Placement Simulator
  if (
    titleLower.includes("comma") ||
    titleLower.includes("commas") ||
    titleLower.includes("placing") ||
    titleLower.includes("place value") ||
    titleLower.includes("number system") ||
    titleLower.includes("crore") ||
    titleLower.includes("lakh") ||
    titleLower.includes("million") ||
    titleLower.includes("knowing our numbers") ||
    titleLower.includes("international") ||
    titleLower.includes("indian")
  ) {
    // Determine default mode based on slide title if user hasn't explicitly toggled
    const isInternationalSlide = titleLower.includes("international");
    const activeSystem = numSystem || (isInternationalSlide ? "international" : "indian");

    const indianFormatted = pvNumber.toLocaleString("en-IN");
    const internationalFormatted = pvNumber.toLocaleString("en-US");
    
    // Calculate individual place value digits
    const crores = Math.floor(pvNumber / 10000000) % 10;
    const tenMillions = Math.floor(pvNumber / 10000000) % 10;
    
    const tenLakhs = Math.floor(pvNumber / 1000000) % 10;
    const millions = Math.floor(pvNumber / 1000000) % 10;

    const lakhs = Math.floor(pvNumber / 100000) % 10;
    const hundredThousands = Math.floor(pvNumber / 100000) % 10;

    const tenThousands = Math.floor(pvNumber / 10000) % 10;
    const thousands = Math.floor(pvNumber / 1000) % 10;
    const hundreds = Math.floor(pvNumber / 100) % 10;
    const tens = Math.floor(pvNumber / 10) % 10;
    const ones = Math.floor(pvNumber / 1) % 10;

    const isCommaTopic = titleLower.includes("comma") || titleLower.includes("commas") || titleLower.includes("placing");

    return (
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-5 text-white flex flex-col justify-between h-full min-h-0 shadow-inner relative overflow-y-auto space-y-3">
        {/* Header & System Selector */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2 shrink-0 gap-2">
          <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
            {isCommaTopic ? "📍 Interactive Comma Placement Simulator" : "🧮 Place Value Simulator"}
          </span>
          
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-[10px] font-extrabold select-none">
            <button
              onClick={() => setNumSystem("indian")}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${activeSystem === "indian" ? "bg-amber-600 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"}`}
            >
              🇮🇳 Indian System
            </button>
            <button
              onClick={() => setNumSystem("international")}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${activeSystem === "international" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"}`}
            >
              🌐 International System
            </button>
          </div>
        </div>

        <div className="space-y-3 my-auto">
          {/* Main Number Display & Format Comparison */}
          <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-3 sm:p-4 text-center space-y-2 shadow-inner">
            <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
              <span>{activeSystem === "indian" ? "Indian Format (Lakhs & Crores)" : "International Format (Millions & Thousands)"}</span>
              <span className="text-amber-400 font-black">Comma Placement Rule</span>
            </div>
            
            <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono tracking-wider break-all flex items-center justify-center gap-1">
              {activeSystem === "indian" ? (
                <span>
                  {crores > 0 && <span>{crores}{tenLakhs > 0 || lakhs > 0 ? <strong className="text-amber-400 text-3xl font-black bg-amber-500/20 px-1 rounded mx-0.5">,</strong> : ""}</span>}
                  {(crores > 0 || tenLakhs > 0 || lakhs > 0) && (
                    <span>
                      {crores > 0 ? `${tenLakhs}${lakhs}` : pvNumber >= 100000 ? Math.floor(pvNumber / 100000) : ""}
                      <strong className="text-amber-400 text-3xl font-black bg-amber-500/20 px-1 rounded mx-0.5">,</strong>
                    </span>
                  )}
                  {(pvNumber >= 1000) && (
                    <span>
                      {pvNumber >= 100000 ? `${tenThousands}${thousands}` : Math.floor(pvNumber / 1000)}
                      <strong className="text-amber-400 text-3xl font-black bg-amber-500/20 px-1 rounded mx-0.5">,</strong>
                    </span>
                  )}
                  <span>{`${hundreds}${tens}${ones}`}</span>
                </span>
              ) : (
                <span>
                  {millions > 0 && (
                    <span>
                      {Math.floor(pvNumber / 1000000)}
                      <strong className="text-indigo-400 text-3xl font-black bg-indigo-500/20 px-1 rounded mx-0.5">,</strong>
                    </span>
                  )}
                  {pvNumber >= 1000 && (
                    <span>
                      {millions > 0 ? `${hundredThousands}${tenThousands}${thousands}` : Math.floor(pvNumber / 1000)}
                      <strong className="text-indigo-400 text-3xl font-black bg-indigo-500/20 px-1 rounded mx-0.5">,</strong>
                    </span>
                  )}
                  <span>{`${hundreds}${tens}${ones}`}</span>
                </span>
              )}
            </div>

            {/* Rule Explanation Banner */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2 text-left text-[11px] text-slate-300 leading-relaxed font-medium">
              {activeSystem === "indian" ? (
                <p className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-extrabold shrink-0">💡 Rule:</span>
                  <span>
                    In the <strong>Indian System</strong>, the first comma comes after <strong>3 digits from the right</strong> (Hundreds), and then after <strong>every 2 digits</strong> (Thousands, Lakhs, Crores).
                  </span>
                </p>
              ) : (
                <p className="flex items-start gap-1.5">
                  <span className="text-indigo-400 font-extrabold shrink-0">💡 Rule:</span>
                  <span>
                    In the <strong>International System</strong>, commas are placed after <strong>every 3 digits from the right</strong> (Thousands, Millions, Billions).
                  </span>
                </p>
              )}
            </div>

            {/* Side-by-side Comparison Pill */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80 text-[10px] sm:text-[11px] font-mono">
              <div className={`p-1.5 rounded-lg border ${activeSystem === "indian" ? "bg-amber-950/80 border-amber-500/80 text-amber-200 font-bold" : "bg-slate-900 border-slate-800 text-slate-400"}`}>
                🇮🇳 Indian: <span className="font-bold">{indianFormatted}</span>
              </div>
              <div className={`p-1.5 rounded-lg border ${activeSystem === "international" ? "bg-indigo-950/80 border-indigo-500/80 text-indigo-200 font-bold" : "bg-slate-900 border-slate-800 text-slate-400"}`}>
                🌐 International: <span className="font-bold">{internationalFormatted}</span>
              </div>
            </div>
          </div>

          {/* Place Value Table Breakdown */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-2.5 space-y-2 overflow-x-auto">
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block text-center">
              📍 {activeSystem === "indian" ? "Indian System Chart (Crores, Lakhs, Thousands, Units)" : "International System Chart (Millions, Thousands, Units)"}
            </span>

            <div className="grid grid-cols-8 gap-1 min-w-[320px] text-center">
              {/* Headers */}
              {activeSystem === "indian" ? (
                <>
                  <div className="text-[9px] sm:text-[10px] font-black text-slate-400">C</div>
                  <div className="text-[9px] sm:text-[10px] font-black text-slate-400">TL</div>
                  <div className="text-[9px] sm:text-[10px] font-black text-slate-400">L</div>
                  <div className="text-[9px] sm:text-[10px] font-black text-slate-400">TTh</div>
                  <div className="text-[9px] sm:text-[10px] font-black text-slate-400">Th</div>
                </>
              ) : (
                <>
                  <div className="text-[9px] sm:text-[10px] font-black text-indigo-300">TM</div>
                  <div className="text-[9px] sm:text-[10px] font-black text-indigo-300">M</div>
                  <div className="text-[9px] sm:text-[10px] font-black text-sky-300">HTh</div>
                  <div className="text-[9px] sm:text-[10px] font-black text-sky-300">TTh</div>
                  <div className="text-[9px] sm:text-[10px] font-black text-sky-300">Th</div>
                </>
              )}
              <div className="text-[9px] sm:text-[10px] font-black text-emerald-400 bg-emerald-950/60 rounded py-0.5 border border-emerald-800/60">H</div>
              <div className="text-[9px] sm:text-[10px] font-black text-emerald-400 bg-emerald-950/60 rounded py-0.5 border border-emerald-800/60">T</div>
              <div className="text-[9px] sm:text-[10px] font-black text-emerald-400 bg-emerald-950/60 rounded py-0.5 border border-emerald-800/60">O</div>

              {/* Digits */}
              {activeSystem === "indian" ? (
                <>
                  <div className="text-xs sm:text-sm font-bold text-slate-300 bg-slate-900 rounded py-1 border border-slate-800">{crores}</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-300 bg-slate-900 rounded py-1 border border-slate-800">{tenLakhs}</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-300 bg-slate-900 rounded py-1 border border-slate-800">{lakhs}</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-300 bg-slate-900 rounded py-1 border border-slate-800">{tenThousands}</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-300 bg-slate-900 rounded py-1 border border-slate-800">{thousands}</div>
                </>
              ) : (
                <>
                  <div className="text-xs sm:text-sm font-bold text-indigo-200 bg-indigo-950/40 rounded py-1 border border-indigo-900/80">{tenMillions}</div>
                  <div className="text-xs sm:text-sm font-bold text-indigo-200 bg-indigo-950/40 rounded py-1 border border-indigo-900/80">{millions}</div>
                  <div className="text-xs sm:text-sm font-bold text-sky-200 bg-sky-950/40 rounded py-1 border border-sky-900/80">{hundredThousands}</div>
                  <div className="text-xs sm:text-sm font-bold text-sky-200 bg-sky-950/40 rounded py-1 border border-sky-900/80">{tenThousands}</div>
                  <div className="text-xs sm:text-sm font-bold text-sky-200 bg-sky-950/40 rounded py-1 border border-sky-900/80">{thousands}</div>
                </>
              )}
              <div className="text-xs sm:text-sm font-black text-emerald-300 bg-emerald-900/50 rounded py-1 border border-emerald-600/80 shadow-xs">{hundreds}</div>
              <div className="text-xs sm:text-sm font-black text-emerald-300 bg-emerald-900/50 rounded py-1 border border-emerald-600/80 shadow-xs">{tens}</div>
              <div className="text-xs sm:text-sm font-black text-emerald-300 bg-emerald-900/50 rounded py-1 border border-emerald-600/80 shadow-xs">{ones}</div>
            </div>
            
            {/* Units Period Breakdown (Hundreds, Tens, Ones) */}
            <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px] text-center font-bold">
              <div className="bg-emerald-950/70 text-emerald-300 p-1.5 rounded-lg border border-emerald-800/80 shadow-2xs">
                Hundreds (H): <span className="font-mono text-xs">{hundreds}</span> ({hundreds * 100})
              </div>
              <div className="bg-emerald-950/70 text-emerald-300 p-1.5 rounded-lg border border-emerald-800/80 shadow-2xs">
                Tens (T): <span className="font-mono text-xs">{tens}</span> ({tens * 10})
              </div>
              <div className="bg-emerald-950/70 text-emerald-300 p-1.5 rounded-lg border border-emerald-800/80 shadow-2xs">
                Ones (O): <span className="font-mono text-xs">{ones}</span> ({ones})
              </div>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {activeSystem === "indian" ? (
              <button
                onClick={() => setPvNumber((prev) => prev + 100000)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-xl text-[11px] font-extrabold text-sky-200 border border-slate-700 transition cursor-pointer"
              >
                +1 Lakh
              </button>
            ) : (
              <button
                onClick={() => setPvNumber((prev) => prev + 1000000)}
                className="p-1.5 bg-indigo-900/80 hover:bg-indigo-800 active:scale-95 rounded-xl text-[11px] font-extrabold text-indigo-200 border border-indigo-700 transition cursor-pointer"
              >
                +1 Million
              </button>
            )}
            
            <button
              onClick={() => setPvNumber((prev) => prev + 100)}
              className="p-1.5 bg-emerald-900/80 hover:bg-emerald-800 active:scale-95 rounded-xl text-[11px] font-black text-emerald-200 border border-emerald-700 transition cursor-pointer"
            >
              +100 (H)
            </button>
            <button
              onClick={() => setPvNumber((prev) => prev + 10)}
              className="p-1.5 bg-emerald-900/80 hover:bg-emerald-800 active:scale-95 rounded-xl text-[11px] font-black text-emerald-200 border border-emerald-700 transition cursor-pointer"
            >
              +10 (T)
            </button>
            <button
              onClick={() => setPvNumber((prev) => prev + 1)}
              className="p-1.5 bg-emerald-900/80 hover:bg-emerald-800 active:scale-95 rounded-xl text-[11px] font-black text-emerald-200 border border-emerald-700 transition cursor-pointer"
            >
              +1 (O)
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
          <span>💡 Tap 🇮🇳 or 🌐 above to switch system format</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPvNumber(Math.floor(1000000 + Math.random() * 90000000))}
              className="text-amber-400 hover:underline cursor-pointer font-semibold flex items-center gap-1"
            >
              🎲 Random
            </button>
            <button onClick={() => setPvNumber(5321409)} className="text-sky-400 hover:underline cursor-pointer font-semibold">
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Estimation & Rounding Rule Simulator
  if (titleLower.includes("estimate") || titleLower.includes("estimation") || titleLower.includes("round") || titleLower.includes("rounding")) {
    const p = roundPlace; // 10, 100, 1000
    const lowerBound = Math.floor(roundNum / p) * p;
    const upperBound = lowerBound + p;
    const midPoint = lowerBound + (p / 2);
    const roundedValue = roundNum >= midPoint ? upperBound : lowerBound;
    const roundsUp = roundNum >= midPoint;
    
    // Key digit to check
    let targetDigitName = "Ones";
    let targetDigitValue = 0;
    if (p === 10) {
      targetDigitName = "Ones digit";
      targetDigitValue = Math.abs(roundNum) % 10;
    } else if (p === 100) {
      targetDigitName = "Tens digit";
      targetDigitValue = Math.floor((Math.abs(roundNum) % 100) / 10);
    } else {
      targetDigitName = "Hundreds digit";
      targetDigitValue = Math.floor((Math.abs(roundNum) % 1000) / 100);
    }

    return (
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-5 text-white flex flex-col justify-between h-full min-h-0 shadow-inner relative overflow-y-auto space-y-3">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2 shrink-0 gap-2">
          <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
            🎯 Estimation & Rounding Simulator
          </span>
          
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-[10px] font-extrabold select-none">
            <button
              onClick={() => setRoundPlace(10)}
              className={`px-2 py-1 rounded-lg transition cursor-pointer ${roundPlace === 10 ? "bg-amber-600 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"}`}
            >
              Nearest 10
            </button>
            <button
              onClick={() => setRoundPlace(100)}
              className={`px-2 py-1 rounded-lg transition cursor-pointer ${roundPlace === 100 ? "bg-amber-600 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"}`}
            >
              Nearest 100
            </button>
            <button
              onClick={() => setRoundPlace(1000)}
              className={`px-2 py-1 rounded-lg transition cursor-pointer ${roundPlace === 1000 ? "bg-amber-600 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"}`}
            >
              Nearest 1000
            </button>
          </div>
        </div>

        <div className="space-y-3 my-auto">
          {/* Active Number & Result */}
          <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-3 text-center space-y-1.5 shadow-inner">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
              Test Number vs Rounded Result
            </span>
            
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">{roundNum}</span>
              <span className="text-slate-500 font-bold text-xl">➔</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-600/80 shadow-xs">
                {roundedValue}
              </span>
            </div>
          </div>

          {/* Rule Breakdown Card */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-black uppercase text-amber-400">
              <span>Rule Check ({targetDigitName})</span>
              <span className={`px-2 py-0.5 rounded text-[10px] ${roundsUp ? "bg-emerald-900 text-emerald-200 border border-emerald-700" : "bg-sky-900 text-sky-200 border border-sky-700"}`}>
                {targetDigitValue >= 5 ? `Digit ${targetDigitValue} ≥ 5 (ROUND UP)` : `Digit ${targetDigitValue} < 5 (ROUND DOWN)`}
              </span>
            </div>

            {/* Visual Scale representation */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                <span className={!roundsUp ? "text-emerald-400 font-black" : ""}>{lowerBound} (Down)</span>
                <span className="text-amber-400 font-extrabold">Midpoint: {midPoint}</span>
                <span className={roundsUp ? "text-emerald-400 font-black" : ""}>{upperBound} (Up)</span>
              </div>
              
              <div className="relative w-full h-3 bg-slate-800 rounded-full border border-slate-700 overflow-hidden">
                <div 
                  className={`absolute top-0 bottom-0 ${roundsUp ? "bg-emerald-500" : "bg-sky-500"}`}
                  style={{
                    left: `${Math.max(0, Math.min(100, ((roundNum - lowerBound) / p) * 100))}%`,
                    width: '8px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            <button
              onClick={() => setRoundNum(73)}
              className={`p-1.5 rounded-xl text-[11px] font-extrabold transition cursor-pointer border ${roundNum === 73 ? "bg-amber-600 text-white border-amber-400" : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"}`}
            >
              73
            </button>
            <button
              onClick={() => setRoundNum(78)}
              className={`p-1.5 rounded-xl text-[11px] font-extrabold transition cursor-pointer border ${roundNum === 78 ? "bg-amber-600 text-white border-amber-400" : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"}`}
            >
              78
            </button>
            <button
              onClick={() => setRoundNum(452)}
              className={`p-1.5 rounded-xl text-[11px] font-extrabold transition cursor-pointer border ${roundNum === 452 ? "bg-amber-600 text-white border-amber-400" : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"}`}
            >
              452
            </button>
            <button
              onClick={() => setRoundNum(9865)}
              className={`p-1.5 rounded-xl text-[11px] font-extrabold transition cursor-pointer border ${roundNum === 9865 ? "bg-amber-600 text-white border-amber-400" : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"}`}
            >
              9865
            </button>
          </div>
        </div>

        {/* Footer controls */}
        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
          <span>💡 Adjust number:</span>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setRoundNum(prev => Math.max(0, prev - 5))} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 font-bold border border-slate-700 cursor-pointer">-5</button>
            <button onClick={() => setRoundNum(prev => prev + 5)} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 font-bold border border-slate-700 cursor-pointer">+5</button>
            <button onClick={() => setRoundNum(Math.floor(Math.random() * 999) + 1)} className="text-amber-400 hover:underline font-semibold ml-1 cursor-pointer">🎲 Random</button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Roman Numeral Simulator
  if (titleLower.includes("roman")) {
    const toRoman = (num: number) => {
      const lookup: { [key: string]: number } = {
        M: 1000, CM: 900, D: 500, CD: 400,
        C: 100, XC: 90, L: 50, XL: 40,
        X: 10, IX: 9, V: 5, IV: 4, I: 1
      };
      let roman = "";
      let n = num;
      for (let i in lookup) {
        while (n >= lookup[i]) {
          roman += i;
          n -= lookup[i];
        }
      }
      return roman || "N/A";
    };

    return (
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-5 text-white flex flex-col justify-between h-full min-h-0 shadow-inner relative overflow-y-auto space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 shrink-0">
          <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
            🏛️ Roman Numerals Converter
          </span>
          <span className="text-[10px] bg-amber-900/60 text-amber-200 px-2 py-0.5 rounded border border-amber-700">
            Interactive
          </span>
        </div>

        <div className="space-y-3 my-auto">
          <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-4 text-center space-y-2 shadow-inner">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
              Hindu-Arabic to Roman Numeral
            </span>
            <div className="flex items-center justify-center gap-4">
              <span className="text-2xl sm:text-3xl font-black text-sky-300 font-mono">{romanNum}</span>
              <span className="text-amber-500 text-xl font-bold">➔</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-serif tracking-widest bg-amber-950/60 px-4 py-1 rounded-xl border border-amber-600/80 shadow-xs">
                {toRoman(romanNum)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center bg-slate-950 p-2 rounded-2xl border border-slate-800 text-[10px] font-extrabold">
            <div><span className="text-amber-400 block font-serif text-xs">I</span><span className="text-slate-400">1</span></div>
            <div><span className="text-amber-400 block font-serif text-xs">V</span><span className="text-slate-400">5</span></div>
            <div><span className="text-amber-400 block font-serif text-xs">X</span><span className="text-slate-400">10</span></div>
            <div><span className="text-amber-400 block font-serif text-xs">L</span><span className="text-slate-400">50</span></div>
            <div><span className="text-amber-400 block font-serif text-xs">C</span><span className="text-slate-400">100</span></div>
            <div><span className="text-amber-400 block font-serif text-xs">D</span><span className="text-slate-400">500</span></div>
            <div><span className="text-amber-400 block font-serif text-xs">M</span><span className="text-slate-400">1000</span></div>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            <button onClick={() => setRomanNum(4)} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-amber-200 border border-slate-700 transition cursor-pointer">4 (IV)</button>
            <button onClick={() => setRomanNum(9)} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-amber-200 border border-slate-700 transition cursor-pointer">9 (IX)</button>
            <button onClick={() => setRomanNum(40)} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-amber-200 border border-slate-700 transition cursor-pointer">40 (XL)</button>
            <button onClick={() => setRomanNum(90)} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-amber-200 border border-slate-700 transition cursor-pointer">90 (XC)</button>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between shrink-0">
          <span>💡 Repeat symbol up to 3 times (e.g., III = 3)</span>
          <div className="flex gap-1">
            <button onClick={() => setRomanNum(p => Math.max(1, p - 1))} className="px-2 py-0.5 bg-slate-800 rounded font-bold cursor-pointer">-1</button>
            <button onClick={() => setRomanNum(p => Math.min(3999, p + 1))} className="px-2 py-0.5 bg-slate-800 rounded font-bold cursor-pointer">+1</button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Fraction Simulator
  if (titleLower.includes("fraction") || titleLower.includes("numerator") || titleLower.includes("denominator")) {
    const fractionPercent = Math.round((fracNum / fracDen) * 100);
    return (
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-5 text-white flex flex-col justify-between h-full min-h-0 shadow-inner relative overflow-y-auto space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 shrink-0">
          <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
            🍕 Fraction Visual Simulator
          </span>
          <span className="text-[10px] bg-amber-900/60 text-amber-200 px-2 py-0.5 rounded border border-amber-700">
            Interactive
          </span>
        </div>

        <div className="space-y-4 my-auto">
          <div className="flex items-center justify-center gap-6">
            <div className="text-center font-mono font-black text-3xl text-amber-300 bg-slate-950 p-4 rounded-2xl border border-amber-500/40 w-24">
              <div>{fracNum}</div>
              <div className="border-t-2 border-amber-400 my-1" />
              <div>{fracDen}</div>
            </div>

            <div className="flex-1 space-y-2">
              <span className="text-[11px] font-bold text-slate-300 block">
                Visual Area Shaded ({fractionPercent}%):
              </span>
              <div className="w-full bg-slate-800 h-8 rounded-xl overflow-hidden border border-slate-700 flex">
                {Array.from({ length: fracDen }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-full border-r border-slate-900 transition-all ${
                      i < fracNum ? "bg-amber-500" : "bg-slate-800"
                    }`}
                    style={{ width: `${100 / fracDen}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between bg-slate-800 p-2 rounded-xl border border-slate-700">
              <span className="text-slate-300 font-bold">Numerator:</span>
              <div className="flex gap-1">
                <button
                  disabled={fracNum <= 1}
                  onClick={() => setFracNum((prev) => Math.max(1, prev - 1))}
                  className="w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded text-white font-bold cursor-pointer disabled:opacity-30"
                >
                  -
                </button>
                <span className="font-extrabold w-4 text-center">{fracNum}</span>
                <button
                  disabled={fracNum >= fracDen}
                  onClick={() => setFracNum((prev) => Math.min(fracDen, prev + 1))}
                  className="w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded text-white font-bold cursor-pointer disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between bg-slate-800 p-2 rounded-xl border border-slate-700">
              <span className="text-slate-300 font-bold">Denominator:</span>
              <div className="flex gap-1">
                <button
                  disabled={fracDen <= 2}
                  onClick={() => {
                    setFracDen((prev) => {
                      const next = Math.max(2, prev - 1);
                      if (fracNum > next) setFracNum(next);
                      return next;
                    });
                  }}
                  className="w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded text-white font-bold cursor-pointer disabled:opacity-30"
                >
                  -
                </button>
                <span className="font-extrabold w-4 text-center">{fracDen}</span>
                <button
                  disabled={fracDen >= 12}
                  onClick={() => setFracDen((prev) => Math.min(12, prev + 1))}
                  className="w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded text-white font-bold cursor-pointer disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between shrink-0">
          <span>💡 Numerator = Parts taken | Denominator = Total equal parts</span>
        </div>
      </div>
    );
  }

  // 5. Integers & Number Line Simulator
  if (
    titleLower.includes("integer") ||
    titleLower.includes("negative") ||
    titleLower.includes("positive") ||
    titleLower.includes("real number")
  ) {
    const isNegative = integerVal < 0;
    const isPositive = integerVal > 0;
    const absValue = Math.abs(integerVal);
    const oppositeValue = -integerVal;

    let tempDesc = integerVal === 0 ? "0°C (Freezing Point of Water)" : integerVal > 0 ? `${integerVal}°C Above Zero (Warm)` : `${Math.abs(integerVal)}°C Below Freezing (Cold)`;
    let profitDesc = integerVal === 0 ? "₹0 (No Profit, No Loss)" : integerVal > 0 ? `+₹${integerVal} Profit / Gain` : `-₹${Math.abs(integerVal)} Loss / Debt`;
    let elevationDesc = integerVal === 0 ? "0m Sea Level (Coastline)" : integerVal > 0 ? `+${integerVal}m Above Sea Level (Mountain)` : `-${Math.abs(integerVal)}m Below Sea Level (Deep Sea)`;

    const sumResult = integerVal + secondIntVal;

    return (
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-5 text-white flex flex-col justify-between h-full min-h-0 shadow-inner relative overflow-y-auto space-y-3">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2 shrink-0 gap-2">
          <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
            🔢 Integers & Number Line Simulator
          </span>
          
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-[10px] font-extrabold select-none">
            <button
              onClick={() => setIntegerMode("numberline")}
              className={`px-2 py-1 rounded-lg transition cursor-pointer ${integerMode === "numberline" ? "bg-amber-600 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"}`}
            >
              📏 Number Line
            </button>
            <button
              onClick={() => setIntegerMode("context")}
              className={`px-2 py-1 rounded-lg transition cursor-pointer ${integerMode === "context" ? "bg-amber-600 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"}`}
            >
              🌍 Real Context
            </button>
            <button
              onClick={() => setIntegerMode("operations")}
              className={`px-2 py-1 rounded-lg transition cursor-pointer ${integerMode === "operations" ? "bg-amber-600 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"}`}
            >
              ➕ Jump Math
            </button>
          </div>
        </div>

        <div className="space-y-3 my-auto">
          {/* Main Integer Display Card */}
          <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-3 text-center space-y-2 shadow-inner">
            <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
              <span>Selected Integer (n)</span>
              <span>Opposite (-n): <strong className="text-amber-300 font-mono">{oppositeValue > 0 ? `+${oppositeValue}` : oppositeValue}</strong></span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <span className={`text-3xl sm:text-4xl font-black font-mono px-4 py-1 rounded-2xl border ${
                isNegative ? "bg-sky-950 text-sky-300 border-sky-500/80 shadow-sky-950/50" :
                isPositive ? "bg-emerald-950 text-emerald-300 border-emerald-500/80 shadow-emerald-950/50" :
                "bg-amber-950 text-amber-300 border-amber-500/80 shadow-amber-950/50"
              }`}>
                {integerVal > 0 ? `+${integerVal}` : integerVal}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-[10px] pt-1">
              <div className="bg-slate-900 p-1.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-semibold">Sign</span>
                <span className={`font-black ${isNegative ? "text-sky-400" : isPositive ? "text-emerald-400" : "text-amber-400"}`}>
                  {isNegative ? "Negative (-)" : isPositive ? "Positive (+)" : "Zero (Neutral)"}
                </span>
              </div>
              <div className="bg-slate-900 p-1.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-semibold">Absolute Value</span>
                <span className="font-mono font-black text-amber-300">|{integerVal}| = {absValue}</span>
              </div>
              <div className="bg-slate-900 p-1.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block font-semibold">Position</span>
                <span className="font-semibold text-slate-200">
                  {isNegative ? `${absValue} units Left` : isPositive ? `${absValue} units Right` : "Center Origin"}
                </span>
              </div>
            </div>
          </div>

          {/* MODE 1: Interactive Number Line */}
          {integerMode === "numberline" && (
            <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-3 space-y-2">
              <span className="text-[10px] font-black uppercase text-amber-400 block text-center tracking-wider">
                📍 Integers Number Line (-10 to +10)
              </span>

              {/* Horizontal Number Line Grid */}
              <div className="overflow-x-auto pb-1">
                <div className="flex items-center justify-between min-w-[340px] pt-2 relative">
                  {/* Connecting Axis Line */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-700 -translate-y-1/2 z-0" />

                  {Array.from({ length: 21 }, (_, i) => i - 10).map((n) => {
                    const isSelected = n === integerVal;
                    const isZero = n === 0;
                    const nNeg = n < 0;

                    return (
                      <button
                        key={n}
                        onClick={() => setIntegerVal(n)}
                        className={`relative z-10 flex flex-col items-center group cursor-pointer transition-all ${
                          isSelected ? "scale-125 z-20" : "hover:scale-110"
                        }`}
                      >
                        {/* Top pointer dot / pin */}
                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition ${
                          isSelected ? "bg-amber-400 ring-4 ring-amber-500/40 shadow-lg" :
                          isZero ? "bg-amber-500/80" :
                          nNeg ? "bg-sky-500/80" : "bg-emerald-500/80"
                        }`} />

                        {/* Tick mark */}
                        <div className={`w-0.5 my-1 ${isSelected ? "h-3 bg-amber-400" : "h-2 bg-slate-600"}`} />

                        {/* Label */}
                        <span className={`text-[9px] font-mono font-bold transition ${
                          isSelected ? "text-amber-300 font-black text-[11px]" :
                          isZero ? "text-amber-400 font-extrabold" :
                          nNeg ? "text-sky-300/80" : "text-emerald-300/80"
                        }`}>
                          {n}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: Real-World Contexts */}
          {integerMode === "context" && (
            <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-3 space-y-2 text-xs">
              <span className="text-[10px] font-black uppercase text-amber-400 block tracking-wider">
                🌍 Practical Opposites & NCERT Real-World Examples
              </span>

              <div className="space-y-1.5">
                <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 font-bold">🌡️ Temperature:</span>
                  <span className="font-semibold text-slate-200 text-[11px]">{tempDesc}</span>
                </div>

                <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 font-bold">💰 Profit / Loss:</span>
                  <span className="font-semibold text-slate-200 text-[11px]">{profitDesc}</span>
                </div>

                <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 font-bold">⛰️ Sea Level / Height:</span>
                  <span className="font-semibold text-slate-200 text-[11px]">{elevationDesc}</span>
                </div>
              </div>
            </div>
          )}

          {/* MODE 3: Jump Addition & Subtraction */}
          {integerMode === "operations" && (
            <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-3 space-y-2">
              <span className="text-[10px] font-black uppercase text-amber-400 block text-center tracking-wider">
                ➕ Integer Jump Math ({integerVal} + {secondIntVal} = {sumResult})
              </span>

              <div className="bg-slate-900 p-2.5 rounded-xl border border-amber-500/30 text-center space-y-1">
                <div className="font-mono text-base font-black text-amber-300 flex items-center justify-center gap-2">
                  <span>({integerVal})</span>
                  <span className="text-emerald-400">+</span>
                  <span>({secondIntVal})</span>
                  <span className="text-slate-400">=</span>
                  <span className={`px-2 py-0.5 rounded-lg border ${
                    sumResult < 0 ? "bg-sky-950 text-sky-300 border-sky-600" :
                    sumResult > 0 ? "bg-emerald-950 text-emerald-300 border-emerald-600" :
                    "bg-amber-950 text-amber-300 border-amber-600"
                  }`}>
                    {sumResult > 0 ? `+${sumResult}` : sumResult}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Start at <strong className="text-white">{integerVal}</strong>, jump <strong className="text-amber-300">{Math.abs(secondIntVal)} steps</strong> {secondIntVal >= 0 ? "RIGHT ➡️" : "LEFT ⬅️"} to land on <strong className="text-emerald-300">{sumResult}</strong>.
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] bg-slate-900 p-2 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-bold">Second Number:</span>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setSecondIntVal(prev => Math.max(-10, prev - 1))} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 font-bold border border-slate-700 cursor-pointer">-1</button>
                  <span className="font-mono font-bold text-amber-300 w-6 text-center">{secondIntVal > 0 ? `+${secondIntVal}` : secondIntVal}</span>
                  <button onClick={() => setSecondIntVal(prev => Math.min(10, prev + 1))} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 font-bold border border-slate-700 cursor-pointer">+1</button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Steppers Bar */}
          <div className="grid grid-cols-6 gap-1 pt-1">
            <button onClick={() => setIntegerVal(-10)} className="p-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-extrabold text-sky-300 border border-slate-700 cursor-pointer">-10</button>
            <button onClick={() => setIntegerVal(prev => Math.max(-10, prev - 1))} className="p-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-extrabold text-sky-300 border border-slate-700 cursor-pointer">-1</button>
            <button onClick={() => setIntegerVal(0)} className="p-1 bg-amber-900/60 hover:bg-amber-800/80 rounded-lg text-[10px] font-extrabold text-amber-200 border border-amber-700 cursor-pointer">0</button>
            <button onClick={() => setIntegerVal(prev => Math.min(10, prev + 1))} className="p-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-extrabold text-emerald-300 border border-slate-700 cursor-pointer">+1</button>
            <button onClick={() => setIntegerVal(10)} className="p-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-extrabold text-emerald-300 border border-slate-700 cursor-pointer">+10</button>
            <button onClick={() => setIntegerVal(Math.floor(Math.random() * 21) - 10)} className="p-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-extrabold text-amber-400 border border-slate-700 cursor-pointer">🎲</button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
          <span>💡 Left of 0 = Negative (-) | Right of 0 = Positive (+)</span>
          <button onClick={() => setIntegerVal(-3)} className="text-amber-400 hover:underline cursor-pointer font-bold">
            Reset
          </button>
        </div>
      </div>
    );
  }

  // Default Interactive Concept Knowledge Simulator
  return (
    <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-5 text-white flex flex-col justify-between h-full min-h-0 shadow-inner relative overflow-y-auto space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 shrink-0">
        <span className="text-xs font-black uppercase text-indigo-400 tracking-wider flex items-center gap-2">
          ⚡ Interactive Concept Check
        </span>
        <span className="text-[10px] bg-indigo-900/60 text-indigo-200 px-2 py-0.5 rounded border border-indigo-700">
          Simulator
        </span>
      </div>

      <div className="space-y-4 my-auto">
        <div className="bg-slate-950 border border-indigo-500/30 rounded-2xl p-4 space-y-2">
          <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
            ❓ Concept Check Question
          </span>
          <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed">
            How does <strong>{stripGradeBrackets(slide.title)}</strong> help solve practical NCERT problems?
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => setInteractiveAns(1)}
            className={`p-3 rounded-xl text-xs font-extrabold text-left transition border cursor-pointer ${
              interactiveAns === 1
                ? "bg-emerald-900/80 text-emerald-200 border-emerald-500"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
            }`}
          >
            <span>A) By applying systematic mathematical rules and structures</span>
          </button>
          <button
            onClick={() => setInteractiveAns(2)}
            className={`p-3 rounded-xl text-xs font-extrabold text-left transition border cursor-pointer ${
              interactiveAns === 2
                ? "bg-emerald-900/80 text-emerald-200 border-emerald-500"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
            }`}
          >
            <span>B) By enabling direct estimation and calculation models</span>
          </button>
        </div>

        {interactiveAns !== null && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-xs text-emerald-200 font-bold space-y-1 animate-fade-in">
            <span>🎉 Excellent! Both choices reinforce this fundamental concept.</span>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between items-center shrink-0">
        <span>💡 Tap choices above to test your understanding</span>
        <button
          onClick={() => onSwitchTab("interactive")}
          className="text-sky-400 hover:underline text-[11px] font-bold"
        >
          Open Visual Studio →
        </button>
      </div>
    </div>
  );
}

// Interactive Textbook Lesson Slide Deck Component
interface LessonSlideDeckProps {
  lesson: any;
  selectedChapter: Chapter;
  onTakeTopicQuiz: (topicTitle: string) => void;
  onSwitchTab: (tab: "textbook" | "interactive" | "notes" | "topic_quiz" | "worksheet") => void;
  onBackToChapters?: () => void;
}

function LessonSlideDeck({
  lesson,
  selectedChapter,
  onTakeTopicQuiz,
  onSwitchTab,
  onBackToChapters
}: LessonSlideDeckProps) {
  const [slideIndex, setSlideIndex] = React.useState<number>(0);

  // Reset slide index when chapter changes
  React.useEffect(() => {
    setSlideIndex(0);
  }, [selectedChapter]);

  // Construct slides list - ONLY Intro, Topic division slides, and Outro
  const slides = React.useMemo(() => {
    if (!lesson) return [];
    const list: Array<{
      id: string;
      type: "intro" | "topic" | "outro";
      title: string;
      data?: any;
    }> = [];

    const chCode = (selectedChapter?.id || "CH").toUpperCase().replace(/_/g, "-");

    // Intro Slide (S1)
    list.push({
      id: `${chCode}-S1`,
      type: "intro",
      title: lesson.title || selectedChapter.title,
      data: {
        introduction: lesson.introduction,
        stepCount: lesson.steps?.length || 0,
        steps: lesson.steps || []
      }
    });

    // Step Topics ("Topic Division" slides)
    if (lesson.steps && lesson.steps.length > 0) {
      lesson.steps.forEach((step: any, idx: number) => {
        list.push({
          id: `${chCode}-S${list.length + 1}`,
          type: "topic",
          title: step.title,
          data: { ...step, index: idx + 1, total: lesson.steps.length }
        });
      });
    }

    // Outro Slide
    list.push({
      id: `${chCode}-S${list.length + 1}`,
      type: "outro",
      title: "Lesson Slides Complete!"
    });

    return list;
  }, [lesson, selectedChapter]);

  // Keyboard navigation listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        setSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setSlideIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const currentSlide = slides[slideIndex] || slides[0];
  const progressPercent = Math.round(((slideIndex + 1) / slides.length) * 100);

  const handleNext = () => setSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
  const handlePrev = () => setSlideIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex flex-col h-full w-full max-w-full min-w-0 min-h-0 overflow-hidden p-2 sm:p-3 gap-3 animate-fade-in" id="lesson_slide_deck_wrapper">
      {/* Top Controls Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-2.5 px-3 flex flex-wrap items-center justify-between gap-3 shadow-md border border-slate-800 shrink-0">
        {/* Title & Progress Badge */}
        <div className="flex items-center gap-3">
          {onBackToChapters && (
            <button
              onClick={onBackToChapters}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 transition cursor-pointer active:scale-95 shrink-0"
              title="Back to Chapters"
              id="btn_slide_header_back_to_chapters"
            >
              <ArrowLeft size={14} />
              <span>Back to Chapters</span>
            </button>
          )}
          <span className="bg-sky-500 text-white text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
            <Monitor size={14} />
            <span>Slide {slideIndex + 1} of {slides.length}</span>
            <span className="bg-sky-950/80 text-amber-300 font-mono text-[11px] font-black px-2 py-0.5 rounded-md border border-sky-300/40 ml-1">
              ID: {currentSlide.id}
            </span>
          </span>

          <span className="text-xs font-bold text-slate-300 hidden md:inline truncate max-w-[200px]">
            {lesson?.title || selectedChapter.title}
          </span>

          <div className="w-20 sm:w-32 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700 hidden sm:block">
            <div
              className="bg-sky-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Slide Presentation Card */}
      <div id={`slide-${currentSlide.id.toLowerCase()}`} className="bg-white border-2 border-sky-100 rounded-3xl shadow-md p-3 sm:p-5 flex-1 min-h-0 flex flex-col justify-between transition-all duration-300 relative overflow-hidden space-y-3">
        
        {/* Top Slim Progress Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-amber-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Slide Body Content - TWO COLUMN LAYOUT (Left: Text, Right: Simulator) */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col justify-center my-1">

          {/* 1. INTRO SLIDE */}
          {currentSlide.type === "intro" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch h-full min-h-0 my-auto animate-fade-in">
              {/* Left Column: Text & Stats */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-2.5 h-full min-h-0 overflow-hidden">
                <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-inner space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-sky-400/20 text-sky-200 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border border-sky-300/30 tracking-wider flex items-center gap-1">
                        📖 NCERT Lesson Slide Deck
                      </span>
                      <span className="bg-amber-400 text-slate-950 text-[10px] font-mono font-black px-2 py-0.5 rounded-md shadow-2xs">
                        ID: {currentSlide.id}
                      </span>
                    </div>

                    <button
                      onClick={() => playSpeechWithLang(`${lesson.title}. ${lesson.introduction}`, "en-US")}
                      className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-sky-100 font-bold px-3 py-1.5 rounded-lg text-xs transition cursor-pointer active:scale-95 border border-white/20"
                    >
                      <Volume2 size={14} />
                      <span>Listen</span>
                    </button>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight break-words">
                    {stripGradeBrackets(lesson.title)}
                  </h2>

                  {lesson.introduction && (
                    <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed font-medium break-words">
                      {lesson.introduction}
                    </p>
                  )}
                </div>

                {/* Lesson Overview Quick Stats Badges */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-2.5 space-y-0.5">
                    <span className="text-[10px] font-black text-amber-900 uppercase block tracking-wider">
                      💡 Key Topics & Examples
                    </span>
                    <p className="text-base font-black text-amber-950">
                      {currentSlide.data.stepCount} Topics
                    </p>
                  </div>

                  <div className="bg-indigo-50 border border-indigo-200/80 rounded-xl p-2.5 space-y-0.5">
                    <span className="text-[10px] font-black text-indigo-900 uppercase block tracking-wider">
                      🎯 Topic Quiz
                    </span>
                    <p className="text-base font-black text-indigo-950">
                      Interactive
                    </p>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition shadow-md"
                  >
                    <span>Start Lesson Presentation</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Right Column: Simulator */}
              <div className="lg:col-span-6 flex flex-col h-full min-h-0 overflow-hidden">
                <SlideInteractiveSimulator
                  slide={currentSlide}
                  selectedChapter={selectedChapter}
                  onSwitchTab={onSwitchTab}
                />
              </div>
            </div>
          )}

          {/* 2. TOPIC DIVISION SLIDE */}
          {currentSlide.type === "topic" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch h-full min-h-0 my-auto animate-fade-in">
              {/* Left Column: Topic Text & Real World Example */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-3 h-full min-h-0 overflow-y-auto pr-1">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                        Topic Division {currentSlide.data.index} of {currentSlide.data.total}
                      </span>
                      <span className="bg-amber-950 text-amber-300 border border-amber-500/50 text-[10px] font-mono font-black px-2 py-0.5 rounded-md shadow-2xs">
                        ID: {currentSlide.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => playSpeechWithLang(`${currentSlide.data.title}. ${currentSlide.data.desc}`, "en-US")}
                        className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-lg text-xs transition cursor-pointer active:scale-95 border border-amber-200"
                      >
                        <Volume2 size={14} />
                        <span>Listen</span>
                      </button>

                      <button
                        onClick={() => onTakeTopicQuiz(currentSlide.data.title)}
                        className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer transition shadow-2xs"
                      >
                        <span>🎯</span>
                        <span>Quiz</span>
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-amber-950 flex items-center gap-2.5">
                    <span className="w-7 h-7 bg-amber-500 text-white rounded-xl flex items-center justify-center text-xs font-black shrink-0 shadow-2xs">
                      {currentSlide.data.index}
                    </span>
                    {stripGradeBrackets(currentSlide.data.title)}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed whitespace-pre-line bg-amber-50/40 p-3 rounded-2xl border border-amber-200/90">
                    {currentSlide.data.desc}
                  </p>

                  {currentSlide.data.example && (
                    <div className="bg-white border-2 border-amber-300/80 rounded-2xl p-3 text-xs text-slate-800 font-semibold space-y-1 shadow-2xs">
                      <span className="text-[11px] font-extrabold uppercase text-amber-800 flex items-center gap-1 tracking-wider">
                        <span>💡</span> <span>Real-World Example:</span>
                      </span>
                      <p className="break-words leading-relaxed text-slate-700">
                        {currentSlide.data.example}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Simulator */}
              <div className="lg:col-span-6 flex flex-col h-full min-h-0 overflow-hidden">
                <SlideInteractiveSimulator
                  slide={currentSlide}
                  selectedChapter={selectedChapter}
                  onSwitchTab={onSwitchTab}
                />
              </div>
            </div>
          )}

          {/* 4. OUTRO SLIDE */}
          {currentSlide.type === "outro" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch h-full min-h-0 my-auto animate-fade-in">
              {/* Left Column: Celebration & Replay */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-3 h-full min-h-0 overflow-y-auto pr-1 text-center lg:text-left py-2">
                <div className="space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 border-2 border-emerald-300 text-emerald-700 rounded-2xl flex items-center justify-center text-2xl shadow-inner mx-auto lg:mx-0">
                    🎉
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                      <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                        Summary
                      </span>
                      <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-[10px] font-mono font-black px-2 py-0.5 rounded-md shadow-2xs">
                        ID: {currentSlide.id}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Presentation Complete!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      Great job reviewing <strong>{lesson.title}</strong>. Take the quiz or jump into visual studio next!
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setSlideIndex(0)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs inline-flex items-center gap-1.5 cursor-pointer transition border border-slate-300"
                  >
                    <RotateCcw size={14} />
                    <span>Replay Presentation</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Interactive Recap Simulator */}
              <div className="lg:col-span-6 flex flex-col h-full min-h-0 overflow-hidden">
                <SlideInteractiveSimulator
                  slide={currentSlide}
                  selectedChapter={selectedChapter}
                  onSwitchTab={onSwitchTab}
                />
              </div>
            </div>
          )}

        </div>

        {/* Bottom Slide Navigation Bar */}
        <div className="border-t border-slate-200/90 pt-3 shrink-0 flex flex-row items-center justify-between gap-2 select-none">
          {/* Previous Button */}
          <button
            disabled={slideIndex === 0}
            onClick={handlePrev}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-extrabold text-xs inline-flex items-center justify-center gap-1.5 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer border border-slate-300/80"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          {/* Slide Dots / Quick Jumper with Slide IDs */}
          <div className="flex items-center gap-1.5 max-w-full overflow-x-auto py-1 px-2 scrollbar-none">
            {slides.map((s, idx) => (
              <button
                key={s.id || idx}
                onClick={() => setSlideIndex(idx)}
                className={`transition-all cursor-pointer rounded-xl px-2.5 py-1 text-[11px] font-mono font-black flex items-center gap-1 shrink-0 ${
                  slideIndex === idx
                    ? "bg-sky-600 text-white shadow-2xs scale-105"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                }`}
                title={`Jump to ${s.id}: ${s.title}`}
              >
                <span>{s.id}</span>
              </button>
            ))}
          </div>

          {/* Next / Finish Button */}
          {slideIndex < slides.length - 1 ? (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-extrabold text-xs inline-flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <span>Next Slide</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => onSwitchTab("topic_quiz")}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-xs inline-flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <span>Finish & Take Quiz</span>
              <Award size={16} />
            </button>
          )}
        </div>

      </div>

    </div>
  );
}

export default function LessonSection({
  selectedChapter,
  initialTab,
  onOpenTool,
  onOpenWorksheet,
  onActionComplete,
  onQuizComplete,
  onBackToChapters,
  selectedGrade,
  selectedSubject,
  onQuizViewToggle
}: LessonSectionProps) {
  const lesson = LESSONS_DATA[selectedChapter.id];

  // States for sub-pages
  const [selectedFractionPage, setSelectedFractionPage] = React.useState<"proper" | "improper" | "mixed" | null>(null);
  const [properNum, setProperNum] = React.useState<number>(3);
  const [improperNum, setImproperNum] = React.useState<number>(5);
  const [mixedWhole, setMixedWhole] = React.useState<number>(2);
  const [mixedNum, setMixedNum] = React.useState<number>(1);

  // Quiz states
  const [properQuizFeedback, setProperQuizFeedback] = React.useState<string | null>(null);
  const [properQuizSuccess, setProperQuizSuccess] = React.useState<boolean | null>(null);
  const [improperQuizFeedback, setImproperQuizFeedback] = React.useState<string | null>(null);
  const [improperQuizSuccess, setImproperQuizSuccess] = React.useState<boolean | null>(null);
  const [mixedQuizFeedback, setMixedQuizFeedback] = React.useState<string | null>(null);
  const [mixedQuizSuccess, setMixedQuizSuccess] = React.useState<boolean | null>(null);

  const [selectedNumberPage, setSelectedNumberPage] = React.useState<"even" | "odd" | "prime" | "composite" | "square" | "multiples" | "divisibility" | "real" | "imaginary" | "whole" | "integers" | null>(null);
  const [selectedG9Topic, setSelectedG9Topic] = React.useState<"rational_intro" | "irrational_numbers" | "decimal_expansions" | "real_operations" | "rationalizing" | "exponent_laws" | null>(null);
  const [g1SecretOpen, setG1SecretOpen] = React.useState<boolean>(false);
  const [selectedQuizTopic, setSelectedQuizTopic] = React.useState<string | null>(null);
  const [activeChapterTab, setActiveChapterTab] = React.useState<"textbook" | "interactive" | "notes" | "topic_quiz" | "worksheet">(
    initialTab || (selectedChapter.id.startsWith("g1_") ? "interactive" : "textbook")
  );

  const isQuizCompletedState = useState<boolean>(false);
  const isQuizCompleted = isQuizCompletedState[0];
  const setIsQuizCompleted = isQuizCompletedState[1];

  const isGrade6or9 = selectedGrade === 6 || selectedGrade === 9 || selectedChapter.id.startsWith("g6_") || selectedChapter.id.startsWith("g9_") || !selectedChapter.id.startsWith("g1_");

  React.useEffect(() => {
    setSelectedFractionPage(null);
    setSelectedNumberPage(null);
    setSelectedG9Topic(null);
    setSelectedQuizTopic(null);
    setG1SecretOpen(false);
    setIsQuizCompleted(false);
    setActiveChapterTab(initialTab || (selectedChapter.id.startsWith("g1_") ? "interactive" : "textbook"));
  }, [selectedChapter, initialTab]);

  React.useEffect(() => {
    const isImmersiveMode =
      ((activeChapterTab === "topic_quiz" || activeChapterTab === "worksheet") && !isQuizCompleted) ||
      (activeChapterTab === "textbook");

    if (onQuizViewToggle) {
      onQuizViewToggle(isImmersiveMode);
    }
  }, [activeChapterTab, isQuizCompleted, onQuizViewToggle]);

  const handleToolNavigation = (toolName: string, highlightMode?: string) => {
    const matchedTool = 
      toolName === "fraction" ? "fraction" :
      toolName === "numberline" ? "numberline" :
      toolName === "placevalue" ? "placevalue" :
      toolName === "typesofnumbers" ? "typesofnumbers" :
      toolName === "clock" ? "clock" : "perimeter";
      
    onOpenTool(matchedTool, highlightMode);
    if (onActionComplete) onActionComplete(5); // Award points for exploring
  };

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-natural-beige-dark rounded-2xl">
        <BookOpen size={48} className="text-natural-sage animate-pulse mb-4" />
        <p className="text-sm font-semibold text-natural-dark">
          Lesson content for this chapter is preparing! Choose another topic from the dashboard.
        </p>
      </div>
    );
  }

  // Render proper fraction study sub-page
  if (selectedFractionPage === "proper") {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-natural-beige-dark overflow-hidden animate-fade-in" id="lesson_viewport">
        {/* Subpage Header */}
        <div className="bg-gradient-to-r from-natural-dark to-[#494933] p-5 text-white flex items-center gap-3">
          <button
            onClick={() => {
              setSelectedFractionPage(null);
              setProperQuizFeedback(null);
              setProperQuizSuccess(null);
            }}
            className="p-1.5 hover:bg-white/10 rounded-lg text-natural-cream hover:text-white cursor-pointer transition flex items-center justify-center shrink-0 border border-white/15"
            id="btn_back_from_proper"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="text-base font-black tracking-tight">Proper Fractions</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Definition card */}
          <div className="bg-natural-beige-light border border-natural-beige-dark/60 p-4 rounded-xl space-y-1.5">
            <h3 className="text-xs font-extrabold text-natural-dark uppercase tracking-wider flex items-center gap-1">
              <span className="w-1 h-3.5 bg-natural-terracotta rounded-full" /> What is a Proper Fraction?
            </h3>
            <p className="text-xs text-natural-sage leading-relaxed">
              A fraction is called a <strong>Proper Fraction</strong> when its <strong>Numerator</strong> (the top number) is <strong>smaller</strong> than its <strong>Denominator</strong> (the bottom number). It represents a value strictly less than 1 whole.
            </p>
            <div className="bg-white border border-natural-beige-dark/40 p-2 rounded-lg font-mono text-center text-xs text-natural-dark mt-2 font-bold">
              Numerator &lt; Denominator &nbsp;|&nbsp; e.g., <span className="text-natural-terracotta font-extrabold">3</span> &lt; <span className="text-natural-primary font-extrabold">5</span> (Proper)
            </div>
          </div>

          {/* Interactive Visualizer */}
          <div className="bg-white border border-natural-beige-dark p-4 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-natural-dark">Visual Slice Cake (Proper)</h4>
                <p className="text-[10px] text-natural-sage">Interact and watch the shaded parts</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={properNum <= 1}
                  onClick={() => setProperNum(prev => prev - 1)}
                  className="w-7 h-7 rounded-lg bg-natural-beige-light border border-natural-beige-dark flex items-center justify-center text-natural-dark hover:bg-natural-beige-dark/30 transition disabled:opacity-45 font-bold text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="font-mono text-xs font-black text-natural-dark px-2 bg-natural-cream rounded border border-natural-beige-dark/40">
                  {properNum} / 6
                </span>
                <button
                  disabled={properNum >= 5}
                  onClick={() => setProperNum(prev => prev + 1)}
                  className="w-7 h-7 rounded-lg bg-natural-beige-light border border-natural-beige-dark flex items-center justify-center text-natural-dark hover:bg-natural-beige-dark/30 transition disabled:opacity-45 font-bold text-sm cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Display Math representation & Circle Slices */}
            <div className="flex flex-col items-center justify-center py-3 bg-natural-beige-light/30 border border-dashed border-natural-beige-dark rounded-xl gap-4">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {[0, 1, 2, 3, 4, 5].map((i) => {
                    const isShaded = i < properNum;
                    const angleStart = i * 60;
                    const angleEnd = (i + 1) * 60;
                    
                    const radStart = (angleStart * Math.PI) / 180;
                    const radEnd = (angleEnd * Math.PI) / 180;
                    
                    const x1 = 50 + 42 * Math.cos(radStart);
                    const y1 = 50 + 42 * Math.sin(radStart);
                    const x2 = 50 + 42 * Math.cos(radEnd);
                    const y2 = 50 + 42 * Math.sin(radEnd);
                    
                    const pathData = `M 50 50 L ${x1} ${y1} A 42 42 0 0 1 ${x2} ${y2} Z`;
                    
                    return (
                      <path
                        key={i}
                        d={pathData}
                        className={`transition-all duration-300 stroke-white stroke-[2px] ${
                          isShaded ? "fill-natural-terracotta" : "fill-natural-beige-light/80"
                        }`}
                      />
                    );
                  })}
                  <circle cx="50" cy="50" r="4" className="fill-natural-dark" />
                </svg>
              </div>

              {/* Text analysis */}
              <div className="text-center space-y-1">
                <span className="text-xs text-natural-sage block">Mathematical Value:</span>
                <div className="flex items-center justify-center gap-1.5 text-lg font-black text-natural-dark font-sans">
                  <TextbookFraction num={properNum} den={6} size="md" />
                  <span>=</span>
                  <span className="text-natural-terracotta">{(properNum / 6).toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-natural-dark bg-natural-cream border border-natural-terracotta/20 px-3 py-1 rounded-full font-semibold">
                  Numerator ({properNum}) &lt; Denominator (6) &rarr; <span className="text-natural-terracotta font-extrabold">Proper Fraction!</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Quiz */}
          <div className="bg-natural-cream border border-natural-terracotta/20 p-4 rounded-xl space-y-3">
            <h4 className="text-xs font-black text-natural-terracotta uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle size={14} /> Quick Check Quiz
            </h4>
            <p className="text-xs text-natural-dark font-medium">Which of the following is a PROPER fraction?</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { fraction: "3 / 4", isCorrect: true, feedback: "Correct! Numerator 3 is smaller than denominator 4." },
                { fraction: "9 / 5", isCorrect: false, feedback: "Incorrect. 9/5 is an improper fraction because numerator 9 is larger than denominator 5." },
                { fraction: "8 / 3", isCorrect: false, feedback: "Incorrect. 8/3 is improper because 8 > 3." },
                { fraction: "12 / 12", isCorrect: false, feedback: "Incorrect. 12/12 equals exactly 1 whole, making it an improper fraction." }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setProperQuizFeedback(opt.feedback);
                    setProperQuizSuccess(opt.isCorrect);
                  }}
                  className={`p-2.5 bg-white border rounded-xl text-xs font-bold transition cursor-pointer text-natural-dark ${
                    properQuizFeedback === opt.feedback 
                      ? opt.isCorrect ? "border-natural-primary bg-natural-beige-light/30 text-natural-dark" : "border-natural-terracotta bg-natural-cream/30 text-natural-terracotta" 
                      : "border-natural-beige-dark hover:border-natural-terracotta"
                  }`}
                >
                  {opt.fraction}
                </button>
              ))}
            </div>

            {properQuizFeedback && (
              <div className={`p-3 rounded-lg text-xs leading-normal border animate-fade-in ${
                properQuizSuccess 
                  ? "bg-[#e7f0e3] border-natural-primary/30 text-natural-dark" 
                  : "bg-natural-cream border-natural-terracotta/20 text-natural-dark"
              }`}>
                {properQuizFeedback}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render improper fraction study sub-page
  if (selectedFractionPage === "improper") {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-natural-beige-dark overflow-hidden animate-fade-in" id="lesson_viewport">
        {/* Subpage Header */}
        <div className="bg-gradient-to-r from-natural-dark to-[#494933] p-5 text-white flex items-center gap-3">
          <button
            onClick={() => {
              setSelectedFractionPage(null);
              setImproperQuizFeedback(null);
              setImproperQuizSuccess(null);
            }}
            className="p-1.5 hover:bg-white/10 rounded-lg text-natural-cream hover:text-white cursor-pointer transition flex items-center justify-center shrink-0 border border-white/15"
            id="btn_back_from_improper"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="text-base font-black tracking-tight">Improper Fractions</h2>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Definition card */}
          <div className="bg-natural-beige-light border border-natural-beige-dark/60 p-4 rounded-xl space-y-1.5">
            <h3 className="text-xs font-extrabold text-natural-dark uppercase tracking-wider flex items-center gap-1">
              <span className="w-1 h-3.5 bg-natural-terracotta rounded-full" /> What is an Improper Fraction?
            </h3>
            <p className="text-xs text-natural-sage leading-relaxed">
              An <strong>Improper Fraction</strong> has a <strong>Numerator</strong> that is <strong>greater than or equal to</strong> its <strong>Denominator</strong>. It represents a value that is equal to or larger than 1 whole!
            </p>
            <div className="bg-white border border-natural-beige-dark/40 p-2 rounded-lg font-mono text-center text-xs text-natural-dark mt-2 font-bold">
              Numerator &ge; Denominator &nbsp;|&nbsp; e.g., <span className="text-natural-terracotta font-extrabold">7</span> &ge; <span className="text-natural-primary font-extrabold">4</span> (Improper)
            </div>
          </div>

          {/* Interactive Visualizer */}
          <div className="bg-white border border-natural-beige-dark p-4 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-natural-dark">Multi-Whole Visualizer (Improper)</h4>
                <p className="text-[10px] text-natural-sage">Adjust numerator and watch slices overflow</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={improperNum <= 4}
                  onClick={() => setImproperNum(prev => prev - 1)}
                  className="w-7 h-7 rounded-lg bg-natural-beige-light border border-natural-beige-dark flex items-center justify-center text-natural-dark hover:bg-natural-beige-dark/30 transition disabled:opacity-45 font-bold text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="flex items-center justify-center bg-natural-cream px-2 py-1 rounded-lg border border-natural-beige-dark/40 min-w-[3rem] shadow-xs">
                  <TextbookFraction num={improperNum} den={4} size="sm" />
                </span>
                <button
                  disabled={improperNum >= 8}
                  onClick={() => setImproperNum(prev => prev + 1)}
                  className="w-7 h-7 rounded-lg bg-natural-beige-light border border-natural-beige-dark flex items-center justify-center text-natural-dark hover:bg-natural-beige-dark/30 transition disabled:opacity-45 font-bold text-sm cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Slices overflow display */}
            <div className="flex flex-col items-center justify-center py-3 bg-natural-beige-light/30 border border-dashed border-natural-beige-dark rounded-xl gap-4">
              <div className="flex gap-6 justify-center items-center">
                {/* Whole 1 */}
                <div className="relative flex flex-col items-center gap-1">
                  <div className="w-16 h-16">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {[0, 1, 2, 3].map((i) => {
                        const isShaded = i < improperNum;
                        const angleStart = i * 90;
                        const angleEnd = (i + 1) * 90;
                        
                        const radStart = (angleStart * Math.PI) / 180;
                        const radEnd = (angleEnd * Math.PI) / 180;
                        
                        const x1 = 50 + 42 * Math.cos(radStart);
                        const y1 = 50 + 42 * Math.sin(radStart);
                        const x2 = 50 + 42 * Math.cos(radEnd);
                        const y2 = 50 + 42 * Math.sin(radEnd);
                        
                        return (
                          <path
                            key={i}
                            d={`M 50 50 L ${x1} ${y1} A 42 42 0 0 1 ${x2} ${y2} Z`}
                            className={`stroke-white stroke-[2px] transition-all duration-300 ${
                              isShaded ? "fill-natural-terracotta" : "fill-natural-beige-light/80"
                            }`}
                          />
                        );
                      })}
                      <circle cx="50" cy="50" r="4" className="fill-natural-dark" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-bold text-natural-sage">Whole 1 (4/4)</span>
                </div>

                {/* Whole 2 */}
                <div className="relative flex flex-col items-center gap-1">
                  <div className="w-16 h-16">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {[0, 1, 2, 3].map((i) => {
                        const isShaded = (i + 4) < improperNum;
                        const angleStart = i * 90;
                        const angleEnd = (i + 1) * 90;
                        
                        const radStart = (angleStart * Math.PI) / 180;
                        const radEnd = (angleEnd * Math.PI) / 180;
                        
                        const x1 = 50 + 42 * Math.cos(radStart);
                        const y1 = 50 + 42 * Math.sin(radStart);
                        const x2 = 50 + 42 * Math.cos(radEnd);
                        const y2 = 50 + 42 * Math.sin(radEnd);
                        
                        return (
                          <path
                            key={i}
                            d={`M 50 50 L ${x1} ${y1} A 42 42 0 0 1 ${x2} ${y2} Z`}
                            className={`stroke-white stroke-[2px] transition-all duration-300 ${
                              isShaded ? "fill-natural-terracotta" : "fill-natural-beige-light/80"
                            }`}
                          />
                        );
                      })}
                      <circle cx="50" cy="50" r="4" className="fill-natural-dark" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-bold text-natural-sage">Whole 2</span>
                </div>
              </div>

              {/* Text analysis */}
              <div className="text-center space-y-1 px-4">
                <span className="text-xs text-natural-sage block">Mathematical Value:</span>
                <div className="flex items-center justify-center gap-1.5 text-lg font-black text-natural-dark font-sans">
                  <TextbookFraction num={improperNum} den={4} size="md" />
                  <span>=</span>
                  <span className="text-natural-terracotta">{(improperNum / 4).toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-natural-dark bg-natural-cream border border-natural-terracotta/20 px-3 py-1 rounded-full font-semibold">
                  Numerator ({improperNum}) &ge; Denominator (4) &rarr; <span className="text-natural-terracotta font-extrabold">Improper Fraction!</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Quiz */}
          <div className="bg-natural-cream border border-natural-terracotta/20 p-4 rounded-xl space-y-3">
            <h4 className="text-xs font-black text-natural-terracotta uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle size={14} /> Quick Check Quiz
            </h4>
            <p className="text-xs text-natural-dark font-medium">Which of the following is an IMPROPER fraction?</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { fraction: "1 / 3", isCorrect: false, feedback: "Incorrect. 1/3 is proper because numerator 1 is smaller than denominator 3." },
                { fraction: "5 / 5", isCorrect: true, feedback: "Correct! 5/5 equals exactly 1 whole. Since the numerator is equal to the denominator, it is improper." },
                { fraction: "7 / 4", isCorrect: true, feedback: "Correct! 7/4 is improper because the numerator 7 is greater than denominator 4." },
                { fraction: "2 / 7", isCorrect: false, feedback: "Incorrect. 2/7 is proper since 2 < 7." }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setImproperQuizFeedback(opt.feedback);
                    setImproperQuizSuccess(opt.isCorrect);
                  }}
                  className={`p-2.5 bg-white border rounded-xl text-xs font-bold transition cursor-pointer text-natural-dark ${
                    improperQuizFeedback === opt.feedback 
                      ? opt.isCorrect ? "border-natural-primary bg-natural-beige-light/30 text-natural-dark" : "border-natural-terracotta bg-natural-cream/30 text-natural-terracotta" 
                      : "border-natural-beige-dark hover:border-natural-terracotta"
                  }`}
                >
                  {opt.fraction}
                </button>
              ))}
            </div>

            {improperQuizFeedback && (
              <div className={`p-3 rounded-lg text-xs leading-normal border animate-fade-in ${
                improperQuizSuccess 
                  ? "bg-[#e7f0e3] border-natural-primary/30 text-natural-dark" 
                  : "bg-natural-cream border-natural-terracotta/20 text-natural-dark"
              }`}>
                {improperQuizFeedback}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render mixed fraction study sub-page
  if (selectedFractionPage === "mixed") {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-natural-beige-dark overflow-hidden animate-fade-in" id="lesson_viewport">
        {/* Subpage Header */}
        <div className="bg-gradient-to-r from-natural-dark to-[#494933] p-5 text-white flex items-center gap-3">
          <button
            onClick={() => {
              setSelectedFractionPage(null);
              setMixedQuizFeedback(null);
              setMixedQuizSuccess(null);
            }}
            className="p-1.5 hover:bg-white/10 rounded-lg text-natural-cream hover:text-white cursor-pointer transition flex items-center justify-center shrink-0 border border-white/15"
            id="btn_back_from_mixed"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="text-base font-black tracking-tight">Mixed Fractions</h2>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Definition card */}
          <div className="bg-natural-beige-light border border-natural-beige-dark/60 p-4 rounded-xl space-y-1.5">
            <h3 className="text-xs font-extrabold text-natural-dark uppercase tracking-wider flex items-center gap-1">
              <span className="w-1 h-3.5 bg-natural-terracotta rounded-full" /> What is a Mixed Fraction?
            </h3>
            <p className="text-xs text-natural-sage leading-relaxed">
              A <strong>Mixed Fraction</strong> is a combination of a <strong>Whole Number</strong> and a <strong>Proper Fraction</strong>. It is another elegant way of writing an improper fraction!
            </p>
            <div className="bg-white border border-natural-beige-dark/40 p-2 rounded-lg font-mono text-center text-xs text-natural-dark mt-2 font-bold">
              Whole Number + Proper Fraction &nbsp;|&nbsp; e.g., <span className="text-natural-terracotta font-extrabold">1</span> <span className="text-natural-primary font-extrabold">3 / 4</span> (Mixed)
            </div>
          </div>

          {/* Interactive Visualizer */}
          <div className="bg-white border border-natural-beige-dark p-4 rounded-xl space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-natural-dark">Whole Number Part (W)</h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={mixedWhole <= 1}
                    onClick={() => setMixedWhole(prev => prev - 1)}
                    className="w-7 h-7 rounded-lg bg-natural-beige-light border border-natural-beige-dark flex items-center justify-center text-natural-dark hover:bg-natural-beige-dark/30 transition disabled:opacity-45 font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs font-black text-natural-dark px-2 bg-natural-cream rounded border border-natural-beige-dark/40">
                    {mixedWhole}
                  </span>
                  <button
                    disabled={mixedWhole >= 3}
                    onClick={() => setMixedWhole(prev => prev + 1)}
                    className="w-7 h-7 rounded-lg bg-natural-beige-light border border-natural-beige-dark flex items-center justify-center text-natural-dark hover:bg-natural-beige-dark/30 transition disabled:opacity-45 font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-natural-dark">Fractional Numerator (N)</h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={mixedNum <= 1}
                    onClick={() => setMixedNum(prev => prev - 1)}
                    className="w-7 h-7 rounded-lg bg-natural-beige-light border border-natural-beige-dark flex items-center justify-center text-natural-dark hover:bg-natural-beige-dark/30 transition disabled:opacity-45 font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex items-center justify-center bg-natural-cream px-2 py-1 rounded-lg border border-natural-beige-dark/40 min-w-[3rem] shadow-xs">
                    <TextbookFraction num={mixedNum} den={4} size="sm" />
                  </span>
                  <button
                    disabled={mixedNum >= 3}
                    onClick={() => setMixedNum(prev => prev + 1)}
                    className="w-7 h-7 rounded-lg bg-natural-beige-light border border-natural-beige-dark flex items-center justify-center text-natural-dark hover:bg-natural-beige-dark/30 transition disabled:opacity-45 font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Slices representation */}
            <div className="flex flex-col items-center justify-center py-3.5 bg-natural-beige-light/30 border border-dashed border-natural-beige-dark rounded-xl gap-4">
              <div className="flex flex-wrap gap-4 justify-center items-center px-4">
                {Array.from({ length: 3 }).map((_, idx) => {
                  const isFullyShaded = idx < mixedWhole;
                  const isPartiallyShaded = idx === mixedWhole;
                  
                  return (
                    <div key={idx} className="relative flex flex-col items-center gap-0.5">
                      <div className="w-12 h-12">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          {[0, 1, 2, 3].map((i) => {
                            const isShaded = isFullyShaded || (isPartiallyShaded && i < mixedNum);
                            const angleStart = i * 90;
                            const angleEnd = (i + 1) * 90;
                            
                            const radStart = (angleStart * Math.PI) / 180;
                            const radEnd = (angleEnd * Math.PI) / 180;
                            
                            const x1 = 50 + 42 * Math.cos(radStart);
                            const y1 = 50 + 42 * Math.sin(radStart);
                            const x2 = 50 + 42 * Math.cos(radEnd);
                            const y2 = 50 + 42 * Math.sin(radEnd);
                            
                            return (
                              <path
                                key={i}
                                d={`M 50 50 L ${x1} ${y1} A 42 42 0 0 1 ${x2} ${y2} Z`}
                                className={`stroke-white stroke-[2px] transition-all duration-300 ${
                                  isShaded ? "fill-natural-terracotta" : "fill-natural-beige-light/85"
                                }`}
                              />
                            );
                          })}
                          <circle cx="50" cy="50" r="4" className="fill-natural-dark" />
                        </svg>
                      </div>
                      <span className="text-[8px] font-bold text-natural-sage">
                        {isFullyShaded ? "1 Whole" : isPartiallyShaded ? `${mixedNum}/4 Part` : "Empty"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Conversion steps SUTRA */}
              <div className="text-center w-full px-4 border-t border-natural-beige-dark/40 pt-3 space-y-2">
                <span className="text-[10px] text-natural-sage font-bold uppercase tracking-wider block">CBSE SUTRA: Convert Mixed to Improper</span>
                <div className="bg-white border border-natural-beige-dark/50 p-3 rounded-lg flex items-center justify-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-sans font-black text-natural-dark">
                    <span className="text-sm text-natural-terracotta font-extrabold">{mixedWhole}</span>
                    <TextbookFraction num={mixedNum} den={4} size="sm" />
                    <span className="text-natural-sage font-extrabold mx-1.5">=</span>
                    <span className="inline-flex flex-col items-center justify-center align-middle leading-none">
                      <span className="block border-b border-natural-dark text-center pb-1 font-black text-natural-terracotta px-1.5">({mixedWhole} &times; 4) + {mixedNum}</span>
                      <span className="block text-center pt-1 font-bold text-natural-primary">4</span>
                    </span>
                    <span className="text-natural-sage font-extrabold mx-1.5">=</span>
                    <TextbookFraction num={mixedWhole * 4 + mixedNum} den={4} size="sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Quiz */}
          <div className="bg-natural-cream border border-natural-terracotta/20 p-4 rounded-xl space-y-3">
            <h4 className="text-xs font-black text-natural-terracotta uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle size={14} /> Quick Check Quiz
            </h4>
            <p className="text-xs text-natural-dark font-medium">Which improper fraction is equivalent to 2 1/3?</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { fraction: "5 / 3", isCorrect: false, feedback: "Incorrect. To convert, multiply whole (2) by denominator (3) to get 6, then add numerator (1) to get 7. So it should be 7/3." },
                { fraction: "7 / 3", isCorrect: true, feedback: "Correct! (2 × 3) + 1 = 7. Thus, the improper fraction is 7/3." },
                { fraction: "8 / 3", isCorrect: false, feedback: "Incorrect. (2 × 3) + 1 = 7, not 8." },
                { fraction: "2 / 3", isCorrect: false, feedback: "Incorrect. 2/3 is a proper fraction and smaller than 1, while 2 1/3 is greater than 2!" }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setMixedQuizFeedback(opt.feedback);
                    setMixedQuizSuccess(opt.isCorrect);
                  }}
                  className={`p-2.5 bg-white border rounded-xl text-xs font-bold transition cursor-pointer text-natural-dark ${
                    mixedQuizFeedback === opt.feedback 
                      ? opt.isCorrect ? "border-natural-primary bg-natural-beige-light/30 text-natural-dark" : "border-natural-terracotta bg-natural-cream/30 text-natural-terracotta" 
                      : "border-natural-beige-dark hover:border-natural-terracotta"
                  }`}
                >
                  {opt.fraction}
                </button>
              ))}
            </div>

            {mixedQuizFeedback && (
              <div className={`p-3 rounded-lg text-xs leading-normal border animate-fade-in ${
                mixedQuizSuccess 
                  ? "bg-[#e7f0e3] border-natural-primary/30 text-natural-dark" 
                  : "bg-natural-cream border-natural-terracotta/20 text-natural-dark"
              }`}>
                {mixedQuizFeedback}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (selectedNumberPage !== null) {
    const pageConfigs = {
      even: {
        title: "Even Numbers",
        hindiTitle: "सम संख्या",
        emoji: "🔢",
        colorClass: "emerald",
        headerBg: "bg-emerald-800",
        borderClass: "border-emerald-200",
        bgClass: "bg-emerald-50/40",
        textCol: "text-emerald-850",
        definition: "An Even number is a whole number that can be divided exactly by 2 with no remainder (remainder is 0). It always ends with 0, 2, 4, 6, or 8.",
        formula: "Ends with: 0, 2, 4, 6, or 8 (Algebraic: 2k)",
        points: ["2 × 1 = 2", "2 × 2 = 4", "2 × 3 = 6"],
        gameComponent: <EvenNumberGame />
      },
      odd: {
        title: "Odd Numbers",
        hindiTitle: "विषम संख्या",
        emoji: "🔢",
        colorClass: "teal",
        headerBg: "bg-teal-800",
        borderClass: "border-teal-200",
        bgClass: "bg-teal-50/40",
        textCol: "text-teal-850",
        definition: "An Odd number is a whole number that CANNOT be divided exactly by 2 (it always leaves a remainder of 1). It ends with 1, 3, 5, 7, or 9.",
        formula: "Ends with: 1, 3, 5, 7, or 9 (Algebraic: 2k + 1)",
        points: ["1, 3, 5, 7", "9, 11, 13", "15, 17, 19"],
        gameComponent: <OddNumberGame />
      },
      prime: {
        title: "Prime Numbers",
        hindiTitle: "अभाज्य संख्या",
        emoji: "⭐",
        colorClass: "amber",
        headerBg: "bg-amber-700",
        borderClass: "border-amber-200",
        bgClass: "bg-amber-50/40",
        textCol: "text-amber-850",
        definition: "A Prime number is a whole number greater than 1 that has EXACTLY two factors: 1 and itself. It cannot be split into smaller product parts.",
        formula: "Factors: Only 1 and itself",
        points: ["2, 3, 5, 7", "11, 13, 17", "19, 23, 29"],
        gameComponent: <PrimeNumberGame />
      },
      composite: {
        title: "Composite Numbers",
        hindiTitle: "भाज्य संख्या",
        emoji: "🧱",
        colorClass: "blue",
        headerBg: "bg-blue-800",
        borderClass: "border-blue-200",
        bgClass: "bg-blue-50/40",
        textCol: "text-blue-850",
        definition: "A Composite number is a positive whole number greater than 1 that has more than 2 factors (it can be divided by numbers other than 1 and itself).",
        formula: "Factors: More than 2 factors",
        points: ["4: 1, 2, 4", "6: 1, 2, 3, 6", "12: 1, 2, 3, 4, 6, 12"],
        gameComponent: <CompositeNumberGame />
      },
      square: {
        title: "Square Numbers",
        hindiTitle: "वर्ग संख्या",
        emoji: "⏹️",
        colorClass: "violet",
        headerBg: "bg-violet-800",
        borderClass: "border-violet-200",
        bgClass: "bg-violet-50/40",
        textCol: "text-violet-850",
        definition: "A Square number is the product of an integer multiplied by itself. It represents the area of a square with whole-number side lengths.",
        formula: "Formula: N × N = N²",
        points: ["1² = 1", "2² = 4", "3² = 9", "4² = 16"],
        gameComponent: <SquareNumberGame />
      },
      multiples: {
        title: "Multiples Table",
        hindiTitle: "गुणज",
        emoji: "❌",
        colorClass: "rose",
        headerBg: "bg-rose-800",
        borderClass: "border-rose-200",
        bgClass: "bg-rose-50/40",
        textCol: "text-rose-850",
        definition: "A Multiple of a number is the product of that number and any positive whole number. They are the numbers that appear in its multiplication table.",
        formula: "Formula: Multiples of N = N × k",
        points: ["3 × 1 = 3", "3 × 2 = 6", "3 × 3 = 9", "3 × 4 = 12"],
        gameComponent: <MultiplesNumberGame />
      },
      divisibility: {
        title: "Divisibility Rules",
        hindiTitle: "विभाज्यता के नियम",
        emoji: "➗",
        colorClass: "sky",
        headerBg: "bg-sky-800",
        borderClass: "border-sky-200",
        bgClass: "bg-sky-50/40",
        textCol: "text-sky-850",
        definition: "Divisibility rules are shorthand ways of determining whether a given number is divisible by a fixed divisor without performing full division.",
        formula: "Sum of digits for 3 | Ends in 0/5 for 5",
        points: ["Rule of 2: Ends in even", "Rule of 3: Sum of digits", "Rule of 5: Ends in 0/5"],
        gameComponent: <DivisibilityGame />
      },
      real: {
        title: "Real Numbers",
        hindiTitle: "वास्तविक संख्या",
        emoji: "🌍",
        colorClass: "indigo",
        headerBg: "bg-indigo-800",
        borderClass: "border-indigo-200",
        bgClass: "bg-indigo-50/40",
        textCol: "text-indigo-850",
        definition: "Real numbers are values that represent a quantity along a continuous number line. They include all integers, fractions, and irrational roots.",
        formula: "Real = Rational + Irrational",
        points: ["Integers: -3, 0, 5", "Rationals: 2/3, 0.5", "Irrationals: √2, π"],
        gameComponent: <RealNumberGame />
      },
      imaginary: {
        title: "Imaginary Numbers",
        hindiTitle: "काल्पनिक संख्या",
        emoji: "🔮",
        colorClass: "fuchsia",
        headerBg: "bg-fuchsia-800",
        borderClass: "border-fuchsia-200",
        bgClass: "bg-fuchsia-50/40",
        textCol: "text-fuchsia-850",
        definition: "Imaginary numbers are numbers that can be written as a real number multiplied by the imaginary unit i, where i² = -1. They exist on the vertical complex axis!",
        formula: "Unit i = √-1  (i² = -1)",
        points: ["i = √-1", "i² = -1", "i³ = -i", "i⁴ = 1"],
        gameComponent: <ImaginaryNumberGame />
      },
      whole: {
        title: "Whole Numbers",
        hindiTitle: "पूर्ण संख्या",
        emoji: "🎛️",
        colorClass: "orange",
        headerBg: "bg-orange-800",
        borderClass: "border-orange-200",
        bgClass: "bg-orange-50/40",
        textCol: "text-orange-850",
        definition: "Whole numbers are the counting numbers starting from 1, plus the number zero (0). They do not include any fractional, decimal, or negative parts.",
        formula: "Whole Numbers = {0, 1, 2, 3, ...}",
        points: ["Zero: 0", "Positives: 1, 2, 3...", "No negatives or decimals"],
        gameComponent: <WholeNumberGame />
      },
      integers: {
        title: "Integers",
        hindiTitle: "पूर्णांक संख्या",
        emoji: "🌡️",
        colorClass: "indigo",
        headerBg: "bg-indigo-700",
        borderClass: "border-indigo-250",
        bgClass: "bg-indigo-50/40",
        textCol: "text-indigo-850",
        definition: "Integers are positive whole numbers, negative whole numbers, and zero. They do not have any fractional or decimal parts.",
        formula: "Integers (ℤ) = {..., -2, -1, 0, 1, 2, ...}",
        points: ["Negatives: -3, -2, -1", "Zero: 0", "Positives: 1, 2, 3"],
        gameComponent: <IntegersGame />
      },
    };

    const cfg = pageConfigs[selectedNumberPage];

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-natural-beige-dark overflow-hidden animate-fade-in" id="lesson_viewport">
        {/* Subpage Header */}
        <div className={`p-5 text-white flex items-center gap-3 ${cfg.headerBg}`}>
          <button
            onClick={() => {
              setSelectedNumberPage(null);
            }}
            className="p-1.5 hover:bg-white/10 rounded-lg text-natural-cream hover:text-white cursor-pointer transition flex items-center justify-center shrink-0 border border-white/15"
            id={`btn_back_from_${selectedNumberPage}`}
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="text-base font-black tracking-tight">{cfg.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6 flex flex-col">
          {/* Definition */}
          <div className={`${cfg.bgClass} border-2 ${cfg.borderClass} p-5 rounded-2xl space-y-3 shadow-xs text-center animate-fade-in`}>
            <div className={`w-12 h-12 bg-white ${cfg.textCol} rounded-full flex items-center justify-center mx-auto text-xl shadow-inner border border-slate-100`}>
              {cfg.emoji}
            </div>
            
            <h3 className={`text-base font-black ${cfg.textCol} tracking-tight uppercase`}>
              {cfg.title}
            </h3>
            
            <p className="text-xs text-slate-700 font-bold leading-relaxed max-w-md mx-auto">
              {cfg.definition}
            </p>

            <div className={`bg-white border ${cfg.borderClass} p-3 rounded-xl font-mono text-center text-xs shadow-inner max-w-sm mx-auto space-y-1.5`}>
              <div className={`font-extrabold text-xs ${cfg.textCol}`}>
                {cfg.formula}
              </div>
            </div>

            <div className={`pt-1 text-[10px] ${cfg.textCol} font-bold flex justify-center gap-2 flex-wrap`}>
              {cfg.points.map((p, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-white/80 rounded-full border border-slate-200">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Game Component */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase text-natural-sage tracking-widest flex items-center gap-1.5 pl-1">
              🎮 Play & Learn Game
            </h4>
            {cfg.gameComponent}
          </div>
        </div>
      </div>
    );
  }

  if (selectedChapter.id === "g9_numbersystems" && selectedG9Topic) {
    const pageConfigs = {
      rational_intro: {
        title: "Rational Numbers Between Two Numbers",
        headerBg: "bg-teal-700",
        component: <RationalIntroTopic />
      },
      irrational_numbers: {
        title: "Irrational Numbers & Construction",
        headerBg: "bg-indigo-700",
        component: <IrrationalNumbersTopic />
      },
      decimal_expansions: {
        title: "Real Numbers & Decimal Expansions",
        headerBg: "bg-emerald-700",
        component: <DecimalExpansionsTopic />
      },
      real_operations: {
        title: "Operations on Real Numbers",
        headerBg: "bg-violet-700",
        component: <OperationsRealTopic />
      },
      rationalizing: {
        title: "Rationalizing the Denominator",
        headerBg: "bg-orange-700",
        component: <RationalizingTopic />
      },
      exponent_laws: {
        title: "Laws of Exponents for Real Numbers",
        headerBg: "bg-rose-700",
        component: <ExponentLawsTopic />
      }
    };

    const cfg = pageConfigs[selectedG9Topic];

    return (
      <div className="w-full max-w-full min-w-0 overflow-x-hidden animate-fade-in" id="lesson_viewport">
        {/* Subpage Header */}
        <div className={`p-4 sm:p-5 text-white flex items-center gap-3 rounded-t-2xl ${cfg.headerBg} min-w-0`}>
          <button
            onClick={() => {
              setSelectedG9Topic(null);
            }}
            className="p-1.5 hover:bg-white/10 rounded-lg text-natural-cream hover:text-white cursor-pointer transition flex items-center justify-center shrink-0 border border-white/15"
            id={`btn_back_from_g9_${selectedG9Topic}`}
          >
            <ArrowLeft size={16} />
          </button>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-black tracking-tight break-words">{cfg.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 min-w-0">
          {cfg.component}
        </div>
      </div>
    );
  }

  if (selectedChapter.id.startsWith("g1_")) {
    return (
      <div className="w-full max-w-full min-w-0 overflow-x-hidden p-2 sm:p-4 md:p-5 space-y-3" id="g1_lesson_viewport">
        <Grade1InteractiveGame
          chapterId={selectedChapter.id}
          onActionComplete={onActionComplete}
        />
      </div>
    );
  }

  const isPresentationActive = activeChapterTab === "textbook";
  const isQuizModeActive = ((activeChapterTab === "topic_quiz" || activeChapterTab === "worksheet") && !isQuizCompleted) || isPresentationActive;

  return (
    <div className={`w-full max-w-full min-w-0 flex flex-col justify-between ${isQuizModeActive ? "h-full flex-1 min-h-0 overflow-hidden" : "overflow-x-hidden"}`} id="lesson_viewport">

      {/* Main Tab Content Display Container */}
      <div className={`min-w-0 flex-1 flex flex-col ${
        isQuizModeActive
          ? "p-0 h-full min-h-0 overflow-hidden"
          : "p-3 sm:p-5 md:p-6 space-y-4"
      }`}>

        {/* Top Sub-Tab Navigation Bar (Hidden during presentation mode or quiz) */}
        {!isPresentationActive && ((activeChapterTab !== "topic_quiz" && activeChapterTab !== "worksheet") || isQuizCompleted) && (
          <div className="flex flex-wrap items-center gap-2 bg-slate-100/90 p-1.5 rounded-xl border border-slate-200/90 w-fit" id="unified_chapter_nav_tabs">
            <button
              onClick={() => setActiveChapterTab("textbook")}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                activeChapterTab === "textbook"
                  ? "bg-sky-600 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <span>📖</span> <span>Textbook Lesson</span>
            </button>

            {!isGrade6or9 && (
              <button
                onClick={() => setActiveChapterTab("interactive")}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                  activeChapterTab === "interactive"
                    ? "bg-purple-600 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
              >
                <span>🎨</span> <span>Visual Explore & Interactive Studio</span>
              </button>
            )}

            <button
              onClick={() => {
                setSelectedQuizTopic(null);
                setActiveChapterTab("topic_quiz");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                activeChapterTab === "topic_quiz"
                  ? "bg-indigo-600 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <span>🎯</span> <span>Chapter & Topic Quiz</span>
            </button>

            <button
              onClick={() => setActiveChapterTab("worksheet")}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                activeChapterTab === "worksheet"
                  ? "bg-emerald-600 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <span>✍️</span> <span>Practice Worksheet</span>
            </button>

            {(lesson?.didYouKnow || (lesson?.sandharbaVakyalu && lesson.sandharbaVakyalu.length > 0) || selectedChapter.id === "g6_soc_locating_places") && (
              <button
                onClick={() => setActiveChapterTab("notes")}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                  activeChapterTab === "notes"
                    ? "bg-amber-600 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
              >
                <span>💡</span> <span>Trivia & Special Notes</span>
              </button>
            )}
          </div>
        )}

        {/* TAB: CHAPTER & TOPIC QUIZ (MCQs + Assertion & Reason) */}
        {activeChapterTab === "topic_quiz" && (
          <div className="animate-fade-in h-full flex flex-col flex-1 min-h-0 overflow-hidden">
            <TopicQuizView
              chapterId={selectedChapter.id}
              chapterTitle={selectedChapter.title}
              selectedTopicTitle={selectedQuizTopic}
              topicList={lesson?.steps?.map((s) => s.title)}
              onQuizComplete={onQuizComplete}
              onQuizStateChange={(completed) => setIsQuizCompleted(completed)}
              onBackToChapters={onBackToChapters}
              selectedGrade={selectedGrade}
              selectedSubject={selectedSubject}
            />
          </div>
        )}

        {/* TAB: PRACTICE WORKSHEET */}
        {activeChapterTab === "worksheet" && (
          <div className="animate-fade-in h-full flex flex-col flex-1 min-h-0 overflow-hidden">
            <PracticeQuiz
              chapterId={selectedChapter.id}
              chapterTitle={selectedChapter.title}
              onQuizComplete={onQuizComplete || (() => {})}
              onAskTutor={(questionContext) => {
                if (onActionComplete) {
                  onActionComplete(10);
                }
              }}
            />
          </div>
        )}

        {/* TAB 1: TEXTBOOK & LESSONS */}
        {activeChapterTab === "textbook" && (
          <div className="animate-fade-in h-full flex-1 flex flex-col min-h-0 overflow-hidden">
            <LessonSlideDeck
              lesson={lesson}
              selectedChapter={selectedChapter}
              onTakeTopicQuiz={(topicTitle) => {
                setSelectedQuizTopic(topicTitle);
                setActiveChapterTab("topic_quiz");
                const container = document.getElementById("topic_quiz_container");
                if (container) {
                  container.scrollIntoView({ behavior: "smooth" });
                }
              }}
              onSwitchTab={(tab) => setActiveChapterTab(tab)}
              onBackToChapters={onBackToChapters}
            />
          </div>
        )}

        {/* TAB 2: INTERACTIVE GAMES & VISUAL TOOLS */}
        {activeChapterTab === "interactive" && (
          <div className="space-y-4 animate-fade-in">
            {/* Render Geometry Interactive Studio directly for Grade 6 Geometry */}
            {selectedChapter.id === "geometry" && (
              <div className="space-y-6">
                <Grade6TopicExplorer defaultTab="geometry" hideTabSwitcher={true} />
                <GeometryExplorer />
              </div>
            )}

            {/* Render Fraction Operations Studio for Grade 6 Chapter 7 Fractions */}
            {selectedChapter.id === "fractions" && (
              <FractionOperationsExplorer />
            )}

            {/* Render Number Patterns & Sequences Topic Hub */}
            {selectedChapter.id === "patterns" && (
              <Grade6TopicExplorer defaultTab="patterns" hideTabSwitcher={true} />
            )}

            {/* Render Official Grade 6 Mathematics Term Exam Question Paper */}
            {selectedChapter.id === "g6_exam_paper" && (
              <Grade6MathsPaper />
            )}

            {/* Render Interactive Probability Simulator for Grade 9 Probability */}
            {selectedChapter.id === "g9_probability" && (
              <ProbabilityTopic />
            )}

            {/* Render Interactive Algebraic Identities Explorer for Grade 9 Polynomials */}
            {selectedChapter.id === "g9_polynomials" && (
              <AlgebraicIdentitiesTopic />
            )}

            {/* Render Interactive Cartesian Plane Canvas for Grade 9 Coordinate Geometry */}
            {selectedChapter.id === "g9_coordinate" && (
              <CoordinateGeometryTopic />
            )}

            {/* Render Chapter-Specific Visual Studio for all other chapters */}
            {!["geometry", "fractions", "patterns", "g6_exam_paper", "g9_probability", "g9_polynomials", "g9_coordinate"].includes(selectedChapter.id) && (
              <div className="space-y-4" id="chapter_visual_studio_wrapper">
                <VisualTools
                  chapterId={selectedChapter.id}
                  onActionComplete={onActionComplete}
                />
              </div>
            )}
          </div>
        )}

        {/* TAB 3: TRIVIA & SPECIAL NOTES */}
        {activeChapterTab === "notes" && (
          <div className="space-y-4 animate-fade-in">
            {/* Dedicated Interactive Student Guide for Longitude & IST */}
            {selectedChapter.id === "g6_soc_locating_places" && (
              <IstStudentExplainer />
            )}

            {/* Sandharba Vakyalu (సందర్భ సహిత వ్యాఖ్యలు) Section for Telugu Lessons */}
            {lesson?.sandharbaVakyalu && lesson.sandharbaVakyalu.length > 0 && (
              <div className="bg-amber-50/80 border-2 border-amber-200/90 rounded-2xl p-5 space-y-4 shadow-xs" id="sandharba_vakyalu_box">
                <div className="flex items-center justify-between border-b border-amber-200/70 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📜</span>
                    <div>
                      <h4 className="text-sm font-black text-amber-950 tracking-wide">
                        సందర్భ సహిత వ్యాఖ్యలు (Sandharba Vakyalu)
                      </h4>
                      <p className="text-[11px] text-amber-800 font-medium">
                        పాఠంలోని ముఖ్యమైన వాక్యాలు, కవి పరిచయం, సందర్భం మరియు భావం
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase bg-amber-200/60 text-amber-900 px-2.5 py-1 rounded-full border border-amber-300">
                    పరీక్ష ప్రత్యేకం
                  </span>
                </div>

                <div className="space-y-4">
                  {lesson.sandharbaVakyalu.map((item, idx) => (
                    <div key={idx} className="bg-white border border-amber-200 rounded-xl p-4 space-y-3 shadow-2xs">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-xs sm:text-sm font-black text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg flex-1">
                          "{item.vakyam}"
                        </div>
                        <button
                          onClick={() => playTeluguSpeech(`${item.vakyam}. ${item.sandharbam}. ${item.bhavam}`)}
                          className="flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-2.5 py-1.5 rounded-lg text-[10px] shrink-0 border border-amber-300 transition cursor-pointer active:scale-95"
                        >
                          <span>🔊 వినండి</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs pt-1">
                        <div className="bg-amber-50/50 p-2.5 rounded-lg border border-amber-100 space-y-0.5">
                          <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider block">
                            కవి / మూలం:
                          </span>
                          <p className="font-bold text-slate-800">{item.kavi}</p>
                        </div>
                        <div className="bg-amber-50/50 p-2.5 rounded-lg border border-amber-100 space-y-0.5">
                          <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider block">
                            సందర్భం:
                          </span>
                          <p className="font-semibold text-slate-700 leading-relaxed">{item.sandharbam}</p>
                        </div>
                        <div className="bg-amber-50/50 p-2.5 rounded-lg border border-amber-100 space-y-0.5">
                          <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider block">
                            భావం:
                          </span>
                          <p className="font-semibold text-slate-700 leading-relaxed">{item.bhavam}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Indian History / Trivia Section */}
            {lesson?.didYouKnow && (
              <div className="bg-natural-cream border border-natural-beige-dark/60 rounded-2xl p-5 relative overflow-hidden" id="did_you_know_box">
                <div className="absolute -right-2 -bottom-2 text-6xl opacity-10 select-none">🇮🇳</div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="text-xs font-black text-natural-terracotta uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} className="text-natural-terracotta animate-pulse" /> Did You Know?
                  </h4>
                  {(selectedChapter.id.startsWith("g1_") || selectedChapter.id.startsWith("g6_tel_")) && (
                    <button 
                      onClick={() => {
                        if (selectedChapter.id.includes("tel")) {
                          playTeluguSpeech(lesson.didYouKnow);
                        } else {
                          playSpeechWithLang(lesson.didYouKnow, "en-US");
                        }
                      }}
                      className="flex items-center gap-1 bg-natural-terracotta/10 hover:bg-natural-terracotta/20 text-natural-terracotta font-bold px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wide cursor-pointer transition active:scale-95 border border-natural-terracotta/20"
                    >
                      <span>🔊 Read Aloud</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-natural-dark leading-relaxed">
                  {lesson.didYouKnow}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

