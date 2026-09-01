import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import {
  apiRequest,
  getStoredToken,
  getStoredUser
} from "./api/client";

const STATUS_LABELS = {
  requested: "New Request",
  accepted: "Accepted",
  "in-progress": "Work Started",
  "completion-pending":
    "Waiting for Customer Confirmation",
  completed: "Completed",
  disputed: "Disputed",
  rejected: "Rejected",
  cancelled: "Cancelled"
};

const SERVICE_ICONS = {
  electrician: "⚡",
  plumber: "🔧",
  carpenter: "🪚",
  painter: "🎨",
  mason: "🧱"
};

const formatService = (service) => {
  if (!service) {
    return "General Service";
  }

  const value = String(service);

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
};

const getServiceIcon = (service) => {
  return (
    SERVICE_ICONS[
      String(
        service || ""
      ).toLowerCase()
    ] || "👷"
  );
};

const formatDate = (value) => {
  if (!value) {
    return "Recently";
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Recently";
  }

  return date.toLocaleString();
};

const formatLocation = (
  location
) => {
  const coordinates =
    location?.coordinates;

  if (
    !Array.isArray(
      coordinates
    ) ||
    coordinates.length !== 2
  ) {
    return "Location not provided";
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
    return "Location not provided";
  }

  return `${latitude.toFixed(
    4
  )}, ${longitude.toFixed(4)}`;
};

