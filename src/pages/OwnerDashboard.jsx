import { useApp } from '../context/AppContext.jsx'
import { useState } from 'react'
import StatusPill from '../components/StatusPill.jsx'
import { useLang } from '../context/LangContext.jsx'
import PageHeader from '../components/PageHeader.jsx'

export default function OwnerDashboard(){
  const { t } = useLang()
  const { user, licenses, fines, markFinePaid } = useApp()
  const myPlates = new Set(licenses.filter(l=>l.ownerId===user?.id).map(l=>l.plate))
  const myLicenses = licenses.filter(l=>l.ownerId===user?.id)
  const myFines = fines.filter(f=>myPlates.has(f.plate))
  const [fineId, setFineId] = useState('')
  const [receipt, setReceipt] = useState(null)

  // Get license status color (government colors)
  const getLicenseStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'valid':
        return 'bg-green-100 border-green-400 text-green-800' // Government green
      case 'suspended':
      case 'invalid':
        return 'bg-red-100 border-red-400 text-red-800' // Government red
      case 'expired':
        return 'bg-orange-100 border-orange-400 text-orange-800' // Government orange
      case 'pending':
        return 'bg-blue-100 border-blue-400 text-blue-800' // Government blue
      default:
        return 'bg-gray-100 border-gray-400 text-gray-800' // Default
    }
  }

  // Get fine status color (government colors)
  const getFineStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 border-green-400 text-green-800' // Government green
      case 'unpaid':
        return 'bg-red-100 border-red-400 text-red-800' // Government red
      case 'pending':
        return 'bg-orange-100 border-orange-400 text-orange-800' // Government orange
      default:
        return 'bg-gray-100 border-gray-400 text-gray-800' // Default
    }
  }

  const pay = () => {
    if(!fineId) return
    const res = markFinePaid(fineId)
    setReceipt(res)
    setFineId('')
  }

  return (
    <>
      <PageHeader title={t('owner.title')} subtitle={t('owner.myFines')} />

      {/* My Licenses Section */}
      <section className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t('owner.myLicenses')}
          </h3>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-slate-800/60">
              <tr className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">
                <th className="px-6 py-3">{t('police.plate')}</th>
                <th className="px-6 py-3">{t('owner.from')}</th>
                <th className="px-6 py-3">{t('owner.to')}</th>
                <th className="px-6 py-3">{t('owner.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {myLicenses.map((l) => (
                <tr key={l.id} className={`${getLicenseStatusColor(l.status)} hover:opacity-90 transition-opacity`}>
                  {/* Vehicle Number - Large */}
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

              {myLicenses.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-600 dark:text-gray-300">
                    No licenses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 grid grid-cols-1 gap-6">
          {myLicenses.map((l) => (
            <article
              key={l.id}
              className={`rounded-3xl border-4 p-6 shadow-xl ${getLicenseStatusColor(l.status)}`}
            >
              {/* Header with Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">🚚</div>
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
                <CardRow label={t('owner.from')} value={<span className="font-medium text-gray-800 dark:text-gray-200">{l.validFrom}</span>} />
                <CardRow label={t('owner.to')} value={<span className="font-medium text-gray-800 dark:text-gray-200">{l.validTo}</span>} />
              </div>
            </article>
          ))}

          {myLicenses.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 dark:border-slate-700 p-6 text-center text-gray-600 dark:text-gray-300">
              No licenses found
            </div>
          )}
        </div>
      </section>

      {/* My Fines Section */}
      <section className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t('owner.myFines')}
          </h3>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-slate-800/60">
              <tr className="text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300">
                <th className="px-6 py-3">{t('owner.fineId')}</th>
                <th className="px-6 py-3">{t('police.plate')}</th>
                <th className="px-6 py-3">{t('owner.amount')}</th>
                <th className="px-6 py-3">{t('owner.status')}</th>
                <th className="px-6 py-3">{t('owner.ref')}</th>
                <th className="px-6 py-3">{t('owner.action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {myFines.map((f) => (
                <tr key={f.id} className={`${getFineStatusColor(f.status)} hover:opacity-90 transition-opacity`}>
                  {/* Fine ID */}
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 font-semibold">
                    #{f.id}
                  </td>

                  {/* Vehicle Number - Large */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-5 h-5">🚚</span>
                      <span className="text-2xl font-black tracking-wider text-gray-900 bg-white px-3 py-2 rounded-lg border-2 border-gray-800 shadow-lg">
                        {f.plate}
                      </span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 font-medium">
                    Rs. {f.amount}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusPill status={f.status} />
                  </td>

                  {/* Reference */}
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 font-medium">
                    {f.ref || '-'}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    {f.status === 'unpaid' ? (
                      <a 
                        className="inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-sm font-bold shadow-sm bg-emerald-600 hover:bg-emerald-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
                        href={`/pay?fineId=${f.id}`}
                      >
                        💳 {t('owner.payViaLP')}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-500">—</span>
                    )}
                  </td>
                </tr>
              ))}

              {myFines.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-600 dark:text-gray-300">
                    No fines found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 grid grid-cols-1 gap-6">
          {myFines.map((f) => (
            <article
              key={f.id}
              className={`rounded-3xl border-4 p-6 shadow-xl ${getFineStatusColor(f.status)}`}
            >
              {/* Header with Fine ID and Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">#{f.id}</div>
                <StatusPill status={f.status} />
              </div>

              {/* Vehicle Number - Very Large */}
              <div className="text-center mb-4">
                <div className="text-4xl font-black tracking-wider text-gray-900 bg-white px-4 py-3 rounded-2xl border-4 border-gray-800 shadow-xl inline-block">
                  {f.plate}
                </div>
              </div>

              {/* Fine Details */}
              <div className="space-y-3">
                <CardRow 
                  label={t('owner.amount')} 
                  value={<span className="text-lg font-bold text-gray-800 dark:text-gray-200">Rs. {f.amount}</span>} 
                />
                <CardRow 
                  label={t('owner.ref')} 
                  value={<span className="font-medium text-gray-800 dark:text-gray-200">{f.ref || '-'}</span>} 
                />
              </div>

              {/* Action Button */}
              <div className="mt-4">
                {f.status === 'unpaid' ? (
                  <a 
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-bold shadow-sm bg-emerald-600 hover:bg-emerald-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    href={`/pay?fineId=${f.id}`}
                  >
                    💳 {t('owner.payViaLP')}
                  </a>
                ) : (
                  <div className="text-center text-sm text-gray-500 py-3">
                    Payment completed
                  </div>
                )}
              </div>
            </article>
          ))}

          {myFines.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-300 dark:border-slate-700 p-6 text-center text-gray-600 dark:text-gray-300">
              No fines found
            </div>
          )}
        </div>

        {/* Quick Pay Section */}
        <div className="px-4 sm:px-6 py-4 bg-gray-50 dark:bg-slate-800/40 border-t border-gray-100 dark:border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input 
              className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('owner.enterFineId')} 
              value={fineId} 
              onChange={e=>setFineId(e.target.value.toUpperCase())}
            />
            <button 
              className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold shadow-sm bg-emerald-600 hover:bg-emerald-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
              onClick={pay}
            >
              💳 {t('owner.markPaid')}
            </button>
          </div>
          
          {receipt && (
            <div className="mt-3 p-3 bg-green-100 border border-green-400 text-green-800 rounded-xl">
              {t('owner.receipt')} <strong>{receipt.ref}</strong> (#{receipt.fineId})
            </div>
          )}
        </div>
      </section>
    </>
  )
}

/* ---------- Helper Component ---------- */

function CardRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">
        {label}
      </span>
      <span className="text-sm text-gray-900 dark:text-gray-100">{value}</span>
    </div>
  )
}