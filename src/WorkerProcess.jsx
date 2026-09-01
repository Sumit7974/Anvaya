import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import {
  apiRequest,
  getStoredToken
} from "./api/client";

const STATUS_LABELS = {
  requested: "Requested",
  accepted: "Accepted",
  "in-progress": "In Progress",
  "completion-pending":
    "Waiting for Your Confirmation",
  completed: "Completed",
  disputed: "Disputed",
  cancelled: "Cancelled"
};

const STATUS_STEPS = [
  "requested",
  "accepted",
  "in-progress",
  "completion-pending",
  "completed"
];

const STATUS_INFO = {
  requested: {
    title: "Request created",
    description:
      "Your booking has been created."
  },

  accepted: {
    title: "Worker accepted the job",
    description:
      "Your selected worker has accepted the booking."
  },

  "in-progress": {
    title: "Work is in progress",
    description:
      "The worker is currently working on your service."
  },

  "completion-pending": {
    title:
      "Please check the completed work",
    description:
      "The worker says the job is finished. Please inspect the work yourself before confirming."
  },

  completed: {
    title:
      "Work confirmed successfully",
    description:
      "You confirmed that the work is satisfactory. Payment is now available."
  },

  disputed: {
    title: "Completion disputed",
    description:
      "You reported a problem. Payment remains locked while the issue is handled."
  },

  cancelled: {
    title: "Booking cancelled",
    description:
      "This booking is no longer active."
  }
};

const getSkillName = (worker) => {
  const skills =
    Array.isArray(worker?.skills)
      ? worker.skills
      : [];

  if (!skills.length) {
    return "Professional Worker";
  }

  const value = String(
    skills[0]
  );

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
};

const getWorkerIcon = (worker) => {
  const skill =
    String(
      worker?.skills?.[0] || ""
    ).toLowerCase();

  const icons = {
    electrician: "⚡",
    plumber: "🔧",
    carpenter: "🪚",
    painter: "🎨",
    mason: "🧱"
  };

  return (
    icons[skill] ||
    "👷"
  );
};

const getRating = (worker) => {
  const rating =
    Number(
      worker?.rating?.average
    );

  if (
    !Number.isFinite(rating) ||
    rating <= 0
  ) {
    return "New";
  }

  return rating.toFixed(1);
};

const getLocation = (worker) => {
  const coordinates =
    worker?.location?.coordinates;

  if (
    !Array.isArray(
      coordinates
    ) ||
    coordinates.length !== 2
  ) {
    return "Location unavailable";
  }

  const longitude =
    Number(coordinates[0]);

  const latitude =
    Number(coordinates[1]);

  if (
    !Number.isFinite(
      longitude
    ) ||
    !Number.isFinite(
      latitude
    )
  ) {
    return "Location unavailable";
  }

  return `${latitude.toFixed(
    4
  )}, ${longitude.toFixed(
    4
  )}`;
};

