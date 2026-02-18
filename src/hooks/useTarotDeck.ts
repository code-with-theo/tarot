'use client';

import { useState, useCallback, useRef } from 'react';
import { TarotCard, DrawnCard } from '@/types/tarot';
import { tarotCards } from '@/data/tarot-cards';

interface UseTarotDeckReturn {
  shuffledDeck: TarotCard[];
  selectedCards: DrawnCard[];
  isShuffling: boolean;
  shuffleProgress: number;
  shuffleDeck: () => Promise<void>;
  selectCard: (cardId: number) => void;
  resetDeck: () => void;
  canSelect: boolean;
  maxSelections: number;
}

function fisherYatesShuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function useTarotDeck(): UseTarotDeckReturn {
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<DrawnCard[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleProgress, setShuffleProgress] = useState(0);
  const [canSelect, setCanSelect] = useState(false);
  const shuffledDeckRef = useRef<TarotCard[]>([]);
  const maxSelections = 3;

  const shuffleDeck = useCallback(async () => {
    setIsShuffling(true);
    setShuffleProgress(0);
    setSelectedCards([]);
    setShuffledDeck([]);
    setCanSelect(false);

    const totalSteps = 10;
    
    for (let step = 1; step <= totalSteps; step++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setShuffleProgress(step / totalSteps);
      shuffledDeckRef.current = fisherYatesShuffle(tarotCards);
    }

    setShuffledDeck(shuffledDeckRef.current);
    setIsShuffling(false);
    setCanSelect(true);
  }, []);

  const selectCard = useCallback((cardId: number) => {
    if (selectedCards.length >= maxSelections) return;
    if (selectedCards.some(c => c.id === cardId)) return;

    const card = shuffledDeckRef.current.find(c => c.id === cardId);
    if (!card) return;

    const drawnCard: DrawnCard = {
      ...card,
      isReversed: Math.random() > 0.5
    };

    setSelectedCards(prev => [...prev, drawnCard]);
    
    if (selectedCards.length + 1 >= maxSelections) {
      setCanSelect(false);
    }
  }, [selectedCards.length]);

  const resetDeck = useCallback(() => {
    setShuffledDeck([]);
    setSelectedCards([]);
    setShuffleProgress(0);
    setCanSelect(false);
    shuffledDeckRef.current = [];
  }, []);

  return {
    shuffledDeck,
    selectedCards,
    isShuffling,
    shuffleProgress,
    shuffleDeck,
    selectCard,
    resetDeck,
    canSelect,
    maxSelections
  };
}
