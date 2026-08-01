import React from "react";

interface DefinitionDiagramProps {
  diagramType?: string;
  title?: string;
}

export default function DefinitionDiagram({ diagramType, title }: DefinitionDiagramProps) {
  if (!diagramType) return null;

  switch (diagramType) {
    case "latitude":
      return (
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-sky-500/30 flex flex-col items-center space-y-2">
          <svg viewBox="0 0 200 160" className="w-full max-w-[220px] h-32">
            {/* Outer Globe Circle */}
            <circle cx="100" cy="80" r="65" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
            
            {/* Parallels of Latitude */}
            {/* North Pole */}
            <circle cx="100" cy="15" r="2.5" fill="#e0f2fe" />
            <text x="100" y="11" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontWeight="800">North Pole (90°N)</text>
            
            {/* Arctic Circle 66.5° N */}
            <ellipse cx="100" cy="35" rx="42" ry="10" fill="none" stroke="#7dd3fc" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="148" y="38" fill="#7dd3fc" fontSize="7" fontWeight="bold">66½° N</text>

            {/* Tropic of Cancer 23.5° N */}
            <ellipse cx="100" cy="55" rx="58" ry="12" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="162" y="58" fill="#f59e0b" fontSize="7.5" fontWeight="black">23½° N</text>

            {/* Equator 0° */}
            <ellipse cx="100" cy="80" rx="65" ry="14" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <text x="168" y="83" fill="#ef4444" fontSize="8.5" fontWeight="black">0° Equator</text>

            {/* Tropic of Capricorn 23.5° S */}
            <ellipse cx="100" cy="105" rx="58" ry="12" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="162" y="108" fill="#f59e0b" fontSize="7.5" fontWeight="black">23½° S</text>

            {/* Antarctic Circle 66.5° S */}
            <ellipse cx="100" cy="125" rx="42" ry="10" fill="none" stroke="#7dd3fc" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="148" y="128" fill="#7dd3fc" fontSize="7" fontWeight="bold">66½° S</text>

            {/* South Pole */}
            <circle cx="100" cy="145" r="2.5" fill="#e0f2fe" />
            <text x="100" y="155" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontWeight="800">South Pole (90°S)</text>
          </svg>
          <span className="text-[10px] font-extrabold uppercase text-sky-300 tracking-wider">
            📐 Latitudes = Horizontal Parallel Circles (Never Touch!)
          </span>
        </div>
      );

    case "longitude":
      return (
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-indigo-500/30 flex flex-col items-center space-y-2">
          <svg viewBox="0 0 200 160" className="w-full max-w-[220px] h-32">
            <circle cx="100" cy="80" r="65" fill="#0f172a" stroke="#818cf8" strokeWidth="2.5" />
            
            {/* Meridians of Longitude */}
            <path d="M 100 15 Q 40 80 100 145" fill="none" stroke="#818cf8" strokeWidth="1.2" />
            <path d="M 100 15 Q 70 80 100 145" fill="none" stroke="#818cf8" strokeWidth="1.2" />
            
            {/* Prime Meridian 0° */}
            <path d="M 100 15 L 100 145" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
            
            <path d="M 100 15 Q 130 80 100 145" fill="none" stroke="#818cf8" strokeWidth="1.2" />
            <path d="M 100 15 Q 160 80 100 145" fill="none" stroke="#818cf8" strokeWidth="1.2" />

            {/* Poles */}
            <circle cx="100" cy="15" r="3" fill="#fef08a" />
            <text x="100" y="11" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold">North Pole</text>

            <circle cx="100" cy="145" r="3" fill="#fef08a" />
            <text x="100" y="155" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold">South Pole</text>

            <text x="105" y="80" fill="#fbbf24" fontSize="8" fontWeight="black">0° Prime Meridian</text>
          </svg>
          <span className="text-[10px] font-extrabold uppercase text-indigo-300 tracking-wider">
            🍊 Longitudes = Vertical Meridians (Meet at Poles)
          </span>
        </div>
      );

    case "equator":
      return (
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-red-500/30 flex flex-col items-center space-y-2">
          <svg viewBox="0 0 200 160" className="w-full max-w-[220px] h-32">
            {/* Northern Hemisphere */}
            <path d="M 35 80 A 65 65 0 0 1 165 80 Z" fill="#0284c7" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="100" y="50" textAnchor="middle" fill="#e0f2fe" fontSize="10" fontWeight="black">Northern Hemisphere ❄️</text>

            {/* Southern Hemisphere */}
            <path d="M 35 80 A 65 65 0 0 0 165 80 Z" fill="#059669" fillOpacity="0.4" stroke="#34d399" strokeWidth="1.5" />
            <text x="100" y="115" textAnchor="middle" fill="#d1fae5" fontSize="10" fontWeight="black">Southern Hemisphere 🦘</text>

            {/* Equator Line */}
            <line x1="30" y1="80" x2="170" y2="80" stroke="#ef4444" strokeWidth="3.5" />
            <rect x="65" y="72" width="70" height="16" rx="4" fill="#ef4444" />
            <text x="100" y="83" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="black">0° EQUATOR</text>
          </svg>
          <span className="text-[10px] font-extrabold uppercase text-red-300 tracking-wider">
            🌍 Equator divides Earth into 2 equal halves
          </span>
        </div>
      );

    case "tropic_cancer":
      return (
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-amber-500/30 flex flex-col items-center space-y-2">
          <svg viewBox="0 0 200 160" className="w-full max-w-[220px] h-32">
            <circle cx="100" cy="80" r="65" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            
            {/* India Outline Representation */}
            <path d="M 90 50 L 105 45 L 115 55 L 110 70 L 100 80 L 92 65 Z" fill="#15803d" fillOpacity="0.6" stroke="#4ade80" strokeWidth="1.2" />
            <text x="100" y="60" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="black">INDIA</text>

            {/* Tropic of Cancer Line passing through India */}
            <line x1="38" y1="58" x2="162" y2="58" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" />
            <rect x="50" y="50" width="100" height="14" rx="3" fill="#f59e0b" />
            <text x="100" y="60" textAnchor="middle" fill="#000000" fontSize="8" fontWeight="black">Tropic of Cancer (23½° N)</text>

            {/* Sun Beam */}
            <circle cx="100" cy="15" r="10" fill="#fef08a" />
            <line x1="100" y1="26" x2="100" y2="48" stroke="#fef08a" strokeWidth="2" strokeDasharray="2 2" />
            <text x="100" y="12" textAnchor="middle" fill="#78350f" fontSize="7" fontWeight="black">☀️ Sun Overhead</text>
          </svg>
          <span className="text-[10px] font-extrabold uppercase text-amber-300 tracking-wider">
            ☀️ Passes through middle of India (8 States)
          </span>
        </div>
      );

    case "tropic_capricorn":
      return (
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-amber-500/30 flex flex-col items-center space-y-2">
          <svg viewBox="0 0 200 160" className="w-full max-w-[220px] h-32">
            <circle cx="100" cy="80" r="65" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            
            <ellipse cx="100" cy="80" rx="65" ry="12" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
            <text x="100" y="78" textAnchor="middle" fill="#ef4444" fontSize="7">0° Equator</text>

            {/* Tropic of Capricorn Line */}
            <line x1="38" y1="105" x2="162" y2="105" stroke="#f59e0b" strokeWidth="2.5" />
            <rect x="45" y="97" width="110" height="14" rx="3" fill="#f59e0b" />
            <text x="100" y="107" textAnchor="middle" fill="#000000" fontSize="8" fontWeight="black">Tropic of Capricorn (23½° S)</text>
          </svg>
          <span className="text-[10px] font-extrabold uppercase text-amber-300 tracking-wider">
            🦘 Southern Hemisphere Tropic (Passes through Australia)
          </span>
        </div>
      );

    case "prime_meridian":
      return (
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-yellow-500/30 flex flex-col items-center space-y-2">
          <svg viewBox="0 0 200 160" className="w-full max-w-[220px] h-32">
            {/* Western Hemisphere */}
            <path d="M 100 15 A 65 65 0 0 0 100 145 Z" fill="#3b82f6" fillOpacity="0.2" />
            <text x="60" y="80" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">WEST (0° to 180°W)</text>

            {/* Eastern Hemisphere */}
            <path d="M 100 15 A 65 65 0 0 1 100 145 Z" fill="#10b981" fillOpacity="0.2" />
            <text x="140" y="80" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">EAST (0° to 180°E)</text>

            {/* Prime Meridian */}
            <line x1="100" y1="15" x2="100" y2="145" stroke="#eab308" strokeWidth="3" />
            <rect x="55" y="10" width="90" height="15" rx="3" fill="#eab308" />
            <text x="100" y="21" textAnchor="middle" fill="#000000" fontSize="8" fontWeight="black">0° Prime Meridian (Greenwich)</text>
          </svg>
          <span className="text-[10px] font-extrabold uppercase text-yellow-300 tracking-wider">
            🇬🇧 0° Meridian at Greenwich, London
          </span>
        </div>
      );

    case "grid":
      return (
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-emerald-500/30 flex flex-col items-center space-y-2">
          <svg viewBox="0 0 200 160" className="w-full max-w-[220px] h-32">
            <rect x="20" y="20" width="160" height="120" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            
            {/* Grid Lines */}
            <line x1="20" y1="50" x2="180" y2="50" stroke="#334155" strokeWidth="1" />
            <line x1="20" y1="80" x2="180" y2="80" stroke="#ef4444" strokeWidth="2" />
            <text x="182" y="83" fill="#ef4444" fontSize="7" fontWeight="bold">28° N Lat</text>

            <line x1="20" y1="110" x2="180" y2="110" stroke="#334155" strokeWidth="1" />

            <line x1="60" y1="20" x2="60" y2="140" stroke="#334155" strokeWidth="1" />
            <line x1="110" y1="20" x2="110" y2="140" stroke="#fbbf24" strokeWidth="2" />
            <text x="110" y="150" textAnchor="middle" fill="#fbbf24" fontSize="7" fontWeight="bold">77° E Long</text>

            <line x1="150" y1="20" x2="150" y2="140" stroke="#334155" strokeWidth="1" />

            {/* Target Crosshair */}
            <circle cx="110" cy="80" r="8" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="110" cy="80" r="3" fill="#ef4444" />
            <text x="110" y="70" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="black">📍 New Delhi (28°N, 77°E)</text>
          </svg>
          <span className="text-[10px] font-extrabold uppercase text-emerald-300 tracking-wider">
            🎯 Grid Address = (Latitude, Longitude) Pinpoint
          </span>
        </div>
      );

    case "time_rule":
      return (
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-amber-500/30 flex flex-col items-center space-y-2">
          <svg viewBox="0 0 200 160" className="w-full max-w-[220px] h-32">
            {/* Central Prime Meridian */}
            <line x1="100" y1="20" x2="100" y2="140" stroke="#eab308" strokeWidth="2" strokeDasharray="3 2" />
            <text x="100" y="15" textAnchor="middle" fill="#eab308" fontSize="8" fontWeight="bold">0° Meridian</text>

            {/* West Arrow */}
            <path d="M 85 80 L 30 80 M 35 75 L 25 80 L 35 85" fill="none" stroke="#ef4444" strokeWidth="2" />
            <rect x="25" y="90" width="60" height="20" rx="4" fill="#7f1d1d" />
            <text x="55" y="103" textAnchor="middle" fill="#fca5a5" fontSize="8" fontWeight="black">WEST: -4 Mins/1°</text>

            {/* East Arrow */}
            <path d="M 115 80 L 170 80 M 165 75 L 175 80 L 165 85" fill="none" stroke="#22c55e" strokeWidth="2" />
            <rect x="115" y="90" width="60" height="20" rx="4" fill="#14532d" />
            <text x="145" y="103" textAnchor="middle" fill="#86efac" fontSize="8" fontWeight="black">EAST: +4 Mins/1°</text>

            <circle cx="100" cy="80" r="12" fill="#38bdf8" />
            <text x="100" y="83" textAnchor="middle" fill="#000" fontSize="8" fontWeight="black">1° = 4m</text>
          </svg>
          <span className="text-[10px] font-extrabold uppercase text-amber-300 tracking-wider">
            ⏰ Going East = Add Time (+4m) | West = Subtract (-4m)
          </span>
        </div>
      );

    case "ist_map":
      return (
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-orange-500/30 flex flex-col items-center space-y-2">
          <svg viewBox="0 0 200 160" className="w-full max-w-[220px] h-32">
            {/* India Width Representation */}
            <path d="M 50 40 L 75 35 L 140 45 L 155 60 L 120 120 L 100 135 L 80 120 L 50 65 Z" fill="#1e293b" stroke="#f97316" strokeWidth="2" />
            
            {/* Gujarat West 68° E */}
            <line x1="50" y1="20" x2="50" y2="140" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="50" y="15" textAnchor="middle" fill="#38bdf8" fontSize="7" fontWeight="bold">68°E (Gujarat)</text>

            {/* Assam East 97° E */}
            <line x1="150" y1="20" x2="150" y2="140" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="150" y="15" textAnchor="middle" fill="#38bdf8" fontSize="7" fontWeight="bold">97°E (Assam)</text>

            {/* Central IST Meridian 82°30' E */}
            <line x1="102" y1="20" x2="102" y2="140" stroke="#f59e0b" strokeWidth="3" />
            <rect x="62" y="70" width="80" height="18" rx="4" fill="#f59e0b" />
            <text x="102" y="82" textAnchor="middle" fill="#000" fontSize="8" fontWeight="black">IST = 82°30' E (Mirzapur)</text>

            <text x="100" y="152" textAnchor="middle" fill="#fed7aa" fontSize="7.5" fontWeight="bold">↔️ 30° Width = 2-Hour Gap Solved by ONE Central Time!</text>
          </svg>
          <span className="text-[10px] font-extrabold uppercase text-orange-300 tracking-wider">
            🇮🇳 Mirzapur (82°30' E) gives ONE standard time for all India
          </span>
        </div>
      );

    case "gmt_difference":
      return (
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-sky-500/30 flex flex-col items-center space-y-2">
          <svg viewBox="0 0 200 160" className="w-full max-w-[220px] h-32">
            {/* London Clock */}
            <circle cx="55" cy="70" r="30" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            {/* Clock hands for 12:00 */}
            <line x1="55" y1="70" x2="55" y2="50" stroke="#38bdf8" strokeWidth="2.5" />
            <line x1="55" y1="70" x2="55" y2="45" stroke="#f59e0b" strokeWidth="2" />
            <text x="55" y="112" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="black">🇬🇧 London (0°)</text>
            <text x="55" y="122" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">12:00 PM</text>

            {/* Arrow + Math */}
            <path d="M 90 70 L 110 70" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="100" y="62" textAnchor="middle" fill="#f59e0b" fontSize="7" fontWeight="black">+5h 30m</text>

            {/* India Clock */}
            <circle cx="145" cy="70" r="30" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
            {/* Clock hands for 5:30 */}
            <line x1="145" y1="70" x2="162" y2="80" stroke="#22c55e" strokeWidth="2.5" />
            <line x1="145" y1="70" x2="145" y2="92" stroke="#f59e0b" strokeWidth="2" />
            <text x="145" y="112" textAnchor="middle" fill="#86efac" fontSize="8" fontWeight="black">🇮🇳 India (82.5°E)</text>
            <text x="145" y="122" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">5:30 PM</text>
          </svg>
          <span className="text-[10px] font-extrabold uppercase text-sky-300 tracking-wider">
            📐 82.5° × 4 mins = 330 mins = 5 Hrs 30 Mins Ahead of London
          </span>
        </div>
      );

    case "length_comparison":
      return (
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-emerald-500/30 flex flex-col items-center space-y-2">
          <svg viewBox="0 0 200 160" className="w-full max-w-[220px] h-32">
            <circle cx="100" cy="80" r="65" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
            
            {/* Equator (0° Latitude) */}
            <ellipse cx="100" cy="80" rx="65" ry="14" fill="none" stroke="#ef4444" strokeWidth="3" />
            <text x="100" y="78" textAnchor="middle" fill="#fca5a5" fontSize="8" fontWeight="black">Equator 0° (40,075 km) [LONGEST!]</text>

            {/* Shorter Latitude (60° N) */}
            <ellipse cx="100" cy="40" rx="46" ry="10" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="100" y="38" textAnchor="middle" fill="#7dd3fc" fontSize="7" fontWeight="bold">60°N Lat (Shorter ~20,000 km)</text>

            {/* Longitude Semi-circle */}
            <path d="M 100 15 Q 160 80 100 145" fill="none" stroke="#eab308" strokeWidth="2.5" strokeDasharray="3 2" />
            <text x="160" y="115" textAnchor="middle" fill="#fef08a" fontSize="7" fontWeight="black">Longitudes: All Equal (~20,004 km)</text>
          </svg>
          <span className="text-[10px] font-extrabold uppercase text-emerald-300 tracking-wider">
            📏 Equator is the LONGEST line; all Longitudes are EQUAL!
          </span>
        </div>
      );

    case "heat_zones":
      return (
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-amber-500/30 flex flex-col items-center space-y-2">
          <svg viewBox="0 0 200 160" className="w-full max-w-[220px] h-32">
            {/* Globe Background */}
            <circle cx="100" cy="80" r="65" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
            
            {/* Frigid Zone North */}
            <path d="M 58 35 A 65 65 0 0 1 142 35 Z" fill="#0284c7" fillOpacity="0.8" />
            <text x="100" y="26" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="black">❄️ North Frigid Zone (Freezing)</text>

            {/* North Temperate Zone */}
            <path d="M 38 58 A 65 65 0 0 1 162 58 L 142 35 A 65 65 0 0 0 58 35 Z" fill="#10b981" fillOpacity="0.6" />
            <text x="100" y="48" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="black">🌤️ North Temperate Zone (Moderate)</text>

            {/* Torrid Zone */}
            <path d="M 38 102 A 65 65 0 0 1 162 102 L 162 58 A 65 65 0 0 0 38 58 Z" fill="#f59e0b" fillOpacity="0.7" />
            <text x="100" y="82" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="black">☀️ TORRID ZONE (Hottest!)</text>

            {/* South Temperate Zone */}
            <path d="M 58 125 A 65 65 0 0 1 142 125 L 162 102 A 65 65 0 0 0 38 102 Z" fill="#10b981" fillOpacity="0.6" />
            <text x="100" y="115" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="black">🌤️ South Temperate Zone (Moderate)</text>

            {/* Frigid Zone South */}
            <path d="M 58 125 A 65 65 0 0 0 142 125 Z" fill="#0284c7" fillOpacity="0.8" />
            <text x="100" y="138" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="black">❄️ South Frigid Zone (Freezing)</text>
          </svg>
          <span className="text-[10px] font-extrabold uppercase text-amber-300 tracking-wider">
            🌡️ Torrid (Hot), Temperate (Moderate), Frigid (Cold)
          </span>
        </div>
      );

    case "globe_axis":
      return (
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-sky-500/30 flex flex-col items-center space-y-2">
          <svg viewBox="0 0 200 160" className="w-full max-w-[220px] h-32">
            {/* Vertical Line */}
            <line x1="100" y1="10" x2="100" y2="150" stroke="#475569" strokeWidth="1" strokeDasharray="3 2" />
            <text x="102" y="15" fill="#94a3b8" fontSize="7">Vertical Line</text>

            {/* Tilted Axis Line */}
            <line x1="75" y1="10" x2="125" y2="150" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="60" y="15" fill="#f59e0b" fontSize="8" fontWeight="black">23½° Tilt ➔</text>

            {/* Globe Sphere */}
            <circle cx="100" cy="80" r="55" fill="#0f172a" fillOpacity="0.8" stroke="#38bdf8" strokeWidth="2" />
            <ellipse cx="100" cy="80" rx="55" ry="12" fill="none" stroke="#ef4444" strokeWidth="1.5" transform="rotate(-23.5 100 80)" />

            <text x="100" y="82" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontWeight="black">Orbital Angle = 66½°</text>
          </svg>
          <span className="text-[10px] font-extrabold uppercase text-sky-300 tracking-wider">
            🌍 Earth's axis is tilted at 23½° (Causes Seasons)
          </span>
        </div>
      );

    case "polar_circles":
      return (
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-indigo-500/30 flex flex-col items-center space-y-2">
          <svg viewBox="0 0 200 160" className="w-full max-w-[220px] h-32">
            <circle cx="100" cy="80" r="65" fill="#0f172a" stroke="#818cf8" strokeWidth="1.5" />

            {/* Arctic Circle */}
            <ellipse cx="100" cy="35" rx="42" ry="10" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <rect x="52" y="28" width="96" height="13" rx="3" fill="#0284c7" />
            <text x="100" y="37" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="black">Arctic Circle (66½° N)</text>

            {/* Antarctic Circle */}
            <ellipse cx="100" cy="125" rx="42" ry="10" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <rect x="48" y="118" width="104" height="13" rx="3" fill="#0284c7" />
            <text x="100" y="127" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="black">Antarctic Circle (66½° S)</text>
          </svg>
          <span className="text-[10px] font-extrabold uppercase text-indigo-300 tracking-wider">
            ❄️ 66½° N & 66½° S Polar Boundaries
          </span>
        </div>
      );

    case "idl_line":
      return (
        <div className="w-full bg-slate-900 rounded-xl p-3 border border-purple-500/30 flex flex-col items-center space-y-2">
          <svg viewBox="0 0 200 160" className="w-full max-w-[220px] h-32">
            {/* Background Ocean */}
            <rect x="20" y="15" width="160" height="130" rx="8" fill="#0369a1" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1" />
            <text x="40" y="30" fill="#93c5fd" fontSize="8" fontWeight="bold">WEST (-1 Day)</text>
            <text x="125" y="30" fill="#a7f3d0" fontSize="8" fontWeight="bold">EAST (+1 Day)</text>

            {/* Zig-Zag IDL Line */}
            <path d="M 100 15 L 100 40 L 115 50 L 115 75 L 90 90 L 90 115 L 100 125 L 100 145" fill="none" stroke="#f43f5e" strokeWidth="3" />
            <rect x="55" y="70" width="90" height="16" rx="4" fill="#be123c" />
            <text x="100" y="81" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="black">180° IDL (Zig-Zag Line)</text>
          </svg>
          <span className="text-[10px] font-extrabold uppercase text-purple-300 tracking-wider">
            📅 180° Meridian: Where calendar dates change!
          </span>
        </div>
      );

    default:
      return null;
  }
}
