import { useCallback, useEffect, useState } from "react";
import { apiRequest, getStoredToken } from "./api/client";

function AdminDashboard({ onBack }) {
  const [workers, setWorkers] = useState([]);
  const [activeTab, setActiveTab] = useState("workers");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");

  const loadWorkers = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const data = await apiRequest("/api/admin/workers/pending", { token: getStoredToken() });
      setWorkers(data.workers || []);
    } catch (e) { setError(e.message || "Unable to load pending workers."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void loadWorkers(); }, [loadWorkers]);

  const verify = async (workerId, status) => {
    setBusyId(workerId); setError("");
    try {
      const data = await apiRequest(`/api/admin/workers/${workerId}/verify`, { method: "PATCH", token: getStoredToken(), body: { status } });
      setWorkers(current => current.filter(worker => worker._id !== workerId));
      if (!data?.worker) await loadWorkers();
    } catch (e) { setError(e.message || "Unable to update worker verification."); }
    finally { setBusyId(""); }
  };

  return <main className="min-h-screen bg-[#FFF8F3] text-slate-800"><header className="border-b border-amber-100 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><div className="flex items-center gap-3"><img src="/anvaya-logo.png" alt="Anvaya" className="h-12"/><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Admin</p><p className="font-semibold">Control Center</p></div></div><button type="button" onClick={onBack} className="rounded-xl border border-amber-200 px-4 py-2.5 font-bold">← Back</button></div></header><section className="mx-auto max-w-7xl px-5 py-10"><div className="mb-8"><span className="rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-700">🛡 Trust & safety</span><h1 className="mt-5 text-4xl font-bold text-slate-900">Manage Anvaya workers</h1><p className="mt-3 max-w-2xl text-slate-500">Review real worker verification requests and take action using the production API.</p></div><div className="mb-6 flex flex-wrap gap-3"><button type="button" onClick={() => setActiveTab("workers")} className={`rounded-xl px-5 py-3 font-bold ${activeTab === "workers" ? "bg-amber-600 text-white" : "border border-amber-100 bg-white"}`}>Pending Workers</button><button type="button" onClick={() => setActiveTab("complaints")} className={`rounded-xl px-5 py-3 font-bold ${activeTab === "complaints" ? "bg-amber-600 text-white" : "border border-amber-100 bg-white"}`}>Complaints</button></div>{error && <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 font-semibold text-red-700">{error}</div>}{activeTab === "complaints" ? <div className="rounded-3xl border border-amber-100 bg-white p-10 text-center shadow-lg"><div className="text-4xl">📋</div><h2 className="mt-4 text-2xl font-bold">Complaints management coming soon</h2><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">There is currently no admin complaints endpoint in the backend, so Anvaya does not show fabricated complaint data here.</p></div> : <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-lg"><div className="mb-6 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Verification queue</p><h2 className="mt-1 text-2xl font-bold">Pending workers</h2></div><button type="button" onClick={() => void loadWorkers()} className="rounded-xl border border-amber-200 px-4 py-2 text-sm font-bold">Refresh</button></div>{loading ? <p className="py-10 text-center text-slate-500">Loading verification queue…</p> : workers.length === 0 ? <div className="rounded-2xl bg-emerald-50 p-8 text-center text-emerald-700"><p className="text-xl font-bold">All caught up ✓</p><p className="mt-1 text-sm">There are no pending worker verification requests.</p></div> : <div className="space-y-4">{workers.map(worker => <div key={worker._id} className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-bold text-slate-900">{worker.name}</h3><p className="mt-1 text-sm text-amber-700">{worker.skills?.join(", ") || "Skills not listed"}</p><p className="mt-1 text-xs text-slate-500">{worker.email}{worker.phone ? ` · ${worker.phone}` : ""}</p></div><div className="flex flex-wrap gap-2"><button type="button" disabled={busyId === worker._id} onClick={() => void verify(worker._id, "rejected")} className="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-600 disabled:opacity-50">Reject</button><button type="button" disabled={busyId === worker._id} onClick={() => void verify(worker._id, "verified")} className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50">{busyId === worker._id ? "Updating…" : "Verify Worker"}</button></div></div>)}</div>}</div>}</section></main>;
}
export default AdminDashboard;
