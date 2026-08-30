import { useState } from "react";

function ProjectDetails({ project, selectedWorkers, onBack, onCreateProject }) {
  const [created, setCreated] = useState(false);

  const handleCreate = () => {
    setCreated(true);

    if (onCreateProject) {
      onCreateProject();
    }
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
                Project Details
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-md"
          >
            <span>←</span>
            <span>Back</span>
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

            <div className="h-1 flex-1 rounded-full bg-emerald-500" />

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
              ✓
            </div>

            <div className="h-1 flex-1 rounded-full bg-amber-500" />

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
              3
            </div>
          </div>

          <div className="mt-3 flex justify-between text-xs font-bold">
            <span className="text-emerald-600">Create Project</span>
            <span className="text-emerald-600">Select Workers</span>
            <span className="text-amber-700">Project Details</span>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        {/* TITLE */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-amber-700 shadow-sm">
            <span>📋</span>
            Final Step
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Review Project
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Review your project information and selected workers before
            creating the project.
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {created && (
          <div className="mb-8 rounded-3xl border border-emerald-100 bg-emerald-50 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xl font-bold text-white">
                ✓
              </div>

              <div>
                <h2 className="text-lg font-bold text-emerald-800">
                  Project created successfully!
                </h2>

                <p className="mt-1 text-sm leading-6 text-emerald-700">
                  Your project is now ready with the selected workers.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-7 lg:grid-cols-[1fr_1.15fr]">
          {/* PROJECT CARD */}
          <section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-lg sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                🏗️
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700">
                  Project
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  {project?.name || "Untitled Project"}
                </h2>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <div className="rounded-2xl bg-[#FFF8F3] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                  Service
                </p>

                <p className="mt-1 font-bold text-slate-800">
                  {project?.service || "Not specified"}
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFF8F3] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                  Location
                </p>

                <p className="mt-1 font-bold text-slate-800">
                  {project?.location || "Not specified"}
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFF8F3] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                  Description
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {project?.description || "No description provided."}
                </p>
              </div>
            </div>
          </section>

          {/* WORKERS CARD */}
          <section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-lg sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700">
                  Selected Workers
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Your Team
                </h2>
              </div>

              <div className="flex h-11 min-w-11 items-center justify-center rounded-full bg-amber-100 px-3 text-sm font-bold text-amber-700">
                {selectedWorkers?.length || 0}
              </div>
            </div>

            <div className="mt-7 space-y-4">
              {selectedWorkers && selectedWorkers.length > 0 ? (
                selectedWorkers.map((worker) => (
                  <div
                    key={worker.id}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-[#FFFDFC] p-4 transition-all duration-300 hover:border-amber-200 hover:shadow-sm"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg font-bold text-amber-700">
                      {worker.name?.charAt(0)?.toUpperCase() || "W"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-bold text-slate-900">
                        {worker.name}
                      </h3>

                      <p className="mt-1 text-sm font-semibold text-amber-600">
                        {worker.skill}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        📍 {worker.location}
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      Selected
                    </span>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                  <p className="text-sm font-semibold text-slate-500">
                    No workers selected.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* FINAL ACTION */}
        <section className="mt-8 rounded-3xl border border-amber-100 bg-white p-6 shadow-lg sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Everything looks good?
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Create the project and continue to your contractor dashboard.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCreate}
              disabled={created}
              className={`rounded-2xl px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 ${
                created
                  ? "cursor-not-allowed bg-emerald-500"
                  : "bg-amber-600 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-xl"
              }`}
            >
              {created ? "Project Created ✓" : "Create Project →"}
            </button>
          </div>
        </section>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-amber-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 text-center">
          <p className="text-sm text-slate-400">
            Trusted workers. Better connections. Stronger communities.
          </p>
        </div>
      </footer>
    </main>
  );
}

export default ProjectDetails;