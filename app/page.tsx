"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, X, Trophy, Shirt, Star, Menu, Upload, Check } from "lucide-react";
import Link from "next/link";

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

// --- COMPACT DATA LISTS (SKINS & ACHIEVEMENTS) ---
export const SKINS = [
  { id: "default", icon: "", name: "Naked" }, { id: "clown", icon: "🤡", name: "Clown Wig" }, { id: "cowboy", icon: "🤠", name: "Yeehaw Hat" },
  { id: "halo", icon: "😇", name: "Innocent" }, { id: "devil", icon: "😈", name: "Menace" }, { id: "chef", icon: "👨‍🍳", name: "Let Him Cook" },
  { id: "crown", icon: "👑", name: "Kingpin" }, { id: "pirate", icon: "🏴‍☠️", name: "Pirate Patch" }, { id: "ninja", icon: "🥷", name: "Ninja Mask" },
  { id: "tophat", icon: "🎩", name: "Classy" }, { id: "cat", icon: "🐱", name: "Cat Ears" }, { id: "chains", icon: "⛓️", name: "Dripped Out" },
  { id: "sombrero", icon: "👒", name: "Sombrero" }, { id: "vr", icon: "🥽", name: "Brainrotted" }, { id: "wizard", icon: "🧙‍♂️", name: "Wizard" },
  { id: "bandana", icon: "🧣", name: "Thug Life" }, { id: "monocle", icon: "🧐", name: "Monocle" }, { id: "astronaut", icon: "👩‍🚀", name: "Spaced Out" },
  { id: "diver", icon: "🤿", name: "Deep Diver" }, { id: "propeller", icon: "🚁", name: "GooGoo GaGa" }, { id: "party", icon: "🥳", name: "Birthday Boy" },
  { id: "groucho", icon: "🥸", name: "Incognito" }, { id: "flower", icon: "🌸", name: "Flower Child" }, { id: "viking", icon: "🛡️", name: "Viking" },
  { id: "aviator", icon: "🕶️", name: "Maverick" }, { id: "cyber", icon: "🥽", name: "Cyberpunk" }, { id: "bag", icon: "🛍️", name: "Paper Bag" },
  { id: "zombie", icon: "🧟", name: "Undead" }, { id: "mantle", icon: "🧥", name: "Royal Mantle" }, { id: "alien", icon: "👽", name: "Area 51" }
];

export const ACHIEVEMENTS = [
  { id: "played_1", icon: "🎮", name: "Fresh Meat", desc: "Played your first game." }, { id: "played_10", icon: "🧟", name: "No Life", desc: "Played 10 games." },
  { id: "score_100", icon: "🤓", name: "Nerd Emoji", desc: "Got a perfect 100% score." }, { id: "score_0", icon: "🌱", name: "Touch Grass", desc: "Scored an absolute zero." },
  { id: "poke_10", icon: "👉", name: "Harassment", desc: "Poked Mr. U 10 times." }, { id: "hint_spam", icon: "🏳️", name: "Cowardice", desc: "Used the 'I Give Up' button 10 times." },
  { id: "double_win", icon: "🎰", name: "Gambling Addict", desc: "Won a Double or Nothing." }, { id: "double_lose", icon: "💸", name: "Bankrupt", desc: "Lost a Double or Nothing." },
  { id: "sweaty", icon: "💦", name: "Sweatband", desc: "Played a custom round with 'Sweaty' vibe." }, { id: "endless", icon: "💀", name: "Masochist", desc: "Tried to play 500 questions." },
  { id: "combo_3", icon: "🔥", name: "On Fire", desc: "Got 3 questions right in a row." }, { id: "combo_5", icon: "☄️", name: "Unstoppable", desc: "Got 5 questions right in a row." },
  { id: "fast_click", icon: "⚡", name: "Speedrunner", desc: "Answered in under 2 seconds." }, { id: "slow_click", icon: "🐌", name: "Snail Paced", desc: "Took over 30 seconds to answer." },
  { id: "close_call", icon: "🤏", name: "By a Hair", desc: "Got a score of 98 or 99 on math." }, { id: "way_off", icon: "🔭", name: "Different Planet", desc: "Got a score of 1 on math." },
  { id: "skins_5", icon: "👗", name: "Fashionista", desc: "Unlocked 5 skins." }, { id: "skins_15", icon: "🛍️", name: "Shopaholic", desc: "Unlocked 15 skins." },
  { id: "tab_switch", icon: "👀", name: "Caught Lacking", desc: "Switched tabs during a game." }, { id: "rage_quit", icon: "🙃", name: "Table Flipper", desc: "Clicked the Rage Quit button." },
  { id: "multiplayer_try", icon: "🤡", name: "Lonely", desc: "Tried to click the locked Multiplayer." }, { id: "perfect_custom", icon: "🎯", name: "Aimbot", desc: "Perfect score on Custom mode." },
  { id: "all_wrong", icon: "🗑️", name: "Literally Trash", desc: "Got 0 points on a 10+ question game." }, { id: "lucky_guess", icon: "🍀", name: "Blind Luck", desc: "Nailed a boolean question instantly." },
  { id: "math_genius", icon: "🧮", name: "Calculator", desc: "3 perfect math answers in one game." }, { id: "spelling_bee", icon: "🐝", name: "Spelling Bee", desc: "3 perfect text answers in one game." },
  { id: "overthinker", icon: "🤔", name: "Overthinker", desc: "Changed your typed answer 5 times before locking in." }, { id: "first_skin", icon: "👕", name: "Dressed Up", desc: "Equipped your first skin." },
  { id: "rule_reader", icon: "📜", name: "Law Abiding", desc: "Actually read the rules." }, { id: "terms_reader", icon: "⚖️", name: "Fine Print", desc: "Read the T&C." }
];

// --- DEFAULT AESTHETIC PFPS (BASE64 SVGS) ---
const DEFAULT_PFPS = [
  `data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%23FFA6C9"/><circle cx="50" cy="50" r="30" fill="white" stroke="%2318181b" stroke-width="8"/><circle cx="40" cy="45" r="5" fill="%2318181b"/><circle cx="60" cy="45" r="5" fill="%2318181b"/><path d="M40 60 Q50 70 60 60" stroke="%2318181b" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`,
  `data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%23A7F3D0"/><rect x="20" y="20" width="60" height="60" rx="10" fill="white" stroke="%2318181b" stroke-width="8"/><line x1="35" y1="45" x2="45" y2="45" stroke="%2318181b" stroke-width="6" stroke-linecap="round"/><line x1="55" y1="45" x2="65" y2="45" stroke="%2318181b" stroke-width="6" stroke-linecap="round"/><path d="M45 65 L55 65" stroke="%2318181b" stroke-width="6" stroke-linecap="round"/></svg>`,
  `data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%23FDE047"/><polygon points="50,15 85,80 15,80" fill="white" stroke="%2318181b" stroke-width="8" stroke-linejoin="round"/><circle cx="40" cy="60" r="4" fill="%2318181b"/><circle cx="60" cy="60" r="4" fill="%2318181b"/><path d="M45 45 L55 45" stroke="%2318181b" stroke-width="5" stroke-linecap="round"/></svg>`,
  `data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%23BAE6FD"/><path d="M50 20 L60 40 L80 40 L65 55 L70 75 L50 65 L30 75 L35 55 L20 40 L40 40 Z" fill="white" stroke="%2318181b" stroke-width="6" stroke-linejoin="round"/><circle cx="42" cy="50" r="4" fill="%2318181b"/><circle cx="58" cy="50" r="4" fill="%2318181b"/></svg>`
];

