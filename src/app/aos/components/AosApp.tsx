"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  CircleDollarSign,
  FileSignature,
  FileText,
  HandCoins,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  ReceiptText,
  Search,
  Trash2,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { emptyAosData, modules, normalizeAosData, type AosData, type AosRecord, type FieldDefinition, type ModuleDefinition } from "@/app/aos/lib/modules";

const STORAGE_KEY = "relvo-aos-workspace-v1";
const overviewId = "overview";
const profitId = "profit";

const moduleIcons = {
  clients: Users,
  proposals: FileText,
  contracts: FileSignature,
  projects: BriefcaseBusiness,
  milestones: HandCoins,
  invoices: ReceiptText,
  team: Users,
  expenses: WalletCards,
};

const navItems = [
  { id: overviewId, label: "Overview", icon: LayoutDashboard },
  ...modules.map((module) => ({
    id: module.id,
    label: module.label,
    icon: moduleIcons[module.id as keyof typeof moduleIcons] ?? BriefcaseBusiness,
  })),
  { id: profitId, label: "Profit", icon: CircleDollarSign },
];

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const amountOf = (rows: AosRecord[], key: string) => rows.reduce((sum, row) => sum + (Number(row[key]) || 0), 0);

function readSavedData(): AosData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? normalizeAosData(JSON.parse(saved) as Partial<AosData>) : emptyAosData();
  } catch {
    return emptyAosData();
  }
}

