export type Mission = {
  id: string;
  title: string;
  codename: string;
  category: "AI" | "Backend" | "Systems" | "Full stack";
  summary: string;
  image: string;
  repo: string;
  live?: string;
  difficulty: "Elite" | "Legendary" | "Advanced";
  completion: number;
  stack: string[];
  story: string;
  challenge: string;
  solution: string;
  result: string;
  metric: string;
  accent: "mint" | "cyan" | "amber" | "rose";
};

export const missions: Mission[] = [
  {
    id: "gitagpt",
    title: "Gita GPT",
    codename: "Project Dharma",
    category: "AI",
    summary: "A source-grounded Bhagavad Gita study platform designed to grow from a local demo into a multi-user AI service.",
    image: "/projects/gitagpt.png",
    repo: "https://github.com/Anishhar03/gitagpt",
    live: "https://gitagpt-web-anishhar03.onrender.com",
    difficulty: "Legendary",
    completion: 100,
    stack: ["React", "FastAPI", "PostgreSQL", "pgvector", "Redis", "RQ", "Docker"],
    story: "The original proof of concept could answer questions, but it had no durable users, citations, ingestion pipeline, or operational path. The mission was to turn the idea into a production-shaped platform without losing its no-key accessibility.",
    challenge: "Retrieval quality, model outages, background PDF indexing, identity, rate limits, and multi-user state all had to coexist without making the local experience fragile.",
    solution: "Hybrid vector and lexical retrieval grounds every answer in indexed passages. A Gemini to Groq to deterministic-local provider chain contains model failure, while stateless APIs, Redis-backed coordination, RQ workers, migrations, probes, metrics, and CI create independent scaling boundaries.",
    result: "A resilient study workspace with citations, bookmarks, persistent conversations, admin ingestion, structured observability, and a public deployment that still works when no hosted AI key is available.",
    metric: "3-stage AI fallback",
    accent: "mint",
  },
  {
    id: "tripmate",
    title: "TripMate AI",
    codename: "Atlas Protocol",
    category: "AI",
    summary: "An agentic travel-planning workspace with offline PWA behavior and optional server-side orchestration.",
    image: "/projects/tripmate-ai.jpg",
    repo: "https://github.com/Anishhar03/tripmate-ai",
    difficulty: "Elite",
    completion: 96,
    stack: ["FastAPI", "LangGraph", "Groq", "PostgreSQL", "PWA", "OpenStreetMap"],
    story: "Travel planning is not one prompt. Research quality, route order, budget, safety, persistence, and offline access form a chain of decisions with different failure modes.",
    challenge: "The planner needed explainable multi-agent behavior and durable plans, while the public client also had to remain useful with no API, key, database, or network connection.",
    solution: "A sequential LangGraph lets research create shared context before route, budget, and safety roles consume it. Every run emits an agent trace. A deterministic device-side planner, local storage, and service-worker shell provide a complete fallback path.",
    result: "A responsive installable workspace with itinerary editing, map routes, readiness checks, budget protection, export, sharing, and optional multi-device persistence.",
    metric: "4 specialist agents",
    accent: "cyan",
  },
  {
    id: "packet-analyser",
    title: "Packet Analyser",
    codename: "Deep Signal",
    category: "Systems",
    summary: "A dependency-light C++17 engine for offline packet parsing, deep traffic inspection, filtering, and reports.",
    image: "/projects/Packet_Analyser.png",
    repo: "https://github.com/Anishhar03/Packet_Analyser",
    difficulty: "Legendary",
    completion: 94,
    stack: ["C++17", "CMake", "PCAP", "DPI", "TCP/IP", "GitHub Actions"],
    story: "Raw captures are useful only after bytes become protocols, flows, applications, risks, and decisions. This mission builds that translation pipeline without a heavy packet-processing dependency.",
    challenge: "Safely parse variable network headers, track five-tuple flows, infer application traffic even under encryption, and preserve allowed packets across platforms.",
    solution: "Layered parsers decode Ethernet, IPv4, TCP, UDP, ICMP, DNS, HTTP hosts, and TLS SNI. Rules target IPs, ports, domains, and inferred applications; the pipeline emits filtered PCAP plus JSON, CSV, and standalone HTML reports.",
    result: "A cross-platform analyzer with synthetic test captures, automated CMake smoke tests, flow search, verdict filtering, and clear limitations around encrypted Client Hello.",
    metric: "8 protocol layers",
    accent: "amber",
  },
  {
    id: "hotel-security",
    title: "Hotel Security",
    codename: "Sentinel Desk",
    category: "Full stack",
    summary: "A Spring Boot and React security-operations dashboard with roles, audit history, and a production-style single artifact.",
    image: "/projects/hotel_security_java.png",
    repo: "https://github.com/Anishhar03/hotel_security_java",
    difficulty: "Advanced",
    completion: 100,
    stack: ["Java 17", "Spring Boot", "Spring Security", "React", "Vite", "Docker"],
    story: "Hotel operations need a clear distinction between staff visibility and administrator control, with every sensitive room-state change captured for review.",
    challenge: "Unify frontend and backend deployment, enforce role boundaries, validate room transitions, and preserve an audit trail without introducing infrastructure that the workload did not need.",
    solution: "Spring Security protects staff and admin routes, services own transition rules, file repositories preserve room and audit data, and the built React client is packaged inside the Spring Boot jar.",
    result: "One deployable application with room filters, statistics, admin mutation flows, audit history, Docker packaging, and a CI pipeline that builds and tests both halves.",
    metric: "1 production artifact",
    accent: "rose",
  },
  {
    id: "microservices",
    title: "Microservices Comms",
    codename: "Sidecar Relay",
    category: "Backend",
    summary: "A focused Spring Boot laboratory for service ownership, REST communication, correlation, and Envoy sidecars.",
    image: "/projects/microservices_communaication.png",
    repo: "https://github.com/Anishhar03/microservices_communaication",
    difficulty: "Elite",
    completion: 90,
    stack: ["Spring Boot", "REST", "Envoy", "Docker Compose", "Resilience4j", "OpenTelemetry"],
    story: "The order service must reserve stock owned by inventory. The boundary looks simple until network failure, observability, routing, and ownership enter the picture.",
    challenge: "Demonstrate direct service calls and service-mesh behavior in a local setup that remains understandable to someone learning distributed systems.",
    solution: "Order and inventory expose narrow APIs with correlation IDs. An optional Compose profile routes calls through egress and ingress Envoy sidecars, keeping traffic policy separate from business code.",
    result: "A runnable architecture lab that makes data ownership, service discovery, retries, circuit breakers, telemetry, mTLS, and traffic policy concrete.",
    metric: "2 services + 2 sidecars",
    accent: "cyan",
  },
  {
    id: "plainlist",
    title: "Plainlist",
    codename: "Clean Boundary",
    category: "Full stack",
    summary: "A production-quality React, Django, MongoDB, and Docker task application built around explicit architecture boundaries.",
    image: "/projects/adb_test.png",
    repo: "https://github.com/Anishhar03/adb_test",
    difficulty: "Advanced",
    completion: 100,
    stack: ["React", "Django REST", "PyMongo", "MongoDB", "Docker", "Pytest"],
    story: "A small assignment becomes a design test when failures, validation, persistence, accessibility, and future change are treated as first-class behavior.",
    challenge: "Keep the implementation compact while making MongoDB authoritative and separating UI, transport, domain rules, and persistence well enough to test each layer.",
    solution: "React components delegate orchestration to a useTodos hook and API adapter. Django views translate HTTP, a service normalizes rules, and a repository protocol inverts the database dependency for fast tests.",
    result: "A complete CRUD workflow with filters, search, cancellation, structured errors, health probes, containerized persistence, accessibility states, and focused tests.",
    metric: "6 explicit layers",
    accent: "mint",
  },
];

