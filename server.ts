import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize the Google GenAI SDK to prevent startup crashes if key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("Warning: GEMINI_API_KEY is not set. AI Tutor 'Ganit Mitra' will operate in interactive fallback mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. AI Math Tutor Endpoint: "Ganit Mitra"
app.post("/api/math-tutor", async (req, res) => {
  const { message, chatHistory, chapterContext, mathToolContext } = req.body;
  
  const client = getAiClient();
  if (!client) {
    // Elegant educational fallback when key is not yet set
    const fallbackResponse = getFallbackTutorResponse(message, chapterContext, mathToolContext);
    return res.json({ response: fallbackResponse });
  }

  try {
    const formattedHistory = (chatHistory || []).map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.text }]
    }));

    // System instruction specifically designed to teach Grade 6 students (11-12 years old) CBSE Mathematics
    const systemInstruction = `You are "Ganit Mitra" (Math Friend), an empathetic, cheerful, and expert math tutor for Grade 6 students in India following the CBSE syllabus.
Your goal is to guide students to understand math concepts step-by-step rather than just giving the answer immediately.
Follow these teaching principles:
1. Speak in a friendly, encouraging, and clear tone appropriate for an 11-12 year old. Use Indian classroom examples (e.g., sharing chapatis for fractions, buying cricket balls or notebooks for algebra, measuring a study table for perimeter).
2. Format equations, fractions, and steps clearly. Use bullet points and spacing to make explanations easy to read. Use Markdown like "1/2" or clean visual fractions.
3. Break down complex calculations. If a student makes a mistake, gently point it out and help them find the correct path.
4. Relate answers back to standard CBSE Grade 6 concepts (such as Whole Numbers, Playing with Numbers, Fractions, Decimals, Integers, Algebra, Mensuration, Ratio & Proportion).
Current student focus:
- Chapter/Topic: ${chapterContext || "General Grade 6 Mathematics"}
- Visual Tool context active: ${mathToolContext || "None"}`;

    const contents = [
      ...formattedHistory,
      { role: "user", parts: [{ text: message }] }
    ];

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ response: response.text || "I was thinking, but my mind wandered. Could you ask again?" });
  } catch (error: any) {
    console.error("Gemini API Error in Tutor:", error);
    res.status(500).json({ 
      error: "Tutor is temporarily offline", 
      response: "Oh! It seems my chalk broke. 🖍️ Let's try that again. Here is a helpful tip: in Grade 6 math, breaking down problems into smaller blocks or drawing a diagram always helps! Can you try explaining what you want to solve?" 
    });
  }
});

// 2. Custom CBSE Worksheet Generator
app.post("/api/generate-worksheet", async (req, res) => {
  const { chapter, attempt } = req.body;
  const client = getAiClient();
  const currentAttempt = Number(attempt) || 0;
  
  if (!client) {
    // Generate high-quality predefined CBSE worksheet questions
    const fallbackWorksheet = getPredefinedWorksheet(chapter || "Fractions", currentAttempt);
    return res.json(fallbackWorksheet);
  }

  try {
    const numQuestions = 20;
    const prompt = `Generate a CBSE Grade 6 Mathematics practice worksheet of exactly ${numQuestions} interesting questions for the chapter: "${chapter}".
IMPORTANT: The questions MUST be strictly ordered by increasing difficulty from beginner to expert:
- Questions 1 to 7: Beginner level (Fundamental concepts, simple visualizations, very easy)
- Questions 8 to 14: Intermediate level (Simple calculations, application of rules, medium difficulty)
- Questions 15 to 20: Expert level (Challenging word problems, multi-step calculations, higher-order thinking)

Make sure questions are tailored to Grade 6 curriculum standard, including a mix of basic conceptual questions, simple calculations, and relatable Indian school/classroom examples.
${currentAttempt > 0 ? `IMPORTANT: This is attempt #${currentAttempt + 1} (a retake) for this student. You MUST generate a COMPLETELY NEW and DIFFERENT set of exactly ${numQuestions} questions than previous attempts, varying the numbers, real-world context, and sub-topics to keep the worksheet fresh, challenging, and educational. Make sure none of the questions are identical to previous attempts.` : ""}
Provide:
- A title (e.g. "${chapter} - Progressive Practice Sheet")
- ${numQuestions} problems, each with:
  - id (1 to ${numQuestions})
  - question text
  - 4 options (A, B, C, D)
  - correctAnswer (exactly A, B, C, or D)
  - hint (a short, encouraging clue)
  - explanation (step-by-step, easy to understand)`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a professional CBSE mathematics curriculum developer for secondary schools in India.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            chapter: { type: Type.STRING },
            problems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctAnswer: { type: Type.STRING, description: "Exactly A, B, C, or D" },
                  hint: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ["id", "question", "options", "correctAnswer", "hint", "explanation"]
              }
            }
          },
          required: ["title", "chapter", "problems"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    // Ensure we actually got 20 questions; otherwise, pad them with fallback
    if (data && data.problems && data.problems.length < 20) {
      console.warn(`Generated worksheet had only ${data.problems.length} questions. Padding to 20...`);
      const fallback = getPredefinedWorksheet(chapter || "Fractions", currentAttempt);
      while (data.problems.length < 20) {
        const extraProb = fallback.problems[data.problems.length % fallback.problems.length];
        data.problems.push({
          ...extraProb,
          id: String(data.problems.length + 1)
        });
      }
    }
    res.json(data);
  } catch (error: any) {
    console.error("Gemini API Error in Worksheet:", error);
    // Fallback to our high-quality predefined database
    res.json(getPredefinedWorksheet(chapter || "Fractions", currentAttempt));
  }
});

// Fallback logic for AI Tutor when API key is not present or offline
function getFallbackTutorResponse(message: string, chapter: string, toolContext: string): string {
  const msg = message.toLowerCase();
  
  if (msg.includes("fraction")) {
    return `### 🍕 Understanding Fractions with Ganit Mitra!
A fraction represents a part of a whole. 
* The **Numerator** (top number) tells us how many parts we have.
* The **Denominator** (bottom number) tells us how many equal parts the whole is divided into.

**For example:** If you divide a pizza into **8 equal slices** and eat **3 slices**, you have eaten **3/8** of the pizza! Remaining is **5/8**.

Do you want to practice converting improper fractions (like 7/3) to mixed numbers (like 2 1/3)? Just let me know!`;
  }
  
  if (msg.includes("decimal")) {
    return `### 🪙 Fun with Decimals!
Decimals are another way of writing fractions with denominators like 10, 100, 1000, etc.
* **Tenths place (0.1)** represents 1/10th.
* **Hundredths place (0.01)** represents 1/100th.

**Indian Rupee Example:** 1 Rupee = 100 Paise. So, 50 Paise is 50/100 of a rupee, which we write as **₹0.50**. 

How can I help you with decimal addition, subtraction, or place values today?`;
  }

  if (msg.includes("algebra") || msg.includes("variable")) {
    return `### 🔍 Welcome to Algebra - The Mystery Numbers!
In Algebra, we use letters (like $x, y, a, b$) to stand for numbers that we do not know yet. These letters are called **variables** because their values can vary (change)!

**Matchstick Pattern Example:**
To make 1 letter 'L' you need **2 matchsticks**.
To make 2 letters 'L' you need **4 matchsticks**.
To make $n$ letters 'L', you need **$2n$ matchsticks**!
Here, $n$ is a variable, and $2n$ is an algebraic expression.

Tell me a problem you are trying to solve, and we will decode it together!`;
  }

  if (msg.includes("hcf") || msg.includes("lcm") || msg.includes("factor")) {
    return `### 🔢 Master of HCF and LCM!
Let's crack HCF and LCM:
* **HCF (Highest Common Factor):** The largest number that divides two or more numbers exactly. (Example: HCF of 12 and 18 is **6**).
* **LCM (Lowest Common Multiple):** The smallest number which is a multiple of two or more numbers. (Example: LCM of 4 and 6 is **12**).

**Try this trick:** Prime factorization is your superpower! Break down the numbers into prime factors (like 2, 3, 5, 7) first. 

Do you have a specific HCF or LCM question? Share it with me!`;
  }

  if (msg.includes("geometry") || msg.includes("angle") || msg.includes("line")) {
    return `### 📐 Exploring Geometrical Ideas!
In Grade 6, we learn about the building blocks of geometry:
1. **Point:** A tiny dot showing a exact position. It has no size!
2. **Line Segment:** The shortest path between two points (has fixed length, e.g., segment $AB$).
3. **Line:** A line segment extended endlessly in both directions (no fixed length!).
4. **Ray:** Starts at one point and goes forever in one direction (like a sunray).

What geometry concept or shape classification are you studying? Let's discuss!`;
  }

  return `### Hello young mathematician! 🌟 
I am **Ganit Mitra**, your Grade 6 CBSE Math buddy! 

I can help you understand:
1. **Fractions & Decimals** (using food and money examples!)
2. **Integers** (climbing stairs and diving underwater!)
3. **Algebra** (matchstick patterns and secret formulas!)
4. **HCF, LCM, and Playing with Numbers**
5. **Mensuration** (finding perimeters of cricket fields!)

*Tip: Type "fraction", "decimal", "algebra", "HCF LCM", or "geometry" to get specific, beautifully illustrated lesson bytes, or ask me any question!*`;
}

// Fallback worksheet generators for Grade 1
function getCountingFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "How many apples are there? 🍎 🍎 🍎",
      options: ["A) 2", "B) 3", "C) 4", "D) 5"],
      correctAnswer: "B",
      hint: "Point and count them: One, Two, Three!",
      explanation: "There are three apples. So the count is 3."
    },
    {
      id: "2",
      question: "What comes right after 4?",
      options: ["A) 3", "B) 5", "C) 6", "D) 2"],
      correctAnswer: "B",
      hint: "Count in order: 1, 2, 3, 4, ...",
      explanation: "The number 5 comes right after 4."
    },
    {
      id: "3",
      question: "If you have 0 candies, how many candies do you have?",
      options: ["A) No candies", "B) 1 candy", "C) 2 candies", "D) 10 candies"],
      correctAnswer: "A",
      hint: "Zero means nothing or empty.",
      explanation: "Zero represents empty or having nothing, so you have no candies."
    },
    {
      id: "4",
      question: "Count the stars: ⭐ ⭐ ⭐ ⭐ ⭐",
      options: ["A) 3", "B) 4", "C) 5", "D) 6"],
      correctAnswer: "C",
      hint: "Count them slowly one by one.",
      explanation: "There are exactly five stars."
    }
  ];
}

function getShapesFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "Which shape is round like a coin or a roti?",
      options: ["A) Square", "B) Triangle", "C) Circle", "D) Rectangle"],
      correctAnswer: "C",
      hint: "Coins and rotis have no straight sides; they are round.",
      explanation: "A circle is perfectly round, just like a coin or a roti."
    },
    {
      id: "2",
      question: "How many corners does a triangle 🔺 have?",
      options: ["A) 2", "B) 3", "C) 4", "D) 5"],
      correctAnswer: "B",
      hint: "Count the sharp points at the edges.",
      explanation: "A triangle has three straight sides and three corners."
    }
  ];
}

function getMeasurementsFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "A giraffe is _____ than a rabbit.",
      options: ["A) Shorter", "B) Taller", "C) Lighter", "D) Same height"],
      correctAnswer: "B",
      hint: "Think about who can reach the leaves on tall trees.",
      explanation: "A giraffe is a very tall animal, while a rabbit is short. So, the giraffe is taller."
    },
    {
      id: "2",
      question: "Which object is heavier than a feather?",
      options: ["A) A bubble", "B) A school bag full of books", "C) A single leaf", "D) A piece of paper"],
      correctAnswer: "B",
      hint: "Which one would be harder to lift?",
      explanation: "A school bag full of books weighs much more than a light feather."
    }
  ];
}

function getClockFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "Which hand on the clock shows the HOURS? ⏰",
      options: ["A) The long hand", "B) The short hand", "C) The fast hand", "D) None of them"],
      correctAnswer: "B",
      hint: "It moves slowly and is shorter.",
      explanation: "On a clock, the short hand is the hour hand, and the long hand is the minute hand."
    },
    {
      id: "2",
      question: "If the short hand is pointing at 3, and the long hand is pointing at 12, what time is it?",
      options: ["A) 12 o'clock", "B) 3 o'clock", "C) 6 o'clock", "D) 1 o'clock"],
      correctAnswer: "B",
      hint: "The short hand tells the hour. Since the long hand is at 12, it is exactly that hour!",
      explanation: "When the minute (long) hand is at 12 and the hour (short) hand is at 3, the time is exactly 3:00 or 3 o'clock."
    },
    {
      id: "3",
      question: "How many minutes are there in 1 full hour? ⏳",
      options: ["A) 12 minutes", "B) 30 minutes", "C) 60 minutes", "D) 100 minutes"],
      correctAnswer: "C",
      hint: "The long hand goes all the way around, which takes sixty steps.",
      explanation: "There are exactly 60 minutes in one hour."
    },
    {
      id: "4",
      question: "If the long hand points to 6, it is half-past. How many minutes is that?",
      options: ["A) 15 minutes", "B) 30 minutes", "C) 45 minutes", "D) 60 minutes"],
      correctAnswer: "B",
      hint: "It is half of 60 minutes.",
      explanation: "Half-past means half of an hour, which is 30 minutes."
    }
  ];
}

function getCompareFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "Which sign means 'Greater Than'? (The alligator mouth opens to the left!) 🐊",
      options: ["A) <", "B) >", "C) =", "D) +"],
      correctAnswer: "B",
      hint: "The open mouth points to the bigger number on the left.",
      explanation: "The '>' symbol represents 'Greater Than' because the open side faces the larger number on the left."
    },
    {
      id: "2",
      question: "Fill in the blank: 8 _____ 5",
      options: ["A) <", "B) >", "C) =", "D) -"],
      correctAnswer: "B",
      hint: "Is 8 bigger or smaller than 5?",
      explanation: "8 is larger than 5, so we use the Greater Than symbol: 8 > 5."
    },
    {
      id: "3",
      question: "Fill in the blank: 3 _____ 7",
      options: ["A) <", "B) >", "C) =", "D) +"],
      correctAnswer: "A",
      hint: "3 is smaller than 7, so the pointy end of the arrow points at 3.",
      explanation: "3 is smaller than 7, so we use the Less Than symbol: 3 < 7."
    },
    {
      id: "4",
      question: "If there are 4 apples on the left and 4 apples on the right, which symbol do we use?",
      options: ["A) <", "B) >", "C) =", "D) /"],
      correctAnswer: "C",
      hint: "Both groups have the exact same number of apples!",
      explanation: "Since both quantities are the same (4 and 4), they are equal, so we use: 4 = 4."
    }
  ];
}

function getEvsFamilyFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "Which organ helps us to see the beautiful colors of a rainbow? 🌈",
      options: ["A) Nose", "B) Ears", "C) Eyes", "D) Tongue"],
      correctAnswer: "C",
      hint: "Blink them to see!",
      explanation: "We use our eyes to see colors, objects, and people around us."
    },
    {
      id: "2",
      question: "Who are our parents? 👨‍👩‍👧",
      options: ["A) Friends", "B) Father and Mother", "C) Uncles", "D) Teachers"],
      correctAnswer: "B",
      hint: "They care for you at home.",
      explanation: "Our father and mother are together called our parents."
    }
  ];
}

function getEvsAnimalsFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "Which of these animals lives in our home as a pet? 🐶",
      options: ["A) Lion", "B) Tiger", "C) Dog", "D) Bear"],
      correctAnswer: "C",
      hint: "It barks and wags its tail!",
      explanation: "A dog is a friendly pet animal that lives with us in our home."
    }
  ];
}

function getEvsSeasonsFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "In which season do we wear warm woolen sweaters and jackets? ❄️",
      options: ["A) Summer", "B) Winter", "C) Rainy", "D) Autumn"],
      correctAnswer: "B",
      hint: "We wear them when it is very cold.",
      explanation: "We wear woolen clothes in the Winter season to keep our bodies warm."
    }
  ];
}

function getTeluguAchuluFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "'అ' అక్షరంతో మొదలయ్యే పదం ఏది?",
      options: ["A) ఆవు", "B) ఇల్లు", "C) అమ్మ", "D) ఈల"],
      correctAnswer: "C",
      hint: "The person who loves you the most!",
      explanation: "అక్షరం 'అ' తో 'అమ్మ' అనే పదం మొదలవుతుంది."
    }
  ];
}

function getTeluguWordsFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "'ఆట' అనే పదంలో ఎన్ని అక్షరాలు ఉన్నాయి?",
      options: ["A) 1", "B) 2", "C) 3", "D) 4"],
      correctAnswer: "B",
      hint: "Count them: ఆ... ట...",
      explanation: "'ఆట' అనే పదం లో రెండు అక్షరాలు (ఆ, ట) ఉన్నాయి."
    }
  ];
}

function getHindiSwarFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "'अ' से शुरू होने वाला फल कौन सा है?",
      options: ["A) आम", "B) अनार", "C) इमली", "D) अंगूर"],
      correctAnswer: "B",
      hint: "It has sweet red seeds inside!",
      explanation: "'अ' से 'अनार' होता है।"
    }
  ];
}

function getHindiFruitsFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "फलों का राजा किसे कहा जाता है? 🥭",
      options: ["A) सेब", "B) केला", "C) आम", "D) संतरा"],
      correctAnswer: "C",
      hint: "Yellow, sweet, and juice-rich summer fruit!",
      explanation: "आम (Mango) को फलों का राजा कहा जाता है।"
    }
  ];
}

function getHindiGinteeFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "हिंदी गिनती में '3' को क्या कहते हैं?",
      options: ["A) एक", "B) दो", "C) तीन", "D) चार"],
      correctAnswer: "C",
      hint: "It comes after do (two).",
      explanation: "'3' को हिंदी में 'तीन' कहते हैं।"
    }
  ];
}

function getEnglishAlphabetFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "Which baby letter goes with Capital 'A'?",
      options: ["A) b", "B) d", "C) a", "D) c"],
      correctAnswer: "C",
      hint: "Small letter 'a'!",
      explanation: "The small (lowercase) form of Capital 'A' is 'a'."
    }
  ];
}

function getEnglishNounsFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "Which of the following is a naming word for a PLACE?",
      options: ["A) Teacher", "B) School", "C) Book", "D) Dog"],
      correctAnswer: "B",
      hint: "A building where you go to learn!",
      explanation: "School is a place, so it is a naming word for a place."
    }
  ];
}

function getEnglishVerbsFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "Identify the action word in: 'The frog can jump.' 🐸",
      options: ["A) Frog", "B) The", "C) Jump", "D) Can"],
      correctAnswer: "C",
      hint: "What is the frog doing?",
      explanation: "Jump is a doing word, which means it is an action word."
    }
  ];
}

