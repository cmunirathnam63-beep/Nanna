import React from "react";
import { Sparkles, Check, X, RotateCcw, HelpCircle } from "lucide-react";

// ----------------------------------------------------
// 1. EVEN NUMBER GAME
// ----------------------------------------------------
export function EvenNumberGame() {
  const [score, setScore] = React.useState<number>(0);
  const [streak, setStreak] = React.useState<number>(0);
  const [highScore, setHighScore] = React.useState<number>(() => {
    try {
      return Number(localStorage.getItem("even_game_highscore") || "0");
    } catch {
      return 0;
    }
  });

  const [currentLevelNumbers, setCurrentLevelNumbers] = React.useState<number[]>([]);
  const [selectedNumber, setSelectedNumber] = React.useState<number | null>(null);
  const [gameFeedback, setGameFeedback] = React.useState<{
    isEven: boolean;
    message: string;
    isCorrect: boolean;
  } | null>(null);

  const generateNewRound = React.useCallback(() => {
    setSelectedNumber(null);
    setGameFeedback(null);
    const evens: number[] = [];
    const odds: number[] = [];
    while (evens.length < 2) {
      const n = Math.floor(Math.random() * 20) + 1;
      if (n % 2 === 0 && !evens.includes(n)) evens.push(n);
    }
    while (odds.length < 2) {
      const n = Math.floor(Math.random() * 20) + 1;
      if (n % 2 !== 0 && !odds.includes(n)) odds.push(n);
    }
    const combined = [...evens, ...odds].sort(() => Math.random() - 0.5);
    setCurrentLevelNumbers(combined);
  }, []);

  React.useEffect(() => {
    generateNewRound();
  }, [generateNewRound]);

  const handleNumberClick = (num: number) => {
    if (selectedNumber !== null) return;
    setSelectedNumber(num);
    const isEven = num % 2 === 0;
    if (isEven) {
      const newScore = score + 10;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newScore > highScore) {
        setHighScore(newScore);
        try {
          localStorage.setItem("even_game_highscore", String(newScore));
        } catch (e) {}
      }
      setGameFeedback({
        isEven: true,
        isCorrect: true,
        message: `Super! Cookie 🍪 ${num} is an EVEN number because all its pieces can be perfectly grouped in pairs with nobody left alone! 🎉`
      });
    } else {
      setStreak(0);
      setGameFeedback({
        isEven: false,
        isCorrect: false,
        message: `Aha! Cookie 🍪 ${num} is an ODD number! When we group them in pairs of 2, there is always 1 single piece left lonely with no partner! 😢`
      });
    }
  };

  const renderPairs = (count: number) => {
    const pairs = Math.floor(count / 2);
    const remainder = count % 2;
    const items = [];
    for (let i = 0; i < pairs; i++) {
      items.push(
        <div key={`pair-${i}`} className="inline-flex items-center gap-1 bg-emerald-100 border border-emerald-300 px-2 py-1 rounded-xl shadow-xs shrink-0 select-none">
          <span className="text-sm">🍎</span>
          <span className="text-sm">🍎</span>
        </div>
      );
    }
    if (remainder > 0) {
      items.push(
        <div key="remainder" className="inline-flex items-center bg-rose-100 border border-rose-350 px-2 py-1 rounded-xl shadow-xs shrink-0 relative select-none">
          <span className="text-sm">🍎</span>
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[7px] font-black uppercase text-rose-700 bg-white border border-rose-200 px-1 rounded-md whitespace-nowrap leading-none">Leftover!</span>
        </div>
      );
    }
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 border border-dashed border-slate-350 p-3 rounded-xl bg-white w-full max-w-sm mx-auto shadow-inner">
        {items}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50/40 to-teal-50/20 border-2 border-emerald-250 rounded-2xl p-4 space-y-3.5 shadow-xs" id="even_number_game_root">
      <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-emerald-100 shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-xl animate-bounce">🦖</span>
          <div>
            <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wide leading-none">Even Cookie Eater</h4>
            <p className="text-[8px] font-black text-emerald-600">Feed only EVEN cookies!</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-right">
          <div>
            <span className="text-[7px] font-black uppercase text-slate-400 tracking-wider block">Score</span>
            <span className="text-xs font-black text-emerald-700 leading-none">{score}</span>
          </div>
          {streak > 0 && (
            <div className="bg-emerald-100 px-1 rounded border border-emerald-300">
              <span className="text-[9px] font-black text-emerald-800">🔥 {streak}</span>
            </div>
          )}
        </div>
      </div>

      <div className="text-center space-y-1.5">
        <div className="text-3xl">
          {selectedNumber === null ? "😋" : num => num % 2 === 0 ? "🦕🎉" : "🤢"}
        </div>
        <p className="text-[10px] text-slate-600 font-bold max-w-[220px] mx-auto leading-normal">
          {selectedNumber === null ? (
            <span>Feed me an <strong className="text-emerald-700">EVEN number</strong> cookie!</span>
          ) : selectedNumber % 2 === 0 ? (
            <span className="text-emerald-700 font-extrabold">"Perfect! {selectedNumber} is perfectly even!"</span>
          ) : (
            <span className="text-rose-600 font-extrabold">"Ouch! {selectedNumber} leaves 1 leftover apple!"</span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {currentLevelNumbers.map((num) => (
          <button
            key={num}
            disabled={selectedNumber !== null}
            onClick={() => handleNumberClick(num)}
            className={`py-3 rounded-xl font-black text-xs transition-all cursor-pointer border-2 ${
              selectedNumber === num
                ? num % 2 === 0
                  ? "bg-emerald-50 border-emerald-500 text-emerald-800 scale-105"
                  : "bg-rose-50 border-rose-500 text-rose-800 scale-95 shadow-inner"
                : selectedNumber !== null
                ? "bg-slate-50 border-slate-100 text-slate-300 opacity-40"
                : "bg-white hover:bg-emerald-50 border-emerald-100 text-slate-800 hover:-translate-y-0.5"
            }`}
          >
            <span>🍪</span>
            <span className="block text-[10px] font-black mt-0.5">{num}</span>
          </button>
        ))}
      </div>

      {selectedNumber !== null && gameFeedback && (
        <div className="bg-white border border-emerald-100 rounded-xl p-3 space-y-3 shadow-xs animate-fade-in text-center">
          <p className="text-[10px] text-slate-700 font-bold leading-normal">
            {gameFeedback.message}
          </p>
          {renderPairs(selectedNumber)}
          <button
            onClick={generateNewRound}
            className="w-full py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer"
          >
            Play Next Round ➔
          </button>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 2. ODD NUMBER GAME
// ----------------------------------------------------
export function OddNumberGame() {
  const [score, setScore] = React.useState<number>(0);
  const [streak, setStreak] = React.useState<number>(0);
  const [highScore, setHighScore] = React.useState<number>(() => {
    try {
      return Number(localStorage.getItem("odd_game_highscore") || "0");
    } catch {
      return 0;
    }
  });

  const [currentLevelNumbers, setCurrentLevelNumbers] = React.useState<number[]>([]);
  const [selectedNumber, setSelectedNumber] = React.useState<number | null>(null);
  const [gameFeedback, setGameFeedback] = React.useState<{
    isOdd: boolean;
    message: string;
    isCorrect: boolean;
  } | null>(null);

  const generateNewRound = React.useCallback(() => {
    setSelectedNumber(null);
    setGameFeedback(null);
    const evens: number[] = [];
    const odds: number[] = [];
    while (evens.length < 2) {
      const n = Math.floor(Math.random() * 20) + 1;
      if (n % 2 === 0 && !evens.includes(n)) evens.push(n);
    }
    while (odds.length < 2) {
      const n = Math.floor(Math.random() * 20) + 1;
      if (n % 2 !== 0 && !odds.includes(n)) odds.push(n);
    }
    const combined = [...evens, ...odds].sort(() => Math.random() - 0.5);
    setCurrentLevelNumbers(combined);
  }, []);

  React.useEffect(() => {
    generateNewRound();
  }, [generateNewRound]);

  const handleNumberClick = (num: number) => {
    if (selectedNumber !== null) return;
    setSelectedNumber(num);
    const isOdd = num % 2 !== 0;
    if (isOdd) {
      const newScore = score + 10;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newScore > highScore) {
        setHighScore(newScore);
        try {
          localStorage.setItem("odd_game_highscore", String(newScore));
        } catch (e) {}
      }
      setGameFeedback({
        isOdd: true,
        isCorrect: true,
        message: `Hooray! Balloon 🎈 ${num} is an ODD number! It leaves 1 lonely star with no partner, giving it lift off! 🚀`
      });
    } else {
      setStreak(0);
      setGameFeedback({
        isOdd: false,
        isCorrect: false,
        message: `Oops! Balloon 🎈 ${num} is an EVEN number! It can be divided perfectly in pairs with nothing left over, so it's too balanced to rise! 🎈`
      });
    }
  };

  const renderPairs = (count: number) => {
    const pairs = Math.floor(count / 2);
    const remainder = count % 2;
    const items = [];
    for (let i = 0; i < pairs; i++) {
      items.push(
        <div key={`pair-${i}`} className="inline-flex items-center gap-1 bg-teal-100 border border-teal-300 px-2 py-1 rounded-xl shadow-xs shrink-0 select-none">
          <span className="text-sm">⭐</span>
          <span className="text-sm">⭐</span>
        </div>
      );
    }
    if (remainder > 0) {
      items.push(
        <div key="remainder" className="inline-flex items-center bg-amber-100 border border-amber-350 px-2 py-1 rounded-xl shadow-xs shrink-0 relative select-none">
          <span className="text-sm">⭐</span>
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[7px] font-black uppercase text-amber-800 bg-white border border-amber-200 px-1 rounded-md whitespace-nowrap leading-none animate-pulse">Leftover!</span>
        </div>
      );
    }
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 border border-dashed border-teal-200 p-3 rounded-xl bg-white w-full max-w-sm mx-auto shadow-inner">
        {items}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-teal-50/40 to-blue-50/20 border-2 border-teal-250 rounded-2xl p-4 space-y-3.5 shadow-xs" id="odd_number_game_root">
      <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-teal-100 shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-xl animate-bounce">🎈</span>
          <div>
            <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wide leading-none">Odd Balloon Lifter</h4>
            <p className="text-[8px] font-black text-teal-600">Pop only ODD balloons to rise!</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-right">
          <div>
            <span className="text-[7px] font-black uppercase text-slate-400 tracking-wider block">Score</span>
            <span className="text-xs font-black text-teal-700 leading-none">{score}</span>
          </div>
          {streak > 0 && (
            <div className="bg-teal-100 px-1 rounded border border-teal-300">
              <span className="text-[9px] font-black text-teal-800">🔥 {streak}</span>
            </div>
          )}
        </div>
      </div>

      <div className="text-center space-y-1.5">
        <div className="text-3xl animate-bounce">
          {selectedNumber === null ? "🐻🎈" : selectedNumber % 2 !== 0 ? "🐻🚀" : "🐻📉"}
        </div>
        <p className="text-[10px] text-slate-600 font-bold max-w-[220px] mx-auto leading-normal">
          {selectedNumber === null ? (
            <span>Tap an <strong className="text-teal-700">ODD balloon</strong> to lift Teddy!</span>
          ) : selectedNumber % 2 !== 0 ? (
            <span className="text-teal-700 font-extrabold">"Brilliant! {selectedNumber} is ODD! Let's fly!"</span>
          ) : (
            <span className="text-rose-600 font-extrabold">"Oh! {selectedNumber} is EVEN! Too heavy!"</span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {currentLevelNumbers.map((num) => (
          <button
            key={num}
            disabled={selectedNumber !== null}
            onClick={() => handleNumberClick(num)}
            className={`py-3 rounded-xl font-black text-xs transition-all cursor-pointer border-2 ${
              selectedNumber === num
                ? num % 2 !== 0
                  ? "bg-teal-50 border-teal-500 text-teal-800 scale-105"
                  : "bg-rose-50 border-rose-500 text-rose-800 scale-95 shadow-inner"
                : selectedNumber !== null
                ? "bg-slate-50 border-slate-100 text-slate-300 opacity-40"
                : "bg-white hover:bg-teal-50 border-teal-100 text-slate-800 hover:-translate-y-0.5"
            }`}
          >
            <span>🎈</span>
            <span className="block text-[10px] font-black mt-0.5">{num}</span>
          </button>
        ))}
      </div>

      {selectedNumber !== null && gameFeedback && (
        <div className="bg-white border border-teal-100 rounded-xl p-3 space-y-3 shadow-xs animate-fade-in text-center">
          <p className="text-[10px] text-slate-700 font-bold leading-normal">
            {gameFeedback.message}
          </p>
          {renderPairs(selectedNumber)}
          <button
            onClick={generateNewRound}
            className="w-full py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer"
          >
            Play Next Round ➔
          </button>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 3. PRIME NUMBER GAME
// ----------------------------------------------------
export function PrimeNumberGame() {
  const [score, setScore] = React.useState<number>(0);
  const [streak, setStreak] = React.useState<number>(0);
  const [highScore, setHighScore] = React.useState<number>(() => {
    try {
      return Number(localStorage.getItem("prime_game_highscore") || "0");
    } catch {
      return 0;
    }
  });

  const [currentLevelChests, setCurrentLevelChests] = React.useState<number[]>([]);
  const [selectedChest, setSelectedChest] = React.useState<number | null>(null);
  const [gameFeedback, setGameFeedback] = React.useState<{
    isPrime: boolean;
    factors: number[];
    message: string;
    isCorrect: boolean;
  } | null>(null);

  const isPrime = (num: number) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const getFactors = (num: number) => {
    const facts: number[] = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) facts.push(i);
    }
    return facts;
  };

  const generateNewRound = React.useCallback(() => {
    setSelectedChest(null);
    setGameFeedback(null);
    const primes: number[] = [];
    const composites: number[] = [];
    while (primes.length < 2) {
      const n = Math.floor(Math.random() * 28) + 2; // 2 to 30
      if (isPrime(n) && !primes.includes(n)) primes.push(n);
    }
    while (composites.length < 2) {
      const n = Math.floor(Math.random() * 28) + 4; // 4 to 30
      if (!isPrime(n) && !composites.includes(n)) composites.push(n);
    }
    const combined = [...primes, ...composites].sort(() => Math.random() - 0.5);
    setCurrentLevelChests(combined);
  }, []);

  React.useEffect(() => {
    generateNewRound();
  }, [generateNewRound]);

  const handleChestClick = (num: number) => {
    if (selectedChest !== null) return;
    setSelectedChest(num);
    const primeCheck = isPrime(num);
    const factors = getFactors(num);
    
    if (primeCheck) {
      const newScore = score + 10;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newScore > highScore) {
        setHighScore(newScore);
        try {
          localStorage.setItem("prime_game_highscore", String(newScore));
        } catch (e) {}
      }
      setGameFeedback({
        isPrime: true,
        factors,
        isCorrect: true,
        message: `Incredible! Chest 🗝️ ${num} opened and poured shiny gold! ✨ It only has EXACTLY 2 factors: 1 and itself (${num})!`
      });
    } else {
      setStreak(0);
      setGameFeedback({
        isPrime: false,
        factors,
        isCorrect: false,
        message: `Locked! 🔒 Chest ${num} is a COMPOSITE number. It has more than two factors: [${factors.join(", ")}]. Thus, it's not prime!`
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50/40 to-yellow-50/20 border-2 border-amber-250 rounded-2xl p-4 space-y-3.5 shadow-xs" id="prime_number_game_root">
      <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-amber-100 shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-xl animate-bounce">🪙</span>
          <div>
            <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wide leading-none">Prime Chest Hunter</h4>
            <p className="text-[8px] font-black text-amber-600">Open only PRIME chests for gold!</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-right">
          <div>
            <span className="text-[7px] font-black uppercase text-slate-400 tracking-wider block">Score</span>
            <span className="text-xs font-black text-amber-700 leading-none">{score}</span>
          </div>
          {streak > 0 && (
            <div className="bg-amber-100 px-1 rounded border border-amber-300">
              <span className="text-[9px] font-black text-amber-800">🔥 {streak}</span>
            </div>
          )}
        </div>
      </div>

      <div className="text-center space-y-1">
        <div className="text-3xl">
          {selectedChest === null ? "🤠🧭" : isPrime(selectedChest) ? "👑🪙" : "🔒💥"}
        </div>
        <p className="text-[10px] text-slate-600 font-bold max-w-[220px] mx-auto leading-normal">
          {selectedChest === null ? (
            <span>Find the chest with a <strong className="text-amber-700">PRIME number</strong>!</span>
          ) : isPrime(selectedChest) ? (
            <span className="text-amber-700 font-extrabold">"Success! {selectedChest} is Prime!"</span>
          ) : (
            <span className="text-rose-600 font-extrabold">"Oops! {selectedChest} is Composite!"</span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {currentLevelChests.map((num) => (
          <button
            key={num}
            disabled={selectedChest !== null}
            onClick={() => handleChestClick(num)}
            className={`py-3.5 rounded-xl font-black text-xs transition-all cursor-pointer border-2 ${
              selectedChest === num
                ? isPrime(num)
                  ? "bg-amber-50 border-amber-500 text-amber-800 scale-105"
                  : "bg-rose-50 border-rose-500 text-rose-800 scale-95 shadow-inner"
                : selectedChest !== null
                ? "bg-slate-50 border-slate-100 text-slate-300 opacity-40"
                : "bg-white hover:bg-amber-50 border-amber-100 text-slate-800 hover:-translate-y-0.5"
            }`}
          >
            <span>{selectedChest === num && isPrime(num) ? "🔓" : "📦"}</span>
            <span className="block text-[10px] font-black mt-0.5">{num}</span>
          </button>
        ))}
      </div>

      {selectedChest !== null && gameFeedback && (
        <div className="bg-white border border-amber-100 rounded-xl p-3 space-y-2 shadow-xs animate-fade-in text-center">
          <p className="text-[10px] text-slate-700 font-bold leading-normal">
            {gameFeedback.message}
          </p>
          <div className="flex justify-center gap-1.5 flex-wrap">
            {gameFeedback.factors.map((f) => (
              <span key={f} className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-md text-[9px] font-black text-slate-600">
                Factor: {f}
              </span>
            ))}
          </div>
          <button
            onClick={generateNewRound}
            className="w-full py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer"
          >
            Play Next Round ➔
          </button>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 4. COMPOSITE NUMBER GAME
// ----------------------------------------------------
export function CompositeNumberGame() {
  const [score, setScore] = React.useState<number>(0);
  const [streak, setStreak] = React.useState<number>(0);
  const [highScore, setHighScore] = React.useState<number>(() => {
    try {
      return Number(localStorage.getItem("composite_game_highscore") || "0");
    } catch {
      return 0;
    }
  });

  const [currentLevelBlocks, setCurrentLevelBlocks] = React.useState<number[]>([]);
  const [selectedBlock, setSelectedBlock] = React.useState<number | null>(null);
  const [gameFeedback, setGameFeedback] = React.useState<{
    isComposite: boolean;
    splits: string;
    message: string;
    isCorrect: boolean;
  } | null>(null);

  const isPrime = (num: number) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const getSplitPair = (num: number): string => {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        return `${i} × ${num / i}`;
      }
    }
    return "";
  };

  const generateNewRound = React.useCallback(() => {
    setSelectedBlock(null);
    setGameFeedback(null);
    const primes: number[] = [];
    const composites: number[] = [];
    while (primes.length < 2) {
      const n = Math.floor(Math.random() * 28) + 2;
      if (isPrime(n) && !primes.includes(n)) primes.push(n);
    }
    while (composites.length < 2) {
      const n = Math.floor(Math.random() * 28) + 4;
      if (!isPrime(n) && !composites.includes(n)) composites.push(n);
    }
    const combined = [...primes, ...composites].sort(() => Math.random() - 0.5);
    setCurrentLevelBlocks(combined);
  }, []);

  React.useEffect(() => {
    generateNewRound();
  }, [generateNewRound]);

  const handleBlockClick = (num: number) => {
    if (selectedBlock !== null) return;
    setSelectedBlock(num);
    const compositeCheck = !isPrime(num) && num > 1;
    const splitStr = getSplitPair(num);
    
    if (compositeCheck) {
      const newScore = score + 10;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newScore > highScore) {
        setHighScore(newScore);
        try {
          localStorage.setItem("composite_game_highscore", String(newScore));
        } catch (e) {}
      }
      setGameFeedback({
        isComposite: true,
        splits: splitStr,
        isCorrect: true,
        message: `Boom! 🔨 Block ${num} split wide open into factors: ${splitStr}! That means it has more than 2 factors, making it Composite! 🧱`
      });
    } else {
      setStreak(0);
      setGameFeedback({
        isComposite: false,
        splits: "",
        isCorrect: false,
        message: `Solid steel! 🛡️ Block ${num} is a PRIME number and cannot be split into any factor pairs other than 1 and itself. You failed to break it!`
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50/40 to-indigo-50/20 border-2 border-blue-250 rounded-2xl p-4 space-y-3.5 shadow-xs" id="composite_number_game_root">
      <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-blue-100 shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-xl animate-bounce">🧱</span>
          <div>
            <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wide leading-none">Composite Brick Smasher</h4>
            <p className="text-[8px] font-black text-blue-600">Break only COMPOSITE bricks to build!</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-right">
          <div>
            <span className="text-[7px] font-black uppercase text-slate-400 tracking-wider block">Score</span>
            <span className="text-xs font-black text-blue-700 leading-none">{score}</span>
          </div>
          {streak > 0 && (
            <div className="bg-blue-100 px-1 rounded border border-blue-300">
              <span className="text-[9px] font-black text-blue-800">🔥 {streak}</span>
            </div>
          )}
        </div>
      </div>

      <div className="text-center space-y-1.5">
        <div className="text-3xl">
          {selectedBlock === null ? "🔨👷" : !isPrime(selectedBlock) ? "💥🏗️" : "🧱🛡️"}
        </div>
        <p className="text-[10px] text-slate-600 font-bold max-w-[220px] mx-auto leading-normal">
          {selectedBlock === null ? (
            <span>Tap a <strong className="text-blue-700">COMPOSITE brick</strong> to break it!</span>
          ) : !isPrime(selectedBlock) ? (
            <span className="text-blue-700 font-extrabold">"Smashed! {selectedBlock} split perfectly!"</span>
          ) : (
            <span className="text-rose-600 font-extrabold">"Clang! {selectedBlock} is unbreakable!"</span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {currentLevelBlocks.map((num) => (
          <button
            key={num}
            disabled={selectedBlock !== null}
            onClick={() => handleBlockClick(num)}
            className={`py-3.5 rounded-xl font-black text-xs transition-all cursor-pointer border-2 ${
              selectedBlock === num
                ? !isPrime(num)
                  ? "bg-blue-50 border-blue-500 text-blue-800 scale-105"
                  : "bg-rose-50 border-rose-500 text-rose-800 scale-95 shadow-inner"
                : selectedBlock !== null
                ? "bg-slate-50 border-slate-100 text-slate-300 opacity-40"
                : "bg-white hover:bg-blue-50 border-blue-100 text-slate-800 hover:-translate-y-0.5"
            }`}
          >
            <span>{selectedBlock === num && !isPrime(num) ? "🧱💥" : "🧱"}</span>
            <span className="block text-[10px] font-black mt-0.5">{num}</span>
          </button>
        ))}
      </div>

      {selectedBlock !== null && gameFeedback && (
        <div className="bg-white border border-blue-100 rounded-xl p-3 space-y-3 shadow-xs animate-fade-in text-center">
          <p className="text-[10px] text-slate-700 font-bold leading-normal">
            {gameFeedback.message}
          </p>
          {gameFeedback.isComposite && (
            <div className="bg-blue-50 border border-blue-100 p-2.5 rounded-lg flex items-center justify-center gap-1 text-[11px] font-mono text-blue-900 font-black">
              <span>Factors of {selectedBlock}: 1, </span>
              <span className="text-rose-600 font-black">{gameFeedback.splits.replace(" × ", ", ")}</span>
              <span>, {selectedBlock}</span>
            </div>
          )}
          <button
            onClick={generateNewRound}
            className="w-full py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer"
          >
            Play Next Round ➔
          </button>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 5. SQUARE NUMBER GAME
// ----------------------------------------------------
export function SquareNumberGame() {
  const [gridSize, setGridSize] = React.useState<number>(3); // 3x3 initially
  const totalDots = gridSize * gridSize;

  return (
    <div className="bg-gradient-to-br from-violet-50/40 to-fuchsia-50/20 border-2 border-violet-250 rounded-2xl p-4 space-y-3.5 shadow-xs" id="square_number_game_root">
      {/* Visual Dot Grid Maker */}
      <div className="bg-white p-2.5 rounded-xl border border-violet-100 shadow-xs text-center space-y-2">
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] font-black text-slate-800 uppercase tracking-wide">Perfect Square Dot Visualizer</span>
          <span className="text-xs font-black text-violet-700">{gridSize} &times; {gridSize} = {totalDots}</span>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center justify-center min-h-[120px] relative">
          <div 
            className="grid gap-2 animate-fade-in"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: totalDots }).map((_, idx) => (
              <div 
                key={idx} 
                className="w-4 h-4 bg-gradient-to-tr from-violet-600 to-fuchsia-500 rounded-full animate-bounce shadow-xs"
                style={{ animationDelay: `${(Math.floor(idx / gridSize) + (idx % gridSize)) * 0.05}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Controller */}
      <div className="space-y-2 bg-white border border-violet-100 rounded-xl p-3 shadow-xs">
        <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">Adjust Square Grid Size</span>
        <div className="flex justify-between items-center gap-1.5">
          {[2, 3, 4, 5, 6].map((size) => (
            <button
              key={size}
              onClick={() => setGridSize(size)}
              className={`flex-1 py-1.5 rounded-lg font-black text-[10px] transition cursor-pointer border ${
                gridSize === size
                  ? "bg-violet-700 border-violet-700 text-white shadow-xs"
                  : "bg-slate-50 hover:bg-violet-50 border-slate-200 text-slate-700"
              }`}
            >
              {size}x{size}
            </button>
          ))}
        </div>
      </div>

      {/* Sutra Explanation */}
      <div className="bg-violet-50 border border-violet-100 rounded-xl p-3 text-center space-y-1">
        <span className="text-[8px] font-black uppercase text-violet-800 tracking-widest block">CBSE SUTRA: Square Numbers</span>
        <p className="text-[10px] text-slate-700 font-bold leading-normal">
          Multiplying a number by <strong>itself</strong> forms a square! 
          We call <strong className="text-violet-800">{totalDots}</strong> a perfect square because we can arrange exactly {totalDots} dots in a perfect <strong className="text-violet-800">{gridSize} by {gridSize}</strong> square! ⏹️
        </p>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 6. MULTIPLES GAME
// ----------------------------------------------------
export function MultiplesNumberGame() {
  const [score, setScore] = React.useState<number>(0);
  const [targetBase, setTargetBase] = React.useState<number>(3); // Multiples of 3 initially
  const [currentPads, setCurrentPads] = React.useState<number[]>([]);
  const [selectedPad, setSelectedPad] = React.useState<number | null>(null);
  const [feedback, setFeedback] = React.useState<{
    isCorrect: boolean;
    message: string;
  } | null>(null);

  const generateRound = React.useCallback(() => {
    setSelectedPad(null);
    setFeedback(null);
    const multiples: number[] = [];
    const nonMultiples: number[] = [];
    while (multiples.length < 2) {
      const mult = targetBase * (Math.floor(Math.random() * 8) + 1);
      if (!multiples.includes(mult)) multiples.push(mult);
    }
    while (nonMultiples.length < 2) {
      const val = Math.floor(Math.random() * 30) + 1;
      if (val % targetBase !== 0 && !nonMultiples.includes(val)) nonMultiples.push(val);
    }
    const combined = [...multiples, ...nonMultiples].sort(() => Math.random() - 0.5);
    setCurrentPads(combined);
  }, [targetBase]);

  React.useEffect(() => {
    generateRound();
  }, [generateRound]);

  const handlePadClick = (num: number) => {
    if (selectedPad !== null) return;
    setSelectedPad(num);
    const isCorrect = num % targetBase === 0;
    if (isCorrect) {
      setScore(prev => prev + 10);
      setFeedback({
        isCorrect: true,
        message: `Boing! 🐸 Froggy hopped onto ${num} successfully! ${targetBase} × ${num / targetBase} = ${num}. It is in the table of ${targetBase}! 🌟`
      });
    } else {
      setFeedback({
        isCorrect: false,
        message: `Splash! 💦 ${num} is not a multiple of ${targetBase}. It doesn't divide evenly by ${targetBase}! Froggy fell into the river!`
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-rose-50/40 to-orange-50/20 border-2 border-rose-250 rounded-2xl p-4 space-y-3.5 shadow-xs" id="multiples_game_root">
      <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-rose-100 shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-xl animate-bounce">🐸</span>
          <div>
            <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wide leading-none">Froggy Multiple Hopper</h4>
            <p className="text-[8px] font-black text-rose-600">Hop only on multiples of {targetBase}!</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[7px] font-black uppercase text-slate-400 tracking-wider block">Score</span>
          <span className="text-xs font-black text-rose-700 leading-none">{score}</span>
        </div>
      </div>

      <div className="text-center space-y-1.5">
        <div className="text-3xl">
          {selectedPad === null ? "🐸🌾" : feedback?.isCorrect ? "🐸🥳" : "🐸🌊"}
        </div>
        <div className="flex justify-center items-center gap-1">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Select target table:</span>
          {[2, 3, 4, 5].map((b) => (
            <button
              key={b}
              onClick={() => setTargetBase(b)}
              className={`px-1.5 py-0.5 rounded text-[10px] font-black border transition cursor-pointer ${
                targetBase === b ? "bg-rose-600 border-rose-600 text-white" : "bg-white border-slate-200 text-slate-700"
              }`}
            >
              {b}x
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {currentPads.map((num) => (
          <button
            key={num}
            disabled={selectedPad !== null}
            onClick={() => handlePadClick(num)}
            className={`py-3.5 rounded-xl font-black text-xs transition-all cursor-pointer border-2 ${
              selectedPad === num
                ? num % targetBase === 0
                  ? "bg-rose-50 border-rose-500 text-rose-800 scale-105"
                  : "bg-rose-50 border-rose-500 text-rose-800 scale-95 shadow-inner"
                : selectedPad !== null
                ? "bg-slate-50 border-slate-100 text-slate-300 opacity-40"
                : "bg-white hover:bg-rose-50 border-rose-100 text-slate-800 hover:-translate-y-0.5"
            }`}
          >
            <span>🍀</span>
            <span className="block text-[10px] font-black mt-0.5">{num}</span>
          </button>
        ))}
      </div>

      {selectedPad !== null && feedback && (
        <div className="bg-white border border-rose-100 rounded-xl p-3 space-y-3 shadow-xs animate-fade-in text-center">
          <p className="text-[10px] text-slate-700 font-bold leading-normal">
            {feedback.message}
          </p>
          <button
            onClick={generateRound}
            className="w-full py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer"
          >
            Play Next Round ➔
          </button>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 7. DIVISIBILITY LAB GAME
// ----------------------------------------------------
export function DivisibilityGame() {
  const [testNumber, setTestNumber] = React.useState<number>(135);
  const [selectedRule, setSelectedRule] = React.useState<2 | 3 | 5 | 10>(3);
  const [userInput, setUserInput] = React.useState<boolean | null>(null);
  const [feedback, setFeedback] = React.useState<string | null>(null);

  const generateNewTest = () => {
    const numbers = [12, 45, 135, 120, 99, 218, 335, 410, 504, 819];
    const nextNum = numbers[Math.floor(Math.random() * numbers.length)];
    setTestNumber(nextNum);
    setUserInput(null);
    setFeedback(null);
  };

  const checkDivisibility = (num: number, rule: number): boolean => {
    return num % rule === 0;
  };

  const getExplanation = (num: number, rule: number): string => {
    const isDiv = num % rule === 0;
    const lastDigit = num % 10;
    if (rule === 2) {
      return `For 2: Look at the last digit: ${lastDigit}. Since ${lastDigit} is ${lastDigit % 2 === 0 ? "even" : "odd"}, ${num} is ${isDiv ? "" : "NOT "}divisible by 2!`;
    }
    if (rule === 3) {
      const digits = String(num).split("").map(Number);
      const sum = digits.reduce((a, b) => a + b, 0);
      return `For 3: Sum of the digits of ${num} = ${digits.join(" + ")} = ${sum}. Since ${sum} is ${sum % 3 === 0 ? "" : "NOT "}divisible by 3, the entire number ${num} is ${isDiv ? "" : "NOT "}divisible by 3!`;
    }
    if (rule === 5) {
      return `For 5: Look at the last digit: ${lastDigit}. Since it ends in ${lastDigit === 0 || lastDigit === 5 ? lastDigit : lastDigit}, ${num} is ${isDiv ? "" : "NOT "}divisible by 5!`;
    }
    return `For 10: Look at the last digit: ${lastDigit}. A number must end in 0 to be divisible by 10. Thus, ${num} is ${isDiv ? "" : "NOT "}divisible by 10!`;
  };

  const handleAnswer = (ans: boolean) => {
    const correct = checkDivisibility(testNumber, selectedRule);
    setUserInput(ans);
    if (ans === correct) {
      setFeedback(`Correct! 🥳 ${getExplanation(testNumber, selectedRule)}`);
    } else {
      setFeedback(`Oops! Incorrect. 😢 ${getExplanation(testNumber, selectedRule)}`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-sky-50/40 to-blue-50/20 border-2 border-sky-250 rounded-2xl p-4 space-y-3.5 shadow-xs" id="divisibility_game_root">
      <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-xs text-center space-y-2">
        <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Divisibility Inspector Lab 🔍</div>
        <div className="text-3xl font-mono font-black text-slate-800 tracking-wider animate-pulse">{testNumber}</div>
        
        <div className="flex justify-center gap-1">
          {[2, 3, 5, 10].map((rule) => (
            <button
              key={rule}
              onClick={() => {
                setSelectedRule(rule as any);
                setUserInput(null);
                setFeedback(null);
              }}
              className={`px-2 py-1 rounded-lg text-xs font-black border transition cursor-pointer ${
                selectedRule === rule ? "bg-sky-700 border-sky-700 text-white" : "bg-slate-50 border-slate-250 text-slate-700"
              }`}
            >
              Test Rule: {rule}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-sky-50/50 border border-sky-100 p-3 rounded-xl text-center space-y-3">
        <p className="text-[11px] text-slate-800 font-extrabold leading-normal">
          Is the number <strong className="text-sky-800 text-xs font-black">{testNumber}</strong> divisible by <strong className="text-sky-800 text-xs font-black">{selectedRule}</strong>?
        </p>
        
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleAnswer(true)}
            disabled={userInput !== null}
            className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer border-2 transition ${
              userInput !== null
                ? checkDivisibility(testNumber, selectedRule) === true
                  ? "bg-emerald-100 border-emerald-500 text-emerald-800"
                  : "bg-slate-50 border-slate-200 text-slate-300"
                : "bg-white hover:bg-emerald-50 border-emerald-300 text-emerald-700"
            }`}
          >
            Yes, divisible!
          </button>
          <button
            onClick={() => handleAnswer(false)}
            disabled={userInput !== null}
            className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer border-2 transition ${
              userInput !== null
                ? checkDivisibility(testNumber, selectedRule) === false
                  ? "bg-emerald-100 border-emerald-500 text-emerald-800"
                  : "bg-slate-50 border-slate-200 text-slate-300"
                : "bg-white hover:bg-rose-50 border-rose-300 text-rose-700"
            }`}
          >
            No, not divisible!
          </button>
        </div>
      </div>

      {feedback && (
        <div className="bg-white border border-sky-100 rounded-xl p-3 space-y-2 shadow-xs animate-fade-in text-center">
          <p className="text-[10px] text-slate-700 font-bold leading-normal">
            {feedback}
          </p>
          <button
            onClick={generateNewTest}
            className="w-full py-1.5 bg-sky-700 hover:bg-sky-800 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer"
          >
            Inspect Next Number ➔
          </button>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 8. REAL NUMBER SORTER GAME
// ----------------------------------------------------
export function RealNumberGame() {
  const [score, setScore] = React.useState<number>(0);
  const [testNumber, setTestNumber] = React.useState<{ val: string; type: "integer" | "rational" | "irrational" }>({ val: "5", type: "integer" });
  const [feedback, setFeedback] = React.useState<string | null>(null);

  const generateNumber = () => {
    const bank: { val: string; type: "integer" | "rational" | "irrational" }[] = [
      { val: "7", type: "integer" },
      { val: "-12", type: "integer" },
      { val: "0", type: "integer" },
      { val: "2/3", type: "rational" },
      { val: "0.75", type: "rational" },
      { val: "-3.5", type: "rational" },
      { val: "√2", type: "irrational" },
      { val: "π (pi)", type: "irrational" },
      { val: "√5", type: "irrational" },
    ];
    const nextItem = bank[Math.floor(Math.random() * bank.length)];
    setTestNumber(nextItem);
    setFeedback(null);
  };

  const handleSort = (basket: "integer" | "rational" | "irrational") => {
    if (feedback !== null) return;
    if (basket === testNumber.type) {
      setScore(prev => prev + 10);
      setFeedback(`Excellent! 🥳 "${testNumber.val}" is correctly placed. It is a ${testNumber.type.toUpperCase()}!`);
    } else {
      setFeedback(`Oops! 😢 "${testNumber.val}" belongs to ${testNumber.type.toUpperCase()}, not ${basket.toUpperCase()}!`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/40 to-violet-50/20 border-2 border-indigo-250 rounded-2xl p-4 space-y-3.5 shadow-xs" id="real_number_game_root">
      <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-indigo-100 shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-xl animate-bounce">🌍</span>
          <div>
            <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wide leading-none">Real World Sorter</h4>
            <p className="text-[8px] font-black text-indigo-600">Sort numbers to correct categories!</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[7px] font-black uppercase text-slate-400 tracking-wider block">Score</span>
          <span className="text-xs font-black text-indigo-700 leading-none">{score}</span>
        </div>
      </div>

      <div className="bg-white p-3.5 rounded-xl border border-indigo-100 shadow-xs text-center space-y-1">
        <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest block">Classify This Number:</span>
        <div className="text-2xl font-black text-indigo-900 font-mono py-1">{testNumber.val}</div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => handleSort("integer")}
          disabled={feedback !== null}
          className="flex flex-col items-center justify-center p-2 bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 border border-indigo-300 text-indigo-900 rounded-xl cursor-pointer shadow-xs font-bold text-center leading-tight transition hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="text-base mb-1">🧱</span>
          <span className="text-[9px] font-black uppercase">Integer</span>
          <span className="text-[7px] text-slate-500 block">(पूर्णांक)</span>
        </button>
        <button
          onClick={() => handleSort("rational")}
          disabled={feedback !== null}
          className="flex flex-col items-center justify-center p-2 bg-gradient-to-br from-sky-50 to-sky-100 hover:from-sky-100 border border-sky-300 text-sky-900 rounded-xl cursor-pointer shadow-xs font-bold text-center leading-tight transition hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="text-base mb-1">🍕</span>
          <span className="text-[9px] font-black uppercase">Rational</span>
          <span className="text-[7px] text-slate-500 block">(परिमेय)</span>
        </button>
        <button
          onClick={() => handleSort("irrational")}
          disabled={feedback !== null}
          className="flex flex-col items-center justify-center p-2 bg-gradient-to-br from-rose-50 to-rose-100 hover:from-rose-100 border border-rose-300 text-rose-900 rounded-xl cursor-pointer shadow-xs font-bold text-center leading-tight transition hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="text-base mb-1">🌀</span>
          <span className="text-[9px] font-black uppercase">Irrational</span>
          <span className="text-[7px] text-slate-500 block">(अपरिमेय)</span>
        </button>
      </div>

      {feedback && (
        <div className="bg-white border border-indigo-100 rounded-xl p-3 space-y-2 shadow-xs animate-fade-in text-center">
          <p className="text-[10px] text-slate-700 font-bold leading-normal">
            {feedback}
          </p>
          <button
            onClick={generateNumber}
            className="w-full py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer"
          >
            Sort Next Number ➔
          </button>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 9. IMAGINARY COMPASS GAME
// ----------------------------------------------------
export function ImaginaryNumberGame() {
  const [power, setPower] = React.useState<number>(1);

  const getPowerValue = (p: number): string => {
    const rem = p % 4;
    if (rem === 1) return "i";
    if (rem === 2) return "-1";
    if (rem === 3) return "-i";
    return "1";
  };

  const getPowerAngle = (p: number): number => {
    const rem = p % 4;
    if (rem === 1) return 90; // East
    if (rem === 2) return 180; // South
    if (rem === 3) return 270; // West
    return 0; // North
  };

  return (
    <div className="bg-gradient-to-br from-fuchsia-50/40 to-pink-50/20 border-2 border-fuchsia-250 rounded-2xl p-4 space-y-3.5 shadow-xs" id="imaginary_game_root">
      {/* Compass face */}
      <div className="bg-white p-3 rounded-xl border border-fuchsia-100 shadow-xs text-center space-y-3">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">The Complex i-Compass</span>
        
        {/* Analog Circle Compass */}
        <div className="w-28 h-28 rounded-full border-4 border-fuchsia-600 mx-auto relative flex items-center justify-center bg-fuchsia-50/20 shadow-inner">
          {/* Labeled axes */}
          <span className="absolute top-1 text-[11px] font-black text-slate-700 font-mono">1</span>
          <span className="absolute right-1.5 text-[11px] font-black text-slate-700 font-mono">i</span>
          <span className="absolute bottom-1 text-[11px] font-black text-slate-700 font-mono">-1</span>
          <span className="absolute left-1 text-[11px] font-black text-slate-700 font-mono">-i</span>

          {/* Compass needle */}
          <div 
            className="w-1.5 h-16 bg-fuchsia-600 rounded-full origin-center relative transition-transform duration-500 ease-out flex flex-col justify-between py-1"
            style={{ transform: `rotate(${getPowerAngle(power)}deg)` }}
          >
            <div className="w-2.5 h-2.5 bg-rose-500 rounded-full -mx-0.5" />
            <div className="w-2.5 h-2.5 bg-slate-400 rounded-full -mx-0.5" />
          </div>
          <div className="w-3.5 h-3.5 bg-fuchsia-800 rounded-full absolute z-20 shadow-sm" />
        </div>

        {/* Display Current Equation */}
        <div className="bg-fuchsia-50 border border-fuchsia-100 p-2.5 rounded-lg flex items-center justify-center gap-1.5 font-mono text-xs font-black text-fuchsia-900">
          <span>i<sup>{power}</sup></span>
          <span className="text-slate-500">=</span>
          <span className="text-rose-600 text-sm font-black">{getPowerValue(power)}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setPower(prev => prev + 1)}
          className="flex-1 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer shadow-sm text-center leading-none transition hover:-translate-y-0.5"
        >
          Power Up +1
        </button>
        <button
          onClick={() => setPower(1)}
          className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[10px] font-black cursor-pointer shadow-sm text-center transition"
        >
          <RotateCcw size={12} />
        </button>
      </div>

      <div className="bg-white border border-fuchsia-100 p-3 rounded-xl text-center">
        <p className="text-[10px] text-slate-600 font-bold leading-normal">
          Imaginary numbers loop around every 4th power! 
          <br />
          <strong className="text-fuchsia-800">i¹ = i</strong>, then <strong className="text-fuchsia-800">i² = -1</strong>, then <strong className="text-fuchsia-800">i³ = -i</strong>, and <strong className="text-fuchsia-800">i⁴ = 1</strong>! Click power-up to watch the compass spin! 🔮
        </p>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 10. WHOLE NUMBER LINE GAME
// ----------------------------------------------------
export function WholeNumberGame() {
  const [rabbitPos, setRabbitPos] = React.useState<number>(0);
  const [score, setScore] = React.useState<number>(0);
  const [feedback, setFeedback] = React.useState<string | null>(null);

  const handleHop = (pos: number) => {
    setRabbitPos(pos);
    const isWhole = pos >= 0 && Number.isInteger(pos);
    if (isWhole) {
      setScore(prev => prev + 10);
      setFeedback(`Boing! 🐰 Hop successfully to whole number ${pos}! It is a zero or a positive counting integer! ⭐️`);
    } else {
      setFeedback(`Crash! 💥 ${pos} is NOT a whole number! Whole numbers must be positive integers starting from exactly 0 (no decimals or negative values)!`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-50/40 to-yellow-50/20 border-2 border-orange-250 rounded-2xl p-4 space-y-3.5 shadow-xs" id="whole_game_root">
      <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-orange-100 shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-xl animate-bounce">🐰</span>
          <div>
            <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wide leading-none">Whole Number Hopper</h4>
            <p className="text-[8px] font-black text-orange-600">🐰 must only hop on WHOLE numbers!</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[7px] font-black uppercase text-slate-400 tracking-wider block">Score</span>
          <span className="text-xs font-black text-orange-700 leading-none">{score}</span>
        </div>
      </div>

      {/* Interactive Number Line */}
      <div className="bg-white border border-orange-100 rounded-xl p-3 shadow-xs space-y-4">
        <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest block text-center">Interactive Number Line</span>
        
        <div className="relative h-12 flex items-center justify-between px-4 border-b-2 border-slate-300">
          {[-1, 0, 1, 1.5, 2, 3].map((val) => {
            const isRabbitHere = rabbitPos === val;
            return (
              <button
                key={val}
                onClick={() => handleHop(val)}
                className="relative flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                {/* Rabbit element */}
                {isRabbitHere && (
                  <span className="absolute -top-7 text-lg animate-bounce select-none">🐰</span>
                )}
                {/* Dot tick */}
                <div className={`w-2.5 h-2.5 rounded-full z-10 ${isRabbitHere ? "bg-orange-600 scale-125" : "bg-slate-450 hover:bg-orange-400"}`} />
                {/* Value Label */}
                <span className="text-[9px] font-black text-slate-700 mt-1 font-mono">{val}</span>
              </button>
            );
          })}
        </div>
      </div>

      {feedback && (
        <div className="bg-white border border-orange-100 rounded-xl p-3 space-y-2 shadow-xs animate-fade-in text-center">
          <p className="text-[10px] text-slate-700 font-bold leading-normal">
            {feedback}
          </p>
          <button
            onClick={() => {
              setRabbitPos(0);
              setFeedback(null);
            }}
            className="w-full py-1.5 bg-orange-750 hover:bg-orange-850 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer bg-orange-600"
          >
            Reset Rabbit 🐰➔
          </button>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 11. INTEGERS GAME
// ----------------------------------------------------
export function IntegersGame() {
  const [position, setPosition] = React.useState<number>(0);
  const [score, setScore] = React.useState<number>(0);
  const [feedback, setFeedback] = React.useState<string | null>(null);

  const handleMove = (val: number) => {
    setPosition(val);
    const isInteger = Number.isInteger(val);
    if (isInteger) {
      setScore(prev => prev + 10);
      if (val < 0) {
        setFeedback(`Success! 🌡️ You chose ${val}, which is a NEGATIVE Integer! Great for representing depths or sub-zero temperatures! ❄️`);
      } else if (val === 0) {
        setFeedback(`Success! 🌡️ You chose 0, which is an Integer that is neither positive nor negative! It's the neutral boundary! ⚖️`);
      } else {
        setFeedback(`Success! 🌡️ You chose ${val}, which is a POSITIVE Integer! Great for height or profit! ☀️`);
      }
    } else {
      setFeedback(`Crash! 💥 ${val} is NOT an Integer because it has a decimal/fractional part! Integers must be complete whole units.`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/40 to-blue-50/20 border-2 border-indigo-250 rounded-2xl p-4 space-y-3.5 shadow-xs" id="integers_game_root">
      <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-indigo-100 shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-xl animate-bounce">🌡️</span>
          <div>
            <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wide leading-none">Integer Scale Explorer</h4>
            <p className="text-[8px] font-black text-indigo-600">Explore negatives, zero, and positives!</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[7px] font-black uppercase text-slate-400 tracking-wider block">Score</span>
          <span className="text-xs font-black text-indigo-700 leading-none">{score}</span>
        </div>
      </div>

      {/* Interactive Scale */}
      <div className="bg-white border border-indigo-100 rounded-xl p-3 shadow-xs space-y-4">
        <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest block text-center">Interactive Integer Scale</span>
        
        <div className="relative h-12 flex items-center justify-between px-4 border-b-2 border-slate-300">
          {[-5, -2, 0, 1.5, 3, 5].map((val) => {
            const isHere = position === val;
            return (
              <button
                key={val}
                onClick={() => handleMove(val)}
                className="relative flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                {/* Marker */}
                {isHere && (
                  <span className="absolute -top-7 text-lg animate-bounce select-none">📍</span>
                )}
                {/* Dot tick */}
                <div className={`w-2.5 h-2.5 rounded-full z-10 ${isHere ? "bg-indigo-600 scale-125" : "bg-slate-400 hover:bg-indigo-400"}`} />
                {/* Value Label */}
                <span className="text-[9px] font-black text-slate-700 mt-1 font-mono">{val}</span>
              </button>
            );
          })}
        </div>
      </div>

      {feedback && (
        <div className="bg-white border border-indigo-100 rounded-xl p-3 space-y-2 shadow-xs animate-fade-in text-center">
          <p className="text-[10px] text-slate-700 font-bold leading-normal">
            {feedback}
          </p>
          <button
            onClick={() => {
              setPosition(0);
              setFeedback(null);
            }}
            className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition cursor-pointer"
          >
            Reset Scale 📍
          </button>
        </div>
      )}
    </div>
  );
}
