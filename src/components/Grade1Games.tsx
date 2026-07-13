import React, { useState, useEffect } from "react";
import { Sparkles, Trophy, RotateCcw, Check, X, Clock, HelpCircle, ArrowRight } from "lucide-react";

// Self-contained high-fidelity sound synthesis engine using Web Audio API
const playSynthSound = (type: 'tap' | 'correct' | 'wrong' | 'victory') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    if (type === 'tap') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'correct') {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 chime
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.06);
        gain.gain.setValueAtTime(0.08, now + index * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.005, now + index * 0.06 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + index * 0.06);
        osc.stop(now + index * 0.06 + 0.22);
      });
    } else if (type === 'wrong') {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.22);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(now + 0.22);
    } else if (type === 'victory') {
      const now = ctx.currentTime;
      const chords = [523.25, 659.25, 783.99, 1046.50];
      chords.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.05);
        gain.gain.setValueAtTime(0.07, now + index * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.05 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + index * 0.05);
        osc.stop(now + index * 0.05 + 0.35);
      });
    }
  } catch (e) {
    console.warn("Audio Context failed", e);
  }
};

interface Grade1InteractiveGameProps {
  chapterId: string;
  onActionComplete?: (points: number) => void;
}

export default function Grade1InteractiveGame({ chapterId, onActionComplete }: Grade1InteractiveGameProps) {
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  // Challenge round states
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [roundKey, setRoundKey] = useState<number>(0); // key to reset round states
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);

  // Counting-specific state
  const [tappedApples, setTappedApples] = useState<number[]>([]);

  // Clock-specific states (to draw analog clock)
  const [clockTarget, setClockTarget] = useState<{ hour: number; minute: number }>({ hour: 3, minute: 0 });

  // Spin degree for interactive shapes
  const [spinDegree, setSpinDegree] = useState<number>(0);

  // Generate a random round based on the chapter ID
  const generateRoundData = () => {
    switch (chapterId) {
      case "g1_counting": {
        const target = Math.floor(Math.random() * 8) + 4; // 4 to 11
        const wrong1 = target + (Math.random() > 0.5 ? 1 : -1);
        const wrong2 = target + (Math.random() > 0.5 ? 2 : -2);
        const options = Array.from(new Set([target, wrong1, wrong2]))
          .filter(x => x > 0 && x <= 15)
          .slice(0, 3);
        if (!options.includes(target)) options.push(target);
        options.sort(() => Math.random() - 0.5);

        return {
          question: "Tap each apple in the garden to count them, then tap the correct number box below!",
          targetCount: target,
          options: options.map(String),
          correctAnswer: String(target)
        };
      }
      case "g1_shapes": {
        const items = [
          { name: "Wall Clock 🕒", shape: "Circle", explanation: "A Wall Clock is round like a CIRCLE!" },
          { name: "Chessboard 🏁", shape: "Square", explanation: "A Chessboard has 4 equal sides like a SQUARE!" },
          { name: "Sandwich Slice 🥪", shape: "Triangle", explanation: "A Sandwich slice has 3 corners like a TRIANGLE!" },
          { name: "Story Book 📖", shape: "Rectangle", explanation: "A Story Book has long sides and short sides like a RECTANGLE!" },
          { name: "Car Wheel 🛞", shape: "Circle", explanation: "A Wheel rolls smoothly because it is a CIRCLE!" },
          { name: "Photo Frame 🖼️", shape: "Rectangle", explanation: "A Photo Frame has opposing equal sides like a RECTANGLE!" }
        ];
        const roundItem = items[Math.floor(Math.random() * items.length)];
        return {
          question: `What shape is this cute item: ${roundItem.name}?`,
          options: ["Circle", "Square", "Triangle", "Rectangle"],
          correctAnswer: roundItem.shape,
          explanation: roundItem.explanation
        };
      }
      case "g1_comparison": {
        const items = [
          { q: "Who is TALLER?", left: "Giraffe 🦒 (Big)", right: "Rabbit 🐰 (Small)", correct: "left", explanation: "The Giraffe 🦒 is much taller than the tiny rabbit!" },
          { q: "Which pencil is LONGER?", left: "✏️================= (Long)", right: "✏️=== (Short)", correct: "left", explanation: "The top pencil has a much longer length!" },
          { q: "Who is HEAVIER?", left: "Elephant 🐘 (Heavy)", right: "Butterfly 🦋 (Light)", correct: "left", explanation: "An Elephant 🐘 is huge and heavy, while a butterfly is light!" },
          { q: "Who is SHORTER?", left: "Little Puppy 🐶 (Short)", right: "Tall Coconut Tree 🌴 (Tall)", correct: "left", explanation: "A puppy is sweet and short compared to the tall tree!" }
        ];
        const roundItem = items[Math.floor(Math.random() * items.length)];
        return {
          question: roundItem.q,
          options: [roundItem.left, roundItem.right],
          correctAnswer: roundItem.correct === "left" ? roundItem.left : roundItem.right,
          explanation: roundItem.explanation
        };
      }
      case "g1_clock": {
        // Hours and half-hours
        const hour = Math.floor(Math.random() * 11) + 1; // 1 to 12
        const isHalfHour = Math.random() > 0.5;
        const minute = isHalfHour ? 30 : 0;
        const timeStr = `${hour}:${minute === 0 ? "00" : "30"}`;
        
        // Generate options
        const alt1 = `${(hour % 12) + 1}:${minute === 0 ? "00" : "30"}`;
        const alt2 = `${hour}:${minute === 0 ? "30" : "00"}`;
        const options = Array.from(new Set([timeStr, alt1, alt2])).sort(() => Math.random() - 0.5);

        return {
          question: "Look at the magic clock hands! Remember our rule: read the short Hour hand FIRST, then read the long Minute hand NEXT. What time is it?",
          hour,
          minute,
          options,
          correctAnswer: timeStr,
          explanation: `Let's read it step-by-step:
1. Hour (Short Red Hand) FIRST: It is pointing to or past ${hour}, so the hour is ${hour}.
2. Minutes (Long Blue Hand) NEXT: It points to ${minute === 30 ? "6, which represents 30 minutes" : "12, which represents 00 minutes"}.
Combining them, the time is ${hour}:${minute === 0 ? "00" : "30"}!`
        };
      }
      case "g1_compare": {
        const num1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const num2 = Math.floor(Math.random() * 8) + 2; // 2 to 9
        let symbol = "=";
        if (num1 > num2) symbol = ">";
        if (num1 < num2) symbol = "<";

        return {
          question: "Compare the number of shiny stars! Choose the correct alligator mouth sign!",
          num1,
          num2,
          options: ["> (Greater)", "< (Less)", "= (Equal)"],
          correctAnswer: symbol === ">" ? "> (Greater)" : symbol === "<" ? "< (Less)" : "= (Equal)",
          explanation: `${num1} is ${symbol === ">" ? "greater than" : symbol === "<" ? "less than" : "equal to"} ${num2}! The hungry alligator mouth opens wide to eat the larger number!`
        };
      }
      // EVS
      case "g1_evs_family": {
        const quests = [
          { act: "see a colorful rainbow 🌈", organ: "Eyes 👀", exp: "We use our eyes 👀 to see beautiful colors!" },
          { act: "hear sweet temple bells 🔔", organ: "Ears 👂", exp: "We use our ears 👂 to hear sounds!" },
          { act: "smell a beautiful red rose 🌹", organ: "Nose 👃", exp: "We use our nose 👃 to smell sweet fragrances!" },
          { act: "taste a sweet mango slice 🥭", organ: "Tongue 👅", exp: "We use our tongue 👅 to taste sweet and sour foods!" },
          { act: "feel a soft, fluffy teddy bear 🧸", organ: "Skin 🖐️", exp: "We use our skin 🖐️ on our hands to feel soft things!" }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        return {
          question: `Which sense organ helper tells you to ${item.act}?`,
          options: ["Eyes 👀", "Ears 👂", "Nose 👃", "Tongue 👅", "Skin 🖐️"],
          correctAnswer: item.organ,
          explanation: item.exp
        };
      }
      case "g1_evs_animals": {
        const quests = [
          { anim: "Lion 🦁", cat: "Wild Animal 🌳", exp: "Lions 🦁 live in deep jungles, so they are Wild Animals!" },
          { anim: "Cow 🐄", cat: "Farm Animal 🚜", exp: "Cows 🐄 live on farms and give us healthy milk!" },
          { anim: "Puppy Dog 🐶", cat: "Pet Animal 🏠", exp: "Puppies 🐶 live inside our homes as loving pets!" },
          { anim: "Tiger 🐯", cat: "Wild Animal 🌳", exp: "Tigers 🐯 hunt in forests and are wild!" },
          { anim: "Sheep 🐑", cat: "Farm Animal 🚜", exp: "Sheep 🐑 live on pastures and give us wool!" }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        return {
          question: `Where does our friend, the ${item.anim}, belong?`,
          options: ["Pet Animal 🏠", "Farm Animal 🚜", "Wild Animal 🌳"],
          correctAnswer: item.cat,
          explanation: item.exp
        };
      }
      case "g1_evs_seasons": {
        const quests = [
          { item: "Monsoon Raincoat 🧥", season: "Monsoon (Rainy) 🌧️", exp: "We wear a raincoat 🧥 to stay dry during the heavy Monsoon rains!" },
          { item: "Cold Woolen Cap 🧶", season: "Winter (Cold) ❄️", exp: "We wear woolens 🧶 to keep warm during the cold Winter!" },
          { item: "Cool Ice Cream 🍦", season: "Summer (Hot) ☀️", exp: "We love cold ice creams 🍦 to beat the hot Summer sun!" },
          { item: "Waterproof Umbrella ☂️", season: "Monsoon (Rainy) 🌧️", exp: "An umbrella ☂️ keeps us dry in the rain!" }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        return {
          question: `In which season do we use this: ${item.item}?`,
          options: ["Summer (Hot) ☀️", "Monsoon (Rainy) 🌧️", "Winter (Cold) ❄️"],
          correctAnswer: item.season,
          explanation: item.exp
        };
      }
      // Telugu
      case "g1_tel_achulu": {
        const quests = [
          { letter: "అ", pic: "అమ్మ 👩 (Amma)", exp: "గుండ్రటి సున్నాతో 'అ' మొదలవుతుంది. అ - అమ్మ!" },
          { letter: "ఆ", pic: "ఆవు 🐄 (Aavu)", exp: "దీర్ఘంతో 'ఆ' పలుకుతాం. ఆ - ఆవు!" },
          { letter: "ఇ", pic: "ఇల్లు 🏠 (Illu)", exp: "ఇ - ఇల్లు! మనం నివసించే గృహం." },
          { letter: "ఈ", pic: "ఈల 😙 (Eela)", exp: "ఈ - ఈల! మనం ఊదే సీటీ." }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        return {
          question: `ఈ తెలుగు అక్షరానికి సరిపోయే చిత్రాన్ని ఎంచుకోండి: '${item.letter}'`,
          options: ["అమ్మ 👩 (Amma)", "ఆవు 🐄 (Aavu)", "ఇల్లు 🏠 (Illu)", "ఈల 😙 (Eela)"],
          correctAnswer: item.pic,
          explanation: item.exp
        };
      }
      case "g1_tel_words": {
        const quests = [
          { pic: "🌊", word: "అల (Wave)", exp: "సముద్రంలో వచ్చే కెరటాన్ని 'అల' అంటారు!" },
          { pic: "⚽", word: "ఆట (Game)", exp: "మనం మైదానంలో ఆడే దానిని 'ఆట' అంటారు!" },
          { pic: "💭", word: "కల (Dream)", exp: "మనం నిద్రలో కనే దానిని 'కల' అంటారు!" },
          { pic: "😙", word: "ఈల (Whistle)", exp: "మనం ఊదే శబ్దాన్ని 'ఈల' అంటారు!" }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        return {
          question: `ఈ చిత్రానికి '${item.pic}' సరిపోయే సరళ పదాన్ని గుర్తించండి:`,
          options: ["అల (Wave)", "ఆట (Game)", "కల (Dream)", "ఈల (Whistle)"],
          correctAnswer: item.word,
          explanation: item.exp
        };
      }
      // Hindi
      case "g1_hin_swar": {
        const quests = [
          { letter: "अ", pic: "अनार 🍎 (Anar)", exp: "अ से अनार! खट्टा-मीठा दानेदार अनार।" },
          { letter: "आ", pic: "आम 🥭 (Aam)", exp: "आ से आम! फलों का राजा मीठा आम।" },
          { letter: "इ", pic: "इमली 🍇 (Imli)", exp: "इ से इमली! खट्टी-खट्टी इमली।" },
          { letter: "ई", pic: "ईख 🎋 (Eekh)", exp: "ई से ईख! मीठा गन्ना (ईख)।" }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        return {
          question: `अक्षर '${item.letter}' के लिए सही चित्र चुनिए:`,
          options: ["अनार 🍎 (Anar)", "आम 🥭 (Aam)", "इमली 🍇 (Imli)", "ईख 🎋 (Eekh)"],
          correctAnswer: item.pic,
          explanation: item.exp
        };
      }
      case "g1_hin_fruits": {
        const quests = [
          { name: "आम 🥭", type: "फल (Fruit) 🧺", exp: "आम एक बहुत ही स्वादिष्ट फल है!" },
          { name: "गुलाब 🌹", type: "फूल (Flower) 🏺", exp: "गुलाब एक बहुत ही सुंदर और खुशबूदार फूल है!" },
          { name: "सेब 🍎", type: "फल (Fruit) 🧺", exp: "सेब सेहत के लिए अच्छा फल है!" },
          { name: "कमल 🪷", type: "फूल (Flower) 🏺", exp: "कमल हमारा राष्ट्रीय फूल है!" }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        return {
          question: `यह क्या है: ${item.name}?`,
          options: ["फल (Fruit) 🧺", "फूल (Flower) 🏺"],
          correctAnswer: item.type,
          explanation: item.exp
        };
      }
      case "g1_hin_gintee": {
        const target = Math.floor(Math.random() * 5) + 1; // 1 to 5
        const items = ["एक (१)", "दो (२)", "तीन (३)", "चार (४)", "पाँच (५)"];
        return {
          question: "चीजों को गिनकर सही हिंदी संख्या शब्द पहचानिए!",
          targetCount: target,
          options: items,
          correctAnswer: items[target - 1],
          explanation: `यहाँ ${target} चीज़ें हैं, जिसे हिंदी में '${items[target - 1]}' कहते हैं!`
        };
      }
      // English
      case "g1_eng_alphabet": {
        const quests = [
          { letter: "A says...", sound: "/æ/ for Apple 🍎", exp: "Letter A makes the sound /æ/ like in Apple!" },
          { letter: "B says...", sound: "/b/ for Ball 🏀", exp: "Letter B makes the sound /b/ like in Ball!" },
          { letter: "C says...", sound: "/k/ for Cat 🐱", exp: "Letter C makes the sound /k/ like in Cat!" },
          { letter: "D says...", sound: "/d/ for Dog 🐶", exp: "Letter D makes the sound /d/ like in Dog!" }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        return {
          question: `Help our phonics friend: '${item.letter}'`,
          options: ["/æ/ for Apple 🍎", "/b/ for Ball 🏀", "/k/ for Cat 🐱", "/d/ for Dog 🐶"],
          correctAnswer: item.sound,
          explanation: item.exp
        };
      }
      case "g1_eng_nouns": {
        const quests = [
          { item: "Teacher 👩‍🏫", cat: "Person 👤", exp: "A Teacher is a person who helps us study!" },
          { item: "Classroom 🏫", cat: "Place 📍", exp: "A Classroom is a beautiful place where we learn!" },
          { item: "Friendly Dog 🐕", cat: "Animal 🐶", exp: "A Dog is a loyal animal!" },
          { item: "Pencil Box ✏️", cat: "Thing 📦", exp: "A Pencil Box is a useful thing we touch and use!" }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        return {
          question: `Sort the Naming Word (Noun): '${item.item}'`,
          options: ["Person 👤", "Place 📍", "Animal 🐶", "Thing 📦"],
          correctAnswer: item.cat,
          explanation: item.exp
        };
      }
      case "g1_eng_verbs": {
        const quests = [
          { verb: "Smile! 😊", exp: "Smiling makes everyone happy! 😊" },
          { verb: "Jump! 🦘", exp: "Jumping is high energy action! 🦘" },
          { verb: "Run! 🏃", exp: "Running makes our legs super strong! 🏃" },
          { verb: "Sleep! 💤", exp: "Sleeping helps our body rest and grow! 💤" }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        return {
          question: `Simon says, perform the action: '${item.verb}'`,
          options: ["Smile! 😊", "Jump! 🦘", "Run! 🏃", "Sleep! 💤"],
          correctAnswer: item.verb,
          explanation: item.exp
        };
      }
      default:
        return {
          question: "Are you ready for a fun math challenge?",
          options: ["Yes!", "Absolutely!"],
          correctAnswer: "Yes!"
        };
    }
  };

  const [roundData, setRoundData] = useState<any>(generateRoundData);

  useEffect(() => {
    setRoundData(generateRoundData());
    setFeedback(null);
    setAnswered(false);
    setTappedApples([]);
  }, [currentRound, roundKey, chapterId]);

  const handleOptionClick = (option: string) => {
    if (answered) return;

    // Check counting condition
    if (chapterId === "g1_counting" && tappedApples.length < roundData.targetCount) {
      playSynthSound('wrong');
      setFeedback({
        isCorrect: false,
        message: `Oops! Please tap and count all ${roundData.targetCount} apples in the garden first to learn easily! 🍎`
      });
      return;
    }

    setAnswered(true);
    const correct = option === roundData.correctAnswer;
    if (correct) {
      playSynthSound('correct');
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      if (score + 10 > highScore) {
        setHighScore(score + 10);
      }
      setFeedback({
        isCorrect: true,
        message: `Fantastic job! 🎉 ${roundData.explanation || "That is absolutely correct! Keep going!"}`
      });
      if (onActionComplete) onActionComplete(10);
    } else {
      playSynthSound('wrong');
      setStreak(0);
      setFeedback({
        isCorrect: false,
        message: `Aha! Let's try again! ${roundData.explanation || "Count carefully or study the letters!"}`
      });
    }
  };

  const handleAppleTap = (index: number) => {
    playSynthSound('tap');
    if (tappedApples.includes(index)) {
      setTappedApples(prev => prev.filter(i => i !== index));
    } else {
      setTappedApples(prev => [...prev, index]);
    }
  };

  // Helper to render Clock Face
  const renderClockSVG = (h: number, m: number) => {
    // Calculate rotation angles
    const minuteAngle = m * 6; // 6 degrees per minute
    const hourAngle = (h % 12) * 30 + m * 0.5; // 30 degrees per hour + half degree per minute

    return (
      <div className="w-36 h-36 bg-white rounded-full border-4 border-slate-700 shadow-inner relative flex items-center justify-center select-none mx-auto">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Hour markers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 50 + 40 * Math.cos(angle);
            const y1 = 50 + 40 * Math.sin(angle);
            const x2 = 50 + 45 * Math.cos(angle);
            const y2 = 50 + 45 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className="stroke-slate-700 stroke-[2.5px]"
              />
            );
          })}
          {/* Numbers 12, 3, 6, 9 positioned upright */}
          <text x="50" y="16" className="font-black text-[10px] text-slate-800 text-center select-none font-sans fill-slate-800" transform="rotate(90 50 16)" textAnchor="middle">12</text>
          <text x="86" y="52.5" className="font-black text-[10px] text-slate-800 text-center select-none font-sans fill-slate-800" transform="rotate(90 86 52.5)" textAnchor="middle">3</text>
          <text x="50" y="90" className="font-black text-[10px] text-slate-800 text-center select-none font-sans fill-slate-800" transform="rotate(90 50 90)" textAnchor="middle">6</text>
          <text x="14" y="52.5" className="font-black text-[10px] text-slate-800 text-center select-none font-sans fill-slate-800" transform="rotate(90 14 52.5)" textAnchor="middle">9</text>

          {/* Hour hand (red) */}
          <line
            x1="50"
            y1="50"
            x2={50 + 24 * Math.cos((hourAngle * Math.PI) / 180)}
            y2={50 + 24 * Math.sin((hourAngle * Math.PI) / 180)}
            className="stroke-rose-600 stroke-[4px] stroke-linecap-round"
          />
          {/* Minute hand (blue) */}
          <line
            x1="50"
            y1="50"
            x2={50 + 34 * Math.cos((minuteAngle * Math.PI) / 180)}
            y2={50 + 34 * Math.sin((minuteAngle * Math.PI) / 180)}
            className="stroke-sky-600 stroke-[2.5px] stroke-linecap-round"
          />
          {/* Center cap */}
          <circle cx="50" cy="50" r="3.5" className="fill-slate-800" />
        </svg>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/40 to-amber-50/30 border-2 border-slate-200 rounded-3xl p-4.5 space-y-4 shadow-xs" id={`g1_game_${chapterId}`}>
      {/* Game status bar */}
      <div className="flex justify-between items-center bg-white/95 p-3 rounded-2xl border border-slate-100 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-lg shadow-inner">
            🎮
          </div>
          <div>
            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-tight leading-none">Play & Learn Garden</h4>
            <p className="text-[8px] font-bold text-slate-400">Score points with interactive games!</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[7px] font-black uppercase text-slate-400 block tracking-wider">My Points</span>
            <span className="text-xs font-black text-amber-600 leading-none">✨ {score}</span>
          </div>
          {streak > 0 && (
            <div className="bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-300">
              <span className="text-[10px] font-black text-amber-700">🔥 {streak}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Sandbox Area */}
      <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-xs space-y-4">
        {/* Question display */}
        <div className="text-center space-y-1.5">
          <span className="bg-indigo-50 text-indigo-700 font-black uppercase tracking-wider text-[8px] px-2.5 py-0.5 rounded-full border border-indigo-150 inline-block">
            Question {currentRound}
          </span>
          <h3 className="text-xs md:text-sm font-black text-slate-800 leading-snug">
            {roundData.question}
          </h3>
        </div>

        {/* 1. Custom Visuals per Chapter */}
        {chapterId === "g1_counting" && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap justify-center gap-2.5 bg-emerald-50/40 border border-emerald-100 p-4 rounded-2xl w-full max-w-xs shadow-inner">
              {Array.from({ length: roundData.targetCount }).map((_, idx) => {
                const isTapped = tappedApples.includes(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => handleAppleTap(idx)}
                    className={`w-10 h-10 rounded-2xl flex flex-col items-center justify-center text-xl transition-all duration-200 relative border-2 ${
                      isTapped 
                        ? "bg-rose-50 border-rose-500 scale-105 shadow-md" 
                        : "bg-white border-emerald-200 hover:border-emerald-400 hover:scale-102"
                    }`}
                  >
                    <span>🍎</span>
                    {isTapped && (
                      <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white font-black text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                        {tappedApples.indexOf(idx) + 1}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <span className="text-[8px] font-black uppercase text-slate-400 tracking-wider">
              Apples Counted: {tappedApples.length} / {roundData.targetCount}
            </span>
          </div>
        )}

        {chapterId === "g1_hin_gintee" && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap justify-center gap-2.5 bg-amber-50/30 border border-amber-100 p-4 rounded-2xl w-full max-w-xs shadow-inner">
              {Array.from({ length: roundData.targetCount }).map((_, idx) => (
                <div key={idx} className="w-10 h-10 rounded-2xl bg-white border border-amber-200 flex items-center justify-center text-xl shadow-xs">
                  🍇
                </div>
              ))}
            </div>
          </div>
        )}

        {chapterId === "g1_clock" && (
          <div className="py-2 space-y-4">
            {renderClockSVG(roundData.hour, roundData.minute)}
            <div className="bg-amber-50/50 border border-amber-200/50 rounded-2xl p-3 max-w-xs mx-auto text-center space-y-2 shadow-xs">
              <p className="text-[11px] font-extrabold text-rose-600 uppercase tracking-wide flex items-center justify-center gap-1.5">
                🔴 Step 1: Look at Short Hand (Hour) FIRST
              </p>
              <p className="text-[11px] font-extrabold text-sky-600 uppercase tracking-wide flex items-center justify-center gap-1.5">
                🔵 Step 2: Look at Long Hand (Minute) NEXT
              </p>
            </div>
          </div>
        )}

        {chapterId === "g1_compare" && (
          <div className="flex items-center justify-around bg-slate-50/50 p-4 rounded-2xl border border-slate-100 shadow-inner">
            <div className="flex flex-col items-center gap-2.5">
              <span className="text-xl font-black text-slate-700 bg-white border border-slate-200 px-3.5 py-1 rounded-xl shadow-xs">
                {roundData.num1}
              </span>
              <div className="flex flex-wrap max-w-[5.5rem] gap-1 justify-center">
                {Array.from({ length: roundData.num1 }).map((_, i) => (
                  <span key={i} className="text-sm select-none">⭐</span>
                ))}
              </div>
            </div>

            <div className="text-3xl text-slate-350 select-none font-black">
              {answered ? (
                feedback?.isCorrect ? (
                  <span className="animate-bounce block">🐊</span>
                ) : (
                  <span className="text-rose-500 block">❌</span>
                )
              ) : (
                "❓"
              )}
            </div>

            <div className="flex flex-col items-center gap-2.5">
              <span className="text-xl font-black text-slate-700 bg-white border border-slate-200 px-3.5 py-1 rounded-xl shadow-xs">
                {roundData.num2}
              </span>
              <div className="flex flex-wrap max-w-[5.5rem] gap-1 justify-center">
                {Array.from({ length: roundData.num2 }).map((_, i) => (
                  <span key={i} className="text-sm select-none">⭐</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {chapterId === "g1_shapes" && (
          <div className="flex justify-center py-2">
            <div 
              onClick={() => {
                setSpinDegree(prev => prev + 360);
                playSynthSound('tap');
              }}
              className="cursor-pointer select-none p-4 bg-amber-50/20 border-2 border-dashed border-amber-200/60 rounded-3xl flex flex-col items-center gap-2 hover:scale-[1.03] transition-all duration-300 animate-fade-in"
              style={{ transform: `rotate(${spinDegree}deg)`, transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
            >
              {roundData.correctAnswer.toLowerCase().includes("circle") && (
                <svg className="w-24 h-24 drop-shadow-md" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="fill-amber-400 stroke-amber-600 stroke-[3px]" />
                  <circle cx="50" cy="50" r="30" className="fill-white stroke-amber-500 stroke-[2px]" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="6" className="fill-amber-700" />
                  <line x1="50" y1="50" x2="50" y2="25" className="stroke-amber-700 stroke-[3px] stroke-linecap-round" />
                  <line x1="50" y1="50" x2="70" y2="50" className="stroke-amber-700 stroke-[2px] stroke-linecap-round" />
                </svg>
              )}
              {roundData.correctAnswer.toLowerCase().includes("square") && (
                <svg className="w-24 h-24 drop-shadow-md" viewBox="0 0 100 100">
                  <rect x="15" y="15" width="70" height="70" rx="8" className="fill-indigo-400 stroke-indigo-600 stroke-[3px]" />
                  <rect x="25" y="25" width="25" height="25" className="fill-indigo-700" />
                  <rect x="50" y="50" width="25" height="25" className="fill-indigo-700" />
                  <rect x="50" y="25" width="25" height="25" className="fill-white" />
                  <rect x="25" y="50" width="25" height="25" className="fill-white" />
                </svg>
              )}
              {roundData.correctAnswer.toLowerCase().includes("triangle") && (
                <svg className="w-24 h-24 drop-shadow-md" viewBox="0 0 100 100">
                  <polygon points="50,15 15,80 85,80" className="fill-rose-400 stroke-rose-600 stroke-[3px]" />
                  <circle cx="45" cy="65" r="4" className="fill-rose-700" />
                  <circle cx="55" cy="55" r="3" className="fill-rose-700" />
                  <circle cx="50" cy="72" r="3" className="fill-rose-700" />
                </svg>
              )}
              {roundData.correctAnswer.toLowerCase().includes("rectangle") && (
                <svg className="w-24 h-24 drop-shadow-md" viewBox="0 0 120 100">
                  <rect x="15" y="25" width="90" height="50" rx="6" className="fill-emerald-400 stroke-emerald-600 stroke-[3px]" />
                  <line x1="25" y1="35" x2="95" y2="35" className="stroke-white stroke-[2px]" />
                  <line x1="25" y1="45" x2="95" y2="45" className="stroke-white stroke-[2px]" />
                  <line x1="25" y1="55" x2="65" y2="55" className="stroke-white stroke-[2px]" />
                </svg>
              )}
              <span className="text-[9px] font-black text-amber-800 bg-white px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wide">
                Tap to Spin! 🌀
              </span>
            </div>
          </div>
        )}

        {chapterId === "g1_comparison" && (
          <div className="grid grid-cols-2 gap-3.5 bg-sky-50/20 p-4 rounded-3xl border border-sky-150/50 animate-fade-in">
            {roundData.options.map((opt: string) => {
              const isGiraffe = opt.includes("Giraffe");
              const isPencilLong = opt.includes("✏️=");
              const isElephant = opt.includes("Elephant");
              const isPuppy = opt.includes("Puppy");
              const isTree = opt.includes("Tree");
              const isButterfly = opt.includes("Butterfly");
              const isRabbit = opt.includes("Rabbit");

              let visualHeight = "h-20";
              let emojiSize = "text-3xl";
              let extraClasses = "";
              let emoji = "❓";

              if (isGiraffe) { emoji = "🦒"; visualHeight = "h-28"; emojiSize = "text-5xl"; extraClasses = "bg-amber-100/40 border-amber-300"; }
              else if (isPuppy) { emoji = "🐶"; visualHeight = "h-16"; emojiSize = "text-3xl"; extraClasses = "bg-orange-50/40 border-orange-200"; }
              else if (isElephant) { emoji = "🐘"; visualHeight = "h-24"; emojiSize = "text-5xl"; extraClasses = "bg-slate-100/50 border-slate-300"; }
              else if (isButterfly) { emoji = "🦋"; visualHeight = "h-14"; emojiSize = "text-2xl animate-pulse"; extraClasses = "bg-pink-50/40 border-pink-200"; }
              else if (isTree) { emoji = "🌴"; visualHeight = "h-28"; emojiSize = "text-5xl"; extraClasses = "bg-emerald-100/40 border-emerald-300"; }
              else if (isRabbit) { emoji = "🐰"; visualHeight = "h-16"; emojiSize = "text-3xl"; extraClasses = "bg-zinc-50/40 border-zinc-200"; }
              else if (isPencilLong) {
                const isShort = opt.includes("Short");
                emoji = "✏️";
                visualHeight = "h-16";
                emojiSize = isShort ? "text-2xl" : "text-4xl";
                extraClasses = isShort ? "bg-yellow-100/20 border-yellow-200" : "bg-yellow-50/40 border-yellow-300";
              }
              else { emoji = "📦"; }

              const isCorrectAnswer = opt === roundData.correctAnswer;
              
              return (
                <button
                  key={opt}
                  disabled={answered}
                  onClick={() => handleOptionClick(opt)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300 cursor-pointer shadow-xs ${extraClasses} ${
                    answered
                      ? isCorrectAnswer
                        ? "bg-emerald-50 border-emerald-500 scale-102 ring-4 ring-emerald-100"
                        : "bg-slate-50 border-slate-150 opacity-40 scale-95"
                      : "bg-white border-slate-200 hover:border-sky-400 hover:scale-102 hover:shadow-md active:scale-98"
                  }`}
                >
                  <div className={`flex items-center justify-center ${visualHeight} transition-all duration-300`}>
                    <span className={`${emojiSize} transform hover:scale-110 transition-transform duration-200`}>{emoji}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-700 mt-2 text-center leading-tight">
                    {opt.split(" (")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {(chapterId === "g1_tel_achulu" || chapterId === "g1_hin_swar" || chapterId === "g1_eng_alphabet") && (
          <div className="flex flex-col items-center justify-center py-4 bg-violet-50/20 rounded-3xl border border-violet-150/50 p-5 space-y-3 animate-fade-in">
            <span className="text-[9px] font-black uppercase text-violet-400 tracking-wider">Tap the letter to hear it!</span>
            <div 
              onClick={() => {
                playSynthSound('tap');
                if ('speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                  const letter = roundData.letter || (chapterId === "g1_eng_alphabet" ? roundData.question.match(/'([^']+)'/)?.[1] : "");
                  if (letter) {
                    const utterance = new SpeechSynthesisUtterance(letter);
                    utterance.lang = chapterId === "g1_tel_achulu" ? "te-IN" : chapterId === "g1_hin_swar" ? "hi-IN" : "en-US";
                    window.speechSynthesis.speak(utterance);
                  }
                }
              }}
              className="w-20 h-20 bg-white rounded-2xl border-2 border-violet-300 flex items-center justify-center shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span className="text-4xl font-black text-violet-800 font-sans">
                {roundData.letter || (chapterId === "g1_eng_alphabet" ? roundData.question.match(/'([^']+)'/)?.[1] : "🔡")}
              </span>
            </div>
            <button 
              onClick={() => {
                const letter = roundData.letter || (chapterId === "g1_eng_alphabet" ? roundData.question.match(/'([^']+)'/)?.[1] : "letter");
                if ('speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                  const utterance = new SpeechSynthesisUtterance(letter);
                  utterance.lang = chapterId === "g1_tel_achulu" ? "te-IN" : chapterId === "g1_hin_swar" ? "hi-IN" : "en-US";
                  window.speechSynthesis.speak(utterance);
                }
              }}
              className="flex items-center gap-1 px-3 py-1 bg-violet-100 hover:bg-violet-200 text-violet-700 font-black rounded-full text-[8px] uppercase tracking-wide transition cursor-pointer"
            >
              <span>🔊 Read Aloud</span>
            </button>
          </div>
        )}

        {(chapterId === "g1_evs_family" || chapterId === "g1_evs_animals" || chapterId === "g1_evs_seasons") && (
          <div className="flex flex-col items-center justify-center py-4 bg-emerald-50/20 rounded-3xl border border-emerald-150/50 p-5 space-y-3 animate-fade-in">
            <span className="text-[9px] font-black uppercase text-emerald-400 tracking-wider">Interactive Explorer</span>
            <div className="flex items-center justify-center gap-4">
              <span className="text-5xl animate-bounce duration-1000 select-none">
                {roundData.question.includes("rainbow") ? "🌈" : 
                 roundData.question.includes("bell") ? "🔔" : 
                 roundData.question.includes("rose") ? "🌹" : 
                 roundData.question.includes("mango") ? "🥭" : 
                 roundData.question.includes("teddy") ? "🧸" : 
                 roundData.question.includes("Lion") ? "🦁" : 
                 roundData.question.includes("Cow") ? "🐄" : 
                 roundData.question.includes("Puppy") ? "🐶" : 
                 roundData.question.includes("Tiger") ? "🐯" : 
                 roundData.question.includes("Sheep") ? "🐑" : 
                 roundData.question.includes("Raincoat") ? "🧥" : 
                 roundData.question.includes("Cap") ? "🧶" : 
                 roundData.question.includes("Cream") ? "🍦" : 
                 roundData.question.includes("Umbrella") ? "☂️" : "🌍"}
              </span>
            </div>
          </div>
        )}

        {(chapterId === "g1_tel_words" || chapterId === "g1_hin_fruits") && (
          <div className="flex flex-col items-center justify-center py-4 bg-pink-50/20 rounded-3xl border border-pink-150/50 p-5 space-y-3 animate-fade-in">
            <span className="text-[9px] font-black uppercase text-pink-400 tracking-wider">Word Challenge</span>
            <div className="text-5xl animate-pulse select-none">
              {roundData.question.includes("ఆట") || roundData.question.includes("⚽") ? "⚽" :
               roundData.question.includes("అల") || roundData.question.includes("🌊") ? "🌊" :
               roundData.question.includes("కల") || roundData.question.includes("💭") ? "💭" :
               roundData.question.includes("ఈల") || roundData.question.includes("😙") ? "😙" :
               roundData.question.includes("आम") || roundData.question.includes("🥭") ? "🥭" :
               roundData.question.includes("गुलाब") || roundData.question.includes("🌹") ? "🌹" :
               roundData.question.includes("सेब") || roundData.question.includes("🍎") ? "🍎" :
               roundData.question.includes("कमल") || roundData.question.includes("🪷") ? "🪷" : "🍉"}
            </div>
          </div>
        )}

        {/* Options grid */}
        {chapterId !== "g1_comparison" && (
          <div className={`grid ${roundData.options.length === 2 ? "grid-cols-2" : "grid-cols-3"} gap-2.5`}>
            {roundData.options.map((opt: string) => {
              const isCorrectAnswer = opt === roundData.correctAnswer;
              return (
                <button
                  key={opt}
                  disabled={answered}
                  onClick={() => handleOptionClick(opt)}
                  className={`py-3 px-1 rounded-2xl text-xs font-black transition-all duration-200 cursor-pointer shadow-sm text-center border-2 ${
                    answered
                      ? isCorrectAnswer
                        ? "bg-emerald-50 border-emerald-500 text-emerald-800 scale-102"
                        : "bg-slate-50 border-slate-100 text-slate-300 opacity-40"
                      : "bg-white hover:bg-indigo-50 hover:border-indigo-400 border-slate-200 text-slate-700 active:scale-98"
                  }`}
                  id={`btn_game_opt_${opt}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* Feedback display */}
        {feedback && (
          <div className={`p-4 rounded-2xl border text-center space-y-2.5 animate-fade-in ${
            feedback.isCorrect 
              ? "bg-[#e7f0e3] border-emerald-250 text-slate-800" 
              : "bg-rose-50 border-rose-200 text-slate-800"
          }`}>
            <div className="flex items-center justify-center gap-1.5">
              {feedback.isCorrect ? (
                <Check size={16} className="text-emerald-700 shrink-0" />
              ) : (
                <X size={16} className="text-rose-600 shrink-0" />
              )}
              <h5 className={`font-black text-xs uppercase tracking-wider ${feedback.isCorrect ? "text-emerald-800" : "text-rose-700"}`}>
                {feedback.isCorrect ? "Brilliant! ✨" : "Let's learn!"}
              </h5>
            </div>
            <p className="text-[10.5px] font-bold leading-normal text-slate-700">
              {feedback.message}
            </p>
            <button
              onClick={() => {
                if (feedback.isCorrect) {
                  setCurrentRound(prev => prev + 1);
                } else {
                  setRoundKey(prev => prev + 1);
                }
              }}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1 mx-auto shadow-sm"
              id="btn_game_next"
            >
              <span>{feedback.isCorrect ? "Next Challenge" : "Try Again"}</span>
              <ArrowRight size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
