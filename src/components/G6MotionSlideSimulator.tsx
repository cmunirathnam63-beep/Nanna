import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, Compass, ArrowRight, CheckCircle2, Shield, Sparkles, Activity, Layers } from "lucide-react";

interface G6MotionSlideSimulatorProps {
  slide: any;
  onSwitchTab?: (tab: "textbook" | "interactive" | "notes" | "topic_quiz" | "worksheet") => void;
}

export default function G6MotionSlideSimulator({ slide, onSwitchTab }: G6MotionSlideSimulatorProps) {
  const slideId = (slide?.id || "").toUpperCase();
  const slideTitle = (slide?.title || "").toLowerCase();
  const slideType = slide?.type;
  const stepIndex = slide?.data?.index || 0;

  // Global state for interactive sub-tools
  const [activeTab, setActiveTab] = useState<number>(0);

  // Sync tab with stepIndex when slide changes
  useEffect(() => {
    if (slideType === "intro") {
      setActiveTab(0);
    } else if (slideType === "outro") {
      setActiveTab(11);
    } else if (stepIndex >= 1 && stepIndex <= 10) {
      setActiveTab(stepIndex);
    }
  }, [slideId, stepIndex, slideType]);

  // ----------------------------------------------------
  // STEP 1: Handspan vs Metre State
  // ----------------------------------------------------
  const [handspanSize, setHandspanSize] = useState<number>(15); // cm
  const tableLengthCm = 150; // 1.5 meters

  // ----------------------------------------------------
  // STEP 2: SI Unit Converter State
  // ----------------------------------------------------
  const [siValueMetres, setSiValueMetres] = useState<number>(2.5);

  // ----------------------------------------------------
  // STEP 3: Ruler & Parallax Error State
  // ----------------------------------------------------
  const [brokenStartCm, setBrokenStartCm] = useState<number>(2.0);
  const [objectLengthCm, setObjectLengthCm] = useState<number>(6.5);
  const [viewingAngle, setViewingAngle] = useState<number>(0); // -30, 0, +30

  // ----------------------------------------------------
  // STEP 4: Curved Line Thread State
  // ----------------------------------------------------
  const [threadStep, setThreadStep] = useState<"curve" | "stretching" | "straight">("curve");
  const [curvedLengthVal] = useState<number>(14.8);

  // ----------------------------------------------------
  // STEP 5: Rest vs Motion Reference Frame State
  // ----------------------------------------------------
  const [referenceFrame, setReferenceFrame] = useState<"passenger" | "roadside">("roadside");
  const [isBusMoving, setIsBusMoving] = useState<boolean>(true);
  const [busPosition, setBusPosition] = useState<number>(0);

  useEffect(() => {
    if (!isBusMoving) return;
    const interval = setInterval(() => {
      setBusPosition((prev) => (prev + 2) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [isBusMoving]);

  // ----------------------------------------------------
  // STEP 6: Rectilinear Motion State
  // ----------------------------------------------------
  const [rectSpeed, setRectSpeed] = useState<number>(40); // km/h
  const [carPos, setCarPos] = useState<number>(10);
  const [isCarRunning, setIsCarRunning] = useState<boolean>(true);

  useEffect(() => {
    if (!isCarRunning) return;
    const interval = setInterval(() => {
      setCarPos((prev) => (prev + (rectSpeed / 20)) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, [isCarRunning, rectSpeed]);

  // ----------------------------------------------------
  // STEP 7: Circular Motion State
  // ----------------------------------------------------
  const [circRadius, setCircRadius] = useState<number>(60);
  const [circAngle, setCircAngle] = useState<number>(0);
  const [isCircSpinning, setIsCircSpinning] = useState<boolean>(true);
  const [showVectors, setShowVectors] = useState<boolean>(true);

  useEffect(() => {
    if (!isCircSpinning) return;
    const interval = setInterval(() => {
      setCircAngle((prev) => (prev + 4) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isCircSpinning]);

  // ----------------------------------------------------
  // STEP 8: Rotational Motion State
  // ----------------------------------------------------
  const [rotRpm, setRotRpm] = useState<number>(120);
  const [rotAngle, setRotAngle] = useState<number>(0);
  const [rotObject, setRotObject] = useState<"top" | "potter" | "earth">("top");

  useEffect(() => {
    const interval = setInterval(() => {
      setRotAngle((prev) => (prev + (rotRpm / 15)) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [rotRpm]);

  // ----------------------------------------------------
  // STEP 9: Periodic Motion (Pendulum) State
  // ----------------------------------------------------
  const [pendulumLength, setPendulumLength] = useState<number>(80);
  const [pendulumTime, setPendulumTime] = useState<number>(0);
  const [isPendulumSwinging, setIsPendulumSwinging] = useState<boolean>(true);
  const [oscillationCount, setOscillationCount] = useState<number>(0);

  useEffect(() => {
    if (!isPendulumSwinging) return;
    const interval = setInterval(() => {
      setPendulumTime((prev) => {
        const nextTime = prev + 0.05;
        // Count half periods when passing center
        const angle = Math.sin(nextTime * 3) * 30;
        if (Math.abs(angle) < 1 && Math.floor(nextTime * 10) % 10 === 0) {
          setOscillationCount((c) => c + 1);
        }
        return nextTime;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [isPendulumSwinging]);

  // ----------------------------------------------------
  // STEP 10: Multiple Simultaneous Motions State
  // ----------------------------------------------------
  const [multiMotionType, setMultiMotionType] = useState<"rolling_ball" | "sewing_machine" | "earth_orbit">("rolling_ball");
  const [multiAnimPos, setMultiAnimPos] = useState<number>(0);
  const [showRotComponent, setShowRotComponent] = useState<boolean>(true);
  const [showRectComponent, setShowRectComponent] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setMultiAnimPos((prev) => (prev + 2) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Determine current active view mode (0 = Intro, 1..10 = Steps, 11 = Outro)
  const currentView = activeTab;

  return (
    <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-3.5 sm:p-5 text-white flex flex-col justify-between h-full min-h-0 shadow-2xl relative overflow-y-auto space-y-3" id="g6_motion_slide_simulator">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 shrink-0 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-sky-400 rounded-full animate-ping" />
          <span className="text-xs font-black uppercase text-sky-400 tracking-wider flex items-center gap-1.5">
            <Compass size={15} />
            Motion & Measurement Lab
          </span>
        </div>
      </div>

      {/* VIEW 0: CHAPTER OVERVIEW / INTRO */}
      {currentView === 0 && (
        <div className="space-y-3 my-auto animate-fade-in">
          <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 border border-sky-500/40 rounded-2xl p-4 text-center space-y-2 shadow-inner">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
              🚀 Interactive Physics Experiment Studio
            </span>
            <h4 className="text-lg font-black text-white">
              Measurement of Length & Motion
            </h4>
            <p className="text-xs text-sky-200/90 leading-relaxed max-w-md mx-auto font-medium">
              Explore standard SI units, ruler parallax error prevention, curved thread measurement, reference frames, and all 4 fundamental types of motion!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { id: 1, name: "1. Rest & Reference Point", icon: "🚌", color: "border-purple-500/40 bg-purple-950/40 text-purple-300" },
              { id: 2, name: "2. Rectilinear Motion", icon: "🚗", color: "border-blue-500/40 bg-blue-950/40 text-blue-300" },
              { id: 3, name: "3. Circular Motion", icon: "🌀", color: "border-pink-500/40 bg-pink-950/40 text-pink-300" },
              { id: 4, name: "4. Rotational Motion", icon: "🪀", color: "border-amber-500/40 bg-amber-950/40 text-amber-300" },
              { id: 5, name: "5. Periodic Motion", icon: "⏱️", color: "border-teal-500/40 bg-teal-950/40 text-teal-300" },
              { id: 6, name: "6. Oscillatory Motion", icon: "📐", color: "border-indigo-500/40 bg-indigo-950/40 text-indigo-300" },
              { id: 7, name: "7. Combination Motion", icon: "🔀", color: "border-purple-500/40 bg-purple-950/40 text-purple-300" },
              { id: 8, name: "8. Handspan vs SI Metre", icon: "📏", color: "border-amber-500/40 bg-amber-950/40 text-amber-300" },
              { id: 9, name: "9. Ruler & Parallax Error", icon: "📐", color: "border-sky-500/40 bg-sky-950/40 text-sky-300" },
              { id: 10, name: "10. Speed & Conversions", icon: "⚡", color: "border-emerald-500/40 bg-emerald-950/40 text-emerald-300" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`p-2.5 rounded-xl border ${item.color} text-left transition hover:scale-102 cursor-pointer flex items-center gap-2 shadow-xs`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-[11px] font-extrabold truncate">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 1: REST VS MOTION & REFERENCE FRAME */}
      {currentView === 1 && (
        <div className="space-y-3 my-auto animate-fade-in">
          <div className="bg-slate-950 border border-purple-500/40 rounded-2xl p-3.5 space-y-3 text-center">
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest block">
              🚌 Frame of Reference (Rest vs Motion)
            </span>

            {/* Reference Frame Toggle */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setReferenceFrame("roadside")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                  referenceFrame === "roadside"
                    ? "bg-purple-500 text-slate-950 border-purple-400 font-black shadow-xs"
                    : "bg-slate-900 text-slate-300 border-slate-800"
                }`}
              >
                🌳 Observer Outside (Ground)
              </button>
              <button
                onClick={() => setReferenceFrame("passenger")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                  referenceFrame === "passenger"
                    ? "bg-amber-500 text-slate-950 border-amber-400 font-black shadow-xs"
                    : "bg-slate-900 text-slate-300 border-slate-800"
                }`}
              >
                🧔 Passenger Inside Bus
              </button>
            </div>

            {/* Animation Canvas Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 relative overflow-hidden min-h-[110px] flex items-center justify-between">
              {/* Roadside Trees */}
              <div className="flex gap-8 text-2xl transition-transform" style={{ transform: referenceFrame === "passenger" ? `translateX(-${busPosition}px)` : "none" }}>
                <span>🌳</span>
                <span>🏡</span>
                <span>🌴</span>
                <span>🚏</span>
              </div>

              {/* Moving Bus */}
              <div
                className="bg-amber-500 text-slate-950 px-4 py-2 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg transition-all"
                style={{
                  transform: referenceFrame === "roadside" ? `translateX(${busPosition % 80}px)` : "none",
                }}
              >
                <span>🚌 BUS</span>
                <span className="bg-slate-950 text-white px-1.5 py-0.5 rounded text-[10px]">40 km/h</span>
              </div>
            </div>

            {/* Reference State Banner */}
            <div className={`p-2.5 rounded-xl border text-xs font-bold text-left space-y-1 ${
              referenceFrame === "roadside"
                ? "bg-purple-950/80 border-purple-500/80 text-purple-200"
                : "bg-amber-950/80 border-amber-500/80 text-amber-200"
            }`}>
              {referenceFrame === "roadside" ? (
                <p>
                  🌳 <strong>Roadside Observer View:</strong> The bus and passengers change position continuously relative to ground trees. Thus, passengers are <strong>IN MOTION</strong>!
                </p>
              ) : (
                <p>
                  🧔 <strong>Fellow Passenger View:</strong> Distance between co-passengers remains constant over time inside the bus. Thus, passengers are <strong>AT REST</strong> relative to each other!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: RECTILINEAR MOTION */}
      {currentView === 2 && (
        <div className="space-y-3 my-auto animate-fade-in">
          <div className="bg-slate-950 border border-blue-500/40 rounded-2xl p-3.5 space-y-3 text-center">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block">
              🚗 Rectilinear Motion (Straight Line Track)
            </span>

            {/* Straight Track Canvas */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 relative overflow-hidden min-h-[90px] flex items-center">
              <div className="w-full h-1 bg-slate-700 relative">
                {/* Track ticks */}
                {Array.from({ length: 11 }, (_, i) => (
                  <div key={i} className="absolute top-0 h-3 w-0.5 bg-slate-500" style={{ left: `${i * 10}%` }} />
                ))}

                {/* Animated Moving Car */}
                <div
                  className="absolute -top-4 transition-all duration-75 text-2xl"
                  style={{ left: `${carPos}%` }}
                >
                  🚗
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 space-y-1 text-left">
                <span className="text-[10px] font-bold text-slate-400">Speed: {rectSpeed} km/h</span>
                <input
                  type="range"
                  min="10"
                  max="120"
                  value={rectSpeed}
                  onChange={(e) => setRectSpeed(parseInt(e.target.value))}
                  className="w-full accent-blue-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setIsCarRunning(!isCarRunning)}
                  className={`px-3 py-2 rounded-xl text-xs font-black transition border cursor-pointer flex items-center gap-1 ${
                    isCarRunning ? "bg-amber-500 text-slate-950 border-amber-400" : "bg-blue-600 text-white border-blue-500"
                  }`}
                >
                  {isCarRunning ? <Pause size={14} /> : <Play size={14} />}
                  <span>{isCarRunning ? "Pause" : "Run"}</span>
                </button>
              </div>
            </div>

            <p className="text-[11px] text-blue-300/90 bg-blue-950/40 p-2 rounded-xl border border-blue-500/30 text-left leading-relaxed font-medium">
              💡 <strong>Rectilinear Motion:</strong> Motion in a single straight line path. Examples: Car on straight road, falling stone, marching parade.
            </p>
          </div>
        </div>
      )}

      {/* VIEW 3: CIRCULAR MOTION */}
      {currentView === 3 && (
        <div className="space-y-3 my-auto animate-fade-in">
          <div className="bg-slate-950 border border-pink-500/40 rounded-2xl p-3.5 space-y-3 text-center">
            <span className="text-[10px] font-black text-pink-400 uppercase tracking-widest block">
              🌀 Circular Motion (Fixed Radius Center)
            </span>

            {/* Circular Orbit Canvas */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 relative flex items-center justify-center min-h-[140px]">
              {/* Central Pivot */}
              <div className="w-4 h-4 bg-pink-500 rounded-full border-2 border-white shadow-md z-10" />

              {/* Orbit Circle */}
              <div
                className="border-2 border-dashed border-pink-500/50 rounded-full absolute flex items-center justify-center"
                style={{ width: `${circRadius * 2}px`, height: `${circRadius * 2}px` }}
              >
                {/* Orbiting Stone */}
                <div
                  className="absolute w-6 h-6 bg-amber-400 rounded-full border-2 border-slate-950 flex items-center justify-center text-[10px] font-black text-slate-950 shadow-lg"
                  style={{
                    transform: `rotate(${circAngle}deg) translate(${circRadius}px) rotate(-${circAngle}deg)`,
                  }}
                >
                  🪨
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 space-y-1 text-left">
                <span className="text-[10px] font-bold text-slate-400">Radius (r): {circRadius} cm</span>
                <input
                  type="range"
                  min="30"
                  max="70"
                  value={circRadius}
                  onChange={(e) => setCircRadius(parseInt(e.target.value))}
                  className="w-full accent-pink-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setIsCircSpinning(!isCircSpinning)}
                  className="px-3 py-2 bg-pink-600 hover:bg-pink-500 text-white text-xs font-black rounded-xl border border-pink-400 transition cursor-pointer"
                >
                  {isCircSpinning ? "Pause Spin" : "Start Spin"}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-pink-300/90 bg-pink-950/40 p-2 rounded-xl border border-pink-500/30 text-left leading-relaxed font-medium">
              💡 <strong>Circular Motion:</strong> Path is a circle, and distance $r$ from central pivot remains constant. Examples: Tied stone whirled in air, hands of clock, fan blade tip.
            </p>
          </div>
        </div>
      )}

      {/* VIEW 4: ROTATIONAL MOTION */}
      {currentView === 4 && (
        <div className="space-y-3 my-auto animate-fade-in">
          <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-3.5 space-y-3 text-center">
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">
              🪀 Rotational Motion (Spinning on Internal Axis)
            </span>

            {/* Object Selector */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setRotObject("top")}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition border cursor-pointer ${
                  rotObject === "top" ? "bg-amber-500 text-slate-950 border-amber-400 font-black shadow-xs" : "bg-slate-900 text-slate-300 border-slate-800"
                }`}
              >
                🪀 Spinning Top (Lattu)
              </button>
              <button
                onClick={() => setRotObject("potter")}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition border cursor-pointer ${
                  rotObject === "potter" ? "bg-amber-500 text-slate-950 border-amber-400 font-black shadow-xs" : "bg-slate-900 text-slate-300 border-slate-800"
                }`}
              >
                🏺 Potter's Wheel
              </button>
              <button
                onClick={() => setRotObject("earth")}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition border cursor-pointer ${
                  rotObject === "earth" ? "bg-amber-500 text-slate-950 border-amber-400 font-black shadow-xs" : "bg-slate-900 text-slate-300 border-slate-800"
                }`}
              >
                🌍 Earth Axis Spin
              </button>
            </div>

            {/* Spinning Animation Canvas */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[120px] relative">
              {/* Spinning Central Axis Line */}
              <div className="w-0.5 h-20 bg-amber-400/80 absolute z-0 animate-pulse" />

              <div
                className="text-4xl z-10 transition-transform"
                style={{ transform: `rotate(${rotAngle}deg)` }}
              >
                {rotObject === "top" ? "🪀" : rotObject === "potter" ? "🎯" : "🌍"}
              </div>

              <span className="text-[10px] text-amber-300 font-mono font-bold mt-2 z-10">
                Spindle Axis Speed: {rotRpm} RPM
              </span>
            </div>

            <p className="text-[11px] text-amber-300/90 bg-amber-950/40 p-2 rounded-xl border border-amber-500/30 text-left leading-relaxed font-medium">
              💡 <strong>Rotational Motion:</strong> The entire object turns/spins around its own internal axis without shifting away to another place.
            </p>
          </div>
        </div>
      )}

      {/* VIEW 5: PERIODIC MOTION */}
      {currentView === 5 && (
        <div className="space-y-3 my-auto animate-fade-in">
          <div className="bg-slate-950 border border-teal-500/40 rounded-2xl p-3.5 space-y-3 text-center">
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">
              ⏱️ Periodic Motion (Repeats at Regular Intervals)
            </span>

            {/* Periodic Orbit / Clock Animation Canvas */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 relative flex flex-col items-center justify-center min-h-[120px]">
              <div className="flex items-center justify-center gap-6">
                <div className="flex flex-col items-center space-y-1">
                  <div
                    className="text-4xl transition-transform"
                    style={{ transform: `rotate(${(pendulumTime * 60) % 360}deg)` }}
                  >
                    ⏰
                  </div>
                  <span className="text-[10px] font-mono font-bold text-teal-300">Clock Second Hand (60s Cycle)</span>
                </div>

                <div className="flex flex-col items-center space-y-1">
                  <div
                    className="text-4xl transition-transform"
                    style={{ transform: `rotate(${(pendulumTime * 30) % 360}deg)` }}
                  >
                    🌍
                  </div>
                  <span className="text-[10px] font-mono font-bold text-sky-300">Earth Orbit (365 Days)</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-teal-300/90 bg-teal-950/40 p-2 rounded-xl border border-teal-500/30 text-left leading-relaxed font-medium">
              💡 <strong>Periodic Motion:</strong> Motion that repeats itself at regular equal intervals of time. Examples: Earth's revolution, clock hands, heartbeat.
            </p>
          </div>
        </div>
      )}

      {/* VIEW 6: OSCILLATORY MOTION (PENDULUM LAB) */}
      {currentView === 6 && (
        <div className="space-y-3 my-auto animate-fade-in">
          <div className="bg-slate-950 border border-indigo-500/40 rounded-2xl p-3.5 space-y-3 text-center">
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">
              📐 Oscillatory Motion (Pendulum Swing)
            </span>

            {/* Pendulum Swing Animation Canvas */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 relative flex flex-col items-center min-h-[130px]">
              {/* Pivot */}
              <div className="w-6 h-2 bg-slate-600 rounded-md" />

              {/* String & Bob */}
              <div
                className="origin-top flex flex-col items-center transition-transform"
                style={{
                  transform: `rotate(${Math.sin(pendulumTime * 3) * 30}deg)`,
                  height: `${pendulumLength}px`,
                }}
              >
                <div className="w-0.5 h-full bg-slate-400" />
                <div className="w-6 h-6 bg-amber-400 rounded-full border-2 border-slate-950 shadow-md flex items-center justify-center text-[10px] font-black text-slate-950">
                  ⚪
                </div>
              </div>
            </div>

            {/* Oscillation Counter */}
            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex items-center justify-between text-xs">
              <span className="text-slate-400 font-bold">Oscillation Count:</span>
              <span className="font-mono font-black text-indigo-300 text-base">{oscillationCount} Oscillations</span>
              <button
                onClick={() => setOscillationCount(0)}
                className="text-[10px] text-amber-400 hover:underline cursor-pointer font-bold"
              >
                Reset
              </button>
            </div>

            <p className="text-[11px] text-indigo-300/90 bg-indigo-950/40 p-2 rounded-xl border border-indigo-500/30 text-left leading-relaxed font-medium">
              💡 <strong>Oscillatory Motion:</strong> To-and-fro movement about a central mean position. Examples: Playground swing, grandfather clock pendulum, tuning fork.
            </p>
          </div>
        </div>
      )}

      {/* VIEW 7: COMBINATION MOTION */}
      {currentView === 7 && (
        <div className="space-y-3 my-auto animate-fade-in">
          <div className="bg-slate-950 border border-purple-500/40 rounded-2xl p-3.5 space-y-3 text-center">
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest block">
              🔀 Objects Undergoing Multiple Motions Simultaneously
            </span>

            {/* Type Selector */}
            <div className="flex justify-center gap-1.5">
              {[
                { id: "rolling_ball", label: "🥎 Rolling Ball" },
                { id: "sewing_machine", label: "🧵 Sewing Machine" },
                { id: "earth_orbit", label: "🌍 Earth Motion" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMultiMotionType(m.id as any)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition border cursor-pointer ${
                    multiMotionType === m.id
                      ? "bg-purple-500 text-white border-purple-400 font-black shadow-xs"
                      : "bg-slate-900 text-slate-300 border-slate-800"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Visual Canvas Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[110px] relative overflow-hidden">
              {multiMotionType === "rolling_ball" && (
                <div className="w-full relative h-12 flex items-center">
                  <div className="w-full h-0.5 bg-slate-700 absolute bottom-1" />
                  <div
                    className="absolute text-3xl transition-all"
                    style={{
                      left: `${multiAnimPos}%`,
                      transform: `rotate(${multiAnimPos * 10}deg)`,
                    }}
                  >
                    🥎
                  </div>
                </div>
              )}

              {multiMotionType === "sewing_machine" && (
                <div className="flex items-center gap-6">
                  {/* Wheel */}
                  <div
                    className="text-3xl transition-transform"
                    style={{ transform: `rotate(${multiAnimPos * 10}deg)` }}
                  >
                    🎡
                  </div>
                  {/* Needle */}
                  <div
                    className="text-2xl transition-transform"
                    style={{ transform: `translateY(${Math.sin(multiAnimPos) * 10}px)` }}
                  >
                    📍
                  </div>
                </div>
              )}

              {multiMotionType === "earth_orbit" && (
                <div className="flex items-center justify-center gap-4">
                  <span className="text-3xl">☀️</span>
                  <div
                    className="text-2xl transition-transform"
                    style={{ transform: `rotate(${multiAnimPos * 10}deg)` }}
                  >
                    🌍
                  </div>
                </div>
              )}
            </div>

            {/* Combination Explanation Badges */}
            <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-[11px] text-left">
              <div className="bg-purple-950/80 border border-purple-600/80 p-2 rounded-xl space-y-0.5">
                <span className="font-extrabold text-amber-300 block">Motion Component 1:</span>
                <span className="text-slate-200 font-semibold">
                  {multiMotionType === "rolling_ball" ? "Rotational (Spinning on axle)" : multiMotionType === "sewing_machine" ? "Rotational (Wheel turns)" : "Rotational (24-hr axis spin)"}
                </span>
              </div>
              <div className="bg-purple-950/80 border border-purple-600/80 p-2 rounded-xl space-y-0.5">
                <span className="font-extrabold text-emerald-300 block">Motion Component 2:</span>
                <span className="text-slate-200 font-semibold">
                  {multiMotionType === "rolling_ball" ? "Rectilinear (Moves straight ahead)" : multiMotionType === "sewing_machine" ? "Periodic Rectilinear (Needle up/down)" : "Circular & Periodic (365-day Sun orbit)"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 8: NEED FOR STANDARD UNITS (Handspan vs Metre) */}
      {currentView === 8 && (
        <div className="space-y-3 my-auto animate-fade-in">
          <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-3.5 space-y-2 text-center">
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">
              📏 Handspan vs Standard Metre Experiment
            </span>
            <p className="text-xs text-slate-300 font-medium">
              Measuring a 1.50 Metre Table (150 cm) using human handspans:
            </p>

            {/* Handspan Selector */}
            <div className="flex justify-center gap-2 pt-1">
              {[
                { label: "Child (12 cm)", val: 12 },
                { label: "Student (15 cm)", val: 15 },
                { label: "Adult (20 cm)", val: 20 },
                { label: "Tall Person (25 cm)", val: 25 },
              ].map((h) => (
                <button
                  key={h.val}
                  onClick={() => setHandspanSize(h.val)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition border cursor-pointer ${
                    handspanSize === h.val
                      ? "bg-amber-500 text-slate-950 border-amber-400 font-black shadow-xs"
                      : "bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-500/50"
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>

            {/* Visual Table & Measurement comparison */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-bold">✋ Selected Handspan:</span>
                <span className="font-mono font-black text-amber-300">{handspanSize} cm</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center pt-1">
                <div className="bg-amber-950/80 border border-amber-600/80 rounded-xl p-2 space-y-0.5">
                  <span className="text-[10px] font-black uppercase text-amber-300 block">
                    ✋ Handspan Count
                  </span>
                  <span className="text-xl font-black font-mono text-amber-200">
                    {(tableLengthCm / handspanSize).toFixed(1)} Handspans
                  </span>
                  <span className="text-[9px] text-amber-400 block">
                    (Varies with person's body size!)
                  </span>
                </div>

                <div className="bg-emerald-950/80 border border-emerald-600/80 rounded-xl p-2 space-y-0.5">
                  <span className="text-[10px] font-black uppercase text-emerald-300 block">
                    📏 Standard SI Metre
                  </span>
                  <span className="text-xl font-black font-mono text-emerald-200">
                    1.50 Metres
                  </span>
                  <span className="text-[9px] text-emerald-400 block">
                    (150 cm - Universally identical!)
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-amber-300/90 bg-amber-950/40 p-2 rounded-xl border border-amber-500/30 text-left leading-relaxed font-medium">
              💡 <strong>Takeaway:</strong> Handspans vary from person to person. Standard SI Metres provide identical measurements everywhere!
            </p>
          </div>
        </div>
      )}

      {/* VIEW 9: RULER PRECAUTIONS, PARALLAX ERROR & CURVED THREAD */}
      {currentView === 9 && (
        <div className="space-y-3 my-auto animate-fade-in">
          <div className="bg-slate-950 border border-sky-500/40 rounded-2xl p-3.5 space-y-3">
            <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest block text-center">
              📐 Ruler Precautions, Broken Zero & Parallax Error
            </span>

            {/* Broken Zero Mark Controls */}
            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl space-y-2">
              <span className="text-xs font-bold text-amber-300 block">
                1. Broken Zero Mark Scale Test:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 block font-semibold">Start Mark:</label>
                  <select
                    value={brokenStartCm}
                    onChange={(e) => setBrokenStartCm(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1 text-amber-300 font-mono font-bold cursor-pointer"
                  >
                    <option value={0}>0.0 cm (Normal)</option>
                    <option value={1.0}>1.0 cm (Broken)</option>
                    <option value={2.5}>2.5 cm (Broken)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block font-semibold">End Mark:</label>
                  <span className="font-mono font-bold text-sky-300 block pt-1 text-sm">
                    {(brokenStartCm + objectLengthCm).toFixed(1)} cm
                  </span>
                </div>
              </div>

              <div className="bg-amber-950/60 border border-amber-500/40 p-1.5 rounded-lg text-[10px] text-amber-200 font-mono flex items-center justify-between">
                <span>Object Length = End Mark - Start Mark:</span>
                <span className="font-black text-amber-300">
                  {(brokenStartCm + objectLengthCm).toFixed(1)} - {brokenStartCm.toFixed(1)} = {objectLengthCm.toFixed(1)} cm
                </span>
              </div>
            </div>

            {/* Parallax Angle Selector */}
            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl space-y-2 text-center">
              <span className="text-xs font-bold text-sky-300 block">
                2. Parallax Eye Viewing Angle:
              </span>

              <div className="flex justify-center gap-2">
                {[
                  { angle: -30, label: "↖️ -30° Angle" },
                  { angle: 0, label: "👁️ 90° Perpendicular" },
                  { angle: 30, label: "↗️ +30° Angle" },
                ].map((item) => (
                  <button
                    key={item.angle}
                    onClick={() => setViewingAngle(item.angle)}
                    className={`px-2 py-1 rounded-xl text-[10px] font-bold transition border cursor-pointer ${
                      viewingAngle === item.angle
                        ? item.angle === 0
                          ? "bg-emerald-500 text-slate-950 border-emerald-400 font-black shadow-xs"
                          : "bg-red-500/80 text-white border-red-400 font-black shadow-xs"
                        : "bg-slate-950 text-slate-300 border-slate-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <p className={`text-[10px] p-1.5 rounded-xl border font-bold ${
                viewingAngle === 0
                  ? "bg-emerald-950/80 text-emerald-200 border-emerald-500"
                  : "bg-red-950/80 text-red-200 border-red-500"
              }`}>
                {viewingAngle === 0
                  ? "✅ Perpendicular View (90°): Zero Parallax Error! Correct length = 6.5 cm."
                  : `⚠️ Parallax Error! Viewing at ${viewingAngle}° angle gives false reading: ${(6.5 + viewingAngle / 100).toFixed(2)} cm.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 10: SPEED & UNIT CONVERSIONS */}
      {currentView === 10 && (
        <div className="space-y-3 my-auto animate-fade-in">
          <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-3.5 space-y-3 text-center">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block">
              ⚡ Speed & Unit Conversion Calculator
            </span>

            {/* Converter Input Controls */}
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300">Vehicle Speed (km/h):</span>
                <span className="text-amber-300 font-mono font-black text-base">{rectSpeed} km/h</span>
              </div>
              <input
                type="range"
                min="18"
                max="180"
                step="18"
                value={rectSpeed}
                onChange={(e) => setRectSpeed(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Unit Conversion Display Grid */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-amber-950/80 border border-amber-600/80 rounded-xl p-2.5 space-y-0.5">
                <span className="text-[10px] font-black uppercase text-amber-300 block">
                  🚘 Speed in km/h
                </span>
                <span className="text-xl font-black font-mono text-amber-200">
                  {rectSpeed} km/h
                </span>
                <span className="text-[9px] text-amber-400 block">
                  (Kilometers per hour)
                </span>
              </div>

              <div className="bg-emerald-950/80 border border-emerald-600/80 rounded-xl p-2.5 space-y-0.5">
                <span className="text-[10px] font-black uppercase text-emerald-300 block">
                  🏃 Speed in m/s (SI Unit)
                </span>
                <span className="text-xl font-black font-mono text-emerald-200">
                  {((rectSpeed * 5) / 18).toFixed(1)} m/s
                </span>
                <span className="text-[9px] text-emerald-400 block">
                  (Multiply by 5/18)
                </span>
              </div>
            </div>

            <p className="text-[11px] text-emerald-300/90 bg-emerald-950/40 p-2 rounded-xl border border-emerald-500/30 text-left leading-relaxed font-medium">
              💡 <strong>Formula:</strong> Speed = Distance ÷ Time. To convert km/h to m/s, multiply by <strong>5/18</strong> (since 1000m ÷ 3600s = 5/18).
            </p>
          </div>
        </div>
      )}

      {/* VIEW 11: SUMMARY / OUTRO */}
      {currentView === 11 && (
        <div className="space-y-3 my-auto animate-fade-in text-center">
          <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-2xl p-4 space-y-3 shadow-inner">
            <span className="text-[10px] font-black uppercase text-emerald-400 tracking-widest block">
              🏆 Chapter 5 Physics Mastery Achieved!
            </span>
            <h4 className="text-lg font-black text-white">
              Measurement of Length and Motion
            </h4>
            <p className="text-xs text-emerald-200/90 leading-relaxed max-w-xs mx-auto font-medium">
              You have explored SI Metres, ruler parallax prevention, thread measurements, and all 4 fundamental types of motion!
            </p>

            <div className="flex justify-center gap-2 pt-2">
              <button
                onClick={() => onSwitchTab && onSwitchTab("topic_quiz")}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <span>🎯 Take Chapter Quiz</span>
              </button>
              <button
                onClick={() => onSwitchTab && onSwitchTab("worksheet")}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sky-200 font-extrabold text-xs rounded-xl border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
              >
                <span>✍️ Practice Worksheet</span>
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
