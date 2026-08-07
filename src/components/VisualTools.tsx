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

  if (chapterId?.startsWith("g6_soc_") || chapterId?.startsWith("g1_evs_") || chapterId?.startsWith("g9_french_") || chapterId?.startsWith("g9_physical_") || chapterId?.startsWith("g9_democracy_") || chapterId?.startsWith("g9_maps_")) {
    return <SocialScienceVisualLab chapterId={chapterId} />;
  }

  if (chapterId?.startsWith("g9_chem_")) {
    return <ChemistryVisualLab chapterId={chapterId} />;
  }

  if (chapterId?.startsWith("g9_phys_") || chapterId?.startsWith("g9_physics_") || chapterId?.startsWith("g6_phys_")) {
    return <PhysicsVisualLab chapterId={chapterId} />;
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
  
  // 4. Perimeter/Area & Circumference State
  const [rectLength, setRectLength] = useState<number>(8);
  const [rectWidth, setRectWidth] = useState<number>(5);
  const [mensurationShapeMode, setMensurationShapeMode] = useState<"rectangle" | "circle">("circle");
  const [circleRadius, setCircleRadius] = useState<number>(7);
  const [wheelRevolutions, setWheelRevolutions] = useState<number>(100);
  const [circleType, setCircleType] = useState<"full" | "semicircle" | "quadrant">("full");

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

        {/* PERIMETER & CIRCUMFERENCE EXPLORER */}
        {activeTab === "perimeter" && (
          <div className="space-y-4 h-full" id="perimeter_tool_container">
            {/* Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-violet-50/80 border border-violet-200 rounded-xl p-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setMensurationShapeMode("circle"); awardPoints(2); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                    mensurationShapeMode === "circle"
                      ? "bg-violet-700 text-white shadow-sm"
                      : "bg-white text-violet-900 hover:bg-violet-100 border border-violet-200"
                  }`}
                >
                  <span>⭕ Circle & Circumference Studio</span>
                </button>
                <button
                  onClick={() => { setMensurationShapeMode("rectangle"); awardPoints(2); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                    mensurationShapeMode === "rectangle"
                      ? "bg-violet-700 text-white shadow-sm"
                      : "bg-white text-violet-900 hover:bg-violet-100 border border-violet-200"
                  }`}
                >
                  <span>📏 Rectangle & Square Lab</span>
                </button>
              </div>

              {mensurationShapeMode === "circle" && (
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-violet-200">
                  <span className="text-[10px] font-bold text-violet-900 px-1.5">Type:</span>
                  {(["full", "semicircle", "quadrant"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => { setCircleType(t); awardPoints(2); }}
                      className={`px-2 py-1 rounded text-[11px] font-extrabold capitalize transition cursor-pointer ${
                        circleType === t
                          ? "bg-amber-500 text-slate-950 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {t === "full" ? "Full Circle" : t === "semicircle" ? "Semicircle (½)" : "Quadrant (¼)"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {mensurationShapeMode === "circle" ? (
              <div className="flex flex-col lg:flex-row gap-6">
                {/* SVG Visual Canvas */}
                <div className="flex-1 flex flex-col justify-center items-center bg-violet-50/20 border border-violet-100 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[11px] font-black text-violet-800 uppercase tracking-widest bg-violet-100 px-3 py-1 rounded-full">
                      ⭕ Interactive Circle Boundary & Radius Simulator
                    </span>
                    <span className="text-xs font-mono font-black text-violet-900 bg-white border border-violet-200 px-2.5 py-1 rounded-lg shadow-2xs">
                      r = {circleRadius} cm | d = {2 * circleRadius} cm
                    </span>
                  </div>

                  {/* SVG Drawing */}
                  <div className="relative border-2 border-dashed border-violet-300 bg-white rounded-2xl p-4 w-full max-w-md h-72 flex items-center justify-center overflow-hidden shadow-xs">
                    <svg className="w-full h-full max-w-[260px] max-h-[260px]" viewBox="0 0 240 240">
                      {/* Full Circle */}
                      {circleType === "full" && (
                        <g>
                          {/* Interior Fill */}
                          <circle cx="120" cy="120" r={Math.min(95, 25 + circleRadius * 2.2)} className="fill-violet-100/70" />
                          {/* Circumference Outer Line */}
                          <circle cx="120" cy="120" r={Math.min(95, 25 + circleRadius * 2.2)} className="stroke-violet-600 stroke-[4] fill-none" />
                          {/* Center Point */}
                          <circle cx="120" cy="120" r="4.5" className="fill-violet-950" />
                          <text x="110" y="115" className="text-xs font-black fill-violet-950">O</text>
                          {/* Diameter Line */}
                          <line
                            x1={120 - Math.min(95, 25 + circleRadius * 2.2)}
                            y1="120"
                            x2={120 + Math.min(95, 25 + circleRadius * 2.2)}
                            y2="120"
                            className="stroke-amber-500 stroke-2 stroke-dasharray-[4,3]"
                          />
                          {/* Radius Line */}
                          <line x1="120" y1="120" x2={120 + Math.min(95, 25 + circleRadius * 2.2)} y2="120" className="stroke-rose-600 stroke-[3.5]" />
                          <text x={120 + Math.min(95, 25 + circleRadius * 2.2) / 2} y="112" className="text-[11px] font-black fill-rose-900" textAnchor="middle">
                            r = {circleRadius} cm
                          </text>
                          {/* Circumference Label Arc */}
                          <text x="120" y="25" className="text-[11px] font-black fill-violet-900" textAnchor="middle">
                            Circumference C = 2 × (22/7) × {circleRadius} = {((2 * 22 * circleRadius) / 7).toFixed(1)} cm
                          </text>
                        </g>
                      )}

                      {/* Semicircle */}
                      {circleType === "semicircle" && (
                        <g>
                          <path
                            d={`M ${120 - Math.min(95, 25 + circleRadius * 2.2)} 150 A ${Math.min(95, 25 + circleRadius * 2.2)} ${Math.min(95, 25 + circleRadius * 2.2)} 0 0 1 ${120 + Math.min(95, 25 + circleRadius * 2.2)} 150 Z`}
                            className="fill-amber-100/80 stroke-violet-600 stroke-[4]"
                          />
                          <circle cx="120" cy="150" r="4.5" className="fill-violet-950" />
                          <text x="115" y="170" className="text-xs font-black fill-violet-950">O (Center)</text>
                          <text x="120" y="45" className="text-[11px] font-black fill-violet-900" textAnchor="middle">
                            Curved Arc = πr = {((22 * circleRadius) / 7).toFixed(1)} cm
                          </text>
                          <text x="120" y="142" className="text-[10px] font-black fill-amber-900" textAnchor="middle">
                            Diameter = 2r = {2 * circleRadius} cm
                          </text>
                        </g>
                      )}

                      {/* Quadrant */}
                      {circleType === "quadrant" && (
                        <g>
                          <path
                            d={`M 120 120 L ${120 + Math.min(95, 25 + circleRadius * 2.2)} 120 A ${Math.min(95, 25 + circleRadius * 2.2)} ${Math.min(95, 25 + circleRadius * 2.2)} 0 0 0 120 ${120 - Math.min(95, 25 + circleRadius * 2.2)} Z`}
                            className="fill-emerald-100/80 stroke-violet-600 stroke-[4]"
                          />
                          <circle cx="120" cy="120" r="4.5" className="fill-violet-950" />
                          <text x="100" y="135" className="text-xs font-black fill-violet-950">O</text>
                          <text x="165" y="60" className="text-[10px] font-black fill-emerald-900" textAnchor="middle">
                            Arc = πr/2 = {((11 * circleRadius) / 7).toFixed(1)} cm
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>

                  {/* Calculated Results Cards */}
                  <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-white border border-violet-100 rounded-xl p-3 text-center shadow-2xs">
                      <span className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">
                        {circleType === "full" ? "Circumference (C)" : circleType === "semicircle" ? "Semicircle Perimeter" : "Quadrant Perimeter"}
                      </span>
                      <p className="font-mono text-base sm:text-lg font-black text-violet-800 mt-1">
                        {circleType === "full" && `${((2 * 22 * circleRadius) / 7).toFixed(1)} cm`}
                        {circleType === "semicircle" && `${(((22 * circleRadius) / 7) + 2 * circleRadius).toFixed(1)} cm`}
                        {circleType === "quadrant" && `${(((11 * circleRadius) / 7) + 2 * circleRadius).toFixed(1)} cm`}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {circleType === "full" ? "C = 2 × (22/7) × r" : circleType === "semicircle" ? "P = πr + 2r" : "P = πr/2 + 2r"}
                      </span>
                    </div>

                    <div className="bg-white border border-violet-100 rounded-xl p-3 text-center shadow-2xs">
                      <span className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">
                        Circle Area (A)
                      </span>
                      <p className="font-mono text-base sm:text-lg font-black text-violet-800 mt-1">
                        {((22 * circleRadius * circleRadius) / 7).toFixed(1)} cm²
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Area = (22/7) × r²
                      </span>
                    </div>

                    <div className="bg-white border border-violet-100 rounded-xl p-3 text-center col-span-2 sm:col-span-1 shadow-2xs">
                      <span className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">
                        Constant Ratio (C / d)
                      </span>
                      <p className="font-mono text-base sm:text-lg font-black text-amber-700 mt-1">
                        π ≈ 3.142 (22/7)
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Universal Pi Constant
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interactive Controls Column */}
                <div className="w-full lg:w-80 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pt-5 lg:pt-0 lg:pl-6 space-y-5">
                  <div className="space-y-5">
                    {/* Radius Slider */}
                    <div className="bg-white border border-violet-200 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-black uppercase text-violet-900 tracking-wider">
                          Circle Radius (r): {circleRadius} cm
                        </label>
                        <span className="text-xs font-mono font-black bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                          d = {2 * circleRadius} cm
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { if (circleRadius > 1) { setCircleRadius(circleRadius - 1); awardPoints(1); } }}
                          className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer text-slate-700 font-bold"
                        >
                          -
                        </button>
                        <input
                          type="range"
                          min="1"
                          max="35"
                          step="1"
                          value={circleRadius}
                          onChange={(e) => {
                            setCircleRadius(parseInt(e.target.value, 10));
                            awardPoints(2);
                          }}
                          className="flex-1 accent-violet-600 h-2 bg-slate-150 rounded-lg cursor-pointer"
                        />
                        <button
                          onClick={() => { if (circleRadius < 35) { setCircleRadius(circleRadius + 1); awardPoints(1); } }}
                          className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer text-slate-700 font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Quick Preset Buttons */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-[10px] font-bold text-slate-500">Quick r:</span>
                        {[7, 14, 21, 28, 35].map((val) => (
                          <button
                            key={val}
                            onClick={() => { setCircleRadius(val); awardPoints(2); }}
                            className={`px-2 py-0.5 rounded text-[11px] font-black font-mono transition cursor-pointer ${
                              circleRadius === val ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {val}cm
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Wheel Revolution Distance Calculator */}
                    <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-3.5 space-y-2 text-xs">
                      <h4 className="font-extrabold text-amber-950 flex items-center justify-between">
                        <span>🎡 Rolling Wheel Distance</span>
                        <span className="text-[10px] font-mono font-bold bg-amber-200 px-1.5 py-0.5 rounded text-amber-900">
                          NCERT Application
                        </span>
                      </h4>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-700 font-medium">Revolutions (N):</span>
                        <input
                          type="number"
                          min="10"
                          max="2000"
                          step="10"
                          value={wheelRevolutions}
                          onChange={(e) => setWheelRevolutions(Math.max(1, parseInt(e.target.value, 10) || 1))}
                          className="w-20 px-2 py-1 border border-amber-300 rounded font-mono font-bold text-amber-950 text-right bg-white"
                        />
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-amber-200 font-mono space-y-1 text-slate-800">
                        <p>1 Revolution = Circumference C = {((2 * 22 * circleRadius) / 7).toFixed(1)} cm</p>
                        <p className="font-black text-amber-900 border-t border-amber-100 pt-1">
                          Total Distance in {wheelRevolutions} revs:
                          <br />
                          {wheelRevolutions} × {((2 * 22 * circleRadius) / 7).toFixed(1)} cm = <strong>{(((wheelRevolutions * 2 * 22 * circleRadius) / 7) / 100).toFixed(2)} meters</strong>
                        </p>
                      </div>
                    </div>

                    {/* Wire Bending Equivalency Card */}
                    <div className="bg-indigo-50/90 border border-indigo-200/80 rounded-xl p-3.5 space-y-2 text-xs text-indigo-950">
                      <h4 className="font-extrabold flex items-center justify-between">
                        <span>🧵 Wire Bending Simulator</span>
                        <span className="text-[10px] font-mono bg-indigo-200 px-1.5 py-0.5 rounded text-indigo-900">
                          Equivalence
                        </span>
                      </h4>
                      <p className="text-slate-700 leading-snug">
                        If a wire of length <strong>{((2 * 22 * circleRadius) / 7).toFixed(1)} cm</strong> (equal to circle circumference) is re-bent into a <strong>SQUARE</strong>:
                      </p>
                      <div className="bg-white p-2 rounded-lg border border-indigo-200 font-mono text-center font-black text-indigo-900">
                        Square Side = {((2 * 22 * circleRadius) / 7).toFixed(1)} ÷ 4 = <strong>{(((2 * 22 * circleRadius) / 7) / 4).toFixed(2)} cm</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => {
                        setCircleRadius(7);
                        setCircleType("full");
                        setWheelRevolutions(100);
                        awardPoints(5);
                      }}
                      className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg cursor-pointer transition"
                    >
                      <RotateCcw size={14} /> Reset Circle
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-6 h-full">
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

export function Grade6MotionVisualLab() {
  const [activeTab, setActiveTab] = useState<"concept" | "types" | "converter" | "quiz">("concept");

  // Concept Tab State
  const [isCarMoving, setIsCarMoving] = useState<boolean>(true);
  const [simTime, setSimTime] = useState<number>(0);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Types Tab State
  const [selectedType, setSelectedType] = useState<"rectilinear" | "circular" | "rotational" | "periodic" | "oscillatory" | "combination">("rectilinear");

  // Converter Tab State
  const [convDirection, setConvDirection] = useState<"kmh_to_ms" | "ms_to_kmh">("kmh_to_ms");
  const [convInputValue, setConvInputValue] = useState<number>(36);

  // Game Tab State
  const [gameIndex, setGameIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Animation Loop
  useEffect(() => {
    let animId: number;
    if (!isPaused) {
      let lastTime = Date.now();
      const tick = () => {
        const now = Date.now();
        const delta = (now - lastTime) / 1000;
        lastTime = now;
        setSimTime(prev => prev + delta * speedMultiplier);
        animId = requestAnimationFrame(tick);
      };
      animId = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPaused, speedMultiplier]);

  // Concept Tab Calculations
  const carX = isCarMoving ? ((simTime * 15) % 80) + 10 : 25;
  const distanceFromTree = Number(Math.abs(carX - 20).toFixed(1));

  // Types Tab Animations
  const rectilinearX = ((simTime * 20) % 80) + 10;
  const circularAngle = simTime * 2.5; // radians
  const circularX = 50 + 35 * Math.cos(circularAngle);
  const circularY = 50 + 35 * Math.sin(circularAngle);
  const rotationalAngle = (simTime * 250) % 360;
  const periodicAngle = Math.sin(simTime * 3.5) * 35; // degrees oscillation
  const combinationX = ((simTime * 18) % 80) + 10;
  const combinationRot = (simTime * 600) % 360;

  // Game Questions
  const gameQuestions = [
    {
      id: 1,
      scenario: "Marching soldiers moving on a straight parade ground during a ceremonial parade.",
      icon: "🎖️",
      options: [
        { id: "rectilinear", label: "Straight Line (Rectilinear)" },
        { id: "circular", label: "Circular Motion" },
        { id: "periodic", label: "Periodic Motion" },
        { id: "rotational", label: "Rotational Motion" }
      ],
      correct: "rectilinear",
      explanation: "The soldiers move along a straight line path, which is the definition of Rectilinear Motion!"
    },
    {
      id: 2,
      scenario: "The movement of blades of an electric ceiling fan turning at high speed.",
      icon: "💨",
      options: [
        { id: "rectilinear", label: "Rectilinear Motion" },
        { id: "circular", label: "Circular Motion (Fan Blades)" },
        { id: "periodic", label: "Periodic Motion" },
        { id: "combination", label: "Combination Motion" }
      ],
      correct: "circular",
      explanation: "Any fixed point or tip on a fan blade moves along a circular path around the central motor hub at a fixed distance, exhibiting Circular Motion!"
    },
    {
      id: 3,
      scenario: "A child swinging back and forth on a playground swing.",
      icon: "🎠",
      options: [
        { id: "rectilinear", label: "Rectilinear Motion" },
        { id: "rotational", label: "Rotational Motion" },
        { id: "periodic", label: "Periodic Motion" },
        { id: "circular", label: "Circular Motion" }
      ],
      correct: "periodic",
      explanation: "The swing repeats its back-and-forth movement at regular intervals of time, which is Periodic Motion!"
    },
    {
      id: 4,
      scenario: "A wooden top ('lattu') spinning continuously on its pointed tip.",
      icon: "🛞",
      options: [
        { id: "rectilinear", label: "Rectilinear Motion" },
        { id: "rotational", label: "Rotational Motion" },
        { id: "periodic", label: "Periodic Motion" },
        { id: "circular", label: "Circular Motion" }
      ],
      correct: "rotational",
      explanation: "The top spins continuously around its own internal central axis without moving away as a whole, which is Rotational Motion!"
    },
    {
      id: 5,
      scenario: "A bicycle wheel rolling forward along a straight city road.",
      icon: "🚲",
      options: [
        { id: "rectilinear", label: "Rectilinear Motion only" },
        { id: "rotational", label: "Rotational Motion only" },
        { id: "combination", label: "Combination Motion (Rectilinear + Rotational)" },
        { id: "periodic", label: "Periodic Motion" }
      ],
      correct: "combination",
      explanation: "The bicycle travels forward in a straight path (Rectilinear) while its wheels spin continuously on their axles (Rotational) — a classic Combination Motion!"
    },
    {
      id: 6,
      scenario: "An apple falling straight down from a high tree branch under gravity.",
      icon: "🍎",
      options: [
        { id: "rectilinear", label: "Rectilinear Motion" },
        { id: "circular", label: "Circular Motion" },
        { id: "rotational", label: "Rotational Motion" },
        { id: "periodic", label: "Periodic Motion" }
      ],
      correct: "rectilinear",
      explanation: "The falling apple moves in a straight vertical path downwards under gravity, exhibiting Rectilinear Motion!"
    },
    {
      id: 7,
      scenario: "A grandfather clock pendulum swinging left and right continuously.",
      icon: "🕰️",
      options: [
        { id: "rectilinear", label: "Rectilinear Motion" },
        { id: "circular", label: "Circular Motion" },
        { id: "periodic", label: "Periodic / Oscillatory Motion" },
        { id: "rotational", label: "Rotational Motion" }
      ],
      correct: "periodic",
      explanation: "The pendulum moves to and fro about its central rest position at regular time intervals, exhibiting Oscillatory and Periodic Motion!"
    },
    {
      id: 8,
      scenario: "A plucked guitar string vibrating rapidly back and forth about its central rest position.",
      icon: "🎸",
      options: [
        { id: "rectilinear", label: "Rectilinear Motion" },
        { id: "oscillatory", label: "Oscillatory Motion" },
        { id: "rotational", label: "Rotational Motion" },
        { id: "circular", label: "Circular Motion" }
      ],
      correct: "oscillatory",
      explanation: "When plucked, a guitar string moves to and fro about its central rest position, demonstrating Oscillatory Motion!"
    },
    {
      id: 9,
      scenario: "Which statement accurately describes the relationship between Periodic and Oscillatory motion?",
      icon: "💡",
      options: [
        { id: "all_osc_per", label: "All Oscillatory motions are Periodic, but NOT all Periodic motions are Oscillatory" },
        { id: "all_per_osc", label: "All Periodic motions are Oscillatory, but NOT all Oscillatory motions are Periodic" },
        { id: "both_same", label: "Periodic and Oscillatory motion mean exactly the same thing in all cases" },
        { id: "neither", label: "Oscillatory motion can never be periodic" }
      ],
      correct: "all_osc_per",
      explanation: "Oscillatory motion requires 'to-and-fro' movement about a mean position. Since back-and-forth swings repeat in equal time periods, all oscillatory motions are periodic. However, a planet orbiting the Sun repeats in equal time periods (periodic) without moving back-and-forth, so not all periodic motions are oscillatory!"
    },
    {
      id: 10,
      scenario: "A car is cruising on a highway at a speed of 72 km/h. What is its speed in meters per second (m/s)?",
      icon: "🚗",
      options: [
        { id: "10ms", label: "10 m/s" },
        { id: "20ms", label: "20 m/s" },
        { id: "25ms", label: "25 m/s" },
        { id: "30ms", label: "30 m/s" }
      ],
      correct: "20ms",
      explanation: "To convert km/h into m/s, multiply by 5/18: 72 × (5/18) = 4 × 5 = 20 m/s!"
    },
    {
      id: 11,
      scenario: "To convert a speed value given in kilometers per hour (km/h) into standard SI unit meters per second (m/s), what fraction do you multiply by?",
      icon: "⚡",
      options: [
        { id: "18_5", label: "18 / 5" },
        { id: "5_18", label: "5 / 18" },
        { id: "1000_60", label: "1000 / 60" },
        { id: "3_6", label: "3.6 / 100" }
      ],
      correct: "5_18",
      explanation: "Since 1 km = 1000 m and 1 hour = 3600 seconds, 1 km/h = 1000 / 3600 = 5/18 m/s!"
    }
  ];

  const handleAnswerClick = (optionId: string) => {
    if (showExplanation) return;
    setSelectedAnswer(optionId);
    setShowExplanation(true);
    if (optionId === gameQuestions[gameIndex].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameIndex(prev => (prev + 1) % gameQuestions.length);
  };

  const currentQ = gameQuestions[gameIndex];

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="g6_motion_interactive_lab">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-xs gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black uppercase text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100 font-mono">
              Grade 6 Physics • Chapter 5
            </span>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-100">
              Curiosity Science
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
            🌌 Motion, Measurement & Speed Conversions Interactive Lab
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Understand rest vs motion, explore 5 types of motion, convert km/h to m/s with live math derivations, and test your skills!
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-stretch md:self-auto justify-stretch flex-wrap md:flex-nowrap gap-1">
          <button
            onClick={() => setActiveTab("concept")}
            className={`flex-1 md:flex-none px-3 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "concept"
                ? "bg-white text-sky-700 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>🎯 1. What is Motion?</span>
          </button>
          <button
            onClick={() => setActiveTab("types")}
            className={`flex-1 md:flex-none px-3 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "types"
                ? "bg-white text-sky-700 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>🌀 2. Types of Motion</span>
          </button>
          <button
            onClick={() => setActiveTab("converter")}
            className={`flex-1 md:flex-none px-3 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "converter"
                ? "bg-white text-indigo-700 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>⚡ 3. km/h ↔ m/s Converter</span>
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex-1 md:flex-none px-3 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "quiz"
                ? "bg-white text-emerald-700 shadow-xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>🎮 4. Motion Quiz</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CONCEPT OF MOTION & REFERENCE POINT */}
      {activeTab === "concept" && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider">Object State:</span>
              <button
                onClick={() => setIsCarMoving(true)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border flex items-center gap-2 ${
                  isCarMoving
                    ? "bg-sky-600 text-white border-sky-700 shadow-xs"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                }`}
              >
                <span>🚗 In Motion (Moving)</span>
              </button>
              <button
                onClick={() => setIsCarMoving(false)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border flex items-center gap-2 ${
                  !isCarMoving
                    ? "bg-rose-600 text-white border-rose-700 shadow-xs"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                }`}
              >
                <span>🛑 At Rest (Stationary)</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 cursor-pointer"
              >
                {isPaused ? "▶️ Resume Time" : "⏸️ Pause Simulation"}
              </button>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <span>Speed:</span>
                {[1, 2, 3].map(sp => (
                  <button
                    key={sp}
                    onClick={() => setSpeedMultiplier(sp)}
                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold font-mono border ${
                      speedMultiplier === sp
                        ? "bg-sky-100 text-sky-800 border-sky-300"
                        : "bg-white text-slate-500 border-slate-200"
                    }`}
                  >
                    {sp}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Visual Canvas */}
          <div className="bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-100 rounded-2xl border border-sky-200 p-6 overflow-hidden relative shadow-inner">
            {/* Sky & Clouds */}
            <div className="flex justify-between items-center text-sky-300 opacity-60 mb-8">
              <span className="text-2xl animate-pulse">☁️</span>
              <span className="text-3xl">☁️</span>
              <span className="text-2xl">☁️</span>
            </div>

            {/* Stage Items */}
            <div className="relative h-44 w-full bg-emerald-200/50 rounded-xl border-b-4 border-emerald-600 flex items-end px-4 overflow-hidden">
              {/* Distance Scale Markers along Road */}
              <div className="absolute top-2 left-0 right-0 px-4 flex justify-between text-[10px] font-black text-slate-500 font-mono">
                <span>0m</span>
                <span>20m (Tree Ref)</span>
                <span>40m</span>
                <span>60m</span>
                <span>80m</span>
              </div>

              {/* Reference Point: Fixed Tree at X = 20m */}
              <div
                className="absolute bottom-6 flex flex-col items-center z-10"
                style={{ left: "20%" }}
              >
                <div className="bg-amber-100/90 text-amber-900 border border-amber-300 text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs mb-1 uppercase tracking-wider font-mono">
                  📍 Stationary Reference Point
                </div>
                <span className="text-5xl filter drop-shadow-md">🌳</span>
                <span className="text-[10px] font-extrabold text-slate-800 bg-white/80 px-1.5 py-0.2 rounded border border-slate-300 mt-0.5">
                  Oak Tree (X = 20m)
                </span>
              </div>

              {/* Moving / Rest Object: Car */}
              <div
                className="absolute bottom-6 flex flex-col items-center transition-all duration-100 z-20"
                style={{ left: `${carX}%` }}
              >
                <div className={`text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs mb-1 uppercase tracking-wider font-mono border ${
                  isCarMoving ? "bg-sky-600 text-white border-sky-700 animate-bounce" : "bg-rose-100 text-rose-800 border-rose-300"
                }`}>
                  {isCarMoving ? "🏎️ IN MOTION" : "🛑 AT REST"}
                </div>
                <span className="text-5xl filter drop-shadow-md">🚗</span>
                <span className="text-[10px] font-black text-slate-800 bg-white px-2 py-0.5 rounded-md border border-slate-300 shadow-2xs font-mono">
                  Car (X = {carX.toFixed(1)}m)
                </span>
              </div>

              {/* Distance Arrow Line between Tree and Car */}
              <div
                className="absolute bottom-2 h-1 bg-amber-500 rounded-full border-t border-amber-600 transition-all duration-100 flex items-center justify-center"
                style={{
                  left: `${Math.min(20, carX)}%`,
                  width: `${Math.abs(carX - 20)}%`
                }}
              >
                <span className="text-[9px] font-black text-amber-900 bg-amber-100 border border-amber-300 px-1.5 rounded-full font-mono shadow-xs -mt-5">
                  d = {distanceFromTree}m
                </span>
              </div>
            </div>

            {/* Live Physics Metrics Panel */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Clock Time Elapsed</span>
                <span className="text-xl font-black text-slate-800 font-mono mt-1">
                  ⏱️ {simTime.toFixed(1)} s
                </span>
                <span className="text-[10px] text-slate-500">Continuous passing of time</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Position vs Tree</span>
                <span className="text-xl font-black text-amber-600 font-mono mt-1">
                  📍 {carX.toFixed(1)} meters
                </span>
                <span className="text-[10px] text-slate-500">Distance from Tree = {distanceFromTree} m</span>
              </div>

              <div className={`p-3.5 rounded-xl border shadow-xs flex flex-col justify-between ${
                isCarMoving ? "bg-sky-50 border-sky-200 text-sky-900" : "bg-rose-50 border-rose-200 text-rose-900"
              }`}>
                <span className="text-[10px] font-black uppercase tracking-wider opacity-80">Scientific Conclusion</span>
                <span className="text-sm font-extrabold mt-1">
                  {isCarMoving ? "✅ Object is IN MOTION!" : "🛑 Object is AT REST!"}
                </span>
                <span className="text-[11px] leading-tight opacity-90 mt-1">
                  {isCarMoving
                    ? "Car's position changes continuously with passing time relative to the stationary tree."
                    : "Car's position remains constant (X = 25m) as time passes relative to the stationary tree."}
                </span>
              </div>
            </div>
          </div>

          {/* NCERT Explanation Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
              <span>💡 Essential Concept: What is Motion in Physics?</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-150">
                <p className="font-bold text-slate-800 mb-1">1. Motion Definition:</p>
                <p>An object is said to be <strong>in motion</strong> if its position changes continuously over time with respect to a stationary reference point (surroundings).</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-150">
                <p className="font-bold text-slate-800 mb-1">2. Reference Point (Frame of Reference):</p>
                <p>A fixed object (like a roadside tree, house, or electric pole) used as a baseline to determine if another object has changed position.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TYPES OF MOTION INTERACTIVE EXPLORER */}
      {activeTab === "types" && (
        <div className="space-y-6">
          {/* Motion Type Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {[
              { id: "rectilinear", label: "Straight Line", sub: "Rectilinear", icon: "📐" },
              { id: "circular", label: "Circular", sub: "Round & Round", icon: "⭕" },
              { id: "rotational", label: "Rotational", sub: "Spinning Axis", icon: "🌀" },
              { id: "periodic", label: "Periodic", sub: "Equal Intervals", icon: "⏱️" },
              { id: "oscillatory", label: "Oscillatory", sub: "To & Fro", icon: "⚛️" },
              { id: "combination", label: "Combination", sub: "Multi-Motion", icon: "⚙️" }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id as any)}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                  selectedType === type.id
                    ? "bg-sky-600 text-white border-sky-700 shadow-md ring-2 ring-sky-300"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xl">{type.icon}</span>
                  {selectedType === type.id && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  )}
                </div>
                <div>
                  <div className="font-extrabold text-[11px] leading-tight">{type.label}</div>
                  <div className={`text-[9px] font-medium ${selectedType === type.id ? "text-sky-100" : "text-slate-500"}`}>
                    {type.sub}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Simulation Display for Selected Type */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Visual Canvas (7 cols) */}
            <div className="md:col-span-7 bg-slate-900 rounded-2xl p-6 h-64 flex flex-col items-center justify-center relative overflow-hidden border border-slate-800 shadow-inner">
              
              {/* 1. RECTILINEAR MOTION VISUAL */}
              {selectedType === "rectilinear" && (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <span className="absolute top-2 left-2 text-[10px] font-mono text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
                    Path: Perfectly Straight Line
                  </span>

                  {/* Straight Dashed Track */}
                  <div className="w-full h-1 bg-sky-500/30 relative flex items-center">
                    <div className="w-full border-t-2 border-dashed border-sky-400/80"></div>
                    {/* Direction Arrow */}
                    <span className="absolute right-0 text-sky-400 font-black text-xs">➔</span>
                  </div>

                  {/* Moving Car */}
                  <div
                    className="absolute transition-all duration-75 flex flex-col items-center"
                    style={{ left: `${rectilinearX}%`, transform: "translate(-50%, -10px)" }}
                  >
                    <span className="text-4xl filter drop-shadow-md">🏎️</span>
                    <span className="text-[9px] font-black text-sky-300 bg-slate-800/90 px-1.5 rounded font-mono mt-1 border border-slate-700">
                      V = Constant
                    </span>
                  </div>
                </div>
              )}

              {/* 2. CIRCULAR MOTION VISUAL */}
              {selectedType === "circular" && (
                <div className="w-full h-full flex items-center justify-center relative">
                  <span className="absolute top-2 left-2 text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                    Path: Circular Orbit (Fixed Radius R)
                  </span>

                  {/* Center Pivot Pin */}
                  <div className="w-3 h-3 bg-amber-500 rounded-full border-2 border-white z-10"></div>

                  {/* Dashed Circle Guide */}
                  <div className="absolute w-36 h-36 rounded-full border-2 border-dashed border-amber-500/50 flex items-center justify-center"></div>

                  {/* Tether String Line */}
                  <div
                    className="absolute h-0.5 bg-amber-400/60 origin-left"
                    style={{
                      left: "50%",
                      top: "50%",
                      width: "70px",
                      transform: `rotate(${circularAngle * (180 / Math.PI)}deg)`
                    }}
                  />

                  {/* Revolving Stone / Clock Hand */}
                  <div
                    className="absolute flex items-center justify-center transition-all duration-75"
                    style={{
                      left: `${circularX}%`,
                      top: `${circularY}%`,
                      transform: "translate(-50%, -50%)"
                    }}
                  >
                    <span className="text-3xl filter drop-shadow-md">🪨</span>
                  </div>
                </div>
              )}

              {/* 3. ROTATIONAL MOTION VISUAL */}
              {selectedType === "rotational" && (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <span className="absolute top-2 left-2 text-[10px] font-mono text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800">
                    Path: Spinning on Internal Axis
                  </span>

                  {/* Axis Rod */}
                  <div className="absolute h-40 w-1 bg-purple-400/40 rounded-full"></div>

                  {/* Spinning Top / Globe */}
                  <div
                    className="transition-transform duration-75 text-6xl filter drop-shadow-xl z-10"
                    style={{ transform: `rotate(${rotationalAngle}deg)` }}
                  >
                    🌍
                  </div>

                  {/* Circular Spin Arrow */}
                  <div className="absolute bottom-4 text-purple-300 text-xs font-mono font-bold animate-pulse">
                    ↺ Spinning around Axis Rod
                  </div>
                </div>
              )}

              {/* 4. PERIODIC MOTION VISUAL */}
              {selectedType === "periodic" && (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <span className="absolute top-2 left-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    Path: Repeats in Fixed Period T
                  </span>

                  {/* Earth Revolving around Sun Orbit */}
                  <div className="relative flex items-center justify-center">
                    {/* Sun */}
                    <div className="w-10 h-10 rounded-full bg-amber-400 border-2 border-amber-200 flex items-center justify-center text-xl shadow-lg shadow-amber-500/50 z-10">
                      ☀️
                    </div>
                    {/* Orbit Ring */}
                    <div className="absolute w-40 h-40 rounded-full border border-dashed border-emerald-500/40"></div>
                    {/* Earth */}
                    <div
                      className="absolute w-7 h-7 flex items-center justify-center transition-all duration-75"
                      style={{
                        left: `${50 + 40 * Math.cos(simTime * 2)}%`,
                        top: `${50 + 40 * Math.sin(simTime * 2)}%`,
                        transform: "translate(-50%, -50%)"
                      }}
                    >
                      <span className="text-2xl filter drop-shadow-md">🌍</span>
                    </div>
                  </div>

                  {/* Dotted Periodic Loop Marker */}
                  <div className="absolute bottom-4 text-[10px] font-mono text-emerald-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                    T = Fixed Time Interval (Repeats in a loop)
                  </div>
                </div>
              )}

              {/* 5. OSCILLATORY MOTION VISUAL */}
              {selectedType === "oscillatory" && (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <span className="absolute top-2 left-2 text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                    Path: To-and-Fro About Central Rest Position
                  </span>

                  {/* Top Stand Ceiling */}
                  <div className="absolute top-6 w-36 h-2 bg-slate-700 rounded-full border border-slate-600"></div>

                  {/* Mean Position Center Line */}
                  <div className="absolute top-8 bottom-10 w-0.5 border-l border-dashed border-cyan-500/50"></div>
                  <span className="absolute bottom-2 text-[9px] font-mono text-cyan-400 font-bold bg-slate-900/90 px-1.5 py-0.5 rounded border border-cyan-800">
                    📍 Mean Rest Position
                  </span>

                  {/* Left Extreme & Right Extreme Labels */}
                  <span className="absolute top-12 left-6 text-[8px] font-mono text-cyan-300/70">◀ Left Extreme</span>
                  <span className="absolute top-12 right-6 text-[8px] font-mono text-cyan-300/70">Right Extreme ▶</span>

                  {/* Oscillating Pendulum Bob */}
                  <div
                    className="origin-top flex flex-col items-center transition-transform duration-75"
                    style={{
                      top: "28px",
                      transform: `rotate(${periodicAngle}deg)`
                    }}
                  >
                    <div className="w-1 h-28 bg-cyan-400 shadow-xs"></div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-sky-600 border-2 border-white flex items-center justify-center text-sm font-black text-slate-900 shadow-xl -mt-1">
                      🔔
                    </div>
                  </div>
                </div>
              )}

              {/* 6. COMBINATION MOTION VISUAL */}
              {selectedType === "combination" && (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <span className="absolute top-2 left-2 text-[10px] font-mono text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                    Path: Rectilinear (Forward) + Rotational (Spinning)
                  </span>

                  {/* Ground Line */}
                  <div className="w-full h-1 bg-amber-500/40 absolute bottom-12"></div>

                  {/* Rolling Bicycle Wheel */}
                  <div
                    className="absolute bottom-12 transition-all duration-75 flex flex-col items-center"
                    style={{ left: `${combinationX}%`, transform: "translateX(-50%)" }}
                  >
                    <div
                      className="text-5xl filter drop-shadow-md transition-transform duration-75"
                      style={{ transform: `rotate(${combinationRot}deg)` }}
                    >
                      ⚙️
                    </div>
                    <span className="text-[9px] font-black text-amber-300 bg-slate-800 px-1.5 rounded font-mono mt-2 border border-slate-700">
                      Translational + Spin
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Explanation & Real-life Examples (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              {selectedType === "rectilinear" && (
                <>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-sky-50 text-sky-700 border border-sky-200 font-mono text-xs font-bold">
                    📐 Rectilinear Motion
                  </div>
                  <h3 className="text-base font-extrabold text-slate-800">Motion Along a Straight Line</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An object moves in a straight path in a single direction. The distance traveled equals the displacement.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <span className="font-extrabold text-slate-800 block">Real-life Examples:</span>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 font-medium">
                      <li>Marching soldiers on a parade ground</li>
                      <li>Sprinter running on a 100m straight track</li>
                      <li>Apple or stone falling vertically down</li>
                      <li>Train moving on a straight railway track</li>
                    </ul>
                  </div>
                </>
              )}

              {selectedType === "circular" && (
                <>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200 font-mono text-xs font-bold">
                    ⭕ Circular Motion
                  </div>
                  <h3 className="text-base font-extrabold text-slate-800">Motion Along a Circular Path</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An object travels around a circular track where its distance from a fixed center point remains constant.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <span className="font-extrabold text-slate-800 block">Real-life Examples:</span>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 font-medium">
                      <li>Tips of hands of a clock moving around dial</li>
                      <li>Blades of an electric ceiling fan turning</li>
                      <li>Stone tied to a string and swung in a circle</li>
                      <li>Merry-go-round horse moving in a circle</li>
                    </ul>
                  </div>
                </>
              )}

              {selectedType === "rotational" && (
                <>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 border border-purple-200 font-mono text-xs font-bold">
                    🌀 Rotational Motion
                  </div>
                  <h3 className="text-base font-extrabold text-slate-800">Spinning Around Its Own Axis</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An entire object turns or spins on its own internal central line (axis) without changing its overall location as a whole.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <span className="font-extrabold text-slate-800 block">Real-life Examples:</span>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 font-medium">
                      <li>Spinning top ('lattu') spinning on its tip</li>
                      <li>Potter's wheel spinning to shape clay</li>
                      <li>Earth spinning on its axis (causing day & night)</li>
                      <li>Giant Ferris wheel spinning on its central axle</li>
                    </ul>
                  </div>
                </>
              )}

              {selectedType === "periodic" && (
                <>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-xs font-bold">
                    ⏱️ Periodic Motion
                  </div>
                  <h3 className="text-base font-extrabold text-slate-800">Repeating at Equal Time Intervals</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Any motion that repeats itself at regular, fixed time periods (T). It may move in a continuous loop or circle, or back and forth.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <span className="font-extrabold text-slate-800 block">Real-life Examples:</span>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 font-medium">
                      <li>Earth's revolution around Sun (every 365.25 days)</li>
                      <li>Hands of a clock passing 12 (every 60s / 60m)</li>
                      <li>Heartbeats in a healthy human body (~72 bpm)</li>
                      <li>Swinging pendulum of a clock</li>
                    </ul>
                  </div>
                </>
              )}

              {selectedType === "oscillatory" && (
                <>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-cyan-50 text-cyan-700 border border-cyan-200 font-mono text-xs font-bold">
                    ⚛️ Oscillatory Motion
                  </div>
                  <h3 className="text-base font-extrabold text-slate-800">To-and-Fro About a Mean Position</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Motion where an object swings back and forth repeatedly across a central rest position (Mean Position).
                  </p>
                  <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-[11px] text-amber-900 font-medium">
                    ✨ <strong>Golden Physics Rule:</strong> All Oscillatory motions are Periodic! But NOT all Periodic motions are Oscillatory (e.g., Earth revolving around the Sun is periodic but NOT oscillatory).
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <span className="font-extrabold text-slate-800 block">Real-life Examples:</span>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 font-medium">
                      <li>Swinging grandfather clock pendulum</li>
                      <li>Child on a playground swing</li>
                      <li>Plucked guitar string or struck drumhead</li>
                      <li>Vibrating tuning fork prongs</li>
                    </ul>
                  </div>
                </>
              )}

              {selectedType === "combination" && (
                <>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-200 font-mono text-xs font-bold">
                    ⚙️ Combination Motion
                  </div>
                  <h3 className="text-base font-extrabold text-slate-800">Two or More Motions Together</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    An object exhibits multiple fundamental types of motion simultaneously at the same time.
                  </p>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <span className="font-extrabold text-slate-800 block">Real-life Examples:</span>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 font-medium">
                      <li>Rolling Bicycle Wheel (Rectilinear + Rotational)</li>
                      <li>Planet Earth (Rotational on axis + Circular around Sun)</li>
                      <li>Sewing Machine Needle (Rotational wheel + Oscillatory needle)</li>
                      <li>Drill Bit drilling into wood (Rotational + Linear)</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SPEED & UNIT CONVERTER (km/h ↔ m/s) */}
      {activeTab === "converter" && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100 font-mono">
                  Physics Formula & Unit Conversion
                </span>
                <h3 className="text-lg font-extrabold text-slate-800 mt-1">
                  ⚡ Speed Converter: km/h ↔ m/s
                </h3>
              </div>

              {/* Conversion Direction Toggle */}
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => {
                    setConvDirection("kmh_to_ms");
                    setConvInputValue(36);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    convDirection === "kmh_to_ms"
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  km/h ➔ m/s (× 5/18)
                </button>
                <button
                  onClick={() => {
                    setConvDirection("ms_to_kmh");
                    setConvInputValue(10);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    convDirection === "ms_to_kmh"
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  m/s ➔ km/h (× 18/5)
                </button>
              </div>
            </div>

            {/* Input Controls & Presets */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-slate-700">
                    Enter Speed in {convDirection === "kmh_to_ms" ? "Kilometers per Hour (km/h)" : "Meters per Second (m/s)"}:
                  </label>
                  <span className="text-xs font-mono font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                    {convInputValue} {convDirection === "kmh_to_ms" ? "km/h" : "m/s"}
                  </span>
                </div>

                <input
                  type="range"
                  min={1}
                  max={convDirection === "kmh_to_ms" ? 360 : 100}
                  step={1}
                  value={convInputValue}
                  onChange={(e) => setConvInputValue(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />

                {/* Direct Number Input */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 font-medium">Or type exact value:</span>
                  <input
                    type="number"
                    min={0}
                    max={1000}
                    value={convInputValue}
                    onChange={(e) => setConvInputValue(Math.max(0, Number(e.target.value)))}
                    className="w-28 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-black font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <span className="text-xs font-extrabold text-slate-600">
                    {convDirection === "kmh_to_ms" ? "km/h" : "m/s"}
                  </span>
                </div>

                {/* Quick Presets */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
                    ⚡ Quick Real-Life Speed Presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {convDirection === "kmh_to_ms" ? (
                      <>
                        <button onClick={() => setConvInputValue(5)} className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer">🚶 Walking (5 km/h)</button>
                        <button onClick={() => setConvInputValue(18)} className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer">🚲 Bicycle (18 km/h)</button>
                        <button onClick={() => setConvInputValue(36)} className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer">🚘 City Car (36 km/h)</button>
                        <button onClick={() => setConvInputValue(72)} className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer">🏎️ Highway Car (72 km/h)</button>
                        <button onClick={() => setConvInputValue(108)} className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer">🚆 Express Train (108 km/h)</button>
                        <button onClick={() => setConvInputValue(120)} className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer">🐆 Cheetah (120 km/h)</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setConvInputValue(5)} className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer">🏃 5 m/s (18 km/h)</button>
                        <button onClick={() => setConvInputValue(10)} className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer">🚗 10 m/s (36 km/h)</button>
                        <button onClick={() => setConvInputValue(20)} className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer">🏎️ 20 m/s (72 km/h)</button>
                        <button onClick={() => setConvInputValue(25)} className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer">🚅 25 m/s (90 km/h)</button>
                        <button onClick={() => setConvInputValue(30)} className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-bold border border-slate-200 transition-colors cursor-pointer">🚄 30 m/s (108 km/h)</button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Converted Result Display Card */}
              <div className="md:col-span-5 bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-5 rounded-2xl shadow-md border border-indigo-800 flex flex-col justify-between h-full min-h-[180px]">
                <div>
                  <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest block font-bold">
                    Converted SI Speed Output
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-amber-300 font-mono">
                      {convDirection === "kmh_to_ms"
                        ? Number((convInputValue * 5 / 18).toFixed(2))
                        : Number((convInputValue * 18 / 5).toFixed(2))}
                    </span>
                    <span className="text-lg font-bold text-slate-200">
                      {convDirection === "kmh_to_ms" ? "m/s" : "km/h"}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-200 mt-2 font-medium">
                    {convDirection === "kmh_to_ms" ? (
                      <>An object going <strong>{convInputValue} km/h</strong> covers <strong>{Number((convInputValue * 5 / 18).toFixed(2))} meters</strong> every single second!</>
                    ) : (
                      <>An object covering <strong>{convInputValue} m/s</strong> travels <strong>{Number((convInputValue * 18 / 5).toFixed(2))} km</strong> in one hour!</>
                    )}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-indigo-800/80 flex justify-between items-center text-[11px] text-indigo-300 font-mono">
                  <span>Conversion Factor:</span>
                  <span className="font-bold text-amber-300">
                    {convDirection === "kmh_to_ms" ? "× (5 / 18)" : "× (18 / 5)"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mathematical Step-by-Step Derivation Breakdown */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
              <span>📐 Step-by-Step Mathematical Derivation</span>
            </h4>

            {convDirection === "kmh_to_ms" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-indigo-50/70 border border-indigo-150 p-3.5 rounded-xl space-y-1">
                  <span className="font-extrabold text-indigo-900 block">Step 1: Length & Time Standard Units</span>
                  <p className="text-slate-600">1 kilometer (km) = 1,000 meters (m)</p>
                  <p className="text-slate-600">1 hour (h) = 60 min × 60 s = 3,600 seconds (s)</p>
                </div>

                <div className="bg-amber-50/70 border border-amber-150 p-3.5 rounded-xl space-y-1">
                  <span className="font-extrabold text-amber-900 block">Step 2: Simplify Unit Fraction</span>
                  <p className="font-mono text-slate-700">1 km/h = 1000 m ÷ 3600 s</p>
                  <p className="font-mono font-bold text-amber-900">1 km/h = 10/36 = 5/18 m/s ≈ 0.2778 m/s</p>
                </div>

                <div className="bg-emerald-50/70 border border-emerald-150 p-3.5 rounded-xl space-y-1">
                  <span className="font-extrabold text-emerald-900 block">Step 3: Calculate Given Value</span>
                  <p className="font-mono text-slate-700">{convInputValue} × (5 / 18)</p>
                  <p className="font-mono font-extrabold text-emerald-800">
                    = {convInputValue} × 5 ÷ 18 = <span className="text-emerald-950 font-black">{Number((convInputValue * 5 / 18).toFixed(2))} m/s</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-indigo-50/70 border border-indigo-150 p-3.5 rounded-xl space-y-1">
                  <span className="font-extrabold text-indigo-900 block">Step 1: Inverse Unit Fractions</span>
                  <p className="text-slate-600">1 meter (m) = 1/1,000 km</p>
                  <p className="text-slate-600">1 second (s) = 1/3,600 hour</p>
                </div>

                <div className="bg-amber-50/70 border border-amber-150 p-3.5 rounded-xl space-y-1">
                  <span className="font-extrabold text-amber-900 block">Step 2: Simplify Inverse Fraction</span>
                  <p className="font-mono text-slate-700">1 m/s = (1/1000) ÷ (1/3600)</p>
                  <p className="font-mono font-bold text-amber-900">1 m/s = 3600 / 1000 = 18/5 = 3.6 km/h</p>
                </div>

                <div className="bg-emerald-50/70 border border-emerald-150 p-3.5 rounded-xl space-y-1">
                  <span className="font-extrabold text-emerald-900 block">Step 3: Calculate Given Value</span>
                  <p className="font-mono text-slate-700">{convInputValue} × (18 / 5)</p>
                  <p className="font-mono font-extrabold text-emerald-800">
                    = {convInputValue} × 3.6 = <span className="text-emerald-950 font-black">{Number((convInputValue * 18 / 5).toFixed(2))} km/h</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Conversion Reference Table */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-sm font-extrabold text-slate-800">
              📊 Standard Physics Reference Table (km/h ↔ m/s)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-extrabold uppercase text-[10px]">
                    <th className="p-2.5 rounded-l-lg">Everyday Object / Scenario</th>
                    <th className="p-2.5">Speed in km/h</th>
                    <th className="p-2.5">Speed in m/s (SI Unit)</th>
                    <th className="p-2.5 rounded-r-lg">Math Calculation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold">🚶 Human Walking Speed</td>
                    <td className="p-2.5 font-mono">5 km/h</td>
                    <td className="p-2.5 font-mono font-bold text-indigo-700">1.39 m/s</td>
                    <td className="p-2.5 font-mono text-slate-500">5 × 5/18 = 25/18</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold">🚲 Cycling at Leisure</td>
                    <td className="p-2.5 font-mono">18 km/h</td>
                    <td className="p-2.5 font-mono font-bold text-indigo-700">5.00 m/s</td>
                    <td className="p-2.5 font-mono text-slate-500">18 × 5/18 = 5</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-indigo-50/30">
                    <td className="p-2.5 font-bold">🚘 City Traffic Driving</td>
                    <td className="p-2.5 font-mono">36 km/h</td>
                    <td className="p-2.5 font-mono font-extrabold text-indigo-800">10.00 m/s</td>
                    <td className="p-2.5 font-mono text-indigo-600 font-bold">36 × 5/18 = 2 × 5 = 10</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold">🚌 City Bus Speed</td>
                    <td className="p-2.5 font-mono">54 km/h</td>
                    <td className="p-2.5 font-mono font-bold text-indigo-700">15.00 m/s</td>
                    <td className="p-2.5 font-mono text-slate-500">54 × 5/18 = 3 × 5 = 15</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-indigo-50/30">
                    <td className="p-2.5 font-bold">🏎️ Highway Cruising Car</td>
                    <td className="p-2.5 font-mono">72 km/h</td>
                    <td className="p-2.5 font-mono font-extrabold text-indigo-800">20.00 m/s</td>
                    <td className="p-2.5 font-mono text-indigo-600 font-bold">72 × 5/18 = 4 × 5 = 20</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold">🚆 Express Passenger Train</td>
                    <td className="p-2.5 font-mono">108 km/h</td>
                    <td className="p-2.5 font-mono font-bold text-indigo-700">30.00 m/s</td>
                    <td className="p-2.5 font-mono text-slate-500">108 × 5/18 = 6 × 5 = 30</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold">🐆 Sprinting Cheetah</td>
                    <td className="p-2.5 font-mono">120 km/h</td>
                    <td className="p-2.5 font-mono font-bold text-indigo-700">33.33 m/s</td>
                    <td className="p-2.5 font-mono text-slate-500">120 × 5/18 = 100/3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MOTION CLASSIFICATION GAME */}
      {activeTab === "quiz" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          {/* Header Score Tracker */}
          <div className="flex justify-between items-center border-b border-slate-150 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100 font-mono">
                Question {gameIndex + 1} of {gameQuestions.length}
              </span>
              <h3 className="text-base font-extrabold text-slate-800 mt-1">
                Classify the Type of Motion!
              </h3>
            </div>
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-1.5 rounded-xl font-mono text-xs font-black">
              Score: {score} / {gameQuestions.length}
            </div>
          </div>

          {/* Scenario Card */}
          <div className="p-5 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-2xl border border-sky-100 flex items-center gap-4">
            <span className="text-4xl p-3 bg-white rounded-2xl shadow-xs border border-sky-100">{currentQ.icon}</span>
            <div>
              <span className="text-[10px] font-black uppercase text-sky-600 tracking-wider">Everyday Scenario:</span>
              <p className="text-sm font-extrabold text-slate-800 mt-0.5 leading-snug">
                "{currentQ.scenario}"
              </p>
            </div>
          </div>

          {/* Answer Option Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map(opt => {
              const isSelected = selectedAnswer === opt.id;
              const isCorrect = opt.id === currentQ.correct;
              
              let btnStyle = "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100";
              if (showExplanation) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-600 text-white border-emerald-700 shadow-md";
                } else if (isSelected) {
                  btnStyle = "bg-rose-600 text-white border-rose-700";
                } else {
                  btnStyle = "bg-slate-100 text-slate-400 border-slate-200 opacity-60";
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleAnswerClick(opt.id)}
                  disabled={showExplanation}
                  className={`p-4 rounded-xl border text-left text-xs font-extrabold transition-all cursor-pointer flex justify-between items-center ${btnStyle}`}
                >
                  <span>{opt.label}</span>
                  {showExplanation && isCorrect && <span>✅</span>}
                  {showExplanation && isSelected && !isCorrect && <span>❌</span>}
                </button>
              );
            })}
          </div>

          {/* Explanation Box after Answer */}
          {showExplanation && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 animate-fadeIn ${
              selectedAnswer === currentQ.correct ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-rose-50 border-rose-200 text-rose-900"
            }`}>
              <p className="font-extrabold">
                {selectedAnswer === currentQ.correct ? "🎉 Correct Answer!" : "❌ Incorrect Choice!"}
              </p>
              <p>{currentQ.explanation}</p>
              <div className="pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-extrabold hover:bg-slate-800 cursor-pointer shadow-xs"
                >
                  Next Question ➔
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function Grade6TemperatureVisualLab() {
  const [activeTab, setActiveTab] = useState<"sim" | "units" | "scales" | "quiz">("sim");

  // Simulation State
  const [tempCelsius, setTempCelsius] = useState<number>(37);
  const [thermometerType, setThermometerType] = useState<"clinical" | "lab" | "digital">("clinical");

  // Units tab custom converter state
  const [unitInputValue, setUnitInputValue] = useState<number>(37);

  // Parallax Error state
  const [parallaxAngle, setParallaxAngle] = useState<"above" | "level" | "below">("level");

  // Conversions
  const tempFahrenheit = Number(((tempCelsius * 9) / 5 + 32).toFixed(1));
  const tempKelvin = Number((tempCelsius + 273.15).toFixed(1));

  // Limits based on type
  const minTemp = thermometerType === "clinical" ? 35 : -10;
  const maxTemp = thermometerType === "clinical" ? 42 : 110;

  const handleTypeChange = (type: "clinical" | "lab" | "digital") => {
    setThermometerType(type);
    if (type === "clinical") {
      setTempCelsius(37);
    } else if (type === "lab") {
      setTempCelsius(25);
    } else {
      setTempCelsius(37);
    }
  };

  const setPreset = (degC: number) => {
    let clamped = degC;
    if (thermometerType === "clinical") {
      clamped = Math.max(35, Math.min(42, degC));
    } else {
      clamped = Math.max(-10, Math.min(110, degC));
    }
    setTempCelsius(clamped);
  };

  // Quiz State
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showExp, setShowExp] = useState<boolean>(false);

  const questions = [
    {
      q: "What is the normal human body temperature on the Celsius scale?",
      options: ["37°C", "98.6°C", "100°C", "0°C"],
      correct: "37°C",
      exp: "Normal human body temperature is 37°C (which equals 98.6°F or 310.15 K)."
    },
    {
      q: "Which of the following is the official SI unit of temperature?",
      options: ["Degree Celsius (°C)", "Degree Fahrenheit (°F)", "Kelvin (K)", "Joule (J)"],
      correct: "Kelvin (K)",
      exp: "Kelvin (K) is the SI base unit of thermodynamic temperature. Note that Kelvin is written without a degree symbol (°)."
    },
    {
      q: "What is the correct conversion formula from Celsius (°C) to Kelvin (K)?",
      options: ["K = °C + 273.15", "K = (°C × 9/5) + 32", "K = °C - 100", "K = °C ÷ 273.15"],
      correct: "K = °C + 273.15",
      exp: "To convert Celsius to Kelvin, add 273.15 (e.g., 0°C + 273.15 = 273.15 K)."
    },
    {
      q: "Why is a constriction ('kink') present in a clinical thermometer?",
      options: [
        "To make mercury expand faster",
        "To prevent mercury level from falling on its own when removed from mouth",
        "To measure negative temperatures",
        "To make the tube stronger"
      ],
      correct: "To prevent mercury level from falling on its own when removed from mouth",
      exp: "The kink breaks the continuous column of mercury when cooling starts, holding the reading steady until shaken down!"
    },
    {
      q: "What is the boiling point of pure water in Fahrenheit (°F) and Kelvin (K)?",
      options: ["212°F and 373.15 K", "100°F and 273.15 K", "98.6°F and 310.15 K", "32°F and 0 K"],
      correct: "212°F and 373.15 K",
      exp: "Water boils at 100°C, which converts to 212°F [(100 × 9/5) + 32] and 373.15 K (100 + 273.15)."
    },
    {
      q: "What is the standard measurement range of a Laboratory Thermometer?",
      options: ["35°C to 42°C", "-10°C to 110°C", "0°C to 100°F", "20°C to 50°C"],
      correct: "-10°C to 110°C",
      exp: "A laboratory thermometer spans from freezing ice (-10°C) up to boiling water (110°C)."
    }
  ];

  const handleQuizAnswer = (opt: string) => {
    if (showExp) return;
    setSelectedAns(opt);
    setShowExp(true);
    if (opt === questions[quizIdx].correct) {
      setScore(s => s + 1);
    }
  };

  const mercuryHeightPercent = Math.max(5, Math.min(95, ((tempCelsius - minTemp) / (maxTemp - minTemp)) * 90 + 5));

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="g6_temp_lab">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-xs gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black uppercase text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100 font-mono">
              Grade 6 Physics • Chapter 7
            </span>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-100">
              Curiosity Science
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
            🌡️ Temperature, Units & Measurement Studio
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Explore units of temperature (°C, °F, K), live scale conversions, clinical & laboratory thermometers, and precautions!
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-stretch md:self-auto justify-stretch flex-wrap md:flex-nowrap gap-1">
          <button
            onClick={() => setActiveTab("sim")}
            className={`flex-1 md:flex-none px-3 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "sim" ? "bg-white text-rose-700 shadow-xs border border-slate-200" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🎯 1. Thermometer Simulator
          </button>
          <button
            onClick={() => setActiveTab("units")}
            className={`flex-1 md:flex-none px-3 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "units" ? "bg-white text-indigo-700 shadow-xs border border-slate-200" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🌡️ 2. Units of Temperature
          </button>
          <button
            onClick={() => setActiveTab("scales")}
            className={`flex-1 md:flex-none px-3 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "scales" ? "bg-white text-rose-700 shadow-xs border border-slate-200" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            👁️ 3. Parallax Error & Precautions
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex-1 md:flex-none px-3 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "quiz" ? "bg-white text-emerald-700 shadow-xs border border-slate-200" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🎮 4. Temperature Quiz
          </button>
        </div>
      </div>

      {activeTab === "sim" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Controls & Presets (5 cols) */}
          <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div>
              <label className="block text-xs font-black uppercase text-slate-500 tracking-wider mb-2">1. Select Thermometer Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "clinical", label: "Clinical", range: "35°C–42°C", icon: "🩺" },
                  { id: "lab", label: "Laboratory", range: "-10°C–110°C", icon: "🧪" },
                  { id: "digital", label: "Digital", range: "0°C–50°C", icon: "📟" }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => handleTypeChange(t.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                      thermometerType === t.id
                        ? "bg-rose-600 text-white border-rose-700 shadow-xs font-extrabold"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span className="block text-xl">{t.icon}</span>
                    <span className="block text-xs font-bold mt-1">{t.label}</span>
                    <span className={`block text-[9px] ${thermometerType === t.id ? "text-rose-100" : "text-slate-400"}`}>{t.range}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-black uppercase text-slate-600 tracking-wider mb-2">
                <span>2. Adjust Temperature</span>
                <span className="text-rose-600 font-mono text-sm">{tempCelsius}°C</span>
              </div>
              <input
                type="range"
                min={minTemp}
                max={maxTemp}
                step={0.5}
                value={tempCelsius}
                onChange={e => setTempCelsius(Number(e.target.value))}
                className="w-full accent-rose-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1 font-mono">
                <span>Min: {minTemp}°C</span>
                <span>Max: {maxTemp}°C</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <span className="block text-xs font-black uppercase text-slate-500 tracking-wider mb-2">3. Quick Benchmarks</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {thermometerType === "clinical" ? (
                  <>
                    <button onClick={() => setPreset(35.5)} className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 font-bold text-slate-700 text-left cursor-pointer">
                      ❄️ Low Temp (35.5°C)
                    </button>
                    <button onClick={() => setPreset(37)} className="p-2 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 font-extrabold text-emerald-800 text-left cursor-pointer">
                      💚 Normal Body (37.0°C)
                    </button>
                    <button onClick={() => setPreset(38.5)} className="p-2 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 font-extrabold text-amber-800 text-left cursor-pointer">
                      🤒 Mild Fever (38.5°C)
                    </button>
                    <button onClick={() => setPreset(40.5)} className="p-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 font-extrabold text-rose-800 text-left cursor-pointer">
                      🔥 High Fever (40.5°C)
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setPreset(0)} className="p-2 rounded-xl border border-sky-200 bg-sky-50 hover:bg-sky-100 font-extrabold text-sky-800 text-left cursor-pointer">
                      🧊 Freezing Water (0°C)
                    </button>
                    <button onClick={() => setPreset(25)} className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 font-bold text-slate-700 text-left cursor-pointer">
                      🏠 Room Temp (25°C)
                    </button>
                    <button onClick={() => setPreset(37)} className="p-2 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 font-extrabold text-emerald-800 text-left cursor-pointer">
                      💚 Body Temp (37°C)
                    </button>
                    <button onClick={() => setPreset(100)} className="p-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 font-extrabold text-rose-800 text-left cursor-pointer">
                      ♨️ Boiling Water (100°C)
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Scale Conversion Panel */}
            <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 border border-slate-800">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block font-mono">Live Temperature Conversions</span>
              <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                  <span className="text-[9px] text-slate-400 block">Celsius</span>
                  <span className="text-sm font-black text-white">{tempCelsius}°C</span>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                  <span className="text-[9px] text-slate-400 block">Fahrenheit</span>
                  <span className="text-sm font-black text-amber-400">{tempFahrenheit}°F</span>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
                  <span className="text-[9px] text-slate-400 block">Kelvin (SI)</span>
                  <span className="text-sm font-black text-sky-400">{tempKelvin} K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Thermometer Visual Stage (7 cols) */}
          <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-between min-h-[380px]">
            <div className="w-full flex justify-between items-center text-xs">
              <span className="font-extrabold text-slate-800">
                Visualizing: {thermometerType === "clinical" ? "Clinical Glass Thermometer" : thermometerType === "lab" ? "Laboratory Glass Thermometer" : "Digital Thermometer"}
              </span>
              {thermometerType === "clinical" && (
                <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full">
                  ⚡ Features Kink (Constriction)
                </span>
              )}
            </div>

            {/* Thermometer Visual */}
            {thermometerType !== "digital" ? (
              <div className="relative my-4 flex flex-col items-center">
                {/* Scale Capillary Glass Tube */}
                <div className="w-10 h-64 bg-slate-100 border-2 border-slate-300 rounded-t-full relative flex flex-col items-center overflow-hidden shadow-inner">
                  {/* Capillary Inner Bore */}
                  <div className="w-2.5 h-full bg-slate-200/80 relative flex items-end">
                    {/* Mercury Liquid Column */}
                    <div
                      className="w-full bg-gradient-to-t from-rose-600 to-rose-400 transition-all duration-300 rounded-t-sm"
                      style={{ height: `${mercuryHeightPercent}%` }}
                    />
                  </div>

                  {/* Kink Visual if Clinical */}
                  {thermometerType === "clinical" && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-amber-400 rounded border border-amber-600 z-10 text-[7px] font-black text-amber-900 text-center leading-none flex items-center justify-center shadow-xs">
                      KINK
                    </div>
                  )}

                  {/* Tick Marks on Glass */}
                  <div className="absolute top-2 bottom-6 left-1 right-1 flex flex-col justify-between text-[8px] font-mono font-bold text-slate-400 pointer-events-none">
                    <span>{maxTemp}°</span>
                    <span>{((maxTemp + minTemp) / 2).toFixed(0)}°</span>
                    <span>{minTemp}°</span>
                  </div>
                </div>

                {/* Bulb at bottom */}
                <div className="w-14 h-14 bg-rose-600 rounded-full border-2 border-slate-300 -mt-2 shadow-md flex items-center justify-center">
                  <span className="text-white text-[9px] font-black font-mono">BULB</span>
                </div>
              </div>
            ) : (
              /* Digital Thermometer Visual */
              <div className="my-8 w-72 bg-slate-800 p-4 rounded-3xl border-4 border-slate-600 shadow-2xl flex items-center justify-between">
                <div className="w-8 h-8 bg-slate-400 rounded-full border-2 border-slate-300 flex items-center justify-center text-xs font-black text-slate-800 font-mono">
                  SENSOR
                </div>
                {/* LCD Display */}
                <div className="bg-lime-200 border-2 border-slate-900 px-4 py-2 rounded-xl font-mono text-center shadow-inner">
                  <span className="text-2xl font-black text-slate-900">{tempCelsius.toFixed(1)}</span>
                  <span className="text-xs font-bold text-slate-700 ml-1">°C</span>
                </div>
                <div className="w-4 h-4 bg-rose-500 rounded-full border border-white"></div>
              </div>
            )}

            {/* Explanation Note */}
            <div className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              <span className="font-extrabold text-slate-800 block mb-0.5">Key Observation:</span>
              {thermometerType === "clinical" && (
                <p>The clinical thermometer ranges from 35°C to 42°C because human body temperature rarely drops below 35°C or rises above 42°C. The kink prevents mercury from dropping on cooling when taken out of mouth.</p>
              )}
              {thermometerType === "lab" && (
                <p>The laboratory thermometer ranges from -10°C to 110°C to measure freezing ice and boiling liquids. It has NO kink and MUST be read while immersed in the substance!</p>
              )}
              {thermometerType === "digital" && (
                <p>Digital thermometers use an electronic thermistor sensor instead of liquid mercury, completely eliminating mercury toxicity hazards.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: UNITS OF TEMPERATURE INTERACTIVE LAB */}
      {activeTab === "units" && (
        <div className="space-y-6">
          {/* Fundamental Concept Banner: What is Temperature? */}
          <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-rose-950 text-white p-5 rounded-2xl border border-indigo-800 shadow-md space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <h3 className="text-base font-extrabold tracking-tight text-amber-300">
                Core Physics Concept: What is Temperature?
              </h3>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              <strong className="text-white">Temperature</strong> is defined as the quantitative measure of the degree of <strong>hotness or coldness</strong> of a body.
              While our sense of touch can be tricked (feeling subjective warmth or cold), temperature gives an exact numerical value using calibrated scales.
            </p>
            
            {/* Molecular kinetic energy visual indicator */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/15 space-y-1">
                <span className="font-extrabold text-amber-300 block flex items-center gap-1.5">
                  <span>⚛️ Microscopic Meaning:</span>
                </span>
                <p className="text-[11px] text-slate-200">
                  At the atomic level, temperature measures the <strong>average kinetic energy</strong> of moving particles. Hotter objects have rapidly vibrating molecules, while cold objects have slow-moving molecules!
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/15 space-y-1">
                <span className="font-extrabold text-rose-300 block flex items-center gap-1.5">
                  <span>🔥 Heat vs Temperature:</span>
                </span>
                <p className="text-[11px] text-slate-200">
                  <strong>Heat</strong> is the total thermal energy contained in a substance (Joule), whereas <strong>Temperature</strong> is the intensity level of hotness (Measured in °C, °F, or Kelvin K).
                </p>
              </div>
            </div>
          </div>

          {/* Live Unit Converter & Visual Gauges */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100 font-mono">
                  SI & Standard Units of Temperature
                </span>
                <h3 className="text-lg font-extrabold text-slate-800 mt-1">
                  🌡️ Live Temperature Units Converter (°C ↔ °F ↔ K)
                </h3>
              </div>
              <span className="text-xs font-mono font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-lg">
                SI Unit: Kelvin (K)
              </span>
            </div>

            {/* Slider & Presets */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-extrabold text-slate-700">
                <label>Adjust Celsius Temperature (°C):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={-273.15}
                    max={200}
                    value={unitInputValue}
                    onChange={(e) => setUnitInputValue(Number(e.target.value))}
                    className="w-24 px-2 py-1 border border-slate-300 rounded-md text-xs font-mono font-bold text-center"
                  />
                  <span className="text-indigo-600 font-mono font-bold">°C</span>
                </div>
              </div>

              <input
                type="range"
                min={-50}
                max={150}
                step={1}
                value={unitInputValue}
                onChange={(e) => setUnitInputValue(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />

              {/* Presets */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
                  ⚡ Key Benchmark Presets:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => setUnitInputValue(-273.15)}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold border border-indigo-200 cursor-pointer"
                  >
                    🌌 Absolute Zero (-273.15°C / 0 K)
                  </button>
                  <button
                    onClick={() => setUnitInputValue(0)}
                    className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-900 font-bold border border-sky-200 cursor-pointer"
                  >
                    🧊 Freezing Water (0°C)
                  </button>
                  <button
                    onClick={() => setUnitInputValue(25)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold border border-emerald-200 cursor-pointer"
                  >
                    🏠 Room Temp (25°C)
                  </button>
                  <button
                    onClick={() => setUnitInputValue(37)}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-extrabold border border-amber-200 cursor-pointer"
                  >
                    💚 Normal Body (37°C)
                  </button>
                  <button
                    onClick={() => setUnitInputValue(100)}
                    className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold border border-rose-200 cursor-pointer"
                  >
                    ♨️ Boiling Water (100°C)
                  </button>
                </div>
              </div>
            </div>

            {/* Live 3-Unit Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Celsius */}
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-wider text-sky-900">Degree Celsius</span>
                  <span className="text-xs font-mono font-bold text-sky-700 bg-white px-2 py-0.5 rounded border border-sky-200">°C</span>
                </div>
                <div className="text-2xl font-black font-mono text-sky-950">
                  {unitInputValue}°C
                </div>
                <p className="text-[11px] text-sky-800 leading-snug">
                  Invented by Anders Celsius (1742). Water freezes at <strong>0°C</strong> and boils at <strong>100°C</strong>.
                </p>
              </div>

              {/* Fahrenheit */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-900">Degree Fahrenheit</span>
                  <span className="text-xs font-mono font-bold text-amber-700 bg-white px-2 py-0.5 rounded border border-amber-200">°F</span>
                </div>
                <div className="text-2xl font-black font-mono text-amber-950">
                  {Number(((unitInputValue * 9) / 5 + 32).toFixed(2))}°F
                </div>
                <p className="text-[11px] text-amber-800 leading-snug">
                  Formula: <code>°F = (°C × 9/5) + 32</code>. Water freezes at <strong>32°F</strong> and boils at <strong>212°F</strong>.
                </p>
              </div>

              {/* Kelvin */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white border border-indigo-700 p-4 rounded-xl space-y-2 shadow-md">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-300">Kelvin (SI Unit)</span>
                  <span className="text-xs font-mono font-bold text-indigo-900 bg-amber-300 px-2 py-0.5 rounded">K</span>
                </div>
                <div className="text-2xl font-black font-mono text-amber-300">
                  {Number((unitInputValue + 273.15).toFixed(2))} K
                </div>
                <p className="text-[11px] text-indigo-200 leading-snug">
                  Formula: <code>K = °C + 273.15</code>. Official SI unit! Starts at Absolute Zero (<strong>0 K</strong>). Written without degree symbol (°).
                </p>
              </div>
            </div>

            {/* Live Step-by-Step Conversion Worked Math Guide */}
            <div className="bg-slate-900 text-white p-4 rounded-xl border border-indigo-800 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <span className="text-base">🧮</span>
                <h4 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider font-mono">
                  Live Step-by-Step Conversion Math for {unitInputValue}°C
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* C to F Worked Steps */}
                <div className="bg-slate-950 p-3 rounded-lg border border-amber-500/30 space-y-1.5 font-mono">
                  <div className="text-amber-400 font-extrabold flex justify-between">
                    <span>1. Convert {unitInputValue}°C → °F</span>
                    <span className="text-[10px] text-slate-400">F = (C × 1.8) + 32</span>
                  </div>
                  <div className="text-slate-300 text-[11px] space-y-1">
                    <p>• Step 1 (Multiply by 1.8): {unitInputValue} × 1.8 = <strong className="text-amber-300">{(unitInputValue * 1.8).toFixed(2)}</strong></p>
                    <p>• Step 2 (Add 32): {(unitInputValue * 1.8).toFixed(2)} + 32 = <strong className="text-amber-300">{((unitInputValue * 1.8) + 32).toFixed(2)}°F</strong></p>
                  </div>
                </div>

                {/* C to K Worked Steps */}
                <div className="bg-slate-950 p-3 rounded-lg border border-indigo-500/30 space-y-1.5 font-mono">
                  <div className="text-indigo-300 font-extrabold flex justify-between">
                    <span>2. Convert {unitInputValue}°C → Kelvin (K)</span>
                    <span className="text-[10px] text-slate-400">K = C + 273.15</span>
                  </div>
                  <div className="text-slate-300 text-[11px] space-y-1">
                    <p>• Step 1 (Add 273.15): {unitInputValue} + 273.15 = <strong className="text-indigo-300">{(unitInputValue + 273.15).toFixed(2)} K</strong></p>
                    <p className="text-[10px] text-indigo-400 font-sans italic">Note: Kelvin is written without degree symbol (°)!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Units Comparison & Rules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌡️</span>
                <span className="font-extrabold text-slate-800 text-sm">1. Degree Celsius (°C)</span>
              </div>
              <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                <li>Common unit used in everyday weather forecasting & cooking.</li>
                <li>Lower Fixed Point: <strong>0°C</strong> (Melting ice).</li>
                <li>Upper Fixed Point: <strong>100°C</strong> (Boiling water).</li>
                <li>Interval divided into <strong>100 equal degrees</strong>.</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🩺</span>
                <span className="font-extrabold text-slate-800 text-sm">2. Degree Fahrenheit (°F)</span>
              </div>
              <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                <li>Widely used in medicine and clinical fever readings in many regions.</li>
                <li>Freezing Point: <strong>32°F</strong> | Boiling Point: <strong>212°F</strong>.</li>
                <li>Interval divided into <strong>180 equal degrees</strong>.</li>
                <li>Normal body temperature = <strong>98.6°F</strong> (37°C).</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-xl border border-indigo-200 bg-indigo-50/30 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <span className="font-extrabold text-indigo-950 text-sm">3. Kelvin (K - SI Unit)</span>
              </div>
              <ul className="space-y-1.5 text-indigo-900 list-disc list-inside">
                <li><strong>SI Base Unit</strong> of thermodynamic temperature in physics.</li>
                <li>Starts at Absolute Zero (0 K) where particle motion stops.</li>
                <li><strong>No Degree Symbol:</strong> Written as <code>300 K</code>, NOT <code>300 °K</code>.</li>
                <li>Same scale step size as Celsius: 1 K increment = 1 °C increment!</li>
              </ul>
            </div>
          </div>

          {/* Benchmark Temperatures Matrix Table */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
              <span>📊 Universal Benchmark Temperature Comparison Table</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-extrabold uppercase text-[10px]">
                    <th className="p-2.5 rounded-l-lg">Physical Condition / Benchmark</th>
                    <th className="p-2.5">Celsius (°C)</th>
                    <th className="p-2.5">Fahrenheit (°F)</th>
                    <th className="p-2.5 rounded-r-lg text-indigo-700">Kelvin (K - SI Unit)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold">🌌 Absolute Zero (Lowest possible temp)</td>
                    <td className="p-2.5 font-mono text-indigo-700 font-bold">-273.15 °C</td>
                    <td className="p-2.5 font-mono">-459.67 °F</td>
                    <td className="p-2.5 font-mono font-black text-rose-600">0 K</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-sky-50/40">
                    <td className="p-2.5 font-bold">🧊 Freezing Point of Pure Water</td>
                    <td className="p-2.5 font-mono text-sky-800 font-bold">0 °C</td>
                    <td className="p-2.5 font-mono">32 °F</td>
                    <td className="p-2.5 font-mono font-bold text-sky-900">273.15 K</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold">🏠 Comfortable Room Temperature</td>
                    <td className="p-2.5 font-mono">25 °C</td>
                    <td className="p-2.5 font-mono">77 °F</td>
                    <td className="p-2.5 font-mono font-bold text-indigo-700">298.15 K</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-emerald-50/40">
                    <td className="p-2.5 font-bold">💚 Normal Human Body Temperature</td>
                    <td className="p-2.5 font-mono text-emerald-800 font-extrabold">37 °C</td>
                    <td className="p-2.5 font-mono text-emerald-800 font-extrabold">98.6 °F</td>
                    <td className="p-2.5 font-mono text-emerald-900 font-extrabold">310.15 K</td>
                  </tr>
                  <tr className="hover:bg-slate-50 bg-rose-50/40">
                    <td className="p-2.5 font-bold">♨️ Boiling Point of Pure Water</td>
                    <td className="p-2.5 font-mono text-rose-800 font-bold">100 °C</td>
                    <td className="p-2.5 font-mono text-rose-800 font-bold">212 °F</td>
                    <td className="p-2.5 font-mono text-rose-900 font-bold">373.15 K</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "scales" && (
        <div className="space-y-6">
          {/* Parallax Error Interactive Lab Banner */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 font-mono">
                  Grade 6 Physics • Chapter 7 Measurement Skill
                </span>
                <h3 className="text-lg font-extrabold text-slate-800 mt-1">
                  👁️ Interactive Parallax Error Laboratory
                </h3>
              </div>
              <span className="text-xs font-mono font-black text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg">
                Eye Level Principle (90° Perpendicular)
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              <strong>What is Parallax Error?</strong> Parallax error is an apparent shift or error in reading a scale (on a thermometer, ruler, or measuring cylinder) caused when the observer's eye is not positioned directly level and perpendicular to the mark being read.
            </p>

            {/* Interactive Eye Position Selector */}
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-slate-700 block">
                👉 Select Observer's Eye Angle & Line of Sight:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-extrabold">
                <button
                  onClick={() => setParallaxAngle("above")}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    parallaxAngle === "above"
                      ? "bg-rose-50 text-rose-900 border-rose-300 shadow-xs ring-2 ring-rose-400"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👁️↗️</span>
                    <div>
                      <div>Looking from ABOVE</div>
                      <div className="text-[10px] font-normal text-rose-700 mt-0.5">Slanted Top-Down View</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setParallaxAngle("level")}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    parallaxAngle === "level"
                      ? "bg-emerald-50 text-emerald-950 border-emerald-300 shadow-xs ring-2 ring-emerald-500"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👁️➡️</span>
                    <div>
                      <div>✅ Eye Level (Perpendicular)</div>
                      <div className="text-[10px] font-normal text-emerald-700 mt-0.5">Correct 90° Angle View</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setParallaxAngle("below")}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    parallaxAngle === "below"
                      ? "bg-amber-50 text-amber-950 border-amber-300 shadow-xs ring-2 ring-amber-400"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👁️↘️</span>
                    <div>
                      <div>Looking from BELOW</div>
                      <div className="text-[10px] font-normal text-amber-700 mt-0.5">Slanted Bottom-Up View</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Interactive SVG Scale & Ray Demonstration */}
            <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
                  Live Visual Diagram: Line of Sight Projection
                </span>
                <span className={`text-xs font-extrabold font-mono px-3 py-1 rounded-full border ${
                  parallaxAngle === "level" 
                    ? "bg-emerald-900/80 text-emerald-200 border-emerald-500" 
                    : parallaxAngle === "above"
                    ? "bg-rose-900/80 text-rose-200 border-rose-500"
                    : "bg-amber-900/80 text-amber-200 border-amber-500"
                }`}>
                  {parallaxAngle === "level" ? "✅ Zero Error (True 37.0°C)" : parallaxAngle === "above" ? "⚠️ Parallax Error: +1.6°C (Falsely High)" : "⚠️ Parallax Error: -1.6°C (Falsely Low)"}
                </span>
              </div>

              <div className="flex justify-center items-center py-2">
                <svg viewBox="0 0 500 240" className="w-full max-w-lg h-auto overflow-visible select-none">
                  {/* Background Glass Scale */}
                  <rect x="220" y="20" width="60" height="200" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  
                  {/* Scale Graduations */}
                  {[
                    { val: "39°C", y: 40 },
                    { val: "38.5°C", y: 60 },
                    { val: "38°C", y: 80 },
                    { val: "37.5°C", y: 100 },
                    { val: "37°C (True)", y: 120, bold: true },
                    { val: "36.5°C", y: 140 },
                    { val: "36°C", y: 160 },
                    { val: "35.5°C", y: 180 },
                    { val: "35°C", y: 200 }
                  ].map((tick) => (
                    <g key={tick.val}>
                      <line x1="220" y1={tick.y} x2="235" y2={tick.y} stroke={tick.bold ? "#10b981" : "#94a3b8"} strokeWidth={tick.bold ? "2.5" : "1"} />
                      <text x="210" y={tick.y + 4} fill={tick.bold ? "#34d399" : "#cbd5e1"} fontSize={tick.bold ? "11" : "9"} fontFamily="monospace" fontWeight={tick.bold ? "bold" : "normal"} textAnchor="end">
                        {tick.val}
                      </text>
                    </g>
                  ))}

                  {/* Red Mercury Column in Capillary */}
                  <rect x="245" y="120" width="10" height="95" fill="#f43f5e" rx="2" />
                  <circle cx="250" cy="120" r="5" fill="#f43f5e" />

                  {/* Observer Eye Position & Ray Line */}
                  {parallaxAngle === "above" && (
                    <g className="transition-all duration-300">
                      {/* Eye Icon at Top */}
                      <text x="60" y="50" fontSize="28">👁️</text>
                      <text x="50" y="75" fill="#f43f5e" fontSize="10" fontFamily="monospace" fontWeight="bold">Observer Eye (Above)</text>

                      {/* Slanted Ray through Meniscus onto Scale */}
                      <line x1="85" y1="50" x2="250" y2="120" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,4" />
                      <line x1="250" y1="120" x2="280" y2="60" stroke="#f43f5e" strokeWidth="2.5" />
                      <polygon points="280,60 270,68 275,75" fill="#f43f5e" />

                      {/* False Reading Highlight Box */}
                      <rect x="285" y="48" width="110" height="24" rx="4" fill="#881337" stroke="#f43f5e" strokeWidth="1.5" />
                      <text x="290" y="64" fill="#fecdd3" fontSize="11" fontFamily="monospace" fontWeight="bold">Apparent: 38.6°C</text>
                    </g>
                  )}

                  {parallaxAngle === "level" && (
                    <g className="transition-all duration-300">
                      {/* Eye Icon at Exact Level */}
                      <text x="60" y="125" fontSize="28">👁️</text>
                      <text x="45" y="150" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold">Eye Level (90° View)</text>

                      {/* Straight Perpendicular Ray */}
                      <line x1="85" y1="120" x2="250" y2="120" stroke="#10b981" strokeWidth="3" />
                      <circle cx="250" cy="120" r="7" fill="none" stroke="#34d399" strokeWidth="2" />

                      {/* True Reading Highlight Box */}
                      <rect x="285" y="108" width="125" height="24" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                      <text x="290" y="124" fill="#a7f3d0" fontSize="11" fontFamily="monospace" fontWeight="bold">Exact True: 37.0°C</text>
                    </g>
                  )}

                  {parallaxAngle === "below" && (
                    <g className="transition-all duration-300">
                      {/* Eye Icon at Bottom */}
                      <text x="60" y="200" fontSize="28">👁️</text>
                      <text x="50" y="222" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">Observer Eye (Below)</text>

                      {/* Slanted Ray through Meniscus onto Scale */}
                      <line x1="85" y1="195" x2="250" y2="120" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4,4" />
                      <line x1="250" y1="120" x2="280" y2="180" stroke="#fbbf24" strokeWidth="2.5" />
                      <polygon points="280,180 275,165 270,172" fill="#fbbf24" />

                      {/* False Reading Highlight Box */}
                      <rect x="285" y="168" width="110" height="24" rx="4" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
                      <text x="290" y="184" fill="#fef3c7" fontSize="11" fontFamily="monospace" fontWeight="bold">Apparent: 35.4°C</text>
                    </g>
                  )}
                </svg>
              </div>

              {/* Explanatory Message Box */}
              <div className={`p-3.5 rounded-xl border text-xs leading-snug space-y-1 ${
                parallaxAngle === "level"
                  ? "bg-emerald-950/60 text-emerald-200 border-emerald-800"
                  : parallaxAngle === "above"
                  ? "bg-rose-950/60 text-rose-200 border-rose-800"
                  : "bg-amber-950/60 text-amber-200 border-amber-800"
              }`}>
                <div className="font-extrabold flex items-center gap-1.5 text-sm">
                  <span>{parallaxAngle === "level" ? "🎯 Perfect Measurement Technique!" : "⚠️ Parallax Distortion Active!"}</span>
                </div>
                <p>
                  {parallaxAngle === "level" && "When your line of sight is strictly horizontal and perpendicular (at 90°) to the mercury column, there is zero parallax displacement. You record the true value of 37.0°C."}
                  {parallaxAngle === "above" && "Because you are viewing from above, your line of sight cuts through the glass tube at a downward slant and strikes the printed scale HIGHER than the liquid top. You falsely record 38.6°C (+1.6°C error)!"}
                  {parallaxAngle === "below" && "Because you are viewing from below, your line of sight cuts through the glass tube at an upward slant and strikes the printed scale LOWER than the liquid top. You falsely record 35.4°C (-1.6°C error)!"}
                </p>
              </div>
            </div>
          </div>

          {/* Scale Summary & Thermometer Handling Precautions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 shadow-xs">
              <span className="font-extrabold text-slate-800 text-sm block flex items-center gap-1.5">
                <span>📐 1. Golden Rules to Avoid Parallax Error</span>
              </span>
              <ul className="space-y-2 list-disc list-inside text-slate-700">
                <li>
                  <strong>Direct Perpendicular View:</strong> Keep your eye at the exact horizontal level of the top of the liquid column.
                </li>
                <li>
                  <strong>Line of Sight Angle:</strong> Ensure your line of sight forms a right angle (90°) with the measuring scale.
                </li>
                <li>
                  <strong>Meniscus Rule:</strong>
                  <ul className="pl-5 mt-1 space-y-1 list-square text-[11px] text-slate-600">
                    <li>For <strong>Mercury</strong> (convex curve): Read the upper convex crest.</li>
                    <li>For <strong>Water / Alcohol</strong> (concave curve): Read the lowest point of the concave dip.</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 shadow-xs">
              <span className="font-extrabold text-slate-800 text-sm block flex items-center gap-1.5">
                <span>🩺 2. Thermometer Handling Precautions</span>
              </span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-700">
                <li>Wash with antiseptic liquid before & after every clinical measurement.</li>
                <li>Ensure mercury is shaken down below <strong>35°C</strong> before taking body temperature.</li>
                <li>Do <strong>NOT</strong> hold the thermometer by its glass bulb while reading or holding it.</li>
                <li>Read the thermometer while holding it horizontally in front of your eyes.</li>
                <li>Handle glass with extreme care; mercury is toxic if glass breaks.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === "quiz" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-xs font-black uppercase text-rose-600 font-mono">Question {quizIdx + 1} of {questions.length}</span>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">Score: {score} / {questions.length}</span>
          </div>

          <p className="text-sm font-extrabold text-slate-800">{questions[quizIdx].q}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {questions[quizIdx].options.map(opt => (
              <button
                key={opt}
                onClick={() => handleQuizAnswer(opt)}
                disabled={showExp}
                className={`p-3.5 rounded-xl border text-left text-xs font-extrabold transition cursor-pointer ${
                  showExp
                    ? opt === questions[quizIdx].correct
                      ? "bg-emerald-600 text-white border-emerald-700"
                      : opt === selectedAns
                      ? "bg-rose-600 text-white border-rose-700"
                      : "bg-slate-100 text-slate-400 border-slate-200"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {showExp && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${selectedAns === questions[quizIdx].correct ? "bg-emerald-50 text-emerald-900 border-emerald-200" : "bg-rose-50 text-rose-900 border-rose-200"}`}>
              <p className="font-extrabold">{selectedAns === questions[quizIdx].correct ? "✅ Correct!" : "❌ Incorrect!"}</p>
              <p>{questions[quizIdx].exp}</p>
              <button
                onClick={() => {
                  setSelectedAns(null);
                  setShowExp(false);
                  setQuizIdx(i => (i + 1) % questions.length);
                }}
                className="mt-2 px-4 py-1.5 bg-slate-900 text-white font-extrabold rounded-lg text-xs cursor-pointer"
              >
                Next Question ➔
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function Grade6BeyondEarthVisualLab() {
  const [activeTab, setActiveTab] = useState<"solar" | "moon" | "quiz">("solar");

  // Solar System State
  const [selectedPlanet, setSelectedPlanet] = useState<string>("earth");
  const [orbitSpeed, setOrbitSpeed] = useState<number>(1);
  const [simTime, setSimTime] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Moon Phase State
  const [moonPhaseIdx, setMoonPhaseIdx] = useState<number>(4); // 4 = Full Moon

  // Solar animation loop
  useEffect(() => {
    let anim: number;
    if (!isPaused) {
      let last = Date.now();
      const tick = () => {
        const now = Date.now();
        setSimTime(p => p + ((now - last) / 1000) * orbitSpeed);
        last = now;
        anim = requestAnimationFrame(tick);
      };
      anim = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(anim);
  }, [isPaused, orbitSpeed]);

  const planetsData = [
    { id: "mercury", name: "Mercury 🔴", color: "bg-slate-400", size: "w-3 h-3", dist: 22, speed: 4.1, period: "88 days", type: "Inner Rocky", facts: "Closest planet to the Sun! Has extreme temperatures from 430°C in day to -180°C at night." },
    { id: "venus", name: "Venus 🟡", color: "bg-amber-300", size: "w-4 h-4", dist: 32, speed: 1.6, period: "225 days", type: "Inner Rocky", facts: "Hottest planet in the Solar System due to dense carbon dioxide greenhouse atmosphere (~465°C)." },
    { id: "earth", name: "Earth 🌍", color: "bg-sky-500", size: "w-5 h-5", dist: 44, speed: 1.0, period: "365.25 days", type: "Inner Rocky", facts: "Our home planet! Only known planet with liquid oceans, oxygen atmosphere, and life." },
    { id: "mars", name: "Mars 🔴", color: "bg-rose-500", size: "w-4 h-4", dist: 56, speed: 0.5, period: "687 days", type: "Inner Rocky", facts: "Known as the Red Planet due to iron oxide rust dust on its surface. Home to Olympus Mons volcano." },
    { id: "jupiter", name: "Jupiter 🟠", color: "bg-amber-600", size: "w-8 h-8", dist: 70, speed: 0.2, period: "12 years", type: "Outer Gas Giant", facts: "Largest planet in the Solar System! Great Red Spot is a giant storm larger than Earth." },
    { id: "saturn", name: "Saturn 🪐", color: "bg-yellow-500", size: "w-7 h-7", dist: 82, speed: 0.1, period: "29.5 years", type: "Outer Gas Giant", facts: "Famous for its spectacular, wide planetary rings composed of ice, dust, and rock chunks." },
    { id: "uranus", name: "Uranus 🟢", color: "bg-cyan-400", size: "w-5 h-5", dist: 92, speed: 0.05, period: "84 years", type: "Outer Ice Giant", facts: "An ice giant that rotates completely on its side with an axial tilt of 98 degrees!" },
    { id: "neptune", name: "Neptune 🔵", color: "bg-indigo-600", size: "w-5 h-5", dist: 102, speed: 0.03, period: "165 years", type: "Outer Ice Giant", facts: "Farthest known planet from the Sun with supersonic winds reaching over 2,000 km/h." }
  ];

  const moonPhases = [
    { name: "New Moon (Amavasya)", icon: "🌑", illuminated: "0%", desc: "Moon is between Earth and Sun. Its dark side faces Earth so it is not visible." },
    { name: "Waxing Crescent", icon: "🌒", illuminated: "25%", desc: "A thin silver crescent appears on the right side as illuminated fraction grows." },
    { name: "First Quarter", icon: "🌓", illuminated: "50%", desc: "Half of the Moon's disk is illuminated on the right side." },
    { name: "Waxing Gibbous", icon: "🌔", illuminated: "75%", desc: "More than half of the Moon is illuminated as it approaches Full Moon." },
    { name: "Full Moon (Poornima)", icon: "🌕", illuminated: "100%", desc: "Earth is between Sun and Moon. The entire visible disk glows brightly!" },
    { name: "Waning Gibbous", icon: "🌖", illuminated: "75%", desc: "The illuminated portion begins to decrease ('waning') on the right side." },
    { name: "Third Quarter", icon: "🌗", illuminated: "50%", desc: "Half of the Moon's disk is illuminated on the left side." },
    { name: "Waning Crescent", icon: "🌘", illuminated: "25%", desc: "A thin crescent remains on the left side before returning to New Moon." }
  ];

  const selectedPlanetInfo = planetsData.find(p => p.id === selectedPlanet) || planetsData[2];

  // Quiz State
  const [qIdx, setQIdx] = useState<number>(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showExp, setShowExp] = useState<boolean>(false);

  const questions = [
    {
      q: "What motion of the Earth causes Day and Night?",
      options: ["Rotation on its axis (24 hours)", "Revolution around the Sun (365 days)", "Precession", "Lunar orbit"],
      correct: "Rotation on its axis (24 hours)",
      exp: "Earth's rotation on its axis once every 24 hours causes day for the side facing the Sun and night for the other."
    },
    {
      q: "Which planet is known as the 'Red Planet'?",
      options: ["Venus", "Mars", "Jupiter", "Mercury"],
      correct: "Mars",
      exp: "Mars looks red because its surface soil contains abundant iron oxide (rust) dust!"
    },
    {
      q: "Why does the Moon show changing phases in the night sky?",
      options: [
        "The Moon produces its own light that changes color",
        "The Moon reflects sunlight as it orbits around Earth",
        "Clouds block the Moon differently every night",
        "The Earth casts a shadow on the Moon every night"
      ],
      correct: "The Moon reflects sunlight as it orbits around Earth",
      exp: "The Moon is non-luminous and reflects sunlight. As it orbits Earth, different fractions of its illuminated half face us!"
    },
    {
      q: "Which constellation is also known as 'Saptarishi' or Great Bear?",
      options: ["Orion", "Ursa Major", "Cassiopeia", "Leo"],
      correct: "Ursa Major",
      exp: "Ursa Major contains seven prominent stars forming a ladle shape, called Saptarishi in India."
    }
  ];

  const handleQuizAnswer = (opt: string) => {
    if (showExp) return;
    setSelectedAns(opt);
    setShowExp(true);
    if (opt === questions[qIdx].correct) {
      setScore(s => s + 1);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="g6_beyond_earth_lab">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-xs gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black uppercase text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100 font-mono">
              Grade 6 Physics • Chapter 12
            </span>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-100">
              Curiosity Astronomy
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
            🪐 Beyond Earth: Solar System & Moon Phases Studio
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Explore planet orbits, Earth rotation & day/night cycle, Moon phases, and stargazing constellations!
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-stretch md:self-auto justify-stretch">
          <button
            onClick={() => setActiveTab("solar")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "solar" ? "bg-white text-indigo-700 shadow-xs border border-slate-200" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🪐 1. Solar System
          </button>
          <button
            onClick={() => setActiveTab("moon")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "moon" ? "bg-white text-indigo-700 shadow-xs border border-slate-200" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🌕 2. Moon Phases
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "quiz" ? "bg-white text-emerald-700 shadow-xs border border-slate-200" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🎮 3. Space Quiz
          </button>
        </div>
      </div>

      {activeTab === "solar" && (
        <div className="space-y-6">
          {/* Simulation Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <span>Orbit Speed:</span>
              {[1, 2, 5].map(sp => (
                <button
                  key={sp}
                  onClick={() => setOrbitSpeed(sp)}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold font-mono border cursor-pointer ${
                    orbitSpeed === sp ? "bg-indigo-600 text-white border-indigo-700" : "bg-slate-100 text-slate-600 border-slate-200"
                  }`}
                >
                  {sp}x
                </button>
              ))}
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="ml-2 px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 cursor-pointer"
              >
                {isPaused ? "▶️ Resume" : "⏸️ Pause"}
              </button>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {planetsData.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlanet(p.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition border cursor-pointer ${
                    selectedPlanet === p.id
                      ? "bg-indigo-600 text-white border-indigo-700 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {p.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Orrery Visual Canvas */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 h-80 relative flex items-center justify-center overflow-hidden shadow-2xl">
            {/* Stars background */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Central Sun */}
            <div className="w-14 h-14 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 rounded-full shadow-[0_0_50px_rgba(251,191,36,0.8)] z-10 flex items-center justify-center border-2 border-amber-200 animate-pulse">
              <span className="text-[10px] font-black text-amber-950 uppercase font-mono">SUN</span>
            </div>

            {/* Planet Orbits */}
            {planetsData.map(p => {
              const angle = simTime * p.speed * 0.5;
              const x = Math.cos(angle) * (p.dist * 1.3);
              const y = Math.sin(angle) * (p.dist * 0.7);
              const isSelected = p.id === selectedPlanet;

              return (
                <React.Fragment key={p.id}>
                  {/* Dotted Orbit Path */}
                  <div
                    className="absolute rounded-full border border-dashed border-slate-800 pointer-events-none"
                    style={{
                      width: `${p.dist * 2.6}px`,
                      height: `${p.dist * 1.4}px`
                    }}
                  />

                  {/* Planet Body */}
                  <div
                    onClick={() => setSelectedPlanet(p.id)}
                    className={`absolute flex flex-col items-center justify-center cursor-pointer transition-transform duration-75 z-20 ${
                      isSelected ? "scale-125 z-30" : "hover:scale-110"
                    }`}
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                  >
                    <div className={`${p.size} ${p.color} rounded-full border border-white/80 shadow-lg ${isSelected ? "ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-950" : ""}`} />
                    <span className="text-[8px] font-extrabold text-slate-300 bg-slate-900/90 px-1.5 rounded border border-slate-800 mt-1 whitespace-nowrap">
                      {p.name.split(" ")[0]}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Selected Planet Info Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 font-mono">
                {selectedPlanetInfo.type}
              </span>
              <h3 className="text-base font-extrabold text-slate-800 mt-1">{selectedPlanetInfo.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">Orbital Period: <strong>{selectedPlanetInfo.period}</strong></p>
            </div>
            <div className="md:col-span-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600">
              <span className="font-extrabold text-slate-800 block mb-1">Key Scientific Facts:</span>
              <p>{selectedPlanetInfo.facts}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "moon" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-800">🌕 Phases of the Moon Simulator</h3>
              <p className="text-xs text-slate-500">The Moon orbits Earth every ~29.5 days. Select a phase to see how sunlight illuminates its surface!</p>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              Cycle: 29.5 Days
            </span>
          </div>

          {/* Moon Phase Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {moonPhases.map((phase, idx) => (
              <button
                key={phase.name}
                onClick={() => setMoonPhaseIdx(idx)}
                className={`p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-between gap-1 ${
                  moonPhaseIdx === idx
                    ? "bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-300"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span className="text-3xl">{phase.icon}</span>
                <span className="text-[10px] font-extrabold leading-tight">{phase.name.split(" ")[0]}</span>
                <span className={`text-[8px] font-mono ${moonPhaseIdx === idx ? "text-indigo-200" : "text-slate-400"}`}>{phase.illuminated}</span>
              </button>
            ))}
          </div>

          {/* Active Moon Phase Card */}
          <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-7xl filter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">{moonPhases[moonPhaseIdx].icon}</span>
              <span className="text-sm font-black text-amber-300 mt-2">{moonPhases[moonPhaseIdx].name}</span>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">Illuminated Fraction: {moonPhases[moonPhaseIdx].illuminated}</span>
            </div>
            <div className="md:col-span-8 space-y-3 text-xs">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider block font-mono">Phase Explanation</span>
              <p className="text-slate-300 leading-relaxed text-sm font-medium">{moonPhases[moonPhaseIdx].desc}</p>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-300">
                <strong className="text-amber-300">NCERT Concept:</strong> The Moon does not produce its own light. We only see the part of the Moon that reflects light from the Sun towards Earth.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "quiz" && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-xs font-black uppercase text-indigo-600 font-mono">Question {qIdx + 1} of {questions.length}</span>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">Score: {score} / {questions.length}</span>
          </div>

          <p className="text-sm font-extrabold text-slate-800">{questions[qIdx].q}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {questions[qIdx].options.map(opt => (
              <button
                key={opt}
                onClick={() => handleQuizAnswer(opt)}
                disabled={showExp}
                className={`p-3.5 rounded-xl border text-left text-xs font-extrabold transition cursor-pointer ${
                  showExp
                    ? opt === questions[qIdx].correct
                      ? "bg-emerald-600 text-white border-emerald-700"
                      : opt === selectedAns
                      ? "bg-rose-600 text-white border-rose-700"
                      : "bg-slate-100 text-slate-400 border-slate-200"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {showExp && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${selectedAns === questions[qIdx].correct ? "bg-emerald-50 text-emerald-900 border-emerald-200" : "bg-rose-50 text-rose-900 border-rose-200"}`}>
              <p className="font-extrabold">{selectedAns === questions[qIdx].correct ? "✅ Correct!" : "❌ Incorrect!"}</p>
              <p>{questions[qIdx].exp}</p>
              <button
                onClick={() => {
                  setSelectedAns(null);
                  setShowExp(false);
                  setQIdx(i => (i + 1) % questions.length);
                }}
                className="mt-2 px-4 py-1.5 bg-slate-900 text-white font-extrabold rounded-lg text-xs cursor-pointer"
              >
                Next Question ➔
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function PhysicsVisualLab({ chapterId }: { chapterId?: string }) {
  // Check if Grade 6 Motion
  if (chapterId === "g6_phys_motion" || chapterId === "motion" || chapterId?.includes("g6_phys_motion")) {
    return <Grade6MotionVisualLab />;
  }

  // Check if Grade 6 Temperature
  if (chapterId === "g6_phys_temp" || chapterId?.includes("temp")) {
    return <Grade6TemperatureVisualLab />;
  }

  // Check if Grade 6 Beyond Earth
  if (chapterId === "g6_phys_beyond_earth" || chapterId?.includes("beyond_earth") || chapterId?.includes("earth")) {
    return <Grade6BeyondEarthVisualLab />;
  }

  // Grade 6 Electricity states
  const [circuitClosed, setCircuitClosed] = useState<boolean>(true);
  const [testMaterial, setTestMaterial] = useState<"copper" | "iron" | "wood" | "rubber">("copper");
  
  // Grade 6 Magnet states
  const [magnetPair, setMagnetPair] = useState<"NS" | "NN" | "SS">("NS");
  const [selectedItem, setSelectedItem] = useState<"iron" | "steel" | "wood" | "gold">("iron");

  // Grade 6 Light states
  const [lightDistance, setLightDistance] = useState<number>(30);
  const [materialType, setMaterialType] = useState<"opaque" | "translucent" | "transparent">("opaque");

  // Default / Motion states
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

  // Grade 6 Electricity Lab
  if (chapterId === "g6_phys_electricity") {
    const isConductor = testMaterial === "copper" || testMaterial === "iron";
    const bulbGlows = circuitClosed && isConductor;

    return (
      <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="g6_electricity_lab">
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
          <div>
            <h3 className="font-extrabold text-base text-slate-800">⚡ Electric Circuit & Conductor Tester Lab</h3>
            <p className="text-xs text-slate-500">Toggle switch, test conductors vs insulators, and see how electric current flows in a closed loop!</p>
          </div>
          <span className="text-[10px] font-bold text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1 rounded-full uppercase font-mono">Circuit Studio</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-150 space-y-5 shadow-xs">
            <div>
              <label className="block text-xs font-black uppercase text-slate-600 tracking-wider mb-2">1. Circuit Switch</label>
              <button
                onClick={() => setCircuitClosed(!circuitClosed)}
                className={`w-full py-3 px-4 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                  circuitClosed 
                    ? "bg-emerald-600 text-white border-emerald-700 shadow-sm" 
                    : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                }`}
              >
                {circuitClosed ? "🟢 Switch is CLOSED (ON)" : "🔴 Switch is OPEN (OFF)"}
              </button>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-600 tracking-wider mb-2">2. Test Material in Gap</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "copper", label: "Copper Wire", icon: "🪙", type: "Conductor" },
                  { id: "iron", label: "Iron Nail", icon: "🔩", type: "Conductor" },
                  { id: "wood", label: "Wood Stick", icon: "🪵", type: "Insulator" },
                  { id: "rubber", label: "Rubber Band", icon: "🛞", type: "Insulator" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTestMaterial(item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      testMaterial === item.id 
                        ? "bg-violet-50 border-violet-300 text-violet-900 font-extrabold shadow-xs" 
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="block text-lg">{item.icon}</span>
                    <span className="block text-xs font-bold">{item.label}</span>
                    <span className={`block text-[9px] font-semibold ${item.type === "Conductor" ? "text-emerald-600" : "text-amber-600"}`}>{item.type}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-150 flex flex-col justify-between shadow-xs">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Live Circuit Diagram & Current Simulation</span>

            <div className="my-6 p-6 bg-slate-900 rounded-2xl relative flex flex-col items-center justify-center min-h-[220px] overflow-hidden">
              <div className="relative mb-6 flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  bulbGlows 
                    ? "bg-yellow-300 shadow-[0_0_50px_rgba(253,224,71,0.9)] border-4 border-amber-400 animate-pulse" 
                    : "bg-slate-800 border-2 border-slate-700 text-slate-500"
                }`}>
                  <span className="text-4xl">💡</span>
                </div>
                <span className={`mt-2 text-xs font-extrabold font-mono ${bulbGlows ? "text-yellow-300" : "text-slate-500"}`}>
                  {bulbGlows ? "BULB GLOWING! ⚡" : circuitClosed ? "NO CURRENT (INSULATOR)" : "CIRCUIT BROKEN (OFF)"}
                </span>
              </div>

              <div className="w-full max-w-md flex justify-between items-center border-t-2 border-dashed border-sky-400 pt-4 px-4">
                <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-center">
                  <span className="text-xl">🔋</span>
                  <span className="block text-[9px] font-bold text-sky-400 font-mono">1.5V Cell (+ / -)</span>
                </div>

                <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-center">
                  <span className="text-xl">{testMaterial === "copper" ? "🪙" : testMaterial === "iron" ? "🔩" : testMaterial === "wood" ? "🪵" : "🛞"}</span>
                  <span className="block text-[9px] font-bold text-slate-300 capitalize">{testMaterial}</span>
                </div>

                <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-center">
                  <span className="text-xl">{circuitClosed ? "🔌" : "✂️"}</span>
                  <span className="block text-[9px] font-bold text-emerald-400">{circuitClosed ? "Switch ON" : "Switch OFF"}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-violet-50 rounded-xl border border-violet-100 flex items-center justify-between text-xs">
              <span className="font-extrabold text-violet-900">Current Flow Result:</span>
              <span className={`font-black font-mono ${bulbGlows ? "text-emerald-600" : "text-rose-600"}`}>
                {bulbGlows ? "Closed Loop Active! Current flowing from + to - terminal." : "Incomplete Circuit! Electricity cannot complete the loop."}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grade 6 Magnets Lab
  if (chapterId === "g6_phys_magnets") {
    const isAttracting = magnetPair === "NS";
    const isMagneticItem = selectedItem === "iron" || selectedItem === "steel";

    return (
      <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="g6_magnets_lab">
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
          <div>
            <h3 className="font-extrabold text-base text-slate-800">🧲 Magnet Poles & Compass Simulation Lab</h3>
            <p className="text-xs text-slate-500">Test attraction vs repulsion of magnetic poles, compass orientation, and magnetic materials!</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase font-mono">Magnet Sandbox</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-150 space-y-5 shadow-xs">
            <div>
              <label className="block text-xs font-black uppercase text-slate-600 tracking-wider mb-2">1. Test Pole Combination</label>
              <div className="flex flex-col gap-2">
                {[
                  { id: "NS", label: "North & South (N ↔ S)", effect: "Unlike Poles Attract!" },
                  { id: "NN", label: "North & North (N ↔ N)", effect: "Like Poles Repel!" },
                  { id: "SS", label: "South & South (S ↔ S)", effect: "Like Poles Repel!" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setMagnetPair(item.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                      magnetPair === item.id 
                        ? "bg-emerald-500 text-white border-emerald-600 font-extrabold shadow-xs" 
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span className="block text-xs">{item.label}</span>
                    <span className={`block text-[9px] ${magnetPair === item.id ? "text-emerald-100" : "text-emerald-600 font-bold"}`}>{item.effect}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-600 tracking-wider mb-2">2. Test Object Attraction</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "iron", label: "Iron Nail", icon: "🔩", isMag: true },
                  { id: "steel", label: "Steel Clip", icon: "📎", isMag: true },
                  { id: "wood", label: "Wood Block", icon: "🪵", isMag: false },
                  { id: "gold", label: "Gold Ring", icon: "💍", isMag: false }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                      selectedItem === item.id 
                        ? "bg-sky-50 border-sky-300 text-sky-900 font-extrabold" 
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-base mr-1">{item.icon}</span>
                    <span className="text-xs">{item.label}</span>
                    <span className={`block text-[8px] font-bold ${item.isMag ? "text-emerald-600" : "text-slate-400"}`}>{item.isMag ? "Magnetic" : "Non-Magnetic"}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-150 flex flex-col justify-between shadow-xs">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Visual Magnet Force Field</span>

            <div className="my-4 p-6 bg-slate-900 rounded-2xl flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden">
              <div className={`flex items-center gap-8 transition-all duration-300 ${isAttracting ? "gap-2" : "gap-16"}`}>
                <div className="flex rounded-lg overflow-hidden border-2 border-white shadow-lg">
                  <div className="bg-rose-600 text-white font-black text-xs px-4 py-3 flex items-center justify-center font-mono">N</div>
                  <div className="bg-sky-600 text-white font-black text-xs px-4 py-3 flex items-center justify-center font-mono">S</div>
                </div>

                <div className="text-2xl animate-bounce">
                  {isAttracting ? "🧲 💖 🧲" : "💥 🚫 💥"}
                </div>

                <div className="flex rounded-lg overflow-hidden border-2 border-white shadow-lg">
                  <div className={`font-black text-xs px-4 py-3 flex items-center justify-center font-mono ${
                    magnetPair.endsWith("S") ? "bg-sky-600 text-white" : "bg-rose-600 text-white"
                  }`}>
                    {magnetPair.endsWith("S") ? "S" : "N"}
                  </div>
                  <div className={`font-black text-xs px-4 py-3 flex items-center justify-center font-mono ${
                    magnetPair.endsWith("S") ? "bg-rose-600 text-white" : "bg-sky-600 text-white"
                  }`}>
                    {magnetPair.endsWith("S") ? "N" : "S"}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center flex items-center gap-3">
                <span className="text-2xl">{selectedItem === "iron" ? "🔩" : selectedItem === "steel" ? "📎" : selectedItem === "wood" ? "🪵" : "💍"}</span>
                <div className="text-left">
                  <h5 className="text-xs font-extrabold text-white capitalize">{selectedItem} Test</h5>
                  <p className={`text-[10px] font-bold ${isMagneticItem ? "text-emerald-400" : "text-amber-400"}`}>
                    {isMagneticItem ? "ATTRACTED! Sticks tightly to the magnetic pole." : "NOT ATTRACTED! Non-magnetic material ignores magnetic force."}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
              <span className="font-extrabold text-emerald-900">Law of Magnetic Poles:</span>
              <span className="font-black text-emerald-700 font-mono">
                {isAttracting ? "Opposite Poles (N - S) Attract!" : "Identical Poles (N-N / S-S) Repel Each Other!"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grade 6 Light, Shadows & Reflection Lab
  if (chapterId === "g6_phys_light") {
    const shadowSize = Math.max(20, Math.round(100 - lightDistance * 1.5));

    return (
      <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="g6_light_lab">
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
          <div>
            <h3 className="font-extrabold text-base text-slate-800">💡 Light, Shadow & Reflection Simulator</h3>
            <p className="text-xs text-slate-500">Adjust light source distance, toggle object transparency, and observe shadow formation!</p>
          </div>
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full uppercase font-mono">Optics Studio</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-150 space-y-5 shadow-xs">
            <div>
              <div className="flex justify-between text-xs font-black uppercase text-slate-600 tracking-wider mb-2">
                <span>1. Distance to Light Torch</span>
                <span className="text-amber-600 font-mono">{lightDistance} cm</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                value={lightDistance}
                onChange={(e) => setLightDistance(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-slate-100 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[8px] font-bold text-slate-400 mt-1">
                <span>10 cm (Close = Huge Shadow)</span>
                <span>60 cm (Far = Small Shadow)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-600 tracking-wider mb-2">2. Material Type</label>
              <div className="flex flex-col gap-2">
                {[
                  { id: "opaque", label: "Opaque (Wooden Box)", desc: "Blocks all light ➔ Dark Shadow!" },
                  { id: "translucent", label: "Translucent (Tracing Paper)", desc: "Passes partial light ➔ Faint Shadow!" },
                  { id: "transparent", label: "Transparent (Clear Glass)", desc: "Passes full light ➔ No Shadow!" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setMaterialType(item.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                      materialType === item.id 
                        ? "bg-amber-500 text-white border-amber-600 font-extrabold shadow-xs" 
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span className="block text-xs">{item.label}</span>
                    <span className={`block text-[9px] ${materialType === item.id ? "text-amber-100" : "text-slate-400"}`}>{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-150 flex flex-col justify-between shadow-xs">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Live Shadow Projection Screen</span>

            <div className="my-4 p-6 bg-slate-900 rounded-2xl flex items-center justify-between min-h-[200px] relative overflow-hidden">
              <div className="flex flex-col items-center">
                <span className="text-4xl animate-pulse">🔦</span>
                <span className="text-[9px] font-bold text-amber-300 font-mono mt-1">Torch Light</span>
              </div>

              <div className="flex-1 h-12 bg-gradient-to-r from-yellow-300/60 via-yellow-200/30 to-transparent mx-2 rounded-full" />

              <div className="flex flex-col items-center z-10">
                <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center text-2xl transition-all ${
                  materialType === "opaque" 
                    ? "bg-amber-800 border-amber-600 text-white" 
                    : materialType === "translucent" 
                    ? "bg-yellow-200/60 border-yellow-400 text-slate-800" 
                    : "bg-sky-100/30 border-sky-300 text-sky-800"
                }`}>
                  {materialType === "opaque" ? "📦" : materialType === "translucent" ? "📜" : "🪟"}
                </div>
                <span className="text-[9px] font-bold text-white capitalize mt-1">{materialType}</span>
              </div>

              <div className="w-16 h-32 bg-slate-800 border-l-4 border-slate-700 flex flex-col items-center justify-center relative">
                {materialType !== "transparent" && (
                  <div 
                    style={{ height: `${shadowSize}px`, width: "24px" }} 
                    className={`rounded-md transition-all duration-200 ${
                      materialType === "opaque" ? "bg-black opacity-90 shadow-2xl" : "bg-black/40 opacity-40"
                    }`}
                  />
                )}
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-2">Wall Screen</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-center justify-between text-xs">
              <span className="font-extrabold text-amber-900">Projected Shadow Height:</span>
              <span className="font-black text-amber-700 font-mono">
                {materialType === "transparent" ? "No Shadow Formed!" : `${shadowSize} pixels tall (${materialType} material)`}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
  type ChemTab = "formula_crisscross" | "laws_combination" | "molecular_mass" | "mole_concept" | "atom_builder" | "rutherford" | "models" | "isotopes" | "hierarchy";

  const [activeTab, setActiveTab] = useState<ChemTab>(() => {
    if (chapterId === "g9_chem_atoms") return "formula_crisscross";
    if (chapterId === "g9_chem_matter") return "hierarchy";
    return "atom_builder";
  });

  // ==================== CHAPTER 3: ATOMS & MOLECULES STATE ====================
  // 1. Formula Criss-Cross State
  const CATIONS_LIST = [
    { id: "Na", name: "Sodium", symbol: "Na", valency: 1, charge: "+1", poly: false },
    { id: "K", name: "Potassium", symbol: "K", valency: 1, charge: "+1", poly: false },
    { id: "Ca", name: "Calcium", symbol: "Ca", valency: 2, charge: "+2", poly: false },
    { id: "Mg", name: "Magnesium", symbol: "Mg", valency: 2, charge: "+2", poly: false },
    { id: "Al", name: "Aluminium", symbol: "Al", valency: 3, charge: "+3", poly: false },
    { id: "Fe", name: "Iron (III)", symbol: "Fe", valency: 3, charge: "+3", poly: false },
    { id: "NH4", name: "Ammonium", symbol: "NH₄", valency: 1, charge: "+1", poly: true },
    { id: "H", name: "Hydrogen", symbol: "H", valency: 1, charge: "+1", poly: false },
    { id: "Cu", name: "Copper (II)", symbol: "Cu", valency: 2, charge: "+2", poly: false },
    { id: "Zn", name: "Zinc", symbol: "Zn", valency: 2, charge: "+2", poly: false },
    { id: "Ba", name: "Barium", symbol: "Ba", valency: 2, charge: "+2", poly: false },
  ];

  const ANIONS_LIST = [
    { id: "Cl", name: "Chloride", symbol: "Cl", valency: 1, charge: "-1", poly: false },
    { id: "O", name: "Oxide", symbol: "O", valency: 2, charge: "-2", poly: false },
    { id: "SO4", name: "Sulphate", symbol: "SO₄", valency: 2, charge: "-2", poly: true },
    { id: "NO3", name: "Nitrate", symbol: "NO₃", valency: 1, charge: "-1", poly: true },
    { id: "CO3", name: "Carbonate", symbol: "CO₃", valency: 2, charge: "-2", poly: true },
    { id: "OH", name: "Hydroxide", symbol: "OH", valency: 1, charge: "-1", poly: true },
    { id: "PO4", name: "Phosphate", symbol: "PO₄", valency: 3, charge: "-3", poly: true },
    { id: "S", name: "Sulphide", symbol: "S", valency: 2, charge: "-2", poly: false },
    { id: "HCO3", name: "Hydrogen Carbonate", symbol: "HCO₃", valency: 1, charge: "-1", poly: true },
  ];

  const [selectedCation, setSelectedCation] = useState(CATIONS_LIST[0]); // Na+
  const [selectedAnion, setSelectedAnion] = useState(ANIONS_LIST[0]); // Cl-

  const getFormulaDetails = (cat: typeof CATIONS_LIST[0], an: typeof ANIONS_LIST[0]) => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const common = gcd(cat.valency, an.valency);
    const catSub = an.valency / common;
    const anSub = cat.valency / common;

    const catFormatted = catSub === 1 ? cat.symbol : (cat.poly ? `(${cat.symbol})${catSub}` : `${cat.symbol}${catSub}`);
    const anFormatted = anSub === 1 ? an.symbol : (an.poly ? `(${an.symbol})${anSub}` : `${an.symbol}${anSub}`);

    const formula = `${catFormatted}${anFormatted}`;
    const name = `${cat.name} ${an.name}`;

    return { formula, catSub, anSub, name, rawCatSub: an.valency, rawAnSub: cat.valency, simplified: common > 1 };
  };

  // 2. Laws of Combination State
  const [reactantMassGrams, setReactantMassGrams] = useState<number>(20);
  const [combLawTab, setCombLawTab] = useState<"conservation" | "proportions">("conservation");
  const [waterSampleMass, setWaterSampleMass] = useState<number>(18);

  // 3. Molecular Mass Calculator State
  const PRESET_MOLECULES = [
    { name: "Water", formula: "H₂O", parts: [{ name: "Hydrogen", sym: "H", count: 2, mass: 1 }, { name: "Oxygen", sym: "O", count: 1, mass: 16 }] },
    { name: "Sulphuric Acid", formula: "H₂SO₄", parts: [{ name: "Hydrogen", sym: "H", count: 2, mass: 1 }, { name: "Sulphur", sym: "S", count: 1, mass: 32 }, { name: "Oxygen", sym: "O", count: 4, mass: 16 }] },
    { name: "Nitric Acid", formula: "HNO₃", parts: [{ name: "Hydrogen", sym: "H", count: 1, mass: 1 }, { name: "Nitrogen", sym: "N", count: 1, mass: 14 }, { name: "Oxygen", sym: "O", count: 3, mass: 16 }] },
    { name: "Glucose", formula: "C₆H₁₂O₆", parts: [{ name: "Carbon", sym: "C", count: 6, mass: 12 }, { name: "Hydrogen", sym: "H", count: 12, mass: 1 }, { name: "Oxygen", sym: "O", count: 6, mass: 16 }] },
    { name: "Sodium Chloride", formula: "NaCl", parts: [{ name: "Sodium", sym: "Na", count: 1, mass: 23 }, { name: "Chlorine", sym: "Cl", count: 1, mass: 35.5 }] },
    { name: "Calcium Carbonate", formula: "CaCO₃", parts: [{ name: "Calcium", sym: "Ca", count: 1, mass: 40 }, { name: "Carbon", sym: "C", count: 1, mass: 12 }, { name: "Oxygen", sym: "O", count: 3, mass: 16 }] },
    { name: "Ammonia", formula: "NH₃", parts: [{ name: "Nitrogen", sym: "N", count: 1, mass: 14 }, { name: "Hydrogen", sym: "H", count: 3, mass: 1 }] },
    { name: "Carbon Dioxide", formula: "CO₂", parts: [{ name: "Carbon", sym: "C", count: 1, mass: 12 }, { name: "Oxygen", sym: "O", count: 2, mass: 16 }] }
  ];
  const [activeMoleculeIdx, setActiveMoleculeIdx] = useState<number>(1); // H2SO4 default

  // 4. Mole Concept State
  const MOLE_SUBSTANCES = [
    { name: "Water (H₂O)", molarMass: 18, unitAtoms: 3 },
    { name: "Carbon (C)", molarMass: 12, unitAtoms: 1 },
    { name: "Oxygen Gas (O₂)", molarMass: 32, unitAtoms: 2 },
    { name: "Sodium Chloride (NaCl)", molarMass: 58.5, unitAtoms: 2 },
    { name: "Carbon Dioxide (CO₂)", molarMass: 44, unitAtoms: 3 },
    { name: "Glucose (C₆H₁₂O₆)", molarMass: 180, unitAtoms: 24 },
  ];
  const [selectedSubstanceIdx, setSelectedSubstanceIdx] = useState<number>(0);
  const [moleGivenGrams, setMoleGivenGrams] = useState<number>(36);

  // ==================== CHAPTER 4: INSIDE ATOM STATE ====================
  // 1. ATOM BUILDER & ELECTRON DISTRIBUTION STATE
  const [protons, setProtons] = useState<number>(6); // Default Carbon
  const [neutrons, setNeutrons] = useState<number>(6);
  const [electrons, setElectrons] = useState<number>(6);
  const [atomSubTab, setAtomSubTab] = useState<"sandbox" | "rules" | "matrix" | "practice">("sandbox");
  const [selectedRuleShell, setSelectedRuleShell] = useState<number>(1); // 1: K, 2: L, 3: M, 4: N

  // Electron Distribution Practice Game State
  const [practiceZ, setPracticeZ] = useState<number>(11); // e.g. Sodium (Na, Z=11)
  const [userK, setUserK] = useState<number>(0);
  const [userL, setUserL] = useState<number>(0);
  const [userM, setUserM] = useState<number>(0);
  const [userN, setUserN] = useState<number>(0);
  const [practiceFeedback, setPracticeFeedback] = useState<{ isCorrect: boolean; msg: string } | null>(null);

  // 2. RUTHERFORD EXPERIMENT STATE
  const [rutherfordFired, setRutherfordFired] = useState<number>(0);
  const [straightPassCount, setStraightPassCount] = useState<number>(0);
  const [deflectedCount, setDeflectedCount] = useState<number>(0);
  const [reboundCount, setReboundCount] = useState<number>(0);
  const [isFiring, setIsFiring] = useState<boolean>(false);
  const [microscopicZoom, setMicroscopicZoom] = useState<boolean>(false);

  // 3. ATOMIC MODELS STATE
  const [selectedModel, setSelectedModel] = useState<"thomson" | "rutherford" | "bohr">("bohr");
  const [bohrEnergyLevel, setBohrEnergyLevel] = useState<number>(1); // n=1 K shell
  const [energyTransitionMsg, setEnergyTransitionMsg] = useState<string>("");

  // 4. ISOTOPES & ISOBARS STATE
  const [cl35Percent, setCl35Percent] = useState<number>(75);
  const [selectedIsoCategory, setSelectedIsoCategory] = useState<"hydrogen" | "carbon" | "uranium" | "isobar_ca_ar" | "isobar_c14_n14">("hydrogen");
  const [isoQuizIdx, setIsoQuizIdx] = useState<number>(0);
  const [isoQuizUserAnswer, setIsoQuizUserAnswer] = useState<string | null>(null);
  const [isoQuizScore, setIsoQuizScore] = useState<number>(0);

  const ISO_QUIZ_QUESTIONS = [
    {
      pair: ["¹²₆C (Carbon-12)", "¹⁴₆C (Carbon-14)"],
      type: "isotope",
      title: "Carbon-12 vs Carbon-14",
      explanation: "Both atoms have Z = 6 (6 Protons), but Carbon-12 has 6 Neutrons while Carbon-14 has 8 Neutrons. Same element with different neutron counts → ISOTOPES!"
    },
    {
      pair: ["⁴⁰₂₀Ca (Calcium-40)", "⁴⁰₁₈Ar (Argon-40)"],
      type: "isobar",
      title: "Calcium-40 vs Argon-40",
      explanation: "Calcium has Z = 20 and Argon has Z = 18 (different elements & protons), but both have Mass Number A = 40! Different elements with same total mass number → ISOBARS!"
    },
    {
      pair: ["³⁵₁₇Cl (Chlorine-35)", "³⁷₁₇Cl (Chlorine-37)"],
      type: "isotope",
      title: "Chlorine-35 vs Chlorine-37",
      explanation: "Both have Atomic Number Z = 17 (17 Protons), but Chlorine-35 has 18 Neutrons and Chlorine-37 has 20 Neutrons. Same element → ISOTOPES!"
    },
    {
      pair: ["¹⁴₆C (Carbon-14)", "¹⁴₇N (Nitrogen-14)"],
      type: "isobar",
      title: "Carbon-14 vs Nitrogen-14",
      explanation: "Carbon has Z = 6 (6 Protons) and Nitrogen has Z = 7 (7 Protons), but both have total Mass Number A = 14! Same mass number → ISOBARS!"
    },
    {
      pair: ["²³⁵₉₂U (Uranium-235)", "²³⁸₉₂U (Uranium-238)"],
      type: "isotope",
      title: "Uranium-235 vs Uranium-238",
      explanation: "Both have Atomic Number Z = 92 (92 Protons), but ²³⁵U has 143 Neutrons and ²³⁸U has 146 Neutrons. Same element → ISOTOPES!"
    }
  ];

  // Periodic Table Elements Data (Z = 1 to 20)
  const ELEMENTS_20 = [
    { z: 0, name: "Empty Space", symbol: "∅", desc: "No protons! Add protons to build an element." },
    { z: 1, name: "Hydrogen", symbol: "H", desc: "Simplest element! Most abundant element in the universe." },
    { z: 2, name: "Helium", symbol: "He", desc: "Noble gas with a complete duplet shell! Non-reactive gas." },
    { z: 3, name: "Lithium", symbol: "Li", desc: "Lightest alkali metal used in rechargeable smartphone batteries." },
    { z: 4, name: "Beryllium", symbol: "Be", desc: "Lightweight, strong metal used in aerospace and satellite mirrors." },
    { z: 5, name: "Boron", symbol: "B", desc: "Metalloid used in heat-resistant Pyrex laboratory glassware." },
    { z: 6, name: "Carbon", symbol: "C", desc: "Fundamental building block of all organic life on Earth!" },
    { z: 7, name: "Nitrogen", symbol: "N", desc: "Makes up 78% of Earth's atmosphere; essential for protein synthesis." },
    { z: 8, name: "Oxygen", symbol: "O", desc: "Life-supporting gas essential for animal and human respiration." },
    { z: 9, name: "Fluorine", symbol: "F", desc: "Most electronegative element; added to toothpaste to strengthen enamel." },
    { z: 10, name: "Neon", symbol: "Ne", desc: "Inert noble gas that glows vibrant reddish-orange in illuminated signboards." },
    { z: 11, name: "Sodium", symbol: "Na", desc: "Highly reactive metal that forms table salt (NaCl) with chlorine." },
    { z: 12, name: "Magnesium", symbol: "Mg", desc: "Burns with a dazzling white light; essential mineral in chlorophyll." },
    { z: 13, name: "Aluminium", symbol: "Al", desc: "Strong, lightweight metal used in aircraft bodies and food foils." },
    { z: 14, name: "Silicon", symbol: "Si", desc: "Semi-conductor at the heart of computer microchips and solar panels." },
    { z: 15, name: "Phosphorus", symbol: "P", desc: "Essential element in DNA backbone and strike-anywhere matchheads." },
    { z: 16, name: "Sulphur", symbol: "S", desc: "Yellow non-metal found near volcanoes; essential for vulcanizing rubber." },
    { z: 17, name: "Chlorine", symbol: "Cl", desc: "Greenish-yellow disinfectant gas used to sanitize drinking water." },
    { z: 18, name: "Argon", symbol: "Ar", desc: "Abundant noble gas used inside electric bulbs to protect filaments." },
    { z: 19, name: "Potassium", symbol: "K", desc: "Vital electrolyte for heart rhythms; found abundantly in bananas." },
    { z: 20, name: "Calcium", symbol: "Ca", desc: "Key constituent of bones, teeth, milk, and limestone structures." }
  ];

  // Bohr-Bury Shell Distribution Calculation (K=2, L=8, M=8, N=2 for Z<=20)
  const calculateBohrDistribution = (eCount: number) => {
    let rem = eCount;
    const k = Math.min(2, rem);
    rem -= k;
    const l = Math.min(8, rem);
    rem -= l;
    const m = Math.min(8, rem);
    rem -= m;
    const n = Math.min(2, rem);
    return { k, l, m, n };
  };

  const shells = calculateBohrDistribution(electrons);
  const outerShellElectrons = shells.n > 0 ? shells.n : shells.m > 0 ? shells.m : shells.l > 0 ? shells.l : shells.k;
  const isOuterShellFull = (electrons === 2 && protons <= 2) || outerShellElectrons === 8;
  const valency = isOuterShellFull ? 0 : outerShellElectrons <= 4 ? outerShellElectrons : 8 - outerShellElectrons;

  const currentElement = ELEMENTS_20[protons] || {
    z: protons,
    name: "Transuranic Nucleus",
    symbol: "X",
    desc: "Heavy synthetic element beyond Calcium."
  };

  const totalMass = protons + neutrons;
  const netCharge = protons - electrons;

  // RUTHERFORD FIRE HANDLER
  const fireAlphaParticles = (count: number) => {
    setIsFiring(true);
    let straight = 0;
    let def = 0;
    let reb = 0;

    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      if (rand < 0.0001) {
        reb++; // 1 in 10,000 to 12,000 rebound
      } else if (rand < 0.05) {
        def++; // ~5% small angle deflection
      } else {
        straight++; // >95% straight pass
      }
    }

    setRutherfordFired((prev) => prev + count);
    setStraightPassCount((prev) => prev + straight);
    setDeflectedCount((prev) => prev + def);
    setReboundCount((prev) => prev + reb);

    setTimeout(() => {
      setIsFiring(false);
    }, 600);
  };

  const resetRutherford = () => {
    setRutherfordFired(0);
    setStraightPassCount(0);
    setDeflectedCount(0);
    setReboundCount(0);
  };

  // BOHR ENERGY JUMP HANDLER
  const triggerBohrJump = (direction: "absorb" | "emit") => {
    if (direction === "absorb") {
      if (bohrEnergyLevel < 4) {
        const nextLevel = bohrEnergyLevel + 1;
        setBohrEnergyLevel(nextLevel);
        setEnergyTransitionMsg(`⚡ Absorbed Photon energy (+hν)! Electron jumped from n=${bohrEnergyLevel} to excited shell n=${nextLevel}.`);
      } else {
        setEnergyTransitionMsg("⚠️ Maximum energy shell reached! Ionization threshold.");
      }
    } else {
      if (bohrEnergyLevel > 1) {
        const prevLevel = bohrEnergyLevel - 1;
        setBohrEnergyLevel(prevLevel);
        setEnergyTransitionMsg(`💡 Emitted Photon light wavelength (-hν)! Electron dropped from n=${bohrEnergyLevel} back to stable shell n=${prevLevel}.`);
      } else {
        setEnergyTransitionMsg("ℹ️ Electron is already at ground state (K shell, n=1). Cannot drop lower!");
      }
    }
  };

  // Chlorine Average Mass Calculation
  const cl37Percent = 100 - cl35Percent;
  const avgChlorineMass = ((35 * cl35Percent + 37 * cl37Percent) / 100).toFixed(2);

  return (
    <div className="flex flex-col gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-5 rounded-2xl text-white shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-purple-500/30 text-purple-200 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-purple-400/30">
              Grade 9 Chemistry • Chapter 8
            </span>
            <span className="bg-emerald-500/30 text-emerald-200 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-400/30">
              Interactive Lab
            </span>
          </div>
          <h3 className="font-extrabold text-lg text-white tracking-tight flex items-center gap-2">
            ⚛️ Journey Inside the Atom: Interactive Visual Lab
          </h3>
          <p className="text-xs text-purple-200/90 leading-relaxed max-w-2xl">
            Explore subatomic particles, build atoms up to Z=20, simulate Rutherford's Gold Foil scattering experiment, jump Bohr energy shells, and analyze isotopes & matter hierarchy!
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("atom_builder")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "atom_builder"
              ? "bg-purple-600 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <span>⚛️ Interactive Bohr Model & Electron Shells</span>
        </button>

        <button
          onClick={() => setActiveTab("rutherford")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "rutherford"
              ? "bg-purple-600 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <span>🎯 Rutherford Alpha Experiment</span>
        </button>

        <button
          onClick={() => setActiveTab("models")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "models"
              ? "bg-purple-600 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <span>🍉 Atomic Models & Bohr Jumps</span>
        </button>

        <button
          onClick={() => setActiveTab("isotopes")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "isotopes"
              ? "bg-purple-600 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <span>⚖️ Isotopes & Isobars</span>
        </button>

        <button
          onClick={() => setActiveTab("hierarchy")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "hierarchy"
              ? "bg-purple-600 text-white shadow-xs"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <span>🏢 Hierarchy of Matter</span>
        </button>
      </div>

      {/* ==================== TAB 1: ATOM & SHELL SANDBOX ==================== */}
      {activeTab === "atom_builder" && (
        <div className="space-y-5 animate-fade-in">
          {/* Sub-navigation bar inside Atom Builder */}
          <div className="flex flex-wrap gap-2 border-b border-purple-200/80 pb-3">
            <button
              onClick={() => setAtomSubTab("sandbox")}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                atomSubTab === "sandbox"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>⚛️ Interactive Atom Sandbox</span>
            </button>

            <button
              onClick={() => setAtomSubTab("rules")}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                atomSubTab === "rules"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>⚡ Bohr-Bury Scheme (2n² Rule)</span>
            </button>

            <button
              onClick={() => setAtomSubTab("matrix")}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                atomSubTab === "matrix"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>📊 First 20 Elements Shell Table (Z=1 to 20)</span>
            </button>

            <button
              onClick={() => setAtomSubTab("practice")}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                atomSubTab === "practice"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>🎮 Shell Distribution Practice Game</span>
            </button>
          </div>

          {/* SUB-VIEW 1: SANDBOX */}
          {atomSubTab === "sandbox" && (
            <div className="space-y-5 animate-fade-in">
              {/* Quick Preset Buttons */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center gap-2">
                <span className="text-xs font-black uppercase text-slate-500 mr-2">Quick Presets:</span>
                {[
                  { label: "1H (Hydrogen)", p: 1, n: 0, e: 1 },
                  { label: "2He (Helium)", p: 2, n: 2, e: 2 },
                  { label: "6C (Carbon)", p: 6, n: 6, e: 6 },
                  { label: "8O (Oxygen)", p: 8, n: 8, e: 8 },
                  { label: "11Na (Sodium)", p: 11, n: 12, e: 11 },
                  { label: "17Cl (Chlorine)", p: 17, n: 18, e: 17 },
                  { label: "18Ar (Argon)", p: 18, n: 22, e: 18 },
                  { label: "20Ca (Calcium)", p: 20, n: 20, e: 20 }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setProtons(preset.p);
                      setNeutrons(preset.n);
                      setElectrons(preset.e);
                    }}
                    className="text-xs font-bold bg-slate-100 hover:bg-purple-100 hover:text-purple-800 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition cursor-pointer active:scale-95"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Column 1: Controls */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
                  <span className="text-xs font-black uppercase text-slate-700 tracking-wider block border-b pb-2">
                    1. Adjust Subatomic Particles
                  </span>

                  {/* Protons Control */}
                  <div className="p-3 bg-orange-50/60 border border-orange-200 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs font-extrabold text-orange-900 block">🔴 Protons (p⁺)</span>
                        <span className="text-[10px] text-orange-700 font-medium">Atomic Number Z = {protons} | Charge: +1</span>
                      </div>
                      <span className="font-mono font-black text-base text-orange-900">{protons}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={protons}
                      onChange={(e) => setProtons(Number(e.target.value))}
                      className="w-full accent-orange-600 cursor-pointer"
                    />
                  </div>

                  {/* Neutrons Control */}
                  <div className="p-3 bg-slate-100/80 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs font-extrabold text-slate-800 block">⚪ Neutrons (n⁰)</span>
                        <span className="text-[10px] text-slate-600 font-medium">Mass Contribution | Charge: 0</span>
                      </div>
                      <span className="font-mono font-black text-base text-slate-800">{neutrons}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="25"
                      value={neutrons}
                      onChange={(e) => setNeutrons(Number(e.target.value))}
                      className="w-full accent-slate-600 cursor-pointer"
                    />
                  </div>

                  {/* Electrons Control */}
                  <div className="p-3 bg-sky-50/60 border border-sky-200 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs font-extrabold text-sky-900 block">🔵 Electrons (e⁻)</span>
                        <span className="text-[10px] text-sky-700 font-medium">Orbital Shells | Charge: -1</span>
                      </div>
                      <span className="font-mono font-black text-base text-sky-900">{electrons}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={electrons}
                      onChange={(e) => setElectrons(Number(e.target.value))}
                      className="w-full accent-sky-600 cursor-pointer"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setElectrons(protons); // Make neutral
                      }}
                      className="flex-1 py-2 text-[11px] font-extrabold text-purple-800 bg-purple-50 border border-purple-200 hover:bg-purple-100 rounded-xl transition cursor-pointer"
                    >
                      ⚖️ Make Neutral Atom (e⁻ = p⁺)
                    </button>
                  </div>
                </div>

                {/* Column 2: Bohr Shell Orbital Diagram */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col items-center justify-between min-h-[320px] relative shadow-2xs">
                  <div className="w-full flex justify-between items-center border-b pb-2">
                    <span className="text-xs font-black uppercase text-purple-900 tracking-wider">
                      2. Bohr Atomic Orbital Model
                    </span>
                    <span className="text-[10px] font-mono font-extrabold bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full">
                      Bohr-Bury Rule (2n²)
                    </span>
                  </div>

                  {/* Orbit Visual Stage */}
                  <div className="relative w-64 h-64 flex items-center justify-center my-4">
                    {/* Shell N (n=4) */}
                    {shells.n > 0 && (
                      <div className="absolute w-60 h-60 rounded-full border-2 border-dashed border-emerald-300 animate-spin" style={{ animationDuration: "35s" }}>
                        <span className="absolute -top-3 left-1/2 -ml-2 text-[9px] font-bold text-emerald-600 bg-white px-1">N (n=4)</span>
                        {Array.from({ length: shells.n }).map((_, i) => (
                          <div
                            key={`n-${i}`}
                            className="absolute w-3.5 h-3.5 bg-emerald-500 rounded-full border border-white flex items-center justify-center text-[7px] text-white font-bold"
                            style={{
                              top: `${50 - 48 * Math.cos((2 * Math.PI * i) / shells.n)}%`,
                              left: `${50 + 48 * Math.sin((2 * Math.PI * i) / shells.n)}%`
                            }}
                          >
                            e⁻
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Shell M (n=3) */}
                    {(shells.m > 0 || shells.n > 0) && (
                      <div className="absolute w-48 h-48 rounded-full border-2 border-dashed border-amber-300 animate-spin" style={{ animationDuration: "25s" }}>
                        <span className="absolute -top-3 left-1/2 -ml-2 text-[9px] font-bold text-amber-600 bg-white px-1">M (n=3)</span>
                        {Array.from({ length: shells.m }).map((_, i) => (
                          <div
                            key={`m-${i}`}
                            className="absolute w-3.5 h-3.5 bg-amber-500 rounded-full border border-white flex items-center justify-center text-[7px] text-white font-bold"
                            style={{
                              top: `${50 - 48 * Math.cos((2 * Math.PI * i) / shells.m)}%`,
                              left: `${50 + 48 * Math.sin((2 * Math.PI * i) / shells.m)}%`
                            }}
                          >
                            e⁻
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Shell L (n=2) */}
                    {(shells.l > 0 || shells.m > 0) && (
                      <div className="absolute w-36 h-36 rounded-full border-2 border-dashed border-purple-300 animate-spin" style={{ animationDuration: "18s" }}>
                        <span className="absolute -top-3 left-1/2 -ml-2 text-[9px] font-bold text-purple-600 bg-white px-1">L (n=2)</span>
                        {Array.from({ length: shells.l }).map((_, i) => (
                          <div
                            key={`l-${i}`}
                            className="absolute w-3.5 h-3.5 bg-purple-600 rounded-full border border-white flex items-center justify-center text-[7px] text-white font-bold"
                            style={{
                              top: `${50 - 48 * Math.cos((2 * Math.PI * i) / shells.l)}%`,
                              left: `${50 + 48 * Math.sin((2 * Math.PI * i) / shells.l)}%`
                            }}
                          >
                            e⁻
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Shell K (n=1) */}
                    <div className="absolute w-24 h-24 rounded-full border-2 border-dashed border-sky-400 animate-spin" style={{ animationDuration: "12s" }}>
                      <span className="absolute -top-3 left-1/2 -ml-2 text-[9px] font-bold text-sky-600 bg-white px-1">K (n=1)</span>
                      {Array.from({ length: shells.k }).map((_, i) => (
                        <div
                          key={`k-${i}`}
                          className="absolute w-3.5 h-3.5 bg-sky-500 rounded-full border border-white flex items-center justify-center text-[7px] text-white font-bold"
                          style={{
                            top: `${50 - 48 * Math.cos((2 * Math.PI * i) / Math.max(1, shells.k))}%`,
                            left: `${50 + 48 * Math.sin((2 * Math.PI * i) / Math.max(1, shells.k))}%`
                          }}
                        >
                          e⁻
                        </div>
                      ))}
                    </div>

                    {/* Dense Central Nucleus */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 border-2 border-white flex flex-col items-center justify-center text-white z-10 shadow-md p-1">
                      <span className="text-[9px] font-black leading-none">{protons}p⁺</span>
                      <span className="text-[8px] font-bold leading-none opacity-90">{neutrons}n⁰</span>
                    </div>
                  </div>

                  {/* Shell Count Summary Pills */}
                  <div className="flex gap-2 text-[10px] font-mono font-bold text-slate-700">
                    <span className="bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded">K: {shells.k}/2</span>
                    <span className="bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded">L: {shells.l}/8</span>
                    <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">M: {shells.m}/8</span>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">N: {shells.n}/2</span>
                  </div>
                </div>

                {/* Column 3: Chemical Properties & Valency Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-2xs space-y-4">
                  <span className="text-xs font-black uppercase text-slate-700 tracking-wider block border-b pb-2">
                    3. Element & Valency Analysis
                  </span>

                  <div className="flex items-center gap-4 bg-purple-50 border border-purple-200 p-3 rounded-xl">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex flex-col items-center justify-center font-black shadow-md shrink-0">
                      <span className="text-xs font-mono opacity-80 leading-none">Z = {protons}</span>
                      <span className="text-2xl leading-none font-sans">{currentElement.symbol}</span>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-purple-950">{currentElement.name}</h4>
                      <p className="text-[11px] text-purple-800/90 leading-snug">{currentElement.desc}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl space-y-0.5">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Configuration</span>
                      <span className="text-sm font-black font-mono text-purple-900">
                        {[shells.k, shells.l, shells.m, shells.n].filter((s) => s > 0).join(", ")}
                      </span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl space-y-0.5">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Valency</span>
                      <span className="text-sm font-black font-mono text-emerald-700">{valency}</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl space-y-0.5">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Mass Number (A = p+n)</span>
                      <span className="text-sm font-black font-mono text-slate-800">{totalMass} u</span>
                    </div>

                    <div className={`border p-2.5 rounded-xl space-y-0.5 ${netCharge > 0 ? "bg-orange-50 border-orange-200 text-orange-900" : netCharge < 0 ? "bg-sky-50 border-sky-200 text-sky-900" : "bg-emerald-50 border-emerald-200 text-emerald-900"}`}>
                      <span className="text-[9px] font-bold opacity-80 uppercase tracking-widest block">Net Charge</span>
                      <span className="text-sm font-black font-mono">
                        {netCharge > 0 ? `+${netCharge} (Cation)` : netCharge < 0 ? `${netCharge} (Anion)` : "0 (Neutral)"}
                      </span>
                    </div>
                  </div>

                  {/* Octet Status Box */}
                  <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${isOuterShellFull ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-amber-50 border-amber-200 text-amber-900"}`}>
                    <span className="text-lg">{isOuterShellFull ? "🛡️" : "⚡"}</span>
                    <div>
                      <span className="font-extrabold block">
                        {isOuterShellFull ? "Stable Octet / Duplet Achieved!" : "Chemically Reactive (Incomplete Octet)"}
                      </span>
                      <span className="text-[10px] leading-snug block opacity-90">
                        {isOuterShellFull
                          ? "Outer shell is completely full like a noble gas. Very low chemical reactivity."
                          : `Needs to ${outerShellElectrons <= 4 ? `lose ${outerShellElectrons} e⁻` : `gain ${8 - outerShellElectrons} e⁻`} to form a stable octet.`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-VIEW 2: BOHR-BURY RULES & 2n² CALCULATOR */}
          {atomSubTab === "rules" && (
            <div className="space-y-6 animate-fade-in">
              {/* Rules Summary Banner */}
              <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-5 rounded-2xl shadow-md space-y-3">
                <span className="text-xs font-black uppercase text-purple-300 tracking-wider block">
                  📘 The Three Fundamental Rules of the Bohr-Bury Scheme
                </span>
                <p className="text-xs text-purple-100 leading-relaxed max-w-3xl">
                  In 1921, Niels Bohr and Charles Bury proposed three strict rules governing how electrons fill discrete stationary energy orbits (K, L, M, N...) around an atomic nucleus:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
                  <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-purple-400/30 space-y-1">
                    <span className="font-extrabold text-amber-300 text-sm block">1️⃣ The 2n² Formula Rule</span>
                    <p className="text-[11px] text-purple-100 leading-snug">
                      The maximum number of electrons that can be accommodated in energy shell level <b>n</b> is given by formula <b>2n²</b>.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-purple-400/30 space-y-1">
                    <span className="font-extrabold text-amber-300 text-sm block">2️⃣ The Outermost Octet Rule</span>
                    <p className="text-[11px] text-purple-100 leading-snug">
                      The maximum capacity of the outermost valence shell is <b>8 electrons</b> (Octet Rule), regardless of higher theoretical capacity!
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-purple-400/30 space-y-1">
                    <span className="font-extrabold text-amber-300 text-sm block">3️⃣ Step-Wise Filling Rule</span>
                    <p className="text-[11px] text-purple-100 leading-snug">
                      Electrons cannot enter a outer shell unless all inner shells are completely filled (step-wise filling).
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive 2n² Shell Capacity Calculator */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                  <div>
                    <span className="text-xs font-black uppercase text-purple-900 tracking-wider block">
                      🧮 Interactive Shell Capacity Calculator (2n²)
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Select an energy shell level (n = 1, 2, 3, 4) to calculate max electron capacity:
                    </span>
                  </div>
                </div>

                {/* Shell Selector Buttons */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { n: 1, label: "K Shell (n = 1)", color: "sky" },
                    { n: 2, label: "L Shell (n = 2)", color: "purple" },
                    { n: 3, label: "M Shell (n = 3)", color: "amber" },
                    { n: 4, label: "N Shell (n = 4)", color: "emerald" }
                  ].map((s) => (
                    <button
                      key={s.n}
                      onClick={() => setSelectedRuleShell(s.n)}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                        selectedRuleShell === s.n
                          ? "bg-purple-600 text-white shadow-2xs scale-105"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                {/* Calculation Detail Display */}
                {(() => {
                  const n = selectedRuleShell;
                  const shellName = n === 1 ? "K" : n === 2 ? "L" : n === 3 ? "M" : "N";
                  const maxCap = 2 * n * n;

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center bg-purple-50/60 p-5 rounded-xl border border-purple-200">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black font-mono text-purple-950">
                            {shellName} Shell (n = {n})
                          </span>
                          <span className="bg-purple-200 text-purple-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                            Energy Level {n}
                          </span>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-purple-200 font-mono text-xs space-y-1.5 text-slate-800">
                          <div><b>Formula:</b> Max Capacity = 2 × n²</div>
                          <div><b>Substitution:</b> 2 × ({n})² = 2 × {n * n}</div>
                          <div className="text-sm font-black text-purple-900 bg-purple-100 p-1.5 rounded text-center mt-1">
                            ✨ Maximum Capacity = {maxCap} Electrons!
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {n === 1 && "The K shell is closest to the nucleus and has the lowest energy. It holds a maximum of 2 electrons (forming a stable duplet like Helium)."}
                          {n === 2 && "The L shell is the 2nd energy level. It holds up to 8 electrons (e.g. full in Neon with 2,8)."}
                          {n === 3 && "The M shell is the 3rd energy level. Theoretically holds up to 18 electrons (2×3²=18). For the first 20 elements, it fills up to 8 electrons before Potassium and Calcium start filling the N shell."}
                          {n === 4 && "The N shell is the 4th energy level. Theoretically holds up to 32 electrons (2×4²=32)."}
                        </p>
                      </div>

                      {/* Visual Orbit Graphic */}
                      <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl border border-purple-200 shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Visual Shell Representation</span>
                        <div className="relative w-44 h-44 flex items-center justify-center">
                          <div className="w-40 h-40 rounded-full border-2 border-dashed border-purple-400 animate-spin flex items-center justify-center" style={{ animationDuration: "20s" }}>
                            {Array.from({ length: Math.min(18, maxCap) }).map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-3.5 h-3.5 bg-purple-600 rounded-full border border-white flex items-center justify-center text-[7px] text-white font-bold"
                                style={{
                                  top: `${50 - 46 * Math.cos((2 * Math.PI * i) / Math.min(18, maxCap))}%`,
                                  left: `${50 + 46 * Math.sin((2 * Math.PI * i) / Math.min(18, maxCap))}%`
                                }}
                              >
                                e⁻
                              </div>
                            ))}
                          </div>
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 text-white flex items-center justify-center font-black text-[10px] z-10 shadow-xs">
                            Nucleus
                          </div>
                        </div>
                        <span className="text-[11px] font-extrabold text-purple-900 mt-2">
                          Showing max {Math.min(18, maxCap)} electron orbitals
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* SUB-VIEW 3: FIRST 20 ELEMENTS SHELL MATRIX TABLE */}
          {atomSubTab === "matrix" && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-2xs animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                <div>
                  <span className="text-xs font-black uppercase text-purple-900 tracking-wider block">
                    📊 Complete Electron Shell Configuration Table (Z = 1 to 20)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Click "Load in Sandbox" on any element to visualize its Bohr orbits live!
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-purple-900 text-white font-black">
                      <th className="p-2.5 border border-purple-800">Z</th>
                      <th className="p-2.5 border border-purple-800">Element</th>
                      <th className="p-2.5 border border-purple-800">Symbol</th>
                      <th className="p-2.5 border border-purple-800 bg-sky-800 text-center">K (n=1)</th>
                      <th className="p-2.5 border border-purple-800 bg-purple-800 text-center">L (n=2)</th>
                      <th className="p-2.5 border border-purple-800 bg-amber-800 text-center">M (n=3)</th>
                      <th className="p-2.5 border border-purple-800 bg-emerald-800 text-center">N (n=4)</th>
                      <th className="p-2.5 border border-purple-800 text-center">Valence e⁻</th>
                      <th className="p-2.5 border border-purple-800 text-center">Valency</th>
                      <th className="p-2.5 border border-purple-800 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-[11px]">
                    {ELEMENTS_20.slice(1).map((el) => {
                      const dist = calculateBohrDistribution(el.z);
                      const valenceE = dist.n > 0 ? dist.n : dist.m > 0 ? dist.m : dist.l > 0 ? dist.l : dist.k;
                      const isFull = (el.z === 2) || valenceE === 8;
                      const elemVal = isFull ? 0 : valenceE <= 4 ? valenceE : 8 - valenceE;
                      const isSelected = protons === el.z;

                      return (
                        <tr
                          key={el.z}
                          className={`hover:bg-purple-50/80 transition ${
                            isSelected ? "bg-purple-100/90 font-extrabold text-purple-950" : "even:bg-slate-50/50"
                          }`}
                        >
                          <td className="p-2 border border-slate-200 font-mono font-bold">{el.z}</td>
                          <td className="p-2 border border-slate-200 font-bold">{el.name}</td>
                          <td className="p-2 border border-slate-200 font-mono font-black text-purple-900">{el.symbol}</td>
                          <td className="p-2 border border-slate-200 text-center font-mono bg-sky-50">{dist.k}</td>
                          <td className="p-2 border border-slate-200 text-center font-mono bg-purple-50">{dist.l || "-"}</td>
                          <td className="p-2 border border-slate-200 text-center font-mono bg-amber-50">{dist.m || "-"}</td>
                          <td className="p-2 border border-slate-200 text-center font-mono bg-emerald-50">{dist.n || "-"}</td>
                          <td className="p-2 border border-slate-200 text-center font-mono font-bold text-slate-800">{valenceE}</td>
                          <td className="p-2 border border-slate-200 text-center font-mono font-black text-emerald-700">{elemVal}</td>
                          <td className="p-1.5 border border-slate-200 text-center">
                            <button
                              onClick={() => {
                                setProtons(el.z);
                                setElectrons(el.z);
                                setNeutrons(el.z);
                                setAtomSubTab("sandbox");
                              }}
                              className="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] rounded-md transition cursor-pointer"
                            >
                              ⚛️ View Orbits
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SUB-VIEW 4: INTERACTIVE ELECTRON DISTRIBUTION PRACTICE GAME */}
          {atomSubTab === "practice" && (
            <div className="bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900 text-white p-5 rounded-2xl space-y-5 shadow-lg animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-purple-700/60 pb-3">
                <div>
                  <span className="text-xs font-black uppercase text-amber-300 tracking-wider block">
                    🎮 Interactive Shell Distribution Practice Challenge
                  </span>
                  <span className="text-[11px] text-purple-200">
                    Manually fill the K, L, M, and N shells according to the 2n² and step-wise filling rules!
                  </span>
                </div>

                <button
                  onClick={() => {
                    const randZ = Math.floor(Math.random() * 20) + 1;
                    setPracticeZ(randZ);
                    setUserK(0);
                    setUserL(0);
                    setUserM(0);
                    setUserN(0);
                    setPracticeFeedback(null);
                  }}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-purple-950 font-black text-xs rounded-xl transition cursor-pointer shadow-xs"
                >
                  🎲 Random Element Challenge
                </button>
              </div>

              {/* Element Selection & Target Prompt */}
              {(() => {
                const targetElem = ELEMENTS_20[practiceZ] || ELEMENTS_20[11];
                const expected = calculateBohrDistribution(practiceZ);

                return (
                  <div className="space-y-4">
                    {/* Element Selector Dropdown */}
                    <div className="flex flex-wrap items-center gap-3 bg-white/10 p-3.5 rounded-xl border border-purple-400/30">
                      <span className="text-xs font-extrabold text-purple-200">Select Target Element:</span>
                      <select
                        value={practiceZ}
                        onChange={(e) => {
                          setPracticeZ(Number(e.target.value));
                          setUserK(0);
                          setUserL(0);
                          setUserM(0);
                          setUserN(0);
                          setPracticeFeedback(null);
                        }}
                        className="bg-purple-900 text-white font-mono font-black text-xs px-3 py-1.5 rounded-lg border border-purple-400/50 cursor-pointer"
                      >
                        {ELEMENTS_20.slice(1).map((e) => (
                          <option key={e.z} value={e.z}>
                            Z = {e.z}: {e.name} ({e.symbol})
                          </option>
                        ))}
                      </select>

                      <span className="text-xs font-extrabold text-amber-300 ml-auto">
                        Total Target Electrons to Fill: <span className="font-mono text-base font-black bg-black/40 px-2 py-0.5 rounded border border-amber-400/40">{practiceZ} e⁻</span>
                      </span>
                    </div>

                    {/* Interactive Shell Fill Bucket Controls */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {/* K Shell */}
                      <div className="bg-sky-950/80 border-2 border-sky-400/50 p-4 rounded-xl text-center space-y-2">
                        <span className="text-xs font-black text-sky-300 block uppercase">K Shell (n = 1)</span>
                        <span className="text-[10px] text-sky-200 block">Max capacity: 2 e⁻</span>
                        <div className="text-2xl font-mono font-black text-sky-400 my-1">{userK} / 2</div>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setUserK(prev => Math.max(0, prev - 1))}
                            className="w-8 h-8 rounded-lg bg-sky-800 hover:bg-sky-700 text-white font-black text-sm flex items-center justify-center cursor-pointer active:scale-95"
                          >
                            -
                          </button>
                          <button
                            onClick={() => setUserK(prev => Math.min(2, prev + 1))}
                            className="w-8 h-8 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-black text-sm flex items-center justify-center cursor-pointer active:scale-95"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* L Shell */}
                      <div className="bg-purple-950/80 border-2 border-purple-400/50 p-4 rounded-xl text-center space-y-2">
                        <span className="text-xs font-black text-purple-300 block uppercase">L Shell (n = 2)</span>
                        <span className="text-[10px] text-purple-200 block">Max capacity: 8 e⁻</span>
                        <div className="text-2xl font-mono font-black text-purple-400 my-1">{userL} / 8</div>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setUserL(prev => Math.max(0, prev - 1))}
                            className="w-8 h-8 rounded-lg bg-purple-800 hover:bg-purple-700 text-white font-black text-sm flex items-center justify-center cursor-pointer active:scale-95"
                          >
                            -
                          </button>
                          <button
                            onClick={() => setUserL(prev => Math.min(8, prev + 1))}
                            className="w-8 h-8 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-black text-sm flex items-center justify-center cursor-pointer active:scale-95"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* M Shell */}
                      <div className="bg-amber-950/80 border-2 border-amber-400/50 p-4 rounded-xl text-center space-y-2">
                        <span className="text-xs font-black text-amber-300 block uppercase">M Shell (n = 3)</span>
                        <span className="text-[10px] text-amber-200 block">Max capacity: 8 e⁻ (Z≤20)</span>
                        <div className="text-2xl font-mono font-black text-amber-400 my-1">{userM} / 8</div>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setUserM(prev => Math.max(0, prev - 1))}
                            className="w-8 h-8 rounded-lg bg-amber-800 hover:bg-amber-700 text-white font-black text-sm flex items-center justify-center cursor-pointer active:scale-95"
                          >
                            -
                          </button>
                          <button
                            onClick={() => setUserM(prev => Math.min(8, prev + 1))}
                            className="w-8 h-8 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-black text-sm flex items-center justify-center cursor-pointer active:scale-95"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* N Shell */}
                      <div className="bg-emerald-950/80 border-2 border-emerald-400/50 p-4 rounded-xl text-center space-y-2">
                        <span className="text-xs font-black text-emerald-300 block uppercase">N Shell (n = 4)</span>
                        <span className="text-[10px] text-emerald-200 block">Max capacity: 2 e⁻ (Z≤20)</span>
                        <div className="text-2xl font-mono font-black text-emerald-400 my-1">{userN} / 2</div>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setUserN(prev => Math.max(0, prev - 1))}
                            className="w-8 h-8 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center cursor-pointer active:scale-95"
                          >
                            -
                          </button>
                          <button
                            onClick={() => setUserN(prev => Math.min(2, prev + 1))}
                            className="w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center cursor-pointer active:scale-95"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Action & Feedback Row */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          const totalPlaced = userK + userL + userM + userN;
                          if (totalPlaced !== practiceZ) {
                            setPracticeFeedback({
                              isCorrect: false,
                              msg: `Total placed electrons is ${totalPlaced}, but ${targetElem.name} (Z = ${practiceZ}) needs exactly ${practiceZ} electrons!`
                            });
                          } else if (practiceZ > 2 && userK < 2) {
                            setPracticeFeedback({
                              isCorrect: false,
                              msg: `Step-wise rule violated! K shell must be completely filled with 2 electrons before electrons can enter the L shell.`
                            });
                          } else if (practiceZ > 10 && userL < 8) {
                            setPracticeFeedback({
                              isCorrect: false,
                              msg: `Step-wise rule violated! L shell must be completely filled with 8 electrons before electrons can enter the M shell.`
                            });
                          } else if (practiceZ > 18 && userM < 8) {
                            setPracticeFeedback({
                              isCorrect: false,
                              msg: `Step-wise rule violated! M shell must hold 8 electrons before N shell starts filling.`
                            });
                          } else {
                            const configStr = [userK, userL, userM, userN].filter(x => x > 0).join(", ");
                            setPracticeFeedback({
                              isCorrect: true,
                              msg: `🎉 Excellent! Correct Bohr-Bury distribution for ${targetElem.name} (${targetElem.symbol}): ${configStr}.`
                            });
                          }
                        }}
                        className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl transition cursor-pointer shadow-md"
                      >
                        ✅ Verify My Shell Distribution
                      </button>

                      <button
                        onClick={() => {
                          setUserK(expected.k);
                          setUserL(expected.l);
                          setUserM(expected.m);
                          setUserN(expected.n);
                          const configStr = [expected.k, expected.l, expected.m, expected.n].filter(x => x > 0).join(", ");
                          setPracticeFeedback({
                            isCorrect: true,
                            msg: `💡 Auto-filled correct distribution for ${targetElem.name}: ${configStr}`
                          });
                        }}
                        className="py-3 px-4 bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                      >
                        💡 Auto Fill Correct Answer
                      </button>
                    </div>

                    {/* Feedback Message Banner */}
                    {practiceFeedback && (
                      <div className={`p-4 rounded-xl border text-xs font-medium space-y-1 animate-fade-in ${
                        practiceFeedback.isCorrect
                          ? "bg-emerald-950/90 border-emerald-400 text-emerald-200"
                          : "bg-rose-950/90 border-rose-400 text-rose-200"
                      }`}>
                        <div className="flex items-center gap-2 font-black text-sm">
                          <span>{practiceFeedback.isCorrect ? "🎉 Correct!" : "⚠️ Needs Correction"}</span>
                        </div>
                        <p className="leading-relaxed text-[11px]">{practiceFeedback.msg}</p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB 2: RUTHERFORD ALPHA EXPERIMENT ==================== */}
      {activeTab === "rutherford" && (
        <div className="space-y-5 animate-fade-in">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b pb-3">
              <div>
                <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  🎯 Rutherford's Gold Foil Alpha (α) Particle Scattering Experiment
                </h4>
                <p className="text-xs text-slate-600">
                  Ernest Rutherford fired positively charged alpha particles (He²⁺) at ultra-thin gold foil (1000 atoms thick) to discover the atomic nucleus!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMicroscopicZoom(!microscopicZoom)}
                  className="px-3 py-1.5 text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl border border-amber-300 transition cursor-pointer"
                >
                  {microscopicZoom ? "🔍 Macro View (Gold Foil)" : "🔬 Micro Zoom (Single Nucleus)"}
                </button>
                <button
                  onClick={resetRutherford}
                  className="px-3 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition cursor-pointer"
                >
                  🔄 Reset Counter
                </button>
              </div>
            </div>

            {/* Visual Canvas Stage */}
            <div className="bg-slate-950 p-6 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[260px] text-white">
              {!microscopicZoom ? (
                /* Macro View: Alpha Source -> Lead Plate -> Gold Foil -> Fluorescent ZnS Screen */
                <div className="w-full flex items-center justify-between gap-4 my-4 relative">
                  {/* Alpha Ray Gun */}
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-gradient-to-r from-red-600 to-amber-600 rounded-xl border-2 border-amber-400 flex flex-col items-center justify-center text-[10px] font-black text-white shadow-lg">
                      <span>α-Source</span>
                      <span className="text-[8px] font-mono opacity-80">(Ra / Po)</span>
                    </div>
                    <span className="text-[9px] font-bold text-amber-300 mt-1">Alpha Cannon</span>
                  </div>

                  {/* Fired Particle Beam Animation */}
                  <div className="flex-1 h-12 relative flex items-center">
                    <div className="w-full h-0.5 bg-amber-400/40 border-t border-dashed border-amber-300"></div>
                    {isFiring && (
                      <div className="absolute inset-0 flex items-center justify-around animate-pulse">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-md shadow-amber-400/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-md shadow-amber-400/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-md shadow-amber-400/80"></div>
                      </div>
                    )}
                  </div>

                  {/* Gold Foil Target */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-4 h-24 bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-500 border border-yellow-200 shadow-lg rounded-xs"></div>
                    <span className="text-[9px] font-bold text-yellow-300 mt-1">Thin Gold Foil (1000 atoms)</span>
                  </div>

                  {/* Deflected Paths & Circular ZnS Detector Screen */}
                  <div className="flex-1 h-24 relative flex items-center justify-center">
                    {/* Deflected Ray Paths */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1="0" y1="50%" x2="90%" y2="10%" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1="0" y1="50%" x2="90%" y2="90%" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3,3" />
                      <line x1="0" y1="50%" x2="10%" y2="20%" stroke="#ef4444" strokeWidth="2" strokeDasharray="2,2" />
                    </svg>

                    <div className="w-24 h-24 rounded-full border-2 border-emerald-400/60 border-l-transparent flex items-center justify-center relative">
                      <span className="text-[8px] font-bold text-emerald-400 uppercase text-center px-1">
                        Circular ZnS Screen
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Microscopic Atomic Nucleus Zoom View */
                <div className="w-full flex flex-col items-center justify-center space-y-3 py-2">
                  <span className="text-xs font-mono font-bold text-amber-300">
                    🔬 Microscopic View: Alpha Particles hitting Gold Atom Nucleus (Z=79)
                  </span>

                  <div className="relative w-64 h-48 border border-slate-800 rounded-xl bg-slate-900/90 flex items-center justify-center overflow-hidden">
                    {/* Giant Gold Atom Central Nucleus */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 border-2 border-white shadow-xl shadow-amber-500/50 flex items-center justify-center text-[9px] font-black text-slate-900 z-20">
                      79p⁺
                    </div>
                    <span className="absolute text-[8px] font-mono text-yellow-300 bottom-1">Dense Central Nucleus (Heavy Positive Charge)</span>

                    {/* Orbiting Shell Lines */}
                    <div className="absolute w-40 h-40 rounded-full border border-slate-700/60"></div>
                    <div className="absolute w-56 h-56 rounded-full border border-slate-700/40"></div>

                    {/* Fired Particles Visual Deflection Lines */}
                    {isFiring && (
                      <>
                        <div className="absolute left-0 top-6 w-full h-0.5 bg-amber-400 animate-pulse"></div>
                        <div className="absolute left-0 top-1/2 w-28 h-0.5 bg-red-500 origin-left -rotate-12 animate-pulse"></div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Controls Toolbar */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4 pt-3 border-t border-slate-800 w-full">
                <button
                  onClick={() => fireAlphaParticles(1)}
                  disabled={isFiring}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  🚀 Fire 1 Alpha Particle
                </button>

                <button
                  onClick={() => fireAlphaParticles(1000)}
                  disabled={isFiring}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  💥 Fire Beam (1,000 Particles)
                </button>

                <button
                  onClick={() => fireAlphaParticles(12000)}
                  disabled={isFiring}
                  className="px-4 py-2 bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  🎯 Fire 12,000 Particles (Catch 180° Rebound!)
                </button>
              </div>
            </div>

            {/* Real-Time Experiment Results Counter */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Total Particles Fired</span>
                <span className="text-xl font-black font-mono text-slate-800">{rutherfordFired.toLocaleString()}</span>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block">Passed Undeflected (&gt;99.9%)</span>
                <span className="text-xl font-black font-mono text-emerald-700">{straightPassCount.toLocaleString()}</span>
                <span className="text-[9px] text-emerald-800 block mt-0.5">Proves atom is mostly EMPTY space!</span>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl">
                <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider block">Small Deflections (~0.1%)</span>
                <span className="text-xl font-black font-mono text-amber-700">{deflectedCount.toLocaleString()}</span>
                <span className="text-[9px] text-amber-800 block mt-0.5">Repelled by positive central charge</span>
              </div>

              <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl">
                <span className="text-[10px] font-extrabold text-rose-800 uppercase tracking-wider block">180° Rebound (1 in 12,000)</span>
                <span className="text-xl font-black font-mono text-rose-700">{reboundCount.toLocaleString()}</span>
                <span className="text-[9px] text-rose-800 block mt-0.5">Hits extremely dense tiny nucleus!</span>
              </div>
            </div>

            {/* Rutherford Conclusions Card */}
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl text-xs space-y-2">
              <span className="font-extrabold text-purple-950 uppercase tracking-wider block">
                📌 Major Conclusions from Rutherford's Experiment:
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-700 font-medium">
                <li><b>Most of the space inside an atom is empty</b> because most α-particles passed undeflected.</li>
                <li><b>Positive charge is concentrated in a tiny space</b> because very few α-particles were deflected from their path.</li>
                <li><b>Almost all the atomic mass resides in the central nucleus</b>, which is ~10⁵ times smaller than the atom!</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 3: ATOMIC MODELS & BOHR JUMPS ==================== */}
      {activeTab === "models" && (
        <div className="space-y-5 animate-fade-in">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-3">
              <div>
                <h4 className="font-extrabold text-base text-slate-900">
                  🍉 Historical Evolution of Atomic Models
                </h4>
                <p className="text-xs text-slate-600">
                  Compare how scientists modeled the internal structure of the atom over time.
                </p>
              </div>

              {/* Model Switcher Buttons */}
              <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setSelectedModel("thomson")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                    selectedModel === "thomson" ? "bg-white text-rose-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Watermelon (1897)
                </button>

                <button
                  onClick={() => setSelectedModel("rutherford")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                    selectedModel === "rutherford" ? "bg-white text-amber-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Nuclear Model (1911)
                </button>

                <button
                  onClick={() => setSelectedModel("bohr")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                    selectedModel === "bohr" ? "bg-white text-purple-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Bohr Shells (1913)
                </button>
              </div>
            </div>

            {/* Model Display Stage */}
            {selectedModel === "thomson" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div className="bg-rose-50 border-2 border-rose-200 p-6 rounded-2xl flex flex-col items-center justify-center min-h-[220px]">
                  {/* Thomson Watermelon Diagram */}
                  <div className="w-44 h-44 rounded-full bg-gradient-to-br from-red-400 to-rose-600 border-4 border-emerald-600 flex items-center justify-center relative shadow-lg">
                    <span className="text-[10px] font-black text-white/90 uppercase tracking-widest absolute top-3">
                      Positively Charged Sphere
                    </span>
                    {/* Embedded Black Seeds (Electrons) */}
                    <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-slate-900 text-white text-[8px] font-bold flex items-center justify-center">-</div>
                    <div className="absolute top-12 right-12 w-4 h-4 rounded-full bg-slate-900 text-white text-[8px] font-bold flex items-center justify-center">-</div>
                    <div className="absolute bottom-10 left-14 w-4 h-4 rounded-full bg-slate-900 text-white text-[8px] font-bold flex items-center justify-center">-</div>
                    <div className="absolute bottom-12 right-10 w-4 h-4 rounded-full bg-slate-900 text-white text-[8px] font-bold flex items-center justify-center">-</div>
                    <div className="w-4 h-4 rounded-full bg-slate-900 text-white text-[8px] font-bold flex items-center justify-center">-</div>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  <span className="text-xs font-black uppercase text-rose-800 tracking-wider block">
                    J.J. Thomson's Plum Pudding / Watermelon Model (1897)
                  </span>
                  <p className="leading-relaxed">
                    • Proposed that an atom consists of a positively charged sphere with electrons embedded in it like seeds in a watermelon or raisins in a pudding.
                  </p>
                  <p className="leading-relaxed">
                    • <b>Key Triumph:</b> Explained that negative and positive charges are equal in magnitude, making the atom electrically neutral.
                  </p>
                  <p className="bg-rose-100/80 p-2.5 rounded-xl border border-rose-200 text-rose-950 font-medium">
                    ⚠️ <b>Limitation:</b> Could not explain the results of Rutherford's alpha particle scattering experiments!
                  </p>
                </div>
              </div>
            )}

            {selectedModel === "rutherford" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                <div className="bg-amber-50 border-2 border-amber-200 p-6 rounded-2xl flex flex-col items-center justify-center min-h-[220px]">
                  <div className="w-44 h-44 rounded-full border-2 border-dashed border-amber-400 flex items-center justify-center relative">
                    <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white text-white text-[8px] font-black flex items-center justify-center shadow-md">
                      + Nucleus
                    </div>
                    {/* Orbiting Electron */}
                    <div className="absolute top-0 left-1/2 -ml-2 -mt-2 w-4 h-4 bg-sky-500 rounded-full border border-white text-white text-[8px] font-bold flex items-center justify-center animate-spin" style={{ animationDuration: "3s" }}>
                      e⁻
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  <span className="text-xs font-black uppercase text-amber-800 tracking-wider block">
                    Ernest Rutherford's Nuclear Atomic Model (1911)
                  </span>
                  <p className="leading-relaxed">
                    • Proposed a heavy, positively charged nucleus at the center containing almost all atomic mass.
                  </p>
                  <p className="leading-relaxed">
                    • Electrons revolve around the nucleus in circular paths, similar to planets revolving around the Sun.
                  </p>
                  <p className="bg-amber-100/80 p-2.5 rounded-xl border border-amber-200 text-amber-950 font-medium">
                    ⚠️ <b>Limitation:</b> Maxwell's electromagnetic theory predicted that revolving accelerated electrons must radiate energy continuously, lose speed, and spiral into the nucleus causing atomic collapse!
                  </p>
                </div>
              </div>
            )}

            {selectedModel === "bohr" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                  <div className="bg-purple-50 border-2 border-purple-200 p-6 rounded-2xl flex flex-col items-center justify-center min-h-[240px] relative">
                    <span className="text-[10px] font-black uppercase text-purple-800 tracking-widest absolute top-3">
                      Bohr Stationary Energy Shells (n=1, 2, 3, 4)
                    </span>

                    {/* Interactive Shell Jumping Diagram */}
                    <div className="relative w-52 h-52 flex items-center justify-center my-2">
                      {/* Shell 4 */}
                      <div className={`absolute w-48 h-48 rounded-full border-2 ${bohrEnergyLevel === 4 ? "border-emerald-500 border-solid bg-emerald-50/30" : "border-slate-300 border-dashed"}`}>
                        <span className="absolute -top-2.5 left-1/2 -ml-2 text-[8px] font-bold text-slate-500 bg-white px-1">N (n=4)</span>
                        {bohrEnergyLevel === 4 && <div className="absolute top-0 left-1/2 -ml-2 -mt-2 w-4 h-4 bg-emerald-600 rounded-full text-white text-[8px] font-bold flex items-center justify-center animate-ping">e⁻</div>}
                      </div>

                      {/* Shell 3 */}
                      <div className={`absolute w-36 h-36 rounded-full border-2 ${bohrEnergyLevel === 3 ? "border-amber-500 border-solid bg-amber-50/30" : "border-slate-300 border-dashed"}`}>
                        <span className="absolute -top-2.5 left-1/2 -ml-2 text-[8px] font-bold text-slate-500 bg-white px-1">M (n=3)</span>
                        {bohrEnergyLevel === 3 && <div className="absolute top-0 left-1/2 -ml-2 -mt-2 w-4 h-4 bg-amber-600 rounded-full text-white text-[8px] font-bold flex items-center justify-center animate-ping">e⁻</div>}
                      </div>

                      {/* Shell 2 */}
                      <div className={`absolute w-24 h-24 rounded-full border-2 ${bohrEnergyLevel === 2 ? "border-purple-600 border-solid bg-purple-50/30" : "border-slate-300 border-dashed"}`}>
                        <span className="absolute -top-2.5 left-1/2 -ml-2 text-[8px] font-bold text-slate-500 bg-white px-1">L (n=2)</span>
                        {bohrEnergyLevel === 2 && <div className="absolute top-0 left-1/2 -ml-2 -mt-2 w-4 h-4 bg-purple-600 rounded-full text-white text-[8px] font-bold flex items-center justify-center animate-ping">e⁻</div>}
                      </div>

                      {/* Shell 1 */}
                      <div className={`absolute w-14 h-14 rounded-full border-2 ${bohrEnergyLevel === 1 ? "border-sky-500 border-solid bg-sky-50/30" : "border-slate-300 border-dashed"}`}>
                        <span className="absolute -top-2.5 left-1/2 -ml-2 text-[8px] font-bold text-slate-500 bg-white px-1">K (n=1)</span>
                        {bohrEnergyLevel === 1 && <div className="absolute top-0 left-1/2 -ml-2 -mt-2 w-4 h-4 bg-sky-500 rounded-full text-white text-[8px] font-bold flex items-center justify-center animate-ping">e⁻</div>}
                      </div>

                      {/* Nucleus */}
                      <div className="w-8 h-8 rounded-full bg-rose-500 text-white text-[8px] font-black flex items-center justify-center z-10 shadow-md">
                        +
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs text-slate-700">
                    <span className="text-xs font-black uppercase text-purple-900 tracking-wider block">
                      Niels Bohr's Postulates (1913) & Quantum Energy Jumps
                    </span>
                    <p className="leading-relaxed">
                      1. Electrons revolve ONLY in discrete orbits called <b>stationary energy levels</b> (K, L, M, N or n=1, 2, 3, 4).
                    </p>
                    <p className="leading-relaxed">
                      2. While revolving in these discrete orbits, electrons <b>DO NOT radiate energy</b>, overcoming Rutherford's collapse defect!
                    </p>

                    {/* Energy Transition Simulator Buttons */}
                    <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-200 space-y-2">
                      <span className="font-extrabold text-purple-950 block">⚡ Energy Transition Simulator:</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => triggerBohrJump("absorb")}
                          className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-[11px] rounded-lg transition cursor-pointer active:scale-95"
                        >
                          ⚡ Absorb Photon (+hν)
                        </button>
                        <button
                          onClick={() => triggerBohrJump("emit")}
                          className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[11px] rounded-lg transition cursor-pointer active:scale-95"
                        >
                          💡 Emit Light (-hν)
                        </button>
                      </div>

                      {energyTransitionMsg && (
                        <p className="text-[11px] font-bold text-purple-900 bg-white p-2 rounded-lg border border-purple-200 mt-2">
                          {energyTransitionMsg}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== TAB 4: ISOTOPES & ISOBARS ==================== */}
      {activeTab === "isotopes" && (
        <div className="space-y-6 animate-fade-in">
          {/* Golden Memory Tricks Header */}
          <div className="bg-gradient-to-r from-amber-50 via-purple-50 to-sky-50 border-2 border-purple-200 p-4 rounded-2xl shadow-2xs space-y-3">
            <span className="text-xs font-black uppercase text-purple-900 tracking-wider flex items-center gap-2">
              <span>🧠</span> Golden Mnemonics: How to Never Confuse Isotopes & Isobars!
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-white/90 p-3.5 rounded-xl border border-purple-200 shadow-2xs space-y-1">
                <span className="font-extrabold text-purple-950 text-sm block">
                  ⚛️ ISOTO<span className="text-purple-600 underline decoration-2">P</span>ES: <span className="text-purple-700">P = Same Protons!</span>
                </span>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Atoms of the <b>SAME element</b> with identical Atomic Number Z (Protons), but <b>DIFFERENT Mass Number A (Neutrons)</b>.
                  <br />
                  <span className="text-purple-800 font-bold">✨ Same chemical properties, slightly different physical mass!</span>
                </p>
              </div>

              <div className="bg-white/90 p-3.5 rounded-xl border border-sky-200 shadow-2xs space-y-1">
                <span className="font-extrabold text-sky-950 text-sm block">
                  ⚖️ ISOB<span className="text-sky-600 underline decoration-2">A</span>RS: <span className="text-sky-700">A = Same Mass Number A!</span>
                </span>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Atoms of <b>DIFFERENT elements</b> with different Atomic Number Z (Protons), but <b>IDENTICAL Mass Number A</b>.
                  <br />
                  <span className="text-sky-800 font-bold">✨ Completely different chemical elements with equal total nucleons!</span>
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Pair Visual Selector */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
              <span className="text-xs font-black uppercase text-purple-900 tracking-wider">
                🔬 Interactive Atomic Comparison Studio
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                Select a pair to inspect nuclear particles side-by-side:
              </span>
            </div>

            {/* Category Toggle Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedIsoCategory("hydrogen")}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  selectedIsoCategory === "hydrogen"
                    ? "bg-purple-600 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                🧪 Hydrogen Isotopes (¹H, ²H, ³H)
              </button>
              <button
                onClick={() => setSelectedIsoCategory("carbon")}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  selectedIsoCategory === "carbon"
                    ? "bg-purple-600 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                ⚛️ Carbon Isotopes (¹²C, ¹³C, ¹⁴C)
              </button>
              <button
                onClick={() => setSelectedIsoCategory("uranium")}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  selectedIsoCategory === "uranium"
                    ? "bg-purple-600 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                ☢️ Uranium Isotopes (²³⁵U, ²³⁸U)
              </button>
              <button
                onClick={() => setSelectedIsoCategory("isobar_ca_ar")}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  selectedIsoCategory === "isobar_ca_ar"
                    ? "bg-sky-600 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                ⚖️ Calcium & Argon Isobars (⁴⁰Ca, ⁴⁰Ar)
              </button>
              <button
                onClick={() => setSelectedIsoCategory("isobar_c14_n14")}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  selectedIsoCategory === "isobar_c14_n14"
                    ? "bg-sky-600 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                ⚡ Carbon-14 & Nitrogen-14 Isobars
              </button>
            </div>

            {/* Render Selected Interactive Visual Cards */}
            {selectedIsoCategory === "hydrogen" && (
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900 font-extrabold flex items-center justify-between">
                  <span>Isotope Family: Hydrogen (Z = 1)</span>
                  <span className="text-[10px] bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full uppercase">Same Element (Z = 1)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-sky-50 border-2 border-sky-200 p-4 rounded-xl text-center space-y-2">
                    <span className="text-xl font-black font-mono text-sky-900 block">¹₁H</span>
                    <span className="text-xs font-bold text-sky-800 block">Protium (Ordinary Hydrogen)</span>
                    <div className="bg-white p-2.5 rounded-lg border border-sky-200 text-left text-[11px] space-y-1 font-mono text-slate-700">
                      <div><b>Protons (p⁺):</b> <span className="text-rose-600 font-bold">1</span></div>
                      <div><b>Neutrons (n⁰):</b> <span className="text-sky-600 font-bold">0</span></div>
                      <div><b>Electrons (e⁻):</b> <span className="text-purple-600 font-bold">1</span></div>
                      <div><b>Atomic No. (Z):</b> <span className="font-bold">1</span></div>
                      <div><b>Mass No. (A):</b> <span className="font-bold text-sky-900">1 u</span></div>
                    </div>
                    <span className="text-[10px] text-sky-700 block font-semibold">99.98% abundance in nature</span>
                  </div>

                  <div className="bg-purple-50 border-2 border-purple-200 p-4 rounded-xl text-center space-y-2">
                    <span className="text-xl font-black font-mono text-purple-900 block">²₁H</span>
                    <span className="text-xs font-bold text-purple-800 block">Deuterium (Heavy Hydrogen)</span>
                    <div className="bg-white p-2.5 rounded-lg border border-purple-200 text-left text-[11px] space-y-1 font-mono text-slate-700">
                      <div><b>Protons (p⁺):</b> <span className="text-rose-600 font-bold">1</span></div>
                      <div><b>Neutrons (n⁰):</b> <span className="text-sky-600 font-bold">1 (+1 extra!)</span></div>
                      <div><b>Electrons (e⁻):</b> <span className="text-purple-600 font-bold">1</span></div>
                      <div><b>Atomic No. (Z):</b> <span className="font-bold">1</span></div>
                      <div><b>Mass No. (A):</b> <span className="font-bold text-purple-900">2 u</span></div>
                    </div>
                    <span className="text-[10px] text-purple-700 block font-semibold">Used in Heavy Water (D₂O) reactors</span>
                  </div>

                  <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-xl text-center space-y-2">
                    <span className="text-xl font-black font-mono text-amber-900 block">³₁H</span>
                    <span className="text-xs font-bold text-amber-800 block">Tritium (Radioactive Hydrogen)</span>
                    <div className="bg-white p-2.5 rounded-lg border border-amber-200 text-left text-[11px] space-y-1 font-mono text-slate-700">
                      <div><b>Protons (p⁺):</b> <span className="text-rose-600 font-bold">1</span></div>
                      <div><b>Neutrons (n⁰):</b> <span className="text-sky-600 font-bold">2 (+2 extra!)</span></div>
                      <div><b>Electrons (e⁻):</b> <span className="text-purple-600 font-bold">1</span></div>
                      <div><b>Atomic No. (Z):</b> <span className="font-bold">1</span></div>
                      <div><b>Mass No. (A):</b> <span className="font-bold text-amber-900">3 u</span></div>
                    </div>
                    <span className="text-[10px] text-amber-700 block font-semibold">Radioactive tracer & self-luminous dials</span>
                  </div>
                </div>
              </div>
            )}

            {selectedIsoCategory === "carbon" && (
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900 font-extrabold flex items-center justify-between">
                  <span>Isotope Family: Carbon (Z = 6)</span>
                  <span className="text-[10px] bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full uppercase">Same Element (Z = 6)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-xl text-center space-y-2">
                    <span className="text-xl font-black font-mono text-slate-900 block">¹²₆C</span>
                    <span className="text-xs font-bold text-slate-800 block">Carbon-12 (Standard Reference)</span>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-left text-[11px] space-y-1 font-mono text-slate-700">
                      <div><b>Protons (p⁺):</b> <span className="text-rose-600 font-bold">6</span></div>
                      <div><b>Neutrons (n⁰):</b> <span className="text-sky-600 font-bold">6</span></div>
                      <div><b>Electrons (e⁻):</b> <span className="text-purple-600 font-bold">6</span></div>
                      <div><b>Atomic No. (Z):</b> <span className="font-bold">6</span></div>
                      <div><b>Mass No. (A):</b> <span className="font-bold text-slate-900">12 u</span></div>
                    </div>
                    <span className="text-[10px] text-slate-600 block font-semibold">98.9% natural abundance</span>
                  </div>

                  <div className="bg-purple-50 border-2 border-purple-200 p-4 rounded-xl text-center space-y-2">
                    <span className="text-xl font-black font-mono text-purple-900 block">¹³₆C</span>
                    <span className="text-xs font-bold text-purple-800 block">Carbon-13 (Stable Isotope)</span>
                    <div className="bg-white p-2.5 rounded-lg border border-purple-200 text-left text-[11px] space-y-1 font-mono text-slate-700">
                      <div><b>Protons (p⁺):</b> <span className="text-rose-600 font-bold">6</span></div>
                      <div><b>Neutrons (n⁰):</b> <span className="text-sky-600 font-bold">7 (+1 extra!)</span></div>
                      <div><b>Electrons (e⁻):</b> <span className="text-purple-600 font-bold">6</span></div>
                      <div><b>Atomic No. (Z):</b> <span className="font-bold">6</span></div>
                      <div><b>Mass No. (A):</b> <span className="font-bold text-purple-900">13 u</span></div>
                    </div>
                    <span className="text-[10px] text-purple-700 block font-semibold">1.1% natural abundance (NMR study)</span>
                  </div>

                  <div className="bg-rose-50 border-2 border-rose-200 p-4 rounded-xl text-center space-y-2">
                    <span className="text-xl font-black font-mono text-rose-900 block">¹⁴₆C</span>
                    <span className="text-xs font-bold text-rose-800 block">Carbon-14 (Radioactive)</span>
                    <div className="bg-white p-2.5 rounded-lg border border-rose-200 text-left text-[11px] space-y-1 font-mono text-slate-700">
                      <div><b>Protons (p⁺):</b> <span className="text-rose-600 font-bold">6</span></div>
                      <div><b>Neutrons (n⁰):</b> <span className="text-sky-600 font-bold">8 (+2 extra!)</span></div>
                      <div><b>Electrons (e⁻):</b> <span className="text-purple-600 font-bold">6</span></div>
                      <div><b>Atomic No. (Z):</b> <span className="font-bold">6</span></div>
                      <div><b>Mass No. (A):</b> <span className="font-bold text-rose-900">14 u</span></div>
                    </div>
                    <span className="text-[10px] text-rose-700 block font-semibold">Used for Carbon Dating ancient fossils</span>
                  </div>
                </div>
              </div>
            )}

            {selectedIsoCategory === "uranium" && (
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900 font-extrabold flex items-center justify-between">
                  <span>Isotope Family: Uranium (Z = 92)</span>
                  <span className="text-[10px] bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full uppercase">Same Element (Z = 92)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-xl space-y-2 text-center">
                    <span className="text-2xl font-black font-mono text-amber-950 block">²³⁵₉₂U</span>
                    <span className="text-xs font-bold text-amber-800 block">Uranium-235 (Fissile Nuclear Fuel)</span>
                    <div className="bg-white p-3 rounded-lg border border-amber-200 text-left text-[11px] space-y-1 font-mono text-slate-700">
                      <div><b>Protons (p⁺):</b> <span className="text-rose-600 font-bold">92</span></div>
                      <div><b>Neutrons (n⁰):</b> <span className="text-sky-600 font-bold">143 (235 - 92)</span></div>
                      <div><b>Electrons (e⁻):</b> <span className="text-purple-600 font-bold">92</span></div>
                      <div><b>Atomic No. (Z):</b> <span className="font-bold">92</span></div>
                      <div><b>Mass No. (A):</b> <span className="font-bold text-amber-950">235 u</span></div>
                    </div>
                    <span className="text-[10px] text-amber-800 block font-bold bg-amber-100 p-1 rounded">
                      ☢️ Undergoes nuclear fission in atomic power stations to generate electricity!
                    </span>
                  </div>

                  <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-xl space-y-2 text-center">
                    <span className="text-2xl font-black font-mono text-slate-900 block">²³⁸₉₂U</span>
                    <span className="text-xs font-bold text-slate-800 block">Uranium-238 (Abundant Natural Uranium)</span>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-left text-[11px] space-y-1 font-mono text-slate-700">
                      <div><b>Protons (p⁺):</b> <span className="text-rose-600 font-bold">92</span></div>
                      <div><b>Neutrons (n⁰):</b> <span className="text-sky-600 font-bold">146 (+3 extra neutrons!)</span></div>
                      <div><b>Electrons (e⁻):</b> <span className="text-purple-600 font-bold">92</span></div>
                      <div><b>Atomic No. (Z):</b> <span className="font-bold">92</span></div>
                      <div><b>Mass No. (A):</b> <span className="font-bold text-slate-900">238 u</span></div>
                    </div>
                    <span className="text-[10px] text-slate-700 block font-bold bg-slate-200 p-1 rounded">
                      🌍 Makes up 99.28% of natural uranium found in Earth's crust.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {selectedIsoCategory === "isobar_ca_ar" && (
              <div className="space-y-3">
                <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900 font-extrabold flex items-center justify-between">
                  <span>Isobar Pair: Calcium (Ca) & Argon (Ar)</span>
                  <span className="text-[10px] bg-sky-200 text-sky-900 px-2 py-0.5 rounded-full uppercase">IDENTICAL MASS NUMBER (A = 40)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-xl text-center space-y-2">
                    <span className="text-2xl font-black font-mono text-emerald-950 block">⁴⁰₂₀Ca</span>
                    <span className="text-xs font-bold text-emerald-900 block">Calcium (Reactive Metal)</span>
                    <div className="bg-white p-3 rounded-lg border border-emerald-200 text-left text-[11px] space-y-1 font-mono text-slate-700">
                      <div><b>Protons (p⁺):</b> <span className="text-rose-600 font-bold">20</span></div>
                      <div><b>Neutrons (n⁰):</b> <span className="text-sky-600 font-bold">20 (40 - 20)</span></div>
                      <div><b>Electrons (e⁻):</b> <span className="text-purple-600 font-bold">20</span></div>
                      <div><b>Atomic No. (Z):</b> <span className="text-emerald-700 font-bold">20</span></div>
                      <div className="bg-emerald-100 p-1 rounded"><b>Mass No. (A):</b> <span className="font-black text-emerald-950">40 u</span></div>
                    </div>
                  </div>

                  <div className="bg-teal-50 border-2 border-teal-300 p-4 rounded-xl text-center space-y-2">
                    <span className="text-2xl font-black font-mono text-teal-950 block">⁴⁰₁₈Ar</span>
                    <span className="text-xs font-bold text-teal-900 block">Argon (Inert Noble Gas)</span>
                    <div className="bg-white p-3 rounded-lg border border-teal-200 text-left text-[11px] space-y-1 font-mono text-slate-700">
                      <div><b>Protons (p⁺):</b> <span className="text-rose-600 font-bold">18</span></div>
                      <div><b>Neutrons (n⁰):</b> <span className="text-sky-600 font-bold">22 (40 - 18)</span></div>
                      <div><b>Electrons (e⁻):</b> <span className="text-purple-600 font-bold">18</span></div>
                      <div><b>Atomic No. (Z):</b> <span className="text-teal-700 font-bold">18</span></div>
                      <div className="bg-teal-100 p-1 rounded"><b>Mass No. (A):</b> <span className="font-black text-teal-950">40 u</span></div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-sky-100/60 border border-sky-300 rounded-xl text-xs text-sky-950 font-medium">
                  💡 <b>Notice the Isobar Contrast:</b> Calcium is a solid reactive metal while Argon is an unreactive gas! Though chemically totally different (Z=20 vs Z=18), both have <b>exactly identical total mass A = 40 u</b>.
                </div>
              </div>
            )}

            {selectedIsoCategory === "isobar_c14_n14" && (
              <div className="space-y-3">
                <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900 font-extrabold flex items-center justify-between">
                  <span>Isobar Pair: Carbon-14 (C) & Nitrogen-14 (N)</span>
                  <span className="text-[10px] bg-sky-200 text-sky-900 px-2 py-0.5 rounded-full uppercase">IDENTICAL MASS NUMBER (A = 14)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-rose-50 border-2 border-rose-300 p-4 rounded-xl text-center space-y-2">
                    <span className="text-2xl font-black font-mono text-rose-950 block">¹⁴₆C</span>
                    <span className="text-xs font-bold text-rose-900 block">Carbon-14 (Non-metal Element)</span>
                    <div className="bg-white p-3 rounded-lg border border-rose-200 text-left text-[11px] space-y-1 font-mono text-slate-700">
                      <div><b>Protons (p⁺):</b> <span className="text-rose-600 font-bold">6</span></div>
                      <div><b>Neutrons (n⁰):</b> <span className="text-sky-600 font-bold">8</span></div>
                      <div><b>Electrons (e⁻):</b> <span className="text-purple-600 font-bold">6</span></div>
                      <div><b>Atomic No. (Z):</b> <span className="font-bold text-rose-700">6</span></div>
                      <div className="bg-rose-100 p-1 rounded"><b>Mass No. (A):</b> <span className="font-black text-rose-950">14 u</span></div>
                    </div>
                  </div>

                  <div className="bg-indigo-50 border-2 border-indigo-300 p-4 rounded-xl text-center space-y-2">
                    <span className="text-2xl font-black font-mono text-indigo-950 block">¹⁴₇N</span>
                    <span className="text-xs font-bold text-indigo-900 block">Nitrogen-14 (Atmospheric Gas)</span>
                    <div className="bg-white p-3 rounded-lg border border-indigo-200 text-left text-[11px] space-y-1 font-mono text-slate-700">
                      <div><b>Protons (p⁺):</b> <span className="text-rose-600 font-bold">7</span></div>
                      <div><b>Neutrons (n⁰):</b> <span className="text-sky-600 font-bold">7</span></div>
                      <div><b>Electrons (e⁻):</b> <span className="text-purple-600 font-bold">7</span></div>
                      <div><b>Atomic No. (Z):</b> <span className="font-bold text-indigo-700">7</span></div>
                      <div className="bg-indigo-100 p-1 rounded"><b>Mass No. (A):</b> <span className="font-black text-indigo-950">14 u</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Side-by-Side Summary Comparison Table */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
            <span className="text-xs font-black uppercase text-purple-900 tracking-wider block border-b pb-2">
              📊 Side-by-Side Quick Summary Comparison
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800">
                    <th className="p-2.5 border border-slate-200">Feature</th>
                    <th className="p-2.5 border border-slate-200 text-purple-900 bg-purple-50 font-black">Isotopes (e.g. ³⁵Cl & ³⁷Cl)</th>
                    <th className="p-2.5 border border-slate-200 text-sky-900 bg-sky-50 font-black">Isobars (e.g. ⁴⁰Ca & ⁴⁰Ar)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-[11px]">
                  <tr>
                    <td className="p-2 border border-slate-200 font-extrabold text-slate-800">Atomic Number Z (Protons)</td>
                    <td className="p-2 border border-slate-200 text-purple-800 font-extrabold bg-purple-50/50">✅ SAME (Identical Z)</td>
                    <td className="p-2 border border-slate-200 text-rose-700 font-extrabold bg-sky-50/50">❌ DIFFERENT</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200 font-extrabold text-slate-800">Mass Number A (Protons + Neutrons)</td>
                    <td className="p-2 border border-slate-200 text-rose-700 font-extrabold bg-purple-50/50">❌ DIFFERENT</td>
                    <td className="p-2 border border-slate-200 text-sky-800 font-extrabold bg-sky-50/50">✅ SAME (Identical A)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200 font-extrabold text-slate-800">Chemical Properties</td>
                    <td className="p-2 border border-slate-200 text-purple-900 bg-purple-50/50"><b>Identical</b> (same valence electrons)</td>
                    <td className="p-2 border border-slate-200 text-sky-900 bg-sky-50/50"><b>Different</b> (different elements)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200 font-extrabold text-slate-800">Physical Properties (Mass, Density)</td>
                    <td className="p-2 border border-slate-200 text-purple-900 bg-purple-50/50"><b>Slightly Different</b> (different masses)</td>
                    <td className="p-2 border border-slate-200 text-sky-900 bg-sky-50/50"><b>Completely Different</b></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Self-Test Practice Challenge */}
          <div className="bg-gradient-to-br from-purple-900 to-indigo-950 text-white p-5 rounded-2xl space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-purple-700/60 pb-3">
              <div>
                <span className="text-xs font-black uppercase text-purple-300 tracking-wider block">
                  🎯 Interactive Self-Test Challenge: "Isotope or Isobar?"
                </span>
                <span className="text-[11px] text-purple-200">
                  Test your understanding instantly! Question {isoQuizIdx + 1} of {ISO_QUIZ_QUESTIONS.length}
                </span>
              </div>
              <div className="bg-purple-800 px-3 py-1 rounded-full text-xs font-mono font-extrabold text-amber-300">
                Score: {isoQuizScore} / {ISO_QUIZ_QUESTIONS.length}
              </div>
            </div>

            {/* Current Question Display */}
            <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-purple-400/30 space-y-3">
              <span className="text-sm font-extrabold text-amber-300 block">
                {ISO_QUIZ_QUESTIONS[isoQuizIdx].title}
              </span>
              <p className="text-xs text-purple-100">
                Inspect this pair of atoms:
              </p>
              <div className="flex items-center justify-center gap-6 py-2">
                <span className="font-mono text-xl font-black text-amber-300 bg-black/40 px-4 py-2 rounded-xl border border-amber-400/40">
                  {ISO_QUIZ_QUESTIONS[isoQuizIdx].pair[0]}
                </span>
                <span className="text-purple-300 font-bold text-sm">VS</span>
                <span className="font-mono text-xl font-black text-amber-300 bg-black/40 px-4 py-2 rounded-xl border border-amber-400/40">
                  {ISO_QUIZ_QUESTIONS[isoQuizIdx].pair[1]}
                </span>
              </div>

              {/* Quiz Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  disabled={isoQuizUserAnswer !== null}
                  onClick={() => {
                    const isCorrect = ISO_QUIZ_QUESTIONS[isoQuizIdx].type === "isotope";
                    setIsoQuizUserAnswer("isotope");
                    if (isCorrect) setIsoQuizScore(prev => prev + 1);
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-black text-xs transition cursor-pointer ${
                    isoQuizUserAnswer === "isotope"
                      ? (ISO_QUIZ_QUESTIONS[isoQuizIdx].type === "isotope" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white")
                      : "bg-purple-600 hover:bg-purple-500 text-white"
                  }`}
                >
                  ⚛️ ISOTOPES (Same Z)
                </button>

                <button
                  disabled={isoQuizUserAnswer !== null}
                  onClick={() => {
                    const isCorrect = ISO_QUIZ_QUESTIONS[isoQuizIdx].type === "isobar";
                    setIsoQuizUserAnswer("isobar");
                    if (isCorrect) setIsoQuizScore(prev => prev + 1);
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-black text-xs transition cursor-pointer ${
                    isoQuizUserAnswer === "isobar"
                      ? (ISO_QUIZ_QUESTIONS[isoQuizIdx].type === "isobar" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white")
                      : "bg-sky-600 hover:bg-sky-500 text-white"
                  }`}
                >
                  ⚖️ ISOBARS (Same A)
                </button>
              </div>

              {/* Feedback Explanation */}
              {isoQuizUserAnswer !== null && (
                <div className="bg-black/50 p-3 rounded-xl border border-purple-400/40 space-y-2 text-xs animate-fade-in">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {isoQuizUserAnswer === ISO_QUIZ_QUESTIONS[isoQuizIdx].type ? "🎉" : "❌"}
                    </span>
                    <span className={`font-black ${isoQuizUserAnswer === ISO_QUIZ_QUESTIONS[isoQuizIdx].type ? "text-emerald-400" : "text-rose-300"}`}>
                      {isoQuizUserAnswer === ISO_QUIZ_QUESTIONS[isoQuizIdx].type ? "Correct Answer!" : `Incorrect! It is an ${ISO_QUIZ_QUESTIONS[isoQuizIdx].type.toUpperCase()}`}
                    </span>
                  </div>
                  <p className="text-purple-200 text-[11px] leading-relaxed">
                    {ISO_QUIZ_QUESTIONS[isoQuizIdx].explanation}
                  </p>

                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => {
                        setIsoQuizUserAnswer(null);
                        setIsoQuizIdx((prev) => (prev + 1) % ISO_QUIZ_QUESTIONS.length);
                      }}
                      className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-purple-950 font-black text-xs rounded-lg transition cursor-pointer"
                    >
                      Next Question ➔
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chlorine Fractional Atomic Mass & Radioactive Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Fractional Atomic Mass Calculator for Chlorine */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
              <span className="text-xs font-black uppercase text-purple-900 tracking-wider block border-b pb-2">
                🧮 Fractional Atomic Mass Calculator (Chlorine)
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Why is Chlorine's atomic mass 35.5 u instead of a whole number? Because natural chlorine is a mixture of two isotopes: <b>³⁵Cl</b> and <b>³⁷Cl</b> in a 3:1 ratio!
              </p>

              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                  <span>Isotope Abundance Slider:</span>
                  <span className="text-purple-700 font-mono">³⁵Cl: {cl35Percent}% | ³⁷Cl: {100 - cl35Percent}%</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cl35Percent}
                  onChange={(e) => setCl35Percent(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />

                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 font-mono text-xs text-purple-950 font-extrabold text-center space-y-1">
                  <div>Average Mass Formula:</div>
                  <div className="text-purple-700">({35} × {cl35Percent}% + {37} × {100 - cl35Percent}%) / 100</div>
                  <div className="text-sm font-black text-purple-950 bg-white p-1 rounded border border-purple-300 mt-1">
                    = {((35 * cl35Percent + 37 * (100 - cl35Percent)) / 100).toFixed(2)} u
                  </div>
                </div>
              </div>
            </div>

            {/* Vital Applications of Radioactive Isotopes */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
              <span className="text-xs font-black uppercase text-purple-900 tracking-wider block border-b pb-2">
                💡 Vital Real-World Applications of Isotopes
              </span>

              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2.5">
                  <span className="text-xl">☢️</span>
                  <div>
                    <span className="font-extrabold text-amber-950 block">Uranium-235 (²³⁵U)</span>
                    <span className="text-[11px] text-amber-800">Used as fuel in nuclear reactors to generate clean electricity.</span>
                  </div>
                </div>

                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5">
                  <span className="text-xl">🩺</span>
                  <div>
                    <span className="font-extrabold text-rose-950 block">Cobalt-60 (⁶⁰Co)</span>
                    <span className="text-[11px] text-rose-800">Used in radiotherapy for cancer treatment to destroy malignant tumor cells.</span>
                  </div>
                </div>

                <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-xl flex items-center gap-2.5">
                  <span className="text-xl">💉</span>
                  <div>
                    <span className="font-extrabold text-purple-950 block">Iodine-131 (¹³¹I)</span>
                    <span className="text-[11px] text-purple-800">Used in medical diagnosis and treatment of thyroid goitre disease.</span>
                  </div>
                </div>

                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5">
                  <span className="text-xl">🦴</span>
                  <div>
                    <span className="font-extrabold text-emerald-950 block">Carbon-14 (¹⁴C)</span>
                    <span className="text-[11px] text-emerald-800">Used in Radiocarbon Dating to determine the age of ancient fossils and relics.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 5: HIERARCHY OF MATTER ==================== */}
      {activeTab === "hierarchy" && (
        <div className="space-y-5 animate-fade-in">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
            <h4 className="font-extrabold text-base text-slate-900 border-b pb-2">
              🏢 Hierarchy of Matter: From Macroscopic Objects to Subatomic Particles
            </h4>
            <p className="text-xs text-slate-600">
              Everything in our surroundings—living or non-living—is ultimately composed of subatomic particles!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Non-Living System */}
              <div className="bg-amber-50/60 border-2 border-amber-200 p-4 rounded-2xl space-y-3">
                <span className="text-xs font-black uppercase text-amber-900 tracking-wider block">
                  🧱 Non-Living Physical Structure Hierarchy
                </span>

                <div className="flex flex-col gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200 font-bold text-amber-950 flex justify-between items-center shadow-2xs">
                    <span>1. Building / House</span>
                    <span className="text-[10px] text-amber-700 font-mono">Macro World</span>
                  </div>
                  <div className="text-center text-amber-500 font-bold text-xs">↓</div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200 font-bold text-amber-950 flex justify-between items-center shadow-2xs">
                    <span>2. Room & Brick Wall</span>
                    <span className="text-[10px] text-amber-700 font-mono">Structural Unit</span>
                  </div>
                  <div className="text-center text-amber-500 font-bold text-xs">↓</div>
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200 font-bold text-amber-950 flex justify-between items-center shadow-2xs">
                    <span>3. Clay & Silicon Molecules</span>
                    <span className="text-[10px] text-amber-700 font-mono">Chemical Compounds</span>
                  </div>
                  <div className="text-center text-amber-500 font-bold text-xs">↓</div>
                  <div className="bg-purple-600 text-white p-3 rounded-xl font-extrabold flex justify-between items-center shadow-md">
                    <span>4. Atoms & Subatomic Particles (p⁺, n⁰, e⁻)</span>
                    <span className="text-[10px] font-mono bg-purple-800 px-2 py-0.5 rounded">Fundamental Unit</span>
                  </div>
                </div>
              </div>

              {/* Living System */}
              <div className="bg-emerald-50/60 border-2 border-emerald-200 p-4 rounded-2xl space-y-3">
                <span className="text-xs font-black uppercase text-emerald-900 tracking-wider block">
                  🧬 Living Biological Organism Hierarchy
                </span>

                <div className="flex flex-col gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200 font-bold text-emerald-950 flex justify-between items-center shadow-2xs">
                    <span>1. Human Body</span>
                    <span className="text-[10px] text-emerald-700 font-mono">Organism</span>
                  </div>
                  <div className="text-center text-emerald-500 font-bold text-xs">↓</div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200 font-bold text-emerald-950 flex justify-between items-center shadow-2xs">
                    <span>2. Organs, Tissues & Cells</span>
                    <span className="text-[10px] text-emerald-700 font-mono">Biological Unit</span>
                  </div>
                  <div className="text-center text-emerald-500 font-bold text-xs">↓</div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200 font-bold text-emerald-950 flex justify-between items-center shadow-2xs">
                    <span>3. Proteins, DNA & Biomolecules</span>
                    <span className="text-[10px] text-emerald-700 font-mono">Organic Molecules</span>
                  </div>
                  <div className="text-center text-emerald-500 font-bold text-xs">↓</div>
                  <div className="bg-purple-600 text-white p-3 rounded-xl font-extrabold flex justify-between items-center shadow-md">
                    <span>4. Atoms & Subatomic Particles (C, H, O, N, P, S)</span>
                    <span className="text-[10px] font-mono bg-purple-800 px-2 py-0.5 rounded">Fundamental Unit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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

export function Grade6EnglishGrammarLab({ activeChapterId }: { activeChapterId?: string }) {
  const [activeTab, setActiveTab] = useState<"pos" | "tenses" | "articles" | "sentences" | "letters">("pos");

  // Parts of Speech state
  const [selectedSentenceIdx, setSelectedSentenceIdx] = useState<number>(0);

  // Letter Writing State
  const [letterType, setLetterType] = useState<"formal" | "informal">("formal");
  const [studentName, setStudentName] = useState<string>("Aarav Sharma");
  const [classRoll, setClassRoll] = useState<string>("Grade 6-A, Roll No. 14");
  const [schoolName, setSchoolName] = useState<string>("Modern Public School, New Delhi");
  const [leaveReason, setLeaveReason] = useState<string>("severe viral fever and doctor's advice for rest");
  const [leaveDays, setLeaveDays] = useState<number>(2);
  const [friendName, setFriendName] = useState<string>("Rohan");
  const [eventTopic, setEventTopic] = useState<string>("my 12th Birthday Celebration");
  const sampleSentences = [
    {
      text: "The brave astronaut Kalpana Chawla flew gracefully into space.",
      tokens: [
        { word: "The", pos: "Article", desc: "Definite Article pointing to a specific astronaut", color: "bg-amber-100 text-amber-900 border-amber-300" },
        { word: "brave", pos: "Adjective", desc: "Describes the noun 'astronaut'", color: "bg-emerald-100 text-emerald-900 border-emerald-300" },
        { word: "astronaut", pos: "Common Noun", desc: "Names a person/profession", color: "bg-blue-100 text-blue-900 border-blue-300" },
        { word: "Kalpana Chawla", pos: "Proper Noun", desc: "Specific name of the famous astronaut", color: "bg-indigo-100 text-indigo-900 border-indigo-300" },
        { word: "flew", pos: "Action Verb (Past)", desc: "Irregular past tense action of fly", color: "bg-rose-100 text-rose-900 border-rose-300" },
        { word: "gracefully", pos: "Adverb", desc: "Modifies the verb 'flew' (tells HOW she flew)", color: "bg-purple-100 text-purple-900 border-purple-300" },
        { word: "into", pos: "Preposition", desc: "Shows direction of movement towards the inside of space", color: "bg-teal-100 text-teal-900 border-teal-300" },
        { word: "space.", pos: "Abstract/Common Noun", desc: "Names the physical cosmos destination", color: "bg-sky-100 text-sky-900 border-sky-300" }
      ]
    },
    {
      text: "Patrick worked hard, but his clever elf quietly solved the problems.",
      tokens: [
        { word: "Patrick", pos: "Proper Noun", desc: "Specific name of a boy", color: "bg-indigo-100 text-indigo-900 border-indigo-300" },
        { word: "worked", pos: "Action Verb (Past)", desc: "Past tense of work", color: "bg-rose-100 text-rose-900 border-rose-300" },
        { word: "hard,", pos: "Adverb", desc: "Tells HOW Patrick worked", color: "bg-purple-100 text-purple-900 border-purple-300" },
        { word: "but", pos: "Conjunction", desc: "Coordinating conjunction joining two contrasting thoughts", color: "bg-amber-100 text-amber-900 border-amber-300" },
        { word: "his", pos: "Possessive Pronoun", desc: "Replaces Patrick to show ownership of the elf", color: "bg-cyan-100 text-cyan-900 border-cyan-300" },
        { word: "clever", pos: "Adjective", desc: "Describes the elf's quality", color: "bg-emerald-100 text-emerald-900 border-emerald-300" },
        { word: "elf", pos: "Common Noun", desc: "Names a mythical creature", color: "bg-blue-100 text-blue-900 border-blue-300" },
        { word: "quietly", pos: "Adverb", desc: "Describes HOW the elf solved problems", color: "bg-purple-100 text-purple-900 border-purple-300" },
        { word: "solved", pos: "Action Verb (Past)", desc: "Past tense action", color: "bg-rose-100 text-rose-900 border-rose-300" },
        { word: "the", pos: "Article", desc: "Definite Article", color: "bg-amber-100 text-amber-900 border-amber-300" },
        { word: "problems.", pos: "Common Noun", desc: "Plural noun", color: "bg-blue-100 text-blue-900 border-blue-300" }
      ]
    }
  ];
  const [selectedTokenIdx, setSelectedTokenIdx] = useState<number | null>(0);

  // Tense state
  const [subjectPerson, setSubjectPerson] = useState<"He" | "She" | "They" | "I">("He");
  const [selectedVerb, setSelectedVerb] = useState<{ base: string; past: string; participle: string; ing: string; obj: string }>({
    base: "write",
    past: "wrote",
    participle: "written",
    ing: "writing",
    obj: "an English story"
  });

  const verbsList = [
    { base: "write", past: "wrote", participle: "written", ing: "writing", obj: "an English story" },
    { base: "play", past: "played", participle: "played", ing: "playing", obj: "cricket in the garden" },
    { base: "eat", past: "ate", participle: "eaten", ing: "eating", obj: "a healthy red apple" },
    { base: "read", past: "read", participle: "read", ing: "reading", obj: "a fascinating science book" }
  ];

  // Articles & Preposition State
  const [articleTestWord, setArticleTestWord] = useState<string>("apple");
  const articleExamples = [
    { word: "apple", correct: "an", rule: "Starts with vowel sound 'a' → AN apple" },
    { word: "honest man", correct: "an", rule: "Silent 'h' sound 'on-est' → AN honest man" },
    { word: "European country", correct: "a", rule: "Starts with consonant sound 'yoo' → A European country" },
    { word: "Taj Mahal", correct: "the", rule: "Unique historic monument → THE Taj Mahal" },
    { word: "Sun", correct: "the", rule: "Unique celestial body → THE Sun" },
    { word: "university", correct: "a", rule: "Starts with consonant sound 'yoo' → A university" },
    { word: "hour", correct: "an", rule: "Silent 'h' sound 'ow-er' → AN hour" }
  ];

  return (
    <div className="flex flex-col gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200 font-mono">
            Grade 6 English • CBSE / NCERT Grammar & Composition
          </span>
          <h3 className="text-lg font-extrabold text-slate-800 mt-1">
            📝 Grade 6 English Grammar & Sentence Mechanics Laboratory
          </h3>
        </div>
        <span className="text-xs font-mono font-black text-purple-700 bg-purple-100 border border-purple-300 px-3 py-1 rounded-xl">
          Grammar Mastery Studio
        </span>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("pos")}
          className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
            activeTab === "pos" ? "bg-purple-700 text-white shadow-xs" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          🏷️ 1. Parts of Speech Studio
        </button>
        <button
          onClick={() => setActiveTab("tenses")}
          className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
            activeTab === "tenses" ? "bg-purple-700 text-white shadow-xs" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          ⏳ 2. Tenses & Verb Forms
        </button>
        <button
          onClick={() => setActiveTab("articles")}
          className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
            activeTab === "articles" ? "bg-purple-700 text-white shadow-xs" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          🔤 3. Articles & Prepositions
        </button>
        <button
          onClick={() => setActiveTab("sentences")}
          className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
            activeTab === "sentences" ? "bg-purple-700 text-white shadow-xs" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          💬 4. Sentence Types & Voice
        </button>
        <button
          onClick={() => setActiveTab("letters")}
          className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
            activeTab === "letters" ? "bg-purple-700 text-white shadow-xs" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          ✉️ 5. Formal & Informal Letter Writing
        </button>
      </div>

      {/* TAB 1: Parts of Speech Studio */}
      {activeTab === "pos" && (
        <div className="space-y-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h4 className="text-sm font-extrabold text-slate-800">🔍 Interactive Sentence Parts-of-Speech Analyzer</h4>
              <p className="text-xs text-slate-500">Click any word in the sentence to analyze its grammatical role, category, and usage rules!</p>
            </div>
            <div className="flex gap-2 text-xs font-bold">
              <button
                onClick={() => { setSelectedSentenceIdx(0); setSelectedTokenIdx(0); }}
                className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                  selectedSentenceIdx === 0 ? "bg-purple-100 text-purple-900 border-purple-300" : "bg-slate-50 text-slate-600"
                }`}
              >
                Sentence 1
              </button>
              <button
                onClick={() => { setSelectedSentenceIdx(1); setSelectedTokenIdx(0); }}
                className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                  selectedSentenceIdx === 1 ? "bg-purple-100 text-purple-900 border-purple-300" : "bg-slate-50 text-slate-600"
                }`}
              >
                Sentence 2
              </button>
            </div>
          </div>

          {/* Clickable Sentence Display */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono text-purple-300 font-extrabold uppercase">
              Click a word below to inspect:
            </span>
            <div className="flex flex-wrap gap-2 text-sm sm:text-base font-medium">
              {sampleSentences[selectedSentenceIdx].tokens.map((token, tIdx) => (
                <button
                  key={tIdx}
                  onClick={() => setSelectedTokenIdx(tIdx)}
                  className={`px-3 py-1.5 rounded-lg border font-mono font-bold transition-all cursor-pointer ${
                    selectedTokenIdx === tIdx
                      ? "ring-2 ring-purple-400 scale-105 shadow-md " + token.color
                      : "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  {token.word}
                </button>
              ))}
            </div>
          </div>

          {/* Inspector Panel */}
          {selectedTokenIdx !== null && (
            <div className={`p-4 rounded-xl border space-y-2 ${sampleSentences[selectedSentenceIdx].tokens[selectedTokenIdx].color}`}>
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono uppercase font-black tracking-wider">
                  WORD: "{sampleSentences[selectedSentenceIdx].tokens[selectedTokenIdx].word}"
                </span>
                <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded bg-white/80 border border-black/10 font-mono">
                  {sampleSentences[selectedSentenceIdx].tokens[selectedTokenIdx].pos}
                </span>
              </div>
              <p className="text-xs font-medium leading-relaxed">
                {sampleSentences[selectedSentenceIdx].tokens[selectedTokenIdx].desc}
              </p>
            </div>
          )}

          {/* 8 Parts of Speech Quick Reference Card Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            {[
              { title: "Noun", desc: "Name of person, place, thing, or idea", example: "Delhi, Book, Honesty", color: "border-blue-200 bg-blue-50/60" },
              { title: "Pronoun", desc: "Replaces a noun to avoid repetition", example: "He, She, They, Myself", color: "border-cyan-200 bg-cyan-50/60" },
              { title: "Verb", desc: "Shows action or state of being", example: "Run, Is, Wrote, Become", color: "border-rose-200 bg-rose-50/60" },
              { title: "Adjective", desc: "Describes or modifies a noun", example: "Brave, Clever, Three", color: "border-emerald-200 bg-emerald-50/60" },
              { title: "Adverb", desc: "Modifies verb, adj, or adverb", example: "Gracefully, Very, Quietly", color: "border-purple-200 bg-purple-50/60" },
              { title: "Preposition", desc: "Shows direction, place, or time", example: "In, On, Under, Into", color: "border-teal-200 bg-teal-50/60" },
              { title: "Conjunction", desc: "Joins words, phrases, or clauses", example: "And, But, Because, So", color: "border-amber-200 bg-amber-50/60" },
              { title: "Interjection", desc: "Expresses sudden emotion/exclamation", example: "Wow!, Alas!, Hurrah!", color: "border-fuchsia-200 bg-fuchsia-50/60" }
            ].map((item, idx) => (
              <div key={idx} className={`p-3 rounded-xl border text-xs space-y-1 ${item.color}`}>
                <div className="font-extrabold text-slate-800">{item.title}</div>
                <div className="text-[11px] text-slate-600 leading-tight">{item.desc}</div>
                <div className="text-[10px] font-mono font-bold text-slate-700 pt-1 border-t border-slate-200">
                  E.g. {item.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Tenses & Verb Forms */}
      {activeTab === "tenses" && (
        <div className="space-y-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h4 className="text-sm font-extrabold text-slate-800">⏳ Interactive Tense Transformer & Conjugator</h4>
            <p className="text-xs text-slate-500">Select a subject pronoun and verb to watch how sentences change across Present, Past, and Future tenses!</p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <span className="text-xs font-extrabold text-slate-700 block">👤 Select Subject:</span>
              <div className="flex gap-2">
                {(["He", "She", "They", "I"] as const).map((subj) => (
                  <button
                    key={subj}
                    onClick={() => setSubjectPerson(subj)}
                    className={`flex-1 py-2 text-xs font-extrabold rounded-xl border transition-all cursor-pointer ${
                      subjectPerson === subj
                        ? "bg-purple-700 text-white border-purple-800 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-extrabold text-slate-700 block">⚡ Select Action Verb:</span>
              <select
                value={selectedVerb.base}
                onChange={(e) => {
                  const found = verbsList.find((v) => v.base === e.target.value);
                  if (found) setSelectedVerb(found);
                }}
                className="w-full p-2 bg-slate-50 border border-slate-200 text-xs font-extrabold rounded-xl text-slate-800 cursor-pointer"
              >
                {verbsList.map((v) => (
                  <option key={v.base} value={v.base}>
                    {v.base.toUpperCase()} ({v.base} - {v.past} - {v.participle})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tenses Grid Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* PRESENT TENSE */}
            <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 space-y-2 text-xs">
              <div className="font-extrabold text-blue-900 border-b border-blue-200 pb-1 flex justify-between">
                <span>🌞 Present Tense</span>
                <span className="text-[10px] bg-blue-200 text-blue-900 px-2 py-0.5 rounded font-mono">Current / Habit</span>
              </div>
              <div className="space-y-1.5 font-mono">
                <div>
                  <span className="font-bold text-slate-500 text-[10px] block">Simple Present:</span>
                  <p className="text-slate-800 font-bold bg-white p-2 rounded border border-blue-100">
                    {subjectPerson} {subjectPerson === "He" || subjectPerson === "She" ? (selectedVerb.base === "write" ? "writes" : selectedVerb.base === "play" ? "plays" : selectedVerb.base === "eat" ? "eats" : "reads") : selectedVerb.base} {selectedVerb.obj}.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 text-[10px] block">Present Continuous:</span>
                  <p className="text-slate-800 font-bold bg-white p-2 rounded border border-blue-100">
                    {subjectPerson} {subjectPerson === "I" ? "am" : subjectPerson === "They" ? "are" : "is"} {selectedVerb.ing} {selectedVerb.obj}.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 text-[10px] block">Present Perfect:</span>
                  <p className="text-slate-800 font-bold bg-white p-2 rounded border border-blue-100">
                    {subjectPerson} {subjectPerson === "He" || subjectPerson === "She" ? "has" : "have"} {selectedVerb.participle} {selectedVerb.obj}.
                  </p>
                </div>
              </div>
            </div>

            {/* PAST TENSE */}
            <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-2 text-xs">
              <div className="font-extrabold text-amber-900 border-b border-amber-200 pb-1 flex justify-between">
                <span>🕰️ Past Tense</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-mono">Completed</span>
              </div>
              <div className="space-y-1.5 font-mono">
                <div>
                  <span className="font-bold text-slate-500 text-[10px] block">Simple Past:</span>
                  <p className="text-slate-800 font-bold bg-white p-2 rounded border border-amber-100">
                    {subjectPerson} {selectedVerb.past} {selectedVerb.obj}.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 text-[10px] block">Past Continuous:</span>
                  <p className="text-slate-800 font-bold bg-white p-2 rounded border border-amber-100">
                    {subjectPerson} {subjectPerson === "They" ? "were" : "was"} {selectedVerb.ing} {selectedVerb.obj}.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 text-[10px] block">Past Perfect:</span>
                  <p className="text-slate-800 font-bold bg-white p-2 rounded border border-amber-100">
                    {subjectPerson} had {selectedVerb.participle} {selectedVerb.obj}.
                  </p>
                </div>
              </div>
            </div>

            {/* FUTURE TENSE */}
            <div className="p-4 bg-purple-50/70 rounded-xl border border-purple-200 space-y-2 text-xs">
              <div className="font-extrabold text-purple-900 border-b border-purple-200 pb-1 flex justify-between">
                <span>🚀 Future Tense</span>
                <span className="text-[10px] bg-purple-200 text-purple-900 px-2 py-0.5 rounded font-mono">Upcoming</span>
              </div>
              <div className="space-y-1.5 font-mono">
                <div>
                  <span className="font-bold text-slate-500 text-[10px] block">Simple Future:</span>
                  <p className="text-slate-800 font-bold bg-white p-2 rounded border border-purple-100">
                    {subjectPerson} will {selectedVerb.base} {selectedVerb.obj}.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 text-[10px] block">Future Continuous:</span>
                  <p className="text-slate-800 font-bold bg-white p-2 rounded border border-purple-100">
                    {subjectPerson} will be {selectedVerb.ing} {selectedVerb.obj}.
                  </p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 text-[10px] block">Future Perfect:</span>
                  <p className="text-slate-800 font-bold bg-white p-2 rounded border border-purple-100">
                    {subjectPerson} will have {selectedVerb.participle} {selectedVerb.obj}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Articles & Prepositions */}
      {activeTab === "articles" && (
        <div className="space-y-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h4 className="text-sm font-extrabold text-slate-800">🔤 Articles (A, An, The) & Preposition Rules</h4>
            <p className="text-xs text-slate-500">Learn why phonetic vowel sounds (not just letters) dictate the choice between 'A' and 'AN'!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Articles Rule Box */}
            <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-3">
              <div className="font-extrabold text-amber-300 font-mono text-xs uppercase">
                🎯 Article Selector Test Card:
              </div>
              <div className="space-y-2">
                <span className="text-xs text-slate-300 block">Select a word to test:</span>
                <div className="flex flex-wrap gap-1.5">
                  {articleExamples.map((ex) => (
                    <button
                      key={ex.word}
                      onClick={() => setArticleTestWord(ex.word)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        articleTestWord === ex.word
                          ? "bg-amber-400 text-slate-950 shadow-xs"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {ex.word}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Article Rule Result */}
              {(() => {
                const item = articleExamples.find((ex) => ex.word === articleTestWord) || articleExamples[0];
                return (
                  <div className="p-3 bg-slate-950 rounded-lg border border-amber-500/30 space-y-1 font-mono">
                    <div className="text-emerald-400 font-extrabold text-sm">
                      Result: <span className="bg-emerald-900/80 px-2 py-0.5 rounded text-white font-black">{item.correct.toUpperCase()}</span> {item.word}
                    </div>
                    <p className="text-slate-300 text-[11px] leading-snug">{item.rule}</p>
                  </div>
                );
              })()}
            </div>

            {/* Common Spatial Prepositions Guide */}
            <div className="p-4 bg-purple-50/80 rounded-xl border border-purple-200 space-y-2">
              <div className="font-extrabold text-purple-900 border-b border-purple-200 pb-1">
                📍 Essential Prepositions in Action
              </div>
              <ul className="space-y-2 text-slate-700 leading-snug">
                <li className="bg-white p-2 rounded border border-purple-100">
                  <strong>IN:</strong> Inside an enclosed area/container (e.g. "The fish swims <em>in</em> the pond.")
                </li>
                <li className="bg-white p-2 rounded border border-purple-100">
                  <strong>ON:</strong> Resting on a surface (e.g. "The textbook is <em>on</em> the desk.")
                </li>
                <li className="bg-white p-2 rounded border border-purple-100">
                  <strong>AT:</strong> Specific point or location (e.g. "We will meet <em>at</em> 5 PM <em>at</em> the bus stop.")
                </li>
                <li className="bg-white p-2 rounded border border-purple-100">
                  <strong>BETWEEN vs. AMONG:</strong> <em>Between</em> 2 items (e.g., "Divide sweets between Ram and Shyam"), <em>Among</em> 3+ items (e.g., "Distribute sweets among all students").
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Sentence Types & Voice */}
      {activeTab === "sentences" && (
        <div className="space-y-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-xs">
          <div>
            <h4 className="text-sm font-extrabold text-slate-800">💬 The 4 Sentence Types & Active vs Passive Voice</h4>
            <p className="text-xs text-slate-500">Master how sentences are classified by function and how subject/object focus shifts in voice!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { type: "Declarative (Statement)", punct: "Period (.)", desc: "States a fact, opinion, or information.", example: "The Earth revolves around the Sun." },
              { type: "Interrogative (Question)", punct: "Question Mark (?)", desc: "Asks a direct question.", example: "Who won the Grade 6 spelling bee?" },
              { type: "Imperative (Command/Request)", punct: "Period (.) or (!)", desc: "Gives a command, request, or instruction.", example: "Please open your English notebooks." },
              { type: "Exclamatory (Emotion)", punct: "Exclamation Point (!)", desc: "Expresses strong emotion or surprise.", example: "What a spectacular goal!" }
            ].map((st, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between items-center font-extrabold text-slate-800">
                  <span>{st.type}</span>
                  <span className="text-[10px] font-mono bg-purple-100 text-purple-900 px-2 py-0.5 rounded">{st.punct}</span>
                </div>
                <p className="text-slate-600 text-[11px]">{st.desc}</p>
                <div className="text-purple-800 font-mono text-[11px] pt-1 font-bold">E.g. "{st.example}"</div>
              </div>
            ))}
          </div>

          {/* Active vs Passive Voice Visual Transformation */}
          <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-3">
            <div className="font-extrabold text-amber-300 font-mono text-xs uppercase">
              🔄 Active vs. Passive Voice Transformation Rule
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-lg border border-blue-500/30 space-y-1">
                <span className="text-blue-400 font-extrabold text-[11px] block">ACTIVE VOICE (Subject does action)</span>
                <p className="text-white">"Taro <strong className="text-blue-300">chopped</strong> the wood."</p>
                <span className="text-[10px] text-slate-400 block font-sans">Subject (Taro) + Verb (chopped) + Object (wood)</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-emerald-500/30 space-y-1">
                <span className="text-emerald-400 font-extrabold text-[11px] block">PASSIVE VOICE (Object receives action)</span>
                <p className="text-white">"The wood <strong className="text-emerald-300">was chopped</strong> by Taro."</p>
                <span className="text-[10px] text-slate-400 block font-sans">Object (wood) + Was/Were + V3 (chopped) + By + Subject</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Formal & Informal Letter Writing */}
      {activeTab === "letters" && (
        <div className="space-y-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h4 className="text-sm font-extrabold text-slate-800">✉️ Grade 6 Letter Writing Generator & Blueprint</h4>
              <p className="text-xs text-slate-500">Master the standard NCERT/CBSE format for both Formal (Official/School) and Informal (Personal) letters!</p>
            </div>

            {/* Letter Type Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setLetterType("formal")}
                className={`px-3 py-1.5 rounded-lg font-extrabold text-xs transition-all cursor-pointer ${
                  letterType === "formal" ? "bg-purple-700 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                📜 Formal (Leave Application)
              </button>
              <button
                onClick={() => setLetterType("informal")}
                className={`px-3 py-1.5 rounded-lg font-extrabold text-xs transition-all cursor-pointer ${
                  letterType === "informal" ? "bg-purple-700 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ✉️ Informal (Friend / Family)
              </button>
            </div>
          </div>

          {/* Letter Structure Comparison Rule Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Controls */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-black uppercase text-purple-900 font-mono block">
                🛠️ Customize Letter Details:
              </span>

              {letterType === "formal" ? (
                <>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 block">Student Name:</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block">Class & Roll No:</label>
                      <input
                        type="text"
                        value={classRoll}
                        onChange={(e) => setClassRoll(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block">Days of Leave:</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={leaveDays}
                        onChange={(e) => setLeaveDays(Number(e.target.value))}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 block">School Name & City:</label>
                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 block">Reason for Leave:</label>
                    <input
                      type="text"
                      value={leaveReason}
                      onChange={(e) => setLeaveReason(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 block">Your Name (Sender):</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 block">Friend / Receiver Name:</label>
                    <input
                      type="text"
                      value={friendName}
                      onChange={(e) => setFriendName(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 block">Event / Invitation Purpose:</label>
                    <input
                      type="text"
                      value={eventTopic}
                      onChange={(e) => setEventTopic(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
                    />
                  </div>
                </>
              )}

              {/* NCERT Guidelines Callout */}
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 space-y-1">
                <span className="font-extrabold block">💡 NCERT Grade 6 Rule:</span>
                <p>
                  {letterType === "formal"
                    ? "Formal letters MUST have a clear Subject line, polite language, and subscription 'Yours obediently' or 'Yours faithfully'."
                    : "Informal letters do NOT require a Subject line or Receiver's Designation. Use friendly greetings like 'Dear' and sign off with 'Yours lovingly'."}
                </p>
              </div>
            </div>

            {/* Real-time Paper Sheet Letter Preview */}
            <div className="p-5 bg-amber-50/40 rounded-xl border border-amber-200/80 shadow-xs space-y-3 font-mono text-slate-800 text-[11px]">
              <div className="flex justify-between items-center border-b border-amber-200 pb-2">
                <span className="font-extrabold uppercase text-amber-900 text-[10px]">
                  📄 LIVE LETTER PREVIEW ({letterType.toUpperCase()})
                </span>
                <span className="text-[10px] text-slate-500 font-bold">Standard Left-Aligned Format</span>
              </div>

              {letterType === "formal" ? (
                <div className="space-y-2 leading-relaxed">
                  <div className="text-slate-600">
                    <div>124, Pocket-B, Mayur Vihar</div>
                    <div>New Delhi - 110091</div>
                  </div>
                  <div className="text-slate-500 font-bold">Date: 15th August 2026</div>

                  <div className="pt-2 text-slate-700">
                    <div>To,</div>
                    <div>The Principal,</div>
                    <div className="font-bold text-slate-900">{schoolName}</div>
                  </div>

                  <div className="pt-2 font-bold text-purple-900 bg-purple-100/60 px-2 py-1 rounded">
                    Subject: Application for {leaveDays} {leaveDays === 1 ? "day" : "days"} leave due to {leaveReason}
                  </div>

                  <div className="pt-2 font-bold text-slate-900">Respected Sir / Madam,</div>

                  <p className="text-slate-800 font-sans leading-relaxed">
                    With due respect, I wish to state that I am a student of class {classRoll}. I am suffering from {leaveReason}, due to which I will be unable to attend school for {leaveDays} {leaveDays === 1 ? "day" : "days"} (from today onwards).
                  </p>

                  <p className="text-slate-800 font-sans leading-relaxed">
                    Kindly grant me leave for the above-mentioned duration. I assure you that I will complete all my missed classwork and homework upon my return.
                  </p>

                  <div className="pt-2">Thanking you.</div>

                  <div className="pt-2 border-t border-amber-200/80">
                    <div>Yours obediently,</div>
                    <div className="font-bold text-slate-900 text-xs">{studentName}</div>
                    <div className="text-slate-600">{classRoll}</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 leading-relaxed">
                  <div className="text-slate-600">
                    <div>House No. 45, Green Park</div>
                    <div>New Delhi - 110016</div>
                  </div>
                  <div className="text-slate-500 font-bold">Date: 15th August 2026</div>

                  <div className="pt-3 font-bold text-slate-900">Dear {friendName},</div>

                  <p className="text-slate-800 font-sans leading-relaxed">
                    How are you? I hope this letter finds you in great health and high spirits.
                  </p>

                  <p className="text-slate-800 font-sans leading-relaxed">
                    I am writing this letter to cordially invite you to {eventTopic}, which is taking place at my residence next Sunday at 5:00 PM. We have organized fun games, music, and delicious snacks!
                  </p>

                  <p className="text-slate-800 font-sans leading-relaxed">
                    Please do come early so we can play together. Convey my warm regards to uncle and aunt.
                  </p>

                  <div className="pt-3 border-t border-amber-200/80">
                    <div>Yours lovingly,</div>
                    <div className="font-bold text-slate-900 text-xs">{studentName}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function EnglishLanguageLab({ chapterId }: { chapterId?: string }) {
  if (chapterId?.startsWith("g6_eng_") || chapterId === "g6_eng_grammar") {
    return <Grade6EnglishGrammarLab activeChapterId={chapterId} />;
  }

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
  const [activeTab, setActiveTab] = useState<"layout" | "bath" | "artifacts" | "trade_map" | "gujarat_decline">("layout");

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200" id="earliest_cities_lab">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-xl border border-slate-150 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase text-orange-600 tracking-wider block">
            NCERT Grade 6 History Lab • Social Science
          </span>
          <h3 className="font-extrabold text-base text-slate-800">🏛️ Earliest Cities: Harappan Civilization (~2500 BCE)</h3>
          <p className="text-xs text-slate-500">Interactive Blueprint: Citadel, Great Bath, Trade Map, Dholavira, Lothal & Mystery of Decline!</p>
        </div>
        <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl">
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
            🏺 Crafts, Seals & Weights
          </button>
          <button
            onClick={() => setActiveTab("trade_map")}
            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
              activeTab === "trade_map" ? "bg-orange-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🗺️ Raw Material Trade
          </button>
          <button
            onClick={() => setActiveTab("gujarat_decline")}
            className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
              activeTab === "gujarat_decline" ? "bg-orange-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            ⛵ Gujarat Towns & Decline
          </button>
        </div>
      </div>

      {/* TAB 1: CITY LAYOUT */}
      {activeTab === "layout" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-orange-950 p-6 rounded-2xl text-white space-y-3 shadow-md border-l-4 border-amber-400">
              <span className="text-[10px] font-mono font-bold text-orange-300 uppercase block">
                1. Citadel (West Side - Elevated Platform)
              </span>
              <h4 className="font-extrabold text-base text-amber-300">The Administrative & Public Citadel</h4>
              <p className="text-xs text-orange-100 leading-relaxed font-serif">
                Built on high elevated mud-brick platforms to protect against Indus river floods. Contained public monuments like the Great Bath at Mohenjo-daro, Granaries for grain storage, and assembly halls used by city rulers.
              </p>
            </div>

            <div className="bg-amber-900 p-6 rounded-2xl text-white space-y-3 shadow-md border-l-4 border-amber-300">
              <span className="text-[10px] font-mono font-bold text-amber-300 uppercase block">
                2. Lower Town (East Side - Broad Grid)
              </span>
              <h4 className="font-extrabold text-base text-amber-200">Residential Neighborhoods</h4>
              <p className="text-xs text-amber-100 leading-relaxed font-serif">
                Larger area with two-story baked brick houses built around central private courtyards. Streets intersected at right angles in a rectangular grid system with covered street drains running parallel to houses.
              </p>
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
            <span className="font-black uppercase text-amber-900 text-[10px] block">🧱 Interlocking Baked Bricks Discovery:</span>
            <p>
              Around 150 years ago, engineers laying railway tracks in Punjab unearthed millions of baked bricks from Harappan ruins. The bricks were laid in an interlocking pattern, creating walls so exceptionally strong that they endured for over 4,000 years!
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: GREAT BATH & DRAINS */}
      {activeTab === "bath" && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="text-2xl">🌊</span>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">The Great Bath of Mohenjo-daro</h4>
                <p className="text-xs text-slate-500">Advanced Waterproofing Engineering ~4500 Years Ago</p>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-serif">
              A large rectangular tank built in the Citadel. Lined with precision-cut baked bricks, coated with gypsum plaster, and made watertight with a thick layer of natural tar (bitumen). Steps led down into the pool from two sides, surrounded by changing rooms on all sides. Water was brought in from a well and drained out after use for special ritual bathing ceremonies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                <span className="font-extrabold text-slate-800 block mb-1">🚿 House Bathing Spaces:</span>
                <p className="text-slate-600 text-[11px]">Every house had a separate paved bathing area with wastewater pipes flowing through house walls into main street drains.</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                <span className="font-extrabold text-slate-800 block mb-1">🧹 Inspection Holes:</span>
                <p className="text-slate-600 text-[11px]">Street sewers were covered with stone slabs and fitted with inspection holes at regular intervals for municipal cleaning.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CRAFTS, SEALS & WEIGHTS */}
      {activeTab === "artifacts" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
            <span className="text-2xl block">🦏</span>
            <h5 className="font-extrabold text-xs text-slate-900">Steatite Seals & Sealings</h5>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Carved stone seals featuring animal motifs (bull, elephant, unicorn) and inscriptions. Stamped on wet clay tags on trade bags to ensure security during transit.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
            <span className="text-2xl block">⚖️</span>
            <h5 className="font-extrabold text-xs text-slate-900">Chert Stone Weights</h5>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Standardized cubical weights made of Chert stone used by merchants to accurately weigh gold, silver, and precious gemstones.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
            <span className="text-2xl block">📿</span>
            <h5 className="font-extrabold text-xs text-slate-900">Carnelian Beads & Jewelry</h5>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Craftspersons shaped reddish Carnelian stone into drilled beads for necklaces. Gold and silver were fashioned into bangles and vessels.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 shadow-2xs">
            <span className="text-2xl block">🚜</span>
            <h5 className="font-extrabold text-xs text-slate-900">Terracotta Toy Ploughs</h5>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Toy plough models confirm that farmers used wooden ploughs to till fields and grow wheat, barley, sesame, and mustard.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: RAW MATERIAL TRADE MAP */}
      {activeTab === "trade_map" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
          <div>
            <h4 className="font-extrabold text-sm text-slate-900">🗺️ Harappan Long-Distance Trade Network</h4>
            <p className="text-xs text-slate-500">While food was grown locally, raw materials were imported across vast geographical distances:</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 space-y-1">
              <span className="font-extrabold text-amber-900 block">🟠 Copper (తామ్రం):</span>
              <p className="text-amber-800 text-[11px]">Imported from <strong>Rajasthan</strong> (Khetri mines) and <strong>Oman</strong> in West Asia.</p>
            </div>

            <div className="bg-blue-50 p-3.5 rounded-xl border border-blue-200 space-y-1">
              <span className="font-extrabold text-blue-900 block">⚪ Tin (తగరం):</span>
              <p className="text-blue-800 text-[11px]">Imported from present-day <strong>Afghanistan</strong> and <strong>Iran</strong> (mixed with copper to make bronze).</p>
            </div>

            <div className="bg-yellow-50 p-3.5 rounded-xl border border-yellow-200 space-y-1">
              <span className="font-extrabold text-yellow-900 block">🟡 Gold (బంగారం):</span>
              <p className="text-yellow-800 text-[11px]">Sourced from southern India (present-day <strong>Karnataka</strong> gold mines).</p>
            </div>

            <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 space-y-1">
              <span className="font-extrabold text-emerald-900 block">💎 Precious Stones:</span>
              <p className="text-emerald-800 text-[11px]">Sourced from <strong>Gujarat</strong>, <strong>Iran</strong>, and <strong>Afghanistan</strong> for bead manufacturing.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: GUJARAT TOWNS & DECLINE */}
      {activeTab === "gujarat_decline" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Dholavira */}
            <div className="bg-emerald-900 text-white p-5 rounded-2xl space-y-2.5 shadow-md">
              <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase block">1. Dholavira (Khadir Beyt, Rann of Kutch)</span>
              <h4 className="font-extrabold text-sm text-emerald-200">The 3-Part Fortified City</h4>
              <p className="text-xs text-emerald-100 leading-relaxed font-serif">
                Unlike other Harappan cities divided into 2 parts, Dholavira was uniquely divided into <strong>THREE parts</strong> (Citadel, Middle Town, Lower Town), each surrounded by massive stone walls with gateways. It featured a large open arena for public ceremonies and a famous inscription carved with 10 large white stone Harappan symbols.
              </p>
            </div>

            {/* Lothal */}
            <div className="bg-cyan-950 text-white p-5 rounded-2xl space-y-2.5 shadow-md">
              <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase block">2. Lothal (Sabarmati River Tributary)</span>
              <h4 className="font-extrabold text-sm text-cyan-200">The Maritime Port & Dockyard</h4>
              <p className="text-xs text-cyan-100 leading-relaxed font-serif">
                Located near Gulf of Khambhat, Lothal was an important center for making objects out of stone, shell, and metal. It possessed a <strong>massive brick dockyard</strong> where ships and boats entered from the sea channel to load and unload cargo goods.
              </p>
            </div>
          </div>

          {/* Mystery of Decline */}
          <div className="p-5 bg-rose-50 rounded-2xl border border-rose-200 space-y-2 text-rose-950">
            <h4 className="font-extrabold text-sm text-rose-900 flex items-center gap-2">
              <span>❓ The Mystery of the End (~1900 BCE / 3900 Years Ago)</span>
            </h4>
            <p className="text-xs text-rose-900/90 leading-relaxed font-serif">
              Around 3,900 years ago, a major shift occurred. People stopped living in Harappan cities. Writing, seals, and chert weights were abandoned. Long-distance raw material trade ceased. Historians suggest multiple combined causes:
            </p>
            <ul className="list-disc list-inside text-xs text-rose-950 font-bold space-y-1 pt-1">
              <li>Drying up of Indus rivers and tributaries</li>
              <li>Deforestation due to fuel requirements for baking millions of bricks</li>
              <li>Flooding or destruction of green cover by cattle overgrazing</li>
              <li>Rulers losing control, leading to urban abandonment and migration to smaller settlements</li>
            </ul>
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
