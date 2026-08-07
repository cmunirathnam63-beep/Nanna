import React, { useState } from "react";
import { Compass, Layers, Sparkles, BookOpen, CheckCircle2, RefreshCw, Calculator, ArrowRight, Zap, Hash } from "lucide-react";

export default function Grade6TopicExplorer({ defaultTab = "geometry", hideTabSwitcher = false }: { defaultTab?: "geometry" | "patterns"; hideTabSwitcher?: boolean }) {
  const [activeTab, setActiveTab] = useState<"geometry" | "patterns">(defaultTab);

  // Geometry Tool State
  const [numCollinearPoints, setNumCollinearPoints] = useState<number>(4);
  const [angleDegrees, setAngleDegrees] = useState<number>(250);
  const [polygonSides, setPolygonSides] = useState<number>(7);

  // Sequence Tool State
  const [oddCount, setOddCount] = useState<number>(4);
  const [triangularN, setTriangularN] = useState<number>(6);
  const [hexagonalN, setHexagonalN] = useState<number>(4);
  const [powerBase, setPowerBase] = useState<number>(3);
  const [flowerRows, setFlowerRows] = useState<number>(6);

  // Derived Geometry Calculations
  const lineSegmentsCount = (numCollinearPoints * (numCollinearPoints - 1)) / 2;
  const getAngleType = (deg: number) => {
    if (deg < 90) return { type: "Acute Angle", color: "text-sky-600", desc: "Less than 90°" };
    if (deg === 90) return { type: "Right Angle", color: "text-emerald-600", desc: "Exactly 90° (Perpendicular)" };
    if (deg < 180) return { type: "Obtuse Angle", color: "text-indigo-600", desc: "Between 90° and 180°" };
    if (deg === 180) return { type: "Straight Angle", color: "text-amber-600", desc: "Exactly 180° (Contains 2 Right Angles)" };
    if (deg < 360) return { type: "Reflex Angle", color: "text-rose-600", desc: "Between 180° and 360°" };
    return { type: "Full Rotation", color: "text-purple-600", desc: "Exactly 360°" };
  };

  // Derived Sequence Calculations
  const oddNumbersList = Array.from({ length: oddCount }, (_, i) => 2 * i + 1);
  const oddSum = oddNumbersList.reduce((a, b) => a + b, 0);
  const triangularVal = (triangularN * (triangularN + 1)) / 2;
  const hexagonalVal = hexagonalN * (2 * hexagonalN - 1);

  // Flower Garden Powers calculation
  const flowerSequence = Array.from({ length: flowerRows }, (_, i) => Math.pow(powerBase, i));
  const totalFlowers = flowerSequence.reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white border-2 border-indigo-200 rounded-3xl p-6 shadow-md space-y-6">
      {/* Explorer Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-800 to-purple-900 text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            🎓 Core Exam Topics Masterclass
          </h2>
          <p className="text-xs text-indigo-100/80 mt-1 max-w-xl">
            Explore deep conceptual explanations, formula cheat-sheets, and real-time visual tools for Geometry, Lines, Rays, Angles, Number Sequences, Triangular Numbers, & Exponential Patterns!
          </p>
        </div>

        {/* Tab Switchers (shown only if not hidden) */}
        {!hideTabSwitcher && (
          <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-indigo-500/30">
            <button
              onClick={() => setActiveTab("geometry")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                activeTab === "geometry"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Compass size={14} /> Geometry & Angles
            </button>
            <button
              onClick={() => setActiveTab("patterns")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                activeTab === "patterns"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Layers size={14} /> Sequences & Patterns
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: GEOMETRY & ANGLES */}
      {activeTab === "geometry" && (
        <div className="space-y-6 animate-fade-in">
          {/* Concept Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-black text-sky-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                1. Points, Lines & Rays
              </div>
              <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed font-medium">
                <li>• <b>Point:</b> A location with no size (e.g. Point A, Point B).</li>
                <li>• <b>Line Segment:</b> Straight path with two fixed endpoints.</li>
                <li>• <b>Ray:</b> Path starting at an initial point extending infinitely in 1 direction (e.g. Ray PR →).</li>
                <li>• <b>Line:</b> Extends infinitely in <b>both</b> directions.</li>
              </ul>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                2. Angle Classification & Bisector
              </div>
              <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed font-medium">
                <li>• <b>Right Angle & Perpendicular:</b> Exactly 90°. Perpendicular lines intersect at 90° (written AB ⊥ CD).</li>
                <li>• <b>Perpendicular Bisector:</b> A line perpendicular to a segment that cuts it into 2 equal parts.</li>
                <li>• <b>Straight Angle:</b> Exactly 180° = 2 Right Angles.</li>
                <li>• <b>Reflex Angle:</b> Between 180° and 360° (e.g. 250°).</li>
                <li>• <b>Angle Bisector:</b> A ray dividing an angle into 2 equal halves.</li>
              </ul>
            </div>

            <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-black text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                3. Polygons & Intersecting Lines
              </div>
              <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed font-medium">
                <li>• <b>Polygon Sides:</b> A polygon with n sides has n boundary line segments (Heptagon = 7).</li>
                <li>• <b>Two Points Rule:</b> Exactly 1 unique line passes through 2 distinct points.</li>
                <li>• <b>Collinear Line Segments:</b> n collinear points form [n(n-1)]/2 line segments.</li>
              </ul>
            </div>
          </div>

          {/* Interactive Tool 1: Collinear Line Segment Calculator */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Calculator size={16} className="text-indigo-600" />
                  Tool 1: Collinear Points & Line Segments Visualizer
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Calculate total line segments formed by n collinear points using formula [n(n-1)]/2
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Points (n = {numCollinearPoints}):</label>
                  <button
                    type="button"
                    onClick={() => setNumCollinearPoints((prev) => Math.max(2, prev - 1))}
                    className="w-7 h-7 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-bold text-xs flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={2}
                    max={20}
                    value={numCollinearPoints}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) setNumCollinearPoints(Math.max(2, Math.min(20, val)));
                    }}
                    className="w-14 px-2 py-1 bg-white border border-indigo-300 rounded-lg text-xs font-bold text-center text-indigo-950"
                  />
                  <button
                    type="button"
                    onClick={() => setNumCollinearPoints((prev) => Math.min(20, prev + 1))}
                    className="w-7 h-7 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-bold text-xs flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <input
                  type="range"
                  min={2}
                  max={20}
                  value={numCollinearPoints}
                  onChange={(e) => setNumCollinearPoints(parseInt(e.target.value, 10))}
                  className="w-28 accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Select Preset Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-bold">
              <span className="text-slate-500">Quick Select:</span>
              {[2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setNumCollinearPoints(preset)}
                  className={`px-2.5 py-1 rounded-md cursor-pointer transition ${
                    numCollinearPoints === preset
                      ? "bg-indigo-600 text-white shadow-2xs font-black"
                      : "bg-slate-200/80 text-slate-700 hover:bg-indigo-100 hover:text-indigo-900"
                  }`}
                >
                  n = {preset}
                </button>
              ))}
            </div>

            {/* Visual Canvas */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center space-y-4">
              <div className="w-full overflow-x-auto py-2">
                <div className="relative w-full max-w-2xl mx-auto h-16 flex items-center justify-between px-4 sm:px-6 min-w-0">
                  <div className="absolute top-1/2 left-6 right-6 h-1 bg-slate-800 -translate-y-1/2" />
                  {Array.from({ length: numCollinearPoints }).map((_, idx) => {
                    const label = idx < 26 ? String.fromCharCode(65 + idx) : `P${idx + 1}`;
                    return (
                      <div key={idx} className="relative z-10 flex flex-col items-center shrink-0">
                        <div className="w-4 h-4 bg-indigo-600 border-2 border-white rounded-full shadow-xs" />
                        <span className="text-[11px] font-black text-slate-900 mt-1">{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl w-full max-w-md text-center">
                <div className="text-xs font-bold text-indigo-900">
                  Total Line Segments = <span className="text-indigo-700 font-black text-sm">{lineSegmentsCount}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Formula: [n × (n - 1)] / 2 = [{numCollinearPoints} × ({numCollinearPoints - 1})] / 2 = {lineSegmentsCount}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Tool 2: Angle & Bisector Inspector */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Compass size={16} className="text-emerald-600" />
                  Tool 2: Interactive Angle & Reflex Angle Explorer
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Adjust angle degree to see classification (Acute, Right, Obtuse, Straight, Reflex) and bisector!
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={15}
                  max={330}
                  step={5}
                  value={angleDegrees}
                  onChange={(e) => setAngleDegrees(parseInt(e.target.value))}
                  className="w-36 accent-emerald-600 cursor-pointer"
                />
                <span className="text-xs font-black px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg">
                  {angleDegrees}°
                </span>
              </div>
            </div>

            {/* Visual Angle Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center space-y-3">
                <div className="text-xs font-bold text-slate-500">Angle Visualization (Arms EF and EG)</div>
                <svg width="200" height="160" viewBox="0 0 200 160" className="overflow-visible">
                  {/* Origin E at (100, 100) */}
                  <line x1="100" y1="100" x2="170" y2="100" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                  <text x="180" y="105" fontSize="11" fontWeight="bold" fill="#0f172a">F</text>
                  
                  {/* Rotated Arm EG */}
                  {(() => {
                    const rad = (angleDegrees * Math.PI) / 180;
                    const x2 = 100 + 70 * Math.cos(-rad);
                    const y2 = 100 + 70 * Math.sin(-rad);
                    return (
                      <>
                        <line x1="100" y1="100" x2={x2} y2={y2} stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                        <text x={x2 + 8} y={y2 + 4} fontSize="11" fontWeight="bold" fill="#047857">G</text>
                      </>
                    );
                  })()}

                  {/* Bisector Line */}
                  {(() => {
                    const halfRad = ((angleDegrees / 2) * Math.PI) / 180;
                    const bx = 100 + 60 * Math.cos(-halfRad);
                    const by = 100 + 60 * Math.sin(-halfRad);
                    return (
                      <line x1="100" y1="100" x2={bx} y2={by} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" />
                    );
                  })()}

                  {/* Vertex E */}
                  <circle cx="100" cy="100" r="5" fill="#1e293b" />
                  <text x="90" y="118" fontSize="12" fontWeight="black" fill="#0f172a">Vertex E</text>
                </svg>
                <div className="text-[11px] text-amber-700 font-medium">
                  Dashed line = Angle Bisector ({angleDegrees / 2}°)
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-3 flex flex-col justify-center">
                <div className="text-xs font-bold text-slate-500 uppercase">Classification Analysis</div>
                <div>
                  <div className={`text-lg font-black ${getAngleType(angleDegrees).color}`}>
                    {getAngleType(angleDegrees).type}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{getAngleType(angleDegrees).desc}</p>
                </div>

                <div className="pt-2 border-t border-emerald-200/60 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Measure:</span>
                    <span className="font-bold text-slate-900">{angleDegrees}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Bisector Cuts Into:</span>
                    <span className="font-bold text-emerald-800">Two angles of {angleDegrees / 2}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Right Angles Contained:</span>
                    <span className="font-bold text-slate-900">{(angleDegrees / 90).toFixed(2)} right angles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SEQUENCES & NUMBER PATTERNS */}
      {activeTab === "patterns" && (
        <div className="space-y-6 animate-fade-in">
          {/* Concept Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-black text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                1. Consecutive Odd & Square Numbers
              </div>
              <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed font-medium">
                <li>• <b>Odd Sequence:</b> 1, 3, 5, 7, 9... (n-th term = 2n - 1).</li>
                <li>• <b>Square Identity:</b> Sum of first n odd numbers = n².</li>
                <li>• <i>Example:</i> 1 + 3 + 5 + 7 = 16 = 4².</li>
              </ul>
            </div>

            <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-black text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                2. Triangular & Hexagonal Sequences
              </div>
              <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed font-medium">
                <li>• <b>Triangular Numbers:</b> T<sub>n</sub> = [n(n+1)]/2 → 1, 3, 6, 10, 15, 21...</li>
                <li>• <b>Hexagonal Numbers:</b> H<sub>n</sub> = n(2n-1) → 1, 6, 15, 28...</li>
                <li>• <i>Alphabet Code:</i> Positions A(1), C(3), F(6), J(10), O(15), U(21).</li>
              </ul>
            </div>

            <div className="bg-teal-50/80 border border-teal-200 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-black text-teal-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                3. Powers & Geometric Sequences
              </div>
              <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed font-medium">
                <li>• <b>Powers of 3:</b> 3⁰=1, 3¹=3, 3²=9, 3³=27, 3⁴=81, 3⁵=243, 3⁶=729...</li>
                <li>• <b>Gardener Flower Pattern:</b> Total planted in 6 rows = 1+3+9+27+81+243 = 364.</li>
                <li>• <b>Fibonacci:</b> 1, 2, 3, 5, 8, 13, 21...</li>
              </ul>
            </div>
          </div>

          {/* Interactive Pattern Explorer 1: Odd Numbers -> Square Array */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Hash size={16} className="text-amber-600" />
                  Pattern Tool 1: Consecutive Odd Numbers Sum = n²
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  See how adding consecutive odd numbers creates a perfect square grid!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Count (n = {oddCount}):</label>
                  <button
                    type="button"
                    onClick={() => setOddCount((prev) => Math.max(1, prev - 1))}
                    className="w-7 h-7 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={oddCount}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) setOddCount(Math.max(1, Math.min(20, val)));
                    }}
                    className="w-14 px-2 py-1 bg-white border border-amber-300 rounded-lg text-xs font-bold text-center text-amber-950"
                  />
                  <button
                    type="button"
                    onClick={() => setOddCount((prev) => Math.min(20, prev + 1))}
                    className="w-7 h-7 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={oddCount}
                  onChange={(e) => setOddCount(parseInt(e.target.value, 10))}
                  className="w-28 accent-amber-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Select Preset Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-bold">
              <span className="text-slate-500">Quick Select:</span>
              {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setOddCount(preset)}
                  className={`px-2.5 py-1 rounded-md cursor-pointer transition ${
                    oddCount === preset
                      ? "bg-amber-600 text-white shadow-2xs font-black"
                      : "bg-slate-200/80 text-slate-700 hover:bg-amber-100 hover:text-amber-900"
                  }`}
                >
                  n = {preset}
                </button>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col items-center justify-center space-y-4">
              <div
                className="grid gap-1 bg-amber-50 p-4 rounded-xl border border-amber-200 max-w-full overflow-x-auto"
                style={{ gridTemplateColumns: `repeat(${oddCount}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: oddSum }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-md bg-amber-500 border border-amber-600 flex items-center justify-center font-black text-white shadow-xs ${
                      oddCount > 10 ? "w-3.5 h-3.5 text-[6px]" : "w-6 h-6 text-[10px]"
                    }`}
                  >
                    •
                  </div>
                ))}
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl w-full max-w-lg text-center space-y-1">
                <div className="text-xs font-bold text-amber-950">
                  {oddNumbersList.join(" + ")} = <span className="text-amber-700 font-black text-base">{oddSum}</span>
                </div>
                <div className="text-[11px] text-slate-600">
                  This equals the {oddCount}-th Square Number: <span className="font-bold text-slate-900">{oddCount}² = {oddSum}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Pattern Explorer 2: Triangular & Hexagonal Sequences */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Sparkles size={16} className="text-purple-600" />
                  Pattern Tool 2: Triangular & Hexagonal Sequence Deep-Dive
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Understand how dots arrange into triangles and hexagons with step-by-step calculations and visual dot grids!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-bold text-purple-900">Triangular (n = {triangularN}):</label>
                  <button
                    type="button"
                    onClick={() => setTriangularN((prev) => Math.max(1, prev - 1))}
                    className="w-6 h-6 rounded-md bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={triangularN}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) setTriangularN(Math.max(1, Math.min(20, val)));
                    }}
                    className="w-12 px-1.5 py-0.5 bg-white border border-purple-300 rounded-md text-xs font-bold text-center text-purple-900"
                  />
                  <button
                    type="button"
                    onClick={() => setTriangularN((prev) => Math.min(20, prev + 1))}
                    className="w-6 h-6 rounded-md bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-bold text-teal-900">Hexagonal (n = {hexagonalN}):</label>
                  <button
                    type="button"
                    onClick={() => setHexagonalN((prev) => Math.max(1, prev - 1))}
                    className="w-6 h-6 rounded-md bg-teal-100 hover:bg-teal-200 text-teal-900 font-bold text-xs flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={15}
                    value={hexagonalN}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) setHexagonalN(Math.max(1, Math.min(15, val)));
                    }}
                    className="w-12 px-1.5 py-0.5 bg-white border border-teal-300 rounded-md text-xs font-bold text-center text-teal-900"
                  />
                  <button
                    type="button"
                    onClick={() => setHexagonalN((prev) => Math.min(15, prev + 1))}
                    className="w-6 h-6 rounded-md bg-teal-100 hover:bg-teal-200 text-teal-900 font-bold text-xs flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Select Presets for Triangular and Hexagonal */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold bg-white/60 p-2.5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-purple-900 font-extrabold">Triangular Presets:</span>
                {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setTriangularN(p)}
                    className={`px-2 py-0.5 rounded cursor-pointer transition ${
                      triangularN === p
                        ? "bg-purple-600 text-white font-black"
                        : "bg-purple-50 text-purple-800 hover:bg-purple-200"
                    }`}
                  >
                    T<sub>{p}</sub>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-teal-900 font-extrabold">Hexagonal Presets:</span>
                {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setHexagonalN(p)}
                    className={`px-2 py-0.5 rounded cursor-pointer transition ${
                      hexagonalN === p
                        ? "bg-teal-600 text-white font-black"
                        : "bg-teal-50 text-teal-800 hover:bg-teal-200"
                    }`}
                  >
                    H<sub>{p}</sub>
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Grid for Triangular & Hexagonal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* TRIANGULAR NUMBER EXPLORER CARD */}
              <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-600" />
                    <h4 className="text-xs font-black text-purple-950 uppercase tracking-wider">
                      Triangular Number T<sub>{triangularN}</sub>
                    </h4>
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 bg-purple-100 text-purple-900 rounded-full">
                    Value = {triangularVal}
                  </span>
                </div>

                {/* Dot Triangle Visualizer */}
                <div className="bg-purple-50/60 border border-purple-100 rounded-xl p-4 flex flex-col items-center justify-center min-h-[160px] space-y-1">
                  <div className="text-[10px] font-bold text-purple-700 uppercase mb-2">Dot Triangle Layout</div>
                  {Array.from({ length: triangularN }).map((_, rIdx) => (
                    <div key={rIdx} className="flex items-center justify-center gap-1.5">
                      {Array.from({ length: rIdx + 1 }).map((_, cIdx) => (
                        <div
                          key={cIdx}
                          className="w-4 h-4 rounded-full bg-purple-600 border border-purple-800 flex items-center justify-center text-[8px] text-white font-bold shadow-2xs"
                        >
                          •
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Explanation Step-by-Step */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-100 space-y-1">
                    <div className="font-bold text-purple-900">How to calculate T<sub>{triangularN}</sub>:</div>
                    <div className="text-slate-700 font-medium">
                      • Row-by-Row Sum: {Array.from({ length: triangularN }, (_, i) => i + 1).join(" + ")} = <b className="text-purple-800">{triangularVal}</b>
                    </div>
                    <div className="text-slate-700 font-medium">
                      • Formula: [n × (n + 1)] / 2 = [{triangularN} × ({triangularN} + 1)] / 2 = <b className="text-purple-800">{triangularVal}</b>
                    </div>
                  </div>

                  {/* Alphabet Position Connection */}
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-slate-800 space-y-1">
                    <div className="font-bold text-amber-900 text-[11px] uppercase tracking-wide">
                      🔤 NCERT Alphabet Code Connection:
                    </div>
                    <div className="text-[11px] text-slate-700">
                      Position {triangularVal} in alphabet = <b className="text-amber-800 text-sm">{triangularVal <= 26 ? String.fromCharCode(64 + triangularVal) : "Beyond Z"}</b>
                    </div>
                    <div className="text-[10px] text-slate-500 italic">
                      Sequence letters: A(1), C(3), F(6), J(10), O(15), U(21)...
                    </div>
                  </div>
                </div>
              </div>

              {/* HEXAGONAL NUMBER EXPLORER CARD */}
              <div className="bg-white border-2 border-teal-200 rounded-2xl p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-teal-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-teal-600" />
                    <h4 className="text-xs font-black text-teal-950 uppercase tracking-wider">
                      Hexagonal Number H<sub>{hexagonalN}</sub>
                    </h4>
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 bg-teal-100 text-teal-900 rounded-full">
                    Value = {hexagonalVal}
                  </span>
                </div>

                {/* Hexagonal Multiplier visual */}
                <div className="bg-teal-50/60 border border-teal-100 rounded-xl p-4 flex flex-col items-center justify-center min-h-[160px] space-y-3">
                  <div className="text-[10px] font-bold text-teal-700 uppercase">Hexagonal Multiplier Visual</div>
                  <div className="flex items-center gap-2 text-sm font-black text-teal-950">
                    <div className="px-3 py-2 bg-teal-100 rounded-lg border border-teal-300">n = {hexagonalN}</div>
                    <span>×</span>
                    <div className="px-3 py-2 bg-teal-200 rounded-lg border border-teal-400">(2n - 1) = {2 * hexagonalN - 1}</div>
                    <span>=</span>
                    <div className="px-3.5 py-2 bg-teal-600 text-white rounded-lg shadow-xs">{hexagonalVal}</div>
                  </div>
                  <p className="text-[11px] text-slate-600 text-center font-medium">
                    Multiply term index n by consecutive odd number (2n - 1)
                  </p>
                </div>

                {/* Explanation Step-by-Step */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-teal-50 rounded-xl border border-teal-100 space-y-1">
                    <div className="font-bold text-teal-900">How to calculate H<sub>{hexagonalN}</sub>:</div>
                    <div className="text-slate-700 font-medium">
                      • Formula: H<sub>n</sub> = n × (2n - 1) = {hexagonalN} × ({2 * hexagonalN - 1}) = <b className="text-teal-800">{hexagonalVal}</b>
                    </div>
                    <div className="text-slate-700 font-medium">
                      • Sequence terms: H₁ = 1, H₂ = 6, H₃ = 15, H₄ = 28, H₅ = 45, H₆ = 66
                    </div>
                  </div>

                  {/* Magic Connection to Triangular Numbers */}
                  <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-200 text-slate-800 space-y-1">
                    <div className="font-bold text-sky-900 text-[11px] uppercase tracking-wide">
                      💡 Magic Connection to Triangular Numbers:
                    </div>
                    <div className="text-[11px] text-slate-700">
                      Every Hexagonal number is an <b>odd Triangular number</b>!
                    </div>
                    <div className="text-[10px] text-slate-600">
                      H<sub>{hexagonalN}</sub> = T<sub>{2 * hexagonalN - 1}</sub> = {hexagonalVal}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Reference Sequence Table */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 overflow-x-auto">
              <div className="text-xs font-black text-slate-900 mb-2 uppercase tracking-wider">
                📊 Quick Reference: First 6 Terms Comparison Table
              </div>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="p-2 font-bold">Term (n)</th>
                    <th className="p-2 font-bold">Triangular (T<sub>n</sub>)</th>
                    <th className="p-2 font-bold">Alphabet Code</th>
                    <th className="p-2 font-bold">Hexagonal (H<sub>n</sub>)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {[1, 2, 3, 4, 5, 6].map((term) => {
                    const tVal = (term * (term + 1)) / 2;
                    const hVal = term * (2 * term - 1);
                    const letter = tVal <= 26 ? String.fromCharCode(64 + tVal) : "-";
                    return (
                      <tr key={term} className={term % 2 === 0 ? "bg-slate-50/50" : ""}>
                        <td className="p-2 font-black text-slate-900">n = {term}</td>
                        <td className="p-2 font-bold text-purple-700">{tVal}</td>
                        <td className="p-2 font-black text-amber-700">{letter} ({tVal})</td>
                        <td className="p-2 font-bold text-teal-700">{hVal}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Pattern Explorer 3: Gardener Flower Rows (Powers of 3) */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Layers size={16} className="text-purple-600" />
                  Pattern Tool 3: Exponential Flower Rows (Powers of 3)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Explore exponential growth (3⁰, 3¹, 3², 3³...) from Section E Case Study!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Rows (r = {flowerRows}):</label>
                  <button
                    type="button"
                    onClick={() => setFlowerRows((prev) => Math.max(1, prev - 1))}
                    className="w-7 h-7 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={flowerRows}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) setFlowerRows(Math.max(1, Math.min(10, val)));
                    }}
                    className="w-14 px-2 py-1 bg-white border border-purple-300 rounded-lg text-xs font-bold text-center text-purple-950"
                  />
                  <button
                    type="button"
                    onClick={() => setFlowerRows((prev) => Math.min(10, prev + 1))}
                    className="w-7 h-7 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={flowerRows}
                  onChange={(e) => setFlowerRows(parseInt(e.target.value, 10))}
                  className="w-28 accent-purple-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Select Presets */}
            <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-bold">
              <span className="text-slate-500">Quick Select Rows:</span>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setFlowerRows(preset)}
                  className={`px-2.5 py-1 rounded-md cursor-pointer transition ${
                    flowerRows === preset
                      ? "bg-purple-600 text-white shadow-2xs font-black"
                      : "bg-slate-200/80 text-slate-700 hover:bg-purple-100 hover:text-purple-900"
                  }`}
                >
                  {preset} {preset === 1 ? "Row" : "Rows"}
                </button>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {flowerSequence.map((num, idx) => (
                  <div key={idx} className="p-3 bg-purple-50/80 border border-purple-200 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-purple-700 font-bold">Row {idx + 1} (3<sup>{idx}</sup>)</div>
                      <div className="text-base font-black text-purple-950">{num.toLocaleString()} flowers</div>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 bg-purple-200 text-purple-900 rounded-md">
                      3<sup>{idx}</sup>
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-purple-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 mt-2">
                <div>
                  <div className="text-xs font-bold text-purple-200">Total Flowers Planted across {flowerRows} rows:</div>
                  <div className="text-xl font-black text-amber-300">{totalFlowers.toLocaleString()} Flowers</div>
                </div>
                <div className="text-xs text-purple-200 text-right font-medium">
                  Sum formula: {flowerSequence.slice(0, 5).join(" + ")}{flowerSequence.length > 5 ? " + ..." : ""} = {totalFlowers.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