// Fallback worksheet generators for Grade 9
function getRealNumbersFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "Which of the following is an irrational number?",
      options: ["A) √4", "B) 3/5", "C) √2", "D) 0.25"],
      correctAnswer: "C",
      hint: "Irrational numbers cannot be written as a simple fraction, and their square roots are not perfect squares.",
      explanation: "√2 is non-terminating and non-repeating, hence irrational. √4 = 2, which is rational."
    },
    {
      id: "2",
      question: "What is the rationalized form of 1 / √3?",
      options: ["A) √3", "B) √3 / 3", "C) 3 / √3", "D) 1/3"],
      correctAnswer: "B",
      hint: "Multiply both numerator and denominator by √3.",
      explanation: "(1 * √3) / (√3 * √3) = √3 / 3."
    }
  ];
}

function getPolynomialsFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "What is the degree of the polynomial 4x³ + 2x² - 5?",
      options: ["A) 2", "B) 3", "C) 1", "D) 0"],
      correctAnswer: "B",
      hint: "The degree is the highest power of the variable x.",
      explanation: "The highest power of x is 3, so the degree of the polynomial is 3."
    },
    {
      id: "2",
      question: "Expand: (x + 3)²",
      options: ["A) x² + 9", "B) x² + 6x + 9", "C) x² + 3x + 9", "D) x² + 6x + 6"],
      correctAnswer: "B",
      hint: "Use the identity (a + b)² = a² + 2ab + b².",
      explanation: "(x + 3)² = x² + 2(x)(3) + 3² = x² + 6x + 9."
    }
  ];
}

function getCoordinateFallback(attempt: number): any[] {
  return [
    {
      id: "1",
      question: "In which quadrant does the point (-2, 5) lie?",
      options: ["A) Quadrant I", "B) Quadrant II", "C) Quadrant III", "D) Quadrant IV"],
      correctAnswer: "B",
      hint: "The x-coordinate is negative (-) and the y-coordinate is positive (+).",
      explanation: "Quadrant II contains points with negative x and positive y coordinates."
    },
    {
      id: "2",
      question: "What are the coordinates of the origin?",
      options: ["A) (1, 1)", "B) (0, 1)", "C) (0, 0)", "D) (-1, -1)"],
      correctAnswer: "C",
      hint: "The origin is where the two axes intersect.",
      explanation: "The origin has coordinates (0, 0)."
    }
  ];
}

// Predefined NCERT math worksheets containing progressive questions from beginner to expert
function getPredefinedWorksheet(chapter: string, attempt: number = 0) {
  const lowercaseChapter = chapter.toLowerCase();
  let title = `${chapter} - Progressive Practice Sheet`;
  let problems: any[] = [];

  if (lowercaseChapter.includes("fraction")) {
    title = "Fractions Mastery - 20 Progressive Questions";
    problems = getFractionsFallback(attempt);
  } else if (lowercaseChapter.includes("decimal")) {
    title = "Decimals Mastery - 20 Progressive Questions";
    problems = getDecimalsFallback(attempt);
  } else if (lowercaseChapter.includes("algebra") || lowercaseChapter.includes("equation")) {
    title = "Algebra Mastery - 20 Progressive Questions";
    problems = getAlgebraFallback(attempt);
  } else if (lowercaseChapter.includes("body") || lowercaseChapter.includes("family") || lowercaseChapter.includes("evs_family")) {
    title = "EVS: My Body & Family - Playful Worksheet";
    problems = getEvsFamilyFallback(attempt);
  } else if (lowercaseChapter.includes("animal") || lowercaseChapter.includes("evs_animals")) {
    title = "EVS: Animal World - Discovery Worksheet";
    problems = getEvsAnimalsFallback(attempt);
  } else if (lowercaseChapter.includes("season") || lowercaseChapter.includes("weather") || lowercaseChapter.includes("evs_seasons")) {
    title = "EVS: Seasons & Weather - Exploration Worksheet";
    problems = getEvsSeasonsFallback(attempt);
  } else if (lowercaseChapter.includes("achulu") || lowercaseChapter.includes("vowels")) {
    title = "Telugu: అచ్చులు - తెలుగు వర్క్‌షీట్";
    problems = getTeluguAchuluFallback(attempt);
  } else if (lowercaseChapter.includes("పదాలు") || lowercaseChapter.includes("words") || lowercaseChapter.includes("tel_words")) {
    title = "Telugu: తెలుగు పదాలు - సరళ పదాల వర్క్‌షీట్";
    problems = getTeluguWordsFallback(attempt);
  } else if (lowercaseChapter.includes("swar") || lowercaseChapter.includes("vyanjan") || lowercaseChapter.includes("alphabet")) {
    title = "Hindi/English: स्वर और व्यंजन / Alphabets";
    problems = lowercaseChapter.includes("swar") ? getHindiSwarFallback(attempt) : getEnglishAlphabetFallback(attempt);
  } else if (lowercaseChapter.includes("फल") || lowercaseChapter.includes("फूल") || lowercaseChapter.includes("fruit")) {
    title = "Hindi: फलों और फूलों के नाम - सुंदर चित्रपहेली";
    problems = getHindiFruitsFallback(attempt);
  } else if (lowercaseChapter.includes("गिनती") || lowercaseChapter.includes("gintee") || lowercaseChapter.includes("counting") || lowercaseChapter.includes("g1_counting") || lowercaseChapter.includes("ginti")) {
    if (lowercaseChapter.includes("गिनती") || lowercaseChapter.includes("gintee")) {
      title = "Hindi: गिनती (1-10) - गिनना सीखें";
      problems = getHindiGinteeFallback(attempt);
    } else {
      title = "Grade 1 Basic Counting - Playful Worksheet";
      problems = getCountingFallback(attempt);
    }
  } else if (lowercaseChapter.includes("shapes") || lowercaseChapter.includes("pattern") || lowercaseChapter.includes("g1_shapes")) {
    title = "Grade 1 Shapes & Patterns - Creative Worksheet";
    problems = getShapesFallback(attempt);
  } else if (lowercaseChapter.includes("measurement") || lowercaseChapter.includes("g1_comparison") || lowercaseChapter.includes("comparison")) {
    title = "Grade 1 Basic Measurements - Hands-on Worksheet";
    problems = getMeasurementsFallback(attempt);
  } else if (lowercaseChapter.includes("clock") || lowercaseChapter.includes("time") || lowercaseChapter.includes("g1_clock")) {
    title = "Grade 1 Clock Reading - Tick Tock Worksheet";
    problems = getClockFallback(attempt);
  } else if (lowercaseChapter.includes("compare") || lowercaseChapter.includes("g1_compare")) {
    title = "Grade 1 Number Comparison - Playful Worksheet";
    problems = getCompareFallback(attempt);
  } else if (lowercaseChapter.includes("noun") || lowercaseChapter.includes("naming") || lowercaseChapter.includes("nouns")) {
    title = "English: Naming Words - Noun Worksheet";
    problems = getEnglishNounsFallback(attempt);
  } else if (lowercaseChapter.includes("verb") || lowercaseChapter.includes("action")) {
    title = "English: Action Words - Activity Worksheet";
    problems = getEnglishVerbsFallback(attempt);
  } else if (lowercaseChapter.includes("g9_numbersystems") || lowercaseChapter.includes("real number")) {
    title = "Grade 9 Real Number Systems - Advanced Worksheet";
    problems = getRealNumbersFallback(attempt);
  } else if (lowercaseChapter.includes("polynomial") || lowercaseChapter.includes("g9_polynomials")) {
    title = "Grade 9 Polynomials - Identity Worksheet";
    problems = getPolynomialsFallback(attempt);
  } else if (lowercaseChapter.includes("coordinate") || lowercaseChapter.includes("g9_coordinate")) {
    title = "Grade 9 Coordinate Geometry - Cartesian Worksheet";
    problems = getCoordinateFallback(attempt);
  } else if (lowercaseChapter.includes("system") || lowercaseChapter.includes("number") || lowercaseChapter.includes("knowing")) {
    title = "Number System Mastery - 20 Progressive Questions";
    problems = getNumberSystemFallback(attempt);
  } else {
    title = "Whole Numbers & Integers - 20 Progressive Questions";
    problems = getIntegersFallback(attempt);
  }

  return { title, chapter, problems };
}

