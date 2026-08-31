import { useState } from "react";

function WorkerProcess({ worker, onBack, onProceedToPayment }) {
  const [status, setStatus] = useState("Requested");

  const statusSteps = [
    "Requested",
    "Accepted",
    "In Progress",
    "Completed",
  ];

  const currentStep = statusSteps.indexOf(status);

  const updateStatus = () => {
    const nextStatus = {
      Requested: "Accepted",
      Accepted: "In Progress",
      "In Progress": "Completed",
    };

    const next = nextStatus[status];

    if (next) {
      setStatus(next);
    }
  };

  const suggestedWorkers = [
    {
      id: 2,
      name: "Amit Sharma",
      skill: "Plumber",
      rating: "4.8",
      experience: "5 years",
      distance: "3.1 km",
      icon: "🔧",
    },
    {
      id: 3,
      name: "Vikas Patel",
      skill: "Carpenter",
      rating: "4.9",
      experience: "8 years",
      distance: "4.2 km",
      icon: "🪚",
    },
    {
      id: 4,
      name: "Rohit Singh",
      skill: "Painter",
      rating: "4.7",
      experience: "4 years",
      distance: "5.0 km",
      icon: "🎨",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-slate-800">

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
                Your booking
              </p>

              <p className="text-sm font-semibold text-slate-700">
                Track your worker's progress
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

      <section className="mx-auto max-w-6xl px-6 py-10 sm:py-14">

        <div className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-lg">

          <div className="bg-[#FFF1E6] px-6 py-8 sm:px-8">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-5">

                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm">
                  {worker?.icon || "👷"}
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700">
                    Selected worker
                  </p>

                  <h1 className="mt-1 text-2xl font-bold text-slate-900">
                    {worker?.name || "Selected Worker"}
                  </h1>

                  <p className="mt-1 font-semibold text-amber-700">
                    {worker?.skill || "Professional Worker"}
                  </p>

                </div>

              </div>

              <div className="w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm">
                ● {status}
              </div>

            </div>

          </div>

          <div className="grid gap-4 border-b border-slate-100 px-6 py-6 sm:grid-cols-3 sm:px-8">

            <div className="rounded-2xl bg-[#FFF8F3] p-4">

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Rating
              </p>

              <p className="mt-1 font-bold text-slate-900">
                ⭐ {worker?.rating || "4.8"}
              </p>

            </div>

            <div className="rounded-2xl bg-[#FFF8F3] p-4">

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Experience
              </p>

              <p className="mt-1 font-bold text-slate-900">
                💼 {worker?.experience || "5 years"}
              </p>

            </div>

            <div className="rounded-2xl bg-[#FFF8F3] p-4">

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Location
              </p>

              <p className="mt-1 font-bold text-slate-900">
                📍 {worker?.distance || "Nearby"}
              </p>

            </div>

          </div>

          <div className="px-6 py-8 sm:px-8">

            <div>

              <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
                Work progress
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Your service is on the way
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Follow each step of your booking until the work is completed.
              </p>

            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-4">

              {statusSteps.map((step, index) => {

                const completed = index <= currentStep;
                const active = index === currentStep;

                return (
                  <div
                    key={step}
                    className={`rounded-2xl border p-4 transition duration-300 ${
                      active
                        ? "border-amber-300 bg-amber-50 shadow-sm"
                        : completed
                        ? "border-emerald-100 bg-emerald-50/50"
                        : "border-slate-100 bg-slate-50"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          completed
                            ? "bg-amber-600 text-white"
                            : "bg-white text-slate-400"
                        }`}
                      >
                        {completed ? "✓" : index + 1}
                      </div>

                      <div>

                        <p
                          className={`text-sm font-bold ${
                            active
                              ? "text-amber-700"
                              : completed
                              ? "text-slate-800"
                              : "text-slate-400"
                          }`}
                        >
                          {step}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {index === 0 && "Request sent"}
                          {index === 1 && "Worker accepted"}
                          {index === 2 && "Work started"}
                          {index === 3 && "Service completed"}
                        </p>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

            <div className="mt-8 rounded-2xl border border-amber-100 bg-[#FFF8F3] p-5">

              {status !== "Completed" ? (

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="font-bold text-slate-900">

                      {status === "Requested" &&
                        "Waiting for worker confirmation"}

                      {status === "Accepted" &&
                        "Worker is ready to start"}

                      {status === "In Progress" &&
                        "Your work is currently in progress"}

                    </p>

                    <p className="mt-1 text-sm text-slate-500">

                      {status === "Requested" &&
                        "Your request has been sent successfully."}

                      {status === "Accepted" &&
                        "The worker has accepted your service request."}

                      {status === "In Progress" &&
                        "Please wait while the worker completes your service."}

                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={updateStatus}
                    className="rounded-xl bg-amber-600 px-6 py-3 font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-lg"
                  >
                    {status === "Requested" && "Worker Accepted →"}
                    {status === "Accepted" && "Start Work →"}
                    {status === "In Progress" && "Complete Work ✓"}
                  </button>

                </div>

              ) : (

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="font-bold text-emerald-700">
                      ✓ Work completed successfully
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Your service has been completed. You can now proceed
                      securely to payment.
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onProceedToPayment) {
                        onProceedToPayment();
                      }
                    }}
                    className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg"
                  >
                    Proceed to Payment →
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

        <div className="mt-12">

          <div className="mb-6">

            <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
              More professionals
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Workers you may also like
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Explore other trusted professionals available nearby.
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-3">

            {suggestedWorkers.map((suggestedWorker) => (

              <div
                key={suggestedWorker.id}
                className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FFF1E6] text-2xl">
                    {suggestedWorker.icon}
                  </div>

                  <div>

                    <h3 className="font-bold text-slate-900">
                      {suggestedWorker.name}
                    </h3>

                    <p className="text-sm font-semibold text-amber-700">
                      {suggestedWorker.skill}
                    </p>

                  </div>

                </div>

                <div className="mt-5 space-y-2 text-sm text-slate-500">

                  <p>
                    ⭐{" "}
                    <span className="font-semibold text-slate-700">
                      {suggestedWorker.rating}
                    </span>
                  </p>

                  <p>
                    💼{" "}
                    <span className="font-semibold text-slate-700">
                      {suggestedWorker.experience}
                    </span>
                  </p>

                  <p>
                    📍{" "}
                    <span className="font-semibold text-slate-700">
                      {suggestedWorker.distance}
                    </span>
                  </p>

                </div>

                <button
                  type="button"
                  className="mt-5 w-full rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-bold text-amber-700 transition hover:bg-amber-50"
                >
                  View Profile
                </button>

              </div>

            ))}

          </div>

        </div>

      </section>

      <footer className="border-t border-amber-100 bg-white">

        <div className="mx-auto max-w-6xl px-6 py-8 text-center">

          <p className="text-sm text-slate-400">
            Trusted workers. Better connections. Stronger communities.
          </p>

        </div>

      </footer>

    </main>
  );
}

export default WorkerProcess;