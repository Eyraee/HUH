"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { X, ArrowRight, RotateCcw, Flag, Hash, Type, ToggleLeft, Sparkles, Star, Flame, Trophy, Share2 } from "lucide-react";
import { questionBank, Question } from "../data/questions";

// --- ZERO-DEPENDENCY WEB AUDIO SFX ENGINE ---
class SoundEngine {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playPoke() {
    this.init(); if (!this.ctx) return;
    const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
    osc.type = "sine"; const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(850, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.16);
    gain.gain.setValueAtTime(0.3, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(now); osc.stop(now + 0.18);
  }

  playThud() {
    this.init(); if (!this.ctx) return;
    const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
    osc.type = "triangle"; const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(140, now); osc.frequency.exponentialRampToValueAtTime(35, now + 0.15);
    gain.gain.setValueAtTime(0.5, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(now); osc.stop(now + 0.18);
  }

  playPop() {
    this.init(); if (!this.ctx) return;
    const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
    osc.type = "sine"; const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(600, now); osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
    gain.gain.setValueAtTime(0.2, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(now); osc.stop(now + 0.05);
  }

  playSuccess() {
    this.init(); if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; const now = this.ctx.currentTime;
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
      osc.type = "triangle"; const start = now + idx * 0.06;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.15, start); gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(start); osc.stop(start + 0.25);
    });
  }

  playFail() {
    this.init(); if (!this.ctx) return;
    const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
    osc.type = "sawtooth"; const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(120, now); osc.frequency.linearRampToValueAtTime(70, now + 0.25);
    gain.gain.setValueAtTime(0.2, now); gain.gain.linearRampToValueAtTime(0.01, now + 0.28);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(now); osc.stop(now + 0.28);
  }

  playTick() {
    this.init(); if (!this.ctx) return;
    const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
    osc.type = "square"; const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(1200, now);
    gain.gain.setValueAtTime(0.02, now); gain.gain.linearRampToValueAtTime(0.001, now + 0.02);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(now); osc.stop(now + 0.02);
  }
}

export const sfx = new SoundEngine();

// --- DYNAMIC BACKGROUND & CARD COLORS ---
const pageBackgrounds = ["#f4f0ea", "#e0f2fe", "#fce7f3", "#fef3c7", "#dcfce3", "#f3e8ff"];
const cardColors = ["#FFA6C9", "#A7F3D0", "#BAE6FD", "#FDE047", "#C4B5FD"];

const SKINS = ["clown", "cowboy", "halo", "devil", "chef", "crown", "pirate", "ninja", "tophat", "cat", "chains", "sombrero", "vr", "wizard", "bandana", "monocle", "astronaut", "diver", "propeller", "party", "groucho", "flower", "viking", "aviator", "cyber", "bag", "zombie", "mantle", "alien"];

// --- VIBE DICTIONARIES (MASSIVELY EXPANDED) ---
const getRoasts = (vibe: string) => {
  if (vibe === "Brainrot") return ["L + Ratio.", "Bro has zero aura.", "What is blud waffling about?", "Literal NPC behavior.", "Negative rizz on that guess.", "Bro thought he was Him 💀", "Who let him cook??", "What the sigma.", "Bro is completely lost.", "Skibidi toilet has higher IQ.", "L + ratio + didn't guess.", "Bro thinks he's the main character.", "Certified yap session.", "Get mogged by a trivia game.", "TikTok brain in full effect.", "No thoughts head empty."];
  if (vibe === "Sweaty") return ["APM too low.", "You're getting clip farmed.", "Drop your rank right now.", "Get out of my lobby.", "Reaction time measured in business days.", "Uninstall.", "Touch grass immediately.", "Hardstuck bronze.", "I'm dodging this lobby.", "Stop throwing.", "Check your ping.", "Aim lab is free.", "You're getting carried.", "Skill issue.", "You have zero gamesense.", "Literally free points and you missed."];
  if (vibe === "Chaotic") return ["I am in your walls.", "Run.", "The shadow figures are laughing at you.", "I'm calling the police.", "Every time you guess wrong, a star dies.", "Blink twice if you need an ambulance.", "I will literally bite you.", "I know your IP.", "Don't look behind you.", "The fog is coming.", "Wake up.", "I am rapidly approaching your location.", "You cannot hide.", "There are bugs under your skin.", "I am consuming your RAM."];
  return ["Google it, coward.", "Skill issue detected.", "Is your monitor even turned on?", "I'm not your mom, figure it out.", "My brother in Christ, just guess.", "You are the reason shampoo has instructions.", "Error 404: Brain not found.", "I have zero faith in you.", "Just close the tab.", "I'm judging you silently.", "A literal pigeon could guess this.", "Are you guessing or praying?", "I can see you sweating.", "This isn't a charity.", "Pathetic.", "I expected nothing and I'm still disappointed."];
};

const getInsults = (vibe: string) => {
  if (vibe === "Brainrot") return ["Certified brainrot gameplay.", "You fell off.", "Actual NPC behavior.", "Negative aura.", "I'm crying bro 💀", "Zero rizz detected.", "Bro thinks he cooked but the kitchen burned down.", "Caught lacking in 4K.", "Generational fumble.", "Bro is allergic to getting points.", "Go back to TikTok."];
  if (vibe === "Sweaty") return ["Hardstuck plastic rank.", "You folded under zero pressure.", "Skill issue of the highest order.", "Do you even have a mouse?", "GG EZ.", "I've seen bots play better.", "You're the reason we lost.", "Uninstalling the game for you.", "Your chair must be unplugged.", "I'm billing you for my wasted time.", "Absolute bot behavior."];
  if (vibe === "Chaotic") return ["I need a factory reset after watching you play.", "I am physically cringing right now.", "Unfathomably bad.", "I am sending this score to your parents.", "This is a tragedy.", "I will haunt your dreams for this score.", "You have doomed us all.", "The simulation is glitching because of your low IQ.", "I am actively deleting this memory.", "I hope your pillow is warm on both sides."];
  return ["Bro really thought he cooked with this score.", "My grandma plays better and she's literally dead.", "Please do not put this on your resume.", "Delete your browser history after this.", "I'm not mad, just profoundly disappointed.", "I've seen amoebas with better logic.", "You are the reason we have warning labels.", "Even Wikipedia couldn't save you.", "You have the spatial awareness of a Roomba.", "Absolute cinema (of failure).", "You owe me a written apology for this gameplay."];
};

