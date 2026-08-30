import { useState } from "react";

function WorkerDashboard({ onBack }) {
  const [jobStatus, setJobStatus] = useState("new");
  const [showDetails, setShowDetails] = useState(false);

  const job = {
    id: "ANV-1042",
    customer: "Priya Sharma",
    service: "Ceiling Fan Installation",
    location: "City Centre, Gwalior",
    distance: "2.4 km away",
    payment: "₹650",
    requested: "10 minutes ago",
    phone: "+91 98XXXXXX42",
    description:
      "Need installation of two ceiling fans. Electrical points are already available.",
  };

  const statusSteps = [
    { key: "new", label: "New Request", icon: "🔔" },
    { key: "accepted", label: "Accepted", icon: "✓" },
    { key: "started", label: "Work Started", icon: "🔧" },
    { key: "completed", label: "Completed", icon: "🎉" },
  ];

  const currentIndex = statusSteps.findIndex(
    (step) => step.key === jobStatus
  );

  const handleAccept = () => {
    setJobStatus("accepted");
  };

  const handleStart = () => {
    setJobStatus("started");
  };

  const handleComplete = () => {
    setJobStatus("completed");
  };

  const getStatusText = () => {
    if (jobStatus === "new") return "New job request";
    if (jobStatus === "accepted") return "Job accepted";
    if (jobStatus === "started") return "Work in progress";
    return "Job completed";
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-slate-800">

      {/* HEADER */}

      <header className="border-b border-amber-100 bg-white shadow-sm">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <div className="flex items-center gap-4">

            <img
              src="/anvaya-logo.png"
              alt="Anvaya"
              className="h-12 w-auto object-contain"
            />

            <div className="hidden border-l border-slate-200 pl-4 sm:block">

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                Worker Dashboard
              </p>

              <p className="text-sm font-semibold text-slate-700">
                Manage your work with Anvaya
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="hidden rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 sm:block">
              ● Available for work
            </div>

            <button
              onClick={onBack}
              className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-md"
            >
              <span>←</span>
              <span>Back</span>
            </button>

          </div>

        </div>

      </header>


      {/* HERO */}

      <section className="border-b border-amber-100 bg-[#FFF1E6]">

        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">
                Good to see you 👋
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                Your work dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                View new work requests, manage active jobs and keep track of
                your completed work.
              </p>

            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white px-6 py-5 shadow-md">

              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Today's status
              </p>

              <div className="mt-2 flex items-center gap-2">

                <span className="h-3 w-3 rounded-full bg-emerald-500" />

                <span className="font-bold text-emerald-700">
                  {getStatusText()}
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* STATS */}

      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            <p className="text-sm font-medium text-slate-500">
              New requests
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {jobStatus === "new" ? "1" : "0"}
            </p>

          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            <p className="text-sm font-medium text-slate-500">
              Active jobs
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {jobStatus === "started" ? "1" : "0"}
            </p>

          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            <p className="text-sm font-medium text-slate-500">
              Completed today
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {jobStatus === "completed" ? "1" : "0"}
            </p>

          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            <p className="text-sm font-medium text-slate-500">
              Today's earnings
            </p>

            <p className="mt-2 text-3xl font-bold text-orange-600">
              {jobStatus === "completed" ? job.payment : "₹0"}
            </p>

          </div>

        </div>

      </section>


      {/* MAIN DASHBOARD */}

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        <div className="grid gap-7 lg:grid-cols-[1.4fr_0.8fr]">


          {/* JOB REQUEST */}

          <section className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-lg">

            <div className="border-b border-amber-100 bg-[#FFFDF9] px-6 py-6 sm:px-8">

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>

                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                    Current job
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    {job.service}
                  </h2>

                </div>

                <span
                  className={`w-fit rounded-full px-4 py-2 text-xs font-bold ${
                    jobStatus === "completed"
                      ? "bg-emerald-50 text-emerald-700"
                      : jobStatus === "started"
                      ? "bg-blue-50 text-blue-700"
                      : jobStatus === "accepted"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-orange-50 text-orange-700"
                  }`}
                >
                  ● {getStatusText()}
                </span>

              </div>

            </div>


            <div className="p-6 sm:p-8">

              {/* CUSTOMER */}

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-2xl">
                  👩
                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Customer
                  </p>

                  <h3 className="font-bold text-slate-900">
                    {job.customer}
                  </h3>

                </div>

              </div>


              {/* JOB DETAILS */}

              <div className="mt-7 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-[#FFF8F3] p-4">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Location
                  </p>

                  <p className="mt-2 font-semibold text-slate-800">
                    📍 {job.location}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {job.distance}
                  </p>

                </div>

                <div className="rounded-2xl bg-[#FFF8F3] p-4">

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Payment
                  </p>

                  <p className="mt-2 text-xl font-bold text-emerald-600">
                    {job.payment}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Agreed service amount
                  </p>

                </div>

              </div>


              {/* DESCRIPTION */}

              <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-5">

                <p className="text-sm font-bold text-slate-700">
                  Customer requirement
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {job.description}
                </p>

              </div>


              {/* MORE DETAILS */}

              <button
                onClick={() => setShowDetails(!showDetails)}
                className="mt-5 text-sm font-bold text-amber-700 transition hover:text-amber-800"
              >
                {showDetails ? "Hide details ↑" : "View customer details ↓"}
              </button>


              {showDetails && (

                <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50/50 p-5">

                  <p className="text-sm text-slate-500">
                    Customer phone
                  </p>

                  <p className="mt-1 font-bold text-slate-800">
                    📞 {job.phone}
                  </p>

                  <p className="mt-4 text-sm text-slate-500">
                    Request received
                  </p>

                  <p className="mt-1 font-bold text-slate-800">
                    {job.requested}
                  </p>

                </div>

              )}


              {/* ACTIONS */}

              <div className="mt-7">

                {jobStatus === "new" && (

                  <div className="grid gap-3 sm:grid-cols-2">

                    <button
                      onClick={handleAccept}
                      className="rounded-xl bg-emerald-600 px-5 py-4 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-xl"
                    >
                      ✓ Accept Job
                    </button>

                    <button
                      onClick={() =>
                        alert("This demo does not reject the request.")
                      }
                      className="rounded-xl border border-slate-200 bg-white px-5 py-4 font-bold text-slate-600 transition duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      Decline
                    </button>

                  </div>

                )}


                {jobStatus === "accepted" && (

                  <button
                    onClick={handleStart}
                    className="w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
                  >
                    🔧 Start Work
                  </button>

                )}


                {jobStatus === "started" && (

                  <button
                    onClick={handleComplete}
                    className="w-full rounded-xl bg-emerald-600 px-5 py-4 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-xl"
                  >
                    ✓ Mark Work as Completed
                  </button>

                )}


                {jobStatus === "completed" && (

                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-center">

                    <div className="text-4xl">
                      🎉
                    </div>

                    <h3 className="mt-3 text-xl font-bold text-emerald-800">
                      Job completed successfully!
                    </h3>

                    <p className="mt-2 text-sm text-emerald-700">
                      ₹650 has been added to today's earnings.
                    </p>

                  </div>

                )}

              </div>

            </div>

          </section>


          {/* RIGHT SIDE */}

          <aside className="space-y-6">


            {/* JOB PROGRESS */}

            <section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-lg">

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                Job progress
              </p>

              <h2 className="mt-2 text-xl font-bold text-slate-900">
                Track your job
              </h2>

              <div className="mt-7 space-y-5">

                {statusSteps.map((step, index) => {

                  const completed = index <= currentIndex;

                  return (
                    <div
                      key={step.key}
                      className="flex items-start gap-4"
                    >

                      <div className="flex flex-col items-center">

                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                            completed
                              ? "bg-amber-600 text-white shadow-md"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {completed ? "✓" : step.icon}
                        </div>

                        {index < statusSteps.length - 1 && (
                          <div
                            className={`mt-2 h-7 w-0.5 ${
                              index < currentIndex
                                ? "bg-amber-400"
                                : "bg-slate-200"
                            }`}
                          />
                        )}

                      </div>

                      <div className="pt-2">

                        <p
                          className={`text-sm font-bold ${
                            completed
                              ? "text-slate-800"
                              : "text-slate-400"
                          }`}
                        >
                          {step.label}
                        </p>

                        {step.key === jobStatus && (
                          <p className="mt-1 text-xs text-amber-600">
                            Current status
                          </p>
                        )}

                      </div>

                    </div>
                  );
                })}

              </div>

            </section>


            {/* QUICK INFO */}

            <section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                💡
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-900">
                Worker tip
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Keep your customer updated throughout the job. Clear
                communication helps build trust and better ratings.
              </p>

            </section>


            {/* AVAILABILITY */}

            <section className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-bold text-slate-800">
                    Availability
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Customers can find you
                  </p>

                </div>

                <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  ON
                </span>

              </div>

            </section>

          </aside>

        </div>

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

export default WorkerDashboard;