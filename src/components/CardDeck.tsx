'use client';

import { motion, Variants } from 'framer-motion';

interface CardDeckProps {
  isShuffling: boolean;
  shuffleProgress: number;
  canDraw: boolean;
  onDraw: () => void;
  cardsRemaining: number;
}

export default function CardDeck({ 
  isShuffling, 
  shuffleProgress, 
  canDraw, 
  onDraw,
  cardsRemaining 
}: CardDeckProps) {
  const deckVariants: Variants = {
    idle: { 
      y: 0,
      rotate: 0,
    },
    shuffling: {
      y: [0, -10, 0, 10, 0],
      rotate: [0, -2, 0, 2, 0],
      transition: {
        duration: 0.4,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1]
      }
    }
  };

  const cardVariants: Variants = {
    idle: (i: number) => ({
      y: i * -2,
      x: 0,
      rotate: 0,
      scale: 1,
    }),
    shuffling: (i: number) => ({
      y: i * -2,
      x: [0, (i % 2 === 0 ? 30 : -30), 0],
      rotate: [0, (i % 2 === 0 ? 15 : -15), 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        delay: i * 0.05,
        ease: [0.42, 0, 0.58, 1]
      }
    })
  };

  const visibleCards = Math.min(15, cardsRemaining);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative w-36 h-52"
        variants={deckVariants}
        animate={isShuffling ? 'shuffling' : 'idle'}
        onClick={canDraw && !isShuffling ? onDraw : undefined}
        style={{ pointerEvents: canDraw && !isShuffling ? 'auto' : 'none' }}
      >
        {Array.from({ length: visibleCards }).map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            animate={isShuffling ? 'shuffling' : 'idle'}
            className="absolute top-0 left-0"
            style={{
              zIndex: i,
            }}
          >
            <div 
              className="w-36 h-52 rounded-xl bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 border-2 border-yellow-400/40 shadow-xl"
              style={{
                boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl mb-1">✦</div>
                  <div className="text-yellow-200/80 text-xs tracking-[0.2em] font-light">TAROT</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {isShuffling && (
        <motion.div 
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-48 h-1 bg-slate-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-200"
              initial={{ width: 0 }}
              animate={{ width: `${shuffleProgress * 100}%` }}
            />
          </div>
          <p className="text-yellow-200/60 text-sm mt-2 tracking-widest">洗牌中...</p>
        </motion.div>
      )}

      {canDraw && !isShuffling && (
        <motion.p 
          className="mt-6 text-yellow-200/60 text-sm tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          点击牌堆抽牌
        </motion.p>
      )}
    </div>
  );
}
