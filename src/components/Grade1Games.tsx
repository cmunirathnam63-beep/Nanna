import React, { useState, useEffect } from "react";
import { Sparkles, Trophy, RotateCcw, Check, X, Clock, HelpCircle, ArrowRight } from "lucide-react";
import { playTeluguSpeech, playSpeechWithLang } from "../utils/teluguAudio";

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

const TELUGU_RHYME_DATA = {
  words2: [
    {
      id: "ala",
      title: "🌊 'ల' ప్రాస (Ala Rhythm)",
      rhymeLetter: "ల",
      exampleSentence: "అల ఇల వల కల జల తల! ఇవి రెండు అక్షరాల ల-అక్షర ప్రాస పదాలు!",
      words: [
        { te: "అల", en: "Ala", meaning: "Wave", emoji: "🌊", break: "అ + ల" },
        { te: "ఇల", en: "Ila", meaning: "Earth", emoji: "🌍", break: "ఇ + ల" },
        { te: "వల", en: "Vala", meaning: "Net", emoji: "🕸️", break: "వ + ల" },
        { te: "కల", en: "Kala", meaning: "Dream", emoji: "💭", break: "క + ల" },
        { te: "జల", en: "Jala", meaning: "Water", emoji: "💧", break: "జ + ల" },
        { te: "తల", en: "Thala", meaning: "Head", emoji: "🗣️", break: "త + ల" }
      ]
    },
    {
      id: "nada",
      title: "🚶 'డ' ప్రాస (Nada Rhythm)",
      rhymeLetter: "డ",
      exampleSentence: "నడ వడ గడ పడ జడ ఈడ! ఇవి రెండు అక్షరాల డ-అక్షర ప్రాస పదాలు!",
      words: [
        { te: "నడ", en: "Nada", meaning: "Walk", emoji: "🚶", break: "న + డ" },
        { te: "వడ", en: "Vada", meaning: "Vada (Snack)", emoji: "🍩", break: "వ + డ" },
        { te: "గడ", en: "Gada", meaning: "Pole", emoji: "🪵", break: "గ + డ" },
        { te: "పడ", en: "Pada", meaning: "Fall", emoji: "🍃", break: "ప + డ" },
        { te: "జడ", en: "Jada", meaning: "Braid", emoji: "💇", break: "జ + డ" },
        { te: "ఈడ", en: "Eeda", meaning: "Here", emoji: "📍", break: "ఈ + డ" }
      ]
    },
    {
      id: "eega",
      title: "🪰 'గ' ప్రాస (Eega Rhythm)",
      rhymeLetter: "గ",
      exampleSentence: "ఈగ నగ జగ పగ తగ సగ! ఇవి రెండు అక్షరాల గ-అక్షర ప్రాస పదాలు!",
      words: [
        { te: "ఈగ", en: "Eega", meaning: "Housefly", emoji: "🪰", break: "ఈ + గ" },
        { te: "నగ", en: "Naga", meaning: "Jewel", emoji: "💎", break: "న + గ" },
        { te: "జగ", en: "Jaga", meaning: "World", emoji: "🌍", break: "జ + గ" },
        { te: "పగ", en: "Paga", meaning: "Feud", emoji: "🔥", break: "ప + గ" },
        { te: "తగ", en: "Taga", meaning: "Fit", emoji: "✔️", break: "త + గ" },
        { te: "సగ", en: "Saga", meaning: "Half", emoji: "🌓", break: "స + గ" }
      ]
    },
    {
      id: "eeta",
      title: "🏊 'త' ప్రాస (Eeta Rhythm)",
      rhymeLetter: "త",
      exampleSentence: "ఈత జత కత గత మత సత! ఇవి రెండు అక్షరాల త-అక్షర ప్రాస పదాలు!",
      words: [
        { te: "ఈత", en: "Eeta", meaning: "Swimming", emoji: "🏊", break: "ఈ + త" },
        { te: "జత", en: "Jata", meaning: "Pair", emoji: "👥", break: "జ + త" },
        { te: "కత", en: "Kata", meaning: "Story", emoji: "📖", break: "క + త" },
        { te: "గత", en: "Gata", meaning: "Past", emoji: "⌛", break: "గ + త" },
        { te: "మత", en: "Mata", meaning: "Opinion", emoji: "💡", break: "మ + త" },
        { te: "సత", en: "Sata", meaning: "Truth", emoji: "✨", break: "స + త" }
      ]
    }
  ],
  words3: [
    {
      id: "kalam",
      title: "🖊️ 'లం' ప్రాస (Kalam Rhythm)",
      rhymeLetter: "లం",
      exampleSentence: "కలం బలం ఫలం జలం నలం హలం! ఇవి మూడు అక్షరాల లం-అక్షర ప్రాస పదాలు!",
      words: [
        { te: "కలం", en: "Kalam", meaning: "Pen", emoji: "🖊️", break: "క + ల + ం" },
        { te: "బలం", en: "Balam", meaning: "Strength", emoji: "💪", break: "బ + ల + ం" },
        { te: "ఫలం", en: "Phalam", meaning: "Fruit", emoji: "🍎", break: "ఫ + ల + ం" },
        { te: "జలం", en: "Jalam", meaning: "Water", emoji: "💧", break: "జ + ల + ం" },
        { te: "నలం", en: "Nalam", meaning: "Goodness", emoji: "✨", break: "న + ల + ం" },
        { te: "హలం", en: "Halam", meaning: "Plough", emoji: "🌾", break: "హ + ల + ం" }
      ]
    },
    {
      id: "gaganam",
      title: "🌌 'నం' ప్రాస (Gaganam Rhythm)",
      rhymeLetter: "నం",
      exampleSentence: "గగనం పవనం భవనం నయనం గమనం సదనం! ఇవి మూడు అక్షరాల నం-అక్షర ప్రాస పదాలు!",
      words: [
        { te: "గగనం", en: "Gaganam", meaning: "Sky", emoji: "🌌", break: "గ + గ + న + ం" },
        { te: "పవనం", en: "Pavanam", meaning: "Breeze", emoji: "🍃", break: "ప + వ + న + ం" },
        { te: "భవనం", en: "Bhavanam", meaning: "Building", emoji: "🏛️", break: "భ + వ + న + ం" },
        { te: "నయనం", en: "Nayanam", meaning: "Eye", emoji: "👀", break: "న + య + న + ం" },
        { te: "గమనం", en: "Gamanam", meaning: "Journey", emoji: "🚶", break: "గ + మ + న + ం" },
        { te: "సదనం", en: "Sadanam", meaning: "Home", emoji: "🏠", break: "స + ద + న + ం" }
      ]
    },
    {
      id: "palaka",
      title: "📝 'క' ప్రాస (Palaka Rhythm)",
      rhymeLetter: "క",
      exampleSentence: "పలక అరక కలక గలక చలక జలక! ఇవి మూడు అక్షరాల క-అక్షర ప్రాస పదాలు!",
      words: [
        { te: "పలక", en: "Palaka", meaning: "Writing Slate", emoji: "📝", break: "ప + ల + క" },
        { te: "అరక", en: "Araka", meaning: "Plough", emoji: "🚜", break: "అ + ర + క" },
        { te: "కలక", en: "Kalaka", meaning: "Stirring", emoji: "🌊", break: "క + ల + క" },
        { te: "గలక", en: "Galaka", meaning: "Rattle", emoji: "🪇", break: "గ + ల + క" },
        { te: "చలక", en: "Chalaka", meaning: "Field", emoji: "🌱", break: "చ + ల + క" },
        { te: "జలక", en: "Jalaka", meaning: "Bath", emoji: "🚿", break: "జ + ల + క" }
      ]
    },
    {
      id: "samayam",
      title: "⏰ 'యం' ప్రాస (Samayam Rhythm)",
      rhymeLetter: "యం",
      exampleSentence: "సమయం ఉదయం అభయం వలయం నయం జయం! ఇవి మూడు అక్షరాల యం-అక్షర ప్రాస పదాలు!",
      words: [
        { te: "సమయం", en: "Samayam", meaning: "Time", emoji: "⏰", break: "స + మ + య + ం" },
        { te: "ఉదయం", en: "Udayam", meaning: "Sunrise", emoji: "🌅", break: "ఉ + ద + య + ం" },
        { te: "అభయం", en: "Abhayam", meaning: "Safety", emoji: "🛡️", break: "అ + భ + య + ం" },
        { te: "వలయం", en: "Valayam", meaning: "Circle", emoji: "⭕", break: "వ + ల + య + ం" },
        { te: "నయం", en: "Nayam", meaning: "Better", emoji: "👍", break: "న + య + ం" },
        { te: "జయం", en: "Jayam", meaning: "Victory", emoji: "🏆", break: "జ + య + ం" }
      ]
    }
  ]
};

// Achulu (Telugu Vowels) Standard Chart with Exact Text and Images
const TELUGU_ACHULU_CHART = [
  { letter: "అ", word: "అమ్మ", en: "Amma", meaning: "Mother", emoji: "👩", break: "అ + మ్ + మ", tip: "అ - అమ్మ (Mother 👩)" },
  { letter: "ఆ", word: "ఆవు", en: "Aavu", meaning: "Cow", emoji: "🐄", break: "ఆ + వు", tip: "ఆ - ఆవు (Cow 🐄)" },
  { letter: "ఇ", word: "ఇల్లు", en: "Illu", meaning: "House", emoji: "🏠", break: "ఇ + ల్ల + ు", tip: "ఇ - ఇల్లు (House 🏠)" },
  { letter: "ఈ", word: "ఈల", en: "Eela", meaning: "Whistle", emoji: "📢", break: "ఈ + ల", tip: "ఈ - ఈల (Whistle 📢)" },
  { letter: "ఉ", word: "ఉడుత", en: "Uduta", meaning: "Squirrel", emoji: "🐿️", break: "ఉ + డ + త", tip: "ఉ - ఉడుత (Squirrel 🐿️)" },
  { letter: "ఊ", word: "ఊయల", en: "Uoyala", meaning: "Swing", emoji: "🛝", break: "ఊ + య + ల", tip: "ఊ - ఊయల (Swing 🛝)" },
  { letter: "ఋ", word: "ఋషి", en: "Rishi", meaning: "Sage", emoji: "🧘", break: "ఋ + షి", tip: "ఋ - ఋషి (Sage 🧘)" },
  { letter: "ఎ", word: "ఎలుక", en: "Eluka", meaning: "Mouse", emoji: "🐭", break: "ఎ + లు + క", tip: "ఎ - ఎలుక (Mouse 🐭)" },
  { letter: "ఏ", word: "ఏనుగు", en: "Eenugu", meaning: "Elephant", emoji: "🐘", break: "ఏ + ను + గు", tip: "ఏ - ఏనుగు (Elephant 🐘)" },
  { letter: "ఐ", word: "ఐదు", en: "Aidu", meaning: "Five", emoji: "🖐️", break: "ఐ + దు", tip: "ఐ - ఐదు (Five 🖐️)" },
  { letter: "ఒ", word: "ఒంటె", en: "Onte", meaning: "Camel", emoji: "🐫", break: "ఒ + ంట్ + ఎ", tip: "ఒ - ఒంటె (Camel 🐫)" },
  { letter: "ఓ", word: "ఓడ", en: "Oda", meaning: "Ship", emoji: "🛳️", break: "ఓ + డ", tip: "ఓ - ఓడ (Ship 🛳️)" },
  { letter: "ఔ", word: "ఔషధం", en: "Aushadham", meaning: "Medicine", emoji: "💊", break: "ఔ + ష + ధ + ం", tip: "ఔ - ఔషధం (Medicine 💊)" },
  { letter: "అం", word: "అంబారీ", en: "Ambaari", meaning: "Elephant Saddle", emoji: "🐘", break: "అ + ం + బా + రీ", tip: "అం - అంబారీ (Elephant Saddle 🐘)" },
  { letter: "అః", word: "అంతఃపురం", en: "Antahpuram", meaning: "Palace", emoji: "🏰", break: "అ + ం + త + ః + పు + ర + ం", tip: "అః - అంతఃపురం (Palace 🏰)" }
];

// Hallulu (Telugu Consonants) Standard Chart with Words and Emojis
const TELUGU_HALLULU_CHART = [
  { letter: "క", word: "కలం", en: "Kalam", meaning: "Pen", emoji: "🖊️", break: "క + ల + ం" },
  { letter: "ఖ", word: "ఖగం", en: "Khagam", meaning: "Bird", emoji: "🐦", break: "ఖ + గ + ం" },
  { letter: "గ", word: "గంట", en: "Ganta", meaning: "Bell", emoji: "🔔", break: "గ + ంట్ + అ" },
  { letter: "ఘ", word: "ఘటం", en: "Ghatam", meaning: "Pot", emoji: "🏺", break: "ఘ + ట + ం" },
  { letter: "చ", word: "చదరంగం", en: "Chadarangam", meaning: "Chess", emoji: "♟️", break: "చ + ద + ర + ం + గ + ం" },
  { letter: "ఛ", word: "ఛత్రం", en: "Chatram", meaning: "Umbrella", emoji: "☂️", break: "ఛ + త్ర + ం" },
  { letter: "జ", word: "జడ", en: "Jada", meaning: "Braid", emoji: "👧", break: "జ + డ" },
  { letter: "ఝ", word: "ఝషం", en: "Jhasham", meaning: "Fish", emoji: "🐟", break: "ఝ + ష + ం" },
  { letter: "ట", word: "టమాట", en: "Thamata", meaning: "Tomato", emoji: "🍅", break: "ట + మా + ట" },
  { letter: "ఠ", word: "ఠంకా", en: "Thanka", meaning: "Coin", emoji: "🪙", break: "ఠ + ం + కా" },
  { letter: "డ", word: "డప్పు", en: "Dappu", meaning: "Drum", emoji: "🥁", break: "డ + ప్ప + ు" },
  { letter: "ఢ", word: "ఢంకా", en: "Dhanka", meaning: "Large Drum", emoji: "🥁", break: "ఢ + ం + కా" },
  { letter: "ణ", word: "బాణం", en: "Baanam", meaning: "Arrow", emoji: "🏹", break: "బా + ణ + ం" },
  { letter: "త", word: "తల", en: "Thala", meaning: "Head", emoji: "🗣️", break: "త + ల" },
  { letter: "థ", word: "రథం", en: "Ratham", meaning: "Chariot", emoji: "🛞", break: "ర + థ + ం" },
  { letter: "ద", word: "దండ", en: "Danda", meaning: "Garland", emoji: "📿", break: "ద + ం + డ" },
  { letter: "ధ", word: "ధనుస్సు", en: "Dhanussu", meaning: "Bow", emoji: "🏹", break: "ధ + ను + స్స + ు" },
  { letter: "న", word: "నగ", en: "Naga", meaning: "Jewelry", emoji: "💍", break: "న + గ" },
  { letter: "ప", word: "పలక", en: "Palaka", meaning: "Slate", emoji: "📝", break: "ప + ల + క" },
  { letter: "ఫ", word: "ఫలం", en: "Phalam", meaning: "Fruit", emoji: "🍎", break: "ఫ + ల + ం" },
  { letter: "బ", word: "బంతి", en: "Banthi", meaning: "Ball", emoji: "⚽", break: "బ + ం + తి" },
  { letter: "భ", word: "భవనం", en: "Bhavanam", meaning: "Building", emoji: "🏛️", break: "భ + వ + నం" },
  { letter: "మ", word: "మంచం", en: "Mancham", meaning: "Bed", emoji: "🛏️", break: "మ + ం + చ + ం" },
  { letter: "య", word: "యజ్ఞం", en: "Yagnam", meaning: "Ritual", emoji: "🛕", break: "య + జ్ఞ + ం" },
  { letter: "ర", word: "రాయి", en: "Raayi", meaning: "Stone", emoji: "🪨", break: "రా + యి" },
  { letter: "ల", word: "లత", en: "Latha", meaning: "Vine", emoji: "🌿", break: "ల + త" },
  { letter: "వ", word: "వల", en: "Vala", meaning: "Net", emoji: "🕸️", break: "వ + ల" },
  { letter: "శ", word: "శంఖం", en: "Sankham", meaning: "Conch", emoji: "🐚", break: "శ + ం + ఖ + ం" },
  { letter: "ష", word: "షట్కోణం", en: "Shatkonam", meaning: "Hexagon", emoji: "🔷", break: "ష + ట్ + కో + ణ + ం" },
  { letter: "స", word: "సంచి", en: "Sanchi", meaning: "Bag", emoji: "👜", break: "స + ం + చి" },
  { letter: "హ", word: "హంస", en: "Hamsa", meaning: "Swan", emoji: "🦢", break: "హ + ం + స" },
  { letter: "ళ", word: "తాళం", en: "Thaalam", meaning: "Lock", emoji: "🔑", break: "తా + ళ + ం" },
  { letter: "క్ష", word: "క్షత్రియుడు", en: "Kshatriya", meaning: "Warrior", emoji: "⚔️", break: "క్ష + త్రి + యు + డు" },
  { letter: "ఱ", word: "గుఱ్ఱం", en: "Gurram", meaning: "Horse", emoji: "🐎", break: "గు + ఱ్ఱ + ం" }
];

const TELUGU_READING_WORDS = [
  // Level 1: 2-Letter Simple Words (రెండు అక్షరాల సరళ పదాలు)
  { id: "rw1", te: "అల", en: "Ala", meaning: "Wave", emoji: "🌊", letters: ["అ", "ల"], phonics: ["A", "La"], level: 1, tip: "అ + ల = అల" },
  { id: "rw2", te: "ఇల", en: "Ila", meaning: "Earth", emoji: "🌍", letters: ["ఇ", "ల"], phonics: ["I", "La"], level: 1, tip: "ఇ + ల = ఇల" },
  { id: "rw3", te: "వల", en: "Vala", meaning: "Net", emoji: "🕸️", letters: ["వ", "ల"], phonics: ["Va", "La"], level: 1, tip: "వ + ల = వల" },
  { id: "rw4", te: "కల", en: "Kala", meaning: "Dream", emoji: "💭", letters: ["క", "ల"], phonics: ["Ka", "La"], level: 1, tip: "క + ల = కల" },
  { id: "rw5", te: "ఆట", en: "Aata", meaning: "Game", emoji: "⚽", letters: ["ఆ", "ట"], phonics: ["Aa", "Ta"], level: 1, tip: "ఆ + ట = ఆట" },
  { id: "rw6", te: "ఈగ", en: "Eega", meaning: "Housefly", emoji: "🪰", letters: ["ఈ", "గ"], phonics: ["Ee", "Ga"], level: 1, tip: "ఈ + గ = ఈగ" },
  { id: "rw7", te: "ఈత", en: "Eeta", meaning: "Swimming", emoji: "🏊", letters: ["ఈ", "త"], phonics: ["Ee", "Tha"], level: 1, tip: "ఈ + త = ఈత" },
  { id: "rw8", te: "నడ", en: "Nada", meaning: "Walk", emoji: "🚶", letters: ["న", "డ"], phonics: ["Na", "Da"], level: 1, tip: "న + డ = నడ" },

  // Level 2: 3-Letter Simple Words (మూడు అక్షరాల సరళ పదాలు)
  { id: "rw9", te: "కలం", en: "Kalam", meaning: "Pen", emoji: "🖊️", letters: ["క", "ల", "ం"], phonics: ["Ka", "La", "m"], level: 2, tip: "క + ల + ం = కలం" },
  { id: "rw10", te: "బలం", en: "Balam", meaning: "Strength", emoji: "💪", letters: ["బ", "ల", "ం"], phonics: ["Ba", "La", "m"], level: 2, tip: "బ + ల + ం = బలం" },
  { id: "rw11", te: "ఫలం", en: "Phalam", meaning: "Fruit", emoji: "🍎", letters: ["ఫ", "ల", "ం"], phonics: ["Pha", "La", "m"], level: 2, tip: "ఫ + ల + ం = ఫలం" },
  { id: "rw12", te: "పలక", en: "Palaka", meaning: "Slate", emoji: "📝", letters: ["ప", "ల", "క"], phonics: ["Pa", "La", "Ka"], level: 2, tip: "ప + ల + క = పలక" },
  { id: "rw13", te: "అరక", en: "Araka", meaning: "Plough", emoji: "🚜", letters: ["అ", "ర", "క"], phonics: ["A", "Ra", "Ka"], level: 2, tip: "అ + ర + క = అరక" },
  { id: "rw14", te: "భవనం", en: "Bhavanam", meaning: "Building", emoji: "🏛️", letters: ["భ", "వ", "నం"], phonics: ["Bha", "Va", "Nam"], level: 2, tip: "భ + వ + నం = భవనం" },

  // Level 3: Achulu (Vowels) Words (అచ్చులు పదాలు)
  { id: "rw15", te: "అమ్మ", en: "Amma", meaning: "Mother", emoji: "👩", letters: ["అ", "మ్", "మ"], phonics: ["A", "M", "Ma"], level: 3, tip: "అ - అమ్మ (Mother 👩)" },
  { id: "rw16", te: "ఆవు", en: "Aavu", meaning: "Cow", emoji: "🐄", letters: ["ఆ", "వు"], phonics: ["Aa", "Vu"], level: 3, tip: "ఆ - ఆవు (Cow 🐄)" },
  { id: "rw17", te: "ఇల్లు", en: "Illu", meaning: "House", emoji: "🏠", letters: ["ఇ", "ల్ల", "ు"], phonics: ["I", "Llu"], level: 3, tip: "ఇ - ఇల్లు (House 🏠)" },
  { id: "rw18", te: "ఈల", en: "Eela", meaning: "Whistle", emoji: "📢", letters: ["ఈ", "ల"], phonics: ["Ee", "La"], level: 3, tip: "ఈ - ఈల (Whistle 📢)" },
  { id: "rw19", te: "ఉడుత", en: "Uduta", meaning: "Squirrel", emoji: "🐿️", letters: ["ఉ", "డ", "త"], phonics: ["U", "Da", "Tha"], level: 3, tip: "ఉ - ఉడుత (Squirrel 🐿️)" },
  { id: "rw20", te: "ఏనుగు", en: "Eenugu", meaning: "Elephant", emoji: "🐘", letters: ["ఏ", "ను", "గు"], phonics: ["Ee", "Nu", "Gu"], level: 3, tip: "ఏ - ఏనుగు (Elephant 🐘)" }
];