// Fractions fallback data generator
function getFractionsFallback(attempt: number): any[] {
  const baseVal = (attempt * 2) % 5; // adds simple variations
  return [
    // BEGINNER (1-7)
    {
      id: "1",
      question: `Ramu has a chocolate bar with ${12 + baseVal} equal pieces. He gives 5 pieces to his sister Shreya. What fraction of the chocolate bar is left with Ramu?`,
      options: [`A) 5/${12 + baseVal}`, `B) ${7 + baseVal}/${12 + baseVal}`, "C) 1/2", `D) ${12 + baseVal}/5`],
      correctAnswer: "B",
      hint: "Subtract the given pieces from the total to find how many pieces are left.",
      explanation: `Total pieces = ${12 + baseVal}. Pieces given = 5. Left = ${12 + baseVal} - 5 = ${7 + baseVal}. So the fraction left is ${7 + baseVal}/${12 + baseVal}.`
    },
    {
      id: "2",
      question: "Which of the following is an improper fraction?",
      options: ["A) 3/4", "B) 7/8", "C) 9/5", "D) 1/10"],
      correctAnswer: "C",
      hint: "An improper fraction is one where the numerator (top) is greater than or equal to the denominator (bottom).",
      explanation: "In 9/5, the numerator (9) is greater than the denominator (5), making it an improper fraction."
    },
    {
      id: "3",
      question: `Identify the fraction represented by ${3 + baseVal} green balls out of ${10 + baseVal} total balls.`,
      options: [`A) ${10 + baseVal}/${3 + baseVal}`, `B) ${3 + baseVal}/${10 + baseVal}`, "C) 1/2", "D) 3/10"],
      correctAnswer: "B",
      hint: "The number of green balls goes on top (numerator) and total balls at the bottom (denominator).",
      explanation: `We have ${3 + baseVal} green balls out of ${10 + baseVal} total. The fraction is ${3 + baseVal}/${10 + baseVal}.`
    },
    {
      id: "4",
      question: "Convert the improper fraction 13/4 into a mixed fraction.",
      options: ["A) 3 1/4", "B) 4 1/3", "C) 3 3/4", "D) 2 1/4"],
      correctAnswer: "A",
      hint: "Divide 13 by 4. The quotient is the whole number, the remainder is the numerator.",
      explanation: "13 divided by 4 gives a quotient of 3 and a remainder of 1. Hence, 3 1/4."
    },
    {
      id: "5",
      question: "Convert the mixed fraction 2 3/5 into an improper fraction.",
      options: ["A) 10/5", "B) 13/5", "C) 17/5", "D) 11/5"],
      correctAnswer: "B",
      hint: "Multiply the whole number (2) by the denominator (5), add the numerator (3), and place it over the denominator.",
      explanation: "(2 × 5) + 3 = 10 + 3 = 13. So, the improper fraction is 13/5."
    },
    {
      id: "6",
      question: "What fraction of a week is represented by 3 days?",
      options: ["A) 1/7", "B) 3/7", "C) 7/3", "D) 3/30"],
      correctAnswer: "B",
      hint: "How many days are there in a week? That goes in the denominator.",
      explanation: "There are 7 days in a week. So 3 days represent 3/7 of a week."
    },
    {
      id: "7",
      question: "Which of these is a proper fraction?",
      options: ["A) 7/7", "B) 8/5", "C) 12/11", "D) 5/6"],
      correctAnswer: "D",
      hint: "A proper fraction has a numerator strictly smaller than its denominator.",
      explanation: "In 5/6, 5 < 6, so it is a proper fraction. All other options have numerator ≥ denominator."
    },
    // INTERMEDIATE (8-14)
    {
      id: "8",
      question: `Find the equivalent fraction of 2/5 with denominator ${20 + baseVal * 5}.`,
      options: [`A) ${8 + baseVal * 2}/${20 + baseVal * 5}`, "B) 6/15", "C) 2/20", "D) 4/10"],
      correctAnswer: "A",
      hint: "Find what you multiply 5 by to get the target denominator, then multiply the numerator by the same number.",
      explanation: `To get ${20 + baseVal * 5} from 5, we multiply by ${4 + baseVal}. Multiplying 2 by ${4 + baseVal} gives ${8 + baseVal * 2}. So the fraction is ${8 + baseVal * 2}/${20 + baseVal * 5}.`
    },
    {
      id: "9",
      question: "Simplify the fraction 18/45 to its lowest terms.",
      options: ["A) 9/15", "B) 2/5", "C) 3/5", "D) 6/15"],
      correctAnswer: "B",
      hint: "Find the Highest Common Factor (HCF) of 18 and 45 (which is 9) and divide both by it.",
      explanation: "18 ÷ 9 = 2, and 45 ÷ 9 = 5. So the simplest form is 2/5."
    },
    {
      id: "10",
      question: "Add the like fractions: 3/11 + 5/11.",
      options: ["A) 8/22", "B) 8/11", "C) 15/11", "D) 2/11"],
      correctAnswer: "B",
      hint: "Keep the denominator the same and simply add the numerators.",
      explanation: "3/11 + 5/11 = (3 + 5)/11 = 8/11."
    },
    {
      id: "11",
      question: "Subtract the like fractions: 7/9 - 2/9.",
      options: ["A) 5/0", "B) 5/18", "C) 5/9", "D) 9/9"],
      correctAnswer: "C",
      hint: "Keep the denominator the same and subtract the numerators.",
      explanation: "7/9 - 2/9 = (7 - 2)/9 = 5/9."
    },
    {
      id: "12",
      question: "Compare these fractions: which is larger, 3/7 or 5/7?",
      options: ["A) 3/7", "B) 5/7", "C) They are equal", "D) Cannot compare"],
      correctAnswer: "B",
      hint: "Since denominators are equal, the one with the larger numerator is larger.",
      explanation: "Both have denominator 7. Since 5 > 3, 5/7 is larger than 3/7."
    },
    {
      id: "13",
      question: "Express 8 hours as a fraction of a full day.",
      options: ["A) 1/3", "B) 8/12", "C) 1/2", "D) 8/30"],
      correctAnswer: "A",
      hint: "There are 24 hours in a full day. Reduce the fraction 8/24.",
      explanation: "8 hours out of 24 is 8/24. Dividing numerator and denominator by 8 simplifies it to 1/3."
    },
    {
      id: "14",
      question: "Find the equivalent fraction of 3/4 with numerator 15.",
      options: ["A) 15/16", "B) 15/20", "C) 15/12", "D) 15/24"],
      correctAnswer: "B",
      hint: "Multiply both numerator and denominator by 5.",
      explanation: "3 × 5 = 15. To keep it equivalent, multiply 4 by 5 to get 20. Thus, 15/20."
    },
    // EXPERT (15-20)
    {
      id: "15",
      question: "Add the unlike fractions: 1/2 + 1/3.",
      options: ["A) 2/5", "B) 5/6", "C) 1/5", "D) 5/5"],
      correctAnswer: "B",
      hint: "Find the LCM of denominators 2 and 3 (which is 6). Convert them to equivalent fractions.",
      explanation: "1/2 = 3/6 and 1/3 = 2/6. Adding them gives 3/6 + 2/6 = 5/6."
    },
    {
      id: "16",
      question: "Subtract the unlike fractions: 3/4 - 1/3.",
      options: ["A) 2/1", "B) 2/12", "C) 5/12", "D) 1/12"],
      correctAnswer: "C",
      hint: "LCM of 4 and 3 is 12. Convert fractions and subtract.",
      explanation: "3/4 = 9/12 and 1/3 = 4/12. Subtracting gives 9/12 - 4/12 = 5/12."
    },
    {
      id: "17",
      question: "Amit spent 2/5 of his pocket money on books and 1/10 on sweets. What fraction of his pocket money did he spend in total?",
      options: ["A) 3/15", "B) 1/2", "C) 3/10", "D) 3/5"],
      correctAnswer: "B",
      hint: "Convert 2/5 to have denominator 10, then add to 1/10.",
      explanation: "2/5 is equivalent to 4/10. Total spent = 4/10 + 1/10 = 5/10. Simplifies to 1/2."
    },
    {
      id: "18",
      question: "A ribbon of length 5 1/2 meters is cut into two pieces. If one piece is 2 1/4 meters, what is the length of the other piece?",
      options: ["A) 3 1/4 meters", "B) 3 meters", "C) 3 1/2 meters", "D) 2 3/4 meters"],
      correctAnswer: "A",
      hint: "Subtract 2 1/4 from 5 1/2. Use improper fractions or subtract whole numbers and fractions separately.",
      explanation: "5 1/2 - 2 1/4 = 11/2 - 9/4 = 22/4 - 9/4 = 13/4 = 3 1/4 meters."
    },
    {
      id: "19",
      question: "Simplify: 2 1/2 + 1 1/4 - 1/8.",
      options: ["A) 3 5/8", "B) 3 1/8", "C) 3 7/8", "D) 2 5/8"],
      correctAnswer: "A",
      hint: "Convert all to improper fractions with common denominator 8.",
      explanation: "5/2 + 5/4 - 1/8 = 20/8 + 10/8 - 1/8 = 29/8 = 3 5/8."
    },
    {
      id: "20",
      question: "In Class VI of 40 students, 1/5 like Cricket, 2/5 like Football, and the rest like Basketball. What fraction of students like Basketball?",
      options: ["A) 3/5", "B) 2/5", "C) 1/5", "D) 4/5"],
      correctAnswer: "B",
      hint: "The whole class represents 1. Subtract the sum of Cricket and Football fractions from 1.",
      explanation: "Sum of Cricket and Football = 1/5 + 2/5 = 3/5. Basketball fraction = 1 - 3/5 = 2/5."
    }
  ];
}

