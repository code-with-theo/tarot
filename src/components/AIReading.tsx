'use client';

import { motion } from 'framer-motion';
import { DrawnCard } from '@/types/tarot';

interface AIReadingProps {
  reading: string;
  isLoading: boolean;
  cards: DrawnCard[];
}

export default function AIReading({ reading, isLoading, cards }: AIReadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm rounded-2xl border border-yellow-400/20 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
            <span className="text-xl">✧</span>
          </div>
          <div>
            <h2 className="text-yellow-200 text-lg font-medium tracking-wide">AI 解牌</h2>
            <p className="text-slate-500 text-xs">心理学与神秘学的融合解读</p>
          </div>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {cards.map((card) => (
            <div 
              key={card.id}
              className="px-3 py-1.5 bg-slate-800/50 rounded-full border border-slate-700 text-xs"
            >
              <span className="text-yellow-200">{card.name}</span>
              <span className={`ml-1.5 ${card.isReversed ? 'text-red-400' : 'text-emerald-400'}`}>
                {card.isReversed ? '逆' : '正'}
              </span>
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <motion.div
              className="w-6 h-6 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <span className="ml-3 text-slate-400 text-sm">正在解读牌面...</span>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-300 leading-relaxed text-sm md:text-base"
          >
            {reading.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
