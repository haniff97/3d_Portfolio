import { useEffect, useRef, useState } from 'react';
import { FiChevronRight, FiMessageCircle, FiSend } from 'react-icons/fi';

export default function PortfolioChat() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const pending = useRef(null);
  const log = useRef(null);
  useEffect(() => () => pending.current?.abort(), []);
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages, busy]);
  const send = async text => {
    const content = text.trim();
    if (!content || pending.current) return;
    const controller = new AbortController();
    pending.current = controller;
    setBusy(true); setError('');
    const history = messages.slice(-6).map(message => ({ ...message, content: message.content.slice(0, 1500) }));
    const next = [...history, { role: 'user', content }];
    const timer = setTimeout(() => controller.abort(), 35000);
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next }), signal: controller.signal });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || 'Chat is unavailable. Please try again later.');
      if (typeof result?.answer !== 'string') throw new Error('Chat is unavailable. Please try again later.');
      setMessages(previous => [...previous, { role: 'user', content }, { role: 'assistant', content: result.answer }]);
      setQuestion('');
    } catch (error) { setError(error.name === 'AbortError' ? 'The request timed out. Please try again.' : error.message); }
    finally { clearTimeout(timer); pending.current = null; setBusy(false); }
  };
  return <section className="portfolio-chat" aria-labelledby="chat-heading">
    <div className="portfolio-chat-heading"><span className="chat-symbol"><FiMessageCircle /></span><div><p className="eyebrow">A LITTLE MORE ABOUT ME</p><h2 id="chat-heading">Ask about Haniff.</h2></div></div>
    <p className="chat-intro">Explore my experience, projects, and the things I’m building.</p>
    <div className="chat-log" ref={log} role="log" aria-label="Conversation" aria-live="polite">
      {!messages.length && <p className="chat-welcome">Hi! I’m Haniff’s AI portfolio assistant. What would you like to know about his work?</p>}
      {messages.map((message, index) => <div key={index} className={`chat-message chat-${message.role}`}><span>{message.role === 'user' ? 'You' : 'Portfolio assistant'}</span><p>{message.content}</p></div>)}
      {busy && <p className="chat-thinking" role="status">Thinking…</p>}
    </div>
    {!messages.length && <div className="chat-suggestions">{['What AI projects has Haniff built?', 'Tell me about his AWS experience.', 'What are his backend skills?'].map(text => <button key={text} disabled={busy} onClick={() => { setQuestion(text); send(text); }}>{text} <FiChevronRight aria-hidden="true" /></button>)}</div>}
    {error && <p className="chat-error" role="alert">{error}</p>}
    <form className="chat-form" onSubmit={event => { event.preventDefault(); send(question); }}><label htmlFor="portfolio-question">Your question</label><div><input id="portfolio-question" value={question} onChange={event => setQuestion(event.target.value)} maxLength={1500} disabled={busy} placeholder="Ask about my work…" required /><button type="submit" disabled={busy || !question.trim()} aria-label="Send question"><FiSend aria-hidden="true" /></button></div></form>
    <div className="chat-footer"><p>Powered by DeepSeek. Questions and recent messages are sent to DeepSeek. Answers may be inaccurate.</p>{messages.length > 0 && <button disabled={busy} onClick={() => { setMessages([]); setError(''); setQuestion(''); }}>Clear chat</button>}</div>
  </section>;
}
