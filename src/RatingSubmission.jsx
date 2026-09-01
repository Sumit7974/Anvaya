import { useState } from "react";

function RatingSubmission({ onSubmit, onComplaint, onBack }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const ratingLabels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }

    setSubmitted(true);

    if (onSubmit) {
      onSubmit({
        rating,
        feedback,
      });
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#FFF8F3] px-4 py-7 text-slate-800 sm:px-6 lg:px-10 xl:px-16">

      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-md"
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

          <section className="relative overflow-hidden bg-[#FFF1E6] px-7 py-10 sm:px-10 lg:px-12">

            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-amber-100/60" />
            <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-orange-100/50" />

            <div className="relative flex h-full flex-col justify-center">

              <img
                src="/anvaya-logo.png"
                alt="Anvaya"
                className="mb-8 h-16 w-auto object-contain object-left"
              />

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                ⭐
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-amber-700">
                Your experience matters
              </p>

              <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                How was your{" "}
                <span className="text-amber-600">experience?</span>
              </h1>

              <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
                Your feedback helps us build a more trusted community for
                customers and skilled workers.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                    ✓
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    Help improve Anvaya
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
                    ⭐
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    Recognize good service
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm">
                    🤝
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    Build a trusted community
                  </span>
                </div>

              </div>
            </div>
          </section>

          <section className="flex items-center justify-center px-7 py-10 sm:px-12">

            {!submitted ? (

              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md"
              >

                <div className="mb-7">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">
                    Rate your service
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                    Share your feedback
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Tell us how your experience with the worker was.
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-100 bg-[#FFFDFC] p-6">

                  <p className="text-center text-sm font-semibold text-slate-700">
                    How would you rate the service?
                  </p>

                  <div className="mt-5 flex justify-center gap-2 sm:gap-3">

                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = star <= (hoverRating || rating);

                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all duration-200 ${
                            active
                              ? "scale-110 bg-amber-100"
                              : "bg-slate-50 grayscale"
                          } hover:scale-110`}
                        >
                          ⭐
                        </button>
                      );
                    })}

                  </div>

                  <div className="mt-4 text-center">
                    {rating > 0 ? (
                      <span className="text-sm font-bold text-amber-700">
                        {ratingLabels[rating]}
                      </span>
                    ) : (
                      <span className="text-sm text-slate-400">
                        Select a rating
                      </span>
                    )}
                  </div>

                </div>

                <div className="mt-5">

                  <label
                    htmlFor="feedback"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Your feedback
                    <span className="ml-1 font-normal text-slate-400">
                      (Optional)
                    </span>
                  </label>

                  <textarea
                    id="feedback"
                    value={feedback}
                    maxLength={300}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us about your experience..."
                    rows="4"
                    className="w-full resize-none rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm leading-6 text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                  />

                  <div className="mt-2 text-right text-xs text-slate-400">
                    {feedback.length}/300
                  </div>

                </div>

                <button
                  type="submit"
                  className="group mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-amber-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-xl"
                >
                  <span>Submit Rating</span>
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </button>

                <button
                  type="button"
                  onClick={onComplaint}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-6 py-3.5 text-sm font-bold text-red-600 transition-all duration-300 hover:border-red-200 hover:bg-red-100"
                >
                  <span>⚠️</span>
                  <span>Have a problem? Submit a complaint</span>
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                  Your feedback helps make Anvaya safer and better for everyone.
                </p>

              </form>

            ) : (

              <div className="flex w-full max-w-md flex-col items-center justify-center py-8 text-center">

                <div className="relative">

                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-5xl text-emerald-600 shadow-xl shadow-emerald-100">
                    ✓
                  </div>

                  <div className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-md">
                    ⭐
                  </div>

                </div>

                <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-emerald-600">
                  Thank you
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                  Rating submitted successfully!
                </h2>

                <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
                  Thank you for sharing your experience. Your feedback helps
                  us create a better Anvaya community.
                </p>

                <div className="mt-6 flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-5 py-2.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= rating
                          ? "text-lg"
                          : "text-lg grayscale opacity-30"
                      }
                    >
                      ⭐
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onComplaint}
                  className="mt-7 rounded-xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition-all duration-300 hover:border-red-200 hover:bg-red-100"
                >
                  ⚠️ Need to report a problem?
                </button>

              </div>

            )}

          </section>

        </div>
      </div>
    </main>
  );
}

export default RatingSubmission;