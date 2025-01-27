import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Terminal, Sparkles } from 'lucide-react';
import Typed from 'typed.js';

const prompts = [
  {
    text: "Design a red evening dress with a flowing silhouette",
    tag: "Evening Wear",
    icon: <Sparkles className="w-3 h-3" />
  },
  {
    text: "Create a black formal suit with slim fit",
    tag: "Formal Wear",
    icon: <Terminal className="w-3 h-3" />
  },
  {
    text: "Generate a blue summer dress with floral patterns",
    tag: "Summer Collection",
    icon: <Code className="w-3 h-3" />
  }
];

const Prompt = () => {
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2500);
  };

  useEffect(() => {
    const typed = new Typed('#prompt-input', {
      strings: prompts.map(p => p.text),
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 4000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      onStringTyped: (arrayPos) => {
        setCurrentPrompt(arrayPos);
        setIsTyping(false);
        handleGenerate();
      },
      onStart: () => {
        setIsTyping(true);
        setIsGenerating(false);
      }
    });

    return () => typed.destroy();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[450px] w-full max-w-2xl mx-auto relative rounded-xl bg-gradient-to-b from-zinc-900 to-black shadow-2xl p-3 sm:p-4 md:p-6"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent rounded-xl" />
      
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="space-y-2 sm:space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0"
          >
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-b from-white/10 to-white/5 p-1.5 rounded-lg border border-white/10">
                <Code className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-medium text-white/90 tracking-wider">AI DESIGN STUDIO</span>
            </div>
            
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    <span className="text-white/80">Processing</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.h2 
            className="text-lg sm:text-xl font-medium text-white/90"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Design with AI
          </motion.h2>
        </div>

        {/* Prompt Area */}
        <motion.div 
          className="mt-auto space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <div className="w-full bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/10">
              <div className="min-h-[24px] text-xs sm:text-sm text-white/80">
                <span id="prompt-input" className="whitespace-pre-wrap"></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {prompts.map((prompt, index) => (
              <motion.div
                key={prompt.tag}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-all ${
                  currentPrompt === index 
                    ? 'bg-white/10 text-white border border-white/20' 
                    : 'bg-white/5 text-white/60 border border-transparent hover:border-white/10'
                }`}
              >
                {prompt.icon}
                <span className="text-xs">{prompt.tag}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Refined Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-white/[0.02] to-transparent rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-t from-white/[0.02] to-transparent rounded-bl-xl" />
      </div>
    </motion.div>
  );
};

export default Prompt;
