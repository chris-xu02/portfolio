export type OpenSourceRepo = {
  name: string;
  href: string;
  tag: string;
  summary: string;
};

/** Public repositories on https://github.com/chris-xu02 */
export const openSourceRepos: OpenSourceRepo[] = [
  {
    name: "portfolio",
    href: "https://github.com/chris-xu02/portfolio",
    tag: "This site",
    summary: "Next.js portfolio — work, about, contact.",
  },
  {
    name: "llm-rag-service",
    href: "https://github.com/chris-xu02/llm-rag-service",
    tag: "Applied AI",
    summary: "FastAPI, pgvector, ARQ workers, retrieval-first RAG.",
  },
  {
    name: "cited-rag-validator",
    href: "https://github.com/chris-xu02/cited-rag-validator",
    tag: "Applied AI",
    summary: "Citation checks and refusal rules for RAG responses.",
  },
  {
    name: "kafka-idempotent-handlers",
    href: "https://github.com/chris-xu02/kafka-idempotent-handlers",
    tag: "Distributed",
    summary: "Idempotent Kafka-style event handlers with a processed-key store.",
  },
  {
    name: "case-state-guard",
    href: "https://github.com/chris-xu02/case-state-guard",
    tag: "Distributed",
    summary: "Finite-state validation for ops / review queues.",
  },
  {
    name: "workflow-contracts",
    href: "https://github.com/chris-xu02/workflow-contracts",
    tag: "Full stack",
    summary: "Shared workflow DTOs across micro-frontends and services.",
  },
  {
    name: "multi-lang-infra",
    href: "https://github.com/chris-xu02/multi-lang-infra",
    tag: "Platform",
    summary: "EKS, Terraform, CI/CD, observability reference layout.",
  },
  {
    name: "revora",
    href: "https://github.com/chris-xu02/revora",
    tag: "Product",
    summary: "Lead-gen monorepo — FastAPI, Next.js, tests.",
  },
  {
    name: "payment-orchestration-split",
    href: "https://github.com/chris-xu02/payment-orchestration-split",
    tag: "Distributed",
    summary: "Validate-then-execute payment boundary.",
  },
  {
    name: "pgvector-recall-bench",
    href: "https://github.com/chris-xu02/pgvector-recall-bench",
    tag: "Applied AI",
    summary: "Cosine retrieval SQL and EXPLAIN notes.",
  },
  {
    name: "nest-fastapi-bridge",
    href: "https://github.com/chris-xu02/nest-fastapi-bridge",
    tag: "Full stack",
    summary: "Nest ↔ FastAPI workflow HTTP contracts.",
  },
];

export const githubProfile = "https://github.com/chris-xu02";