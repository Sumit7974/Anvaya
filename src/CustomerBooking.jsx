import { useEffect, useMemo, useState } from "react";

import {
  apiRequest,
  getStoredToken,
} from "./api/client";

const SERVICE_OPTIONS = [
  "All",
  "Electrician",
  "Plumber",
  "Carpenter",
  "Painter",
  "Mason",
];

const SERVICE_ICONS = {
  electrician: "⚡",
  plumber: "🔧",
  carpenter: "🪚",
  painter: "🎨",
  mason: "🧱",
};

const normalizeSkill = (skill) =>
  typeof skill === "string"
    ? skill.trim().toLowerCase()
    : "";

const formatSkill = (skill) => {
  if (!skill) {
    return "Professional Worker";
  }

  return skill.charAt(0).toUpperCase() + skill.slice(1);
};

const getWorkerIcon = (worker) => {
  const firstSkill = worker?.skills?.[0];

  return (
    SERVICE_ICONS[normalizeSkill(firstSkill)] ||
    "👷"
  );
};

const formatRating = (worker) => {
  const average = Number(worker?.rating?.average);

  return Number.isFinite(average) && average > 0
    ? average.toFixed(1)
    : "New";
};

const formatCompletedJobs = (worker) => {
  const count = Number(worker?.rating?.count);

  return Number.isFinite(count) && count > 0
    ? `${count} reviews`
    : "New worker";
};

const formatLocation = (worker) => {
  const coordinates = worker?.location?.coordinates;

  if (
    Array.isArray(coordinates) &&
    coordinates.length === 2 &&
    coordinates.some((value) => Number(value) !== 0)
  ) {
    return `${Number(coordinates[1]).toFixed(4)}, ${Number(
      coordinates[0]
    ).toFixed(4)}`;
  }

  return "Location not set";
};

