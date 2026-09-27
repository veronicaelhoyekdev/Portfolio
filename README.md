# Veronica El Hoyek — Portfolio

Personal software engineering portfolio showcasing selected projects, professional experience, technical skills, and an integrated AI assistant for interactive exploration of the portfolio.

**Live:** https://veronica-el-hoyek.vercel.app/

## Overview

The portfolio presents software engineering work across full-stack development, artificial intelligence, interactive applications, and backend systems through selected case studies and project repositories.

Beyond static portfolio content, the website integrates **Veronica AI**, an AI assistant connected to a dedicated backend that can answer questions about projects, experience, education, and technical skills.

## Features

- Selected engineering case studies
- Professional experience and education
- Technical skills overview
- Direct links to public project repositories
- French and English CV access
- Responsive interface
- Integrated AI portfolio assistant
- Real-time communication with the Veronica AI backend

## Veronica AI

The portfolio includes an interactive AI assistant that allows visitors to explore the profile conversationally rather than relying exclusively on static pages.

```text
Visitor
   │
   ▼
Portfolio UI
   │
   ▼
Veronica AI Component
   │
   │ POST /api/chat
   ▼
Veronica AI API
   │
   ▼
Context-aware response
```

The frontend communicates with the separate Veronica AI service through a configurable API endpoint:

```env
VITE_VERONICA_AI_API_URL=your_api_url
```

The AI backend is maintained as a separate project, keeping the portfolio frontend independent from the retrieval and language-model infrastructure.

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS, CSS |
| Icons | Lucide React |
| AI Integration | REST API |
| Deployment | Vercel |

## Project Structure

```text
.
├── public/
│   ├── resume-en.pdf
│   ├── resume-fr.pdf
│   └── ...
│
├── src/
│   ├── components/
│   │   └── veronica-ai/
│   │       ├── ChatMessage.tsx
│   │       ├── VeronicaAI.tsx
│   │       ├── api.ts
│   │       └── types.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
│
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js
- npm

Clone the repository:

```bash
git clone https://github.com/veronica-el-hoyek/Portfolio.git
cd Portfolio
```

Install dependencies:

```bash
npm install
```

Create the local environment configuration if the AI assistant should be enabled:

```env
VITE_VERONICA_AI_API_URL=your_veronica_ai_backend_url
```

Start the development server:

```bash
npm run dev
```

## Build

Create a production build with:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Related Project

### Veronica AI

The AI assistant used by this portfolio is developed as an independent backend service with its own retrieval, knowledge, and LLM infrastructure.

Repository: https://github.com/veronica-el-hoyek/Veronica-ai

## Author

**Veronica El Hoyek**  
Software & AI Engineer

Portfolio: https://veronica-el-hoyek.vercel.app/  
GitHub: https://github.com/veronica-el-hoyek
