import React, { useState, useEffect } from "react";
import { Plus, Minus, RotateCcw, AlertCircle, HelpCircle, Clock, Sparkles, Award, Check, ThumbsUp, ArrowRight, Star } from "lucide-react";
import { RationalIntroTopic, ProbabilityTopic, AlgebraicIdentitiesTopic, CoordinateGeometryTopic } from "./G9NumberSystemTopics";
import GeometryExplorer from "./GeometryExplorer";
import FractionOperationsExplorer from "./FractionOperationsExplorer";
import Grade1InteractiveGame from "./Grade1Games";
import Grade6TopicExplorer from "./Grade6TopicExplorer";
import Grade6MathsPaper from "./Grade6MathsPaper";
import G6TeluguGrammarExplorer from "./G6TeluguGrammarExplorer";

interface VisualToolsProps {
  chapterId?: string;
  subject?: string;
  grade?: number;
  initialTool?: "fraction" | "numberline" | "placevalue" | "perimeter" | "typesofnumbers" | "clock";
  initialHighlightMode?: string;
  onActionComplete?: (points: number, badgeUnlocked?: string) => void;
}

const CHAPTER_TABS_MAP: Record<string, ("fraction" | "numberline" | "placevalue" | "perimeter" | "typesofnumbers" | "clock")[]> = {
  numbersystem: ["typesofnumbers", "placevalue", "numberline"],
  fractions: ["fraction", "numberline"],
  decimals: ["placevalue", "numberline"],
  algebra: ["perimeter", "typesofnumbers"],
  integers: ["numberline", "typesofnumbers"],
  geometry: ["perimeter"],
  mensuration: ["perimeter"],
  g1_clock: ["clock"],
  g1_tables: ["placevalue"],
  g1_counting: ["placevalue"],
  g1_shapes: ["perimeter"],
  g1_comparison: ["numberline"],
  g1_compare: ["numberline"],
  g1_sweetshop: ["numberline", "placevalue"]
};

