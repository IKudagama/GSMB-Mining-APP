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

  const pay = () => {
    if(!fineId) return
    const res = markFinePaid(fineId)
    setReceipt(res)
    setFineId('')
  }

  return (
    <>
      <PageHeader title={t('owner.title')} subtitle={t('owner.myFines')} />

      <div className="card">
        <h3>{t('owner.myLicenses')}</h3>
        <table className="table responsive">
          <thead><tr>
            <th>{t('police.plate')}</th><th>{t('owner.from')}</th><th>{t('owner.to')}</th><th>{t('owner.status')}</th>
          </tr></thead>
          <tbody>
            {myLicenses.map(l=>(
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

      <div className="card">
        <h3>{t('owner.myFines')}</h3>
        <table className="table responsive">
          <thead><tr>
            <th>{t('owner.fineId')}</th><th>{t('police.plate')}</th><th>{t('owner.amount')}</th><th>{t('owner.status')}</th><th>{t('owner.ref')}</th><th>{t('owner.action')}</th>
          </tr></thead>
          <tbody>
            {myFines.map(f=>(
              <tr key={f.id}>
                <td data-label={t('owner.fineId')}>{f.id}</td>
                <td data-label={t('police.plate')}>{f.plate}</td>
                <td data-label={t('owner.amount')}>Rs. {f.amount}</td>
                <td data-label={t('owner.status')}><StatusPill status={f.status}/></td>
                <td data-label={t('owner.ref')}>{f.ref || '-'}</td>
                <td data-label={t('owner.action')}>
                  {f.status === 'unpaid'
                    ? <a className="btn primary" href={`/pay?fineId=${f.id}`}>{t('owner.payViaLP')}</a>
                    : <span className="hint">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Optional quick-pay fallback */}
        <div className="grid two" style={{marginTop:12}}>
          <input className="input" placeholder={t('owner.enterFineId')} value={fineId} onChange={e=>setFineId(e.target.value.toUpperCase())}/>
          <button className="btn success" onClick={pay}>{t('owner.markPaid')}</button>
        </div>
        {receipt && <div className="banner success" style={{marginTop:10}}>{t('owner.receipt')} <b>{receipt.ref}</b> (#{receipt.fineId}).</div>}
      </div>
    </>
  )
}
