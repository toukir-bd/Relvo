export type FieldDefinition = {
  name: string;
  label: string;
  type?: "text" | "email" | "date" | "number" | "select";
  options?: string[];
  required?: boolean;
};

export type ModuleDefinition = {
  id: string;
  label: string;
  singular: string;
  description: string;
  fields: FieldDefinition[];
};

const status = (options: string[]): FieldDefinition => ({ name: "status", label: "Status", type: "select", options, required: true });
const amount = (name = "amount", label = "Amount (USD)"): FieldDefinition => ({ name, label, type: "number", required: true });
const date = (name: string, label: string): FieldDefinition => ({ name, label, type: "date" });

export const modules: ModuleDefinition[] = [
  {
    id: "clients", label: "Clients", singular: "Client", description: "People and businesses you work with.",
    fields: [
      { name: "name", label: "Company / client", required: true },
      { name: "contact", label: "Contact person" },
      { name: "email", label: "Email", type: "email" },
      { name: "country", label: "Country" },
      status(["Lead", "Active", "Past"]),
      amount("lifetimeValue", "Lifetime value (USD)"),
    ],
  },
  {
    id: "proposals", label: "Proposals", singular: "Proposal", description: "Track scope, value, and decision status.",
    fields: [
      { name: "name", label: "Proposal title", required: true },
      { name: "client", label: "Client", required: true },
      amount("value", "Proposal value (USD)"),
      status(["Draft", "Sent", "Accepted", "Declined"]),
      date("sentDate", "Sent date"), date("validUntil", "Valid until"),
    ],
  },
  {
    id: "contracts", label: "Contracts", singular: "Contract", description: "Keep signed agreements and dates visible.",
    fields: [
      { name: "name", label: "Contract / engagement", required: true },
      { name: "client", label: "Client", required: true }, amount("value", "Contract value (USD)"),
      status(["Draft", "Sent for signature", "Signed", "Complete"]),
      date("startDate", "Start date"), date("endDate", "End date"),
    ],
  },
  {
    id: "projects", label: "Projects", singular: "Project", description: "Monitor delivery, ownership, and deadlines.",
    fields: [
      { name: "name", label: "Project name", required: true }, { name: "client", label: "Client", required: true },
      { name: "service", label: "Service / scope" }, status(["Planning", "In progress", "Review", "Complete", "On hold"]),
      date("startDate", "Start date"), date("dueDate", "Due date"), amount("budget", "Project budget (USD)"),
    ],
  },
  {
    id: "milestones", label: "Milestones", singular: "Milestone", description: "Tie delivery checkpoints to payments.",
    fields: [
      { name: "name", label: "Milestone / deliverable", required: true }, { name: "project", label: "Project", required: true },
      amount("amount", "Payment amount (USD)"), status(["Upcoming", "In progress", "Ready to invoice", "Paid"]),
      date("dueDate", "Due date"), date("paidDate", "Paid date"),
    ],
  },
  {
    id: "invoices", label: "Invoices", singular: "Invoice", description: "Follow invoices from issue to payment.",
    fields: [
      { name: "name", label: "Invoice number / title", required: true }, { name: "client", label: "Client", required: true },
      amount(), status(["Draft", "Sent", "Partially paid", "Paid", "Overdue"]),
      date("issueDate", "Issue date"), date("dueDate", "Due date"),
    ],
  },
  {
    id: "team", label: "Team", singular: "Team member", description: "Manage collaborators and monthly costs.",
    fields: [
      { name: "name", label: "Name", required: true }, { name: "role", label: "Role", required: true },
      { name: "email", label: "Email", type: "email" }, amount("monthlyCost", "Monthly cost (USD)"),
      status(["Active", "Paused", "Former"]),
    ],
  },
  {
    id: "expenses", label: "Expenses", singular: "Expense", description: "Record operating costs for margin tracking.",
    fields: [
      { name: "name", label: "Expense", required: true }, { name: "category", label: "Category" },
      amount(), date("date", "Date"), { name: "project", label: "Project (optional)" },
    ],
  },
];

export type AosRecord = {
  id: string;
  createdAt: string;
  [key: string]: string;
};

export type AosData = Record<string, AosRecord[]>;

export const emptyAosData = (): AosData => Object.fromEntries(modules.map((item) => [item.id, []]));

export function normalizeAosData(input?: Partial<AosData>): AosData {
  return Object.fromEntries(
    modules.map((definition) => [
      definition.id,
      Array.isArray(input?.[definition.id]) ? input[definition.id] : [],
    ]),
  ) as AosData;
}
