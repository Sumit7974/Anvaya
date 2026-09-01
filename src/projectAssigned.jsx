

function ProjectAssigned({ project, selectedWorkers = [], onBack, onContinue }) {
  return (
    <main className="min-h-screen bg-[#FFF8F3] text-slate-800">

      {/* ================= HEADER ================= */}
      <header className="border-b border-amber-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-4">
            <img
              src="/anvaya-logo.png"
              alt="Anvaya"
              className="h-14 w-auto object-contain"
            />

            <div className="hidden border-l border-slate-200 pl-4 sm:block">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700">
                Contractor
              </p>

              <p className="text-sm font-semibold text-slate-700">
                Worker assignment confirmed
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-700 hover:shadow-md"
          >
            ← Back
          </button>

        </div>
      </header>


      {/* ================= MAIN ================= */}
      <section className="flex min-h-[calc(100vh-89px)] items-center justify-center px-6 py-12">

        <div className="w-full max-w-4xl">

          {/* SUCCESS MESSAGE */}
          <div className="text-center">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-5xl text-emerald-600 shadow-sm">
              ✓
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-emerald-600">
              Assignment successful
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Workers assigned successfully!
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              All selected workers have been assigned to your project.
              The work will start soon and you can track the progress
              from the next page.
            </p>

          </div>


          {/* PROJECT SUMMARY */}
          <div className="mt-9 overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-lg">

            <div className="bg-[#FFF1E6] px-6 py-7 sm:px-8">

              <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">
                Project assigned
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {project?.title || project?.name || "Your Project"}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your project requirements and selected workers are now
                connected successfully.
              </p>

            </div>


            {/* WORKERS */}
            <div className="px-6 py-7 sm:px-8">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
                    Assigned workers
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    Your project team
                  </h3>
                </div>

                <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
                  {selectedWorkers.length} assigned
                </span>

              </div>


              {selectedWorkers.length > 0 ? (

                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                  {selectedWorkers.map((worker, index) => (

                    <div
                      key={worker.id || index}
                      className="rounded-2xl border border-slate-100 bg-[#FFF8F3] p-5"
                    >

                      <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                          {worker.icon || "👷"}
                        </div>

                        <div className="min-w-0">

                          <h4 className="truncate font-bold text-slate-900">
                            {worker.name || "Assigned Worker"}
                          </h4>

                          <p className="mt-1 text-sm font-semibold text-amber-700">
                            {worker.skill || worker.role || "Skilled Worker"}
                          </p>

                        </div>

                        <div className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                          ✓
                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              ) : (

                <div className="mt-6 rounded-2xl border border-amber-100 bg-[#FFF8F3] p-6 text-center">

                  <p className="font-semibold text-slate-700">
                    Workers have been assigned to this project.
                  </p>

                </div>

              )}

            </div>


            {/* NEXT STEP */}
            <div className="border-t border-slate-100 px-6 py-6 sm:px-8">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="font-bold text-slate-900">
                    🚀 Ready to start the work?
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Continue to track the project from start to completion.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={onContinue}
                  className="rounded-xl bg-amber-600 px-6 py-3.5 font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-lg"
                >
                  Start Work Process →
                </button>

              </div>

            </div>

          </div>


          {/* INFORMATION CARDS */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg">
                ✓
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                Workers assigned
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Your selected workers are connected to the project.
              </p>

            </div>


            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg">
                🚀
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                Work starts soon
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Workers can begin the assigned project shortly.
              </p>

            </div>


            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg">
                📊
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                Track progress
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Follow the project until all work is completed.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="border-t border-amber-100 bg-white">

        <div className="mx-auto max-w-4xl px-6 py-7 text-center">

          <p className="text-sm text-slate-400">
            Trusted workers. Better connections. Stronger communities.
          </p>

        </div>

      </footer>

    </main>
  );
}

export default ProjectAssigned;