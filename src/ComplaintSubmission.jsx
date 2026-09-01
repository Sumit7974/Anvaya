import { useState } from "react";

function ComplaintSubmission({ onSubmit, onBack }) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const complaintTypes = [
    {
      value: "poor-service",
      icon: "⚠️",
      title: "Poor Service",
      description: "The service was not as expected.",
    },
    {
      value: "worker-behaviour",
      icon: "👤",
      title: "Worker Behaviour",
      description: "Report inappropriate behaviour.",
    },
    {
      value: "payment",
      icon: "💳",
      title: "Payment Issue",
      description: "There is a problem with payment.",
    },
    {
      value: "other",
      icon: "💬",
      title: "Other",
      description: "Something else went wrong.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category) {
      alert("Please select a complaint type.");
      return;
    }

    if (!description.trim()) {
      alert("Please describe your complaint.");
      return;
    }

    if (onSubmit) {
      onSubmit({
        category,
        description,
      });
    }

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen w-full bg-[#FFF8F3] px-4 py-7 text-slate-800 sm:px-6 lg:px-10 xl:px-16">

      <div className="mx-auto flex max-w-6xl items-center justify-between">

        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-md transition-all duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700"
        >
          <span className="text-lg">←</span>
          <span>Back</span>
        </button>

        <div className="rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-700 shadow-sm">
          Anvaya
        </div>

      </div>

      <div className="mx-auto mt-8 flex min-h-[calc(100vh-8rem)] w-full items-center justify-center">

        <div className="grid min-h-[560px] w-full overflow-hidden rounded-[2rem] border border-amber-100 bg-white shadow-2xl lg:min-h-[650px] lg:grid-cols-[0.85fr_1.15fr]">

          {/* LEFT SIDE */}

          <section className="relative overflow-hidden bg-[#FFF1E6] px-7 py-10 sm:px-10 lg:px-12">

            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-red-100/50" />

            <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-amber-100/50" />

            <div className="relative flex h-full flex-col justify-center">

              <img
                src="/anvaya-logo.png"
                alt="Anvaya"
                className="mb-8 h-16 w-auto object-contain object-left"
              />

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                🛡️
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-red-600">
                We're here to help
              </p>

              <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                Tell us what{" "}
                <span className="text-red-600">went wrong.</span>
              </h1>

              <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
                Your complaint helps us improve our service and keep the
                Anvaya community safe and trustworthy.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-red-500 shadow-sm">
                    🔒
                  </div>

                  <span className="text-sm font-semibold text-slate-700">
                    Your complaint is private
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
                    👀
                  </div>

                  <span className="text-sm font-semibold text-slate-700">
                    Our team will review it
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                    ✓
                  </div>

                  <span className="text-sm font-semibold text-slate-700">
                    Help us improve Anvaya
                  </span>
                </div>

              </div>

            </div>

          </section>

          {/* RIGHT SIDE */}

          <section className="flex items-center justify-center px-7 py-10 sm:px-12">

            {!submitted ? (

              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md"
              >

                <div className="mb-7">

                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-red-600">
                    Report an issue
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                    Submit a complaint
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Please provide a few details so we can understand the
                    issue better.
                  </p>

                </div>

                <div>

                  <label className="mb-3 block text-sm font-semibold text-slate-700">
                    What went wrong?
                  </label>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                    {complaintTypes.map((item) => {

                      const selected = category === item.value;

                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setCategory(item.value)}
                          className={`group rounded-2xl border p-4 text-left transition-all duration-300 ${
                            selected
                              ? "border-red-300 bg-red-50 shadow-md"
                              : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50/40 hover:shadow-sm"
                          }`}
                        >

                          <div className="flex items-start justify-between">

                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${
                                selected
                                  ? "bg-white"
                                  : "bg-slate-50"
                              }`}
                            >
                              {item.icon}
                            </div>

                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                selected
                                  ? "border-red-500 bg-red-500 text-xs text-white"
                                  : "border-slate-200"
                              }`}
                            >
                              {selected && "✓"}
                            </div>

                          </div>

                          <h3 className="mt-3 text-sm font-bold text-slate-800">
                            {item.title}
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {item.description}
                          </p>

                        </button>
                      );

                    })}

                  </div>

                </div>

                <div className="mt-5">

                  <label
                    htmlFor="complaint-description"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Describe the issue
                  </label>

                  <textarea
                    id="complaint-description"
                    value={description}
                    maxLength={500}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please explain what happened..."
                    rows="5"
                    className="w-full resize-none rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm leading-6 text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-red-200 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  />

                  <div className="mt-2 flex justify-end text-xs text-slate-400">
                    {description.length}/500
                  </div>

                </div>

                <button
                  type="submit"
                  className="group mt-4 flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-xl active:translate-y-0"
                >
                  <span>Submit Complaint</span>

                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                  Please provide accurate information so our team can help
                  you properly.
                </p>

              </form>

            ) : (

              <div className="flex w-full max-w-md flex-col items-center justify-center py-8 text-center">

                <div className="relative">

                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-5xl text-emerald-600 shadow-xl shadow-emerald-100">
                    ✓
                  </div>

                  <div className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-md">
                    🛡️
                  </div>

                </div>

                <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-emerald-600">
                  Complaint received
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                  Thank you for telling us.
                </h2>

                <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
                  Your complaint has been submitted successfully. Our team
                  will review the issue and take the necessary action.
                </p>

                <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-6 py-4">

                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Status
                  </p>

                  <p className="mt-1 text-sm font-bold text-emerald-700">
                    ✓ Under Review
                  </p>

                </div>

                <button
                  type="button"
                  onClick={onBack}
                  className="mt-7 rounded-xl bg-amber-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-xl"
                >
                  Back to Anvaya
                </button>

              </div>

            )}

          </section>

        </div>

      </div>

    </main>
  );
}

export default ComplaintSubmission;