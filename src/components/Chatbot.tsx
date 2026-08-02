// src/components/Chatbot.tsx
'use client';

import { useState, useRef, useEffect } from 'react';

type Message = { role: 'user' | 'model'; content: string };

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State untuk perbesar/perkecil
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Halo! Saya asisten AI Kelurahan Sumbang. Ada yang bisa saya bantu terkait layanan, info, atau kontak kelurahan?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isExpanded]); 

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.filter(m => m.content !== '...') 
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'model', content: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', content: 'Maaf, sistem AI sedang sibuk. Coba lagi nanti ya!' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: 'Terjadi kesalahan jaringan.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (text: string, msgIdx: number) => {
    const urlRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const elements = [];
    let lastIndex = 0;
    let match;

    while ((match = urlRegex.exec(text)) !== null) {
      const preText = text.substring(lastIndex, match.index);
      if (preText) {
        preText.split('\n').forEach((line, i, arr) => {
          elements.push(<span key={`pre-${msgIdx}-${lastIndex}-${i}`}>{line}</span>);
          if (i < arr.length - 1) elements.push(<br key={`br-pre-${msgIdx}-${lastIndex}-${i}`} />);
        });
      }

      elements.push(
        <a
          key={`link-${msgIdx}-${match.index}`}
          href={match[2]}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-yellow-400 text-navy px-4 py-2 rounded-xl text-xs font-bold my-2 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 no-underline w-fit border border-yellow-300/50"
        >
          {match[1]}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </a>
      );
      lastIndex = match.index + match[0].length;
    }

    const postText = text.substring(lastIndex);
    if (postText) {
      postText.split('\n').forEach((line, i, arr) => {
        elements.push(<span key={`post-${msgIdx}-${i}`}>{line}</span>);
        if (i < arr.length - 1) elements.push(<br key={`br-post-${msgIdx}-${i}`} />);
      });
    }
    return elements;
  };

  return (
    <> {/* Menggunakan Fragment agar posisi fixed benar-benar independen */}
      
      {/* Widget Tombol Buka */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-[99999] w-16 h-16 bg-gradient-to-br from-navy to-blue-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:shadow-blue-primary/40 transition-all duration-300 border-2 border-white/20 group"
        >
          <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20 group-hover:opacity-40"></div>
          <svg className="w-8 h-8 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      )}

      {/* Kotak Chat */}
      <div 
        className={`fixed bottom-5 right-5 z-[99999] bg-white/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col border border-white/40 ring-1 ring-navy/5 origin-bottom-right transition-all duration-500 ease-out ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
        } ${
          isExpanded 
            ? 'w-[90vw] md:w-[700px] h-[85vh] md:h-[750px] rounded-3xl' 
            : 'w-[90vw] sm:w-80 md:w-96 h-[500px] rounded-2xl'
        }`}
      >
        {/* Header Aesthetic */}
<div className="bg-gradient-to-r from-navy via-blue-primary to-blue-cyan p-4 flex justify-between items-center text-white shrink-0 shadow-md">
  <div className="flex items-center gap-3">
    
    {/* Avatar / Icon Chatbot (Diganti dengan gambar pilihanmu) */}
    <div className="w-10 h-10 bg-white/10 rounded-full overflow-hidden flex items-center justify-center border-2 border-white/20 shadow-inner shrink-0">
      <img 
        src="/icon-sumbangai.jpeg" // Ubah path ini sesuai nama file gambar yang kamu taruh di folder public
        alt="Sumbang AI Avatar"
        className="w-full h-full object-cover"
      />
    </div>

    <div>
      <h3 className="font-bold text-sm tracking-wide">Sumbang AI</h3>
      <div className="flex items-center gap-1.5 mt-0.5">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        <p className="text-[10px] text-white/80 uppercase tracking-wider font-medium">Online & Siap Membantu</p>
      </div>
    </div>
  </div>
  
  <div className="flex items-center gap-1">
    {/* Tombol Resize */}
    <button onClick={() => setIsExpanded(!isExpanded)} className="hover:bg-white/20 p-2 rounded-xl transition-all duration-300">
      {isExpanded ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 14h6m0 0v6m0-6l-7 7m17-11h-6m0 0V4m0 6l7-7m-7 17v-6m0 0h6m-6 0l7 7M7 10H1m6 0V4m0 6L0 0" /></svg> // Icon Minimize
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg> // Icon Maximize
      )}
    </button>
    {/* Tombol Close */}
    <button onClick={() => { setIsOpen(false); setIsExpanded(false); }} className="hover:bg-red-500 hover:text-white p-2 rounded-xl transition-all duration-300">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
  </div>
</div>

        {/* Area Pesan */}
        <div className="flex-1 p-5 overflow-y-auto bg-gradient-to-b from-cream/30 to-white space-y-5 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-up`}>
              <div className={`max-w-[85%] p-4 text-sm leading-relaxed flex flex-col shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-navy to-blue-primary text-white rounded-2xl rounded-tr-sm' 
                  : 'bg-white border border-navy/5 text-navy/80 rounded-2xl rounded-tl-sm ring-1 ring-navy/5'
              }`}>
                {renderMessage(msg.content, idx)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-up">
              <div className="bg-white border border-navy/5 text-navy/50 p-4 rounded-2xl rounded-tl-sm shadow-sm text-sm flex items-center gap-3">
                <span className="text-xs font-medium">Sumbang AI sedang mengetik</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Form Input */}
        <form onSubmit={sendMessage} className="p-4 bg-white border-t border-navy/5 flex gap-3 shrink-0">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan sesuatu ke AI..."
            className="flex-1 bg-navy/5 rounded-2xl px-5 py-3 text-sm text-navy outline-none focus:ring-2 focus:ring-blue-primary/50 transition-all placeholder:text-navy/40"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-navy text-accent p-3 rounded-2xl hover:bg-blue-primary transition-all duration-300 disabled:opacity-50 disabled:hover:bg-navy flex items-center justify-center hover:shadow-lg hover:shadow-blue-primary/20"
          >
            <svg className="w-5 h-5 -rotate-45 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </form>
      </div>
      
    </>
  );
}