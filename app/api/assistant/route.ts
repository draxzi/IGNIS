import { NextResponse } from 'next/server';
import { fallbackAnswer, relevantRecords } from '@/lib/assistant';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = typeof body?.question === 'string' ? body.question.trim() : '';
    if (!question) return NextResponse.json({ error: 'A question is required.' }, { status: 400 });
    if (question.length > 600) return NextResponse.json({ error: 'Questions are limited to 600 characters.' }, { status: 400 });

    const apiKey = process.env.AI_API_KEY;
    const baseUrl = (process.env.AI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
    const model = process.env.AI_MODEL || 'gpt-4o-mini';
    if (!apiKey) return NextResponse.json(fallbackAnswer(question));

    const matchedRecords = relevantRecords(question);
    if (matchedRecords.length === 0) return NextResponse.json(fallbackAnswer(question));
    const contextRecords = matchedRecords;
    const context = contextRecords.map((record) => `- [${record.id}] ${record.title} | ${record.category} | ${record.description} | Source: ${record.sourceUrl}`).join('\n');
    const upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, temperature: 0.1, messages: [
        { role: 'system', content: `You are IGNIS, a careful scientific research assistant. Answer only from the curated source context below. If the context does not support a claim, say that it is unavailable. Never invent NASA experiment IDs, measurements or citations. Do not cite records that are not relevant to the answer. Include a short uncertainty note. Context:\n${context}` },
        { role: 'user', content: question },
      ] }),
      signal: AbortSignal.timeout(15000),
    });
    if (!upstream.ok) return NextResponse.json(fallbackAnswer(question));
    const result = await upstream.json();
    const answer = result?.choices?.[0]?.message?.content;
    if (typeof answer !== 'string' || !answer.trim()) return NextResponse.json(fallbackAnswer(question));
    return NextResponse.json({ answer, sources: matchedRecords.map((record) => ({ title: record.citation, url: record.sourceUrl })), mode: 'configured-ai', uncertainty: 'This response was generated from the selected IGNIS context. Verify important claims against the original source records.' });
  } catch {
    return NextResponse.json(fallbackAnswer(''));
  }
}
