export type VisualKind =
  | "rag"
  | "lab"
  | "payments"
  | "trust"
  | "reliability";

export type Project = {
  slug: string;
  index: string;
  title: string;
  company: string;
  period: string;
  role: string;
  summary: string;
  technologies: string[];
  featured: boolean;
  visual: VisualKind;
  overview: string;
  context: string;
  constraints: string[];
  responsibilities: string[];
  architecture: string[];
  decisions: { title: string; body: string }[];
  tradeoffs: { title: string; body: string }[];
  outcomes: string[];
  lessons: string[];
};

export const projects: Project[] = [
  {
    slug: "ai-knowledge-search",
    index: "01",
    title: "AI Knowledge Search & RAG Platform",
    company: "Zoolatech",
    period: "Within Sep 2024 – Sep 2026",
    role: "Senior Software Engineer",
    summary:
      "A retrieval pipeline that answers from business documents and knowledge-base content, with citations and a check on the output.",
    technologies: [
      "Python",
      "PostgreSQL",
      "pgvector",
      "LangGraph",
      "RAG",
    ],
    featured: true,
    visual: "rag",
    overview:
      "People were asking questions the knowledge base already answered, then waiting on someone who knew where the answer lived. I built a retrieval-augmented search pipeline so a question could come back with the passages it actually used.",
    context:
      "The source material was business documents and knowledge-base content, not a public web crawl. The useful outcome was a response a person could check, not a fluent paragraph with nowhere to look.",
    constraints: [
      "Answers had to stay tied to retrieved sources.",
      "The model was a component in a pipeline, not the system of record.",
      "Nothing on this page is a live model call or a real internal document.",
    ],
    responsibilities: [
      "Designed the retrieval path from documents into a searchable index.",
      "Used LangGraph to coordinate retrieval and backend-tool steps.",
      "Added output validation and source citations on the response.",
    ],
    architecture: [
      "Documents",
      "Retrieval index",
      "pgvector search",
      "LangGraph orchestration",
      "Validated, cited response",
    ],
    decisions: [
      {
        title: "Retrieve before you generate.",
        body: "The response is assembled from retrieved chunks. Generation comes after the system has something specific to point at, which makes a citation possible and a vague answer easier to reject.",
      },
      {
        title: "Orchestrate the steps explicitly.",
        body: "LangGraph coordinates retrieval and backend-tool calls as a graph of steps instead of one opaque prompt. That makes the path inspectable when an answer is wrong.",
      },
      {
        title: "Validate the output.",
        body: "A citation is not useful if the response ignores it. Validation checks that the answer stays consistent with the sources the pipeline selected.",
      },
    ],
    tradeoffs: [
      {
        title: "Recall versus a short context.",
        body: "Pulling more passages raises the chance the right fact is present and also the chance the model attends to the wrong one. The pipeline prefers a smaller, cited context over a long unranked dump.",
      },
      {
        title: "A graph is more code than a single call.",
        body: "Explicit steps cost more to build than one prompt. They cost less the first time you need to explain why an answer cited the wrong document.",
      },
    ],
    outcomes: [
      "The pipeline returns source-backed responses from business and knowledge-base documents.",
      "Citations and output validation are part of the response path, not a later add-on.",
      "No usage volume or accuracy percentage is stated here, because those figures were not part of the verified record.",
    ],
    lessons: [
      "A retrieval system is a data system with a language model at the end. Indexing, chunk boundaries, and what you refuse to answer matter as much as the prompt.",
      "Citations change the product. They give the reader a way to disagree with the model using the same evidence.",
    ],
  },
  {
    slug: "laboratory-workflow-builder",
    index: "02",
    title: "Laboratory Workflow Builder",
    company: "Zoolatech",
    period: "Within Sep 2024 – Sep 2026",
    role: "Senior Software Engineer",
    summary:
      "A workflow module scientists use to configure remote machine workflows, integrated across five micro-frontends and backend services.",
    technologies: ["Python", "NestJS", "React", "Micro-frontends"],
    featured: true,
    visual: "lab",
    overview:
      "Scientists needed to configure workflows for remote machines without the configuration living in five different screens that did not agree. I owned technical planning and delivery for the module that brought that work into one place.",
    context:
      "The module sits across several product surfaces. The hard part was not drawing boxes on a canvas. It was deciding which frontend owned which data, and which backend service was allowed to change a workflow.",
    constraints: [
      "Five micro-frontends already existed and had to keep shipping.",
      "Scientists were configuring remote machines, so a confusing state was an operational problem.",
      "Instrument vendors, protocols, and customer names are intentionally not specified here.",
    ],
    responsibilities: [
      "Owned technical planning and delivery for the workflow module.",
      "Designed data integrations across five micro-frontends.",
      "Contributed to the Python and NestJS services behind the module.",
    ],
    architecture: [
      "Five micro-frontend areas",
      "Integration boundaries",
      "Python services",
      "NestJS services",
      "Workflow configuration",
    ],
    decisions: [
      {
        title: "Treat the frontends as a distributed system.",
        body: "Five micro-frontends means five deployment clocks. Shared workflow data needed explicit boundaries so one screen could not silently overwrite another.",
      },
      {
        title: "Keep configuration and execution apart.",
        body: "Configuring a workflow and running it on a remote machine are different moments. The module lets a scientist shape the workflow before anything is asked of the machine.",
      },
      {
        title: "Put the contract in the services.",
        body: "Python and NestJS services own the workflow data. The frontends render and edit it. That kept each screen thinner than a second copy of the rules.",
      },
    ],
    tradeoffs: [
      {
        title: "Integration work is slower than a single app.",
        body: "A greenfield canvas would have been faster to demo and worse to land inside a product that was already split five ways. The time went into the boundaries.",
      },
      {
        title: "A visual editor can hide state.",
        body: "Nodes and edges feel simple until two people edit the same workflow. The design favors a readable configuration over a canvas that pretends to be the whole system.",
      },
    ],
    outcomes: [
      "Scientists can configure remote machine workflows in a dedicated module.",
      "Data crosses five micro-frontends through defined integration boundaries rather than ad hoc screen-to-screen coupling.",
      "No instrument vendor, protocol, or customer is named, because those details were not provided for publication.",
    ],
    lessons: [
      "Micro-frontends fail at the data, not at the router. The integration contract is the product.",
      "An operations UI should show the state a person can act on. Decorative nodes are not a workflow.",
    ],
  },
  {
    slug: "booking-payment-infrastructure",
    index: "03",
    title: "Booking & Payment Infrastructure",
    company: "Airbnb",
    period: "Within Mar 2020 – Sep 2024",
    role: "Software Engineer",
    summary:
      "Payment validation and execution, split from booking orchestration, with idempotent handling for booking and payout events.",
    technologies: ["Kafka", "Node.js", "APIs"],
    featured: true,
    visual: "payments",
    overview:
      "Booking and payment were easy to tangle: one flow that both decided whether a stay could be confirmed and moved money. I worked on separating validation and execution from booking-specific orchestration, and on Kafka handlers that stay correct when an event is delivered more than once.",
    context:
      "A booking event and a payout event are not just messages. They represent a business result that must happen once. At-least-once delivery is a feature of the log, not a bug, so the consumer has to be the thing that makes the outcome single.",
    constraints: [
      "Events can be retried. The business result cannot be duplicated.",
      "Payment rules and booking rules change for different reasons and should not live in one procedure.",
      "Internal service topology, volumes, and latency numbers are not published here.",
    ],
    responsibilities: [
      "Separated payment validation and execution from booking-specific orchestration.",
      "Implemented idempotent Kafka handlers for booking and payout events.",
      "Investigated service latency with dependency tracing and database execution plans.",
    ],
    architecture: [
      "Booking request",
      "Payment validation",
      "Payment execution",
      "Kafka event",
      "Idempotent consumer",
    ],
    decisions: [
      {
        title: "Validate, then execute.",
        body: "Validation answers whether the payment is allowed. Execution moves the money. Mixing them into booking orchestration made every booking rule a payment rule. Splitting them gave each change a smaller blast radius.",
      },
      {
        title: "Make the consumer idempotent.",
        body: "The handler records the event identity before it applies the business write. A redelivery finds that record and returns the original result instead of creating a second one.",
      },
      {
        title: "Read the trace before tuning the query.",
        body: "Latency work started from dependency traces and database execution plans, so the next change was aimed at the call that was actually slow.",
      },
    ],
    tradeoffs: [
      {
        title: "Idempotency is a storage decision.",
        body: "Remembering a processed key costs a write and a lookup on the hot path. The alternative is a duplicate payout, which costs more and is harder to explain.",
      },
      {
        title: "A cleaner boundary adds a hop.",
        body: "Separating validation from execution adds an interface. It also means a booking change does not have to reopen the payment path, and the reverse.",
      },
    ],
    outcomes: [
      "Payment validation and execution could change without being buried in booking orchestration.",
      "Booking and payout handlers were built to ignore duplicate deliveries.",
      "Latency investigations used traces and query plans. No improvement percentage is claimed, because one was not verified for publication.",
    ],
    lessons: [
      "Exactly-once is usually a story you tell at the consumer, with a key and a record, not a setting you flip on the broker.",
      "If you cannot name the slow dependency, you are not ready to optimize it.",
    ],
  },
  {
    slug: "trust-safety-operations",
    index: "04",
    title: "Trust & Safety Operations",
    company: "Airbnb",
    period: "Within Mar 2020 – Sep 2024",
    role: "Software Engineer",
    summary:
      "Internal review tooling with consistent case states, plus a recovery path for compliance screening that did not finish.",
    technologies: ["React", "Node.js", "GraphQL"],
    featured: false,
    visual: "trust",
    overview:
      "Trust & Safety review breaks when two people can look at the same case and see different truths. I worked on internal tooling that kept case state valid, and on a way to redrive screening that had stopped halfway.",
    context:
      "The interface was for operators, not guests. The important objects were cases, their allowed states, and a history of what had already been tried. The dashboard on this site is a synthetic stand-in with fictional cases.",
    constraints: [
      "A case should not enter a state the review process does not allow.",
      "An incomplete compliance screening case still needs a path forward.",
      "No real case, person, or internal identifier appears on this site.",
    ],
    responsibilities: [
      "Developed internal Trust & Safety tooling in React, Node.js, and GraphQL.",
      "Implemented case-state validation so reviews stayed consistent.",
      "Worked on a recovery and redrive mechanism for incomplete compliance screening cases.",
    ],
    architecture: [
      "Review queue",
      "Case state",
      "Validation",
      "Recovery / redrive",
      "Case history",
    ],
    decisions: [
      {
        title: "Validate transitions, not just fields.",
        body: "A case is a small state machine. Checking the next state against the current one stops a review from skipping a step because two writes raced.",
      },
      {
        title: "Redrive is a product feature.",
        body: "Screening that stops midway is not an edge case if it leaves a person or a listing stuck. The recovery path makes that incomplete work visible and runnable again.",
      },
      {
        title: "Keep history next to the decision.",
        body: "Operators need the previous attempts beside the current case. A queue with no history asks people to remember what the system already knows.",
      },
    ],
    tradeoffs: [
      {
        title: "Strict states feel slower.",
        body: "Rejecting an illegal transition adds friction in the tool. It removes a worse kind of friction later, when two reviewers disagree about what happened.",
      },
      {
        title: "Recovery can be abused as a retry button.",
        body: "Redrive has to record that it happened. An invisible retry looks like the original attempt and makes the history lie.",
      },
    ],
    outcomes: [
      "Review tooling enforced valid case states instead of trusting every write.",
      "Incomplete compliance screening cases had a recovery and redrive path.",
      "The interface shown here uses fictional cases only.",
    ],
    lessons: [
      "Operations software is a state machine with a queue in front of it. If the states are fuzzy, the queue will be too.",
      "The kindest UI for a hard review is the one that refuses a move the process does not allow.",
    ],
  },
  {
    slug: "engineering-performance",
    index: "05",
    title: "Engineering Performance & Reliability",
    company: "Zoolatech",
    period: "Within Sep 2024 – Sep 2026",
    role: "Senior Software Engineer",
    summary:
      "Faster performance-test analysis, much broader alert coverage, and a credential-hashing migration that stayed online.",
    technologies: ["Artillery", "New Relic", "Terraform", "FastAPI", "Node.js"],
    featured: false,
    visual: "reliability",
    overview:
      "These were related initiatives, not one product. I built an analysis workflow for Artillery results, expanded New Relic alert coverage with Terraform, and migrated credential hashing across FastAPI and Node.js authentication services without downtime.",
    context:
      "The shared theme is the time between 'something looks off' and 'we know what to change.' Analysis that sits in a spreadsheet, alerts that cover a thin slice of the system, and a hashing change that requires an outage all stretch that time.",
    constraints: [
      "Only two quantitative results are verified: analysis time and alert coverage.",
      "The hashing migration had to avoid downtime across two authentication stacks.",
      "Additional before-and-after metrics are not invented to fill the gaps.",
    ],
    responsibilities: [
      "Created an AI-assisted Artillery analysis workflow that flagged anomalies, correlated performance metrics, and posted findings on pull requests.",
      "Expanded New Relic alert coverage with Terraform-managed monitoring configuration.",
      "Worked on a zero-downtime credential-hashing migration across FastAPI and Node.js authentication services.",
    ],
    architecture: [
      "Artillery run",
      "Analysis workflow",
      "Pull request note",
      "Terraform alerts",
      "Online hash migration",
    ],
    decisions: [
      {
        title: "Put the analysis where the change is.",
        body: "Findings land on the pull request. An engineer sees the anomaly next to the diff, instead of in a report they have to remember to open.",
      },
      {
        title: "Manage alerts as code.",
        body: "Terraform-managed New Relic configuration made coverage something the repository could review. That is how coverage moved from roughly 15% to roughly 90%.",
      },
      {
        title: "Migrate hashes without a flag day.",
        body: "FastAPI and Node.js authentication services both had to accept the transition. The migration was sequenced so existing credentials kept working while the new hashing took over.",
      },
    ],
    tradeoffs: [
      {
        title: "An assisted summary can over-call an anomaly.",
        body: "The workflow correlates metrics and posts a finding. A person still owns the conclusion. The point was to shorten the read, not to auto-merge a performance opinion.",
      },
      {
        title: "More alerts are not more signal.",
        body: "Coverage from 15% to 90% is only useful if the new alerts describe conditions someone will act on. The configuration lives in code so noisy ones can be changed in review.",
      },
    ],
    outcomes: [
      "Average engineering analysis time for the Artillery workflow dropped by approximately 90%.",
      "New Relic alert coverage expanded from approximately 15% to approximately 90% using Terraform-managed configuration.",
      "Credential hashing moved across FastAPI and Node.js authentication services without downtime.",
    ],
    lessons: [
      "The expensive part of a performance test is often the reading, not the run.",
      "A migration is zero-downtime only if every service that checks the old credential has a defined moment to accept the new one.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return projects[0];
  return projects[(index + 1) % projects.length];
}
