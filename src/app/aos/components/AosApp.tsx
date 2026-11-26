"use client";

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDownToLine, ArrowRight, ArrowUpRight, Check, CircleDollarSign, Download, Eye,
  FileText, LogOut, Mail, Menu, Plus, ReceiptText, Trash2, Users, X,
} from "lucide-react";
import {
  emptyAosData, normalizeAosData, WORKFLOW_PAGES,
  type AosData, type Client, type Expense, type Invoice, type Milestone, type Project, type Proposal, type WorkflowPage,
} from "@/app/aos/lib/types";

const STORAGE_KEY = "relvo-aos-workspace-v1";
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
type EditorKind = "clients" | "projects" | "milestones" | "proposals" | "invoices" | "expenses";
type EditorState = { kind: EditorKind; id?: string; prefill?: Record<string, string> } | null;

const pageIcons = {
  clients: Users,
  proposals: FileText,
  invoices: ReceiptText,
  account: CircleDollarSign,
} satisfies Record<WorkflowPage, typeof Users>;

function readSavedData(): AosData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? normalizeAosData(JSON.parse(saved) as Record<string, unknown>) : emptyAosData();
  } catch {
    return emptyAosData();
  }
}

function makeId() {
  return crypto.randomUUID();
}

function recordBase(existing?: { id: string; createdAt: string }) {
  return existing ?? { id: makeId(), createdAt: new Date().toISOString() };
}

function total(rows: { amount: string }[]) {
  return rows.reduce((sum, row) => sum + (Number(row.amount) || 0), 0);
}

function proposalPdfLines(proposal: Proposal, client?: Client) {
  return ["RELVO · SERVICE PROPOSAL", "", `Prepared for: ${client?.name ?? "Client"}`, `Contact: ${client?.contact || "—"}`, `Proposal: ${proposal.title}`, `Version: ${proposal.version || 1}`, `Commitment: ${currency.format(Number(proposal.amount) || 0)}`, `Invoice due date: ${proposal.dueDate || "—"}`, `Valid until: ${proposal.validUntil || "—"}`, "", "SCOPE", proposal.scope || "No scope added.", "", "PAYMENT TERMS", proposal.terms || "As agreed with the client.", "", "To accept, reply to this email. Thank you for considering Relvo."];
}

function invoicePdfLines(invoice: Invoice, client?: Client, proposalTitle?: string) {
  return ["RELVO · INVOICE", "", `Invoice: ${invoice.number}`, `Bill to: ${client?.name ?? "Client"}`, `Contact: ${client?.contact || "—"}`, `Proposal: ${proposalTitle || "Service"}`, `Issued: ${invoice.issueDate || "—"}`, `Due: ${invoice.dueDate || "—"}`, `Status: ${invoice.status}`, "", `AMOUNT DUE: ${currency.format(Number(invoice.amount) || 0)}`, "", "Please contact hello@relvodev.com if you have any questions about this invoice."];
}

