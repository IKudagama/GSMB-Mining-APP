import { useState } from "react";

// Mock components and hooks for demonstration
const Link = ({ to, className, onClick, children }) => (
  <a href={to} className={className} onClick={onClick}>{children}</a>
);

const NavLink = ({ to, className, onClick, children, end }) => (
  <a href={to} className={className({ isActive: false })} onClick={onClick}>{children}</a>
);

const useNavigate = () => (path) => console.log(`Navigating to: ${path}`);

const useApp = () => ({
  user: { role: 'police', name: 'John Doe' }, // Mock user
  logout: () => console.log('Logging out')
});

const useLang = () => ({
  t: (key) => {
    const translations = {
      'tagline': 'Mining Portal',
      'nav.public': 'Public Portal',
      'nav.login': 'Login',
      'nav.police': 'Police Dashboard',
      'nav.gsmb': 'GSMB Portal',
      'nav.owner': 'Owner Portal',
      'nav.logout': 'Logout',
      'nav.language': 'Language'
    };
    return translations[key] || key;
  }
});

const LanguageSwitcher = ({ compact }) => (
  <select className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
    <option value="en" className="text-black">EN</option>
    <option value="si" className="text-black">සි</option>
    <option value="ta" className="text-black">த</option>
  </select>
);

// Mock icons
const FaBars = () => <span className="text-lg">☰</span>;
const FaTimes = () => <span className="text-lg">✕</span>;
const FaHome = ({ className }) => <span className={className}>🏠</span>;
const FaSignInAlt = ({ className }) => <span className={className}>🔑</span>;
const FaSignOutAlt = ({ className }) => <span className={className}>🚪</span>;
const FaUserShield = ({ className }) => <span className={className}>🛡️</span>;
const FaTruck = ({ className }) => <span className={className}>🚛</span>;
const FaUser = ({ className }) => <span className={className}>👤</span>;