function CustomerBooking({ onBack, onSelectWorker }) {
  const [search, setSearch] = useState("");
  const [service, setService] = useState("All");
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadWorkers = async () => {
      setLoading(true);
      setError("");

      try {
        const token = getStoredToken();

        if (!token) {
          throw new Error(
            "Your session has expired. Please log in again."
          );
        }

        const data = await apiRequest(
          "/api/workers?isAvailable=true",
          {
            method: "GET",
            token,
          }
        );

        if (!mounted) {
          return;
        }

        setWorkers(
          Array.isArray(data?.workers)
            ? data.workers
            : []
        );
      } catch (requestError) {
        if (!mounted) {
          return;
        }

        setError(
          requestError.message ||
            "Unable to load workers right now."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadWorkers();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredWorkers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return workers.filter((worker) => {
      const skills = Array.isArray(worker.skills)
        ? worker.skills
        : [];

      const matchesService =
        service === "All" ||
        skills.some(
          (skill) =>
            normalizeSkill(skill) ===
            normalizeSkill(service)
        );

      const matchesSearch =
        !query ||
        worker.name?.toLowerCase().includes(query) ||
        skills.some((skill) =>
          String(skill).toLowerCase().includes(query)
        ) ||
        worker.email?.toLowerCase().includes(query);

      return matchesService && matchesSearch;
    });
  }, [workers, search, service]);

  const handleSelectWorker = (worker) => {
    setSelectedWorker(worker);
  };

  const confirmWorker = () => {
    if (selectedWorker && onSelectWorker) {
      onSelectWorker(selectedWorker);
    }

    setSelectedWorker(null);
  };

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
                Customer
              </p>

              <p className="text-sm font-semibold text-slate-700">
                Find & book trusted workers
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

      <section className="relative overflow-hidden bg-[#FFF1E6]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700 shadow-sm">
              <span>📍</span>
              Trusted professionals near you
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Find the right worker
              <span className="text-amber-600">
                {" "}for your job
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Discover skilled professionals nearby, compare their
              experience and ratings, and select the right person
              for your work.
            </p>

            <div className="mt-7 flex max-w-2xl items-center rounded-2xl border border-amber-100 bg-white p-2 shadow-lg">
              <span className="px-3 text-xl">
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search electrician, plumber, carpenter..."
                className="w-full bg-transparent px-2 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-10">
        <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
          Explore services
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Choose a service
        </h2>

        <div className="mt-5 flex gap-3 overflow-x-auto pb-3">
          {SERVICE_OPTIONS.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setService(item)}
              className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-bold transition duration-300 ${
                service === item
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-200"
                  : "border border-amber-100 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-700 hover:shadow-md"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
              Available now
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Nearby workers
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Select a verified worker to continue with your service.
            </p>
          </div>

          <span className="hidden rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 sm:block">
            {loading ? "Loading..." : `${filteredWorkers.length} available`}
          </span>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-amber-100 bg-white px-6 py-20 text-center shadow-md">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-100 border-t-amber-600" />

            <h3 className="mt-6 text-xl font-bold text-slate-900">
              Finding verified workers
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Loading the latest availability from Anvaya.
            </p>
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-100 bg-white px-6 py-16 text-center shadow-md">
            <div className="text-5xl">
              ⚠️
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Unable to load workers
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-amber-600 px-5 py-3 font-bold text-white transition hover:bg-amber-700"
            >
              Try Again
            </button>
          </div>
        ) : filteredWorkers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredWorkers.map((worker) => {
              const primarySkill =
                Array.isArray(worker.skills) &&
                worker.skills.length > 0
                  ? worker.skills[0]
                  : "";

              return (
                <div
                  key={worker._id}
                  className="group rounded-3xl border border-amber-100 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-2xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF1E6] text-3xl transition duration-300 group-hover:scale-110">
                      {getWorkerIcon(worker)}
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      ● Available
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {worker.name}
                  </h3>

                  <p className="mt-1 font-semibold text-amber-700">
                    {formatSkill(primarySkill)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {Array.isArray(worker.skills) &&
                      worker.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600"
                        >
                          {formatSkill(skill)}
                        </span>
                      ))}
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        Rating
                      </span>

                      <span className="font-semibold text-slate-700">
                        ⭐ {formatRating(worker)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        Reviews
                      </span>

                      <span className="font-semibold text-slate-700">
                        {formatCompletedJobs(worker)}
                      </span>
                    </div>

                    <div className="text-sm">
                      <span className="text-slate-500">
                        Location
                      </span>

                      <p className="mt-1 font-semibold text-slate-700">
                        📍 {formatLocation(worker)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectWorker(worker)}
                    className="mt-5 w-full rounded-xl bg-amber-600 px-4 py-3.5 font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-lg active:translate-y-0"
                  >
                    Select Worker →
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-amber-100 bg-white px-6 py-16 text-center shadow-md">
            <div className="text-5xl">
              🔎
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No workers found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another service or wait for a verified worker to become available.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setService("All");
              }}
              className="mt-6 rounded-xl bg-amber-600 px-5 py-3 font-bold text-white transition hover:bg-amber-700"
            >
              Reset Search
            </button>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                ✓
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Verified professionals
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Only active, admin-verified workers are shown.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-xl">
                ⭐
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Trusted ratings
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Compare real worker ratings stored in Anvaya.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-xl">
                📍
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Live availability
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  See workers who are currently available for jobs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-amber-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center">
          <p className="text-sm text-slate-400">
            Trusted workers. Better connections. Stronger communities.
          </p>
        </div>
      </footer>

      {selectedWorker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-amber-100 bg-white p-7 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF1E6] text-3xl">
                {getWorkerIcon(selectedWorker)}
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-amber-700">
                Confirm Worker
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Select {selectedWorker.name}?
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                You are about to request this verified worker for your service.
                Do you want to continue?
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-[#FFF8F3] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">
                    {selectedWorker.name}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-amber-700">
                    {formatSkill(selectedWorker.skills?.[0])}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-slate-700">
                    ⭐ {formatRating(selectedWorker)}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Available now
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedWorker(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmWorker}
                className="rounded-xl bg-amber-600 px-4 py-3 font-bold text-white shadow-md transition hover:bg-amber-700"
              >
                Yes, Select →
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default CustomerBooking;