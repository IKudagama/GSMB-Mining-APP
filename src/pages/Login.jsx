import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { useLang } from "../context/LangContext.jsx";
import {
  FaShieldAlt,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function Login() {
  const { t } = useLang();
  const { login } = useApp();
  const [username, setUsername] = useState("police1");
  const [password, setPassword] = useState("police123");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const routeByRole = (roleGuess) => {
    const role = (roleGuess || "").toLowerCase();
    const map = { police: "/police", gsmb: "/gsmb", owner: "/owner", admin: "/gsmb" };
    return map[role] || "/";
  };

  const fallbackRoleFromUsername = (u) =>
    u?.toLowerCase().startsWith("police")
      ? "police"
      : u?.toLowerCase().startsWith("gsmb")
      ? "gsmb"
      : "owner";

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const user = await login(username, password);
      const role = user?.role || fallbackRoleFromUsername(username);
      nav(routeByRole(role), { replace: true });
    } catch {
      setErr(t("login.invalidCreds"));
    } finally {
      setLoading(false);
    }
  };

  const quickFill = (u, p) => {
    setUsername(u);
    setPassword(p);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      {/* Animated background elements (emerald/cyan) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/20 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
        {/* Main card */}
        <div className="w-full max-w-md">
          {/* Glass card */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl overflow-hidden relative">
            {/* Header */}
            <div className="px-8 pt-8 pb-6 text-center relative">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-600/90 to-cyan-600/90 shadow-lg shadow-emerald-500/25 mb-6 relative">
                <FaShieldAlt className="text-white text-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/50 to-cyan-500/50 rounded-2xl blur-xl" />
              </div>

              <h1 className="text-3xl font-bold text-white mb-2">
                {t("login.title")}
              </h1>
              <p className="text-white/70 text-sm">
                {t("login.subtitle") || "Sign in to continue"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="px-8 pb-8 space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <label className="text-white/90 text-sm font-medium">
                  {t("login.username")}
                </label>
                <div className="relative group">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-emerald-400 transition-colors duration-200" />
                  <input
                    className="w-full bg-white/5 border border-white/15 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 backdrop-blur-xl"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t("login.username")}
                    autoComplete="username"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-white/90 text-sm font-medium">
                  {t("login.password")}
                </label>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-emerald-400 transition-colors duration-200" />
                  <input
                    className="w-full bg-white/5 border border-white/15 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 backdrop-blur-xl"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("login.password")}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200 p-1"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />
                </div>
              </div>

              {/* Error */}
              {err && (
                <div className="flex items-start gap-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 px-4 py-3 text-rose-300 text-sm backdrop-blur-xl">
                  <span className="text-rose-400 mt-0.5">⚠️</span>
                  <span>{err}</span>
                </div>
              )}

              {/* Submit */}
              <button
                className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-6 py-4 font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center gap-2">
                  <FaSignInAlt className={loading ? "animate-spin" : ""} />
                  {loading ? t("login.loading") || "Signing in..." : t("login.loginBtn")}
                </div>
              </button>

              {/* Demo chips */}
              <div className="pt-4 space-y-3">
                <p className="text-white/60 text-xs text-center">{t("login.demo")}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    type="button"
                    className="group inline-flex items-center gap-2 rounded-full bg-sky-500/20 border border-sky-400/30 px-4 py-2 text-xs font-medium text-sky-200 hover:bg-sky-500/30 hover:border-sky-400/50 transition-all duration-200 backdrop-blur-xl"
                    onClick={() => quickFill("police1", "police123")}
                  >
                    <FaCheckCircle className="opacity-80 group-hover:opacity-100 transition-opacity" />
                    {t("login.police")} demo
                  </button>
                  <button
                    type="button"
                    className="group inline-flex items-center gap-2 rounded-full bg-cyan-500/20 border border-cyan-400/30 px-4 py-2 text-xs font-medium text-cyan-200 hover:bg-cyan-500/30 hover:border-cyan-400/50 transition-all duration-200 backdrop-blur-xl"
                    onClick={() => quickFill("gsmb1", "gsmb123")}
                  >
                    <FaCheckCircle className="opacity-80 group-hover:opacity-100 transition-opacity" />
                    {t("login.gsmb")} demo
                  </button>
                  <button
                    type="button"
                    className="group inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-4 py-2 text-xs font-medium text-emerald-200 hover:bg-emerald-500/30 hover:border-emerald-400/50 transition-all duration-200 backdrop-blur-xl"
                    onClick={() => quickFill("owner1", "owner123")}
                  >
                    <FaCheckCircle className="opacity-80 group-hover:opacity-100 transition-opacity" />
                    {t("login.owner")} demo
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Subtle floating accents */}
          <div className="absolute -top-8 -right-8 w-16 h-16 bg-emerald-500/20 rounded-full blur-2xl animate-bounce delay-700" />
          <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-cyan-500/20 rounded-full blur-xl animate-bounce delay-1000" />
        </div>
      </div>
    </div>
  );
}
