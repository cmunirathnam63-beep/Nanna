import React from "react";
import { BookOpen, Sparkles, HelpCircle, ArrowRight, Play, FileText, ArrowLeft } from "lucide-react";
import { LESSONS_DATA } from "../data/lessons";
import { Chapter } from "../types";
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
  ExponentLawsTopic
} from "./G9NumberSystemTopics";

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
  onOpenTool: (toolId: "fraction" | "numberline" | "placevalue" | "perimeter" | "typesofnumbers", highlightMode?: string) => void;
  onOpenWorksheet: () => void;
  onActionComplete?: (points: number) => void;
}

export default function LessonSection({
  selectedChapter,
  onOpenTool,
  onOpenWorksheet,
  onActionComplete
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

  React.useEffect(() => {
    setSelectedFractionPage(null);
    setSelectedNumberPage(null);
    setSelectedG9Topic(null);
  }, [selectedChapter]);

  const handleToolNavigation = (toolName: string, highlightMode?: string) => {
    const matchedTool = 
      toolName === "fraction" ? "fraction" :
      toolName === "numberline" ? "numberline" :
      toolName === "placevalue" ? "placevalue" :
      toolName === "typesofnumbers" ? "typesofnumbers" : "perimeter";
      
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
              {cfg.title} ({cfg.hindiTitle})
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
      <div className="bg-white rounded-2xl shadow-sm border border-natural-beige-dark overflow-hidden animate-fade-in" id="lesson_viewport">
        {/* Subpage Header */}
        <div className={`p-5 text-white flex items-center gap-3 ${cfg.headerBg}`}>
          <button
            onClick={() => {
              setSelectedG9Topic(null);
            }}
            className="p-1.5 hover:bg-white/10 rounded-lg text-natural-cream hover:text-white cursor-pointer transition flex items-center justify-center shrink-0 border border-white/15"
            id={`btn_back_from_g9_${selectedG9Topic}`}
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="text-base font-black tracking-tight">{cfg.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {cfg.component}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-natural-beige-dark overflow-hidden" id="lesson_viewport">
      {/* Chapter header banner */}
      <div className="bg-gradient-to-r from-natural-dark to-[#494933] p-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
        <h2 className="text-[20px] font-black tracking-tight mt-1" id="chapter_title">
          {lesson.title}
        </h2>
        <p className="text-xs text-natural-beige-light mt-2 max-w-xl leading-relaxed">
          {lesson.introduction}
        </p>

        {/* Types of fractions button explorer */}
        {selectedChapter.id === "fractions" && (
          <div className="mt-4 pt-4 border-t border-white/10" id="types_of_fractions_bar">
            <span className="text-[11px] uppercase font-bold text-natural-cream tracking-wider block mb-2 flex items-center gap-1.5">
              <Sparkles size={12} className="text-natural-gold-accent" /> Types of Fractions Explorer:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setSelectedFractionPage("proper");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-natural-cream to-[#eeddbb] hover:from-[#eeddbb] border border-natural-terracotta/30 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-xs min-h-[58px]"
                id="btn_proper_fractions"
                title="Proper Fractions: Numerator < Denominator"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-natural-terracotta">Proper</h4>
                  <span className="text-xs leading-none shrink-0">🍕</span>
                </div>
                <p className="text-[8px] text-natural-sage mt-1 font-bold leading-tight">Numerator &lt; Denom</p>
              </button>
              <button
                onClick={() => {
                  setSelectedFractionPage("improper");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-natural-cream to-[#eeddbb] hover:from-[#eeddbb] border border-natural-terracotta/30 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-xs min-h-[58px]"
                id="btn_improper_fractions"
                title="Improper Fractions: Numerator ≥ Denominator"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-natural-terracotta">Improper</h4>
                  <span className="text-xs leading-none shrink-0">🥞</span>
                </div>
                <p className="text-[8px] text-natural-sage mt-1 font-bold leading-tight">Numerator &ge; Denom</p>
              </button>
              <button
                onClick={() => {
                  setSelectedFractionPage("mixed");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-natural-cream to-[#eeddbb] hover:from-[#eeddbb] border border-natural-terracotta/30 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-xs min-h-[58px]"
                id="btn_mixed_fractions"
                title="Mixed Fractions: Whole + Proper"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-natural-terracotta">Mixed</h4>
                  <span className="text-xs leading-none shrink-0">🍰</span>
                </div>
                <p className="text-[8px] text-natural-sage mt-1 font-bold leading-tight">Whole + Proper</p>
              </button>
            </div>
          </div>
        )}

        {/* Types of numbers button explorer */}
        {selectedChapter.id === "numbersystem" && (
          <div className="mt-4 pt-4 border-t border-white/10" id="types_of_numbers_bar">
            <span className="text-[11px] uppercase font-bold text-natural-cream tracking-wider block mb-2 flex items-center gap-1.5">
              <Sparkles size={12} className="text-natural-gold-accent" /> Types of Numbers Explorer:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setSelectedNumberPage("whole");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-orange-50 to-orange-100/50 hover:from-orange-100 border border-orange-400 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-md min-h-[58px] hover:scale-[1.02] duration-200"
                id="btn_whole_numbers"
                title="Whole Numbers: Counting numbers starting from 0"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-orange-800">Whole Num</h4>
                  <span className="text-xs leading-none shrink-0">🎛️</span>
                </div>
                <p className="text-[8px] text-orange-700 mt-1 font-bold leading-tight">Zero and Positives</p>
              </button>

              <button
                onClick={() => {
                  setSelectedNumberPage("integers");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-indigo-50 to-indigo-100/50 hover:from-indigo-100 border border-indigo-400 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-md min-h-[58px] hover:scale-[1.02] duration-200"
                id="btn_integer_numbers"
                title="Integers: Positive, negative whole numbers, and zero"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-indigo-800">Integers</h4>
                  <span className="text-xs leading-none shrink-0">🌡️</span>
                </div>
                <p className="text-[8px] text-indigo-700 mt-1 font-bold leading-tight">Positives, Negatives & 0</p>
              </button>

              <button
                onClick={() => {
                  setSelectedNumberPage("even");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-emerald-50 to-emerald-100/50 hover:from-emerald-100 border border-emerald-400 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-md min-h-[58px] hover:scale-[1.02] duration-200"
                id="btn_even_numbers"
                title="Even Numbers: Divisible by 2"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-emerald-800">Even</h4>
                  <span className="text-xs leading-none shrink-0">🔢</span>
                </div>
                <p className="text-[8px] text-emerald-700 mt-1 font-bold leading-tight">Divisible by 2</p>
              </button>

              <button
                onClick={() => {
                  setSelectedNumberPage("odd");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-teal-50 to-teal-100/50 hover:from-teal-100 border border-teal-400 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-md min-h-[58px] hover:scale-[1.02] duration-200"
                id="btn_odd_numbers"
                title="Odd Numbers: Not divisible by 2"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-teal-800">Odd</h4>
                  <span className="text-xs leading-none shrink-0">🔢</span>
                </div>
                <p className="text-[8px] text-teal-700 mt-1 font-bold leading-tight">Not divisible by 2</p>
              </button>

              <button
                onClick={() => {
                  setSelectedNumberPage("prime");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-amber-50 to-amber-100/50 hover:from-amber-100 border border-amber-400 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-md min-h-[58px] hover:scale-[1.02] duration-200"
                id="btn_prime_numbers"
                title="Prime Numbers: Exactly 2 factors"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-amber-800">Prime</h4>
                  <span className="text-xs leading-none shrink-0">⭐</span>
                </div>
                <p className="text-[8px] text-amber-700 mt-1 font-bold leading-tight">Exactly 2 factors</p>
              </button>

              <button
                onClick={() => {
                  setSelectedNumberPage("composite");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-blue-50 to-blue-100/50 hover:from-blue-100 border border-blue-400 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-md min-h-[58px] hover:scale-[1.02] duration-200"
                id="btn_composite_numbers"
                title="Composite Numbers: More than 2 factors"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-blue-800">Composite</h4>
                  <span className="text-xs leading-none shrink-0">🧱</span>
                </div>
                <p className="text-[8px] text-blue-700 mt-1 font-bold leading-tight">3+ factors</p>
              </button>

              <button
                onClick={() => {
                  setSelectedNumberPage("multiples");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-rose-50 to-rose-100/50 hover:from-rose-100 border border-rose-400 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-md min-h-[58px] hover:scale-[1.02] duration-200"
                id="btn_multiple_numbers"
                title="Multiples: Numbers in a table"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-rose-800">Multiples</h4>
                  <span className="text-xs leading-none shrink-0">❌</span>
                </div>
                <p className="text-[8px] text-rose-700 mt-1 font-bold leading-tight">Multiples table</p>
              </button>

              <button
                onClick={() => {
                  setSelectedNumberPage("divisibility");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-sky-50 to-sky-100/50 hover:from-sky-100 border border-sky-400 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-md min-h-[58px] hover:scale-[1.02] duration-200"
                id="btn_divisibility_rules"
                title="Divisibility Rules: Quick division tests"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-sky-800">Divisibility</h4>
                  <span className="text-xs leading-none shrink-0">➗</span>
                </div>
                <p className="text-[8px] text-sky-700 mt-1 font-bold leading-tight">Division rules tests</p>
              </button>

              <button
                onClick={() => {
                  setSelectedNumberPage("square");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-violet-50 to-violet-100/50 hover:from-violet-100 border border-violet-400 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-md min-h-[58px] hover:scale-[1.02] duration-200"
                id="btn_square_numbers"
                title="Square Numbers: Perfect squares"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-violet-800">Square</h4>
                  <span className="text-xs leading-none shrink-0">⏹️</span>
                </div>
                <p className="text-[8px] text-violet-700 mt-1 font-bold leading-tight">Perfect squares</p>
              </button>

              <button
                onClick={() => {
                  setSelectedNumberPage("real");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-indigo-50 to-indigo-100/50 hover:from-indigo-100 border border-indigo-400 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-md min-h-[58px] hover:scale-[1.02] duration-200"
                id="btn_real_numbers"
                title="Real Numbers: Rational, irrational, integers"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-indigo-800">Real Num</h4>
                  <span className="text-xs leading-none shrink-0">🌍</span>
                </div>
                <p className="text-[8px] text-indigo-700 mt-1 font-bold leading-tight">Rationals & Irrationals</p>
              </button>

              <button
                onClick={() => {
                  setSelectedNumberPage("imaginary");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-fuchsia-50 to-fuchsia-100/50 hover:from-fuchsia-100 border border-fuchsia-400 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-md min-h-[58px] hover:scale-[1.02] duration-200"
                id="btn_imaginary_numbers"
                title="Imaginary Numbers: Numbers with i"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-fuchsia-800">Imaginary</h4>
                  <span className="text-xs leading-none shrink-0">🔮</span>
                </div>
                <p className="text-[8px] text-fuchsia-700 mt-1 font-bold leading-tight">Complex & i = √-1</p>
              </button>
            </div>
          </div>
        )}

        {/* Grade 9 Real Number System Topics Explorer */}
        {selectedChapter.id === "g9_numbersystems" && (
          <div className="mt-4 pt-4 border-t border-white/10" id="g9_topics_bar">
            <span className="text-[11px] uppercase font-bold text-natural-cream tracking-wider block mb-2 flex items-center gap-1.5">
              <Sparkles size={12} className="text-natural-gold-accent" /> Chapter Topics Explorer:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setSelectedG9Topic("rational_intro");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-teal-50 to-teal-100/50 hover:from-teal-100 border border-teal-400 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-md min-h-[58px] hover:scale-[1.02] duration-200"
                id="btn_g9_rational"
                title="Rational Numbers: Representation & Insertion"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-teal-800 font-sans">Rational Numbers</h4>
                  <span className="text-xs leading-none shrink-0">🔢</span>
                </div>
                <p className="text-[8px] text-teal-700 mt-1 font-bold leading-tight">Find numbers between A & B</p>
              </button>

              <button
                onClick={() => {
                  setSelectedG9Topic("irrational_numbers");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-indigo-50 to-indigo-100/50 hover:from-indigo-100 border border-indigo-400 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-md min-h-[58px] hover:scale-[1.02] duration-200"
                id="btn_g9_irrational"
                title="Irrational Numbers: Root 2 Plotting"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-indigo-800 font-sans">Irrational Num</h4>
                  <span className="text-xs leading-none shrink-0">📐</span>
                </div>
                <p className="text-[8px] text-indigo-700 mt-1 font-bold leading-tight">Plotting & Root spiral</p>
              </button>

              <button
                onClick={() => {
                  setSelectedG9Topic("decimal_expansions");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-emerald-50 to-emerald-100/50 hover:from-emerald-100 border border-emerald-400 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-md min-h-[58px] hover:scale-[1.02] duration-200"
                id="btn_g9_decimal"
                title="Decimal Expansions: Recurring to p/q"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-emerald-800 font-sans">Decimal Exp</h4>
                  <span className="text-xs leading-none shrink-0">♾️</span>
                </div>
                <p className="text-[8px] text-emerald-700 mt-1 font-bold leading-tight">Express as p/q</p>
              </button>

              <button
                onClick={() => {
                  setSelectedG9Topic("real_operations");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-violet-50 to-violet-100/50 hover:from-violet-100 border border-violet-400 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-md min-h-[58px] hover:scale-[1.02] duration-200"
                id="btn_g9_operations"
                title="Radical Operations: Simplifications"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-violet-800 font-sans">Operations</h4>
                  <span className="text-xs leading-none shrink-0">📊</span>
                </div>
                <p className="text-[8px] text-violet-700 mt-1 font-bold leading-tight">Simplify square roots</p>
              </button>

              <button
                onClick={() => {
                  setSelectedG9Topic("rationalizing");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-orange-50 to-orange-100/50 hover:from-orange-100 border border-orange-400 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-md min-h-[58px] hover:scale-[1.02] duration-200"
                id="btn_g9_rationalize"
                title="Rationalize Denominator"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-orange-800 font-sans">Rationalizing</h4>
                  <span className="text-xs leading-none shrink-0">🪄</span>
                </div>
                <p className="text-[8px] text-orange-700 mt-1 font-bold leading-tight">Conjugate multiplier</p>
              </button>

              <button
                onClick={() => {
                  setSelectedG9Topic("exponent_laws");
                  if (onActionComplete) onActionComplete(5);
                }}
                className="flex flex-col justify-between p-2.5 bg-gradient-to-r from-rose-50 to-rose-100/50 hover:from-rose-100 border border-rose-400 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-md min-h-[58px] hover:scale-[1.02] duration-200"
                id="btn_g9_exponents"
                title="Laws of Exponents"
              >
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-rose-800 font-sans">Exponent Laws</h4>
                  <span className="text-xs leading-none shrink-0">⚡</span>
                </div>
                <p className="text-[8px] text-rose-700 mt-1 font-bold leading-tight">Exponents & base rules</p>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Render Grade 1 custom interactive game directly */}
        {selectedChapter.id.startsWith("g1_") && (
          <div className="space-y-6" id="g1_content_wrapper">
            <Grade1InteractiveGame
              chapterId={selectedChapter.id}
              onActionComplete={onActionComplete}
            />

            {/* Fun Classroom Notes and Cartoon Steps */}
            <div className="bg-gradient-to-br from-[#fbf8f3] to-amber-50/10 rounded-2xl border border-natural-beige-dark/55 p-5 space-y-5" id="g1_classroom_notes">
              <div className="flex items-center gap-2 border-b border-natural-beige-dark/40 pb-3">
                <span className="text-xl">📚</span>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-natural-terracotta leading-none">Classroom Notes</h4>
                  <p className="text-[9px] font-bold text-natural-sage">Let's learn key concepts together!</p>
                </div>
              </div>

              {/* Key Formulas/Rules */}
              {lesson && lesson.keyFormulas && lesson.keyFormulas.length > 0 && (
                <div className="space-y-3">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">Key Highlights</span>
                  <div className="grid grid-cols-1 gap-3">
                    {lesson.keyFormulas.map((kf, i) => (
                      <div key={i} className="bg-white p-3.5 rounded-xl border border-natural-beige-dark/30 shadow-xs space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] bg-amber-100 text-amber-800 font-black px-1.5 py-0.5 rounded-md">{kf.name}</span>
                        </div>
                        <p className="text-xs font-black text-natural-primary">{kf.formula}</p>
                        <p className="text-[10px] text-slate-600 font-bold leading-normal">{kf.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Easy Fun Steps */}
              {lesson && lesson.steps && lesson.steps.length > 0 && (
                <div className="space-y-3">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">Fun Steps & Examples</span>
                  <div className="space-y-3">
                    {lesson.steps.map((st, i) => (
                      <div key={i} className="flex gap-3 bg-white p-3.5 rounded-xl border border-natural-beige-dark/30 shadow-xs relative">
                        <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-black text-xs shrink-0 border border-indigo-100">
                          {i + 1}
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-[11px] font-black text-slate-800">{st.title}</h5>
                          <p className="text-[10px] text-slate-600 font-bold leading-normal">{st.desc}</p>
                          {st.example && (
                            <div className="mt-1 bg-amber-50/40 px-2 py-1.5 rounded-lg border border-amber-100 border-dashed text-[9.5px] font-mono text-amber-900 leading-normal">
                              <strong className="font-sans text-[8px] uppercase font-black text-amber-700 tracking-wide block mb-0.5">Example:</strong>
                              {st.example}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Play and Practice Shortcuts banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => handleToolNavigation(lesson.visualContext)}
            className="flex items-center justify-between p-3.5 bg-gradient-to-r from-natural-cream to-[#eeddbb] hover:from-[#eeddbb] border border-natural-terracotta/30 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-xs hover:scale-[1.01]"
            id="btn_launch_visual_tool"
          >
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-natural-terracotta">
                {selectedChapter.id === "g9_numbersystems"
                  ? "Real Number Line Sandbox"
                  : "Launch Visual Tool"}
              </h4>
              <p className="text-[10px] text-natural-sage mt-0.5">
                {selectedChapter.id === "g9_numbersystems"
                  ? "Plot rational finding and root spiral constructions on a real line"
                  : "Interact with the math formulas visually"}
              </p>
            </div>
            <div className="p-2 bg-natural-terracotta text-white rounded-lg">
              <Play size={14} className="fill-current" />
            </div>
          </button>

          <button
            onClick={() => {
              onOpenWorksheet();
              if (onActionComplete) onActionComplete(5);
            }}
            className="flex items-center justify-between p-3.5 bg-gradient-to-r from-natural-cream to-natural-gold-accent hover:to-natural-gold-accent/80 border border-natural-primary/30 text-natural-dark rounded-xl cursor-pointer transition text-left shadow-xs hover:scale-[1.01]"
            id="btn_launch_quiz"
          >
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-natural-primary">
                {selectedChapter.id === "g9_numbersystems"
                  ? "Grade 9 Chapter 1 Quiz"
                  : "Test"}
              </h4>
              <p className="text-[10px] text-natural-sage mt-0.5">
                {selectedChapter.id === "g9_numbersystems"
                  ? "Practice rationalizing, locating irrationals, and applying exponent laws"
                  : "Solve questions & earn 1000 points"}
              </p>
            </div>
            <div className="p-2 bg-natural-primary text-white rounded-lg">
              <FileText size={14} />
            </div>
          </button>
        </div>

        {/* Indian History / Trivia Section */}
        <div className="bg-natural-cream border border-natural-beige-dark/60 rounded-2xl p-5 relative overflow-hidden" id="did_you_know_box">
          <div className="absolute -right-2 -bottom-2 text-6xl opacity-10 select-none">🇮🇳</div>
          <h4 className="text-xs font-black text-natural-terracotta uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Sparkles size={14} className="text-natural-terracotta animate-pulse" /> Did You Know? (Ganit Itihas)
          </h4>
          <p className="text-xs text-natural-dark leading-relaxed">
            {lesson.didYouKnow}
          </p>
        </div>
      </div>
    </div>
  );
}

