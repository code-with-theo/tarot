export interface TarotCard {
  id: number;
  name: string;
  meaning_up: string;
  meaning_rev: string;
  image_url: string;
}

export interface DrawnCard extends TarotCard {
  isReversed: boolean;
}

export type CardSuite = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';