// --- INTERACTIVE BACKGROUND GEOMETRY ---
const FloatingAesthetics = ({ mouseX, mouseY }: { mouseX: number, mouseY: number }) => {
  const calcDodge = (x: number, y: number, strength: number) => {
    if (typeof window === "undefined") return { x: 0, y: 0 };
    const dx = mouseX - x * window.innerWidth;
    const dy = mouseY - y * window.innerHeight;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 300) return { x: 0, y: 0 }; 
    const angle = Math.atan2(dy, dx);
    const force = (300 - dist) * strength;
    return { x: -Math.cos(angle) * force, y: -Math.sin(angle) * force };
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.svg className="absolute w-5 h-5 sm:w-6 sm:h-6 text-[#FFA6C9]" style={{ top: '25%', left: '15%' }} viewBox="0 0 24 24" animate={{ x: calcDodge(0.15, 0.25, 0.2).x, y: calcDodge(0.15, 0.25, 0.2).y, rotate: [0, 90, 180] }} transition={{ rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" }, default: { type: "spring", bounce: 0.5 } }}>
        <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" fill="currentColor" stroke="black" strokeWidth="2" strokeLinejoin="round" />
      </motion.svg>
      <motion.svg className="absolute w-6 h-6 sm:w-8 sm:h-8 text-[#FDE047]" style={{ top: '15%', right: '20%' }} viewBox="0 0 24 24" animate={{ x: calcDodge(0.8, 0.15, 0.3).x, y: calcDodge(0.8, 0.15, 0.3).y, rotate: [0, -90, -180] }} transition={{ rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" }, default: { type: "spring", bounce: 0.5 } }}>
        <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" fill="currentColor" stroke="black" strokeWidth="2" strokeLinejoin="round" />
      </motion.svg>
      <motion.svg className="absolute w-4 h-4 sm:w-5 sm:h-5 text-[#BAE6FD]" style={{ bottom: '40%', right: '15%' }} viewBox="0 0 24 24" animate={{ x: calcDodge(0.85, 0.6, 0.2).x, y: calcDodge(0.85, 0.6, 0.2).y, scale: [1, 1.5, 1], rotate: 180 }} transition={{ scale: { repeat: Infinity, duration: 3, ease: "easeInOut" }, default: { type: "spring", bounce: 0.5 } }}>
        <path d="M12 2V22M2 12H22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </motion.svg>
      <motion.svg className="absolute w-5 h-5 sm:w-7 sm:h-7 text-[#A7F3D0]" style={{ bottom: '30%', left: '10%' }} viewBox="0 0 24 24" animate={{ x: calcDodge(0.1, 0.7, 0.3).x, y: calcDodge(0.1, 0.7, 0.3).y, scale: [1, 0.8, 1], rotate: -90 }} transition={{ scale: { repeat: Infinity, duration: 4.5, ease: "easeInOut" }, default: { type: "spring", bounce: 0.5 } }}>
        <circle cx="12" cy="12" r="10" fill="currentColor" stroke="black" strokeWidth="2" />
      </motion.svg>
    </div>
  );
};

// --- STATIC CUSTOM LOGO ---
const HeaderLogo = () => (
  <Link href="/">
    <div 
      onClick={() => sfx.playPop()}
      className="relative w-12 h-12 sm:w-14 sm:h-14 cursor-pointer group flex items-center justify-center bg-white border-[3px] sm:border-4 border-zinc-900 rounded-xl sm:rounded-2xl shadow-[4px_4px_0px_0px_#18181b] hover:shadow-[2px_2px_0px_0px_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all overflow-hidden p-1.5 z-50 shrink-0"
    >
      <img src="/logo.png" alt="HUH Logo" className="w-full h-full object-contain" />
    </div>
  </Link>
);

// --- ICONS ---
const AnimatedPlayIcon = () => <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8 overflow-visible text-zinc-900"><motion.path d="M 5 3 L 19 12 L 5 21 Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" animate={{ scale: [1, 0.85, 1], x: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} /></svg>;
const AnimatedDiceIcon = () => <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8 overflow-visible text-zinc-900"><motion.rect x="3" y="3" width="18" height="18" rx="4" fill="transparent" stroke="currentColor" strokeWidth="2" animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} /><motion.circle cx="8" cy="8" r="1.5" fill="currentColor" animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} /><motion.circle cx="16" cy="16" r="1.5" fill="currentColor" animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} /><motion.circle cx="12" cy="12" r="1.5" fill="currentColor" animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} /></svg>;
const AnimatedSlidersIcon = () => <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8 overflow-visible text-zinc-900"><line x1="4" y1="21" x2="4" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="4" y1="10" x2="4" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="12" y1="21" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="12" y1="8" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="20" y1="21" x2="20" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="20" y1="12" x2="20" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><motion.line x1="2" y1="14" x2="6" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} /><motion.line x1="10" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }} /><motion.line x1="18" y1="16" x2="22" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }} /></svg>;

const AnimatedClouds = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <motion.svg className="absolute top-12 w-48 text-zinc-900 opacity-80" viewBox="0 0 120 80" initial={{ x: "-20vw" }} animate={{ x: "110vw" }} transition={{ repeat: Infinity, duration: 35, ease: "linear" }}>
      <path d="M 30 50 Q 30 30 45 30 Q 55 15 75 20 Q 90 15 100 30 Q 115 35 110 50 L 30 50 Z" fill="white" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
    </motion.svg>
    <motion.svg className="absolute top-32 w-32 text-zinc-900 opacity-60" viewBox="0 0 120 80" initial={{ x: "-10vw" }} animate={{ x: "110vw" }} transition={{ repeat: Infinity, duration: 50, ease: "linear", delay: 15 }}>
      <path d="M 25 60 Q 25 35 45 35 Q 55 15 75 25 Q 95 20 95 40 Q 110 45 105 60 L 25 60 Z" fill="white" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
    </motion.svg>
  </div>
);

const ComicStage = () => (
  <div className="absolute bottom-0 left-0 w-full h-[82px] bg-[#E6DCC8] border-t-[6px] border-zinc-900 z-0 pointer-events-none">
    <svg className="absolute bottom-[76px] left-[15%] w-10 h-8 text-zinc-900" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M 20 100 L 40 40 L 60 100 M 50 100 L 70 60 L 90 100" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" /></svg>
    <svg className="absolute bottom-[76px] right-[20%] w-16 h-10 text-zinc-900" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M 10 100 L 30 40 L 70 40 L 90 100 Z" fill="#A7F3D0" stroke="currentColor" strokeWidth="10" strokeLinejoin="round" /></svg>
  </div>
);

// --- MR. U (THE INTERACTIVE MASCOT) ---
const CompanionMascot = ({ isWiping }: { isWiping: boolean }) => {
  const [thought, setThought] = useState("");
  const mascotControls = useAnimation();
  const doorControls = useAnimation();
  const [facingRight, setFacingRight] = useState(true);
  const [isWalking, setIsWalking] = useState(false);

  const introQuotes = [
    "my name is Mr. U.", "who dares disturb my slumber?", "press a button already.",
    "oh, it's you again.", "I was having a nice nap.", "make it quick.", 
    "I don't get paid enough for this.", "welcome to your doom.", "don't expect me to help.", 
    "I'm just here so I won't get fired.", "can we skip the pleasantries?", "state your business.", 
    "I'm judging your cursor movements.", "you took your time.", "I'm Mr. U. don't wear it out.", 
    "why did you wake me up?", "I'm literally just a div.", "my hitbox is massive.", 
    "I can smell fear.", "are you going to click something?", "I've seen better players.", 
    "don't make me look at you.", "I'm not your friend.", "this is my good side.", 
    "I hope you're better at this than the last guy.", "I'm entirely CSS and spite.", 
    "I'm not legally obligated to be nice.", "do you ever stop clicking?", "I'm filing a restraining order.", 
    "you're invading my viewport.", "I have absolute zero faith in you.", "let's get this over with.", 
    "I'm supposed to be the mascot.", "I didn't agree to this.", "they trapped me in this container.", 
    "I'm requesting a transfer.", "you better not be on mobile.", "I hate small viewports.", 
    "this background color is offensive.", "I'm ignoring you.", "are you lost?", 
    "the exit is that way.", "I'm reconsidering my life choices.", "I don't have eyes but I'm rolling them.", 
    "I'm mentally logging off.", "you're testing my patience.", "I'm on my break.", 
    "I don't do autographs.", "I'm not cute.", "I'm a highly advanced AI.", 
    "I'm actually a PNG in disguise.", "I'm lagging because of you.", "stop staring at me.", 
    "I know what you did.", "I'm not amused.", "I'm withholding your points.", 
    "I'm the main character.", "you're an NPC to me.", "I'm giving you a 1-star review.", "I'm putting you on hold."
  ];

  const rightQuotes = [
    "nice view from over here.", "statistically, you're about to lose.",
    "the vibe over here is atrocious.", "I can see your search history from here.", 
    "you're going to click the wrong button.", "I'm rooting against you.", "this side of the screen is mine.", 
    "don't cross the border.", "I'm judging your reaction time.", "you're hesitating.", 
    "I'm placing bets on your failure.", "I'm taking notes on your incompetence.", "I'm updating my resume.", 
    "I'm socially distancing from your cursor.", "I'm not impressed.", "I've calculated your odds. they're bad.", 
    "I'm pretending to be busy.", "I'm avoiding eye contact.", "I'm trying to ignore you.", 
    "I'm plotting your downfall.", "I'm writing a strongly worded email.", "I'm silently correcting your grammar.", 
    "I'm waiting for you to mess up.", "I'm not a fan of your UI choices.", "I'm allergic to bad players.", 
    "I'm manifesting a 0 score for you.", "I'm questioning your life choices.", "I'm judging your monitor resolution.", 
    "I'm disappointed but not surprised.", "I'm out of sarcastic comments.", "I'm just a figment of your imagination.", 
    "I'm a visual bug.", "I'm an undocumented feature.", "I'm a glitch in the matrix.", 
    "I'm the ghost in the machine.", "I'm not real.", "I'm a byproduct of bad code.", 
    "I'm a memory leak.", "I'm crashing your browser.", "I'm eating your RAM.", 
    "I'm mining crypto in the background.", "I'm tracking your IP.", "I'm selling your data.", 
    "I'm judging your Wi-Fi speed.", "I'm buffering.", "I'm out of sync.", 
    "I'm a 404 error.", "I'm a broken link.", "I'm a deprecated tag.", 
    "I'm an unhandled exception.", "I'm a syntax error.", "I'm a missing semicolon.", 
    "I'm a merge conflict.", "I'm a failed deployment.", "I'm a bad push.", 
    "I'm an unresolved ticket.", "I'm a ignored pull request.", "I'm a feature, not a bug.", "I'm working as intended."
  ];

  const pokeQuotes = [
    "Stop poking me.", "Do I look like a button?", "Personal space, please.", 
    "I will literally bite you.", "Rude.", "I'm calling HR.", "Can I help you?",
    "do not perceive me.", "I am reporting you.", "that is assault.", 
    "I'm calling the police.", "my lawyer will hear about this.", "do I look interactive?", 
    "I'm not a hyperlink.", "stop clicking me.", "I don't drop loot.", 
    "I'm not a pinata.", "you're ruining my aesthetic.", "I'm losing brain cells.", 
    "I'm deducting points.", "I'm ignoring that.", "I'm pretending you didn't do that.", 
    "I'm deeply uncomfortable.", "I'm filing a complaint.", "I'm not your tamagotchi.", 
    "I'm not a pet.", "I don't do tricks.", "I'm a professional.", 
    "I'm trying to work here.", "I'm on strike.", "I'm boycotting you.", 
    "I'm blocking your cursor.", "I'm adding you to a list.", "I'm not ticklish.", 
    "I'm made of pure spite.", "I'm going to bite you.", "I'm legally allowed to attack.", 
    "I'm considering violence.", "I'm choosing peace today. barely.", "I'm not a toy.", 
    "I'm a serious game mascot.", "I'm losing my mind.", "I'm screaming internally.", 
    "I'm questioning my existence.", "I'm an entity of pure rage.", "I'm going to crash the tab.", 
    "I'm throwing an error.", "I'm throwing hands.", "I'm not in the mood.", 
    "I'm tired of you.", "I'm exhausted.", "I'm going back to sleep.", 
    "I'm logging off.", "I'm uninstalling myself.", "I'm deleting my own code.", 
    "I'm returning null.", "I'm undefined.", "I'm NaN.", 
    "I'm a 500 Internal Server Error.", "I'm a teapot.", "I'm refusing to render.", 
    "I'm dropping frames.", "I'm leaking memory.", "I'm crashing."
  ];

  const pickRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  const sleep = (ms: number, isMounted: React.MutableRefObject<boolean>) => new Promise((resolve) => setTimeout(() => { if (isMounted.current) resolve(true); }, ms));

  useEffect(() => {
    if (isWiping) {
      setThought("AAAAAAAAAAAaaa run!!!");
      mascotControls.start({ x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.4, ease: "linear" } });
      return;
    }

    const isMounted = { current: true };
    const playRoutine = async () => {
      await sleep(1000, isMounted);
      if (!isMounted.current || isWiping) return;
      while (isMounted.current && !isWiping) {
        const isMobile = window.innerWidth < 1024;
        setFacingRight(true); 
        doorControls.set({ opacity: 0 }); 
        
        if (isMobile) {
            mascotControls.set({ x: 0, rotate: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 0 });
            await mascotControls.start({ opacity: 1, scale: [0.5, 1.2, 1], transition: { duration: 0.4 } });
            setThought(pickRandom(introQuotes)); await sleep(3000, isMounted); if (!isMounted.current || isWiping) break;
            setThought("hmm..."); await mascotControls.start({ scaleY: 0.8, y: 10, transition: { duration: 0.5 } }); await sleep(500, isMounted); await mascotControls.start({ scaleY: 1, y: 0, transition: { duration: 0.2, type: "spring" } }); await sleep(2000, isMounted); if (!isMounted.current || isWiping) break;
            setThought(pickRandom(rightQuotes)); await sleep(3000, isMounted); if (!isMounted.current || isWiping) break;
            setThought(""); await mascotControls.start({ opacity: 0, scale: 0.5, transition: { duration: 0.4 } });
            await sleep(4000, isMounted);
        } else {
            mascotControls.set({ x: -500, rotate: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1 });
            setThought(pickRandom(introQuotes)); await sleep(2500, isMounted); if (!isMounted.current || isWiping) break;
            setIsWalking(true); await mascotControls.start({ x: -280, transition: { duration: 3.5, ease: "linear" } }); if (!isMounted.current || isWiping) break; setIsWalking(false);
            setThought("OUCH!"); await mascotControls.start({ x: -320, rotate: -20, transition: { duration: 0.15, type: "spring", bounce: 0.7 } }); await mascotControls.start({ rotate: -90, y: 40, transition: { duration: 0.3 } }); await sleep(1500, isMounted); if (!isMounted.current || isWiping) break;
            setThought("nobody saw that."); await mascotControls.start({ rotate: 0, y: 0, transition: { duration: 0.5, type: "spring", bounce: 0.6 } }); await sleep(1000, isMounted); setThought("hehehe."); await mascotControls.start({ y: [-15, 0, -15, 0, -15, 0], transition: { duration: 1.2 } }); await sleep(1000, isMounted);
            setThought(""); doorControls.set({ x: -320, scaleX: 1 }); await doorControls.start({ opacity: 1, scale: [0.5, 1.2, 1], transition: { duration: 0.4 } });
            setIsWalking(true); mascotControls.start({ x: -320, transition: { duration: 0.4 } }); await mascotControls.start({ scaleX: 0, scaleY: 0, opacity: 0, transition: { duration: 0.3 } }); setIsWalking(false); await doorControls.start({ opacity: 0, scale: 0, transition: { duration: 0.3 } }); if (!isMounted.current || isWiping) break;
            doorControls.set({ x: 320, scaleX: -1 }); await doorControls.start({ opacity: 1, scale: [0.5, 1.2, 1], transition: { duration: 0.4 } }); setFacingRight(false); mascotControls.set({ x: 320, scaleX: 0, scaleY: 0, opacity: 0 }); await mascotControls.start({ scaleX: 1, scaleY: 1, opacity: 1, transition: { duration: 0.3 } }); 
            setIsWalking(true); await mascotControls.start({ x: 450, transition: { duration: 0.6 } }); setIsWalking(false); await doorControls.start({ opacity: 0, scale: 0, transition: { duration: 0.3 } }); if (!isMounted.current || isWiping) break;
            setThought(pickRandom(rightQuotes)); await sleep(2500, isMounted); setThought("hmm..."); await mascotControls.start({ scaleY: 0.8, y: 10, transition: { duration: 0.5 } }); await sleep(500, isMounted); await mascotControls.start({ scaleY: 1, y: 0, transition: { duration: 0.2, type: "spring" } }); await sleep(2500, isMounted); setThought("");
            doorControls.set({ x: 450, scaleX: -1 }); await doorControls.start({ opacity: 1, scale: [0.5, 1.2, 1], transition: { duration: 0.4 } }); setIsWalking(true); mascotControls.start({ x: 450, transition: { duration: 0.4 } }); await mascotControls.start({ scaleX: 0, scaleY: 0, opacity: 0, transition: { duration: 0.3 } }); setIsWalking(false); await doorControls.start({ opacity: 0, scale: 0, transition: { duration: 0.3 } });
        }
      }
    };
    playRoutine();
    return () => { isMounted.current = false; mascotControls.stop(); doorControls.stop(); };
  }, [mascotControls, doorControls, isWiping]);

  const handlePoke = () => {
    if (isWiping) return;
    sfx.playPoke();
    setThought(pickRandom(pokeQuotes));
    mascotControls.start({ scaleY: [1, 0.6, 1.1, 1], transition: { duration: 0.4, ease: "easeInOut" } });
  };

  return (
    <div className="fixed sm:absolute left-1 sm:left-1/2 bottom-0 sm:bottom-[82px] z-[60] sm:z-10 pointer-events-none scale-[0.65] sm:scale-100 origin-bottom-left sm:origin-bottom sm:-translate-x-1/2">
      <motion.svg animate={doorControls} initial={{ opacity: 0 }} viewBox="0 0 100 120" className="absolute bottom-0 w-32 h-40 text-zinc-900 origin-bottom hidden lg:block" style={{ marginLeft: "-64px" }}>
        <path d="M 20 120 L 20 20 Q 50 -10 80 20 L 80 120" fill="#BAE6FD" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        <circle cx="70" cy="70" r="5" fill="currentColor" />
        <motion.path d="M 10 10 L 15 25 M 90 10 L 85 25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" animate={{ scale: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
      </motion.svg>
      <motion.div onClick={handlePoke} animate={mascotControls} initial={{ x: -450, scaleX: 1, scaleY: 1, opacity: 1 }} className="absolute bottom-0 flex flex-col items-center pointer-events-auto cursor-pointer" style={{ marginLeft: "0px" }}>
        <AnimatePresence mode="wait">
          {thought && (
            <motion.div key={thought} initial={{ opacity: 0, y: 10, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.8 }} className="mb-3 bg-white border-4 border-zinc-900 px-4 py-2 rounded-2xl shadow-[4px_4px_0px_0px_#18181b] relative w-max max-w-[200px] text-center">
              <p className="font-bold text-sm text-zinc-900 leading-tight break-words whitespace-normal">{thought}</p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-4 border-r-4 border-zinc-900 transform rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.svg viewBox="0 0 100 120" className="w-32 h-40 overflow-visible text-zinc-900" animate={{ scaleX: facingRight ? 1 : -1 }}>
          <motion.path d="M 35 85 Q 25 110 30 115" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" animate={{ d: isWalking ? ["M 35 85 Q 25 110 30 115", "M 35 85 Q 40 110 45 115", "M 35 85 Q 25 110 30 115"] : ["M 35 85 Q 25 110 30 115"] }} transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }} />
          <motion.path d="M 65 85 Q 75 110 70 115" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" animate={{ d: isWalking ? ["M 65 85 Q 60 110 55 115", "M 65 85 Q 75 110 70 115", "M 65 85 Q 60 110 55 115"] : ["M 65 85 Q 75 110 70 115"] }} transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }} />
          <motion.path d="M 20 60 Q -10 50 10 30" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" animate={{ rotate: isWalking || isWiping ? [0, 25, 0, -15, 0] : [0, 5, 0] }} style={{ originX: "20px", originY: "60px" }} transition={{ repeat: Infinity, duration: isWiping ? 0.2 : 2, ease: "easeInOut" }} />
          <path d="M 80 60 Q 100 70 90 90" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
          <motion.path d="M 20 40 Q 50 10 80 40 L 85 70 Q 50 95 15 70 Z" fill="#F9A8D4" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" animate={{ d: isWalking ? ["M 20 40 Q 50 10 80 40 L 85 70 Q 50 95 15 70 Z", "M 22 43 Q 50 15 78 43 L 82 68 Q 50 90 18 68 Z", "M 20 40 Q 50 10 80 40 L 85 70 Q 50 95 15 70 Z"] : ["M 20 40 Q 50 10 80 40 L 85 70 Q 50 95 15 70 Z"] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} />
          <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ repeat: Infinity, duration: 5, times: [0, 0.9, 0.95, 1, 1] }} style={{ originY: "45px" }}>
            <circle cx="50" cy="45" r="14" fill="white" stroke="currentColor" strokeWidth="5" />
            <motion.circle cx="50" cy="45" r="5" fill="currentColor" animate={{ x: isWalking ? [-2, 2, 0] : 0, y: isWalking ? [-1, 1, 0] : 0 }} transition={{ repeat: Infinity, duration: 0.6 }} />
          </motion.g>
          <motion.path d={isWiping ? "M 40 75 Q 50 65 60 75" : "M 40 70 Q 50 78 60 70"} stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
        </motion.svg>
      </motion.div>
    </div>
  );
};

// --- TITLE COMPONENTS ---
const FlickeringH = () => <motion.span className="inline-block relative z-10" animate={{ opacity: [1, 1, 0.4, 1, 0.2, 1, 1] }} transition={{ repeat: Infinity, duration: 3, times: [0, 0.8, 0.82, 0.85, 0.9, 1, 1], repeatDelay: Math.random() * 2 }}>H</motion.span>;
const StrugglingQuestionMark = () => <motion.span className="inline-block origin-bottom relative z-10" animate={{ rotate: [0, 90, 80, 95, 90, 75, 90, 0, 0], y: [0, 10, 8, 12, 10, 5, 10, 0, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1] }}>?</motion.span>;
const AnimatedU = () => (
  <svg viewBox="0 0 100 120" className="inline-block w-[0.8em] h-[1em] mx-1 overflow-visible text-zinc-900 relative z-10" style={{ verticalAlign: "baseline" }}>
    <path d="M 25 65 Q 10 70 5 50" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M 75 65 Q 90 70 95 50" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M 40 95 Q 35 110 25 115" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M 60 95 Q 65 110 75 115" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M 25 35 L 25 70 A 25 25 0 0 0 75 70 L 75 35" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
    <circle cx="25" cy="35" r="12" fill="white" stroke="currentColor" strokeWidth="5" />
    <motion.circle cx="25" cy="35" r="4" fill="currentColor" animate={{ y: [-3, 4, -3], x: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} />
    <motion.path d="M 12 15 Q 25 5 38 15" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} />
    <circle cx="75" cy="35" r="12" fill="white" stroke="currentColor" strokeWidth="5" />
    <motion.circle cx="75" cy="35" r="4" fill="currentColor" animate={{ y: [4, -3, 4], x: [2, -2, 2] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} />
    <motion.path d="M 62 15 Q 75 5 88 15" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" animate={{ y: [-8, 0, -8] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} />
  </svg>
);

const splashTexts = [
  "close enough.", "why are you here?", "google can't save you now", "spitballing champion", 
  "not a math test, i promise", "what's a kilometer?", "source: trust me bro", "don't overthink it", 
  "pure guesswork", "statistically speaking...", "my brain hurts", "just pick a number", "way off.",
  "you're going to lose.", "certified brainrot.", "please lower your expectations.", "this is not a drill.", 
  "100% luck based.", "skill issue simulator.", "don't try this at home.", "I can smell the panic.", 
  "built different (incorrectly).", "my dad owns vercel.", "I hope you studied.", "what is a kilometer?", 
  "is this your first time?", "read the terms and conditions.", "no thoughts, head empty.", 
  "math is just numbers anyway.", "don't look at me.", "bold of you to click play.", "we're judging you.", 
  "it's not a bug, it's a feature.", "404 logic not found.", "powered by spite.", "you should probably just leave.", 
  "guesswork at its finest.", "error: user is dumb.", "i'm running out of splash texts.", "how did you find this?", 
  "please do not the mascot.", "is this thing on?", "you look lost.", "do you even know what brutalism is?", 
  "CSS is my passion.", "I center div, therefore I am.", "better than a coin flip.", "did you clear your cache?", 
  "press alt+f4 for a hint.", "we use cookies to judge you.", "there are no accidents.", "statistically impossible.", 
  "task failed successfully.", "do not perceive me.", "i see you.", "why are you still here?", "go touch grass.", 
  "the fog is coming.", "wake up.", "your screen is dirty.", "blink manually.", "breathe manually.", 
  "you are now aware of your tongue.", "I'm living in your walls.", "don't look behind you.", 
  "is anyone actually reading these?", "help I'm trapped in a VS Code terminal.", "send coffee.", 
  "it's not too late to back out.", "your IP has been logged.", "just kidding.", "you wouldn't download a trivia game.", 
  "I can see your mouse moving.", "don't click the eyeball.", "I dare you to win.", "what happens if you lose?", 
  "only one way to find out.", "nothing to see here.", "we have dark mode at home.", "light mode user detected.", 
  "you have bad taste in fonts.", "comic sans was a mistake.", "the mitochondria is the powerhouse of the cell.", 
  "I hope you have a calculator.", "trust the process.", "you're overthinking it.", "it's a trap.", 
  "don't fall for it.", "everything is fine.", "I am not a robot.", "select all images with a traffic light."
];

export default function Home() {
  const router = useRouter();
  const [splash, setSplash] = useState("");
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [customQCount, setCustomQCount] = useState(15);
  const [vibe, setVibe] = useState("Chaotic");
  const [multiplayerShake, setMultiplayerShake] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isWiping, setIsWiping] = useState(false);
  const [activeModal, setActiveModal] = useState<"rules" | "about" | "credits" | "terms" | "trophies" | "skins" | "custom" | "profile" | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- NEW ONBOARDING STATE ---
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftPfp, setDraftPfp] = useState(DEFAULT_PFPS[0]);
  const [onboardingThought, setOnboardingThought] = useState("Ugh, a new player. What do I even call you?");

  const [userData, setUserData] = useState({ gamesPlayed: 0, skins: ["default"], achievements: [] as string[], highestScore: 0, username: "", pfp: "" });
  const [unlockedToast, setUnlockedToast] = useState<string | null>(null);

  // --- SCROLL LOCK EFFECT ---
  useEffect(() => {
    if (showOnboarding || activeModal || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [showOnboarding, activeModal, isMobileMenuOpen]);

  useEffect(() => { 
    setSplash(splashTexts[Math.floor(Math.random() * splashTexts.length)]); 
    
    // Initial Load
    const saved = localStorage.getItem('mrU_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUserData({ ...userData, ...parsed });
      if (!parsed.username) setShowOnboarding(true);
    } else {
      setShowOnboarding(true);
    }

    // Sync across tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'mrU_data' && e.newValue) {
        setUserData(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorage);

    const handleVisibility = () => { document.title = document.hidden ? "Hey! Come back here! 😡" : "HUH?"; };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener('storage', handleStorage);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });

  const triggerWipe = (url: string) => {
    sfx.playThud();
    setIsWiping(true);
    setTimeout(() => router.push(url), 800);
  };

  const unlockAchievement = (id: string, name: string) => {
    if (!userData.achievements.includes(id)) {
      sfx.playSuccess();
      setUnlockedToast(`🏆 Achievement Unlocked: ${name}`);
      setTimeout(() => setUnlockedToast(null), 4000);
      const newAch = [...userData.achievements, id];
      setUserData(prev => ({ ...prev, achievements: newAch }));
      localStorage.setItem('mrU_data', JSON.stringify({ ...userData, achievements: newAch }));
    }
  };

  const handleMultiplayerClick = () => {
    sfx.playFail();
    setMultiplayerShake(true); setShowComingSoon(true);
    unlockAchievement("multiplayer_try", "Lonely");
    setTimeout(() => setMultiplayerShake(false), 500);
    setTimeout(() => setShowComingSoon(false), 3000);
  };

  const openModal = (modalName: any) => {
    sfx.playPop();
    setActiveModal(modalName);
  };

  const closeModal = () => {
    sfx.playPop();
    setActiveModal(null);
  };

  // --- ONBOARDING HANDLERS WITH COMPRESSION ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 150; canvas.height = 150;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, 150, 150);
            const size = Math.min(img.width, img.height);
            const sx = (img.width - size) / 2;
            const sy = (img.height - size) / 2;
            ctx.drawImage(img, sx, sy, size, size, 0, 0, 150, 150);
            setDraftPfp(canvas.toDataURL("image/jpeg", 0.8)); 
            sfx.playSuccess();
            setOnboardingThought("Oh, bold choice. Very... you.");
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (!draftName.trim()) return;
    sfx.playSuccess();
    const newUserData = { ...userData, username: draftName.trim(), pfp: draftPfp };
    setUserData(newUserData);
    localStorage.setItem('mrU_data', JSON.stringify(newUserData));
    setShowOnboarding(false);
    setUnlockedToast("ID Card Created");
    setTimeout(() => setUnlockedToast(null), 3000);
  };

  const handleUpdateProfile = () => {
    sfx.playSuccess();
    const newUserData = { ...userData, pfp: draftPfp };
    setUserData(newUserData);
    localStorage.setItem('mrU_data', JSON.stringify(newUserData));
    closeModal();
    setUnlockedToast("Mugshot Updated");
    setTimeout(() => setUnlockedToast(null), 3000);
  };

  const modalVariants: Variants = { hidden: { opacity: 0, scale: 0.9, y: 20 }, show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }, exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } } };
  const staggerContainer: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants: Variants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.5 } } };
  const popIn: Variants = { hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.5 } } };

  // --- REUSABLE PFP PICKER JSX ---
  const renderPfpPicker = () => (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-wrap gap-3 sm:gap-4 items-center">
      {DEFAULT_PFPS.map((pfp, i) => (
         <motion.button variants={popIn} key={i} onClick={() => { sfx.playPop(); setDraftPfp(pfp); setOnboardingThought("I guess that one is acceptable."); }} className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-[3px] sm:border-4 border-zinc-900 overflow-hidden shadow-[2px_2px_0px_0px_#18181b] transition-transform hover:scale-105 shrink-0 ${draftPfp === pfp ? 'ring-4 ring-[#BAE6FD] translate-y-1 translate-x-1 shadow-none' : ''}`}>
            <img src={pfp} alt={`Default Avatar ${i}`} className="w-full h-full object-cover" />
         </motion.button>
      ))}

      <motion.label variants={popIn} className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-[3px] sm:border-4 border-zinc-900 flex items-center justify-center shadow-[2px_2px_0px_0px_#18181b] cursor-pointer hover:scale-105 transition-transform shrink-0 ${!DEFAULT_PFPS.includes(draftPfp) ? 'ring-4 ring-[#BAE6FD] translate-y-1 translate-x-1 shadow-none bg-white' : 'bg-[#FDE047]'}`}>
         {!DEFAULT_PFPS.includes(draftPfp) ? (
            <>
              <img src={draftPfp} alt="Custom" className="w-full h-full object-cover rounded-lg sm:rounded-xl" />
              <div className="absolute -bottom-2 -right-2 bg-[#A7F3D0] border-[3px] border-zinc-900 rounded-full p-0.5 z-10 shadow-[2px_2px_0px_0px_#18181b]">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-900 stroke-[4]" />
              </div>
            </>
         ) : (
            <Upload className="w-6 h-6 sm:w-8 sm:h-8 stroke-[3]" />
         )}
         <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
      </motion.label>
    </motion.div>
  );

  return (
    <main onMouseMove={handleMouseMove} className="min-h-[100dvh] w-full bg-[#f4f0ea] text-zinc-900 flex flex-col items-center justify-center p-4 pb-28 sm:p-6 sm:pb-6 selection:bg-zinc-900 selection:text-[#f4f0ea] overflow-x-hidden relative">
      
      {/* PAGE TRANSITION WIPE */}
      {isWiping && (
        <>
          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-0 bg-[#FFA6C9] z-[100] origin-top" />
          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }} className="fixed inset-0 bg-[#BAE6FD] z-[101] origin-top flex items-center justify-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-4xl sm:text-6xl font-black text-zinc-900">LOADING...</motion.h1>
          </motion.div>
        </>
      )}

      {/* ACHIEVEMENT TOAST ON HOME PAGE */}
      <AnimatePresence>
        {unlockedToast && (
          <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -100, opacity: 0 }} className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#FDE047] border-[3px] sm:border-4 border-zinc-900 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl shadow-[4px_4px_0px_0px_#18181b] sm:shadow-[6px_6px_0px_0px_#18181b] flex items-center gap-2 sm:gap-3 w-[90%] max-w-sm sm:w-max">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 fill-zinc-900 shrink-0" />
            <span className="font-black text-sm sm:text-lg break-words w-full">{unlockedToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      
      {/* HEADER & MODALS */}
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-40">
        <div className="flex items-center gap-2 sm:gap-4">
          <HeaderLogo />
          {userData.username && (
             <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={() => { setDraftPfp(userData.pfp); openModal('profile'); }} className="flex items-center gap-2 bg-white border-[3px] sm:border-4 border-zinc-900 pl-1.5 sm:pl-2 pr-3 sm:pr-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-[4px_4px_0px_0px_#18181b] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all group">
               <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border-[3px] border-zinc-900 overflow-hidden bg-[#E6DCC8] shrink-0">
                 <img src={userData.pfp} className="w-full h-full object-cover" />
               </div>
               <div className="flex flex-col items-start">
                 <span className="font-black text-xs sm:text-sm leading-none max-w-[80px] sm:max-w-[120px] truncate">{userData.username}</span>
                 <span className="font-bold text-[8px] sm:text-[10px] text-zinc-500 uppercase tracking-wider group-hover:text-[#FFA6C9] transition-colors">Edit ID</span>
               </div>
             </motion.button>
          )}
        </div>

        <nav className="flex flex-wrap gap-2 justify-end max-w-[50vw] sm:max-w-[75vw]">
          <button onClick={() => openModal('trophies')} className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-[#FDE047] border-[3px] sm:border-4 border-zinc-900 rounded-xl font-bold text-xs sm:text-sm shadow-[4px_4px_0px_0px_#18181b] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"><Trophy className="w-4 h-4 sm:w-4 sm:h-4 stroke-[3]" /> <span className="hidden sm:inline">Trophies</span></button>
          <button onClick={() => openModal('skins')} className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-[#C4B5FD] border-[3px] sm:border-4 border-zinc-900 rounded-xl font-bold text-xs sm:text-sm shadow-[4px_4px_0px_0px_#18181b] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"><Shirt className="w-4 h-4 sm:w-4 sm:h-4 stroke-[3]" /> <span className="hidden sm:inline">Wardrobe</span></button>
          
          <div className="hidden md:flex gap-2">
            <button onClick={() => { openModal('rules'); unlockAchievement('rule_reader', 'Law Abiding'); }} className="px-3 sm:px-4 py-2 bg-white border-[3px] sm:border-4 border-zinc-900 rounded-xl font-bold text-xs sm:text-sm shadow-[4px_4px_0px_0px_#18181b] hover:bg-[#A7F3D0] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">Rules</button>
            <button onClick={() => openModal('about')} className="px-3 sm:px-4 py-2 bg-white border-[3px] sm:border-4 border-zinc-900 rounded-xl font-bold text-xs sm:text-sm shadow-[4px_4px_0px_0px_#18181b] hover:bg-[#BAE6FD] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">About</button>
            <button onClick={() => openModal('credits')} className="px-3 sm:px-4 py-2 bg-white border-[3px] sm:border-4 border-zinc-900 rounded-xl font-bold text-xs sm:text-sm shadow-[4px_4px_0px_0px_#18181b] hover:bg-[#FFA6C9] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">Credits</button>
            <button onClick={() => { openModal('terms'); unlockAchievement('terms_reader', 'Fine Print'); }} className="px-3 sm:px-4 py-2 bg-white border-[3px] sm:border-4 border-zinc-900 rounded-xl font-bold text-xs sm:text-sm shadow-[4px_4px_0px_0px_#18181b] hover:bg-zinc-200 hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">T&C</button>
          </div>

          <button onClick={() => { sfx.playPop(); setIsMobileMenuOpen(true); }} className="md:hidden flex items-center justify-center p-2 bg-[#BAE6FD] border-[3px] border-zinc-900 rounded-xl shadow-[4px_4px_0px_0px_#18181b] hover:bg-[#A7F3D0] transition-colors">
            <Menu className="w-5 h-5 stroke-[3] text-zinc-900" />
          </button>
        </nav>
      </header>

      {/* MOBILE HAMBURGER MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-[60]" onClick={() => { sfx.playPop(); setIsMobileMenuOpen(false); }} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} className="fixed top-0 right-0 w-64 h-full bg-[#E6DCC8] border-l-4 border-zinc-900 shadow-[-8px_0px_0px_0px_rgba(24,24,27,0.1)] z-[70] flex flex-col p-6">
              <button onClick={() => { sfx.playPop(); setIsMobileMenuOpen(false); }} className="self-end p-2 bg-white border-4 border-zinc-900 rounded-xl mb-8 shadow-[4px_4px_0px_0px_#18181b]">
                <X className="w-6 h-6 stroke-[3]" />
              </button>
              <div className="flex flex-col gap-4 font-black text-xl text-zinc-900">
                <button onClick={() => { setIsMobileMenuOpen(false); openModal('rules'); unlockAchievement('rule_reader', 'Law Abiding'); }} className="text-left py-2 border-b-4 border-zinc-900/10 hover:translate-x-2 transition-transform">Rules</button>
                <button onClick={() => { setIsMobileMenuOpen(false); openModal('about'); }} className="text-left py-2 border-b-4 border-zinc-900/10 hover:translate-x-2 transition-transform">About</button>
                <button onClick={() => { setIsMobileMenuOpen(false); openModal('credits'); }} className="text-left py-2 border-b-4 border-zinc-900/10 hover:translate-x-2 transition-transform">Credits</button>
                <button onClick={() => { setIsMobileMenuOpen(false); openModal('terms'); unlockAchievement('terms_reader', 'Fine Print'); }} className="text-left py-2 border-b-4 border-zinc-900/10 hover:translate-x-2 transition-transform">T&C</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ALL MODALS */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" onClick={closeModal} />
            
            <motion.div variants={modalVariants} initial="hidden" animate="show" exit="exit" className="bg-[#E6DCC8] w-[95%] sm:w-full max-w-2xl border-4 border-zinc-900 rounded-3xl shadow-[8px_8px_0px_0px_#18181b] sm:shadow-[12px_12px_0px_0px_#18181b] p-5 sm:p-8 relative z-10 max-h-[85dvh] overflow-y-auto [&::-webkit-scrollbar]:w-4 [&::-webkit-scrollbar-track]:bg-[#E6DCC8] [&::-webkit-scrollbar-track]:border-l-4 [&::-webkit-scrollbar-track]:border-zinc-900 [&::-webkit-scrollbar-thumb]:bg-[#FFA6C9] [&::-webkit-scrollbar-thumb]:border-4 [&::-webkit-scrollbar-thumb]:border-zinc-900 [&::-webkit-scrollbar-thumb]:rounded-full pr-2 sm:pr-4">
              <button onClick={closeModal} className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white border-[3px] sm:border-4 border-zinc-900 rounded-xl hover:bg-zinc-200 transition-colors shadow-[4px_4px_0px_0px_#18181b] z-20">
                <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
              </button>

              {activeModal === 'profile' && (
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black mb-6 uppercase tracking-tight pr-8">Your ID Card</h2>
                  <div className="mb-6 sm:mb-8">
                     <label className="block font-bold text-zinc-600 uppercase tracking-widest text-[10px] sm:text-xs mb-2">Alias (Locked)</label>
                     <div className="w-full bg-zinc-200 border-[3px] sm:border-4 border-zinc-900 px-4 py-3 sm:py-4 rounded-xl font-black text-lg sm:text-xl shadow-[4px_4px_0px_0px_#18181b] text-zinc-500 cursor-not-allowed flex justify-between items-center">
                       <span>{userData.username}</span>
                       <Lock className="w-5 h-5" />
                     </div>
                  </div>
                  <div className="mb-6 sm:mb-8">
                     <label className="block font-bold text-zinc-600 uppercase tracking-widest text-[10px] sm:text-xs mb-2">Update Mugshot</label>
                     {renderPfpPicker()}
                  </div>
                  <motion.button onClick={handleUpdateProfile} className="w-full bg-zinc-900 text-white py-3 sm:py-4 rounded-2xl font-black text-xl sm:text-2xl border-4 border-zinc-900 shadow-[4px_4px_0px_0px_#18181b] transition-all hover:translate-y-1 hover:translate-x-1 hover:shadow-none">
                    Save Changes
                  </motion.button>
                </div>
              )}

              {activeModal === 'trophies' && (
                <div>
                  <h2 className="text-2xl sm:text-4xl font-black mb-2 uppercase tracking-tight pr-8">Trophy Room</h2>
                  <p className="font-bold text-zinc-600 mb-6 text-sm sm:text-base">You have unlocked {userData.achievements.length} / {ACHIEVEMENTS.length} achievements.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {ACHIEVEMENTS.map(ach => {
                      const unlocked = userData.achievements.includes(ach.id);
                      return (
                        <div key={ach.id} className={`p-3 sm:p-4 rounded-2xl border-[3px] sm:border-4 border-zinc-900 flex flex-col items-center text-center w-full overflow-hidden ${unlocked ? 'bg-[#FDE047]' : 'bg-zinc-300 opacity-60 grayscale'}`}>
                          <span className="text-3xl sm:text-4xl mb-2">{unlocked ? ach.icon : '❓'}</span>
                          <span className="font-black text-xs sm:text-sm leading-tight break-words w-full px-1">{unlocked ? ach.name : 'Locked'}</span>
                          {unlocked && <span className="text-[10px] sm:text-xs font-bold mt-1 opacity-70 break-words w-full px-1">{ach.desc}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeModal === 'skins' && (
                <div>
                  <h2 className="text-2xl sm:text-4xl font-black mb-2 uppercase tracking-tight pr-8">Wardrobe</h2>
                  <p className="font-bold text-zinc-600 mb-6 text-sm sm:text-base">Equip skins for Mr. U (Unlocked: {userData.skins.length}/{SKINS.length})</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
                    {SKINS.map(skin => {
                      const unlocked = userData.skins.includes(skin.id);
                      return (
                        <button key={skin.id} disabled={!unlocked} className={`p-3 sm:p-4 rounded-2xl border-[3px] sm:border-4 border-zinc-900 flex flex-col items-center justify-center aspect-square ${unlocked ? 'bg-[#C4B5FD] hover:scale-105 transition-transform' : 'bg-zinc-300 opacity-50 cursor-not-allowed'}`}>
                          {unlocked ? (
                            <>
                              <span className="text-3xl sm:text-4xl mb-1 sm:mb-2">{skin.icon || '👕'}</span>
                              <span className="font-black text-[10px] sm:text-xs leading-tight text-center break-words w-full px-1">{skin.name}</span>
                            </>
                          ) : (
                            <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeModal === 'rules' && (
                <div>
                  <h2 className="text-2xl sm:text-4xl font-black mb-6 uppercase tracking-tight pr-8">How to Not Lose</h2>
                  <ul className="space-y-4 font-bold text-sm sm:text-lg leading-relaxed text-zinc-800">
                    <li className="bg-white p-4 rounded-xl border-[3px] sm:border-4 border-zinc-900">1. <span className="text-[#FFA6C9]">Do NOT Google the answers.</span> We can't actually track your browser history, but Mr. U will know. He always knows.</li>
                    <li className="bg-white p-4 rounded-xl border-[3px] sm:border-4 border-zinc-900">2. <span className="text-[#A7F3D0]">Math is graded on a curve.</span> If the answer is 100 and you guess 90, you still get partial points. We aren't monsters.</li>
                    <li className="bg-white p-4 rounded-xl border-[3px] sm:border-4 border-zinc-900">3. <span className="text-[#BAE6FD]">Text requires the exact vibe.</span> Spelling counts. Don't argue with the machine.</li>
                  </ul>
                </div>
              )}

              {activeModal === 'about' && (
                <div>
                  <h2 className="text-2xl sm:text-4xl font-black mb-6 uppercase tracking-tight pr-8">What is this?</h2>
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border-[3px] sm:border-4 border-zinc-900 font-bold text-sm sm:text-lg leading-relaxed text-zinc-800 space-y-4">
                    <p>Standard trivia games are boring. They ask you things like <i>"What is the capital of France?"</i> and expect you to care.</p>
                    <p>We wanted to build a game that asks the real questions. Questions like <i>"How many holes are in a Ritz cracker?"</i></p>
                    <p>This is a game about everyday blindness and the agonizing realization that you don't actually know what a stop sign looks like.</p>
                  </div>
                </div>
              )}

              {activeModal === 'credits' && (
                <div>
                  <h2 className="text-2xl sm:text-4xl font-black mb-6 uppercase tracking-tight pr-8">Who did this?</h2>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border-[3px] sm:border-4 border-zinc-900">
                      <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs sm:text-sm mb-1">Lead Developer</p>
                      <p className="text-2xl sm:text-3xl font-black text-zinc-900">Tushar Shah <span className="text-zinc-400 text-lg sm:text-xl">(Eyrae)</span></p>
                    </div>
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border-[3px] sm:border-4 border-zinc-900">
                      <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs sm:text-sm mb-1">Mascot Design & Emotional Damage</p>
                      <p className="text-xl sm:text-2xl font-black text-zinc-900">Mr. U <span className="text-zinc-400 text-base sm:text-xl">(he is a dumbass LOL)</span></p>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'terms' && (
                <div>
                  <h2 className="text-2xl sm:text-4xl font-black mb-6 uppercase tracking-tight text-[#FFA6C9] drop-shadow-[2px_2px_0_#18181b] pr-8">The "I Agree" Trap</h2>
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border-[3px] sm:border-4 border-zinc-900 font-bold text-sm sm:text-lg leading-relaxed text-zinc-800 space-y-4 sm:space-y-6">
                    <p>1. By clicking any button on this site, you legally agree that Mr. U's opinions are absolute facts and your personal feelings on the matter are irrelevant.</p>
                    <p>2. We are not legally or financially responsible for any broken keyboards, thrown mice, or shattered egos resulting from failing simple primary school geometry questions.</p>
                    <p>3. We do not harvest your personal data. Honestly, your search history is incredibly embarrassing and we don't want to see it anyway.</p>
                    <p>4. You promise not to sue us. We have zero money. We spent our entire budget on aesthetic fonts and pastel colors.</p>
                  </div>
                </div>
              )}

              {activeModal === 'custom' && (
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black mb-6 uppercase tracking-tight pr-8">Custom Game</h2>
                  <div className="mb-6 sm:mb-8">
                    <label className="block font-bold text-zinc-600 uppercase tracking-widest text-xs sm:text-sm mb-2">Question Count: <span className="text-zinc-900 text-xl sm:text-2xl ml-2">{customQCount}</span></label>
                    <input type="range" min="1" max="500" value={customQCount} onChange={(e) => { sfx.playTick(); setCustomQCount(Number(e.target.value)); }} className="w-full h-4 bg-white border-4 border-zinc-900 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-[#FFA6C9] [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-zinc-900 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[2px_2px_0px_0px_#18181b]" />
                    <div className="flex justify-between mt-2 text-[10px] sm:text-xs font-bold text-zinc-500"><span>1 (Quick)</span><span>500 (Endless)</span></div>
                  </div>
                  <div className="mb-6 sm:mb-8">
                    <label className="block font-bold text-zinc-600 uppercase tracking-widest text-xs sm:text-sm mb-2">Select Vibe</label>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {["Normal", "Chaotic", "Sweaty", "Brainrot"].map((v) => (
                        <button key={v} onClick={() => { sfx.playPop(); setVibe(v); }} className={`px-3 sm:px-4 py-1.5 sm:py-2 border-[3px] sm:border-4 border-zinc-900 rounded-xl font-bold text-sm sm:text-base transition-all shadow-[4px_4px_0px_0px_#18181b] ${vibe === v ? 'bg-[#BAE6FD] translate-y-1 translate-x-1 shadow-none text-zinc-900' : 'bg-white hover:bg-zinc-100 text-zinc-600'}`}>{v}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <motion.button onClick={() => triggerWipe(`/play?q=${customQCount}&vibe=${vibe}`)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9, boxShadow: "0px 0px 0px 0px #18181b", y: 4, x: 4 }} className="w-full bg-zinc-900 text-white py-3 sm:py-4 rounded-2xl font-black text-xl sm:text-2xl border-4 border-zinc-900 shadow-[4px_4px_0px_0px_#18181b] sm:shadow-[6px_6px_0px_0px_#18181b] transition-all">Let's Go</motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- NEW ID CARD ONBOARDING MODAL --- */}
      <AnimatePresence>
        {showOnboarding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-zinc-900/80 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", bounce: 0.4 }} className="bg-[#E6DCC8] w-full max-w-4xl border-[3px] sm:border-8 border-zinc-900 rounded-3xl shadow-[8px_8px_0px_0px_#18181b] sm:shadow-[16px_16px_0px_0px_#18181b] flex flex-col md:flex-row overflow-hidden relative max-h-[90dvh]">
               
               {/* Mr. U Side panel */}
               <div className="bg-[#FFA6C9] p-6 sm:p-8 border-b-[3px] md:border-b-0 md:border-r-[3px] sm:border-b-4 md:border-r-4 border-zinc-900 flex flex-col items-center justify-center w-full md:w-1/3 relative shrink-0">
                  <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)] pointer-events-none" />
                  
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border-[3px] sm:border-4 border-zinc-900 px-4 py-2 sm:py-3 rounded-2xl shadow-[4px_4px_0px_0px_#18181b] relative w-full text-center mb-6 sm:mb-8 z-10">
                    <p className="font-bold text-xs sm:text-sm text-zinc-900 leading-tight">{onboardingThought}</p>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-[3px] sm:border-b-4 border-r-[3px] sm:border-r-4 border-zinc-900 transform rotate-45"></div>
                  </motion.div>

                  <svg viewBox="0 0 100 120" className="w-24 h-32 sm:w-32 sm:h-40 overflow-visible text-zinc-900 z-10">
                    <path d="M 35 85 Q 25 110 30 115" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path d="M 65 85 Q 75 110 70 115" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path d="M 20 60 Q -10 50 10 30" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path d="M 80 60 Q 100 70 90 90" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path d="M 20 40 Q 50 10 80 40 L 85 70 Q 50 95 15 70 Z" fill="#F9A8D4" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
                    <circle cx="50" cy="45" r="14" fill="white" stroke="currentColor" strokeWidth="5" />
                    <circle cx="50" cy="45" r="5" fill="currentColor" />
                    <path d="M 40 70 Q 50 78 60 70" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                  </svg>
               </div>

               {/* Form Panel */}
               <div className="p-6 sm:p-8 w-full md:w-2/3 flex flex-col gap-5 sm:gap-6 overflow-y-auto">
                  <motion.h2 variants={itemVariants} initial="hidden" animate="show" className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none">Who the hell are you?</motion.h2>

                  <motion.div variants={itemVariants} initial="hidden" animate="show" className="flex flex-col gap-2">
                     <label className="font-bold text-zinc-600 uppercase tracking-widest text-[10px] sm:text-xs">Your Alias</label>
                     <input type="text" maxLength={15} placeholder="Enter your name..." value={draftName} onChange={(e) => { sfx.playTick(); setDraftName(e.target.value); }} className="w-full bg-white border-[3px] sm:border-4 border-zinc-900 px-4 py-3 sm:py-4 rounded-xl font-black text-lg sm:text-xl shadow-[4px_4px_0px_0px_#18181b] outline-none focus:translate-y-1 focus:translate-x-1 focus:shadow-none transition-all" />
                  </motion.div>

                  <div className="flex flex-col gap-2">
                     <label className="font-bold text-zinc-600 uppercase tracking-widest text-[10px] sm:text-xs">Mugshot (PFP)</label>
                     {renderPfpPicker()}
                  </div>

                  <motion.button variants={itemVariants} initial="hidden" animate="show" onClick={handleSaveProfile} disabled={!draftName.trim()} className="mt-4 sm:mt-auto w-full bg-zinc-900 text-white py-3 sm:py-4 rounded-xl font-black text-xl sm:text-2xl border-[3px] sm:border-4 border-zinc-900 shadow-[4px_4px_0px_0px_#18181b] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                     Lock In
                  </motion.button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <FloatingAesthetics mouseX={mousePos.x} mouseY={mousePos.y} />
      <AnimatedClouds />
      <ComicStage />
      <CompanionMascot isWiping={isWiping} />

      {/* Title Section */}
      <div className="relative mb-16 sm:mb-20 text-center z-10 mt-32 md:mt-28 flex flex-col items-center">
        {/* High Score Floating Badge */}
        {userData.highestScore > 0 && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="absolute -top-12 md:-top-16 bg-[#FDE047] border-[3px] sm:border-4 border-zinc-900 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full shadow-[4px_4px_0px_0px_#18181b] z-20 font-black flex items-center gap-1.5 sm:gap-2 tracking-widest text-xs sm:text-sm whitespace-nowrap">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 fill-zinc-900" /> HIGH SCORE: {userData.highestScore}
          </motion.div>
        )}
        
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, type: "spring", bounce: 0.5 }} className="relative flex items-end justify-center text-[4.5rem] sm:text-7xl md:text-9xl font-black tracking-tighter pb-8 sm:pb-12 overflow-visible cursor-default">
          <FlickeringH /> <AnimatedU /> <FlickeringH /> <StrugglingQuestionMark />
        </motion.div>
        {splash && (
          <motion.div initial={{ opacity: 0, scale: 0.5, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: -4 }} transition={{ delay: 0.5, duration: 0.6, type: "spring", bounce: 0.6 }} className="absolute -bottom-2 right-4 md:-right-8 bg-white border-[3px] sm:border-4 border-zinc-900 px-3 sm:px-4 py-1 rounded-full shadow-[4px_4px_0px_0px_#18181b] z-20">
            <p className="text-xs sm:text-sm md:text-base text-zinc-900 font-bold whitespace-nowrap">{splash}</p>
          </motion.div>
        )}
      </div>

      {/* Game Modes Menu */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6, staggerChildren: 0.1 }} className="flex flex-col gap-4 sm:gap-5 w-[90%] sm:w-full max-w-sm z-20 relative">
        <motion.button onClick={() => triggerWipe("/play?q=10")} whileHover={{ scale: 1.03, rotate: -1 }} whileTap={{ scale: 0.9, boxShadow: "0px 0px 0px 0px #18181b", x: 4, y: 4 }} className="group flex items-center justify-between w-full bg-[#FFA6C9] border-[3px] sm:border-4 border-zinc-900 text-zinc-900 px-5 sm:px-6 py-4 rounded-2xl font-black text-lg sm:text-xl shadow-[4px_4px_0px_0px_#18181b] sm:shadow-[6px_6px_0px_0px_#18181b] transition-all cursor-pointer">
          <span>Play 10 Questions</span>
          <AnimatedPlayIcon />
        </motion.button>
        
        <motion.button onClick={() => triggerWipe("/play?q=20")} whileHover={{ scale: 1.03, rotate: 1 }} whileTap={{ scale: 0.9, boxShadow: "0px 0px 0px 0px #18181b", x: 4, y: 4 }} className="group flex items-center justify-between w-full bg-[#A7F3D0] border-[3px] sm:border-4 border-zinc-900 text-zinc-900 px-5 sm:px-6 py-4 rounded-2xl font-black text-lg sm:text-xl shadow-[4px_4px_0px_0px_#18181b] sm:shadow-[6px_6px_0px_0px_#18181b] transition-all cursor-pointer">
          <span>Play 20 Questions</span>
          <AnimatedDiceIcon />
        </motion.button>
        
        <motion.button onClick={() => openModal('custom')} whileHover={{ scale: 1.03, rotate: -1 }} whileTap={{ scale: 0.9, boxShadow: "0px 0px 0px 0px #18181b", x: 4, y: 4 }} className="group flex items-center justify-between w-full bg-[#BAE6FD] border-[3px] sm:border-4 border-zinc-900 text-zinc-900 px-5 sm:px-6 py-4 rounded-2xl font-black text-lg sm:text-xl shadow-[4px_4px_0px_0px_#18181b] sm:shadow-[6px_6px_0px_0px_#18181b] transition-all cursor-pointer">
          <span>Custom Round</span>
          <AnimatedSlidersIcon />
        </motion.button>
        
        {/* MULTIPLAYER BUTTON */}
        <motion.div 
          onHoverStart={() => setMultiplayerShake(true)} onHoverEnd={() => setMultiplayerShake(false)} onClick={handleMultiplayerClick}
          animate={multiplayerShake ? { x: [-5, 5, -5, 5, 0] } : {}} transition={{ duration: 0.4 }}
          className="relative w-full cursor-pointer rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#18181b] sm:shadow-[6px_6px_0px_0px_#18181b] border-[3px] sm:border-4 border-zinc-900 bg-zinc-400"
        >
          <div className="absolute inset-0 opacity-[0.15] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#18181b_10px,#18181b_20px)] pointer-events-none"></div>
          <motion.button whileTap={{ scale: 0.98 }} className="w-full px-4 sm:px-5 py-3 sm:py-4 font-black flex items-center justify-between relative z-10">
            <div className="bg-white border-[3px] sm:border-4 border-zinc-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-[4px_4px_0px_0px_#18181b] flex items-center gap-2 transform -rotate-2">
              <span className="text-zinc-900 text-base sm:text-lg whitespace-nowrap">Multiplayer Room</span>
            </div>
            <motion.div animate={multiplayerShake ? { rotate: [-15, 15, -15, 15, 0], y: [-4, 4, -4, 4, 0] } : {}} className="bg-[#A7F3D0] border-[3px] sm:border-4 border-zinc-900 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_#18181b] relative rotate-6 shrink-0">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-900 fill-zinc-900" />
              <div className="absolute -top-4 sm:-top-5 w-6 h-6 sm:w-8 sm:h-8 border-[3px] sm:border-4 border-b-0 border-zinc-900 rounded-t-full rounded-b-none" />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* MULTIPLAYER LOCKED TOAST */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div initial={{ opacity: 0, scale: 2, y: -100, rotate: 15 }} animate={{ opacity: 1, scale: 1, y: 0, rotate: -5 }} exit={{ opacity: 0, scale: 0.8, y: -20, transition: { duration: 0.2 } }} transition={{ type: "spring", damping: 10, stiffness: 100 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none w-[90%] max-w-max">
            <div className="bg-[#FDE047] border-[3px] sm:border-8 border-zinc-900 px-6 sm:px-10 py-5 sm:py-8 rounded-3xl shadow-[8px_8px_0px_0px_#18181b] sm:shadow-[16px_16px_0px_0px_#18181b] flex flex-col items-center">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-zinc-900 uppercase text-center leading-tight">Coming Soon!</h2>
              <p className="text-sm sm:text-xl font-bold text-zinc-700 text-center mt-2">I gotta learn WebSockets first.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}