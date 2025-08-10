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
    <>
      <PageHeader
        title={t('public.title')}
        subtitle={t('public.platePlaceholder')}
      />

      <div className="card stack">
        <div className="grid two">
          <div className="stack">
            <label className="hint">{t('police.plate')}</label>
            <input className="input input-xl"
                   value={plate}
                   onChange={e=>setPlate(e.target.value.toUpperCase())}
                   placeholder={t('public.platePlaceholder')} />
            <div className="sticky-actions">
              <button className="btn primary" onClick={onVerify}>{t('public.verify')}</button>
            </div>
          </div>

          <div className="stack">
            <label className="hint">{t('public.reportTitle')}</label>
            <input className="input" placeholder={t('public.location')} value={location} onChange={e=>setLocation(e.target.value)}/>
            <input className="input" placeholder={t('public.noteOptional')} value={reportNote} onChange={e=>setReportNote(e.target.value)}/>
            <div className="sticky-actions">
              <button className="btn warn" onClick={onReport}>{t('public.submitReport')}</button>
            </div>
            {newReportId && <div className="banner success">{t('public.thanksReport')} <b>{newReportId}</b></div>}
          </div>
        </div>

        {check && (
          <div className="card">
            {!check.exists && <div>{t('public.noLicense')} <b>{plate}</b>. {t('public.submitReport')}</div>}
            {check.exists && (
              <div className="grid two">
                <div>
                  <div>{t('police.plate')}: <b>{plate}</b></div>
                  <div>{t('public.validWindow')}: {check.license.validFrom} ➜ {check.license.validTo}</div>
                </div>
                <div style={{display:'flex',gap:10,alignItems:'center'}}>
                  <StatusPill status={check.license.status}/>
                  <span className="hint">{check.valid ? t('public.todayValid') : t('public.todayInvalid')}</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="card">
          <h3>{t('public.finesTitle')}</h3>
          <input className="input" placeholder={t('public.searchByPlate')} value={payFineId} onChange={e=>setPayFineId(e.target.value.toUpperCase())}/>
          <table className="table responsive">
            <thead><tr><th>{t('owner.fineId')}</th><th>{t('police.plate')}</th><th>{t('public.amount')}</th><th>{t('public.status')}</th></tr></thead>
            <tbody>
              {fines.filter(f=>!payFineId || f.plate.includes(payFineId)).map(f=>(
                <tr key={f.id}>
                  <td data-label={t('owner.fineId')}>{f.id}</td>
                  <td data-label={t('police.plate')}>{f.plate}</td>
                  <td data-label={t('public.amount')}>Rs. {f.amount}</td>
                  <td data-label={t('public.status')}><StatusPill status={f.status}/></td>
                </tr>
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
                  <td data-label={t('police.plate')}>{l.plate}</td>
                  <td data-label={t('owner.from')}>{l.validFrom}</td>
                  <td data-label={t('owner.to')}>{l.validTo}</td>
                  <td data-label={t('owner.status')}><StatusPill status={l.status}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
