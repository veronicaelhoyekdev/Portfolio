import type { ChatResponse } from './types';

const API_URL = (import.meta.env.VITE_VERONICA_AI_API_URL || '').replace(/\/+$/, '');

export async function askVeronica(message: string): Promise<ChatResponse> {
  if (!API_URL) {
    throw new Error('Veronica.ai is not configured yet. Please try again later.');
  }

  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Veronica.ai is temporarily unavailable. Please try again in a moment.');
    }

    return (await response.json()) as ChatResponse;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Veronica.ai')) {
      throw error;
    }

    throw new Error('Veronica.ai is temporarily unavailable. Please try again in a moment.');
  }
}

export default askVeronica;