export default function AosApp() {
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loginBusy, setLoginBusy] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<AosData>(emptyAosData);
  const [dataReady, setDataReady] = useState(false);
  const [activeTab, setActiveTab] = useState(overviewId);
  const [query, setQuery] = useState("");
  const [modalModule, setModalModule] = useState<ModuleDefinition | null>(null);
  const [editingRecord, setEditingRecord] = useState<AosRecord | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
      .catch(() => {
        if (active) setConfigured(false);
      })
      .finally(() => {
        if (active) setCheckingSession(false);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!authenticated || !dataReady) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [authenticated, dataReady, data]);

  const activeModule = modules.find((module) => module.id === activeTab);
  const invoices = data.invoices ?? [];
  const expenses = data.expenses ?? [];
  const paidRevenue = amountOf(invoices.filter((row) => row.status === "Paid"), "amount");
  const outstanding = amountOf(invoices.filter((row) => row.status !== "Paid"), "amount");
  const totalExpenses = amountOf(expenses, "amount") + amountOf(data.team ?? [], "monthlyCost");
  const netProfit = paidRevenue - totalExpenses;

  const rows = useMemo(() => {
    if (!activeModule) return [];
    const items = data[activeModule.id] ?? [];
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return items;
    return items.filter((item) => Object.values(item).some((value) => value.toLowerCase().includes(normalizedQuery)));
  }, [activeModule, data, query]);

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    setLoginBusy(true);
    try {
      const response = await fetch("/aos/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Could not sign in.");
      setData(readSavedData());
      setDataReady(true);
      setAuthenticated(true);
      setPassword("");
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Could not sign in.");
    } finally {
      setLoginBusy(false);
    }
  }

  async function signOut() {
    await fetch("/aos/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
    setDataReady(false);
    setData(emptyAosData());
    setActiveTab(overviewId);
  }

  function openNewRecord(module: ModuleDefinition) {
    setModalModule(module);
    setEditingRecord(null);
    setFormValues(Object.fromEntries(module.fields.map((field) => [field.name, field.type === "select" ? field.options?.[0] ?? "" : ""])));
  }

  function openEditRecord(module: ModuleDefinition, record: AosRecord) {
    setModalModule(module);
    setEditingRecord(record);
    setFormValues(Object.fromEntries(module.fields.map((field) => [field.name, record[field.name] ?? ""])));
  }

  function saveRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!modalModule) return;
    const record: AosRecord = {
      ...(editingRecord ?? { id: crypto.randomUUID(), createdAt: new Date().toISOString() }),
      ...formValues,
    };
    setData((current) => {
      const currentRows = current[modalModule.id] ?? [];
      const nextRows = editingRecord
        ? currentRows.map((item) => item.id === editingRecord.id ? record : item)
        : [record, ...currentRows];
      return { ...current, [modalModule.id]: nextRows };
    });
    setModalModule(null);
  }

  function deleteRecord(module: ModuleDefinition, record: AosRecord) {
    if (!window.confirm(`Delete “${record.name}”? This cannot be undone.`)) return;
    setData((current) => ({
      ...current,
      [module.id]: (current[module.id] ?? []).filter((item) => item.id !== record.id),
    }));
  }

  function exportBackup() {
    const blob = new Blob([JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), data }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `relvo-aos-backup-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function importBackup(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as { data?: Partial<AosData> };
        if (!parsed.data || typeof parsed.data !== "object") throw new Error("That file is not a Relvo AOS backup.");
        setData(normalizeAosData(parsed.data));
      } catch (error) {
        window.alert(error instanceof Error ? error.message : "Could not import this backup.");
      }
    };
    reader.readAsText(file);
  }

  if (checkingSession) return <div className="grid min-h-screen place-items-center bg-[#07100d] text-sm text-white/60">Opening private workspace…</div>;

  if (!authenticated) {
    return (
      <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#07100d] px-5 py-12 text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgb(187 255 0 / 13%) .7px, transparent 1px)", backgroundSize: "4px 4px" }} />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 size-[min(80vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bbff00]/[.06] blur-[100px]" />
        <section className="relative w-full max-w-[440px] rounded-[28px] border border-white/10 bg-[#0c1713]/90 p-6 shadow-2xl backdrop-blur-xl sm:rounded-[36px] sm:p-10">
          <div className="mb-8 flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-[#bbff00]/10 font-semibold text-[#bbff00]">R</span>
            <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#bbff00]">RELVO / PRIVATE</p><p className="mt-1 text-sm text-white/45">Agency Operating System</p></div>
          </div>
          <h1 className="text-3xl font-medium tracking-tight">Sign in</h1>
          <p className="mt-2 text-sm leading-relaxed text-white/55">A private workspace for the Relvo team.</p>
          {!configured ? (
            <div className="mt-7 rounded-2xl border border-amber-300/20 bg-amber-300/[.06] p-4 text-sm leading-relaxed text-amber-100/80">
              Configure <code>AOS_ADMIN_USERNAME</code>, <code>AOS_ADMIN_PASSWORD</code>, and a 32+ character <code>AOS_SESSION_SECRET</code> in the deployment environment to enable sign-in. See <code>src/app/aos/README.md</code>.
            </div>
          ) : (
            <form onSubmit={submitLogin} className="mt-7 space-y-4">
              <label className="block text-sm text-white/65">Username<input required autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-black/25 px-4 text-white outline-none focus:border-[#bbff00]/60" /></label>
              <label className="block text-sm text-white/65">Password<input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-black/25 px-4 text-white outline-none focus:border-[#bbff00]/60" /></label>
              {loginError && <p role="alert" className="text-sm text-red-300">{loginError}</p>}
              <button disabled={loginBusy} className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#bbff00] px-4 font-semibold text-[#07100d] transition hover:bg-[#d2ff59] disabled:cursor-wait disabled:opacity-60">{loginBusy ? "Signing in…" : "Enter workspace"}<ArrowUpRight size={17} /></button>
            </form>
          )}
          <p className="mt-7 border-t border-white/10 pt-5 text-xs leading-relaxed text-white/35">Your private credentials are read from environment variables and are never stored in the page.</p>
        </section>
      </main>
    );
  }

  if (!dataReady) return <div className="grid min-h-screen place-items-center bg-[#07100d] text-sm text-white/60">Loading workspace…</div>;

  return (
    <main className="min-h-screen bg-[#07100d] text-white selection:bg-[#bbff00] selection:text-[#07100d]">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 opacity-[.12]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgb(187 255 0 / 25%) .6px, transparent 1px)", backgroundSize: "5px 5px" }} />
      <div className="relative flex min-h-screen">
        {mobileNavOpen && <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-black/70 lg:hidden" onClick={() => setMobileNavOpen(false)} />}
        <aside className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-white/[.08] bg-[#09130f] px-4 py-5 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="mb-8 flex items-center justify-between px-2">
            <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#bbff00]/10 font-semibold text-[#bbff00]">R</span><div><p className="text-sm font-semibold tracking-[.16em]">RELVO</p><p className="mt-1 text-[10px] uppercase tracking-[.16em] text-white/40">Operating system</p></div></div>
            <button className="grid size-9 place-items-center rounded-lg text-white/55 hover:bg-white/5 lg:hidden" aria-label="Close menu" onClick={() => setMobileNavOpen(false)}><X size={18} /></button>
          </div>
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[.2em] text-white/35">Workspace</p>
          <nav className="flex-1 space-y-1 overflow-y-auto">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => { setActiveTab(id); setQuery(""); setMobileNavOpen(false); }} className={`flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-3 text-left text-sm transition ${activeTab === id ? "bg-[#bbff00]/10 font-medium text-[#bbff00]" : "text-white/60 hover:bg-white/[.04] hover:text-white"}`}>
                <Icon size={17} strokeWidth={1.7} /><span>{label}</span>
                {id === "invoices" && outstanding > 0 && <span className="ms-auto rounded-full bg-amber-300/10 px-2 py-0.5 text-[10px] text-amber-200">{currency.format(outstanding)}</span>}
              </button>
            ))}
          </nav>
          <div className="mt-5 border-t border-white/[.08] pt-4">
            <p className="px-3 text-xs text-white/35">Owner workspace</p>
            <button onClick={signOut} className="mt-2 flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-3 text-sm text-white/55 hover:bg-white/[.04] hover:text-white"><LogOut size={17} />Sign out</button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/[.08] bg-[#07100d]/90 px-4 backdrop-blur-xl sm:px-7 lg:px-10">
            <div className="flex min-w-0 items-center gap-3">
              <button className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 text-white/75 lg:hidden" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Menu size={19} /></button>
              <div className="min-w-0"><p className="truncate text-sm font-medium sm:text-base">{activeTab === overviewId ? "Overview" : activeTab === profitId ? "Profit & margin" : activeModule?.label}</p><p className="mt-1 hidden truncate text-[11px] text-white/40 sm:block">Relvo · Private workspace</p></div>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <label className="hidden h-10 w-48 items-center gap-2 rounded-xl border border-white/10 px-3 text-white/35 md:flex"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search records" className="w-full bg-transparent text-xs text-white outline-none placeholder:text-white/35" /></label>
              {activeModule && <button onClick={() => openNewRecord(activeModule)} className="flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[#bbff00] px-3 text-xs font-semibold text-[#07100d] hover:bg-[#d2ff59] sm:px-4 sm:text-sm"><Plus size={17} /><span className="hidden sm:inline">Add {activeModule.singular}</span><span className="sm:hidden">Add</span></button>}
              <button onClick={exportBackup} title="Download workspace backup" aria-label="Download workspace backup" className="grid size-10 cursor-pointer place-items-center rounded-xl border border-white/10 text-white/65 hover:border-white/20 hover:text-white"><ArrowDownToLine size={17} /></button>
            </div>
          </header>

          <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div><p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#bbff00]/75">Agency operations</p><h1 className="mt-2 text-[clamp(1.8rem,4vw,2.6rem)] font-medium tracking-tight">{activeTab === overviewId ? "Good work runs on a clear system." : activeTab === profitId ? "Know what the work earns." : activeModule?.label}</h1><p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/50">{activeTab === overviewId ? "A calm view of clients, delivery, cash flow, and team costs." : activeTab === profitId ? "Compare collected revenue with recorded expenses and team costs." : activeModule?.description}</p></div>
              <label className="flex h-10 min-w-[190px] items-center gap-2 rounded-xl border border-white/10 px-3 text-white/40 md:hidden"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search records" className="w-full bg-transparent text-xs text-white outline-none placeholder:text-white/35" /></label>
            </div>

            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-white/[.07] bg-white/[.025] px-4 py-3 text-xs leading-relaxed text-white/45">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#bbff00]" />
              Records are stored in this browser. Download a backup regularly to keep a copy or move it to another device.
            </div>

            {activeTab === overviewId ? (
              <Overview data={data} paidRevenue={paidRevenue} outstanding={outstanding} totalExpenses={totalExpenses} netProfit={netProfit} onSelect={setActiveTab} onCreate={openNewRecord} onImport={importBackup} />
            ) : activeTab === profitId ? (
              <ProfitView data={data} paidRevenue={paidRevenue} totalExpenses={totalExpenses} netProfit={netProfit} />
            ) : activeModule ? (
              <RecordTable module={activeModule} rows={rows} onEdit={openEditRecord} onDelete={deleteRecord} />
            ) : null}
          </div>
        </div>
      </div>

      {modalModule && <RecordModal module={modalModule} values={formValues} editing={Boolean(editingRecord)} onChange={setFormValues} onClose={() => setModalModule(null)} onSubmit={saveRecord} />}
    </main>
  );
}

function MetricCard({ label, value, note, icon: Icon, tone = "lime" }: { label: string; value: string; note: string; icon: typeof Users; tone?: "lime" | "amber" | "blue" }) {
  const color = tone === "amber" ? "text-amber-200 bg-amber-200/10" : tone === "blue" ? "text-sky-200 bg-sky-200/10" : "text-[#bbff00] bg-[#bbff00]/10";
  return <article className="rounded-[22px] border border-white/[.08] bg-[#0b1611] p-5 sm:p-6"><div className="flex items-start justify-between"><p className="text-xs font-medium text-white/50">{label}</p><span className={`grid size-9 place-items-center rounded-xl ${color}`}><Icon size={17} /></span></div><p className="mt-5 text-2xl font-medium tracking-tight sm:text-[30px]">{value}</p><p className="mt-2 text-[11px] text-white/35">{note}</p></article>;
}

function Overview({ data, paidRevenue, outstanding, totalExpenses, netProfit, onSelect, onCreate, onImport }: { data: AosData; paidRevenue: number; outstanding: number; totalExpenses: number; netProfit: number; onSelect: (id: string) => void; onCreate: (module: ModuleDefinition) => void; onImport: (file?: File) => void }) {
  const proposalPipeline = amountOf((data.proposals ?? []).filter((item) => ["Draft", "Sent"].includes(item.status)), "value");
  const activeProjects = (data.projects ?? []).filter((item) => ["Planning", "In progress", "Review"].includes(item.status));
  const recent = [...modules.flatMap((definition) => (data[definition.id] ?? []).map((record) => ({ record, definition })))].sort((a, b) => b.record.createdAt.localeCompare(a.record.createdAt)).slice(0, 6);
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 sm:gap-4">
        <MetricCard label="Active clients" value={String((data.clients ?? []).filter((item) => item.status === "Active").length)} note={`${data.clients?.length ?? 0} total client records`} icon={Users} />
        <MetricCard label="Proposal pipeline" value={currency.format(proposalPipeline)} note={`${data.proposals?.length ?? 0} proposals tracked`} icon={FileText} tone="blue" />
        <MetricCard label="Outstanding invoices" value={currency.format(outstanding)} note={`${(data.invoices ?? []).filter((item) => item.status !== "Paid").length} awaiting payment`} icon={ReceiptText} tone="amber" />
        <MetricCard label="Collected less costs" value={currency.format(netProfit)} note={`${currency.format(paidRevenue)} collected · ${currency.format(totalExpenses)} costs`} icon={CircleDollarSign} />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
        <section className="rounded-[22px] border border-white/[.08] bg-[#0b1611] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3"><div><h2 className="font-medium">Active delivery</h2><p className="mt-1 text-xs text-white/40">Projects currently moving forward</p></div><button onClick={() => onSelect("projects")} className="cursor-pointer text-xs text-[#bbff00] hover:underline">View projects <ArrowUpRight className="inline" size={13} /></button></div>
          {activeProjects.length ? <div className="mt-5 divide-y divide-white/[.07]">{activeProjects.slice(0, 5).map((project) => <button key={project.id} onClick={() => onSelect("projects")} className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left"><span className="min-w-0"><span className="block truncate text-sm">{project.name}</span><span className="mt-1 block truncate text-xs text-white/40">{project.client} · {project.service || "Project"}</span></span><span className="shrink-0 rounded-full bg-[#bbff00]/10 px-3 py-1.5 text-[10px] text-[#bbff00]">{project.status}</span></button>)}</div> : <EmptyState title="No active projects" detail="Add a project when an engagement begins." />}
        </section>

        <section className="rounded-[22px] border border-white/[.08] bg-[#0b1611] p-5 sm:p-6">
          <h2 className="font-medium">Quick actions</h2><p className="mt-1 text-xs text-white/40">Create a record or restore your backup</p>
          <div className="mt-5 grid grid-cols-2 gap-2">{["clients", "proposals", "projects", "invoices"].map((id) => { const definition = modules.find((item) => item.id === id)!; return <button key={id} onClick={() => onCreate(definition)} className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-white/[.08] px-3 text-left text-xs text-white/70 hover:border-[#bbff00]/35 hover:text-white"><Plus size={14} className="text-[#bbff00]" />{definition.singular}</button>; })}</div>
          <label className="mt-3 flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/[.04] px-3 text-xs text-white/60 hover:bg-white/[.07]"><ArrowDownToLine size={15} />Import a workspace backup<input type="file" accept="application/json,.json" className="sr-only" onChange={(event) => { onImport(event.target.files?.[0]); event.target.value = ""; }} /></label>
        </section>
      </div>

      <section className="mt-5 rounded-[22px] border border-white/[.08] bg-[#0b1611] p-5 sm:p-6">
        <div className="flex items-center justify-between"><div><h2 className="font-medium">Recently added</h2><p className="mt-1 text-xs text-white/40">Your latest workspace records</p></div></div>
        {recent.length ? <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[560px] text-left text-sm"><thead className="text-[10px] uppercase tracking-[.14em] text-white/35"><tr><th className="py-3 font-medium">Record</th><th className="py-3 font-medium">Module</th><th className="py-3 font-medium">Status</th><th className="py-3 font-medium">Added</th></tr></thead><tbody className="divide-y divide-white/[.07]">{recent.map(({ record, definition }) => <tr key={`${definition.id}-${record.id}`}><td className="max-w-[260px] truncate py-3 pr-4">{record.name}</td><td className="py-3 text-white/55">{definition.label}</td><td className="py-3 text-white/55">{record.status || record.client || "—"}</td><td className="py-3 text-white/40">{new Date(record.createdAt).toLocaleDateString()}</td></tr>)}</tbody></table></div> : <EmptyState title="Your workspace is ready" detail="Add a client, project, or invoice to start building your operating picture." />}
      </section>
    </>
  );
}

function ProfitView({ data, paidRevenue, totalExpenses, netProfit }: { data: AosData; paidRevenue: number; totalExpenses: number; netProfit: number }) {
  const teamCost = amountOf(data.team ?? [], "monthlyCost");
  const directExpenses = amountOf(data.expenses ?? [], "amount");
  return <div className="grid gap-4 md:grid-cols-3"><MetricCard label="Collected revenue" value={currency.format(paidRevenue)} note="Paid invoices only" icon={CircleDollarSign} /><MetricCard label="Recorded costs" value={currency.format(totalExpenses)} note={`${currency.format(directExpenses)} expenses + ${currency.format(teamCost)} team monthly costs`} icon={WalletCards} tone="amber" /><MetricCard label="Net collected" value={currency.format(netProfit)} note="Revenue collected less recorded costs" icon={Check} /><section className="rounded-[22px] border border-white/[.08] bg-[#0b1611] p-5 md:col-span-3 sm:p-6"><h2 className="font-medium">Profit inputs</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/50">Profit currently uses paid invoice totals minus all expense records and the current monthly team cost. Add complete expense and team cost data for a more useful operating estimate. This is a cash tracking view, not an accounting or tax report.</p></section></div>;
}

function EmptyState({ title, detail }: { title: string; detail: string }) {
  return <div className="grid min-h-36 place-items-center py-8 text-center"><div><p className="text-sm text-white/65">{title}</p><p className="mt-2 max-w-sm text-xs leading-relaxed text-white/35">{detail}</p></div></div>;
}

function RecordTable({ module, rows, onEdit, onDelete }: { module: ModuleDefinition; rows: AosRecord[]; onEdit: (module: ModuleDefinition, record: AosRecord) => void; onDelete: (module: ModuleDefinition, record: AosRecord) => void }) {
  if (!rows.length) return <section className="rounded-[22px] border border-white/[.08] bg-[#0b1611] p-4 sm:p-6"><EmptyState title={`No ${module.label.toLowerCase()} yet`} detail={`Add your first ${module.singular.toLowerCase()} to start tracking it here.`} /></section>;
  return <section className="overflow-hidden rounded-[22px] border border-white/[.08] bg-[#0b1611]"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b border-white/[.08] bg-white/[.025] text-[10px] uppercase tracking-[.14em] text-white/40"><tr><th className="px-5 py-4 font-medium">{module.fields[0]?.label ?? "Name"}</th>{module.fields.slice(1).map((field) => <th key={field.name} className="px-4 py-4 font-medium">{field.label}</th>)}<th className="px-4 py-4 font-medium">Actions</th></tr></thead><tbody className="divide-y divide-white/[.07]">{rows.map((record) => <tr key={record.id} className="hover:bg-white/[.02]"><td className="max-w-[240px] truncate px-5 py-4 font-medium">{record[module.fields[0]?.name] || "—"}</td>{module.fields.slice(1).map((field) => <td key={field.name} className="max-w-[200px] truncate px-4 py-4 text-white/55">{field.type === "number" && record[field.name] ? currency.format(Number(record[field.name])) : record[field.name] || "—"}</td>)}<td className="px-4 py-3"><div className="flex items-center gap-1"><button onClick={() => onEdit(module, record)} className="min-h-9 cursor-pointer rounded-lg px-3 text-xs text-[#bbff00] hover:bg-[#bbff00]/10">Edit</button><button aria-label={`Delete ${record.name}`} onClick={() => onDelete(module, record)} className="grid size-9 cursor-pointer place-items-center rounded-lg text-white/35 hover:bg-red-400/10 hover:text-red-300"><Trash2 size={15} /></button></div></td></tr>)}</tbody></table></div><div className="border-t border-white/[.07] px-5 py-3 text-[11px] text-white/35">{rows.length} {rows.length === 1 ? module.singular.toLowerCase() : module.label.toLowerCase()}</div></section>;
}

function RecordModal({ module, values, editing, onChange, onClose, onSubmit }: { module: ModuleDefinition; values: Record<string, string>; editing: boolean; onChange: (values: Record<string, string>) => void; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section role="dialog" aria-modal="true" aria-labelledby="aos-record-title" className="my-auto w-full max-w-[680px] rounded-[26px] border border-white/10 bg-[#0c1713] p-5 shadow-2xl sm:rounded-[32px] sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#bbff00]">{editing ? "Update record" : "New record"}</p><h2 id="aos-record-title" className="mt-2 text-2xl font-medium">{editing ? `Edit ${module.singular}` : `Add ${module.singular}`}</h2></div><button onClick={onClose} aria-label="Close form" className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl border border-white/10 text-white/65 hover:bg-white/5"><X size={18} /></button></div><form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">{module.fields.map((field) => <FieldInput key={field.name} field={field} value={values[field.name] ?? ""} onChange={(value) => onChange({ ...values, [field.name]: value })} />)}<div className="mt-2 flex justify-end gap-2 sm:col-span-2"><button type="button" onClick={onClose} className="min-h-11 cursor-pointer rounded-xl px-4 text-sm text-white/60 hover:bg-white/5">Cancel</button><button className="flex min-h-11 cursor-pointer items-center gap-2 rounded-xl bg-[#bbff00] px-5 text-sm font-semibold text-[#07100d] hover:bg-[#d2ff59]"><Check size={16} />{editing ? "Save changes" : "Save record"}</button></div></form></section></div>;
}

function FieldInput({ field, value, onChange }: { field: FieldDefinition; value: string; onChange: (value: string) => void }) {
  const classes = "mt-2 h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none focus:border-[#bbff00]/55";
  return <label className="block min-w-0 text-xs text-white/60">{field.label}{field.type === "select" ? <select required={field.required} value={value} onChange={(event) => onChange(event.target.value)} className={`${classes} cursor-pointer`}>{field.options?.map((option) => <option key={option} value={option} className="bg-[#0c1713]">{option}</option>)}</select> : <input required={field.required} type={field.type ?? "text"} min={field.type === "number" ? "0" : undefined} step={field.type === "number" ? "0.01" : undefined} value={value} onChange={(event) => onChange(event.target.value)} className={classes} />}</label>;
}
