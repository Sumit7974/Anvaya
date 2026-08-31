import { useMemo, useState } from "react";
import { contractorWorkers } from "./contractorData";

function WorkerSelection({ project, onBack, onNext }) {
  const [search, setSearch] = useState("");
  const [selectedWorkers, setSelectedWorkers] = useState([]);

  const filteredWorkers = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return contractorWorkers;
    }

    return contractorWorkers.filter((worker) => {
      return (
        worker.name.toLowerCase().includes(query) ||
        worker.skill.toLowerCase().includes(query) ||
        worker.location.toLowerCase().includes(query)
      );
    });
  }, [search]);

  const toggleWorker = (worker) => {
    setSelectedWorkers((previous) => {
      const alreadySelected = previous.some(
        (item) => item.id === worker.id
      );

      if (alreadySelected) {
        return previous.filter((item) => item.id !== worker.id);
      }

      return [...previous, worker];
    });
  };

  const handleContinue = () => {
    if (selectedWorkers.length === 0) {
      return;
    }

    onNext(selectedWorkers);
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-slate-800">
      {/* HEADER */}
      <header className="border-b border-amber-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <img
              src="/anvaya-logo.png"
              alt="Anvaya"
              className="h-12 w-auto object-contain"
            />

            <div className="hidden border-l border-slate-200 pl-4 sm:block">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                Contractor
              </p>

              <p className="text-sm font-semibold text-slate-700">
                Find & assign workers
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-md"
          >
            <span>←</span>
            Back
          </button>
        </div>
      </header>

      {/* PROGRESS */}
      <section className="border-b border-amber-100 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
              ✓
            </div>

            <div className="h-1 flex-1 rounded-full bg-amber-600" />

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">
              2
            </div>

            <div className="h-1 flex-1 rounded-full bg-amber-200" />

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-400">
              3
            </div>
          </div>

          <div className="mt-3 flex justify-between text-xs font-bold">
            <span className="text-emerald-600">Project</span>
            <span className="text-amber-700">Workers</span>
            <span className="text-slate-400">Review</span>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        {/* TITLE */}
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-amber-700 shadow-sm">
            <span>👷</span>
            Step 2 of 3
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Find the right workers
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Search available workers and select one or multiple professionals
            for your project.
          </p>
        </div>

        {/* PROJECT SUMMARY */}
        <section className="mb-8 rounded-3xl border border-amber-100 bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">
                Current Project
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {project?.name || "New Project"}
              </h2>

              <div className="mt-3 flex flex-wrap gap-2">
                {project?.service && (
                  <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
                    🔧 {project.service}
                  </span>
                )}

                {project?.location && (
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                    📍 {project.location}
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-2xl bg-amber-50 px-5 py-4 text-center">
              <p className="text-2xl font-bold text-amber-700">
                {selectedWorkers.length}
              </p>

              <p className="text-xs font-bold text-amber-600">
                Workers selected
              </p>
            </div>
          </div>
        </section>

        {/* SEARCH */}
        <div className="mb-7 rounded-3xl border border-amber-100 bg-white p-5 shadow-lg">
          <label
            htmlFor="worker-search"
            className="text-sm font-bold text-slate-800"
          >
            Search workers
          </label>

          <div className="relative mt-3">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
              🔍
            </span>

            <input
              id="worker-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, skill or location..."
              className="w-full rounded-2xl border border-slate-200 bg-[#FFFDFC] py-4 pl-11 pr-4 text-sm text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
            />
          </div>
        </div>

        {/* WORKERS */}
        {filteredWorkers.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-amber-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl">
              🔍
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No workers found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try searching with a different name, skill or location.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredWorkers.map((worker) => {
              const selected = selectedWorkers.some(
                (item) => item.id === worker.id
              );

              return (
                <button
                  key={worker.id}
                  type="button"
                  onClick={() => toggleWorker(worker)}
                  className={`group relative overflow-hidden rounded-3xl border bg-white p-6 text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    selected
                      ? "border-amber-500 ring-4 ring-amber-100"
                      : "border-slate-100 hover:border-amber-200"
                  }`}
                >
                  {/* SELECTED BADGE */}
                  {selected && (
                    <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white shadow-md">
                      ✓
                    </div>
                  )}

                  {/* PROFILE */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-2xl font-bold text-amber-700">
                      {worker.name?.charAt(0)?.toUpperCase() || "W"}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate pr-8 text-lg font-bold text-slate-900">
                        {worker.name}
                      </h2>

                      <p className="mt-1 text-sm font-semibold text-amber-600">
                        {worker.skill}
                      </p>
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span>📍</span>
                      <span>{worker.location}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span>⭐</span>
                      <span>
                        {worker.rating || "4.8"} rating
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span>🛠️</span>
                      <span>
                        {worker.experience || "5"} years experience
                      </span>
                    </div>
                  </div>

                  {/* AVAILABILITY */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                        worker.available !== false
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {worker.available !== false
                        ? "● Available"
                        : "● Unavailable"}
                    </span>

                    <span
                      className={`text-sm font-bold transition ${
                        selected
                          ? "text-amber-700"
                          : "text-slate-400 group-hover:text-amber-600"
                      }`}
                    >
                      {selected ? "Selected" : "Select"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* BOTTOM ACTIONS */}
        <div className="mt-10 flex flex-col gap-3 rounded-3xl border border-amber-100 bg-white p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-800">
              {selectedWorkers.length === 0
                ? "Select workers to continue"
                : `${selectedWorkers.length} worker${
                    selectedWorkers.length > 1 ? "s" : ""
                  } selected`}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              You can assign multiple workers to this project.
            </p>
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={selectedWorkers.length === 0}
            className="group flex items-center justify-center gap-3 rounded-xl bg-amber-600 px-7 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            Continue to Review

            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-amber-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-6 text-center">
          <p className="text-sm text-slate-400">
            Trusted workers. Better connections. Stronger communities.
          </p>
        </div>
      </footer>
    </main>
  );
}

export default WorkerSelection;