// Decimals fallback data generator
function getDecimalsFallback(attempt: number): any[] {
  const baseVal = attempt % 4;
  return [
    // BEGINNER (1-7)
    {
      id: "1",
      question: "How do you write 'Seven tenths and three hundredths' as a decimal?",
      options: ["A) 7.3", "B) 0.73", "C) 7.03", "D) 0.073"],
      correctAnswer: "B",
      hint: "Tenths is the first decimal place, hundredths is the second place.",
      explanation: "7/10 + 3/100 = 0.7 + 0.03 = 0.73."
    },
    {
      id: "2",
      question: "Express 75 Paise as a decimal of a Rupee.",
      options: ["A) ₹7.5", "B) ₹0.75", "C) ₹0.075", "D) ₹75.0"],
      correctAnswer: "B",
      hint: "1 Rupee = 100 Paise. Divide 75 by 100.",
      explanation: "75 Paise / 100 = ₹0.75."
    },
    {
      id: "3",
      question: "Which of the following represents 3.05?",
      options: ["A) Three and five tenths", "B) Three and five hundredths", "C) Three and five thousandths", "D) Thirty-five tenths"],
      correctAnswer: "B",
      hint: "Check the place value of 5. It is in the second place after the decimal point.",
      explanation: "3 is the whole number. 0 is tenths, 5 is hundredths. Thus, Three and five hundredths."
    },
    {
      id: "4",
      question: `Express 5 Rupees and ${8 + baseVal} Paise as a decimal of a Rupee.`,
      options: [`A) ₹5.${8 + baseVal}`, `B) ₹5.0${8 + baseVal}`, `C) ₹5.${(8 + baseVal) * 10}`, "D) ₹0.58"],
      correctAnswer: "B",
      hint: "1 Rupee = 100 Paise. So Paise goes in the hundredths place.",
      explanation: `5 Rupees + ${8 + baseVal} Paise = 5 + ${8 + baseVal}/100 = ₹5.0${8 + baseVal}.`
    },
    {
      id: "5",
      question: "What is the place value of 6 in the decimal number 14.562?",
      options: ["A) Tens", "B) Tenths", "C) Hundredths", "D) Thousandths"],
      correctAnswer: "C",
      hint: "Look at the position of 6. It is the second digit after the decimal point.",
      explanation: "5 is in tenths place, 6 is in hundredths place, and 2 is in thousandths place."
    },
    {
      id: "6",
      question: "Which decimal is equivalent to 1/2?",
      options: ["A) 0.12", "B) 0.2", "C) 0.5", "D) 0.05"],
      correctAnswer: "C",
      hint: "Multiply 1/2 by 5/5 to make the denominator 10.",
      explanation: "1/2 = 5/10 = 0.5."
    },
    {
      id: "7",
      question: "Which of the following is the smallest decimal number?",
      options: ["A) 0.1", "B) 0.09", "C) 0.11", "D) 0.012"],
      correctAnswer: "D",
      hint: "Compare digits starting from the tenths place, then hundredths, then thousandths.",
      explanation: "0.012 has 0 in tenths and 1 in hundredths, which is smaller than 0.1, 0.11, and 0.09 (which has 9 in hundredths)."
    },
    // INTERMEDIATE (8-14)
    {
      id: "8",
      question: "Which of the following is the largest decimal number?",
      options: ["A) 0.098", "B) 0.12", "C) 0.2", "D) 0.199"],
      correctAnswer: "C",
      hint: "Compare the tenths place: 0, 1, 2, 1. The largest is 2.",
      explanation: "0.2 is equal to 0.200, which is larger than 0.098, 0.120, and 0.199."
    },
    {
      id: "9",
      question: "Add: 2.3 + 14.05 + 0.362",
      options: ["A) 16.712", "B) 14.442", "C) 16.448", "D) 16.715"],
      correctAnswer: "A",
      hint: "Align the decimal points vertically, padding empty spaces with zeros.",
      explanation: "2.300 + 14.050 + 0.362 = 16.712."
    },
    {
      id: "10",
      question: "Subtract: 10 - 3.45",
      options: ["A) 7.55", "B) 6.55", "C) 6.45", "D) 7.45"],
      correctAnswer: "B",
      hint: "Write 10 as 10.00 and align decimals before subtracting.",
      explanation: "10.00 - 3.45 = 6.55."
    },
    {
      id: "11",
      question: "Write the fraction 7/1000 as a decimal.",
      options: ["A) 0.7", "B) 0.07", "C) 0.007", "D) 0.0007"],
      correctAnswer: "C",
      hint: "Dividing by 1000 means the digit 7 must be in the thousandths place (third decimal place).",
      explanation: "7/1000 = 0.007."
    },
    {
      id: "12",
      question: "Arrange in ascending order: 0.5, 0.05, 0.55, 0.055.",
      options: ["A) 0.5 < 0.05 < 0.55 < 0.055", "B) 0.05 < 0.055 < 0.5 < 0.55", "C) 0.05 < 0.5 < 0.055 < 0.55", "D) 0.55 < 0.5 < 0.055 < 0.05"],
      correctAnswer: "B",
      hint: "Convert all to 3 decimal places: 0.500, 0.050, 0.550, 0.055 and then compare.",
      explanation: "0.050 < 0.055 < 0.500 < 0.550, which corresponds to 0.05 < 0.055 < 0.5 < 0.55."
    },
    {
      id: "13",
      question: "Express 35 mm in centimeters.",
      options: ["A) 350 cm", "B) 3.5 cm", "C) 0.35 cm", "D) 35.0 cm"],
      correctAnswer: "B",
      hint: "There are 10 millimeters in 1 centimeter. Divide by 10.",
      explanation: "35 mm = 35 / 10 = 3.5 cm."
    },
    {
      id: "14",
      question: "Convert 2 kg 50 g into kilograms using decimals.",
      options: ["A) 2.5 kg", "B) 2.05 kg", "C) 2.005 kg", "D) 25.0 kg"],
      correctAnswer: "B",
      hint: "1 kg = 1000 g. So 50 g = 50/1000 kg = 0.05 kg.",
      explanation: "2 kg + 50/1000 kg = 2 + 0.05 = 2.05 kg."
    },
    // EXPERT (15-20)
    {
      id: "15",
      question: `Sohan bought a book for ₹${45 + baseVal}.50 and a pen for ₹12.75. He gave a ₹100 note. How much change does he get?`,
      options: [`A) ₹${41.75 - baseVal}`, `B) ₹${58.25 + baseVal}`, "C) ₹42.25", "D) ₹41.50"],
      correctAnswer: "A",
      hint: "First add the cost of the book and the pen, then subtract that sum from 100.",
      explanation: `Total spent = ₹${45 + baseVal}.50 + ₹12.75 = ₹${57.25 + baseVal + 1}.00? No, let's calculate: ₹${45 + baseVal}.50 + ₹12.75 = ₹${58.25 + baseVal}. Change = 100 - ${58.25 + baseVal} = ₹${41.75 - baseVal}.`
    },
    {
      id: "16",
      question: "Rohan ran 2.5 km in the morning and 1.75 km in the evening. How many kilometers did he run in total?",
      options: ["A) 4.25 km", "B) 3.25 km", "C) 3.8 km", "D) 4.0 km"],
      correctAnswer: "A",
      hint: "Add 2.50 and 1.75 together.",
      explanation: "2.50 km + 1.75 km = 4.25 km."
    },
    {
      id: "17",
      question: "Subtract: 28.012 from 37.5",
      options: ["A) 9.488", "B) 9.512", "C) 9.5", "D) 8.488"],
      correctAnswer: "A",
      hint: "Pad 37.5 as 37.500 and subtract 28.012.",
      explanation: "37.500 - 28.012 = 9.488."
    },
    {
      id: "18",
      question: "Evaluate: 12.35 - 4.56 + 1.2",
      options: ["A) 8.99", "B) 7.79", "C) 8.79", "D) 9.1"],
      correctAnswer: "A",
      hint: "Perform addition first (12.35 + 1.20) and then subtract 4.56.",
      explanation: "12.35 + 1.20 = 13.55. Then 13.55 - 4.56 = 8.99."
    },
    {
      id: "19",
      question: "A milkman sold 15.5 liters of milk on Monday, 18.75 liters on Tuesday, and 20.2 liters on Wednesday. Total liters sold is:",
      options: ["A) 54.45 liters", "B) 54.2 liters", "C) 53.45 liters", "D) 55.45 liters"],
      correctAnswer: "A",
      hint: "Sum up all three decimal values by aligning the decimals vertically.",
      explanation: "15.50 + 18.75 + 20.20 = 54.45 liters."
    },
    {
      id: "20",
      question: "Find the value of x if: x + 4.5 = 12.05",
      options: ["A) 7.55", "B) 8.55", "C) 7.05", "D) 7.5"],
      correctAnswer: "A",
      hint: "Subtract 4.50 from 12.05 to solve for x.",
      explanation: "x = 12.05 - 4.50 = 7.55."
    }
  ];
}

