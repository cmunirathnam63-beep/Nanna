import React, { useState, useEffect } from "react";
import { Plus, Minus, RotateCcw, AlertCircle, HelpCircle } from "lucide-react";

interface VisualToolsProps {
  chapterId?: string;
  initialTool?: "fraction" | "numberline" | "placevalue" | "perimeter" | "typesofnumbers";
  initialHighlightMode?: string;
  onActionComplete?: (points: number, badgeUnlocked?: string) => void;
}

const CHAPTER_TABS_MAP: Record<string, ("fraction" | "numberline" | "placevalue" | "perimeter" | "typesofnumbers")[]> = {
  numbersystem: ["typesofnumbers", "placevalue"],
  fractions: ["fraction", "numberline"],
  decimals: ["placevalue"],
  algebra: ["perimeter"],
  integers: ["numberline", "typesofnumbers"],
  geometry: ["perimeter"],
  mensuration: ["perimeter"]
};

export default function VisualTools({ chapterId, initialTool = "fraction", initialHighlightMode = "all", onActionComplete }: VisualToolsProps) {
  const [activeTab, setActiveTab] = useState<"fraction" | "numberline" | "placevalue" | "perimeter" | "typesofnumbers">(initialTool);
  
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
          const allowedTabs = chapterId && CHAPTER_TABS_MAP[chapterId]
            ? CHAPTER_TABS_MAP[chapterId]
            : (["fraction", "numberline", "placevalue", "perimeter", "typesofnumbers"] as const);

          const tabDetails = [
            { id: "fraction", label: "🍕 Fractions Circle", idAttr: "btn_tab_fraction" },
            { id: "numberline", label: "🔢 Integer Line", idAttr: "btn_tab_numberline" },
            { id: "placevalue", label: "🪙 Decimal Grid", idAttr: "btn_tab_placevalue" },
            { id: "perimeter", label: "📏 Rectangle Lab", idAttr: "btn_tab_perimeter" },
            { id: "typesofnumbers", label: "🔢 Types of Numbers", idAttr: "btn_tab_typesofnumbers" }
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
                    📖 Grade 6 CBSE Math Context
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
