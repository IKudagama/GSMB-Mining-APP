import { useApp } from '../context/AppContext.jsx'
import StatusPill from '../components/StatusPill.jsx'
import { useState } from 'react'
import { useLang } from '../context/LangContext.jsx'
import PageHeader from '../components/PageHeader.jsx'

export default function GsmbDashboard(){
  const { t } = useLang()
  const { fines, licenses, gsmbReactivate } = useApp()
  const [filter, setFilter] = useState('paid')
  const suspendedPlates = new Set(licenses.filter(l=>l.status==='suspended').map(l=>l.plate))

  const reactivate = (plate) => {
    if (!window.confirm(t('gsmb.reactivate') + '?')) return
    gsmbReactivate(plate)
  }

  return (
    <>
      <PageHeader title={t('gsmb.title')} subtitle={t('gsmb.fines')} />

      <div className="card">
        <h3>{t('gsmb.fines')}</h3>
        <div className="row">
          <label className="hint">{t('gsmb.filter')}</label>
          <select className="input" style={{maxWidth:220}} value={filter} onChange={e=>setFilter(e.target.value)}>
            <option value="all">{t('gsmb.all')}</option>
            <option value="paid">{t('gsmb.paid')}</option>
            <option value="unpaid">{t('gsmb.unpaid')}</option>
          </select>
        </div>
        <table className="table responsive">
          <thead><tr><th>{t('owner.fineId')}</th><th>{t('police.plate')}</th><th>{t('owner.amount')}</th><th>{t('owner.status')}</th><th>{t('gsmb.ref')}</th><th>{t('owner.action')}</th></tr></thead>
          <tbody>
            {fines.filter(f=>filter==='all' || f.status===filter).map(f=>(
              <tr key={f.id}>
                <td data-label={t('owner.fineId')}>{f.id}</td>
                <td data-label={t('police.plate')}>{f.plate}</td>
                <td data-label={t('owner.amount')}>Rs. {f.amount}</td>
                <td data-label={t('owner.status')}><StatusPill status={f.status}/></td>
                <td data-label={t('gsmb.ref')}>{f.ref || '-'}</td>
                <td data-label={t('owner.action')}>
                  {f.status==='paid' && suspendedPlates.has(f.plate)
                    ? <button className="btn success" onClick={()=>reactivate(f.plate)}>{t('gsmb.reactivate')}</button>
                    : <span className="hint">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="hint">{t('gsmb.onlyPaidReactivate')}</div>
      </div>

      <div className="card">
        <h3>{t('gsmb.licenses')}</h3>
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
    </>
  )
}
