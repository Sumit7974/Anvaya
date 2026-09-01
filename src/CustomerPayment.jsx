import { useState } from "react";

function CustomerPayment({worker,booking, onNext, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paying, setPaying] = useState(false);
  const service =
  booking?.service ||
  worker?.service ||
  worker?.skill ||
  "Selected Service";

const location =
  booking?.location ||
  worker?.location ||
  "Service Location";

const amount =
  Number(
    booking?.amount ||
    booking?.budget ||
    worker?.amount ||
    worker?.price ||
    0
  );

const projectName =
  booking?.projectName ||
  booking?.name ||
  service;

  const handlePayment = (e) => {
    e.preventDefault();

    setPaying(true);

    setTimeout(() => {
      setPaying(false);
      onNext();
    }, 1200);
  };

  return (
    <main className="min-h-screen w-full bg-[#FFF8F3] px-4 py-7 text-slate-800 sm:px-6 lg:px-10 xl:px-16">

      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="fixed right-5 top-5 z-50 flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-md transition-all duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-lg"
      >
        <span className="text-lg">←</span>
        <span>Back</span>
      </button>

      <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full flex-col justify-center pt-10">

        {/* Header */}
        <div className="text-center">

          <img
            src="/anvaya-logo.png"
            alt="Anvaya"
            className="mx-auto h-16 w-auto object-contain"
          />

          <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-amber-700">
            Secure Payment
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Complete your payment
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Make a secure payment to confirm your service booking.
          </p>

        </div>

        {/* Main Card */}
        <div className="mx-auto mt-9 grid min-h-[560px] w-full overflow-hidden rounded-[2rem] border border-amber-100 bg-white shadow-xl lg:min-h-[650px] lg:grid-cols-2">

          {/* Booking Summary */}
          <section className="bg-[#FFF1E6] px-7 py-9 sm:px-10">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-700">
                 -- Booking Summary
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {projectName}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                ⚡
              </div>

            </div>

            <div className="mt-8 space-y-4">

              <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3.5 shadow-sm">
                <span className="text-sm text-slate-500">
                  Worker
                </span>

                <span className="text-sm font-bold text-slate-800">
                  {worker?.name || "Selected Worker"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3.5 shadow-sm">
                <span className="text-sm text-slate-500">
                  Service
                </span>

                <span className="text-sm font-bold text-slate-800">
                  {service}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3.5 shadow-sm">
                <span className="text-sm text-slate-500">
                  Location
                </span>

                <span className="text-sm font-bold text-slate-800">
                  {location}
                </span>
              </div>

            </div>

            <div className="mt-7 border-t border-amber-200 pt-6">

              <div className="flex items-end justify-between">

                <span className="text-sm font-semibold text-slate-500">
                  Total Amount
                </span>

                <span className="text-3xl font-bold text-amber-700">
                 {amount > 0 ? `₹${amount.toLocaleString("en-IN")}` : "Amount not set"}
                </span>

              </div>

            </div>

            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-4">

              <span className="text-lg">
                🔒
              </span>

              <p className="text-xs leading-5 text-emerald-700">
                Your payment information is protected with a secure
                checkout experience.
              </p>

            </div>

          </section>

          {/* Payment Form */}
          <section className="px-7 py-9 sm:px-10">

            <div className="mb-7">

              <p className="text-sm font-bold uppercase tracking-[0.14em] text-amber-700">
                Payment Method
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Choose how to pay
              </h2>

            </div>

            <form onSubmit={handlePayment}>

              {/* UPI */}
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`mb-3 flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${
                  paymentMethod === "upi"
                    ? "border-amber-400 bg-amber-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-amber-200 hover:bg-amber-50/40"
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    📱
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      UPI
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Google Pay, PhonePe, Paytm
                    </p>
                  </div>

                </div>

                <div
                  className={`h-5 w-5 rounded-full border-2 ${
                    paymentMethod === "upi"
                      ? "border-amber-600 bg-amber-600"
                      : "border-slate-300"
                  }`}
                />

              </button>

              {/* Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`mb-3 flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${
                  paymentMethod === "card"
                    ? "border-amber-400 bg-amber-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-amber-200 hover:bg-amber-50/40"
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    💳
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Debit / Credit Card
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Visa, Mastercard and more
                    </p>
                  </div>

                </div>

                <div
                  className={`h-5 w-5 rounded-full border-2 ${
                    paymentMethod === "card"
                      ? "border-amber-600 bg-amber-600"
                      : "border-slate-300"
                  }`}
                />

              </button>

              {/* Cash */}
              <button
                type="button"
                onClick={() => setPaymentMethod("cash")}
                className={`mb-6 flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${
                  paymentMethod === "cash"
                    ? "border-amber-400 bg-amber-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-amber-200 hover:bg-amber-50/40"
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    💵
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Cash on Service
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Pay directly after the service
                    </p>
                  </div>

                </div>

                <div
                  className={`h-5 w-5 rounded-full border-2 ${
                    paymentMethod === "cash"
                      ? "border-amber-600 bg-amber-600"
                      : "border-slate-300"
                  }`}
                />

              </button>

              {/* Pay Button */}
              <button
                type="submit"
                disabled={paying}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-amber-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              >

                {paying ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Processing payment...</span>
                  </>
                ) : (
                  <>
                    <span>
  {amount > 0 ? `Pay ₹${amount.toLocaleString("en-IN")}` : "Continue"}
</span>

                    <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </>
                )}

              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                By continuing, you agree to Anvaya's payment terms.
              </p>

            </form>

          </section>

        </div>

      </div>

    </main>
  );
}

export default CustomerPayment;
