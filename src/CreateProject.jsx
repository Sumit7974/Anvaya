import { useState } from "react";
import { contractorServices } from "./contractorData";

function CreateProject({ onBack, onNext }) {
  const [project, setProject] = useState({ name: "", service: "", location: "", description: "", budget: "", deadline: "" });
  const [error, setError] = useState("");
  const [locating, setLocating] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProject((previous) => ({ ...previous, [name]: value }));
    setError("");
  };

  const getCoordinates = () => new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Location services are not supported by this browser."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve([coords.longitude, coords.latitude]),
      () => reject(new Error("Please allow location access so Anvaya can find workers near the project.")),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!project.name.trim() || !project.service || !project.location.trim()) {
      setError("Please fill Project Name, Required Service and Project Location.");
      return;
    }
    if (project.budget && Number(project.budget) < 0) {
      setError("Budget cannot be negative.");
      return;
    }
    if (project.deadline && new Date(`${project.deadline}T23:59:59`) < new Date()) {
      setError("Expected completion date must be in the future.");
      return;
    }

    setLocating(true);
    setError("");
    try {
      const coordinates = await getCoordinates();
      onNext({
        ...project,
        name: project.name.trim(),
        location: project.location.trim(),
        description: project.description.trim(),
        budget: project.budget ? Number(project.budget) : 0,
        coordinates,
      });
    } catch (e) {
      setError(e.message || "Unable to determine the project location.");
    } finally {
      setLocating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-slate-800">
      <header className="border-b border-amber-100 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"><div className="flex items-center gap-3"><img src="/anvaya-logo.png" alt="Anvaya" className="h-12 w-auto object-contain"/><div className="hidden border-l border-slate-200 pl-4 sm:block"><p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Contractor</p><p className="text-sm font-semibold text-slate-700">Create a new project</p></div></div><button type="button" onClick={onBack} className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm hover:border-amber-300 hover:text-amber-700">← Back</button></div></header>
      <section className="border-b border-amber-100 bg-white"><div className="mx-auto max-w-4xl px-5 py-5 sm:px-8"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">1</div><div className="h-1 flex-1 rounded-full bg-amber-200"/><div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-400">2</div><div className="h-1 flex-1 rounded-full bg-slate-100"/><div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-400">3</div></div><div className="mt-3 flex justify-between text-xs font-bold"><span className="text-amber-700">Project</span><span className="text-slate-400">Workers</span><span className="text-slate-400">Review</span></div></div></section>
      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14"><div className="mb-8"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-amber-700 shadow-sm">📋 Step 1 of 3</div><h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Create your project</h1><p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">Tell us about the work you need. We'll help you find the right workers for the project.</p></div>
        <form onSubmit={(event) => void handleSubmit(event)} className="rounded-3xl border border-amber-100 bg-white p-6 shadow-xl sm:p-8">
          <div><label htmlFor="name" className="text-sm font-bold text-slate-800">Project Name <span className="text-red-500">*</span></label><input id="name" name="name" value={project.name} onChange={handleChange} placeholder="Example: House Electrical Installation" className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm outline-none hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"/></div>
          <div className="mt-6"><label htmlFor="service" className="text-sm font-bold text-slate-800">Required Service <span className="text-red-500">*</span></label><select id="service" name="service" value={project.service} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm outline-none hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"><option value="">Select a service</option>{contractorServices.map((service) => <option key={service.id} value={service.name}>{service.name}</option>)}</select></div>
          <div className="mt-6"><label htmlFor="location" className="text-sm font-bold text-slate-800">Project Location <span className="text-red-500">*</span></label><div className="relative"><span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">📍</span><input id="location" name="location" value={project.location} onChange={handleChange} placeholder="Example: City Center, Gwalior" className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#FFFDFC] py-3.5 pl-11 pr-4 text-sm outline-none hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"/></div><p className="mt-2 text-xs text-slate-400">We'll use your browser location to find nearby verified workers; this text is saved as the project address.</p></div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2"><div><label htmlFor="budget" className="text-sm font-bold text-slate-800">Estimated Budget</label><div className="relative"><span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">₹</span><input id="budget" name="budget" type="number" min="0" value={project.budget} onChange={handleChange} placeholder="50000" className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#FFFDFC] py-3.5 pl-9 pr-4 text-sm outline-none hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"/></div></div><div><label htmlFor="deadline" className="text-sm font-bold text-slate-800">Expected Completion</label><input id="deadline" name="deadline" type="date" min={new Date().toISOString().slice(0, 10)} value={project.deadline} onChange={handleChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm outline-none hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"/></div></div>
          <div className="mt-6"><label htmlFor="description" className="text-sm font-bold text-slate-800">Project Description</label><textarea id="description" name="description" value={project.description} onChange={handleChange} rows={6} placeholder="Describe the work, requirements, materials, number of rooms, etc." className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-[#FFFDFC] px-4 py-4 text-sm leading-7 outline-none hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"/></div>
          {error && <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</div>}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between"><button type="button" onClick={onBack} className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-600 hover:bg-slate-50">Cancel</button><button type="submit" disabled={locating} className="group flex items-center justify-center gap-3 rounded-xl bg-amber-600 px-7 py-3.5 font-bold text-white shadow-lg hover:bg-amber-700 disabled:cursor-wait disabled:opacity-60">{locating ? "Getting project location…" : "Continue to Workers"}<span className="text-lg">→</span></button></div>
        </form>
      </section>
      <footer className="border-t border-amber-100 bg-white"><div className="mx-auto max-w-7xl px-5 py-6 text-center"><p className="text-sm text-slate-400">Trusted workers. Better connections. Stronger communities.</p></div></footer>
    </main>
  );
}

export default CreateProject;