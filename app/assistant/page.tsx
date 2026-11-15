'use client';

import { useState } from 'react';
import {
  Bot,
  ExternalLink,
  Loader2,
  MessageSquareText,
  Send,
  ShieldAlert,
  Sparkles,
  Radio,
} from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import { Badge, Button, Input } from '@/components/ui';
import { GlassCard } from '@/components/glass-card';
import { fallbackAnswer, type AssistantResponse } from '@/lib/assistant';

type Message = {
  role: 'user' | 'assistant';
  text: string;
  response?: AssistantResponse;
};

const prompts = [
  'Why does combustion behave differently in microgravity?',
  'What is a spherical diffusion flame?',
  'How could FLEX relate to spacecraft fire safety?',
  'What data can I explore locally?',
];

export default function AssistantPage() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function ask(text = question) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setQuestion('');
    setMessages((curr) => [...curr, { role: 'user', text: trimmed }]);
    setLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Request failed');
      setMessages((curr) => [
        ...curr,
        { role: 'assistant', text: payload.answer, response: payload },
      ]);
    } catch {
      // Graceful local-fallback
      const fallback = fallbackAnswer(trimmed);
      setMessages((curr) => [
        ...curr,
        { role: 'assistant', text: fallback.answer, response: fallback },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="05 / inference desk"
        title="AI Assistant & Transmission Console"
        description="Query verified microgravity combustion findings. Grounded exclusively in documented NASA records. When empirical evidence is incomplete, the transmission engine explicitly bounds its interpretation."
        status="Console Active"
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        {/* Transmission Console Chat */}
        <GlassCard tier="raised" className="flex flex-col p-6 min-h-[550px]">
          {/* Console Header */}
          <div className="flex items-center justify-between border-b border-cosmic/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose/30 bg-rose/10 text-rose">
                <Radio className="h-4 w-4 animate-pulse" />
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-rose">
                  Transmission Channel
                </span>
                <h3 className="font-display text-base font-bold text-cream">
                  Research Telemetry Desk
                </h3>
              </div>
            </div>
            <Badge tone="rose">
              <span className="h-1.5 w-1.5 rounded-full bg-rose animate-ping mr-1" />
              Offline Fallback Ready
            </Badge>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 space-y-4 py-6 overflow-y-auto scrollbar-thin">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose/30 bg-rose/10 text-rose mb-3">
                  <MessageSquareText className="h-6 w-6" />
                </div>
                <p className="font-display text-base font-bold text-cream">
                  Establish Inquiry Transmission
                </p>
                <p className="mt-1 max-w-md text-xs leading-relaxed text-muted">
                  Ask a focused question about cool flames, buoyancy suppression, smoke detection or spacecraft fire-safety. Responses cite official records directly.
                </p>
              </div>
            ) : null}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end ml-auto max-w-[85%]' : 'items-start mr-auto max-w-[90%]'
                }`}
              >
                {/* Sender Tag */}
                <div className="mb-1 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-muted">
                  {msg.role === 'user' ? (
                    'Inquirer'
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3 text-amber" />
                      IGNIS Console
                    </>
                  )}
                  {msg.response?.mode === 'local-fallback' && (
                    <Badge tone="amber" className="text-[8px] py-0 px-1.5">
                      Local Fallback
                    </Badge>
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`rounded-2xl p-4 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'border border-rose/40 bg-rose/20 text-cream shadow-[0_0_15px_rgba(209,169,167,0.15)]'
                      : 'border border-cosmic bg-[rgba(24,0,24,0.6)] text-cream/90 shadow-glass-highlight'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Sources & Uncertainty for Assistant */}
                {msg.response && (
                  <div className="mt-2 w-full space-y-2 pl-2">
                    <p className="text-[11px] text-amber flex items-start gap-1.5">
                      <ShieldAlert className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber" />
                      <span>{msg.response.uncertainty}</span>
                    </p>

                    {msg.response.sources.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.response.sources.map((src, sIdx) => (
                          <a
                            key={sIdx}
                            href={src.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg border border-rose/30 bg-rose/10 px-2 py-0.5 font-mono text-[9px] text-rose hover:border-rose/60 transition-colors"
                          >
                            <ExternalLink className="h-2.5 w-2.5" />
                            {src.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Shimmer */}
            {loading && (
              <div className="flex items-center gap-2 font-mono text-xs text-rose animate-pulse">
                <Loader2 className="h-4 w-4 animate-spin text-rose" />
                <span>Interrogating local NASA knowledge base...</span>
              </div>
            )}
          </div>

          {/* Input Transmission Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void ask();
            }}
            className="mt-auto flex gap-2 border-t border-cosmic/60 pt-4"
          >
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Transmit question (e.g. Why are microgravity flames spherical?)..."
              disabled={loading}
              className="text-xs"
            />
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !question.trim()}
              className="px-5 shrink-0"
            >
              <Send className="h-4 w-4" /> Send
            </Button>
          </form>
        </GlassCard>

        {/* Suggested Probes Sidebar */}
        <div className="space-y-6">
          <GlassCard tier="raised" className="p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rose">
              Recommended Inquiries
            </p>
            <h3 className="mt-1 font-display text-base font-bold text-cream">
              Verified Investigation Probes
            </h3>

            <div className="mt-4 space-y-2">
              {prompts.map((p) => (
                <button
                  key={p}
                  onClick={() => void ask(p)}
                  className="w-full rounded-2xl border border-cosmic bg-void/50 p-3 text-left text-xs text-muted hover:border-rose/40 hover:bg-rose/10 hover:text-cream transition-all duration-200"
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-amber/25 bg-amber/[0.07] p-3 text-xs leading-relaxed text-amber">
              <span className="font-mono font-semibold uppercase">Operational Boundary:</span> The assistant synthesizes verified findings; it is not an operational authority for spaceflight emergency protocol.
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
