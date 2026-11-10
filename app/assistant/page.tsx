'use client';

import { useState } from 'react';
import { Bot, ExternalLink, Loader2, MessageSquareText, Send, ShieldAlert, Sparkles } from 'lucide-react';
import { SectionHeader } from '@/components/section-header';
import { Badge, Button, Card, CardContent, CardHeader, Input } from '@/components/ui';
import { fallbackAnswer, type AssistantResponse } from '@/lib/assistant';

type Message = { role: 'user' | 'assistant'; text: string; response?: AssistantResponse };
const prompts = ['Why does combustion behave differently in microgravity?', 'What is a spherical diffusion flame?', 'How could FLEX relate to spacecraft fire safety?', 'What data can I explore locally?'];

export default function AssistantPage() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  async function ask(text = question) {
    const trimmed = text.trim(); if (!trimmed || loading) return;
    setQuestion(''); setMessages((current) => [...current, { role: 'user', text: trimmed }]); setLoading(true);
    try {
      const response = await fetch('/api/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: trimmed }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? 'Assistant request failed');
      setMessages((current) => [...current, { role: 'assistant', text: payload.answer, response: payload }]);
    } catch {
      const fallback = fallbackAnswer(trimmed);
      setMessages((current) => [...current, { role: 'assistant', text: fallback.answer, response: fallback }]);
    } finally { setLoading(false); }
  }

  return <>
    <SectionHeader eyebrow="05 / inference desk" title="IGNIS AI Research Assistant" description="Ask a focused question about the indexed research. The local fallback is intentionally bounded, cites its source records and says when it cannot support a conclusion." status="Safe fallback enabled" />
    <section className="grid gap-5 xl:grid-cols-[1fr_330px]">
      <Card className="overflow-hidden"><CardHeader><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan/20 bg-cyan/10"><Bot className="h-4 w-4 text-cyan" /></div><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">Conversation</p><h2 className="mt-1 text-lg font-semibold text-white">Research desk</h2></div><Badge className="ml-auto" tone="green"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Fallback ready</Badge></div></CardHeader><CardContent><div className="min-h-[360px] space-y-5">{messages.length === 0 ? <div className="flex min-h-[300px] flex-col items-center justify-center text-center"><MessageSquareText className="h-8 w-8 text-cyan/70" /><p className="mt-4 text-sm font-semibold text-white">Start with a research question</p><p className="mt-2 max-w-md text-sm leading-6 text-muted">Answers are grounded in the local source index. Optional server-side AI can be enabled through `.env`, but no key is needed for this workspace.</p></div> : null}{messages.map((message, index) => <div key={`${message.role}-${index}`} className={message.role === 'user' ? 'ml-auto max-w-[86%]' : 'max-w-[92%]'}><div className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'border-cyan/20 bg-cyan/10 text-white' : 'border-line bg-ink/50 text-slate-200'}`}><div className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">{message.role === 'user' ? 'You' : <><Sparkles className="h-3 w-3 text-amber" /> IGNIS</>}{message.response?.mode === 'local-fallback' ? <Badge tone="amber">Local fallback</Badge> : null}</div>{message.text}</div>{message.response ? <div className="mt-2 space-y-2 pl-2"><p className="text-[11px] leading-5 text-amber-100/70"><ShieldAlert className="mr-1 inline h-3.5 w-3.5 text-amber" />{message.response.uncertainty}</p><div className="flex flex-wrap gap-2">{message.response.sources.map((source) => <a key={source.url + source.title} href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan hover:text-white"><ExternalLink className="h-3 w-3" /> {source.title}</a>)}</div></div> : null}</div>)}{loading ? <div className="flex items-center gap-2 text-xs text-muted"><Loader2 className="h-4 w-4 animate-spin text-cyan" /> Checking the configured research adapter…</div> : null}</div><form className="mt-5 flex gap-2" onSubmit={(event) => { event.preventDefault(); void ask(); }}><Input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about microgravity combustion…" aria-label="Research question" /><Button type="submit" disabled={loading || !question.trim()}><Send className="h-4 w-4" /> Ask</Button></form></CardContent></Card>
      <Card className="h-fit"><CardHeader><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">Suggested probes</p><h2 className="mt-2 text-lg font-semibold text-white">Try a precise question</h2></CardHeader><CardContent className="space-y-2">{prompts.map((prompt) => <button key={prompt} onClick={() => void ask(prompt)} className="w-full rounded-xl border border-line bg-ink/35 px-3 py-3 text-left text-xs leading-5 text-muted transition hover:border-cyan/30 hover:bg-cyan/[0.06] hover:text-white">{prompt}</button>)}<div className="mt-4 rounded-xl border border-amber/20 bg-amber/[0.06] p-3 text-xs leading-5 text-amber-100/75">The assistant is not a substitute for NASA standards, mission procedures, peer review or engineering sign-off.</div></CardContent></Card>
    </section>
  </>;
}
