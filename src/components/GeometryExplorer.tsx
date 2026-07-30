import React, { useState } from "react";
import { Sparkles, HelpCircle, Compass, Circle, Check, RotateCcw, Volume2 } from "lucide-react";
import { playSpeechWithLang } from "../utils/teluguAudio";

export default function GeometryExplorer() {
  const [activeTab, setActiveTab] = useState<"lines" | "intersections" | "curves" | "polygons" | "circle">("lines");
  const [angleValue, setAngleValue] = useState<number>(60);
  const [selectedCirclePart, setSelectedCirclePart] = useState<"center" | "radius" | "diameter" | "chord" | "arc" | "sector" | "segment">("radius");
  const [selectedPolygonType, setSelectedPolygonType] = useState<"triangle" | "quadrilateral" | "pentagon">("quadrilateral");
  const [isParallelMode, setIsParallelMode] = useState<boolean>(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const speak = (text: string) => {
    playSpeechWithLang(text, "en-US");
  };

  return (
    <div className="space-y-6 animate-fade-in p-2 sm:p-4">
      {/* Top Interactive Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 rounded-2xl p-4 sm:p-5 text-white shadow-md">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full border border-white/20">
              Grade 6 Maths • Chapter 4
            </span>
            <h3 className="text-lg sm:text-xl font-black flex items-center gap-2">
              <Compass size={22} className="animate-spin-slow text-amber-200" />
              Basic Geometrical Ideas Studio
            </h3>
            <p className="text-xs text-rose-100 font-medium">
              Explore points, line segments, rays, intersecting & parallel lines, polygons, angles, and circle parts interactively!
            </p>
          </div>
          <button
            onClick={() => speak("Welcome to Basic Geometrical Ideas Studio! Click tabs to explore shapes, lines, angles, and circles.")}
            className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white cursor-pointer transition shrink-0 border border-white/20"
            title="Listen to introduction"
          >
            <Volume2 size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 mt-4 pt-3 border-t border-white/20">
          <button
            onClick={() => { setActiveTab("lines"); speak("Points, Line Segments, Lines and Rays"); }}
            className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === "lines"
                ? "bg-white text-rose-800 shadow-sm font-extrabold"
                : "bg-black/15 text-white hover:bg-black/25"
            }`}
          >
            <span>📏 Lines & Rays</span>
          </button>

          <button
            onClick={() => { setActiveTab("intersections"); speak("Intersecting and Parallel Lines"); }}
            className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === "intersections"
                ? "bg-white text-rose-800 shadow-sm font-extrabold"
                : "bg-black/15 text-white hover:bg-black/25"
            }`}
          >
            <span>🔀 Intersections</span>
          </button>

          <button
            onClick={() => { setActiveTab("curves"); speak("Curves, Open and Closed Shapes"); }}
            className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === "curves"
                ? "bg-white text-rose-800 shadow-sm font-extrabold"
                : "bg-black/15 text-white hover:bg-black/25"
            }`}
          >
            <span>🌀 Curves & Regions</span>
          </button>

          <button
            onClick={() => { setActiveTab("polygons"); speak("Polygons and Angles"); }}
            className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === "polygons"
                ? "bg-white text-rose-800 shadow-sm font-extrabold"
                : "bg-black/15 text-white hover:bg-black/25"
            }`}
          >
            <span>📐 Polygons & Angles</span>
          </button>

          <button
            onClick={() => { setActiveTab("circle"); speak("Circle Parts: Radius, Diameter, Chord, Arc, Sector"); }}
            className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1 col-span-2 sm:col-span-1 ${
              activeTab === "circle"
                ? "bg-white text-rose-800 shadow-sm font-extrabold"
                : "bg-black/15 text-white hover:bg-black/25"
            }`}
          >
            <span>⭕ Circle Anatomy</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LINES, SEGMENTS & RAYS */}
      {activeTab === "lines" && (
        <div className="bg-white border border-rose-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-rose-100 pb-3">
            <div>
              <h4 className="font-black text-rose-950 text-base">Point, Line Segment, Line & Ray</h4>
              <p className="text-xs text-slate-600">Visual comparison of geometric linear concepts.</p>
            </div>
            <span className="text-[10px] font-bold bg-rose-50 text-rose-800 px-2.5 py-1 rounded-md border border-rose-200">
              NCERT Section 4.2 - 4.5
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SVG Visualizer */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center min-h-[220px]">
              <svg className="w-full max-w-xs h-48" viewBox="0 0 300 200">
                {/* 1. Point */}
                <g>
                  <circle cx="50" cy="30" r="4" className="fill-rose-600" />
                  <text x="50" y="18" className="text-xs font-bold fill-rose-950" textAnchor="middle">Point P</text>
                  <text x="50" y="48" className="text-[10px] fill-slate-500 font-sans" textAnchor="middle">Tiny location dot</text>
                </g>

                {/* 2. Line Segment AB */}
                <g transform="translate(0, 30)">
                  <line x1="40" y1="50" x2="160" y2="50" className="stroke-rose-600 stroke-[3]" />
                  <circle cx="40" cy="50" r="4.5" className="fill-rose-700" />
                  <circle cx="160" cy="50" r="4.5" className="fill-rose-700" />
                  <text x="40" y="38" className="text-xs font-black fill-rose-900" textAnchor="middle">A</text>
                  <text x="160" y="38" className="text-xs font-black fill-rose-900" textAnchor="middle">B</text>
                  <text x="100" y="65" className="text-[10px] font-extrabold fill-slate-700" textAnchor="middle">Segment AB (Fixed Length)</text>
                </g>

                {/* 3. Line CD (Endless both ways) */}
                <g transform="translate(0, 85)">
                  <line x1="30" y1="50" x2="270" y2="50" className="stroke-indigo-600 stroke-[2.5]" strokeDasharray="none" />
                  {/* Left Arrow */}
                  <polygon points="20,50 32,45 32,55" className="fill-indigo-600" />
                  {/* Right Arrow */}
                  <polygon points="280,50 268,45 268,55" className="fill-indigo-600" />
                  <circle cx="80" cy="50" r="3.5" className="fill-indigo-800" />
                  <circle cx="220" cy="50" r="3.5" className="fill-indigo-800" />
                  <text x="80" y="38" className="text-xs font-bold fill-indigo-900" textAnchor="middle">C</text>
                  <text x="220" y="38" className="text-xs font-bold fill-indigo-900" textAnchor="middle">D</text>
                  <text x="150" y="65" className="text-[10px] font-extrabold fill-indigo-900" textAnchor="middle">Line CD (Extends ↔ Infinitely)</text>
                </g>

                {/* 4. Ray OX */}
                <g transform="translate(0, 140)">
                  <line x1="40" y1="30" x2="260" y2="30" className="stroke-amber-600 stroke-[2.5]" />
                  {/* Origin Point */}
                  <circle cx="40" cy="30" r="4.5" className="fill-amber-700" />
                  {/* Right Arrow */}
                  <polygon points="270,30 258,25 258,35" className="fill-amber-600" />
                  <text x="40" y="18" className="text-xs font-black fill-amber-900" textAnchor="middle">O (Origin)</text>
                  <text x="180" y="18" className="text-xs font-bold fill-amber-900" textAnchor="middle">X</text>
                  <circle cx="180" cy="30" r="3.5" className="fill-amber-700" />
                  <text x="150" y="45" className="text-[10px] font-extrabold fill-amber-900" textAnchor="middle">Ray OX (Starts at O → goes forever)</text>
                </g>
              </svg>
            </div>

            {/* Explanatory Cards */}
            <div className="space-y-2 text-xs">
              <div
                onClick={() => speak("Point: A dot marked by a sharp pencil. It has position but zero length or width.")}
                className="bg-rose-50/80 border border-rose-200 rounded-xl p-3 cursor-pointer hover:bg-rose-100/80 transition"
              >
                <div className="flex items-center justify-between font-extrabold text-rose-900">
                  <span>📍 1. Point</span>
                  <span className="text-[10px] bg-rose-200 px-1.5 py-0.5 rounded text-rose-950">Zero Dimensions</span>
                </div>
                <p className="text-slate-700 mt-1">A dot made by a sharp pencil tip. Denoted by a capital letter like A, B, or P.</p>
              </div>

              <div
                onClick={() => speak("Line Segment: Shortest route connecting two points A and B. It has a fixed, measurable length.")}
                className="bg-sky-50/80 border border-sky-200 rounded-xl p-3 cursor-pointer hover:bg-sky-100/80 transition"
              >
                <div className="flex items-center justify-between font-extrabold text-sky-900">
                  <span>📏 2. Line Segment (AB)</span>
                  <span className="text-[10px] bg-sky-200 px-1.5 py-0.5 rounded text-sky-950">Fixed Endpoints</span>
                </div>
                <p className="text-slate-700 mt-1">The shortest path between point A and point B. Has 2 fixed endpoints and can be measured with a ruler.</p>
              </div>

              <div
                onClick={() => speak("Line: Extends endlessly in both directions without endpoints. Denoted with arrows on both ends.")}
                className="bg-indigo-50/80 border border-indigo-200 rounded-xl p-3 cursor-pointer hover:bg-indigo-100/80 transition"
              >
                <div className="flex items-center justify-between font-extrabold text-indigo-900">
                  <span>↔️ 3. Line (Line AB or line l)</span>
                  <span className="text-[10px] bg-indigo-200 px-1.5 py-0.5 rounded text-indigo-950">No Endpoints</span>
                </div>
                <p className="text-slate-700 mt-1">Extends endlessly in both directions without stopping. Cannot be measured on paper!</p>
              </div>

              <div
                onClick={() => speak("Ray: A line that starts at a fixed initial point and extends endlessly in one direction.")}
                className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 cursor-pointer hover:bg-amber-100/80 transition"
              >
                <div className="flex items-center justify-between font-extrabold text-amber-900">
                  <span>🔦 4. Ray (Ray OA)</span>
                  <span className="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded text-amber-950">1 Initial Point</span>
                </div>
                <p className="text-slate-700 mt-1">Starts at origin O and extends endlessly in one direction (e.g. sun ray, torch beam).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERSECTING & PARALLEL LINES */}
      {activeTab === "intersections" && (
        <div className="bg-white border border-rose-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-rose-100 pb-3">
            <div>
              <h4 className="font-black text-rose-950 text-base">Intersecting Lines vs Parallel Lines</h4>
              <p className="text-xs text-slate-600">See how lines cross at a point or stay equidistant forever.</p>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => { setIsParallelMode(false); speak("Intersecting lines cross at a single point of intersection."); }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  !isParallelMode ? "bg-rose-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Crossing (Intersecting)
              </button>
              <button
                onClick={() => { setIsParallelMode(true); speak("Parallel lines never meet and stay equidistant forever."); }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  isParallelMode ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Parallel (Railway Tracks)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* SVG Visualizer */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center min-h-[220px]">
              <svg className="w-full max-w-xs h-52" viewBox="0 0 300 200">
                {!isParallelMode ? (
                  /* Intersecting lines */
                  <g>
                    {/* Line L1 */}
                    <line x1="30" y1="40" x2="270" y2="160" className="stroke-rose-600 stroke-[3]" />
                    <text x="35" y="30" className="text-xs font-black fill-rose-900">Line l₁</text>

                    {/* Line L2 */}
                    <line x1="30" y1="160" x2="270" y2="40" className="stroke-indigo-600 stroke-[3]" />
                    <text x="35" y="175" className="text-xs font-black fill-indigo-900">Line l₂</text>

                    {/* Intersection Point P */}
                    <circle cx="150" cy="100" r="6" className="fill-amber-500 stroke-amber-900 stroke-2 animate-ping" />
                    <circle cx="150" cy="100" r="5" className="fill-amber-500 stroke-amber-900 stroke-2" />
                    <text x="150" y="80" className="text-xs font-black fill-amber-950 font-mono" textAnchor="middle">
                      Point P (Intersection)
                    </text>
                  </g>
                ) : (
                  /* Parallel lines */
                  <g>
                    {/* Railway Track ties */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <line
                        key={i}
                        x1={40 + i * 30}
                        y1="60"
                        x2={40 + i * 30}
                        y2="140"
                        className="stroke-amber-300 stroke-[2] stroke-dasharray-[3,3]"
                      />
                    ))}

                    {/* Line L1 */}
                    <line x1="20" y1="60" x2="280" y2="60" className="stroke-indigo-600 stroke-[3.5]" />
                    <text x="30" y="48" className="text-xs font-black fill-indigo-900">Line l₁</text>

                    {/* Line L2 */}
                    <line x1="20" y1="140" x2="280" y2="140" className="stroke-indigo-600 stroke-[3.5]" />
                    <text x="30" y="160" className="text-xs font-black fill-indigo-900">Line l₂</text>

                    {/* Constant Distance indicator */}
                    <line x1="150" y1="60" x2="150" y2="140" className="stroke-rose-500 stroke-2" />
                    <text x="155" y="105" className="text-[10px] font-black fill-rose-800">
                      Distance (d) is Constant
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Detailed Description */}
            <div className="space-y-3">
              {!isParallelMode ? (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs space-y-2">
                  <h5 className="font-extrabold text-rose-950 text-sm flex items-center gap-1.5">
                    <span>🔀 Intersecting Lines</span>
                  </h5>
                  <p className="text-slate-700 leading-relaxed">
                    If two lines have <strong>one common point</strong>, they are called <strong>intersecting lines</strong>. The shared point P is called the <strong>Point of Intersection</strong>.
                  </p>
                  <div className="bg-white p-2.5 rounded-lg border border-rose-200 text-rose-900 font-medium">
                    <strong>Real life examples:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px]">
                      <li>Two crossing roads or cross-hairs</li>
                      <li>Adjacent edges of a notebook or chalkboard</li>
                      <li>The letter 'X' or pair of scissors</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-xs space-y-2">
                  <h5 className="font-extrabold text-indigo-950 text-sm flex items-center gap-1.5">
                    <span>⏸️ Parallel Lines (l₁ ∥ l₂)</span>
                  </h5>
                  <p className="text-slate-700 leading-relaxed">
                    Lines in the same flat plane that <strong>do not intersect anywhere</strong>, no matter how far they are extended, are called <strong>parallel lines</strong>.
                  </p>
                  <div className="bg-white p-2.5 rounded-lg border border-indigo-200 text-indigo-900 font-medium">
                    <strong>Real life examples:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px]">
                      <li>Railway tracks</li>
                      <li>Opposite edges of a ruler or smartphone screen</li>
                      <li>Horizontal rungs of a ladder</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CURVES, SHAPES & REGIONS */}
      {activeTab === "curves" && (
        <div className="bg-white border border-rose-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="border-b border-rose-100 pb-3">
            <h4 className="font-black text-rose-950 text-base">Curves, Open/Closed Shapes & Regions</h4>
            <p className="text-xs text-slate-600">Understand simple curves, interior, boundary, and exterior regions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SVG Visualizer */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center min-h-[220px]">
              <svg className="w-full max-w-xs h-52" viewBox="0 0 300 200">
                {/* Closed Curve with Regions */}
                <path
                  d="M 60 100 C 60 40, 160 30, 240 70 C 260 120, 200 170, 120 160 C 60 150, 60 120, 60 100 Z"
                  className="fill-rose-100 stroke-rose-600 stroke-[3]"
                />

                {/* Interior Point */}
                <circle cx="140" cy="100" r="4.5" className="fill-emerald-600" />
                <text x="140" y="88" className="text-[10px] font-black fill-emerald-900" textAnchor="middle">Point A (Interior)</text>

                {/* Boundary Point */}
                <circle cx="240" cy="70" r="4.5" className="fill-amber-600" />
                <text x="250" y="55" className="text-[10px] font-black fill-amber-900" textAnchor="middle">Point B (Boundary)</text>

                {/* Exterior Point */}
                <circle cx="40" cy="40" r="4.5" className="fill-rose-600" />
                <text x="40" y="28" className="text-[10px] font-black fill-rose-900" textAnchor="middle">Point C (Exterior)</text>
              </svg>
            </div>

            {/* Explanation */}
            <div className="space-y-2.5 text-xs">
              <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl space-y-1">
                <span className="font-extrabold text-rose-950 block">1. What is a Curve?</span>
                <p className="text-slate-700">Any drawing made without lifting the pencil from paper is a curve. Lines are special straight curves!</p>
              </div>

              <div className="bg-sky-50 border border-sky-200 p-3 rounded-xl space-y-1">
                <span className="font-extrabold text-sky-950 block">2. Simple vs Non-Simple Curve</span>
                <p className="text-slate-700">A <strong>Simple Curve</strong> does not cross or intersect itself. A non-simple curve loops over itself (like a figure 8).</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl space-y-1">
                <span className="font-extrabold text-emerald-950 block">3. Closed Curve Regions</span>
                <ul className="space-y-1 text-slate-700 mt-1">
                  <li>🟢 <strong>Interior:</strong> Inside area bounded by the curve.</li>
                  <li>🟡 <strong>Boundary:</strong> Directly on the curve line itself.</li>
                  <li>🔴 <strong>Exterior:</strong> Everything outside the curve boundary.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: POLYGONS & ANGLES */}
      {activeTab === "polygons" && (
        <div className="bg-white border border-rose-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-rose-100 pb-3">
            <div>
              <h4 className="font-black text-rose-950 text-base">Polygons & Interactive Angle Creator</h4>
              <p className="text-xs text-slate-600">Explore sides, vertices, diagonals, and angle rays.</p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setSelectedPolygonType("triangle")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedPolygonType === "triangle" ? "bg-rose-600 text-white" : "text-slate-600"
                }`}
              >
                Δ Triangle
              </button>
              <button
                onClick={() => setSelectedPolygonType("quadrilateral")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedPolygonType === "quadrilateral" ? "bg-rose-600 text-white" : "text-slate-600"
                }`}
              >
                ⎕ Quadrilateral
              </button>
              <button
                onClick={() => setSelectedPolygonType("pentagon")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedPolygonType === "pentagon" ? "bg-rose-600 text-white" : "text-slate-600"
                }`}
              >
                ⬠ Pentagon
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* SVG Polygon Visualizer */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center min-h-[220px]">
              <svg className="w-full max-w-xs h-52" viewBox="0 0 250 200">
                {selectedPolygonType === "triangle" && (
                  <g>
                    <polygon points="125,30 40,160 210,160" className="fill-rose-100 stroke-rose-600 stroke-[3]" />
                    <circle cx="125" cy="30" r="5" className="fill-rose-700" />
                    <circle cx="40" cy="160" r="5" className="fill-rose-700" />
                    <circle cx="210" cy="160" r="5" className="fill-rose-700" />
                    <text x="125" y="18" className="text-xs font-black fill-rose-950" textAnchor="middle">A</text>
                    <text x="25" y="170" className="text-xs font-black fill-rose-950" textAnchor="middle">B</text>
                    <text x="225" y="170" className="text-xs font-black fill-rose-950" textAnchor="middle">C</text>
                    <text x="125" y="120" className="text-xs font-extrabold fill-rose-800" textAnchor="middle">
                      3 Sides • 3 Vertices • 3 Angles
                    </text>
                  </g>
                )}

                {selectedPolygonType === "quadrilateral" && (
                  <g>
                    {/* Diagonal AC */}
                    <line x1="40" y1="40" x2="210" y2="160" className="stroke-indigo-400 stroke-2 stroke-dasharray-[4,4]" />
                    {/* Diagonal BD */}
                    <line x1="210" y1="40" x2="40" y2="160" className="stroke-indigo-400 stroke-2 stroke-dasharray-[4,4]" />

                    <polygon points="40,40 210,40 210,160 40,160" className="fill-rose-100/60 stroke-rose-600 stroke-[3]" />
                    <circle cx="40" cy="40" r="5" className="fill-rose-700" />
                    <circle cx="210" cy="40" r="5" className="fill-rose-700" />
                    <circle cx="210" cy="160" r="5" className="fill-rose-700" />
                    <circle cx="40" cy="160" r="5" className="fill-rose-700" />
                    <text x="25" y="35" className="text-xs font-black fill-rose-950">A</text>
                    <text x="220" y="35" className="text-xs font-black fill-rose-950">B</text>
                    <text x="220" y="175" className="text-xs font-black fill-rose-950">C</text>
                    <text x="25" y="175" className="text-xs font-black fill-rose-950">D</text>
                    <text x="125" y="105" className="text-[11px] font-black fill-indigo-900 bg-white/80 px-1 rounded" textAnchor="middle">
                      4 Sides • 2 Diagonals (AC & BD)
                    </text>
                  </g>
                )}

                {selectedPolygonType === "pentagon" && (
                  <g>
                    <polygon points="125,25 215,80 180,170 70,170 35,80" className="fill-rose-100 stroke-rose-600 stroke-[3]" />
                    <circle cx="125" cy="25" r="4.5" className="fill-rose-700" />
                    <circle cx="215" cy="80" r="4.5" className="fill-rose-700" />
                    <circle cx="180" cy="170" r="4.5" className="fill-rose-700" />
                    <circle cx="70" cy="170" r="4.5" className="fill-rose-700" />
                    <circle cx="35" cy="80" r="4.5" className="fill-rose-700" />
                    <text x="125" y="110" className="text-xs font-black fill-rose-900" textAnchor="middle">
                      Pentagon (5 Sides & 5 Vertices)
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Interactive Angle Creator Slider */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-amber-950 text-xs uppercase tracking-wider">
                  📐 Interactive Angle Slider
                </span>
                <span className="text-xs font-mono font-black bg-amber-200 text-amber-950 px-2 py-0.5 rounded">
                  ∠ AOB = {angleValue}° ({angleValue < 90 ? "Acute" : angleValue === 90 ? "Right Angle" : "Obtuse"})
                </span>
              </div>

              {/* Angle SVG */}
              <div className="bg-white border border-amber-200 rounded-lg p-2 flex justify-center">
                <svg className="w-48 h-32" viewBox="0 0 200 120">
                  {/* Ray 1 (Base OA) */}
                  <line x1="100" y1="100" x2="180" y2="100" className="stroke-amber-600 stroke-[3]" />
                  <polygon points="188,100 178,96 178,104" className="fill-amber-600" />
                  <text x="180" y="115" className="text-[10px] font-extrabold fill-amber-900">A</text>

                  {/* Ray 2 (Rotated OB) */}
                  {(() => {
                    const rad = (angleValue * Math.PI) / 180;
                    const bx = 100 + 80 * Math.cos(-rad);
                    const by = 100 + 80 * Math.sin(-rad);
                    return (
                      <g>
                        <line x1="100" y1="100" x2={bx} y2={by} className="stroke-rose-600 stroke-[3]" />
                        <text x={bx + 5} y={by - 5} className="text-[10px] font-extrabold fill-rose-900">B</text>
                      </g>
                    );
                  })()}

                  {/* Vertex O */}
                  <circle cx="100" cy="100" r="5" className="fill-amber-800" />
                  <text x="90" y="115" className="text-[10px] font-black fill-amber-950">O (Vertex)</text>
                </svg>
              </div>

              <input
                type="range"
                min="15"
                max="165"
                step="5"
                value={angleValue}
                onChange={(e) => setAngleValue(parseInt(e.target.value, 10))}
                className="w-full accent-amber-600 cursor-pointer h-2 bg-amber-200 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CIRCLE ANATOMY */}
      {activeTab === "circle" && (
        <div className="bg-white border border-rose-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-rose-100 pb-3">
            <div>
              <h4 className="font-black text-rose-950 text-base">Anatomy of a Circle</h4>
              <p className="text-xs text-slate-600">Click any part to highlight its geometric definition.</p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {(["center", "radius", "diameter", "chord", "arc", "sector", "segment"] as const).map((part) => (
                <button
                  key={part}
                  onClick={() => { setSelectedCirclePart(part); speak(`${part} of a circle`); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-extrabold capitalize transition cursor-pointer ${
                    selectedCirclePart === part
                      ? "bg-rose-600 text-white shadow-xs scale-105"
                      : "bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-200"
                  }`}
                >
                  {part}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* SVG Interactive Circle */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center min-h-[240px]">
              <svg className="w-full max-w-xs h-60" viewBox="0 0 240 240">
                {/* Sector Shading */}
                {selectedCirclePart === "sector" && (
                  <path d="M 120 120 L 120 40 A 80 80 0 0 1 190 80 Z" className="fill-amber-300/80 stroke-amber-600 stroke-2" />
                )}

                {/* Segment Shading */}
                {selectedCirclePart === "segment" && (
                  <path d="M 50 160 A 80 80 0 0 0 190 160 Z" className="fill-indigo-300/80 stroke-indigo-600 stroke-2" />
                )}

                {/* Main Circle Boundary */}
                <circle cx="120" cy="120" r="80" className="fill-none stroke-slate-800 stroke-[2.5]" />

                {/* Center Point */}
                <circle cx="120" cy="120" r="5" className={selectedCirclePart === "center" ? "fill-rose-600 stroke-2 stroke-rose-950 animate-ping" : "fill-slate-900"} />
                <text x="110" y="115" className="text-xs font-black fill-slate-900">O</text>

                {/* Radius Line */}
                {(selectedCirclePart === "radius" || selectedCirclePart === "diameter") && (
                  <line x1="120" y1="120" x2="200" y2="120" className="stroke-rose-600 stroke-[3.5]" />
                )}

                {/* Diameter Full Line */}
                {selectedCirclePart === "diameter" && (
                  <line x1="40" y1="120" x2="120" y2="120" className="stroke-rose-600 stroke-[3.5]" />
                )}

                {/* Chord Line */}
                {(selectedCirclePart === "chord" || selectedCirclePart === "segment") && (
                  <line x1="50" y1="160" x2="190" y2="160" className="stroke-indigo-600 stroke-[3.5]" />
                )}

                {/* Arc Highlighting */}
                {selectedCirclePart === "arc" && (
                  <path d="M 120 40 A 80 80 0 0 1 200 120" className="fill-none stroke-amber-500 stroke-[6]" />
                )}
              </svg>
            </div>

            {/* Part Definition Card */}
            <div className="bg-rose-50/90 border border-rose-200 rounded-xl p-4 text-xs space-y-2">
              {selectedCirclePart === "center" && (
                <div>
                  <h5 className="font-extrabold text-rose-950 text-sm">📍 Center Point (O)</h5>
                  <p className="text-slate-700 mt-1">The fixed central point from which all points on the circle boundary are at an equal distance.</p>
                </div>
              )}

              {selectedCirclePart === "radius" && (
                <div>
                  <h5 className="font-extrabold text-rose-950 text-sm">📏 Radius (r)</h5>
                  <p className="text-slate-700 mt-1">The line segment connecting the center O to any point on the boundary. All radii of a circle are equal in length!</p>
                  <span className="text-[10px] font-mono font-bold bg-rose-200 text-rose-950 px-2 py-0.5 rounded inline-block mt-1">
                    Radius = Diameter ÷ 2
                  </span>
                </div>
              )}

              {selectedCirclePart === "diameter" && (
                <div>
                  <h5 className="font-extrabold text-rose-950 text-sm">↔️ Diameter (d)</h5>
                  <p className="text-slate-700 mt-1">A straight line segment passing directly through the center connecting two boundary points. It is the longest chord!</p>
                  <span className="text-[10px] font-mono font-bold bg-rose-200 text-rose-950 px-2 py-0.5 rounded inline-block mt-1">
                    Diameter = 2 × Radius
                  </span>
                </div>
              )}

              {selectedCirclePart === "chord" && (
                <div>
                  <h5 className="font-extrabold text-rose-950 text-sm">🧵 Chord</h5>
                  <p className="text-slate-700 mt-1">A line segment connecting any two points on the circle boundary. (The diameter is a special chord passing through center!)</p>
                </div>
              )}

              {selectedCirclePart === "arc" && (
                <div>
                  <h5 className="font-extrabold text-rose-950 text-sm">🌙 Arc</h5>
                  <p className="text-slate-700 mt-1">A continuous piece or curved portion of the boundary of a circle.</p>
                </div>
              )}

              {selectedCirclePart === "sector" && (
                <div>
                  <h5 className="font-extrabold text-rose-950 text-sm">🍕 Sector</h5>
                  <p className="text-slate-700 mt-1">A region in the interior of a circle enclosed by two radii and the arc between them (just like a slice of pizza!).</p>
                </div>
              )}

              {selectedCirclePart === "segment" && (
                <div>
                  <h5 className="font-extrabold text-rose-950 text-sm">⛵ Segment</h5>
                  <p className="text-slate-700 mt-1">A region in the interior enclosed by a chord and the arc connecting its endpoints.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* QUICK NCERT GEOMETRY PRACTICE CHECK */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs">
        <h4 className="font-black text-amber-950 text-sm uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles size={16} className="text-amber-600" /> Quick Grade 6 Geometry Quiz Check:
        </h4>

        <p className="text-xs font-bold text-amber-900">
          Question: "What is the relationship between Diameter (d) and Radius (r) of a circle?"
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => {
              setQuizAnswer("a");
              setQuizFeedback("Incorrect. Radius is half the diameter, so Diameter = 2 × Radius!");
            }}
            className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer text-left ${
              quizAnswer === "a" ? "bg-rose-100 border-rose-300 text-rose-900" : "bg-white border-amber-200 text-amber-950 hover:bg-amber-100"
            }`}
          >
            A) Radius = 2 × Diameter
          </button>

          <button
            onClick={() => {
              setQuizAnswer("b");
              setQuizFeedback("✨ Correct! Diameter is twice the radius (Diameter = 2 × Radius).");
              playSpeechWithLang("Correct! Diameter equals two times radius.", "en-US");
            }}
            className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer text-left ${
              quizAnswer === "b" ? "bg-emerald-100 border-emerald-400 text-emerald-950 shadow-xs" : "bg-white border-amber-200 text-amber-950 hover:bg-amber-100"
            }`}
          >
            B) Diameter = 2 × Radius
          </button>

          <button
            onClick={() => {
              setQuizAnswer("c");
              setQuizFeedback("Incorrect. Diameter and Radius are related by a factor of 2!");
            }}
            className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer text-left ${
              quizAnswer === "c" ? "bg-rose-100 border-rose-300 text-rose-900" : "bg-white border-amber-200 text-amber-950 hover:bg-amber-100"
            }`}
          >
            C) Diameter = Radius + 10
          </button>
        </div>

        {quizFeedback && (
          <div className="p-3 bg-white/90 border border-amber-300 rounded-xl text-xs font-bold text-amber-950 animate-fade-in flex items-center justify-between">
            <span>{quizFeedback}</span>
            <button
              onClick={() => { setQuizAnswer(null); setQuizFeedback(null); }}
              className="text-[10px] text-amber-700 hover:underline cursor-pointer"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
