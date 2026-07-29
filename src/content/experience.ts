export type Role = {
  id: string;
  company: string;
  title: string;
  dates: string;
  range: string;
  scope: string;
  contributions: string[];
  technologies: string[];
};

export const roles: Role[] = [
  {
    id: "zoolatech",
    company: "Zoolatech",
    title: "Senior Software Engineer",
    dates: "2024–2026",
    range: "September 2024 – September 2026",
    scope:
      "Production retrieval systems, a laboratory workflow module, and reliability work across services that other people depend on after launch.",
    contributions: [
      "Built a retrieval-augmented knowledge search pipeline with LangGraph, pgvector, output validation, and source citations.",
      "Owned technical planning and delivery for a laboratory automation workflow used to configure remote machine workflows, including integrations across five micro-frontends and Python and NestJS services.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "NestJS",
      "PostgreSQL",
      "pgvector",
      "LangGraph",
      "Terraform",
      "New Relic",
    ],
  },
  {
    id: "airbnb",
    company: "Airbnb",
    title: "Software Engineer",
    dates: "2020–2024",
    range: "March 2020 – September 2024",
    scope:
      "Booking, payments, and Trust & Safety systems, where a duplicated event or an inconsistent case state is a product bug.",
    contributions: [
      "Separated payment validation and execution from booking-specific orchestration, and implemented idempotent Kafka handlers for booking and payout events.",
      "Built internal Trust & Safety tooling in React, Node.js, and GraphQL, including case-state validation and a recovery path for incomplete compliance screening.",
    ],
    technologies: ["Kafka", "Node.js", "React", "GraphQL"],
  },
  {
    id: "tcs",
    company: "Tata Consultancy Services",
    title: "Full Stack Developer",
    dates: "2018–2020",
    range: "2018 – 2020",
    scope:
      "Full-stack delivery on enterprise client systems, from the interface through the APIs and the release process behind them.",
    contributions: [
      "Shipped application features across product interfaces and the services those interfaces called.",
      "Supported integration testing and production releases for client systems.",
    ],
    technologies: [],
  },
];

export const capabilityGroups = [
  {
    id: "backend",
    title: "Backend Engineering",
    summary: "Python, Go, Node.js, FastAPI, NestJS, APIs.",
    detail:
      "Services with explicit contracts, boring failure modes, and enough structure that the next change is local.",
  },
  {
    id: "distributed",
    title: "Distributed Systems",
    summary: "Kafka, concurrency, idempotency, retries, service reliability.",
    detail:
      "Events that can arrive twice, dependencies that can stall, and consumers that still do the business action once.",
  },
  {
    id: "ai",
    title: "Applied AI",
    summary: "RAG, LangGraph, pgvector, retrieval, LLM tool workflows.",
    detail:
      "Retrieval, tool coordination, validation, and citations — so a generated answer has somewhere to stand.",
  },
  {
    id: "frontend",
    title: "Frontend & Product",
    summary: "React, TypeScript, Next.js, GraphQL, micro-frontends.",
    detail:
      "Interfaces that make a complicated system legible, including boundaries between separately shipped frontends.",
  },
  {
    id: "cloud",
    title: "Cloud & Observability",
    summary:
      "AWS, Azure, Docker, Kubernetes, Terraform, New Relic, Grafana.",
    detail:
      "Infrastructure and signals that tell you whether the system you shipped is still the system you think you have.",
  },
] as const;
