'use client';

import { TarotCard } from '@/types/tarot';

interface SpreadDeckProps {
  deck: TarotCard[];
  selectedIds: number[];
  onSelect: (id: number) => void;
  canSelect: boolean;
}

export default function SpreadDeck({ deck, selectedIds, onSelect, canSelect }: SpreadDeckProps) {
  const cardsPerRow = 13;
  const rows = Math.ceil(deck.length / cardsPerRow);

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-max px-4">
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const startIdx = rowIndex * cardsPerRow;
          const rowCards = deck.slice(startIdx, startIdx + cardsPerRow);
          
          return (
            <div key={rowIndex} className="flex justify-center gap-1 mb-1">
              {rowCards.map((card) => {
                const isSelected = selectedIds.includes(card.id);
                
                return (
                  <div
                    key={card.id}
                    onClick={() => canSelect && !isSelected && onSelect(card.id)}
                    className={`relative cursor-pointer transition-all duration-200 ${
                      isSelected ? 'opacity-30 cursor-not-allowed scale-90' : 'hover:scale-110 hover:-translate-y-2'
                    }`}
                    style={{ 
                      zIndex: isSelected ? 0 : 1,
                    }}
                  >
                    <div 
                      className="w-12 h-16 md:w-14 md:h-20 rounded bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 border border-yellow-400/30 shadow-lg flex items-center justify-center"
                      style={{
                        boxShadow: isSelected 
                          ? 'none' 
                          : '0 2px 8px rgba(139, 92, 246, 0.3)'
                      }}
                    >
                      <div className="text-center">
                        <div className="text-xs text-yellow-200/60">✦</div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-green-400 text-lg">✓</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
