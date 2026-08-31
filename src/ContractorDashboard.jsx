import { useState } from "react";

function ContractorDashboard({ onBack, onCreateProject }) {
  const [projects] = useState([
    {
      id: 201,
      name: "Residential House Construction",
      service: "Construction",
      location: "Thatipur, Gwalior",
      description:
        "Complete construction work for a two-floor residential house including civil work, electrical setup and plumbing.",
      budget: 850000,
      deadline: "30 Nov 2026",
      status: "Active",
      workers: 8,
      progress: 65,
    },
    {
      id: 202,
      name: "Commercial Electrical Work",
      service: "Electrical",
      location: "City Center, Gwalior",
      description:
        "Electrical wiring, lighting installation and complete electrical setup for a commercial building.",
      budget: 175000,
      deadline: "25 Sep 2026",
      status: "Pending",
      workers: 3,
      progress: 20,
    },
    {
      id: 203,
      name: "House Renovation Project",
      service: "Renovation",
      location: "Morar, Gwalior",
      description:
        "Renovation of an existing residential property including painting, flooring and kitchen improvements.",
      budget: 240000,
      deadline: "15 Oct 2026",
      status: "Completed",
      workers: 6,
      progress: 100,
    },
  ]);

  const [selectedProject, setSelectedProject] = useState(projects[0]);

  const formatBudget = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  const activeProjects = projects.filter(
    (project) => project.status === "Active"
  );

  const pendingProjects = projects.filter(
    (project) => project.status === "Pending"
  );

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  );

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-slate-800">

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-amber-100 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <div className="flex items-center gap-4">
            <img
              src="/anvaya-logo.png"
              alt="Anvaya"
              className="h-12 w-auto object-contain"
            />

            <div className="hidden border-l border-slate-200 pl-4 sm:block">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                Contractor Dashboard
              </p>

              <p className="text-sm font-semibold text-slate-700">
                Build projects. Build teams. Build better.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-md"
          >
            ← Back
          </button>

        </div>
      </header>


      {/* HERO */}
      <section className="border-b border-amber-100 bg-[#FFF1E6]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700 shadow-sm">
                🏗️ Contractor workspace
              </div>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Welcome back,
                <span className="text-amber-600">
                  {" "}Contractor!
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Manage your projects, discover skilled workers and
                keep your construction work organized from one place.
              </p>

            </div>


            {/* CREATE PROJECT */}
            <button
              type="button"
              onClick={onCreateProject}
              className="group flex items-center justify-center gap-3 rounded-2xl bg-amber-600 px-7 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-2xl"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-xl">
                +
              </span>

              <span>Create New Project</span>

              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

          </div>

        </div>
      </section>


      {/* CONTRACTOR PROFILE */}
      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">

        <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-lg sm:p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FFF1E6] text-4xl">
                🏗️
              </div>

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                  Contractor profile
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Sharma Construction
                </h2>

                <p className="mt-1 font-semibold text-amber-700">
                  Construction & Renovation
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  📍 Gwalior, Madhya Pradesh
                </p>

              </div>

            </div>


            <div className="flex flex-wrap gap-3">

              <div className="rounded-2xl bg-[#FFF8F3] px-5 py-3 text-center">
                <p className="text-xl font-bold text-slate-900">
                  4.9
                </p>
                <p className="text-xs text-slate-500">
                  Rating
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFF8F3] px-5 py-3 text-center">
                <p className="text-xl font-bold text-slate-900">
                  8+
                </p>
                <p className="text-xs text-slate-500">
                  Years
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFF8F3] px-5 py-3 text-center">
                <p className="text-xl font-bold text-slate-900">
                  56
                </p>
                <p className="text-xs text-slate-500">
                  Projects
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* STATS */}
      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Projects
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {projects.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-2xl">
                📋
              </div>
            </div>
          </div>


          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Active Projects
                </p>

                <p className="mt-2 text-3xl font-bold text-blue-600">
                  {activeProjects.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                🔨
              </div>
            </div>
          </div>


          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending Requests
                </p>

                <p className="mt-2 text-3xl font-bold text-orange-600">
                  {pendingProjects.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl">
                🔔
              </div>
            </div>
          </div>


          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Completed
                </p>

                <p className="mt-2 text-3xl font-bold text-emerald-600">
                  {completedProjects.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                ✓
              </div>
            </div>
          </div>

        </div>

      </section>


      {/* PROJECT WORKSPACE */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        <div className="grid gap-7 lg:grid-cols-[0.85fr_1.5fr]">


          {/* PROJECT LIST */}
          <aside className="rounded-3xl border border-amber-100 bg-white p-5 shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                  Your projects
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Project Requests
                </h2>
              </div>

              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                {projects.length}
              </span>

            </div>


            <div className="mt-5 space-y-3">

              {projects.map((project) => (

                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                    selectedProject?.id === project.id
                      ? "border-amber-300 bg-amber-50 shadow-md"
                      : "border-slate-100 bg-slate-50 hover:border-amber-200 hover:bg-white hover:shadow-sm"
                  }`}
                >

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <p className="text-xs font-bold text-amber-700">
                        PRJ-{project.id}
                      </p>

                      <h3 className="mt-1 font-bold text-slate-900">
                        {project.name}
                      </h3>

                    </div>

                    <span className="text-xl">
                      {project.service === "Electrical"
                        ? "⚡"
                        : project.service === "Renovation"
                        ? "🏠"
                        : "🏗️"}
                    </span>

                  </div>


                  <p className="mt-2 text-xs text-slate-500">
                    📍 {project.location}
                  </p>


                  <div className="mt-3 flex items-center justify-between">

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        project.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : project.status === "Active"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {project.status}
                    </span>

                    <span className="text-xs font-bold text-slate-500">
                      {formatBudget(project.budget)}
                    </span>

                  </div>

                </button>

              ))}

            </div>


            <button
              type="button"
              onClick={onCreateProject}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-amber-300 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-700 transition hover:bg-amber-100"
            >
              <span className="text-lg">+</span>
              Create another project
            </button>

          </aside>


          {/* PROJECT DETAILS */}
          <section className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-lg">

            {selectedProject && (
              <>

                {/* PROJECT HEADER */}
                <div className="bg-slate-900 px-6 py-7 text-white sm:px-8">

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                    <div>

                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
                        PRJ-{selectedProject.id}
                      </p>

                      <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                        {selectedProject.name}
                      </h2>

                      <p className="mt-2 text-sm text-slate-300">
                        📍 {selectedProject.location}
                      </p>

                    </div>

                    <span
                      className={`w-fit rounded-full px-4 py-2 text-xs font-bold ${
                        selectedProject.status === "Active"
                          ? "bg-blue-500/20 text-blue-200"
                          : selectedProject.status === "Completed"
                          ? "bg-emerald-500/20 text-emerald-200"
                          : "bg-orange-500/20 text-orange-200"
                      }`}
                    >
                      ● {selectedProject.status}
                    </span>

                  </div>

                </div>


                {/* DETAILS */}
                <div className="p-6 sm:p-8">


                  {/* INFO CARDS */}
                  <div className="grid gap-4 sm:grid-cols-3">

                    <div className="rounded-2xl bg-[#FFF8F3] p-4">

                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Project Budget
                      </p>

                      <p className="mt-2 text-xl font-bold text-emerald-600">
                        {formatBudget(selectedProject.budget)}
                      </p>

                    </div>


                    <div className="rounded-2xl bg-[#FFF8F3] p-4">

                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Deadline
                      </p>

                      <p className="mt-2 font-bold text-slate-800">
                        📅 {selectedProject.deadline}
                      </p>

                    </div>


                    <div className="rounded-2xl bg-[#FFF8F3] p-4">

                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Workers
                      </p>

                      <p className="mt-2 font-bold text-amber-600">
                        👷 {selectedProject.workers} Workers
                      </p>

                    </div>

                  </div>


                  {/* PROGRESS */}
                  <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-5">

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          Project Progress
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Overall project completion
                        </p>
                      </div>

                      <span className="text-lg font-bold text-amber-600">
                        {selectedProject.progress}%
                      </span>

                    </div>


                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">

                      <div
                        className="h-full rounded-full bg-amber-500 transition-all duration-500"
                        style={{
                          width: `${selectedProject.progress}%`,
                        }}
                      />

                    </div>

                  </div>


                  {/* PROJECT TYPE */}
                  <div className="mt-6 rounded-2xl border border-amber-100 bg-[#FFFDFC] p-5">

                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      Project Type
                    </p>

                    <div className="mt-3 flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF1E6] text-xl">
                        {selectedProject.service === "Electrical"
                          ? "⚡"
                          : selectedProject.service === "Renovation"
                          ? "🏠"
                          : "🏗️"}
                      </div>

                      <div>

                        <p className="font-bold text-slate-900">
                          {selectedProject.service}
                        </p>

                        <p className="text-sm text-slate-500">
                          Primary project service
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* DESCRIPTION */}
                  <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-5">

                    <p className="text-sm font-bold text-slate-700">
                      Project Description
                    </p>

                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      {selectedProject.description}
                    </p>

                  </div>


                  {/* PROJECT TEAM */}
                  <div className="mt-6 rounded-2xl border border-amber-100 bg-white p-5">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-sm font-bold text-slate-800">
                          Project Team
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Skilled workers assigned to this project
                        </p>

                      </div>

                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                        {selectedProject.workers} members
                      </span>

                    </div>


                    <div className="mt-5 flex flex-wrap gap-3">

                      <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                        <span className="text-lg">👷</span>
                        <span className="text-sm font-semibold text-slate-700">
                          Electrician
                        </span>
                      </div>

                      <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                        <span className="text-lg">🔧</span>
                        <span className="text-sm font-semibold text-slate-700">
                          Plumber
                        </span>
                      </div>

                      <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                        <span className="text-lg">🧱</span>
                        <span className="text-sm font-semibold text-slate-700">
                          Mason
                        </span>
                      </div>

                      <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                        <span className="text-lg">🎨</span>
                        <span className="text-sm font-semibold text-slate-700">
                          Painter
                        </span>
                      </div>

                    </div>

                  </div>


                  {/* ACTION BUTTONS */}
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                    <button
                      type="button"
                      onClick={onCreateProject}
                      className="flex-1 rounded-xl bg-amber-600 px-6 py-3.5 font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-lg"
                    >
                      + Create New Project
                    </button>

                    <button
                      type="button"
                      className="flex-1 rounded-xl border border-amber-200 bg-white px-6 py-3.5 font-bold text-amber-700 transition hover:bg-amber-50"
                    >
                      👷 Manage Workers
                    </button>

                  </div>

                </div>

              </>
            )}

          </section>

        </div>

      </section>


      {/* QUICK ACTIONS */}
      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">

        <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-lg sm:p-8">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
              Quick actions
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Manage your workspace
            </h2>

          </div>


          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <button
              type="button"
              onClick={onCreateProject}
              className="group rounded-2xl border border-amber-100 bg-[#FFF8F3] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-2xl">
                +
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                Create Project
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Start a new project and find suitable workers.
              </p>

            </button>


            <button
              type="button"
              className="group rounded-2xl border border-blue-100 bg-blue-50/40 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                👷
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                Find Workers
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Discover skilled workers for your upcoming projects.
              </p>

            </button>


            <button
              type="button"
              className="group rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
                📊
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                Project Overview
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Track your projects, budgets and completion progress.
              </p>

            </button>

          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-amber-100 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-8 text-center">

          <p className="text-sm text-slate-400">
            Anvaya — Trusted workers. Better connections.
            Stronger communities.
          </p>

        </div>

      </footer>

    </main>
  );
}

export default ContractorDashboard;