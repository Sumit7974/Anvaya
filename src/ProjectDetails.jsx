import { useState } from "react";
import { apiRequest, getStoredToken } from "./api/client";

function ProjectDetails({ project, selectedWorkers, onBack, onCreateProject }) {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    setCreating(true);
    setError("");
    try {
      const token = getStoredToken();
      if (!token) throw new Error("Your contractor session has expired. Please sign in again.");
      const service = String(project?.service || "").trim().toLowerCase();
      if (!project?.name?.trim() || !service) throw new Error("Project name and service are required.");
      if (!Array.isArray(project?.coordinates) || project.coordinates.length !== 2) throw new Error("Project coordinates are missing. Please go back and allow location access.");
      if (!selectedWorkers?.length) throw new Error("Select at least one worker before creating the project.");

      const workerIds = selectedWorkers.map((worker) => worker?._id || worker?.id);
      if (workerIds.some((workerId) => !workerId)) throw new Error("A selected worker is missing a valid ID.");
      const body = {
        title: project.name.trim(),
        description: project.description?.trim() || "",
        budget: Number(project.budget) || 0,
        deadline: project.deadline ? new Date(`${project.deadline}T23:59:59.000Z`).toISOString() : undefined,
        workersRequired: [{ skill: service, count: selectedWorkers.length }],
        workerIds,
        location: { type: "Point", coordinates: project.coordinates.map(Number) },
      };

      const data = await apiRequest("/api/projects", { method: "POST", token, body });
      const createdProject = data?.project;
      if (!createdProject?._id) throw new Error("Project was not created. Please try again.");

      if (createdProject.assignedWorkers?.length !== workerIds.length) {
        throw new Error("The project was created, but worker assignment was not completed. Please contact support before retrying.");
      }
      onCreateProject?.(createdProject);
    } catch (e) {
      setError(e.message || "Unable to create and assign the project. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-slate-800">
      <header className="border-b border-amber-100 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><div className="flex items-center gap-3"><img src="/anvaya-logo.png" alt="Anvaya" className="h-12"/><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Contractor</p><p className="font-semibold">Project Details</p></div></div><button type="button" onClick={onBack} className="rounded-xl border border-amber-200 bg-white px-4 py-2.5 font-bold text-slate-600">← Back</button></div></header>
      <section className="mx-auto max-w-6xl px-5 py-10"><div className="mb-8 text-center"><span className="inline-flex rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-700">Final Step</span><h1 className="mt-4 text-4xl font-bold text-slate-900">Review Project</h1><p className="mx-auto mt-3 max-w-2xl text-slate-500">Review your project and selected team before creating it.</p></div>
        <div className="grid gap-7 lg:grid-cols-2"><section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-lg"><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Project</p><h2 className="mt-2 text-2xl font-bold">{project?.name || "Untitled Project"}</h2><div className="mt-6 space-y-4"><div className="rounded-2xl bg-[#FFF8F3] p-4"><p className="text-xs font-bold uppercase text-slate-400">Service</p><p className="mt-1 font-bold">{project?.service || "Not specified"}</p></div><div className="rounded-2xl bg-[#FFF8F3] p-4"><p className="text-xs font-bold uppercase text-slate-400">Location</p><p className="mt-1 font-bold">{project?.location || "Not specified"}</p></div><div className="rounded-2xl bg-[#FFF8F3] p-4"><p className="text-xs font-bold uppercase text-slate-400">Budget</p><p className="mt-1 font-bold">{project?.budget ? `₹${Number(project.budget).toLocaleString("en-IN")}` : "Not specified"}</p></div><div className="rounded-2xl bg-[#FFF8F3] p-4"><p className="text-xs font-bold uppercase text-slate-400">Deadline</p><p className="mt-1 font-bold">{project?.deadline ? new Date(`${project.deadline}T00:00:00`).toLocaleDateString("en-IN") : "Not specified"}</p></div><div className="rounded-2xl bg-[#FFF8F3] p-4"><p className="text-xs font-bold uppercase text-slate-400">Description</p><p className="mt-2 text-sm leading-6 text-slate-600">{project?.description || "No description provided."}</p></div></div></section>
          <section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-lg"><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Selected Workers</p><h2 className="mt-2 text-2xl font-bold">Your Team ({selectedWorkers?.length || 0})</h2><div className="mt-6 space-y-3">{selectedWorkers?.map((worker) => <div key={worker._id || worker.id} className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 font-bold text-amber-700">{worker.name?.charAt(0)?.toUpperCase() || "W"}</div><div><p className="font-bold">{worker.name}</p><p className="text-sm text-amber-600">{Array.isArray(worker.skills) ? worker.skills.join(", ") : worker.skill}</p></div></div>)}</div></section></div>
        {error && <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 font-semibold text-red-700">{error}</div>}
        <section className="mt-8 rounded-3xl border border-amber-100 bg-white p-6 shadow-lg"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-bold">Ready to create?</h2><p className="mt-1 text-sm text-slate-500">The project and every selected worker will be saved to your contractor account.</p></div><button type="button" onClick={() => void handleCreate()} disabled={creating} className="rounded-2xl bg-amber-600 px-8 py-4 font-bold text-white shadow-lg hover:bg-amber-700 disabled:cursor-wait disabled:opacity-60">{creating ? "Creating & assigning…" : "Create Project →"}</button></div></section>
      </section>
    </main>
  );
}

export default ProjectDetails;