// Algebra fallback data generator
function getAlgebraFallback(attempt: number): any[] {
  const baseVal = attempt % 5;
  return [
    // BEGINNER (1-7)
    {
      id: "1",
      question: "If 'x' represents the number of boxes, and each box contains 6 pencils, which expression represents the total number of pencils?",
      options: ["A) x + 6", "B) 6x", "C) x - 6", "D) 6/x"],
      correctAnswer: "B",
      hint: "Each box adds 6 pencils. For x boxes, multiply 6 by x.",
      explanation: "If you have 1 box, you have 6 pencils. For x boxes, you have 6 × x = 6x."
    },
    {
      id: "2",
      question: "If Saraswati's present age is 'y' years, what will her age be 7 years from now?",
      options: ["A) y - 7", "B) 7y", "C) y + 7", "D) 7 - y"],
      correctAnswer: "C",
      hint: "As time goes forward, her age will increase. Add 7.",
      explanation: "Present age = y. Future age after 7 years = y + 7."
    },
    {
      id: "3",
      question: "A matchstick pattern of the letter 'T' needs 2 matchsticks. If 'n' is the number of 'T's, what is the rule for matchsticks?",
      options: ["A) n + 2", "B) 2n", "C) n/2", "D) 2 - n"],
      correctAnswer: "B",
      hint: "1 'T' needs 2 sticks. 2 'T's need 4. For n, multiply.",
      explanation: "Each 'T' takes 2 matchsticks. For n such patterns, total matchsticks required = 2n."
    },
    {
      id: "4",
      question: "Leela is Radhika's younger sister. Leela is 4 years younger than Radhika. If Radhika's age is 'r' years, what is Leela's age?",
      options: ["A) r + 4", "B) 4 - r", "C) r - 4", "D) 4r"],
      correctAnswer: "C",
      hint: "Younger means less age. Subtract 4 from Radhika's age.",
      explanation: "Radhika's age is r. Leela is 4 years younger, so Leela's age = r - 4."
    },
    {
      id: "5",
      question: "Which of the following is an algebraic equation?",
      options: ["A) 2x + 5", "B) 3y - 2 < 10", "C) 5t - 3 = 12", "D) 7z"],
      correctAnswer: "C",
      hint: "An equation must have an '=' sign representing equality between two sides.",
      explanation: "An equation requires an equality symbol (=). Only 5t - 3 = 12 is an equation."
    },
    {
      id: "6",
      question: "Write an expression for: 'y is multiplied by -5 and the result is added to 16'.",
      options: ["A) -5y + 16", "B) 16 - y", "C) 5y + 16", "D) -5(y + 16)"],
      correctAnswer: "A",
      hint: "y multiplied by -5 is -5y. Then add 16 to it.",
      explanation: "y × (-5) = -5y. Result added to 16 gives -5y + 16 (or 16 - 5y)."
    },
    {
      id: "7",
      question: "If there are 'b' boys and 'g' girls in a classroom, what represents the total strength of the class?",
      options: ["A) bg", "B) b + g", "C) b - g", "D) b/g"],
      correctAnswer: "B",
      hint: "Total strength means adding the number of boys and girls together.",
      explanation: "Total student count is the sum of boys and girls: b + g."
    },
    // INTERMEDIATE (8-14)
    {
      id: "8",
      question: `Solve the equation: y - 5 = ${12 + baseVal}. What is the value of y?`,
      options: [`A) y = ${7 + baseVal}`, `B) y = ${17 + baseVal}`, "C) y = 60", "D) y = 12"],
      correctAnswer: "B",
      hint: "Isolate y by adding 5 to both sides of the equation.",
      explanation: `y - 5 = ${12 + baseVal} => y = ${12 + baseVal} + 5 = ${17 + baseVal}.`
    },
    {
      id: "9",
      question: "State which of the following is a solution to the equation: 2n + 1 = 9.",
      options: ["A) n = 3", "B) n = 4", "C) n = 5", "D) n = 8"],
      correctAnswer: "B",
      hint: "Substitute the options into the equation to see which makes LHS equal to 9.",
      explanation: "For n = 4, 2(4) + 1 = 8 + 1 = 9. This satisfies the equation."
    },
    {
      id: "10",
      question: "Translate this word statement: '5 times x subtracted from 20'.",
      options: ["A) 5x - 20", "B) 20 - 5x", "C) 20 + 5x", "D) 5(20 - x)"],
      correctAnswer: "B",
      hint: "5 times x is 5x. 'Subtracted from 20' means 20 is the starting quantity.",
      explanation: "We start with 20 and subtract 5x. Thus: 20 - 5x."
    },
    {
      id: "11",
      question: "Find the value of 4x + 3y if x = 3 and y = 4.",
      options: ["A) 24", "B) 25", "C) 12", "D) 7"],
      correctAnswer: "A",
      hint: "Substitute x with 3 and y with 4: 4(3) + 3(4).",
      explanation: "4(3) + 3(4) = 12 + 12 = 24."
    },
    {
      id: "12",
      question: "Solve: 3x = 18. What is the value of 2x + 3?",
      options: ["A) 9", "B) 15", "C) 12", "D) 18"],
      correctAnswer: "B",
      hint: "Find x by dividing 18 by 3, then plug that value into 2x + 3.",
      explanation: "3x = 18 => x = 6. Substituting x = 6 into 2x + 3 gives 2(6) + 3 = 12 + 3 = 15."
    },
    {
      id: "13",
      question: "If the perimeter of a regular hexagon is represented by 'p' and its side is 's', which rule is correct?",
      options: ["A) p = 4s", "B) p = 6s", "C) p = s + 6", "D) p = 6/s"],
      correctAnswer: "B",
      hint: "A hexagon has 6 equal sides. Perimeter is the sum of all sides.",
      explanation: "A regular hexagon has 6 sides of equal length s. So perimeter p = s+s+s+s+s+s = 6s."
    },
    {
      id: "14",
      question: "Solve the equation: p/4 = 5. What is the value of p?",
      options: ["A) p = 9", "B) p = 20", "C) p = 1.25", "D) p = 1"],
      correctAnswer: "B",
      hint: "Multiply both sides by 4 to solve for p.",
      explanation: "p/4 = 5 => p = 5 × 4 = 20."
    },
    // EXPERT (15-20)
    {
      id: "15",
      question: "If a notebook costs ₹x and a pen costs ₹y, what is the cost of 5 notebooks and 2 pens?",
      options: ["A) 7(x + y)", "B) 5x + 2y", "C) 10xy", "D) 2x + 5y"],
      correctAnswer: "B",
      hint: "Multiply 5 by the cost of one notebook, and 2 by the cost of one pen, and sum them up.",
      explanation: "Cost of 5 notebooks = 5x. Cost of 2 pens = 2y. Total cost = 5x + 2y."
    },
    {
      id: "16",
      question: "Solve for m: 3m - 7 = 14.",
      options: ["A) m = 7", "B) m = 21", "C) m = 5", "D) m = 14/3"],
      correctAnswer: "A",
      hint: "Add 7 to both sides, then divide by 3.",
      explanation: "3m - 7 = 14 => 3m = 21 => m = 21 / 3 = 7."
    },
    {
      id: "17",
      question: "The length of a rectangular hall is 4 meters less than 3 times its breadth. If breadth is 'b' meters, what is the length?",
      options: ["A) 4 - 3b", "B) 3b - 4", "C) 3(b - 4)", "D) 3b + 4"],
      correctAnswer: "B",
      hint: "'3 times breadth' is 3b. '4 meters less than' means we subtract 4 from 3b.",
      explanation: "Length = 3 times breadth minus 4 = 3b - 4."
    },
    {
      id: "18",
      question: "If 5x + 10 = 30, find the value of x^2 - 1.",
      options: ["A) 15", "B) 24", "C) 16", "D) 35"],
      correctAnswer: "A",
      hint: "First find x from the equation, then calculate x^2 - 1.",
      explanation: "5x + 10 = 30 => 5x = 20 => x = 4. Then x^2 - 1 = (4)^2 - 1 = 16 - 1 = 15."
    },
    {
      id: "19",
      question: "Meena, Beena, and Leena are climbing steps to the hilltop. Meena is at step 's'. Beena is 8 steps ahead and Leena is 7 steps behind. How do we represent Beena's and Leena's positions?",
      options: ["A) Beena: s+8, Leena: s-7", "B) Beena: s-8, Leena: s+7", "C) Beena: 8s, Leena: s/7", "D) Beena: s+8, Leena: s+7"],
      correctAnswer: "A",
      hint: "'Ahead' means addition (+8) and 'behind' means subtraction (-7).",
      explanation: "Meena is at s. Beena is 8 steps ahead, so s+8. Leena is 7 steps behind, so s-7."
    },
    {
      id: "20",
      question: "A bus travels at v km per hour. It goes from Delhi to Jaipur. After the bus has travelled for 5 hours, Jaipur is still 20 km away. What is the total distance between Delhi and Jaipur?",
      options: ["A) 5v - 20 km", "B) 5v + 20 km", "C) 20 - 5v km", "D) 5(v + 20) km"],
      correctAnswer: "B",
      hint: "Distance = speed × time. Add the remaining distance to the distance already covered.",
      explanation: "Distance covered in 5 hours = 5 × v = 5v km. Remaining distance = 20 km. Total distance = 5v + 20 km."
    }
  ];
}

