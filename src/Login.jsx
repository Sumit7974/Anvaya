import { useEffect, useState } from "react";

function Login({ role, onSuccess, onBack }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [success, setSuccess] = useState(false);

  const isWorker = role === "worker";
  const isCustomer = role === "customer";
  const isContractor = role === "contractor";

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (isContractor) {
      if (!fullName.trim()) {
        setError("Please enter your full name.");
        return;
      }

      if (!phone.trim()) {
        setError("Please enter your phone number.");
        return;
      }

      if (phone.trim().length < 10) {
        setError("Please enter a valid phone number.");
        return;
      }

      if (!businessName.trim()) {
        setError("Please enter your business name.");
        return;
      }

      if (!location.trim()) {
        setError("Please enter your location.");
        return;
      }

      if (!service) {
        setError("Please select your primary service.");
        return;
      }

      if (!password.trim()) {
        setError("Please enter your password.");
        return;
      }
    } else {
      if (!phone.trim()) {
        setError("Please enter your phone number.");
        return;
      }

      if (phone.trim().length < 10) {
        setError("Please enter a valid phone number.");
        return;
      }

      if (!password.trim()) {
        setError("Please enter your password.");
        return;
      }
    }

    setLoggingIn(true);

    setTimeout(() => {
      setLoggingIn(false);
      setSuccess(true);
    }, 900);
  };

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      onSuccess();
    }, 2200);

    return () => clearTimeout(timer);
  }, [success, onSuccess]);

  const getRoleTitle = () => {
    if (isWorker) return "Worker Access";
    if (isCustomer) return "Customer Access";
    if (isContractor) return "Contractor Access";

    return "Anvaya Access";
  };

  const getAccountTitle = () => {
    if (isWorker) return "Worker account";
    if (isCustomer) return "Customer account";
    if (isContractor) return "Contractor account";

    return "Anvaya account";
  };

  const getDescription = () => {
    if (isWorker) {
      return "Sign in to manage your professional profile, availability and opportunities.";
    }

    if (isContractor) {
      return "Create your contractor profile, manage projects and build your professional team.";
    }

    return "Sign in to discover trusted professionals and find the right help for your needs.";
  };

  return (
    <main className="min-h-screen w-full bg-[#FFF8F3] px-4 py-5 text-slate-800 sm:px-6 sm:py-7 lg:px-8">

      {/* BACK BUTTON */}

      <div className="mx-auto flex w-full max-w-[1500px] justify-end">

        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-md transition-all duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-lg active:scale-95"
        >
          <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>

          <span>Back</span>
        </button>

      </div>


      {/* MAIN CONTAINER */}

      <div className="mx-auto flex w-full max-w-[1500px] items-center justify-center py-5 sm:py-8 lg:min-h-[calc(100vh-100px)] lg:py-8">

        <div
          className="
            grid
            w-full
            overflow-hidden
            rounded-[1.75rem]
            border
            border-amber-100
            bg-white
            shadow-2xl
            sm:rounded-[2rem]
            lg:grid-cols-2
          "
        >

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <section
            className="
              relative
              flex
              flex-col
              justify-center
              overflow-hidden
              bg-[#FFF1E6]
              px-6
              py-10
              sm:px-10
              sm:py-12
              md:px-14
              lg:min-h-[680px]
              lg:px-[clamp(2.5rem,5vw,5rem)]
              lg:py-14
              xl:min-h-[720px]
            "
          >

            {/* Decorative background */}

            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/50" />

            <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-amber-100/40" />


            <div className="relative z-10">

              {/* LOGO */}

              <img
                src="/anvaya-logo.png"
                alt="Anvaya"
                className="
                  mb-7
                  h-14
                  w-auto
                  object-contain
                  object-left
                  sm:mb-8
                  sm:h-16
                  md:h-[4.5rem]
                  lg:h-[5rem]
                  xl:h-[5.5rem]
                "
              />


              {/* ROLE BADGE */}

              <div className="flex w-fit items-center rounded-full border border-amber-200 bg-white px-3.5 py-2 text-xs font-bold text-amber-700 shadow-sm sm:px-4 sm:text-sm">
                {getRoleTitle()}
              </div>


              {/* HEADING */}

              <h1
                className="
                  mt-5
                  max-w-2xl
                  text-[clamp(2rem,4vw,3.75rem)]
                  font-bold
                  leading-[1.08]
                  tracking-tight
                  text-slate-900
                  sm:mt-6
                "
              >
                Welcome to{" "}
                <span className="text-amber-600">
                  Anvaya.
                </span>
              </h1>


              {/* DESCRIPTION */}

              <p
                className="
                  mt-4
                  max-w-xl
                  text-[clamp(0.9rem,1.4vw,1.125rem)]
                  leading-7
                  text-slate-600
                  sm:mt-5
                "
              >
                {getDescription()}
              </p>


              {/* BENEFITS */}

              <div className="mt-7 space-y-3 sm:mt-8 sm:space-y-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm sm:h-10 sm:w-10">
                    ✓
                  </div>

                  <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                    Trusted Anvaya community
                  </span>

                </div>


                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm sm:h-10 sm:w-10">
                    ⚡
                  </div>

                  <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                    Quick and simple access
                  </span>

                </div>


                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm sm:h-10 sm:w-10">
                    🔒
                  </div>

                  <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                    Secure account experience
                  </span>

                </div>


                {isContractor && (
                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-orange-600 shadow-sm sm:h-10 sm:w-10">
                      🏗️
                    </div>

                    <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                      Manage projects and teams
                    </span>

                  </div>
                )}

              </div>

            </div>

          </section>


          {/* =====================================================
              RIGHT SIDE
          ===================================================== */}

          <section
            className="
              flex
              items-center
              justify-center
              px-5
              py-10
              sm:px-10
              sm:py-12
              md:px-14
              lg:px-[clamp(2.5rem,5vw,5rem)]
              lg:py-14
            "
          >

            {!success ? (

              <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl"
              >

                {/* FORM HEADING */}

                <div className="mb-7 sm:mb-8">

                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700 sm:text-sm">
                    {isContractor
                      ? "Contractor Registration"
                      : "Sign In"}
                  </p>

                  <h2
                    className="
                      mt-2
                      text-[clamp(1.75rem,3vw,2.5rem)]
                      font-bold
                      leading-tight
                      text-slate-900
                    "
                  >
                    {getAccountTitle()}
                  </h2>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
                    {isContractor
                      ? "Enter your professional details to continue."
                      : "Enter your account details to continue."}
                  </p>

                </div>


                {/* =================================================
                    CONTRACTOR DETAILS
                ================================================= */}

                {isContractor && (
                  <div className="space-y-5">

                    {/* FULL NAME */}

                    <div>

                      <label
                        htmlFor="full-name"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Full Name
                      </label>

                      <input
                        id="full-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          setError("");
                        }}
                        placeholder="Enter your full name"
                        className="
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-[#FFFDFC]
                          px-4
                          py-3.5
                          text-sm
                          text-slate-800
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-slate-400
                          hover:border-amber-300
                          focus:border-amber-400
                          focus:ring-4
                          focus:ring-amber-100
                        "
                      />

                    </div>


                    {/* BUSINESS NAME */}

                    <div>

                      <label
                        htmlFor="business-name"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Business / Company Name
                      </label>

                      <input
                        id="business-name"
                        type="text"
                        value={businessName}
                        onChange={(e) => {
                          setBusinessName(e.target.value);
                          setError("");
                        }}
                        placeholder="Example: Sharma Construction"
                        className="
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-[#FFFDFC]
                          px-4
                          py-3.5
                          text-sm
                          text-slate-800
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-slate-400
                          hover:border-amber-300
                          focus:border-amber-400
                          focus:ring-4
                          focus:ring-amber-100
                        "
                      />

                    </div>


                    {/* PHONE + LOCATION */}

                    <div className="grid gap-5 sm:grid-cols-2">

                      <div>

                        <label
                          htmlFor="contractor-phone"
                          className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                          Phone Number
                        </label>

                        <input
                          id="contractor-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            setError("");
                          }}
                          placeholder="Phone number"
                          className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            bg-[#FFFDFC]
                            px-4
                            py-3.5
                            text-sm
                            text-slate-800
                            outline-none
                            transition-all
                            duration-300
                            placeholder:text-slate-400
                            hover:border-amber-300
                            focus:border-amber-400
                            focus:ring-4
                            focus:ring-amber-100
                          "
                        />

                      </div>


                      <div>

                        <label
                          htmlFor="contractor-location"
                          className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                          Location
                        </label>

                        <input
                          id="contractor-location"
                          type="text"
                          value={location}
                          onChange={(e) => {
                            setLocation(e.target.value);
                            setError("");
                          }}
                          placeholder="City / area"
                          className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            bg-[#FFFDFC]
                            px-4
                            py-3.5
                            text-sm
                            text-slate-800
                            outline-none
                            transition-all
                            duration-300
                            placeholder:text-slate-400
                            hover:border-amber-300
                            focus:border-amber-400
                            focus:ring-4
                            focus:ring-amber-100
                          "
                        />

                      </div>

                    </div>


                    {/* SERVICE */}

                    <div>

                      <label
                        htmlFor="service"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Primary Service
                      </label>

                      <select
                        id="service"
                        value={service}
                        onChange={(e) => {
                          setService(e.target.value);
                          setError("");
                        }}
                        className="
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          px-4
                          py-3.5
                          text-sm
                          text-slate-800
                          outline-none
                          transition-all
                          duration-300
                          hover:border-amber-300
                          focus:border-amber-400
                          focus:ring-4
                          focus:ring-amber-100
                        "
                      >

                        <option value="">
                          Select your primary service
                        </option>

                        <option value="Construction">
                          🏗️ Construction
                        </option>

                        <option value="Electrical">
                          ⚡ Electrical
                        </option>

                        <option value="Plumbing">
                          🔧 Plumbing
                        </option>

                        <option value="Carpentry">
                          🪚 Carpentry
                        </option>

                        <option value="Painting">
                          🎨 Painting
                        </option>

                        <option value="Renovation">
                          🏠 Renovation
                        </option>

                        <option value="Other">
                          🛠️ Other
                        </option>

                      </select>

                    </div>

                  </div>
                )}


                {/* =================================================
                    PHONE — WORKER / CUSTOMER
                ================================================= */}

                {!isContractor && (
                  <div className="mb-5">

                    <label
                      htmlFor="login-phone"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Phone Number
                    </label>

                    <input
                      id="login-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter your phone number"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-[#FFFDFC]
                        px-4
                        py-3.5
                        text-sm
                        text-slate-800
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-slate-400
                        hover:border-amber-300
                        focus:border-amber-400
                        focus:ring-4
                        focus:ring-amber-100
                      "
                    />

                  </div>
                )}


                {/* =================================================
                    PASSWORD
                ================================================= */}

                <div className="mt-5">

                  <label
                    htmlFor="login-password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter your password"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-[#FFFDFC]
                        px-4
                        py-3.5
                        pr-20
                        text-sm
                        text-slate-800
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-slate-400
                        hover:border-amber-300
                        focus:border-amber-400
                        focus:ring-4
                        focus:ring-amber-100
                      "
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        rounded-lg
                        px-2
                        py-1
                        text-xs
                        font-bold
                        text-slate-500
                        transition
                        hover:bg-amber-50
                        hover:text-amber-700
                      "
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                </div>


                {/* ERROR */}

                {error && (
                  <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-600">
                    {error}
                  </div>
                )}


                {/* SUBMIT BUTTON */}

                <button
                  type="submit"
                  disabled={loggingIn}
                  className="
                    group
                    mt-6
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    bg-amber-600
                    px-6
                    py-3.5
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-amber-700
                    hover:shadow-xl
                    sm:py-4
                    sm:text-base
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                >

                  {loggingIn ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                      <span>
                        {isContractor
                          ? "Creating your workspace..."
                          : "Signing you in..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {isContractor
                          ? "Continue to Dashboard"
                          : "Login to Anvaya"}
                      </span>

                      <span className="transition-transform duration-300 group-hover:translate-x-2">
                        →
                      </span>
                    </>
                  )}

                </button>


                {/* NOTE */}

                <p className="mt-5 text-center text-xs leading-5 text-slate-400">
                  {isContractor
                    ? "Your professional details will be used to set up your contractor workspace."
                    : "Demo authentication is active for this frontend."}
                </p>

              </form>

            ) : (

              /* =================================================
                 SUCCESS SCREEN
              ================================================= */

              <div className="flex w-full max-w-xl flex-col items-center justify-center py-8 text-center sm:py-10">

                <div className="relative">

                  <div
                    className="
                      flex
                      h-24
                      w-24
                      items-center
                      justify-center
                      rounded-full
                      bg-emerald-50
                      text-5xl
                      text-emerald-600
                      shadow-xl
                      shadow-emerald-100
                      sm:h-28
                      sm:w-28
                      sm:text-6xl
                    "
                  >
                    ✓
                  </div>

                  <div className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-md sm:h-10 sm:w-10 sm:text-xl">
                    ✨
                  </div>

                </div>


                <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 sm:mt-8 sm:text-sm">
                  {isContractor
                    ? "Profile Created"
                    : "Login Successful"}
                </p>


                <h2
                  className="
                    mt-3
                    max-w-xl
                    text-[clamp(1.8rem,3vw,2.5rem)]
                    font-bold
                    leading-tight
                    text-slate-900
                  "
                >
                  {isContractor
                    ? "Welcome, Contractor! 🎉"
                    : "You're successfully logged in! 🎉"}
                </h2>


                <p className="mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
                  {isContractor
                    ? "Your contractor workspace is ready. We're taking you to your dashboard."
                    : "Welcome to Anvaya. Your account has been successfully verified and we're getting everything ready for you."}
                </p>


                <div className="mt-6 rounded-full border border-emerald-100 bg-emerald-50 px-5 py-2.5 text-xs font-bold text-emerald-700 sm:px-6 sm:py-3 sm:text-sm">
                  ✓{" "}
                  {isWorker
                    ? "Worker"
                    : isCustomer
                    ? "Customer"
                    : "Contractor"}{" "}
                  account verified
                </div>


                <div className="mt-6 h-1.5 w-40 overflow-hidden rounded-full bg-emerald-100 sm:mt-7 sm:w-48">
                  <div className="h-full w-full animate-pulse rounded-full bg-emerald-500" />
                </div>


                <p className="mt-4 text-xs font-medium text-slate-400">
                  Taking you to your dashboard...
                </p>

              </div>

            )}

          </section>

        </div>

      </div>

    </main>
  );
}

export default Login;