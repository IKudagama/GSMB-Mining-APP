import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import StatusPill from '../components/StatusPill.jsx'
import { useLang } from '../context/LangContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useToast } from '../components/ToastProvider.jsx'
import Modal from '../components/Modal.jsx'

export default function PoliceDashboard(){
  const { t } = useLang()
  const toast = useToast()
  const { reports, licenses, policeTakeAction } = useApp()
  const [amount, setAmount] = useState(5000)
  const [confirm, setConfirm] = useState({ open:false, type: null, report:null })

  const act = (type, r) => setConfirm({ open:true, type, report:r })
  const doConfirm = () => {
    const { type, report } = confirm
    if (!report) return setConfirm({open:false, type:null, report:null})
    if (type==='fine'){
      policeTakeAction(report.id, 'fine', { plate:report.plate, amount:Number(amount)||0 })
      toast.push('Fine issued & license suspended', 'success')
    } else if (type==='reject'){
      policeTakeAction(report.id, 'reject'); toast.push('Report rejected', 'warn')
    } else {
      policeTakeAction(report.id, 'validate_ok'); toast.push('Report marked valid', 'success')
    }
    setConfirm({open:false, type:null, report:null})
  }

  return (
    <>
      <PageHeader
        title={t('police.title')}
        subtitle={t('police.incoming')}
        right={<div className="hint">Tip: set the fine before issuing</div>}
      />

      <div className="card">
        <h3>{t('police.incoming')}</h3>
        <table className="table responsive">
          <thead><tr>
            <th>{t('police.id')}</th><th>{t('police.plate')}</th><th>{t('police.note')}</th><th>{t('owner.status')}</th><th>{t('police.actions')}</th>
          </tr></thead>
          <tbody>
            {reports.map(r=>(
              <tr key={r.id}>
                <td data-label={t('police.id')}>{r.id}</td>
                <td data-label={t('police.plate')}>{r.plate}</td>
                <td data-label={t('police.note')}>{r.note}</td>
                <td data-label={t('owner.status')}><StatusPill status={r.status}/></td>
                <td data-label={t('police.actions')} style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  <button className="btn success" onClick={()=>act('valid', r)}>{t('police.valid')}</button>
                  <button className="btn danger" onClick={()=>act('reject', r)}>{t('police.reject')}</button>
                  <div style={{display:'flex',gap:6,alignItems:'center'}}>
                    <input className="input input-compact" style={{width:120}} value={amount} onChange={e=>setAmount(e.target.value)} />
                    <button className="btn warn" onClick={()=>act('fine', r)}>{t('police.fineSuspend')}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="hint">{t('police.autoSuspend')}</div>
      </div>

      <div className="card">
        <h3>{t('police.licenses')}</h3>
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

      <Modal
        open={confirm.open}
        title={confirm.type==='fine' ? t('police.fineSuspend') : confirm.type==='reject' ? t('police.reject') : t('police.valid')}
        onClose={()=>setConfirm({open:false,type:null,report:null})}
        actions={
          <>
            <button className="btn" onClick={()=>setConfirm({open:false,type:null,report:null})}>Cancel</button>
            <button className={`btn ${confirm.type==='reject'?'danger': confirm.type==='fine'?'warn':'success'}`} onClick={doConfirm}>Confirm</button>
          </>
        }>
        {confirm.report ? <>#{confirm.report.id} • {confirm.report.plate}</> : null}
      </Modal>
    </>
  )
}