export default function Navbar() {
  const { user, logout } = useApp();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isAuthed = !!user;
  const role = (user?.role || "").toLowerCase();
  const displayName = user?.name || user?.email || "";

  const roleChip =
    role === "police"
      ? "bg-gradient-to-r from-sky-500/30 to-blue-500/30 text-sky-100 ring-1 ring-sky-400/50"
      : role === "gsmb"
      ? "bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-indigo-100 ring-1 ring-indigo-400/50"
      : role === "owner"
      ? "bg-gradient-to-r from-emerald-500/30 to-green-500/30 text-emerald-100 ring-1 ring-emerald-400/50"
      : "bg-gradient-to-r from-slate-500/30 to-gray-500/30 text-slate-100 ring-1 ring-slate-400/50";

  const linkBase =
    "group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";
  const linkIdle =
    "text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-white/15 hover:to-white/10 hover:shadow-lg hover:shadow-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50";
  const linkActive = "text-white bg-gradient-to-r from-white/20 to-white/15 shadow-lg shadow-white/10";
  const navLinkClass = ({ isActive }) =>
    `${linkBase} ${isActive ? linkActive : linkIdle}`;

  const closeMenu = () => setOpen(false);
  const toLogin = () => {
    closeMenu();
    navigate("/login");
  };
  const doLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Enhanced top bar with improved glass effect */}
      <div className="bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/70 border-b border-gradient-to-r border-white/20 shadow-lg shadow-black/10">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Enhanced Brand with glow effect */}
          <Link to="/" className="flex items-center gap-4 group" onClick={closeMenu}>
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 grid place-items-center shadow-xl shadow-blue-500/25 ring-2 ring-white/20 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-blue-500/40 transition-all duration-300">
              <span className="text-white text-2xl drop-shadow-sm">⛏️</span>
            </div>
            <div className="leading-tight">
              <div className="text-white font-bold text-xl bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent group-hover:from-blue-100 group-hover:to-white transition-all duration-300">
                GSMB
              </div>
              <div className="text-xs text-slate-300 group-hover:text-blue-200 transition-colors duration-300">
                {t("tagline") || "Mining Portal"}
              </div>
            </div>
          </Link>

          {/* Enhanced Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>
              <FaHome className="opacity-80 group-hover:opacity-100 transition-opacity" />
              {t("nav.public")}
            </NavLink>

            {!isAuthed && (
              <button onClick={toLogin} className={`${linkBase} ${linkIdle}`} type="button">
                <FaSignInAlt className="opacity-80 group-hover:opacity-100 transition-opacity" />
                {t("nav.login")}
              </button>
            )}

            {role === "police" && (
              <NavLink to="/police" className={navLinkClass}>
                <FaUserShield className="opacity-80 group-hover:opacity-100 transition-opacity" />
                {t("nav.police")}
              </NavLink>
            )}
            {role === "gsmb" && (
              <NavLink to="/gsmb" className={navLinkClass}>
                <FaTruck className="opacity-80 group-hover:opacity-100 transition-opacity" />
                {t("nav.gsmb")}
              </NavLink>
            )}
            {role === "owner" && (
              <NavLink to="/owner" className={navLinkClass}>
                <FaUser className="opacity-80 group-hover:opacity-100 transition-opacity" />
                {t("nav.owner")}
              </NavLink>
            )}
          </div>

          {/* Enhanced Right section */}
          <div className="hidden md:flex items-center gap-4">
            <div className="bg-white/10 rounded-xl p-1 backdrop-blur-sm">
              <LanguageSwitcher compact />
            </div>

            {isAuthed ? (
              <>
                {/* Enhanced Role chip */}
                <span
                  className={`hidden lg:inline-flex items-center gap-2.5 h-10 px-4 rounded-xl text-xs font-semibold backdrop-blur-sm ${roleChip} shadow-lg hover:shadow-xl transition-all duration-200`}
                  title={displayName || role}
                >
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                  <span className="capitalize">{role || "user"}</span>
                </span>
                {displayName && (
                  <span className="hidden lg:inline text-slate-200 text-sm font-medium px-3 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    {displayName}
                  </span>
                )}

                <button
                  onClick={doLogout}
                  className="inline-flex items-center gap-2.5 h-11 px-5 rounded-xl font-medium text-white
                             bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 hover:from-rose-600 hover:via-red-600 hover:to-rose-700
                             shadow-xl shadow-red-500/25 hover:shadow-2xl hover:shadow-red-500/40 hover:scale-105 active:scale-95
                             transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  type="button"
                >
                  <FaSignOutAlt />
                  {t("nav.logout") || "Logout"}
                </button>
              </>
            ) : (
              <button
                onClick={toLogin}
                className="inline-flex items-center gap-2.5 h-11 px-5 rounded-xl font-medium text-white
                           bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:from-blue-600 hover:via-indigo-600 hover:to-blue-700
                           shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95
                           transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                type="button"
              >
                <FaSignInAlt />
                {t("nav.login")}
              </button>
            )}
          </div>

          {/* Enhanced Mobile toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center h-12 w-12 rounded-xl text-white/90 bg-white/10 hover:bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-all duration-200"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
      </div>

      {/* Enhanced Mobile sheet with improved animations */}
      <div
        className={`md:hidden fixed inset-x-0 top-18 z-40 transition-all duration-500 ease-out ${
          open ? "translate-y-0" : "-translate-y-6 pointer-events-none"
        }`}
      >
        {/* Enhanced Backdrop with blur */}
        <div
          className={`${open ? "opacity-100" : "opacity-0"} transition-opacity duration-500 fixed inset-0 bg-black/50 backdrop-blur-sm`}
          onClick={closeMenu}
        />
        {/* Enhanced Panel with premium styling */}
        <div
          className={`mx-4 relative bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden
                      ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
                      transition-all duration-500 ease-out`}
        >
          <div className="p-5 grid gap-3">
            <NavLink to="/" end className={navLinkClass} onClick={closeMenu}>
              <FaHome className="opacity-80 group-hover:opacity-100 transition-opacity" />
              {t("nav.public")}
            </NavLink>

            {!isAuthed && (
              <button className={`${linkBase} ${linkIdle}`} onClick={toLogin} type="button">
                <FaSignInAlt className="opacity-80 group-hover:opacity-100 transition-opacity" />
                {t("nav.login")}
              </button>
            )}

            {role === "police" && (
              <NavLink to="/police" className={navLinkClass} onClick={closeMenu}>
                <FaUserShield className="opacity-80 group-hover:opacity-100 transition-opacity" />
                {t("nav.police")}
              </NavLink>
            )}
            {role === "gsmb" && (
              <NavLink to="/gsmb" className={navLinkClass} onClick={closeMenu}>
                <FaTruck className="opacity-80 group-hover:opacity-100 transition-opacity" />
                {t("nav.gsmb")}
              </NavLink>
            )}
            {role === "owner" && (
              <NavLink to="/owner" className={navLinkClass} onClick={closeMenu}>
                <FaUser className="opacity-80 group-hover:opacity-100 transition-opacity" />
                {t("nav.owner")}
              </NavLink>
            )}

            <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="flex items-center justify-between px-2 py-2 bg-white/5 rounded-xl backdrop-blur-sm">
              <span className="text-slate-200 text-sm font-medium">
                {displayName || t("nav.language")}
              </span>
              <LanguageSwitcher compact />
            </div>

            {isAuthed ? (
              <button
                className="mt-3 inline-flex items-center justify-center gap-2.5 h-12 px-5 rounded-xl font-medium text-white
                           bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 hover:from-rose-600 hover:via-red-600 hover:to-rose-700
                           shadow-xl shadow-red-500/25 hover:shadow-2xl hover:shadow-red-500/40 hover:scale-105 active:scale-95
                           transition-all duration-200"
                onClick={doLogout}
              >
                <FaSignOutAlt />
                {t("nav.logout") || "Logout"}
              </button>
            ) : (
              <button
                className="mt-3 inline-flex items-center justify-center gap-2.5 h-12 px-5 rounded-xl font-medium text-white
                           bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 hover:from-blue-600 hover:via-indigo-600 hover:to-blue-700
                           shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95
                           transition-all duration-200"
                onClick={toLogin}
              >
                <FaSignInAlt />
                {t("nav.login")}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}