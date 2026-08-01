import React, { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, Award, FileText, ChevronRight, Eye, RefreshCw, Sparkles, BookOpen, Layers, Compass } from "lucide-react";

export interface QuestionPaperItem {
  id: number;
  section: "A" | "B" | "C" | "D" | "E";
  marks: number;
  questionText: string;
  type: "mcq" | "fill" | "descriptive" | "case_study";
  options?: string[];
  correctAnswer: string;
  explanation: string;
  diagramType?: "line_segments" | "sequence" | "ray" | "odd_square" | "angle_250" | "angles_intersect" | "garden_pattern";
}

export const GRADE_6_EXAM_QUESTIONS: QuestionPaperItem[] = [
  // SECTION A
  {
    id: 1,
    section: "A",
    marks: 1,
    questionText: "1. Find the number of line segments in the figure below: (Collinear points A, B, C, D)",
    type: "mcq",
    options: ["a) 5", "b) 6", "c) 8", "d) 7"],
    correctAnswer: "b",
    explanation: "Line segments formed by 4 collinear points A, B, C, D are: AB, AC, AD, BC, BD, CD. Using combinations: 4C2 = (4 × 3)/2 = 6 line segments.",
    diagramType: "line_segments"
  },
  {
    id: 2,
    section: "A",
    marks: 1,
    questionText: "2. The 10th number of the sequence 1, 3, 5, 7, 9, .... is _____",
    type: "mcq",
    options: ["a) 19", "b) 11", "c) 21", "d) 17"],
    correctAnswer: "a",
    explanation: "This is the sequence of consecutive odd numbers. The n-th term is given by formula (2n - 1). For n = 10: 2(10) - 1 = 20 - 1 = 19.",
    diagramType: "sequence"
  },
  {
    id: 3,
    section: "A",
    marks: 1,
    questionText: "3. Which of the following is NOT found in the given figure? (A ray starting at D and passing through E)",
    type: "mcq",
    options: ["a) Point", "b) Ray", "c) Line", "d) Line segment"],
    correctAnswer: "c",
    explanation: "The figure contains points D & E, ray DE (extending in one direction), and line segment DE. However, a 'Line' extends indefinitely in BOTH directions, which is NOT present.",
    diagramType: "ray"
  },
  {
    id: 4,
    section: "A",
    marks: 1,
    questionText: "4. The sum of the first four consecutive odd numbers is _____",
    type: "mcq",
    options: [
      "a) 4th number in cubed sequence",
      "b) 4th number in squared sequence",
      "c) 3rd number in triangular sequence",
      "d) 8th number in squared sequence"
    ],
    correctAnswer: "b",
    explanation: "1 + 3 + 5 + 7 = 16. Note that 16 = 4² (the 4th number in the squared sequence 1, 4, 9, 16...).",
    diagramType: "odd_square"
  },
  {
    id: 5,
    section: "A",
    marks: 1,
    questionText: "5. Assertion (A): A line contains a countless number of points.\nReason (R): Line extends indefinitely in both the directions.",
    type: "mcq",
    options: [
      "a) Both Assertion and Reason are true and Reason is the correct explanation of Assertion.",
      "b) Both Assertion and Reason are true but Reason is not the correct explanation of Assertion.",
      "c) Assertion is True and the Reason is False.",
      "d) Assertion is False and the Reason is True."
    ],
    correctAnswer: "a",
    explanation: "Because a line extends infinitely without endpoints in both directions, it naturally contains infinitely many (countless) points.",
    diagramType: "ray"
  },

  // SECTION B
  {
    id: 6,
    section: "B",
    marks: 1,
    questionText: "6. Two lines that intersect at 90° are called _______ lines.",
    type: "fill",
    correctAnswer: "perpendicular",
    explanation: "Lines intersecting at a right angle (90°) are defined as perpendicular lines."
  },
  {
    id: 7,
    section: "B",
    marks: 1,
    questionText: "7. There are _______ small triangles in the 6th stacked triangle sequence.",
    type: "fill",
    correctAnswer: "36",
    explanation: "The number of small triangles in the n-th stacked triangle sequence is n². For the 6th term: 6² = 36 small triangles."
  },
  {
    id: 8,
    section: "B",
    marks: 1,
    questionText: "8. A straight angle contains _______ right angles.",
    type: "fill",
    correctAnswer: "2",
    explanation: "A straight angle measures 180°. Since a right angle measures 90°, 180° ÷ 90° = 2 right angles."
  },
  {
    id: 9,
    section: "B",
    marks: 1,
    questionText: "9. The number of line(s) passing through two given points is _______.",
    type: "fill",
    correctAnswer: "1",
    explanation: "Through any two distinct points, exactly ONE unique straight line can pass."
  },
  {
    id: 10,
    section: "B",
    marks: 1,
    questionText: "10. Find the next number in the sequence: 4, 20, 100, 500, 2500, _______.",
    type: "fill",
    correctAnswer: "12500",
    explanation: "Each number is multiplied by 5: 4 × 5 = 20; 20 × 5 = 100; 100 × 5 = 500; 500 × 5 = 2500; 2500 × 5 = 12,500."
  },
  {
    id: 11,
    section: "B",
    marks: 1,
    questionText: "11. A _______ is the line that divides an angle into two equal parts.",
    type: "fill",
    correctAnswer: "angle bisector",
    explanation: "An angle bisector bisects an angle into two equal half-angles."
  },
  {
    id: 12,
    section: "B",
    marks: 1,
    questionText: "12. The initial point of ray PR (represented as →PR) is _______.",
    type: "fill",
    correctAnswer: "P",
    explanation: "A ray starting at P and extending endlessly through R has initial starting point P."
  },
  {
    id: 13,
    section: "B",
    marks: 1,
    questionText: "13. How many line segments does a heptagon (7-sided polygon) have?",
    type: "fill",
    correctAnswer: "7",
    explanation: "A polygon with n sides has exactly n boundary line segments. A heptagon has 7 line segments."
  },

  // SECTION C
  {
    id: 14,
    section: "C",
    marks: 2,
    questionText: "14. Each shelf in a library has 5 more books than the previous shelf. The first shelf has 10 books. Find the number of books on the 7th shelf and the 9th shelf.",
    type: "descriptive",
    correctAnswer: "40 books on 7th shelf, 50 books on 9th shelf",
    explanation: "Sequence formula: Books on n-th shelf = 10 + (n - 1) × 5.\n- 7th shelf = 10 + (6 × 5) = 10 + 30 = 40 books.\n- 9th shelf = 10 + (8 × 5) = 10 + 40 = 50 books."
  },
  {
    id: 15,
    section: "C",
    marks: 2,
    questionText: "15. Identify the number sequences shown below:\na) 1, 2, 4, 8, 16, ......\nb) 1, 2, 3, 5, 8, ......",
    type: "descriptive",
    correctAnswer: "a) Geometric sequence (Powers of 2) b) Fibonacci sequence",
    explanation: "a) Powers of 2 sequence: Each term doubles the previous term (×2).\nb) Fibonacci sequence: Each term is the sum of the two preceding terms (1+2=3, 2+3=5, 3+5=8)."
  },
  {
    id: 16,
    section: "C",
    marks: 2,
    questionText: "16. Name a ray and a line in an intersecting figure with points C, D, O, B.",
    type: "descriptive",
    correctAnswer: "Ray OB, Line CD",
    explanation: "Ray starts at origin O and extends through B (Ray OB). Line extends continuously through points C and D (Line CD)."
  },
  {
    id: 17,
    section: "C",
    marks: 3,
    questionText: "17. Identify the number sequence formed by adding counting numbers? Find the 6th term of the sequence formed.",
    type: "descriptive",
    correctAnswer: "Triangular numbers sequence, 6th term = 21",
    explanation: "Adding consecutive counting numbers: 1, 1+2=3, 3+3=6, 6+4=10, 10+5=15, 15+6=21. This forms the Triangular Numbers Sequence. The 6th term is 21."
  },
  {
    id: 18,
    section: "C",
    marks: 3,
    questionText: "18. Draw and label each accurately:\na) XY and XZ meet at X.\nb) AB and ST intersect at point O.\nc) Line l containing points A and C but not G.",
    type: "descriptive",
    correctAnswer: "Accurate geometric ray and line drawings",
    explanation: "a) Rays/segments XY and XZ share vertex X forming an angle.\nb) Line segment AB intersects ST at point O.\nc) Straight line labeled 'l' has points A and C on it, while point G lies outside line l."
  },
  {
    id: 19,
    section: "C",
    marks: 3,
    questionText: "19. Find the product of the 2nd and 4th hexagonal numbers.",
    type: "descriptive",
    correctAnswer: "168",
    explanation: "Hexagonal numbers formula: H_n = n(2n - 1).\n- 2nd hexagonal number H_2 = 2(2(2) - 1) = 2(3) = 6.\n- 4th hexagonal number H_4 = 4(2(4) - 1) = 4(7) = 28.\nProduct = 6 × 28 = 168."
  },
  {
    id: 20,
    section: "C",
    marks: 3,
    questionText: "20. If A = 1, B = 2, C = 3, D = 4, E = 5...... Then find the pattern of A, C, F, J, ____, ____.\na) What are the next two letters of the sequence?\nb) Name the sequence that the pattern follows.",
    type: "descriptive",
    correctAnswer: "a) O, U b) Triangular numbers sequence",
    explanation: "Alphabet positions: A = 1, C = 3 (+2), F = 6 (+3), J = 10 (+4).\nNext terms add +5 and +6:\n- 10 + 5 = 15 -> Letter O\n- 15 + 6 = 21 -> Letter U\nThe pattern follows the Triangular Numbers Sequence!"
  },

  // SECTION D
  {
    id: 21,
    section: "D",
    marks: 5,
    questionText: "21. Using pictorial representation, find the value of 1 + 3 + 5 + 7 + 9 + 11 without using addition. Name the number sequence it represents.",
    type: "descriptive",
    correctAnswer: "36 (Square numbers sequence)",
    explanation: "The sum of the first 6 consecutive odd numbers forms a 6 × 6 square array of dots. Value = 6² = 36. Sequence = Square Numbers Sequence."
  },
  {
    id: 22,
    section: "D",
    marks: 5,
    questionText: "22. Draw an angle 250° with arms EF and EG.",
    type: "descriptive",
    correctAnswer: "Reflex angle 250°",
    explanation: "An angle measuring 250° is greater than 180° but less than 360°, which makes it a Reflex Angle. Vertex is E, with arms EF and EG."
  },
  {
    id: 23,
    section: "D",
    marks: 5,
    questionText: "23. Observe the given geometry figure with line BER and ray ES, ET:\na) Identify the right angle that contains point B.\nb) Find the measure of ∠ SET.\nc) Find the measure of ∠ BET.",
    type: "descriptive",
    correctAnswer: "a) ∠ SEB (90°) b) 10° c) 100°",
    explanation: "a) Given perpendicular ray ES to line BR, ∠ SEB = 90° (Right angle containing point B).\nb) Given ∠ SER = 90° and ∠ TER = 80°, ∠ SET = ∠ SER - ∠ TER = 90° - 80° = 10°.\nc) ∠ BET = ∠ SEB + ∠ SET = 90° + 10° = 100°."
  },

  // SECTION E
  {
    id: 24,
    section: "E",
    marks: 4,
    questionText: "24. Case Study: A gardener is planting a flower garden. She decides to plant flowers in rows where the number of flowers follows a pattern: Row 1 = 1, Row 2 = 3, Row 3 = 9...\na) Follow the pattern and find the next two numbers in the pattern.\nb) How many total flowers will she have planted by the time she finishes the 6th row?\nc) If she continues this pattern, how many flowers will be planted in the 7th row?",
    type: "case_study",
    correctAnswer: "a) 27, 81 b) 364 flowers c) 729 flowers",
    explanation: "The pattern multiplies by 3 at each step (Powers of 3: 3^0 = 1, 3^1 = 3, 3^2 = 9...):\na) Next two row quantities: 3^3 = 27 and 3^4 = 81.\nb) Total flowers in 6 rows = 1 + 3 + 9 + 27 + 81 + 243 = 364 flowers.\nc) Flowers in 7th row = 3^6 = 729 flowers."
  }
];

