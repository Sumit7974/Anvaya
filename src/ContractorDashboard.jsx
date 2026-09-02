import { useCallback, useEffect, useState } from 'react';
import { apiRequest, getStoredToken, getStoredUser } from './api/client';

const statusLabel = { draft: 'Draft', open: 'Open', 'in-progress': 'In progress', completed: 'Completed' };

function ContractorDashboard({ onBack, onCreateProject }) {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = getStoredUser();

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const data = await apiRequest('/api/projects/my', { token: getStoredToken() });
      const next = Array.isArray(data?.projects) ? data.projects : [];
      setProjects(next);
      setSelected(current => next.find(item => item._id === current?._id) || next[0] || null);
    } catch (e) { setError(e.message || 'Unable to load your projects.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { void load(); }, 0);
    return () => clearTimeout(timer);
  }, [load]);

  const updateStatus = async status => {
    if (!selected?._id) return;
    try {
      const data = await apiRequest(`/api/projects/${selected._id}/status`, { method: 'PATCH', token: getStoredToken(), body: { status } });
      setProjects(items => items.map(item => item._id === selected._id ? data.project : item));
      setSelected(data.project);
    } catch (e) { setError(e.message || 'Unable to update project status.'); }
  };

  const active = projects.filter(p => p.status === 'in-progress').length;
  const open = projects.filter(p => p.status === 'open').length;
  const completed = projects.filter(p => p.status === 'completed').length;

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-slate-800">
      <header className="sticky top-0 z-40 border-b border-amber-100 bg-white/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"><div className="flex items-center gap-3"><img src="/anvaya-logo.png" alt="Anvaya" className="h-12 w-auto"/><div className="hidden sm:block"><p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Contractor Dashboard</p><p className="text-sm font-semibold text-slate-600">{user?.name || 'Your workspace'}</p></div></div><div className="flex gap-2"><button type="button" onClick={onCreateProject} className="rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-amber-700">+ New project</button><button type="button" onClick={onBack} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 hover:border-amber-300 hover:text-amber-700">← Back</button></div></div></header>
      <section className="border-b border-amber-100 bg-[#FFF1E6]"><div className="mx-auto max-w-7xl px-5 py-10 sm:px-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Live workspace</p><h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">Manage your projects.</h1><p className="mt-3 max-w-2xl text-slate-600">Projects, worker assignments and status updates are loaded from your Anvaya account.</p></div></section>
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        {error && <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}<button type="button" onClick={() => void load()} className="ml-3 underline">Retry</button></div>}
        <div className="grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Total projects</p><p className="mt-2 text-3xl font-bold">{projects.length}</p></div><div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Open / active</p><p className="mt-2 text-3xl font-bold text-blue-600">{open + active}</p></div><div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Completed</p><p className="mt-2 text-3xl font-bold text-emerald-600">{completed}</p></div></div>
        <div className="mt-7 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <section className="rounded-3xl border border-amber-100 bg-white p-5 shadow-lg"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">Your projects</h2><button type="button" onClick={() => void load()} className="text-sm font-bold text-amber-700">Refresh</button></div>{loading ? <p className="py-10 text-center text-slate-500">Loading projects…</p> : projects.length === 0 ? <div className="py-12 text-center"><p className="font-bold">No projects yet</p><p className="mt-2 text-sm text-slate-500">Create your first project to start building a team.</p><button type="button" onClick={onCreateProject} className="mt-5 rounded-xl bg-amber-600 px-5 py-3 text-sm font-bold text-white">Create project</button></div> : <div className="mt-4 space-y-3">{projects.map(project => <button key={project._id} type="button" onClick={() => setSelected(project)} className={`w-full rounded-2xl border p-4 text-left ${selected?._id === project._id ? 'border-amber-400 bg-amber-50' : 'border-slate-100 bg-slate-50 hover:border-amber-200'}`}><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold text-amber-700">{project._id.slice(-6).toUpperCase()}</p><h3 className="mt-1 font-bold">{project.title}</h3></div><span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-slate-600">{statusLabel[project.status] || project.status}</span></div><p className="mt-2 text-xs text-slate-500">{project.assignedWorkers?.length || 0} worker(s) assigned</p></button>)}</div>}</section>
          <section className="rounded-3xl border border-amber-100 bg-white shadow-lg"><div className="bg-slate-900 px-6 py-7 text-white"><p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">Project details</p><h2 className="mt-2 text-2xl font-bold">{selected?.title || 'Select a project'}</h2>{selected && <p className="mt-2 text-sm text-slate-300">Status: {statusLabel[selected.status] || selected.status}</p>}</div>{selected ? <div className="p-6"><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-[#FFF8F3] p-4"><p className="text-xs font-bold uppercase text-slate-400">Description</p><p className="mt-2 text-sm leading-6">{selected.description || 'No description provided.'}</p></div><div className="rounded-2xl bg-[#FFF8F3] p-4"><p className="text-xs font-bold uppercase text-slate-400">Workers</p><p className="mt-2 text-2xl font-bold">{selected.assignedWorkers?.length || 0}</p></div></div><div className="mt-6 flex flex-wrap gap-2">{selected.status !== 'in-progress' && selected.status !== 'completed' && <button type="button" onClick={() => void updateStatus('in-progress')} className="rounded-xl bg-amber-600 px-4 py-3 text-sm font-bold text-white">Start project</button>}{selected.status === 'in-progress' && <button type="button" onClick={() => void updateStatus('completed')} className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white">Mark completed</button>}</div></div> : <div className="p-12 text-center text-slate-500">Choose a project from the list.</div>}</section>
        </div>
      </section>
    </main>
  );
}
export default ContractorDashboard;