export type SkillBranch = {
  id: string;
  label: string;
  color: "mint" | "cyan" | "amber" | "rose";
  description: string;
  skills: { name: string; level: number; xp: string; proof: string }[];
};

export const skillBranches: SkillBranch[] = [
  {
    id: "backend",
    label: "Backend systems",
    color: "mint",
    description: "APIs, persistence, queues, reliability, and clean domain boundaries.",
    skills: [
      { name: "FastAPI", level: 91, xp: "9,100 XP", proof: "Gita GPT and TripMate production APIs" },
      { name: "Spring Boot", level: 88, xp: "8,800 XP", proof: "Security operations and microservice labs" },
      { name: "PostgreSQL", level: 86, xp: "8,600 XP", proof: "Durable AI and travel state" },
      { name: "Redis + queues", level: 82, xp: "8,200 XP", proof: "Rate limits, transient state, RQ ingestion" },
    ],
  },
  {
    id: "ai",
    label: "AI and agents",
    color: "cyan",
    description: "Grounded generation, retrieval, agent graphs, evaluation, and graceful fallbacks.",
    skills: [
      { name: "RAG + pgvector", level: 91, xp: "9,100 XP", proof: "Hybrid retrieval with passage citations" },
      { name: "LangGraph", level: 87, xp: "8,700 XP", proof: "Sequential multi-agent travel planner" },
      { name: "Provider resilience", level: 90, xp: "9,000 XP", proof: "Gemini, Groq, deterministic fallback chain" },
      { name: "Agent architecture", level: 86, xp: "8,600 XP", proof: "46-video study lab with runnable examples" },
    ],
  },
  {
    id: "frontend",
    label: "Product interface",
    color: "amber",
    description: "Responsive React products, offline behavior, state orchestration, and accessible feedback.",
    skills: [
      { name: "React", level: 89, xp: "8,900 XP", proof: "Multiple production-shaped workspaces" },
      { name: "TypeScript", level: 84, xp: "8,400 XP", proof: "Typed interactive web applications" },
      { name: "PWA systems", level: 81, xp: "8,100 XP", proof: "Offline shell, local planner, install flow" },
      { name: "Interaction design", level: 85, xp: "8,500 XP", proof: "Responsive, complete loading and failure states" },
    ],
  },
  {
    id: "systems",
    label: "Systems and platform",
    color: "rose",
    description: "Networking, containers, observability, service communication, and build pipelines.",
    skills: [
      { name: "C++ networking", level: 84, xp: "8,400 XP", proof: "Dependency-light packet analysis engine" },
      { name: "Docker", level: 89, xp: "8,900 XP", proof: "Production-shaped multi-service stacks" },
      { name: "Observability", level: 82, xp: "8,200 XP", proof: "Metrics, probes, logs, request correlation" },
      { name: "System design", level: 88, xp: "8,800 XP", proof: "HLD, LLD, and service-mesh repositories" },
    ],
  },
];

