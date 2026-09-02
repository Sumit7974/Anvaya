import { useCallback, useEffect, useMemo, useState } from "react";
import { apiRequest, getStoredToken } from "./api/client";

function WorkerSelection({ project, onBack, onNext }) {
  const [search, setSearch] = useState("");
  const [workers, setWorkers] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadWorkers = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      setError("Your contractor session has expired. Please sign in again.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      const skill = String(project?.service || "").trim().toLowerCase();
      if (!skill) throw new Error("Select a required service before finding workers.");
      params.set("skill", skill);
      params.set("radius", "50");
      if (project?.coordinates?.length === 2) {
        params.set("longitude", String(project.coordinates[0]));
        params.set("latitude", String(project.coordinates[1]));
      } else {
        throw new Error("Project location coordinates are required to find nearby workers.");
      }
      const data = await apiRequest(`/api/projects/workers/find?${params.toString()}`, { token });
      setWorkers(Array.isArray(data?.workers) ? data.workers : []);
    } catch (e) {
      setWorkers([]);
      setError(e.message || "Unable to find workers.");
    } finally {
      setLoading(false);
    }
  }, [project]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadWorkers(), 0);
    return () => window.clearTimeout(timer);
  }, [loadWorkers]);

  const filteredWorkers = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return workers;
    return workers.filter((worker) => {
      const location = worker.location?.address || worker.location?.city || worker.location?.name || "";
      const skill = Array.isArray(worker.skills) ? worker.skills.join(" ") : worker.skill || "";
      return `${worker.name || ""} ${skill} ${location}`.toLowerCase().includes(query);
    });
  }, [search, workers]);

  const toggleWorker = (worker) => {
    const workerId = worker._id || worker.id;
    setSelectedWorkers((previous) => previous.some((item) => (item._id || item.id) === workerId) ? previous.filter((item) => (item._id || item.id) !== workerId) : [...previous, worker]);
  };

  const handleContinue = () => { if (selectedWorkers.length > 0) onNext(selectedWorkers); };
  const locationText = (worker) => typeof worker.location === "string" ? worker.location : worker.location?.address || worker.location?.city || "Nearby";

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-slate-800">
      <header className="border-b border-amber-100 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"><div className="flex items-center gap-3"><img src="/anvaya-logo.png" alt="Anvaya" className="h-12 w-auto object-contain"/><div className="hidden border-l border-slate-200 pl-4 sm:block"><p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Contractor</p><p className="text-sm font-semibold text-slate-700">Find & assign workers</p></div></div><button type="button" onClick={onBack} className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 hover:border-amber-300 hover:text-amber-700">← Back</button></div></header>
      <section className="border-b border-amber-100 bg-white"><div className="mx-auto max-w-4xl px-5 py-5 sm:px-8"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">✓</div><div className="h-1 flex-1 rounded-full bg-amber-600"/><div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">2</div><div className="h-1 flex-1 rounded-full bg-amber-200"/><div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-400">3</div></div><div className="mt-3 flex justify-between text-xs font-bold"><span className="text-emerald-600">Project</span><span className="text-amber-700">Workers</span><span className="text-slate-400">Review</span></div></div></section>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14"><div className="mb-8"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-amber-700 shadow-sm">👷 Step 2 of 3</div><h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Find the right workers</h1><p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">Search verified, active workers from the live Anvaya database and select one or multiple professionals.</p></div>
        <section className="mb-8 rounded-3xl border border-amber-100 bg-white p-6 shadow-lg"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">Current Project</p><h2 className="mt-2 text-2xl font-bold text-slate-900">{project?.name || "New Project"}</h2><div className="mt-3 flex flex-wrap gap-2">{project?.service && <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">🔧 {project.service}</span>}{project?.location && <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">📍 {project.location}</span>}</div></div><div className="rounded-2xl bg-amber-50 px-5 py-4 text-center"><p className="text-2xl font-bold text-amber-700">{selectedWorkers.length}</p><p className="text-xs font-bold text-amber-600">Workers selected</p></div></div></section>
        <div className="mb-7 rounded-3xl border border-amber-100 bg-white p-5 shadow-lg"><label htmlFor="worker-search" className="text-sm font-bold text-slate-800">Search workers</label><div className="relative mt-3"><span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span><input id="worker-search" type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, skill or location..." className="w-full rounded-2xl border border-slate-200 bg-[#FFFDFC] py-4 pl-11 pr-4 text-sm text-slate-800 outline-none hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"/></div></div>
        {loading ? <div className="rounded-3xl border border-amber-100 bg-white p-12 text-center shadow-sm"><p className="font-bold text-slate-800">Finding verified workers…</p><p className="mt-2 text-sm text-slate-500">Searching the live worker database.</p></div> : error ? <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center"><h2 className="text-xl font-bold text-red-800">Could not load workers</h2><p className="mt-2 text-sm text-red-700">{error}</p><button type="button" onClick={() => void loadWorkers()} className="mt-5 rounded-xl bg-amber-600 px-5 py-3 font-bold text-white hover:bg-amber-700">Try again</button></div> : filteredWorkers.length === 0 ? <div className="rounded-3xl border border-dashed border-amber-200 bg-white p-12 text-center shadow-sm"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl">🔍</div><h2 className="mt-5 text-xl font-bold text-slate-900">No workers found</h2><p className="mt-2 text-sm text-slate-500">Try another search or increase the project search radius.</p></div> : <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filteredWorkers.map((worker) => { const workerId = worker._id || worker.id; const selected = selectedWorkers.some((item) => (item._id || item.id) === workerId); const skills = Array.isArray(worker.skills) ? worker.skills : [worker.skill].filter(Boolean); const rating = worker.rating?.average ?? worker.rating ?? "—"; return <button key={workerId} type="button" onClick={() => toggleWorker(worker)} className={`group relative overflow-hidden rounded-3xl border bg-white p-6 text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${selected ? "border-amber-500 ring-4 ring-amber-100" : "border-slate-100 hover:border-amber-200"}`}>{selected && <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white shadow-md">✓</div>}<div className="flex items-center gap-4"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-2xl font-bold text-amber-700">{worker.name?.charAt(0)?.toUpperCase() || "W"}</div><div className="min-w-0"><h2 className="truncate pr-8 text-lg font-bold text-slate-900">{worker.name}</h2><p className="mt-1 text-sm font-semibold text-amber-600">{skills.join(", ")}</p></div></div><div className="mt-6 space-y-3"><div className="flex items-center gap-3 text-sm text-slate-500"><span>📍</span><span>{locationText(worker)}</span></div><div className="flex items-center gap-3 text-sm text-slate-500"><span>⭐</span><span>{rating} rating</span></div></div><div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5"><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">● Available</span><span className={`text-sm font-bold ${selected ? "text-amber-700" : "text-slate-400 group-hover:text-amber-600"}`}>{selected ? "Selected" : "Select"}</span></div></button>; })}</div>}
        <div className="mt-10 flex flex-col gap-3 rounded-3xl border border-amber-100 bg-white p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-bold text-slate-800">{selectedWorkers.length === 0 ? "Select workers to continue" : `${selectedWorkers.length} worker${selectedWorkers.length > 1 ? "s" : ""} selected`}</p><p className="mt-1 text-xs text-slate-400">Selected workers will be saved to the project after creation.</p></div><button type="button" onClick={handleContinue} disabled={selectedWorkers.length === 0} className="group flex items-center justify-center gap-3 rounded-xl bg-amber-600 px-7 py-3.5 font-bold text-white shadow-lg hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none">Continue to Review <span className="text-lg">→</span></button></div>
      </section><footer className="border-t border-amber-100 bg-white"><div className="mx-auto max-w-7xl px-5 py-6 text-center"><p className="text-sm text-slate-400">Trusted workers. Better connections. Stronger communities.</p></div></footer>
    </main>
  );
}
export default WorkerSelection;