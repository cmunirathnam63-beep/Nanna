import React from "react";
import { ArrowRight, Sparkles, HelpCircle, RefreshCw } from "lucide-react";

// Helper component for styled math terms
function MathBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-natural-beige-light border border-natural-beige-dark/50 px-3 py-2 rounded-xl font-mono text-center text-xs text-natural-dark font-extrabold shadow-inner inline-block my-1.5 select-none">
      {children}
    </div>
  );
}

// ----------------------------------------------------
// TOPIC 1: RATIONAL NUMBERS (Finding Rationals)
// ----------------------------------------------------
export function RationalIntroTopic() {
  const [numA, setNumA] = React.useState<number>(3);
  const [numB, setNumB] = React.useState<number>(4);
  const [count, setCount] = React.useState<number>(5);

  const findRationals = () => {
    const results: string[] = [];
    const n = count;
    // Method: Multiply numerator & denominator of both A and B by (n + 1)
    const factor = n + 1;
    const startNum = numA * factor;
    const endNum = numB * factor;

    for (let i = 1; i <= n; i++) {
      const currentNum = startNum + (endNum > startNum ? i : -i);
      results.push(`${currentNum}/${factor}`);
    }
    return { results, factor, startNum, endNum };
  };

  const { results, factor, startNum, endNum } = findRationals();

  return (
    <div className="space-y-4 animate-fade-in" id="g9_rational_topic">
      <div className="bg-natural-beige-light border border-natural-beige-dark/60 p-4 rounded-xl space-y-2">
        <h3 className="text-xs font-extrabold text-natural-dark uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1 h-3.5 bg-natural-terracotta rounded-full" />
          Rational Numbers
        </h3>
        <p className="text-xs text-natural-sage leading-relaxed">
          A number is called a <strong>Rational Number</strong> if it can be written in the form{" "}
          <span className="font-mono font-bold text-natural-terracotta">p/q</span>, where{" "}
          <strong>p</strong> and <strong>q</strong> are integers and{" "}
          <span className="font-mono font-bold text-natural-terracotta">q ≠ 0</span>.
        </p>
        <p className="text-xs text-natural-sage leading-relaxed">
          <strong>Key Fact:</strong> There are infinitely many rational numbers between any two given rational numbers.
        </p>
      </div>

      {/* Interactive Solver */}
      <div className="bg-white border-2 border-natural-beige-dark rounded-xl p-4 space-y-4 shadow-sm">
        <span className="text-[9px] font-black uppercase text-natural-terracotta tracking-widest block text-center">
          🧮 Interactive Rational Finder
        </span>
        <p className="text-[10px] text-center text-natural-sage font-medium leading-tight">
          Find rational numbers between two integers.
        </p>

        <div className="grid grid-cols-3 gap-3 items-end">
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider block min-h-[24px] flex items-end leading-tight">
              Start Integer (A)
            </label>
            <input
              type="number"
              value={numA}
              onChange={(e) => setNumA(Math.min(100, Math.max(-100, parseInt(e.target.value) || 0)))}
              className="w-full text-center py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider block min-h-[24px] flex items-end leading-tight">
              End Integer (B)
            </label>
            <input
              type="number"
              value={numB}
              onChange={(e) => setNumB(Math.min(100, Math.max(-100, parseInt(e.target.value) || 0)))}
              className="w-full text-center py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider block min-h-[24px] flex items-end leading-tight">
              How Many (N)
            </label>
            <select
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full text-center py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-black text-slate-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            >
              {[3, 4, 5, 6, 7].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Step by Step Proof */}
        {numA === numB ? (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-lg p-2.5 text-center text-[10px] font-black uppercase">
            A and B must be different integers! 🛑
          </div>
        ) : (
          <div className="space-y-3 pt-2 border-t border-dashed border-natural-beige-dark/60">
            <div className="text-[10px] text-slate-700 space-y-1.5 leading-relaxed font-bold">
              <p>
                <strong>Step 1:</strong> Since we want to find <span className="text-natural-terracotta">{count}</span> rational numbers, we multiply both numerators and denominators by <span className="text-indigo-600 font-mono">n + 1 = {factor}</span>.
              </p>
              <div className="flex justify-center items-center gap-6 py-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono">{numA}</span>
                  <span className="text-xs text-slate-400">➔</span>
                  <div className="flex flex-col items-center font-mono">
                    <span className="border-b border-slate-400 px-1">{numA} × {factor}</span>
                    <span className="px-1">{factor}</span>
                  </div>
                  <span className="font-bold text-slate-400">=</span>
                  <span className="font-mono text-indigo-600 font-extrabold">{startNum}/{factor}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-mono">{numB}</span>
                  <span className="text-xs text-slate-400">➔</span>
                  <div className="flex flex-col items-center font-mono">
                    <span className="border-b border-slate-400 px-1">{numB} × {factor}</span>
                    <span className="px-1">{factor}</span>
                  </div>
                  <span className="font-bold text-slate-400">=</span>
                  <span className="font-mono text-indigo-600 font-extrabold">{endNum}/{factor}</span>
                </div>
              </div>

              <p>
                <strong>Step 2:</strong> Now, write the rational numbers lying between{" "}
                <span className="font-mono text-indigo-600">{startNum}/{factor}</span> and{" "}
                <span className="font-mono text-indigo-600">{endNum}/{factor}</span>:
              </p>

              <div className="flex flex-wrap gap-2 justify-center py-1">
                {results.map((r, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-indigo-50 border border-indigo-250 rounded-lg font-mono text-xs font-black text-indigo-700 animate-fade-in hover:scale-105 transition-all"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TOPIC 2: IRRATIONAL NUMBERS (Definition & Line Plotting)
// ----------------------------------------------------
export function IrrationalNumbersTopic() {
  const [step, setStep] = React.useState<number>(1);

  return (
    <div className="space-y-4 animate-fade-in" id="g9_irrational_topic">
      <div className="bg-natural-beige-light border border-natural-beige-dark/60 p-4 rounded-xl space-y-2">
        <h3 className="text-xs font-extrabold text-natural-dark uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1 h-3.5 bg-natural-terracotta rounded-full" />
          Irrational Numbers
        </h3>
        <p className="text-xs text-natural-sage leading-relaxed">
          An <strong>Irrational Number</strong> cannot be written in the form{" "}
          <span className="font-mono font-bold text-natural-terracotta">p/q</span>. Its decimal expansion is{" "}
          <strong>non-terminating and non-recurring</strong> (neither stops nor repeats a regular block).
        </p>
        <p className="text-xs text-natural-sage leading-relaxed">
          <strong>Examples:</strong> <span className="font-mono">√2 ≈ 1.41421...</span>,{" "}
          <span className="font-mono">√3 ≈ 1.73205...</span>, and <span className="font-mono">π ≈ 3.14159...</span>.
        </p>
      </div>

      {/* Interactive Spiral construction */}
      <div className="bg-white border-2 border-natural-beige-dark rounded-xl p-4 space-y-4 shadow-sm">
        <span className="text-[9px] font-black uppercase text-natural-terracotta tracking-widest block text-center">
          📐 Visualizing Root 2 Construction
        </span>
        <p className="text-[10px] text-center text-natural-sage font-medium leading-tight">
          See how Pythagoras Theorem helps locate irrational √2 (~1.414) on the number line!
        </p>

        {/* Triangle canvas / CSS display */}
        <div className="relative h-32 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center p-4">
          {/* Main Number Line */}
          <div className="absolute bottom-6 left-6 right-6 h-0.5 bg-slate-400 flex justify-between items-center px-4">
            <span className="absolute left-1/4 -bottom-4 text-[9px] font-bold text-slate-500 font-mono">0</span>
            <span className="absolute left-1/2 -bottom-4 text-[9px] font-bold text-slate-500 font-mono">1</span>
            <span className="absolute left-3/4 -bottom-4 text-[9px] font-bold text-slate-500 font-mono">√2 ≈ 1.41</span>
            <span className="absolute right-2 -bottom-4 text-[9px] font-bold text-slate-500 font-mono">2</span>
          </div>

          {/* Triangulation */}
          <div className="absolute bottom-6 left-[25%] right-[50%] h-20 border-l border-b border-indigo-500 bg-indigo-50/40" style={{
            left: '25%',
            width: '25%',
            height: '50px',
            bottom: '24px',
            borderStyle: 'solid',
            borderColor: '#6366f1',
            borderWidth: '0 1px 1px 0',
          }}>
            {step >= 2 && (
              <div className="absolute right-0 bottom-0 w-[1px] h-[50px] bg-emerald-500" />
            )}
            {step >= 3 && (
              <div className="absolute right-0 bottom-0 h-[50px] bg-red-400 origin-bottom-left" style={{
                width: '1px',
                transform: 'rotate(26.5deg)',
                height: '56px',
                transformOrigin: 'bottom left',
              }} />
            )}
          </div>

          {/* Pythagoras Hypotenuse line */}
          {step >= 3 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="25%" y1="81" x2="50%" y2="31" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" />
              {/* Curve arc */}
              {step >= 4 && (
                <path d="M 190 31 A 56 56 0 0 1 247 81" fill="none" stroke="#e11d48" strokeWidth="2" />
              )}
            </svg>
          )}

          {/* Interactive details overlay */}
          <div className="absolute top-2 left-3 bg-white/90 border border-slate-200 px-2 py-0.5 rounded text-[8px] font-bold text-slate-600">
            {step === 1 && "Step 1: Mark 1 Unit from 0 to 1 on Number Line."}
            {step === 2 && "Step 2: Draw a perpendicular line of height 1 at point 1."}
            {step === 3 && "Step 3: Hypotenuse² = 1² + 1² = 2. So Hypotenuse = √2."}
            {step === 4 && "Step 4: Swing arc of radius √2 from 0 down to line at 1.414!"}
          </div>
        </div>

        {/* Construction controller */}
        <div className="grid grid-cols-4 gap-2 pt-2">
          {[1, 2, 3, 4].map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={`py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition cursor-pointer ${
                step === s
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 hover:bg-indigo-50 text-slate-700"
              }`}
            >
              Step {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TOPIC 3: DECIMAL EXPANSIONS (p/q Converter)
// ----------------------------------------------------
export function DecimalExpansionsTopic() {
  const [preset, setPreset] = React.useState<number>(0.3); // 0.3333..., 0.6666..., 0.2727...
  const [digitsCount, setDigitsCount] = React.useState<number>(1); // 1 for 0.333..., 2 for 0.2727...

  // Compute values dynamically
  const repeatPart = preset === 0.3 ? "3" : preset === 0.6 ? "6" : "27";
  const label = preset === 0.3 ? "0.333..." : preset === 0.6 ? "0.666..." : "0.2727...";
  const nVal = preset === 0.3 ? 3 : preset === 0.6 ? 6 : 27;
  const dVal = preset === 0.3 ? 9 : preset === 0.6 ? 9 : 99;
  
  // Simplify fraction
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const commonGcd = gcd(nVal, dVal);
  const finalNum = nVal / commonGcd;
  const finalDen = dVal / commonGcd;

  return (
    <div className="space-y-4 animate-fade-in" id="g9_decimal_topic">
      <div className="bg-natural-beige-light border border-natural-beige-dark/60 p-4 rounded-xl space-y-2">
        <h3 className="text-xs font-extrabold text-natural-dark uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1 h-3.5 bg-natural-terracotta rounded-full" />
          Decimal Expansions
        </h3>
        <p className="text-xs text-natural-sage leading-relaxed">
          The decimal expansion of a rational number is either:
        </p>
        <ul className="text-xs text-natural-sage list-disc list-inside space-y-0.5 font-bold">
          <li><strong>Terminating:</strong> stops completely (e.g., 7/8 = 0.875)</li>
          <li><strong>Non-Terminating Recurring (Repeating):</strong> repeats a block of digits (e.g., 1/3 = 0.3333...)</li>
        </ul>
      </div>

      {/* Interactive p/q algebraic solver */}
      <div className="bg-white border-2 border-natural-beige-dark rounded-xl p-4 space-y-4 shadow-sm">
        <span className="text-[9px] font-black uppercase text-natural-terracotta tracking-widest block text-center">
          ♾️ Convert Recurring Decimals to p/q
        </span>
        <p className="text-[10px] text-center text-natural-sage font-medium leading-tight">
          Choose a repeating decimal to trace the algebraic deduction process step-by-step.
        </p>

        {/* Selection presets */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "0.333...", val: 0.3, len: 1 },
            { label: "0.666...", val: 0.6, len: 1 },
            { label: "0.2727...", val: 0.27, len: 2 },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setPreset(item.val);
                setDigitsCount(item.len);
              }}
              className={`py-1.5 rounded-lg text-[9px] font-black tracking-wide transition cursor-pointer ${
                preset === item.val
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 hover:bg-emerald-50 text-slate-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Step by Step Proof */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2.5 text-[10px] text-slate-700 leading-normal font-bold">
          <p>
            Let <span className="font-mono text-indigo-600 font-black">x = {label}</span> ── (Equation 1)
          </p>
          <p>
            Since we have <span className="text-natural-terracotta font-extrabold">{digitsCount}</span> repeating digit(s), we multiply both sides by{" "}
            <span className="font-mono text-indigo-600 font-extrabold">{digitsCount === 1 ? "10" : "100"}</span>:
          </p>
          <p className="pl-3 border-l-2 border-slate-300 font-mono text-slate-800">
            {digitsCount === 1 ? "10" : "100"}x = {digitsCount === 1 ? `${preset === 0.3 ? "3" : "6"}.${repeatPart}${repeatPart}${repeatPart}...` : "27.2727..."} ── (Equation 2)
          </p>
          <p>
            Subtracting Equation 1 from Equation 2:
          </p>
          <div className="pl-3 border-l-2 border-slate-300 font-mono text-slate-800 space-y-1">
            <p>
              {digitsCount === 1 ? "10x - x" : "100x - x"} ={" "}
              {digitsCount === 1 ? `${preset === 0.3 ? "3" : "6"}.${repeatPart}${repeatPart}...` : "27.2727..."} - {label}
            </p>
            <p className="font-black text-emerald-700">
              {digitsCount === 1 ? "9x" : "99x"} = {nVal}
            </p>
          </div>
          <p>
            Hence, we solve for x:
          </p>
          <div className="flex items-center gap-1.5 font-mono">
            <span>x =</span>
            <div className="flex flex-col items-center">
              <span className="border-b border-slate-400 px-1.5">{nVal}</span>
              <span className="px-1.5">{dVal}</span>
            </div>
            {commonGcd > 1 && (
              <>
                <span className="text-slate-400 font-sans font-normal">Simplifies to</span>
                <div className="flex flex-col items-center text-emerald-700 font-extrabold">
                  <span className="border-b border-emerald-500 px-1.5">{finalNum}</span>
                  <span className="px-1.5">{finalDen}</span>
                </div>
              </>
            )}
          </div>
          <p className="text-emerald-700 text-[10px] pt-1">
            Success! Real-world verification: dividing {finalNum} by {finalDen} yields exactly {label}! 🎉
          </p>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TOPIC 4: OPERATIONS ON REAL NUMBERS
// ----------------------------------------------------
export function OperationsRealTopic() {
  const [valA, setValA] = React.useState<number>(5);
  const [valB, setValB] = React.useState<number>(3);

  const sumResult = `√${valA} + √${valB}`;
  const prodResult = `√(${valA} × ${valB}) = √${valA * valB}`;
  const identityFormulaVal = `(√${valA} + √${valB})(√${valA} - √${valB}) = ${valA} - ${valB} = ${valA - valB}`;

  return (
    <div className="space-y-4 animate-fade-in" id="g9_operations_topic">
      <div className="bg-natural-beige-light border border-natural-beige-dark/60 p-4 rounded-xl space-y-2">
        <h3 className="text-xs font-extrabold text-natural-dark uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1 h-3.5 bg-natural-terracotta rounded-full" />
          Operations on Real Numbers
        </h3>
        <p className="text-xs text-natural-sage leading-relaxed">
          When we add, subtract, multiply, or divide real numbers, we follow these fundamental algebraic rules:
        </p>
        <ul className="text-xs text-natural-sage list-disc list-inside space-y-0.5 font-bold pl-1">
          <li>The sum of a rational and an irrational number is always <strong>irrational</strong>.</li>
          <li>The product of a non-zero rational with an irrational is <strong>irrational</strong>.</li>
          <li>For positive real numbers <strong>a</strong> and <strong>b</strong>:</li>
        </ul>
        <div className="bg-white border border-natural-beige-dark/50 p-2.5 rounded-lg text-[10px] font-mono grid grid-cols-2 gap-2 text-slate-700">
          <div>• √(ab) = √a × √b</div>
          <div>• √(a/b) = √a / √b</div>
          <div>• (√a+√b)(√a-√b) = a-b</div>
          <div>• (a+√b)(a-√b) = a²-b</div>
        </div>
      </div>

      {/* Interactive Identity Calculator */}
      <div className="bg-white border-2 border-natural-beige-dark rounded-xl p-4 space-y-4 shadow-sm">
        <span className="text-[9px] font-black uppercase text-natural-terracotta tracking-widest block text-center">
          📊 Radical Identity Calculator
        </span>
        <p className="text-[10px] text-center text-natural-sage font-medium leading-tight">
          Select values for a and b to evaluate radical properties.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[8px] font-black uppercase text-slate-400 tracking-wider block mb-1">
              Value a
            </label>
            <input
              type="number"
              value={valA}
              onChange={(e) => setValA(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full text-center py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-black text-slate-800"
            />
          </div>
          <div>
            <label className="text-[8px] font-black uppercase text-slate-400 tracking-wider block mb-1">
              Value b
            </label>
            <input
              type="number"
              value={valB}
              onChange={(e) => setValB(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full text-center py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-black text-slate-800"
            />
          </div>
        </div>

        {/* Calculated proofs */}
        <div className="bg-indigo-50/50 border border-indigo-150 rounded-xl p-3.5 space-y-2.5 text-[10px] text-slate-700 font-bold leading-normal">
          <div>
            <span className="text-[8px] uppercase tracking-wider text-indigo-800 block">Product Property:</span>
            <span className="font-mono text-xs text-indigo-900 font-black">√{valA} × √{valB} = {prodResult}</span>
          </div>
          <div className="pt-2 border-t border-indigo-100">
            <span className="text-[8px] uppercase tracking-wider text-indigo-800 block">Conjugate Difference of Squares:</span>
            <span className="font-mono text-xs text-indigo-900 font-black">{identityFormulaVal}</span>
          </div>
          <div className="pt-2 border-t border-indigo-100">
            <span className="text-[8px] uppercase tracking-wider text-indigo-800 block">Square Expansion:</span>
            <span className="font-mono text-xs text-indigo-900 font-black">
              (√{valA} + √{valB})² = {valA} + 2√{valA * valB} + {valB} = {valA + valB} + 2√{valA * valB}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TOPIC 5: RATIONALIZING THE DENOMINATOR
// ----------------------------------------------------
export function RationalizingTopic() {
  const [denomA, setDenomA] = React.useState<number>(3);
  const [denomB, setDenomB] = React.useState<number>(2); // for denominator: a + √b i.e. 3 + √2

  const sqDiff = denomA * denomA - denomB;

  return (
    <div className="space-y-4 animate-fade-in" id="g9_rationalize_topic">
      <div className="bg-natural-beige-light border border-natural-beige-dark/60 p-4 rounded-xl space-y-2">
        <h3 className="text-xs font-extrabold text-natural-dark uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1 h-3.5 bg-natural-terracotta rounded-full" />
          Rationalizing the Denominator
        </h3>
        <p className="text-xs text-natural-sage leading-relaxed">
          When the denominator of an expression contains a term with a square root, we multiply both numerator and denominator by the <strong>conjugate factor</strong>. This clears the radical from the bottom.
        </p>
        <p className="text-xs text-natural-sage leading-relaxed">
          <strong>Conjugate Rule:</strong> The conjugate of{" "}
          <span className="font-mono text-natural-terracotta font-bold">a + √b</span> is{" "}
          <span className="font-mono text-natural-terracotta font-bold">a - √b</span>. Multiplying them produces rational integer:{" "}
          <span className="font-mono text-natural-terracotta font-bold">a² - b</span>.
        </p>
      </div>

      {/* Interactive Rationalization trace */}
      <div className="bg-white border-2 border-natural-beige-dark rounded-xl p-4 space-y-4 shadow-sm">
        <span className="text-[9px] font-black uppercase text-natural-terracotta tracking-widest block text-center">
          🪄 Step-by-Step Rationalizer
        </span>
        <p className="text-[10px] text-center text-natural-sage font-medium leading-tight">
          Rationalize the fraction: <span className="font-mono font-bold">1 / (a + √b)</span>
        </p>

        <div className="grid grid-cols-2 gap-3 items-end">
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider block min-h-[24px] flex items-end leading-tight">
              Integer Part (a)
            </label>
            <input
              type="number"
              value={denomA}
              onChange={(e) => setDenomA(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full text-center py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider block min-h-[24px] flex items-end leading-tight">
              Radical Term (b) (√b)
            </label>
            <input
              type="number"
              value={denomB}
              onChange={(e) => setDenomB(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full text-center py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {sqDiff === 0 ? (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-lg p-2.5 text-center text-[10px] font-black uppercase">
            Division by Zero error! a² must not equal b! 🛑
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5 text-[10px] text-slate-700 font-bold leading-normal">
            <p>
              We want to rationalize:
            </p>
            <div className="flex justify-center items-center font-mono py-1">
              <div className="flex flex-col items-center">
                <span className="border-b border-slate-400 px-3">1</span>
                <span className="px-3">{denomA} + √{denomB}</span>
              </div>
            </div>

            <p>
              <strong>Step 1:</strong> Find the conjugate of the denominator. Change the plus to minus:{" "}
              <span className="font-mono text-indigo-600 font-black">{denomA} - √{denomB}</span>.
            </p>

            <p>
              <strong>Step 2:</strong> Multiply both numerator and denominator by this conjugate:
            </p>
            <div className="flex justify-center items-center font-mono py-1 flex-wrap gap-2">
              <div className="flex flex-col items-center">
                <span className="border-b border-slate-400 px-3">1</span>
                <span className="px-3">{denomA} + √{denomB}</span>
              </div>
              <span>×</span>
              <div className="flex flex-col items-center text-indigo-600">
                <span className="border-b border-indigo-400 px-3">{denomA} - √{denomB}</span>
                <span className="px-3">{denomA} - √{denomB}</span>
              </div>
              <span>=</span>
              <div className="flex flex-col items-center">
                <span className="border-b border-slate-400 px-3">{denomA} - √{denomB}</span>
                <span className="px-3">({denomA} + √{denomB})({denomA} - √{denomB})</span>
              </div>
            </div>

            <p>
              <strong>Step 3:</strong> Apply difference of squares identity <span className="font-mono">(x+y)(x-y) = x²-y²</span> to bottom:
            </p>
            <p className="pl-3 border-l-2 border-slate-300 font-mono text-slate-800">
              Denominator = ({denomA})² - (√{denomB})² = {denomA * denomA} - {denomB} = {sqDiff}
            </p>

            <p>
              <strong>Final Rationalized Answer:</strong>
            </p>
            <div className="flex justify-center items-center font-mono py-1.5 text-emerald-700 font-extrabold text-xs">
              {sqDiff === 1 ? (
                <span>{denomA} - √{denomB}</span>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="border-b border-emerald-500 px-3">{denomA} - √{denomB}</span>
                  <span className="px-3">{sqDiff}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TOPIC 6: LAWS OF EXPONENTS FOR REAL NUMBERS
// ----------------------------------------------------
export function ExponentLawsTopic() {
  const [base, setBase] = React.useState<number>(2);
  const [expP, setExpP] = React.useState<number>(3);
  const [expQ, setExpQ] = React.useState<number>(2);

  return (
    <div className="space-y-4 animate-fade-in" id="g9_exponents_topic">
      <div className="bg-natural-beige-light border border-natural-beige-dark/60 p-4 rounded-xl space-y-2">
        <h3 className="text-xs font-extrabold text-natural-dark uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1 h-3.5 bg-natural-terracotta rounded-full" />
          Laws of Exponents for Real Numbers
        </h3>
        <p className="text-xs text-natural-sage leading-relaxed">
          Let <strong>a &gt; 0</strong> be a real number base, and <strong>p</strong> and <strong>q</strong> be rational exponent powers:
        </p>
        <div className="bg-white border border-natural-beige-dark/50 p-4 rounded-xl space-y-4 text-sm text-slate-800 font-sans" id="exponents_list_textbook">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-natural-terracotta bg-natural-beige-light px-2 py-0.5 rounded-md min-w-[20px] text-center">1</span>
            <span className="text-sm font-semibold">
              <span className="italic font-serif">a</span><sup><span className="italic font-serif text-[10px]">p</span></sup> × <span className="italic font-serif">a</span><sup><span className="italic font-serif text-[10px]">q</span></sup> = <span className="italic font-serif">a</span><sup><span className="italic font-serif text-[10px]">p + q</span></sup>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-natural-terracotta bg-natural-beige-light px-2 py-0.5 rounded-md min-w-[20px] text-center">2</span>
            <span className="text-sm font-semibold">
              (<span className="italic font-serif">a</span><sup><span className="italic font-serif text-[10px]">p</span></sup>)<sup><span className="italic font-serif text-[10px]">q</span></sup> = <span className="italic font-serif">a</span><sup><span className="italic font-serif text-[10px]">p × q</span></sup>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-natural-terracotta bg-natural-beige-light px-2 py-0.5 rounded-md min-w-[20px] text-center">3</span>
            <span className="text-sm font-semibold flex items-center gap-2">
              <div className="flex flex-col items-center justify-center inline-flex select-none">
                <span className="border-b border-slate-300 px-1"><span className="italic font-serif">a</span><sup><span className="italic font-serif text-[9px]">p</span></sup></span>
                <span className="px-1"><span className="italic font-serif">a</span><sup><span className="italic font-serif text-[9px]">q</span></sup></span>
              </div>
              <span className="text-slate-400 font-normal">=</span>
              <span><span className="italic font-serif">a</span><sup><span className="italic font-serif text-[10px]">p − q</span></sup></span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-natural-terracotta bg-natural-beige-light px-2 py-0.5 rounded-md min-w-[20px] text-center">4</span>
            <span className="text-sm font-semibold">
              <span className="italic font-serif">a</span><sup><span className="italic font-serif text-[10px]">p</span></sup> × <span className="italic font-serif">b</span><sup><span className="italic font-serif text-[10px]">p</span></sup> = (<span className="italic font-serif">a</span> × <span className="italic font-serif">b</span>)<sup><span className="italic font-serif text-[10px]">p</span></sup>
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Laws Explorer */}
      <div className="bg-white border-2 border-natural-beige-dark rounded-xl p-4 space-y-4 shadow-sm">
        <span className="text-[9px] font-black uppercase text-natural-terracotta tracking-widest block text-center">
          ⚡ Interactive Exponents Sandbox
        </span>
        <p className="text-[10px] text-center text-natural-sage font-medium leading-tight">
          Select positive integers for base (a), exponent (p) and (q).
        </p>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-[8px] font-black uppercase text-slate-400 tracking-wider block mb-1">
              Base (a)
            </label>
            <input
              type="number"
              value={base}
              onChange={(e) => setBase(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full text-center py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-black text-slate-800"
            />
          </div>
          <div>
            <label className="text-[8px] font-black uppercase text-slate-400 tracking-wider block mb-1">
              Power (p)
            </label>
            <input
              type="number"
              value={expP}
              onChange={(e) => setExpP(Math.min(6, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full text-center py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-black text-slate-800"
            />
          </div>
          <div>
            <label className="text-[8px] font-black uppercase text-slate-400 tracking-wider block mb-1">
              Power (q)
            </label>
            <input
              type="number"
              value={expQ}
              onChange={(e) => setExpQ(Math.min(6, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full text-center py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-black text-slate-800"
            />
          </div>
        </div>

        {/* Dynamic calculation results */}
        <div className="bg-emerald-50/40 border border-emerald-150 rounded-xl p-4 space-y-4 text-xs text-slate-700 font-semibold leading-normal">
          <div className="space-y-1">
            <span className="text-[9px] text-emerald-800 uppercase tracking-widest block font-black">Law 1: Product of Same Bases</span>
            <div className="text-sm font-bold text-slate-800">
              {base}<sup>{expP}</sup> × {base}<sup>{expQ}</sup> = {base}<sup>{expP} + {expQ}</sup> = {base}<sup>{expP + expQ}</sup> = <span className="text-emerald-700 font-black">{Math.pow(base, expP + expQ)}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-emerald-100 space-y-1">
            <span className="text-[9px] text-emerald-800 uppercase tracking-widest block font-black">Law 2: Power of a Power</span>
            <div className="text-sm font-bold text-slate-800">
              ({base}<sup>{expP}</sup>)<sup>{expQ}</sup> = {base}<sup>{expP} × {expQ}</sup> = {base}<sup>{expP * expQ}</sup> = <span className="text-emerald-700 font-black">{Math.pow(base, expP * expQ)}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-emerald-100 space-y-1">
            <span className="text-[9px] text-emerald-800 uppercase tracking-widest block font-black">Law 3: Quotient of Same Bases</span>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800 flex-wrap">
              <div className="flex flex-col items-center justify-center inline-flex select-none">
                <span className="border-b border-slate-300 px-1">{base}<sup>{expP}</sup></span>
                <span className="px-1">{base}<sup>{expQ}</sup></span>
              </div>
              <span className="text-slate-400 font-normal">=</span>
              <span>{base}<sup>{expP} − {expQ}</sup></span>
              <span className="text-slate-400 font-normal">=</span>
              <span>{base}<sup>{expP - expQ}</sup></span>
              <span className="text-slate-400 font-normal">=</span>
              <span className="text-emerald-700 font-black">{Math.pow(base, expP - expQ).toFixed(3).replace(/\.?0+$/, '')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProbabilityTopic() {
  const [experimentType, setExperimentType] = React.useState<"coin" | "dice" | "cards">("coin");
  const [headsCount, setHeadsCount] = React.useState<number>(0);
  const [tailsCount, setTailsCount] = React.useState<number>(0);
  const [diceCounts, setDiceCounts] = React.useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [cardSuitCounts, setCardSuitCounts] = React.useState<{ [key: string]: number }>({ "♠️": 0, "♥️": 0, "♦️": 0, "♣️": 0 });
  const [totalSimulated, setTotalSimulated] = React.useState<number>(0);
  const [lastResult, setLastResult] = React.useState<string | null>(null);

  const runSimulations = (count: number) => {
    if (experimentType === "coin") {
      let h = 0;
      let t = 0;
      let last = "";
      for (let i = 0; i < count; i++) {
        if (Math.random() < 0.5) {
          h++;
          last = "🪙 Heads";
        } else {
          t++;
          last = "🪙 Tails";
        }
      }
      setHeadsCount((prev) => prev + h);
      setTailsCount((prev) => prev + t);
      setTotalSimulated((prev) => prev + count);
      setLastResult(last);
    } else if (experimentType === "dice") {
      const counts = [...diceCounts];
      let last = "";
      for (let i = 0; i < count; i++) {
        const roll = Math.floor(Math.random() * 6) + 1;
        counts[roll - 1]++;
        last = `🎲 Rolled a ${roll}`;
      }
      setDiceCounts(counts);
      setTotalSimulated((prev) => prev + count);
      setLastResult(last);
    } else {
      const suits = ["♠️", "♥️", "♦️", "♣️"];
      const updated = { ...cardSuitCounts };
      let last = "";
      for (let i = 0; i < count; i++) {
        const suit = suits[Math.floor(Math.random() * 4)];
        updated[suit] = (updated[suit] || 0) + 1;
        last = `🃏 Drawn ${suit} Card`;
      }
      setCardSuitCounts(updated);
      setTotalSimulated((prev) => prev + count);
      setLastResult(last);
    }
  };

  const resetSim = () => {
    setHeadsCount(0);
    setTailsCount(0);
    setDiceCounts([0, 0, 0, 0, 0, 0]);
    setCardSuitCounts({ "♠️": 0, "♥️": 0, "♦️": 0, "♣️": 0 });
    setTotalSimulated(0);
    setLastResult(null);
  };

  return (
    <div className="space-y-4 animate-fade-in" id="g9_probability_topic">
      {/* Overview Cards: Theoretical vs Experimental */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Theoretical Probability Card */}
        <div className="bg-indigo-50/80 border-2 border-indigo-200 p-4 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-black text-indigo-900 uppercase tracking-wider">
            <span className="w-2 h-2 bg-indigo-600 rounded-full" />
            1. Theoretical Probability (సైద్ధాంతిక)
          </div>
          <p className="text-[11px] text-indigo-800 leading-relaxed font-medium">
            Calculated <strong>mathematically</strong> before conducting any experiment, assuming all outcomes in the sample space are equally likely:
          </p>
          <div className="bg-white border border-indigo-200 px-3 py-2 rounded-lg font-mono text-[11px] text-indigo-950 font-bold text-center shadow-2xs">
            P_theory(E) = n(Favorable Outcomes) / n(Total Sample Space)
          </div>
          <div className="text-[10px] text-indigo-700 bg-indigo-100/60 p-2 rounded-lg font-mono space-y-0.5">
            <div>• Fair Coin P(Heads) = 1 / 2 = 0.500 (50.0%)</div>
            <div>• Single Die P(Face 6) = 1 / 6 ≈ 0.167 (16.7%)</div>
            <div>• Playing Card P(Suit ♠️) = 13 / 52 = 1 / 4 = 0.250 (25.0%)</div>
          </div>
        </div>

        {/* Experimental Probability Card */}
        <div className="bg-amber-50/80 border-2 border-amber-200 p-4 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-black text-amber-900 uppercase tracking-wider">
            <span className="w-2 h-2 bg-amber-600 rounded-full" />
            2. Experimental / Empirical Probability (ప్రాయోగిక)
          </div>
          <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
            Calculated from <strong>actual recorded observations & trials</strong> conducted in real time:
          </p>
          <div className="bg-white border border-amber-200 px-3 py-2 rounded-lg font-mono text-[11px] text-amber-950 font-bold text-center shadow-2xs">
            P_exp(E) = (Number of trials where E occurred) / (Total trials n)
          </div>
          <div className="text-[10px] text-amber-700 bg-amber-100/60 p-2 rounded-lg font-mono space-y-0.5">
            <div>• Law of Large Numbers: As total trials n → ∞</div>
            <div>• Experimental Probability → Theoretical Probability</div>
            <div>• P(E) + P(not E) = 1 (Complementary Events)</div>
          </div>
        </div>
      </div>

      {/* Interactive Simulator Workspace */}
      <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 space-y-4 shadow-xs">
        <div className="flex justify-between items-center border-b border-amber-100 pb-2">
          <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>🎲</span> Interactive Probability Laboratory
          </h4>
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            Compare Theoretical vs Empirical
          </span>
        </div>

        {/* Experiment selector */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => {
              setExperimentType("coin");
              resetSim();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              experimentType === "coin"
                ? "bg-amber-600 text-white shadow-sm scale-102"
                : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
            }`}
          >
            🪙 Coin Toss (2 Outcomes)
          </button>
          <button
            onClick={() => {
              setExperimentType("dice");
              resetSim();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              experimentType === "dice"
                ? "bg-amber-600 text-white shadow-sm scale-102"
                : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
            }`}
          >
            🎲 Die Roll (6 Outcomes)
          </button>
          <button
            onClick={() => {
              setExperimentType("cards");
              resetSim();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              experimentType === "cards"
                ? "bg-amber-600 text-white shadow-sm scale-102"
                : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
            }`}
          >
            🃏 Card Suit Draw (4 Outcomes)
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-amber-100">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Run Trials:</span>
            {[1, 10, 50, 100, 500].map((cnt) => (
              <button
                key={cnt}
                onClick={() => runSimulations(cnt)}
                className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg text-xs font-bold text-amber-900 transition active:scale-95 cursor-pointer"
              >
                +{cnt} {cnt === 1 ? "Trial" : "Trials"}
              </button>
            ))}
          </div>
          <button
            onClick={resetSim}
            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-xs font-bold text-rose-700 transition cursor-pointer"
          >
            Reset All
          </button>
        </div>

        {lastResult && (
          <div className="text-center font-black text-xs text-amber-900 bg-amber-50/90 py-1.5 rounded-xl border border-amber-200 animate-bounce">
            Last Trial Result: {lastResult}
          </div>
        )}

        {/* Results view */}
        {totalSimulated > 0 ? (
          <div className="space-y-4 pt-2 border-t border-amber-100">
            <div className="flex flex-wrap justify-between items-center text-xs font-black text-slate-800 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-amber-900 font-extrabold">Total Conducted Trials (n): {totalSimulated}</span>
              <span className="text-[10.5px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                ✨ Law of Large Numbers Active: Notice convergence as n grows!
              </span>
            </div>

            {/* Coin Toss comparison */}
            {experimentType === "coin" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: "Heads", emoji: "🪙", count: headsCount, theoryProb: 0.5 },
                  { key: "Tails", emoji: "🪙", count: tailsCount, theoryProb: 0.5 }
                ].map((item) => {
                  const expProb = item.count / totalSimulated;
                  const expPct = (expProb * 100).toFixed(1);
                  const theoryPct = (item.theoryProb * 100).toFixed(1);
                  const diffPct = (expProb * 100 - item.theoryProb * 100).toFixed(1);

                  return (
                    <div key={item.key} className="bg-slate-50/80 border border-slate-200 p-3 rounded-xl space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-slate-900">{item.emoji} {item.key}</span>
                        <span className="text-xs font-black text-amber-700">{item.count} times</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div className="bg-indigo-50 border border-indigo-150 p-1.5 rounded-lg text-center">
                          <div className="text-[9px] font-extrabold text-indigo-700 uppercase">Theoretical</div>
                          <div className="font-bold text-indigo-900">{item.theoryProb.toFixed(3)} ({theoryPct}%)</div>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 p-1.5 rounded-lg text-center">
                          <div className="text-[9px] font-extrabold text-amber-800 uppercase">Experimental</div>
                          <div className="font-bold text-emerald-700">{expProb.toFixed(3)} ({expPct}%)</div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500">
                          <span>Empirical Bar vs 50% Line</span>
                          <span className={Number(diffPct) >= 0 ? "text-emerald-600" : "text-rose-600"}>
                            {Number(diffPct) >= 0 ? `+${diffPct}%` : `${diffPct}%`} from Theory
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden relative">
                          <div
                            className="bg-amber-500 h-full transition-all duration-300"
                            style={{ width: `${expPct}%` }}
                          />
                          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-indigo-600 z-10" title="Theoretical 50% line" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Die Roll comparison */}
            {experimentType === "dice" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[1, 2, 3, 4, 5, 6].map((num) => {
                  const cnt = diceCounts[num - 1];
                  const expProb = cnt / totalSimulated;
                  const expPct = (expProb * 100).toFixed(1);
                  const theoryProb = 1 / 6;
                  const theoryPct = (theoryProb * 100).toFixed(1);

                  return (
                    <div key={num} className="bg-slate-50/80 border border-slate-200 p-2.5 rounded-xl space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-black text-slate-900">
                        <span>Face {num} 🎲</span>
                        <span className="text-amber-700">{cnt}x</span>
                      </div>

                      <div className="text-[10px] font-mono space-y-0.5">
                        <div className="text-indigo-800 font-bold">Theory: {theoryProb.toFixed(3)} ({theoryPct}%)</div>
                        <div className="text-emerald-700 font-black">Exp: {expProb.toFixed(3)} ({expPct}%)</div>
                      </div>

                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden relative">
                        <div
                          className="bg-amber-500 h-full transition-all duration-300"
                          style={{ width: `${Math.min(100, Number(expPct) * 3)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Cards Suit Draw comparison */}
            {experimentType === "cards" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {["♠️ Spades", "♥️ Hearts", "♦️ Diamonds", "♣️ Clubs"].map((label) => {
                  const suitSymbol = label.split(" ")[0];
                  const cnt = cardSuitCounts[suitSymbol] || 0;
                  const expProb = cnt / totalSimulated;
                  const expPct = (expProb * 100).toFixed(1);
                  const theoryProb = 0.25;

                  return (
                    <div key={label} className="bg-slate-50/80 border border-slate-200 p-2.5 rounded-xl space-y-1.5 text-center">
                      <div className="text-xs font-black text-slate-900">{label}</div>
                      <div className="text-xs font-bold text-amber-700">{cnt} drawn</div>

                      <div className="text-[10px] font-mono space-y-0.5">
                        <div className="text-indigo-800 font-bold">Theory: 0.250 (25.0%)</div>
                        <div className="text-emerald-700 font-black">Exp: {expProb.toFixed(3)} ({expPct}%)</div>
                      </div>

                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-amber-500 h-full transition-all duration-300"
                          style={{ width: `${expPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6 bg-amber-50/40 rounded-xl border border-dashed border-amber-200 text-amber-800 text-xs italic">
            👆 Click "+1 Trial", "+10 Trials", or "+100 Trials" above to start live probability experiments!
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TOPIC 8: ALGEBRAIC IDENTITIES INTERACTIVE VISUALIZER
// ----------------------------------------------------
export function AlgebraicIdentitiesTopic() {
  const [selectedIdentity, setSelectedIdentity] = React.useState<"sq_plus" | "sq_minus" | "diff_sq" | "trinomial" | "cube_plus">("sq_plus");
  const [valA, setValA] = React.useState<number>(4);
  const [valB, setValB] = React.useState<number>(3);
  const [valC, setValC] = React.useState<number>(2);

  const lhs = React.useMemo(() => {
    if (selectedIdentity === "sq_plus") return Math.pow(valA + valB, 2);
    if (selectedIdentity === "sq_minus") return Math.pow(valA - valB, 2);
    if (selectedIdentity === "diff_sq") return (valA + valB) * (valA - valB);
    if (selectedIdentity === "trinomial") return Math.pow(valA + valB + valC, 2);
    if (selectedIdentity === "cube_plus") return Math.pow(valA + valB, 3);
    return 0;
  }, [selectedIdentity, valA, valB, valC]);

  const rhs = React.useMemo(() => {
    if (selectedIdentity === "sq_plus") return Math.pow(valA, 2) + 2 * valA * valB + Math.pow(valB, 2);
    if (selectedIdentity === "sq_minus") return Math.pow(valA, 2) - 2 * valA * valB + Math.pow(valB, 2);
    if (selectedIdentity === "diff_sq") return Math.pow(valA, 2) - Math.pow(valB, 2);
    if (selectedIdentity === "trinomial")
      return Math.pow(valA, 2) + Math.pow(valB, 2) + Math.pow(valC, 2) + 2 * valA * valB + 2 * valB * valC + 2 * valC * valA;
    if (selectedIdentity === "cube_plus")
      return Math.pow(valA, 3) + Math.pow(valB, 3) + 3 * valA * valB * (valA + valB);
    return 0;
  }, [selectedIdentity, valA, valB, valC]);

  const totalLen = valA + valB;
  const scale = 180 / Math.max(1, totalLen);
  const sizeA = valA * scale;
  const sizeB = valB * scale;

  return (
    <div className="space-y-4 animate-fade-in" id="g9_algebraic_identities_topic">
      <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl space-y-2">
        <h3 className="text-xs font-extrabold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1 h-3.5 bg-indigo-600 rounded-full" />
          Geometric & Algebraic Identity Explorer (బీజగణిత సూత్రాలు)
        </h3>
        <p className="text-xs text-indigo-800 leading-relaxed">
          Algebraic identities are equations that hold true for ALL values of variables. Below, explore the geometric area decomposition proof for <span className="font-mono font-bold">(a + b)² = a² + 2ab + b²</span>!
        </p>
      </div>

      <div className="bg-white border-2 border-indigo-200 rounded-xl p-4 space-y-4 shadow-sm">
        {/* Identity Selector */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {[
            { id: "sq_plus", label: "(a + b)² = a² + 2ab + b²" },
            { id: "sq_minus", label: "(a - b)² = a² - 2ab + b²" },
            { id: "diff_sq", label: "a² - b² = (a + b)(a - b)" },
            { id: "trinomial", label: "(a + b + c)²" },
            { id: "cube_plus", label: "(a + b)³" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedIdentity(item.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                selectedIdentity === item.id
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border border-indigo-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Value Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-indigo-900">
              <span>Variable a:</span>
              <span className="font-mono text-indigo-700 font-extrabold">{valA}</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              value={valA}
              onChange={(e) => setValA(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-indigo-900">
              <span>Variable b:</span>
              <span className="font-mono text-indigo-700 font-extrabold">{valB}</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              value={valB}
              onChange={(e) => setValB(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {selectedIdentity === "trinomial" && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-indigo-900">
                <span>Variable c:</span>
                <span className="font-mono text-indigo-700 font-extrabold">{valC}</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                value={valC}
                onChange={(e) => setValC(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Proof Verification Bar */}
        <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-xl text-center space-y-1">
          <div className="text-xs font-extrabold text-emerald-900 uppercase">Numerical Real-Time Verification</div>
          <div className="flex flex-wrap justify-center items-center gap-2 text-xs font-mono font-bold text-emerald-900">
            <span className="bg-white px-2 py-1 rounded border border-emerald-300">LHS = {lhs}</span>
            <span className="text-emerald-600 font-extrabold text-sm">=</span>
            <span className="bg-white px-2 py-1 rounded border border-emerald-300">RHS = {rhs}</span>
            <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">✓ Identity Verified!</span>
          </div>
        </div>

        {/* Geometric Area Decomposition Diagram for (a+b)^2 */}
        {selectedIdentity === "sq_plus" && (
          <div className="flex flex-col items-center space-y-3 pt-2">
            <div className="text-xs font-bold text-indigo-900">Geometric Area Decomposition of Square of Side (a + b)</div>
            <svg width="220" height="220" className="border-2 border-indigo-300 rounded-xl bg-white shadow-inner">
              {/* Region 1: Square a*a */}
              <rect x="10" y="10" width={sizeA} height={sizeA} fill="#818cf8" opacity="0.8" stroke="#3730a3" strokeWidth="1.5" />
              <text x={10 + sizeA / 2} y={10 + sizeA / 2} textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                a² ({valA * valA})
              </text>

              {/* Region 2: Rectangle a*b (Top Right) */}
              <rect x={10 + sizeA} y="10" width={sizeB} height={sizeA} fill="#fb923c" opacity="0.8" stroke="#c2410c" strokeWidth="1.5" />
              <text x={10 + sizeA + sizeB / 2} y={10 + sizeA / 2} textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                ab ({valA * valB})
              </text>

              {/* Region 3: Rectangle b*a (Bottom Left) */}
              <rect x="10" y={10 + sizeA} width={sizeA} height={sizeB} fill="#fb923c" opacity="0.8" stroke="#c2410c" strokeWidth="1.5" />
              <text x={10 + sizeA / 2} y={10 + sizeA + sizeB / 2} textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                ba ({valA * valB})
              </text>

              {/* Region 4: Square b*b (Bottom Right) */}
              <rect x={10 + sizeA} y={10 + sizeA} width={sizeB} height={sizeB} fill="#34d399" opacity="0.85" stroke="#065f46" strokeWidth="1.5" />
              <text x={10 + sizeA + sizeB / 2} y={10 + sizeA + sizeB / 2} textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                b² ({valB * valB})
              </text>
            </svg>

            <div className="flex flex-wrap justify-center gap-3 text-[11px] font-bold text-slate-700">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-500 rounded" /> Square a² = {valA * valA}</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-400 rounded" /> 2 Rectangles ab = {2 * valA * valB}</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-500 rounded" /> Square b² = {valB * valB}</span>
            </div>
          </div>
        )}
      </div>

      {/* Complete Grade 9 Algebraic Identities Clean Reference List */}
      <div className="bg-white border-2 border-slate-200 rounded-xl p-4 space-y-4 shadow-xs">
        <h4 className="text-xs font-black uppercase text-indigo-950 tracking-wider flex items-center gap-2">
          <span>📘 Algebraic Identities Reference List</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Standard Identities */}
          <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-3.5 space-y-2">
            <h5 className="text-xs font-extrabold text-indigo-900 border-b border-indigo-200 pb-1 uppercase tracking-tight">
              Standard Identities
            </h5>
            <ul className="space-y-1.5 text-xs font-mono text-slate-800">
              <li className="bg-white px-2.5 py-1 rounded border border-indigo-100 shadow-2xs">(x + y)² = x² + 2xy + y²</li>
              <li className="bg-white px-2.5 py-1 rounded border border-indigo-100 shadow-2xs">(x - y)² = x² - 2xy + y²</li>
              <li className="bg-white px-2.5 py-1 rounded border border-indigo-100 shadow-2xs">x² - y² = (x + y)(x - y)</li>
              <li className="bg-white px-2.5 py-1 rounded border border-indigo-100 shadow-2xs">(x + a)(x + b) = x² + (a + b)x + ab</li>
            </ul>
          </div>

          {/* Expanded Trinomial & Cubic Identities */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 space-y-2">
            <h5 className="text-xs font-extrabold text-amber-900 border-b border-amber-200 pb-1 uppercase tracking-tight">
              Expanded Trinomial & Cubic Identities
            </h5>
            <ul className="space-y-1.5 text-xs font-mono text-slate-800">
              <li className="bg-white px-2.5 py-1 rounded border border-amber-100 shadow-2xs">(x + y + z)² = x² + y² + z² + 2xy + 2yz + 2zx</li>
              <li className="bg-white px-2.5 py-1 rounded border border-amber-100 shadow-2xs">(x + y)³ = x³ + y³ + 3xy(x + y) = x³ + 3x²y + 3xy² + y³</li>
              <li className="bg-white px-2.5 py-1 rounded border border-amber-100 shadow-2xs">(x - y)³ = x³ - y³ - 3xy(x - y) = x³ - 3x²y + 3xy² - y³</li>
            </ul>
          </div>

          {/* Factorization Identities */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 space-y-2">
            <h5 className="text-xs font-extrabold text-emerald-900 border-b border-emerald-200 pb-1 uppercase tracking-tight">
              Factorization Identities
            </h5>
            <ul className="space-y-1.5 text-xs font-mono text-slate-800">
              <li className="bg-white px-2.5 py-1 rounded border border-emerald-100 shadow-2xs">x³ + y³ = (x + y)(x² - xy + y²)</li>
              <li className="bg-white px-2.5 py-1 rounded border border-emerald-100 shadow-2xs">x³ - y³ = (x - y)(x² + xy + y²)</li>
              <li className="bg-white px-2.5 py-1 rounded border border-emerald-100 shadow-2xs">x³ + y³ + z³ - 3xyz = (x + y + z)(x² + y² + z² - xy - yz - zx)</li>
            </ul>
            <div className="bg-emerald-100/70 p-2 rounded-lg text-[11px] font-medium text-emerald-950 border border-emerald-300">
              <strong>Note:</strong> If x + y + z = 0, then <strong>x³ + y³ + z³ = 3xyz</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TOPIC 9: COORDINATE GEOMETRY INTERACTIVE CANVAS
// ----------------------------------------------------
export function CoordinateGeometryTopic() {
  const [pointX, setPointX] = React.useState<number>(3);
  const [pointY, setPointY] = React.useState<number>(4);

  const getQuadrant = (x: number, y: number) => {
    if (x === 0 && y === 0) return "Origin (0,0)";
    if (x === 0) return "On Y-Axis";
    if (y === 0) return "On X-Axis";
    if (x > 0 && y > 0) return "Quadrant I (+, +)";
    if (x < 0 && y > 0) return "Quadrant II (-, +)";
    if (x < 0 && y < 0) return "Quadrant III (-, -)";
    return "Quadrant IV (+, -)";
  };

  const canvasWidth = 240;
  const canvasHeight = 240;
  const originX = canvasWidth / 2;
  const originY = canvasHeight / 2;
  const stepSize = 20; // 20px per unit

  const posX = originX + pointX * stepSize;
  const posY = originY - pointY * stepSize;

  return (
    <div className="space-y-4 animate-fade-in" id="g9_coordinate_geometry_topic">
      <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl space-y-2">
        <h3 className="text-xs font-extrabold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1 h-3.5 bg-rose-600 rounded-full" />
          Cartesian Plane & Quadrant Plotter (రూపరేఖా రేఖాగణితం)
        </h3>
        <p className="text-xs text-rose-800 leading-relaxed">
          Move the sliders or click on the grid to plot point <span className="font-mono font-bold">P(x, y)</span> on the Cartesian plane!
        </p>
      </div>

      <div className="bg-white border-2 border-rose-200 rounded-xl p-4 space-y-4 shadow-sm">
        {/* Sliders for X and Y */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-rose-50/50 p-3 rounded-xl border border-rose-100">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-rose-900">
              <span>X-Coordinate (Abscissa):</span>
              <span className="font-mono text-rose-700 font-extrabold">{pointX}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              value={pointX}
              onChange={(e) => setPointX(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-rose-900">
              <span>Y-Coordinate (Ordinate):</span>
              <span className="font-mono text-rose-700 font-extrabold">{pointY}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              value={pointY}
              onChange={(e) => setPointY(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Live Location Specs */}
        <div className="bg-slate-900 text-white p-3 rounded-xl flex flex-wrap justify-between items-center text-xs gap-2 font-mono">
          <div>
            Point P = <span className="text-amber-300 font-bold font-mono">({pointX}, {pointY})</span>
          </div>
          <div>
            Location: <span className="text-emerald-400 font-bold">{getQuadrant(pointX, pointY)}</span>
          </div>
          <div>
            Dist from Y-axis = <span className="text-sky-300 font-bold">{Math.abs(pointX)}</span>
          </div>
          <div>
            Dist from X-axis = <span className="text-rose-300 font-bold">{Math.abs(pointY)}</span>
          </div>
        </div>

        {/* Interactive SVG Grid Canvas */}
        <div className="flex justify-center pt-2">
          <svg width={canvasWidth} height={canvasHeight} className="border-2 border-slate-300 rounded-xl bg-slate-50 shadow-inner">
            {/* Grid lines */}
            {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((num) => (
              <React.Fragment key={num}>
                <line
                  x1={originX + num * stepSize}
                  y1="0"
                  x2={originX + num * stepSize}
                  y2={canvasHeight}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <line
                  x1="0"
                  y1={originY - num * stepSize}
                  x2={canvasWidth}
                  y2={originY - num * stepSize}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              </React.Fragment>
            ))}

            {/* Quadrant Labels */}
            <text x="200" y="30" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">Q I (+,+)</text>
            <text x="40" y="30" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">Q II (-,+)</text>
            <text x="40" y="210" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">Q III (-,-)</text>
            <text x="200" y="210" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">Q IV (+,-)</text>

            {/* X-Axis */}
            <line x1="0" y1={originY} x2={canvasWidth} y2={originY} stroke="#1e293b" strokeWidth="2" />
            {/* Y-Axis */}
            <line x1={originX} y1="0" x2={originX} y2={canvasHeight} stroke="#1e293b" strokeWidth="2" />

            {/* Dotted lines from point to axes */}
            <line x1={posX} y1={originY} x2={posX} y2={posY} stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1={originX} y1={posY} x2={posX} y2={posY} stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3,3" />

            {/* Plotted Point P */}
            <circle cx={posX} cy={posY} r="6" fill="#e11d48" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
            <text x={posX + 8} y={posY - 8} fill="#9f1239" fontSize="11" fontWeight="bold">
              P({pointX}, {pointY})
            </text>

            {/* Origin Dot */}
            <circle cx={originX} cy={originY} r="3" fill="#1e293b" />
            <text x={originX + 4} y={originY + 12} fill="#64748b" fontSize="9" fontWeight="bold">O(0,0)</text>
          </svg>
        </div>
      </div>
    </div>
  );
}
