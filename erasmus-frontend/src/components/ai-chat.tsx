'use client';

import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    onError: (err) => {
      console.error('Chat error:', err);
      setError('Przepraszam, wystąpił błąd. Spróbuj ponownie za chwilę.');
      // Clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Animated floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl z-50",
          "bg-gradient-to-br from-[#003399] via-[#0052cc] to-[#0066ff]",
          "hover:from-[#0044aa] hover:via-[#0066dd] hover:to-[#0077ff]",
          "transition-all duration-300 ease-out",
          "flex items-center justify-center",
          "border-4 border-white/20",
          "group",
          isOpen ? "scale-90 rotate-180" : "hover:scale-110 animate-bounce-slow"
        )}
        style={{
          boxShadow: isOpen 
            ? '0 8px 32px rgba(0, 51, 153, 0.4)' 
            : '0 8px 32px rgba(0, 51, 153, 0.5), 0 0 60px rgba(255, 204, 0, 0.3)'
        }}
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white transition-transform duration-300" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-7 h-7 text-white" />
            <Sparkles className="w-4 h-4 text-[#FFCC00] absolute -top-1 -right-1 animate-pulse" />
          </div>
        )}
        
        {/* Pulse ring effect */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#003399] animate-ping opacity-20" />
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#FFCC00] to-[#FFD700] opacity-20 blur-sm animate-pulse" />
          </>
        )}
      </button>

      {/* Tooltip when closed */}
      {!isOpen && (
        <div className="fixed bottom-24 right-6 z-40 animate-fade-in">
          <div className="bg-white rounded-lg shadow-lg px-4 py-2 text-sm font-medium text-gray-700 border border-gray-100">
            <span className="flex items-center gap-2">
              <span className="text-[#003399]">🇪🇺</span>
              Zapytaj o Erasmus+!
            </span>
            <div className="absolute bottom-0 right-8 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-100" />
          </div>
        </div>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card className={cn(
          "fixed bottom-28 right-6 w-[380px] h-[520px] flex flex-col z-50",
          "shadow-2xl border-0 overflow-hidden",
          "animate-slide-up"
        )}>
          {/* Header with EU theme */}
          <div className="relative p-4 bg-gradient-to-r from-[#003399] via-[#0052cc] to-[#003399] text-white">
            {/* Stars decoration */}
            <div className="absolute top-2 right-4 opacity-30">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="none" stroke="#FFCC00" strokeWidth="1" opacity="0.5" />
                {[...Array(12)].map((_, i) => (
                  <circle
                    key={i}
                    cx={20 + 15 * Math.cos((i * 30 - 90) * Math.PI / 180)}
                    cy={20 + 15 * Math.sin((i * 30 - 90) * Math.PI / 180)}
                    r="1.5"
                    fill="#FFCC00"
                  />
                ))}
              </svg>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Bot className="w-6 h-6 text-[#FFCC00]" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Era - Asystent Erasmus+</h3>
                <p className="text-xs text-white/70 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Online • Gotowa do pomocy
                </p>
              </div>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#003399]/10 to-[#FFCC00]/10 flex items-center justify-center">
                  <span className="text-4xl">🇪🇺</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Cześć! Jestem Era 👋</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Twoja asystentka programu Erasmus+
                </p>
                
                {/* Quick suggestions */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 mb-2">Popularne pytania:</p>
                  {[
                    'Co to jest Erasmus+?',
                    'Jak się zarejestrować?',
                    'Czy udział jest bezpłatny?',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        const event = {
                          target: { value: suggestion }
                        } as React.ChangeEvent<HTMLInputElement>;
                        handleInputChange(event);
                      }}
                      className="block w-full text-left px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:border-[#003399] hover:bg-blue-50 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#003399] to-[#0052cc] flex items-center justify-center flex-shrink-0 shadow-md">
                    <Bot className="w-4 h-4 text-[#FFCC00]" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-[#003399] to-[#0052cc] text-white rounded-br-md'
                      : 'bg-white border border-gray-100 text-gray-700 rounded-bl-md'
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFCC00] to-[#FFD700] flex items-center justify-center flex-shrink-0 shadow-md">
                    <User className="w-4 h-4 text-[#003399]" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#003399] to-[#0052cc] flex items-center justify-center flex-shrink-0 shadow-md">
                  <Bot className="w-4 h-4 text-[#FFCC00] animate-pulse" />
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#003399] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#003399] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#003399] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            {error && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-red-50 border border-red-200 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm shadow-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Napisz wiadomość..."
                disabled={isLoading}
                className="flex-1 rounded-full border-gray-200 focus:border-[#003399] focus:ring-[#003399]/20"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !input.trim()}
                className="rounded-full bg-gradient-to-r from-[#003399] to-[#0052cc] hover:from-[#002288] hover:to-[#0044bb] shadow-md"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">
              Powered by AI • Erasmus+ Youth Exchange
            </p>
          </form>
        </Card>
      )}

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          animation-delay: 1s;
          opacity: 0;
        }
      `}</style>
    </>
  );
}

