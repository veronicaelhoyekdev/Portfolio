import { useEffect, useRef, useState } from 'react';
import { Bot, BrainCircuit, SendHorizonal, Sparkles, X } from 'lucide-react';
import { askVeronica } from './api';
import { ChatMessage } from './ChatMessage';
import type { ChatMessage as ChatMessageType, ChatResponse } from './types';

type AssistantLocale = 'en' | 'fr';

type AssistantText = {
  launcher: string;
  panelLabel: string;
  openLabel: string;
  closeLabel: string;
  headerSubtitle: string;
  intro: string;
  welcome: string;
  emptyStateTitle: string;
  emptyStateBody: string;
  send: string;
  sendAria: string;
  inputPlaceholder: string;
  inputLabel: string;
  askLabel: string;
  thinking: string;
  assistantLabel: string;
  assistantReady: string;
  userLabel: string;
  messageLabel: string;
  exampleQuestions: string[];
  errorUnavailable: string;
  configError: string;
};

const assistantText: Record<AssistantLocale, AssistantText> = {
  en: {
    launcher: 'Ask Veronica.ai',
    panelLabel: 'Veronica.ai assistant panel',
    openLabel: 'Open Veronica.ai assistant',
    closeLabel: 'Close Veronica.ai assistant',
    headerSubtitle: 'Portfolio assistant',
    intro: "Ask about my work, projects, skills, or background.",
    welcome: "Ask me anything about Veronica's work, projects, skills, or background.",
    emptyStateTitle: 'Welcome',
    emptyStateBody: "Ask about Veronica's AI systems, software engineering work, product history, and experience.",
    send: 'Send',
    sendAria: 'Send message',
    inputPlaceholder: 'Ask about Veronica...',
    inputLabel: 'Ask Veronica.ai',
    askLabel: 'Ask Veronica.ai',
    thinking: 'Veronica.ai is thinking...',
    assistantLabel: 'Veronica.ai',
    assistantReady: 'Assistant ready.',
    userLabel: 'You',
    messageLabel: 'Message Veronica.ai',
    exampleQuestions: [
      'What has Veronica built with AI?',
      'Tell me about her backend experience.',
      'Which projects used React?',
      'What did she work on at Upscale Innovations?',
    ],
    errorUnavailable: 'Veronica.ai is temporarily unavailable. Please try again in a moment.',
    configError: 'Veronica.ai is not configured yet. Please try again later.',
  },
  fr: {
    launcher: 'Demander à Veronica.ai',
    panelLabel: 'Panneau d’assistance Veronica.ai',
    openLabel: 'Ouvrir l’assistant Veronica.ai',
    closeLabel: 'Fermer l’assistant Veronica.ai',
    headerSubtitle: 'Assistant du portfolio',
    intro: 'Posez vos questions sur mon parcours, mes projets, mes compétences ou mon expérience.',
    welcome: 'Posez-moi vos questions sur le parcours, les projets, les compétences ou l’expérience de Veronica.',
    emptyStateTitle: 'Bienvenue',
    emptyStateBody: 'Posez vos questions sur les systèmes d’IA de Veronica, son travail en ingénierie logicielle, son histoire produit et son expérience.',
    send: 'Envoyer',
    sendAria: 'Envoyer le message',
    inputPlaceholder: 'Posez une question sur Veronica...',
    inputLabel: 'Demander à Veronica.ai',
    askLabel: 'Demander à Veronica.ai',
    thinking: 'Veronica.ai réfléchit...',
    assistantLabel: 'Veronica.ai',
    assistantReady: 'Assistant prêt.',
    userLabel: 'Vous',
    messageLabel: 'Message à Veronica.ai',
    exampleQuestions: [
      'Qu’a développé Veronica en intelligence artificielle ?',
      'Parlez-moi de son expérience en développement backend.',
      'Quels projets ont utilisé React ?',
      'Sur quoi a-t-elle travaillé chez Upscale Innovations ?',
    ],
    errorUnavailable: 'Veronica.ai est temporairement indisponible. Veuillez réessayer dans un instant.',
    configError: 'Veronica.ai n’est pas encore configurée. Veuillez réessayer plus tard.',
  },
};

function makeMessage(role: 'user' | 'assistant', content: string): ChatMessageType {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
  };
}

