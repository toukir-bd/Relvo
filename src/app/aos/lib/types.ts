export type RecordBase = { id: string; createdAt: string };

export type Client = RecordBase & {
  name: string;
  contact: string;
  email: string;
  phone: string;
  country: string;
  notes: string;
};

export type ProjectStatus = "Planning" | "In progress" | "On hold" | "Done";
export type Project = RecordBase & {
  name: string;
  clientId: string;
  service: string;
  status: ProjectStatus;
  startDate: string;
  dueDate: string;
};

export type DeliveryStatus = "Planned" | "In progress" | "Done";
export type Milestone = RecordBase & {
  name: string;
  projectId: string;
  amount: string;
  dueDate: string;
  deliveryStatus: DeliveryStatus;
};

export type ProposalStatus = "Draft" | "Sent" | "Approved" | "Declined";
export type Proposal = RecordBase & {
  title: string;
  clientId: string;
  version: number;
  projectId: string;
  milestoneId: string;
  amount: string;
  scope: string;
  terms: string;
  validUntil: string;
  dueDate: string;
  status: ProposalStatus;
};

export type InvoiceStatus = "Draft" | "Sent" | "Paid";
export type Invoice = RecordBase & {
  number: string;
  proposalId: string;
  projectId: string;
  milestoneId: string;
  clientId: string;
  amount: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  paidDate: string;
  invoiceSentAt: string;
  receiptSentAt: string;
};

export type Expense = RecordBase & {
  name: string;
  category: string;
  amount: string;
  date: string;
  notes: string;
};

export type AosData = {
  clients: Client[];
  projects: Project[];
  milestones: Milestone[];
  proposals: Proposal[];
  invoices: Invoice[];
  expenses: Expense[];
};

export type WorkflowPage = "clients" | "proposals" | "invoices" | "account";

export const WORKFLOW_PAGES: { id: WorkflowPage; label: string; description: string }[] = [
  { id: "clients", label: "Clients", description: "Start with the people and companies you work with." },
  { id: "proposals", label: "Projects", description: "Manage project proposals, revisions, and client approvals." },
  { id: "invoices", label: "Invoices", description: "Approved proposals create invoices automatically. Track due dates and payments here." },
  { id: "account", label: "Account", description: "Review cash flow, costs, and account backups." },
];

export const emptyAosData = (): AosData => ({ clients: [], projects: [], milestones: [], proposals: [], invoices: [], expenses: [] });

function list<T>(value: unknown): T[] {
  return Array.isArray(value) ? value as T[] : [];
}

function base(item: Record<string, unknown>, index: number): RecordBase {
  return {
    id: typeof item.id === "string" ? item.id : `migrated-${index}-${crypto.randomUUID()}`,
    createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString(),
  };
}

export function normalizeAosData(input?: Partial<AosData> | Record<string, unknown>): AosData {
  const raw = (input ?? {}) as Record<string, unknown>;
  const clients = list<Record<string, unknown>>(raw.clients).map((item, index) => ({
    ...base(item, index), name: String(item.name ?? item.company ?? ""), contact: String(item.contact ?? ""),
    email: String(item.email ?? ""), phone: String(item.phone ?? ""), country: String(item.country ?? ""), notes: String(item.notes ?? ""),
  }));
  const projects = list<Record<string, unknown>>(raw.projects).map((item, index) => ({
    ...base(item, index), name: String(item.name ?? ""),
    clientId: String(item.clientId ?? clients.find((client) => client.name === item.client)?.id ?? ""),
    service: String(item.service ?? ""), status: (item.status === "Complete" ? "Done" : String(item.status ?? "Planning")) as ProjectStatus,
    startDate: String(item.startDate ?? ""), dueDate: String(item.dueDate ?? ""),
  }));
  const milestones = list<Record<string, unknown>>(raw.milestones).map((item, index) => ({
    ...base(item, index), name: String(item.name ?? ""),
    projectId: String(item.projectId ?? projects.find((project) => project.name === item.project)?.id ?? ""),
    amount: String(item.amount ?? "0"), dueDate: String(item.dueDate ?? ""),
    deliveryStatus: (item.deliveryStatus ?? (item.status === "Done" || item.status === "Complete" ? "Done" : "Planned")) as DeliveryStatus,
  }));
  const proposals = list<Record<string, unknown>>(raw.proposals).map((item, index) => {
    const projectId = String(item.projectId ?? projects.find((project) => project.name === item.project)?.id ?? "");
    return {
      ...base(item, index), title: String(item.title ?? item.name ?? ""),
      clientId: String(item.clientId ?? projects.find((project) => project.id === projectId)?.clientId ?? clients[0]?.id ?? ""),
      version: Math.max(1, Number(item.version) || 1), projectId,
      milestoneId: String(item.milestoneId ?? milestones.find((milestone) => milestone.projectId === projectId && milestone.name === item.milestone)?.id ?? ""),
      amount: String(item.amount ?? item.value ?? "0"), scope: String(item.scope ?? item.description ?? ""),
      terms: String(item.terms ?? ""), validUntil: String(item.validUntil ?? ""), dueDate: String(item.dueDate ?? ""),
      status: (item.status === "Accepted" ? "Approved" : String(item.status ?? "Draft")) as ProposalStatus,
    };
  });
  const invoices = list<Record<string, unknown>>(raw.invoices).map((item, index) => {
    const clientId = String(item.clientId ?? clients.find((client) => client.name === item.client)?.id ?? "");
    return {
      ...base(item, index), number: String(item.number ?? item.name ?? `INV-${index + 1}`),
      proposalId: String(item.proposalId ?? proposals.find((proposal) => proposal.title === item.proposal)?.id ?? ""),
      projectId: String(item.projectId ?? projects.find((project) => project.name === item.project)?.id ?? ""),
      milestoneId: String(item.milestoneId ?? milestones.find((milestone) => milestone.name === item.milestone)?.id ?? ""),
      clientId, amount: String(item.amount ?? "0"), issueDate: String(item.issueDate ?? ""), dueDate: String(item.dueDate ?? ""),
      status: (item.status === "Partially paid" ? "Sent" : String(item.status ?? "Draft")) as InvoiceStatus,
      paidDate: String(item.paidDate ?? ""), invoiceSentAt: String(item.invoiceSentAt ?? ""), receiptSentAt: String(item.receiptSentAt ?? ""),
    };
  });
  const expenses = list<Record<string, unknown>>(raw.expenses).map((item, index) => ({
    ...base(item, index), name: String(item.name ?? ""), category: String(item.category ?? ""),
    amount: String(item.amount ?? "0"), date: String(item.date ?? ""), notes: String(item.notes ?? ""),
  }));
  return { clients, projects, milestones, proposals, invoices, expenses };
}
