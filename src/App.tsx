/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, MoveRight } from 'lucide-react';

// --- Sub-components ---

const Particle = ({ delay, x, size }: { delay: number; x: string; size: number; key?: React.Key }) => (
  <motion.div
    initial={{ y: '110vh', opacity: 0, scale: 0 }}
    animate={{ 
      y: '-10vh', 
      opacity: [0, 0.5, 0.5, 0],
      scale: [1, 1.1, 0.9, 1]
    }}
    transition={{ 
      duration: 12 + Math.random() * 8, 
      repeat: Infinity, 
      delay,
      ease: "linear"
    }}
    className="absolute bg-brand-blue pointer-events-none rounded-full"
    style={{ left: x, width: size, height: size }}
  />
);

const HumbleCharacter = ({ isBowing, isWalkComplete }: { isBowing: boolean; isWalkComplete: boolean }) => {
  return (
    <div className="relative w-48 h-56 mx-auto flex items-end justify-center mb-4">
      {/* Shadow */}
      <motion.div 
        animate={{ scaleX: isWalkComplete ? 1 : [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: isWalkComplete ? 0 : Infinity }}
        className="absolute bottom-4 w-20 h-2.5 bg-black/5 rounded-[100%] blur-xs" 
      />
      
      {/* Character body */}
      <motion.div
        animate={
          isBowing 
            ? { rotate: 15, y: 8 } 
            : isWalkComplete 
              ? { rotate: 0, y: [0, -3, 0] } 
              : { rotate: [0, -2, 2, 0], y: [0, -8, 0] }
        }
        transition={
          isBowing 
            ? { type: "spring", stiffness: 80 } 
            : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
        }
        className="relative z-10 origin-bottom"
      >
        {/* Simple Body Rect */}
        <div className="w-16 h-20 bg-brand-accent rounded-t-[30px] rounded-b-[10px] relative shadow-sm" />

        {/* Head */}
        <motion.div 
          animate={isBowing ? { rotate: 40, y: 12 } : { rotate: isWalkComplete ? 2 : 0 }}
          className="absolute -top-12 left-1/2 -ml-6.5 w-13 h-13 bg-brand-accent rounded-full border border-black/5 flex flex-col items-center justify-center origin-bottom shadow-xs"
        >
          {/* Eyebrows */}
          <div className="flex gap-2.5 -mt-1.5 mb-1 opacity-40">
            <motion.div 
              animate={isBowing ? { rotate: -15, y: 0.5 } : { rotate: -8 }}
              className="w-2.5 h-0.5 bg-brand-text rounded-full" 
            />
            <motion.div 
              animate={isBowing ? { rotate: 15, y: 0.5 } : { rotate: 8 }}
              className="w-2.5 h-0.5 bg-brand-text rounded-full" 
            />
          </div>
          
          {/* Eyes */}
          <div className="flex gap-2.5 opacity-30">
            <motion.div 
              animate={isBowing ? { height: 1, scaleY: 0.5 } : { height: 3.5 }}
              className="w-1 h-1 bg-brand-text rounded-full" 
            />
            <motion.div 
              animate={isBowing ? { height: 1, scaleY: 0.5 } : { height: 3.5 }}
              className="w-1 h-1 bg-brand-text rounded-full" 
            />
          </div>
          
          {/* Mouth */}
          <div className="mt-1 w-2.5 h-1 border-t border-brand-text/40 rounded-[100%]" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isBowing, setIsBowing] = useState(false);
  const [isWalkComplete, setIsWalkComplete] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "I am truly sorry for my words and my anger.",
    "I hurt you, and I take full responsibility.",
    "You didn’t deserve that, no matter what.",
    "I regret speaking badly to you. That is not the person I want to be.",
    "I promise I am working on controlling my anger and becoming calm and respectful.",
    "This is not just an apology, it’s a commitment to change."
  ];

  useEffect(() => {
    // Start with a walking animation
    const walkTimer = setTimeout(() => {
      setIsWalkComplete(true);
    }, 4000);

    return () => clearTimeout(walkTimer);
  }, []);

  const handleExtraApology = () => {
    setIsBowing(true);
    setTimeout(() => {
      setIsBowing(false);
    }, 2000);
  };

  const nextMessage = () => {
    if (messageIndex < messages.length - 1) {
      setMessageIndex(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-brand-bg flex flex-col items-center justify-center p-4">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <Particle 
            key={i} 
            delay={i * 2.5} 
            x={`${Math.random() * 100}%`} 
            size={8 + Math.random() * 12} 
          />
        ))}
      </div>

      <main className="relative z-10 w-full max-w-[600px] h-[768px] flex flex-col justify-between items-center text-center p-10 bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#fdfaf7_100%)] shadow-xl rounded-3xl overflow-hidden border border-brand-accent/30">
        
        {/* Character Stage */}
        <div className="mt-5 w-full">
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 3.5, ease: "easeOut" }}
          >
            <HumbleCharacter isBowing={isBowing} isWalkComplete={isWalkComplete} />
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="flex-grow flex flex-col justify-center px-5 gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <p className={`font-serif italic leading-relaxed text-brand-text ${messageIndex === 0 ? 'text-[1.4rem] font-medium not-italic text-slate-800' : 'text-lg opacity-90'}`}>
                "{messages[messageIndex]}"
              </p>
              
              {messageIndex === messages.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 space-y-4"
                >
                  <div className="text-[0.9rem] font-sans uppercase tracking-[2px] text-brand-muted">
                    Commitment to Change
                  </div>
                  <p className="font-serif italic text-base opacity-70 leading-relaxed max-w-sm mx-auto">
                    "I understand if you need time or space. I will respect your feelings."
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Actions Section */}
        <div className="w-full flex flex-col items-center gap-6 mb-10">
          {messageIndex < messages.length - 1 ? (
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextMessage}
              className="flex items-center gap-2 text-brand-muted hover:text-brand-text transition-colors py-2.5 px-6 rounded-full border border-brand-accent bg-white shadow-xs text-sm"
            >
              <span>Read more</span>
              <MoveRight size={16} />
            </motion.button>
          ) : (
            <div className="space-y-6 w-full flex flex-col items-center">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 6px 15px rgba(0,0,0,0.05)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExtraApology}
                className="bg-white border border-brand-accent text-brand-text py-3.5 px-10 rounded-full shadow-xs transition-all text-base font-medium"
              >
                I am truly sorry
              </motion.button>
              
              <div className="text-[0.85rem] text-brand-muted italic">
                No pressure. Just honesty.
              </div>
            </div>
          )}
        </div>

        {/* Status indicator for bow */}
        <AnimatePresence>
          {isBowing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 0.6, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 text-xs tracking-widest uppercase text-brand-muted font-light"
            >
              I will do better.
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating accents */}
      <div className="fixed top-20 right-[15%] text-brand-blue/30 -rotate-12 animate-pulse">
        <Sparkles size={32} />
      </div>
      <div className="fixed bottom-20 left-[10%] text-brand-blue/20 rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }}>
        <Sparkles size={48} />
      </div>
    </div>
  );
}