function WorkerDashboard({
  onBack
}) {
  const [bookings, setBookings] =
    useState([]);

  const [available, setAvailable] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [actionId, setActionId] =
    useState("");

  const worker =
    getStoredUser();

  const loadBookings =
    useCallback(
      async (
        showLoader = false
      ) => {
        try {
          if (showLoader) {
            setLoading(true);
          }

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
              "/api/bookings/worker",
              {
                method: "GET",
                token
              }
            );

          setBookings(
            Array.isArray(
              data?.bookings
            )
              ? data.bookings
              : []
          );

          if (
            typeof data?.worker
              ?.isAvailable ===
            "boolean"
          ) {
            setAvailable(
              data.worker.isAvailable
            );
          }
        } catch (
          requestError
        ) {
          console.error(
            "Load worker bookings error:",
            requestError
          );

          setError(
            requestError?.message ||
              "Unable to load your bookings."
          );
        } finally {
          setLoading(false);
        }
      },
      []
    );

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        void loadBookings(true);
      }, 0);

    const refresh =
      window.setInterval(() => {
        void loadBookings(false);
      }, 5000);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(refresh);
    };
  }, [loadBookings]);

  const requestedCount =
    useMemo(
      () =>
        bookings.filter(
          (booking) =>
            booking.status ===
            "requested"
        ).length,
      [bookings]
    );

  const activeCount =
    useMemo(
      () =>
        bookings.filter(
          (booking) =>
            booking.status ===
              "accepted" ||
            booking.status ===
              "in-progress" ||
            booking.status ===
              "completion-pending"
        ).length,
      [bookings]
    );

  const completedCount =
    useMemo(
      () =>
        bookings.filter(
          (booking) =>
            booking.status ===
            "completed"
        ).length,
      [bookings]
    );

  

  const performBookingAction =
    async (
      bookingId,
      action
    ) => {
      try {
        setActionId(
          `${bookingId}:${action}`
        );

        setError("");

        const token =
          getStoredToken();

        if (!token) {
          throw new Error(
            "Your session has expired. Please log in again."
          );
        }

        let body;

        if (
          action === "reject"
        ) {
          const reason =
            window.prompt(
              "Optional: Why are you rejecting this job?"
            );

          body = {
            reason:
              reason || ""
          };
        }

        const data =
          await apiRequest(
            `/api/bookings/${bookingId}/${action}`,
            {
              method: "PATCH",
              token,
              body
            }
          );

        if (
          data?.booking?._id
        ) {
          setBookings(
            (
              current
            ) =>
              current.map(
                (booking) =>
                  booking._id ===
                  data.booking
                    ._id
                    ? data.booking
                    : booking
              )
          );
        } else {
          await loadBookings(
            false
          );
        }
      } catch (
        requestError
      ) {
        console.error(
          `Booking ${action} error:`,
          requestError
        );

        setError(
          requestError?.message ||
            `Unable to ${action} booking.`
        );
      } finally {
        setActionId("");
      }
    };

  const toggleAvailability =
    async () => {
      try {
        setActionId(
          "availability"
        );

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
            "/api/workers/availability",
            {
              method: "PATCH",
              token
            }
          );

        if (
          typeof data?.isAvailable ===
          "boolean"
        ) {
          setAvailable(
            data.isAvailable
          );
        }
      } catch (
        requestError
      ) {
        console.error(
          "Availability update error:",
          requestError
        );

        setError(
          requestError?.message ||
            "Unable to update availability."
        );
      } finally {
        setActionId("");
      }
    };

  const getActions =
    (booking) => {
      if (
        booking.status ===
        "requested"
      ) {
        return {
          primary: {
            label: "Accept Job",
            action: "accept",
            className:
              "bg-emerald-600 hover:bg-emerald-700"
          },

          secondary: {
            label: "Reject",
            action: "reject",
            className:
              "border border-red-200 bg-white text-red-600 hover:bg-red-50"
          }
        };
      }

      if (
        booking.status ===
        "accepted"
      ) {
        return {
          primary: {
            label: "Start Work",
            action: "start",
            className:
              "bg-blue-600 hover:bg-blue-700"
          }
        };
      }

      if (
        booking.status ===
        "in-progress"
      ) {
        return {
          primary: {
            label:
              "Request Completion",
            action:
              "request-completion",
            className:
              "bg-amber-600 hover:bg-amber-700"
          }
        };
      }

      return null;
    };

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-slate-800">
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
                Manage your Anvaya jobs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                void toggleAvailability();
              }}
              disabled={
                actionId ===
                "availability"
              }
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                available
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              } disabled:opacity-60`}
            >
              ●{" "}
              {available
                ? "Available"
                : "Unavailable"}
            </button>

            <button
              type="button"
              onClick={onBack}
              className="rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:border-amber-300 hover:text-amber-700"
            >
              ← Back
            </button>
          </div>
        </div>
      </header>

      <section className="border-b border-amber-100 bg-[#FFF1E6]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">
            Worker account 👋
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            {worker?.name
              ? `Welcome, ${worker.name}`
              : "Your work dashboard"}
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Review every customer request before accepting the work.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              New requests
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {requestedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Active jobs
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {activeCount}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Completed jobs
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {completedCount}
            </p>
          </div>
        </div>
      </section>

      {error && (
        <section className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
          <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
            <p className="font-bold text-red-700">
              Something went wrong
            </p>

            <p className="mt-1 text-sm text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() => {
                void loadBookings(
                  true
                );
              }}
              className="mt-4 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <section className="rounded-3xl border border-amber-100 bg-white shadow-lg">
          <div className="border-b border-amber-100 bg-[#FFFDF9] px-6 py-6 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
              Live bookings
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Customer jobs
            </h2>
          </div>

          <div className="p-6 sm:p-8">
            {loading ? (
              <div className="py-16 text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-amber-100 border-t-amber-600" />

                <p className="mt-4 text-sm font-semibold text-slate-600">
                  Loading bookings...
                </p>
              </div>
            ) : bookings.length ===
              0 ? (
              <div className="rounded-2xl bg-[#FFF8F3] px-6 py-14 text-center">
                <div className="text-5xl">
                  📭
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  No bookings yet
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  New customer requests will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {bookings.map(
                  (booking) => {
                    const actions =
                      getActions(
                        booking
                      );

                    const acceptBusy =
                      actionId ===
                      `${booking._id}:accept`;

                    const rejectBusy =
                      actionId ===
                      `${booking._id}:reject`;

                    const primaryBusy =
                      booking.status ===
                        "requested"
                        ? acceptBusy
                        : actionId ===
                          `${booking._id}:${actions?.primary?.action}`;

                    return (
                      <article
                        key={
                          booking._id
                        }
                        className="rounded-2xl border border-amber-100 bg-[#FFFDFC] p-5 shadow-sm"
                      >
                        <div className="flex flex-col gap-5">
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                            <div className="flex items-center gap-4">
                              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF1E6] text-2xl">
                                {getServiceIcon(
                                  booking.serviceTag
                                )}
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                                  {formatService(
                                    booking.serviceTag
                                  )}
                                </p>

                                <h3 className="mt-1 text-xl font-bold text-slate-900">
                                  {booking
                                    .customer
                                    ?.name ||
                                    "Customer"}
                                </h3>
                              </div>
                            </div>

                            <span
                              className={`w-fit rounded-full px-4 py-2 text-xs font-bold ${
                                booking.status ===
                                "completed"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : booking.status ===
                                    "completion-pending"
                                  ? "bg-purple-50 text-purple-700"
                                  : booking.status ===
                                    "in-progress"
                                  ? "bg-blue-50 text-blue-700"
                                  : booking.status ===
                                    "accepted"
                                  ? "bg-amber-50 text-amber-700"
                                  : booking.status ===
                                    "rejected"
                                  ? "bg-red-50 text-red-700"
                                  : booking.status ===
                                    "disputed"
                                  ? "bg-red-50 text-red-700"
                                  : "bg-orange-50 text-orange-700"
                              }`}
                            >
                              ●{" "}
                              {STATUS_LABELS[
                                booking.status
                              ] ||
                                booking.status}
                            </span>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-xl bg-[#FFF8F3] p-4">
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Customer requirement
                              </p>

                              <p className="mt-2 text-sm leading-6 text-slate-700">
                                {booking.problemDescription ||
                                  "No description provided."}
                              </p>
                            </div>

                            <div className="rounded-xl bg-[#FFF8F3] p-4">
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Booking details
                              </p>

                              <p className="mt-2 text-sm text-slate-600">
                                Created:{" "}
                                <span className="font-semibold text-slate-800">
                                  {formatDate(
                                    booking.createdAt
                                  )}
                                </span>
                              </p>

                              <p className="mt-2 text-sm text-slate-600">
                                Location:{" "}
                                <span className="font-semibold text-slate-800">
                                  {formatLocation(
                                    booking.location
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>

                          {booking.status ===
                            "requested" && (
                            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                              <p className="font-bold text-orange-800">
                                Customer selected you
                              </p>

                              <p className="mt-1 text-sm leading-6 text-orange-700">
                                Review the request and decide whether you can take this job.
                              </p>
                            </div>
                          )}

                          {booking.status ===
                            "completion-pending" && (
                            <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">
                              <p className="font-bold text-purple-800">
                                Waiting for customer confirmation
                              </p>

                              <p className="mt-1 text-sm leading-6 text-purple-700">
                                The customer must confirm the work before payment can proceed.
                              </p>
                            </div>
                          )}

                          <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                            <p className="break-all text-xs text-slate-400">
                              Booking ID:{" "}
                              <span className="font-mono text-slate-500">
                                {booking._id}
                              </span>
                            </p>

                            {actions && (
                              <div className="flex flex-col gap-3 sm:flex-row">
                                {actions.secondary && (
                                  <button
                                    type="button"
                                    disabled={
                                      rejectBusy ||
                                      primaryBusy
                                    }
                                    onClick={() => {
                                      void performBookingAction(
                                        booking._id,
                                        actions.secondary.action
                                      );
                                    }}
                                    className={`rounded-xl px-5 py-3 font-bold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${actions.secondary.className}`}
                                  >
                                    {rejectBusy
                                      ? "Rejecting..."
                                      : actions.secondary.label}
                                  </button>
                                )}

                                {actions.primary && (
                                  <button
                                    type="button"
                                    disabled={
                                      primaryBusy ||
                                      rejectBusy
                                    }
                                    onClick={() => {
                                      void performBookingAction(
                                        booking._id,
                                        actions.primary.action
                                      );
                                    }}
                                    className={`rounded-xl px-5 py-3 font-bold text-white shadow-md transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 ${actions.primary.className}`}
                                  >
                                    {primaryBusy
                                      ? "Updating..."
                                      : actions.primary.label}
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </section>
      </section>

      <footer className="border-t border-amber-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center">
          <p className="text-sm text-slate-400">
            Trusted workers. Better connections. Stronger communities.
          </p>
        </div>
      </footer>
    </main>
  );
}

export default WorkerDashboard;