import { motion } from "motion/react";

function Login({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  setPage,
  loginError,
}) {
  const hasError = Boolean(loginError);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090f] px-4 py-10">
      {/* Background glow */}
      <motion.div
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl"
        animate={{
          x: [0, 80, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl"
        animate={{
          x: [0, -70, 0],
          y: [0, -50, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto flex h-20 w-20 items-center justify-center"
          >
            <img
              src="/money-icon.png"
              alt="FinTrack"
              className="h-16 w-16 object-contain"
            />
          </motion.div>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-white">
            FinTrack
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Track your personal expenses
          </p>
        </div>

        {/* Login card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 shadow-2xl backdrop-blur-2xl sm:p-10"
        >
          <h2 className="text-3xl font-black tracking-tight text-white">
            Welcome back
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Sign in to manage your finances.
          </p>

          <form onSubmit={handleLogin} className="mt-8">
            {/* Username */}
            <div className="relative mb-6">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" "
                className={`peer w-full rounded-xl border bg-black/20 px-4 pb-3 pt-5 text-white outline-none transition duration-300 ${
                  hasError
                    ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                    : "border-white/10 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
                }`}
              />
<label
  className={`pointer-events-none absolute left-4 bg-[#14131c] px-1 text-sm transition-all duration-200 ${
    username
      ? "top-0 -translate-y-1/2 text-xs"
      : "top-1/2 -translate-y-1/2 text-slate-400 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs"
  } ${
    hasError
      ? "text-red-400"
      : "peer-focus:text-violet-400"
  }`}
>
  Enter Username*
</label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                className={`peer w-full rounded-xl border bg-black/20 px-4 pb-3 pt-5 text-white outline-none transition duration-300 ${
                  hasError
                    ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                    : "border-white/10 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
                }`}
              />
<label
  className={`pointer-events-none absolute left-4 bg-[#14131c] px-1 text-sm transition-all duration-200 ${
    password
      ? "top-0 -translate-y-1/2 text-xs"
      : "top-1/2 -translate-y-1/2 text-slate-400 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs"
  } ${
    hasError
      ? "text-red-400"
      : "peer-focus:text-violet-400"
  }`}
>
  Enter Password*
</label>
            </div>

            {/* Error */}
            {loginError && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm font-medium text-red-400"
              >
                {loginError}
              </motion.p>
            )}

            {/* Sign in */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 font-bold text-white shadow-lg"
            >
              Sign in →
            </motion.button>
          </form>

          {/* Register */}
          <p className="mt-7 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setPage("register");
              }}
              className="font-bold text-violet-400 transition hover:text-fuchsia-400"
            >
              Register
            </button>
          </p>
        </motion.div>

        <p className="mt-6 text-center text-xs text-slate-600">
          Manage smarter. Spend better. ✦
        </p>
      </motion.div>
    </div>
  );
}
export default Login;