import { createContext, useContext, useEffect, useState } from 'react';
import {
  ArrowRight,
  Boxes,
  Brain,
  Briefcase,
  Code2,
  GraduationCap,
  MapPin,
  Menu,
  Server,
  ShieldCheck,
  Terminal,
  X,
  type LucideIcon,
} from 'lucide-react';
import { VeronicaAI } from './components/veronica-ai/VeronicaAI';

const contact = {
  email: 'veronicaelhoyek@gmail.com',
  phone: '+33 6 83 45 42 69',
  location: 'Lille, France',
};

const nav = [
  { label: 'Expertise', href: '#expertise' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Experience & Education', href: '#experience' },
  { label: 'GitHub', href: 'https://github.com/veronicaelhoyekdev' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/veronica-el-hoyek' },
];

const expertise = [
  {
    icon: Brain,
    title: 'AI & Agentic Systems',
    skills: ['LLM APIs', 'OpenAI', 'Anthropic', 'Autonomous AI Agents', 'RAG Pipelines', 'Pinecone', 'pgvector', 'Function Calling', 'Hybrid Search', 'BM25', 'Reranking', 'Guardrails', 'Evaluation'],
  },
  {
    icon: Code2,
    title: 'Frontend, Desktop & Mobile',
    skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Electron', 'HTML5', 'CSS3', 'Android Kotlin', 'Android Java', 'iOS Swift', 'Flutter Dart'],
  },
  {
    icon: Server,
    title: 'Systems, Data & Backend',
    skills: ['Python', 'Node.js', 'C++', 'C#', 'Java', 'PHP', 'REST APIs', 'PostgreSQL', 'MySQL', 'MongoDB', 'AWS', 'GCP', 'Azure', 'Kubernetes'],
  },
  {
    icon: Boxes,
    title: '3D, XR & Simulation',
    skills: ['Unity URP', 'C#', 'Blender', 'Rigging', 'Animation', 'FBX Pipelines', 'Character Creator', 'AR/VR', 'Spatial UI', '360 Media'],
  },
];

type CaseStudy = {
  index: string;
  categories: string[];
  title: string;
  overview: string;
  highlights: string[];
  stack: string[];
  repository?: string;
};

const caseStudies: CaseStudy[] = [
  {
    index: '01',
    categories: ['AI & Data'],
    title: 'Autonomous AI Conversational & Action Agent',
    overview: 'Enterprise RAG and agentic system providing unified natural language retrieval across large documentation corpuses and executing automated user actions via APIs.',
    highlights: [
      'Hybrid retrieval using dense vector search plus BM25 lexical search.',
      'Metadata filtering to prevent hallucination across unrelated institutional domains.',
      'Intent routing between informational queries and tool-calling services.',
    ],
    stack: ['Python', 'Vector Databases', 'LLMs', 'REST APIs'],
  },
  {
    index: '02',
    categories: ['3D & XR'],
    title: '3D Serious Game & Interactive Anatomy Simulation',
    overview: 'Interactive 3D WebGL educational platform designed to simulate complex biomechanics and muscular movements in real time.',
    highlights: [
      'End-to-end 3D pipeline from 2D concepts to character rigging in Blender and animation.',
      'Custom C# state machines in Unity for interactive simulation behavior.',
      'Bilingual dynamic audio/text localization system.',
      'WebGL performance optimization for browser-based delivery.',
    ],
    stack: ['Unity URP', 'C#', 'Blender', 'Character Creator', 'WebGL'],
  },
  {
    index: '03',
    categories: ['AI & Data', 'Full-Stack'],
    title: 'Real-Time Industrial Digital Twin Platform',
    overview: 'Connected software platform for real-time telemetry supervision, historical experiment playback, and optimization of physical industrial systems.',
    highlights: [
      'Multi-protocol IoT hardware ingestion with Modbus and CAN bus.',
      'Live dashboard streaming for real-time operational supervision.',
      'Synthetic simulation modes for testing abnormal operating states.',
      'Bayesian parameter optimization for industrial system tuning.',
    ],
    stack: ['Python', 'IoT Gateways', 'Web Dashboards', 'Bayesian Optimization'],
  },
  {
    index: '04',
    categories: ['3D & XR', 'AI & Data'],
    title: 'Multiplatform Immersive Industrial Demonstrator',
    overview: 'Unified cross-platform industrial inspection system demonstrated at a major European tech expo.',
    highlights: [
      'Single unified 3D environment deployed across WebGL, mobile, and VR/AR.',
      'Spatial AR data overlays on physical equipment.',
      'Embedded conversational AI assistant for hands-free machine health inspection.',
      'Real-time signal mocking for realistic industrial demonstration flows.',
    ],
    stack: ['Unity', 'C#', 'Spatial AR/VR', 'WebGL', 'Real-Time Signal Mocking'],
  },
  {
    index: '05',
    categories: ['Full-Stack', 'Mobile'],
    title: 'Popcorn - Media Discovery & Tracking App',
    overview: 'Modern media tracking and discovery web application with a companion mobile app built using Kotlin.',
    highlights: [
      'Server-rendered dynamic pages for fast media discovery.',
      'Type-safe API integration across search, filtering, and detail views.',
      'Responsive polished UI with custom search/filter architecture.',
      'Kotlin mobile app experience for tracking and discovery on Android.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Kotlin'],
    repository: 'https://github.com/veronicaelhoyekdev/Popcorn',
  },
  {
    index: '06',
    categories: ['Full-Stack', 'Mobile'],
    title: 'PolyHome - Smart Home Android Application',
    overview: 'Native Android smart-home application for managing connected-home devices, user authentication, house access, and device controls through an authenticated REST API.',
    highlights: [
      'Built the complete native Android application in Kotlin, from authentication and application state to smart-home device interfaces.',
      'Integrated a REST API with JSON handling and Bearer-token authentication, including local persistence of authentication state.',
      'Implemented dynamic control and state visualization for lights, garage doors, sliding shutters, and rolling shutters based on device capabilities returned by the API.',
      'Built multi-user house access management, including viewing, granting, and revoking access for other users.',
    ],
    stack: ['Kotlin', 'Android', 'REST API', 'JSON', 'Bearer Authentication'],
  },
  {
    index: '07',
    categories: ['AI & Data', 'Full-Stack'],
    title: 'Veronica.ai — AI Portfolio Assistant',
    overview: 'AI-powered portfolio assistant for exploring Veronica’s experience, projects, education, skills, and background through natural-language questions in English or French.',
    highlights: [
      'Python/FastAPI RAG backend over a structured portfolio knowledge base in PostgreSQL + pgvector, combining dense semantic and BM25-style lexical retrieval with Reciprocal Rank Fusion (RRF).',
      'Query planning, document-type filtering, and retrieval diversification address precise questions and broad work-history or project summaries without hardcoded answers.',
      'LLM-generated, source-backed answers stay grounded in portfolio evidence, distinguish demonstrated experience from listed skills, and explicitly identify unsupported information to limit hallucinations.',
      'Persistent archive of questions, answers, response times, status, and retrieved sources, with best-effort email notifications for visitor questions.',
      'Integrated into the live React/TypeScript portfolio through a FastAPI chat endpoint.',
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'RAG', 'React', 'TypeScript'],
    repository: 'https://github.com/veronicaelhoyekdev/Veronica-ai',
  },
  {
    index: '08',
    categories: ['Full-Stack'],
    title: 'Bookstore REST API',
    overview: 'RESTful backend for managing books, authors, and publishers, with authentication, structured validation, and MongoDB persistence.',
    highlights: [
      'DTO-based request and response models.',
      'JWT-based authentication and authorization.',
      'ISBN-10 / ISBN-13 validation and centralized exception handling.',
    ],
    stack: ['Java 17', 'Spring Boot', 'Spring Security', 'MongoDB', 'JWT', 'OpenAPI', 'Docker'],
    repository: 'https://github.com/veronicaelhoyekdev/Bookstore',
  },
];

const experience = [
  {
    org: 'Upscale Hub',
    place: 'Lille, France',
    role: 'Software & AI Systems Engineer building RAG-powered AI chat agents, Electron desktop apps, IoT integrations, Unity serious games, and Blender asset pipelines from architecture through deployment.',
    period: 'Sept 2024 - Sept 2026',
  },
  {
    org: 'FlexboxAI',
    place: 'Dubai, UAE',
    role: 'Multimedia & Front-End Intern creating interactive web animations from SVG assets and optimizing them for smooth browser integration.',
    period: 'May 2024 - July 2024',
  },
];

const education = [
  {
    org: 'Polytech Dijon',
    place: 'Dijon, France',
    role: 'Software Engineering & Artificial Intelligence track',
    period: '2024 - 2026',
    highlights: ['Double-diploma engineering program', 'Computer Science & Networks'],
  },
  {
    org: 'Universite Antonine',
    place: 'Baabda, Lebanon',
    role: 'Bachelor of Engineering, Computer Multimedia and Networks Engineering',
    period: '2021 - 2026',
    highlights: ['Student representative', 'Valedictorian'],
  },
];

type Locale = 'en' | 'fr';

const frenchExpertise = [
  { icon: Brain, title: 'IA & systèmes agentiques', skills: expertise[0].skills },
  { icon: Code2, title: 'Frontend, desktop & mobile', skills: expertise[1].skills },
  { icon: Server, title: 'Systèmes, data & backend', skills: expertise[2].skills },
  { icon: Boxes, title: '3D, XR & simulation', skills: expertise[3].skills },
];

const frenchCaseStudies: CaseStudy[] = [
  { index: '01', categories: ['IA & Data'], title: 'Agent conversationnel et d’action IA autonome', overview: 'Système RAG d’entreprise et agentique permettant une recherche en langage naturel dans de grands corpus documentaires et l’exécution d’actions automatisées via des APIs.', highlights: ['Recherche hybride combinant recherche vectorielle dense et recherche lexicale BM25.', 'Filtrage par métadonnées pour éviter les hallucinations entre domaines institutionnels distincts.', 'Routage des intentions entre requêtes informatives et services avec tool calling.'], stack: ['Python', 'Vector Databases', 'LLMs', 'REST APIs'] },
  { index: '02', categories: ['3D & XR'], title: 'Serious game 3D et simulation anatomique interactive', overview: 'Plateforme éducative interactive en 3D WebGL conçue pour simuler en temps réel des mouvements musculaires et des phénomènes biomécaniques complexes.', highlights: ['Pipeline 3D complet, des concepts 2D au rigging des personnages dans Blender et à l’animation.', 'Machines à états personnalisées en C# dans Unity pour le comportement de la simulation interactive.', 'Système bilingue de localisation audio et textuelle dynamique.', 'Optimisation des performances WebGL pour une diffusion dans le navigateur.'], stack: ['Unity URP', 'C#', 'Blender', 'Character Creator', 'WebGL'] },
  { index: '03', categories: ['IA & Data', 'Full-Stack'], title: 'Plateforme de jumeau numérique industriel temps réel', overview: 'Plateforme logicielle connectée pour superviser la télémétrie en temps réel, rejouer des expériences historiques et optimiser des systèmes industriels physiques.', highlights: ['Ingestion de matériel IoT multi-protocoles avec Modbus et CAN bus.', 'Dashboard live pour la supervision opérationnelle en temps réel.', 'Modes de simulation synthétique pour tester des états de fonctionnement anormaux.', 'Optimisation bayésienne des paramètres pour le réglage des systèmes industriels.'], stack: ['Python', 'IoT Gateways', 'Web Dashboards', 'Bayesian Optimization'] },
  { index: '04', categories: ['3D & XR', 'IA & Data'], title: 'Démonstrateur industriel immersif multiplateforme', overview: 'Système unifié d’inspection industrielle multiplateforme présenté lors d’un grand salon européen de la technologie.', highlights: ['Environnement 3D unifié déployé sur WebGL, mobile et VR/AR.', 'Surcouches de données AR spatiales sur des équipements physiques.', 'Assistant conversationnel IA intégré pour inspecter l’état des machines en mains libres.', 'Simulation de signaux en temps réel pour des parcours de démonstration industriels réalistes.'], stack: ['Unity', 'C#', 'Spatial AR/VR', 'WebGL', 'Real-Time Signal Mocking'] },
  { index: '05', categories: ['Full-Stack', 'Mobile'], title: 'Popcorn - application de découverte et de suivi média', overview: 'Application web moderne de découverte et de suivi média, accompagnée d’une application mobile développée avec Kotlin.', highlights: ['Pages dynamiques server-rendered pour une découverte rapide des médias.', 'Intégration API type-safe pour la recherche, les filtres et les pages de détail.', 'UI responsive soignée avec une architecture personnalisée de recherche et de filtres.', 'Expérience mobile Kotlin pour le suivi et la découverte sur Android.'], stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Kotlin'], repository: 'https://github.com/veronicaelhoyekdev/Popcorn' },
  { index: '06', categories: ['Full-Stack', 'Mobile'], title: 'PolyHome - application Android domotique', overview: 'Application Android native de domotique pour gérer les appareils connectés, l’authentification, les accès à la maison et les contrôles d’appareils via une API REST authentifiée.', highlights: ['Développement complet de l’application Android native en Kotlin, de l’authentification et de l’état applicatif aux interfaces des appareils domotiques.', 'Intégration d’une API REST avec gestion JSON et authentification par token Bearer, incluant la persistance locale de l’état d’authentification.', 'Contrôle dynamique et visualisation de l’état des lumières, portes de garage, volets coulissants et volets roulants selon les capacités retournées par l’API.', 'Gestion des accès multi-utilisateurs à la maison : consultation, attribution et révocation des accès.'], stack: ['Kotlin', 'Android', 'REST API', 'JSON', 'Bearer Authentication'] },
  {
    index: '07',
    categories: ['IA & Data', 'Full-Stack'],
    title: 'Veronica.ai — Assistant IA du portfolio',
    overview: 'Assistant IA permettant d’explorer l’expérience, les projets, la formation, les compétences et le parcours de Veronica par des questions en langage naturel, en français ou en anglais.',
    highlights: [
      'Backend RAG Python/FastAPI sur une base de connaissances structurée du portfolio dans PostgreSQL + pgvector, combinant recherche sémantique dense et recherche lexicale de type BM25 via Reciprocal Rank Fusion (RRF).',
      'Planification des requêtes, filtrage par type de document et diversification des résultats pour les questions précises comme les synthèses du parcours ou des projets, sans réponses codées en dur.',
      'Réponses générées par LLM et appuyées sur les sources du portfolio, distinguant l’expérience démontrée des compétences listées et signalant explicitement les informations non étayées pour limiter les hallucinations.',
      'Archivage persistant des questions, réponses, temps de réponse, statuts et sources retrouvées, avec notifications par email en best effort lors des questions des visiteurs.',
      'Intégration au portfolio React/TypeScript en ligne via un endpoint de chat FastAPI.',
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'RAG', 'React', 'TypeScript'],
    repository: 'https://github.com/veronicaelhoyekdev/Veronica-ai',
  },
  {
    index: '08',
    categories: ['Full-Stack'],
    title: 'Bookstore REST API',
    overview: 'Backend RESTful pour gérer les livres, les auteurs et les éditeurs, avec authentification, validation structurée et persistance MongoDB.',
    highlights: [
      'Modèles de requête et de réponse basés sur des DTO.',
      'Authentification et autorisation JWT.',
      'Validation ISBN-10 / ISBN-13 et gestion centralisée des exceptions.',
    ],
    stack: ['Java 17', 'Spring Boot', 'Spring Security', 'MongoDB', 'JWT', 'OpenAPI', 'Docker'],
    repository: 'https://github.com/veronicaelhoyekdev/Bookstore',
  },
];

const frenchExperience = [
  { org: 'Upscale Hub', place: 'Lille, France', role: 'Ingénieure software & systèmes IA : agents conversationnels IA basés sur le RAG, applications desktop Electron, intégrations IoT, serious games Unity et pipelines d’assets Blender, de l’architecture au déploiement.', period: 'Sept. 2024 - Sept. 2026' },
  { org: 'FlexboxAI', place: 'Dubaï, EAU', role: 'Stagiaire multimedia & front-end : création d’animations web interactives à partir d’assets SVG et optimisation pour une intégration fluide dans le navigateur.', period: 'Mai 2024 - Juil. 2024' },
];

const frenchEducation = [
  { org: 'Polytech Dijon', place: 'Dijon, France', role: 'Parcours ingénierie logicielle & intelligence artificielle', period: '2024 - 2026', highlights: ['Programme d’ingénierie à double diplôme', 'Informatique & réseaux'] },
  { org: 'Université Antonine', place: 'Baabda, Liban', role: 'Diplôme d’ingénieur en informatique multimédia et réseaux', period: '2021 - 2026', highlights: ['Représentante des étudiants', 'Major de promotion'] },
];

const translations = {
  en: { nav: ['Expertise', 'Case Studies', 'Experience & Education'], heroRole: 'Software & AI Systems Engineer', heroTitle: 'Engineering', heroTitleAccent: 'Scalable Software', heroTitleEnd: ', Agentic AI Architectures & Intelligent Systems.', heroDescription: 'Engineering scalable software, full-stack systems, and AI-powered applications.', french: 'French: native/bilingual', english: 'English: native/bilingual, TOEIC 990/990', arabic: 'Arabic: native/bilingual', viewCases: 'View Case Studies', download: 'Download Resume PDF', contact: 'Contact', copyEmail: 'Copy Email', emailCopied: 'Email copied', noticeTitle: 'Engineering & Architecture Showcase Note', notice: 'Due to client confidentiality and Non-Disclosure Agreements covering proprietary enterprise codebases at Upscale Hub and partner industries, client code is sanitized. The case studies below highlight the system architectures, agent workflows, technical decision frameworks, and full-stack solutions I have designed and brought to production.', capabilities: 'Capabilities', expertiseTitle: 'Core Technical Expertise', expertiseDescription: 'Full-stack engineering depth across agentic AI, production web systems, industrial data pipelines, and real-time 3D.', selectedWork: 'Selected Work', caseTitle: 'Featured Case Studies', caseDescription: 'Filter by AI & Data, 3D & XR, or Full-Stack systems.', all: 'All', overview: 'Overview', highlights: 'Highlights', stack: 'Stack', trackRecord: 'Track Record', timelineTitle: 'Professional Timeline & Education', experience: 'Experience', education: 'Education', closeMenu: 'Close menu', openMenu: 'Open menu', copyright: 'Copyright 2026 Veronica EL HOYEK', footerRole: 'Software & AI Systems Engineer - Lille, France', localeLabel: 'Language' },
  fr: { nav: ['Expertise', 'Études de cas', 'Expérience & formation'], heroRole: 'Ingénieure software & systèmes IA', heroTitle: 'Concevoir des', heroTitleAccent: 'logiciels scalables', heroTitleEnd: ', des architectures IA agentiques et des systèmes intelligents.', heroDescription: 'Conception de logiciels évolutifs, de systèmes full-stack et d’applications propulsées par l’IA.', french: 'Français : bilingue/natif', english: 'Anglais : bilingue/natif, TOEIC 990/990', arabic: 'Arabe : bilingue/natif', viewCases: 'Voir les études de cas', download: 'Télécharger le CV PDF', contact: 'Contact', copyEmail: 'Copier l’email', emailCopied: 'Email copié', noticeTitle: 'Note sur la présentation de l’ingénierie et de l’architecture', notice: 'En raison de la confidentialité client et des accords de non-divulgation couvrant les codebases propriétaires d’Upscale Hub et de ses partenaires industriels, le code client est anonymisé. Les études de cas ci-dessous présentent les architectures système, les workflows d’agents, les cadres de décision technique et les solutions full-stack que j’ai conçues et mises en production.', capabilities: 'Compétences', expertiseTitle: 'Expertise technique principale', expertiseDescription: 'Une expertise full-stack couvrant l’IA agentique, les systèmes web en production, les pipelines de données industriels et la 3D temps réel.', selectedWork: 'Réalisations sélectionnées', caseTitle: 'Études de cas principales', caseDescription: 'Filtrer par systèmes IA & Data, 3D & XR ou Full-Stack.', all: 'Toutes', overview: 'Vue d’ensemble', highlights: 'Points clés', stack: 'Stack', trackRecord: 'Parcours', timelineTitle: 'Parcours professionnel & formation', experience: 'Expérience', education: 'Formation', closeMenu: 'Fermer le menu', openMenu: 'Ouvrir le menu', copyright: 'Copyright 2026 Veronica EL HOYEK', footerRole: 'Ingénieure software & systèmes IA - Lille, France', localeLabel: 'Langue' },
} as const;

type Translation = typeof translations.en;
const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void }>({ locale: 'en', setLocale: () => undefined });

function useLocale() {
  const { locale, setLocale } = useContext(LocaleContext);
  return { locale, setLocale, t: translations[locale] as Translation };
}

export function App() {
  const [locale, setLocale] = useState<Locale>(() => (localStorage.getItem('portfolio-locale') as Locale) || 'en');

  useEffect(() => {
    localStorage.setItem('portfolio-locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <Notice />
          <Expertise />
          <CaseStudies />
          <Timeline />
        </main>
        <Footer />
        <VeronicaAI locale={locale} />
      </div>
    </LocaleContext.Provider>
  );
}

function Header() {
  const { locale, setLocale, t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-panel border-x-0 border-t-0' : 'border-b border-transparent'}`}>
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-surface-elevated text-primary transition-colors group-hover:border-sky-500">
            <Terminal className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold tracking-tight">Veronica EL HOYEK</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item, index) => (
            <li key={item.href}>
              <a href={item.href} className="rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                {t.nav[index] ?? item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-sm border border-border bg-surface p-0.5" aria-label={t.localeLabel}>
            {(['en', 'fr'] as Locale[]).map((option) => (
              <button key={option} type="button" onClick={() => setLocale(option)} aria-pressed={locale === option} className={`rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${locale === option ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                {option}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? t.closeMenu : t.openMenu} className="rounded-sm border border-border p-2 text-foreground lg:hidden">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="glass-panel border-x-0 border-b border-t-0 lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
            {nav.map((item, index) => (
              <li key={item.label}>
                <a href={item.href} onClick={() => setOpen(false)} className="block border-b border-border py-3 text-sm text-muted-foreground last:border-0 hover:text-foreground">
                  {t.nav[index] ?? item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const { t, locale } = useLocale();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="grid-texture pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-teal-200/55 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_21rem] lg:items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">{t.heroRole}</p>
            <h1 className="mt-5 text-4xl leading-[1.06] font-semibold sm:text-5xl lg:text-[3.4rem]">
              Veronica EL HOYEK
              <span className="mt-4 block max-w-4xl text-2xl leading-snug text-muted-foreground sm:text-3xl lg:text-[2rem]">
                {t.heroTitle} <span className="text-gradient">{t.heroTitleAccent}</span>{t.heroTitleEnd}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {t.heroDescription}
            </p>
            <p className="mt-8 text-xl font-semibold text-foreground sm:text-2xl">{contact.location}</p>
            <div className="mt-2 space-y-1 text-sm leading-relaxed text-muted-foreground">
              <p>{t.french}</p>
              <p>{t.english}</p>
              <p>{t.arabic}</p>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#case-studies" className="glow-ring inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
                {t.viewCases}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={`/resume-${locale}.pdf`} download={`Veronica EL HOYEK 2026 - ${locale}.pdf`} className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-sky-500 hover:text-accent">
                {t.download}
              </a>
            </div>
          </div>
          <aside className="glass-panel rounded-lg p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">{t.contact}</p>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <a href={`mailto:${contact.email}`} className="block break-all hover:text-accent">{contact.email}</a>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="block hover:text-accent">{contact.phone}</a>
              <p>{contact.location}</p>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <button type="button" onClick={copyEmail} className="inline-flex justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
                {copied ? t.emailCopied : t.copyEmail}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Notice() {
  const { t } = useLocale();
  return (
    <section aria-labelledby="notice-title" className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
      <div className="glass-panel relative overflow-hidden rounded-lg p-6 sm:p-7">
        <span className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-teal-600 via-sky-600 to-transparent" aria-hidden="true" />
        <div className="flex flex-col gap-4 sm:flex-row">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-teal-200 bg-teal-50 text-primary">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 id="notice-title" className="text-base font-semibold">{t.noticeTitle}</h2>
            <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted-foreground">
              {t.notice}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  const { locale, t } = useLocale();
  const localizedExpertise = locale === 'fr' ? frenchExpertise : expertise;
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading id="expertise-title" eyebrow={t.capabilities} title={t.expertiseTitle} description={t.expertiseDescription} />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {localizedExpertise.map((group) => (
          <article key={group.title} className="glass-panel hover-lift group rounded-lg p-6">
            <div className="flex items-center gap-3">
              <IconBox icon={group.icon} />
              <h3 className="text-base font-semibold">{group.title}</h3>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill} className="rounded-sm border border-border bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-teal-500/40 hover:text-foreground">
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function CaseStudies() {
  const { locale, t } = useLocale();
  const filters = locale === 'fr' ? [t.all, 'IA & Data', '3D & XR', 'Full-Stack', 'Mobile'] : ['All', 'AI & Data', '3D & XR', 'Full-Stack', 'Mobile'];
  const localizedCaseStudies = locale === 'fr' ? frenchCaseStudies : caseStudies;
  const [activeFilter, setActiveFilter] = useState('All');
  const allFilter = locale === 'fr' ? t.all : 'All';
  useEffect(() => setActiveFilter(allFilter), [locale, allFilter]);
  const visibleCaseStudies = activeFilter === allFilter || activeFilter === 'All' ? localizedCaseStudies : localizedCaseStudies.filter((cs) => cs.categories.includes(activeFilter));

  return (
    <section id="case-studies" aria-labelledby="case-studies-title" className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading id="case-studies-title" eyebrow={t.selectedWork} title={t.caseTitle} description={t.caseDescription} />
        <div className="flex flex-wrap gap-2" aria-label="Case study filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-md border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                activeFilter === filter
                  ? 'border-teal-500/50 bg-teal-50 text-primary'
                  : 'border-border bg-surface text-muted-foreground hover:border-sky-500/50 hover:text-accent'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-10 space-y-5">
        {visibleCaseStudies.map((cs) => (
          <article key={cs.index} className="glass-panel hover-lift rounded-lg p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="font-mono text-xs text-primary">CASE_{cs.index}</span>
                <h3 className="mt-2 text-xl font-semibold sm:text-2xl">{cs.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cs.categories.map((category) => (
                    <span key={category} className="rounded-sm border border-border bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              {cs.repository && (
                <a href={cs.repository} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 self-start rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-sky-500 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600">
                  {locale === 'fr' ? 'Voir le dépôt GitHub' : 'View GitHub repository'}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
            <div className="mt-6 rounded-md border border-border bg-slate-50/80 p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">{t.overview}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cs.overview}</p>
            </div>
            <div className="mt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">{t.highlights}</p>
              <ul className="mt-4 space-y-3 border-l border-border pl-5">
                {cs.highlights.map((highlight, i) => (
                  <li key={highlight} className="relative">
                    <span className="absolute -left-[1.55rem] top-1.5 h-2 w-2 rounded-full bg-sky-500 ring-4 ring-white" aria-hidden="true" />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <span className="mr-2 font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                      {highlight}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{t.stack}</span>
              {cs.stack.map((tech) => (
                <span key={tech} className="rounded-sm border border-border bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Timeline() {
  const { locale, t } = useLocale();
  return (
    <section id="experience" aria-labelledby="experience-title" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <SectionHeading id="experience-title" eyebrow={t.trackRecord} title={t.timelineTitle} />
      <div className="mt-10 grid gap-12 md:grid-cols-2">
        <Track title={t.experience} icon={Briefcase} items={locale === 'fr' ? frenchExperience : experience} />
        <Track title={t.education} icon={GraduationCap} items={locale === 'fr' ? frenchEducation : education} />
      </div>
    </section>
  );
}

function Track({ title, icon: Icon, items }: { title: string; icon: LucideIcon; items: { org: string; place: string; role: string; period: string; highlights?: string[] }[] }) {
  return (
    <div>
      <h3 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
        {title}
      </h3>
      <ol className="mt-6 space-y-4 border-l border-border pl-6">
        {items.map((item) => (
          <li key={item.org} className="glass-panel hover-lift relative rounded-lg p-5">
            <span className="absolute -left-[1.9rem] top-6 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-white" aria-hidden="true" />
            <p className="font-mono text-[11px] text-accent">{item.period}</p>
            <p className="mt-2 text-base font-semibold">{item.org}</p>
            <p className="text-sm text-muted-foreground">{item.role}</p>
            {item.highlights && (
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">{item.place}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Footer() {
  const { t } = useLocale();
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>{t.copyright}</p>
        <p className="font-mono">{t.footerRole}</p>
      </div>
    </footer>
  );
}

function SectionHeading({ eyebrow, title, description, id }: { eyebrow: string; title: string; description?: string; id?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-2xl font-semibold sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  );
}

function IconBox({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface-elevated text-primary transition-colors group-hover:border-teal-500/40 group-hover:text-accent">
      <Icon className="h-4 w-4" aria-hidden="true" />
    </span>
  );
}
