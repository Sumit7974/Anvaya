import WorkerProfile from "./WorkerProfile";
// function App() {
//   return (
//     <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center px-6">
      
//       <h1 className="text-5xl font-bold text-blue-700">
//         Anvaya
//       </h1>

//       <h2 className="mt-4 text-2xl font-semibold text-slate-800">
//         Connect. Collaborate. Grow.
//       </h2>

//       <p className="mt-4 max-w-xl text-lg text-slate-600">
//         A platform designed to connect people, ideas and opportunities.
//       </p>

//       <button className="btn-primary mt-8">
//         Get Started
//       </button>

//     </main>
//   );
// }

// export default App;
function App() {
  return (
    <main className="min-h-screen bg-[#FFF1E6] text-slate-900">
      
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-5">
        <h1 className="text-2xl font-bold tracking-tight text-amber-700">
          Anvaya
        </h1>

        <button className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-white">
          I'm a Worker
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 text-center">
        <img
  src="/anvaya-logo.png"
  alt="Anvaya"
 className="h-50 w-auto object-contain"
  
/>
        
        <span className="mb-4 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
          Trusted Local Workers
        </span>

        <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Find Trusted Workers Near You
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Connect with verified electricians, plumbers, carpenters,
          painters, masons and other skilled workers in your area.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-lg bg-amber-600 px-7 py-3 font-semibold text-white hover:bg-amber-700">
            Find a Worker
          </button>

          <button className="rounded-lg border border-slate-300 bg-white px-7 py-3 font-semibold text-slate-700 hover:bg-slate-50">
            Become a Worker
          </button>
        </div>

        {/* Key Benefits */}
        <div className="mt-14 flex flex-wrap justify-center gap-8 text-sm text-slate-600">
          <span>✓ Verified Workers</span>
          <span>✓ Nearby Matching</span>
          <span>✓ Ratings & Reviews</span>
          <span>✓ Flexible Work</span>
        </div>

      </section>
    </main>
  );
}

export default App;

