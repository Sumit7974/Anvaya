import { useEffect } from "react";

function ComplaintSuccess({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#FFF8F3] px-4 py-7 text-slate-800 sm:px-6 lg:px-10 xl:px-16">

      {/* TOP BAR */}
      <div className="mx-auto flex max-w-6xl items-center justify-between">

        <img
          src="/anvaya-logo.png"
          alt="Anvaya"
          className="h-14 w-auto object-contain"
        />

        <button
          onClick={onBack}
          className="rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-700 hover:shadow-md"
        >
          ← Back
        </button>

      </div>


      {/* SUCCESS CONTENT */}
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] w-full items-center justify-center">

        <div className="w-full max-w-5xl rounded-[2rem] border border-amber-100 bg-white px-7 py-14 text-center shadow-2xl sm:px-12 lg:px-16">

          {/* SUCCESS ICON */}
          <div className="relative mx-auto w-fit">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-5xl text-emerald-600 shadow-lg shadow-emerald-100">
              ✓
            </div>

            <div className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-md">
              ✨
            </div>

          </div>


          {/* SMALL LABEL */}
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-emerald-600">
            Complaint Submitted
          </p>


          {/* HEADING */}
          <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            We’ve received your complaint.
          </h1>


          {/* REASSURANCE MESSAGE */}
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
            Thank you for letting us know. Your concern has been successfully
            submitted to the Anvaya team.
          </p>


          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">
            Please don’t worry — your complaint matters to us. Our team will
            review the issue carefully and take the necessary action.
          </p>


          {/* REASSURANCE CARD */}
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-5 text-left">

            <div className="flex gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                🛡️
              </div>

              <div>

                <p className="font-bold text-emerald-800">
                  You’re not alone.
                </p>

                <p className="mt-1 text-sm leading-6 text-emerald-700">
                  Anvaya is committed to keeping your experience safe,
                  trustworthy and comfortable.
                </p>

              </div>

            </div>

          </div>


          {/* STATUS */}
          <div className="mx-auto mt-6 flex max-w-xl items-center justify-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
              ✓
            </span>

            <span className="text-sm font-semibold text-slate-600">
              Your complaint has been recorded successfully.
            </span>

          </div>


          {/* BUTTON */}
          <button
            onClick={onBack}
            className="group mt-9 inline-flex items-center justify-center gap-3 rounded-xl bg-amber-600 px-7 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-xl active:translate-y-0"
          >

            <span>
              Back to Customer Dashboard
            </span>

            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>

          </button>


          {/* FOOTER MESSAGE */}
          <p className="mt-7 text-xs leading-5 text-slate-400">
            Thank you for helping us make Anvaya better for everyone. ❤️
          </p>

        </div>

      </section>

    </main>
  );
}

export default ComplaintSuccess;