// Interactive Textbook Exercises Data (Grade 1 Telugu Page)
const TEXTBOOK_READING_GRID = [
  // Row 1
  { te: "అల", en: "Ala", meaning: "Wave", emoji: "🌊", break: "అ + ల" },
  { te: "కల", en: "Kala", meaning: "Dream / Art", emoji: "💭", break: "క + ల" },
  { te: "తల", en: "Thala", meaning: "Head", emoji: "🗣️", break: "త + ల" },
  { te: "నల", en: "Nala", meaning: "Tap", emoji: "🚰", break: "న + ల" },
  { te: "వల", en: "Vala", meaning: "Net", emoji: "🕸️", break: "వ + ల" },
  { te: "హల", en: "Hala", meaning: "Plough", emoji: "🌾", break: "హ + ల" },
  // Row 2
  { te: "అరక", en: "Araka", meaning: "Plough", emoji: "🚜", break: "అ + ర + క" },
  { te: "తరక", en: "Taraka", meaning: "Raft / Star", emoji: "⭐", break: "త + ర + క" },
  { te: "నరక", en: "Naraka", meaning: "Cut", emoji: "✂️", break: "న + ర + క" },
  { te: "మరక", en: "Maraka", meaning: "Stain", emoji: "🧼", break: "మ + ర + క" },
  { te: "ఆడ", en: "Aada", meaning: "Play / Female", emoji: "💃", break: "ఆ + డ" },
  { te: "కడ", en: "Kada", meaning: "Shore / End", emoji: "🌅", break: "క + డ" },
  // Row 3
  { te: "గడ", en: "Gada", meaning: "Pole", emoji: "🪵", break: "గ + డ" },
  { te: "జడ", en: "Jada", meaning: "Hair Braid", emoji: "💇", break: "జ + డ" },
  { te: "దడ", en: "Dada", meaning: "Heartbeat", emoji: "💓", break: "ద + డ" },
  { te: "వడ", en: "Vada", meaning: "Vada Snack", emoji: "🍩", break: "వ + డ" },
  { te: "అర", en: "Ara", meaning: "Shelf", emoji: "🗄️", break: "అ + ర" },
  { te: "ఇల", en: "Ila", meaning: "Earth", emoji: "🌍", break: "ఇ + ల" },
  // Row 4
  { te: "ఎర", en: "Era", meaning: "Bait", emoji: "🪱", break: "ఎ + ర" },
  { te: "బర", en: "Bara", meaning: "Width", emoji: "📏", break: "బ + ర" },
  { te: "జర", en: "Jara", meaning: "A little", emoji: "🤏", break: "జ + ర" },
  { te: "మర", en: "Mara", meaning: "Screw", emoji: "🔩", break: "మ + ర" }
];

const TEXTBOOK_WORD_WHEEL_SETS = [
  {
    id: "ta",
    suffix: "త",
    title: "2) 'త' అక్షరంతో పదాలు తయారు చేయండి (Build Words with 'త')",
    prefixList: [
      { prefix: "ఈ", result: "ఈత", meaning: "Swimming 🏊", break: "ఈ + త = ఈత" },
      { prefix: "శ", result: "శత", meaning: "Century 💯", break: "శ + త = శత" },
      { prefix: "జ", result: "జత", meaning: "Pair 👥", break: "జ + త = జత" },
      { prefix: "ల", result: "లత", meaning: "Vine 🌿", break: "ల + త = లత" },
      { prefix: "ఉడ", result: "ఉడత", meaning: "Squirrel 🐿️", break: "ఉడ + త = ఉడత" }
    ]
  },
  {
    id: "ka",
    suffix: "క",
    title: "2) 'క' అక్షరంతో పదాలు తయారు చేయండి (Build Words with 'క')",
    prefixList: [
      { prefix: "పల", result: "పలక", meaning: "Writing Slate 📝", break: "పల + క = పలక" },
      { prefix: "అర", result: "అరక", meaning: "Plough 🚜", break: "అర + క = అరక" },
      { prefix: "కల", result: "కలక", meaning: "Stirring 🌊", break: "కల + క = కలక" },
      { prefix: "గల", result: "గలక", meaning: "Rattle 🪇", break: "గల + క = గలక" },
      { prefix: "జల", result: "జలక", meaning: "Bath 🚿", break: "జల + క = జలక" }
    ]
  },
  {
    id: "da",
    suffix: "డ",
    title: "2) 'డ' అక్షరంతో పదాలు తయారు చేయండి (Build Words with 'డ')",
    prefixList: [
      { prefix: "న", result: "నడ", meaning: "Walk 🚶", break: "న + డ = నడ" },
      { prefix: "వ", result: "వడ", meaning: "Vada Snack 🍩", break: "వ + డ = వడ" },
      { prefix: "గ", result: "గడ", meaning: "Pole 🪵", break: "గ + డ = గడ" },
      { prefix: "జ", result: "జడ", meaning: "Hair Braid 💇", break: "జ + డ = జడ" },
      { prefix: "ఈ", result: "ఈడ", meaning: "Here 📍", break: "ఈ + డ = ఈడ" }
    ]
  }
];

