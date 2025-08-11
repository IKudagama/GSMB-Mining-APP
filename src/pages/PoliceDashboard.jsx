import { useState, useMemo } from "react";
import { useApp } from "../context/AppContext.jsx";
import StatusPill from "../components/StatusPill.jsx";
import { useLang } from "../context/LangContext.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { useToast } from "../components/ToastProvider.jsx";
import Modal from "../components/Modal.jsx";

export default function PoliceDashboard() {
  const { t } = useLang();
  const toast = useToast();
  const { reports = [], licenses = [], policeTakeAction } = useApp();

  const [amount, setAmount] = useState(5000);
  const [confirm, setConfirm] = useState({ open: false, type: null, report: null });

  const act = (type, r) => setConfirm({ open: true, type, report: r });

  const doConfirm = () => {
    const { type, report } = confirm;
    if (!report) return setConfirm({ open: false, type: null, report: null });

    if (type === "fine") {
      policeTakeAction(report.id, "fine", {
        plate: report.plate,
        amount: Number(amount) || 0,
      });
      toast.push("Fine issued & license suspended", "success");
    } else if (type === "reject") {
      policeTakeAction(report.id, "reject");
      toast.push("Report rejected", "warn");
    } else {
      policeTakeAction(report.id, "validate_ok");
      toast.push("Report marked valid", "success");
    }
    setConfirm({ open: false, type: null, report: null });
  };

  // Get license status color (government colors)
  const getLicenseStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'valid':
        return 'bg-green-100 border-green-400 text-green-800'; // Government green
      case 'suspended':
      case 'invalid':
        return 'bg-red-100 border-red-400 text-red-800'; // Government red
      case 'expired':
        return 'bg-orange-100 border-orange-400 text-orange-800'; // Government orange
      case 'pending':
        return 'bg-blue-100 border-blue-400 text-blue-800'; // Government blue
      default:
        return 'bg-gray-100 border-gray-400 text-gray-800'; // Default
    }
  };

  // Sorted (newest first if createdAt exists)
  const sortedReports = useMemo(() => {
    return [...reports].sort((a, b) => (b.createdAt || 0) > (a.createdAt || 0) ? 1 : -1);
  }, [reports]);

  return (
    <>
      <PageHeader
        title={t("police.title")}
        subtitle={t("police.incoming")}
        right={
          <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            {t("police.tip") || "Tip: set the fine before issuing"}
          </div>
        }
      />

      {/* Incoming Reports */}
      <section className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t("police.incoming")}
          </h3>

          {/* Fine input (global) */}
          <div className="flex items-center gap-2">
            <label htmlFor="fineAmount" className="sr-only">
              {t("police.fineAmount") || "Fine amount (LKR)"}
            </label>
            <div className="flex items-center rounded-xl border border-gray-300 dark:border-slate-700 px-3 py-2 bg-gray-50 dark:bg-slate-800">
              <span className="text-gray-600 dark:text-gray-300 text-sm mr-1">LKR</span>
              <input
                id="fineAmount"
                className="w-28 bg-transparent outline-none text-gray-900 dark:text-gray-100 font-semibold"
                type="number"
                min={0}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-slate-800/60">
              <tr className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">
                <th className="px-6 py-3">{t("police.id")}</th>
                <th className="px-6 py-3">{t("police.plate")}</th>
                <th className="px-6 py-3">{t("police.note")}</th>
                <th className="px-6 py-3">{t("owner.status")}</th>
                <th className="px-6 py-3">{t("police.actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {sortedReports.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/60 dark:hover:bg-slate-800/40">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 font-semibold">
                    #{r.id}
                  </td>

                  {/* Plate: strong blue pill for quick recognition */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-5 h-5">🚚</span>
                      <span className="inline-block px-2 py-1 bg-blue-600 text-white rounded-lg text-sm font-extrabold tracking-wide">
                        {r.plate}
                      </span>
                    </div>
                  </td>

                  {/* Note: darker text for readability */}
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 font-medium">
                    {r.note}
                  </td>

                  <td className="px-6 py-4">
                    <StatusPill status={r.status} />
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <ActionButton
                        variant="success"
                        ariaLabel="Mark Valid"
                        icon="✔️"
                        onClick={() => act("valid", r)}
                      >
                        {t("police.valid")}
                      </ActionButton>

                      <ActionButton
                        variant="danger"
                        ariaLabel="Reject Report"
                        icon="✖️"
                        onClick={() => act("reject", r)}
                      >
                        {t("police.reject")}
                      </ActionButton>

                      <ActionButton
                        variant="warn"
                        ariaLabel="Fine & Suspend"
                        icon="💳"
                        onClick={() => act("fine", r)}
                      >
                        {t("police.fineSuspend")}
                      </ActionButton>
                    </div>
                  </td>
                </tr>
              ))}

              {sortedReports.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-600 dark:text-gray-300">
                    {t("police.noReports") || "No reports available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 grid grid-cols-1 gap-4">
          {sortedReports.map((r) => (
            <article
              key={r.id}
              className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">#{r.id}</div>
                <StatusPill status={r.status} />
              </div>

              <div className="space-y-2">
                {/* Plate: blue pill */}
                <CardRow
                  label={t("police.plate")}
                  value={
                    <span className="inline-block px-2 py-1 bg-blue-600 text-white rounded-lg text-sm font-extrabold tracking-wide">
                      {r.plate}
                    </span>
                  }
                />
                {/* Note: dark */}
                <CardRow
                  label={t("police.note")}
                  value={<span className="text-gray-800 dark:text-gray-200 font-medium">{r.note || "-"}</span>}
                />
                {/* Date: purple */}
                {r.createdAt && (
                  <CardRow
                    label={t("common.date") || "Date"}
                    value={
                      <span className="inline-flex items-center gap-2 font-semibold text-purple-700 dark:text-purple-300">
                        <span className="w-5 h-5">📅</span>
                        {r.createdAt}
                      </span>
                    }
                  />
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <ActionButton block variant="success" ariaLabel="Mark Valid" icon="✔️" onClick={() => act("valid", r)}>
                  {t("police.valid")}
                </ActionButton>
                <ActionButton block variant="danger" ariaLabel="Reject Report" icon="✖️" onClick={() => act("reject", r)}>
                  {t("police.reject")}
                </ActionButton>
                <ActionButton block variant="warn" ariaLabel="Fine & Suspend" icon="💳" onClick={() => act("fine", r)}>
                  {t("police.fineSuspend")}
                </ActionButton>
              </div>
            </article>
          ))}

          {sortedReports.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 dark:border-slate-700 p-6 text-center text-gray-600 dark:text-gray-300">
              {t("police.noReports") || "No reports available"}
            </div>
          )}
        </div>

        <div className="px-4 sm:px-6 py-3 bg-gray-50 dark:bg-slate-800/40 text-sm text-gray-700 dark:text-gray-300">
          {t("police.autoSuspend")}
        </div>
      </section>

      {/* Enhanced Licenses Section with Government Colors */}
      <section className="mt-8 bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t("police.licenses")}
          </h3>
        </div>

        {/* Desktop Table - Enhanced */}
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-slate-800/60">
              <tr className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">
                <th className="px-6 py-3">{t("police.plate")}</th>
                <th className="px-6 py-3">{t("owner.from")}</th>
                <th className="px-6 py-3">{t("owner.to")}</th>
                <th className="px-6 py-3">{t("owner.status")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {licenses.map((l) => (
                <tr key={l.id} className={`${getLicenseStatusColor(l.status)} hover:opacity-90 transition-opacity`}>
                  {/* Vehicle Number - Extra Large */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-5 h-5">🚚</span>
                      <span className="text-2xl font-black tracking-wider text-gray-900 bg-white px-3 py-2 rounded-lg border-2 border-gray-800 shadow-lg">
                        {l.plate}
                      </span>
                    </div>
                  </td>
                  
                  {/* Valid From */}
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 font-medium">{l.validFrom}</td>
                  
                  {/* Valid To */}
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 font-medium">{l.validTo}</td>
                  
                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusPill status={l.status} />
                  </td>
                </tr>
              ))}

              {licenses.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-600 dark:text-gray-300">
                    {t("police.noLicenses") || "No licenses"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards - Enhanced with Government Colors */}
        <div className="md:hidden p-4 grid grid-cols-1 gap-6">
          {licenses.map((l) => (
            <article
              key={l.id}
              className={`rounded-3xl border-4 p-6 shadow-xl ${getLicenseStatusColor(l.status)}`}
            >
              {/* Header with Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">🚛</div>
                <StatusPill status={l.status} />
              </div>

              {/* Vehicle Number - Very Large */}
              <div className="text-center mb-4">
                <div className="text-4xl font-black tracking-wider text-gray-900 bg-white px-4 py-3 rounded-2xl border-4 border-gray-800 shadow-xl inline-block">
                  {l.plate}
                </div>
              </div>

              {/* License Details */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <CardRow label={t("owner.from")} value={<span className="font-medium text-gray-800 dark:text-gray-200">{l.validFrom}</span>} />
                <CardRow label={t("owner.to")} value={<span className="font-medium text-gray-800 dark:text-gray-200">{l.validTo}</span>} />
              </div>
            </article>
          ))}

          {licenses.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 dark:border-slate-700 p-6 text-center text-gray-600 dark:text-gray-300">
              {t("police.noLicenses") || "No licenses"}
            </div>
          )}
        </div>
      </section>

      {/* Confirm Modal */}
      <Modal
        open={confirm.open}
        title={
          confirm.type === "fine"
            ? t("police.fineSuspend")
            : confirm.type === "reject"
            ? t("police.reject")
            : t("police.valid")
        }
        onClose={() => setConfirm({ open: false, type: null, report: null })}
        actions={
          <>
            <button
              className="btn"
              onClick={() => setConfirm({ open: false, type: null, report: null })}
            >
              {t("common.cancel") || "Cancel"}
            </button>
            <button
              className={`btn ${
                confirm.type === "reject" ? "danger" : confirm.type === "fine" ? "warn" : "success"
              }`}
              onClick={doConfirm}
            >
              {t("common.confirm") || "Confirm"}
            </button>
          </>
        }
      >
        {confirm.report ? (
          <div className="text-sm text-gray-800 dark:text-gray-200 font-medium">
            #{confirm.report.id} • {confirm.report.plate}
          </div>
        ) : null}
      </Modal>
    </>
  );
}

/* ---------- Small UI helpers ---------- */

function ActionButton({ variant = "default", icon, children, onClick, block = false, ariaLabel }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900";
  const palette = {
    // high-contrast, friendly colors
    default:
      "bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-gray-100 focus:ring-gray-300",
    success:
      "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-300", // GREEN (Valid)
    danger:
      "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-300", // RED (Reject)
    warn:
      "bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-300", // AMBER (Fine)
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`${base} ${palette[variant] || palette.default} ${block ? "flex-1" : ""}`}
    >
      {icon ? <span className="leading-none text-base">{icon}</span> : null}
      {children}
    </button>
  );
}

function CardRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">
        {label}
      </span>
      <span className="text-sm text-gray-900 dark:text-gray-100">{value}</span>
    </div>
  );
}