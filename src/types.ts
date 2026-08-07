export interface Chapter {
  id: string;
  title: string;
  iconName: string;
  badge: string;
  topicSummary: string;
  colorClass: string;
  textColorClass: string;
  progress: number;
}

export interface SandharbaVakyam {
  vakyam: string;
  kavi: string;
  sandharbam: string;
  bhavam: string;
}

export interface LessonContent {
  chapterId: string;
  title: string;
  introduction: string;
  keyFormulas: { name: string; formula: string; explanation: string; image?: string; diagramType?: string }[];
  steps: { title: string; desc: string; example: string }[];
  didYouKnow: string;
  visualContext?: string;
  sandharbaVakyalu?: SandharbaVakyam[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string; // "A" | "B" | "C" | "D"
  hint: string;
  explanation: string;
}

export interface AssertionReasonQuestion {
  id: string;
  assertion: string;
  reason: string;
  options: string[];
  correctAnswer: "A" | "B" | "C" | "D" | string;
  hint?: string;
  explanation: string;
}

export interface ShortQuestion {
  id: string;
  question: string;
  answer: string;
  explanation: string;
  hint?: string;
}

export interface TopicQuizData {
  chapterId: string;
  chapterTitle: string;
  mcqs: QuizQuestion[];
  assertionReasons: AssertionReasonQuestion[];
  shortQuestions?: ShortQuestion[];
}

export interface Worksheet {
  title: string;
  chapter: string;
  problems: QuizQuestion[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

export interface StudentStats {
  scorePoints: number;
  completedQuizzes: number;
  streakDays: number;
  activeTutorSessions: number;
  solvedProblemsCount: number;
  unlockedBadges: string[];
}

export type MathToolType = "fraction" | "numberline" | "placevalue" | "perimeter";