export default function VisualTools({ chapterId, subject = "maths", grade, initialTool = "fraction", initialHighlightMode = "all", onActionComplete }: VisualToolsProps) {
  // Direct chapter routing for non-maths subjects or specialized math chapters
  if (chapterId?.startsWith("g6_tel_")) {
    return <G6TeluguGrammarExplorer activeChapterId={chapterId} />;
  }

  if (chapterId?.startsWith("g6_soc_") || chapterId?.startsWith("g1_evs_")) {
    return <SocialScienceVisualLab chapterId={chapterId} />;
  }

  if (subject && subject !== "maths") {
    if (subject === "physics") {
      return <PhysicsVisualLab chapterId={chapterId} />;
    }
    if (subject === "chemistry") {
      return <ChemistryVisualLab chapterId={chapterId} />;
    }
    if (subject === "social_science" || subject === "evs") {
      return <SocialScienceVisualLab chapterId={chapterId} />;
    }
    if (subject === "telugu" || subject === "hindi" || subject === "english") {
      return <LanguageVisualLab chapterId={chapterId} subject={subject} />;
    }
  }

  // Grade 1 Math Chapters Interactive Games
  if (chapterId?.startsWith("g1_")) {
    return <Grade1InteractiveGame chapterId={chapterId} onActionComplete={onActionComplete} />;
  }

  // Specialized Math Chapter Interactives
  if (chapterId === "g9_probability") {
    return <ProbabilityTopic />;
  }
  if (chapterId === "g9_polynomials") {
    return <AlgebraicIdentitiesTopic />;
  }
  if (chapterId === "g9_coordinate") {
    return <CoordinateGeometryTopic />;
  }
  if (chapterId === "g9_numbersystems") {
    return <RationalIntroTopic />;
  }
  if (chapterId === "geometry") {
    return <GeometryExplorer />;
  }
  if (chapterId === "fractions") {
    return <FractionOperationsExplorer />;
  }
  if (chapterId === "patterns") {
    return <Grade6TopicExplorer defaultTab="patterns" hideTabSwitcher={true} />;
  }
  if (chapterId === "g6_exam_paper") {
    return <Grade6MathsPaper />;
  }

  const [activeTab, setActiveTab] = useState<"fraction" | "numberline" | "placevalue" | "perimeter" | "typesofnumbers" | "clock">(initialTool as any);
  
  // 1. Fractions State
  const [numerator, setNumerator] = useState<number>(3);
  const [denominator, setDenominator] = useState<number>(8);
  
  // 2. Number Line State
  const [startPos, setStartPos] = useState<number>(0);
  const [stepsCount, setStepsCount] = useState<number>(5);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [numberLineResult, setNumberLineResult] = useState<number>(5);
  
  // 3. Place Value State
  const [decimalInput, setDecimalInput] = useState<string>("24.75");
  const [tens, setTens] = useState<number>(2);
  const [ones, setOnes] = useState<number>(4);
  const [tenths, setTenths] = useState<number>(7);
  const [hundredths, setHundredths] = useState<number>(5);
  
  // 4. Perimeter/Area State
  const [rectLength, setRectLength] = useState<number>(8);
  const [rectWidth, setRectWidth] = useState<number>(5);

  // 5. Types of Numbers State
  const [selectedNum, setSelectedNum] = useState<number>(12);
  const [gridHighlightMode, setGridHighlightMode] = useState<"all" | "prime" | "composite" | "even" | "odd" | "square" | "multiple" | "divisibility" | "real" | "imaginary" | "whole">("all");
  const [highlightMultipleOf, setHighlightMultipleOf] = useState<number>(3);
  const [selectedDivisibilityRule, setSelectedDivisibilityRule] = useState<number>(3);
  const [realSubsetFilter, setRealSubsetFilter] = useState<"all" | "natural" | "whole" | "integer" | "rational" | "irrational">("all");
  const [complexReal, setComplexReal] = useState<number>(3);
  const [complexImag, setComplexImag] = useState<number>(4);

  // 6. Clock Reading Lab State
  const CLOCK_CHALLENGES = [
    { targetHour: 3, targetMinute: 0, timeStr: "3:00", description: "Three o'clock" },
    { targetHour: 10, targetMinute: 30, timeStr: "10:30", description: "Half-past ten" },
    { targetHour: 6, targetMinute: 0, timeStr: "6:00", description: "Six o'clock" },
    { targetHour: 1, targetMinute: 30, timeStr: "1:30", description: "Half-past one" },
    { targetHour: 8, targetMinute: 0, timeStr: "8:00", description: "Eight o'clock" },
    { targetHour: 12, targetMinute: 30, timeStr: "12:30", description: "Half-past twelve" },
    { targetHour: 5, targetMinute: 0, timeStr: "5:00", description: "Five o'clock" }
  ];

  const [currentClockIndex, setCurrentClockIndex] = useState<number>(0);
  const [placedHour, setPlacedHour] = useState<number | null>(null);
  const [placedMinute, setPlacedMinute] = useState<number | null>(null);
  const [draggingHand, setDraggingHand] = useState<'hour' | 'minute' | null>(null);
  const [selectedHandType, setSelectedHandType] = useState<'hour' | 'minute' | null>(null);
  const [clockFeedback, setClockFeedback] = useState<string>("Namaste! I am Ganit Mitra. Let's set the clock together! Look at the Target Time. Remember: Set the short Hour hand FIRST!");
  const [clockEmotion, setClockEmotion] = useState<'happy' | 'thinking' | 'victory' | 'neutral'>("neutral");
  const [clockSuccess, setClockSuccess] = useState<boolean>(false);
  const [clockHoverNum, setClockHoverNum] = useState<number | null>(null);

  const challenge = CLOCK_CHALLENGES[currentClockIndex];

  const handlePlaceHand = (hand: 'hour' | 'minute', num: number) => {
    if (clockSuccess) return;

    if (hand === 'hour') {
      setPlacedHour(num);
      setSelectedHandType(null);
      
      const isCorrectHour = num === challenge.targetHour;
      if (isCorrectHour) {
        setClockFeedback("Aha! Shabash! 👏 You set the Hour Hand pointing to " + num + " first. That is correct! Now the long Minute Hand is unlocked. Drag and drop the long blue minute hand next!");
        setClockEmotion("happy");
        awardPoints(5);
      } else {
        setClockFeedback("Hmm... pointing to " + num + "? Look closely! Our target time is " + challenge.timeStr + ". Let's drag the short red Hour Hand FIRST to point to " + challenge.targetHour + "!");
        setClockEmotion("thinking");
      }
    } else if (hand === 'minute') {
      if (placedHour !== challenge.targetHour) {
        setClockFeedback("Hold on, beta! 🚦 Remember the Golden Rule: We always set the short Hour hand FIRST before setting the Minute hand! Set your Hour Hand to " + challenge.targetHour + " first!");
        setClockEmotion("thinking");
        return;
      }

      setPlacedMinute(num);
      setSelectedHandType(null);
      
      const expectedMinuteNum = challenge.targetMinute === 30 ? 6 : 12;
      const isCorrectMinute = num === expectedMinuteNum;

      if (isCorrectMinute) {
        setClockSuccess(true);
        setClockFeedback("Mubarak ho! 🎉 Excellent! You read hours first (" + challenge.targetHour + ") and minutes next (" + (challenge.targetMinute === 30 ? "30" : "00") + "). The time is indeed " + challenge.timeStr + "! You've earned 15 XP. Let's go to the next challenge!");
        setClockEmotion("victory");
        awardPoints(15);
      } else {
        const expectedLabel = challenge.targetMinute === 30 ? "6 (for 30 minutes)" : "12 (for 00 minutes)";
        setClockFeedback("Oops! You placed the Minute Hand on " + num + ", which is " + (num === 6 ? "30 minutes" : num === 12 ? "00 minutes" : (num * 5) + " minutes") + ". But we need " + (challenge.targetMinute === 30 ? "half-past (30 minutes)" : "o'clock (00 minutes)") + ". Try dragging the long blue hand to " + expectedLabel + "!");
        setClockEmotion("thinking");
      }
    }
  };

  const handleResetHands = () => {
    setPlacedHour(null);
    setPlacedMinute(null);
    setSelectedHandType(null);
    setClockSuccess(false);
    setClockFeedback("Let's try again! Drag the short red Hour Hand FIRST to the hour " + challenge.targetHour + "!");
    setClockEmotion("neutral");
  };

  const handleNextChallenge = () => {
    const nextIdx = (currentClockIndex + 1) % CLOCK_CHALLENGES.length;
    setCurrentClockIndex(nextIdx);
    setPlacedHour(null);
    setPlacedMinute(null);
    setSelectedHandType(null);
    setClockSuccess(false);
    const nextChallenge = CLOCK_CHALLENGES[nextIdx];
    setClockFeedback("New Challenge! Can you set the clock to " + nextChallenge.timeStr + " (" + nextChallenge.description + ")? Remember: Hour hand FIRST!");
    setClockEmotion("neutral");
  };

  const getCoords = (num: number, r: number) => {
    const angleRad = ((num * 30 - 90) * Math.PI) / 180;
    return {
      x: 110 + r * Math.cos(angleRad),
      y: 110 + r * Math.sin(angleRad)
    };
  };

  useEffect(() => {
    if (chapterId) {
      const allowed = CHAPTER_TABS_MAP[chapterId] || [];
      if (allowed.length > 0) {
        if (allowed.includes(initialTool)) {
          setActiveTab(initialTool);
        } else {
          setActiveTab(allowed[0]);
        }
        return;
      }
    }
    setActiveTab(initialTool);
  }, [initialTool, chapterId]);

  useEffect(() => {
    if (initialHighlightMode) {
      setGridHighlightMode(initialHighlightMode as any);
    }
  }, [initialHighlightMode]);

  // Handle Number Line Calculation
  useEffect(() => {
    const change = direction === "right" ? stepsCount : -stepsCount;
    const finalVal = startPos + change;
    setNumberLineResult(finalVal);
  }, [startPos, stepsCount, direction]);

  // Handle Decimal Place Value Decomposition
  const handleDecimalParse = (val: string) => {
    setDecimalInput(val);
    const num = parseFloat(val);
    if (isNaN(num)) return;
    
    const parts = val.split(".");
    const wholeStr = parts[0] || "0";
    const fracStr = parts[1] || "0";
    
    // Parse Whole Number (Tens, Ones)
    const wholeNum = parseInt(wholeStr, 10);
    const calculatedTens = Math.floor((wholeNum % 100) / 10);
    const calculatedOnes = wholeNum % 10;
    
    // Parse Decimal (Tenths, Hundredths)
    const calculatedTenths = parseInt(fracStr.charAt(0) || "0", 10);
    const calculatedHundredths = parseInt(fracStr.charAt(1) || "0", 10);
    
    setTens(calculatedTens);
    setOnes(calculatedOnes);
    setTenths(calculatedTenths);
    setHundredths(calculatedHundredths);
  };

  const awardPoints = (points: number, badge?: string) => {
    if (onActionComplete) {
      onActionComplete(points, badge);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-natural-beige-dark overflow-hidden" id="visual_math_lab">
      {/* Tab bar header */}
      <div className="flex border-b border-natural-beige-dark bg-natural-beige-light overflow-x-auto scrollbar-none scroll-smooth">
        {(() => {
          const allowedTabs: readonly string[] = chapterId && CHAPTER_TABS_MAP[chapterId]
            ? CHAPTER_TABS_MAP[chapterId]
            : (() => {
                if (chapterId) {
                  if (chapterId.includes("frac")) return ["fraction", "numberline"];
                  if (chapterId.includes("num") || chapterId.includes("count")) return ["typesofnumbers", "placevalue"];
                  if (chapterId.includes("dec")) return ["placevalue", "numberline"];
                  if (chapterId.includes("int")) return ["numberline", "typesofnumbers"];
                  if (chapterId.includes("geom") || chapterId.includes("shape") || chapterId.includes("peri") || chapterId.includes("area") || chapterId.includes("mens")) return ["perimeter"];
                  if (chapterId.includes("clock") || chapterId.includes("time")) return ["clock"];
                }
                return ["typesofnumbers", "numberline"];
              })();

          const tabDetails = [
            { id: "fraction", label: "🍕 Fractions Circle", idAttr: "btn_tab_fraction" },
            { id: "numberline", label: "🔢 Integer Line", idAttr: "btn_tab_numberline" },
            { id: "placevalue", label: "🪙 Decimal Grid", idAttr: "btn_tab_placevalue" },
            { id: "perimeter", label: "📏 Rectangle Lab", idAttr: "btn_tab_perimeter" },
            { id: "typesofnumbers", label: "🔢 Types of Numbers", idAttr: "btn_tab_typesofnumbers" },
            { id: "clock", label: "⏰ Clock Reading Lab", idAttr: "btn_tab_clock" }
          ] as const;

          return tabDetails.filter(tab => allowedTabs.includes(tab.id)).map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); awardPoints(5); }}
              className={`flex-1 py-3.5 px-4 text-center text-sm font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-natural-terracotta text-natural-dark bg-white font-extrabold"
                  : "border-transparent text-natural-sage hover:text-natural-dark hover:bg-natural-beige-light/50"
              }`}
              id={tab.idAttr}
            >
              {tab.label}
            </button>
          ));
        })()}
      </div>

      <div className="flex-1 p-5 overflow-y-auto">
        {/* FRACTION CIRCLE TOOL */}
        {activeTab === "fraction" && (
          <div className="flex flex-col lg:flex-row gap-6 h-full" id="fraction_tool_container">
            <div className="flex-1 flex flex-col justify-center items-center bg-amber-50/30 rounded-xl border border-amber-100 p-6">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-widest bg-amber-100 px-2.5 py-1 rounded-full mb-4">
                Interactive Pie Visualizer
              </span>
              
              {/* Pie SVG Rendering */}
              <div className="relative w-48 h-48 mb-6">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {/* Background Circle */}
                  <circle cx="50" cy="50" r="45" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
                  
                  {/* Generating Pie slices */}
                  {Array.from({ length: denominator }).map((_, i) => {
                    const angle = 360 / denominator;
                    const startAngle = i * angle;
                    const endAngle = (i + 1) * angle;
                    const isShaded = i < numerator;
                    
                    // Math for SVG pie path
                    const x1 = 50 + 45 * Math.cos((startAngle * Math.PI) / 180);
                    const y1 = 50 + 45 * Math.sin((startAngle * Math.PI) / 180);
                    const x2 = 50 + 45 * Math.cos((endAngle * Math.PI) / 180);
                    const y2 = 50 + 45 * Math.sin((endAngle * Math.PI) / 180);
                    
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    const pathData = `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                    
                    return (
                      <path
                        key={i}
                        d={pathData}
                        fill={isShaded ? "#f59e0b" : "#fffbeb"}
                        stroke="#b45309"
                        strokeWidth="1.5"
                        className="transition-all duration-300 hover:opacity-95"
                      />
                    );
                  })}
                </svg>
                
                {/* Center fractional text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="bg-white/95 backdrop-blur-xs px-3 py-2 rounded-lg border border-amber-200 shadow-xs flex flex-col items-center text-center font-bold text-amber-900 min-w-[50px]">
                    <span>{numerator}</span>
                    <hr className="w-8 border-amber-400 my-0.5" />
                    <span>{denominator}</span>
                  </span>
                </div>
              </div>

              {/* Fractional Status */}
              <div className="text-center">
                <h3 className="font-bold text-slate-800 text-lg">
                  {numerator} out of {denominator} equal parts
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Type:{" "}
                  <span className="font-semibold text-amber-700">
                    {numerator < denominator
                      ? "Proper Fraction (Bhinn)"
                      : numerator === denominator
                      ? "One Whole Unit (1)"
                      : "Improper Fraction (Mixed Fraction: " +
                        Math.floor(numerator / denominator) +
                        " " +
                        (numerator % denominator) +
                        "/" +
                        denominator +
                        ")"}
                  </span>
                </p>
              </div>
            </div>

            {/* Fraction Controls */}
            <div className="w-full lg:w-72 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pt-5 lg:pt-0 lg:pl-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">
                    Numerator (Parts selected): {numerator}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        if (numerator > 1) {
                          setNumerator(numerator - 1);
                          awardPoints(1);
                        }
                      }}
                      className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer text-slate-700 transition"
                      id="btn_dec_num"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="range"
                      min="1"
                      max={denominator * 2}
                      value={numerator}
                      onChange={(e) => {
                        setNumerator(parseInt(e.target.value, 10));
                        awardPoints(2);
                      }}
                      className="flex-1 accent-amber-500 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <button
                      onClick={() => {
                        setNumerator(numerator + 1);
                        awardPoints(1);
                        if (numerator >= denominator * 2) {
                          awardPoints(10, "Fraction Explorer Badge");
                        }
                      }}
                      className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer text-slate-700 transition"
                      id="btn_inc_num"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">
                    Denominator (Total equal parts): {denominator}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        if (denominator > 2) {
                          setDenominator(denominator - 1);
                          if (numerator > denominator - 1) setNumerator(denominator - 1);
                          awardPoints(1);
                        }
                      }}
                      className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer text-slate-700 transition"
                      id="btn_dec_den"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="range"
                      min="2"
                      max="16"
                      value={denominator}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setDenominator(val);
                        if (numerator > val * 2) setNumerator(val * 2);
                        awardPoints(2);
                      }}
                      className="flex-1 accent-amber-500 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <button
                      onClick={() => {
                        if (denominator < 16) {
                          setDenominator(denominator + 1);
                          awardPoints(1);
                        }
                      }}
                      className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer text-slate-700 transition"
                      id="btn_inc_den"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Equivalent Fractions Box */}
                <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-amber-800 flex items-center gap-1.5 uppercase mb-2">
                    <AlertCircle size={14} /> Equivalent Fraction Rule
                  </h4>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Multiplying numerator and denominator by the same number preserves the value!
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-xs font-bold text-amber-900 justify-center">
                    <span>{numerator} / {denominator}</span>
                    <span>=</span>
                    <span>{numerator * 2} / {denominator * 2}</span>
                    <span>=</span>
                    <span>{numerator * 3} / {denominator * 3}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => {
                    setNumerator(3);
                    setDenominator(8);
                    awardPoints(5);
                  }}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg cursor-pointer transition"
                >
                  <RotateCcw size={14} /> Reset Pie
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INTEGER NUMBER LINE */}
        {activeTab === "numberline" && (
          <div className="flex flex-col gap-6" id="numberline_tool_container">
            <div className="bg-sky-50/30 border border-sky-100 rounded-2xl p-6 flex flex-col justify-center items-center">
              <span className="text-xs font-semibold text-sky-700 uppercase tracking-widest bg-sky-100 px-2.5 py-1 rounded-full mb-6">
                Interactive Integer Line
              </span>

              {/* Number Line Visualizer */}
              <div className="relative w-full py-10 px-4 select-none">
                {/* Main Axis Line */}
                <div className="h-1 w-full bg-slate-300 relative rounded-full">
                  {/* Arrow Left */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1.5 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-r-slate-400" />
                  {/* Arrow Right */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-slate-400" />
                  
                  {/* Tick Marks */}
                  {Array.from({ length: 21 }).map((_, i) => {
                    const value = i - 10;
                    const leftPercent = `${(i / 20) * 100}%`;
                    const isZero = value === 0;
                    const isStart = value === startPos;
                    const isEnd = value === numberLineResult;

                    return (
                      <div
                        key={value}
                        style={{ left: leftPercent }}
                        className="absolute flex flex-col items-center -translate-x-1/2 -top-1.5"
                      >
                        {/* Tick Line */}
                        <div className={`w-0.5 h-4 rounded-full ${isZero ? "bg-slate-900 w-1 h-5" : "bg-slate-400"}`} />
                        
                        {/* Label */}
                        <span className={`text-[11px] mt-1 font-bold ${
                          isStart 
                            ? "text-sky-600 scale-125" 
                            : isEnd 
                            ? "text-emerald-600 scale-125 font-black" 
                            : isZero 
                            ? "text-slate-800" 
                            : "text-slate-400"
                        }`}>
                          {value}
                        </span>

                        {/* Starting position ring indicator */}
                        {isStart && (
                          <div className="absolute -top-6 w-5 h-5 rounded-full border-2 border-dashed border-sky-400 bg-sky-100 flex items-center justify-center animate-pulse">
                            <span className="text-[9px] font-black text-sky-700">S</span>
                          </div>
                        )}

                        {/* End position ring indicator */}
                        {isEnd && (
                          <div className="absolute -top-12 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md animate-bounce">
                            <span className="text-xs font-black">🤸</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Equation Display */}
              <div className="mt-8 text-center bg-white border border-sky-100 rounded-xl px-6 py-4 shadow-xs">
                <span className="text-xs text-slate-400 font-medium block uppercase tracking-wider mb-1">
                  Equation Visualized
                </span>
                <span className="font-mono text-3xl font-black text-slate-800">
                  {startPos} {direction === "right" ? "+" : "-"} {stepsCount} ={" "}
                  <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                    {numberLineResult}
                  </span>
                </span>
                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed max-w-md mx-auto">
                  Start at <strong className="text-sky-600">{startPos}</strong>, and walk{" "}
                  <strong className="text-slate-700">{stepsCount} steps</strong> to the{" "}
                  <strong className="text-slate-700">{direction === "right" ? "RIGHT" : "LEFT"}</strong>. 
                  You will land on <strong className="text-emerald-600">{numberLineResult}</strong>!
                </p>
              </div>
            </div>

            {/* Integer Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: Starting point */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
                  1. Starting Point: {startPos}
                </h4>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => { if (startPos > -10) { setStartPos(startPos - 1); awardPoints(1); } }}
                    className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-700 font-black cursor-pointer shadow-xs transition"
                  >
                    - 1
                  </button>
                  <button
                    onClick={() => { setStartPos(0); awardPoints(2); }}
                    className="px-3 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600 font-bold text-xs cursor-pointer shadow-xs transition"
                  >
                    Go to 0
                  </button>
                  <button
                    onClick={() => { if (startPos < 10) { setStartPos(startPos + 1); awardPoints(1); } }}
                    className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-700 font-black cursor-pointer shadow-xs transition"
                  >
                    + 1
                  </button>
                </div>
              </div>

              {/* Box 2: Walking Steps */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
                  2. Walk Steps: {stepsCount}
                </h4>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={stepsCount}
                  onChange={(e) => {
                    setStepsCount(parseInt(e.target.value, 10));
                    awardPoints(2);
                  }}
                  className="w-full accent-sky-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-3"
                />
              </div>

              {/* Box 3: Direction */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
                  3. Direction Walked
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setDirection("left"); awardPoints(2); }}
                    className={`flex-1 py-2 rounded-lg font-semibold text-xs cursor-pointer shadow-xs transition ${
                      direction === "left"
                        ? "bg-amber-500 text-white shadow-md"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    ⬅️ Left (Subtract)
                  </button>
                  <button
                    onClick={() => { setDirection("right"); awardPoints(2); }}
                    className={`flex-1 py-2 rounded-lg font-semibold text-xs cursor-pointer shadow-xs transition ${
                      direction === "right"
                        ? "bg-sky-500 text-white shadow-md"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    ➡️ Right (Add)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DECIMAL PLACE VALUE GRID */}
        {activeTab === "placevalue" && (
          <div className="flex flex-col gap-6" id="decimal_tool_container">
            <div className="bg-emerald-50/20 border border-emerald-100 rounded-2xl p-6 flex flex-col justify-center items-center">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-2.5 py-1 rounded-full mb-4">
                Decimal Place Value Decoder
              </span>

              {/* Custom Value Picker */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-slate-600">Enter a Decimal Number:</span>
                <input
                  type="text"
                  pattern="[0-9]*\.?[0-9]*"
                  value={decimalInput}
                  onChange={(e) => handleDecimalParse(e.target.value)}
                  className="px-3 py-1.5 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center font-mono font-bold text-emerald-900 w-28 bg-white"
                  placeholder="24.75"
                />
                <div className="flex gap-1.5">
                  <button
                    onClick={() => { handleDecimalParse("12.35"); awardPoints(5); }}
                    className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded font-semibold text-slate-600 cursor-pointer"
                  >
                    12.35
                  </button>
                  <button
                    onClick={() => { handleDecimalParse("5.08"); awardPoints(5); }}
                    className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded font-semibold text-slate-600 cursor-pointer"
                  >
                    5.08
                  </button>
                  <button
                    onClick={() => { handleDecimalParse("45.60"); awardPoints(5); }}
                    className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded font-semibold text-slate-600 cursor-pointer"
                  >
                    45.60
                  </button>
                </div>
              </div>

              {/* Dynamic Place Value Grid Layout */}
              <div className="w-full max-w-2xl bg-white border border-slate-150 rounded-xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-5 bg-emerald-600 text-white text-center font-bold text-xs md:text-sm py-3.5">
                  <div className="border-r border-emerald-500">Tens (10)</div>
                  <div className="border-r border-emerald-500">Ones (1)</div>
                  <div className="border-r border-emerald-500">Point (.)</div>
                  <div className="border-r border-emerald-500">Tenths (1/10)</div>
                  <div>Hundredths (1/100)</div>
                </div>
                
                <div className="grid grid-cols-5 text-center font-mono text-2xl md:text-4xl font-black text-slate-800 py-6 bg-slate-50/50">
                  <div className="border-r border-slate-100 flex items-center justify-center text-emerald-800">{tens}</div>
                  <div className="border-r border-slate-100 flex items-center justify-center text-emerald-700">{ones}</div>
                  <div className="border-r border-slate-100 flex items-center justify-center text-slate-400 font-sans">•</div>
                  <div className="border-r border-slate-100 flex items-center justify-center text-sky-600">{tenths}</div>
                  <div className="flex items-center justify-center text-indigo-600">{hundredths}</div>
                </div>

                <div className="grid grid-cols-5 text-center font-medium text-[10px] md:text-xs text-slate-500 py-3 bg-white border-t border-slate-100">
                  <div className="border-r border-slate-100">Value: {tens * 10}</div>
                  <div className="border-r border-slate-100">Value: {ones * 1}</div>
                  <div className="border-r border-slate-100">-</div>
                  <div className="border-r border-slate-100">Value: {tenths / 10}</div>
                  <div>Value: {hundredths / 100}</div>
                </div>
              </div>

              {/* Expanded Mathematical Expression */}
              <div className="mt-6 text-center leading-relaxed">
                <p className="text-sm text-slate-600">
                  Expanded Expression representation:
                </p>
                <p className="font-mono text-sm md:text-lg font-bold text-emerald-800 mt-2 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100 inline-block">
                  ({tens} × 10) + ({ones} × 1) + ({tenths} / 10) + ({hundredths} / 100)
                </p>
                <div className="flex justify-center items-center gap-2 mt-4 text-xs text-slate-500">
                  <HelpCircle size={14} className="text-emerald-500" />
                  <span>Indian Rupees: ₹{tens}{ones} and {tenths}{hundredths} Paise</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PERIMETER & AREA EXPLORER */}
        {activeTab === "perimeter" && (
          <div className="flex flex-col lg:flex-row gap-6 h-full" id="perimeter_tool_container">
            <div className="flex-1 flex flex-col justify-center items-center bg-violet-50/20 border border-violet-100 rounded-xl p-6">
              <span className="text-xs font-semibold text-violet-700 uppercase tracking-widest bg-violet-100 px-2.5 py-1 rounded-full mb-6">
                Dynamic 2D Schoolyard Explorer
              </span>

              {/* Dynamic canvas drawing space */}
              <div className="relative border-2 border-dashed border-violet-300 bg-white rounded-xl p-6 w-full max-w-sm h-64 flex items-center justify-center overflow-hidden">
                {/* Dynamically Sized Rectangle Box */}
                <div
                  style={{
                    width: `${rectLength * 22}px`,
                    height: `${rectWidth * 22}px`,
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                  className="bg-violet-100/80 border-4 border-violet-600 rounded-lg flex flex-col justify-center items-center transition-all duration-300 relative select-none shadow-md"
                >
                  {/* Length Label (Top) */}
                  <div className="absolute -top-7 text-xs font-extrabold text-violet-700 bg-white px-1.5 py-0.5 rounded border border-violet-200">
                    Length: {rectLength} m
                  </div>
                  {/* Width Label (Right) */}
                  <div className="absolute -right-10 md:-right-12 text-xs font-extrabold text-violet-700 bg-white px-1.5 py-0.5 rounded border border-violet-200 rotate-90 lg:rotate-0">
                    Width: {rectWidth} m
                  </div>
                  
                  {/* Interior summary */}
                  <span className="font-mono text-[11px] font-bold text-violet-800">
                    Area = {rectLength * rectWidth} m²
                  </span>
                </div>
              </div>

              {/* Formula & Explanations */}
              <div className="mt-6 w-full grid grid-cols-2 gap-4">
                <div className="bg-white border border-violet-100 rounded-xl p-3 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Perimeter (Boundary length)
                  </span>
                  <p className="font-mono text-lg font-black text-violet-800 mt-1">
                    2 × ({rectLength} + {rectWidth}) = {2 * (rectLength + rectWidth)} m
                  </p>
                </div>
                <div className="bg-white border border-violet-100 rounded-xl p-3 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Area (Interior Region)
                  </span>
                  <p className="font-mono text-lg font-black text-violet-800 mt-1">
                    {rectLength} × {rectWidth} = {rectLength * rectWidth} m²
                  </p>
                </div>
              </div>
            </div>

            {/* Dimensional Controls */}
            <div className="w-full lg:w-72 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pt-5 lg:pt-0 lg:pl-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">
                    Rectangle Length: {rectLength} meters
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { if (rectLength > 2) { setRectLength(rectLength - 1); awardPoints(1); } }}
                      className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer text-slate-700"
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="range"
                      min="2"
                      max="12"
                      value={rectLength}
                      onChange={(e) => {
                        setRectLength(parseInt(e.target.value, 10));
                        awardPoints(2);
                      }}
                      className="flex-1 accent-violet-600 h-2 bg-slate-150 rounded-lg appearance-none cursor-pointer"
                    />
                    <button
                      onClick={() => {
                        if (rectLength < 12) {
                          setRectLength(rectLength + 1);
                          awardPoints(1);
                        }
                      }}
                      className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer text-slate-700"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">
                    Rectangle Width: {rectWidth} meters
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { if (rectWidth > 2) { setRectWidth(rectWidth - 1); awardPoints(1); } }}
                      className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer text-slate-700"
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="range"
                      min="2"
                      max="8"
                      value={rectWidth}
                      onChange={(e) => {
                        setRectWidth(parseInt(e.target.value, 10));
                        awardPoints(2);
                      }}
                      className="flex-1 accent-violet-600 h-2 bg-slate-150 rounded-lg appearance-none cursor-pointer"
                    />
                    <button
                      onClick={() => {
                        if (rectWidth < 8) {
                          setRectWidth(rectWidth + 1);
                          awardPoints(1);
                        }
                      }}
                      className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer text-slate-700"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="bg-violet-50 border border-violet-200/50 rounded-xl p-4 text-xs text-violet-800 space-y-1.5 leading-relaxed">
                  <h4 className="font-bold flex items-center gap-1 uppercase mb-1">
                    📖 CBSE Math Context
                  </h4>
                  <p>
                    <strong>Fencing cost calculation:</strong>
                  </p>
                  <p className="font-mono bg-white px-2 py-1 rounded border border-violet-150">
                    If fencing wire costs ₹20 per meter, fencing this school yard completely would cost:
                    <br />
                    <strong>{2 * (rectLength + rectWidth)} m × ₹20 = ₹{2 * (rectLength + rectWidth) * 20}</strong>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => {
                    setRectLength(8);
                    setRectWidth(5);
                    awardPoints(5);
                  }}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg cursor-pointer transition"
                >
                  <RotateCcw size={14} /> Reset Rectangle
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TYPES OF NUMBERS TOOL */}
        {activeTab === "typesofnumbers" && (
          <div className="flex flex-col lg:flex-row gap-6 h-full animate-fade-in" id="typesofnumbers_tool_container">
            {/* LEFT COLUMN: INTERACTIVE GRID (1-100) & HIGHLIGHT CONTROLS */}
            <div className="flex-1 flex flex-col">
              {/* Highlight Controls */}
              <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl mb-4 space-y-3">
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
                  Select a category to highlight on the 100-Grid:
                </span>
                
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: "all", label: "✨ All Numbers", color: "border-slate-300 text-slate-700 bg-white" },
                    { id: "even", label: "🔢 Even (2, 4, 6...)", color: "border-emerald-200 text-emerald-800 bg-emerald-50/50" },
                    { id: "odd", label: "🔢 Odd (1, 3, 5...)", color: "border-teal-200 text-teal-800 bg-teal-50/50" },
                    { id: "prime", label: "⭐ Prime Numbers", color: "border-amber-200 text-amber-800 bg-amber-50/50" },
                    { id: "composite", label: "🧱 Composite", color: "border-blue-200 text-blue-800 bg-blue-50/50" },
                    { id: "square", label: "⏹️ Square Numbers", color: "border-violet-200 text-violet-800 bg-violet-50/50" },
                    { id: "multiple", label: "❌ Multiples of", color: "border-rose-200 text-rose-800 bg-rose-50/50" },
                    { id: "divisibility", label: "➗ Divisibility Rules", color: "border-fuchsia-200 text-fuchsia-800 bg-fuchsia-50/50" },
                    { id: "real", label: "🌍 Real Numbers", color: "border-indigo-200 text-indigo-800 bg-indigo-50/50" },
                    { id: "imaginary", label: "🔮 Imaginary Numbers", color: "border-pink-200 text-pink-800 bg-pink-50/50" },
                    { id: "whole", label: "🎛️ Whole Numbers", color: "border-orange-200 text-orange-800 bg-orange-50/50" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => {
                        setGridHighlightMode(btn.id as any);
                        awardPoints(2);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        gridHighlightMode === btn.id
                          ? "bg-slate-800 text-white border-slate-800 shadow-sm"
                          : `${btn.color} hover:brightness-95`
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                {/* Custom Sub-Controls for selected modes */}
                <div className="pt-1.5 border-t border-slate-200/50 text-xs text-slate-600">
                  {/* ALL MODE HELPER */}
                  {gridHighlightMode === "all" && (
                    <div className="text-[11px] text-slate-500 font-medium">
                      💡 Click on any number in the grid below to inspect its parity, primality, factors, and geometric structure!
                    </div>
                  )}

                  {/* EVEN MODE DEFINITION */}
                  {gridHighlightMode === "even" && (
                    <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                      <h4 className="text-[11px] font-extrabold uppercase text-emerald-800 flex items-center gap-1">
                        🔢 Even Numbers (सम संख्या)
                      </h4>
                      <p className="text-[11px] text-slate-700 font-bold leading-normal mt-1">
                        An <strong>Even number</strong> is an integer that can be divided by <strong>2</strong> with absolutely no remainder (remainder is 0). 
                        They always end with the digits <strong className="text-emerald-700">0, 2, 4, 6, or 8</strong>. 
                        <br />
                        <span className="text-slate-500 font-mono text-[10px] mt-1 block">Algebraic Form: 2k (where k is an integer)</span>
                      </p>
                    </div>
                  )}

                  {/* ODD MODE DEFINITION */}
                  {gridHighlightMode === "odd" && (
                    <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-xl">
                      <h4 className="text-[11px] font-extrabold uppercase text-teal-800 flex items-center gap-1">
                        🔢 Odd Numbers (विषम संख्या)
                      </h4>
                      <p className="text-[11px] text-slate-700 font-bold leading-normal mt-1">
                        An <strong>Odd number</strong> is an integer that <strong>cannot</strong> be divided evenly by <strong>2</strong>. 
                        When divided by 2, it always leaves a remainder of <strong className="text-teal-700">1</strong>. They end with the digits <strong className="text-teal-700">1, 3, 5, 7, or 9</strong>.
                        <br />
                        <span className="text-slate-500 font-mono text-[10px] mt-1 block">Algebraic Form: 2k + 1 (where k is an integer)</span>
                      </p>
                    </div>
                  )}

                  {/* PRIME MODE DEFINITION */}
                  {gridHighlightMode === "prime" && (
                    <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl">
                      <h4 className="text-[11px] font-extrabold uppercase text-amber-800 flex items-center gap-1">
                        ⭐ Prime Numbers (अभाज्य संख्या)
                      </h4>
                      <p className="text-[11px] text-slate-700 font-bold leading-normal mt-1">
                        A <strong>Prime number</strong> is a natural number greater than <strong>1</strong> that has exactly <strong>two</strong> positive factors: <strong>1</strong> and <strong>itself</strong>. It cannot be formed by multiplying two smaller natural numbers.
                        <br />
                        <span className="text-amber-700 font-bold text-[10px] mt-1 block">Examples: 2, 3, 5, 7, 11, 13, 17, 19, 23... (Note: 2 is the only even prime!)</span>
                      </p>
                    </div>
                  )}

                  {/* COMPOSITE MODE DEFINITION */}
                  {gridHighlightMode === "composite" && (
                    <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                      <h4 className="text-[11px] font-extrabold uppercase text-blue-800 flex items-center gap-1">
                        🧱 Composite Numbers (भाज्य संख्या)
                      </h4>
                      <p className="text-[11px] text-slate-700 font-bold leading-normal mt-1">
                        A <strong>Composite number</strong> is a positive whole number greater than <strong>1</strong> that has <strong>more than two</strong> factors. That means it can be divided evenly by numbers other than 1 and itself.
                        <br />
                        <span className="text-blue-700 font-bold text-[10px] mt-1 block">Examples: 4, 6, 8, 9, 10, 12, 14, 15... (Note: 1 is neither prime nor composite!)</span>
                      </p>
                    </div>
                  )}

                  {/* SQUARE MODE DEFINITION */}
                  {gridHighlightMode === "square" && (
                    <div className="p-3 bg-violet-50/50 border border-violet-100 rounded-xl">
                      <h4 className="text-[11px] font-extrabold uppercase text-violet-800 flex items-center gap-1">
                        ⏹️ Square Numbers (वर्ग संख्या)
                      </h4>
                      <p className="text-[11px] text-slate-700 font-bold leading-normal mt-1">
                        A <strong>Square number</strong> (or perfect square) is the product of some integer multiplied by <strong>itself</strong>. For example, 3 × 3 = 9, so 9 is a square number!
                        <br />
                        <span className="text-violet-700 font-bold text-[10px] mt-1 block">First few: 1 (1²), 4 (2²), 9 (3²), 16 (4²), 25 (5²), 36 (6²), 49 (7²), 64 (8²), 81 (9²), 100 (10²)...</span>
                      </p>
                    </div>
                  )}

                  {/* WHOLE MODE DEFINITION */}
                  {gridHighlightMode === "whole" && (
                    <div className="p-3 bg-orange-50/50 border border-orange-100 rounded-xl">
                      <h4 className="text-[11px] font-extrabold uppercase text-orange-800 flex items-center gap-1">
                        🎛️ Whole Numbers (पूर्ण संख्या)
                      </h4>
                      <p className="text-[11px] text-slate-700 font-bold leading-normal mt-1">
                        <strong>Whole numbers</strong> consist of all the standard positive counting integers (1, 2, 3, 4...) plus the number <strong>zero (0)</strong>. They do not have any fractional or decimal parts.
                        <br />
                        <span className="text-orange-700 font-bold text-[10px] mt-1 block">Set: &#123;0, 1, 2, 3, 4, 5...&#125;</span>
                      </p>
                    </div>
                  )}

                  {/* MULTIPLES OF CONTROLLER */}
                  {gridHighlightMode === "multiple" && (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-700">Show multiples of:</span>
                        <select
                          value={highlightMultipleOf}
                          onChange={(e) => setHighlightMultipleOf(parseInt(e.target.value, 10))}
                          className="px-2 py-1 rounded bg-white border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none"
                        >
                          {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20].map((num) => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                        <span className="text-slate-500 text-[11px] font-medium ml-2">
                          Highlights numbers like {highlightMultipleOf}, {highlightMultipleOf * 2}, {highlightMultipleOf * 3}...
                        </span>
                      </div>
                    </div>
                  )}

                  {/* DIVISIBILITY RULES CONTROLLER */}
                  {gridHighlightMode === "divisibility" && (
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-700">Check divisor rules for:</span>
                        <div className="flex flex-wrap gap-1">
                          {[2, 3, 4, 5, 6, 8, 9, 10, 11].map((val) => (
                            <button
                              key={val}
                              onClick={() => {
                                setSelectedDivisibilityRule(val);
                                awardPoints(3);
                              }}
                              className={`px-2 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                                selectedDivisibilityRule === val
                                  ? "bg-fuchsia-600 text-white border-fuchsia-600 shadow-xs"
                                  : "border-fuchsia-200 text-fuchsia-800 bg-fuchsia-50/30 hover:bg-fuchsia-50"
                              }`}
                            >
                              ÷ {val}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 bg-fuchsia-50/50 border border-fuchsia-100 rounded-xl">
                        <h4 className="text-[11px] font-extrabold uppercase text-fuchsia-800 flex items-center gap-1">
                          ⚡ Rule for Divisibility by {selectedDivisibilityRule}
                        </h4>
                        <p className="text-[11px] text-slate-700 font-bold mt-1 leading-normal">
                          {selectedDivisibilityRule === 2 && "Ends in an even digit (0, 2, 4, 6, 8). All highlighted numbers are even!"}
                          {selectedDivisibilityRule === 3 && "Sum of the digits must be divisible by 3. (e.g., for 57 -> 5 + 7 = 12, and 12 is divisible by 3)"}
                          {selectedDivisibilityRule === 4 && "The last two digits must form a number divisible by 4. (For 1-100, numbers divisible by 4)"}
                          {selectedDivisibilityRule === 5 && "The number must end in 0 or 5. (e.g., 5, 10, 15, 20...)"}
                          {selectedDivisibilityRule === 6 && "The number must be divisible by both 2 (must be even) and 3 (digits sum divisible by 3)."}
                          {selectedDivisibilityRule === 8 && "Divisible by 8. (Since 1000 is divisible by 8, you only need to check the last 3 digits of larger numbers!)"}
                          {selectedDivisibilityRule === 9 && "Sum of the digits must be divisible by 9. (e.g., for 81 -> 8 + 1 = 9, which is divisible by 9)"}
                          {selectedDivisibilityRule === 10 && "The number must end in exactly 0. All highlighted numbers are multiples of 10!"}
                          {selectedDivisibilityRule === 11 && "For 2-digit numbers (up to 100), both digits are identical (e.g., 11, 22, 33... up to 99)."}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* REAL NUMBERS CONTROLLER */}
                  {gridHighlightMode === "real" && (
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-700">Real Subsets:</span>
                        <div className="flex flex-wrap gap-1">
                          {[
                            { id: "all", label: "🌍 All Real (R)" },
                            { id: "natural", label: "ℕ Natural (1,2..)" },
                            { id: "whole", label: "🎛️ Whole (0,1..)" },
                            { id: "integer", label: "ℤ Integers" },
                            { id: "rational", label: "ℚ Rational (p/q)" },
                            { id: "irrational", label: "ℚ' Irrational" }
                          ].map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => {
                                setRealSubsetFilter(sub.id as any);
                                awardPoints(3);
                              }}
                              className={`px-2 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                                realSubsetFilter === sub.id
                                  ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                                  : "border-indigo-150 text-indigo-800 bg-indigo-50/20 hover:bg-indigo-50"
                              }`}
                            >
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 bg-indigo-50/30 border border-indigo-100 rounded-xl">
                        <h4 className="text-[11px] font-extrabold uppercase text-indigo-800">
                          ℹ️ {realSubsetFilter === "all" && "All Real Numbers (R)"}
                          {realSubsetFilter === "natural" && "Natural Numbers (ℕ)"}
                          {realSubsetFilter === "whole" && "Whole Numbers (🎛️)"}
                          {realSubsetFilter === "integer" && "Integers (ℤ)"}
                          {realSubsetFilter === "rational" && "Rational Numbers (ℚ)"}
                          {realSubsetFilter === "irrational" && "Irrational Numbers (ℚ')"}
                        </h4>
                        <p className="text-[11px] text-slate-700 font-bold mt-1 leading-normal">
                          {realSubsetFilter === "all" && "Real numbers represent any values on the continuous number line. Since all numbers on this 1-100 grid are standard positive integers, they are all REAL numbers!"}
                          {realSubsetFilter === "natural" && "Natural numbers are positive counting numbers starting from 1. All numbers 1-100 highlighted below are Natural numbers!"}
                          {realSubsetFilter === "whole" && "Whole numbers are all positive integers including zero (0). Numbers 1-100 are Whole numbers. (0 is also a whole number but not in this grid)"}
                          {realSubsetFilter === "integer" && "Integers include positive numbers, negative numbers, and zero. Since 1-100 are positive whole numbers, they are all Integers!"}
                          {realSubsetFilter === "rational" && "Rational numbers can be written as a fraction p/q (where p and q are integers and q is not 0). Since any integer 'x' can be written as 'x / 1', ALL 1-100 numbers are Rational!"}
                          {realSubsetFilter === "irrational" && "Irrational numbers CANNOT be written as a clean fraction. Examples include π (3.14159...) or √2. NONE of the 1-100 integers are Irrational!"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* IMAGINARY NUMBERS CONTROLLER */}
                  {gridHighlightMode === "imaginary" && (
                    <div className="space-y-3">
                      <div className="p-3 bg-pink-50/50 border border-pink-100 rounded-xl">
                        <h4 className="text-[11px] font-extrabold uppercase text-pink-800 flex items-center gap-1">
                          🔮 Imaginary and Complex Numbers (i = √-1)
                        </h4>
                        <p className="text-[11px] text-slate-700 font-bold leading-normal mt-1">
                          Imaginary numbers are written as <span className="text-pink-700 font-mono">b · i</span>, where <span className="font-bold font-mono">i = √-1</span>. They don't exist on the standard Real number line, so they are not on the 1-100 grid!
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 p-3 bg-white border border-slate-200 rounded-xl">
                        {/* Builder */}
                        <div className="flex-1 space-y-2">
                          <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                            Interactive Complex Builder:
                          </span>
                          <div className="flex items-center gap-2 justify-center text-lg font-black text-slate-800 bg-slate-50 p-2 rounded-xl border border-slate-150">
                            <span className="text-indigo-600">{complexReal}</span>
                            <span>+</span>
                            <span className="text-pink-600">{complexImag}i</span>
                          </div>
                          
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                              <span>Real part (a):</span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => {
                                    setComplexReal(prev => Math.max(-5, prev - 1));
                                    awardPoints(2);
                                  }}
                                  className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center font-bold cursor-pointer text-xs"
                                >
                                  -
                                </button>
                                <span className="w-4 text-center font-mono text-indigo-700">{complexReal}</span>
                                <button
                                  onClick={() => {
                                    setComplexReal(prev => Math.min(5, prev + 1));
                                    awardPoints(2);
                                  }}
                                  className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center font-bold cursor-pointer text-xs"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                              <span>Imaginary part (b):</span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => {
                                    setComplexImag(prev => Math.max(-5, prev - 1));
                                    awardPoints(2);
                                  }}
                                  className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center font-bold cursor-pointer text-xs"
                                >
                                  -
                                </button>
                                <span className="w-4 text-center font-mono text-pink-700">{complexImag}</span>
                                <button
                                  onClick={() => {
                                    setComplexImag(prev => Math.min(5, prev + 1));
                                    awardPoints(2);
                                  }}
                                  className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center font-bold cursor-pointer text-xs"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Argand coordinate plotting diagram */}
                        <div className="w-[120px] h-[120px] mx-auto bg-slate-50 border border-slate-200 rounded-xl relative overflow-hidden shrink-0 flex items-center justify-center">
                          {/* Axes */}
                          <div className="absolute w-full h-px bg-slate-300 top-[60px]" />
                          <div className="absolute h-full w-px bg-slate-300 left-[60px]" />
                          {/* Label Real / Imag */}
                          <span className="absolute right-1 top-[62px] text-[7px] font-black text-indigo-500 uppercase">Real</span>
                          <span className="absolute left-[62px] top-1 text-[7px] font-black text-pink-500 uppercase">Imag</span>
                          
                          {/* Plotted dot */}
                          <div
                            className="absolute w-2.5 h-2.5 rounded-full bg-pink-500 border border-pink-700 ring-2 ring-pink-400/50 animate-bounce"
                            style={{
                              left: `${60 + complexReal * 10 - 5}px`,
                              top: `${60 - complexImag * 10 - 5}px`
                            }}
                            title={`${complexReal} + ${complexImag}i`}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 100-Grid Title */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Interactive 1 - 100 Grid (Click any number to inspect)
                </span>
                <span className="text-[10px] text-slate-400">Selected: {selectedNum}</span>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-10 gap-1 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                {Array.from({ length: 100 }).map((_, idx) => {
                  const num = idx + 1;
                  const isEven = num % 2 === 0;
                  const isPrimeNum = isNumberPrime(num);
                  const isCompositeNum = num > 1 && !isPrimeNum;
                  const isSquare = Math.sqrt(num) % 1 === 0;
                  
                  let shouldHighlight = false;
                  let highlightColor = "";

                  if (gridHighlightMode === "even" && isEven) {
                    shouldHighlight = true;
                    highlightColor = "bg-emerald-100 text-emerald-900 border-emerald-300";
                  } else if (gridHighlightMode === "odd" && !isEven) {
                    shouldHighlight = true;
                    highlightColor = "bg-teal-100 text-teal-900 border-teal-300";
                  } else if (gridHighlightMode === "prime" && isPrimeNum) {
                    shouldHighlight = true;
                    highlightColor = "bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-400/30";
                  } else if (gridHighlightMode === "composite" && isCompositeNum) {
                    shouldHighlight = true;
                    highlightColor = "bg-blue-100 text-blue-900 border-blue-300";
                  } else if (gridHighlightMode === "square" && isSquare) {
                    shouldHighlight = true;
                    highlightColor = "bg-violet-100 text-violet-900 border-violet-300 ring-2 ring-violet-400/30";
                  } else if (gridHighlightMode === "multiple" && num % highlightMultipleOf === 0) {
                    shouldHighlight = true;
                    highlightColor = "bg-rose-100 text-rose-900 border-rose-300";
                  } else if (gridHighlightMode === "divisibility" && num % selectedDivisibilityRule === 0) {
                    shouldHighlight = true;
                    highlightColor = "bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300";
                  } else if (gridHighlightMode === "real") {
                    if (realSubsetFilter !== "irrational") {
                      shouldHighlight = true;
                      highlightColor = "bg-indigo-100 text-indigo-900 border-indigo-300";
                    }
                  } else if (gridHighlightMode === "whole") {
                    shouldHighlight = true;
                    highlightColor = "bg-orange-100 text-orange-900 border-orange-300";
                  }

                  const isSelected = selectedNum === num;

                  return (
                    <button
                      key={num}
                      onClick={() => {
                        setSelectedNum(num);
                        awardPoints(3);
                      }}
                      className={`h-9 rounded-lg border text-xs font-bold transition flex flex-col items-center justify-center relative cursor-pointer ${
                        isSelected
                          ? "bg-natural-primary text-white border-transparent ring-3 ring-natural-primary/40 scale-110 z-10 font-black shadow-md"
                          : shouldHighlight
                          ? `${highlightColor} shadow-inner`
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                      }`}
                    >
                      <span>{num}</span>
                      {shouldHighlight && !isSelected && (
                        <span className="w-1 h-1 rounded-full bg-current absolute bottom-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: DETAIL WORKSPACE */}
            <div className="w-full lg:w-80 flex flex-col border-t lg:border-t-0 lg:border-l border-slate-150 pt-5 lg:pt-0 lg:pl-6 space-y-5">
              {gridHighlightMode === "imaginary" ? (
                <>
                  {/* Imaginary Inspector Header */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      Complex Number Inspector
                    </span>
                    <div className="w-20 h-20 rounded-full bg-pink-100 text-pink-700 border-2 border-pink-400 flex items-center justify-center text-sm font-black mx-auto">
                      {complexReal} + {complexImag}i
                    </div>
                    <h3 className="font-extrabold text-slate-800 text-sm leading-none">
                      Complex & Imaginary Value
                    </h3>
                  </div>

                  {/* Complex Information Cards */}
                  <div className="space-y-3">
                    <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                      <span className="text-[10px] font-black text-indigo-500 uppercase">Real Component (a)</span>
                      <p className="text-xs text-slate-800">
                        The real part is <strong>{complexReal}</strong>. This is plotted along the horizontal axis of the complex plane.
                      </p>
                    </div>

                    <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                      <span className="text-[10px] font-black text-pink-500 uppercase">Imaginary Component (bi)</span>
                      <p className="text-xs text-slate-800">
                        The imaginary part is <strong>{complexImag}i</strong> (representing <strong>{complexImag} × √-1</strong>), plotted along the vertical axis.
                      </p>
                    </div>

                    <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                      <span className="text-[10px] font-black text-slate-500 uppercase">Vector Magnitude |z|</span>
                      <p className="text-xs text-slate-800">
                        The distance from origin is: <br />
                        <span className="font-mono font-bold text-slate-700">√({complexReal}² + {complexImag}²) = √({complexReal*complexReal} + {complexImag*complexImag}) ≈ {Math.sqrt(complexReal*complexReal + complexImag*complexImag).toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Giant Number Header */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      Number Inspector
                    </span>
                    <div className="w-16 h-16 rounded-full bg-natural-primary/15 text-natural-primary border-2 border-natural-primary flex items-center justify-center text-3xl font-black mx-auto">
                      {selectedNum}
                    </div>
                    <h3 className="font-extrabold text-slate-800 text-sm leading-none">
                      {gridHighlightMode === "divisibility" ? (
                        selectedNum % selectedDivisibilityRule === 0 ? `Divisible by ${selectedDivisibilityRule}!` : `Not Divisible by ${selectedDivisibilityRule}`
                      ) : gridHighlightMode === "real" ? (
                        `${realSubsetFilter.toUpperCase()} subset`
                      ) : gridHighlightMode === "whole" ? (
                        "Whole Number (पूर्ण संख्या)"
                      ) : (
                        selectedNum % 2 === 0 ? "Even Number (सम)" : "Odd Number (विषम)"
                      )}
                    </h3>
                  </div>

                  {/* Classification Info Cards */}
                  <div className="space-y-3">
                    {gridHighlightMode === "whole" && (
                      <div className="p-3 bg-orange-50/30 border border-orange-100 rounded-xl space-y-1">
                        <span className="text-[10px] font-black text-orange-600 uppercase">Whole Numbers (पूर्ण संख्या)</span>
                        <p className="text-xs text-slate-800">
                          Is <strong>{selectedNum}</strong> a Whole Number? <br />
                          <span className="text-emerald-700 font-bold">✓ Yes!</span> Whole numbers consist of all positive integers (counting numbers 1, 2, 3...) plus the number <strong>zero (0)</strong>. They do not have decimal or fractional parts.
                        </p>
                      </div>
                    )}

                    {gridHighlightMode === "divisibility" && (
                      <div className="p-3 bg-fuchsia-50/30 border border-fuchsia-100 rounded-xl space-y-1">
                        <span className="text-[10px] font-black text-fuchsia-600 uppercase">Divisibility Test</span>
                        <p className="text-xs text-slate-800">
                          Is <strong>{selectedNum}</strong> divisible by <strong>{selectedDivisibilityRule}</strong>?<br />
                          <strong>{selectedNum} ÷ {selectedDivisibilityRule} = {Math.floor(selectedNum / selectedDivisibilityRule)}</strong> with a remainder of <strong>{selectedNum % selectedDivisibilityRule}</strong>.<br />
                          {selectedNum % selectedDivisibilityRule === 0 ? (
                            <span className="text-emerald-700 font-bold">✓ Yes, it divides perfectly with 0 remainder!</span>
                          ) : (
                            <span className="text-rose-700 font-bold">✗ No, there is a leftover remainder of {selectedNum % selectedDivisibilityRule}!</span>
                          )}
                        </p>
                      </div>
                    )}

                    {gridHighlightMode === "real" && (
                      <div className="p-3 bg-indigo-50/30 border border-indigo-100 rounded-xl space-y-1">
                        <span className="text-[10px] font-black text-indigo-600 uppercase">Real Classifications</span>
                        <p className="text-xs text-slate-800">
                          <strong>{selectedNum}</strong> is:
                        </p>
                        <ul className="text-xs text-slate-700 list-disc list-inside space-y-0.5 pl-1">
                          <li><strong className="text-indigo-900">Real (R):</strong> Yes, belongs on the number line.</li>
                          <li><strong className="text-indigo-900">Rational (Q):</strong> Yes, can be written as {selectedNum}/1.</li>
                          <li><strong className="text-indigo-900">Integer (Z):</strong> Yes, it is a whole number value.</li>
                          <li><strong className="text-indigo-900">Natural (N):</strong> Yes, positive counting number.</li>
                        </ul>
                      </div>
                    )}

                    {/* Parity (Even/Odd) explanation */}
                    <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                      <span className="text-[10px] font-black text-slate-500 uppercase">Parity (सम / विषम)</span>
                      <p className="text-xs text-slate-800">
                        <strong>{selectedNum}</strong> is{" "}
                        <strong>{selectedNum % 2 === 0 ? "Even" : "Odd"}</strong> because{" "}
                        {selectedNum % 2 === 0 ? (
                          "it is divisible by 2 with no remainder."
                        ) : (
                          "it leaves a remainder of 1 when divided by 2."
                        )}
                      </p>
                    </div>

                    {/* Primality (Prime/Composite) explanation */}
                    <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                      <span className="text-[10px] font-black text-slate-500 uppercase">Primality (अभाज्य / भाज्य)</span>
                      <p className="text-xs text-slate-800">
                        {selectedNum === 1 ? (
                          <span><strong>1</strong> is unique! It is neither prime nor composite because it has exactly one factor (itself).</span>
                        ) : isNumberPrime(selectedNum) ? (
                          <span><strong>{selectedNum}</strong> is <strong>Prime</strong>. It has exactly 2 factors: 1 and {selectedNum}. It cannot be divided by any other number!</span>
                        ) : (
                          <span><strong>{selectedNum}</strong> is <strong>Composite</strong>. It has more than 2 factors: {getNumberFactors(selectedNum).join(", ")}.</span>
                        )}
                      </p>
                    </div>

                    {/* Factors list */}
                    <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                      <span className="text-[10px] font-black text-slate-500 uppercase">Factors (गुणनखंड)</span>
                      <p className="text-xs text-slate-800">
                        The factors of {selectedNum} are:{" "}
                        <span className="font-mono font-bold text-natural-primary">
                          {getNumberFactors(selectedNum).join(", ")}
                        </span>{" "}
                        (Total {getNumberFactors(selectedNum).length})
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Visual Proof Section */}
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                    🎯 Geometric Visual Proof
                  </h4>
                  <p className="text-[10px] text-slate-500 mb-3 leading-tight">
                    See how the number {selectedNum} is built geometrically!
                  </p>

                  {/* Canvas representation */}
                  <div className="bg-white border border-slate-200 rounded-xl p-3 min-h-[140px] flex items-center justify-center overflow-auto max-h-[180px]">
                    {/* Render different geometric models depending on number type */}
                    <div className="flex flex-col items-center justify-center">
                      {/* 1. If 1, show a lonely circle */}
                      {selectedNum === 1 && (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-slate-400 flex items-center justify-center font-bold text-[10px] text-slate-700">1</div>
                          <span className="text-[10px] text-slate-500 font-semibold">Singleton</span>
                        </div>
                      )}

                      {/* 2. For primes > 1, show a single row of dots (linear array) */}
                      {selectedNum > 1 && isNumberPrime(selectedNum) && (
                        <div className="space-y-2 text-center">
                          <div className="flex flex-wrap gap-1.5 justify-center max-w-[200px]">
                            {Array.from({ length: selectedNum }).map((_, i) => (
                              <div
                                key={i}
                                className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-600 animate-pulse shadow-sm"
                                title={`Dot ${i + 1}`}
                              />
                            ))}
                          </div>
                          <span className="text-[9px] text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            Primes only fit a 1 × {selectedNum} line!
                          </span>
                        </div>
                      )}

                      {/* 3. For composites, show a grid layout based on non-trivial factor pairs */}
                      {selectedNum > 1 && !isNumberPrime(selectedNum) && (
                        <div className="space-y-2 text-center">
                          {(() => {
                            // Find the best grid layout for composite
                            const factors = getNumberFactors(selectedNum);
                            // Choose the non-trivial factors closest to square root
                            const nonTrivial = factors.filter(f => f !== 1 && f !== selectedNum);
                            let rows = 1;
                            let cols = selectedNum;
                            if (nonTrivial.length > 0) {
                              // Find closest pair
                              const mid = Math.sqrt(selectedNum);
                              let bestDiff = selectedNum;
                              for (const f of nonTrivial) {
                                const partner = selectedNum / f;
                                const diff = Math.abs(f - partner);
                                if (diff < bestDiff) {
                                  bestDiff = diff;
                                  rows = f;
                                  cols = partner;
                                }
                              }
                            }

                            return (
                              <div className="flex flex-col items-center gap-2">
                                <div className="grid gap-1.5 p-1 bg-blue-50/20 border border-blue-100 rounded-lg" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                                  {Array.from({ length: selectedNum }).map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-3.5 h-3.5 rounded-full bg-blue-400 border border-blue-600 shadow-sm`}
                                    />
                                  ))}
                                </div>
                                <span className="text-[9px] text-blue-800 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                  Composite! Fits perfectly in a {rows} × {cols} grid!
                                </span>
                              </div>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subtext explaining parity dots in simple terms */}
                <div className="bg-white border border-slate-200 rounded-xl p-2.5 mt-2.5 flex items-start gap-2 text-[10px] text-slate-600 leading-normal">
                  <span className="text-xs">💡</span>
                  <div>
                    {selectedNum % 2 === 0 ? (
                      <span><strong>Even Proof:</strong> Dots can be divided into perfect pairs of 2, leaving no leftover. (Perfect balance!)</span>
                    ) : (
                      <span><strong>Odd Proof:</strong> If you divide the dots into pairs of 2, there is always <strong>1 lonely dot leftover</strong>! (Imbalance!)</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CLOCK READING PRACTICE MODULE */}
        {activeTab === "clock" && (
          <div className="flex flex-col lg:flex-row gap-6 h-full" id="clock_tool_container">
            {/* Left side: Analog Clock Interactive Face */}
            <div className="flex-1 flex flex-col justify-center items-center bg-amber-50/20 rounded-2xl border border-amber-100/60 p-6 shadow-xs relative">
              <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full mb-4">
                Interactive Wood-Rimmed Clock
              </span>

              {/* Clock Outer Rim Wrapper with Pointer Events */}
              <div 
                className="relative w-56 h-56 md:w-64 md:h-64 select-none touch-none"
                onPointerLeave={() => {
                  if (draggingHand) {
                    setDraggingHand(null);
                  }
                }}
              >
                {/* SVG Dial */}
                <svg viewBox="0 0 220 220" className="w-full h-full drop-shadow-md">
                  {/* Outer Wood Bezel */}
                  <circle cx="110" cy="110" r="105" fill="#8b5a2b" stroke="#704214" strokeWidth="2" />
                  {/* Metallic Inner Bezel */}
                  <circle cx="110" cy="110" r="101" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1.5" />
                  {/* Clock Face White Area */}
                  <circle cx="110" cy="110" r="95" fill="#fdfbf7" />

                  {/* Ring of Minute Tick Marks */}
                  <circle cx="110" cy="110" r="90" stroke="#f1f5f9" strokeWidth="2" fill="none" />
                  {Array.from({ length: 60 }).map((_, i) => {
                    if (i % 5 === 0) return null; // skip hour ticks to not clutter
                    const rad = (i * 6 * Math.PI) / 180;
                    const x1 = 110 + 91 * Math.cos(rad);
                    const y1 = 110 + 91 * Math.sin(rad);
                    const x2 = 110 + 93 * Math.cos(rad);
                    const y2 = 110 + 93 * Math.sin(rad);
                    return (
                      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#cbd5e1" strokeWidth="1" />
                    );
                  })}
                  {/* Hour markers line ticks */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const rad = (i * 30 * Math.PI) / 180;
                    const x1 = 110 + 88 * Math.cos(rad);
                    const y1 = 110 + 88 * Math.sin(rad);
                    const x2 = 110 + 93 * Math.cos(rad);
                    const y2 = 110 + 93 * Math.sin(rad);
                    return (
                      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="1.5" />
                    );
                  })}

                  {/* 1. Placed Hour Hand (Short Red Needle) */}
                  {(() => {
                    const hrVal = placedHour || 12;
                    const coords = getCoords(hrVal, 48);
                    return (
                      <line
                        x1="110"
                        y1="110"
                        x2={coords.x}
                        y2={coords.y}
                        stroke="#ef4444"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className={placedHour ? "opacity-100" : "opacity-40 stroke-dasharray-2"}
                      />
                    );
                  })()}

                  {/* 1.5 Hour Hand Drag Preview */}
                  {(() => {
                    const coords = clockHoverNum && draggingHand === 'hour' ? getCoords(clockHoverNum, 48) : null;
                    return coords && (
                      <line
                        x1="110"
                        y1="110"
                        x2={coords.x}
                        y2={coords.y}
                        stroke="#ef4444"
                        strokeWidth="4"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        className="opacity-60"
                      />
                    );
                  })()}

                  {/* 2. Placed Minute Hand (Long Blue Needle) */}
                  {(() => {
                    const minVal = placedMinute || 12;
                    const coords = getCoords(minVal, 72);
                    return (
                      <line
                        x1="110"
                        y1="110"
                        x2={coords.x}
                        y2={coords.y}
                        stroke="#3b82f6"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        className={placedMinute ? "opacity-100" : "opacity-40 stroke-dasharray-2"}
                      />
                    );
                  })()}

                  {/* 2.5 Minute Hand Drag Preview */}
                  {(() => {
                    const coords = clockHoverNum && draggingHand === 'minute' ? getCoords(clockHoverNum, 72) : null;
                    return coords && (
                      <line
                        x1="110"
                        y1="110"
                        x2={coords.x}
                        y2={coords.y}
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        className="opacity-60"
                      />
                    );
                  })()}

                  {/* 3. Center golden pivot pin */}
                  <circle cx="110" cy="110" r="5.5" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />

                  {/* Render Clock numbers 1 to 12 as interactive drop targets */}
                  {Array.from({ length: 12 }).map((_, idx) => {
                    const num = idx === 0 ? 12 : idx;
                    const coords = getCoords(num, 75);
                    const isHovered = clockHoverNum === num;
                    const isHourSelected = placedHour === num;
                    const isMinuteSelected = placedMinute === num;

                    return (
                      <g
                        key={num}
                        className="cursor-pointer group select-none"
                        onDragOver={(e) => {
                          e.preventDefault();
                          if (draggingHand === 'hour' || (draggingHand === 'minute' && placedHour === challenge.targetHour)) {
                            setClockHoverNum(num);
                          }
                        }}
                        onDragLeave={() => setClockHoverNum(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          const hand = e.dataTransfer.getData("handType") as 'hour' | 'minute';
                          if (hand) {
                            handlePlaceHand(hand, num);
                          }
                          setClockHoverNum(null);
                        }}
                        onClick={() => {
                          if (selectedHandType) {
                            handlePlaceHand(selectedHandType, num);
                          } else {
                            if (placedHour !== challenge.targetHour) {
                              handlePlaceHand('hour', num);
                            } else {
                              handlePlaceHand('minute', num);
                            }
                          }
                        }}
                      >
                        {/* Enlarged touch target */}
                        <circle
                          cx={coords.x}
                          cy={coords.y}
                          r="18"
                          className="fill-transparent group-hover:fill-amber-100/10 transition-colors"
                        />
                        {/* Target ring */}
                        <circle
                          cx={coords.x}
                          cy={coords.y}
                          r="12.5"
                          className={`transition-all duration-300 stroke-[1.5] ${
                            isHovered
                              ? "fill-amber-100 stroke-amber-500 scale-110"
                              : isHourSelected
                              ? "fill-rose-100 stroke-rose-500"
                              : isMinuteSelected
                              ? "fill-sky-100 stroke-sky-500"
                              : "fill-white stroke-slate-200 group-hover:stroke-amber-400"
                          }`}
                        />
                        {/* Number text */}
                        <text
                          x={coords.x}
                          y={coords.y}
                          dy="3.5"
                          textAnchor="middle"
                          className={`text-[10.5px] font-extrabold font-sans select-none pointer-events-none ${
                            isHourSelected
                              ? "fill-rose-700"
                              : isMinuteSelected
                              ? "fill-sky-700"
                              : "fill-slate-700"
                          }`}
                        >
                          {num}
                        </text>

                        {/* Standard minute guidelines for Class 1 support */}
                        {(num === 12 || num === 6) && (
                          <text
                            x={coords.x}
                            y={coords.y + 19}
                            textAnchor="middle"
                            className="text-[7px] font-black font-mono fill-slate-400 select-none pointer-events-none"
                          >
                            {num === 12 ? ":00" : ":30"}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Status Indicator Bar */}
              <div className="mt-4 flex gap-3 text-xs">
                <span className={`px-2.5 py-1 rounded-full font-black ${placedHour === challenge.targetHour ? "bg-rose-100 text-rose-800 border border-rose-200" : "bg-slate-100 text-slate-500"}`}>
                  🔴 Hour Hand: {placedHour ? `Set at ${placedHour}` : "Empty"}
                </span>
                <span className={`px-2.5 py-1 rounded-full font-black ${clockSuccess ? "bg-sky-100 text-sky-800 border border-sky-200" : "bg-slate-100 text-slate-500"}`}>
                  🔵 Minute Hand: {placedMinute ? `Set at ${placedMinute === 6 ? "30 mins" : "00 mins"}` : "Empty"}
                </span>
              </div>
            </div>

            {/* Right side: Ganit Mitra, Challenge Info, Hand Trays */}
            <div className="flex-1 flex flex-col justify-between gap-4">
              {/* Challenge Target Card */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-4 shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-extrabold text-amber-700 uppercase tracking-widest bg-amber-100 px-2 py-0.5 rounded-md">
                    Level 1 Time Teller
                  </span>
                  <span className="text-[10px] font-black text-slate-500">
                    Challenge {currentClockIndex + 1} of {CLOCK_CHALLENGES.length}
                  </span>
                </div>
                <h3 className="text-xs font-black text-slate-600">Challenge Mission:</h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black text-amber-800 tracking-tight font-sans">
                    Set Clock to: <span className="text-rose-600 font-extrabold underline decoration-dashed decoration-2 underline-offset-4">{challenge.timeStr}</span>
                  </span>
                  <span className="text-xs font-extrabold text-slate-500 font-sans">
                    ({challenge.description})
                  </span>
                </div>
              </div>

              {/* Ganit Mitra Speech Box */}
              <div className="bg-amber-50/40 border border-amber-200/50 rounded-2xl p-4 flex gap-3 items-start shadow-xs relative">
                <div className="text-3xl shrink-0 select-none">
                  {clockEmotion === "happy" && "😊"}
                  {clockEmotion === "thinking" && "🤔"}
                  {clockEmotion === "victory" && "🥳"}
                  {clockEmotion === "neutral" && "🎓"}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider block">
                    Ganit Mitra (AI Math Guru)
                  </span>
                  <p className="text-xs text-amber-950 font-bold leading-normal">
                    {clockFeedback}
                  </p>
                </div>
              </div>

              {/* Hands Tray */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                    🛠️ Hands Tool Tray (Drag or Tap to Place)
                  </span>
                  <button 
                    onClick={() => {
                      setClockFeedback("First, click a hand below to select it, then click any circle number on the clock face to place it there! Or drag and drop!");
                    }}
                    className="text-[9px] font-black text-indigo-600 underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <HelpCircle size={10} /> Need help?
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Hour Hand Token */}
                  <button
                    draggable={!clockSuccess}
                    onDragStart={(e) => {
                      e.dataTransfer.setData("handType", "hour");
                      setDraggingHand("hour");
                    }}
                    onDragEnd={() => setDraggingHand(null)}
                    onClick={() => setSelectedHandType(selectedHandType === 'hour' ? null : 'hour')}
                    className={`flex items-center justify-between p-3 border rounded-xl text-left transition-all relative ${
                      clockSuccess
                        ? "bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed"
                        : selectedHandType === 'hour'
                        ? "bg-rose-50 border-rose-500 ring-2 ring-rose-500/20 scale-[1.02] shadow-xs"
                        : "bg-white border-slate-200 hover:border-rose-400 hover:bg-rose-50/10"
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] font-extrabold text-rose-600 uppercase tracking-wide block">
                        🔴 Step 1: Hour Hand
                      </span>
                      <p className="text-[11px] font-black text-slate-800">Short Red Hand</p>
                      <span className="text-[8px] font-bold text-slate-400 block">
                        Drag me, or Tap & Click clock!
                      </span>
                    </div>
                    <div className="p-1.5 bg-rose-100 text-rose-600 rounded-lg select-none">
                      <Clock size={16} />
                    </div>
                  </button>

                  {/* Minute Hand Token */}
                  {(() => {
                    const isMinuteLocked = placedHour !== challenge.targetHour;
                    return (
                      <button
                        disabled={isMinuteLocked || clockSuccess}
                        draggable={!isMinuteLocked && !clockSuccess}
                        onDragStart={(e) => {
                          e.dataTransfer.setData("handType", "minute");
                          setDraggingHand("minute");
                        }}
                        onDragEnd={() => setDraggingHand(null)}
                        onClick={() => setSelectedHandType(selectedHandType === 'minute' ? null : 'minute')}
                        className={`flex items-center justify-between p-3 border rounded-xl text-left transition-all relative ${
                          isMinuteLocked
                            ? "bg-slate-100 border-slate-200 opacity-50 cursor-not-allowed"
                            : clockSuccess
                            ? "bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed"
                            : selectedHandType === 'minute'
                            ? "bg-sky-50 border-sky-500 ring-2 ring-sky-500/20 scale-[1.02] shadow-xs"
                            : "bg-white border-slate-200 hover:border-sky-400 hover:bg-sky-50/10"
                        }`}
                      >
                        <div className="space-y-1">
                          <span className={`text-[9px] font-extrabold uppercase tracking-wide block ${isMinuteLocked ? "text-slate-400" : "text-sky-600"}`}>
                            🔵 Step 2: Minute Hand
                          </span>
                          <p className="text-[11px] font-black text-slate-800">
                            {isMinuteLocked ? "🔒 Locked" : "Long Blue Hand"}
                          </p>
                          <span className="text-[8px] font-bold text-slate-400 block">
                            {isMinuteLocked ? "Set correct Hour first!" : "Drag me, or Tap & Click!"}
                          </span>
                        </div>
                        <div className={`p-1.5 rounded-lg select-none ${isMinuteLocked ? "bg-slate-200 text-slate-400" : "bg-sky-100 text-sky-600"}`}>
                          <Clock size={16} />
                        </div>
                      </button>
                    );
                  })()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-1">
                <button
                  onClick={handleResetHands}
                  className="flex-1 py-2.5 px-4 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer"
                  id="btn_reset_clock_hands"
                >
                  <RotateCcw size={12} /> Reset Hands
                </button>

                {clockSuccess ? (
                  <button
                    onClick={handleNextChallenge}
                    className="flex-1 py-2.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md"
                    id="btn_next_clock_challenge"
                  >
                    Next Challenge <ArrowRight size={12} />
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 py-2.5 px-4 bg-slate-100 text-slate-400 border border-slate-200 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-not-allowed opacity-60"
                  >
                    Solve to Continue
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Global pure helper functions for types of numbers visualizer
function isNumberPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

function getNumberFactors(num: number): number[] {
  const factors: number[] = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      factors.push(i);
    }
  }
  return factors.sort((a, b) => a - b);
}

// ==========================================
// SUBJECT-SPECIFIC LABS
// ==========================================

export function PhysicsVisualLab({ chapterId }: { chapterId?: string }) {
  const isMotionMode = chapterId === "g9_physics_motion";
  const [mass, setMass] = useState<number>(50); // kg
  const [force, setForce] = useState<number>(40); // N
  const [objectType, setObjectType] = useState<"car" | "box" | "apple">("box");
  const [position, setPosition] = useState<number>(10); // percentage along the track
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [velocity, setVelocity] = useState<number>(0);
  const [time, setTime] = useState<number>(0);

  const acceleration = Number((force / mass).toFixed(2));

  useEffect(() => {
    let animationFrame: number;
    if (isSimulating) {
      const startTime = Date.now();
      const tick = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        setTime(elapsed);
        const currentVelocity = acceleration * elapsed;
        const currentPosition = 10 + 0.5 * acceleration * elapsed * elapsed * 15; // amplified for visual ease
        
        if (currentPosition >= 85) {
          setPosition(85);
          setVelocity(acceleration * elapsed);
          setIsSimulating(false);
        } else {
          setPosition(currentPosition);
          setVelocity(currentVelocity);
          animationFrame = requestAnimationFrame(tick);
        }
      };
      animationFrame = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isSimulating, acceleration]);

  const handleStart = () => {
    setPosition(10);
    setVelocity(0);
    setTime(0);
    setIsSimulating(true);
  };

  const handleReset = () => {
    setIsSimulating(false);
    setPosition(10);
    setVelocity(0);
    setTime(0);
  };

  const objectLabels = {
    car: { name: "Sports Car 🚗", mass: 1000 },
    box: { name: "Wooden Box 📦", mass: 50 },
    apple: { name: "Juicy Apple 🍎", mass: 1 }
  };

  const handleObjectChange = (type: "car" | "box" | "apple") => {
    setObjectType(type);
    setMass(objectLabels[type].mass);
    handleReset();
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <h3 className="font-extrabold text-base text-slate-800">⚡ Physics Kinematics Lab: Force & Motion</h3>
          <p className="text-xs text-slate-500">Explore Newton's Second Law of Motion: F = m × a (Force = Mass × Acceleration)</p>
        </div>
        <span className="text-[10px] font-bold text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full uppercase font-mono">Newton's Sandbox</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="bg-white p-5 rounded-2xl border border-slate-150 space-y-5 shadow-xs">
          <div>
            <label className="block text-xs font-black uppercase text-slate-600 tracking-wider mb-2">1. Choose Object (Mass)</label>
            <div className="grid grid-cols-3 gap-2">
              {(["apple", "box", "car"] as const).map(type => (
                <button
                  key={type}
                  onClick={() => handleObjectChange(type)}
                  className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    objectType === type 
                      ? "bg-sky-500 text-white border-sky-600 shadow-sm" 
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span className="block text-lg">{type === "apple" ? "🍎" : type === "box" ? "📦" : "🚗"}</span>
                  <span className="block text-[9px] truncate">{objectLabels[type].name.split(" ")[0]}</span>
                  <span className="block text-[8px] opacity-70">{objectLabels[type].mass} kg</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-black uppercase text-slate-600 tracking-wider mb-1.5">
              <span>2. Applied Force (F)</span>
              <span className="text-sky-600 font-mono">{force} N</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="500" 
              value={force} 
              onChange={(e) => { setForce(Number(e.target.value)); handleReset(); }}
              className="w-full accent-sky-500 h-1.5 bg-slate-100 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[8px] font-bold text-slate-400 mt-1">
              <span>1 N (Gentle)</span>
              <span>500 N (Strong)</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <button
              onClick={handleStart}
              disabled={isSimulating}
              className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-extrabold rounded-xl shadow-xs hover:scale-[1.02] transition cursor-pointer"
            >
              🚀 Simulate
            </button>
            <button
              onClick={handleReset}
              className="py-2.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold rounded-xl border border-slate-200 transition cursor-pointer"
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Live Simulation Screen Column */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {/* Animated Track */}
          <div className="bg-white p-5 rounded-2xl border border-slate-150 h-52 relative overflow-hidden flex flex-col justify-between shadow-xs">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest absolute top-3 left-4">Visual Simulator Track</span>
            
            {/* Measuring markers */}
            <div className="flex justify-between text-[8px] font-bold text-slate-300 border-b border-dashed border-slate-100 pb-1 mt-4 px-2">
              <span>0m</span>
              <span>10m</span>
              <span>20m</span>
              <span>30m</span>
              <span>40m</span>
              <span>50m</span>
            </div>

            {/* Simulated Object */}
            <div className="relative flex-1 flex items-end pb-4">
              <div 
                className="absolute transition-all duration-75 flex flex-col items-center"
                style={{ left: `${position}%` }}
              >
                {isSimulating && (
                  <span className="text-[8px] font-bold text-sky-500 animate-pulse bg-sky-50 px-1 py-0.5 rounded border border-sky-100 mb-1">
                    a = {acceleration} m/s²
                  </span>
                )}
                <span className="text-4xl filter drop-shadow-md select-none transform hover:scale-110 transition">
                  {objectType === "apple" ? "🍎" : objectType === "box" ? "📦" : "🚗"}
                </span>
              </div>
            </div>

            {/* Ground / Track strip */}
            <div className="h-4 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-lg flex items-center justify-around border border-slate-300">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
            </div>
          </div>

          {/* Real-time Math Output Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white border border-slate-150 p-3.5 rounded-xl text-center shadow-xs">
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Applied Force</span>
              <span className="text-lg font-black text-slate-800 font-mono">{force}</span>
              <span className="text-[9px] text-slate-400 font-bold block">Newtons (N)</span>
            </div>

            <div className="bg-white border border-slate-150 p-3.5 rounded-xl text-center shadow-xs">
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Object Mass</span>
              <span className="text-lg font-black text-slate-800 font-mono">{mass}</span>
              <span className="text-[9px] text-slate-400 font-bold block">Kilograms (kg)</span>
            </div>

            <div className="bg-white border border-sky-150 p-3.5 rounded-xl text-center shadow-xs bg-sky-50/10">
              <span className="text-[8px] font-bold text-sky-600 uppercase tracking-widest block mb-0.5">Acceleration</span>
              <span className="text-lg font-black text-sky-600 font-mono">{acceleration}</span>
              <span className="text-[9px] text-sky-500 font-bold block">m/s² (F / m)</span>
            </div>

            <div className="bg-white border border-emerald-150 p-3.5 rounded-xl text-center shadow-xs bg-emerald-50/10">
              <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest block mb-0.5">Current Speed</span>
              <span className="text-lg font-black text-emerald-600 font-mono">{velocity.toFixed(1)}</span>
              <span className="text-[9px] text-emerald-500 font-bold block">meters/sec (m/s)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChemistryVisualLab({ chapterId }: { chapterId?: string }) {
  const isMatterChapter = chapterId === "g9_chem_matter";
  const [protons, setProtons] = useState<number>(1);
  const [neutrons, setNeutrons] = useState<number>(1);
  const [electrons, setElectrons] = useState<number>(1);

  const totalMass = protons + neutrons;
  const netCharge = protons - electrons;

  const elements = [
    { name: "Empty Space", symbol: "∅", desc: "No protons! Add some protons to build an element!" },
    { name: "Hydrogen", symbol: "H", desc: "The simplest and most abundant element in the universe!" },
    { name: "Helium", symbol: "He", desc: "A super-light, non-reactive noble gas used to fill festive balloons!" },
    { name: "Lithium", symbol: "Li", desc: "A soft, silver-white metal used to power modern phone batteries!" },
    { name: "Beryllium", symbol: "Be", desc: "A strong, lightweight metal used in aerospace and satellite structures!" },
    { name: "Boron", symbol: "B", desc: "A metalloid used in making tough fiberglass and lab glassware!" },
    { name: "Carbon", symbol: "C", desc: "The basic building block of all organic life on Earth!" },
    { name: "Nitrogen", symbol: "N", desc: "Makes up 78% of the air we breathe and helps plants grow!" },
    { name: "Oxygen", symbol: "O", desc: "The life-giving gas essential for respiration in humans and animals!" }
  ];

  const currentElement = elements[protons] || { name: "Heavy Nucleus", symbol: "X", desc: "An advanced, heavier element on the periodic table!" };

  const handleReset = () => {
    setProtons(1);
    setNeutrons(1);
    setElectrons(1);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <h3 className="font-extrabold text-base text-slate-800">🧪 Chemistry Lab: Atomic Structure Sandbox</h3>
          <p className="text-xs text-slate-500">Add subatomic particles to build elements and observe atomic mass, stability, and net charges!</p>
        </div>
        <span className="text-[10px] font-bold text-teal-600 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full uppercase font-mono">Atom Sandbox</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="bg-white p-5 rounded-2xl border border-slate-150 space-y-4 shadow-xs">
          <span className="text-xs font-black uppercase text-slate-600 tracking-wider block border-b border-slate-100 pb-1">1. Add Subatomic Particles</span>
          
          {/* Protons Control */}
          <div className="flex items-center justify-between p-2.5 bg-orange-50/30 border border-orange-100 rounded-xl">
            <div className="flex flex-col">
              <span className="text-xs font-extrabold text-orange-700">🔴 Protons (p⁺)</span>
              <span className="text-[8px] text-orange-500">Mass: 1 | Charge: +1</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setProtons(Math.max(0, protons - 1))} className="w-8 h-8 rounded-full bg-white border border-orange-200 flex items-center justify-center font-bold text-orange-600 hover:bg-orange-50 transition cursor-pointer">-</button>
              <span className="font-mono font-black text-sm text-orange-800 w-4 text-center">{protons}</span>
              <button onClick={() => setProtons(Math.min(8, protons + 1))} className="w-8 h-8 rounded-full bg-white border border-orange-200 flex items-center justify-center font-bold text-orange-600 hover:bg-orange-50 transition cursor-pointer">+</button>
            </div>
          </div>

          {/* Neutrons Control */}
          <div className="flex items-center justify-between p-2.5 bg-slate-100 border border-slate-200 rounded-xl">
            <div className="flex flex-col">
              <span className="text-xs font-extrabold text-slate-700">⚪ Neutrons (n⁰)</span>
              <span className="text-[8px] text-slate-500">Mass: 1 | Charge: 0</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setNeutrons(Math.max(0, neutrons - 1))} className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer">-</button>
              <span className="font-mono font-black text-sm text-slate-800 w-4 text-center">{neutrons}</span>
              <button onClick={() => setNeutrons(Math.min(10, neutrons + 1))} className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer">+</button>
            </div>
          </div>

          {/* Electrons Control */}
          <div className="flex items-center justify-between p-2.5 bg-sky-50/30 border border-sky-100 rounded-xl">
            <div className="flex flex-col">
              <span className="text-xs font-extrabold text-sky-700">🔵 Electrons (e⁻)</span>
              <span className="text-[8px] text-sky-500">Mass: 0 | Charge: -1</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setElectrons(Math.max(0, electrons - 1))} className="w-8 h-8 rounded-full bg-white border border-sky-200 flex items-center justify-center font-bold text-sky-600 hover:bg-sky-50 transition cursor-pointer">-</button>
              <span className="font-mono font-black text-sm text-sky-800 w-4 text-center">{electrons}</span>
              <button onClick={() => setElectrons(Math.min(10, electrons + 1))} className="w-8 h-8 rounded-full bg-white border border-sky-200 flex items-center justify-center font-bold text-sky-600 hover:bg-sky-50 transition cursor-pointer">+</button>
            </div>
          </div>

          <button onClick={handleReset} className="w-full py-2.5 text-xs font-extrabold text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 rounded-xl transition cursor-pointer">
            🔄 Reset Atom
          </button>
        </div>

        {/* Orbit Visualization Column */}
        <div className="bg-white p-5 rounded-2xl border border-slate-150 flex flex-col items-center justify-center relative min-h-60 shadow-xs">
          <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest absolute top-3 left-4">Atomic Orbit Model</span>
          
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* Orbit Shell 1 */}
            <div className="absolute w-28 h-28 rounded-full border-2 border-dashed border-sky-200 animate-spin" style={{ animationDuration: "12s" }}>
              {/* Electron on Shell 1 */}
              {electrons > 0 && <div className="absolute top-0 left-1/2 -ml-1.5 -mt-1.5 w-3.5 h-3.5 rounded-full bg-sky-500 border border-white flex items-center justify-center text-[7px] text-white font-bold select-none">e⁻</div>}
              {electrons > 1 && <div className="absolute bottom-0 left-1/2 -ml-1.5 -mb-1.5 w-3.5 h-3.5 rounded-full bg-sky-500 border border-white flex items-center justify-center text-[7px] text-white font-bold select-none">e⁻</div>}
            </div>

            {/* Orbit Shell 2 */}
            <div className="absolute w-44 h-44 rounded-full border-2 border-dashed border-sky-100 animate-spin" style={{ animationDuration: "25s" }}>
              {electrons > 2 && <div className="absolute top-4 left-4 w-3.5 h-3.5 rounded-full bg-sky-500 border border-white flex items-center justify-center text-[7px] text-white font-bold select-none">e⁻</div>}
              {electrons > 3 && <div className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full bg-sky-500 border border-white flex items-center justify-center text-[7px] text-white font-bold select-none">e⁻</div>}
              {electrons > 4 && <div className="absolute bottom-4 left-4 w-3.5 h-3.5 rounded-full bg-sky-500 border border-white flex items-center justify-center text-[7px] text-white font-bold select-none">e⁻</div>}
              {electrons > 5 && <div className="absolute bottom-4 right-4 w-3.5 h-3.5 rounded-full bg-sky-500 border border-white flex items-center justify-center text-[7px] text-white font-bold select-none">e⁻</div>}
              {electrons > 6 && <div className="absolute top-1/2 right-0 -mr-1.5 -mt-1.5 w-3.5 h-3.5 rounded-full bg-sky-500 border border-white flex items-center justify-center text-[7px] text-white font-bold select-none">e⁻</div>}
              {electrons > 7 && <div className="absolute top-1/2 left-0 -ml-1.5 -mt-1.5 w-3.5 h-3.5 rounded-full bg-sky-500 border border-white flex items-center justify-center text-[7px] text-white font-bold select-none">e⁻</div>}
            </div>

            {/* Nucleus Compound */}
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-orange-250 flex flex-wrap items-center justify-center gap-0.5 p-1 z-10 shadow-md">
              {protons === 0 && neutrons === 0 && <span className="text-[8px] font-black text-slate-400">Empty</span>}
              {Array.from({ length: Math.min(6, protons) }).map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full bg-orange-500 border border-white text-[5px] text-white font-bold flex items-center justify-center select-none">+</div>
              ))}
              {Array.from({ length: Math.min(6, neutrons) }).map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-white text-[5px] text-white font-bold flex items-center justify-center select-none">0</div>
              ))}
            </div>
          </div>
        </div>

        {/* Element Info Output Column */}
        <div className="bg-white p-5 rounded-2xl border border-slate-150 flex flex-col justify-between shadow-xs">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-slate-600 tracking-wider block border-b border-slate-100 pb-1">2. Identified Element</span>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-500 border-2 border-teal-600 flex flex-col items-center justify-center text-white font-black shadow-md">
                <span className="text-xs leading-none font-mono">{protons}</span>
                <span className="text-2xl leading-none">{currentElement.symbol}</span>
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-800">{currentElement.name}</h4>
                <p className="text-[10px] text-slate-500 leading-normal">{currentElement.desc}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 mt-4">
            <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-center">
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Mass Number (p + n)</span>
              <span className="text-base font-black text-slate-700 font-mono">{totalMass}</span>
            </div>
            <div className={`border p-2.5 rounded-xl text-center ${netCharge > 0 ? "bg-orange-50/10 border-orange-200 text-orange-700" : netCharge < 0 ? "bg-sky-50/10 border-sky-200 text-sky-700" : "bg-emerald-50/10 border-emerald-200 text-emerald-700"}`}>
              <span className="text-[8px] font-bold opacity-75 uppercase tracking-widest block mb-0.5">Net Charge</span>
              <span className="text-base font-black font-mono">{netCharge > 0 ? `+${netCharge}` : netCharge}</span>
              <span className="text-[8px] font-semibold block">{netCharge > 0 ? "Positive Ion" : netCharge < 0 ? "Negative Ion" : "Neutral Atom"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SocialScienceVisualLab({ chapterId }: { chapterId?: string }) {
  if (chapterId === "g6_soc_maps" || chapterId === "maps" || (chapterId?.includes("map") && !chapterId?.includes("g9"))) {
    return <Grade6MapsVisualLab />;
  }
  if (chapterId === "g9_maps_location" || chapterId?.includes("maps_location") || (chapterId?.includes("map") && chapterId?.includes("g9"))) {
    return <Grade9MapsVisualLab />;
  }
  if (chapterId === "g6_soc_locating_places" || chapterId?.includes("locating")) {
    return <LocatingPlacesVisualLab />;
  }
  if (chapterId === "g6_soc_motions_earth" || chapterId?.includes("motion")) {
    return <MotionsEarthVisualLab />;
  }
  if (chapterId === "g6_soc_timeline_sources" || chapterId?.includes("timeline")) {
    return <TimelineSourcesVisualLab />;
  }
  if (chapterId === "g6_soc_earliest_cities" || chapterId?.includes("city") || chapterId?.includes("harappan")) {
    return <EarliestCitiesVisualLab />;
  }
  if (chapterId === "g6_soc_value_of_work" || chapterId?.includes("value") || chapterId?.includes("work")) {
    return <ValueOfWorkVisualLab />;
  }
  if (chapterId === "g6_soc_government_diversity" || chapterId?.includes("government") || chapterId?.includes("diversity")) {
    return <GovernmentDiversityVisualLab />;
  }
  if (chapterId === "g1_evs_computer" || chapterId?.includes("computer")) {
    return <EvsComputerVisualLab />;
  }
  if (chapterId === "g1_evs_family" || chapterId?.includes("family")) {
    return <EvsFamilyVisualLab />;
  }
  if (chapterId === "g1_evs_animals" || chapterId?.includes("animal")) {
    return <EvsAnimalsVisualLab />;
  }
  if (chapterId === "g1_evs_seasons" || chapterId?.includes("season")) {
    return <EvsSeasonsVisualLab />;
  }
  if (chapterId === "g9_physical_features" || chapterId?.includes("physical")) {
    return <PhysicalGeographyVisualLab />;
  }
  if (chapterId === "g9_democracy" || chapterId?.includes("democracy")) {
    return <DemocracyVisualLab />;
  }
  return <FrenchRevolutionVisualLab />;
}

export function EvsComputerVisualLab() {
  const [activePart, setActivePart] = useState<"monitor" | "cpu" | "keyboard" | "mouse" | "printer" | "speakers">("monitor");
  const [monitorMode, setMonitorMode] = useState<"typing" | "drawing" | "math" | "video">("typing");
  const [typedText, setTypedText] = useState<string>("WELCOME TO COMPUTER CLASS! 💻");
  const [drawingStars, setDrawingStars] = useState<{ x: number; y: number; color: string }[]>([]);
  const [isPrinted, setIsPrinted] = useState<boolean>(false);

  const keyRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M", "1", "2", "3"]
  ];

  const handleKeyPress = (char: string) => {
    setMonitorMode("typing");
    setTypedText(prev => (prev.length > 35 ? char : prev + char));
  };

  const handleBackspace = () => {
    setTypedText(prev => prev.slice(0, -1));
  };

  const handleAddStar = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const colors = ["#f59e0b", "#ec4899", "#3b82f6", "#10b981", "#8b5cf6"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setDrawingStars(prev => [...prev, { x, y, color: randomColor }]);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="evs_computer_explorer">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <h3 className="font-extrabold text-base text-slate-800">💻 EVS Chapter 4: Computer - A Smart Machine Visual Explorer</h3>
          <p className="text-xs text-slate-500">Click computer parts to test Monitor 🖥️, CPU 🧠, Keyboard ⌨️, Mouse 🖱️, Printer 🖨️ & Speakers 🔊 interactively!</p>
        </div>
        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full uppercase font-mono">Computer Workbench</span>
      </div>

      {/* Main Interactive Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Computer Parts Selector Column */}
        <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs space-y-3">
          <span className="text-xs font-black uppercase text-slate-500 tracking-wider block">1. Click a Computer Part to Test</span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "monitor", name: "Monitor 🖥️", desc: "TV Screen for display" },
              { id: "cpu", name: "CPU 🧠", desc: "Brain of Computer" },
              { id: "keyboard", name: "Keyboard ⌨️", desc: "Type letters & numbers" },
              { id: "mouse", name: "Mouse 🖱️", desc: "Point, click & draw" },
              { id: "printer", name: "Printer 🖨️", desc: "Prints on real paper" },
              { id: "speakers", name: "Speakers 🔊", desc: "Plays music & sounds" }
            ].map(part => (
              <button
                key={part.id}
                onClick={() => setActivePart(part.id as any)}
                className={`p-3 rounded-xl border transition cursor-pointer text-left ${
                  activePart === part.id
                    ? "bg-indigo-600 border-indigo-700 text-white shadow-md font-bold"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-200"
                }`}
              >
                <span className="block text-xs font-black">{part.name}</span>
                <span className={`block text-[9px] mt-0.5 ${activePart === part.id ? "text-indigo-100" : "text-slate-500"}`}>{part.desc}</span>
              </button>
            ))}
          </div>

          {/* Active Part Info Box */}
          <div className="mt-4 p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1.5">
            <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider">Hardware Function</span>
            <h4 className="text-xs font-black text-indigo-950">
              {activePart === "monitor" && "🖥️ Monitor: Displays images, video, math, and your live typing like a smart TV!"}
              {activePart === "cpu" && "🧠 CPU (Central Processing Unit): Processes all instructions fast and makes smart decisions!"}
              {activePart === "keyboard" && "⌨️ Keyboard: Contains buttons called keys to type words, numbers, and symbols!"}
              {activePart === "mouse" && "🖱️ Mouse: Handheld pointer device with left & right click buttons!"}
              {activePart === "printer" && "🖨️ Printer: Converts soft copy on screen to hard copy printed paper!"}
              {activePart === "speakers" && "🔊 Speakers: Output device that produces sound effects, audio stories, and music!"}
            </h4>
          </div>
        </div>

        {/* Live Computer Screen Simulation (Monitor) */}
        <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-5 border-4 border-slate-700 shadow-xl flex flex-col justify-between relative overflow-hidden min-h-[320px]">
          {/* Top Monitor Bezel Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-[10px] font-mono font-bold text-slate-400 ml-2">Smart Monitor v1.0 [Screen Mode: {monitorMode.toUpperCase()}]</span>
            </div>
            
            {/* Monitor Screen Mode Switches */}
            <div className="flex gap-1">
              <button onClick={() => setMonitorMode("typing")} className={`px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer ${monitorMode === "typing" ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-400"}`}>📝 Typing</button>
              <button onClick={() => setMonitorMode("drawing")} className={`px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer ${monitorMode === "drawing" ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-400"}`}>🎨 Draw</button>
              <button onClick={() => setMonitorMode("math")} className={`px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer ${monitorMode === "math" ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-400"}`}>🔢 Math</button>
              <button onClick={() => setMonitorMode("video")} className={`px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer ${monitorMode === "video" ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-400"}`}>🎬 Video</button>
            </div>
          </div>

          {/* Screen Content Area */}
          <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[160px]">
            {monitorMode === "typing" && (
              <div className="w-full h-full flex flex-col items-center justify-center space-y-3 text-center">
                <span className="text-4xl animate-bounce">🖥️</span>
                <div className="bg-slate-900/90 border border-indigo-500/50 p-4 rounded-xl max-w-md w-full shadow-lg">
                  <span className="text-[9px] uppercase font-mono font-bold text-indigo-400 block mb-1">Virtual Monitor Screen:</span>
                  <p className="text-lg font-mono font-black text-emerald-400 tracking-wide break-all min-h-[30px]">
                    {typedText || "< Type on Keyboard below >"}
                    <span className="animate-ping">|</span>
                  </p>
                </div>
              </div>
            )}

            {monitorMode === "drawing" && (
              <div 
                onClick={handleAddStar}
                className="w-full h-full bg-slate-900 rounded-xl border border-dashed border-indigo-500/40 relative cursor-crosshair flex flex-col items-center justify-center select-none min-h-[140px]"
              >
                <span className="text-[10px] text-slate-400 font-mono mb-2">🖱️ Click anywhere on screen to draw colorful stars! ({drawingStars.length} stars)</span>
                {drawingStars.map((s, idx) => (
                  <span key={idx} className="absolute text-xl animate-pulse" style={{ left: s.x - 10, top: s.y - 10, color: s.color }}>⭐</span>
                ))}
                {drawingStars.length === 0 && <span className="text-3xl opacity-30">🎨</span>}
              </div>
            )}

            {monitorMode === "math" && (
              <div className="text-center space-y-2 animate-fade-in">
                <span className="text-3xl">🧠 ⚡</span>
                <h4 className="text-base font-mono font-black text-amber-400">CPU Math Processing:</h4>
                <div className="bg-slate-900 border border-amber-500/40 p-3 rounded-xl font-mono text-white text-xs space-y-1">
                  <p>12 + 8 = <span className="text-emerald-400 font-bold">20</span> ✅</p>
                  <p>100 ÷ 5 = <span className="text-emerald-400 font-bold">20</span> ✅</p>
                  <p className="text-[9px] text-slate-400">Calculated in 0.00001 seconds! Never tires!</p>
                </div>
              </div>
            )}

            {monitorMode === "video" && (
              <div className="text-center space-y-2 animate-fade-in">
                <span className="text-4xl animate-pulse">🎬</span>
                <p className="text-xs font-bold text-sky-300">Playing Educational Cartoon Video...</p>
                <p className="text-[10px] font-mono text-slate-400">"Computers are electro-mechanical smart machines!"</p>
              </div>
            )}
          </div>

          {/* Interactive Input Hardware Panel */}
          <div className="mt-3 pt-3 border-t border-slate-800 space-y-2">
            {(activePart === "keyboard" || monitorMode === "typing") && (
              <div className="space-y-1.5 bg-slate-900 p-2 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                  <span>⌨️ Virtual Keyboard Keys:</span>
                  <button onClick={() => setTypedText("")} className="text-rose-400 hover:underline cursor-pointer">Clear Screen</button>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  {keyRows.map((row, rIdx) => (
                    <div key={rIdx} className="flex gap-1 justify-center">
                      {row.map(k => (
                        <button
                          key={k}
                          onClick={() => handleKeyPress(k)}
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-slate-800 hover:bg-indigo-600 text-white font-mono font-black text-xs border border-slate-700 active:scale-95 cursor-pointer shadow-xs"
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  ))}
                  <div className="flex gap-1 mt-0.5">
                    <button onClick={() => handleKeyPress(" ")} className="px-6 py-1 rounded bg-slate-800 hover:bg-indigo-600 text-white text-[10px] font-mono font-bold border border-slate-700 cursor-pointer">SPACE</button>
                    <button onClick={handleBackspace} className="px-3 py-1 rounded bg-rose-900/80 hover:bg-rose-700 text-white text-[10px] font-mono font-bold border border-rose-800 cursor-pointer">⌫ BACK</button>
                  </div>
                </div>
              </div>
            )}

            {activePart === "printer" && (
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">🖨️ Printer Hardware:</span>
                  <p className="text-[10px] text-slate-400">Print current Monitor screen onto real paper!</p>
                </div>
                <button
                  onClick={() => setIsPrinted(true)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-lg shadow-sm cursor-pointer"
                >
                  📄 Print Page
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Printed Paper Modal Notification */}
      {isPrinted && (
        <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl flex items-center justify-between animate-fade-in shadow-md">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-bounce">📄</span>
            <div>
              <h4 className="text-xs font-black text-amber-900">Printed Page Output:</h4>
              <p className="text-[11px] font-bold text-amber-800 font-mono">"{typedText || "Computer Lesson Worksheet"}"</p>
            </div>
          </div>
          <button onClick={() => setIsPrinted(false)} className="text-xs font-bold text-amber-700 bg-amber-200 px-3 py-1 rounded-lg cursor-pointer">Close</button>
        </div>
      )}
    </div>
  );
}

export function EvsFamilyVisualLab() {
  const [selectedRole, setSelectedRole] = useState<string>("father");
  const familyMembers = [
    { id: "grandfather", name: "Grandfather 👴", role: "Tells wise stories & goes on morning walks" },
    { id: "grandmother", name: "Grandmother 👵", role: "Teaches good values & prepares delicious snacks" },
    { id: "father", name: "Father 👨", role: "Works hard, helps with school homework & buys toys" },
    { id: "mother", name: "Mother 👩", role: "Cooks healthy food, cares for family & guides learning" },
    { id: "children", name: "Brother & Sister 👦👧", role: "Play games together, share books & keep home tidy" }
  ];

  const current = familyMembers.find(m => m.id === selectedRole) || familyMembers[2];

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <h3 className="font-extrabold text-base text-slate-800">👨‍👩‍👧‍👦 EVS Chapter 1: My Family & Home Visual Explorer</h3>
          <p className="text-xs text-slate-500">Explore family members, relations, and how family members love and help each other!</p>
        </div>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase font-mono">Family Tree</span>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-5">
        <span className="text-xs font-black uppercase text-slate-500 tracking-wider block">Click a Family Member on the Tree</span>
        
        <div className="flex flex-wrap justify-center gap-3">
          {familyMembers.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedRole(m.id)}
              className={`py-3 px-4 rounded-2xl border-2 transition cursor-pointer font-bold text-xs ${
                selectedRole === m.id
                  ? "bg-emerald-600 border-emerald-700 text-white shadow-md scale-105"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 text-center space-y-2 animate-fade-in">
          <span className="text-5xl block">{current.name.split(" ")[1]}</span>
          <h4 className="text-sm font-black text-emerald-950">{current.name}</h4>
          <p className="text-xs font-bold text-emerald-800 max-w-md mx-auto">{current.role}</p>
        </div>
      </div>
    </div>
  );
}

export function EvsAnimalsVisualLab() {
  const [habitat, setHabitat] = useState<"jungle" | "farm" | "water">("jungle");
  const animals = {
    jungle: [
      { name: "Lion 🦁", sound: "Roar!", type: "Wild Animal", food: "Meat (Carnivore)" },
      { name: "Elephant 🐘", sound: "Trumpet!", type: "Wild Animal", food: "Leaves & Sugarcane (Herbivore)" }
    ],
    farm: [
      { name: "Cow 🐄", sound: "Moo!", type: "Domestic Animal", food: "Grass & Hay (Gives Milk 🥛)" },
      { name: "Dog 🐶", sound: "Woof!", type: "Pet Animal", food: "Pedigree & Biscuits (Guards House)" }
    ],
    water: [
      { name: "Fish 🐟", sound: "Blub!", type: "Water Animal", food: "Small Plankton" },
      { name: "Dolphin 🐬", sound: "Click-Click!", type: "Water Animal", food: "Small Fish" }
    ]
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <h3 className="font-extrabold text-base text-slate-800">🐾 EVS Chapter 2: Animals Around Us Visual Explorer</h3>
          <p className="text-xs text-slate-500">Discover animal habitats, wild vs domestic animals, sounds, and food habits!</p>
        </div>
        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full uppercase font-mono">Animal Kingdom</span>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-5">
        <div className="flex justify-center gap-2">
          {(["jungle", "farm", "water"] as const).map(h => (
            <button
              key={h}
              onClick={() => setHabitat(h)}
              className={`py-2 px-4 rounded-xl font-black text-xs border-2 transition cursor-pointer capitalize ${
                habitat === h
                  ? "bg-amber-500 border-amber-600 text-white shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50"
              }`}
            >
              {h === "jungle" ? "🌳 Jungle (Wild)" : h === "farm" ? "🚜 Farm (Domestic)" : "🌊 Water"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {animals[habitat].map((item, idx) => (
            <div key={idx} className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200 flex items-center gap-4">
              <span className="text-4xl">{item.name.split(" ")[1]}</span>
              <div>
                <h4 className="font-black text-xs text-amber-950">{item.name}</h4>
                <p className="text-[10px] font-bold text-amber-800">Sound: "{item.sound}"</p>
                <p className="text-[9px] text-slate-500">Category: {item.type} | Food: {item.food}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EvsSeasonsVisualLab() {
  const [season, setSeason] = useState<"summer" | "rainy" | "winter">("summer");
  const seasonData = {
    summer: { icon: "☀️", name: "Summer Season", wear: "Light Cotton Clothes 👕", eat: "Ice Creams & Mango Juice 🍦🥭", desc: "Days are hot and sunny!" },
    rainy: { icon: "🌧️", name: "Rainy Season (Monsoon)", wear: "Raincoat & Umbrella 🧥☂️", eat: "Hot Soup & Corn 🌽", desc: "Clouds rain water to fill lakes!" },
    winter: { icon: "❄️", name: "Winter Season", wear: "Woolen Sweater & Cap 🧶", eat: "Warm Milk & Dry Fruits 🥛", desc: "Days are cold and chilly!" }
  };

  const curr = seasonData[season];

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <h3 className="font-extrabold text-base text-slate-800">🌤️ EVS Chapter 3: Seasons & Weather Visual Explorer</h3>
          <p className="text-xs text-slate-500">Learn about Summer, Rainy, and Winter seasons, clothing, and weather conditions!</p>
        </div>
        <span className="text-[10px] font-bold text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full uppercase font-mono">Seasons Lab</span>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-5">
        <div className="flex justify-center gap-2">
          {(["summer", "rainy", "winter"] as const).map(s => (
            <button
              key={s}
              onClick={() => setSeason(s)}
              className={`py-2 px-4 rounded-xl font-black text-xs border-2 transition cursor-pointer capitalize ${
                season === s
                  ? "bg-sky-600 border-sky-700 text-white shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-sky-50"
              }`}
            >
              {seasonData[s].icon} {s}
            </button>
          ))}
        </div>

        <div className="bg-sky-50/60 p-5 rounded-2xl border border-sky-200 text-center space-y-3 animate-fade-in">
          <span className="text-5xl block animate-pulse">{curr.icon}</span>
          <h4 className="text-sm font-black text-sky-950">{curr.name}</h4>
          <p className="text-xs text-slate-600">{curr.desc}</p>
          <div className="flex justify-center gap-4 text-xs font-bold text-sky-900 pt-2 border-t border-sky-200">
            <span>👕 Clothes: {curr.wear}</span>
            <span>🍲 Food: {curr.eat}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PhysicalGeographyVisualLab() {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const features = [
    { title: "Himalayan Mountain Range 🏔️", desc: "Young fold mountains stretching across northern India with snow peaks like Mount Everest.", key: "Great Himalayas, Himachal, Shiwalik" },
    { title: "Northern River Plains 🌾", desc: "Fertile alluvial plains formed by Indus, Ganga, and Brahmaputra rivers.", key: "Bhabar, Terai, Bhangar, Khadar" },
    { title: "Peninsular Plateau ⛰️", desc: "Ancient crystalline triangular landmass composed of Central Highlands and Deccan Plateau.", key: "Western Ghats, Eastern Ghats" },
    { title: "Thar Indian Desert 🏜️", desc: "Arid land with sand dunes and low vegetation in western Rajasthan.", key: "Barchans, Luni River" }
  ];

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <h3 className="font-extrabold text-base text-slate-800">🏔️ Physical Features of India Visual Explorer</h3>
          <p className="text-xs text-slate-500">Interactive geography landform sandbox: Mountains, Plains, Plateaus, Deserts!</p>
        </div>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase font-mono">Geography Lab</span>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-150 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {features.map((f, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFeature(idx)}
              className={`py-2 px-3 rounded-xl text-xs font-black whitespace-nowrap border transition cursor-pointer ${
                activeFeature === idx ? "bg-emerald-600 text-white border-emerald-700 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-700"
              }`}
            >
              {f.title.split(" ")[0]} {f.title.split(" ")[1]}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2 animate-fade-in">
          <h4 className="text-sm font-extrabold text-emerald-950">{features[activeFeature].title}</h4>
          <p className="text-xs font-medium text-slate-700">{features[activeFeature].desc}</p>
          <p className="text-[10px] font-mono text-emerald-800">Key Terms: {features[activeFeature].key}</p>
        </div>
      </div>
    </div>
  );
}

export function DemocracyVisualLab() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <h3 className="font-extrabold text-base text-slate-800">🗳️ Democratic Rights & Governance Visual Explorer</h3>
          <p className="text-xs text-slate-500">Explore the 3 pillars of Democracy: Legislature 📜, Executive 🏛️, Judiciary ⚖️!</p>
        </div>
        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase font-mono">Civics Lab</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5 text-center">
          <span className="text-4xl block">📜</span>
          <h4 className="font-black text-xs text-slate-800">1. Legislature</h4>
          <p className="text-[10px] text-slate-500">Parliament (Lok Sabha & Rajya Sabha) makes new laws for citizens.</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5 text-center">
          <span className="text-4xl block">🏛️</span>
          <h4 className="font-black text-xs text-slate-800">2. Executive</h4>
          <p className="text-[10px] text-slate-500">Prime Minister & Ministers execute laws and run government administration.</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5 text-center">
          <span className="text-4xl block">⚖️</span>
          <h4 className="font-black text-xs text-slate-800">3. Judiciary</h4>
          <p className="text-[10px] text-slate-500">Supreme Court & High Courts protect Fundamental Rights and deliver justice.</p>
        </div>
      </div>
    </div>
  );
}

export function FrenchRevolutionVisualLab() {
  const [activeTimelineIdx, setActiveTimelineIdx] = useState<number>(0);
  const timelineEvents = [
    { year: "1789", title: "The Outbreak of the Revolution", desc: "The French Revolution began with the storming of the Bastille on July 14, 1789, protesting against absolute royal oppression.", details: "Estate General meetings, Tennis Court Oath, and the formation of National Assembly.", emoji: "🏰" },
    { year: "1791", title: "The Constitutional Monarchy", desc: "The National Assembly completed the draft of the constitution to limit the powers of the monarch, giving power to citizens.", details: "Citizens grouped into active/passive voters. Declaration of Rights of Man and Citizen.", emoji: "📜" },
    { year: "1792", title: "France Becomes a Republic", desc: "The newly elected assembly, called the Convention, abolished the monarchy and declared France a republic.", details: "King Louis XVI was sentenced to death on charges of treason.", emoji: "⚖️" },
    { year: "1793", title: "The Reign of Terror", desc: "Robespierre followed a policy of severe control and punishment, executing all perceived enemies with the guillotine.", details: "Maximum ceilings on wages/prices, rationing of bread, and severe strictness.", emoji: "⚡" },
    { year: "1799", title: "Rise of Napoleon Bonaparte", desc: "After the fall of the Jacobins directory, political instability paved the way for the rise of military dictator Napoleon.", details: "He introduced progressive laws like protection of private property and uniform system of weights.", emoji: "🏇" }
  ];

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <h3 className="font-extrabold text-base text-slate-800">🌍 Social Science Lab: History Timeline Explorer</h3>
          <p className="text-xs text-slate-500">Trace key historic revolutions, milestones, and physical geographical structures interactively!</p>
        </div>
        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full uppercase font-mono">Timeline Sandbox</span>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-xs flex flex-col gap-6">
        <span className="text-xs font-black uppercase text-slate-600 tracking-wider block border-b border-slate-100 pb-1">French Revolution Milestones (Class 9 History)</span>
        
        <div className="relative flex items-center justify-between px-6 py-4 bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto gap-4">
          <div className="absolute left-6 right-6 h-1 bg-slate-300 top-1/2 -translate-y-1/2 -z-0"></div>
          {timelineEvents.map((evt, idx) => (
            <button
              key={evt.year}
              onClick={() => setActiveTimelineIdx(idx)}
              className={`relative z-10 flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer transition ${
                activeTimelineIdx === idx ? "scale-110" : "opacity-75 hover:opacity-100"
              }`}
            >
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl shadow-md ${
                activeTimelineIdx === idx 
                  ? "bg-indigo-600 border-indigo-700 text-white font-black" 
                  : "bg-white border-slate-300 text-slate-700"
              }`}>
                {evt.emoji}
              </div>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                activeTimelineIdx === idx ? "bg-indigo-100 text-indigo-700 font-black" : "bg-slate-200 text-slate-600"
              }`}>{evt.year}</span>
            </button>
          ))}
        </div>

        <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-150 flex flex-col md:flex-row gap-5 items-center animate-fade-in" key={activeTimelineIdx}>
          <div className="text-5xl shrink-0 p-4 bg-white border border-slate-200 rounded-3xl shadow-sm select-none">
            {timelineEvents[activeTimelineIdx].emoji}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full font-mono">{timelineEvents[activeTimelineIdx].year}</span>
              <h4 className="font-extrabold text-sm text-slate-800">{timelineEvents[activeTimelineIdx].title}</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">{timelineEvents[activeTimelineIdx].desc}</p>
            <p className="text-[10px] text-slate-400 italic leading-normal">Key associations: {timelineEvents[activeTimelineIdx].details}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LanguageVisualLab({ chapterId, subject }: { chapterId?: string; subject?: string }) {
  if (subject === "hindi" || chapterId?.startsWith("g1_hin_")) {
    return <HindiLanguageLab chapterId={chapterId} />;
  }
  if (subject === "english" || chapterId?.startsWith("g1_eng_")) {
    return <EnglishLanguageLab chapterId={chapterId} />;
  }
  return <TeluguLanguageLab chapterId={chapterId} />;
}

export function TeluguLanguageLab({ chapterId }: { chapterId?: string }) {
  if (chapterId?.startsWith("g6_tel_")) {
    return <G6TeluguGrammarExplorer activeChapterId={chapterId} />;
  }

  const [activeTab, setActiveTab] = useState<"guninthalu" | "ottulu" | "builder">(
    chapterId === "g1_tel_guninthalu" ? "guninthalu" : chapterId === "g1_tel_ottulu" ? "ottulu" : "builder"
  );

  // Guninthalu state
  const [baseConsonant, setBaseConsonant] = useState<string>("క");
  const guninthaluList = [
    { name: "తలకట్టు", en: "Thalakattu", symbol: "ౕ", exp: "అ (A)", form: (c: string) => c, sample: "కల 🖊️" },
    { name: "దీర్ఘము", en: "Dheergamu", symbol: "ా", exp: "ఆ (Aa)", form: (c: string) => c + "ా", sample: "కాకి 🐦" },
    { name: "గుడి", en: "Gudi", symbol: "ి", exp: "ఇ (I)", form: (c: string) => c === "క" ? "కి" : c + "ి", sample: "కిటికి 🪟" },
    { name: "గుడి దీర్ఘము", en: "Gudi Dheergamu", symbol: "ీ", exp: "ఈ (Ee)", form: (c: string) => c === "క" ? "కీ" : c + "ీ", sample: "కీలు 🔑" },
    { name: "కొమ్ము", en: "Kommu", symbol: "ు", exp: "ఉ (U)", form: (c: string) => c === "క" ? "కు" : c + "ు", sample: "కుక్క 🐶" },
    { name: "కొమ్ము దీర్ఘము", en: "Kommu Dheergamu", symbol: "ూ", exp: "ఊ (Oo)", form: (c: string) => c === "క" ? "కూ" : c + "ూ", sample: "కూర 🍲" },
    { name: "రుత్వము / వట్రసుడి", en: "Vatrasudi", symbol: "ృ", exp: "ఋ (Ru)", form: (c: string) => c + "ృ", sample: "కృషి 🌾" },
    { name: "రుత్వదీర్ఘము", en: "Vatrasudi Dheergamu", symbol: "ౄ", exp: "ౠ (Roo)", form: (c: string) => c + "ౄ", sample: "కౄరుడు 🦁" },
    { name: "ఎత్వము", en: "Etvamu", symbol: "ె", exp: "ఎ (E)", form: (c: string) => c + "ె", sample: "కెరటం 🌊" },
    { name: "ఏత్వము / ఎత్వదీర్ఘము", en: "Etva Dheergamu", symbol: "ే", exp: "ఏ (Ee)", form: (c: string) => c + "ే", sample: "కేకు 🍰" },
    { name: "ఐత్వము", en: "Aitvamu", symbol: "ై", exp: "ఐ (Ai)", form: (c: string) => c + "ై", sample: "కైక 👸" },
    { name: "ఒత్వము", en: "Otvamu", symbol: "ొ", exp: "ఒ (O)", form: (c: string) => c + "ొ", sample: "కొడుకు 👦" },
    { name: "ఓత్వము / ఒత్వదీర్ఘము", en: "Otva Dheergamu", symbol: "ో", exp: "ఓ (Oo)", form: (c: string) => c + "ో", sample: "కోట 🏰" },
    { name: "ఔత్వము", en: "Autvamu", symbol: "ౌ", exp: "ఔ (Au)", form: (c: string) => c + "ౌ", sample: "కౌముది 🌕" },
    { name: "సున్నా", en: "Sunna (Am)", symbol: "ం", exp: "అం (Am)", form: (c: string) => c + "ం", sample: "కంకణం 💍" },
    { name: "విసర్గ", en: "Visarga (Aha)", symbol: "ః", exp: "అః (Aha)", form: (c: string) => c + "ః", sample: "దుఃఖం 😢" }
  ];

  // Ottulu state
  const ottuluList = [
    { letter: "క", ottu: "్క", name: "క-ఒత్తు", word: "అక్క 👧", meaning: "Elder Sister", image: "👧" },
    { letter: "గ", ottu: "్గ", name: "గ-ఒత్తు", word: "ముగ్గు 🎨", meaning: "Rangoli / Pattern", image: "🎨" },
    { letter: "చ", ottu: "్చ", name: "చ-ఒత్తు", word: "మచ్చ 🪞", meaning: "Mark / Spot", image: "🪞" },
    { letter: "ట", ottu: "్ట", name: "ట-ఒత్తు", word: "చెట్టు 🌳", meaning: "Tree", image: "🌳" },
    { letter: "త", ottu: "్త", name: "త-ఒత్తు", word: "అత్త 👵", meaning: "Aunt", image: "👵" },
    { letter: "ప", ottu: "్ప", name: "ప-ఒత్తు", word: "అప్ప 🥟", meaning: "Snack / Elder Brother", image: "🥟" },
    { letter: "మ", ottu: "్మ", name: "మ-ఒత్తు", word: "అమ్మ 👩‍🍼", meaning: "Mother", image: "👩‍🍼" },
    { letter: "ల", ottu: "్ల", name: "ల-ఒత్తు", word: "పిల్లి 🐱", meaning: "Cat", image: "🐱" },
    { letter: "వ", ottu: "్వ", name: "వ-ఒత్తు", word: "పువ్వు 🌸", meaning: "Flower", image: "🌸" }
  ];
  const [selectedOttuIdx, setSelectedOttuIdx] = useState<number>(0);

  // Builder state
  const [roundIdx, setRoundIdx] = useState<number>(0);
  const [userSelectedIdxs, setUserSelectedIdxs] = useState<number[]>([]);
  const [msg, setMsg] = useState<{ type: "success" | "error", text: string } | null>(null);

  const rounds = [
    {
      word: "అమ్మ",
      definition: "Mother (The source of absolute love)",
      letters: ["అ", "మ్మ", "క", "ల"],
      correctOrder: [0, 1],
      image: "👩‍🍼"
    },
    {
      word: "ఆట",
      definition: "Play/Game (Fun interactive exercises)",
      letters: ["ఆ", "ట", "ర", "మ"],
      correctOrder: [0, 1],
      image: "⚽"
    },
    {
      word: "బాలిక",
      definition: "Girl (Bright future student)",
      letters: ["బా", "లి", "క", "ల"],
      correctOrder: [0, 1, 2],
      image: "👧"
    }
  ];

  const currentRound = rounds[roundIdx];

  const handleLetterClick = (idx: number) => {
    if (userSelectedIdxs.includes(idx)) {
      setUserSelectedIdxs(prev => prev.filter(i => i !== idx));
      setMsg(null);
    } else {
      const nextList = [...userSelectedIdxs, idx];
      setUserSelectedIdxs(nextList);

      if (nextList.length === currentRound.correctOrder.length) {
        const isCorrect = nextList.every((val, index) => val === currentRound.correctOrder[index]);
        if (isCorrect) {
          setMsg({ type: "success", text: `🌟 Correct! Excellent Word Building: '${currentRound.word}' - ${currentRound.definition}` });
        } else {
          setMsg({ type: "error", text: "❌ Oops! Not the correct spelling order. Try again!" });
        }
      }
    }
  };

  const handleNext = () => {
    setRoundIdx(prev => (prev + 1) % rounds.length);
    setUserSelectedIdxs([]);
    setMsg(null);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="telugu_visual_lab">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <h3 className="font-extrabold text-base text-slate-800">✍️ Telugu Visual Lab: గుణింతాలు & ఒత్తులు</h3>
          <p className="text-xs text-slate-500">Interactive practice for Telugu Guninthalu (గుణింతాలు), Ottulu (ఒత్తులు) & Word Building!</p>
        </div>
        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full uppercase font-mono">Telugu Lab</span>
      </div>

      {/* Interactive Tabs */}
      {chapterId === "g1_tel_guninthalu" ? (
        <div className="flex gap-2 justify-center border-b border-slate-200 pb-3">
          <span className="py-2 px-4 rounded-xl font-black text-xs bg-indigo-600 text-white border border-indigo-700 shadow-sm">
            🎨 గుణింతాలు (Guninthalu Lesson 5)
          </span>
        </div>
      ) : chapterId === "g1_tel_ottulu" ? (
        <div className="flex gap-2 justify-center border-b border-slate-200 pb-3">
          <span className="py-2 px-4 rounded-xl font-black text-xs bg-pink-600 text-white border border-pink-700 shadow-sm">
            🔤 ఒత్తులు (Ottulu Lesson 6)
          </span>
        </div>
      ) : (
        <div className="flex gap-2 justify-center border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab("guninthalu")}
            className={`py-2 px-4 rounded-xl font-black text-xs border transition cursor-pointer ${
              activeTab === "guninthalu"
                ? "bg-indigo-600 text-white border-indigo-700 shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:bg-indigo-50"
            }`}
          >
            🎨 గుణింతాలు (Guninthalu)
          </button>
          <button
            onClick={() => setActiveTab("ottulu")}
            className={`py-2 px-4 rounded-xl font-black text-xs border transition cursor-pointer ${
              activeTab === "ottulu"
                ? "bg-pink-600 text-white border-pink-700 shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:bg-pink-50"
            }`}
          >
            🔤 ఒత్తులు (Ottulu)
          </button>
          <button
            onClick={() => setActiveTab("builder")}
            className={`py-2 px-4 rounded-xl font-black text-xs border transition cursor-pointer ${
              activeTab === "builder"
                ? "bg-rose-600 text-white border-rose-700 shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:bg-rose-50"
            }`}
          >
            🧩 పదాలు (Word Builder)
          </button>
        </div>
      )}

      {/* Tab 1: Guninthalu Explorer */}
      {activeTab === "guninthalu" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-6 animate-fade-in">
          {/* Base Consonant Picker */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase text-slate-500 tracking-wider block">1. Select a Base Consonant (హల్లు):</span>
            <div className="flex gap-2 flex-wrap">
              {["క", "గ", "చ", "జ", "ట", "డ", "త", "ద", "న", "ప", "బ", "మ", "య", "ర", "ల", "వ", "స", "హ"].map(c => (
                <button
                  key={c}
                  onClick={() => setBaseConsonant(c)}
                  className={`w-10 h-10 rounded-xl font-black text-sm border-2 transition cursor-pointer ${
                    baseConsonant === c
                      ? "bg-indigo-600 text-white border-indigo-700 scale-105 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-indigo-50"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Gunintham Grid Display */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-indigo-600 tracking-wider block">
              2. Live '{baseConsonant}' Gunintham Chart ({baseConsonant} గుణింతము):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {guninthaluList.map((g, idx) => (
                <div key={idx} className="bg-gradient-to-b from-indigo-50/80 to-purple-50/80 p-3 rounded-2xl border border-indigo-200 text-center space-y-1 hover:border-indigo-400 transition shadow-2xs">
                  <span className="text-[10px] font-black text-indigo-950 block truncate">{g.name}</span>
                  <span className="text-[9px] font-bold text-amber-700 block">{g.en} ({g.symbol})</span>
                  <span className="text-2xl font-black text-indigo-950 block my-1">{g.form(baseConsonant)}</span>
                  <span className="text-[9px] font-bold text-indigo-600 block">{g.exp}</span>
                  <span className="text-[9px] text-slate-600 block pt-1 border-t border-indigo-150 font-bold bg-white/60 rounded">{g.sample}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Ottulu Explorer */}
      {activeTab === "ottulu" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-6 animate-fade-in">
          <span className="text-xs font-black uppercase text-pink-600 tracking-wider block">Select a Consonant to test its Ottu (ఒత్తు):</span>
          
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
            {ottuluList.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOttuIdx(idx)}
                className={`p-3 rounded-2xl border-2 transition cursor-pointer text-center space-y-0.5 ${
                  selectedOttuIdx === idx
                    ? "bg-pink-600 text-white border-pink-700 scale-105 shadow-md"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-pink-50"
                }`}
              >
                <span className="block text-sm font-black">{item.letter}</span>
                <span className={`block text-xs font-black ${selectedOttuIdx === idx ? "text-pink-100" : "text-pink-600"}`}>
                  {item.letter}{item.ottu}
                </span>
              </button>
            ))}
          </div>

          {/* Detailed Active Ottu Card */}
          {(() => {
            const curr = ottuluList[selectedOttuIdx];
            return (
              <div className="bg-pink-50/70 p-6 rounded-2xl border border-pink-200 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-5xl p-4 bg-white rounded-3xl border border-pink-200 shadow-sm">{curr.image}</span>
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase text-pink-600 tracking-wider">Consonant Adjunct (ఒత్తు):</span>
                    <h4 className="text-lg font-black text-pink-950">{curr.letter} ➡️ {curr.name} ({curr.letter}{curr.ottu})</h4>
                    <p className="text-xs font-bold text-slate-600 mt-1">Word Example: <span className="text-pink-700 text-sm">{curr.word}</span> ({curr.meaning})</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-pink-200 text-center max-w-xs w-full shadow-xs">
                  <span className="text-[10px] font-mono font-bold text-slate-400 block mb-1">Double Consonant Sound:</span>
                  <span className="text-xl font-black text-pink-600 font-mono block">{curr.word}</span>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Tab 3: Word Builder */}
      {activeTab === "builder" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-150 flex flex-col items-center gap-5 shadow-xs animate-fade-in">
          <div className="text-5xl p-5 bg-rose-50 border-2 border-rose-100 rounded-full animate-pulse select-none">
            {currentRound.image}
          </div>

          <div className="text-center space-y-1 max-w-xs">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Meaning:</span>
            <p className="text-xs font-black text-slate-700">{currentRound.definition}</p>
          </div>

          <div className="flex gap-2.5 items-center justify-center min-h-[50px] w-full max-w-xs bg-slate-50 rounded-xl border border-slate-200 border-dashed p-2">
            {userSelectedIdxs.length === 0 && (
              <span className="text-[10px] font-bold text-slate-400 italic">Select letters below...</span>
            )}
            {userSelectedIdxs.map((letterIdx, index) => (
              <div key={index} className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 text-white flex items-center justify-center text-lg font-black shadow-sm relative">
                {currentRound.letters[letterIdx]}
                <span className="absolute -top-1.5 -right-1.5 bg-slate-800 text-white border border-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            {currentRound.letters.map((letter, idx) => {
              const isSelected = userSelectedIdxs.includes(idx);
              return (
                <button
                  key={idx}
                  onClick={() => handleLetterClick(idx)}
                  className={`w-12 h-12 rounded-2xl text-lg font-black border-2 transition cursor-pointer ${
                    isSelected 
                      ? "bg-rose-50 border-rose-500 text-rose-600 scale-95 shadow-inner" 
                      : "bg-white border-slate-200 hover:border-rose-400 hover:scale-102"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          {msg && (
            <div className={`p-3 rounded-xl border text-center text-[11px] font-black w-full max-w-xs animate-bounce ${
              msg.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-rose-50 border-rose-200 text-rose-700"
            }`}>
              {msg.text}
            </div>
          )}

          <button
            onClick={handleNext}
            className="w-full max-w-xs py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-sm hover:scale-[1.01] transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            ⏩ Next Word / తదుపరి పదం
          </button>
        </div>
      )}
    </div>
  );
}

export function HindiLanguageLab({ chapterId }: { chapterId?: string }) {
  const swarList = [
    { letter: "अ", word: "अनार 🍎", mean: "Pomegranate" },
    { letter: "आ", word: "आम 🥭", mean: "Mango" },
    { letter: "इ", word: "इमली 🫛", mean: "Tamarind" },
    { letter: "ई", word: "ईख 🌾", mean: "Sugarcane" }
  ];

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <h3 className="font-extrabold text-base text-slate-800">🇮🇳 Hindi Visual Lab: स्वर और शब्द</h3>
          <p className="text-xs text-slate-500">Explore Hindi Vowels (स्वर) and Vocabulary interactively!</p>
        </div>
        <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full uppercase font-mono">Hindi Lab</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-5 rounded-2xl border border-slate-150">
        {swarList.map((item, idx) => (
          <div key={idx} className="bg-orange-50/60 p-4 rounded-2xl border border-orange-200 text-center space-y-1">
            <span className="text-3xl font-black text-orange-600 block">{item.letter}</span>
            <span className="text-sm font-black text-slate-800 block">{item.word}</span>
            <span className="text-[10px] font-bold text-slate-500">{item.mean}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EnglishLanguageLab({ chapterId }: { chapterId?: string }) {
  const words = [
    { word: "CAT 🐱", letters: ["C", "A", "T"], mean: "Feline Pet" },
    { word: "DOG 🐶", letters: ["D", "O", "G"], mean: "Loyal Canine" },
    { word: "SUN ☀️", letters: ["S", "U", "N"], mean: "Daylight Star" }
  ];

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <h3 className="font-extrabold text-base text-slate-800">🇬🇧 English Language Lab: CVC Word Builder</h3>
          <p className="text-xs text-slate-500">Learn English spelling and phonics CVC words interactively!</p>
        </div>
        <span className="text-[10px] font-bold text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full uppercase font-mono">English Lab</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-5 rounded-2xl border border-slate-150">
        {words.map((item, idx) => (
          <div key={idx} className="bg-purple-50/60 p-4 rounded-2xl border border-purple-200 text-center space-y-2">
            <h4 className="text-xl font-black text-purple-900">{item.word}</h4>
            <div className="flex justify-center gap-1">
              {item.letters.map((l, lIdx) => (
                <span key={lIdx} className="w-8 h-8 rounded-lg bg-purple-600 text-white font-mono font-black text-sm flex items-center justify-center">
                  {l}
                </span>
              ))}
            </div>
            <span className="text-[10px] text-slate-500 font-bold block">{item.mean}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LocatingPlacesVisualLab() {
  const [lat, setLat] = useState<number>(28);
  const [lng, setLng] = useState<number>(77);
  const [activePreset, setActivePreset] = useState<string>("delhi");

  const presets = [
    { id: "delhi", name: "New Delhi 🇮🇳", lat: 28.6, lng: 77.2, desc: "Capital of India (28.6° N, 77.2° E)" },
    { id: "mumbai", name: "Mumbai 🇮🇳", lat: 19.1, lng: 72.9, desc: "Financial Hub on West Coast (19.1° N, 72.9° E)" },
    { id: "equator", name: "Equator / Gabon 🇬🇦", lat: 0, lng: 9.5, desc: "0° Latitude, Central Africa" },
    { id: "greenwich", name: "Greenwich / London 🇬🇧", lat: 51.5, lng: 0.0, desc: "Prime Meridian (0° Longitude)" },
    { id: "tokyo", name: "Tokyo 🇯🇵", lat: 35.7, lng: 139.7, desc: "Far East Time Zone (35.7° N, 139.7° E)" },
    { id: "sydney", name: "Sydney 🇦🇺", lat: -33.9, lng: 151.2, desc: "Southern Hemisphere (33.9° S, 151.2° E)" }
  ];

  const applyPreset = (p: typeof presets[0]) => {
    setLat(p.lat);
    setLng(p.lng);
    setActivePreset(p.id);
  };

  const nsHemisphere = lat >= 0 ? "Northern Hemisphere (ఉత్తరార్ధగోళం)" : "Southern Hemisphere (దక్షిణార్ధగోళం)";
  const ewHemisphere = lng >= 0 ? "Eastern Hemisphere (తూర్పు అర్ధగోళం)" : "Western Hemisphere (పశ్చిమ అర్ధగోళం)";
  
  const hrsOffset = lng / 15;
  const absOffsetHrs = Math.floor(Math.abs(hrsOffset));
  const absOffsetMins = Math.round((Math.abs(hrsOffset) - absOffsetHrs) * 60);
  const timeOffsetStr = `${hrsOffset >= 0 ? "+" : "-"}${absOffsetHrs}h ${absOffsetMins > 0 ? absOffsetMins + "m" : ""}`;

  const pinX = 200 + (lng / 180) * 160;
  const pinY = 100 - (lat / 90) * 80;

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="locating_places_lab">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider block">
            Geography Lab • Social Science
          </span>
          <h3 className="font-extrabold text-base text-slate-800">🌍 Locating Places on Earth: Latitude & Longitude Navigator</h3>
          <p className="text-xs text-slate-500">Explore Parallels of Latitude, Meridians of Longitude, Hemispheres & Time Zones!</p>
        </div>
        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full uppercase font-mono shrink-0">
          GIS Coordinates
        </span>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
          Quick Fly-To Places on Globe:
        </span>
        <div className="flex flex-wrap gap-2">
          {presets.map(p => (
            <button
              key={p.id}
              onClick={() => applyPreset(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                activePreset === p.id 
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-xs" 
                  : "bg-slate-50 hover:bg-indigo-50 text-slate-700 border-slate-200"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-indigo-950 p-5 rounded-2xl text-white space-y-4 shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-indigo-800/80 pb-3">
            <span className="text-xs font-mono font-bold text-indigo-300">
              Active Coordinates: <span className="text-amber-300 font-extrabold">{Math.abs(lat)}°{lat >= 0 ? "N" : "S"}, {Math.abs(lng)}°{lng >= 0 ? "E" : "W"}</span>
            </span>
            <span className="text-[10px] bg-indigo-800 px-2 py-0.5 rounded font-mono text-indigo-200">
              Globe View
            </span>
          </div>

          <div className="relative w-full h-56 bg-slate-900 rounded-xl border border-indigo-800 overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              <ellipse cx="200" cy="100" rx="180" ry="90" fill="#030712" stroke="#312e81" strokeWidth="2" />
              
              <line x1="20" y1="100" x2="380" y2="100" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
              <text x="382" y="103" fill="#f59e0b" fontSize="8" fontWeight="bold">0° Equator</text>
              
              <line x1="30" y1="76" x2="370" y2="76" stroke="#818cf8" strokeWidth="1" strokeDasharray="2 2" />
              <text x="372" y="79" fill="#818cf8" fontSize="7">23.5°N</text>

              <line x1="30" y1="124" x2="370" y2="124" stroke="#818cf8" strokeWidth="1" strokeDasharray="2 2" />
              <text x="372" y="127" fill="#818cf8" fontSize="7">23.5°S</text>

              <line x1="200" y1="10" x2="200" y2="190" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
              <text x="200" y="8" fill="#ef4444" fontSize="8" textAnchor="middle" fontWeight="bold">0° Prime Meridian</text>

              <line x1="273" y1="10" x2="273" y2="190" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="273" y="198" fill="#10b981" fontSize="7" textAnchor="middle" fontWeight="bold">82.5°E (IST)</text>

              <circle cx={pinX} cy={pinY} r="7" fill="#ec4899" className="animate-ping opacity-75" />
              <circle cx={pinX} cy={pinY} r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
              <line x1={pinX} y1="0" x2={pinX} y2="200" stroke="#ec4899" strokeWidth="0.5" strokeDasharray="1 3" />
              <line x1="0" y1={pinY} x2="400" y2={pinY} stroke="#ec4899" strokeWidth="0.5" strokeDasharray="1 3" />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono">
            <div className="bg-indigo-900/80 p-2 rounded-lg border border-indigo-700">
              <span className="text-indigo-300 block">Hemispheres:</span>
              <span className="text-amber-300 font-bold block">{nsHemisphere}</span>
              <span className="text-emerald-300 font-bold block">{ewHemisphere}</span>
            </div>
            <div className="bg-indigo-900/80 p-2 rounded-lg border border-indigo-700">
              <span className="text-indigo-300 block">Time Offset vs GMT:</span>
              <span className="text-rose-300 font-extrabold text-xs block">{timeOffsetStr}</span>
              <span className="text-slate-300 text-[9px] block">15° Longitude = 1 Hr</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="font-extrabold text-sm text-slate-800 flex items-center justify-between">
              <span>Adjust Coordinates:</span>
              <span className="text-xs text-indigo-600 font-mono font-bold">Manual Drag</span>
            </h4>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Latitude (అక్షాంశం):</span>
                <span className="text-indigo-600 font-mono">{lat}° ({lat >= 0 ? "N" : "S"})</span>
              </div>
              <input
                type="range"
                min="-90"
                max="90"
                value={lat}
                onChange={(e) => {
                  setLat(Number(e.target.value));
                  setActivePreset("custom");
                }}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                <span>90°S (South Pole)</span>
                <span>0° (Equator)</span>
                <span>90°N (North Pole)</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Longitude (రేఖాంశం):</span>
                <span className="text-rose-600 font-mono">{lng}° ({lng >= 0 ? "E" : "W"})</span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                value={lng}
                onChange={(e) => {
                  setLng(Number(e.target.value));
                  setActivePreset("custom");
                }}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                <span>180°W (West)</span>
                <span>0° (Prime Meridian)</span>
                <span>180°E (Date Line)</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 p-4 rounded-2xl space-y-2">
            <span className="text-[10px] font-black uppercase text-indigo-800 tracking-wider block">
              💡 Geography Key Concept:
            </span>
            <p className="text-xs text-indigo-950 leading-relaxed font-serif">
              <b>Latitudes</b> (Parallels) measure distance North or South of the Equator. <b>Longitudes</b> (Meridians) measure distance East or West of the Prime Meridian. Together, they create an exact geographic coordinate to locate any school, city, or ship in the ocean!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TimelineSourcesVisualLab() {
  const [activeTab, setActiveTab] = useState<"timeline" | "sources">("timeline");
  const [selectedEraIdx, setSelectedEraIdx] = useState<number>(0);
  const [classifiedItems, setClassifiedItems] = useState<Record<string, "literary" | "archaeological">>({});

  const eras = [
    { title: "Indus Valley Civilization", time: "2500 BCE - 1500 BCE", icon: "🏛️", desc: "Planned brick cities (Harappa & Mohenjo-daro), drainage systems, terracotta seals, and bronze statues.", sources: "Harappan Seals, Great Bath ruins, Dancing Girl bronze, Pottery" },
    { title: "Vedic Period", time: "1500 BCE - 600 BCE", icon: "📖", desc: "Composition of the Rigveda, Samaveda, Yajurveda, and Atharvaveda; transition into agrarian societies.", sources: "Rigveda Hymns, Iron tools at Painted Grey Ware sites" },
    { title: "Mahajanapadas & Mauryan Empire", time: "600 BCE - 185 BCE", icon: "📜", desc: "Emperor Ashoka's empire spanning most of South Asia, propagation of Dhamma and Ahimsa.", sources: "Ashoka Pillar Edicts at Sarnath, Kautilya's Arthashastra, Sanchi Stupa" },
    { title: "Gupta Golden Age", time: "320 CE - 550 CE", icon: "🪙", desc: "Fluorescence of Indian science (Aryabhata), mathematics (Zero), literature (Kalidasa), and art.", sources: "Gupta Gold Dinara Coins, Ajanta Cave Frescoes, Iron Pillar of Delhi" },
    { title: "Medieval & Modern India", time: "1200 CE - 1947 CE", icon: "🏰", desc: "Mughal architecture, Maratha history, colonial period, and freedom struggle.", sources: "Red Fort, Taj Mahal, Royal Farman decrees, Independence records" }
  ];

  const sourceItems = [
    { id: "1", name: "Ashoka's Stone Pillar Edict", correct: "archaeological", desc: "Carved on stone pillars" },
    { id: "2", name: "Rigveda Hymns on Birch Bark", correct: "literary", desc: "Written manuscript text" },
    { id: "3", name: "Gupta Gold Coins (Dinara)", correct: "archaeological", desc: "Physical currency metal" },
    { id: "4", name: "Kalidasa's Abhijnanasakuntalam", correct: "literary", desc: "Sanskrit drama play text" },
    { id: "5", name: "Harappan Terracotta Seal", correct: "archaeological", desc: "Excavated clay artifact" },
    { id: "6", name: "Kautilya's Arthashastra", correct: "literary", desc: "Ancient treatise on governance" }
  ];

  const handleClassify = (id: string, category: "literary" | "archaeological") => {
    setClassifiedItems(prev => ({ ...prev, [id]: category }));
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="timeline_sources_lab">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider block">
            History Lab • Social Science
          </span>
          <h3 className="font-extrabold text-base text-slate-800">📜 Timeline & Sources of History</h3>
          <p className="text-xs text-slate-500">Explore Chronology (BCE/CE) and Detective Tools of Historians!</p>
        </div>
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("timeline")}
            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
              activeTab === "timeline" ? "bg-amber-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🗓️ Timeline (BCE/CE)
          </button>
          <button
            onClick={() => setActiveTab("sources")}
            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
              activeTab === "sources" ? "bg-amber-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🔎 Source Detective
          </button>
        </div>
      </div>

      {activeTab === "timeline" ? (
        <div className="space-y-6">
          <div className="bg-amber-950 p-6 rounded-2xl text-white space-y-4 shadow-md">
            <span className="text-xs font-mono font-bold text-amber-300 block text-center">
              INDIAN HISTORY CHRONOLOGICAL TIMELINE (BCE to CE)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {eras.map((era, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedEraIdx(idx)}
                  className={`p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-between gap-2 ${
                    selectedEraIdx === idx
                      ? "bg-amber-500 text-slate-950 border-amber-300 font-extrabold shadow-sm scale-102"
                      : "bg-amber-900/60 hover:bg-amber-800/80 text-amber-100 border-amber-800"
                  }`}
                >
                  <span className="text-2xl">{era.icon}</span>
                  <div>
                    <span className="text-[10px] font-bold block leading-tight">{era.title}</span>
                    <span className="text-[9px] font-mono opacity-80 block mt-0.5">{era.time}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{eras[selectedEraIdx].icon}</span>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {eras[selectedEraIdx].time}
                </span>
                <h4 className="font-extrabold text-lg text-slate-900">{eras[selectedEraIdx].title}</h4>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
              {eras[selectedEraIdx].desc}
            </p>
            <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-xl text-xs text-amber-950 font-mono">
              <span className="font-extrabold block text-[10px] uppercase text-amber-800">Key Historical Sources Recovered:</span>
              <span>{eras[selectedEraIdx].sources}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
          <div>
            <h4 className="font-extrabold text-sm text-slate-800">Classify the Historical Sources:</h4>
            <p className="text-xs text-slate-500">Categorize each artifact into <b>Literary (రాత పూర్వకం)</b> or <b>Archaeological (పురావస్తు)</b> sources!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sourceItems.map(item => {
              const choice = classifiedItems[item.id];
              const isCorrect = choice === item.correct;
              return (
                <div key={item.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
                  <div>
                    <h5 className="font-extrabold text-xs text-slate-900">{item.name}</h5>
                    <span className="text-[10px] text-slate-500 font-mono block">{item.desc}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleClassify(item.id, "literary")}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                        choice === "literary"
                          ? isCorrect ? "bg-emerald-600 text-white border-emerald-600" : "bg-rose-600 text-white border-rose-600"
                          : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      📜 Literary
                    </button>
                    <button
                      onClick={() => handleClassify(item.id, "archaeological")}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                        choice === "archaeological"
                          ? isCorrect ? "bg-emerald-600 text-white border-emerald-600" : "bg-rose-600 text-white border-rose-600"
                          : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      🏺 Archaeological
                    </button>
                  </div>

                  {choice && (
                    <span className={`text-[9px] font-bold block text-center ${isCorrect ? "text-emerald-700" : "text-rose-700"}`}>
                      {isCorrect ? "✅ Correct Classification!" : `❌ Incorrect. Correct: ${item.correct.toUpperCase()}`}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function ValueOfWorkVisualLab() {
  const [activeTab, setActiveTab] = useState<"sectors" | "chain" | "pledge">("sectors");
  const [selectedSector, setSelectedSector] = useState<"primary" | "secondary" | "tertiary">("primary");
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>(["Farmer 🌾", "Teacher 📚", "Sanitation Worker 🧹"]);

  const sectors = {
    primary: {
      title: "Primary Sector (పాథమిక రంగం)",
      icon: "🌾",
      desc: "Direct extraction and harvesting of natural resources from Earth.",
      examples: [
        { title: "Farmer (రైతు)", role: "Grows crops, food grains, fruits, and vegetables.", impact: "Feeds the entire nation" },
        { title: "Fisherman (చేపలు పట్టువారు)", role: "Catches fish and marine food from rivers and oceans.", impact: "Provides protein & nutrition" },
        { title: "Miner & Dairy Worker", role: "Extracts minerals, milk, and natural raw materials.", impact: "Supplies raw materials for industry" }
      ]
    },
    secondary: {
      title: "Secondary Sector (ద్వితీయ రంగం)",
      icon: "🏭",
      desc: "Manufacturing, processing, and craftsmanship that converts raw materials into finished products.",
      examples: [
        { title: "Textile Weaver & Tailor", role: "Spins raw cotton yarn into cloth and garments.", impact: "Clothes our community" },
        { title: "Construction Worker (భవన నిర్మాతలు)", role: "Builds homes, schools, bridges, and roads.", impact: "Provides shelter & infrastructure" },
        { title: "Potter & Blacksmith", role: "Crafts utensils, tools, and clay items.", impact: "Creates essential daily utility goods" }
      ]
    },
    tertiary: {
      title: "Tertiary Sector (సేవా రంగం)",
      icon: "🚑",
      desc: "Service activities that support people and industries directly.",
      examples: [
        { title: "Teacher (ఉపాధ్యాయులు)", role: "Educates children and builds future generations.", impact: "Spreads knowledge & values" },
        { title: "Doctor & Healthcare Worker", role: "Treats sick people and protects public health.", impact: "Saves lives and restores wellness" },
        { title: "Sanitation Worker & Driver", role: "Keeps streets clean and moves goods safely.", impact: "Ensures health, hygiene & mobility" }
      ]
    }
  };

  const chainSteps = [
    { step: 1, role: "Farmer 🌾", sector: "Primary", desc: "Grows raw cotton in fertile agricultural fields" },
    { step: 2, role: "Truck Driver 🚛", sector: "Tertiary", desc: "Transports raw cotton bales from village to textile mill" },
    { step: 3, role: "Mill Worker 🧵", sector: "Secondary", desc: "Spins raw cotton thread and weaves fabric cloth" },
    { step: 4, role: "Tailor ✂️", sector: "Secondary", desc: "Stitches fabric into comfortable shirts and uniforms" },
    { step: 5, role: "Shopkeeper 🛍️", sector: "Tertiary", desc: "Sells the finished clothing in local market to families" }
  ];

  const availableWorkerList = [
    "Farmer 🌾", "Teacher 📚", "Sanitation Worker 🧹", "Doctor 🩺", 
    "Police Officer 👮", "Truck Driver 🚛", "Factory Worker 🏭", "Electrician ⚡"
  ];

  const toggleWorker = (w: string) => {
    if (selectedWorkers.includes(w)) {
      if (selectedWorkers.length > 1) {
        setSelectedWorkers(prev => prev.filter(item => item !== w));
      }
    } else {
      setSelectedWorkers(prev => [...prev, w]);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="value_of_work_lab">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider block">
            Civics Lab • Social Science
          </span>
          <h3 className="font-extrabold text-base text-slate-800">🤝 The Value of Work & Dignity of Labor</h3>
          <p className="text-xs text-slate-500">Explore Economic Sectors, Interdependence, and Equal Respect for All Professions!</p>
        </div>
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("sectors")}
            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
              activeTab === "sectors" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🏭 Sectors
          </button>
          <button
            onClick={() => setActiveTab("chain")}
            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
              activeTab === "chain" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🔗 Interdependence
          </button>
          <button
            onClick={() => setActiveTab("pledge")}
            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
              activeTab === "pledge" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            📜 Gratitude Card
          </button>
        </div>
      </div>

      {activeTab === "sectors" && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {(["primary", "secondary", "tertiary"] as const).map(sec => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                  selectedSector === sec
                    ? "bg-emerald-600 text-white border-emerald-600 font-extrabold shadow-xs"
                    : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200 font-bold"
                }`}
              >
                <span className="text-xl block">{sectors[sec].icon}</span>
                <span className="text-xs block mt-1">{sec.toUpperCase()} SECTOR</span>
              </button>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div>
              <h4 className="font-extrabold text-base text-slate-900">{sectors[selectedSector].title}</h4>
              <p className="text-xs text-slate-500">{sectors[selectedSector].desc}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {sectors[selectedSector].examples.map((ex, idx) => (
                <div key={idx} className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 space-y-1">
                  <h5 className="font-extrabold text-xs text-emerald-950">{ex.title}</h5>
                  <p className="text-[10px] text-slate-600 leading-normal">{ex.role}</p>
                  <span className="text-[9px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-100 inline-block mt-2">
                    🌟 Impact: {ex.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "chain" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
          <div>
            <h4 className="font-extrabold text-sm text-slate-900">Case Study: How a Cotton Shirt Reaches You</h4>
            <p className="text-xs text-slate-500">Notice how every worker across Primary, Secondary, and Tertiary sectors is indispensable!</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-stretch">
            {chainSteps.map((c) => (
              <div key={c.step} className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center space-y-2 flex flex-col justify-between">
                <div>
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono font-black text-[10px] flex items-center justify-center mx-auto">
                    {c.step}
                  </span>
                  <h5 className="font-black text-xs text-slate-900 mt-2">{c.role}</h5>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 inline-block">
                    {c.sector}
                  </span>
                </div>
                <p className="text-[10px] text-slate-600 leading-tight">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "pledge" && (
        <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-6 rounded-2xl space-y-4 shadow-md">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider block">
              Dignity of Labor Pledge & Respect Card
            </span>
            <h4 className="text-lg font-black text-amber-300">"I Respect All Honest Work!"</h4>
          </div>

          <div className="bg-white/10 p-4 rounded-xl space-y-3">
            <span className="text-xs font-bold text-emerald-200 block">Select community workers to honor:</span>
            <div className="flex flex-wrap gap-2">
              {availableWorkerList.map(w => (
                <button
                  key={w}
                  onClick={() => toggleWorker(w)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer border ${
                    selectedWorkers.includes(w)
                      ? "bg-amber-400 text-slate-950 border-amber-400 font-extrabold"
                      : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white text-slate-900 p-5 rounded-xl border border-amber-300 space-y-2 text-center font-serif">
            <span className="text-2xl">🤝🌟📜</span>
            <h5 className="font-black text-sm text-emerald-950">Certificate of Gratitude & Respect</h5>
            <p className="text-xs text-slate-700 leading-relaxed max-w-lg mx-auto">
              "I promise to always treat <b>{selectedWorkers.join(", ")}</b> and every worker in my community with kindness, gratitude, politeness, and equal human dignity!"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function MotionsEarthVisualLab() {
  const [orbitAngle, setOrbitAngle] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setOrbitAngle(prev => (prev + 2) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getSeason = (angle: number) => {
    if (angle >= 45 && angle < 135) return { name: "Summer Solstice (June 21)", desc: "Northern Hemisphere tilts TOWARD the Sun. Longest day in India!", icon: "☀️" };
    if (angle >= 135 && angle < 225) return { name: "Autumnal Equinox (Sept 23)", desc: "Direct rays hit Equator. Day and night are equal worldwide!", icon: "🍂" };
    if (angle >= 225 && angle < 315) return { name: "Winter Solstice (Dec 22)", desc: "Northern Hemisphere tilts AWAY from Sun. Shortest day in India!", icon: "❄️" };
    return { name: "Vernal Equinox (March 21)", desc: "Spring season! Sun directly over Equator, equal day & night.", icon: "🌸" };
  };

  const currentSeason = getSeason(orbitAngle);
  const earthX = 200 + 130 * Math.cos((orbitAngle * Math.PI) / 180);
  const earthY = 110 + 60 * Math.sin((orbitAngle * Math.PI) / 180);

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="motions_earth_lab">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider block">
            Geography Lab • Social Science
          </span>
          <h3 className="font-extrabold text-base text-slate-800">🌌 Motions of the Earth: Rotation & Revolution</h3>
          <p className="text-xs text-slate-500">Explore Day & Night, Earth's 23.5° Tilt, Solstices, Equinoxes & Leap Years!</p>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer border ${
            isPlaying ? "bg-rose-600 text-white border-rose-600" : "bg-blue-600 text-white border-blue-600 shadow-xs"
          }`}
        >
          {isPlaying ? "⏸️ Pause Orbit" : "▶️ Orbit Revolution"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-slate-950 p-6 rounded-2xl text-white space-y-4 shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 text-xs font-mono">
            <span className="text-blue-300 font-bold">Orbit Angle: {orbitAngle}°</span>
            <span className="text-amber-300 font-extrabold">{currentSeason.icon} {currentSeason.name}</span>
          </div>

          <div className="relative w-full h-64 bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 400 220" className="w-full h-full">
              <ellipse cx="200" cy="110" rx="130" ry="60" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
              
              <circle cx="200" cy="110" r="22" fill="#fbbf24" className="animate-pulse" />
              <circle cx="200" cy="110" r="28" fill="#f59e0b" opacity="0.3" />
              <text x="200" y="113" fill="#78350f" fontSize="8" fontWeight="black" textAnchor="middle">SUN</text>

              <line x1={earthX - 10} y1={earthY - 20} x2={earthX + 10} y2={earthY + 20} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
              <circle cx={earthX} cy={earthY} r="12" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
              <path d={`M ${earthX} ${earthY - 12} A 12 12 0 0 1 ${earthX} ${earthY + 12} Z`} fill="#0f172a" opacity="0.6" />
              <circle cx={earthX} cy={earthY} r="2" fill="#f87171" />
            </svg>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
            <span className="text-amber-400 font-extrabold block">{currentSeason.name}</span>
            <p className="text-slate-300 text-[11px] leading-normal">{currentSeason.desc}</p>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="font-extrabold text-sm text-slate-800">Revolution Position Slider:</h4>
            <input
              type="range"
              min="0"
              max="359"
              value={orbitAngle}
              onChange={(e) => {
                setOrbitAngle(Number(e.target.value));
                setIsPlaying(false);
              }}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono font-bold">
              <span>0° (Mar 21)</span>
              <span>90° (Jun 21)</span>
              <span>180° (Sep 23)</span>
              <span>270° (Dec 22)</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl space-y-2">
            <span className="text-[10px] font-black uppercase text-blue-800 tracking-wider block">
              💡 Leap Year Math Formula:
            </span>
            <p className="text-xs text-blue-950 font-serif leading-relaxed">
              Earth takes <b>365 days and 6 hours (¼ day)</b> to orbit the Sun. Every 4 years, four 6-hour quarters equal 24 hours (1 full day), added to February as Feb 29 (366 days)!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EarliestCitiesVisualLab() {
  const [activeTab, setActiveTab] = useState<"layout" | "artifacts" | "bath">("layout");

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="earliest_cities_lab">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase text-orange-600 tracking-wider block">
            History Lab • Social Science
          </span>
          <h3 className="font-extrabold text-base text-slate-800">🏛️ Earliest Cities: Harappan Civilization (~2500 BCE)</h3>
          <p className="text-xs text-slate-500">Explore Citadel, Great Bath, Interlocking Bricks, Drains, Seals & Lothal Dockyard!</p>
        </div>
        <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("layout")}
            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
              activeTab === "layout" ? "bg-orange-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🏰 City Layout
          </button>
          <button
            onClick={() => setActiveTab("bath")}
            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
              activeTab === "bath" ? "bg-orange-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🌊 Great Bath & Drains
          </button>
          <button
            onClick={() => setActiveTab("artifacts")}
            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
              activeTab === "artifacts" ? "bg-orange-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🏺 Seals & Crafts
          </button>
        </div>
      </div>

      {activeTab === "layout" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-orange-950 p-6 rounded-2xl text-white space-y-3 shadow-md">
            <span className="text-[10px] font-mono font-bold text-orange-300 uppercase block">
              1. Citadel (West Side - High Platform)
            </span>
            <h4 className="font-extrabold text-base text-amber-300">The Fortress & Public Center</h4>
            <p className="text-xs text-orange-100 leading-relaxed font-serif">
              Built on elevated mud-brick platforms to protect against Indus river floods. Contained public buildings like the Great Bath, Granaries for grain storage, and assembly halls.
            </p>
          </div>

          <div className="bg-amber-900 p-6 rounded-2xl text-white space-y-3 shadow-md">
            <span className="text-[10px] font-mono font-bold text-amber-300 uppercase block">
              2. Lower Town (East Side - Broad Grid)
            </span>
            <h4 className="font-extrabold text-base text-amber-200">Residential Neighborhoods</h4>
            <p className="text-xs text-amber-100 leading-relaxed font-serif">
              Larger area with two-story brick houses built around central courtyards. Streets intersected at right angles in a rectangular grid system with covered street drains.
            </p>
          </div>
        </div>
      )}

      {activeTab === "bath" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <h4 className="font-extrabold text-sm text-slate-900">The Great Bath of Mohenjo-daro</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            A large rectangular tank in the Citadel made of baked bricks, coated with plaster, and sealed with a layer of natural tar (bitumen) to prevent water leakage. Steps led down from two sides, surrounded by rooms for changing clothes.
          </p>
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-950 space-y-1">
            <span className="font-black block uppercase text-amber-800 text-[10px]">Sanitation & Drainage Standards:</span>
            <p>Every Harappan house had its own paved bath space. Drains flowed into covered street sewers equipped with inspection holes at regular intervals for municipal cleaning!</p>
          </div>
        </div>
      )}

      {activeTab === "artifacts" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
            <span className="text-2xl block">🦏</span>
            <h5 className="font-extrabold text-xs text-slate-900">Steatite Seals</h5>
            <p className="text-[10px] text-slate-600">Stamped on clay packages for trade authentication with animal motifs (humpless bull, unicorn).</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
            <span className="text-2xl block">💃</span>
            <h5 className="font-extrabold text-xs text-slate-900">Dancing Girl Statue</h5>
            <p className="text-[10px] text-slate-600">Lost-wax bronze casting masterpiece demonstrating advanced metallurgy 4,500 years ago.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
            <span className="text-2xl block">⚓</span>
            <h5 className="font-extrabold text-xs text-slate-900">Lothal Dockyard</h5>
            <p className="text-[10px] text-slate-600">World's earliest known tidal dockyard in Gujarat connecting Indus goods to Mesopotamia.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function GovernmentDiversityVisualLab() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="government_diversity_lab">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase text-teal-600 tracking-wider block">
            Civics Lab • Social Science
          </span>
          <h3 className="font-extrabold text-base text-slate-800">🗳️ Diversity & Local Self-Government</h3>
          <p className="text-xs text-slate-500">Explore Unity in Diversity, Panchayati Raj System & Municipal Corporations!</p>
        </div>
        <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase font-mono">
          3-Tier Democracy
        </span>
      </div>

      <div className="bg-teal-950 p-6 rounded-2xl text-white space-y-4 shadow-md">
        <span className="text-xs font-mono font-bold text-teal-300 block text-center uppercase">
          Panchayati Raj System (Rural Local Government)
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-teal-900/80 p-4 rounded-xl border border-teal-700 space-y-2">
            <span className="text-[10px] font-black text-amber-300 uppercase block">Level 1: Village</span>
            <h5 className="font-extrabold text-sm text-white">Gram Panchayat</h5>
            <p className="text-[11px] text-teal-100 leading-normal">
              Elected by <b>Gram Sabha</b> (all adult village voters). Headed by the <b>Sarpanch</b> and Ward Members (Panchs).
            </p>
          </div>

          <div className="bg-teal-900/80 p-4 rounded-xl border border-teal-700 space-y-2">
            <span className="text-[10px] font-black text-amber-300 uppercase block">Level 2: Block</span>
            <h5 className="font-extrabold text-sm text-white">Panchayat Samiti</h5>
            <p className="text-[11px] text-teal-100 leading-normal">
              Coordinates development plans for a cluster of villages at the Block level under a Block Development Officer (BDO).
            </p>
          </div>

          <div className="bg-teal-900/80 p-4 rounded-xl border border-teal-700 space-y-2">
            <span className="text-[10px] font-black text-amber-300 uppercase block">Level 3: District</span>
            <h5 className="font-extrabold text-sm text-white">Zilla Parishad</h5>
            <p className="text-[11px] text-teal-100 leading-normal">
              Highest rural tier; manages district-wide budgets, agricultural funds, and rural roads under District Collector.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
        <h4 className="font-extrabold text-sm text-slate-900">🇮🇳 "Unity in Diversity" Key Concept</h4>
        <p className="text-xs text-slate-700 leading-relaxed font-serif">
          Coined by Jawaharlal Nehru in his book <i>'Discovery of India'</i>, Unity in Diversity reflects how India's multi-cultural society—with 22 official languages, diverse cuisines, traditional clothing, and religious festivals—remains united under one national Constitution.
        </p>
      </div>
    </div>
  );
}

export function InteractiveMapPointingLab({ defaultGrade = 6 }: { defaultGrade?: 6 | 9 }) {
  const [mode, setMode] = useState<"explore" | "quiz">("explore");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedPointId, setSelectedPointId] = useState<string>("tropic_cancer");
  
  // Quiz State
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [userFeedback, setUserFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);

  interface MapPoint {
    id: string;
    name: string;
    x: number;
    y: number;
    category: "physical" | "river" | "coordinate" | "political" | "water" | "neighbor";
    type: string;
    desc: string;
    ncertFact: string;
    hint: string;
  }

  const mapPoints: MapPoint[] = [
    {
      id: "tropic_cancer",
      name: "Tropic of Cancer (23°30' N)",
      x: 250,
      y: 220,
      category: "coordinate",
      type: "Latitude Line",
      desc: "Latitude line dividing India into northern subtropical and southern tropical zones.",
      ncertFact: "Passes through 8 Indian states: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram.",
      hint: "Look for the dashed orange horizontal latitude line crossing Central India."
    },
    {
      id: "standard_meridian",
      name: "Standard Meridian (82°30' E IST)",
      x: 300,
      y: 240,
      category: "coordinate",
      type: "Longitude Line",
      desc: "Standard Meridian of India passing through Mirzapur (Uttar Pradesh) used to calculate Indian Standard Time (UTC +5:30).",
      ncertFact: "Chosen to eliminate the 2-hour time difference between Gujarat (West) and Arunachal Pradesh (East).",
      hint: "Look for the dashed indigo vertical meridian line passing near Central-East India."
    },
    {
      id: "river_indus",
      name: "River Indus",
      x: 135,
      y: 75,
      category: "river",
      type: "Himalayan River System",
      desc: "Originates near Lake Mansarovar in Tibet, flows northwest through Ladakh and J&K before entering Pakistan.",
      ncertFact: "One of the longest rivers in the world (~2,900 km). Major Indian tributaries: Jhelum, Chenab, Ravi, Beas, and Sutlej.",
      hint: "Flows northwest through the northernmost region of Ladakh and Jammu & Kashmir."
    },
    {
      id: "river_ganga",
      name: "River Ganga",
      x: 260,
      y: 165,
      category: "river",
      type: "National River of India",
      desc: "Originates at Bhagirathi (Gangotri Glacier) in Uttarakhand, flows over 2,525 km across northern plains into Bay of Bengal.",
      ncertFact: "Forms the world's largest delta—the Sundarbans Delta—along with River Brahmaputra.",
      hint: "Winding blue line flowing across the Northern Plains from Uttarakhand to West Bengal."
    },
    {
      id: "river_yamuna",
      name: "River Yamuna",
      x: 215,
      y: 170,
      category: "river",
      type: "Major Tributary of Ganga",
      desc: "Originates at Yamunotri Glacier, flows parallel to Ganga passing New Delhi and Agra, joining Ganga at Prayagraj.",
      ncertFact: "Largest right-bank tributary of River Ganga. Major tributaries: Chambal, Betwa, and Ken.",
      hint: "Runs right past New Delhi and Agra, merging with Ganga at Prayagraj."
    },
    {
      id: "river_brahmaputra",
      name: "River Brahmaputra",
      x: 385,
      y: 155,
      category: "river",
      type: "International River System",
      desc: "Known as Tsangpo in Tibet, enters Arunachal Pradesh as Dihang, flows through Assam valley into Bangladesh.",
      ncertFact: "Forms Majuli—the world's largest riverine island—in Assam.",
      hint: "Flows through Tibet, enters Arunachal Pradesh in the North-East, and flows through Assam."
    },
    {
      id: "river_narmada",
      name: "River Narmada",
      x: 190,
      y: 245,
      category: "river",
      type: "West-Flowing Peninsular River",
      desc: "Originates in Amarkantak Hills (MP), flows west in a rift valley between Vindhya and Satpura ranges into Arabian Sea.",
      ncertFact: "Creates famous Marble Rocks gorge near Jabalpur and Dhuandhar Waterfalls.",
      hint: "Flows westward through Madhya Pradesh into the Gulf of Khambhat / Arabian Sea."
    },
    {
      id: "river_tapi",
      name: "River Tapi (Tapti)",
      x: 185,
      y: 265,
      category: "river",
      type: "West-Flowing Peninsular River",
      desc: "Originates in Satpura range (MP), flows west parallel to Narmada through MP, Maharashtra, and Gujarat into Arabian Sea.",
      ncertFact: "One of only three major West-flowing peninsular rivers in India along with Narmada and Mahi.",
      hint: "Runs west parallel to Narmada, just south of the Satpura range."
    },
    {
      id: "river_mahanadi",
      name: "River Mahanadi",
      x: 310,
      y: 275,
      category: "river",
      type: "East-Flowing Peninsular River",
      desc: "Originates in Chhattisgarh highlands, flows 858 km through Odisha into Bay of Bengal.",
      ncertFact: "Hirakud Dam—one of the world's longest earthen dams—is built across River Mahanadi in Odisha.",
      hint: "Flows eastward through Odisha state into the Bay of Bengal."
    },
    {
      id: "river_godavari",
      name: "River Godavari",
      x: 240,
      y: 310,
      category: "river",
      type: "Largest Peninsular River ('Dakshin Ganga')",
      desc: "Originates at Trimbakeshwar near Nashik (MH), flows 1,465 km east across Deccan Plateau into Bay of Bengal.",
      ncertFact: "Largest peninsular river basin in India covering Maharashtra, MP, Odisha, Telangana, and Andhra Pradesh.",
      hint: "Originates near Nashik (Maharashtra) and flows southeast across the Deccan Plateau."
    },
    {
      id: "river_krishna",
      name: "River Krishna",
      x: 230,
      y: 360,
      category: "river",
      type: "East-Flowing Peninsular River",
      desc: "Originates near Mahabaleshwar in Western Ghats, flows 1,400 km through Maharashtra, Karnataka, Telangana, and AP into Bay of Bengal.",
      ncertFact: "Major tributaries include Tungabhadra, Koyna, Bhima, Ghataprabha, and Musi.",
      hint: "Originates near Mahabaleshwar and flows across the central peninsular plateau into Bay of Bengal."
    },
    {
      id: "river_kaveri",
      name: "River Kaveri (Cauvery)",
      x: 210,
      y: 430,
      category: "river",
      type: "Southern Peninsular River",
      desc: "Originates at Talakaveri in Brahmagiri hills (Karnataka), flows 800 km through Tamil Nadu into Bay of Bengal.",
      ncertFact: "Creates Shivanasamudra Falls and forms an extraordinarily fertile agricultural delta in Tamil Nadu.",
      hint: "Located in South India, flowing through Karnataka and Tamil Nadu into Bay of Bengal."
    },
    {
      id: "himalayas",
      name: "Himalayas (Mountain Range)",
      x: 260,
      y: 105,
      category: "physical",
      type: "Young Fold Mountains",
      desc: "Highest mountain range in the world, stretching across Northern India from West to East.",
      ncertFact: "Consists of 3 parallel ranges: Himadri (Greater Himalayas), Himachal (Lesser Himalayas), and Shiwaliks (Outer Himalayas).",
      hint: "Located along the extreme northern arc boundary of India."
    },
    {
      id: "thar_desert",
      name: "Thar Desert (Great Indian Desert)",
      x: 135,
      y: 185,
      category: "physical",
      type: "Arid Desert",
      desc: "Large arid sandy desert region located in Rajasthan.",
      ncertFact: "Receives extremely low rainfall (<150 mm per year) and has sparse vegetation.",
      hint: "Located in northwestern India near Rajasthan."
    },
    {
      id: "deccan_plateau",
      name: "Deccan Plateau",
      x: 220,
      y: 330,
      category: "physical",
      type: "Peninsular Plateau",
      desc: "Large triangular plateau extending south of the Narmada River.",
      ncertFact: "Composed of volcanic basalt rocks and rich in black Regur soil ideal for cotton.",
      hint: "Located in the central heartland of Peninsular India."
    },
    {
      id: "western_ghats",
      name: "Western Ghats (Sahyadris)",
      x: 165,
      y: 360,
      category: "physical",
      type: "Mountain Range",
      desc: "Continuous range of mountains running parallel to the Western Arabian Sea coast.",
      ncertFact: "Higher than Eastern Ghats; highest peak is Anamudi (2,695 m) in Kerala.",
      hint: "Runs continuously along the western edge of the Indian peninsula."
    },
    {
      id: "eastern_ghats",
      name: "Eastern Ghats",
      x: 285,
      y: 360,
      category: "physical",
      type: "Discontinuous Hills",
      desc: "Discontinuous hill ranges along the Bay of Bengal coast.",
      ncertFact: "Dissected and eroded by major peninsular rivers (Mahanadi, Godavari, Krishna, Kaveri).",
      hint: "Located along the eastern coast facing the Bay of Bengal."
    },
    {
      id: "delhi",
      name: "New Delhi (National Capital)",
      x: 200,
      y: 160,
      category: "political",
      type: "Capital City",
      desc: "Capital of India located in the northern plains on the Yamuna River.",
      ncertFact: "Seat of the Executive, Legislative, and Judicial branches of the Government of India.",
      hint: "Located in North India between Haryana and Uttar Pradesh."
    },
    {
      id: "kanyakumari",
      name: "Kanyakumari",
      x: 215,
      y: 470,
      category: "political",
      type: "Southernmost Tip",
      desc: "Coastal town at the southernmost tip of mainland India.",
      ncertFact: "Confluence point where the Arabian Sea, Bay of Bengal, and Indian Ocean meet.",
      hint: "Located at the extreme southern point of mainland India."
    },
    {
      id: "bay_of_bengal",
      name: "Bay of Bengal",
      x: 370,
      y: 360,
      category: "water",
      type: "Sea / Gulf",
      desc: "Water body forming the eastern boundary of the Indian Peninsula.",
      ncertFact: "Receives major rivers like Ganga, Brahmaputra, Mahanadi, Godavari, and Krishna.",
      hint: "Large blue sea located to the East of India."
    },
    {
      id: "arabian_sea",
      name: "Arabian Sea",
      x: 85,
      y: 360,
      category: "water",
      type: "Sea",
      desc: "Water body forming the western boundary of the Indian Peninsula.",
      ncertFact: "Contains the coral island group of Lakshadweep.",
      hint: "Large blue sea located to the West of India."
    },
    {
      id: "andaman",
      name: "Andaman & Nicobar Islands",
      x: 420,
      y: 410,
      category: "water",
      type: "Union Territory / Islands",
      desc: "Group of 572 islands in the Bay of Bengal.",
      ncertFact: "Indira Point at 6°45' N latitude is the southernmost point of the Indian Union.",
      hint: "Island chain located in the South-East in the Bay of Bengal."
    },
    {
      id: "lakshadweep",
      name: "Lakshadweep Islands",
      x: 125,
      y: 425,
      category: "water",
      type: "Union Territory / Coral Islands",
      desc: "Small coral island group located in the Arabian Sea.",
      ncertFact: "Capital is Kavaratti; covers a tiny land area of 32 sq km.",
      hint: "Small island dots in the South-West in the Arabian Sea."
    },
    {
      id: "pakistan",
      name: "Pakistan (Neighboring Country)",
      x: 80,
      y: 140,
      category: "neighbor",
      type: "Land Neighbor",
      desc: "Country sharing northwestern land border with India.",
      ncertFact: "Shares land border of ~3,323 km along Gujarat, Rajasthan, Punjab, Jammu & Kashmir, and Ladakh.",
      hint: "Located to the immediate West / North-West of India."
    },
    {
      id: "bangladesh",
      name: "Bangladesh (Neighboring Country)",
      x: 350,
      y: 220,
      category: "neighbor",
      type: "Land Neighbor",
      desc: "Country surrounded by India on three sides in the East.",
      ncertFact: "India shares its longest international land border (~4,096 km) with Bangladesh.",
      hint: "Located in Eastern India surrounded by West Bengal, Assam, Meghalaya, and Tripura."
    }
  ];

  const filteredPoints = mapPoints.filter((pt) => {
    if (categoryFilter === "all") return true;
    return pt.category === categoryFilter;
  });

  const quizQuestions = [
    mapPoints.find((p) => p.id === "river_ganga")!,
    mapPoints.find((p) => p.id === "tropic_cancer")!,
    mapPoints.find((p) => p.id === "river_indus")!,
    mapPoints.find((p) => p.id === "himalayas")!,
    mapPoints.find((p) => p.id === "river_brahmaputra")!,
    mapPoints.find((p) => p.id === "standard_meridian")!,
    mapPoints.find((p) => p.id === "river_narmada")!,
    mapPoints.find((p) => p.id === "thar_desert")!,
    mapPoints.find((p) => p.id === "river_godavari")!,
    mapPoints.find((p) => p.id === "delhi")!,
    mapPoints.find((p) => p.id === "river_kaveri")!,
    mapPoints.find((p) => p.id === "bay_of_bengal")!,
    mapPoints.find((p) => p.id === "western_ghats")!,
    mapPoints.find((p) => p.id === "river_mahanadi")!,
    mapPoints.find((p) => p.id === "kanyakumari")!,
    mapPoints.find((p) => p.id === "andaman")!
  ].filter(Boolean);

  const currentQuizTarget = quizQuestions[quizIndex % quizQuestions.length];

  const handlePointClick = (point: MapPoint) => {
    setSelectedPointId(point.id);

    if (mode === "quiz" && !quizAnswered) {
      if (point.id === currentQuizTarget.id) {
        setScore((prev) => prev + 10);
        setStreak((prev) => prev + 1);
        setUserFeedback({
          isCorrect: true,
          message: `🎉 Correct! You accurately pointed to ${point.name}!`
        });
      } else {
        setStreak(0);
        setUserFeedback({
          isCorrect: false,
          message: `❌ Not quite! You selected ${point.name}. Target was: ${currentQuizTarget.name}.`
        });
      }
      setQuizAnswered(true);
    }
  };

  const nextQuizQuestion = () => {
    setQuizIndex((prev) => prev + 1);
    setUserFeedback(null);
    setQuizAnswered(false);
  };

  const selectedPoint = mapPoints.find((p) => p.id === selectedPointId) || mapPoints[0];

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="map_pointing_lab">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs gap-3">
        <div>
          <span className="text-[10px] font-black uppercase text-teal-700 tracking-wider block">
            NCERT Social Science Map Work
          </span>
          <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
            <span>📍</span> Map Pointing & CBSE Identification Practice
          </h3>
          <p className="text-xs text-slate-500">
            Click on pins on the outline map to identify physical features, coordinates, capitals, water bodies & borders!
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => { setMode("explore"); setUserFeedback(null); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer border ${
              mode === "explore"
                ? "bg-teal-700 text-white border-teal-800 shadow-xs"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            🔍 Explore & Learn
          </button>
          <button
            onClick={() => { setMode("quiz"); setUserFeedback(null); setQuizAnswered(false); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer border ${
              mode === "quiz"
                ? "bg-amber-600 text-white border-amber-700 shadow-xs"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            🎯 Pointing Quiz Mode
          </button>
        </div>
      </div>

      {/* Quiz Banner if in Quiz Mode */}
      {mode === "quiz" && (
        <div className="bg-amber-500 text-white p-4 rounded-2xl border-2 border-amber-600 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="bg-amber-700 text-amber-100 font-mono text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                Question {quizIndex + 1} of {quizQuestions.length}
              </span>
              <span className="text-xs font-black text-amber-100">
                Score: {score} pts | Streak: 🔥 {streak}
              </span>
            </div>
            <h4 className="text-sm font-black tracking-wide text-white">
              🎯 Point to & click on: <span className="underline decoration-amber-200 underline-offset-4 text-amber-100">{currentQuizTarget.name}</span>
            </h4>
            <p className="text-[11px] text-amber-100 font-medium">
              💡 Hint: {currentQuizTarget.hint}
            </p>
          </div>

          {quizAnswered && (
            <button
              onClick={nextQuizQuestion}
              className="px-4 py-2 bg-white text-amber-900 font-black text-xs rounded-xl shadow-xs hover:bg-amber-50 transition cursor-pointer shrink-0"
            >
              Next Pointing Question ➔
            </button>
          )}
        </div>
      )}

      {/* Category Filter Pills (if in Explore Mode) */}
      {mode === "explore" && (
        <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-xl border border-slate-200">
          <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mr-1">
            Filter Map Points:
          </span>
          {[
            { id: "all", label: "All Locations" },
            { id: "river", label: "🏞️ Indian Rivers" },
            { id: "coordinate", label: "🌐 Lines & Coordinates" },
            { id: "physical", label: "⛰️ Physical Features" },
            { id: "political", label: "🏛️ Cities & Capitals" },
            { id: "water", label: "🌊 Oceans & Islands" },
            { id: "neighbor", label: "🗺️ Border Neighbors" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer border ${
                categoryFilter === cat.id
                  ? "bg-slate-800 text-white border-slate-900 shadow-xs"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Canvas + Detail Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Outline Map Canvas */}
        <div className="lg:col-span-7 bg-slate-900 p-4 rounded-2xl border-2 border-slate-800 shadow-lg relative overflow-hidden flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-2 px-2 text-white">
            <span className="text-[10px] font-mono font-bold text-slate-400">
              NCERT OUTLINE MAP OF INDIA (500 × 520)
            </span>
            <span className="text-[10px] font-mono text-teal-400 font-bold">
              Active Selection: {selectedPoint.name}
            </span>
          </div>

          <svg viewBox="0 0 500 520" className="w-full max-w-[480px] h-auto drop-shadow-md">
            <defs>
              {/* Radial Glow Gradient */}
              <radialGradient id="oceanGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#020617" />
              </radialGradient>
            </defs>

            {/* Background Water Area */}
            <rect x="0" y="0" width="500" height="520" fill="url(#oceanGlow)" rx="12" />

            {/* Graticule Grid Lines */}
            <line x1="50" y1="120" x2="450" y2="120" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="50" y1="220" x2="450" y2="220" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4,3" /> {/* Tropic of Cancer */}
            <line x1="50" y1="360" x2="450" y2="360" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />

            <line x1="150" y1="40" x2="150" y2="480" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="300" y1="40" x2="300" y2="480" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4,3" /> {/* Standard Meridian */}
            <line x1="420" y1="40" x2="420" y2="480" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />

            {/* Coordinate Labels */}
            <text x="55" y="215" fill="#fdba74" fontSize="10" fontWeight="bold" fontFamily="monospace">23°30' N (Tropic of Cancer)</text>
            <text x="305" y="55" fill="#a5b4fc" fontSize="10" fontWeight="bold" fontFamily="monospace">82°30' E (IST)</text>

            {/* India Mainland Vector Outline - Cartographically Accurate NCERT Map */}
            {/* Neighboring Country Outlines */}
            {/* Pakistan */}
            <path d="M 185 55 L 160 80 L 130 160 L 95 210 L 60 210 L 40 180 L 60 120 L 120 70 Z" fill="#0f172a" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
            <text x="75" y="140" fill="#64748b" fontSize="9" fontWeight="bold">PAKISTAN</text>

            {/* Nepal */}
            <path d="M 245 110 L 280 122 L 335 125 L 315 140 L 260 135 Z" fill="#0f172a" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
            <text x="280" y="132" fill="#64748b" fontSize="8" fontWeight="bold">NEPAL</text>

            {/* Bhutan */}
            <path d="M 345 125 L 370 130 L 365 140 L 342 138 Z" fill="#0f172a" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
            <text x="348" y="135" fill="#64748b" fontSize="7" fontWeight="bold">BHUTAN</text>

            {/* Bangladesh */}
            <path d="M 350 205 Q 365 190 380 195 L 385 220 L 355 228 Z" fill="#0f172a" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
            <text x="355" y="212" fill="#64748b" fontSize="8" fontWeight="bold">BANGLADESH</text>

            {/* China / Tibet */}
            <text x="310" y="80" fill="#64748b" fontSize="9" fontWeight="bold">CHINA (TIBET)</text>

            {/* India Mainland Main Vector Boundary */}
            <path
              d="M 215 45 
                 C 200 50, 185 55, 185 55 
                 C 170 70, 160 80, 160 80 
                 C 145 120, 130 160, 130 160 
                 C 110 180, 95 210, 95 210 
                 C 105 215, 115 220, 115 220 
                 C 110 235, 105 245, 105 245 
                 C 120 250, 140 252, 140 252 
                 C 145 270, 148 280, 148 280 
                 C 152 310, 160 330, 160 330 
                 C 168 370, 175 400, 175 400 
                 C 190 435, 215 470, 215 470 
                 C 225 450, 240 435, 240 435 
                 C 260 400, 285 360, 285 360 
                 C 305 320, 330 280, 330 280 
                 C 342 250, 350 225, 350 225 
                 C 355 205, 355 205, 355 205 
                 C 375 200, 395 210, 395 210 
                 C 410 190, 415 175, 415 175 
                 C 425 150, 425 125, 425 125 
                 C 400 120, 370 130, 370 130 
                 C 355 128, 335 125, 335 125 
                 C 310 123, 280 122, 280 122 
                 C 255 110, 245 110, 245 110 
                 C 230 80, 215 45, 215 45 Z"
              fill="#1e293b"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Himalayas Mountain Arc */}
            <path
              d="M 160 80 Q 260 115 415 125"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.85"
            />
            <text x="235" y="100" fill="#fef08a" fontSize="8" fontWeight="bold">HIMALAYAN MOUNTAINS</text>

            {/* Thar Desert Shaded Area */}
            <ellipse cx="130" cy="175" rx="20" ry="16" fill="#d97706" opacity="0.45" stroke="#f59e0b" strokeWidth="1" />
            <text x="112" y="178" fill="#fef3c7" fontSize="7" fontWeight="bold">Thar Desert</text>

            {/* Deccan Plateau Shaded Area */}
            <polygon points="170,290 270,290 215,410" fill="#059669" opacity="0.35" stroke="#10b981" strokeWidth="1" />
            <text x="190" y="340" fill="#a7f3d0" fontSize="8" fontWeight="bold">Deccan Plateau</text>

            {/* Western Ghats & Eastern Ghats */}
            <path d="M 152 280 C 158 330, 168 380, 195 455" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
            <path d="M 320 280 C 300 320, 275 360, 235 440" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="5,3" strokeLinecap="round" />

            {/* Indian Major Rivers SVG Vector Paths */}
            {/* River Indus */}
            <path d="M 330 80 L 210 60 Q 160 70 135 75 T 90 110" fill="none" stroke={selectedPointId === "river_indus" ? "#38bdf8" : "#0284c7"} strokeWidth={selectedPointId === "river_indus" ? "3.5" : "2"} opacity="0.85" />

            {/* River Ganga */}
            <path d="M 235 110 Q 250 140 270 165 T 310 185 T 350 225" fill="none" stroke={selectedPointId === "river_ganga" ? "#38bdf8" : "#0284c7"} strokeWidth={selectedPointId === "river_ganga" ? "3.5" : "2.5"} opacity="0.9" />

            {/* River Yamuna */}
            <path d="M 230 115 Q 205 145 220 155 T 270 165" fill="none" stroke={selectedPointId === "river_yamuna" ? "#38bdf8" : "#38bdf8"} strokeWidth={selectedPointId === "river_yamuna" ? "3" : "1.8"} strokeDasharray="3,2" opacity="0.8" />

            {/* River Brahmaputra */}
            <path d="M 310 110 L 400 120 Q 420 125 415 140 T 380 150 T 355 210" fill="none" stroke={selectedPointId === "river_brahmaputra" ? "#38bdf8" : "#0284c7"} strokeWidth={selectedPointId === "river_brahmaputra" ? "3.5" : "2.5"} opacity="0.9" />

            {/* River Narmada */}
            <path d="M 255 240 Q 210 242 190 245 T 142 250" fill="none" stroke={selectedPointId === "river_narmada" ? "#38bdf8" : "#06b6d4"} strokeWidth={selectedPointId === "river_narmada" ? "3.5" : "2.2"} opacity="0.85" />

            {/* River Tapi */}
            <path d="M 242 260 Q 210 262 185 264 T 143 265" fill="none" stroke={selectedPointId === "river_tapi" ? "#38bdf8" : "#06b6d4"} strokeWidth={selectedPointId === "river_tapi" ? "3" : "1.8"} opacity="0.8" />

            {/* River Mahanadi */}
            <path d="M 265 255 Q 295 265 310 270 T 330 275" fill="none" stroke={selectedPointId === "river_mahanadi" ? "#38bdf8" : "#0284c7"} strokeWidth={selectedPointId === "river_mahanadi" ? "3.5" : "2"} opacity="0.85" />

            {/* River Godavari */}
            <path d="M 165 300 Q 210 310 240 315 T 285 335" fill="none" stroke={selectedPointId === "river_godavari" ? "#38bdf8" : "#0284c7"} strokeWidth={selectedPointId === "river_godavari" ? "3.5" : "2.5"} opacity="0.9" />

            {/* River Krishna */}
            <path d="M 170 345 Q 200 350 230 355 T 275 370" fill="none" stroke={selectedPointId === "river_krishna" ? "#38bdf8" : "#0284c7"} strokeWidth={selectedPointId === "river_krishna" ? "3.5" : "2.5"} opacity="0.9" />

            {/* River Kaveri */}
            <path d="M 180 420 Q 195 422 210 428 T 235 435" fill="none" stroke={selectedPointId === "river_kaveri" ? "#38bdf8" : "#0284c7"} strokeWidth={selectedPointId === "river_kaveri" ? "3.5" : "2.2"} opacity="0.9" />

            {/* Lakshadweep Island Dots */}
            <g fill="#38bdf8">
              <circle cx="120" cy="420" r="3" />
              <circle cx="125" cy="430" r="2.5" />
              <circle cx="130" cy="425" r="3" />
            </g>

            {/* Andaman & Nicobar Island Dots */}
            <g fill="#38bdf8">
              <circle cx="415" cy="390" r="3.5" />
              <circle cx="418" cy="405" r="3" />
              <circle cx="422" cy="420" r="3.5" />
              <circle cx="425" cy="435" r="2.5" />
            </g>

            {/* Sri Lanka Outline */}
            <ellipse cx="240" cy="495" rx="8" ry="12" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Render Interactive Map Pins */}
            {filteredPoints.map((pt) => {
              const isSelected = selectedPointId === pt.id;
              const isQuizTarget = mode === "quiz" && currentQuizTarget.id === pt.id;

              return (
                <g
                  key={pt.id}
                  onClick={() => handlePointClick(pt)}
                  className="cursor-pointer group"
                >
                  {/* Pulse Circle for Selected Point */}
                  {isSelected && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="16"
                      fill={mode === "quiz" ? "#f59e0b" : "#0284c7"}
                      opacity="0.35"
                      className="animate-ping"
                    />
                  )}

                  {/* Outer Ring */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? "10" : "7"}
                    fill={
                      pt.category === "coordinate"
                        ? "#f97316"
                        : pt.category === "river"
                        ? "#0284c7"
                        : pt.category === "physical"
                        ? "#eab308"
                        : pt.category === "political"
                        ? "#ef4444"
                        : pt.category === "water"
                        ? "#06b6d4"
                        : "#a855f7"
                    }
                    stroke="#ffffff"
                    strokeWidth={isSelected ? "2.5" : "1.5"}
                    className="transition-all duration-200 group-hover:scale-125"
                  />

                  {/* Center Dot */}
                  <circle cx={pt.x} cy={pt.y} r="3" fill="#ffffff" />

                  {/* Text Label on Map */}
                  <text
                    x={pt.x + 12}
                    y={pt.y + 4}
                    fill={isSelected ? "#ffffff" : "#cbd5e1"}
                    fontSize={isSelected ? "11" : "9"}
                    fontWeight={isSelected ? "900" : "600"}
                    className="drop-shadow-sm transition-all font-sans pointer-events-none"
                  >
                    {pt.name.split(" ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Sidebar: Details or Quiz Result */}
        <div className="lg:col-span-5 space-y-4">
          {/* Feedback Card if Quiz Answered */}
          {userFeedback && (
            <div
              className={`p-4 rounded-2xl border-2 shadow-xs transition-all ${
                userFeedback.isCorrect
                  ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                  : "bg-rose-50 border-rose-300 text-rose-950"
              }`}
            >
              <div className="flex items-center gap-2 font-black text-sm">
                <span>{userFeedback.isCorrect ? "✅" : "❌"}</span>
                <span>{userFeedback.message}</span>
              </div>
            </div>
          )}

          {/* Selected Point Detail Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 block">
                  Map Pointing Inspection
                </span>
                <h4 className="font-extrabold text-base text-slate-900">
                  {selectedPoint.name}
                </h4>
              </div>
              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase font-mono border ${
                  selectedPoint.category === "coordinate"
                    ? "bg-orange-50 text-orange-800 border-orange-200"
                    : selectedPoint.category === "river"
                    ? "bg-cyan-50 text-cyan-900 border-cyan-200 font-black"
                    : selectedPoint.category === "physical"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : selectedPoint.category === "political"
                    ? "bg-rose-50 text-rose-800 border-rose-200"
                    : selectedPoint.category === "water"
                    ? "bg-sky-50 text-sky-800 border-sky-200"
                    : "bg-purple-50 text-purple-800 border-purple-200"
                }`}
              >
                {selectedPoint.type}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-0.5">
                  Geographic Description:
                </span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {selectedPoint.desc}
                </p>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 space-y-1">
                <span className="font-black text-teal-950 text-[10px] uppercase block">
                  💡 NCERT Exam Significance Fact:
                </span>
                <p className="text-teal-900 leading-relaxed font-medium">
                  {selectedPoint.ncertFact}
                </p>
              </div>
            </div>
          </div>

          {/* List of All Map Points for Quick Direct Selection */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
              Quick Selection List ({filteredPoints.length} Points):
            </span>
            <div className="max-h-[220px] overflow-y-auto space-y-1.5 pr-1">
              {filteredPoints.map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => handlePointClick(pt)}
                  className={`w-full text-left p-2 rounded-xl text-xs font-bold transition flex items-center justify-between border cursor-pointer ${
                    selectedPointId === pt.id
                      ? "bg-teal-700 text-white border-teal-800 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span className="truncate">{pt.name}</span>
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                      selectedPointId === pt.id
                        ? "bg-teal-900 text-teal-100"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {pt.type}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Grade6MapsVisualLab() {
  const [mapType, setMapType] = useState<"physical" | "political" | "thematic">("physical");
  const [scaleCm, setScaleCm] = useState<number>(4);
  const [scalePreset, setScalePreset] = useState<number>(50);
  const [activeDirection, setActiveDirection] = useState<string>("N");
  const [selectedSymbol, setSelectedSymbol] = useState<string>("railway");

  const directionsMap: Record<string, { label: string; angle: string; desc: string; example: string }> = {
    N: { label: "North (N)", angle: "0°", desc: "Cardinal Direction pointing towards the North Pole.", example: "Himalayas & Kashmir lie in the NORTH of India." },
    NE: { label: "North-East (NE)", angle: "45°", desc: "Intermediate Direction between North & East.", example: "Assam, Sikkim & Seven Sister states are in the NORTH-EAST." },
    E: { label: "East (E)", angle: "90°", desc: "Cardinal Direction where the Sun rises.", example: "Bay of Bengal and Odisha lie in the EAST of India." },
    SE: { label: "South-East (SE)", angle: "135°", desc: "Intermediate Direction between South & East.", example: "Andaman & Nicobar Islands lie in the SOUTH-EAST." },
    S: { label: "South (S)", angle: "180°", desc: "Cardinal Direction pointing towards Southern Ocean.", example: "Indian Ocean & Kanyakumari lie in the SOUTH of India." },
    SW: { label: "South-West (SW)", angle: "225°", desc: "Intermediate Direction between South & West.", example: "Lakshadweep Islands & Kerala lie in the SOUTH-WEST." },
    W: { label: "West (W)", angle: "270°", desc: "Cardinal Direction where the Sun sets.", example: "Arabian Sea & Gujarat lie in the WEST of India." },
    NW: { label: "North-West (NW)", angle: "315°", desc: "Intermediate Direction between North & West.", example: "Thar Desert & Punjab lie in the NORTH-WEST." }
  };

  const mapSymbolsList = [
    { id: "railway", name: "Broad Gauge Railway", symbol: "🛤️ [==|==|==]", desc: "Parallel black tracks with crossbars representing train railways." },
    { id: "road_metalled", name: "Metalled Road (Pucca)", symbol: "🛣️ ========", desc: "Two parallel solid red or black lines representing tar/paved roads." },
    { id: "road_unmetalled", name: "Unmetalled Road (Kutcha)", symbol: "🛣️ - - - - - -", desc: "Parallel dashed lines representing dirt or mud village roads." },
    { id: "boundary_int", name: "International Boundary", symbol: "🛑 — . — . —", desc: "Thick dash and dot lines marking country borders." },
    { id: "river", name: "River & Stream", symbol: "🌊 ~~~~~~~~", desc: "Blue winding water line flowing towards seas or lakes." },
    { id: "temple", name: "Temple", symbol: "🛕 Temple", desc: "Red dome with flag indicating religious temple site." },
    { id: "post_office", name: "Post Office (P.O.)", symbol: "📮 P.O.", desc: "Lettering P.O. marking government postal centers." },
    { id: "police_station", name: "Police Station (P.S.)", symbol: "👮 P.S.", desc: "Lettering P.S. marking local police station office." },
    { id: "settlement", name: "Human Settlement", symbol: "🏠 🏠 🏠 🏠", desc: "Grouped red square blocks representing town/village housing." },
    { id: "forest", name: "Forest / Vegetation", symbol: "🌲 🌳 🌲 🌳", desc: "Green tree icons marking protected reserve or tropical forests." }
  ];

  const actualKm = scaleCm * scalePreset;

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="grade6_maps_lab">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs gap-3">
        <div>
          <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
            <span>🗺️</span> NCERT Grade 6 Geography Lab: Maps & Map Reading
          </h3>
          <p className="text-xs text-slate-500">
            Master Physical, Political & Thematic Maps, Map Scale calculations, Compass Rose & Conventional Symbols!
          </p>
        </div>
        <span className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full uppercase font-mono shrink-0">
          Class 6 Geography Ch 4
        </span>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-600">
            1. Types of Maps (Physical vs. Political vs. Thematic)
          </h4>
          <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
            Select a map view below
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { id: "physical", label: "⛰️ Physical Map", desc: "Natural landforms: Mountains, Rivers & Plains" },
            { id: "political", label: "🏛️ Political Map", desc: "Boundaries: States, Capitals, Cities & Nations" },
            { id: "thematic", label: "🌧️ Thematic Map", desc: "Specific themes: Rainfall, Forests & Highways" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setMapType(item.id as any)}
              className={`p-3 rounded-xl border transition cursor-pointer text-left ${
                mapType === item.id
                  ? "bg-sky-600 border-sky-700 text-white shadow-md font-bold"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-sky-50 hover:border-sky-200"
              }`}
            >
              <span className="block text-xs font-black">{item.label}</span>
              <span className={`block text-[10px] mt-0.5 ${mapType === item.id ? "text-sky-100" : "text-slate-500"}`}>
                {item.desc}
              </span>
            </button>
          ))}
        </div>

        <div className="p-5 rounded-2xl border-2 border-slate-300 relative overflow-hidden transition-all duration-300 min-h-[220px] bg-slate-900 text-white flex flex-col justify-between">
          {mapType === "physical" && (
            <div className="space-y-3 bg-emerald-950/80 p-4 rounded-xl border border-emerald-700/60">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-amber-300 uppercase tracking-widest">
                  🏔️ PHYSICAL MAP OF INDIA & CONTINENTS
                </span>
                <span className="text-[10px] font-bold bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded-md">
                  Relief & Elevation
                </span>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed font-medium">
                Shows natural physical features of the Earth: <b>Mountains</b> (brown), <b>Plateaus</b> (yellow), <b>Plains & Valleys</b> (green), and <b>Rivers & Oceans</b> (blue).
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[10px] font-mono">
                <div className="bg-amber-900/60 p-2 rounded border border-amber-600 text-amber-200">
                  🤎 Mountains: Himalayas
                </div>
                <div className="bg-yellow-900/60 p-2 rounded border border-yellow-600 text-yellow-200">
                  💛 Plateau: Deccan Plateau
                </div>
                <div className="bg-emerald-900/60 p-2 rounded border border-emerald-500 text-emerald-200">
                  💚 Plains: Northern Gangetic Plain
                </div>
                <div className="bg-blue-900/60 p-2 rounded border border-blue-500 text-blue-200">
                  💙 Oceans: Bay of Bengal & Arabian Sea
                </div>
              </div>
            </div>
          )}

          {mapType === "political" && (
            <div className="space-y-3 bg-indigo-950/80 p-4 rounded-xl border border-indigo-700/60">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-sky-300 uppercase tracking-widest">
                  🏛️ POLITICAL MAP OF INDIA
                </span>
                <span className="text-[10px] font-bold bg-indigo-800 text-indigo-100 px-2 py-0.5 rounded-md">
                  Administrative Boundaries
                </span>
              </div>
              <p className="text-xs text-indigo-100 leading-relaxed font-medium">
                Shows political divisions, country borders, 28 States, 8 Union Territories, state capitals (like New Delhi, Amaravati, Hyderabad, Bengaluru), towns & villages.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[10px] font-mono">
                <div className="bg-red-950 p-2 rounded border border-red-500 text-red-200">
                  🛑 International Borders
                </div>
                <div className="bg-indigo-900 p-2 rounded border border-indigo-400 text-indigo-200">
                  📍 State Capital (New Delhi)
                </div>
                <div className="bg-slate-800 p-2 rounded border border-slate-500 text-slate-200">
                  🏙️ District Headquarters
                </div>
              </div>
            </div>
          )}

          {mapType === "thematic" && (
            <div className="space-y-3 bg-cyan-950/80 p-4 rounded-xl border border-cyan-700/60">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-cyan-300 uppercase tracking-widest">
                  🌧️ THEMATIC MAP: RAINFALL & FORESTS
                </span>
                <span className="text-[10px] font-bold bg-cyan-800 text-cyan-100 px-2 py-0.5 rounded-md">
                  Specific Information
                </span>
              </div>
              <p className="text-xs text-cyan-100 leading-relaxed font-medium">
                Focuses on specific themes such as rainfall distribution, road networks, railways, mineral distribution, and forest density.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[10px] font-mono">
                <div className="bg-blue-900 p-2 rounded border border-blue-400 text-blue-200">
                  🌧️ High Rainfall (&gt;200 cm)
                </div>
                <div className="bg-emerald-900 p-2 rounded border border-emerald-400 text-emerald-200">
                  🌲 Tropical Evergreen Forests
                </div>
                <div className="bg-orange-900 p-2 rounded border border-orange-400 text-orange-200">
                  🛣️ National Highway 44
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-600">
              2. Map Scale Calculator (Distance)
            </h4>
            <span className="text-[10px] font-mono font-bold bg-sky-100 text-sky-900 px-2.5 py-0.5 rounded-full">
              Ratio = Map : Ground
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Select Scale Setting:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 10, label: "1 cm = 10 km" },
                  { value: 50, label: "1 cm = 50 km" },
                  { value: 250, label: "1 cm = 250 km" }
                ].map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setScalePreset(s.value)}
                    className={`p-2 rounded-xl border text-[11px] font-extrabold transition cursor-pointer ${
                      scalePreset === s.value
                        ? "bg-sky-600 text-white border-sky-700"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between font-extrabold text-slate-800 mb-1">
                <span>Measured Distance on Map:</span>
                <span className="text-sky-600 font-mono text-sm">{scaleCm} cm</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                value={scaleCm}
                onChange={(e) => setScaleCm(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            <div className="bg-sky-50 border-2 border-sky-200 rounded-xl p-3.5 space-y-2">
              <span className="text-[10px] font-black uppercase text-sky-800">Actual Ground Distance Calculation</span>
              <div className="text-sm font-black text-sky-950 font-mono">
                {scaleCm} cm × {scalePreset} km/cm = <span className="text-emerald-600 font-extrabold text-base">{actualKm} km</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                This means a distance of {scaleCm} cm measured with a ruler on the map represents an actual real-world distance of <b>{actualKm} kilometers</b> on the ground!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-600">
              3. Compass Rose & Directions
            </h4>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
              4 Cardinal + 4 Intermediate
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {Object.keys(directionsMap).map((dirKey) => (
              <button
                key={dirKey}
                onClick={() => setActiveDirection(dirKey)}
                className={`p-2 rounded-xl border text-xs font-black transition cursor-pointer ${
                  activeDirection === dirKey
                    ? "bg-amber-500 border-amber-600 text-white shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50"
                }`}
              >
                {dirKey}
              </button>
            ))}
          </div>

          {directionsMap[activeDirection] && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-3.5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-amber-950">
                  🧭 Direction: {directionsMap[activeDirection].label}
                </span>
                <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                  Angle: {directionsMap[activeDirection].angle}
                </span>
              </div>
              <p className="text-xs text-slate-700">{directionsMap[activeDirection].desc}</p>
              <div className="bg-white p-2 rounded-lg border border-amber-200 text-[11px] text-amber-900 font-bold">
                💡 Geographic Example: {directionsMap[activeDirection].example}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-600">
            4. Conventional Map Symbols & Signs (Cartographic Universal Signs)
          </h4>
          <span className="text-[10px] font-bold text-slate-500">Click a symbol to inspect</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {mapSymbolsList.map((sym) => (
            <button
              key={sym.id}
              onClick={() => setSelectedSymbol(sym.id)}
              className={`p-3 rounded-xl border transition cursor-pointer text-left space-y-1 ${
                selectedSymbol === sym.id
                  ? "bg-indigo-600 border-indigo-700 text-white shadow-xs font-bold"
                  : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-indigo-50"
              }`}
            >
              <div className="text-sm font-black">{sym.symbol}</div>
              <span className="block text-xs font-extrabold truncate">{sym.name}</span>
            </button>
          ))}
        </div>

        {mapSymbolsList.find((s) => s.id === selectedSymbol) && (
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-3.5 space-y-1 text-xs">
            <span className="text-[10px] font-black uppercase text-indigo-800">
              Symbol Description & Standard Usage
            </span>
            <h5 className="font-extrabold text-indigo-950 text-sm">
              {mapSymbolsList.find((s) => s.id === selectedSymbol)?.name} ({mapSymbolsList.find((s) => s.id === selectedSymbol)?.symbol})
            </h5>
            <p className="text-slate-700 leading-relaxed font-medium">
              {mapSymbolsList.find((s) => s.id === selectedSymbol)?.desc}
            </p>
          </div>
        )}
      </div>

      {/* Section 5: Interactive Map Pointing & CBSE Identification Practice */}
      <div className="pt-2">
        <InteractiveMapPointingLab defaultGrade={6} />
      </div>
    </div>
  );
}

export function Grade9MapsVisualLab() {
  const [activeTab, setActiveTab] = useState<"extent" | "tropic" | "meridian" | "neighbors" | "pointing">("extent");
  const [selectedState, setSelectedState] = useState<string>("MP");

  const tropicStates = [
    { code: "GJ", name: "Gujarat", capital: "Gandhinagar", fact: "Western entry state for Tropic of Cancer." },
    { code: "RJ", name: "Rajasthan", capital: "Jaipur", fact: "Passes through southern districts of Banswara & Dungarpur." },
    { code: "MP", name: "Madhya Pradesh", capital: "Bhopal", fact: "Passes through 14 districts in Central India." },
    { code: "CG", name: "Chhattisgarh", capital: "Raipur", fact: "Crosses Koriya, Surajpur & Balrampur districts." },
    { code: "JH", name: "Jharkhand", capital: "Ranchi", fact: "Ranchi is the only state capital located directly near Tropic of Cancer!" },
    { code: "WB", name: "West Bengal", capital: "Kolkata", fact: "Passes through Purulia, Bankura, Bardhaman & Nadia." },
    { code: "TR", name: "Tripura", capital: "Agartala", fact: "Passes through Udaipur in Tripura." },
    { code: "MZ", name: "Mizoram", capital: "Aizawl", fact: "Easternmost state crossed by Tropic of Cancer." }
  ];

  const neighborsList = [
    { country: "Bangladesh 🇧🇩", borderKm: "4,096 km", direction: "East", fact: "Shares India's longest international land border." },
    { country: "China (Tibet) 🇨🇳", borderKm: "3,488 km", direction: "North", fact: "Divided by McMahon Line in North-East." },
    { country: "Pakistan 🇵🇰", borderKm: "3,323 km", direction: "North-West", fact: "Divided by Radcliffe Line." },
    { country: "Nepal 🇳🇵", borderKm: "1,751 km", direction: "North", fact: "Open international border with 5 Indian states." },
    { country: "Myanmar 🇲🇲", borderKm: "1,643 km", direction: "East", fact: "Shares borders with Arunachal, Nagaland, Manipur, Mizoram." },
    { country: "Bhutan 🇧🇹", borderKm: "699 km", direction: "North", fact: "Peaceful Himalayan neighboring nation." },
    { country: "Afghanistan 🇦🇫", borderKm: "106 km", direction: "North-West", fact: "Shortest land border in Wakhan corridor." },
    { country: "Sri Lanka 🇱🇰", borderKm: "Maritime Neighbor", direction: "South", fact: "Separated by Palk Strait and Gulf of Mannar." }
  ];

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="grade9_maps_lab">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs gap-3">
        <div>
          <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
            <span>🗺️</span> NCERT Grade 9 Geography Lab: India - Size, Location & Map Skills
          </h3>
          <p className="text-xs text-slate-500">
            Explore India's Latitudinal/Longitudinal Extent, Tropic of Cancer, Standard Meridian (82°30'E IST) & Neighbors!
          </p>
        </div>
        <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase font-mono shrink-0">
          Class 9 Social Science Ch 1
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-200 p-1.5 rounded-2xl">
        {[
          { id: "extent", label: "🌐 Extent & Coordinates" },
          { id: "tropic", label: "☀️ Tropic of Cancer (23°30'N)" },
          { id: "meridian", label: "⏰ Standard Meridian (IST)" },
          { id: "neighbors", label: "🗺️ Land Borders & Neighbors" },
          { id: "pointing", label: "📍 Map Pointing Practice" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-2 px-3 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === tab.id
                ? "bg-teal-700 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "extent" && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-teal-900">
                1. Geographical Coordinates of India
              </h4>
              <span className="text-[10px] font-bold bg-teal-100 text-teal-900 px-2.5 py-0.5 rounded-full">
                Entirely in Northern & Eastern Hemispheres
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-4 space-y-2">
                <span className="text-xs font-black text-teal-950 uppercase">Latitudinal Span (North - South)</span>
                <div className="text-base font-extrabold text-teal-900 font-mono">
                  8°4' N to 37°6' N Latitude
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  • Northernmost Point: <b>Indira Col (37°6' N)</b> in Ladakh.<br />
                  • Southernmost Mainland Point: <b>Kanyakumari (8°4' N)</b> in Tamil Nadu.<br />
                  • Total N-S Distance: <b className="text-teal-800 font-mono">3,214 kilometers</b>.
                </p>
              </div>

              <div className="bg-sky-50 border-2 border-sky-200 rounded-xl p-4 space-y-2">
                <span className="text-xs font-black text-sky-950 uppercase">Longitudinal Span (West - East)</span>
                <div className="text-base font-extrabold text-sky-900 font-mono">
                  68°7' E to 97°25' E Longitude
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  • Westernmost Point: <b>Guhar Moti / Rann of Kutch (68°7' E)</b> in Gujarat.<br />
                  • Easternmost Point: <b>Kibithu (97°25' E)</b> in Arunachal Pradesh.<br />
                  • Total E-W Distance: <b className="text-sky-800 font-mono">2,933 kilometers</b>.
                </p>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium space-y-1">
              <span className="font-extrabold block">💡 Size & World Ranking Fact:</span>
              <p>
                India has a total land area of <b>3.28 Million square km</b> (2.4% of total world geographical area), making India the <b>7th largest country in the world</b> after Russia, Canada, USA, China, Brazil, and Australia!
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "tropic" && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-900">
                2. Tropic of Cancer (23°30' N Latitude)
              </h4>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                Passes through 8 States
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              The Tropic of Cancer (23°30' N) divides India into almost two equal thermal zones: Tropical zone in the south and Subtropical zone in the north.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {tropicStates.map((st) => (
                <button
                  key={st.code}
                  onClick={() => setSelectedState(st.code)}
                  className={`p-3 rounded-xl border transition cursor-pointer text-left ${
                    selectedState === st.code
                      ? "bg-amber-600 border-amber-700 text-white font-bold shadow-xs"
                      : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50"
                  }`}
                >
                  <span className="text-xs font-black block">{st.name}</span>
                  <span className={`text-[10px] block ${selectedState === st.code ? "text-amber-100" : "text-slate-500"}`}>
                    Capital: {st.capital}
                  </span>
                </button>
              ))}
            </div>

            {tropicStates.find((s) => s.code === selectedState) && (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 text-xs space-y-1">
                <span className="text-[10px] font-black uppercase text-amber-800">State Map Detail</span>
                <h5 className="font-extrabold text-amber-950 text-sm">
                  {tropicStates.find((s) => s.code === selectedState)?.name} (Capital: {tropicStates.find((s) => s.code === selectedState)?.capital})
                </h5>
                <p className="text-slate-700 font-medium">
                  {tropicStates.find((s) => s.code === selectedState)?.fact}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "meridian" && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-indigo-900">
                3. Standard Meridian of India (82°30' E) & Indian Standard Time (IST)
              </h4>
              <span className="text-[10px] font-mono font-bold bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded-full">
                UTC +5:30
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4 space-y-2 text-xs">
                <span className="font-black text-indigo-950 block text-sm">Why 82°30' E is chosen?</span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  The longitudinal extent of India is ~30° (from 68°7'E to 97°25'E). Since Earth rotates 15° per hour, a 30° span causes a <b>2-hour time gap</b> between Gujarat in the West and Arunachal Pradesh in the East!
                </p>
                <div className="bg-white p-2.5 rounded-lg border border-indigo-200 font-mono text-indigo-950 font-bold">
                  30° Longitude Difference × 4 min/degree = 120 minutes = 2 Hours!
                </div>
              </div>

              <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-4 space-y-2 text-xs">
                <span className="font-black text-teal-950 block text-sm">Location & Standard Time Line</span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  To avoid confusion of local times, <b>82°30' E</b> passing through <b>Mirzapur (Uttar Pradesh)</b> was selected as the Standard Meridian for the whole country.
                </p>
                <div className="bg-white p-2.5 rounded-lg border border-teal-200 font-bold text-teal-950">
                  📍 States crossed by 82°30'E: UP, MP, Chhattisgarh, Odisha, Andhra Pradesh.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "neighbors" && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                4. India's Land Boundaries & Neighboring Countries
              </h4>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full">
                Land Border: ~15,200 km
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {neighborsList.map((nb, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1 shadow-2xs hover:border-teal-300 transition">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-xs text-slate-900">{nb.country}</span>
                    <span className="text-[9px] font-bold bg-teal-100 text-teal-900 px-1.5 py-0.5 rounded font-mono">
                      {nb.direction}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-teal-700 block">
                    Border: {nb.borderKm}
                  </span>
                  <p className="text-[11px] text-slate-600 leading-snug font-medium">
                    {nb.fact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "pointing" && (
        <div className="space-y-4 animate-fade-in">
          <InteractiveMapPointingLab defaultGrade={9} />
        </div>
      )}
    </div>
  );
}
