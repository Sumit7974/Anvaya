import { useState } from "react";

function CustomerBooking({ onBack, onSelectWorker }) {
  const [search, setSearch] = useState("");
  const [service, setService] = useState("All");
  const [selectedWorker, setSelectedWorker] = useState(null);

  const workers = [
    {
      id: 1,
      name: "Rahul Verma",
      skill: "Electrician",
      experience: "6 years",
      rating: "4.9",
      jobs: "120+",
      distance: "2.4 km",
      icon: "⚡",
      description:
        "Experienced electrician for home wiring, repairs and installations.",
    },
    {
      id: 2,
      name: "Amit Sharma",
      skill: "Plumber",
      experience: "5 years",
      rating: "4.8",
      jobs: "95+",
      distance: "3.1 km",
      icon: "🔧",
      description:
        "Reliable plumber for leakage, pipe fitting and bathroom work.",
    },
    {
      id: 3,
      name: "Vikas Patel",
      skill: "Carpenter",
      experience: "8 years",
      rating: "4.9",
      jobs: "150+",
      distance: "4.2 km",
      icon: "🪚",
      description:
        "Skilled carpenter for furniture, doors and woodwork.",
    },
    {
      id: 4,
      name: "Rohit Singh",
      skill: "Painter",
      experience: "4 years",
      rating: "4.7",
      jobs: "80+",
      distance: "5.0 km",
      icon: "🎨",
      description:
        "Professional painter for interior and exterior painting.",
    },
    {
      id: 5,
      name: "Suresh Yadav",
      skill: "Mason",
      experience: "7 years",
      rating: "4.8",
      jobs: "110+",
      distance: "5.8 km",
      icon: "🧱",
      description:
        "Experienced mason for construction and repair work.",
    },
  ];

  const services = [
    "All",
    "Electrician",
    "Plumber",
    "Carpenter",
    "Painter",
    "Mason",
  ];

  const filteredWorkers = workers.filter((worker) => {
    const matchesService =
      service === "All" || worker.skill === service;

    const searchText = search.toLowerCase();

    const matchesSearch =
      worker.name.toLowerCase().includes(searchText) ||
      worker.skill.toLowerCase().includes(searchText);

    return matchesService && matchesSearch;
  });

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

      {/* HEADER */}
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


      {/* HERO */}
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

            {/* SEARCH */}
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


      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 pt-10">

        <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
          Explore services
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Choose a service
        </h2>

        <div className="mt-5 flex gap-3 overflow-x-auto pb-3">

          {services.map((item) => (

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


      {/* WORKERS */}
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
              Select a worker to continue with your service.
            </p>

          </div>

          <span className="hidden rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 sm:block">
            {filteredWorkers.length} available
          </span>

        </div>


        {filteredWorkers.length > 0 ? (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {filteredWorkers.map((worker) => (

              <div
                key={worker.id}
                className="group rounded-3xl border border-amber-100 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-2xl"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF1E6] text-3xl transition duration-300 group-hover:scale-110">
                    {worker.icon}
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    ● Available
                  </span>

                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {worker.name}
                </h3>

                <p className="mt-1 font-semibold text-amber-700">
                  {worker.skill}
                </p>

                <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-500">
                  {worker.description}
                </p>

                <div className="mt-5 space-y-3">

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Experience
                    </span>

                    <span className="font-semibold text-slate-700">
                      {worker.experience}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Rating
                    </span>

                    <span className="font-semibold text-slate-700">
                      ⭐ {worker.rating}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Completed
                    </span>

                    <span className="font-semibold text-slate-700">
                      {worker.jobs}
                    </span>
                  </div>

                </div>

                <div className="mt-5 rounded-xl bg-[#FFF8F3] px-3 py-2 text-sm font-medium text-slate-600">
                  📍 {worker.distance} away
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectWorker(worker)}
                  className="mt-5 w-full rounded-xl bg-amber-600 px-4 py-3.5 font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-lg active:translate-y-0"
                >
                  Select Worker →
                </button>

              </div>

            ))}

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
              Try another service or search for a different worker.
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


      {/* INFO */}
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
                  Choose workers based on their experience and ratings.
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
                  Compare previous work and customer ratings.
                </p>
              </div>

            </div>


            <div className="flex gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-xl">
                📍
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Nearby workers
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Find professionals available close to you.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-amber-100 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-8 text-center">

          <p className="text-sm text-slate-400">
            Trusted workers. Better connections. Stronger communities.
          </p>

        </div>

      </footer>


      {/* CONFIRMATION POPUP */}
      {selectedWorker && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-5 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl border border-amber-100 bg-white p-7 shadow-2xl">

            <div className="text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF1E6] text-3xl">
                {selectedWorker.icon}
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-amber-700">
                Confirm Worker
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Select {selectedWorker.name}?
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                You are about to request this worker for your service.
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
                    {selectedWorker.skill}
                  </p>
                </div>

                <div className="text-right">

                  <p className="text-sm font-bold text-slate-700">
                    ⭐ {selectedWorker.rating}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedWorker.distance}
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