// Utility for robust, high-quality Telugu & Multilingual Speech Synthesis

let currentAudio: HTMLAudioElement | null = null;

/**
 * Plays speech for Telugu text using Google Translate TTS MP3 stream with fallback to Web Speech API.
 */
export function playTeluguSpeech(text: string, rate: number = 0.85) {
  if (!text || !text.trim()) return;

  // Remove emojis and non-pronounceable brackets/formatting symbols, keeping Telugu range \u0C00-\u0C7F
  const cleanText = text
    .replace(/[^\w\s\u0C00-\u0C7F.,!?-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) return;

  // Stop any currently playing speech/audio
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {
      // ignore
    }
    currentAudio = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  // 1. Try Google Translate TTS MP3 stream with client=gtx
  try {
    const encoded = encodeURIComponent(cleanText.slice(0, 200));
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=te&client=gtx`;
    const audio = new Audio(googleTtsUrl);
    audio.playbackRate = Math.min(Math.max(rate, 0.5), 1.5);
    currentAudio = audio;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Retry with client=tw-ob
        try {
          const fallbackUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=te&client=tw-ob`;
          const audio2 = new Audio(fallbackUrl);
          audio2.playbackRate = Math.min(Math.max(rate, 0.5), 1.5);
          currentAudio = audio2;
          const p2 = audio2.play();
          if (p2 !== undefined) {
            p2.catch(() => {
              fallbackToWebSpeech(cleanText, rate, "te-IN");
            });
          }
        } catch {
          fallbackToWebSpeech(cleanText, rate, "te-IN");
        }
      });
    }
  } catch (err) {
    fallbackToWebSpeech(cleanText, rate, "te-IN");
  }
}

/**
 * Fallback mechanism using browser Web Speech API
 */
function fallbackToWebSpeech(text: string, rate: number, lang: string = "te-IN") {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;

    const voices = window.speechSynthesis.getVoices();
    const teVoice = voices.find(v => 
      v.lang.toLowerCase().startsWith('te') || 
      v.name.toLowerCase().includes('telugu')
    );

    if (teVoice) {
      utterance.voice = teVoice;
      utterance.lang = teVoice.lang;
    } else {
      utterance.lang = lang;
    }

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.error("Speech Synthesis Error:", e);
  }
}

/**
 * Universal speech player supporting language codes (te-IN, hi-IN, en-US)
 */
export function playSpeechWithLang(text: string, lang: string = "te-IN", rate: number = 0.85) {
  if (lang.startsWith("te")) {
    playTeluguSpeech(text, rate);
    return;
  }

  if (lang.startsWith("hi")) {
    // Hindi TTS fallback stream
    const cleanText = text.replace(/[^\w\s\u0900-\u097F.,!?-]/g, ' ').replace(/\s+/g, ' ').trim();
    if (cleanText) {
      try {
        const encoded = encodeURIComponent(cleanText.slice(0, 200));
        const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=hi&client=gtx`;
        const audio = new Audio(googleTtsUrl);
        audio.playbackRate = rate;
        if (currentAudio) {
          currentAudio.pause();
        }
        currentAudio = audio;
        const p = audio.play();
        if (p !== undefined) {
          p.catch(() => fallbackToWebSpeech(cleanText, rate, "hi-IN"));
        }
        return;
      } catch {
        fallbackToWebSpeech(cleanText, rate, "hi-IN");
        return;
      }
    }
  }

  // English or other Web Speech
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[^\w\s.,!?-]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  }
}
