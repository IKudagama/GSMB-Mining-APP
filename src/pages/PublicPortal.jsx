import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import StatusPill from '../components/StatusPill.jsx'
import { useLang } from '../context/LangContext.jsx'
import PageHeader from '../components/PageHeader.jsx'

export default function PublicPortal(){
  const { t } = useLang()
  const { getLicenseByPlate, isLicenseCurrentlyValid, submitReport, fines, licenses } = useApp()
  const [plate, setPlate] = useState('SP-1234')
  const [check, setCheck] = useState(null)
  const [reportNote, setReportNote] = useState('')
  const [location, setLocation] = useState('Anuradhapura')
  const [newReportId, setNewReportId] = useState(null)
  const [payFineId, setPayFineId] = useState('')

  const onVerify = () => {
    const lic = getLicenseByPlate(plate)
    if (!lic) return setCheck({ exists:false })
    setCheck({ exists:true, valid: isLicenseCurrentlyValid(lic), license: lic })
  }

  const onReport = () => {
    if (!plate.trim()) return
    const id = submitReport({ plate, note: reportNote || 'Public report', location })
    setNewReportId(id)
    setReportNote('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative">
        <PageHeader
          title={t('public.title')}
          subtitle={t('public.platePlaceholder')}
        />

        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          {/* Main Action Cards */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* License Verification Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-xl transition-all duration-500 group-hover:blur-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">License Verification</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-slate-700 font-medium mb-2 block">{t('police.plate')}</span>
                      <input 
                        className="w-full px-4 py-4 bg-white/70 border border-blue-200 rounded-2xl text-lg font-mono text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        value={plate}
                        onChange={e=>setPlate(e.target.value.toUpperCase())}
                        placeholder={t('public.platePlaceholder')} 
                      />
                    </label>
                    
                    <button 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                      onClick={onVerify}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t('public.verify')}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Incident Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-xl transition-all duration-500 group-hover:blur-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5C2.962 18.333 3.924 20 5.464 20z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">{t('public.reportTitle')}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-slate-700 font-medium mb-2 block">{t('public.location')}</span>
                      <input 
                        className="w-full px-4 py-3 bg-white/70 border border-orange-200 rounded-2xl text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        placeholder={t('public.location')} 
                        value={location} 
                        onChange={e=>setLocation(e.target.value)}
                      />
                    </label>
                    
                    <label className="block">
                      <span className="text-slate-700 font-medium mb-2 block">{t('public.noteOptional')}</span>
                      <input 
                        className="w-full px-4 py-3 bg-white/70 border border-orange-200 rounded-2xl text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        placeholder={t('public.noteOptional')} 
                        value={reportNote} 
                        onChange={e=>setReportNote(e.target.value)}
                      />
                    </label>
                    
                    <button 
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                      onClick={onReport}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5C2.962 18.333 3.924 20 5.464 20z" />
                        </svg>
                        {t('public.submitReport')}
                      </span>
                    </button>
                    
                    {newReportId && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 animate-in slide-in-from-top duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-emerald-800 font-medium">
                            {t('public.thanksReport')} <span className="font-bold text-emerald-900">#{newReportId}</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Results */}
          {check && (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-8">
                  {!check.exists && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <p className="text-xl text-slate-700">
                        {t('public.noLicense')} <span className="font-bold text-slate-900">{plate}</span>
                      </p>
                      <p className="text-slate-600 mt-2">{t('public.submitReport')}</p>
                    </div>
                  )}
                  
                  {check.exists && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">License Found</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="bg-slate-50 rounded-2xl p-4">
                            <span className="text-slate-600 text-sm font-medium">Plate Number</span>
                            <p className="text-xl font-bold text-slate-900 font-mono">{plate}</p>
                          </div>
                          <div className="bg-slate-50 rounded-2xl p-4">
                            <span className="text-slate-600 text-sm font-medium">{t('public.validWindow')}</span>
                            <p className="text-lg font-semibold text-slate-800">
                              {check.license.validFrom} → {check.license.validTo}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <StatusPill status={check.license.status}/>
                          <p className={`text-lg font-semibold ${check.valid ? 'text-emerald-600' : 'text-red-600'}`}>
                            {check.valid ? t('public.todayValid') : t('public.todayInvalid')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Fines Section */}
          {/* <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">{t('public.finesTitle')}</h3>
                </div>
                
                <div className="mb-6">
                  <input 
                    className="w-full px-4 py-3 bg-white/70 border border-purple-200 rounded-2xl text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder={t('public.searchByPlate')} 
                    value={payFineId} 
                    onChange={e=>setPayFineId(e.target.value.toUpperCase())}
                  />
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-4 px-4 font-semibold text-slate-700">{t('owner.fineId')}</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-700">{t('police.plate')}</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-700">{t('public.amount')}</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-700">{t('public.status')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fines.filter(f=>!payFineId || f.plate.includes(payFineId)).map(f=>(
                        <tr key={f.id} className="border-b border-slate-100 hover:bg-white/50 transition-colors duration-200">
                          <td className="py-4 px-4 font-mono text-slate-800">{f.id}</td>
                          <td className="py-4 px-4 font-mono text-slate-800 font-semibold">{f.plate}</td>
                          <td className="py-4 px-4 font-semibold text-slate-800">Rs. {f.amount}</td>
                          <td className="py-4 px-4"><StatusPill status={f.status}/></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-amber-800 text-sm leading-relaxed">{t('public.hintPay')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Licenses Section */}
          {/* <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">{t('public.licensesTitle')}</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-4 px-4 font-semibold text-slate-700">{t('police.plate')}</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-700">{t('owner.from')}</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-700">{t('owner.to')}</th>
                        <th className="text-left py-4 px-4 font-semibold text-slate-700">{t('owner.status')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {licenses.map(l=>(
                        <tr key={l.id} className="border-b border-slate-100 hover:bg-white/50 transition-colors duration-200">
                          <td className="py-4 px-4 font-mono text-slate-800 font-semibold">{l.plate}</td>
                          <td className="py-4 px-4 text-slate-700">{l.validFrom}</td>
                          <td className="py-4 px-4 text-slate-700">{l.validTo}</td>
                          <td className="py-4 px-4"><StatusPill status={l.status}/></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}