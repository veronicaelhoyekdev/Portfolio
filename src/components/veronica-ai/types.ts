export interface ChatSource {
  title: string;
  document_type: string;
  section: string | null;
  source_path: string;
}

export interface ChatResponse {
  answer: string;
  sources: ChatSource[];
}

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}
