function WorkProcessStarted({ onDashboard }) {
  return (
    <main className="min-h-screen bg-[#FFF8F3] text-slate-800">

      <header className="border-b border-amber-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-5">
          <img
            src="/anvaya-logo.png"
            alt="Anvaya"
            className="h-14 w-auto object-contain"
          />

          <div className="ml-4 hidden border-l border-slate-200 pl-4 sm:block">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
              Contractor
            </p>

            <p className="text-sm font-semibold text-slate-700">
              Work Process
            </p>
          </div>
        </div>
      </header>

      <section className="flex min-h-[calc(100vh-90px)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-5xl text-emerald-600 shadow-sm">
            ✓
          </div>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-emerald-600">
            Work process started
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            Your work process has started successfully!
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
            Your assigned workers can now begin the project. The work is
            currently in progress and should be completed soon.
          </p>

          <div className="mx-auto mt-8 max-w-lg rounded-3xl border border-amber-100 bg-white p-6 text-left shadow-lg">
            <div className="flex gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF1E6] text-xl">
                🚀
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Work is now in progress
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Your project team has been successfully connected.
                  You can track and manage your project from the
                  contractor dashboard.
                </p>
              </div>

            </div>
          </div>

          <button
            type="button"
            onClick={onDashboard}
            className="mt-8 rounded-xl bg-amber-600 px-8 py-3.5 text-sm font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-lg"
          >
            Go to Contractor Dashboard →
          </button>

        </div>
      </section>

      <footer className="border-t border-amber-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-7 text-center">
          <p className="text-sm text-slate-400">
            Trusted workers. Better connections. Stronger communities.
          </p>
        </div>
      </footer>

    </main>
  );
}

export default WorkProcessStarted;