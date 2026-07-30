import React, { useState } from "react";
import { Sparkles, Volume2, Plus, Minus, X, Divide, RefreshCw, CheckCircle2 } from "lucide-react";
import { playSpeechWithLang } from "../utils/teluguAudio";

// Helper math utilities
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

function lcm(a: number, b: number): number {
  return Math.abs((a * b) / gcd(a, b));
}

export default function FractionOperationsExplorer() {
  const [activeTab, setActiveTab] = useState<"add" | "sub" | "mul" | "div" | "quiz">("add");

  // Fraction 1: n1 / d1
  const [n1, setN1] = useState<number>(1);
  const [d1, setD1] = useState<number>(4);

  // Fraction 2: n2 / d2
  const [n2, setN2] = useState<number>(2);
  const [d2, setD2] = useState<number>(5);

  // Quiz State
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const speak = (text: string) => {
    playSpeechWithLang(text, "en-US");
  };

  // Calculated values
  const commonDenom = lcm(d1, d2);
  const equivN1 = n1 * (commonDenom / d1);
  const equivN2 = n2 * (commonDenom / d2);

  // Addition result
  const rawSumN = equivN1 + equivN2;
  const sumGcd = gcd(rawSumN, commonDenom);
  const simplifiedSumN = rawSumN / sumGcd;
  const simplifiedSumD = commonDenom / sumGcd;

  // Subtraction result
  const rawSubN = equivN1 - equivN2;
  const subGcd = gcd(Math.abs(rawSubN), commonDenom);
  const simplifiedSubN = rawSubN / subGcd;
  const simplifiedSubD = commonDenom / subGcd;

  // Multiplication result
  const rawMulN = n1 * n2;
  const rawMulD = d1 * d2;
  const mulGcd = gcd(rawMulN, rawMulD);
  const simplifiedMulN = rawMulN / mulGcd;
  const simplifiedMulD = rawMulD / mulGcd;

  // Division result (n1/d1 ÷ n2/d2 = n1/d1 * d2/n2)
  const rawDivN = n1 * d2;
  const rawDivD = d1 * n2;
  const divGcd = gcd(rawDivN, rawDivD);
  const simplifiedDivN = rawDivN / divGcd;
  const simplifiedDivD = rawDivD / divGcd;

  // Format improper to mixed string
  const formatMixed = (num: number, den: number) => {
    if (den === 0) return "Undefined";
    if (num === 0) return "0";
    if (num < 0) return `-${formatMixed(Math.abs(num), den)}`;
    if (num % den === 0) return `${num / den}`;
    if (num > den) {
      const q = Math.floor(num / den);
      const r = num % den;
      return `${q} ¾ (${q} and ${r}/${den})`;
    }
    return `${num}/${den}`;
  };

  const QUIZ_QUESTIONS = [
    {
      q: "What is 1/5 + 2/5?",
      options: ["3/5", "3/10", "1/5", "2/10"],
      correct: "3/5",
      exp: "Since denominators are equal (5), directly add numerators: 1 + 2 = 3. Result = 3/5."
    },
    {
      q: "What is 3/4 - 1/4?",
      options: ["2/4 (which is 1/2)", "4/4", "2/8", "1/4"],
      correct: "2/4 (which is 1/2)",
      exp: "Subtract numerators: 3 - 1 = 2/4. Dividing top and bottom by 2 gives simplified fraction 1/2."
    },
    {
      q: "What is 2/3 × 3/4?",
      options: ["6/12 (which is 1/2)", "5/7", "6/7", "1/12"],
      correct: "6/12 (which is 1/2)",
      exp: "Multiply top numbers (2 × 3 = 6) and bottom numbers (3 × 4 = 12). 6/12 simplifies to 1/2!"
    },
    {
      q: "To divide 3/4 by 1/2, what is the Keep-Change-Flip equation?",
      options: ["3/4 × 2/1", "3/4 ÷ 2/1", "4/3 × 1/2", "3/4 × 1/2"],
      correct: "3/4 × 2/1",
      exp: "Keep 3/4, Change ÷ to ×, and Flip 1/2 to its reciprocal 2/1! 3/4 × 2/1 = 6/4 = 1 1/2."
    }
  ];

  return (
    <div className="bg-amber-50/70 border border-amber-200/90 rounded-3xl p-4 sm:p-5 space-y-5 animate-fade-in shadow-xs">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 rounded-2xl p-4 text-white shadow-md flex items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full border border-white/20">
            Grade 6 Maths • Chapter 7 Operations
          </span>
          <h3 className="text-lg sm:text-xl font-black flex items-center gap-2">
            <span>🍕 Fraction Arithmetic Studio</span>
          </h3>
          <p className="text-xs text-amber-100 font-medium">
            Master Addition, Subtraction, Multiplication, and Division of Fractions with step-by-step visual working out!
          </p>
        </div>
        <button
          onClick={() => speak("Fraction Arithmetic Studio! Explore addition, subtraction, multiplication, and division of fractions.")}
          className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white cursor-pointer transition shrink-0 border border-white/20"
          title="Listen intro"
        >
          <Volume2 size={18} />
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 bg-amber-100/80 p-1.5 rounded-2xl border border-amber-200">
        <button
          onClick={() => { setActiveTab("add"); speak("Addition of Fractions"); }}
          className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1 ${
            activeTab === "add" ? "bg-amber-600 text-white shadow-sm" : "text-amber-950 hover:bg-amber-200/60"
          }`}
        >
          <Plus size={14} /> Addition (+)
        </button>

        <button
          onClick={() => { setActiveTab("sub"); speak("Subtraction of Fractions"); }}
          className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1 ${
            activeTab === "sub" ? "bg-amber-600 text-white shadow-sm" : "text-amber-950 hover:bg-amber-200/60"
          }`}
        >
          <Minus size={14} /> Subtraction (-)
        </button>

        <button
          onClick={() => { setActiveTab("mul"); speak("Multiplication of Fractions"); }}
          className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1 ${
            activeTab === "mul" ? "bg-amber-600 text-white shadow-sm" : "text-amber-950 hover:bg-amber-200/60"
          }`}
        >
          <X size={14} /> Multiplication (×)
        </button>

        <button
          onClick={() => { setActiveTab("div"); speak("Division of Fractions"); }}
          className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1 ${
            activeTab === "div" ? "bg-amber-600 text-white shadow-sm" : "text-amber-950 hover:bg-amber-200/60"
          }`}
        >
          <Divide size={14} /> Division (÷)
        </button>

        <button
          onClick={() => { setActiveTab("quiz"); speak("Practice Quiz Challenge"); }}
          className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1 col-span-2 sm:col-span-1 ${
            activeTab === "quiz" ? "bg-amber-600 text-white shadow-sm" : "text-amber-950 hover:bg-amber-200/60"
          }`}
        >
          <Sparkles size={14} /> Quiz Challenge
        </button>
      </div>

      {activeTab !== "quiz" && (
        <div className="space-y-4">
          {/* Fraction Input Controls Bar */}
          <div className="bg-white border border-amber-200 rounded-2xl p-4 shadow-xs space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
              ⚙️ Adjust Input Fractions:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Fraction 1 Controls */}
              <div className="bg-amber-50/90 border border-amber-200 p-3 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-950">Fraction 1:</span>
                  <div className="flex flex-col items-center font-mono font-black text-amber-900 bg-white px-3 py-1 rounded-lg border border-amber-300">
                    <span>{n1}</span>
                    <hr className="w-6 border-amber-400 my-0.5" />
                    <span>{d1}</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-600">Numerator (n1): {n1}</span>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={n1}
                      onChange={(e) => setN1(parseInt(e.target.value, 10))}
                      className="accent-amber-600 cursor-pointer w-28"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-600">Denominator (d1): {d1}</span>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={d1}
                      onChange={(e) => setD1(parseInt(e.target.value, 10))}
                      className="accent-amber-600 cursor-pointer w-28"
                    />
                  </div>
                </div>
              </div>

              {/* Fraction 2 Controls */}
              <div className="bg-orange-50/90 border border-orange-200 p-3 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-orange-950">Fraction 2:</span>
                  <div className="flex flex-col items-center font-mono font-black text-orange-900 bg-white px-3 py-1 rounded-lg border border-orange-300">
                    <span>{n2}</span>
                    <hr className="w-6 border-orange-400 my-0.5" />
                    <span>{d2}</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-600">Numerator (n2): {n2}</span>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={n2}
                      onChange={(e) => setN2(parseInt(e.target.value, 10))}
                      className="accent-orange-600 cursor-pointer w-28"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-600">Denominator (d2): {d2}</span>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={d2}
                      onChange={(e) => setD2(parseInt(e.target.value, 10))}
                      className="accent-orange-600 cursor-pointer w-28"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ADDITION TAB CONTENT */}
          {activeTab === "add" && (
            <div className="bg-white border border-amber-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">➕</span>
                  <div>
                    <h4 className="font-black text-amber-950 text-base">Adding Fractions</h4>
                    <p className="text-xs text-slate-600">
                      {d1 === d2 ? "Like denominators (Direct Addition)" : `Unlike denominators (Convert to LCM = ${commonDenom})`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => speak(`Addition equation: ${n1} over ${d1} plus ${n2} over ${d2} equals ${simplifiedSumN} over ${simplifiedSumD}`)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                >
                  <Volume2 size={14} /> Listen
                </button>
              </div>

              {/* Equation Display Box */}
              <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3 flex flex-wrap items-center justify-center gap-3 text-lg font-black text-amber-950 font-mono">
                <span>{n1}/{d1}</span>
                <span>+</span>
                <span>{n2}/{d2}</span>
                <span>=</span>
                <span className="text-rose-700 bg-white px-3 py-1 rounded-lg border border-amber-300 shadow-xs">
                  {simplifiedSumN}/{simplifiedSumD}
                  {simplifiedSumN > simplifiedSumD && ` = ${formatMixed(simplifiedSumN, simplifiedSumD)}`}
                </span>
              </div>

              {/* Step-by-Step Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-extrabold text-amber-900 block">Step 1: Check Denominators</span>
                  <p className="text-slate-700">
                    Denominators are {d1} and {d2}. {d1 === d2 ? "They are equal! You can add numerators directly." : `Finding LCM of ${d1} and ${d2} = ${commonDenom}.`}
                  </p>
                </div>

                {d1 !== d2 && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <span className="font-extrabold text-amber-900 block">Step 2: Convert to Equivalent Like Fractions</span>
                    <p className="text-slate-700 font-mono">
                      {n1}/{d1} = ({n1}×{commonDenom/d1})/({d1}×{commonDenom/d1}) = <strong>{equivN1}/{commonDenom}</strong>
                      <br />
                      {n2}/{d2} = ({n2}×{commonDenom/d2})/({d2}×{commonDenom/d2}) = <strong>{equivN2}/{commonDenom}</strong>
                    </p>
                  </div>
                )}

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-extrabold text-amber-900 block">Step 3: Add Numerators & Simplify</span>
                  <p className="text-slate-700 font-mono">
                    ({equivN1} + {equivN2}) / {commonDenom} = <strong>{rawSumN}/{commonDenom}</strong>
                    {sumGcd > 1 && ` (Dividing top and bottom by HCF ${sumGcd} → ${simplifiedSumN}/${simplifiedSumD})`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SUBTRACTION TAB CONTENT */}
          {activeTab === "sub" && (
            <div className="bg-white border border-amber-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">➖</span>
                  <div>
                    <h4 className="font-black text-amber-950 text-base">Subtracting Fractions</h4>
                    <p className="text-xs text-slate-600">
                      {d1 === d2 ? "Like denominators (Direct Subtraction)" : `Unlike denominators (LCM = ${commonDenom})`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => speak(`Subtraction equation: ${n1} over ${d1} minus ${n2} over ${d2} equals ${simplifiedSubN} over ${simplifiedSubD}`)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                >
                  <Volume2 size={14} /> Listen
                </button>
              </div>

              {/* Equation Display Box */}
              <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3 flex flex-wrap items-center justify-center gap-3 text-lg font-black text-amber-950 font-mono">
                <span>{n1}/{d1}</span>
                <span>-</span>
                <span>{n2}/{d2}</span>
                <span>=</span>
                <span className="text-rose-700 bg-white px-3 py-1 rounded-lg border border-amber-300 shadow-xs">
                  {simplifiedSubN}/{simplifiedSubD}
                  {simplifiedSubN > simplifiedSubD && ` = ${formatMixed(simplifiedSubN, simplifiedSubD)}`}
                </span>
              </div>

              {/* Step-by-Step Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-extrabold text-amber-900 block">Step 1: Compare Denominators</span>
                  <p className="text-slate-700">
                    Denominators are {d1} and {d2}. {d1 === d2 ? "Equal denominators! Subtract numerators directly." : `Common denominator LCM = ${commonDenom}.`}
                  </p>
                </div>

                {d1 !== d2 && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <span className="font-extrabold text-amber-900 block">Step 2: Express with Common Denominator</span>
                    <p className="text-slate-700 font-mono">
                      {n1}/{d1} = <strong>{equivN1}/{commonDenom}</strong> &nbsp;|&nbsp; {n2}/{d2} = <strong>{equivN2}/{commonDenom}</strong>
                    </p>
                  </div>
                )}

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-extrabold text-amber-900 block">Step 3: Subtract Numerators</span>
                  <p className="text-slate-700 font-mono">
                    ({equivN1} - {equivN2}) / {commonDenom} = <strong>{rawSubN}/{commonDenom}</strong>
                    {subGcd > 1 && ` (Dividing top and bottom by HCF ${subGcd} → ${simplifiedSubN}/${simplifiedSubD})`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* MULTIPLICATION TAB CONTENT */}
          {activeTab === "mul" && (
            <div className="bg-white border border-amber-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">✖️</span>
                  <div>
                    <h4 className="font-black text-amber-950 text-base">Multiplying Fractions</h4>
                    <p className="text-xs text-slate-600">
                      Product = (Numerator 1 × Numerator 2) / (Denominator 1 × Denominator 2)
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => speak(`Multiplication equation: ${n1} over ${d1} times ${n2} over ${d2} equals ${simplifiedMulN} over ${simplifiedMulD}`)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                >
                  <Volume2 size={14} /> Listen
                </button>
              </div>

              {/* Equation Display Box */}
              <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3 flex flex-wrap items-center justify-center gap-3 text-lg font-black text-amber-950 font-mono">
                <span>{n1}/{d1}</span>
                <span>×</span>
                <span>{n2}/{d2}</span>
                <span>=</span>
                <span className="text-emerald-700 bg-white px-3 py-1 rounded-lg border border-amber-300 shadow-xs">
                  {simplifiedMulN}/{simplifiedMulD}
                  {simplifiedMulN > simplifiedMulD && ` = ${formatMixed(simplifiedMulN, simplifiedMulD)}`}
                </span>
              </div>

              {/* Step-by-Step Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-extrabold text-amber-900 block">Step 1: Multiply Numerators</span>
                  <p className="text-slate-700 font-mono">
                    Top numbers: {n1} × {n2} = <strong>{rawMulN}</strong>
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-extrabold text-amber-900 block">Step 2: Multiply Denominators</span>
                  <p className="text-slate-700 font-mono">
                    Bottom numbers: {d1} × {d2} = <strong>{rawMulD}</strong>
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-extrabold text-amber-900 block">Step 3: Simplify Fraction</span>
                  <p className="text-slate-700 font-mono">
                    Raw result = {rawMulN}/{rawMulD}
                    {mulGcd > 1 ? ` → Divided by HCF ${mulGcd} = ${simplifiedMulN}/${simplifiedMulD}` : " (Already in simplest form!)"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* DIVISION TAB CONTENT */}
          {activeTab === "div" && (
            <div className="bg-white border border-amber-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">➗</span>
                  <div>
                    <h4 className="font-black text-amber-950 text-base">Dividing Fractions (Keep • Change • Flip)</h4>
                    <p className="text-xs text-slate-600">
                      Multiply the 1st fraction by the reciprocal (flipped) 2nd fraction!
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => speak(`Division equation: ${n1} over ${d1} divided by ${n2} over ${d2} equals ${simplifiedDivN} over ${simplifiedDivD}`)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                >
                  <Volume2 size={14} /> Listen
                </button>
              </div>

              {/* Equation Display Box */}
              <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3 flex flex-wrap items-center justify-center gap-3 text-lg font-black text-amber-950 font-mono">
                <span>{n1}/{d1}</span>
                <span>÷</span>
                <span>{n2}/{d2}</span>
                <span>=</span>
                <span className="text-indigo-700 bg-white px-3 py-1 rounded-lg border border-amber-300 shadow-xs">
                  {simplifiedDivN}/{simplifiedDivD}
                  {simplifiedDivN > simplifiedDivD && ` = ${formatMixed(simplifiedDivN, simplifiedDivD)}`}
                </span>
              </div>

              {/* Keep Change Flip Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-xl">
                  <span className="font-black text-rose-900 block text-[11px] uppercase">1. KEEP</span>
                  <p className="text-slate-700 font-mono mt-0.5">{n1}/{d1}</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl">
                  <span className="font-black text-amber-900 block text-[11px] uppercase">2. CHANGE</span>
                  <p className="text-slate-700 font-mono mt-0.5">÷ to ×</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
                  <span className="font-black text-emerald-900 block text-[11px] uppercase">3. FLIP (Reciprocal)</span>
                  <p className="text-slate-700 font-mono mt-0.5">{n2}/{d2} ➔ <strong>{d2}/{n2}</strong></p>
                </div>
              </div>

              {/* Step-by-Step Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-extrabold text-amber-900 block">Converted Multiplication Equation</span>
                  <p className="text-slate-700 font-mono">
                    {n1}/{d1} × {d2}/{n2} = ({n1} × {d2}) / ({d1} × {n2}) = <strong>{rawDivN}/{rawDivD}</strong>
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-extrabold text-amber-900 block">Final Simplification</span>
                  <p className="text-slate-700 font-mono">
                    {rawDivN}/{rawDivD}
                    {divGcd > 1 ? ` → Divided top & bottom by HCF ${divGcd} = ${simplifiedDivN}/${simplifiedDivD}` : " (Already in simplest form!)"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* QUIZ TAB */}
      {activeTab === "quiz" && (
        <div className="bg-white border border-amber-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-amber-100 pb-3">
            <h4 className="font-black text-amber-950 text-base flex items-center gap-2">
              <Sparkles size={18} className="text-amber-600" />
              Fraction Operations Quiz
            </h4>
            <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
              Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}
            </span>
          </div>

          {(() => {
            const currentQ = QUIZ_QUESTIONS[quizIndex];
            return (
              <div className="space-y-3">
                <p className="text-sm font-bold text-amber-950">
                  {currentQ.q}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setUserAnswer(opt);
                        if (opt === currentQ.correct) {
                          setQuizFeedback(`✨ Correct! ${currentQ.exp}`);
                          speak(`Correct! ${currentQ.exp}`);
                        } else {
                          setQuizFeedback(`Incorrect. Try again or check explanation: ${currentQ.exp}`);
                        }
                      }}
                      className={`p-3 rounded-xl border text-xs font-extrabold text-left transition cursor-pointer ${
                        userAnswer === opt
                          ? opt === currentQ.correct
                            ? "bg-emerald-100 border-emerald-400 text-emerald-950 shadow-xs"
                            : "bg-rose-100 border-rose-300 text-rose-950"
                          : "bg-amber-50/50 border-amber-200 text-amber-950 hover:bg-amber-100"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {quizFeedback && (
                  <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold text-amber-950 animate-fade-in flex items-center justify-between">
                    <span>{quizFeedback}</span>
                    <button
                      onClick={() => {
                        setUserAnswer(null);
                        setQuizFeedback(null);
                        setQuizIndex((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
                      }}
                      className="text-[11px] bg-amber-600 text-white px-3 py-1 rounded-lg hover:bg-amber-700 cursor-pointer transition shrink-0 ml-2"
                    >
                      Next Question ➔
                    </button>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
