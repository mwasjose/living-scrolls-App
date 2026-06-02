'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { sendMessageToMentor, getMentorHistory, MentorMessage, MentorTone } from '@/lib/mentorService';

export default function MentorPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<MentorMessage[]>([]);
  const [input, setInput] = useState('');
  const [tone, setTone] = useState<MentorTone>('Encouraging');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      getMentorHistory(user.uid).then((history) => setMessages(history.reverse()));
    }
  }, [user]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !user || isTyping) return;
    
    const userText = input;
    setInput('');
    setIsTyping(true);
    
    const userMsg: MentorMessage = { role: 'user', content: userText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);

    try {
      const mentorResponse = await sendMessageToMentor(user.uid, userText, tone);
      setMessages(prev => [...prev, { role: 'mentor', content: mentorResponse, timestamp: new Date() }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto py-4 text-foreground">
      <header className="flex items-center justify-between mb-6 px-4">
        <div>
          <p className="text-xs uppercase tracking-widest accent-gold mb-1 font-bold">AI Discipleship</p>
          <h1 className="text-2xl font-semibold text-foreground">Spiritual Mentor</h1>
        </div>
        <select 
          value={tone} 
          onChange={(e) => setTone(e.target.value as MentorTone)}
          className="bg-card border border-border accent-gold rounded-full px-4 py-2 text-[10px] uppercase font-bold tracking-widest outline-none transition-all"
        >
          <option value="Encouraging">Encouraging</option>
          <option value="Scholarly">Scholarly</option>
          <option value="Prophetic">Prophetic</option>
        </select>
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 px-4 mb-4 scrollbar-hide"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-5 rounded-[24px] shadow-soft ${
                msg.role === 'user' 
                ? 'bg-card-soft border border-border text-foreground' 
                : 'bg-card border border-border text-foreground backdrop-blur-md'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <p className="mt-2 text-[10px] text-slate-500 uppercase tracking-tighter">
                  {msg.role === 'user' ? 'You' : 'Ruach Wisdom'}
                </p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-card-soft border border-border p-4 rounded-2xl">
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-accent-gold opacity-50 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-accent-soft rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-accent-soft rounded-full animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="mt-auto px-4">
        <div className="relative group p-2 rounded-[32px] bg-[#283618]/60 border border-[#dda15e]/20 shadow-soft">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Seek wisdom or share a reflection..."
            className="w-full bg-transparent border-none outline-none text-[#fefae0] px-6 py-4 placeholder:text-[#dda15e]/40"
          />
          <button 
            onClick={handleSend}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#dda15e] text-[#283618] p-3 rounded-full hover:bg-[#bc6c25] transition-colors shadow-soft"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </footer>
    </div>
  );
}