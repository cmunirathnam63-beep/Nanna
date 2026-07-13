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
          Rational Numbers (परिमेय संख्याएँ)
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
          Irrational Numbers (अपरिमेय संख्याएँ)
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
          Decimal Expansions (दशमलव प्रसार)
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
