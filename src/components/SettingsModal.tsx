'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string, provider: 'openai' | 'gemini') => void;
  currentKey: string;
  currentProvider: 'openai' | 'gemini';
}

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  onSave, 
  currentKey, 
  currentProvider 
}: SettingsModalProps) {
  const [apiKey, setApiKey] = useState(currentKey);
  const [provider, setProvider] = useState<'openai' | 'gemini'>(currentProvider);

  useEffect(() => {
    setApiKey(currentKey);
    setProvider(currentProvider);
  }, [currentKey, currentProvider]);

  const handleSave = () => {
    onSave(apiKey, provider);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-yellow-200 mb-4 flex items-center gap-2">
              <span>⚙️</span> API 设置
            </h2>
            
            <p className="text-slate-400 text-sm mb-4">
              输入你自己的 API 密钥来启用 AI 解牌功能。密钥将保存在本地浏览器中。
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2">
                  AI 服务商
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setProvider('openai')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      provider === 'openai'
                        ? 'bg-purple-700 text-white border border-purple-500'
                        : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    OpenAI
                  </button>
                  <button
                    onClick={() => setProvider('gemini')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      provider === 'gemini'
                        ? 'bg-purple-700 text-white border border-purple-500'
                        : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    Gemini
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-2">
                  API 密钥
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  placeholder={provider === 'openai' ? 'sk-...' : 'AIza...'}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="text-xs text-slate-500">
                {provider === 'openai' ? (
                  <p>获取 OpenAI API 密钥：<a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">platform.openai.com</a></p>
                ) : (
                  <p>获取 Gemini API 密钥：<a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">aistudio.google.com</a></p>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                保存
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
