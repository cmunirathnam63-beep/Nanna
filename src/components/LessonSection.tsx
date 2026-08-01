import React, { useState } from "react";
import { BookOpen, Sparkles, HelpCircle, ArrowRight, Play, FileText, ArrowLeft } from "lucide-react";
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
  onOpenTool: (toolId: "fraction" | "numberline" | "placevalue" | "perimeter" | "typesofnumbers" | "clock" | string, highlightMode?: string) => void;
  onOpenWorksheet: () => void;
  onActionComplete?: (points: number) => void;
  onQuizComplete?: (pointsWon: number, solvedCount: number) => void;
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

export default function LessonSection({
  selectedChapter,
  onOpenTool,
  onOpenWorksheet,
  onActionComplete,
  onQuizComplete
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
  const [activeChapterTab, setActiveChapterTab] = React.useState<"textbook" | "interactive" | "notes" | "topic_quiz">(
    selectedChapter.id.startsWith("g1_") ? "interactive" : "textbook"
  );

  React.useEffect(() => {
    setSelectedFractionPage(null);
    setSelectedNumberPage(null);
    setSelectedG9Topic(null);
    setG1SecretOpen(false);
    setActiveChapterTab(selectedChapter.id.startsWith("g1_") ? "interactive" : "textbook");
  }, [selectedChapter]);

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

  return (
    <div className="w-full max-w-full min-w-0 overflow-x-hidden flex flex-col justify-between" id="lesson_viewport">

      {/* Main Tab Content Display Container */}
      <div className="p-3 sm:p-5 md:p-6 space-y-4 min-w-0 flex-1">

        {/* Top Sub-Tab Navigation Bar */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100/90 p-1.5 rounded-xl border border-slate-200/90 w-fit">
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

          <button
            onClick={() => setActiveChapterTab("topic_quiz")}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
              activeChapterTab === "topic_quiz"
                ? "bg-indigo-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <span>🎯</span> <span>Quiz (10 MCQs + 10 Assertion-Reason)</span>
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

        {/* TAB: TOPIC QUIZ (10 MCQs + 10 Assertion & Reason) */}
        {activeChapterTab === "topic_quiz" && (
          <div className="animate-fade-in">
            <TopicQuizView
              chapterId={selectedChapter.id}
              chapterTitle={selectedChapter.title}
              onQuizComplete={onQuizComplete}
            />
          </div>
        )}

        {/* TAB 1: TEXTBOOK & LESSONS */}
        {activeChapterTab === "textbook" && (
          <div className="space-y-4 animate-fade-in">
            {lesson && (lesson.introduction || (lesson.keyFormulas && lesson.keyFormulas.length > 0)) ? (
              <div className="bg-white border-2 border-slate-200/90 rounded-2xl p-4 sm:p-5 md:p-6 space-y-6 shadow-xs min-w-0 max-w-full overflow-x-hidden" id="lesson_definitions_container">
                {/* Chapter Header Banner */}
                <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 text-white rounded-xl p-4 sm:p-5 shadow-inner space-y-2 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="bg-sky-400/20 text-sky-200 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md border border-sky-300/30 tracking-wider">
                      📖 NCERT Textbook Lesson Content
                    </span>
                    <button
                      onClick={() => playSpeechWithLang(`${lesson.title}. ${lesson.introduction}`, "en-US")}
                      className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-sky-100 font-bold px-3 py-1 rounded-lg text-xs transition cursor-pointer active:scale-95 border border-white/20"
                    >
                      🔊 Listen
                    </button>
                  </div>
                  <h2 className="text-lg md:text-xl font-black text-white tracking-tight break-words">{lesson.title}</h2>
                  {lesson.introduction && (
                    <p className="text-xs md:text-sm text-sky-100/90 leading-relaxed font-medium break-words">
                      {lesson.introduction}
                    </p>
                  )}
                </div>

                {/* Core Definitions & Key Concepts Section */}
                {lesson.keyFormulas && lesson.keyFormulas.length > 0 && (
                  <div className="space-y-4 min-w-0">
                    <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                      <div className="w-2 h-5 bg-sky-600 rounded-full shrink-0" />
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                        📖 Key Definitions & Core Concepts ({lesson.keyFormulas.length})
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4 min-w-0 w-full">
                      {lesson.keyFormulas.map((kf, idx) => (
                        <div key={idx} className="bg-slate-50/80 border border-slate-200 hover:border-sky-300 transition rounded-xl p-3.5 sm:p-4 space-y-3 flex flex-col justify-between shadow-2xs min-w-0 max-w-full">
                          <div className="space-y-2 min-w-0">
                            <div className="flex items-center justify-between gap-2 min-w-0">
                              <h4 className="text-xs md:text-sm font-black text-slate-900 flex items-center gap-1.5 break-words min-w-0">
                                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full shrink-0" />
                                {kf.name}
                              </h4>
                            </div>
                            {kf.formula && (
                              <div className="bg-sky-50 border border-sky-200/80 rounded-lg px-2.5 py-1 text-[11px] font-extrabold text-sky-900 font-mono break-words min-w-0">
                                {kf.formula}
                              </div>
                            )}
                            {/* Interactive or Illustrated Visual Diagram */}
                            {kf.diagramType && (
                              <div className="pt-1 max-w-full overflow-hidden">
                                <DefinitionDiagram diagramType={kf.diagramType} title={kf.name} />
                              </div>
                            )}
                            {kf.image && (
                              <div className="pt-1 overflow-hidden rounded-xl border border-slate-200 max-w-full">
                                <img src={kf.image} alt={kf.name} className="w-full h-auto object-cover max-h-48" referrerPolicy="no-referrer" />
                              </div>
                            )}
                            <p className="text-xs text-slate-700 font-medium leading-relaxed pt-0.5 whitespace-pre-line break-words min-w-0">
                              {kf.explanation}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step-by-Step Learning Topics */}
                {lesson.steps && lesson.steps.length > 0 && (
                  <div className="space-y-4 pt-2 min-w-0">
                    <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                      <div className="w-2 h-5 bg-amber-500 rounded-full shrink-0" />
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                        💡 Key Topics & Examples
                      </h3>
                    </div>

                    <div className="space-y-4 min-w-0">
                      {lesson.steps.map((step, idx) => (
                        <div key={idx} className="bg-amber-50/40 border border-amber-200/90 rounded-2xl p-4 sm:p-5 space-y-3 min-w-0 shadow-2xs relative hover:border-amber-400 transition-all">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="bg-amber-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md tracking-wider">
                                Topic Division {idx + 1}
                              </span>
                              <span className="text-[11px] font-bold text-amber-800">
                                {selectedChapter.title}
                              </span>
                            </div>

                            <button
                              onClick={() => {
                                setActiveChapterTab("topic_quiz");
                                const container = document.getElementById("topic_quiz_container");
                                if (container) {
                                  container.scrollIntoView({ behavior: "smooth" });
                                }
                              }}
                              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer transition shadow-2xs"
                            >
                              <span>🎯</span>
                              <span>Take Topic Quiz</span>
                            </button>
                          </div>

                          <h4 className="text-xs md:text-sm font-black text-amber-950 flex items-center gap-2 min-w-0 break-words">
                            <span className="w-6 h-6 bg-amber-500 text-white rounded-lg flex items-center justify-center text-xs font-black shrink-0">
                              {idx + 1}
                            </span>
                            {step.title}
                          </h4>

                          <p className="text-xs text-slate-700 font-medium leading-relaxed whitespace-pre-line pl-1 sm:pl-8 break-words min-w-0">
                            {step.desc}
                          </p>

                          {step.example && (
                            <div className="ml-1 sm:ml-8 bg-white border border-amber-300/80 rounded-xl p-3 text-xs text-slate-800 font-semibold space-y-1 min-w-0 shadow-2xs">
                              <span className="text-[10px] font-extrabold uppercase text-amber-800 flex items-center gap-1 tracking-wider">
                                <span>💡</span> <span>Real-World Example / Illustration:</span>
                              </span>
                              <p className="break-words leading-relaxed text-slate-700">{step.example}</p>
                            </div>
                          )}

                          <div className="pt-1 flex items-center justify-end">
                            <button
                              onClick={() => {
                                setActiveChapterTab("topic_quiz");
                                const container = document.getElementById("topic_quiz_container");
                                if (container) {
                                  container.scrollIntoView({ behavior: "smooth" });
                                }
                              }}
                              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 transition cursor-pointer flex items-center gap-1.5"
                            >
                              <span>📝</span>
                              <span>Practice 10 MCQs + 10 Assertion-Reason for Topic {idx + 1}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border-2 border-slate-200/90 rounded-2xl p-6 text-center space-y-3">
                <span className="text-3xl block">📖</span>
                <h3 className="font-extrabold text-slate-800 text-sm">Interactive Study Chapter</h3>
                <p className="text-xs text-slate-600">Switch to the Games & Visual Tools tab below to practice!</p>
              </div>
            )}
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