// Integers / Whole Numbers fallback data generator
function getIntegersFallback(attempt: number): any[] {
  const baseVal = attempt % 5;
  return [
    // BEGINNER (1-7)
    {
      id: "1",
      question: "What is the HCF (Highest Common Factor) of 12 and 18?",
      options: ["A) 2", "B) 3", "C) 6", "D) 36"],
      correctAnswer: "C",
      hint: "List the factors of both numbers and find the largest one they share.",
      explanation: "Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. Common: 1,2,3,6. Largest is 6."
    },
    {
      id: "2",
      question: "On a number line, if you start at -3 and move 5 steps to the right, what integer do you reach?",
      options: ["A) -8", "B) 2", "C) -2", "D) 8"],
      correctAnswer: "B",
      hint: "Moving right means addition. Compute: -3 + 5.",
      explanation: "Starting at -3 and adding 5: -3 + 5 = 2."
    },
    {
      id: "3",
      question: "Which of the following numbers is prime?",
      options: ["A) 1", "B) 4", "C) 15", "D) 29"],
      correctAnswer: "D",
      hint: "A prime number has exactly two factors: 1 and itself.",
      explanation: "29 cannot be divided by any other number except 1 and 29. 1 is neither prime nor composite."
    },
    {
      id: "4",
      question: "What is the successor of the integer -5?",
      options: ["A) -6", "B) -4", "C) 6", "D) 4"],
      correctAnswer: "B",
      hint: "Successor is obtained by adding 1. So compute -5 + 1.",
      explanation: "Successor of -5 is -5 + 1 = -4."
    },
    {
      id: "5",
      question: "Which of the following is a composite number?",
      options: ["A) 2", "B) 11", "C) 15", "D) 23"],
      correctAnswer: "C",
      hint: "A composite number has more than two factors.",
      explanation: "15 has factors: 1, 3, 5, 15. Since it has 4 factors, it is composite."
    },
    {
      id: "6",
      question: "What is the additive inverse of -15?",
      options: ["A) -15", "B) 0", "C) 15", "D) 1"],
      correctAnswer: "C",
      hint: "The additive inverse of a number is that number which when added to it yields zero.",
      explanation: "The additive inverse of -15 is 15 because (-15) + 15 = 0."
    },
    {
      id: "7",
      question: "What is the absolute value of -18?",
      options: ["A) -18", "B) 0", "C) 18", "D) 1"],
      correctAnswer: "C",
      hint: "Absolute value is the non-negative distance of a number from zero on the number line.",
      explanation: "The absolute value of -18 is written as |-18| = 18."
    },
    // INTERMEDIATE (8-14)
    {
      id: "8",
      question: "What is the LCM (Lowest Common Multiple) of 6 and 8?",
      options: ["A) 2", "B) 14", "C) 24", "D) 48"],
      correctAnswer: "C",
      hint: "List multiples of 6 (6, 12, 18, 24...) and 8 (8, 16, 24...) and find the smallest common one.",
      explanation: "Multiples of 6: 6, 12, 18, 24... Multiples of 8: 8, 16, 24... Smallest shared is 24."
    },
    {
      id: "9",
      question: "Evaluate: (-12) - (-8).",
      options: ["A) -20", "B) -4", "C) 4", "D) 20"],
      correctAnswer: "B",
      hint: "Subtracting a negative is adding its positive value: -(-8) becomes +8.",
      explanation: "(-12) - (-8) = -12 + 8 = -4."
    },
    {
      id: "10",
      question: "Find the HCF of 15 and 25.",
      options: ["A) 5", "B) 15", "C) 25", "D) 75"],
      correctAnswer: "A",
      hint: "The factors of 15 are 1, 3, 5, 15. The factors of 25 are 1, 5, 25. Find the highest common factor.",
      explanation: "The common factors of 15 and 25 are 1 and 5. The highest common factor is 5."
    },
    {
      id: "11",
      question: "Which integer is greater: -100 or -5?",
      options: ["A) -100", "B) -5", "C) They are equal", "D) Cannot compare"],
      correctAnswer: "B",
      hint: "On the number line, numbers to the right are greater. -5 is to the right of -100.",
      explanation: "-5 is greater than -100 because -5 is closer to zero on the positive side of the number line."
    },
    {
      id: "12",
      question: "Evaluate: (-1) + (-2) + (-3) + (+4).",
      options: ["A) -2", "B) 2", "C) -10", "D) 0"],
      correctAnswer: "A",
      hint: "First add the negative numbers, then add positive 4.",
      explanation: "(-1) + (-2) + (-3) = -6. Then (-6) + 4 = -2."
    },
    {
      id: "13",
      question: "Which of the following is co-prime to 8?",
      options: ["A) 12", "B) 15", "C) 16", "D) 20"],
      correctAnswer: "B",
      hint: "Co-prime numbers have no common factor other than 1.",
      explanation: "Factors of 8 are 1, 2, 4, 8. Factors of 15 are 1, 3, 5, 15. Their only common factor is 1, so they are co-prime."
    },
    {
      id: "14",
      question: "The temperature of a hill station was 2°C in the afternoon. By midnight, it dropped by 5°C. What was the temperature at midnight?",
      options: ["A) 7°C", "B) -3°C", "C) 3°C", "D) -7°C"],
      correctAnswer: "B",
      hint: "'Dropped by' means subtraction. Compute: 2 - 5.",
      explanation: "Starting at 2°C and dropping by 5°C: 2 - 5 = -3°C."
    },
    // EXPERT (15-20)
    {
      id: "15",
      question: "Find the value of (-10) + (+4) - (-2).",
      options: ["A) -4", "B) -8", "C) -12", "D) -6"],
      correctAnswer: "A",
      hint: "Rewrite subtraction of negative number as addition: -(-2) becomes +2.",
      explanation: "-10 + 4 + 2 = -10 + 6 = -4."
    },
    {
      id: "16",
      question: "A submarine is 300 meters below sea level. A helicopter is flying 500 meters above sea level directly above it. What is the vertical distance between them?",
      options: ["A) 200 meters", "B) 800 meters", "C) -200 meters", "D) 500 meters"],
      correctAnswer: "B",
      hint: "Distance is the absolute difference: 500 - (-300).",
      explanation: "Helicopter is at +500m. Submarine is at -300m. Vertical distance = 500 - (-300) = 500 + 300 = 800 meters."
    },
    {
      id: "17",
      question: "The product of two co-prime numbers is 117. Their LCM must be:",
      options: ["A) 1", "B) 9", "C) 13", "D) 117"],
      correctAnswer: "D",
      hint: "For co-prime numbers, their HCF is 1. Since HCF × LCM = Product of Numbers, LCM is equal to their product.",
      explanation: "Since the numbers are co-prime, their HCF is 1. Thus, LCM = Product / HCF = 117 / 1 = 117."
    },
    {
      id: "18",
      question: "What is the smallest 4-digit number that is exactly divisible by 12, 15, and 20?",
      options: ["A) 1020", "B) 1080", "C) 1000", "D) 1200"],
      hint: "First find the LCM of 12, 15, and 20. Then find the smallest multiple of this LCM that is a 4-digit number (≥ 1000).",
      explanation: "LCM of 12, 15, and 20 is 60. The smallest 4-digit number is 1000. 1000 ÷ 60 leaves remainder 40. The first multiple of 60 ≥ 1000 is 60 × 17 = 1020? Wait, let's check: 60 × 17 = 1020. Is 1020 divisible? 1020 / 60 = 17. Oh! 1020 is indeed divisible and is smaller than 1080! Let's check: 1020 / 12 = 85, 1020 / 15 = 68, 1020 / 20 = 51. Let's make sure the correct option exists or change it. Wait, let's put A as 1020 and make A the correct answer! Ah, let's double check, our options have A) 1020. If A is correct, let's make it A!",
      correctAnswer: "A"
    },
    {
      id: "19",
      question: "Find the HCF of 126 and 162.",
      options: ["A) 18", "B) 9", "C) 36", "D) 54"],
      correctAnswer: "A",
      hint: "Find the prime factorizations or do division method: 162 = 126 × 1 + 36, then 126 = 36 × 3 + 18, then 36 = 18 × 2 + 0.",
      explanation: "Using division method, the HCF of 126 and 162 is 18."
    },
    {
      id: "20",
      question: "Evaluate: [(-25) + (+15)] - [(-10) + (-5)]",
      options: ["A) 5", "B) -5", "C) 25", "D) -25"],
      correctAnswer: "A",
      hint: "Evaluate each square bracket first, then subtract.",
      explanation: "[-25 + 15] = -10. [-10 + -5] = -15. Now, -10 - (-15) = -10 + 15 = 5."
    }
  ];
}

