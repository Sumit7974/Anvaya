import { useEffect, useState } from "react";

import { apiRequest, saveAuth } from "./api/client";

function Login({ role, onSuccess, onBack }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
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
  const isAdmin = role === "admin";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!role) {
      setError("Please select an account type.");
      return;
    }

    // ============================================
    // CONTRACTOR REGISTRATION
    // ============================================

    if (isContractor) {
      if (!fullName.trim()) {
        setError("Please enter your full name.");
        return;
      }

      if (!email.trim()) {
        setError("Please enter your email address.");
        return;
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email address.");
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

      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }

      setLoggingIn(true);

      try {
        const data = await apiRequest(
          "/api/auth/contractor/register",
          {
            method: "POST",
            body: {
              name: fullName.trim(),
              email: email.trim().toLowerCase(),
              phone: phone.trim(),
              password,
              companyName: businessName.trim(),
              location: location.trim(),
              service
            }
          }
        );

        saveAuth(data);

        setLoggingIn(false);
        setSuccess(true);
      } catch (requestError) {
        setLoggingIn(false);

        setError(
          requestError.message ||
            "Registration failed. Please try again."
        );
      }

      return;
    }

    // ============================================
    // CUSTOMER / WORKER / ADMIN LOGIN
    // ============================================

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setLoggingIn(true);

    try {
      const data = await apiRequest(
        `/api/auth/${role}/login`,
        {
          method: "POST",
          body: {
            email: email.trim().toLowerCase(),
            password
          }
        }
      );

      saveAuth(data);

      setLoggingIn(false);
      setSuccess(true);
    } catch (requestError) {
      setLoggingIn(false);

      setError(
        requestError.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  useEffect(() => {
    if (!success) {
      return undefined;
    }

    const timer = setTimeout(() => {
      onSuccess();
    }, 1200);

    return () => clearTimeout(timer);
  }, [success, onSuccess]);

  const getRoleTitle = () => {
    if (isWorker) return "Worker Access";
    if (isCustomer) return "Customer Access";
    if (isContractor) return "Contractor Registration";
    if (isAdmin) return "Admin Access";

    return "Anvaya Access";
  };

  const getAccountTitle = () => {
    if (isWorker) return "Worker account";
    if (isCustomer) return "Customer account";
    if (isContractor) return "Contractor account";
    if (isAdmin) return "Admin account";

    return "Anvaya account";
  };

  const getDescription = () => {
    if (isWorker) {
      return "Sign in to manage your professional profile, availability and opportunities.";
    }

    if (isContractor) {
      return "Create your contractor profile, manage projects and build your professional team.";
    }

    if (isAdmin) {
      return "Sign in to manage worker verification, platform operations and administration.";
    }

    return "Sign in to discover trusted professionals and find the right help for your needs.";
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3] px-5 py-7 text-slate-800 sm:px-8">
      <button
        type="button"
        onClick={onBack}
        className="fixed right-5 top-5 z-50 flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-md transition-all duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-lg"
      >
        <span className="text-lg">←</span>
        <span>Back</span>
      </button>

      <div className="mx-auto flex min-h-[90vh] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-amber-100 bg-white shadow-2xl lg:grid-cols-2">

          {/* LEFT SIDE */}
          <section className="flex flex-col justify-center bg-[#FFF1E6] px-7 py-12 sm:px-12 lg:px-14">
            <img
              src="/anvaya-logo.png"
              alt="Anvaya"
              className="mb-8 h-20 w-auto object-contain object-left"
            />

            <div className="flex w-fit items-center rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700 shadow-sm">
              {getRoleTitle()}
            </div>

            <h1 className="mt-6 max-w-xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Welcome to{" "}
              <span className="text-amber-600">Anvaya.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              {getDescription()}
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                  ✓
                </div>

                <span className="text-sm font-semibold text-slate-700">
                  Trusted Anvaya community
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
                  ⚡
                </div>

                <span className="text-sm font-semibold text-slate-700">
                  Quick and simple access
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm">
                  🔒
                </div>

                <span className="text-sm font-semibold text-slate-700">
                  Secure account experience
                </span>
              </div>

              {isContractor && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-600 shadow-sm">
                    🏗️
                  </div>

                  <span className="text-sm font-semibold text-slate-700">
                    Manage projects and teams
                  </span>
                </div>
              )}

              {isAdmin && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                    🛡️
                  </div>

                  <span className="text-sm font-semibold text-slate-700">
                    Secure platform administration
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* RIGHT SIDE */}
          <section className="flex items-center justify-center px-7 py-12 sm:px-12">
            {!success ? (
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md"
              >
                <div className="mb-8">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">
                    {isContractor ? "Contractor Registration" : "Sign In"}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    {getAccountTitle()}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {isContractor
                      ? "Enter your professional details to create your account."
                      : "Enter your account details to continue."}
                  </p>
                </div>

                {/* CONTRACTOR DETAILS */}
                {isContractor && (
                  <>
                    <div className="mb-5">
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
                        autoComplete="name"
                        className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="contractor-email"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Email Address
                      </label>

                      <input
                        id="contractor-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        placeholder="Enter your email address"
                        autoComplete="email"
                        className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                      />
                    </div>

                    <div className="mb-5">
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
                        className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="mb-5">
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
                          autoComplete="tel"
                          className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                        />
                      </div>

                      <div className="mb-5">
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
                          className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                        />
                      </div>
                    </div>

                    <div className="mb-5">
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
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
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
                  </>
                )}

                {/* LOGIN EMAIL */}
                {!isContractor && (
                  <div className="mb-5">
                    <label
                      htmlFor="login-email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter your email address"
                      autoComplete="email"
                      className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                    />
                  </div>
                )}

                {/* PASSWORD */}
                <div className="mb-5">
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
                      autoComplete={
                        isContractor
                          ? "new-password"
                          : "current-password"
                      }
                      className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 pr-20 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((current) => !current)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-bold text-slate-500 transition hover:bg-amber-50 hover:text-amber-700"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* ERROR */}
                {error && (
                  <div
                    role="alert"
                    className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-600"
                  >
                    {error}
                  </div>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loggingIn}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-amber-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loggingIn ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                      <span>
                        {isContractor
                          ? "Creating your account..."
                          : "Signing you in..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {isContractor
                          ? "Create Contractor Account"
                          : "Login to Anvaya"}
                      </span>

                      <span className="transition-transform duration-300 group-hover:translate-x-2">
                        →
                      </span>
                    </>
                  )}
                </button>

                <p className="mt-5 text-center text-xs leading-5 text-slate-400">
                  {isContractor
                    ? "Your professional details are securely submitted to Anvaya."
                    : "Your login is protected by server-side authentication and rate limiting."}
                </p>
              </form>
            ) : (
              <div className="flex w-full max-w-md flex-col items-center justify-center py-10 text-center">
                <div className="relative">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-50 text-6xl text-emerald-600 shadow-xl shadow-emerald-100">
                    ✓
                  </div>

                  <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-md">
                    ✨
                  </div>
                </div>

                <p className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-emerald-600">
                  {isContractor
                    ? "Registration Successful"
                    : "Login Successful"}
                </p>

                <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                  {isContractor
                    ? "Welcome to Anvaya! 🎉"
                    : "You're successfully logged in! 🎉"}
                </h2>

                <p className="mt-4 max-w-md text-base leading-7 text-slate-500">
                  {isContractor
                    ? "Your contractor account has been created and we're taking you to your dashboard."
                    : "Authentication succeeded. We're taking you to your dashboard."}
                </p>

                <div className="mt-7 rounded-full border border-emerald-100 bg-emerald-50 px-6 py-3 text-sm font-bold text-emerald-700">
                  ✓{" "}
                  {isWorker
                    ? "Worker"
                    : isCustomer
                    ? "Customer"
                    : isAdmin
                    ? "Admin"
                    : "Contractor"}{" "}
                  account authenticated
                </div>

                <div className="mt-7 h-1.5 w-48 overflow-hidden rounded-full bg-emerald-100">
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