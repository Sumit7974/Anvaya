function PaymentSuccess({ onContinue, onBack }) {
  return (
    <main className="min-h-screen bg-[#FFF8F3] px-5 py-8 text-slate-800">

      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        className="fixed right-5 top-5 z-50 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-700 hover:shadow-lg"
      >
        ← Back
      </button>

      {/* MAIN CARD */}
      <div className="flex min-h-[90vh] items-center justify-center">

        <div className="w-full max-w-2xl rounded-[2rem] border border-amber-100 bg-white px-7 py-12 text-center shadow-2xl sm:px-12">

          {/* LOGO */}
          <img
            src="/anvaya-logo.png"
            alt="Anvaya"
            className="mx-auto mb-8 h-16 w-auto object-contain"
          />

          {/* SUCCESS ICON */}
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 shadow-lg shadow-emerald-100">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-4xl font-bold text-white">
              ✓
            </div>

            <span className="absolute -right-1 -top-1 text-2xl">
              ✨
            </span>

          </div>

          {/* MESSAGE */}
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-emerald-600">
            Payment Successful
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            Payment has been done successfully! 🎉
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-slate-500">
            Your payment has been received successfully. Your booking is
            confirmed and your service request is safely recorded with Anvaya.
          </p>

          {/* PAYMENT DETAILS */}
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 text-left">

            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <span className="text-sm text-slate-500">
                Payment Status
              </span>

              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                ✓ Paid
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Booking Status
              </span>

              <span className="text-sm font-bold text-slate-800">
                Confirmed
              </span>
            </div>

          </div>

          {/* REASSURANCE */}
          <div className="mx-auto mt-6 max-w-md rounded-2xl border border-amber-100 bg-[#FFF8F3] px-5 py-4">

            <p className="text-sm font-semibold leading-6 text-slate-600">
              🔒 Don't worry, your payment details are secure.
              You can now share your experience with us.
            </p>

          </div>

          {/* CONTINUE */}
          <button
            onClick={onContinue}
            className="group mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-amber-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-xl active:translate-y-0"
          >
            <span>Continue to Rating</span>

            <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </button>

          <p className="mt-5 text-xs text-slate-400">
            Thank you for choosing Anvaya.
          </p>

        </div>

      </div>

    </main>
  );
}

export default PaymentSuccess;