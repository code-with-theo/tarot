'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardDeck from '@/components/CardDeck';
import SpreadDeck from '@/components/SpreadDeck';
import TarotCardComponent from '@/components/TarotCard';
import AIReading from '@/components/AIReading';
import SettingsModal from '@/components/SettingsModal';
import { useTarotDeck } from '@/hooks/useTarotDeck';

type GamePhase = 'idle' | 'shuffling' | 'selecting' | 'revealing' | 'reading';

const STORAGE_KEY_API = 'tarot_api_key';
const STORAGE_KEY_PROVIDER = 'tarot_api_provider';

interface Card {
  id: number;
  name: string;
  isReversed: boolean;
  meaning_up: string;
  meaning_rev: string;
  image_url: string;
}

async function callOpenAI(cards: Card[], apiKey: string): Promise<string> {
  const cardDescriptions = cards.map((card, index) => {
    const position = index === 0 ? '过去' : index === 1 ? '现在' : '未来';
    const meaning = card.isReversed ? card.meaning_rev : card.meaning_up;
    return `${position}: ${card.name} (${card.isReversed ? '逆位' : '正位'}) - ${meaning}`;
  }).join('\n');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `你是一位专业的塔罗牌占卜师，擅长用温暖、神秘且富有洞察力的语言解读塔罗牌。你的解读应该：
1. 深入分析每张牌在对应位置的含义
2. 将三张牌联系起来，讲述一个连贯的故事
3. 给出实用且有启发性的建议
4. 语言要优美、神秘，但不要过于晦涩
5. 保持积极正面的态度，即使是不太好的牌也要给出建设性的解读
6. 回复使用中文，格式清晰，使用markdown格式`
        },
        {
          role: 'user',
          content: `请为我解读以下三张塔罗牌（三张牌无牌阵）：

${cardDescriptions}

请从过去、现在、未来三个维度进行解读，并给出整体建议。`
        }
      ],
      temperature: 0.8,
      max_tokens: 1500
    })
  });

  if (!response.ok) {
    throw new Error('OpenAI API请求失败，请检查密钥是否正确');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callGemini(cards: Card[], apiKey: string): Promise<string> {
  const cardDescriptions = cards.map((card, index) => {
    const position = index === 0 ? '过去' : index === 1 ? '现在' : '未来';
    const meaning = card.isReversed ? card.meaning_rev : card.meaning_up;
    return `${position}: ${card.name} (${card.isReversed ? '逆位' : '正位'}) - ${meaning}`;
  }).join('\n');

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `你是一位专业的塔罗牌占卜师，擅长用温暖、神秘且富有洞察力的语言解读塔罗牌。你的解读应该：
1. 深入分析每张牌在对应位置的含义
2. 将三张牌联系起来，讲述一个连贯的故事
3. 给出实用且有启发性的建议
4. 语言要优美、神秘，但不要过于晦涩
5. 保持积极正面的态度，即使是不太好的牌也要给出建设性的解读
6. 回复使用中文，格式清晰，使用markdown格式

请为我解读以下三张塔罗牌（三张牌无牌阵）：

${cardDescriptions}

请从过去、现在、未来三个维度进行解读，并给出整体建议。`
        }]
      }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1500
      }
    })
  });

  if (!response.ok) {
    throw new Error('Gemini API请求失败，请检查密钥是否正确');
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

export default function Home() {
  const { 
    shuffledDeck,
    selectedCards, 
    isShuffling, 
    shuffleProgress, 
    shuffleDeck,
    selectCard,
    resetDeck,
    canSelect,
    maxSelections
  } = useTarotDeck();
  
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [phase, setPhase] = useState<GamePhase>('idle');
  const [aiReading, setAiReading] = useState<string>('');
  const [isLoadingReading, setIsLoadingReading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiProvider, setApiProvider] = useState<'openai' | 'gemini'>('openai');

  useEffect(() => {
    const savedKey = localStorage.getItem(STORAGE_KEY_API) || '';
    const savedProvider = (localStorage.getItem(STORAGE_KEY_PROVIDER) as 'openai' | 'gemini') || 'openai';
    setApiKey(savedKey);
    setApiProvider(savedProvider);
  }, []);

  const handleSaveSettings = useCallback((key: string, provider: 'openai' | 'gemini') => {
    setApiKey(key);
    setApiProvider(provider);
    localStorage.setItem(STORAGE_KEY_API, key);
    localStorage.setItem(STORAGE_KEY_PROVIDER, provider);
  }, []);

  const handleStartShuffle = useCallback(async () => {
    setPhase('shuffling');
    setFlippedCards(new Set());
    setAiReading('');
    await shuffleDeck();
    setPhase('selecting');
  }, [shuffleDeck]);

  const handleSelectCard = useCallback((cardId: number) => {
    selectCard(cardId);
    if (selectedCards.length + 1 >= maxSelections) {
      setTimeout(() => setPhase('revealing'), 500);
    }
  }, [selectCard, selectedCards.length, maxSelections]);

  const handleFlip = useCallback((id: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const handleReset = useCallback(() => {
    resetDeck();
    setFlippedCards(new Set());
    setPhase('idle');
    setAiReading('');
  }, [resetDeck]);

  const handleGetReading = useCallback(async () => {
    if (flippedCards.size < 3) return;
    
    if (!apiKey) {
      setShowSettings(true);
      return;
    }
    
    setIsLoadingReading(true);
    setPhase('reading');
    
    try {
      let reading: string;
      if (apiProvider === 'openai') {
        reading = await callOpenAI(selectedCards, apiKey);
      } else {
        reading = await callGemini(selectedCards, apiKey);
      }
      setAiReading(reading);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '解牌服务暂时不可用，请检查API密钥是否正确';
      setAiReading(`❌ ${errorMessage}`);
    } finally {
      setIsLoadingReading(false);
    }
  }, [flippedCards.size, selectedCards, apiKey, apiProvider]);

  const allFlipped = flippedCards.size === 3;
  const selectedIds = selectedCards.map(c => c.id);

  return (
    <main className="min-h-screen bg-[#0f172a] overflow-x-hidden">
      <div className="relative min-h-screen pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
        
        <div className="relative container mx-auto px-4 py-8">
          <motion.header 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center items-center gap-4 mb-3">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-200 bg-clip-text text-transparent tracking-wide">
                神秘塔罗牌
              </h1>
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-yellow-200 transition-all"
                title="API 设置"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            <p className="text-slate-400 text-base tracking-wider">
              探索命运的神秘之旅
            </p>
            {apiKey && (
              <p className="text-slate-500 text-xs mt-1">
                已配置 {apiProvider === 'openai' ? 'OpenAI' : 'Gemini'} API
              </p>
            )}
          </motion.header>

          <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
              {phase === 'idle' && (
                <motion.div key="idle" className="flex flex-col items-center gap-8">
                  <CardDeck
                    isShuffling={false}
                    shuffleProgress={0}
                    canDraw={false}
                    onDraw={() => {}}
                    cardsRemaining={78}
                  />
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={handleStartShuffle}
                    className="px-10 py-4 bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-700 hover:to-indigo-700 text-yellow-200 rounded-full text-lg font-medium tracking-widest border border-yellow-400/30 shadow-lg shadow-purple-900/50 transition-all duration-300 hover:scale-105 hover:shadow-purple-700/50"
                  >
                    ✦ 开始洗牌 ✦
                  </motion.button>
                </motion.div>
              )}

              {phase === 'shuffling' && (
                <motion.div key="shuffling" className="flex flex-col items-center">
                  <CardDeck
                    isShuffling={isShuffling}
                    shuffleProgress={shuffleProgress}
                    canDraw={false}
                    onDraw={() => {}}
                    cardsRemaining={78}
                  />
                </motion.div>
              )}

              {phase === 'selecting' && (
                <motion.div 
                  key="selecting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <div className="text-center mb-4">
                    <p className="text-yellow-200/80 text-lg mb-2">
                      请选择 {maxSelections} 张牌
                    </p>
                    <p className="text-slate-400 text-sm">
                      已选择: {selectedCards.length} / {maxSelections}
                    </p>
                  </div>
                  
                  <SpreadDeck 
                    deck={shuffledDeck}
                    selectedIds={selectedIds}
                    onSelect={handleSelectCard}
                    canSelect={canSelect}
                  />

                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 rounded-full text-sm font-medium tracking-wider border border-slate-700 transition-all duration-300 hover:scale-105"
                    >
                      返回首页
                    </button>
                  </div>
                </motion.div>
              )}

              {phase === 'revealing' && (
                <motion.div
                  key="revealing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full"
                >
                  <p className="text-center text-slate-400 text-sm mb-8 tracking-wide">
                    三张牌无牌阵 · 点击卡牌翻转查看含义
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8">
                    {selectedCards.map((card, index) => (
                      <div key={card.id} className="flex flex-col items-center">
                        <span className="text-slate-500 text-xs mb-3 tracking-widest uppercase">
                          {index === 0 ? '过去' : index === 1 ? '现在' : '未来'}
                        </span>
                        <TarotCardComponent
                          card={card}
                          isFlipped={flippedCards.has(card.id)}
                          onFlip={() => handleFlip(card.id)}
                          index={index}
                          isDrawn={true}
                        />
                      </div>
                    ))}
                  </div>

                  <motion.div 
                    className="flex flex-col items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {allFlipped && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={handleGetReading}
                        disabled={isLoadingReading}
                        className="px-8 py-3 bg-gradient-to-r from-amber-700 to-yellow-700 hover:from-amber-600 hover:to-yellow-600 text-yellow-100 rounded-full text-base font-medium tracking-wider border border-yellow-400/40 shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
                      >
                        {isLoadingReading ? '解牌中...' : '✦ AI 解牌 ✦'}
                      </motion.button>
                    )}
                    
                    <div className="flex gap-3">
                      <button
                        onClick={handleStartShuffle}
                        className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full text-sm font-medium tracking-wider border border-slate-600 transition-all duration-300 hover:scale-105"
                      >
                        重新抽牌
                      </button>
                      <button
                        onClick={handleReset}
                        className="px-5 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 rounded-full text-sm font-medium tracking-wider border border-slate-700 transition-all duration-300 hover:scale-105"
                      >
                        返回首页
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {phase === 'reading' && (
                <motion.div
                  key="reading"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-2xl"
                >
                  <AIReading 
                    reading={aiReading} 
                    isLoading={isLoadingReading}
                    cards={selectedCards}
                  />
                  
                  <div className="flex justify-center gap-3 mt-8">
                    <button
                      onClick={handleStartShuffle}
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full text-sm font-medium tracking-wider border border-slate-600 transition-all duration-300 hover:scale-105"
                    >
                      重新抽牌
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 rounded-full text-sm font-medium tracking-wider border border-slate-700 transition-all duration-300 hover:scale-105"
                    >
                      返回首页
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <footer className="fixed bottom-0 left-0 right-0 text-center py-4 bg-[#0f172a]/80 backdrop-blur-sm text-slate-600 text-sm border-t border-slate-800">
          <p>✦ 命运掌握在自己手中 ✦</p>
        </footer>
      </div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSaveSettings}
        currentKey={apiKey}
        currentProvider={apiProvider}
      />
    </main>
  );
}