const TEXTBOOK_PICTURES_DATA = [
  {
    id: "pic_amma",
    title: "1. అమ్మ (Mother)",
    meaning: "Mother (అమ్మ)",
    correctWord: "అమ్మ",
    options: ["అమ్మ", "ఆవు", "ఇల్లు", "ఈల"],
    emoji: "👩",
    hint: "అ - అమ్మ (Mother)"
  },
  {
    id: "pic_aavu",
    title: "2. ఆవు (Cow)",
    meaning: "Cow (ఆవు)",
    correctWord: "ఆవు",
    options: ["ఆవు", "అమ్మ", "ఉడుత", "ఓడ"],
    emoji: "🐄",
    hint: "ఆ - ఆవు (Cow)"
  },
  {
    id: "pic_illu",
    title: "3. ఇల్లు (House)",
    meaning: "House (ఇల్లు)",
    correctWord: "ఇల్లు",
    options: ["ఇల్లు", "ఈల", "ఎలుక", "ఐదు"],
    emoji: "🏠",
    hint: "ఇ - ఇల్లు (House)"
  },
  {
    id: "pic_eela",
    title: "4. ఈల (Whistle)",
    meaning: "Whistle (ఈల)",
    correctWord: "ఈల",
    options: ["ఈల", "ఇల్లు", "ఊయల", "ఔషధం"],
    emoji: "📢",
    hint: "ఈ - ఈల (Whistle)"
  },
  {
    id: "pic_uduta",
    title: "5. ఉడుత (Squirrel)",
    meaning: "Squirrel (ఉడుత)",
    correctWord: "ఉడుత",
    options: ["ఉడుత", "ఊయల", "ఎలుక", "ఏనుగు"],
    emoji: "🐿️",
    hint: "ఉ - ఉడుత (Squirrel)"
  },
  {
    id: "pic_eenugu",
    title: "6. ఏనుగు (Elephant)",
    meaning: "Elephant (ఏనుగు)",
    correctWord: "ఏనుగు",
    options: ["ఏనుగు", "ఎలుక", "ఒంటె", "అంబారీ"],
    emoji: "🐘",
    hint: "ఏ - ఏనుగు (Elephant)"
  },
  {
    id: "pic1",
    title: "7. బిందె / కలశం / కుండ",
    meaning: "Pot / Kalasham (కుండ)",
    correctWord: "కుండ",
    options: ["కుండ", "అల", "నడ", "వల"],
    emoji: "🏺",
    hint: "మట్టితో చేసిన పాత్ర - కుండ"
  },
  {
    id: "pic2",
    title: "8. అక్షరాల పలక",
    meaning: "Writing Slate (పలక)",
    correctWord: "పలక",
    options: ["పలక", "అరక", "కలక", "గలక"],
    emoji: "📝",
    hint: "బడిలో రాసే పలక"
  },
  {
    id: "pic3",
    title: "3. త్రాచు పాము / నాగ",
    meaning: "Cobra / Snake (నాగ)",
    correctWord: "నాగ",
    options: ["నాగ", "ఈగ", "నగ", "జగ"],
    emoji: "🐍",
    hint: "సర్పం - నాగ"
  },
  {
    id: "pic4",
    title: "4. పొలం దున్నే అరక",
    meaning: "Plough (అరక)",
    correctWord: "అరక",
    options: ["అరక", "పలక", "అల", "కల"],
    emoji: "🚜",
    hint: "రైతు దున్నే అరక"
  }
];

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

  // Tables 1 to 10 interactive state
  const [selectedTableNum, setSelectedTableNum] = useState<number>(2);
  const [tableMode, setTableMode] = useState<"multiplication" | "addition">("multiplication");
  const [selectedRowIdx, setSelectedRowIdx] = useState<number | null>(3);
  const [showGrid10x10, setShowGrid10x10] = useState<boolean>(false);
  const [tablesPracticeSubTab, setTablesPracticeSubTab] = useState<"chart" | "drill" | "missing" | "flashcard">("chart");
  
  // Drill practice state
  const [drillTargetTable, setDrillTargetTable] = useState<number | "all">(2);
  const [drillQ, setDrillQ] = useState<{ num1: number; num2: number; answer: number; options: number[] }>(() => {
    const n1 = 2;
    const n2 = Math.floor(Math.random() * 10) + 1;
    const ans = n1 * n2;
    const opts = Array.from(new Set([ans, ans + 2, Math.max(1, ans - 2), ans + 4])).slice(0, 4);
    if (!opts.includes(ans)) opts[0] = ans;
    opts.sort(() => Math.random() - 0.5);
    return { num1: n1, num2: n2, answer: ans, options: opts };
  });
  const [drillScore, setDrillScore] = useState<number>(0);
  const [drillStreak, setDrillStreak] = useState<number>(0);
  const [drillFeedback, setDrillFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Missing number state
  const [missingQ, setMissingQ] = useState<{ num1: number; missingPos: "num2" | "ans"; num2: number; ans: number; options: number[] }>(() => {
    const num1 = 3;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const ans = num1 * num2;
    const missingPos = Math.random() > 0.5 ? "num2" : "ans";
    const correctVal = missingPos === "num2" ? num2 : ans;
    const opts = Array.from(new Set([correctVal, correctVal + 1, Math.max(1, correctVal - 1), correctVal + 2])).slice(0, 4);
    if (!opts.includes(correctVal)) opts[0] = correctVal;
    opts.sort(() => Math.random() - 0.5);
    return { num1, missingPos, num2, ans, options: opts };
  });
  const [missingScore, setMissingScore] = useState<number>(0);
  const [missingFeedback, setMissingFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Flashcard state
  const [flashcardCardNum, setFlashcardCardNum] = useState<number>(1);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState<boolean>(false);
  const [masteredCards, setMasteredCards] = useState<string[]>([]);

  // Telugu Rhyme & Phonics Explorer state
  const [teluguSubTab, setTeluguSubTab] = useState<"achulu" | "hallulu" | "guninthalu" | "ottulu" | "reading" | "wheel" | "pictures" | "phonics" | "builder" | "rhymes">(
    chapterId === "g1_tel_achulu" ? "achulu" : chapterId === "g1_tel_hallulu" ? "hallulu" : chapterId === "g1_tel_guninthalu" ? "guninthalu" : chapterId === "g1_tel_ottulu" ? "ottulu" : "reading"
  );

  useEffect(() => {
    if (chapterId === "g1_tel_achulu") {
      setTeluguSubTab("achulu");
    } else if (chapterId === "g1_tel_hallulu") {
      setTeluguSubTab("hallulu");
    } else if (chapterId === "g1_tel_guninthalu") {
      setTeluguSubTab("guninthalu");
    } else if (chapterId === "g1_tel_ottulu") {
      setTeluguSubTab("ottulu");
    } else if (chapterId === "g1_tel_words2") {
      if (teluguSubTab === "achulu" || teluguSubTab === "hallulu" || teluguSubTab === "guninthalu" || teluguSubTab === "ottulu") {
        setTeluguSubTab("reading");
      }
      setReadingLevelFilter(1);
      setTeluguWordLength(2);
      setSelectedWordId("rw1");
      setSelectedTeluguRhymeSet("ala");
    } else if (chapterId === "g1_tel_words3") {
      if (teluguSubTab === "achulu" || teluguSubTab === "hallulu" || teluguSubTab === "guninthalu" || teluguSubTab === "ottulu") {
        setTeluguSubTab("reading");
      }
      setReadingLevelFilter(2);
      setTeluguWordLength(3);
      setSelectedWordId("rw9");
      setSelectedTeluguRhymeSet("kalam");
    } else if (teluguSubTab === "achulu" || teluguSubTab === "hallulu" || teluguSubTab === "guninthalu" || teluguSubTab === "ottulu") {
      setTeluguSubTab("reading");
    }
  }, [chapterId]);
  const [activeReadingWord, setActiveReadingWord] = useState<string>("అల");
  const [selectedWheelSetId, setSelectedWheelSetId] = useState<"ta" | "ka" | "da">("ta");
  const [formedWheelWords, setFormedWheelWords] = useState<string[]>([]);
  const [activeConnectingPrefix, setActiveConnectingPrefix] = useState<string | null>(null);
  const [pictureAnswers, setPictureAnswers] = useState<Record<string, string>>({});

  const [readingLevelFilter, setReadingLevelFilter] = useState<number>(1);
  const [selectedWordId, setSelectedWordId] = useState<string>("rw1");
  const [activeSpellingIdx, setActiveSpellingIdx] = useState<number | null>(null);
  const [builderWordIdx, setBuilderWordIdx] = useState<number>(0);
  const [userBuiltLetters, setUserBuiltLetters] = useState<string[]>([]);

  const [teluguWordLength, setTeluguWordLength] = useState<2 | 3>(2);
  const [selectedTeluguRhymeSet, setSelectedTeluguRhymeSet] = useState<string>("ala");
  const [selectedTeluguPairWord, setSelectedTeluguPairWord] = useState<{ te: string; group: string } | null>(null);
  const [matchedTeluguPairs, setMatchedTeluguPairs] = useState<string[]>([]);
  const [clockDialMode, setClockDialMode] = useState<"hours" | "minutes" | "full">("hours");
  const [interactiveHour, setInteractiveHour] = useState<number>(12);
  const [interactiveMinute, setInteractiveMinute] = useState<number>(0);
  const [selectedSpellWord, setSelectedSpellWord] = useState<string>("these");
  const [spelledLetters, setSpelledLetters] = useState<string[]>([]);

  const SPELL_LEARNING_WORDS = [
    { word: "injury", emoji: "🩹", category: "Safety Word", sentence: "Be careful while running so you do not get a knee injury!", letters: ["i", "n", "j", "u", "r", "y"] },
    { word: "careful", emoji: "⚠️", category: "Safety Word", sentence: "Always be careful when crossing busy streets!", letters: ["c", "a", "r", "e", "f", "u", "l"] },
    { word: "danger", emoji: "🚨", category: "Safety Word", sentence: "Red signs warn us of fire danger!", letters: ["d", "a", "n", "g", "e", "r"] },
    { word: "store", emoji: "🏬", category: "Action & Place Word", sentence: "We store toys safely inside the wooden box!", letters: ["s", "t", "o", "r", "e"] },
    { word: "burning", emoji: "🔥", category: "Safety Warning Word", sentence: "Never touch a hot burning matchstick!", letters: ["b", "u", "r", "n", "i", "n", "g"] },
    { word: "away", emoji: "🏃", category: "Direction Word", sentence: "Stay far away from sharp knives!", letters: ["a", "w", "a", "y"] },
    { word: "shock", emoji: "⚡", category: "Electrical Safety Word", sentence: "Do not touch open electrical wires to avoid electric shock!", letters: ["s", "h", "o", "c", "k"] },
    { word: "candles", emoji: "🕯️", category: "Safety Noun", sentence: "Light birthday candles only with an adult present!", letters: ["c", "a", "n", "d", "l", "e", "s"] },
    { word: "stay", emoji: "🛑", category: "Safety Action Word", sentence: "Stay calm and hold hands when crossing roads!", letters: ["s", "t", "a", "y"] },
    { word: "should", emoji: "✅", category: "Helper Word", sentence: "You should always wash your hands before eating!", letters: ["s", "h", "o", "u", "l", "d"] },
    { word: "these", emoji: "🍎🍎", category: "Pointing Word (Near)", sentence: "These are sweet apples!", letters: ["t", "h", "e", "s", "e"] },
    { word: "those", emoji: "🎈🎈", category: "Pointing Word (Far)", sentence: "Those are flying balloons!", letters: ["t", "h", "o", "s", "e"] },
    { word: "what", emoji: "❓", category: "Question Word", sentence: "What is your favorite color?", letters: ["w", "h", "a", "t"] },
    { word: "who", emoji: "👤", category: "Question Word", sentence: "Who is your best friend?", letters: ["w", "h", "o"] },
    { word: "how", emoji: "💡", category: "Question Word", sentence: "How are you feeling today?", letters: ["h", "o", "w"] },
    { word: "play", emoji: "⚽", category: "Action Word", sentence: "Let's play football together!", letters: ["p", "l", "a", "y"] },
  ];

  const handleChantTelugu = (text: string, rate: number = 0.85) => {
    playTeluguSpeech(text, rate);
  };

  const handleChantTable = (num: number, mode: "multiplication" | "addition") => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    let text = `${mode === "multiplication" ? "Multiplication" : "Addition"} table of ${num}. `;
    for (let i = 1; i <= 10; i++) {
      if (mode === "multiplication") {
        text += `${num} times ${i} is ${num * i}. `;
      } else {
        text += `${num} plus ${i} is ${num + i}. `;
      }
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  // Generate a random round based on the chapter ID
  const generateRoundData = () => {
    switch (chapterId) {
      case "g1_sweetshop": {
        const gameType = Math.floor(Math.random() * 3); // 0: Add, 1: Subtract, 2: Count
        if (gameType === 0) {
          const num1 = Math.floor(Math.random() * 5) + 2; // 2 to 6
          const num2 = Math.floor(Math.random() * 4) + 1; // 1 to 4
          const ans = num1 + num2;
          const options = Array.from(new Set([ans, ans + 1, ans - 1, ans + 2])).filter(x => x > 0).slice(0, 3);
          if (!options.includes(ans)) options.push(ans);
          options.sort(() => Math.random() - 0.5);
          return {
            type: "addition",
            question: `Mithai Shop Chime! 🛎️ We have ${num1} golden laddoos on the tray. Papa buys ${num2} more. How many laddoos do we have in total?`,
            num1,
            num2,
            itemEmoji: "🟡",
            itemName: "Laddoos",
            options: options.map(String),
            correctAnswer: String(ans),
            explanation: `Addition means joining! ${num1} laddoos + ${num2} laddoos makes ${ans} laddoos in total! 🟡`
          };
        } else if (gameType === 1) {
          const num1 = Math.floor(Math.random() * 6) + 4; // 4 to 9
          const num2 = Math.floor(Math.random() * 3) + 1; // 1 to 3
          const ans = num1 - num2;
          const options = Array.from(new Set([ans, ans + 1, ans - 1, ans + 2])).filter(x => x > 0).slice(0, 3);
          if (!options.includes(ans)) options.push(ans);
          options.sort(() => Math.random() - 0.5);
          return {
            type: "subtraction",
            question: `Tasty Treat! 😋 There are ${num1} chocolate barfis on the shelf. You eat ${num2} barfis. How many chocolate barfis are left?`,
            num1,
            num2,
            itemEmoji: "🟦",
            itemName: "Barfis",
            options: options.map(String),
            correctAnswer: String(ans),
            explanation: `Subtraction means taking away! ${num1} barfis minus ${num2} eaten leaves ${ans} barfis! 🟦`
          };
        } else {
          const target = Math.floor(Math.random() * 7) + 5; // 5 to 11
          const wrong1 = target + (Math.random() > 0.5 ? 1 : -1);
          const wrong2 = target + (Math.random() > 0.5 ? 2 : -2);
          const options = Array.from(new Set([target, wrong1, wrong2])).filter(x => x > 0).slice(0, 3);
          if (!options.includes(target)) options.push(target);
          options.sort(() => Math.random() - 0.5);
          return {
            type: "counting",
            question: "Mouth-watering Jalebis! 🌀 Count how many delicious spiral loops of jalebis are on the sweet plate!",
            targetCount: target,
            itemEmoji: "🌀",
            itemName: "Jalebis",
            options: options.map(String),
            correctAnswer: String(target),
            explanation: `Yum! There are exactly ${target} sweet jalebis on the plate. Counting them one by one is so fun! 🌀`
          };
        }
      }
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
        if (clockDialMode === "hours") {
          const hour = Math.floor(Math.random() * 12) + 1; // 1 to 12
          const minute = 0;
          const correctAnswer = `${hour} o'clock`;
          const alt1 = `${(hour % 12) + 1} o'clock`;
          const alt2 = `${((hour + 9) % 12) + 1} o'clock`;
          const options = Array.from(new Set([correctAnswer, alt1, alt2])).sort(() => Math.random() - 0.5);

          return {
            mode: "hours",
            question: "🔴 Hours Dial Practice: Look ONLY at the short red hand (Hour Hand). What hour is it pointing to?",
            hour,
            minute,
            options,
            correctAnswer,
            explanation: `The short red hand points directly to ${hour}, so the hour is ${hour} o'clock! (Remember: Short hand = Hours)`
          };
        } else if (clockDialMode === "minutes") {
          const hour = 12;
          const minSteps = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
          const minute = minSteps[Math.floor(Math.random() * minSteps.length)];
          const minStr = minute < 10 ? `0${minute}` : `${minute}`;
          const correctAnswer = `:${minStr} minutes`;
          const alt1Min = (minute + 15) % 60;
          const alt2Min = (minute + 30) % 60;
          const alt1 = `:${alt1Min < 10 ? '0' + alt1Min : alt1Min} minutes`;
          const alt2 = `:${alt2Min < 10 ? '0' + alt2Min : alt2Min} minutes`;
          const options = Array.from(new Set([correctAnswer, alt1, alt2])).sort(() => Math.random() - 0.5);
          const clockPos = minute / 5 === 0 ? 12 : minute / 5;

          return {
            mode: "minutes",
            question: "🔵 Minutes Dial Practice: Look ONLY at the long blue hand (Minute Hand). What minute count is it pointing to?",
            hour,
            minute,
            options,
            correctAnswer,
            explanation: `The long blue hand points to number ${clockPos} on the dial. Counting in 5s (${clockPos} × 5), that equals :${minStr} minutes!`
          };
        } else {
          // Full clock
          const hour = Math.floor(Math.random() * 12) + 1;
          const minSteps = [0, 15, 30, 45];
          const minute = minSteps[Math.floor(Math.random() * minSteps.length)];
          const minStr = minute < 10 ? `0${minute}` : `${minute}`;
          const timeStr = `${hour}:${minStr}`;

          const alt1 = `${(hour % 12) + 1}:${minStr}`;
          const alt2Min = (minute + 30) % 60;
          const alt2 = `${hour}:${alt2Min < 10 ? '0' + alt2Min : alt2Min}`;
          const options = Array.from(new Set([timeStr, alt1, alt2])).sort(() => Math.random() - 0.5);

          return {
            mode: "full",
            question: "⏰ Full Clock Reading: Read the Short Red Hand FIRST (Hour), then the Long Blue Hand NEXT (Minutes). What time is it?",
            hour,
            minute,
            options,
            correctAnswer: timeStr,
            explanation: `Let's combine both dials:
1. Short Red Hand (Hour) FIRST: Points to ${hour}.
2. Long Blue Hand (Minute) NEXT: Points to ${minute / 5 === 0 ? 12 : minute / 5} (:${minStr} minutes).
Time = ${hour}:${minStr}!`
          };
        }
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
      case "g1_tables": {
        const tableNum = Math.floor(Math.random() * 10) + 1; // 1 to 10
        const multiplier = Math.floor(Math.random() * 10) + 1; // 1 to 10
        const isAddition = Math.random() > 0.5;

        if (isAddition) {
          const ans = tableNum + multiplier;
          const options = Array.from(new Set([ans, ans + 1, Math.max(1, ans - 1), ans + 2])).slice(0, 3);
          if (!options.includes(ans)) options.push(ans);
          options.sort(() => Math.random() - 0.5);

          return {
            type: "tables_addition",
            tableNum,
            multiplier,
            question: `Addition Table Challenge: What is ${tableNum} + ${multiplier}?`,
            options: options.map(String),
            correctAnswer: String(ans),
            explanation: `${tableNum} + ${multiplier} = ${ans}! Addition combines ${tableNum} and ${multiplier} together.`
          };
        } else {
          const ans = tableNum * multiplier;
          const options = Array.from(new Set([ans, ans + tableNum, Math.max(1, ans - tableNum), ans + 2])).filter(x => x > 0).slice(0, 3);
          if (!options.includes(ans)) options.push(ans);
          options.sort(() => Math.random() - 0.5);

          return {
            type: "tables_multiplication",
            tableNum,
            multiplier,
            question: `Multiplication Table Challenge: What is ${tableNum} × ${multiplier}?`,
            options: options.map(String),
            correctAnswer: String(ans),
            explanation: `${tableNum} × ${multiplier} = ${ans}! Adding ${tableNum} together ${multiplier} times equals ${ans}.`
          };
        }
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
      case "g1_evs_computer": {
        const quests = [
          { item: "Monitor 🖥️", role: "Shows pictures, videos & text like a TV screen", exp: "The Monitor 🖥️ displays everything you do on the computer!" },
          { item: "CPU 🧠", role: "Brain of the computer that controls all operations", exp: "The CPU 🧠 is the brain of the computer that calculates & remembers!" },
          { item: "Keyboard ⌨️", role: "Has keys used to type letters, numbers & words", exp: "The Keyboard ⌨️ lets you type your name and numbers!" },
          { item: "Mouse 🖱️", role: "Handheld device used to point, click & draw on screen", exp: "The Mouse 🖱️ helps you click items and draw pictures!" },
          { item: "Printer 🖨️", role: "Prints drawings and words from screen onto real paper", exp: "A Printer 🖨️ copies your screen drawings onto paper!" },
          { item: "Speakers 🔊", role: "Plays music, cartoon audio, and computer sound effects", exp: "Speakers 🔊 let you hear songs and computer sounds!" }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        return {
          question: `Which computer part matches this job: "${item.role}"?`,
          options: ["Monitor 🖥️", "CPU 🧠", "Keyboard ⌨️", "Mouse 🖱️", "Printer 🖨️", "Speakers 🔊"],
          correctAnswer: item.item,
          explanation: item.exp
        };
      }
      // Telugu Achulu (Vowels) Game Quests
      case "g1_tel_achulu": {
        const quests = [
          { letter: "అ", pic: "అమ్మ 👩 (Amma)", exp: "అ - అమ్మ 👩 (Mother)" },
          { letter: "ఆ", pic: "ఆవు 🐄 (Aavu)", exp: "ఆ - ఆవు 🐄 (Cow)" },
          { letter: "ఇ", pic: "ఇల్లు 🏠 (Illu)", exp: "ఇ - ఇల్లు 🏠 (House)" },
          { letter: "ఈ", pic: "ఈల 📢 (Eela)", exp: "ఈ - ఈల 📢 (Whistle)" },
          { letter: "ఉ", pic: "ఉడుత 🐿️ (Uduta)", exp: "ఉ - ఉడుత 🐿️ (Squirrel)" },
          { letter: "ఊ", pic: "ఊయల 🛝 (Uoyala)", exp: "ఊ - ఊయల 🛝 (Swing)" },
          { letter: "ఋ", pic: "ఋషి 🧘 (Rishi)", exp: "ఋ - ఋషి 🧘 (Sage)" },
          { letter: "ఎ", pic: "ఎలుక 🐭 (Eluka)", exp: "ఎ - ఎలుక 🐭 (Mouse)" },
          { letter: "ఏ", pic: "ఏనుగు 🐘 (Eenugu)", exp: "ఏ - ఏనుగు 🐘 (Elephant)" },
          { letter: "ఐ", pic: "ఐదు 🖐️ (Aidu)", exp: "ఐ - ఐదు 🖐️ (Five)" },
          { letter: "ఒ", pic: "ఒంటె 🐫 (Onte)", exp: "ఒ - ఒంటె 🐫 (Camel)" },
          { letter: "ఓ", pic: "ఓడ 🛳️ (Oda)", exp: "ఓ - ఓడ 🛳️ (Ship)" },
          { letter: "ఔ", pic: "ఔషధం 💊 (Aushadham)", exp: "ఔ - ఔషధం 💊 (Medicine)" },
          { letter: "అం", pic: "అంబారీ 🐘 (Ambaari)", exp: "అం - అంబారీ 🐘 (Elephant Saddle)" },
          { letter: "అః", pic: "అంతఃపురం 🏰 (Antahpuram)", exp: "అః - అంతఃపురం 🏰 (Palace)" }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        const otherPics = quests.filter(q => q.pic !== item.pic).map(q => q.pic);
        const shuffledOthers = [...otherPics].sort(() => 0.5 - Math.random()).slice(0, 2);
        const allOpts = [...shuffledOthers, item.pic].sort(() => 0.5 - Math.random());

        return {
          question: `అక్షరం '${item.letter}' తో మొదలయ్యే సరైన పదం / చిత్రం ఏది?`,
          options: allOpts,
          correctAnswer: item.pic,
          explanation: item.exp,
          letter: item.letter
        };
      }
      // Telugu Hallulu (Consonants) Game Quests
      case "g1_tel_hallulu": {
        const quests = [
          { letter: "క", pic: "కలం 🖊️ (Kalam)", exp: "క - కలం 🖊️ (Pen)" },
          { letter: "ఖ", pic: "ఖగం 🐦 (Khagam)", exp: "ఖ - ఖగం 🐦 (Bird)" },
          { letter: "గ", pic: "గంట 🔔 (Ganta)", exp: "గ - గంట 🔔 (Bell)" },
          { letter: "ఘ", pic: "ఘటం 🏺 (Ghatam)", exp: "ఘ - ఘటం 🏺 (Pot)" },
          { letter: "చ", pic: "చదరంగం ♟️ (Chadarangam)", exp: "చ - చదరంగం ♟️ (Chess)" },
          { letter: "జ", pic: "జడ 👧 (Jada)", exp: "జ - జడ 👧 (Braid)" },
          { letter: "ట", pic: "టమాట 🍅 (Thamata)", exp: "ట - టమాట 🍅 (Tomato)" },
          { letter: "డ", pic: "డప్పు 🥁 (Dappu)", exp: "డ - డప్పు 🥁 (Drum)" },
          { letter: "త", pic: "తల 🗣️ (Thala)", exp: "త - తల 🗣️ (Head)" },
          { letter: "ద", pic: "దండ 📿 (Danda)", exp: "ద - దండ 📿 (Garland)" },
          { letter: "న", pic: "నగ 💍 (Naga)", exp: "న - నగ 💍 (Jewelry)" },
          { letter: "ప", pic: "పలక 📝 (Palaka)", exp: "ప - పలక 📝 (Slate)" },
          { letter: "ఫ", pic: "ఫలం 🍎 (Phalam)", exp: "ఫ - ఫలం 🍎 (Fruit)" },
          { letter: "బ", pic: "బంతి ⚽ (Banthi)", exp: "బ - బంతి ⚽ (Ball)" },
          { letter: "భ", pic: "భవనం 🏛️ (Bhavanam)", exp: "భ - భవనం 🏛️ (Building)" },
          { letter: "మ", pic: "మంచం 🛏️ (Mancham)", exp: "మ - మంచం 🛏️ (Bed)" },
          { letter: "య", pic: "యజ్ఞం 🛕 (Yagnam)", exp: "య - యజ్ఞం 🛕 (Ritual)" },
          { letter: "ర", pic: "రాయి 🪨 (Raayi)", exp: "ర - రాయి 🪨 (Stone)" },
          { letter: "ల", pic: "లత 🌿 (Latha)", exp: "ల - లత 🌿 (Vine)" },
          { letter: "వ", pic: "వల 🕸️ (Vala)", exp: "వ - వల 🕸️ (Net)" },
          { letter: "స", pic: "సంచి 👜 (Sanchi)", exp: "స - సంచి 👜 (Bag)" },
          { letter: "హ", pic: "హంస 🦢 (Hamsa)", exp: "హ - హంస 🦢 (Swan)" }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        const otherPics = quests.filter(q => q.pic !== item.pic).map(q => q.pic);
        const shuffledOthers = [...otherPics].sort(() => 0.5 - Math.random()).slice(0, 2);
        const allOpts = [...shuffledOthers, item.pic].sort(() => 0.5 - Math.random());

        return {
          question: `హల్లు '${item.letter}' తో మొదలయ్యే సరైన పదం / చిత్రం ఏది?`,
          options: allOpts,
          correctAnswer: item.pic,
          explanation: item.exp,
          letter: item.letter
        };
      }
      case "g1_tel_words2": {
        const quests = [
          {
            q: "'అల' (Ala 🌊) - ప్రాస పదం?",
            opts: ["ఇల (Ila 🌍)", "నడ (Nada 🚶)", "ఈగ (Eega 🪰)", "కలం (Kalam 🖊️)"],
            ans: "ఇల (Ila 🌍)",
            exp: "అల = ఇల"
          },
          {
            q: "'నడ' (Nada 🚶) - ప్రాస పదం?",
            opts: ["వడ (Vada 🍩)", "వల (Vala 🕸️)", "ఈగ (Eega 🪰)", "పలక (Palaka 📝)"],
            ans: "వడ (Vada 🍩)",
            exp: "నడ = వడ"
          },
          {
            q: "'ఈగ' (Eega 🪰) - ప్రాస పదం?",
            opts: ["నగ (Naga 💎)", "ఈత (Eeta 🏊)", "జల (Jala 💧)", "బలం (Balam 💪)"],
            ans: "నగ (Naga 💎)",
            exp: "ఈగ = నగ"
          },
          {
            q: "చిత్రం 🌊 కి సరైన పదం?",
            opts: ["అల (Ala)", "వల (Vala)", "ఈగ (Eega)", "నడ (Nada)"],
            ans: "అల (Ala)",
            exp: "🌊 = అల"
          },
          {
            q: "చిత్రం ⚽ కి సరైన పదం?",
            opts: ["ఆట (Aata)", "నడ (Nada)", "వల (Vala)", "ఈగ (Eega)"],
            ans: "ఆట (Aata)",
            exp: "⚽ = ఆట"
          },
          {
            q: "చిత్రం 🕸️ కి సరైన పదం?",
            opts: ["వల (Vala)", "అల (Ala)", "కల (Kala)", "ఆట (Aata)"],
            ans: "వల (Vala)",
            exp: "🕸️ = వల"
          }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        return {
          question: item.q,
          options: item.opts,
          correctAnswer: item.ans,
          explanation: item.exp
        };
      }
      case "g1_tel_words3": {
        const quests = [
          {
            q: "'కలం' (Kalam 🖊️) - ప్రాస పదం?",
            opts: ["బలం (Balam 💪)", "పలక (Palaka 📝)", "ఈగ (Eega 🪰)", "ఆట (Aata ⚽)"],
            ans: "బలం (Balam 💪)",
            exp: "కలం = బలం"
          },
          {
            q: "'గగనం' (Gaganam 🌌) - ప్రాస పదం?",
            opts: ["పవనం (Pavanam 🍃)", "పలక (Palaka 📝)", "అరక (Araka 🚜)", "అల (Ala 🌊)"],
            ans: "పవనం (Pavanam 🍃)",
            exp: "గగనం = పవనం"
          },
          {
            q: "చిత్రం 🖊️ కి సరైన పదం?",
            opts: ["కలం (Kalam)", "బలం (Balam)", "పలక (Palaka)", "భవనం (Bhavanam)"],
            ans: "కలం (Kalam)",
            exp: "🖊️ = కలం"
          },
          {
            q: "చిత్రం 🚜 కి సరైన పదం?",
            opts: ["అరక (Araka)", "పలక (Palaka)", "కలం (Kalam)", "భవనం (Bhavanam)"],
            ans: "అరక (Araka)",
            exp: "🚜 = అరక"
          },
          {
            q: "చిత్రం 📝 కి సరైన పదం?",
            opts: ["పలక (Palaka)", "అరక (Araka)", "కలం (Kalam)", "బలం (Balam)"],
            ans: "పలక (Palaka)",
            exp: "📝 = పలక"
          }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        return {
          question: item.q,
          options: item.opts,
          correctAnswer: item.ans,
          explanation: item.exp
        };
      }
      case "g1_tel_words": {
        const quests = [
          {
            q: "'అల' (Ala 🌊) - ప్రాస పదం?",
            opts: ["ఇల (Ila 🌍)", "నడ (Nada 🚶)", "కలం (Kalam 🖊️)", "పలక (Palaka 📝)"],
            ans: "ఇల (Ila 🌍)",
            exp: "అల = ఇల"
          },
          {
            q: "'కలం' (Kalam 🖊️) - ప్రాస పదం?",
            opts: ["బలం (Balam 💪)", "ఆట (Aata ⚽)", "ఈగ (Eega 🪰)", "అరక (Araka 🚜)"],
            ans: "బలం (Balam 💪)",
            exp: "కలం = బలం"
          },
          {
            q: "చిత్రం 🌊 కి సరైన పదం?",
            opts: ["అల (Ala)", "వల (Vala)", "కల (Kala)", "ఇల (Ila)"],
            ans: "అల (Ala)",
            exp: "🌊 = అల"
          },
          {
            q: "చిత్రం 🖊️ కి సరైన పదం?",
            opts: ["కలం (Kalam)", "బలం (Balam)", "పలక (Palaka)", "అరక (Araka)"],
            ans: "కలం (Kalam)",
            exp: "🖊️ = కలం"
          }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        return {
          question: item.q,
          options: item.opts,
          correctAnswer: item.ans,
          explanation: item.exp
        };
      }
      case "g1_tel_guninthalu": {
        const quests = [
          {
            q: "'కలం' 🖊️ పదంలో మొదటి అక్షరానికి ఉన్న గుణింతపు గురుతు ఏది?",
            opts: ["తలకట్టు (ౕ)", "దీర్ఘం (ా)", "గుడి (ి)", "కొమ్ము (ు)"],
            ans: "తలకట్టు (ౕ)",
            exp: "కలం ➡️ 'క' అక్షరానికి తలకట్టు (ౕ) ఉంది"
          },
          {
            q: "'కాకి' 🐦 పదంలో మొదటి అక్షరం 'కా' కి ఉన్న గురుతు ఏది?",
            opts: ["దీర్ఘము / దీర్ఘం (ా)", "తలకట్టు (ౕ)", "గుడి (ి)", "కొమ్ము (ు)"],
            ans: "దీర్ఘము / దీర్ఘం (ా)",
            exp: "క + ా = కా (దీర్ఘము)"
          },
          {
            q: "'క' అక్షరానికి 'గుడి' (ి) చేరిస్తే వచ్చే అక్షరం ఏది?",
            opts: ["కి (Ki)", "కా (Kaa)", "కు (Ku)", "కే (Ke)"],
            ans: "కి (Ki)",
            exp: "క + ి = కి"
          },
          {
            q: "'కీలు' 🔑 పదంలో మొదటి అక్షరం 'కీ' కి ఏ గురుతు ఉంది?",
            opts: ["గుడి దీర్ఘము (ీ)", "గుడి (ి)", "కొమ్ము (ు)", "ఏత్వము (ే)"],
            ans: "గుడి దీర్ఘము (ీ)",
            exp: "క + ీ = కీ (గుడి దీర్ఘము)"
          },
          {
            q: "'గుడి' 🛕 పదంలో 'గ' అక్షరానికి ఉన్న గురుతు ఏది?",
            opts: ["కొమ్ము (ు)", "గుడి (ి)", "దీర్ఘం (ా)", "ఔత్వము (ౌ)"],
            ans: "కొమ్ము (ు)",
            exp: "గ + ు = గు (కొమ్ము)"
          },
          {
            q: "'కూర' 🍲 పదంలో 'కూ' అక్షరానికి ఉన్న గురుతు ఏది?",
            opts: ["కొమ్ము దీర్ఘము (ూ)", "కొమ్ము (ు)", "గుడి (ి)", "ఓత్వము (ో)"],
            ans: "కొమ్ము దీర్ఘము (ూ)",
            exp: "క + ూ = కూ (కొమ్ము దీర్ఘము)"
          },
          {
            q: "'కృషి' 🌾 పదంలో 'కృ' అక్షరానికి ఉన్న గురుతు ఏది?",
            opts: ["వట్రసుడి / రుత్వము (ృ)", "కొమ్ము (ు)", "గుడి (ి)", "ఐత్వము (ై)"],
            ans: "వట్రసుడి / రుత్వము (ృ)",
            exp: "క + ృ = కృ (వట్రసుడి / రుత్వము)"
          },
          {
            q: "'కేకు' 🍰 పదంలో మొదటి అక్షరానికి ఉన్న గురుతు ఏది?",
            opts: ["ఏత్వము / ఎత్వదీర్ఘము (ే)", "గుడి (ి)", "దీర్ఘం (ా)", "కొమ్ము (ు)"],
            ans: "ఏత్వము / ఎత్వదీర్ఘము (ే)",
            exp: "క + ే = కే (ఏత్వము)"
          },
          {
            q: "'కైక' 👸 పదంలో 'కై' అక్షరానికి ఉన్న గురుతు ఏది?",
            opts: ["ఐత్వము (ై)", "ఏత్వము (ే)", "ఒత్వము (ొ)", "ఔత్వము (ౌ)"],
            ans: "ఐత్వము (ై)",
            exp: "క + ై = కై (ఐత్వము)"
          },
          {
            q: "'కోట' 🏰 పదంలో 'కో' అక్షరానికి ఉన్న గురుతు ఏది?",
            opts: ["ఓత్వము / ఒత్వదీర్ఘము (ో)", "ఒత్వము (ొ)", "ఏత్వము (ే)", "ఔత్వము (ౌ)"],
            ans: "ఓత్వము / ఒత్వదీర్ఘము (ో)",
            exp: "క + ో = కో (ఓత్వము)"
          },
          {
            q: "'కంకణం' 💍 పదంలో మొదటి అక్షరం 'కం' కి ఉన్న గురుతు ఏది?",
            opts: ["సున్నా (ం)", "విసర్గ (ః)", "తలకట్టు (ౕ)", "గుడి (ి)"],
            ans: "సున్నా (ం)",
            exp: "క + ం = కం (సున్నా)"
          }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        return {
          question: item.q,
          options: item.opts,
          correctAnswer: item.ans,
          explanation: item.exp
        };
      }
      case "g1_tel_ottulu": {
        const quests = [
          {
            q: "'క' అక్షరం యొక్క ఒత్తు రూపం ఏది?",
            opts: ["్క (క-ఒత్తు)", "్త (త-ఒత్తు)", "్మ (మ-ఒత్తు)", "్ప (ప-ఒత్తు)"],
            ans: "్క (క-ఒత్తు)",
            exp: "క ➡️ ్క"
          },
          {
            q: "'త' అక్షరం యొక్క ఒత్తు రూపం ఏది?",
            opts: ["్త (త-ఒత్తు)", "్క (క-ఒత్తు)", "్న (న-ఒత్తు)", "్ల (ల-ఒత్తు)"],
            ans: "్త (త-ఒత్తు)",
            exp: "త ➡️ ్త"
          },
          {
            q: "'అక్క' 👧 పదంలో ఉన్న ఒత్తు అక్షరం ఏది?",
            opts: ["క్క (క-ఒత్తు)", "మ్మ (మ-ఒత్తు)", "త్త (త-ఒత్తు)", "ప్ప (ప-ఒత్తు)"],
            ans: "క్క (క-ఒత్తు)",
            exp: "అక్క ➡️ 'క' కింద క-ఒత్తు (్క) చేరింది"
          },
          {
            q: "'అమ్మ' 👩‍🍼 పదంలో ఉన్న ఒత్తు అక్షరం ఏది?",
            opts: ["మ్మ (మ-ఒత్తు)", "క్క (క-ఒత్తు)", "ల్లి (ల-ఒత్తు)", "ర్ర (ర-ఒత్తు)"],
            ans: "మ్మ (మ-ఒత్తు)",
            exp: "అమ్మ ➡️ 'మ' కింద మ-ఒత్తు (్మ) చేరింది"
          },
          {
            q: "'పిల్లి' 🐱 పదంలో ఏ అక్షరపు ఒత్తు ఉంది?",
            opts: ["ల-ఒత్తు (్ల)", "క-ఒత్తు (్క)", "త-ఒత్తు (్త)", "వ-ఒత్తు (్వ)"],
            ans: "ల-ఒత్తు (్ల)",
            exp: "పిల్లి ➡️ 'లి' కింద ల-ఒత్తు (్ల)"
          },
          {
            q: "'పువ్వు' 🌸 పదంలో ఏ అక్షరపు ఒత్తు ఉంది?",
            opts: ["వ-ఒత్తు (్వ)", "మ-ఒత్తు (్మ)", "న-ఒత్తు (్న)", "ప-ఒత్తు (్ప)"],
            ans: "వ-ఒత్తు (్వ)",
            exp: "పువ్వు ➡️ 'వు' కింద వ-ఒత్తు (్వ)"
          }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        return {
          question: item.q,
          options: item.opts,
          correctAnswer: item.ans,
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
      case "g1_eng_spelling": {
        const quests = [
          {
            q: "Spell check: Choose the missing letter in 'in _ u r y' (injury 🩹):",
            opts: ["j", "g", "z"],
            ans: "j",
            exp: "'injury' is spelled I-N-J-U-R-Y! It means a hurt or wound on the body."
          },
          {
            q: "Spell check: Choose the missing letter in 'c a r e _ u l' (careful ⚠️):",
            opts: ["f", "p", "b"],
            ans: "f",
            exp: "'careful' is spelled C-A-R-E-F-U-L! It means being cautious to stay safe."
          },
          {
            q: "Spell check: Choose the missing letter in 'd a _ g e r' (danger 🚨):",
            opts: ["n", "m", "k"],
            ans: "n",
            exp: "'danger' is spelled D-A-N-G-E-R! It means a high risk of getting hurt."
          },
          {
            q: "Spell check: Choose the missing letter in 's t _ r e' (store 🏬):",
            opts: ["o", "u", "a"],
            ans: "o",
            exp: "'store' is spelled S-T-O-R-E! It means keeping things safe or a shop."
          },
          {
            q: "Spell check: Choose the missing letter in 'b u r _ i n g' (burning 🔥):",
            opts: ["n", "m", "p"],
            ans: "n",
            exp: "'burning' is spelled B-U-R-N-I-N-G! Used for hot flames."
          },
          {
            q: "Spell check: Choose the missing letter in 'a w _ y' (away 🏃):",
            opts: ["a", "e", "o"],
            ans: "a",
            exp: "'away' is spelled A-W-A-Y! It means at a safe distance."
          },
          {
            q: "Spell check: Choose the missing letter in 's h _ c k' (shock ⚡):",
            opts: ["o", "a", "i"],
            ans: "o",
            exp: "'shock' is spelled S-H-O-C-K! Refers to electric shock or surprise."
          },
          {
            q: "Spell check: Choose the missing letter in 'c a n _ l e s' (candles 🕯️):",
            opts: ["d", "t", "b"],
            ans: "d",
            exp: "'candles' is spelled C-A-N-D-L-E-S! Wax lights used on birthdays."
          },
          {
            q: "Spell check: Choose the missing letter in 's t _ y' (stay 🛑):",
            opts: ["a", "e", "o"],
            ans: "a",
            exp: "'stay' is spelled S-T-A-Y! It means to remain in a safe place."
          },
          {
            q: "Spell check: Choose the missing letter in 's h o _ l d' (should ✅):",
            opts: ["u", "w", "r"],
            ans: "u",
            exp: "'should' is spelled S-H-O-U-L-D! It shows a good safety rule to follow."
          },
          {
            q: "'Be ____ while running on wet floors to avoid an injury!'",
            opts: ["careful", "burning", "candles"],
            ans: "careful",
            exp: "You must be 'careful' to prevent slipping!"
          },
          {
            q: "'Do not touch open wires to avoid an electric ____!'",
            opts: ["shock", "store", "stay"],
            ans: "shock",
            exp: "Electricity can give an electric 'shock'! Stay safe."
          },
          {
            q: "'We must stay far ____ from hot stoves and flames!'",
            opts: ["away", "should", "injury"],
            ans: "away",
            exp: "Stay far 'away' from hot kitchen stoves!"
          },
          {
            q: "'Light birthday ____ with an adult nearby!' 🕯️",
            opts: ["candles", "shock", "danger"],
            ans: "candles",
            exp: "Candles have a burning flame, so always light them with adults."
          },
          {
            q: "'You ____ always wash hands before eating!' Choose the right helper word:",
            opts: ["should", "burning", "danger"],
            ans: "should",
            exp: "'should' expresses a helpful habit or rule! S-H-O-U-L-D."
          }
        ];
        const item = quests[Math.floor(Math.random() * quests.length)];
        return {
          question: item.q,
          options: item.opts,
          correctAnswer: item.ans,
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
    const newRound = generateRoundData();
    setRoundData(newRound);
    if (newRound && newRound.hour !== undefined) {
      setInteractiveHour(newRound.hour);
      setInteractiveMinute(newRound.minute || 0);
    }
    setFeedback(null);
    setAnswered(false);
    setTappedApples([]);
  }, [currentRound, roundKey, chapterId, clockDialMode]);

  const handleOptionClick = (option: string) => {
    if (answered) return;

    // Check counting condition
    if ((chapterId === "g1_counting" || (chapterId === "g1_sweetshop" && roundData.type === "counting")) && tappedApples.length < roundData.targetCount) {
      playSynthSound('wrong');
      setFeedback({
        isCorrect: false,
        message: `Oops! Please tap and count all ${roundData.targetCount} delicious ${roundData.itemName || "sweets"} first to learn easily! 🍬`
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
  const renderClockSVG = (
    h: number,
    m: number,
    mode: "hours" | "minutes" | "full" = "full",
    onSelectHour?: (hour: number) => void,
    onSelectMinute?: (minute: number) => void
  ) => {
    // Calculate rotation angles
    const minuteAngle = m * 6; // 6 degrees per minute
    const hourAngle = (h % 12) * 30 + m * 0.5; // 30 degrees per hour + half degree per minute

    const minuteLabels = [
      { num: 12, min: "00", val: 0 },
      { num: 1, min: "05", val: 5 },
      { num: 2, min: "10", val: 10 },
      { num: 3, min: "15", val: 15 },
      { num: 4, min: "20", val: 20 },
      { num: 5, min: "25", val: 25 },
      { num: 6, min: "30", val: 30 },
      { num: 7, min: "35", val: 35 },
      { num: 8, min: "40", val: 40 },
      { num: 9, min: "45", val: 45 },
      { num: 10, min: "50", val: 50 },
      { num: 11, min: "55", val: 55 },
    ];

    return (
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 rounded-full border-8 border-amber-900 shadow-xl flex items-center justify-center select-none mx-auto p-2">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          {/* Outer Clock Face Background */}
          <circle cx="80" cy="80" r="75" fill="#fffdfa" stroke="#d97706" strokeWidth="2.5" />

          {/* Outer Minute Badges Ring (Interactive Minute Badges) */}
          {minuteLabels.map((item, idx) => {
            const angle = (idx * 30 * Math.PI) / 180;
            const bx = 80 + 65 * Math.cos(angle);
            const by = 80 + 65 * Math.sin(angle);
            const isActiveMin = m === item.val;

            return (
              <g
                key={`min_badge_${idx}`}
                className="cursor-pointer group transition-transform hover:scale-125"
                onClick={() => onSelectMinute?.(item.val)}
              >
                {/* Touch Target Circle */}
                <circle
                  cx={bx}
                  cy={by}
                  r="8.5"
                  className={
                    isActiveMin
                      ? "fill-sky-500 stroke-sky-700 stroke-2 drop-shadow-md"
                      : "fill-sky-100 group-hover:fill-sky-200 stroke-sky-400 stroke-1"
                  }
                />
                <text
                  x={bx}
                  y={by + 2.5}
                  className={`text-[6.5px] font-black font-mono select-none pointer-events-none ${
                    isActiveMin ? "fill-white" : "fill-sky-900"
                  }`}
                  transform={`rotate(90 ${bx} ${by})`}
                  textAnchor="middle"
                >
                  :{item.min}
                </text>
              </g>
            );
          })}

          {/* Hour markers line ticks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 80 + 49 * Math.cos(angle);
            const y1 = 80 + 49 * Math.sin(angle);
            const x2 = 80 + 55 * Math.cos(angle);
            const y2 = 80 + 55 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={mode === "hours" ? "stroke-rose-600 stroke-[3.5px]" : "stroke-slate-700 stroke-[2px]"}
              />
            );
          })}

          {/* All 12 Hour Numbers (1-12) - Interactive Hour Targets */}
          {Array.from({ length: 12 }).map((_, i) => {
            const num = i === 0 ? 12 : i;
            const angle = (i * 30 * Math.PI) / 180;
            const nx = 80 + 42 * Math.cos(angle);
            const ny = 80 + 42 * Math.sin(angle);
            const isTargetHour = (h % 12 === i % 12);

            return (
              <g
                key={`hr_num_group_${num}`}
                className="cursor-pointer group transition-transform hover:scale-125"
                onClick={() => onSelectHour?.(num)}
              >
                {/* Touch Target Circle */}
                <circle
                  cx={nx}
                  cy={ny}
                  r="7.5"
                  className={
                    isTargetHour
                      ? "fill-rose-500 stroke-rose-700 stroke-2 drop-shadow-md"
                      : "fill-amber-100/60 group-hover:fill-rose-100 stroke-rose-300 stroke-1"
                  }
                />
                <text
                  x={nx}
                  y={ny + 3.5}
                  className={`font-black text-[9.5px] font-sans select-none pointer-events-none ${
                    isTargetHour
                      ? "fill-white font-extrabold"
                      : "fill-rose-950 font-bold"
                  }`}
                  transform={`rotate(90 ${nx} ${ny})`}
                  textAnchor="middle"
                >
                  {num}
                </text>
              </g>
            );
          })}

          {/* BOTH NEEDLES ARE ALWAYS RENDERED */}

          {/* 1. Hour Hand (Short Red Needle) */}
          <g>
            <line
              x1="80"
              y1="80"
              x2={80 + 27 * Math.cos((hourAngle * Math.PI) / 180)}
              y2={80 + 27 * Math.sin((hourAngle * Math.PI) / 180)}
              className={`stroke-rose-600 stroke-linecap-round ${
                mode === "hours" ? "stroke-[6.5px] drop-shadow-md" : "stroke-[5px]"
              }`}
            />
            {/* Needle tip indicator cap */}
            <circle
              cx={80 + 27 * Math.cos((hourAngle * Math.PI) / 180)}
              cy={80 + 27 * Math.sin((hourAngle * Math.PI) / 180)}
              r="3"
              className="fill-rose-700"
            />
          </g>

          {/* 2. Minute Hand (Long Blue Needle) */}
          <g>
            <line
              x1="80"
              y1="80"
              x2={80 + 44 * Math.cos((minuteAngle * Math.PI) / 180)}
              y2={80 + 44 * Math.sin((minuteAngle * Math.PI) / 180)}
              className={`stroke-sky-600 stroke-linecap-round ${
                mode === "minutes" ? "stroke-[5.5px] drop-shadow-md" : "stroke-[4px]"
              }`}
            />
            {/* Needle tip indicator cap */}
            <circle
              cx={80 + 44 * Math.cos((minuteAngle * Math.PI) / 180)}
              cy={80 + 44 * Math.sin((minuteAngle * Math.PI) / 180)}
              r="2.5"
              className="fill-sky-800"
            />
          </g>

          {/* Center Cap */}
          <circle cx="80" cy="80" r="5.5" className="fill-amber-500 stroke-amber-900 stroke-1.5" />
        </svg>
      </div>
    );
  };

  return (
    <div className="w-full space-y-4" id={`g1_game_${chapterId}`}>
      {/* Main Sandbox Area */}
      <div className="bg-white rounded-2xl p-4.5 border border-slate-100 shadow-xs space-y-4">
        {/* Question display */}
        <div className="bg-indigo-50/40 border border-indigo-100 rounded-2xl p-4 text-center space-y-3">
          <div className="space-y-1">
            <span className="bg-indigo-100 text-indigo-800 font-black uppercase tracking-wider text-[8px] px-2.5 py-0.5 rounded-full border border-indigo-200 inline-block">
              Question {currentRound}
            </span>
            <h3 className="text-xs sm:text-sm font-black text-slate-800 leading-snug">
              {roundData.question}
            </h3>
          </div>

          {/* Options grid directly at the bottom of question box */}
          {chapterId !== "g1_comparison" && (
            <div className={`grid ${roundData.options.length === 2 ? "grid-cols-2" : "grid-cols-3"} gap-2.5 pt-1 max-w-md mx-auto`}>
              {roundData.options.map((opt: string) => {
                const isCorrectAnswer = opt === roundData.correctAnswer;
                return (
                  <button
                    key={opt}
                    disabled={answered}
                    onClick={() => handleOptionClick(opt)}
                    className={`py-2.5 px-2 rounded-2xl text-xs font-black transition-all duration-200 cursor-pointer shadow-xs text-center border-2 ${
                      answered
                        ? isCorrectAnswer
                          ? "bg-emerald-50 border-emerald-500 text-emerald-800 scale-102 ring-2 ring-emerald-200"
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

          {/* Feedback display directly inside question card */}
          {feedback && (
            <div className={`p-3.5 rounded-2xl border text-center space-y-2 animate-fade-in ${
              feedback.isCorrect 
                ? "bg-emerald-50 border-emerald-300 text-emerald-900" 
                : "bg-rose-50 border-rose-200 text-rose-900"
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
              <p className="text-[11px] font-bold leading-normal text-slate-700">
                {feedback.message}
              </p>
              <button
                onClick={() => {
                  if (feedback.isCorrect) {
                    setCurrentRound(prev => prev + 1);
                    setTappedApples([]);
                    setAnswered(false);
                    setFeedback(null);
                  } else {
                    setAnswered(false);
                    setFeedback(null);
                  }
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-black transition shadow-xs cursor-pointer ${
                  feedback.isCorrect 
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95" 
                    : "bg-rose-600 text-white hover:bg-rose-700 active:scale-95"
                }`}
              >
                {feedback.isCorrect ? "Next Question →" : "Try Again 🔄"}
              </button>
            </div>
          )}
        </div>

        {/* 1. Custom Visuals per Chapter */}
        {chapterId === "g1_tables" && (
          <div className="flex flex-col items-center gap-3 py-3 bg-teal-50/40 rounded-2xl border border-teal-150 p-3 animate-fade-in">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {roundData.type === "tables_multiplication" ? (
                <div className="flex flex-wrap gap-1.5 justify-center max-w-xs">
                  {Array.from({ length: Math.min(roundData.multiplier || 1, 10) }).map((_, groupIdx) => (
                    <div key={groupIdx} className="flex gap-0.5 bg-white p-1 rounded-lg border border-teal-200 shadow-xs">
                      {Array.from({ length: Math.min(roundData.tableNum || 1, 10) }).map((_, itemIdx) => (
                        <span key={itemIdx} className="text-sm select-none">🍎</span>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-teal-200 shadow-xs">
                  <div className="flex gap-0.5 bg-blue-50 p-1 rounded border border-blue-200">
                    {Array.from({ length: Math.min(roundData.tableNum || 1, 10) }).map((_, i) => (
                      <span key={i} className="text-sm select-none">🍎</span>
                    ))}
                  </div>
                  <span className="text-sm font-black text-teal-700">+</span>
                  <div className="flex gap-0.5 bg-orange-50 p-1 rounded border border-orange-200">
                    {Array.from({ length: Math.min(roundData.multiplier || 1, 10) }).map((_, i) => (
                      <span key={i} className="text-sm select-none">🍏</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <span className="text-[10px] font-extrabold text-teal-800 bg-white px-3 py-1 rounded-full border border-teal-200 shadow-2xs">
              {roundData.type === "tables_multiplication" 
                ? `💡 ${roundData.multiplier} groups of ${roundData.tableNum} apples = ?`
                : `💡 ${roundData.tableNum} apples + ${roundData.multiplier} apples = ?`}
            </span>
          </div>
        )}

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
            {/* Dial Mode Selector Tabs */}
            <div className="bg-slate-100/90 p-1.5 rounded-2xl flex flex-wrap items-center justify-center gap-1.5 border border-slate-200">
              <button
                onClick={() => {
                  setClockDialMode("hours");
                  playSynthSound('tap');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  clockDialMode === "hours"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "text-rose-900 bg-white hover:bg-rose-50"
                }`}
              >
                <span>🔴 1. Hours Dial (గంటలు)</span>
              </button>
              <button
                onClick={() => {
                  setClockDialMode("minutes");
                  playSynthSound('tap');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  clockDialMode === "minutes"
                    ? "bg-sky-600 text-white shadow-xs"
                    : "text-sky-900 bg-white hover:bg-sky-50"
                }`}
              >
                <span>🔵 2. Minutes Dial (నిమిషాలు)</span>
              </button>
              <button
                onClick={() => {
                  setClockDialMode("full");
                  playSynthSound('tap');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                  clockDialMode === "full"
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "text-amber-900 bg-white hover:bg-amber-50"
                }`}
              >
                <span>⏰ 3. Full Clock (రెండు కలిపి)</span>
              </button>
            </div>

            {/* Dial Mode Guidance Banner */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-3 max-w-md mx-auto text-center space-y-1 shadow-xs">
              {clockDialMode === "hours" ? (
                <div>
                  <span className="text-xs font-black text-rose-700 uppercase tracking-wide block">
                    🔴 Hours Dial: Short Red Hand (1 to 12)
                  </span>
                  <p className="text-[11px] text-slate-600 font-medium leading-normal">
                    Both needles are shown! Tap any hour number (1-12) directly on the clock or use the needle buttons below to adjust the short red hand!
                  </p>
                </div>
              ) : clockDialMode === "minutes" ? (
                <div>
                  <span className="text-xs font-black text-sky-700 uppercase tracking-wide block">
                    🔵 Minutes Dial: Long Blue Hand (00 to 55)
                  </span>
                  <p className="text-[11px] text-slate-600 font-medium leading-normal">
                    Both needles are shown! Tap any outer minute badge (:00 to :55) directly on the clock or use the needle buttons below to adjust the long blue hand!
                  </p>
                </div>
              ) : (
                <div>
                  <span className="text-xs font-black text-amber-800 uppercase tracking-wide block">
                    ⏰ Combined Clock: Short Red (Hour) + Long Blue (Minute)
                  </span>
                  <p className="text-[11px] text-slate-600 font-medium leading-normal">
                    Interactive Clock! Tap on any clock number or use the needle controls to set the time!
                  </p>
                </div>
              )}
            </div>

            {/* SVG Clock Graphic with interactive handlers */}
            {renderClockSVG(
              interactiveHour,
              interactiveMinute,
              clockDialMode,
              (h) => {
                setInteractiveHour(h);
                playSynthSound('tap');
                playTeluguSpeech(`Hour ${h}`);
              },
              (m) => {
                setInteractiveMinute(m);
                playSynthSound('tap');
                playTeluguSpeech(`${m} minutes`);
              }
            )}

            {/* Interactive Needle Adjuster Dashboard */}
            <div className="bg-white/95 border border-amber-200/90 rounded-2xl p-3.5 max-w-md mx-auto shadow-xs space-y-3">
              <div className="text-center font-bold text-xs text-amber-900 border-b border-amber-100 pb-2 flex items-center justify-between px-1">
                <span className="font-extrabold text-[11px] uppercase tracking-wider text-amber-800">👇 Interactive Needles</span>
                <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full font-black font-mono">
                  {interactiveHour}:{interactiveMinute < 10 ? `0${interactiveMinute}` : interactiveMinute}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {/* Hour Needle Controller */}
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-2 flex flex-col items-center gap-1.5">
                  <span className="font-extrabold text-rose-800 text-[11px]">🔴 Short Needle (Hour)</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setInteractiveHour((prev) => (prev === 1 ? 12 : prev - 1));
                        playSynthSound('tap');
                      }}
                      className="w-8 h-7 bg-white border border-rose-300 rounded-lg text-rose-800 font-black hover:bg-rose-100 active:scale-95 transition cursor-pointer"
                    >
                      -1
                    </button>
                    <span className="font-black text-rose-900 bg-white px-2 py-1 rounded-md border border-rose-200 min-w-[3rem] text-center font-mono">
                      {interactiveHour} Hr
                    </span>
                    <button
                      onClick={() => {
                        setInteractiveHour((prev) => (prev === 12 ? 1 : prev + 1));
                        playSynthSound('tap');
                      }}
                      className="w-8 h-7 bg-white border border-rose-300 rounded-lg text-rose-800 font-black hover:bg-rose-100 active:scale-95 transition cursor-pointer"
                    >
                      +1
                    </button>
                  </div>
                </div>

                {/* Minute Needle Controller */}
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-2 flex flex-col items-center gap-1.5">
                  <span className="font-extrabold text-sky-800 text-[11px]">🔵 Long Needle (Minute)</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setInteractiveMinute((prev) => (prev === 0 ? 55 : prev - 5));
                        playSynthSound('tap');
                      }}
                      className="w-8 h-7 bg-white border border-sky-300 rounded-lg text-sky-800 font-black hover:bg-sky-100 active:scale-95 transition cursor-pointer"
                    >
                      -5
                    </button>
                    <span className="font-black text-sky-900 bg-white px-2 py-1 rounded-md border border-sky-200 min-w-[3.5rem] text-center font-mono">
                      :{interactiveMinute < 10 ? `0${interactiveMinute}` : interactiveMinute} m
                    </span>
                    <button
                      onClick={() => {
                        setInteractiveMinute((prev) => (prev === 55 ? 0 : prev + 5));
                        playSynthSound('tap');
                      }}
                      className="w-8 h-7 bg-white border border-sky-300 rounded-lg text-sky-800 font-black hover:bg-sky-100 active:scale-95 transition cursor-pointer"
                    >
                      +5
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  onClick={() => {
                    playTeluguSpeech(`It is ${interactiveHour} ${interactiveMinute === 0 ? "o'clock" : interactiveMinute + " minutes"}`);
                  }}
                  className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition active:scale-95"
                >
                  <span>🔊 Read Time</span>
                </button>

                {interactiveHour === roundData.hour && interactiveMinute === roundData.minute ? (
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-xl flex items-center gap-1">
                    ✨ Matched Target Time! 🎉
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setInteractiveHour(roundData.hour);
                      setInteractiveMinute(roundData.minute);
                      playSynthSound('tap');
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer transition active:scale-95"
                  >
                    <span>🎯 Target ({roundData.hour}:{roundData.minute < 10 ? `0${roundData.minute}` : roundData.minute})</span>
                  </button>
                )}
              </div>
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

        {chapterId === "g1_sweetshop" && (
          <div className="flex flex-col items-center gap-4 py-3 bg-rose-50/20 rounded-3xl border border-rose-100 p-4 shadow-inner animate-fade-in">
            {/* Sweet Shop Signboard */}
            <div className="text-center bg-gradient-to-r from-amber-400 to-rose-400 text-white font-black text-xs px-6 py-2 rounded-2xl shadow-md border-2 border-white mb-2 tracking-wide uppercase">
              🍬 నాన్న స్వీట్ షాప్ / Nanna's Sweet Shop 🍭
            </div>

            {/* 1. Addition Visuals */}
            {roundData.type === "addition" && (
              <div className="flex items-center justify-center gap-4 flex-wrap bg-white p-4 rounded-2xl border border-rose-150 shadow-xs">
                {/* Bowl 1 */}
                <div className="flex flex-col items-center gap-1.5 p-2.5 bg-amber-50/40 rounded-xl border border-amber-200">
                  <div className="flex flex-wrap max-w-[80px] gap-1 justify-center">
                    {Array.from({ length: roundData.num1 }).map((_, i) => (
                      <span key={i} className="text-2xl select-none animate-pulse">{roundData.itemEmoji}</span>
                    ))}
                  </div>
                  <span className="font-extrabold text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">{roundData.num1}</span>
                </div>

                <span className="text-xl font-black text-rose-500 font-sans">+</span>

                {/* Bowl 2 */}
                <div className="flex flex-col items-center gap-1.5 p-2.5 bg-amber-50/40 rounded-xl border border-amber-200">
                  <div className="flex flex-wrap max-w-[80px] gap-1 justify-center">
                    {Array.from({ length: roundData.num2 }).map((_, i) => (
                      <span key={i} className="text-2xl select-none animate-pulse">{roundData.itemEmoji}</span>
                    ))}
                  </div>
                  <span className="font-extrabold text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">{roundData.num2}</span>
                </div>

                <span className="text-xl font-black text-rose-500 font-sans">=</span>

                {/* Question mark bowl */}
                <div className="w-16 h-16 rounded-full bg-rose-50 border-2 border-dashed border-rose-300 flex items-center justify-center text-rose-500 font-black text-2xl">
                  ❓
                </div>
              </div>
            )}

            {/* 2. Subtraction Visuals */}
            {roundData.type === "subtraction" && (
              <div className="flex flex-col items-center gap-3 bg-white p-4 rounded-2xl border border-rose-150 shadow-xs w-full max-w-xs">
                <div className="flex flex-wrap gap-2.5 justify-center">
                  {Array.from({ length: roundData.num1 }).map((_, idx) => {
                    const isEaten = idx >= roundData.num1 - roundData.num2;
                    return (
                      <div 
                        key={idx} 
                        className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center text-2xl transition relative ${
                          isEaten 
                            ? "bg-slate-50 border-slate-200 opacity-30 line-through scale-95" 
                            : "bg-amber-50/30 border-amber-300 shadow-xs animate-bounce"
                        }`}
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <span>{roundData.itemEmoji}</span>
                        {isEaten && (
                          <span className="absolute inset-0 flex items-center justify-center text-rose-600 font-black text-base drop-shadow-sm select-none">
                            ❌
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-4 text-[10px] font-extrabold">
                  <span className="text-emerald-600 bg-emerald-50 border border-emerald-150 px-2.5 py-1 rounded-lg">
                    Had: {roundData.num1}
                  </span>
                  <span className="text-rose-600 bg-rose-50 border border-rose-150 px-2.5 py-1 rounded-lg">
                    Eaten: {roundData.num2}
                  </span>
                </div>
              </div>
            )}

            {/* 3. Counting Visuals */}
            {roundData.type === "counting" && (
              <div className="flex flex-col items-center gap-3">
                <div className="flex flex-wrap justify-center gap-2.5 bg-white border border-rose-150 p-4 rounded-2xl w-full max-w-xs shadow-inner">
                  {Array.from({ length: roundData.targetCount }).map((_, idx) => {
                    const isTapped = tappedApples.includes(idx);
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          playSynthSound('tap');
                          if (tappedApples.includes(idx)) {
                            setTappedApples(prev => prev.filter(i => i !== idx));
                          } else {
                            setTappedApples(prev => [...prev, idx]);
                          }
                        }}
                        className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center text-2xl transition-all duration-200 relative border-2 ${
                          isTapped 
                            ? "bg-amber-100 border-amber-500 scale-105 shadow-md" 
                            : "bg-white border-rose-200 hover:border-amber-400 hover:scale-102"
                        }`}
                      >
                        <span>{roundData.itemEmoji}</span>
                        {isTapped && (
                          <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white font-black text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                            {tappedApples.indexOf(idx) + 1}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">
                  Sweets Tapped: {tappedApples.length} / {roundData.targetCount}
                </span>
              </div>
            )}
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

        {(chapterId === "g1_tel_achulu" || chapterId === "g1_tel_hallulu" || chapterId === "g1_hin_swar" || chapterId === "g1_eng_alphabet") && (
          <div className="flex flex-col items-center justify-center py-4 bg-violet-50/20 rounded-3xl border border-violet-150/50 p-5 space-y-3 animate-fade-in">
            <span className="text-[9px] font-black uppercase text-violet-400 tracking-wider">Tap the letter to hear it!</span>
            <div 
              onClick={() => {
                playSynthSound('tap');
                const letter = roundData.letter || (chapterId === "g1_eng_alphabet" ? roundData.question.match(/'([^']+)'/)?.[1] : "");
                if (letter) {
                  const lang = (chapterId === "g1_tel_achulu" || chapterId === "g1_tel_hallulu") ? "te-IN" : chapterId === "g1_hin_swar" ? "hi-IN" : "en-US";
                  playSpeechWithLang(letter, lang);
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
                if (letter) {
                  const lang = (chapterId === "g1_tel_achulu" || chapterId === "g1_tel_hallulu") ? "te-IN" : chapterId === "g1_hin_swar" ? "hi-IN" : "en-US";
                  playSpeechWithLang(letter, lang);
                }
              }}
              className="flex items-center gap-1 px-3 py-1 bg-violet-100 hover:bg-violet-200 text-violet-700 font-black rounded-full text-[8px] uppercase tracking-wide transition cursor-pointer"
            >
              <span>🔊 Read Aloud</span>
            </button>
          </div>
        )}

        {chapterId === "g1_eng_spelling" && (
          <div className="flex flex-col items-center justify-center py-4 bg-amber-50/70 rounded-3xl border border-amber-200/90 p-4 sm:p-5 space-y-4 animate-fade-in shadow-xs">
            <div className="text-center space-y-1">
              <p className="text-xs font-semibold text-amber-950">
                Tap a sight word to practice spelling, phonics sounds, and interactive sentence building!
              </p>
            </div>

            {/* Word Selection Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-md">
              {SPELL_LEARNING_WORDS.map((item) => {
                const isActive = selectedSpellWord === item.word;
                return (
                  <button
                    key={item.word}
                    onClick={() => {
                      setSelectedSpellWord(item.word);
                      setSpelledLetters([]);
                      playSynthSound('tap');
                      playSpeechWithLang(item.word, "en-US");
                    }}
                    className={`px-3 py-1.5 rounded-xl font-black text-xs transition cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "bg-amber-500 text-white shadow-md scale-105 border-2 border-amber-600"
                        : "bg-white text-amber-950 border border-amber-200 hover:bg-amber-100/80"
                    }`}
                  >
                    <span className="text-sm">{item.emoji}</span>
                    <span className="capitalize">{item.word}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Word Focus Card */}
            {(() => {
              const activeItem = SPELL_LEARNING_WORDS.find((w) => w.word === selectedSpellWord) || SPELL_LEARNING_WORDS[0];
              const isFullySpelled = spelledLetters.join("").toLowerCase() === activeItem.word.toLowerCase();

              return (
                <div className="w-full max-w-md bg-white border border-amber-200/90 rounded-2xl p-4 shadow-sm space-y-3.5">
                  <div className="flex items-center justify-between border-b border-amber-100 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl select-none">{activeItem.emoji}</span>
                      <div>
                        <h4 className="font-black text-xl text-amber-950 uppercase tracking-wider font-mono">
                          {activeItem.word}
                        </h4>
                        <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                          {activeItem.category}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        playSynthSound('tap');
                        playSpeechWithLang(`${activeItem.word}. ${activeItem.sentence}`, "en-US");
                      }}
                      className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs transition active:scale-95 cursor-pointer"
                    >
                      <span>🔊 Listen</span>
                    </button>
                  </div>

                  {/* Letter Phonics Sounds */}
                  <div className="space-y-1.5 text-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Tap letters to hear phonics sounds:
                    </span>
                    <div className="flex items-center justify-center gap-1.5">
                      {activeItem.letters.map((char, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            playSynthSound('tap');
                            playSpeechWithLang(char, "en-US");
                          }}
                          className="w-10 h-11 bg-gradient-to-b from-amber-100 to-amber-200/80 border-2 border-amber-400 rounded-xl font-black text-lg text-amber-950 flex items-center justify-center shadow-xs hover:scale-110 active:scale-95 transition cursor-pointer font-mono"
                        >
                          {char.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sentence Context */}
                  <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-2.5 text-center">
                    <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider block">Usage Example</span>
                    <p className="text-xs font-bold text-amber-950 mt-0.5">
                      "{activeItem.sentence}"
                    </p>
                  </div>

                  {/* Interactive Spell Unscramble Builder */}
                  <div className="bg-amber-100/40 border border-amber-200/80 rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-amber-900 uppercase tracking-wider">
                        🧩 Spell Builder Challenge:
                      </span>
                      {spelledLetters.length > 0 && (
                        <button
                          onClick={() => {
                            setSpelledLetters([]);
                            playSynthSound('tap');
                          }}
                          className="text-[10px] font-bold text-rose-600 hover:underline cursor-pointer"
                        >
                          Reset
                        </button>
                      )}
                    </div>

                    {/* Slots */}
                    <div className="flex items-center justify-center gap-1.5 my-1.5">
                      {activeItem.letters.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-9 h-10 rounded-xl border-2 flex items-center justify-center font-black text-base font-mono ${
                            spelledLetters[idx]
                              ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                              : "bg-white border-amber-300 text-slate-300"
                          }`}
                        >
                          {spelledLetters[idx] ? spelledLetters[idx].toUpperCase() : "_"}
                        </div>
                      ))}
                    </div>

                    {/* Available Tiles */}
                    {!isFullySpelled ? (
                      <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                        {activeItem.letters.map((char, idx) => {
                          const usedCountInBuild = spelledLetters.filter((c) => c === char).length;
                          const totalCountInWord = activeItem.letters.filter((c) => c === char).length;
                          const isUsed = usedCountInBuild >= totalCountInWord;

                          return (
                            <button
                              key={`tile_${idx}`}
                              disabled={isUsed}
                              onClick={() => {
                                if (spelledLetters.length < activeItem.letters.length) {
                                  const nextSpelled = [...spelledLetters, char];
                                  setSpelledLetters(nextSpelled);
                                  playSynthSound('tap');
                                  playSpeechWithLang(char, "en-US");
                                  if (nextSpelled.join("").toLowerCase() === activeItem.word.toLowerCase()) {
                                    playSynthSound('correct');
                                    playSpeechWithLang(`Great job! ${activeItem.word}`, "en-US");
                                  }
                                }
                              }}
                              className={`w-9 h-9 rounded-lg font-black text-sm transition cursor-pointer font-mono ${
                                isUsed
                                  ? "bg-slate-200 text-slate-400 border border-slate-300 opacity-40 cursor-not-allowed"
                                  : "bg-white border border-amber-300 text-amber-950 hover:bg-amber-200 active:scale-95 shadow-xs"
                              }`}
                            >
                              {char.toUpperCase()}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold text-xs p-2 rounded-xl text-center animate-bounce flex items-center justify-center gap-1.5">
                        <span>🎉 Perfect! You spelled '{activeItem.word.toUpperCase()}'!</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {(chapterId === "g1_evs_family" || chapterId === "g1_evs_animals" || chapterId === "g1_evs_seasons" || chapterId === "g1_evs_computer") && (
          <div className="flex flex-col items-center justify-center py-4 bg-indigo-50/20 rounded-3xl border border-indigo-150/50 p-5 space-y-3 animate-fade-in">
            <span className="text-[9px] font-black uppercase text-indigo-400 tracking-wider">Interactive Computer & EVS Explorer</span>
            <div className="flex items-center justify-center gap-4">
              <span className="text-5xl animate-bounce duration-1000 select-none">
                {roundData.question.includes("Monitor") || roundData.question.includes("screen") ? "🖥️" : 
                 roundData.question.includes("CPU") || roundData.question.includes("brain") ? "🧠" : 
                 roundData.question.includes("Keyboard") || roundData.question.includes("keys") ? "⌨️" : 
                 roundData.question.includes("Mouse") || roundData.question.includes("click") ? "🖱️" : 
                 roundData.question.includes("Printer") || roundData.question.includes("paper") ? "🖨️" : 
                 roundData.question.includes("Speakers") || roundData.question.includes("music") ? "🔊" : 
                 roundData.question.includes("rainbow") ? "🌈" : 
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
                 roundData.question.includes("Umbrella") ? "☂️" : "💻"}
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


      </div>

      {/* 2. Tables 1 to 10 Visual Explorer & Interactive Practice Hub */}
      {chapterId === "g1_tables" && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-teal-200/80 shadow-xs space-y-4 animate-fade-in" id="g1_tables_explorer">
          {/* Header & Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-gradient-to-r from-teal-50 to-emerald-50 p-3.5 rounded-2xl border border-teal-200">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-teal-500 text-white flex items-center justify-center font-black text-base shadow-xs">
                ✖️
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-teal-900 uppercase tracking-wide">Grade 1 Tables Practice Hub (1 to 10)</h4>
                <p className="text-[10px] font-bold text-teal-700">Master multiplication & addition tables with interactive drills, quizzes & flashcards!</p>
              </div>
            </div>

            {/* SubTab Navigation */}
            <div className="flex flex-wrap bg-white/90 p-1 rounded-xl border border-teal-200 text-[10px] font-black gap-1">
              {[
                { id: "chart", label: "📊 Chart" },
                { id: "drill", label: "⚡ Speed Drill" },
                { id: "missing", label: "🧩 Fill Missing" },
                { id: "flashcard", label: "🎴 Flashcards" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setTablesPracticeSubTab(tab.id as any);
                    playSynthSound('tap');
                  }}
                  className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                    tablesPracticeSubTab === tab.id
                      ? "bg-teal-600 text-white shadow-xs"
                      : "text-teal-700 hover:bg-teal-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* SUBTAB 1: VISUAL CHART & CHANT */}
          {tablesPracticeSubTab === "chart" && (
            <div className="space-y-4 animate-fade-in">
              {/* Mode Toggle (Multiplication vs Addition) */}
              <div className="flex justify-between items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Select Table Type</span>
                <div className="flex bg-white p-0.5 rounded-lg border border-slate-200 text-[10px] font-black">
                  <button
                    onClick={() => {
                      setTableMode("multiplication");
                      playSynthSound('tap');
                    }}
                    className={`px-3 py-1 rounded-md transition ${
                      tableMode === "multiplication" ? "bg-teal-600 text-white shadow-xs" : "text-teal-700 hover:bg-teal-50"
                    }`}
                  >
                    ✖️ Multiplication
                  </button>
                  <button
                    onClick={() => {
                      setTableMode("addition");
                      playSynthSound('tap');
                    }}
                    className={`px-3 py-1 rounded-md transition ${
                      tableMode === "addition" ? "bg-teal-600 text-white shadow-xs" : "text-teal-700 hover:bg-teal-50"
                    }`}
                  >
                    ➕ Addition
                  </button>
                </div>
              </div>

              {/* Table Number Selector Pills 1 to 10 */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block text-center">
                  Select Table Number (1 to 10)
                </span>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                    const isSelected = selectedTableNum === num;
                    return (
                      <button
                        key={num}
                        onClick={() => {
                          setSelectedTableNum(num);
                          setSelectedRowIdx(1);
                          playSynthSound('tap');
                        }}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-black text-xs sm:text-sm border-2 transition-all cursor-pointer flex items-center justify-center ${
                          isSelected
                            ? "bg-teal-600 border-teal-700 text-white scale-105 shadow-md ring-2 ring-teal-200"
                            : "bg-white border-teal-150 text-teal-800 hover:border-teal-400 hover:bg-teal-50/50"
                        }`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Read Aloud & Grid buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <button
                  onClick={() => {
                    playSynthSound('tap');
                    handleChantTable(selectedTableNum, tableMode);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-[10px] rounded-xl shadow-xs transition cursor-pointer uppercase tracking-wider"
                >
                  <span>🔊 Chant Table {selectedTableNum} Out Loud</span>
                </button>

                <button
                  onClick={() => {
                    setShowGrid10x10(!showGrid10x10);
                    playSynthSound('tap');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] rounded-xl shadow-xs transition cursor-pointer uppercase tracking-wider"
                >
                  <span>📊 {showGrid10x10 ? "Hide" : "Show"} 10×10 Grid Matrix</span>
                </button>
              </div>

              {/* 10x10 Multiplication Grid Matrix */}
              {showGrid10x10 && (
                <div className="bg-indigo-950 text-white p-3 sm:p-4 rounded-2xl border border-indigo-800 space-y-2 overflow-x-auto shadow-inner">
                  <div className="flex justify-between items-center">
                    <h5 className="text-[10px] font-black uppercase text-indigo-300 tracking-wider">
                      Master 10×10 Multiplication Grid Matrix
                    </h5>
                    <span className="text-[8px] text-indigo-400">Tap any cell to calculate!</span>
                  </div>
                  <div className="w-full min-w-[280px] overflow-x-auto">
                    <table className="w-full text-center text-[10px] sm:text-xs font-mono border-collapse">
                      <thead>
                        <tr className="border-b border-indigo-800 text-indigo-300 font-bold">
                          <th className="p-1 bg-indigo-900/60">×</th>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(c => (
                            <th key={c} className={`p-1 ${c === selectedTableNum ? "bg-amber-500 text-slate-950 font-black rounded-t" : ""}`}>{c}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r => (
                          <tr key={r} className="border-b border-indigo-900/50">
                            <td className={`p-1 font-bold ${r === selectedTableNum ? "bg-amber-500 text-slate-950 font-black" : "text-indigo-300 bg-indigo-900/40"}`}>{r}</td>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(c => {
                              const isMatch = r === selectedTableNum || c === selectedTableNum;
                              const isExact = r === selectedTableNum && c === (selectedRowIdx || 1);
                              return (
                                <td
                                  key={c}
                                  onClick={() => {
                                    setSelectedTableNum(r);
                                    setSelectedRowIdx(c);
                                    playSynthSound('tap');
                                  }}
                                  className={`p-1 cursor-pointer transition rounded ${
                                    isExact
                                      ? "bg-amber-400 text-slate-950 font-black scale-110 shadow-md ring-2 ring-amber-200"
                                      : isMatch
                                      ? "bg-indigo-800/80 text-amber-200 font-bold"
                                      : "hover:bg-indigo-800 text-slate-300"
                                  }`}
                                >
                                  {r * c}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Complete Table Rows (1 to 10) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rowMultiplier) => {
                  const result = tableMode === "multiplication" ? selectedTableNum * rowMultiplier : selectedTableNum + rowMultiplier;
                  const isSelectedRow = selectedRowIdx === rowMultiplier;
                  
                  return (
                    <div
                      key={rowMultiplier}
                      onClick={() => {
                        setSelectedRowIdx(rowMultiplier);
                        playSynthSound('tap');
                      }}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isSelectedRow
                          ? "bg-teal-50 border-teal-500 ring-2 ring-teal-200 shadow-sm"
                          : "bg-white border-slate-200 hover:border-teal-300 hover:bg-slate-50/80"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-black text-[10px] flex items-center justify-center">
                            {rowMultiplier}
                          </span>
                          <span className="font-extrabold text-xs text-slate-800 font-mono">
                            {selectedTableNum} {tableMode === "multiplication" ? "×" : "+"} {rowMultiplier} = <span className="text-teal-700 font-black text-sm">{result}</span>
                          </span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase">
                          {isSelectedRow ? "Visual Group 👇" : "Tap"}
                        </span>
                      </div>

                      {/* Expanded Visual Array / Groups */}
                      {isSelectedRow && (
                        <div className="mt-2.5 pt-2 border-t border-teal-200/60 space-y-2 animate-fade-in">
                          <div className="text-[9px] font-bold text-teal-800 flex items-center justify-between">
                            <span>
                              {tableMode === "multiplication"
                                ? `${rowMultiplier} groups of ${selectedTableNum} items = ${result} total`
                                : `${selectedTableNum} + ${rowMultiplier} combined = ${result}`}
                            </span>
                          </div>

                          {/* Visual Emojis Grid */}
                          {tableMode === "multiplication" ? (
                            <div className="flex flex-wrap gap-1.5 p-2 bg-white rounded-lg border border-teal-100 shadow-inner max-h-28 overflow-y-auto">
                              {Array.from({ length: rowMultiplier }).map((_, groupIdx) => (
                                <div key={groupIdx} className="flex gap-0.5 bg-teal-50/70 p-1 rounded border border-teal-200/60 items-center">
                                  {Array.from({ length: selectedTableNum }).map((_, itemIdx) => (
                                    <span key={itemIdx} className="text-xs select-none">🍎</span>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-teal-100 shadow-inner">
                              <div className="flex gap-0.5 bg-blue-50 p-1 rounded border border-blue-200">
                                {Array.from({ length: selectedTableNum }).map((_, i) => (
                                  <span key={i} className="text-xs select-none">🍎</span>
                                ))}
                              </div>
                              <span className="text-xs font-black text-teal-700">+</span>
                              <div className="flex gap-0.5 bg-orange-50 p-1 rounded border border-orange-200">
                                {Array.from({ length: rowMultiplier }).map((_, i) => (
                                  <span key={i} className="text-xs select-none">🍏</span>
                                ))}
                              </div>
                              <span className="text-xs font-black text-teal-700">= {result}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUBTAB 2: SPEED DRILL PRACTICE */}
          {tablesPracticeSubTab === "drill" && (
            <div className="space-y-4 animate-fade-in">
              {/* Target Table Selector */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Practice Target Table</span>
                <div className="flex flex-wrap gap-1 justify-center">
                  <button
                    onClick={() => {
                      setDrillTargetTable("all");
                      playSynthSound('tap');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-black cursor-pointer transition ${
                      drillTargetTable === "all" ? "bg-amber-500 text-white shadow-xs" : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    🎲 All (1-10)
                  </button>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setDrillTargetTable(t);
                        playSynthSound('tap');
                        const n1 = t;
                        const n2 = Math.floor(Math.random() * 10) + 1;
                        const ans = n1 * n2;
                        const opts = Array.from(new Set([ans, ans + n1, Math.max(1, ans - n1), ans + 2])).slice(0, 4);
                        if (!opts.includes(ans)) opts[0] = ans;
                        opts.sort(() => Math.random() - 0.5);
                        setDrillQ({ num1: n1, num2: n2, answer: ans, options: opts });
                        setDrillFeedback(null);
                      }}
                      className={`w-7 h-7 rounded-lg text-[10px] font-black cursor-pointer transition flex items-center justify-center ${
                        drillTargetTable === t ? "bg-teal-600 text-white shadow-xs" : "bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scoreboard */}
              <div className="flex items-center justify-between bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-3 rounded-2xl shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⭐</span>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider text-teal-100 block">Drill Score</span>
                    <span className="text-base font-black font-mono">{drillScore} Points</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black uppercase tracking-wider text-teal-100 block">Streak 🔥</span>
                  <span className="text-base font-black font-mono">{drillStreak} In a Row</span>
                </div>
              </div>

              {/* Question Box */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 text-center space-y-3 shadow-inner">
                <span className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider">
                  {drillTargetTable === "all" ? "Mixed Tables Challenge" : `Table of ${drillTargetTable} Speed Question`}
                </span>
                <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                  {drillQ.num1} × {drillQ.num2} = ?
                </div>

                {/* Visual Group Hint */}
                <div className="flex justify-center gap-1.5 pt-1">
                  {Array.from({ length: Math.min(drillQ.num2, 5) }).map((_, idx) => (
                    <div key={idx} className="bg-slate-800/80 px-2 py-1 rounded border border-slate-700 text-[10px] text-teal-300 font-mono">
                      {drillQ.num1} 🍎
                    </div>
                  ))}
                  {drillQ.num2 > 5 && <span className="text-slate-400 text-xs font-bold font-mono self-center">+{drillQ.num2 - 5} more</span>}
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {drillQ.options.map((optionVal, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (optionVal === drillQ.answer) {
                        playSynthSound('correct');
                        setDrillScore(s => s + 10);
                        setDrillStreak(st => st + 1);
                        setDrillFeedback({ isCorrect: true, text: `Correct! ${drillQ.num1} × ${drillQ.num2} = ${drillQ.answer}! 🎉` });
                      } else {
                        playSynthSound('wrong');
                        setDrillStreak(0);
                        setDrillFeedback({ isCorrect: false, text: `Not quite! ${drillQ.num1} × ${drillQ.num2} = ${drillQ.answer}` });
                      }
                    }}
                    className="p-3 bg-white hover:bg-teal-50/70 border-2 border-slate-200 hover:border-teal-400 rounded-2xl font-black text-lg text-slate-800 transition cursor-pointer shadow-xs active:scale-95"
                  >
                    {optionVal}
                  </button>
                ))}
              </div>

              {/* Feedback and Next */}
              {drillFeedback && (
                <div className={`p-3 rounded-2xl border text-center font-extrabold text-xs flex flex-col sm:flex-row items-center justify-between gap-2 animate-fade-in ${
                  drillFeedback.isCorrect ? "bg-emerald-50 text-emerald-800 border-emerald-300" : "bg-rose-50 text-rose-800 border-rose-300"
                }`}>
                  <span>{drillFeedback.text}</span>
                  <button
                    onClick={() => {
                      playSynthSound('tap');
                      const n1 = drillTargetTable === "all" ? Math.floor(Math.random() * 10) + 1 : (drillTargetTable as number);
                      const n2 = Math.floor(Math.random() * 10) + 1;
                      const ans = n1 * n2;
                      const opts = Array.from(new Set([ans, ans + n1, Math.max(1, ans - n1), ans + 2])).slice(0, 4);
                      if (!opts.includes(ans)) opts[0] = ans;
                      opts.sort(() => Math.random() - 0.5);
                      setDrillQ({ num1: n1, num2: n2, answer: ans, options: opts });
                      setDrillFeedback(null);
                    }}
                    className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black transition cursor-pointer uppercase shadow-2xs shrink-0"
                  >
                    Next Question ➡️
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SUBTAB 3: FILL IN THE MISSING NUMBER */}
          {tablesPracticeSubTab === "missing" && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-center space-y-1">
                <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider">🧩 Fill In The Missing Table Number</span>
                <p className="text-[10px] font-bold text-amber-700">Find the missing number to complete the table equation correctly!</p>
              </div>

              {/* Question Card */}
              <div className="bg-indigo-900 text-white p-6 rounded-2xl border border-indigo-700 text-center space-y-4 shadow-md">
                <span className="text-[10px] font-black uppercase text-indigo-300 tracking-wider">What number goes in ❓?</span>
                <div className="text-3xl sm:text-4xl font-black font-mono tracking-wider">
                  {missingQ.missingPos === "num2" ? (
                    <span>{missingQ.num1} × <span className="bg-amber-400 text-slate-950 px-3 py-1 rounded-xl animate-pulse">❓</span> = {missingQ.ans}</span>
                  ) : (
                    <span>{missingQ.num1} × {missingQ.num2} = <span className="bg-amber-400 text-slate-950 px-3 py-1 rounded-xl animate-pulse">❓</span></span>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-2.5">
                {missingQ.options.map((opt, idx) => {
                  const targetVal = missingQ.missingPos === "num2" ? missingQ.num2 : missingQ.ans;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (opt === targetVal) {
                          playSynthSound('correct');
                          setMissingScore(s => s + 10);
                          setMissingFeedback({ isCorrect: true, text: `Awesome! ${missingQ.num1} × ${missingQ.num2} = ${missingQ.ans}! 🌟` });
                        } else {
                          playSynthSound('wrong');
                          setMissingFeedback({ isCorrect: false, text: `Incorrect! The answer is ${targetVal}` });
                        }
                      }}
                      className="p-3.5 bg-white hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-400 rounded-2xl font-black text-xl text-slate-800 transition cursor-pointer shadow-xs"
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Next */}
              {missingFeedback && (
                <div className={`p-3 rounded-2xl border text-center font-extrabold text-xs flex flex-col sm:flex-row items-center justify-between gap-2 animate-fade-in ${
                  missingFeedback.isCorrect ? "bg-emerald-50 text-emerald-800 border-emerald-300" : "bg-rose-50 text-rose-800 border-rose-300"
                }`}>
                  <span>{missingFeedback.text}</span>
                  <button
                    onClick={() => {
                      playSynthSound('tap');
                      const num1 = Math.floor(Math.random() * 10) + 1;
                      const num2 = Math.floor(Math.random() * 10) + 1;
                      const ans = num1 * num2;
                      const missingPos = Math.random() > 0.5 ? "num2" : "ans";
                      const correctVal = missingPos === "num2" ? num2 : ans;
                      const opts = Array.from(new Set([correctVal, correctVal + 1, Math.max(1, correctVal - 1), correctVal + 2])).slice(0, 4);
                      if (!opts.includes(correctVal)) opts[0] = correctVal;
                      opts.sort(() => Math.random() - 0.5);
                      setMissingQ({ num1, missingPos, num2, ans, options: opts });
                      setMissingFeedback(null);
                    }}
                    className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black transition cursor-pointer uppercase shadow-2xs shrink-0"
                  >
                    Next Missing Number ➡️
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SUBTAB 4: FLASHCARDS PRACTICE */}
          {tablesPracticeSubTab === "flashcard" && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-between items-center bg-teal-50 p-2.5 rounded-2xl border border-teal-200">
                <span className="text-[10px] font-black uppercase text-teal-800">Selected Table: {selectedTableNum}</span>
                <span className="text-[10px] font-bold text-teal-700">Mastered: {masteredCards.length} / 10 Cards</span>
              </div>

              {/* Flashcard Box */}
              <div
                onClick={() => {
                  setIsFlashcardFlipped(!isFlashcardFlipped);
                  playSynthSound('tap');
                }}
                className={`p-8 sm:p-10 rounded-3xl border-2 text-center transition-all duration-300 cursor-pointer shadow-md min-h-[180px] flex flex-col items-center justify-center gap-3 relative ${
                  isFlashcardFlipped
                    ? "bg-gradient-to-br from-emerald-500 to-teal-700 text-white border-emerald-400"
                    : "bg-gradient-to-br from-slate-900 to-teal-950 text-white border-teal-800 hover:border-teal-400"
                }`}
              >
                <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/20">
                  {isFlashcardFlipped ? "Answer Revealed (Tap to flip back)" : "Tap Card To Flip Answer"}
                </span>

                <div className="text-3xl sm:text-5xl font-black font-mono tracking-wide">
                  {isFlashcardFlipped ? (
                    <span>{selectedTableNum} × {flashcardCardNum} = <span className="text-amber-300 font-extrabold">{selectedTableNum * flashcardCardNum}</span></span>
                  ) : (
                    <span>{selectedTableNum} × {flashcardCardNum} = ?</span>
                  )}
                </div>

                {/* Visual Array on Reveal */}
                {isFlashcardFlipped && (
                  <div className="flex flex-wrap justify-center gap-1 mt-1 max-w-xs">
                    {Array.from({ length: flashcardCardNum }).map((_, g) => (
                      <div key={g} className="bg-white/20 p-1 rounded border border-white/30 flex gap-0.5">
                        {Array.from({ length: selectedTableNum }).map((_, i) => (
                          <span key={i} className="text-xs">🍎</span>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Nav Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setFlashcardCardNum(n => Math.max(1, n - 1));
                    setIsFlashcardFlipped(false);
                    playSynthSound('tap');
                  }}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-black text-xs transition cursor-pointer"
                >
                  ⏮️ Previous
                </button>

                <button
                  onClick={() => {
                    const cardKey = `${selectedTableNum}x${flashcardCardNum}`;
                    if (!masteredCards.includes(cardKey)) {
                      setMasteredCards(m => [...m, cardKey]);
                      playSynthSound('correct');
                    }
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black text-xs transition cursor-pointer shadow-xs"
                >
                  ⭐ Mark Mastered
                </button>

                <button
                  onClick={() => {
                    setFlashcardCardNum(n => Math.min(10, n + 1));
                    setIsFlashcardFlipped(false);
                    playSynthSound('tap');
                  }}
                  className="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-black text-xs transition cursor-pointer shadow-xs"
                >
                  Next Card ⏭️
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Telugu Reading & Phonics Assistant */}
      {chapterId.startsWith("g1_tel") && (() => {
        const filteredWords = TELUGU_READING_WORDS.filter(w => {
          if (chapterId === "g1_tel_words2") return w.level === 1;
          if (chapterId === "g1_tel_words3") return w.level === 2;
          return w.level === readingLevelFilter;
        });
        const selectedWord = TELUGU_READING_WORDS.find(w => w.id === selectedWordId) || filteredWords[0] || TELUGU_READING_WORDS[0];
        
        // Word Builder game variables
        const builderPool = chapterId === "g1_tel_words2"
          ? TELUGU_READING_WORDS.filter(w => w.level === 1)
          : chapterId === "g1_tel_words3"
          ? TELUGU_READING_WORDS.filter(w => w.level === 2)
          : TELUGU_READING_WORDS;

        const currentBuilderWord = builderPool[builderWordIdx % builderPool.length] || builderPool[0];
        // Shuffled pool of letters for current builder word
        const letterPool = [...currentBuilderWord.letters].sort((a, b) => a.localeCompare(b, 'te'));

        const handleBuilderTileClick = (letter: string) => {
          if (userBuiltLetters.length >= currentBuilderWord.letters.length) return;
          playSynthSound('tap');
          handleChantTelugu(letter, 0.6);

          const updated = [...userBuiltLetters, letter];
          setUserBuiltLetters(updated);

          // Check if filled
          if (updated.length === currentBuilderWord.letters.length) {
            const isMatch = updated.join('') === currentBuilderWord.letters.join('');
            if (isMatch) {
              playSynthSound('correct');
              setTimeout(() => {
                handleChantTelugu(`${currentBuilderWord.te}! Excellent reading!`);
              }, 300);
              if (onActionComplete) onActionComplete(15);
            } else {
              playSynthSound('wrong');
            }
          }
        };

        const playSlowPhonicsForWord = (wordObj: typeof TELUGU_READING_WORDS[0]) => {
          let delay = 0;
          wordObj.letters.forEach((letter, idx) => {
            setTimeout(() => {
              setActiveSpellingIdx(idx);
              playTeluguSpeech(letter, 0.6);
            }, delay);
            delay += 950;
          });

          setTimeout(() => {
            setActiveSpellingIdx(null);
            playTeluguSpeech(wordObj.te, 0.75);
          }, delay);
        };

        const activeGroups = (chapterId === "g1_tel_words2" || teluguWordLength === 2)
          ? TELUGU_RHYME_DATA.words2
          : TELUGU_RHYME_DATA.words3;
        const activeRhymeGroup = activeGroups.find(g => g.id === selectedTeluguRhymeSet) || activeGroups[0];

        const allSampleWordsForMatching = [
          { te: "అల", emoji: "🌊", group: "ala" },
          { te: "ఇల", emoji: "🌍", group: "ala" },
          { te: "నడ", emoji: "🚶", group: "nada" },
          { te: "వడ", emoji: "🍩", group: "nada" },
          { te: "కలం", emoji: "🖊️", group: "kalam" },
          { te: "బలం", emoji: "💪", group: "kalam" },
          { te: "గగనం", emoji: "🌌", group: "gaganam" },
          { te: "పవనం", emoji: "🍃", group: "gaganam" },
          { te: "పలక", emoji: "📝", group: "palaka" },
          { te: "అరక", emoji: "🚜", group: "palaka" }
        ];

        const handlePairClick = (word: { te: string; emoji: string; group: string }) => {
          if (!selectedTeluguPairWord) {
            setSelectedTeluguPairWord(word);
            return;
          }

          if (selectedTeluguPairWord.te === word.te) {
            setSelectedTeluguPairWord(null);
            return;
          }

          if (selectedTeluguPairWord.group === word.group) {
            playSynthSound('correct');
            setMatchedTeluguPairs(prev => [...prev, selectedTeluguPairWord.te, word.te]);
            setSelectedTeluguPairWord(null);
            if (onActionComplete) onActionComplete(15);
          } else {
            playSynthSound('wrong');
            setSelectedTeluguPairWord(null);
          }
        };

        return (
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-violet-200 shadow-sm space-y-4 animate-fade-in" id="g1_telugu_reading_hub">
            {/* Top Navigation Tabs for Struggling Readers */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-4 rounded-2xl text-white shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-2xl shadow-inner shrink-0">
                  📖
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black uppercase tracking-wide flex items-center gap-2">
                    {chapterId === "g1_tel_achulu"
                      ? "తెలుగు అచ్చులు (Vowels Lesson 1)"
                      : chapterId === "g1_tel_hallulu"
                      ? "తెలుగు హల్లులు (Consonants Lesson 2)"
                      : chapterId === "g1_tel_words2"
                      ? "తెలుగు రెండు అక్షరాల పదాలు (2-Letter Words)"
                      : chapterId === "g1_tel_words3"
                      ? "తెలుగు మూడు అక్షరాల పదాలు (3-Letter Words)"
                      : chapterId === "g1_tel_guninthalu"
                      ? "తెలుగు గుణింతాలు (Guninthalu Lesson 5)"
                      : chapterId === "g1_tel_ottulu"
                      ? "తెలుగు ఒత్తులు (Ottulu Lesson 6)"
                      : "తెలుగు పదాల చదువు సహాయకుడు"}
                    <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full uppercase">
                      {chapterId === "g1_tel_achulu"
                        ? "Lesson 1 Vowels"
                        : chapterId === "g1_tel_hallulu"
                        ? "Lesson 2 Consonants"
                        : chapterId === "g1_tel_words2"
                        ? "Lesson 3 2-Letter Words"
                        : chapterId === "g1_tel_words3"
                        ? "Lesson 4 3-Letter Words"
                        : chapterId === "g1_tel_guninthalu"
                        ? "Lesson 5 Guninthalu"
                        : chapterId === "g1_tel_ottulu"
                        ? "Lesson 6 Ottulu"
                        : "Grade 1 Phonics Reader"}
                    </span>
                  </h4>
                  <p className="text-[11px] font-medium text-violet-100">
                    {chapterId === "g1_tel_achulu" 
                      ? "Learn Telugu Vowels (అచ్చులు) from అ to అః with standard words & audio!"
                      : chapterId === "g1_tel_hallulu"
                      ? "Learn Telugu Consonants (హల్లులు) from క to ఱ with standard words & audio!"
                      : chapterId === "g1_tel_words2"
                      ? "Master 2-Letter Telugu words (రెండు అక్షరాల పదాలు) with clear audio & practice!"
                      : chapterId === "g1_tel_words3"
                      ? "Master 3-Letter Telugu words (మూడు అక్షరాల పదాలు) with clear audio & practice!"
                      : chapterId === "g1_tel_guninthalu"
                      ? "Master Telugu Vowel Signs (గుణింతాలు) & letter combinations with audio & practice!"
                      : chapterId === "g1_tel_ottulu"
                      ? "Master Telugu Consonant Adjuncts (ఒత్తులు) & double consonant words with audio & practice!"
                      : "Designed specially for Grade 1 children struggling to read simple Telugu words!"}
                  </p>
                </div>
              </div>

              {/* Sub-tab switcher */}
              {chapterId === "g1_tel_achulu" ? (
                <div className="flex bg-white/20 p-1 rounded-xl backdrop-blur-md text-[11px] font-black w-full md:w-auto justify-center">
                  <span className="px-3.5 py-1.5 rounded-lg bg-amber-300 text-slate-950 shadow-xs font-black ring-2 ring-amber-400 flex items-center gap-1.5">
                    <span>✍️ అచ్చులు (Vowels Lesson 1)</span>
                  </span>
                </div>
              ) : chapterId === "g1_tel_hallulu" ? (
                <div className="flex bg-white/20 p-1 rounded-xl backdrop-blur-md text-[11px] font-black w-full md:w-auto justify-center">
                  <span className="px-3.5 py-1.5 rounded-lg bg-amber-300 text-slate-950 shadow-xs font-black ring-2 ring-amber-400 flex items-center gap-1.5">
                    <span>🔤 హల్లులు (Consonants Lesson 2)</span>
                  </span>
                </div>
              ) : chapterId === "g1_tel_guninthalu" ? (
                <div className="flex bg-white/20 p-1 rounded-xl backdrop-blur-md text-[11px] font-black w-full md:w-auto justify-center">
                  <span className="px-3.5 py-1.5 rounded-lg bg-indigo-300 text-slate-950 shadow-xs font-black ring-2 ring-indigo-400 flex items-center gap-1.5">
                    <span>🎨 గుణింతాలు (Guninthalu Lesson 5)</span>
                  </span>
                </div>
              ) : chapterId === "g1_tel_ottulu" ? (
                <div className="flex bg-white/20 p-1 rounded-xl backdrop-blur-md text-[11px] font-black w-full md:w-auto justify-center">
                  <span className="px-3.5 py-1.5 rounded-lg bg-pink-300 text-slate-950 shadow-xs font-black ring-2 ring-pink-400 flex items-center gap-1.5">
                    <span>🔤 ఒత్తులు (Ottulu Lesson 6)</span>
                  </span>
                </div>
              ) : (
                <div className="flex bg-white/20 p-1 rounded-xl backdrop-blur-md text-[11px] font-black w-full md:w-auto justify-center flex-wrap gap-1">
                  <button
                    onClick={() => {
                      setTeluguSubTab("reading");
                      playSynthSound('tap');
                    }}
                    className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                      teluguSubTab === "reading"
                        ? "bg-white text-violet-950 shadow-xs font-black"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <span>📖 1) పఠనం</span>
                  </button>
                  <button
                    onClick={() => {
                      setTeluguSubTab("wheel");
                      playSynthSound('tap');
                    }}
                    className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                      teluguSubTab === "wheel"
                        ? "bg-white text-violet-950 shadow-xs font-black"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <span>🎯 2) పదాల తయారీ</span>
                  </button>
                  <button
                    onClick={() => {
                      setTeluguSubTab("pictures");
                      playSynthSound('tap');
                    }}
                    className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                      teluguSubTab === "pictures"
                        ? "bg-white text-violet-950 shadow-xs font-black"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <span>🖼️ 3) బొమ్మల పేర్లు</span>
                  </button>
                  <button
                    onClick={() => {
                      setTeluguSubTab("phonics");
                      playSynthSound('tap');
                    }}
                    className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                      teluguSubTab === "phonics"
                        ? "bg-white text-violet-950 shadow-xs font-black"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <span>🔤 Phonics</span>
                  </button>
                  <button
                    onClick={() => {
                      setTeluguSubTab("builder");
                      playSynthSound('tap');
                    }}
                    className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                      teluguSubTab === "builder"
                        ? "bg-white text-violet-950 shadow-xs font-black"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <span>🧩 Builder</span>
                  </button>
                  <button
                    onClick={() => {
                      setTeluguSubTab("rhymes");
                      playSynthSound('tap');
                    }}
                    className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                      teluguSubTab === "rhymes"
                        ? "bg-white text-violet-950 shadow-xs font-black"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <span>🎵 Rhymes</span>
                  </button>
                </div>
              )}
            </div>

            {/* TAB 0: TELUGU ACHULU (VOWELS) CHART & PICTURES */}
            {teluguSubTab === "achulu" && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-300 p-4 sm:p-5 rounded-2xl shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-amber-200 pb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2">
                        <span>✍️ అచ్చులు - అ నుండి అః (Telugu Vowels Chart & Pictures)</span>
                        <span className="bg-amber-200 text-amber-950 text-[10px] px-2 py-0.5 rounded-full uppercase font-black">
                          Grade 1 Standard Textbook
                        </span>
                      </h3>
                      <p className="text-xs text-amber-900 font-medium mt-1">
                        అక్షరం మరియు దాని సరైన బొమ్మ/పదంపై నొక్కి శబ్దాన్ని వినండి! (Tap any vowel card to hear pronunciation & word chant!)
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        playSynthSound('tap');
                        handleChantTelugu("అచ్చులు: అ అమ్మ, ఆ ఆవు, ఇ ఇల్లు, ఈ ఈల, ఉ ఉడుత, ఊ ఊయల, ఋ ఋషి, ఎ ఎలుక, ఏ ఏనుగు, ఐ ఐదు, ఒ ఒంటె, ఓ ఓడ, ఔ ఔషధం, అం అంబారీ, అః అంతఃపురం");
                      }}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-black px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer shrink-0 transition"
                    >
                      <span>🔊 Full Achulu Song Chant</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {TELUGU_ACHULU_CHART.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white border-2 border-amber-200 hover:border-amber-400 p-3 rounded-2xl flex flex-col items-center justify-between text-center gap-2 shadow-xs hover:shadow-md transition group cursor-pointer"
                        onClick={() => {
                          playSynthSound('tap');
                          handleChantTelugu(`${item.letter}! ${item.word}! ${item.en}`);
                          if (onActionComplete) onActionComplete(5);
                        }}
                      >
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center font-black text-3xl text-amber-950 shadow-inner group-hover:scale-110 transition">
                          {item.letter}
                        </div>
                        <div className="text-4xl my-1 group-hover:scale-110 transition">
                          {item.emoji}
                        </div>
                        <div className="space-y-0.5 w-full">
                          <span className="block text-base font-black text-amber-950">
                            {item.word}
                          </span>
                          <span className="block text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                            {item.en} ({item.meaning})
                          </span>
                          <span className="inline-block bg-amber-50 text-amber-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-amber-200 mt-1">
                            {item.break}
                          </span>
                        </div>
                        <span className="text-[9px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1 mt-1">
                          🔊 Tap Audio
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: TELUGU GUNINTHALU (VOWEL SIGNS) CHART */}
            {teluguSubTab === "guninthalu" && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200 p-4 sm:p-5 rounded-2xl shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-indigo-200 pb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-indigo-950 flex items-center gap-2">
                        <span>🎨 గుణింతాలు - Vowel Signs & Combinations (Grade 1 Chapter 5)</span>
                        <span className="bg-indigo-200 text-indigo-950 text-[10px] px-2 py-0.5 rounded-full uppercase font-black">
                          Grade 1 Lesson 5
                        </span>
                      </h3>
                      <p className="text-xs text-indigo-900 font-medium mt-1">
                        హల్లులను ఎంచుకుని, గుణింత గుర్తుల ద్వారా ఏర్పడే అక్షరాలను, ఉదాహరణ మాటలను వినండి! (Tap any card to hear pronunciation!)
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        playSynthSound('tap');
                        handleChantTelugu("గుణింత గుర్తులు: తలకట్టు క, దీర్ఘం కా, గుడి కి, గుడిదీర్ఘం కీ, కొమ్ము కు, కొమ్ముదీర్ఘం కూ, రుత్వము కృ, రుత్వదీర్ఘము కౄ, ఎత్వము కె, ఏత్వము కే, ఐత్వము కై, ఒత్వము కొ, ఓత్వము కో, ఔత్వము కౌ, సున్నా కం, విసర్గ కః");
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer shrink-0 transition"
                    >
                      <span>🔊 Full 16 Guninthalu Chant</span>
                    </button>
                  </div>

                  {/* Interactive Guninthalu Chart */}
                  <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-xs space-y-4">
                    {/* Pure Vowel Signs (Guninthapu Gurthulu) Reference Header */}
                    <div className="bg-indigo-900 text-white p-3.5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-xs">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-indigo-200 block">
                          గ్రేడ్ 1 గుణింత గుర్తులు (Guninthapu Gurthulu - Vowel Signs Guide)
                        </span>
                        <h4 className="text-sm sm:text-base font-black text-amber-300">
                          తలకట్టు, దీర్ఘము, గుడి, గుడి దీర్ఘము, కొమ్ము, కొమ్ము దీర్ఘము...
                        </h4>
                      </div>
                      <span className="text-[10px] bg-white/20 px-2.5 py-1 rounded-lg font-bold text-violet-100 shrink-0">
                        16 Vowel Signs (ౕ, ా, ి, ీ, ు, ూ, ృ...)
                      </span>
                    </div>

                    <span className="text-xs font-black uppercase text-indigo-600 tracking-wider block pt-1">
                      అక్షరాన్ని ఎంచుకోండి (Select Base Consonant to Combine):
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {["క", "గ", "చ", "జ", "ట", "డ", "త", "ద", "న", "ప", "బ", "మ", "య", "ర", "ల", "వ", "స", "హ"].map(c => (
                        <button
                          key={c}
                          onClick={() => {
                            playSynthSound('tap');
                            handleChantTelugu(`${c} గుణింతము`);
                            setSelectedTeluguRhymeSet(c);
                          }}
                          className={`w-10 h-10 rounded-xl font-black text-base border-2 transition cursor-pointer ${
                            (selectedTeluguRhymeSet === c || (selectedTeluguRhymeSet === "ala" && c === "క"))
                              ? "bg-indigo-600 text-white border-indigo-700 scale-105 shadow-sm"
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-indigo-50"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>

                    {/* Chart display for active base consonant */}
                    {(() => {
                      const baseC = (["క", "గ", "చ", "జ", "ట", "డ", "త", "ద", "న", "ప", "బ", "మ", "య", "ర", "ల", "వ", "స", "హ"].includes(selectedTeluguRhymeSet))
                        ? selectedTeluguRhymeSet
                        : "క";
                      const signs = [
                        { name: "తలకట్టు", en: "Thalakattu", sym: "ౕ", vowel: "అ", form: baseC, ex: `${baseC}ల 🖊️`, wordName: `${baseC}ల (Pen)` },
                        { name: "దీర్ఘము", en: "Dheergamu", sym: "ా", vowel: "ఆ", form: baseC + "ా", ex: `${baseC}కా 🐦`, wordName: `${baseC}కా (Crow)` },
                        { name: "గుడి", en: "Gudi", sym: "ి", vowel: "ఇ", form: baseC === "క" ? "కి" : baseC + "ి", ex: "కిటికి 🪟", wordName: "కిటికి (Window)" },
                        { name: "గుడి దీర్ఘము", en: "Gudi Dheergamu", sym: "ీ", vowel: "ఈ", form: baseC === "క" ? "కీ" : baseC + "ీ", ex: "కీలు 🔑", wordName: "కీలు (Key)" },
                        { name: "కొమ్ము", en: "Kommu", sym: "ు", vowel: "ఉ", form: baseC === "క" ? "కు" : baseC + "ు", ex: "కుక్క 🐶", wordName: "కుక్క (Dog)" },
                        { name: "కొమ్ము దీర్ఘము", en: "Kommu Dheergamu", sym: "ూ", vowel: "ఊ", form: baseC === "క" ? "కూ" : baseC + "ూ", ex: "కూర 🍲", wordName: "కూర (Curry)" },
                        { name: "వట్రసుడి / రుత్వము", en: "Vatrasudi / Rutvamu", sym: "ృ", vowel: "ఋ", form: baseC + "ృ", ex: "కృషి 🌾", wordName: "కృషి (Effort)" },
                        { name: "వట్రసుడి దీర్ఘము", en: "Vatrasudi Dheergamu", sym: "ౄ", vowel: "ౠ", form: baseC + "ౄ", ex: "కౄరుడు 🦁", wordName: "కౄరుడు (Cruel)" },
                        { name: "ఎత్వము", en: "Etvamu", sym: "ె", vowel: "ఎ", form: baseC + "ె", ex: "కెరటం 🌊", wordName: "కెరటం (Wave)" },
                        { name: "ఏత్వము / ఎత్వదీర్ఘము", en: "Etva Dheergamu", sym: "ే", vowel: "ఏ", form: baseC + "ే", ex: "కేకు 🍰", wordName: "కేకు (Cake)" },
                        { name: "ఐత్వము", en: "Aitvamu", sym: "ై", vowel: "ఐ", form: baseC + "ై", ex: "కైక 👸", wordName: "కైక (Queen)" },
                        { name: "ఒత్వము", en: "Otvamu", sym: "ొ", vowel: "ఒ", form: baseC + "ొ", ex: "కొడుకు 👦", wordName: "కొడుకు (Son)" },
                        { name: "ఓత్వము / ఒత్వదీర్ఘము", en: "Otva Dheergamu", sym: "ో", vowel: "ఓ", form: baseC + "ో", ex: "కోట 🏰", wordName: "కోట (Fort)" },
                        { name: "ఔత్వము", en: "Autvamu", sym: "ౌ", vowel: "ఔ", form: baseC + "ౌ", ex: "కౌముది 🌕", wordName: "కౌముది (Moonlight)" },
                        { name: "సున్నా", en: "Sunna (Am)", sym: "ం", vowel: "అం", form: baseC + "ం", ex: "కంకణం 💍", wordName: "కంకణం (Bangle)" },
                        { name: "విసర్గ", en: "Visarga (Aha)", sym: "ః", vowel: "అః", form: baseC + "ః", ex: "దుఃఖం 😢", wordName: "దుఃఖం (Sorrow)" }
                      ];

                      return (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2.5 pt-2">
                          {signs.map((s, sIdx) => (
                            <div
                              key={sIdx}
                              onClick={() => {
                                playSynthSound('tap');
                                handleChantTelugu(`${s.name} ${s.en}! గుర్తు ${s.sym}! అక్షరం ${s.form}! పదం ${s.wordName}`);
                                if (onActionComplete) onActionComplete(5);
                              }}
                              className="bg-gradient-to-b from-indigo-50/80 to-purple-50/80 hover:from-indigo-100 hover:to-purple-100 border-2 border-indigo-200/80 hover:border-indigo-400 p-2.5 rounded-xl text-center space-y-1 cursor-pointer transition hover:scale-102 shadow-xs group"
                            >
                              <div className="flex items-center justify-between border-b border-indigo-100 pb-1">
                                <span className="text-[10px] font-black text-indigo-900 truncate">{s.name}</span>
                                <span className="text-[9px] font-bold text-amber-700 bg-amber-100/80 px-1.5 py-0.2 rounded font-mono">{s.vowel}</span>
                              </div>
                              <span className="text-[9px] font-semibold text-slate-500 block truncate">{s.en} ({s.sym})</span>
                              <span className="text-2xl font-black text-indigo-950 block my-0.5 group-hover:scale-110 transition">{s.form}</span>
                              <span className="text-[9px] font-bold text-indigo-800 bg-white px-1.5 py-0.5 rounded border border-indigo-150 block truncate shadow-2xs">{s.ex}</span>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: TELUGU OTTULU (CONSONANT ADJUNCTS) CHART */}
            {teluguSubTab === "ottulu" && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 border-2 border-pink-200 p-4 sm:p-5 rounded-2xl shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-pink-200 pb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-pink-950 flex items-center gap-2">
                        <span>🔤 ఒత్తులు - Consonant Adjuncts & Double Consonant Words (Grade 1 Chapter 6)</span>
                        <span className="bg-pink-200 text-pink-950 text-[10px] px-2 py-0.5 rounded-full uppercase font-black">
                          Grade 1 Lesson 6
                        </span>
                      </h3>
                      <p className="text-xs text-pink-900 font-medium mt-1">
                        హల్లులు మరియు వాటి ఒత్తుల పదాలను (అక్క, అమ్మ, అత్త, పిల్లి, పువ్వు) శబ్దంతో నేర్చుకోండి! (Tap any card to hear!)
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        playSynthSound('tap');
                        handleChantTelugu("ఒత్తుల పదాలు: అక్క, అమ్మ, అత్త, కుక్క, పిల్లి, పువ్వు, చెట్టు, ముగ్గు, మచ్చ");
                      }}
                      className="bg-pink-600 hover:bg-pink-700 text-white font-black px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer shrink-0 transition"
                    >
                      <span>🔊 Full Ottulu Chant</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { letter: "క", ottu: "్క", name: "క-ఒత్తు", word: "అక్క 👧", meaning: "Elder Sister", exp: "అ + క్క = అక్క" },
                      { letter: "గ", ottu: "్గ", name: "గ-ఒత్తు", word: "ముగ్గు 🎨", meaning: "Rangoli Pattern", exp: "ము + గ్గు = ముగ్గు" },
                      { letter: "చ", ottu: "్చ", name: "చ-ఒత్తు", word: "మచ్చ 🪞", meaning: "Spot / Mark", exp: "మ + చ్చ = మచ్చ" },
                      { letter: "ట", ottu: "్ట", name: "ట-ఒత్తు", word: "చెట్టు 🌳", meaning: "Tree", exp: "చె + ట్టు = చెట్టు" },
                      { letter: "త", ottu: "్త", name: "త-ఒత్తు", word: "అత్త 👵", meaning: "Aunt", exp: "అ + త్త = అత్త" },
                      { letter: "ప", ottu: "్ప", name: "ప-ఒత్తు", word: "అప్ప 🥟", meaning: "Snack / Brother", exp: "అ + ప్ప = అప్ప" },
                      { letter: "మ", ottu: "్మ", name: "మ-ఒత్తు", word: "అమ్మ 👩‍🍼", meaning: "Mother", exp: "అ + మ్మ = అమ్మ" },
                      { letter: "ల", ottu: "్ల", name: "ల-ఒత్తు", word: "పిల్లి 🐱", meaning: "Cat", exp: "పి + ల్లి = పిల్లి" },
                      { letter: "వ", ottu: "్వ", name: "వ-ఒత్తు", word: "పువ్వు 🌸", meaning: "Flower", exp: "పు + వ్వు = పువ్వు" }
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          playSynthSound('tap');
                          handleChantTelugu(`${item.letter} ${item.name}! ${item.word}! ${item.meaning}!`);
                          if (onActionComplete) onActionComplete(5);
                        }}
                        className="bg-white border-2 border-pink-200 hover:border-pink-400 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-xs hover:shadow-md transition cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center font-black text-2xl text-pink-950 shadow-inner group-hover:scale-110 transition shrink-0">
                            {item.letter}{item.ottu}
                          </div>
                          <div>
                            <span className="block text-xs font-black text-pink-900">{item.name} ({item.letter})</span>
                            <span className="block text-base font-black text-slate-800">{item.word}</span>
                            <span className="block text-[10px] font-bold text-slate-500">{item.meaning}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-pink-700 bg-pink-50 px-2 py-1 rounded-lg border border-pink-100 shrink-0">
                          🔊 Listen
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1: TEXTBOOK READING GRID */}
            {teluguSubTab === "reading" && (
              <div className="space-y-4">
                <div className="bg-amber-50/90 border-2 border-amber-300 p-4 sm:p-5 rounded-2xl shadow-sm text-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-amber-200/80 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📖</span>
                      <h3 className="text-base sm:text-lg font-black text-amber-950">
                        1) పఠనం (Telugu Textbook Reading Box)
                      </h3>
                    </div>
                    <span className="text-xs font-bold bg-amber-200/80 text-amber-950 px-3 py-1 rounded-full flex items-center gap-1">
                      🔊 Click any word to hear pronunciation audio!
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-amber-900">
                    ఈ క్రింది సరళ పదాలను స్పష్టంగా చదవండి. ప్రతీ పదంపై నొక్కి దాని ఉచ్చారణ (audio) వినండి:
                  </p>

                  {/* Grid container styled like textbook page */}
                  <div className="bg-amber-100/70 p-4 rounded-xl border border-amber-300/80 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                    {TEXTBOOK_READING_GRID.map((item, idx) => {
                      const isActive = activeReadingWord === item.te;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setActiveReadingWord(item.te);
                            playSynthSound('tap');
                            handleChantTelugu(item.te, 0.75);
                          }}
                          className={`p-3 rounded-xl font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border ${
                            isActive
                              ? "bg-amber-500 text-white border-amber-600 scale-105 shadow-md ring-4 ring-amber-300"
                              : "bg-white text-amber-950 border-amber-200 hover:bg-amber-50 hover:border-amber-300 shadow-xs"
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <span className="text-lg sm:text-xl font-serif">{item.te}</span>
                            <span className="text-xs opacity-80">🔊</span>
                          </div>
                          <span className={`text-[10px] font-bold ${isActive ? "text-amber-100" : "text-amber-700"}`}>
                            {item.en} {item.emoji}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected word spotlight */}
                  {activeReadingWord && (() => {
                    const wordInfo = TEXTBOOK_READING_GRID.find(w => w.te === activeReadingWord) || TEXTBOOK_READING_GRID[0];
                    return (
                      <div className="bg-white p-3.5 sm:p-4 rounded-xl border-2 border-amber-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-950 shadow-sm animate-fade-in">
                        <div className="flex items-center gap-3 flex-wrap">
                          <button
                            onClick={() => {
                              playSynthSound('tap');
                              handleChantTelugu(wordInfo.te, 0.75);
                            }}
                            className="text-3xl cursor-pointer hover:scale-110 active:scale-95 transition bg-amber-50 hover:bg-amber-100 p-2 rounded-xl border border-amber-200"
                            title="Click emoji to listen"
                          >
                            {wordInfo.emoji}
                          </button>
                          <div>
                            <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider block">Phonics Formula & Audio:</span>
                            <div className="text-base sm:text-lg font-black font-serif text-amber-950 flex items-center gap-2 flex-wrap mt-0.5">
                              <button
                                onClick={() => {
                                  playSynthSound('tap');
                                  handleChantTelugu(wordInfo.break.replace(/\+/g, ' '), 0.65);
                                }}
                                className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer transition active:scale-95 shadow-2xs"
                                title="Click to hear letter breakdown"
                              >
                                <span className="font-serif">{wordInfo.break}</span>
                                <span className="text-xs">🔊</span>
                              </button>
                              <span className="text-amber-600 font-bold">=</span>
                              <button
                                onClick={() => {
                                  playSynthSound('tap');
                                  handleChantTelugu(wordInfo.te, 0.75);
                                }}
                                className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-lg font-black flex items-center gap-1.5 cursor-pointer transition active:scale-95 shadow-xs"
                                title="Click to hear full word"
                              >
                                <span className="font-serif text-lg">{wordInfo.te}</span>
                                <span className="text-xs">🔊</span>
                              </button>
                              <button
                                onClick={() => {
                                  playSynthSound('tap');
                                  handleChantTelugu(`${wordInfo.te}! ${wordInfo.meaning}`, 0.75);
                                }}
                                className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-amber-950 bg-slate-100 hover:bg-amber-100 border border-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition active:scale-95"
                                title="Click to hear meaning"
                              >
                                <span>({wordInfo.en} - {wordInfo.meaning})</span>
                                <span className="text-xs text-amber-600">🔊</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleChantTelugu(`${wordInfo.te}! ${wordInfo.break.replace(/\+/g, ' ')}! ${wordInfo.te}`, 0.7)}
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95"
                        >
                          <span>🔊 Play Audio Chant</span>
                        </button>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* TAB 2: WORD WHEEL BUILDER */}
            {teluguSubTab === "wheel" && (
              <div className="space-y-4">
                <div className="bg-violet-50/90 border-2 border-violet-200 p-4 sm:p-5 rounded-2xl shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-violet-200 pb-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-violet-950 flex items-center gap-2">
                        <span>2) పదాలను తయారు చేయండి (Build Words Activity)</span>
                        <span className="bg-violet-200 text-violet-900 text-[10px] px-2 py-0.5 rounded-full uppercase font-bold">
                          Textbook Page Exercise
                        </span>
                      </h3>
                      <p className="text-xs text-violet-700 font-medium">
                        ఎడమవైపు ఉన్న అక్షరాలను మధ్యలోని అక్షరానికి కలిపి నూతన పదాలను తయారు చేయండి!
                      </p>
                    </div>

                    {/* Wheel Set Switcher */}
                    <div className="flex bg-white p-1 rounded-xl border border-violet-200 text-xs font-bold">
                      {TEXTBOOK_WORD_WHEEL_SETS.map(set => (
                        <button
                          key={set.id}
                          onClick={() => {
                            setSelectedWheelSetId(set.id as any);
                            setFormedWheelWords([]);
                            setActiveConnectingPrefix(null);
                            playSynthSound('tap');
                          }}
                          className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                            selectedWheelSetId === set.id
                              ? "bg-violet-600 text-white font-black shadow-xs"
                              : "text-violet-700 hover:bg-violet-100"
                          }`}
                        >
                          '{set.suffix}' అక్షరం
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main Interactive Diagram Container */}
                  {(() => {
                    const currentWheelSet = TEXTBOOK_WORD_WHEEL_SETS.find(s => s.id === selectedWheelSetId) || TEXTBOOK_WORD_WHEEL_SETS[0];
                    const isSetComplete = formedWheelWords.length === currentWheelSet.prefixList.length;

                    return (
                      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-violet-200 shadow-sm space-y-6">
                        <h4 className="text-center text-sm font-black text-violet-900 bg-violet-100 py-1.5 px-4 rounded-full max-w-md mx-auto">
                          {currentWheelSet.title}
                        </h4>

                        {/* Visual Word Wheel Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                          {/* Left Column: Prefix Boxes */}
                          <div className="space-y-3">
                            <span className="text-[11px] font-black uppercase text-violet-600 block text-center md:text-left">
                              1. అక్షరం ఎంచుకోండి (Select Prefix):
                            </span>
                            <div className="flex flex-col gap-2.5">
                              {currentWheelSet.prefixList.map((item, idx) => {
                                const isFormed = formedWheelWords.includes(item.result);
                                const isConnecting = activeConnectingPrefix === item.prefix;

                                return (
                                  <button
                                    key={idx}
                                    onClick={() => {
                                      playSynthSound('tap');
                                      setActiveConnectingPrefix(item.prefix);
                                      handleChantTelugu(`${item.prefix}... ${currentWheelSet.suffix}... ${item.result}!`);

                                      if (!formedWheelWords.includes(item.result)) {
                                        const updated = [...formedWheelWords, item.result];
                                        setFormedWheelWords(updated);
                                        if (onActionComplete) onActionComplete(10);

                                        if (updated.length === currentWheelSet.prefixList.length) {
                                          setTimeout(() => {
                                            playSynthSound('correct');
                                            handleChantTelugu(`శభాష్! ${currentWheelSet.suffix} అక్షరంతో అన్ని పదాలు పూర్తిచేశారు!`);
                                          }, 1200);
                                        }
                                      }
                                    }}
                                    className={`p-3 rounded-2xl font-black text-lg border-2 transition-all cursor-pointer flex items-center justify-between ${
                                      isConnecting
                                        ? "bg-amber-400 text-slate-950 border-amber-500 scale-105 shadow-md ring-4 ring-amber-200"
                                        : isFormed
                                        ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                                        : "bg-violet-50 text-violet-950 border-violet-200 hover:bg-violet-100 hover:border-violet-400"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="w-7 h-7 rounded-lg bg-white border border-violet-200 text-xs font-black flex items-center justify-center text-violet-700 shadow-xs">
                                        {idx + 1}
                                      </span>
                                      <span className="text-2xl font-serif">{item.prefix}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      {isFormed && <span className="text-emerald-600 font-bold text-xs">✓ చేరింది</span>}
                                      <span className="text-xs bg-violet-200 text-violet-800 px-2 py-0.5 rounded-md font-bold">
                                        + {currentWheelSet.suffix} 🔊
                                      </span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Center Column: Big Target Hub Bubble */}
                          <div className="flex flex-col items-center justify-center my-2 md:my-0 relative">
                            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 text-white border-4 border-amber-300 shadow-xl flex flex-col items-center justify-center relative animate-pulse">
                              <span className="text-xs font-black text-amber-300 uppercase tracking-widest">చేర్చు</span>
                              <span className="text-4xl sm:text-5xl font-black font-serif my-0.5">{currentWheelSet.suffix}</span>
                              <span className="text-[10px] font-bold text-violet-200">Target Letter</span>
                            </div>
                            <span className="text-[11px] font-bold text-violet-700 mt-2 text-center">
                              నొక్కిన అక్షరం ఇక్కడ చేరుతుంది!
                            </span>
                          </div>

                          {/* Right Column: Output Formed Words Lines */}
                          <div className="space-y-3">
                            <span className="text-[11px] font-black uppercase text-violet-600 block text-center md:text-left">
                              2. తయారైన పదాలు (Formed Words):
                            </span>
                            <div className="flex flex-col gap-2.5">
                              {currentWheelSet.prefixList.map((item, idx) => {
                                const isFormed = formedWheelWords.includes(item.result);
                                return (
                                  <div
                                    key={idx}
                                    className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all ${
                                      isFormed
                                        ? "bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs"
                                        : "bg-slate-50 border-dashed border-slate-300 text-slate-400"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-bold text-slate-400">{idx + 1}.</span>
                                      {isFormed ? (
                                        <span className="text-xl font-black font-serif text-emerald-900">{item.result}</span>
                                      ) : (
                                        <span className="text-sm font-bold tracking-widest text-slate-300">__________</span>
                                      )}
                                    </div>

                                    {isFormed ? (
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-emerald-700">({item.meaning})</span>
                                        <button
                                          onClick={() => {
                                            playSynthSound('tap');
                                            handleChantTelugu(`${item.result}! ${item.break}`, 0.75);
                                          }}
                                          className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition cursor-pointer text-xs"
                                          title="Play Audio"
                                        >
                                          🔊
                                        </button>
                                      </div>
                                    ) : (
                                      <span className="text-[10px] font-bold text-slate-400">ఎడమ నొక్కండి</span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Set Completion Banner */}
                        {isSetComplete && (
                          <div className="bg-emerald-100 border-2 border-emerald-400 p-4 rounded-2xl text-center space-y-2 animate-bounce">
                            <span className="text-3xl">🎉</span>
                            <h4 className="text-base font-black text-emerald-950">
                              శభాష్! అన్ని పదాలు విజయవంతంగా తయారుచేశారు!
                            </h4>
                            <p className="text-xs text-emerald-800 font-bold">
                              You earned +50 Star Points! Try the next letter set above!
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* TAB 3: PICTURE NAMES IDENTIFICATION */}
            {teluguSubTab === "pictures" && (
              <div className="space-y-4">
                <div className="bg-sky-50/90 border-2 border-sky-200 p-4 sm:p-5 rounded-2xl shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-sky-200 pb-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-sky-950 flex items-center gap-2">
                        <span>3) క్రింది బొమ్మల పేర్లను వ్రాయండి (Picture Identification)</span>
                        <span className="bg-sky-200 text-sky-900 text-[10px] px-2 py-0.5 rounded-full uppercase font-bold">
                          Textbook Page Exercise
                        </span>
                      </h3>
                      <p className="text-xs text-sky-800 font-medium">
                        బొమ్మను పరిశీలించి సరైన పదాన్ని ఎంచుకోండి. బొమ్మపై నొక్కి దాని పేరు ఉచ్చారణ వినండి!
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {TEXTBOOK_PICTURES_DATA.map((pic) => {
                      const userAnswer = pictureAnswers[pic.id];
                      const isCorrect = userAnswer === pic.correctWord;

                      return (
                        <div
                          key={pic.id}
                          className={`bg-white p-4 rounded-2xl border-2 transition-all space-y-3 shadow-xs ${
                            isCorrect
                              ? "border-emerald-400 bg-emerald-50/40 ring-2 ring-emerald-200"
                              : userAnswer
                              ? "border-rose-300 bg-rose-50/30"
                              : "border-sky-200 hover:border-sky-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-sky-900">{pic.title}</span>
                            <span className="text-[11px] font-bold text-slate-500">{pic.meaning}</span>
                          </div>

                          {/* Big Interactive Emoji / Image Box */}
                          <button
                            onClick={() => {
                              playSynthSound('tap');
                              handleChantTelugu(`${pic.correctWord}! ${pic.hint}`, 0.75);
                            }}
                            className="w-full bg-gradient-to-b from-sky-50 to-indigo-50/30 border border-sky-200 p-4 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer hover:scale-102 transition group"
                          >
                            <span className="text-5xl group-hover:scale-110 transition">{pic.emoji}</span>
                            <span className="text-[10px] font-bold text-sky-700 bg-white/80 px-2 py-0.5 rounded-full border border-sky-200 mt-1 flex items-center gap-1">
                              🔊 Click picture to hear audio
                            </span>
                          </button>

                          {/* Multiple Choice Options */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                              సరైన పేరును ఎంచుకోండి:
                            </span>
                            <div className="grid grid-cols-2 gap-2">
                              {pic.options.map((opt, oIdx) => {
                                const isSelected = userAnswer === opt;
                                const isOptCorrect = opt === pic.correctWord;

                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => {
                                      playSynthSound('tap');
                                      handleChantTelugu(opt, 0.75);
                                      setPictureAnswers(prev => ({ ...prev, [pic.id]: opt }));
                                      if (opt === pic.correctWord) {
                                        playSynthSound('correct');
                                        if (onActionComplete) onActionComplete(15);
                                      } else {
                                        playSynthSound('wrong');
                                      }
                                    }}
                                    className={`p-2.5 rounded-xl font-black text-sm border transition cursor-pointer flex items-center justify-between ${
                                      isSelected && isOptCorrect
                                        ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                                        : isSelected && !isOptCorrect
                                        ? "bg-rose-500 text-white border-rose-600"
                                        : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-sky-100 hover:border-sky-300"
                                    }`}
                                  >
                                    <span className="font-serif text-base">{opt}</span>
                                    <span className="text-xs">🔊</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Feedback status */}
                          {userAnswer && (
                            <div className={`p-2 rounded-xl text-center text-xs font-black flex items-center justify-center gap-1.5 ${
                              isCorrect ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"
                            }`}>
                              {isCorrect ? (
                                <>
                                  <span>✨ శభాష్! సరైన పదం: <strong>{pic.correctWord}</strong></span>
                                </>
                              ) : (
                                <>
                                  <span>❌ మరలా ప్రయత్నించండి! ({pic.hint})</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {teluguSubTab === "phonics" && (
              <div className="space-y-4">
                {/* Level Selection Filters */}
                {chapterId === "g1_tel_words2" ? (
                  <div className="flex items-center justify-between gap-2 bg-violet-50 p-3 rounded-xl border border-violet-200">
                    <span className="text-xs font-black uppercase text-violet-900 flex items-center gap-2">
                      <span>✌️ Chapter 3: రెండు అక్షరాల పదాలు (2-Letter Words)</span>
                      <span className="bg-violet-200 text-violet-950 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {filteredWords.length} Words
                      </span>
                    </span>
                  </div>
                ) : chapterId === "g1_tel_words3" ? (
                  <div className="flex items-center justify-between gap-2 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                    <span className="text-xs font-black uppercase text-emerald-900 flex items-center gap-2">
                      <span>🤟 Chapter 4: మూడు అక్షరాల పదాలు (3-Letter Words)</span>
                      <span className="bg-emerald-200 text-emerald-950 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {filteredWords.length} Words
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Select Word Difficulty Level:
                    </span>
                    <div className="flex bg-white p-1 rounded-lg border border-slate-200 text-xs font-bold">
                      <button
                        onClick={() => {
                          setReadingLevelFilter(1);
                          setSelectedWordId("rw1");
                          playSynthSound('tap');
                        }}
                        className={`px-3 py-1 rounded-md transition cursor-pointer ${
                          readingLevelFilter === 1
                            ? "bg-violet-600 text-white font-black"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Level 1: 2-Letter Words (రెండు)
                      </button>
                      <button
                        onClick={() => {
                          setReadingLevelFilter(2);
                          setSelectedWordId("rw9");
                          playSynthSound('tap');
                        }}
                        className={`px-3 py-1 rounded-md transition cursor-pointer ${
                          readingLevelFilter === 2
                            ? "bg-violet-600 text-white font-black"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Level 2: 3-Letter Words (మూడు)
                      </button>
                      <button
                        onClick={() => {
                          setReadingLevelFilter(3);
                          setSelectedWordId("rw15");
                          playSynthSound('tap');
                        }}
                        className={`px-3 py-1 rounded-md transition cursor-pointer ${
                          readingLevelFilter === 3
                            ? "bg-violet-600 text-white font-black"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Level 3: Vowels & Basic (చిన్న పదాలు)
                      </button>
                    </div>
                  </div>
                )}

                {/* Word List Chips */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {filteredWords.map((w) => {
                    const isSelected = selectedWordId === w.id;
                    return (
                      <button
                        key={w.id}
                        onClick={() => {
                          setSelectedWordId(w.id);
                          playSynthSound('tap');
                          handleChantTelugu(w.te, 0.7);
                        }}
                        className={`px-3.5 py-2 rounded-xl font-black text-sm border transition-all cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? "bg-violet-600 border-violet-700 text-white scale-105 shadow-md ring-2 ring-violet-200"
                            : "bg-white border-slate-200 text-slate-800 hover:border-violet-300 hover:bg-violet-50"
                        }`}
                      >
                        <span className="text-base">{w.emoji}</span>
                        <span>{w.te}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Spotlight Reading Card */}
                {selectedWord && (
                  <div className="bg-gradient-to-b from-violet-50 via-purple-50/40 to-white p-5 sm:p-6 rounded-3xl border-2 border-violet-200 shadow-md text-center space-y-4 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-violet-200/80 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-4xl">{selectedWord.emoji}</span>
                        <div className="text-left">
                          <h3 className="text-xl font-black text-violet-950 font-serif">
                            {selectedWord.te}
                          </h3>
                          <span className="text-xs font-bold text-violet-700 uppercase tracking-wider block">
                            {selectedWord.en} • {selectedWord.meaning}
                          </span>
                        </div>
                      </div>

                      <div className="bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-black">
                        💡 Formula: {selectedWord.tip}
                      </div>
                    </div>

                    {/* Letter-by-Letter Interactive Speller Tiles */}
                    <div className="space-y-2 py-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                        Tap each letter card below to hear its isolated sound (అక్షరానికి విడివిడిగా వినండి):
                      </span>

                      <div className="flex items-center justify-center gap-3">
                        {selectedWord.letters.map((letter, idx) => {
                          const isHighlighted = activeSpellingIdx === idx;
                          const phonetic = selectedWord.phonics[idx] || "";

                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                playSynthSound('tap');
                                handleChantTelugu(letter, 0.5);
                                setActiveSpellingIdx(idx);
                                setTimeout(() => setActiveSpellingIdx(null), 800);
                              }}
                              className={`w-16 h-20 sm:w-20 sm:h-24 rounded-2xl font-black text-3xl sm:text-4xl flex flex-col items-center justify-center border-2 shadow-md transition-all cursor-pointer transform hover:scale-105 ${
                                isHighlighted
                                  ? "bg-amber-400 border-amber-600 text-slate-950 scale-110 ring-4 ring-amber-200 shadow-lg"
                                  : "bg-white border-violet-300 text-violet-950 hover:bg-violet-100/70"
                              }`}
                            >
                              <span>{letter}</span>
                              <span className="text-[10px] font-mono text-violet-600 uppercase tracking-wider mt-1">
                                {phonetic}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* English Phonics Helper Line */}
                    <div className="bg-white/80 p-2.5 rounded-xl border border-violet-200 inline-block px-5 text-xs font-extrabold text-violet-900 shadow-2xs font-mono">
                      Phonics: {selectedWord.phonics.join(" + ")} = {selectedWord.en} ({selectedWord.meaning})
                    </div>

                    {/* Audio Controls for Slow Reading */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          playSynthSound('tap');
                          playSlowPhonicsForWord(selectedWord);
                        }}
                        className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition cursor-pointer flex items-center gap-2 uppercase tracking-wider"
                      >
                        <span>🐢 Slow Phonics Chant (మెల్లగా చదువు)</span>
                      </button>

                      <button
                        onClick={() => {
                          playSynthSound('tap');
                          handleChantTelugu(selectedWord.te, 0.75);
                        }}
                        className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 active:scale-95 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition cursor-pointer flex items-center gap-2 uppercase tracking-wider"
                      >
                        <span>🔊 Normal Speed (పూర్తి పదం)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: WORD BUILDER PUZZLE */}
            {teluguSubTab === "builder" && (
              <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-5 rounded-3xl border-2 border-indigo-200 shadow-sm text-center space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-indigo-200 pb-3">
                  <div className="text-left">
                    <h4 className="text-sm font-black text-indigo-950 uppercase tracking-wide">
                      🧩 అక్షరాలతో పదం తయారు చేయండి (Word Assembly Puzzle)
                    </h4>
                    <p className="text-[11px] font-bold text-indigo-700">
                      Tap the scrambled letter tiles below in correct order to build the word!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setBuilderWordIdx(prev => prev + 1);
                      setUserBuiltLetters([]);
                      playSynthSound('tap');
                    }}
                    className="px-3.5 py-1.5 bg-indigo-600 text-white font-black text-xs rounded-xl hover:bg-indigo-700 cursor-pointer shadow-2xs"
                  >
                    ➡️ Next Word
                  </button>
                </div>

                {/* Target Picture & Meaning */}
                <div className="space-y-1">
                  <div className="text-5xl select-none">{currentBuilderWord.emoji}</div>
                  <h3 className="text-base font-black text-slate-800">
                    {currentBuilderWord.meaning} ({currentBuilderWord.en})
                  </h3>
                </div>

                {/* User Built Slots */}
                <div className="flex items-center justify-center gap-3 py-2">
                  {currentBuilderWord.letters.map((_, idx) => {
                    const filledLetter = userBuiltLetters[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (filledLetter) {
                            setUserBuiltLetters(prev => prev.filter((_, i) => i !== idx));
                            playSynthSound('tap');
                          }
                        }}
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-3 font-black text-3xl flex items-center justify-center transition-all cursor-pointer ${
                          filledLetter
                            ? "bg-white border-indigo-600 text-indigo-950 shadow-md scale-105"
                            : "bg-indigo-100/50 border-dashed border-indigo-300 text-indigo-300"
                        }`}
                      >
                        {filledLetter || "_"}
                      </div>
                    );
                  })}
                </div>

                {/* Scrambled Letter Tiles */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-black uppercase text-slate-500 block">
                    Tap these letter tiles in order:
                  </span>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {letterPool.map((letter, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleBuilderTileClick(letter)}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border-2 border-indigo-200 hover:border-indigo-500 font-black text-2xl text-indigo-950 shadow-sm hover:scale-110 active:scale-95 transition cursor-pointer flex items-center justify-center"
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Success Banner */}
                {userBuiltLetters.length === currentBuilderWord.letters.length && (
                  <div className="pt-2">
                    {userBuiltLetters.join('') === currentBuilderWord.letters.join('') ? (
                      <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-3 rounded-2xl font-black text-sm animate-bounce">
                        🎉 అద్భుతం! (Superb!) You built "{currentBuilderWord.te}" ({currentBuilderWord.meaning})! +15 Stars ⭐
                      </div>
                    ) : (
                      <div className="bg-rose-100 border border-rose-300 text-rose-900 p-3 rounded-2xl font-black text-xs">
                        ❌ Try again! Tap the slots above to reset letters.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: RHYME & RHYTHM EXPLORER */}
            {teluguSubTab === "rhymes" && (
              <div className="space-y-4">
                {/* Mode Switcher: 2-Letter vs 3-Letter */}
                {chapterId === "g1_tel_words2" ? (
                  <div className="flex items-center justify-between gap-2 bg-violet-50 p-3 rounded-xl border border-violet-200">
                    <span className="text-xs font-black text-violet-900 uppercase tracking-wide">
                      ✌️ Chapter 3: 2-Letter Word Practice Sets (రెండు అక్షరాల పదాలు)
                    </span>
                  </div>
                ) : chapterId === "g1_tel_words3" ? (
                  <div className="flex items-center justify-between gap-2 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                    <span className="text-xs font-black text-emerald-900 uppercase tracking-wide">
                      🤟 Chapter 4: 3-Letter Word Practice Sets (మూడు అక్షరాల పదాలు)
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-xs font-black text-slate-700 uppercase tracking-wide">
                      Select Practice Rhythm Set:
                    </span>
                    <div className="flex bg-white p-1 rounded-xl border border-violet-200 text-xs font-black">
                      <button
                        onClick={() => {
                          setTeluguWordLength(2);
                          setSelectedTeluguRhymeSet("ala");
                          playSynthSound('tap');
                        }}
                        className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                          teluguWordLength === 2
                            ? "bg-violet-600 text-white shadow-xs"
                            : "text-violet-700 hover:bg-violet-50"
                        }`}
                      >
                        <span>✌️ 2-Letter Words (రెండు)</span>
                      </button>
                      <button
                        onClick={() => {
                          setTeluguWordLength(3);
                          setSelectedTeluguRhymeSet("kalam");
                          playSynthSound('tap');
                        }}
                        className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                          teluguWordLength === 3
                            ? "bg-violet-600 text-white shadow-xs"
                            : "text-violet-700 hover:bg-violet-50"
                        }`}
                      >
                        <span>🤟 3-Letter Words (మూడు)</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Rhythm Group Selectors */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block text-center">
                    Select Rhythm Sound Set ({teluguWordLength === 2 ? "2-Letter" : "3-Letter"} Groups)
                  </span>
                  <div className="flex flex-wrap justify-center gap-2">
                    {activeGroups.map((group) => {
                      const isSelected = selectedTeluguRhymeSet === group.id;
                      return (
                        <button
                          key={group.id}
                          onClick={() => {
                            setSelectedTeluguRhymeSet(group.id);
                            playSynthSound('tap');
                          }}
                          className={`px-3.5 py-2 rounded-xl font-black text-xs border transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? "bg-violet-600 border-violet-700 text-white scale-105 shadow-md ring-2 ring-violet-200"
                              : "bg-white border-violet-200 text-violet-900 hover:border-violet-400 hover:bg-violet-50/50"
                          }`}
                        >
                          <span>{group.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Rhythm Banner & Chant Audio Button */}
                {activeRhymeGroup && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3.5 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <span className="bg-amber-500 text-white font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          Rhyme Ending: '{activeRhymeGroup.rhymeLetter}'
                        </span>
                        <h5 className="text-xs font-black text-amber-950">{activeRhymeGroup.title}</h5>
                      </div>
                      <p className="text-[11px] font-extrabold text-amber-900 font-serif">
                        "{activeRhymeGroup.exampleSentence}"
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        playSynthSound('tap');
                        handleChantTelugu(activeRhymeGroup.exampleSentence, 0.8);
                      }}
                      className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-xs rounded-xl shadow-md transition cursor-pointer uppercase tracking-wider"
                    >
                      <span>🔊 Chant Rhythm Out Loud</span>
                    </button>
                  </div>
                )}

                {/* Visual Cards Grid */}
                {activeRhymeGroup && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                    {activeRhymeGroup.words.map((w, idx) => {
                      const prefix = w.te.slice(0, w.te.length - activeRhymeGroup.rhymeLetter.length);
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            playSynthSound('tap');
                            handleChantTelugu(`${w.te}. ${w.meaning}`, 0.75);
                          }}
                          className="p-3.5 bg-white hover:bg-violet-50/70 rounded-2xl border-2 border-violet-100 hover:border-violet-400 transition-all cursor-pointer shadow-2xs hover:shadow-md hover:scale-[1.03] text-center space-y-1.5 group relative overflow-hidden"
                        >
                          <div className="text-3xl select-none group-hover:scale-110 transition">{w.emoji}</div>
                          <div>
                            <div className="text-lg font-black text-violet-950 font-serif">
                              {prefix}
                              <span className="text-rose-600 underline decoration-2 decoration-rose-400 font-black">
                                {activeRhymeGroup.rhymeLetter}
                              </span>
                            </div>
                            <span className="text-[10px] font-black text-violet-700 block uppercase tracking-wide">
                              {w.en}
                            </span>
                          </div>

                          <div className="pt-1.5 border-t border-violet-100">
                            <span className="text-[9px] font-extrabold text-slate-600 block leading-tight">
                              {w.meaning}
                            </span>
                            <span className="text-[8.5px] font-mono font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-1">
                              {w.break}
                            </span>
                          </div>

                          <div className="text-[8px] font-black uppercase text-violet-500 opacity-0 group-hover:opacity-100 transition pt-0.5">
                            🔊 Tap to Hear
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Match the Rhyming Pairs Interactive Game */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-1">
                    <h5 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-amber-500" />
                      Rhyme Matcher Game (ప్రాస పదాల జతలను గుర్తించండి)
                    </h5>
                    <span className="text-[10px] font-bold text-indigo-600">
                      Tap 2 matching rhyming words to pair them up!
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center pt-1">
                    {allSampleWordsForMatching.map((item) => {
                      const isMatched = matchedTeluguPairs.includes(item.te);
                      const isSelected = selectedTeluguPairWord?.te === item.te;

                      return (
                        <button
                          key={item.te}
                          disabled={isMatched}
                          onClick={() => {
                            playSynthSound('tap');
                            handlePairClick(item);
                          }}
                          className={`px-3.5 py-2 rounded-xl font-black text-xs border transition-all cursor-pointer flex items-center gap-2 ${
                            isMatched
                              ? "bg-emerald-100 border-emerald-300 text-emerald-800 opacity-60 cursor-not-allowed"
                              : isSelected
                              ? "bg-amber-400 border-amber-500 text-slate-950 scale-105 ring-2 ring-amber-200 shadow-md"
                              : "bg-white border-slate-200 text-slate-800 hover:border-violet-400 hover:bg-violet-50"
                          }`}
                        >
                          <span className="text-base">{item.emoji}</span>
                          <span>{item.te}</span>
                          {isMatched && <span className="text-emerald-600">✅</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