const pokeQuotes = [
  "Stop poking me.", "Do I look like a button?", "Personal space, please.", "I will literally bite you.", "Rude.", "I'm calling HR.", "Can I help you?", "do not perceive me.", "I am reporting you.", "that is assault.", "I'm calling the police.", "my lawyer will hear about this.", "do I look interactive?", "I'm not a hyperlink.", "stop clicking me.", "I don't drop loot.", "I'm not a pinata.", "you're ruining my aesthetic.", "I'm losing brain cells.", "I'm deducting points.", "I'm ignoring that.", "I'm pretending you didn't do that.", "I'm deeply uncomfortable.", "I'm filing a complaint.", "I'm not your tamagotchi.", "I'm not a pet.", "I don't do tricks.", "I'm a professional.", "I'm trying to work here.", "I'm on strike.", "I'm boycotting you.", "I'm blocking your cursor.", "I'm adding you to a list.", "I'm not ticklish.", "I'm made of pure spite.", "I'm going to bite you.", "I'm legally allowed to attack.", "I'm considering violence.", "I'm choosing peace today. barely.", "I'm not a toy.", "I'm a serious game mascot.", "I'm losing my mind.", "I'm screaming internally.", "I'm questioning my existence.", "I'm an entity of pure rage.", "I'm going to crash the tab.", "I'm throwing an error.", "I'm throwing hands.", "I'm not in the mood.", "I'm tired of you.", "I'm exhausted.", "I'm going back to sleep.", "I'm logging off.", "I'm uninstalling myself.", "I'm deleting my own code.", "I'm returning null.", "I'm undefined.", "I'm NaN.", "I'm a 500 Internal Server Error.", "I'm a teapot.", "I'm refusing to render.", "I'm dropping frames.", "I'm leaking memory.", "I'm crashing."
];

// --- SCORING ENGINE ---
const calculateScore = (question: Question, guess: string | number | boolean): number => {
  if (question.type === "boolean") {
    return (String(guess).toLowerCase() === "yes" || guess === true) === (question.answer === "yes" || question.answer === true) ? 100 : 0;
  }
  if (question.type === "text") {
    return String(guess).toLowerCase().trim() === String(question.answer).toLowerCase().trim() ? 100 : 0;
  }
  if (question.type === "number") {
    const numGuess = Number(guess);
    const numAnswer = Number(question.answer);
    const tolerance = question.tolerance || 0;
    const diff = Math.abs(numGuess - numAnswer);
    if (diff <= tolerance) return 100;
    if (numAnswer === 0) return numGuess === 0 ? 100 : 0;
    return Math.max(0, Math.round(100 - (diff / numAnswer) * 100));
  }
  return 0;
};

const getJudgment = (score: number) => {
  if (score === 100) return ["Are you cheating?", "Nerd.", "Okay, Einstein.", "Suspiciously accurate.", "Aimbot enabled.", "Touch grass.", "You definitely googled that."];
  if (score >= 80) return ["Close enough.", "I'll allow it.", "Not terrible.", "You got lucky.", "Acceptable.", "Don't get cocky."];
  if (score >= 50) return ["Ehh.", "Half a brain cell used.", "Could be worse.", "You're slipping.", "Mid.", "Barely passing."];
  if (score > 0) return ["Way off.", "Did you even read the question?", "Math is hard, huh?", "Oof.", "Not even close.", "Embarrassing."];
  return ["Wow.", "Zero points. Zero.", "My grandma guesses better.", "Embarrassing.", "Absolute failure.", "Just quit.", "I'm physically cringing."];
};

// --- INTERACTIVE BACKGROUND GEOMETRY ---
const FloatingShapes = ({ currentIndex, mouseX, mouseY }: { currentIndex: number; mouseX: number; mouseY: number }) => {
  const seed1 = (currentIndex * 13) % 100;
  const seed2 = (currentIndex * 27) % 100;
  const seed3 = (currentIndex * 41) % 100;
  
  const calcDodge = (baseX: number, baseY: number) => {
    if (typeof window === "undefined") return { x: 0, y: 0 };
    const dx = mouseX - (baseX / 100) * window.innerWidth;
    const dy = mouseY - (baseY / 100) * window.innerHeight;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 300) return { x: 0, y: 0 };
    const angle = Math.atan2(dy, dx);
    const force = (300 - dist) * 0.2;
    return { x: -Math.cos(angle) * force, y: -Math.sin(angle) * force };
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute w-40 h-40 sm:w-64 sm:h-64 border-[12px] sm:border-[16px] border-zinc-900/5 rounded-full"
        animate={{ top: `${seed1}%`, left: `${seed2}%`, rotate: seed1 * 10, x: calcDodge(seed2, seed1).x, y: calcDodge(seed2, seed1).y }}
        transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
      />
      <motion.div
        className="absolute w-24 h-24 sm:w-40 sm:h-40 bg-zinc-900/5"
        animate={{ top: `${seed3}%`, right: `${seed1}%`, rotate: seed2 * 5, x: calcDodge(100 - seed1, seed3).x, y: calcDodge(100 - seed1, seed3).y }}
        transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
      />
      <motion.svg
        className="absolute w-64 h-64 sm:w-96 sm:h-96 text-zinc-900/5"
        viewBox="0 0 100 100"
        animate={{ bottom: `${seed2}%`, left: `${seed3}%`, rotate: -seed1 * 5, x: calcDodge(seed3, 100 - seed2).x, y: calcDodge(seed3, 100 - seed2).y }}
        transition={{ duration: 1.5, type: "spring" }}
      >
        <path d="M 50 10 L 90 90 L 10 90 Z" fill="currentColor" />
      </motion.svg>
    </div>
  );
};

// --- AESTHETIC TOP-TO-BOTTOM PARTICLES (FOR STREAKS) ---
const TopToBottomParticles = () => {
  const [elements, setElements] = useState<{ id: number; x: number; delay: number; dur: number; type: number; color: string }[]>([]);
  useEffect(() => {
    const colors = ["#FFA6C9", "#A7F3D0", "#BAE6FD", "#FDE047", "#C4B5FD"];
    setElements(Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
      delay: Math.random() * 3,
      dur: Math.random() * 3.5 + 3.5,
      type: Math.floor(Math.random() * 3),
      color: colors[Math.floor(Math.random() * colors.length)]
    })));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10 opacity-75">
      {elements.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -60, x: p.x, opacity: 0, rotate: 0 }}
          animate={{ y: typeof window !== "undefined" ? window.innerHeight + 80 : 1100, x: p.x + (Math.random() * 80 - 40), opacity: [0, 1, 1, 0], rotate: 360 }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "linear", delay: p.delay }}
          className="absolute"
        >
          {p.type === 0 && <Star className="w-4 h-4 sm:w-6 sm:h-6" style={{ fill: p.color, color: "#18181b", strokeWidth: 2 }} />}
          {p.type === 1 && <Sparkles className="w-5 h-5 sm:w-7 sm:h-7" style={{ color: p.color }} />}
          {p.type === 2 && <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-zinc-900 shadow-[2px_2px_0px_0px_#18181b]" style={{ backgroundColor: p.color }} />}
        </motion.div>
      ))}
    </div>
  );
};

