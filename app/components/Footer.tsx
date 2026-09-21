"use client";

import { motion } from "framer-motion";

// Custom animated Coffee Cup for Ko-fi
const AnimatedCoffee = () => (
  <svg viewBox="0 0 100 100" className="w-6 h-6 inline-block overflow-visible">
    <motion.path 
      d="M 35 25 Q 45 15 35 5" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round"
      animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    />
    <motion.path 
      d="M 65 25 Q 55 15 65 5" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round"
      animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
      // FIX: Moved delay inside the transition block here!
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
    />
    <path d="M 20 30 L 80 30 L 70 80 Q 50 90 30 80 Z" fill="white" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
    <path d="M 80 40 L 90 40 Q 95 50 85 60 L 75 60" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

// Custom animated Envelope for Email
const AnimatedMail = () => (
  <svg viewBox="0 0 100 100" className="w-6 h-6 inline-block overflow-visible">
    <path d="M 10 30 L 90 30 L 90 80 L 10 80 Z" fill="white" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
    <motion.path 
      d="M 10 30 L 50 60 L 90 30" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round"
      animate={{ y: [0, 2, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    />
  </svg>
);

// Custom animated Cursor for Portfolio
const AnimatedCursor = () => (
  <svg viewBox="0 0 100 100" className="w-6 h-6 inline-block overflow-visible">
    <motion.path 
      d="M 30 20 L 70 80 L 50 80 L 45 100 Z" fill="white" stroke="currentColor" strokeWidth="6" strokeLinejoin="round"
      animate={{ rotate: [-5, 10, -5], scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
    />
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full bg-[#C4B5FD] border-t-8 border-zinc-900 text-zinc-900 py-8 px-6 mt-auto relative z-20 overflow-hidden">
      
      {/* Goofy rolling decorative background lines */}
      <motion.div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 20px)' }}
        animate={{ x: [0, 20], y: [0, 20] }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Sarcasm Section */}
        <div className="text-center md:text-left flex-1">
          <p className="font-black text-xl mb-1">Built by Tushar Shah.</p>
          <p className="font-bold text-sm opacity-80">
            If you get a score of zero, that's entirely a skill issue. Don't blame the code.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a 
            href="mailto:contact.tusharshah@gmail.com"
            whileHover={{ scale: 1.05, rotate: -3 }}
            whileTap={{ scale: 0.95, boxShadow: "0px 0px 0px 0px #18181b", x: 4, y: 4 }}
            className="flex items-center gap-2 bg-white border-4 border-zinc-900 px-4 py-2 rounded-xl font-bold shadow-[4px_4px_0px_0px_#18181b] transition-colors hover:bg-zinc-100"
          >
            <AnimatedMail />
            <span className="hidden sm:inline">Complain Here</span>
          </motion.a>

          <motion.a 
            href="https://eyrae.in" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05, rotate: 3 }}
            whileTap={{ scale: 0.95, boxShadow: "0px 0px 0px 0px #18181b", x: 4, y: 4 }}
            className="flex items-center gap-2 bg-white border-4 border-zinc-900 px-4 py-2 rounded-xl font-bold shadow-[4px_4px_0px_0px_#18181b] transition-colors hover:bg-zinc-100"
          >
            <AnimatedCursor />
            <span className="hidden sm:inline">My Stuff</span>
          </motion.a>

          <motion.a 
            href="https://ko-fi.com/eyrae" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95, boxShadow: "0px 0px 0px 0px #18181b", x: 4, y: 4 }}
            className="flex items-center gap-2 bg-[#FDE047] border-4 border-zinc-900 px-4 py-2 rounded-xl font-bold shadow-[4px_4px_0px_0px_#18181b] transition-colors hover:bg-[#facc15]"
          >
            <AnimatedCoffee />
            <span className="hidden sm:inline">Fund my caffeine</span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}