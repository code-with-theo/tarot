'use client';

import { motion } from 'framer-motion';
import { DrawnCard } from '@/types/tarot';

interface TarotCardProps {
  card: DrawnCard;
  isFlipped: boolean;
  onFlip: () => void;
  index: number;
  isDrawn: boolean;
}

export default function TarotCardComponent({ 
  card, 
  isFlipped, 
  onFlip, 
  index,
  isDrawn 
}: TarotCardProps) {
  return (
    <motion.div
      className="perspective-1000 cursor-pointer"
      initial={{ 
        opacity: 0, 
        y: -200,
        x: 0,
        rotate: 0,
        scale: 0.5
      }}
      animate={isDrawn ? {
        opacity: 1,
        y: 0,
        x: 0,
        rotate: 0,
        scale: 1,
      } : {
        opacity: 0,
        y: -200,
        scale: 0.5
      }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.3,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      onClick={onFlip}
    >
      <motion.div
        className="relative w-40 h-56 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
      >
        <div className="absolute inset-0 backface-hidden">
          <div 
            className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 border-2 border-yellow-400/40 shadow-xl flex items-center justify-center"
            style={{
              boxShadow: '0 10px 40px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="text-center p-4">
              <div className="text-4xl mb-2">✦</div>
              <div className="text-yellow-200/80 text-xs tracking-[0.2em] font-light">TAROT</div>
              <div className="mt-4 w-14 h-18 mx-auto border border-yellow-400/20 rounded flex items-center justify-center">
                <span className="text-yellow-400/40 text-xl">?</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div 
            className={`w-full h-full rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-yellow-400/40 shadow-xl overflow-hidden ${card.isReversed ? 'rotate-180' : ''}`}
            style={{
              boxShadow: '0 10px 40px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="p-2 h-full flex flex-col">
              <div className="flex-1 relative rounded-lg mb-2 overflow-hidden bg-gradient-to-b from-indigo-800/30 to-purple-900/30">
                <img
                  src={card.image_url}
                  alt={card.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <h3 className="text-yellow-200 font-medium text-xs mb-1 truncate">{card.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  card.isReversed 
                    ? 'bg-red-900/60 text-red-200 border border-red-500/30' 
                    : 'bg-emerald-900/60 text-emerald-200 border border-emerald-500/30'
                }`}>
                  {card.isReversed ? '逆位' : '正位'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4 p-4 bg-slate-900/90 backdrop-blur-sm rounded-lg border border-yellow-400/20 w-40"
        >
          <p className="text-xs text-slate-300 leading-relaxed">
            {card.isReversed ? card.meaning_rev : card.meaning_up}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