export function VeronicaAI({ locale }: { locale: AssistantLocale }) {
  const text = assistantText[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<'unavailable' | 'config' | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const errorMessage = error === 'unavailable' ? text.errorUnavailable : error === 'config' ? text.configError : null;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending, isOpen]);

  const sendMessage = async (messageText?: string) => {
    const trimmed = (messageText ?? input).trim();

    if (!trimmed || isSending) {
      return;
    }

    setError(null);
    const userMessage = makeMessage('user', trimmed);
    setMessages((current) => [...current, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      const response = await askVeronica(trimmed);
      const assistantMessage = makeMessage('assistant', response.answer);
      setMessages((current) => [...current, assistantMessage]);
    } catch (caughtError) {
      if (caughtError instanceof Error) {
        if (caughtError.message === 'Veronica.ai is temporarily unavailable. Please try again in a moment.') {
          setError('unavailable');
        } else if (caughtError.message === 'Veronica.ai is not configured yet. Please try again later.') {
          setError('config');
        } else {
          setError('unavailable');
        }
      } else {
        setError('unavailable');
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  return (
    <>
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={text.openLabel}
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full border border-border bg-surface/90 px-4 py-3 text-sm font-semibold text-foreground shadow-[0_18px_52px_-34px_rgba(15,118,110,0.45)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/80"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="hidden sm:inline">{text.launcher}</span>
        </button>
      ) : null}

      {isOpen ? (
        <div
          className="fixed bottom-4 right-4 z-50 flex w-[calc(100vw-1.5rem)] h-[min(78vh,32rem)] flex-col overflow-hidden rounded-2xl border border-border bg-surface/95 shadow-[0_22px_60px_-42px_rgba(15,35,55,0.42)] backdrop-blur-xl sm:bottom-6 sm:right-6 sm:h-[32rem] sm:w-[27rem]"
          role="dialog"
          aria-modal="false"
          aria-label={text.panelLabel}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface-elevated text-primary">
                <BrainCircuit className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{text.assistantLabel}</p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{text.headerSubtitle}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={text.closeLabel}
              className="rounded-md border border-border p-2 text-foreground transition-colors hover:border-sky-500/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/80"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="shrink-0 border-b border-border px-4 py-3 text-xs text-muted-foreground">{text.intro}</div>

          <div ref={scrollRef} className="flex-1 min-h-0 space-y-4 overflow-y-auto px-4 py-4">
            {messages.length === 0 ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-slate-50/80 p-3 text-sm leading-relaxed text-muted-foreground">
                  <div className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    {text.emptyStateTitle}
                  </div>
                  {text.emptyStateBody}
                </div>

                <div className="space-y-2">
                  {text.exampleQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => void sendMessage(question)}
                      className="w-full rounded-xl border border-border bg-white/80 px-3 py-2 text-left text-sm text-foreground transition-colors hover:border-teal-500/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/80"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => <ChatMessage key={message.id} message={message} userLabel={text.userLabel} assistantLabel={text.assistantLabel} />)
            )}

            {isSending ? (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] flex-col gap-2">
                  <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    {text.assistantLabel}
                  </div>
                  <div className="rounded-2xl border border-border bg-white/80 px-3.5 py-3 text-sm text-muted-foreground">
                    {text.thinking}
                  </div>
                </div>
              </div>
            ) : null}

            {errorMessage ? (
              <div aria-live="assertive" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {errorMessage}
              </div>
            ) : null}
          </div>

          <div className="shrink-0 border-t border-border p-3">
            <div className="flex items-end gap-2 rounded-2xl border border-border bg-slate-50/80 p-2">
              <label htmlFor="veronica-ai-input" className="sr-only">
                {text.messageLabel}
              </label>
              <textarea
                id="veronica-ai-input"
                rows={1}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={text.inputPlaceholder}
                aria-label={text.inputLabel}
                className="max-h-28 min-h-[42px] flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="button"
                onClick={() => void sendMessage()}
                disabled={isSending || input.trim().length === 0}
                aria-label={text.sendAria}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/80"
              >
                <span>{text.send}</span>
                <SendHorizonal className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {isSending ? text.thinking : errorMessage ? errorMessage : text.assistantReady}
          </div>
        </div>
      ) : null}
    </>
  );
}