function WorkerProcess({
  worker,
  bookingId,
  onBack,
  onProceedToPayment
}) {
  const [booking, setBooking] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [actionLoading, setActionLoading] =
    useState(false);

  const loadBooking =
    useCallback(
      async (showLoader = false) => {
        try {
          if (showLoader) {
            setLoading(true);
          }

          const token =
            getStoredToken();

          if (!token) {
            throw new Error(
              "Your session has expired. Please log in again."
            );
          }

          const data =
            await apiRequest(
              "/api/bookings/my",
              {
                method: "GET",
                token
              }
            );

          const bookings =
            Array.isArray(
              data?.bookings
            )
              ? data.bookings
              : [];

          const currentBooking =
            bookings.find(
              (item) =>
                item?._id ===
                bookingId
            );

          if (!currentBooking) {
            throw new Error(
              "Your booking could not be found."
            );
          }

          setBooking(
            currentBooking
          );

          setError("");
        } catch (
          requestError
        ) {
          console.error(
            "Load booking error:",
            requestError
          );

          setError(
            requestError?.message ||
              "Unable to load booking status."
          );
        } finally {
          setLoading(false);
        }
      },
      [bookingId]
    );

  useEffect(() => {
    const initialTimer =
      window.setTimeout(() => {
        void loadBooking(
          true
        );
      }, 0);

    const refreshTimer =
      window.setInterval(() => {
        void loadBooking(
          false
        );
      }, 5000);

    return () => {
      window.clearTimeout(
        initialTimer
      );

      window.clearInterval(
        refreshTimer
      );
    };
  }, [loadBooking]);

  const status =
    booking?.status ||
    "requested";

  const statusIndex =
    useMemo(
      () =>
        STATUS_STEPS.indexOf(
          status
        ),
      [status]
    );

  const statusInfo =
    STATUS_INFO[status] ||
    STATUS_INFO.requested;

  const confirmWork =
    async () => {
      try {
        setActionLoading(true);
        setError("");

        const token =
          getStoredToken();

        if (!token) {
          throw new Error(
            "Your session has expired. Please log in again."
          );
        }

        const data =
          await apiRequest(
            `/api/bookings/${bookingId}/confirm-completion`,
            {
              method: "PATCH",
              token
            }
          );

        setBooking(
          data.booking
        );
      } catch (
        requestError
      ) {
        console.error(
          "Confirm completion error:",
          requestError
        );

        setError(
          requestError?.message ||
            "Unable to confirm the work."
        );
      } finally {
        setActionLoading(false);
      }
    };

  const disputeWork =
    async () => {
      const confirmed =
        window.confirm(
          "Are you sure the work is not satisfactory? Payment will remain locked."
        );

      if (!confirmed) {
        return;
      }

      try {
        setActionLoading(true);
        setError("");

        const token =
          getStoredToken();

        if (!token) {
          throw new Error(
            "Your session has expired. Please log in again."
          );
        }

        const data =
          await apiRequest(
            `/api/bookings/${bookingId}/dispute-completion`,
            {
              method: "PATCH",
              token
            }
          );

        setBooking(
          data.booking
        );
      } catch (
        requestError
      ) {
        console.error(
          "Dispute completion error:",
          requestError
        );

        setError(
          requestError?.message ||
            "Unable to report the problem."
        );
      } finally {
        setActionLoading(false);
      }
    };

  const canPay =
    status === "completed";

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
                Track your service safely
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:border-amber-300 hover:text-amber-700"
          >
            ← Back
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-xl">
          <div className="bg-[#FFF1E6] px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm">
                  {getWorkerIcon(
                    worker
                  )}
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-700">
                    Selected worker
                  </p>

                  <h1 className="mt-1 text-2xl font-bold text-slate-900">
                    {worker?.name ||
                      "Selected Worker"}
                  </h1>

                  <p className="mt-1 font-semibold text-amber-700">
                    {getSkillName(
                      worker
                    )}
                  </p>
                </div>
              </div>

              <span className="w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-amber-700 shadow-sm">
                ●{" "}
                {STATUS_LABELS[
                  status
                ] || status}
              </span>
            </div>
          </div>

          <div className="grid gap-4 border-b border-slate-100 px-6 py-6 sm:grid-cols-3 sm:px-8">
            <div className="rounded-2xl bg-[#FFF8F3] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Rating
              </p>

              <p className="mt-1 font-bold text-slate-900">
                ⭐{" "}
                {getRating(
                  worker
                )}
              </p>
            </div>

            <div className="rounded-2xl bg-[#FFF8F3] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Service
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {getSkillName(
                  worker
                )}
              </p>
            </div>

            <div className="rounded-2xl bg-[#FFF8F3] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Worker Location
              </p>

              <p className="mt-1 font-bold text-slate-900">
                📍{" "}
                {getLocation(
                  worker
                )}
              </p>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8">
            <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
              Service progress
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              {statusInfo.title}
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              {statusInfo.description}
            </p>

            {loading ? (
              <div className="mt-8 rounded-2xl bg-[#FFF8F3] p-8 text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-amber-100 border-t-amber-600" />

                <p className="mt-4 text-sm font-semibold text-slate-600">
                  Loading booking...
                </p>
              </div>
            ) : error ? (
              <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-6">
                <p className="font-bold text-red-700">
                  Unable to load booking
                </p>

                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    void loadBooking(
                      true
                    );
                  }}
                  className="mt-5 rounded-xl bg-amber-600 px-5 py-3 text-sm font-bold text-white hover:bg-amber-700"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                <div className="mt-8 grid gap-4 sm:grid-cols-5">
                  {STATUS_STEPS.map(
                    (
                      step,
                      index
                    ) => {
                      const reached =
                        index <=
                        statusIndex;

                      const active =
                        step ===
                        status;

                      return (
                        <div
                          key={step}
                          className={`rounded-2xl border p-4 ${
                            active
                              ? "border-amber-300 bg-amber-50"
                              : reached
                              ? "border-emerald-100 bg-emerald-50/50"
                              : "border-slate-100 bg-slate-50"
                          }`}
                        >
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                              reached
                                ? "bg-amber-600 text-white"
                                : "bg-white text-slate-400"
                            }`}
                          >
                            {reached
                              ? "✓"
                              : index +
                                1}
                          </div>

                          <p
                            className={`mt-3 text-sm font-bold ${
                              active
                                ? "text-amber-700"
                                : reached
                                ? "text-slate-800"
                                : "text-slate-400"
                            }`}
                          >
                            {STATUS_LABELS[
                              step
                            ]}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>

                {status ===
                  "completion-pending" && (
                  <div className="mt-8 rounded-3xl border-2 border-purple-200 bg-purple-50 p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                        🛡️
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-purple-900">
                          Please verify the work before payment
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-purple-800">
                          The worker has requested completion. Check the actual work, test the service where possible, and confirm only when you are satisfied.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        disabled={
                          actionLoading
                        }
                        onClick={() => {
                          void confirmWork();
                        }}
                        className="rounded-xl bg-emerald-600 px-5 py-4 font-bold text-white shadow-md hover:bg-emerald-700 disabled:opacity-60"
                      >
                        {actionLoading
                          ? "Updating..."
                          : "✓ Work Is Satisfactory"}
                      </button>

                      <button
                        type="button"
                        disabled={
                          actionLoading
                        }
                        onClick={() => {
                          void disputeWork();
                        }}
                        className="rounded-xl border border-red-200 bg-white px-5 py-4 font-bold text-red-600 hover:bg-red-50 disabled:opacity-60"
                      >
                        Report a Problem
                      </button>
                    </div>

                    <p className="mt-4 text-center text-xs text-purple-700">
                      Payment cannot be released until you confirm the work.
                    </p>
                  </div>
                )}

                {status ===
                  "disputed" && (
                  <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-6">
                    <h3 className="text-xl font-bold text-red-800">
                      Payment locked
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-red-700">
                      You reported that the work is not satisfactory. The booking remains disputed and payment cannot proceed.
                    </p>
                  </div>
                )}

                {canPay && (
                  <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-emerald-900">
                          ✓ Work confirmed
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-emerald-800">
                          You confirmed the service is satisfactory. Payment is now unlocked.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={
                          onProceedToPayment
                        }
                        className="rounded-xl bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-md hover:bg-emerald-700"
                      >
                        Proceed to Payment →
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-8 rounded-2xl border border-amber-100 bg-[#FFF8F3] p-5">
                  <p className="text-sm font-bold text-slate-900">
                    Booking ID
                  </p>

                  <p className="mt-1 break-all font-mono text-xs text-slate-500">
                    {bookingId}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default WorkerProcess;