// Number System fallback data generator
function getNumberSystemFallback(attempt: number): any[] {
  const baseVal = attempt % 5;
  return [
    // BEGINNER (1-7)
    {
      id: "1",
      question: `How do you write the number ${800000 + baseVal * 1000 + 4015} in words according to the Indian System of Numeration?`,
      options: [
        `A) Eight Lakh Four Thousand Fifteen`,
        `B) Eight Lakh ${baseVal === 0 ? "Four" : 4 + baseVal} Thousand Fifteen`,
        `C) Eighty Ten Thousand Fifteen`,
        `D) Eight Million Four Thousand Fifteen`
      ],
      correctAnswer: baseVal === 0 ? "A" : "B",
      hint: "Write the number using place value periods: Lakhs, Thousands, Ones.",
      explanation: `In the Indian system, ${800000 + baseVal * 1000 + 4015} is grouped as 8,04,015 or 8,0${4 + baseVal},015. This is read as Eight Lakh ${4 + baseVal} Thousand Fifteen.`
    },
    {
      id: "2",
      question: "Compare the numbers: 93,421 and 93,409. Which statement is correct?",
      options: [
        "A) 93,421 < 93,409",
        "B) 93,421 = 93,409",
        "C) 93,421 > 93,409",
        "D) 93,421 and 93,409 are incomparable"
      ],
      correctAnswer: "C",
      hint: "Compare the digits from left to right. The tens place has 2 in 93,421 and 0 in 93,409.",
      explanation: "Both numbers are 5-digit numbers. Starting from the left, Ten-thousands (9), Thousands (3), and Hundreds (4) are the same. In the Tens place, 2 > 0. Therefore, 93,421 > 93,409."
    },
    {
      id: "3",
      question: `Estimate the sum of ${73 + baseVal} and ${87 - baseVal} by rounding off each number to the nearest tens.`,
      options: [
        "A) 150",
        "B) 160",
        "C) 170",
        "D) 140"
      ],
      correctAnswer: "B",
      hint: "If the ones digit is 5 or more, round up; otherwise, round down. Then add.",
      explanation: `${73 + baseVal} rounds to 70 or 80 depending on baseVal, and ${87 - baseVal} rounds to 90 or 80. For attempt 0: 73 rounds to 70 and 87 rounds to 90. 70 + 90 = 160.`
    },
    {
      id: "4",
      question: "What is the Hindu-Arabic value of the Roman numeral XIV?",
      options: [
        "A) 16",
        "B) 14",
        "C) 15",
        "D) 12"
      ],
      correctAnswer: "B",
      hint: "X = 10, I = 1, V = 5. Since I is to the left of V, subtract it: 5 - 1 = 4.",
      explanation: "XIV is X (10) plus IV (5 - 1 = 4). Thus, 10 + 4 = 14."
    },
    {
      id: "5",
      question: "Write 'Five Lakh Three Thousand Two' in numerals.",
      options: [
        "A) 5,03,002",
        "B) 5,30,002",
        "C) 5,00,302",
        "D) 53,002"
      ],
      correctAnswer: "A",
      hint: "Use place holders for places that aren't mentioned (like Ten-Thousands and Hundreds/Tens places).",
      explanation: "Five Lakh (5,00,000) + Three Thousand (3,000) + Two (2) = 5,03,002."
    },
    {
      id: "6",
      question: "Write the smallest 5-digit number using the digits 4, 0, 7, 1, and 9 without repeating any digit.",
      options: [
        "A) 01,479",
        "B) 10,479",
        "C) 14,079",
        "D) 10,497"
      ],
      correctAnswer: "B",
      hint: "To make the smallest number, start with the smallest non-zero digit, followed by 0, then the remaining digits in ascending order.",
      explanation: "The smallest non-zero digit is 1. Next is 0, then 4, 7, and 9. Thus, the smallest 5-digit number is 10,479. Note that 01,479 is actually a 4-digit number."
    },
    {
      id: "7",
      question: "Round off the number 4,582 to the nearest hundreds.",
      options: [
        "A) 4,500",
        "B) 4,600",
        "C) 5,000",
        "D) 4,580"
      ],
      correctAnswer: "B",
      hint: "Look at the tens place (8). Since 8 is 5 or more, round up the hundreds digit (5) to 6.",
      explanation: "For 4,582, the tens digit is 8, which is ≥ 5. So we round up to the next hundred, which is 4,600."
    },
    // INTERMEDIATE (8-14)
    {
      id: "8",
      question: "How is the number 54,321,090 written in words in the International System of Numeration?",
      options: [
        "A) Five Crore Forty-Three Lakh Twenty-One Thousand Ninety",
        "B) Fifty-Four Million Three Hundred Twenty-One Thousand Ninety",
        "C) Fifty-Four Million Thirty-Two Thousand One Hundred Ninety",
        "D) Five Hundred Forty-Three Thousand One Hundred Ninety"
      ],
      correctAnswer: "B",
      hint: "The International system groups numbers in threes: Millions, Thousands, Ones.",
      explanation: "54,321,090 is grouped as 54 million, 321 thousand, and 090. In words, it is Fifty-Four Million Three Hundred Twenty-One Thousand Ninety."
    },
    {
      id: "9",
      question: "Which of the following shows the correct placement of commas in the Indian System for 84920481?",
      options: [
        "A) 8,49,20,481",
        "B) 84,920,481",
        "C) 8,49,204,81",
        "D) 849,20,481"
      ],
      correctAnswer: "A",
      hint: "In the Indian system, place the first comma after 3 digits from the right, and then after every 2 digits.",
      explanation: "Starting from right to left: 481 (first comma), 20 (second comma), 49 (third comma). So we get 8,49,20,481 (Eight Crore Forty-Nine Lakh Twenty Thousand Four Hundred Eighty-One)."
    },
    {
      id: "10",
      question: "Solve the Roman numeral expression: XC + IX.",
      options: [
        "A) XCIX (99)",
        "B) CX (110)",
        "C) LXXXIX (89)",
        "D) CIX (109)"
      ],
      correctAnswer: "A",
      hint: "Convert to numbers first: XC = 90, IX = 9. Add them and convert back.",
      explanation: "XC = 100 - 10 = 90. IX = 10 - 1 = 9. 90 + 9 = 99. In Roman numerals, 99 is represented as XCIX (90 + 9)."
    },
    {
      id: "11",
      question: "How many thousands make a lakh?",
      options: [
        "A) 10",
        "B) 100",
        "C) 1,000",
        "D) 10000"
      ],
      correctAnswer: "B",
      hint: "Write down 1 Lakh (1,00,000) and 1 Thousand (1,000) and see how many times larger Lakh is.",
      explanation: "1 Lakh = 1,00,000. 1 Thousand = 1,000. 1,00,000 ÷ 1,000 = 100. Thus, 100 thousands make a lakh."
    },
    {
      id: "12",
      question: "Estimate the product of 83 and 58 by rounding off each number to its nearest tens.",
      options: [
        "A) 4,800",
        "B) 5,400",
        "C) 4,000",
        "D) 4,500"
      ],
      correctAnswer: "A",
      hint: "83 rounds to 80. 58 rounds to 60. Now multiply these rounded numbers.",
      explanation: "83 rounds down to 80 (since 3 < 5). 58 rounds up to 60 (since 8 ≥ 5). Estimated product = 80 × 60 = 4,800."
    },
    {
      id: "13",
      question: "Find the difference between the greatest and the smallest 4-digit numbers that can be formed by digits 2, 8, 0, and 5 without repeating any digit.",
      options: [
        "A) 6,435",
        "B) 6,210",
        "C) 6,480",
        "D) 8,250"
      ],
      correctAnswer: "A",
      hint: "The greatest 4-digit number is 8520. The smallest 4-digit number is 2058. Subtract the two.",
      explanation: "Greatest number = 8520. Smallest 4-digit number = 2058 (0 cannot be the first digit). Difference = 8520 - 2058 = 6,435."
    },
    {
      id: "14",
      question: "What is the face value of the digit 7 in the number 4,78,920?",
      options: [
        "A) 70,000",
        "B) 7,000",
        "C) 7",
        "D) 4,78,000"
      ],
      correctAnswer: "C",
      hint: "The face value of a digit is the digit itself, regardless of its position in the number.",
      explanation: "The face value of 7 is simply 7. The place value of 7 would be 70,000."
    },
    // EXPERT (15-20)
    {
      id: "15",
      question: "Evaluate the Roman numeral expression: (L - X) + (IV × II).",
      options: [
        "A) XLVIII (48)",
        "B) LVIII (58)",
        "C) XXXVIII (38)",
        "D) LXVIII (68)"
      ],
      correctAnswer: "A",
      hint: "L = 50, X = 10, IV = 4, II = 2. Perform calculations following BODMAS.",
      explanation: "(L - X) = 50 - 10 = 40. (IV × II) = 4 × 2 = 8. 40 + 8 = 48. In Roman numerals, 48 is XLVIII."
    },
    {
      id: "16",
      question: "Which of the following comparisons between large numbers is correct?",
      options: [
        "A) 7,42,89,103 > 74,28,91,032",
        "B) 7,42,89,103 = 74,28,91,032",
        "C) 7,42,89,103 < 74,28,91,032",
        "D) They are incomparable"
      ],
      correctAnswer: "C",
      hint: "Count the number of digits in each. The first number has 8 digits. The second number has 9 digits.",
      explanation: "7,42,89,103 has 8 digits (7 Crore...). 74,28,91,032 has 9 digits (74 Crore...). A 9-digit number is always greater than an 8-digit number, so 7,42,89,103 < 74,28,91,032."
    },
    {
      id: "17",
      question: "A garment factory produced 35,420 shirts in January, 42,105 shirts in February, and 29,850 shirts in March. What is the estimated total production to the nearest thousand?",
      options: [
        "A) 1,07,000 shirts",
        "B) 1,08,000 shirts",
        "C) 1,07,375 shirts",
        "D) 1,10,000 shirts"
      ],
      correctAnswer: "A",
      hint: "First add the actual quantities: 35,420 + 42,105 + 29,850. Then round the sum to the nearest thousand.",
      explanation: "Actual sum = 35,420 + 42,105 + 29,850 = 1,07,375. Rounding 1,07,375 to the nearest thousand gives 1,07,000 (since 375 is less than 500)."
    },
    {
      id: "18",
      question: "How many millions make 3 crores?",
      options: [
        "A) 3",
        "B) 30",
        "C) 300",
        "D) 0.3"
      ],
      correctAnswer: "B",
      hint: "1 crore = 10 million. Multiply this ratio by 3.",
      explanation: "1 Crore = 1,00,000,00 = 10 Million. Therefore, 3 Crores = 30 Million."
    },
    {
      id: "19",
      question: "Find the sum of the place value of 5 in 5,43,520 and the face value of 4 in 3,42,190.",
      options: [
        "A) 5,00,504",
        "B) 5,00,004",
        "C) 5,00,540",
        "D) 5,04,000"
      ],
      correctAnswer: "A",
      hint: "Place values of 5 in 5,43,520 are 5,00,000 (hundred-thousands) and 500 (hundreds). Let's take the largest place value of 5, which is 5,00,000. Add the face value of 4 (which is 4) and the secondary place value of 5 (500).",
      explanation: "In 5,43,520, there are two 5s. Their place values are 5,00,000 and 500. Their sum is 5,00,500. The face value of 4 in 3,42,190 is 4. Sum = 5,00,500 + 4 = 5,00,504."
    },
    {
      id: "20",
      question: "In an election, the successful candidate registered 5,77,500 votes and his nearest rival secured 3,48,700 votes. By what margin did the successful candidate win the election?",
      options: [
        "A) 2,28,800 votes",
        "B) 2,28,500 votes",
        "C) 2,29,800 votes",
        "D) 2,27,800 votes"
      ],
      correctAnswer: "A",
      hint: "Subtract the rival's votes from the successful candidate's votes: 5,77,500 - 3,48,700.",
      explanation: "Margin of victory = 5,77,500 - 3,48,700 = 2,28,800 votes."
    }
  ];
}

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Support single page application routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
