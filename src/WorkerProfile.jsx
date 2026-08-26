import { useState } from "react";
function WorkerProfile() {
    const [isAvailable, setIsAvailable] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-sm">
        
        <h1 className="text-3xl font-bold text-slate-900">
          Create Worker Profile
        </h1>

        <p className="mt-2 text-slate-600">
          Add your details to create your worker profile.
        </p>
        <form className="mt-8 space-y-5">

  <div>
    <label className="block text-sm font-medium text-slate-700">
      Full Name
    </label>
    <input
      type="text"
      placeholder="Enter your full name"
      className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-slate-700">
      Phone Number
    </label>
    <input
      type="tel"
      placeholder="Enter your phone number"
      className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-slate-700">
      Location
    </label>
    <input
      type="text"
      placeholder="Enter your location"
      className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
    />
  </div>
  <div>
  <label className="block text-sm font-medium text-slate-700">
    Skills
  </label>

  <input
    type="text"
    placeholder="e.g. Plumbing, Electrical, Carpentry"
    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
  />
</div>

<div>
  <label className="block text-sm font-medium text-slate-700">
    Experience
  </label>

  <input
    type="number"
    placeholder="Years of experience"
    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
  />
</div>
<div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
  <div>
    <h2 className="font-semibold text-slate-800">
      Become Available
    </h2>

    <p className="text-sm text-slate-500">
      Let employers know that you are available for work.
    </p>
  </div>
<button
  type="button"
  onClick={() => setIsAvailable(!isAvailable)}
  className={`h-6 w-11 rounded-full ${
    isAvailable ? "bg-green-500" : "bg-slate-300"
  }`}
>
</button>
  
</div>

</form>

      </div>
    </div>
  );
}

export default WorkerProfile;