export const timeline = [
  {
    id: "foundation",
    phase: "Foundation",
    title: "Computer Science at BIT Mesra",
    detail: "Building the core map across algorithms, operating systems, networks, databases, and software engineering. Expected graduation: 2026.",
    coordinate: "23.41 N / 85.44 E",
  },
  {
    id: "oracle",
    phase: "Industry mission",
    title: "SDE Intern at Oracle",
    detail: "Applied engineering discipline inside a large software organization, with an emphasis on maintainable systems and real delivery constraints.",
    coordinate: "Enterprise sector",
  },
  {
    id: "open-source",
    phase: "Builder campaign",
    title: "55 Public Repositories",
    detail: "A broad lab spanning production AI, agentic systems, C++ networking, Spring Boot security, system design, full-stack products, and interview-grade documentation.",
    coordinate: "github.com/Anishhar03",
  },
  {
    id: "now",
    phase: "Current quest",
    title: "Scale useful systems",
    detail: "Converting prototypes into observable, secure, resilient products with a clean user experience and an honest fallback path.",
    coordinate: "Available for opportunities",
  },
];

export const achievements = [
  { id: "archive", title: "Archive Keeper", detail: "Published 55 public repositories", xp: 5500 },
  { id: "fallback", title: "Failure Tamer", detail: "Designed a three-stage AI provider fallback", xp: 1800 },
  { id: "polyglot", title: "Polyglot Builder", detail: "Shipped Java, Python, C++, JavaScript, and TypeScript systems", xp: 2400 },
  { id: "documentarian", title: "Field Manual", detail: "Built deep HLD, LLD, and agentic AI learning archives", xp: 2100 },
];

export const activeQuests = [
  { title: "Production AI", status: "Active", detail: "Grounded answers, evaluation, provider resilience, and explainable agents." },
  { title: "Distributed systems", status: "Active", detail: "Service boundaries, traffic policy, observability, and failure handling." },
  { title: "Backend opportunities", status: "Open", detail: "Engineering roles where reliability and product judgment both matter." },
];
