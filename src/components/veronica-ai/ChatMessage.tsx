import type { ReactNode } from 'react';
import { Sparkles, UserRound } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from './types';

function renderInlineText(text: string): ReactNode[] {
  const pattern = /\*\*(.+?)\*\*/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    nodes.push(<strong key={`${match.index}-strong`} className="font-semibold text-foreground">{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderAssistantContent(content: string): ReactNode[] {
  const lines = content.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }

    blocks.push(
      <p key={`paragraph-${blocks.length}`} className="mb-1 last:mb-0">
        {renderInlineText(paragraph.join(' '))}
      </p>,
    );
    paragraph = [];
  };

  const flushList = () => {
    if (listItems.length === 0) {
      return;
    }

    blocks.push(
      <ul key={`list-${blocks.length}`} className="my-1 list-disc space-y-1 pl-5">
        {listItems.map((item, index) => (
          <li key={`list-item-${blocks.length}-${index}`} className="leading-relaxed marker:text-muted-foreground">
            {renderInlineText(item)}
          </li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '') {
      flushParagraph();
      flushList();
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      listItems.push(trimmed.replace(/^[-*]\s+/, ''));
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return blocks;
}

export function ChatMessage({
  message,
  userLabel,
  assistantLabel,
}: {
  message: ChatMessageType;
  userLabel: string;
  assistantLabel: string;
}) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground`}>
          {isUser ? <UserRound className="h-3.5 w-3.5" aria-hidden="true" /> : <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />}
          {isUser ? userLabel : assistantLabel}
        </div>

        <div
          className={`rounded-2xl border px-3.5 py-3 text-sm leading-relaxed ${
            isUser
              ? 'border-teal-500/40 bg-teal-50 text-foreground'
              : 'border-border bg-white/80 text-foreground'
          }`}
        >
          {isUser ? message.content : renderAssistantContent(message.content)}
        </div>
      </div>
    </div>
  );
}