export default function Grade6MathsPaper() {
  const [activeSection, setActiveSection] = useState<string>("ALL");
  const [userMcqAnswers, setUserMcqAnswers] = useState<Record<number, string>>({});
  const [userFillAnswers, setUserFillAnswers] = useState<Record<number, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});
  const [showAllSolutions, setShowAllSolutions] = useState<boolean>(false);

  const filteredQuestions = activeSection === "ALL" 
    ? GRADE_6_EXAM_QUESTIONS 
    : GRADE_6_EXAM_QUESTIONS.filter(q => q.section === activeSection);

  const handleMcqSelect = (qId: number, optLetter: string) => {
    setUserMcqAnswers(prev => ({ ...prev, [qId]: optLetter }));
  };

  const handleFillChange = (qId: number, val: string) => {
    setUserFillAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const toggleSolution = (qId: number) => {
    setRevealedSolutions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Calculate score for Section A & B
  const calculateMcqScore = () => {
    let score = 0;
    GRADE_6_EXAM_QUESTIONS.filter(q => q.type === "mcq").forEach(q => {
      if (userMcqAnswers[q.id] === q.correctAnswer) score += q.marks;
    });
    return score;
  };

  const calculateFillScore = () => {
    let score = 0;
    GRADE_6_EXAM_QUESTIONS.filter(q => q.type === "fill").forEach(q => {
      const userVal = (userFillAnswers[q.id] || "").trim().toLowerCase();
      const correctVal = q.correctAnswer.toLowerCase();
      if (userVal.includes(correctVal) || correctVal.includes(userVal) && userVal.length > 0) score += q.marks;
    });
    return score;
  };

  return (
    <div className="bg-white border-2 border-emerald-200 rounded-3xl p-6 shadow-md space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-800 to-slate-900 text-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              📄 Official Term Examination Question Paper
            </h2>
            <p className="text-xs text-emerald-100/80 mt-1 max-w-xl">
              Complete 3-page CBSE Mathematics Question Paper (50 Marks). Test line segments, angle bisectors, odd square patterns, triangular numbers, and exponential flower gardens!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setShowAllSolutions(!showAllSolutions)}
              className="w-full sm:w-auto px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
            >
              <Eye size={14} />
              {showAllSolutions ? "Hide Solutions" : "Show All Solutions & Steps"}
            </button>
          </div>
        </div>

        {/* Exam Quick Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-5 pt-4 border-t border-emerald-700/50 text-center">
          <div className="bg-white/10 backdrop-blur-xs p-2 rounded-lg">
            <div className="text-[10px] text-emerald-200 uppercase font-semibold">Total Time</div>
            <div className="text-xs font-black text-white">2 Hours</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-2 rounded-lg">
            <div className="text-[10px] text-emerald-200 uppercase font-semibold">Max Marks</div>
            <div className="text-xs font-black text-amber-300">50 Marks</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-2 rounded-lg">
            <div className="text-[10px] text-emerald-200 uppercase font-semibold">Sections</div>
            <div className="text-xs font-black text-white">A, B, C, D, E</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-2 rounded-lg">
            <div className="text-[10px] text-emerald-200 uppercase font-semibold">Auto-Grade Score</div>
            <div className="text-xs font-black text-emerald-300">{calculateMcqScore() + calculateFillScore()} / 13 Marks</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-2 rounded-lg col-span-2 sm:col-span-1">
            <div className="text-[10px] text-emerald-200 uppercase font-semibold">Curriculum</div>
            <div className="text-xs font-black text-white">CBSE / NCERT</div>
          </div>
        </div>
      </div>

      {/* Section Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: "ALL", label: "All Questions (1-24)" },
          { id: "A", label: "Section A (5 MCQs)" },
          { id: "B", label: "Section B (8 Fill Blanks)" },
          { id: "C", label: "Section C (3-Markers)" },
          { id: "D", label: "Section D (5-Markers)" },
          { id: "E", label: "Section E (Case Study)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
              activeSection === tab.id
                ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q) => {
          const isSolved = revealedSolutions[q.id] || showAllSolutions;
          const userMcq = userMcqAnswers[q.id];
          const userFill = userFillAnswers[q.id];

          return (
            <div
              key={q.id}
              className="p-5 bg-slate-50/70 border border-slate-200 rounded-2xl hover:border-emerald-300 transition space-y-4"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-black rounded-lg uppercase">
                    Section {q.section}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {q.marks} {q.marks === 1 ? "Mark" : "Marks"}
                  </span>
                </div>
                <button
                  onClick={() => toggleSolution(q.id)}
                  className="px-3 py-1 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-lg cursor-pointer transition flex items-center gap-1 shadow-xs"
                >
                  <Sparkles size={12} />
                  {isSolved ? "Hide Solution" : "View Solution"}
                </button>
              </div>

              {/* Question Text */}
              <p className="text-sm font-bold text-slate-800 whitespace-pre-line leading-relaxed">
                {q.questionText}
              </p>

              {/* Custom Diagrams for Exam Paper */}
              {q.diagramType === "line_segments" && (
                <div className="p-4 bg-white border border-slate-200 rounded-xl my-2 flex flex-col items-center justify-center">
                  <div className="text-[11px] text-slate-500 font-semibold mb-2">Collinear Line Diagram</div>
                  <div className="relative w-64 h-12 flex items-center justify-between px-4">
                    <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-800 transform -translate-y-1/2" />
                    {["A", "B", "C", "D"].map((pt, idx) => (
                      <div key={idx} className="relative z-10 flex flex-col items-center">
                        <div className="w-3 h-3 bg-emerald-600 border-2 border-white rounded-full" />
                        <span className="text-xs font-black text-slate-800 mt-1">{pt}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium mt-1">
                    6 Line Segments: AB, AC, AD, BC, BD, CD
                  </div>
                </div>
              )}

              {q.diagramType === "odd_square" && (
                <div className="p-4 bg-white border border-slate-200 rounded-xl my-2 flex flex-col items-center justify-center">
                  <div className="text-[11px] text-slate-500 font-semibold mb-2">4 × 4 Odd Square Grid (1 + 3 + 5 + 7 = 16 = 4²)</div>
                  <div className="grid grid-cols-4 gap-1.5 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-[9px] font-bold text-white">
                        •
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {q.diagramType === "ray" && (
                <div className="p-3 bg-white border border-slate-200 rounded-xl my-2 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-slate-800 rounded-full" />
                      <span className="text-xs font-bold">D</span>
                    </div>
                    <div className="h-0.5 w-24 bg-slate-800 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-8 border-l-slate-800" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-slate-800 rounded-full" />
                      <span className="text-xs font-bold">E</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2">Ray starting at D extending indefinitely through E (Ray DE)</span>
                </div>
              )}

              {/* Input for MCQ */}
              {q.type === "mcq" && q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt, idx) => {
                    const letter = opt.trim().charAt(0);
                    const isSelected = userMcq === letter;
                    const isCorrect = letter === q.correctAnswer;

                    let btnStyle = "bg-white border-slate-200 text-slate-700 hover:bg-slate-100";
                    if (isSelected) {
                      btnStyle = isCorrect
                        ? "bg-emerald-100 border-emerald-500 text-emerald-900 font-bold"
                        : "bg-rose-100 border-rose-400 text-rose-900 font-bold";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleMcqSelect(q.id, letter)}
                        className={`p-3 rounded-xl border text-xs text-left transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isSelected && isCorrect && <CheckCircle2 size={14} className="text-emerald-600" />}
                        {isSelected && !isCorrect && <XCircle size={14} className="text-rose-600" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Input for Fill in the Blank */}
              {q.type === "fill" && (
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={userFill || ""}
                    onChange={(e) => handleFillChange(q.id, e.target.value)}
                    placeholder="Type your answer here..."
                    className="px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs w-full max-w-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  {userFill && (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 size={14} /> Saved
                    </span>
                  )}
                </div>
              )}

              {/* Solution Box */}
              {isSolved && (
                <div className="p-4 bg-emerald-50/90 border border-emerald-300 rounded-xl space-y-2 text-xs text-emerald-950 animate-fade-in">
                  <div className="font-black text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600" /> Correct Answer:{" "}
                    <span className="uppercase text-emerald-900 font-extrabold">{q.correctAnswer}</span>
                  </div>
                  <div className="text-slate-700 leading-relaxed font-medium">
                    <span className="font-bold text-slate-900">Step-by-step Solution:</span>
                    <p className="mt-1">{q.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
