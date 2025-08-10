import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import StatusPill from '../components/StatusPill.jsx'
import { useLang } from '../context/LangContext.jsx'

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
    const id = submitReport({ plate, note: reportNote || 'Public report', location })
    setNewReportId(id)
    setReportNote('')
  }

  return (
    <div className="card">
      <h2>{t('public.title')}</h2>
      <div className="row">
        <input className="input input-xl" value={plate} onChange={e=>setPlate(e.target.value.toUpperCase())} placeholder={t('public.platePlaceholder')}/>
        <button className="btn primary" onClick={onVerify}>{t('public.verify')}</button>
      </div>

      {check && (
        <div className="card">
          {!check.exists && <div>{t('public.noLicense')} <b>{plate}</b>. {t('public.submitReport')}</div>}
          {check.exists && (
            <>
              <div>{t('police.plate')}: <b>{plate}</b></div>
              <div>{t('public.validWindow')}: {check.license.validFrom} ➜ {check.license.validTo}</div>
              <div>{t('owner.status')}: <StatusPill status={check.license.status} /> {check.valid ? t('public.todayValid') : t('public.todayInvalid')}</div>
            </>
          )}
        </div>
      )}

      <div className="card">
        <h3>{t('public.reportTitle')}</h3>
        <div className="row">
          <input className="input" placeholder={t('public.location')} value={location} onChange={e=>setLocation(e.target.value)}/>
          <input className="input" placeholder={t('public.noteOptional')} value={reportNote} onChange={e=>setReportNote(e.target.value)}/>
          <button className="btn warn" onClick={onReport}>{t('public.submitReport')}</button>
        </div>
        {newReportId && <div className="hint">{t('public.thanksReport')} <b>{newReportId}</b>.</div>}
      </div>

      <div className="card">
        <h3>{t('public.finesTitle')}</h3>
        <input className="input" placeholder={t('public.searchByPlate')} value={payFineId} onChange={e=>setPayFineId(e.target.value.toUpperCase())}/>
        <table className="table responsive">
          <thead><tr><th>{t('owner.fineId')}</th><th>{t('police.plate')}</th><th>{t('public.amount')}</th><th>{t('public.status')}</th></tr></thead>
          <tbody>
            {fines.filter(f=>!payFineId || f.plate.includes(payFineId)).map(f=>(
              <tr key={f.id}><td>{f.id}</td><td>{f.plate}</td><td>Rs. {f.amount}</td><td><StatusPill status={f.status}/></td></tr>
            ))}
          </tbody>
        </table>
        <div className="hint">{t('public.hintPay')}</div>
      </div>

      <div className="card">
        <h3>{t('public.licensesTitle')}</h3>
        <table className="table responsive">
          <thead><tr><th>{t('police.plate')}</th><th>{t('owner.from')}</th><th>{t('owner.to')}</th><th>{t('owner.status')}</th></tr></thead>
          <tbody>
            {licenses.map(l=>(
              <tr key={l.id}>
                <td>{l.plate}</td><td>{l.validFrom}</td><td>{l.validTo}</td>
                <td><StatusPill status={l.status}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