function buildPdf(contentLines: string[]) {
  const normalized = contentLines.flatMap((line) => wrapPdfLine(line));
  const pages: string[][] = [];
  for (let index = 0; index < normalized.length; index += 45) pages.push(normalized.slice(index, index + 45));
  const safe = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "?").replace(/([\\()])/g, "\\$1");
  const objects: string[] = ["", "", "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"];
  const pageRefs: number[] = [];
  pages.forEach((lines) => {
    const pageObject = objects.length + 1;
    const streamObject = pageObject + 1;
    pageRefs.push(pageObject);
    const commands = ["BT", "/F1 11 Tf", "56 790 Td", "16 TL", ...lines.flatMap((line, index) => [index ? "T*" : "", `(${safe(line)}) Tj`]).filter(Boolean), "ET"].join("\n");
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${streamObject} 0 R >>`);
    objects.push(`<< /Length ${commands.length} >>\nstream\n${commands}\nendstream`);
  });
  objects[0] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[1] = `<< /Type /Pages /Kids [${pageRefs.map((ref) => `${ref} 0 R`).join(" ")}] /Count ${pageRefs.length} >>`;
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => { offsets.push(pdf.length); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => { pdf += `${String(offset).padStart(10, "0")} 00000 n \n`; });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

function downloadPdf(filename: string, contentLines: string[]) {
  const url = URL.createObjectURL(buildPdf(contentLines));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${filename.replace(/[^a-z0-9-_]+/gi, "-").replace(/^-|-$/g, "") || "relvo-document"}.pdf`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function previewPdf(contentLines: string[]) {
  const url = URL.createObjectURL(buildPdf(contentLines));
  window.open(url, "_blank", "noopener,noreferrer");
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

async function makePdfAttachment(filename: string, contentLines: string[]) {
  const bytes = new Uint8Array(await buildPdf(contentLines).arrayBuffer());
  let binary = "";
  for (let start = 0; start < bytes.length; start += 0x8000) binary += String.fromCharCode(...bytes.subarray(start, start + 0x8000));
  return { filename: `${filename}.pdf`, content: btoa(binary) };
}

function wrapPdfLine(line: string) {
  const words = line.split(/\s+/);
  const wrapped: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > 88 && current) { wrapped.push(current); current = word; }
    else current = (current + " " + word).trim();
  }
  wrapped.push(current);
  return wrapped;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function plusDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export default function AosApp() {
  const [configured, setConfigured] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [dataReady, setDataReady] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);
  const [data, setData] = useState<AosData>(emptyAosData);
  const [activePage, setActivePage] = useState<WorkflowPage>("clients");
  const [editor, setEditor] = useState<EditorState>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [emailBusyId, setEmailBusyId] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/aos/api/auth/session", { cache: "no-store" })
      .then((response) => response.json())
      .then((result: { configured?: boolean; authenticated?: boolean }) => {
        if (!active) return;
        setConfigured(Boolean(result.configured));
        if (result.authenticated) {
          setData(readSavedData());
          setDataReady(true);
        }
        setAuthenticated(Boolean(result.authenticated));
      })
      .catch(() => { if (active) setConfigured(false); })
      .finally(() => { if (active) setCheckingSession(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!authenticated || !dataReady) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [authenticated, dataReady, data]);

  const activeStep = WORKFLOW_PAGES.findIndex((page) => page.id === activePage);
  const collected = total(data.invoices.filter((invoice) => invoice.status === "Paid"));
  const outstanding = total(data.invoices.filter((invoice) => invoice.status !== "Paid"));
  const totalCosts = total(data.expenses);
  const currentClient = (id: string) => data.clients.find((client) => client.id === id);

  const filteredRecords = useMemo(() => {
    const key = query.trim().toLowerCase();
    if (!key) return null;
    const includes = (text: string) => text.toLowerCase().includes(key);
    const projectFor = (id: string) => data.projects.find((project) => project.id === id);
    const clientName = (id: string) => data.clients.find((client) => client.id === id)?.name ?? "";
    return {
      clients: data.clients.filter((row) => [row.name, row.contact, row.email, row.country].some(includes)),
      projects: data.projects.filter((row) => [row.name, row.service, clientName(row.clientId)].some(includes)),
      milestones: data.milestones.filter((row) => [row.name, projectFor(row.projectId)?.name ?? "", clientName(projectFor(row.projectId)?.clientId ?? "")].some(includes)),
      proposals: data.proposals.filter((row) => [row.title, row.status, projectFor(row.projectId)?.name ?? "", clientName(projectFor(row.projectId)?.clientId ?? "")].some(includes)),
      invoices: data.invoices.filter((row) => [row.number, row.status, clientName(row.clientId), projectFor(row.projectId)?.name ?? ""].some(includes)),
    };
  }, [data, query]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginBusy(true);
    setLoginError("");
    try {
      const response = await fetch("/aos/api/auth/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Sign in failed.");
      setData(readSavedData());
      setDataReady(true);
      setAuthenticated(true);
      setPassword("");
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Sign in failed.");
    } finally {
      setLoginBusy(false);
    }
  }

  async function signOut() {
    await fetch("/aos/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
    setDataReady(false);
    setData(emptyAosData());
    setActivePage("clients");
  }

  function openEditor(kind: EditorKind, id?: string, prefill?: Record<string, string>) {
    setEditor({ kind, id, prefill });
  }

  function saveRecord(kind: EditorKind, id: string | undefined, values: Record<string, string>) {
    setData((current) => {
      const existing = id ? current[kind].find((item) => item.id === id) : undefined;
      const base = recordBase(existing);
      const updated: AosData = { ...current };

      if (kind === "clients") {
        const client: Client = { ...base, name: values.name.trim(), contact: values.contact.trim(), email: values.email.trim(), phone: values.phone.trim(), country: values.country.trim(), notes: values.notes.trim() };
        updated.clients = upsert(current.clients, client);
      } else if (kind === "projects") {
        const prior = existing as Project | undefined;
        const project: Project = { ...base, name: values.name.trim(), clientId: values.clientId, service: values.service.trim(), status: prior?.status ?? "Planning", startDate: values.startDate, dueDate: values.dueDate };
        updated.projects = upsert(current.projects, project);
      } else if (kind === "milestones") {
        const prior = existing as Milestone | undefined;
        const approvedProposal = current.proposals.find((proposal) => proposal.milestoneId === id && proposal.status === "Approved");
        const milestone: Milestone = { ...base, name: values.name.trim(), projectId: values.projectId, amount: (approvedProposal?.amount ?? values.amount) || "0", dueDate: values.dueDate, deliveryStatus: (values.deliveryStatus || prior?.deliveryStatus || "Planned") as Milestone["deliveryStatus"] };
        updated.milestones = upsert(current.milestones, milestone);
        updated.projects = syncProjectStatus(updated.projects, updated.milestones, prior?.projectId, milestone.projectId);
      } else if (kind === "proposals") {
        const prior = existing as Proposal | undefined;
        const revise = prior?.status === "Sent";
        const proposal: Proposal = { ...base, title: values.title.trim(), clientId: values.clientId, version: (prior?.version ?? 0) + (revise ? 1 : 0), projectId: "", milestoneId: "", amount: values.amount || "0", scope: values.scope.trim(), terms: values.terms.trim(), validUntil: values.validUntil, dueDate: values.dueDate, status: revise ? "Draft" : (values.status || "Draft") as Proposal["status"] };
        updated.proposals = upsert(current.proposals, proposal);
        if (proposal.status === "Approved") updated.invoices = ensureInvoice(updated.invoices, proposal, current.invoices.length);
      } else if (kind === "invoices") {
        const proposal = current.proposals.find((item) => item.id === values.proposalId);
        const project = proposal ? current.projects.find((item) => item.id === proposal.projectId) : undefined;
        const milestone = proposal ? current.milestones.find((item) => item.id === proposal.milestoneId) : undefined;
        if (!proposal || proposal.status !== "Approved" || !project) return current;
        const invoice: Invoice = {
          ...base,
          number: values.number.trim() || `REL-${new Date().getFullYear()}-${String(current.invoices.length + 1).padStart(4, "0")}`,
          proposalId: proposal.id, projectId: project.id, milestoneId: milestone?.id ?? "", clientId: project.clientId,
          amount: values.amount || proposal.amount, issueDate: values.issueDate || today(), dueDate: values.dueDate,
          status: (values.status || "Draft") as Invoice["status"], paidDate: "", invoiceSentAt: "", receiptSentAt: "",
        };
        updated.invoices = upsert(current.invoices, invoice);
      } else {
        const expense: Expense = { ...base, name: values.name.trim(), category: values.category.trim(), amount: values.amount || "0", date: values.date || today(), notes: values.notes.trim() };
        updated.expenses = upsert(current.expenses, expense);
      }
      return updated;
    });
    setEditor(null);
    setNotice(kind === "proposals" ? "Proposal saved. Download it as a PDF or email this version to your client." : `${kind === "expenses" ? "Expense" : singular[kind]} saved.`);
  }

  function approveProposal(proposal: Proposal) {
    setData((current) => ({
      ...current,
      proposals: current.proposals.map((item) => item.id === proposal.id ? { ...item, status: "Approved" } : item),
      invoices: ensureInvoice(current.invoices, proposal, current.invoices.length),
    }));
    setNotice(`Approved. Invoice ${`REL-${new Date().getFullYear()}-${String(data.invoices.length + 1).padStart(4, "0")}`} is ready to send.`);
  }

  function updateProposalStatus(proposal: Proposal, status: Proposal["status"]) {
    if (status === "Approved") return approveProposal(proposal);
    setData((current) => ({ ...current, proposals: current.proposals.map((item) => item.id === proposal.id ? { ...item, status } : item) }));
  }

  async function sendProposalEmail(proposal: Proposal) {
    const client = currentClient(proposal.clientId);
    if (!client?.email) { setNotice("Add an email address to the client before sending this proposal."); return; }
    setEmailBusyId(proposal.id);
    setNotice("");
    try {
      const response = await fetch("/aos/api/invoices/email", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "proposal", recipient: client.email, clientName: client.contact || client.name, title: proposal.title, version: proposal.version, amount: proposal.amount, scope: proposal.scope, terms: proposal.terms, validUntil: proposal.validUntil, dueDate: proposal.dueDate, attachment: await makePdfAttachment(`Proposal-${proposal.title}`, proposalPdfLines(proposal, client)) }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Proposal email could not be sent.");
      setData((current) => ({ ...current, proposals: current.proposals.map((item) => item.id === proposal.id ? { ...item, status: "Sent" } : item) }));
      setNotice(`Proposal emailed to ${client.email}.`);
    } catch (error) { setNotice(error instanceof Error ? error.message : "Proposal email could not be sent."); }
    finally { setEmailBusyId(""); }
  }

  async function sendInvoiceEmail(invoice: Invoice, action: "invoice" | "receipt") {
    const client = currentClient(invoice.clientId);
    const proposal = data.proposals.find((item) => item.id === invoice.proposalId);
    if (!client?.email) {
      setNotice("Add an email address to this client before sending the invoice or receipt.");
      return;
    }
    setEmailBusyId(invoice.id);
    setNotice("");
    try {
      const attachment = action === "invoice" ? await makePdfAttachment(`Invoice-${invoice.number}`, invoicePdfLines(invoice, client, proposal?.title)) : undefined;
      const response = await fetch("/aos/api/invoices/email", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action, recipient: client.email, clientName: client.contact || client.name,
          invoiceNumber: invoice.number, amount: invoice.amount,
          issueDate: invoice.issueDate, dueDate: invoice.dueDate, paidDate: invoice.paidDate || today(),
          projectName: proposal?.title ?? "Service", milestoneName: "Agreed scope",
          attachment,
        }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Email could not be sent.");
      const sentAt = new Date().toISOString();
      setData((current) => ({
        ...current,
        invoices: current.invoices.map((item) => item.id === invoice.id
          ? action === "invoice" ? { ...item, status: "Sent", invoiceSentAt: sentAt } : { ...item, receiptSentAt: sentAt }
          : item),
      }));
      setNotice(action === "invoice" ? `Invoice sent to ${client.email}.` : `Payment receipt sent to ${client.email}.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Email could not be sent.");
    } finally {
      setEmailBusyId("");
    }
  }

  function markInvoicePaid(invoice: Invoice) {
    const paidDate = today();
    setData((current) => ({ ...current, invoices: current.invoices.map((item) => item.id === invoice.id ? { ...item, status: "Paid", paidDate } : item) }));
    setNotice("Payment recorded. Sending the receipt email…");
    void sendInvoiceEmail({ ...invoice, status: "Paid", paidDate }, "receipt");
  }

  function deleteRecord(kind: EditorKind, id: string) {
    const protectedByChild = kind === "clients" ? data.projects.some((item) => item.clientId === id) || data.proposals.some((item) => item.clientId === id)
      : kind === "projects" ? data.milestones.some((item) => item.projectId === id)
        : kind === "milestones" ? data.proposals.some((item) => item.milestoneId === id) || data.invoices.some((item) => item.milestoneId === id)
          : kind === "proposals" ? data.invoices.some((item) => item.proposalId === id)
            : false;
    if (protectedByChild) {
      setNotice(`This ${singular[kind].toLowerCase()} has linked records. Remove or move those records first.`);
      return;
    }
    if (!window.confirm(`Delete this ${singular[kind].toLowerCase()}? This cannot be undone.`)) return;
    setData((current) => ({ ...current, [kind]: current[kind].filter((item) => item.id !== id) }));
  }

  function downloadBackup() {
    const url = URL.createObjectURL(new Blob([JSON.stringify({ version: 2, exportedAt: new Date().toISOString(), data }, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `relvo-aos-backup-${today()}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function importBackup(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as { data?: Record<string, unknown> };
        if (!parsed.data) throw new Error("This file is not a Relvo AOS backup.");
        setData(normalizeAosData(parsed.data));
        setNotice("Workspace backup imported.");
      } catch (error) {
        setNotice(error instanceof Error ? error.message : "Could not import this backup.");
      }
    };
    reader.readAsText(file);
  }

  if (checkingSession) return <div className="grid min-h-screen place-items-center bg-[#07100d] text-base font-semibold text-white/60">Opening private workspace…</div>;
  if (!authenticated) return <Login configured={configured} username={username} password={password} error={loginError} busy={loginBusy} setUsername={setUsername} setPassword={setPassword} onSubmit={signIn} />;
  if (!dataReady) return <div className="grid min-h-screen place-items-center bg-[#07100d] text-base font-semibold text-white/60">Loading workspace…</div>;

  const filtered = filteredRecords;

  return (
    <main className="min-h-screen bg-[#07100d] text-white selection:bg-[#bbff00] selection:text-[#07100d]">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 opacity-[.12]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgb(187 255 0 / 25%) .6px, transparent 1px)", backgroundSize: "5px 5px" }} />
      <div className="relative flex min-h-screen">
        {mobileNavOpen && <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-black/70 lg:hidden" onClick={() => setMobileNavOpen(false)} />}
        <aside className={`fixed inset-y-0 left-0 z-50 flex w-[258px] flex-col border-r border-white/[.08] bg-[#09130f] px-4 py-5 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="mb-8 flex items-center justify-between px-2">
            <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#bbff00]/10 font-semibold text-[#bbff00]">R</span><div><p className="text-base font-semibold tracking-[.16em]">RELVO</p><p className="mt-1 text-sm font-semibold uppercase tracking-[.16em] text-white/40">Agency OS</p></div></div>
            <button className="grid size-9 place-items-center rounded-lg text-white/55 hover:bg-white/5 lg:hidden" aria-label="Close menu" onClick={() => setMobileNavOpen(false)}><X size={18} /></button>
          </div>
          <p className="mb-2 px-3 text-base font-semibold uppercase tracking-[.2em] text-white/55">Workflow</p>
          <nav className="flex-1 space-y-1 overflow-y-auto">
            {WORKFLOW_PAGES.map((page, index) => {
              const Icon = pageIcons[page.id];
              return <button key={page.id} onClick={() => { setActivePage(page.id); setQuery(""); setMobileNavOpen(false); }} className={`flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold transition ${activePage === page.id ? "bg-[#bbff00]/10 font-semibold text-[#bbff00]" : "text-white/75 hover:bg-white/[.04] hover:text-white"}`}><span className="grid size-7 place-items-center rounded-lg bg-white/[.04] text-sm font-semibold">0{index + 1}</span><Icon size={16} strokeWidth={1.8} /><span>{page.label}</span></button>;
            })}
          </nav>
          <div className="mt-5 border-t border-white/[.08] pt-4"><p className="px-3 text-base font-semibold text-white/60">Owner workspace</p><button onClick={signOut} className="mt-2 flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-3 text-base font-semibold text-white/75 hover:bg-white/[.04] hover:text-white"><LogOut size={18} />Sign out</button></div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/[.08] bg-[#07100d]/90 px-4 backdrop-blur-xl sm:px-7 lg:px-10">
            <div className="flex min-w-0 items-center gap-3"><button className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 text-white/75 lg:hidden" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Menu size={19} /></button><div className="min-w-0"><p className="truncate text-base font-semibold">{WORKFLOW_PAGES.find((page) => page.id === activePage)?.label}</p><p className="mt-1 hidden truncate text-sm font-semibold text-white/60 sm:block">Relvo · Private workspace</p></div></div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3"><label className="hidden h-10 w-48 items-center gap-2 rounded-xl border border-white/10 px-3 text-white/35 md:flex"><Users size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search this workspace" className="w-full bg-transparent text-base font-semibold text-white outline-none placeholder:text-white/35" /></label>{(activePage === "clients" || activePage === "proposals") && <button onClick={() => openEditor(activePage)} disabled={!canCreate(activePage, data)} className="flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[#bbff00] px-3 text-base font-semibold text-[#07100d] hover:bg-[#d2ff59] disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-base font-semibold"><Plus size={17} /><span className="hidden sm:inline">Add {singular[activePage]}</span><span className="sm:hidden">Add</span></button>}</div>
          </header>

          <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[.22em] text-[#bbff00]/90">Step {String(activeStep + 1).padStart(2, "0")} / 04</p><h1 className="mt-2 text-[clamp(1.8rem,4vw,2.6rem)] font-medium tracking-tight">{pageTitle[activePage]}</h1><p className="mt-2 max-w-3xl text-sm font-semibold leading-relaxed text-white/75">{WORKFLOW_PAGES.find((page) => page.id === activePage)?.description}</p></div><label className="flex h-10 min-w-[190px] items-center gap-2 rounded-xl border border-white/10 px-3 text-white/40 md:hidden"><Users size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search records" className="w-full bg-transparent text-base font-semibold text-white outline-none placeholder:text-white/35" /></label></div>

            <WorkflowStepper activePage={activePage} onSelect={(page) => setActivePage(page)} />
            {notice && <div role="status" className="mb-5 flex items-start justify-between gap-3 rounded-2xl border border-[#bbff00]/15 bg-[#bbff00]/[.04] px-4 py-3 text-base font-semibold text-white/75"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss notice" className="cursor-pointer text-white/45 hover:text-white"><X size={16} /></button></div>}

            {activePage === "clients" && <ClientsPage clients={filtered?.clients ?? data.clients} onAddProposal={(clientId) => { setActivePage("proposals"); openEditor("proposals", undefined, { clientId }); }} onEdit={(id) => openEditor("clients", id)} onDelete={(id) => deleteRecord("clients", id)} onNext={() => setActivePage("proposals")} />}
            {activePage === "proposals" && <ProposalsPage data={data} rows={filtered?.proposals ?? data.proposals} clientName={(proposal) => currentClient(proposal.clientId)?.name ?? "Unknown client"} busyId={emailBusyId} invoiceFor={(id) => data.invoices.find((invoice) => invoice.proposalId === id)} onSend={(proposal) => void sendProposalEmail(proposal)} onPreview={(proposal) => previewPdf(proposalPdfLines(proposal, currentClient(proposal.clientId)))} onDownload={(proposal) => downloadPdf(`Proposal-${proposal.title}`, proposalPdfLines(proposal, currentClient(proposal.clientId)))} onAdd={() => openEditor("proposals")} onEdit={(id) => openEditor("proposals", id)} onDelete={(id) => deleteRecord("proposals", id)} onStatus={updateProposalStatus} onInvoicePage={() => setActivePage("invoices")} />}
            {activePage === "invoices" && <InvoicesPage rows={filtered?.invoices ?? data.invoices} clientName={(id) => currentClient(id)?.name ?? "Unknown client"} proposalTitle={(id) => data.proposals.find((proposal) => proposal.id === id)?.title ?? "Service"} busyId={emailBusyId} onSend={(invoice, action) => void sendInvoiceEmail(invoice, action)} onMarkPaid={markInvoicePaid} onDelete={(id) => deleteRecord("invoices", id)} onDownload={(invoice) => downloadPdf(`Invoice-${invoice.number}`, invoicePdfLines(invoice, currentClient(invoice.clientId), data.proposals.find((proposal) => proposal.id === invoice.proposalId)?.title))} />}
            {activePage === "account" && <AccountPage data={data} collected={collected} outstanding={outstanding} costs={totalCosts} onAddExpense={() => openEditor("expenses")} onDownload={downloadBackup} onImport={importBackup} />}
          </div>
        </div>
      </div>

      {editor && <RecordEditor key={`${editor.kind}-${editor.id ?? "new"}`} kind={editor.kind} id={editor.id} prefill={editor.prefill} data={data} onClose={() => setEditor(null)} onSave={(values) => saveRecord(editor.kind, editor.id, values)} />}
    </main>
  );
}

const singular: Record<EditorKind, string> = { clients: "Client", projects: "Project", milestones: "Milestone", proposals: "Proposal", invoices: "Invoice", expenses: "Expense" };
const pageTitle: Record<WorkflowPage, string> = { clients: "Your clients", proposals: "Projects", invoices: "Invoices & payments", account: "Account & cash flow" };

function ensureInvoice(invoices: Invoice[], proposal: Proposal, index: number): Invoice[] {
  if (invoices.some((invoice) => invoice.proposalId === proposal.id)) return invoices;
  const issueDate = today();
  return [{ id: makeId(), createdAt: new Date().toISOString(), number: `REL-${new Date().getFullYear()}-${String(index + 1).padStart(4, "0")}`, proposalId: proposal.id, projectId: "", milestoneId: "", clientId: proposal.clientId, amount: proposal.amount, issueDate, dueDate: proposal.dueDate || plusDays(14), status: "Draft", paidDate: "", invoiceSentAt: "", receiptSentAt: "" }, ...invoices];
}

function upsert<T extends { id: string }>(rows: T[], item: T): T[] {
  return rows.some((row) => row.id === item.id) ? rows.map((row) => row.id === item.id ? item : row) : [item, ...rows];
}

function syncProjectStatus(projects: Project[], milestones: Milestone[], ...projectIds: (string | undefined)[]): Project[] {
  const affected = new Set(projectIds.filter(Boolean));
  return projects.map((project) => {
    if (!affected.has(project.id)) return project;
    const children = milestones.filter((milestone) => milestone.projectId === project.id);
    if (children.length && children.every((milestone) => milestone.deliveryStatus === "Done")) return { ...project, status: "Done" };
    return project.status === "Done" ? { ...project, status: "In progress" } : project;
  });
}

function canCreate(page: WorkflowPage, data: AosData) {
  if (page === "proposals") return data.clients.length > 0;
  return page === "clients";
}

function WorkflowStepper({ activePage, onSelect }: { activePage: WorkflowPage; onSelect: (page: WorkflowPage) => void }) {
  return <nav aria-label="Agency workflow" className="mb-7 flex gap-2 overflow-x-auto pb-2">
    {WORKFLOW_PAGES.map((page, index) => <button key={page.id} onClick={() => onSelect(page.id)} aria-current={activePage === page.id ? "step" : undefined} className={`flex min-w-[132px] cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition sm:min-w-0 sm:flex-1 ${activePage === page.id ? "border-[#bbff00]/25 bg-[#bbff00]/[.07] text-[#bbff00]" : "border-white/[.07] bg-white/[.02] text-white/45 hover:text-white/75"}`}><span className="text-sm font-semibold tracking-wider">0{index + 1}</span><span className="truncate text-base font-semibold">{page.label}</span></button>)}
  </nav>;
}

function Login({ configured, username, password, error, busy, setUsername, setPassword, onSubmit }: { configured: boolean; username: string; password: string; error: string; busy: boolean; setUsername: (value: string) => void; setPassword: (value: string) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#07100d] px-5 py-12 text-white"><div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgb(187 255 0 / 13%) .7px, transparent 1px)", backgroundSize: "4px 4px" }} /><section className="relative w-full max-w-[440px] rounded-[28px] border border-white/10 bg-[#0c1713]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-10"><div className="mb-8 flex items-center gap-3"><span className="grid size-12 place-items-center rounded-2xl bg-[#bbff00]/10 font-semibold text-[#bbff00]">R</span><div><p className="text-base font-semibold uppercase tracking-[.2em] text-[#bbff00]">RELVO / PRIVATE</p><p className="mt-1 text-base font-semibold text-white/45">Agency Operating System</p></div></div><h1 className="text-3xl font-medium tracking-tight">Sign in</h1><p className="mt-2 text-base font-semibold text-white/55">A private workspace for the Relvo team.</p>{!configured ? <div className="mt-7 rounded-2xl border border-amber-300/20 bg-amber-300/[.06] p-4 text-base font-semibold leading-relaxed text-amber-100/80">Configure <code>AOS_ADMIN_USERNAME</code>, <code>AOS_ADMIN_PASSWORD</code>, and a 32+ character <code>AOS_SESSION_SECRET</code> in the deployment environment to enable sign-in. See <code>src/app/aos/README.md</code>.</div> : <form onSubmit={onSubmit} className="mt-7 space-y-4"><label className="block text-base font-semibold text-white/65">Username<input required autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-black/25 px-4 text-white outline-none focus:border-[#bbff00]/60" /></label><label className="block text-base font-semibold text-white/65">Password<input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-black/25 px-4 text-white outline-none focus:border-[#bbff00]/60" /></label>{error && <p role="alert" className="text-base font-semibold text-red-300">{error}</p>}<button disabled={busy} className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#bbff00] px-4 font-semibold text-[#07100d] disabled:opacity-60">{busy ? "Signing in…" : "Enter workspace"}<ArrowUpRight size={17} /></button></form>}</section></main>;
}

function Panel({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: ReactNode; children: ReactNode }) {
  return <section className="rounded-[22px] border border-white/[.08] bg-[#0b1611] p-4 sm:p-6"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-semibold">{title}</h2>{subtitle && <p className="mt-1 text-sm font-semibold leading-relaxed text-white/70">{subtitle}</p>}</div>{action}</div>{children}</section>;
}

function AddButton({ children, onClick, disabled = false }: { children: ReactNode; onClick: () => void; disabled?: boolean }) {
  return <button disabled={disabled} onClick={onClick} className="flex min-h-10 cursor-pointer items-center gap-2 rounded-xl bg-[#bbff00] px-3 text-base font-semibold text-[#07100d] transition hover:bg-[#d2ff59] disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-base font-semibold"><Plus size={16} />{children}</button>;
}

function EmptyState({ title, detail, action }: { title: string; detail: string; action?: ReactNode }) {
  return <div className="grid min-h-36 place-items-center py-8 text-center"><div><p className="text-base font-semibold text-white/85">{title}</p><p className="mx-auto mt-2 max-w-md text-sm font-semibold leading-relaxed text-white/65">{detail}</p>{action && <div className="mt-4 flex justify-center">{action}</div>}</div></div>;
}

function RowActions({ children }: { children: ReactNode }) {
  return <div className="mt-4 flex flex-wrap gap-2 border-t border-white/[.06] pt-3">{children}</div>;
}

function GhostAction({ children, onClick, disabled = false, tone = "default" }: { children: ReactNode; onClick: () => void; disabled?: boolean; tone?: "default" | "success" | "danger" | "info" | "warning" }) {
  const toneClass = {
    default: "border-white/10 text-white/70 hover:border-white/25 hover:bg-white/[.04] hover:text-white",
    success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/20",
    danger: "border-rose-400/30 bg-rose-400/10 text-rose-200 hover:bg-rose-400/20",
    info: "border-sky-400/30 bg-sky-400/10 text-sky-200 hover:bg-sky-400/20",
    warning: "border-amber-300/30 bg-amber-300/10 text-amber-100 hover:bg-amber-300/20",
  }[tone];
  return <button disabled={disabled} onClick={onClick} className={`inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-base font-semibold transition disabled:cursor-not-allowed disabled:opacity-30 ${toneClass}`}>{children}</button>;
}

function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "lime" | "amber" | "green" }) {
  const toneClass = tone === "lime" ? "bg-[#bbff00]/10 text-[#bbff00]" : tone === "amber" ? "bg-amber-200/10 text-amber-100" : tone === "green" ? "bg-emerald-300/10 text-emerald-200" : "bg-white/[.06] text-white/55";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-sm font-semibold ${toneClass}`}>{children}</span>;
}

function ClientsPage({ clients, onAddProposal, onEdit, onDelete, onNext }: { clients: Client[]; onAddProposal: (id: string) => void; onEdit: (id: string) => void; onDelete: (id: string) => void; onNext: () => void }) {
  return <Panel title="Clients" subtitle="Add the client after your first conversation, then prepare a proposal for them." action={<AddButton onClick={() => onEdit("")}>Add client</AddButton>}>
    {clients.length ? <div className="grid gap-3 lg:grid-cols-2">{clients.map((client) => <article key={client.id} className="rounded-2xl border border-white/[.07] bg-white/[.02] p-4 sm:p-5"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="truncate font-medium">{client.name}</h3><p className="mt-1 text-base font-semibold text-white/45">{client.contact || "Contact not added"}{client.country ? ` · ${client.country}` : ""}</p></div><Tag>{client.email ? "Email ready" : "Add email"}</Tag></div><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-base font-semibold text-white/55">{client.email && <span className="inline-flex items-center gap-1.5"><Mail size={13} />{client.email}</span>}{client.phone && <span>{client.phone}</span>}</div><RowActions><GhostAction tone="success" onClick={() => onAddProposal(client.id)}><Plus size={14} />Create proposal</GhostAction><GhostAction onClick={() => onEdit(client.id)}>Edit client</GhostAction><GhostAction tone="danger" onClick={() => onDelete(client.id)}><Trash2 size={13} />Delete</GhostAction></RowActions></article>)}</div> : <EmptyState title="Start with your first client" detail="Add their name and email address. Then create and send a proposal." action={<AddButton onClick={() => onEdit("")}>Add first client</AddButton>} />}
    {clients.length > 0 && <NextStep text="Next step: prepare a proposal for a client." onClick={onNext} />}
  </Panel>;
}

function ProposalsPage({ data, rows, clientName, busyId, invoiceFor, onSend, onPreview, onDownload, onAdd, onEdit, onDelete, onStatus, onInvoicePage }: { data: AosData; rows: Proposal[]; clientName: (row: Proposal) => string; busyId: string; invoiceFor: (id: string) => Invoice | undefined; onSend: (row: Proposal) => void; onPreview: (row: Proposal) => void; onDownload: (row: Proposal) => void; onAdd: () => void; onEdit: (id: string) => void; onDelete: (id: string) => void; onStatus: (row: Proposal, status: Proposal["status"]) => void; onInvoicePage: () => void }) {
  return <Panel title="Projects" subtitle="Prepare a proposal, revise it when the client asks, then email the latest version." action={<AddButton disabled={!data.clients.length} onClick={onAdd}>New proposal</AddButton>}>
    {!data.clients.length ? <EmptyState title="Add a client first" detail="Create the client record after your conversation. Then you can draft a proposal for them." /> : rows.length ? <div className="space-y-3">{rows.map((proposal) => { const invoice = invoiceFor(proposal.id); return <article key={proposal.id} className="rounded-2xl border border-white/[.07] bg-white/[.02] p-4 sm:p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-[200px] flex-1"><p className="text-sm font-semibold uppercase tracking-[.12em] text-[#bbff00]/90">{clientName(proposal)} · Version {proposal.version || 1}</p><h3 className="mt-1 text-base font-semibold">{proposal.title}</h3><p className="mt-2 text-sm font-semibold text-white/75">{currency.format(Number(proposal.amount) || 0)}{proposal.validUntil ? ` · Valid until ${proposal.validUntil}` : ""}</p></div><Tag tone={proposal.status === "Approved" ? "green" : proposal.status === "Declined" ? "amber" : proposal.status === "Sent" ? "lime" : "default"}>{proposal.status}</Tag></div>{proposal.scope && <p className="mt-4 whitespace-pre-line text-sm font-semibold leading-relaxed text-white/80">{proposal.scope}</p>}{proposal.terms && <p className="mt-3 whitespace-pre-line text-sm font-semibold leading-relaxed text-white/65">{proposal.terms}</p>}<RowActions><GhostAction onClick={() => onPreview(proposal)}><Eye size={14} />View proposal</GhostAction><GhostAction onClick={() => onDownload(proposal)}><Download size={14} />Download PDF</GhostAction><GhostAction tone="info" disabled={busyId === proposal.id || proposal.status === "Approved"} onClick={() => onSend(proposal)}><Mail size={14} />{busyId === proposal.id ? "Sending…" : proposal.status === "Sent" ? "Resend latest version" : "Email proposal"}</GhostAction><GhostAction onClick={() => onEdit(proposal.id)}>Edit proposal</GhostAction>{proposal.status === "Sent" && <GhostAction tone="success" onClick={() => onStatus(proposal, "Approved")}><Check size={14} />Accepted · approve</GhostAction>}{proposal.status === "Approved" && <GhostAction tone="success" onClick={onInvoicePage}><ReceiptText size={14} />Invoice created</GhostAction>}{invoice && <Tag tone={invoice.status === "Paid" ? "green" : "lime"}>{`Invoice ${invoice.number} · ${invoice.status}`}</Tag>}<GhostAction tone="danger" disabled={Boolean(invoice)} onClick={() => onDelete(proposal.id)}><Trash2 size={13} />Delete</GhostAction></RowActions></article>; })}</div> : <EmptyState title="Create your first proposal" detail="Choose a client, write the project scope, set your fee and due date, then email it as a PDF-ready proposal." action={<AddButton onClick={onAdd}>Create proposal</AddButton>} />}
  </Panel>;
}

function InvoicesPage({ rows, clientName, proposalTitle, busyId, onSend, onMarkPaid, onDelete, onDownload }: { rows: Invoice[]; clientName: (id: string) => string; proposalTitle: (id: string) => string; busyId: string; onSend: (invoice: Invoice, action: "invoice" | "receipt") => void; onMarkPaid: (invoice: Invoice) => void; onDelete: (id: string) => void; onDownload: (invoice: Invoice) => void }) {
  return <Panel title="Invoices" subtitle="An invoice is created automatically when you approve an accepted proposal. Due dates keep outstanding amounts easy to follow.">
    {rows.length ? <div className="space-y-3">{rows.map((invoice) => { const late = invoice.status !== "Paid" && invoice.dueDate && invoice.dueDate < today(); return <article key={invoice.id} className="rounded-2xl border border-white/[.07] bg-white/[.02] p-4 sm:p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-sm font-semibold uppercase tracking-[.12em] text-[#bbff00]/90">{clientName(invoice.clientId)}</p><h3 className="mt-1 text-base font-semibold">{invoice.number}</h3><p className="mt-1 text-sm font-semibold text-white/65">Issued {invoice.issueDate || "—"} · Due {invoice.dueDate || "—"}</p></div><div className="text-right"><p className="text-base font-semibold">{currency.format(Number(invoice.amount) || 0)}</p><Tag tone={invoice.status === "Paid" ? "green" : late ? "amber" : invoice.status === "Sent" ? "lime" : "default"}>{late ? "Overdue" : invoice.status}</Tag></div></div><p className="mt-3 text-sm font-semibold text-white/70">From approved proposal: {proposalTitle(invoice.proposalId)}</p>{invoice.status === "Paid" && <p className="mt-3 text-sm font-semibold text-emerald-200/90">Paid {invoice.paidDate}{invoice.receiptSentAt ? " · Receipt emailed" : " · Receipt not emailed"}</p>}<RowActions><GhostAction onClick={() => onDownload(invoice)}><Download size={14} />Download PDF</GhostAction>{invoice.status === "Draft" && <GhostAction tone="info" disabled={busyId === invoice.id} onClick={() => onSend(invoice, "invoice")}><Mail size={14} />{busyId === invoice.id ? "Sending…" : "Email invoice"}</GhostAction>}{invoice.status === "Sent" && <GhostAction tone="success" disabled={busyId === invoice.id} onClick={() => onMarkPaid(invoice)}><Check size={14} />{busyId === invoice.id ? "Sending receipt…" : "Mark paid & email receipt"}</GhostAction>}{invoice.status === "Paid" && <GhostAction tone="info" disabled={busyId === invoice.id} onClick={() => onSend(invoice, "receipt")}><Mail size={14} />{busyId === invoice.id ? "Sending…" : "Resend receipt"}</GhostAction>}<GhostAction tone="danger" onClick={() => onDelete(invoice.id)}><Trash2 size={13} />Delete</GhostAction></RowActions></article>; })}</div> : <EmptyState title="No invoices yet" detail="Approving a client's proposal will create its invoice here, ready for download and sending." />}
  </Panel>;
}

function AccountPage({ data, collected, outstanding, costs, onAddExpense, onDownload, onImport }: { data: AosData; collected: number; outstanding: number; costs: number; onAddExpense: () => void; onDownload: () => void; onImport: (file?: File) => void }) {
  return <div className="space-y-5"><div className="grid gap-3 sm:grid-cols-3"><AccountMetric title="Collected" amount={collected} note="Paid invoices" /><AccountMetric title="Awaiting payment" amount={outstanding} note="Draft + sent invoices" /><AccountMetric title="Recorded costs" amount={costs} note="Operating expenses" /></div><Panel title="Operating expenses" subtitle="Add costs to make the account summary more useful." action={<AddButton onClick={onAddExpense}>Add expense</AddButton>}>{data.expenses.length ? <div className="divide-y divide-white/[.07]">{data.expenses.map((expense) => <div key={expense.id} className="flex flex-wrap items-center justify-between gap-2 py-3"><div><p className="text-base font-semibold">{expense.name}</p><p className="mt-1 text-base font-semibold text-white/40">{expense.category || "General"} · {expense.date}</p></div><p className="text-base font-semibold">{currency.format(Number(expense.amount) || 0)}</p></div>)}</div> : <EmptyState title="No expenses recorded" detail="Track operating costs here; they will appear in the account summary." />}</Panel><Panel title="Data & account" subtitle="The current version stores workspace records in this browser."><div className="flex flex-wrap gap-2"><button onClick={onDownload} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/10 px-4 text-base font-semibold text-white/75 hover:border-[#bbff00]/30 hover:text-[#bbff00]"><ArrowDownToLine size={16} />Download backup</button><label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/10 px-4 text-base font-semibold text-white/75 hover:border-[#bbff00]/30 hover:text-[#bbff00]"><ArrowUpRight size={16} />Import backup<input type="file" accept="application/json,.json" className="sr-only" onChange={(event) => { onImport(event.target.files?.[0]); event.target.value = ""; }} /></label></div><p className="mt-4 text-base font-semibold leading-relaxed text-white/40">For cross-device access, connect a shared database. Profit shown here is cash collected minus recorded expenses, not an accounting or tax report.</p></Panel></div>;
}

function AccountMetric({ title, amount, note }: { title: string; amount: number; note: string }) {
  return <article className="rounded-[22px] border border-white/[.08] bg-[#0b1611] p-5"><p className="text-base font-semibold text-white/50">{title}</p><p className="mt-4 text-2xl font-medium">{currency.format(amount)}</p><p className="mt-2 text-sm font-semibold text-white/35">{note}</p></article>;
}

function NextStep({ text, onClick }: { text: string; onClick: () => void }) {
  return <button onClick={onClick} className="mt-5 flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-[#bbff00]/15 bg-[#bbff00]/[.035] px-4 text-left text-base font-semibold text-white/65 transition hover:border-[#bbff00]/30 hover:text-white"><span>{text}</span><ArrowRight size={16} className="shrink-0 text-[#bbff00]" /></button>;
}

function RecordEditor({ kind, id, prefill, data, onClose, onSave }: { kind: EditorKind; id?: string; prefill?: Record<string, string>; data: AosData; onClose: () => void; onSave: (values: Record<string, string>) => void }) {
  const existing = id ? (data[kind].find((item) => item.id === id) as unknown as Record<string, string> | undefined) : undefined;
  const [values, setValues] = useState<Record<string, string>>(() => ({ ...editorDefaults(kind, data), ...existing, ...prefill }));
  const set = (key: string, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const availableProposals = data.proposals.filter((proposal) => proposal.status === "Approved" && !data.invoices.some((invoice) => invoice.proposalId === proposal.id));
  const selectedProposal = data.proposals.find((proposal) => proposal.id === values.proposalId);
  const fields: ReactNode[] = [];
  const input = (key: string, label: string, options: { type?: string; required?: boolean; placeholder?: string; wide?: boolean } = {}) => <TextField key={key} label={label} type={options.type} required={options.required} placeholder={options.placeholder} value={values[key] ?? ""} onChange={(value) => set(key, value)} wide={options.wide} />;
  const select = (key: string, label: string, options: { value: string; label: string }[], required = true) => <SelectField key={key} label={label} value={values[key] ?? ""} options={options} required={required} onChange={(value) => {
    if (kind === "proposals" && key === "projectId") setValues((current) => ({ ...current, projectId: value, milestoneId: "" }));
    else if (kind === "invoices" && key === "proposalId") {
      const proposal = data.proposals.find((item) => item.id === value);
      setValues((current) => ({ ...current, proposalId: value, amount: proposal?.amount ?? "0" }));
    } else set(key, value);
  }} />;
  const area = (key: string, label: string, wide = true) => <TextArea key={key} label={label} value={values[key] ?? ""} onChange={(value) => set(key, value)} wide={wide} />;

  if (kind === "clients") {
    fields.push(input("name", "Client / company name", { required: true }), input("contact", "Contact person"), input("email", "Email", { type: "email" }), input("phone", "Phone"), input("country", "Country"), area("notes", "Client notes"));
  } else if (kind === "projects") {
    fields.push(select("clientId", "Client", data.clients.map((client) => ({ value: client.id, label: client.name }))), input("name", "Project name", { required: true }), input("service", "Service / scope"), input("startDate", "Start date", { type: "date" }), input("dueDate", "Due date", { type: "date" }));
  } else if (kind === "milestones") {
    fields.push(select("projectId", "Project · client", data.projects.map((project) => ({ value: project.id, label: `${project.name} · ${data.clients.find((client) => client.id === project.clientId)?.name ?? "Client"}` }))), input("name", "Milestone / deliverable", { required: true }), input("amount", "Expected amount (USD)", { type: "number", required: true }), input("dueDate", "Due date", { type: "date" }), select("deliveryStatus", "Delivery status", ["Planned", "In progress", "Done"].map((value) => ({ value, label: value }))));
  } else if (kind === "proposals") {
    fields.push(select("clientId", "Client", data.clients.map((client) => ({ value: client.id, label: client.name }))), input("title", "Proposal title / project", { required: true }), input("amount", "Total commitment (USD)", { type: "number", required: true }), input("dueDate", "Invoice due date", { type: "date" }), area("scope", "Scope / what you agreed"), area("terms", "Payment terms / notes"), input("validUntil", "Proposal valid until", { type: "date" }));
  } else if (kind === "invoices") {
    fields.push(select("proposalId", "Approved proposal", availableProposals.map((proposal) => ({ value: proposal.id, label: `${proposal.title} · ${data.clients.find((client) => client.id === data.projects.find((project) => project.id === proposal.projectId)?.clientId)?.name ?? "Client"}` }))), <p key="proposal-help" className="rounded-xl border border-[#bbff00]/10 bg-[#bbff00]/[.035] p-3 text-base font-semibold leading-relaxed text-white/50 sm:col-span-2">{selectedProposal ? `Approved amount: ${currency.format(Number(selectedProposal.amount) || 0)}. You can adjust the invoice amount before sending.` : "Only approved proposals without an invoice can be selected."}</p>, input("number", "Invoice number", { required: true }), input("amount", "Invoice amount (USD)", { type: "number", required: true }), input("issueDate", "Issue date", { type: "date", required: true }), input("dueDate", "Due date", { type: "date" }));
  } else {
    fields.push(input("name", "Expense name", { required: true }), input("category", "Category"), input("amount", "Amount (USD)", { type: "number", required: true }), input("date", "Date", { type: "date", required: true }), area("notes", "Notes"));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (kind === "projects" && !data.clients.some((client) => client.id === values.clientId)) return;
    if (kind === "milestones" && !data.projects.some((project) => project.id === values.projectId)) return;
    if (kind === "proposals" && !data.clients.some((client) => client.id === values.clientId)) return;
    if (kind === "invoices" && (!selectedProposal || selectedProposal.status !== "Approved")) return;
    onSave(values);
  }

  return <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section role="dialog" aria-modal="true" aria-labelledby="aos-editor-title" className="my-auto w-full max-w-[700px] rounded-[26px] border border-white/10 bg-[#0c1713] p-5 shadow-2xl sm:rounded-[32px] sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[.2em] text-[#bbff00]">Step {String(WORKFLOW_PAGES.findIndex((page) => page.id === kind) + 1).padStart(2, "0")} / Workflow</p><h2 id="aos-editor-title" className="mt-2 text-2xl font-medium">{id ? `Edit ${singular[kind].toLowerCase()}` : `Add ${singular[kind].toLowerCase()}`}</h2></div><button onClick={onClose} aria-label="Close form" className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl border border-white/10 text-white/65 hover:bg-white/5"><X size={18} /></button></div><form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">{fields}<div className="mt-2 flex justify-end gap-2 sm:col-span-2"><button type="button" onClick={onClose} className="min-h-11 cursor-pointer rounded-xl px-4 text-base font-semibold text-white/60 hover:bg-white/5">Cancel</button><button className="flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/15 px-5 text-base font-semibold text-emerald-100 hover:bg-emerald-400/25"><Check size={16} />Save {singular[kind].toLowerCase()}</button></div></form></section></div>;
}

function editorDefaults(kind: EditorKind, data: AosData): Record<string, string> {
  if (kind === "projects") return { clientId: data.clients[0]?.id ?? "", startDate: today() };
  if (kind === "milestones") return { projectId: data.projects[0]?.id ?? "", deliveryStatus: "Planned", amount: "0" };
  if (kind === "proposals") return { clientId: data.clients[0]?.id ?? "", amount: "0", status: "Draft", version: "1" };
  if (kind === "invoices") return { proposalId: "", amount: "0", number: `REL-${new Date().getFullYear()}-${String(data.invoices.length + 1).padStart(4, "0")}`, issueDate: today(), dueDate: plusDays(14) };
  if (kind === "expenses") return { amount: "0", date: today() };
  return {};
}

function TextField({ label, value, onChange, type = "text", required = false, placeholder, wide = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; placeholder?: string; wide?: boolean }) {
  return <label className={`block min-w-0 text-base font-semibold text-white/75 ${wide ? "sm:col-span-2" : ""}`}>{label}<input type={type} required={required} min={type === "number" ? "0" : undefined} step={type === "number" ? "0.01" : undefined} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-base font-semibold text-white outline-none focus:border-[#bbff00]/55" /></label>;
}

function TextArea({ label, value, onChange, wide = true }: { label: string; value: string; onChange: (value: string) => void; wide?: boolean }) {
  return <label className={`block min-w-0 text-base font-semibold text-white/75 ${wide ? "sm:col-span-2" : ""}`}>{label}<textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-base font-semibold text-white outline-none focus:border-[#bbff00]/55" /></label>;
}

function SelectField({ label, value, options, onChange, required = true }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (value: string) => void; required?: boolean }) {
  return <label className="block min-w-0 text-base font-semibold text-white/75">{label}<select required={required} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-[#101b16] px-3 text-base font-semibold text-white outline-none focus:border-[#bbff00]/55"><option value="" disabled>Select {label.toLowerCase()}</option>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>;
}