// --- MULTI-SHAPE INFINITE CONFETTI (GAME OVER) ---
const ConfettiBackground = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const colors = ["#FFA6C9", "#A7F3D0", "#BAE6FD", "#FDE047", "#C4B5FD", "#F43F5E", "#38BDF8"];
    setParticles(Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 4,
      dur: Math.random() * 3 + 4,
      shape: i % 5,
      color: colors[i % colors.length],
      size: Math.floor(Math.random() * 12) + 12,
      sway: Math.random() * 30 - 15,
      rotateDir: Math.random() > 0.5 ? 1 : -1
    })));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[60]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "-10vh", x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{
            y: "110vh",
            x: [`${p.x}vw`, `${p.x + p.sway / 10}vw`, `${p.x - p.sway / 10}vw`, `${p.x}vw`],
            rotate: 360 * p.rotateDir * 3
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
          className="absolute"
          style={{ width: p.size, height: p.size }}
        >
          {p.shape === 0 && <div className="w-full h-[65%] border-2 border-zinc-900 shadow-[2px_2px_0px_0px_#18181b]" style={{ backgroundColor: p.color }} />}
          {p.shape === 1 && <div className="w-full h-full rounded-full border-2 border-zinc-900 shadow-[2px_2px_0px_0px_#18181b]" style={{ backgroundColor: p.color }} />}
          {p.shape === 2 && <div className="w-full h-full border-2 border-zinc-900 shadow-[2px_2px_0px_0px_#18181b] rotate-45" style={{ backgroundColor: p.color }} />}
          {p.shape === 3 && (
            <svg viewBox="0 0 24 24" className="w-full h-full text-zinc-900 drop-shadow-[2px_2px_0px_#18181b]">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" fill={p.color} stroke="#18181b" strokeWidth="2" />
            </svg>
          )}
          {p.shape === 4 && (
            <div className="w-full h-full rounded-full border-[3px] sm:border-4 border-zinc-900 flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_#18181b]">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// --- STATIONARY HOST MASCOT ---
const GameMascot = ({ thought, gameState, lastScore, onPoke, skin }: { thought: string; gameState: string; lastScore: number; onPoke: () => void; skin: string }) => {
  const mascotControls = useAnimation();
  const getSkinEmoji = () => {
    const map: Record<string, string> = {
      clown: "🤡", cowboy: "🤠", halo: "😇", devil: "😈", chef: "👨‍🍳", crown: "👑", ninja: "🥷",
      tophat: "🎩", cat: "🐱", chains: "⛓️", sombrero: "👒", vr: "🥽", wizard: "🧙‍♂️", bandana: "🧣",
      monocle: "🧐", astronaut: "👩‍🚀", diver: "🤿", propeller: "🚁", party: "🥳", groucho: "🥸",
      flower: "🌸", viking: "🛡️", aviator: "🕶️", cyber: "🥽", bag: "🛍️", zombie: "🧟", mantle: "🧥", alien: "👽"
    };
    return map[skin] || "";
  };

  const handlePoke = () => {
    sfx.playPoke();
    mascotControls.start({ scaleY: [1, 0.6, 1.1, 1], transition: { duration: 0.4, ease: "easeInOut" } });
    onPoke();
  };

  return (
    <div className={`fixed sm:absolute left-2 sm:left-[5%] lg:left-[10%] bottom-3 sm:bottom-[50px] lg:bottom-[100px] flex flex-col items-center z-[50] sm:z-30 pointer-events-auto cursor-pointer scale-[0.65] sm:scale-100 origin-bottom-left ${gameState === "gameover" ? "hidden lg:flex" : "flex"}`} onClick={handlePoke}>
      <AnimatePresence mode="wait">
        {thought && (
          <motion.div
            key={thought}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="mb-4 sm:mb-8 bg-white border-[3px] sm:border-4 border-zinc-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-[4px_4px_0px_0px_#18181b] relative w-max max-w-[160px] sm:max-w-[250px] text-center pointer-events-none"
          >
            <p className="font-bold text-[11px] sm:text-sm text-zinc-900 leading-tight break-words whitespace-normal">{thought}</p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white border-b-[3px] sm:border-b-4 border-r-[3px] sm:border-r-4 border-zinc-900 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute -bottom-4 sm:-bottom-8 left-1/2 -translate-x-1/2 w-24 h-8 sm:w-40 sm:h-14 bg-[#A7F3D0] border-[3px] sm:border-4 border-zinc-900 rounded-t-lg sm:rounded-t-xl rounded-b-2xl sm:rounded-b-3xl shadow-[0px_4px_0px_0px_#18181b] sm:shadow-[0px_8px_0px_0px_#18181b] -z-10 flex flex-col items-center justify-start overflow-hidden pointer-events-none">
        <div className="w-full h-2 sm:h-4 border-b-[3px] sm:border-b-4 border-zinc-900 bg-white/40" />
      </div>
      <motion.div animate={mascotControls} className="relative">
        {skin !== "default" && <div className="absolute -top-6 sm:-top-10 left-1/2 -translate-x-1/2 text-3xl sm:text-5xl z-20 pointer-events-none drop-shadow-md">{getSkinEmoji()}</div>}
        <motion.svg viewBox="0 0 100 120" className="w-20 h-28 sm:w-32 sm:h-40 overflow-visible text-zinc-900 pointer-events-none">
          <motion.g animate={gameState === "revealing" ? { y: [0, -20, 0], transition: { duration: 0.4, ease: "easeInOut" } } : { y: [0, -3, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } }}>
            <path d="M 35 85 Q 25 110 30 115" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 65 85 Q 75 110 70 115" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
            <motion.path
              d="M 20 60 Q -10 50 10 30"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              animate={gameState === "revealing" && lastScore > 50 ? { rotate: [0, -30, 0, -20, 0] } : { rotate: [0, 5, 0] }}
              style={{ originX: "20px", originY: "60px" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <path d="M 80 60 Q 100 70 90 90" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 20 40 Q 50 10 80 40 L 85 70 Q 50 95 15 70 Z" fill="#F9A8D4" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
            <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ repeat: Infinity, duration: 5, times: [0, 0.9, 0.95, 1, 1] }} style={{ originY: "45px" }}>
              <circle cx="50" cy="45" r="14" fill="white" stroke="currentColor" strokeWidth="5" />
              <motion.circle cx="50" cy="45" r="5" fill="currentColor" animate={gameState === "revealing" && lastScore === 0 ? { scale: [1, 1.5, 1] } : {}} transition={{ duration: 0.3 }} />
            </motion.g>
            <motion.path d={gameState === "revealing" && lastScore === 0 ? "M 40 75 Q 50 65 60 75" : "M 40 70 Q 50 78 60 70"} stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
          </motion.g>
        </motion.svg>
      </motion.div>
    </div>
  );
};

// --- TYPEWRITER COMPONENT ---
const TypewriterText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{displayed}<span className="inline-block w-2 h-5 bg-zinc-900 ml-1 animate-pulse" /></span>;
};

// --- MAIN GAME ENGINE COMPONENT ---
export default function PlayGame() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState<string>("");
  const [gameState, setGameState] = useState<"loading" | "playing" | "revealing" | "gameover">("loading");
  
  const [totalScore, setTotalScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [mrUThought, setMrUThought] = useState("Let's see what you got.");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Heat & Wager
  const [streak, setStreak] = useState(0);
  const [isDoubleOrNothing, setIsDoubleOrNothing] = useState(false);
  
  // Vibe Settings
  const [vibe, setVibe] = useState("Normal");
  
  // Hint & Rank states
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState("");
  const [unlockedToast, setUnlockedToast] = useState<string | null>(null);
  const [endGameRank, setEndGameRank] = useState({ rank: "F", desc: "", color: "#FFA6C9" });
  
  // Rolling score spring
  const scoreSpring = useSpring(0, { bounce: 0, duration: 800 });
  const displayScore = useTransform(scoreSpring, Math.round);

  // Local storage state with Profile Preservation
  const [userData, setUserData] = useState({ 
    gamesPlayed: 0, 
    skins: ["default"], 
    achievements: [] as string[], 
    highestScore: 0, 
    seenQuestions: [] as string[],
    username: "",
    pfp: ""
  });
  const [equippedSkin, setEquippedSkin] = useState("default");

  const startTimeRef = useRef(Date.now());
  const hintCountRef = useRef(0);
  const isFirstRender = useRef(true);

  // LOAD LOGIC + FLAWLESS FISHER-YATES MEMORY RANDOMIZER
  useEffect(() => {
    let parsedData = { 
      gamesPlayed: 0, 
      skins: ["default"], 
      achievements: [] as string[], 
      highestScore: 0, 
      seenQuestions: [] as string[],
      username: "",
      pfp: ""
    };
    const saved = localStorage.getItem("mrU_data");
    
    if (saved) {
      parsedData = { ...parsedData, ...JSON.parse(saved) };
      if (!parsedData.seenQuestions) parsedData.seenQuestions = [];
      setUserData(parsedData);
      setEquippedSkin(parsedData.skins[parsedData.skins.length - 1] || "default");
    }

    const params = new URLSearchParams(window.location.search);
    const count = parseInt(params.get("q") || "10");
    const activeVibe = params.get("vibe") || "Normal";
    setVibe(activeVibe);

    // Filter unseen questions
    let availableQuestions = questionBank.filter(q => !parsedData.seenQuestions.includes(q.question));

    if (availableQuestions.length < count) {
      availableQuestions = [...questionBank];
      parsedData.seenQuestions = []; 
    }

    // Fisher-Yates Algorithm
    for (let i = availableQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableQuestions[i], availableQuestions[j]] = [availableQuestions[j], availableQuestions[i]];
    }

    const selectedQuestions = availableQuestions.slice(0, count);
    setQuestions(selectedQuestions);

    const newlySeen = selectedQuestions.map(q => q.question);
    const updatedData = { ...parsedData, seenQuestions: [...parsedData.seenQuestions, ...newlySeen] };
    localStorage.setItem("mrU_data", JSON.stringify(updatedData));
    setUserData(updatedData);

    setMrUThought("AAAAAAAAAAAaaa run!!!");
    setTimeout(() => {
      setGameState("playing");
      setMrUThought("Let's see what you got.");
      startTimeRef.current = Date.now();
    }, 800);
    
    const handleVis = () => { document.title = document.hidden ? "Hey! Come back here! 😡" : "HUH?"; };
    document.addEventListener("visibilitychange", handleVis);
    return () => document.removeEventListener("visibilitychange", handleVis);
  }, []);

  useEffect(() => { scoreSpring.set(totalScore); }, [totalScore, scoreSpring]);

  const currentQ = questions[currentIndex];
  const maxScore = questions.length * 100;

  // SAFE STATE ACHIEVEMENT UNLOCKER
  const unlockAchievement = (id: string, name: string) => {
    setUserData((prev) => {
      if (prev.achievements.includes(id)) return prev;
      sfx.playSuccess(); // TRIGGER ACHIEVEMENT SOUND
      setUnlockedToast(`🏆 Achievement Unlocked: ${name}`);
      setTimeout(() => setUnlockedToast(null), 4000);
      const updated = { ...prev, achievements: [...prev.achievements, id] };
      localStorage.setItem("mrU_data", JSON.stringify(updated));
      return updated;
    });
  };

  const handleHintClick = () => {
    sfx.playThud(); // TRIGGER SOUND
    const currentRoasts = getRoasts(vibe);
    setCurrentHint(currentRoasts[Math.floor(Math.random() * currentRoasts.length)]);
    setShowHint(true);
    hintCountRef.current += 1;
    if (hintCountRef.current >= 10) unlockAchievement("hint_spam", "Cowardice");
    setMrUThought("I literally have zero faith in you.");
  };

  const handleLockIn = (booleanOverride?: boolean) => {
    if (!currentQ) return;
    let finalGuess: string | number | boolean = guess;
    if (currentQ.type === "boolean" && booleanOverride !== undefined) finalGuess = booleanOverride;
    else if (!guess && currentQ.type !== "boolean") return;

    sfx.playThud(); // TRIGGER LOCK IN SOUND

    const timeTaken = (Date.now() - startTimeRef.current) / 1000;
    if (timeTaken < 2) unlockAchievement("fast_click", "Speedrunner");
    if (timeTaken > 30) unlockAchievement("slow_click", "Snail Paced");

    let earned = calculateScore(currentQ, finalGuess);

    // Combo Heat Multiplier
    if (streak >= 3 && earned > 0) earned = Math.round(earned * 1.5);

    // Double or Nothing Resolution
    if (isDoubleOrNothing) {
      if (earned >= 100) {
        earned = totalScore;
        unlockAchievement("double_win", "Gambling Addict");
      } else {
        earned = -totalScore;
        unlockAchievement("double_lose", "Bankrupt");
      }
    }

    if (earned >= 100) {
      sfx.playSuccess(); // TRIGGER CORRECT SOUND
      setStreak((s) => s + 1);
    } else {
      sfx.playFail(); // TRIGGER WRONG SOUND
      setStreak(0);
    }

    if (earned === 0 && !isDoubleOrNothing) unlockAchievement("score_0", "Touch Grass");
    
    setLastScore(earned);
    setTotalScore((prev) => prev + earned);
    
    const judgments = getJudgment(earned);
    setMrUThought(judgments[Math.floor(Math.random() * judgments.length)]);
    setGameState("revealing");
  };

  const handleNext = () => {
    sfx.playPop(); // TRIGGER NEXT SOUND
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setGuess("");
      setShowHint(false);
      setIsDoubleOrNothing(false);
      setGameState("playing");
      setMrUThought(streak >= 3 ? "Okay, you're on fire. Don't ruin it." : "Don't mess this one up.");
      startTimeRef.current = Date.now();
    } else {
      endGame(totalScore);
    }
  };

  const endGame = (finalScore: number) => {
    setGameState("gameover");
    const insults = getInsults(vibe);
    const desc = insults[Math.floor(Math.random() * insults.length)];
    const percentage = Math.round((finalScore / maxScore) * 100);
    
    let r = "F"; let col = "#FFA6C9";
    if (percentage >= 90) { r = "S"; col = "#FDE047"; } 
    else if (percentage >= 75) { r = "A"; col = "#A7F3D0"; } 
    else if (percentage >= 50) { r = "B"; col = "#BAE6FD"; } 
    else if (percentage >= 25) { r = "C"; col = "#C4B5FD"; }
    
    setEndGameRank({ rank: r, desc, color: col });
    
    const gameOverThoughts = [
      "I survived.", "Finally, it's over.", "I need a nap.", "Never do that again.", "I'm calling my therapist.",
      "My eyes are bleeding.", "Please don't click 'Play Again'.", "I'm clocking out.", "I am physically exhausted."
    ];
    setMrUThought(gameOverThoughts[Math.floor(Math.random() * gameOverThoughts.length)]);
    
    setUserData((prev) => {
      const newGamesPlayed = prev.gamesPlayed + 1;
      let newHighest = prev.highestScore;
      if (finalScore > newHighest) newHighest = finalScore;

      let newSkins = [...prev.skins];
      const availableSkins = SKINS.filter((s) => !newSkins.includes(s));
      if (availableSkins.length > 0 && Math.random() > 0.5) {
        newSkins.push(availableSkins[Math.floor(Math.random() * availableSkins.length)]);
        setTimeout(() => setUnlockedToast("👕 New Skin Unlocked in Wardrobe!"), 1500);
        setTimeout(() => setUnlockedToast(null), 5500);
      }

      const updated = { ...prev, gamesPlayed: newGamesPlayed, highestScore: newHighest, skins: newSkins };
      localStorage.setItem("mrU_data", JSON.stringify(updated));
      return updated;
    });

    unlockAchievement("played_1", "Fresh Meat");
    if (userData.gamesPlayed + 1 >= 10) unlockAchievement("played_10", "No Life");
    if (finalScore === maxScore) unlockAchievement("score_100", "Nerd Emoji");
  };

  // --- NEO-BRUTALIST CANVAS GENERATOR WITH PROFILE EMBEDDED ---
  const handleShare = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080; 
    canvas.height = 640;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderCard = (pfpImage?: HTMLImageElement) => {
      // 1. Background
      ctx.fillStyle = "#f4f0ea"; 
      ctx.fillRect(0, 0, 1080, 640);
      
      // 2. Brutalist Grid Background
      ctx.strokeStyle = "rgba(0,0,0,0.05)";
      ctx.lineWidth = 2;
      for(let i=0; i<1080; i+=40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 640); ctx.stroke(); }
      for(let i=0; i<640; i+=40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(1080, i); ctx.stroke(); }

      // 3. Main Card Hard Shadow
      ctx.fillStyle = "#18181b"; 
      ctx.beginPath(); 
      ctx.roundRect(84 + 16, 70 + 16, 912, 500, 36); 
      ctx.fill();

      // 4. Main Card Body
      ctx.fillStyle = "#ffffff"; 
      ctx.beginPath(); 
      ctx.roundRect(84, 70, 912, 500, 36); 
      ctx.fill();
      ctx.strokeStyle = "#18181b"; 
      ctx.lineWidth = 8; 
      ctx.stroke();

      // 5. Pink Header Bar
      ctx.fillStyle = "#FFA6C9";
      ctx.beginPath();
      ctx.roundRect(84, 70, 912, 80, [36, 36, 0, 0]);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(84, 150);
      ctx.lineTo(996, 150);
      ctx.stroke();

      // 6. Title on Header
      ctx.fillStyle = "#18181b"; 
      ctx.textAlign = "left";
      ctx.font = "900 48px sans-serif"; 
      ctx.fillText("HUH?", 120, 125);

      // 7. Embedded Profile Badge
      if (pfpImage && userData.username) {
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.roundRect(640, 94, 320, 56, 28);
        ctx.fill();
        ctx.strokeStyle = "#18181b";
        ctx.lineWidth = 4;
        ctx.stroke();

        // Clip and draw PFP
        ctx.save();
        ctx.beginPath();
        ctx.arc(668, 122, 20, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(pfpImage, 648, 102, 40, 40);
        ctx.restore();
        
        // PFP Border
        ctx.beginPath();
        ctx.arc(668, 122, 20, 0, Math.PI * 2);
        ctx.strokeStyle = "#18181b";
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.fillStyle = "#18181b";
        ctx.font = "900 24px sans-serif";
        ctx.fillText(userData.username.slice(0, 15), 700, 130);
      }

      // 8. Score Text
      ctx.fillStyle = "#18181b";
      ctx.font = "900 36px sans-serif"; 
      ctx.fillText("FINAL SCORE", 130, 240);

      // Score Highlight Box
      ctx.fillStyle = "#A7F3D0";
      ctx.beginPath();
      ctx.roundRect(130, 260, 360, 90, 16);
      ctx.fill();
      ctx.strokeStyle = "#18181b";
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.fillStyle = "#18181b";
      ctx.font = "900 64px sans-serif"; 
      ctx.fillText(`${totalScore} / ${maxScore}`, 155, 325);

      // 9. Rank Badge
      ctx.fillStyle = "#18181b"; 
      ctx.beginPath(); 
      ctx.roundRect(750 + 12, 220 + 12, 170, 170, 32); 
      ctx.fill();
      
      ctx.fillStyle = endGameRank.color; 
      ctx.beginPath(); 
      ctx.roundRect(750, 220, 170, 170, 32); 
      ctx.fill(); 
      ctx.stroke();
      
      ctx.fillStyle = "#18181b"; 
      ctx.textAlign = "center"; 
      ctx.font = "900 20px sans-serif"; 
      ctx.fillText("RANK", 835, 260);
      ctx.font = "900 100px sans-serif"; 
      ctx.fillText(endGameRank.rank, 835, 345);

      // 10. Roast Text Wrapping
      ctx.textAlign = "left"; 
      ctx.font = "bold 32px sans-serif"; 
      ctx.fillStyle = "#52525b";
      const quote = `Mr. U says: "${endGameRank.desc}"`;
      const words = quote.split(" ");
      let line = ""; 
      let y = 430;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        if (ctx.measureText(testLine).width > 700 && i > 0) {
          ctx.fillText(line, 130, y); 
          line = words[i] + " "; 
          y += 42;
        } else { 
          line = testLine; 
        }
      }
      ctx.fillText(line, 130, y);

      // 11. Watermark Footer
      ctx.font = "bold 24px sans-serif"; 
      ctx.fillStyle = "#a1a1aa";
      ctx.fillText("https://huh.eyrae.in • Beat my score!", 130, 540);

      const link = document.createElement("a");
      link.download = `HUH_${userData.username || "ScoreCard"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      setUnlockedToast("🖼️ Aesthetic Score Card Downloaded!");
      setTimeout(() => setUnlockedToast(null), 3000);
    };

    if (userData.pfp) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => renderCard(img);
      img.onerror = () => renderCard();
      img.src = userData.pfp;
    } else {
      renderCard();
    }
  };

  if (gameState === "loading") {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-[#f4f0ea]">
        <motion.div initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} className="fixed inset-0 bg-[#BAE6FD] z-50 origin-bottom flex items-center justify-center">
          <h1 className="text-4xl sm:text-6xl font-black text-zinc-900">LOADING...</h1>
        </motion.div>
      </div>
    );
  }

  const cardBg = cardColors[currentIndex % cardColors.length];
  const pageBg = pageBackgrounds[currentIndex % pageBackgrounds.length];

  return (
    <motion.main 
      animate={{ backgroundColor: gameState === "gameover" ? "#f4f0ea" : pageBg }}
      transition={{ duration: 0.8 }}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      className="min-h-[100dvh] text-zinc-900 flex flex-col items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6 selection:bg-zinc-900 selection:text-[#f4f0ea] overflow-x-hidden relative"
    >
      {isFirstRender.current && (
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => { isFirstRender.current = false; }}
          className="absolute inset-0 bg-[#BAE6FD] z-50 origin-bottom"
        />
      )}

      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "30px 30px" }}></div>
      {gameState !== "gameover" && <FloatingShapes currentIndex={currentIndex} mouseX={mousePos.x} mouseY={mousePos.y} />}
      {gameState === "gameover" && <ConfettiBackground />}
      
      {/* Top-to-Bottom Streak Particles */}
      <AnimatePresence>
        {streak >= 3 && gameState !== "gameover" && <TopToBottomParticles />}
      </AnimatePresence>

      {/* Achievement Toast */}
      <AnimatePresence>
        {unlockedToast && (
          <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -100, opacity: 0 }} className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-50 bg-[#FDE047] border-[3px] sm:border-4 border-zinc-900 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl shadow-[4px_4px_0px_0px_#18181b] sm:shadow-[6px_6px_0px_0px_#18181b] flex items-center gap-2 sm:gap-3 w-[90%] max-w-sm sm:max-w-max">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 fill-zinc-900 shrink-0" />
            <span className="font-black text-sm sm:text-lg break-words w-full">{unlockedToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top HUD Header */}
      <div className="fixed top-0 left-0 w-full p-4 sm:p-6 flex justify-between items-center z-40 pointer-events-auto bg-[#f4f0ea]/80 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none">
        <Link href="/">
          <motion.button
            onClick={() => { sfx.playPop(); if (gameState !== "gameover") unlockAchievement("rage_quit", "Table Flipper"); }}
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white border-[3px] sm:border-4 border-zinc-900 p-1.5 sm:p-2 rounded-xl shadow-[4px_4px_0px_0px_#18181b] hover:bg-[#FFA6C9] transition-colors relative group overflow-hidden"
          >
            <X className="w-5 h-5 sm:w-6 h-6 stroke-[3] relative z-10" />
          </motion.button>
        </Link>
        <div className="bg-white border-[3px] sm:border-4 border-zinc-900 px-4 sm:px-6 py-1.5 sm:py-2 rounded-xl shadow-[4px_4px_0px_0px_#18181b] font-black text-sm sm:text-xl flex items-center gap-1.5 sm:gap-2">
          {streak >= 3 ? (
            <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}>
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 fill-orange-500" />
            </motion.div>
          ) : (
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#FDE047] fill-[#FDE047]" />
          )}
          SCORE: <motion.span>{displayScore}</motion.span>
        </div>
      </div>

      {/* PERMANENT GAME MASCOT */}
      <GameMascot
        thought={mrUThought}
        gameState={gameState}
        lastScore={lastScore}
        skin={equippedSkin}
        onPoke={() => {
          setMrUThought(pokeQuotes[Math.floor(Math.random() * pokeQuotes.length)]);
          unlockAchievement("poke_10", "Harassment");
        }}
      />

      {/* GAME OVER SCREEN */}
      {gameState === "gameover" && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center z-30 w-full px-4 pt-20 sm:pt-0 pb-32 sm:pb-0">
          <motion.h1 initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 sm:mb-12 tracking-tighter text-center uppercase">
            {endGameRank.rank === "F" ? "Game Over." : "You Survived."}
          </motion.h1>
          
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center justify-center w-full max-w-4xl mb-8 sm:mb-12 relative">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="absolute -top-12 -left-12 opacity-20 pointer-events-none hidden sm:block">
              <Sparkles className="w-32 h-32 text-zinc-900" />
            </motion.div>

            {/* Rank Badge with Stamp Animation */}
            <div className="relative">
              <motion.div
                initial={{ scale: 4, opacity: 0, rotate: 20 }}
                animate={{ scale: 1, opacity: 1, rotate: -4 }}
                transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.3 }}
                className="w-32 h-32 sm:w-48 sm:h-48 rounded-2xl sm:rounded-3xl border-4 sm:border-8 border-zinc-900 shadow-[8px_8px_0px_0px_#18181b] sm:shadow-[12px_12px_0px_0px_#18181b] flex items-center justify-center flex-col shrink-0 relative z-30"
                style={{ backgroundColor: endGameRank.color }}
              >
                <span className="text-zinc-800 font-bold tracking-widest uppercase text-[10px] sm:text-sm mb-[-5px] sm:mb-[-10px]">Rank</span>
                <span className="text-6xl sm:text-8xl font-black text-zinc-900" style={{ textShadow: "3px 3px 0px white" }}>{endGameRank.rank}</span>
              </motion.div>
              <motion.div initial={{ scale: 0, opacity: 1 }} animate={{ scale: 2, opacity: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="absolute inset-0 bg-zinc-900 rounded-2xl sm:rounded-3xl z-20 pointer-events-none" />
            </div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex flex-col items-center md:items-start text-center md:text-left gap-4 w-full max-w-md relative z-20">
              <div className="bg-white border-[3px] sm:border-4 border-zinc-900 px-5 sm:px-8 py-4 sm:py-6 rounded-2xl sm:rounded-3xl shadow-[4px_4px_0px_0px_#18181b] sm:shadow-[8px_8px_0px_0px_#18181b] w-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#18181b_10px,#18181b_20px)] opacity-5 pointer-events-none translate-x-2 -translate-y-2 sm:translate-x-4 sm:-translate-y-4 rounded-bl-full" />
                <p className="text-zinc-500 font-bold mb-1 uppercase tracking-widest text-[10px] sm:text-sm relative z-10">Final Score</p>
                <p className="text-4xl sm:text-6xl font-black relative z-10">{totalScore} <span className="text-xl sm:text-3xl text-zinc-400">/ {maxScore}</span></p>
                <div className="w-full bg-zinc-200 h-3 sm:h-4 rounded-full overflow-hidden border-2 border-zinc-900 mt-3 sm:mt-4 relative z-10">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(totalScore / maxScore) * 100}%` }} transition={{ duration: 1.5, ease: "easeOut", type: "spring", bounce: 0.4, delay: 0.8 }} className="absolute top-0 left-0 h-full bg-zinc-900" />
                </div>
              </div>

              <div className="bg-white/80 border-[3px] sm:border-4 border-zinc-900 px-5 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl w-full backdrop-blur-sm shadow-[4px_4px_0px_0px_#18181b]">
                <h3 className="font-black text-xl sm:text-2xl mb-1">{endGameRank.rank === "S" ? "Spitballing Champion" : endGameRank.rank === "A" ? "Big Brain" : endGameRank.rank === "B" ? "Painfully Average" : endGameRank.rank === "C" ? "Skill Issue" : "Brain 404"}</h3>
                <p className="text-sm sm:text-base text-zinc-700 font-bold leading-tight break-words"><TypewriterText text={endGameRank.desc} /></p>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-[90%] sm:w-full max-w-md relative z-40">
            <Link href="/" className="flex-1">
              <motion.button onClick={() => sfx.playPop()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95, boxShadow: "0px 0px 0px 0px #18181b", x: 4, y: 4 }} className="flex justify-center items-center gap-2 sm:gap-3 bg-[#BAE6FD] border-[3px] sm:border-4 border-zinc-900 px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl shadow-[4px_4px_0px_0px_#18181b] sm:shadow-[6px_6px_0px_0px_#18181b] transition-all relative z-20 group w-full">
                <RotateCcw className="w-6 h-6 sm:w-8 sm:h-8 stroke-[3] group-hover:-rotate-90 transition-transform" /> Home
              </motion.button>
            </Link>
            <motion.button onClick={() => { sfx.playPop(); handleShare(); }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95, boxShadow: "0px 0px 0px 0px #18181b", x: 4, y: 4 }} className="flex-1 flex justify-center items-center gap-2 sm:gap-3 bg-[#FDE047] border-[3px] sm:border-4 border-zinc-900 px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl shadow-[4px_4px_0px_0px_#18181b] sm:shadow-[6px_6px_0px_0px_#18181b] transition-all relative z-20 group w-full">
              <Share2 className="w-6 h-6 sm:w-8 sm:h-8 stroke-[3] group-hover:scale-110 transition-transform" /> Share Card
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* --- MAIN GAMEPLAY LOOP --- */}
      {gameState !== "gameover" && currentQ && (
        <div className="w-[95%] sm:w-full max-w-2xl z-20 flex flex-col relative mt-24 sm:mt-28 mb-32 sm:mb-0">
          
          <div className="flex justify-between items-center mb-2 sm:mb-4 px-2 font-bold text-zinc-500 uppercase tracking-widest text-[10px] sm:text-sm drop-shadow-md">
            <span>Question {currentIndex + 1}</span>
            <span>{questions.length - (currentIndex + 1)} Remaining</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex + gameState}
              initial={{ opacity: 0, x: 50, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -50, rotate: -2 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
              className={`border-[3px] sm:border-4 border-zinc-900 rounded-2xl sm:rounded-3xl overflow-hidden relative ${streak >= 3 ? "shadow-[0px_0px_30px_5px_rgba(253,224,71,0.6)] sm:shadow-[0px_0px_40px_5px_rgba(253,224,71,0.6)]" : "shadow-[8px_8px_0px_0px_#18181b] sm:shadow-[12px_12px_0px_0px_#18181b]"} transition-shadow duration-300`}
              style={{ backgroundColor: cardBg }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none z-0">
                {currentQ.type === "number" && <Hash className="w-40 h-40 sm:w-64 sm:h-64 text-zinc-900" />}
                {currentQ.type === "text" && <Type className="w-40 h-40 sm:w-64 sm:h-64 text-zinc-900" />}
                {currentQ.type === "boolean" && <ToggleLeft className="w-40 h-40 sm:w-64 sm:h-64 text-zinc-900" />}
              </div>

              <div className="p-5 sm:p-8 md:p-12 relative z-10 flex flex-col gap-4 sm:gap-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight break-words">{currentQ.question}</h2>

                {gameState === "playing" && (
                  <div className="flex flex-col gap-4 sm:gap-6">
                    {currentQ.type === "boolean" ? (
                      <div className="flex gap-3 sm:gap-4 relative z-40">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} onClick={() => handleLockIn(true)} className="flex-1 bg-white border-[3px] sm:border-4 border-zinc-900 py-4 sm:py-6 rounded-xl sm:rounded-2xl font-black text-2xl sm:text-3xl shadow-[4px_4px_0px_0px_#18181b] hover:bg-[#A7F3D0] transition-colors">YES</motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} onClick={() => handleLockIn(false)} className="flex-1 bg-white border-[3px] sm:border-4 border-zinc-900 py-4 sm:py-6 rounded-xl sm:rounded-2xl font-black text-2xl sm:text-3xl shadow-[4px_4px_0px_0px_#18181b] hover:bg-[#FFA6C9] transition-colors">NO</motion.button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3 sm:gap-4 relative z-40">
                        <div className="relative">
                          <input 
                            type={currentQ.type === "number" ? "number" : "text"}
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && guess && handleLockIn()}
                            placeholder="Type your guess..."
                            className="w-full bg-white border-[3px] sm:border-4 border-zinc-900 pl-4 sm:pl-6 pr-20 sm:pr-28 py-4 sm:py-6 rounded-xl sm:rounded-2xl font-black text-xl sm:text-2xl shadow-[4px_4px_0px_0px_#18181b] outline-none focus:translate-y-1 focus:translate-x-1 focus:shadow-[0px_0px_0px_0px_#18181b] transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none caret-zinc-900"
                            style={{ caretColor: "black" }}
                            autoFocus
                          />
                          {currentQ.unit && <span className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 font-bold text-zinc-400 text-base sm:text-xl pointer-events-none text-right truncate max-w-[80px] sm:max-w-[100px]">{currentQ.unit}</span>}
                        </div>
                        
                        {/* WAGER ONLY VISIBLE IF ON LAST QUESTION AND SCORE > 0 */}
                        {currentIndex === questions.length - 1 && totalScore > 0 && (
                          <div className="flex items-center gap-2 sm:gap-3 bg-[#FDE047] border-[3px] sm:border-4 border-zinc-900 p-3 sm:p-4 rounded-xl shadow-[4px_4px_0px_0px_#18181b]">
                            <input type="checkbox" id="wager" checked={isDoubleOrNothing} onChange={(e) => { sfx.playPop(); setIsDoubleOrNothing(e.target.checked); }} className="w-5 h-5 sm:w-6 sm:h-6 accent-zinc-900 cursor-pointer shrink-0" />
                            <label htmlFor="wager" className="font-black text-[11px] sm:text-lg uppercase cursor-pointer leading-tight">Wager All Points (Double or Nothing)</label>
                          </div>
                        )}

                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleLockIn()}
                          disabled={!guess}
                          className="w-full bg-zinc-900 text-white border-[3px] sm:border-4 border-zinc-900 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xl sm:text-2xl shadow-[4px_4px_0px_0px_#18181b] disabled:opacity-50 disabled:cursor-not-allowed hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
                        >
                          Lock In
                        </motion.button>
                      </div>
                    )}

                    <div className="mt-1 sm:mt-2 pt-4 sm:pt-6 border-t-[3px] sm:border-t-4 border-zinc-900/10 relative z-40">
                      {!showHint ? (
                        <motion.button 
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleHintClick}
                          className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-[repeating-linear-gradient(45deg,#f4f4f5,#f4f4f5_10px,#e4e4e7_10px,#e4e4e7_20px)] border-[3px] sm:border-4 border-zinc-900 py-3 sm:py-4 rounded-xl font-black text-zinc-600 uppercase tracking-widest text-sm sm:text-base shadow-[4px_4px_0px_0px_#18181b] hover:text-zinc-900 hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all group"
                        >
                          <motion.div animate={{ rotate: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 1.5 }}><Flag className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" /></motion.div> I GIVE UP 
                        </motion.button>
                      ) : (
                        <motion.div initial={{ opacity: 0, height: 0, rotate: -2 }} animate={{ opacity: 1, height: "auto", rotate: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="bg-[#FFA6C9] border-[3px] sm:border-4 border-zinc-900 p-4 sm:p-5 rounded-xl shadow-[4px_4px_0px_0px_#18181b] transform -rotate-1 relative overflow-hidden">
                          <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)] pointer-events-none" />
                          <p className="font-bold text-zinc-900 uppercase text-[10px] sm:text-xs tracking-widest mb-1 opacity-70 relative z-10">Helpful Hint</p>
                          <p className="font-black text-lg sm:text-xl leading-tight relative z-10 break-words"><TypewriterText text={currentHint} /></p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {gameState === "revealing" && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 sm:gap-6 relative z-40">
                    <motion.div animate={lastScore === 0 ? { x: [-10, 10, -10, 10, 0] } : {}} className="bg-white border-[3px] sm:border-4 border-zinc-900 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-[4px_4px_0px_0px_#18181b]">
                      <div className="flex justify-between items-end mb-2">
                        <p className="font-bold text-zinc-500 uppercase tracking-widest text-xs sm:text-sm">Points Earned</p>
                        <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.6 }} className={`text-4xl sm:text-6xl font-black ${lastScore > 0 ? "text-green-500" : "text-red-500"}`}>
                          {lastScore > 0 ? "+" : ""}{lastScore}
                        </motion.p>
                      </div>
                      <div className="w-full bg-zinc-200 h-3 sm:h-4 rounded-full overflow-hidden border-2 border-zinc-900 relative">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${Math.max(0, lastScore)}%` }} transition={{ duration: 1, ease: "easeOut", type: "spring", bounce: 0.5 }} className="absolute top-0 left-0 h-full bg-zinc-900" />
                      </div>
                    </motion.div>

                    <div className="bg-white/50 border-[3px] sm:border-4 border-zinc-900 p-4 sm:p-6 rounded-xl sm:rounded-2xl">
                      <p className="font-bold text-zinc-600 mb-1 uppercase text-[10px] sm:text-sm tracking-widest">The Truth</p>
                      <p className="text-base sm:text-xl font-bold leading-relaxed break-words">{currentQ.fact}</p>
                    </div>

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} onClick={handleNext} className="flex justify-center items-center gap-2 w-full bg-zinc-900 text-white border-[3px] sm:border-4 border-zinc-900 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl shadow-[4px_4px_0px_0px_#18181b] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all group">
                      {currentIndex + 1 < questions.length ? "Next Question" : "See Results"} <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3] group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </motion.main>
  );
}