import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function PaymentCallback() {
  const { markFinePaid } = useApp()
  const nav = useNavigate()
  const loc = useLocation()
  const params = new URLSearchParams(loc.search)

  const [done, setDone] = useState(false)
  const status = params.get('status') // "success" | "failed" | "cancelled" etc.
  const fineId = (params.get('fineId') || '').toUpperCase()
  const txn = params.get('txn') || ''

  useEffect(() => {
    async function handle() {
      if (!fineId) return
      if (status === 'success') {
        // Record payment in app state; GSMB can later reactivate
        markFinePaid(fineId, txn || undefined)
      }
      setDone(true)
      // small delay then go to owner dashboard
      setTimeout(()=>nav('/owner'), 900)
    }
    handle()
  }, [fineId, status, txn, markFinePaid, nav])

  return (
    <div className="card">
      <h2>Payment Result</h2>
      <div className="card">
        <div>Status: <b>{(status||'unknown').toUpperCase()}</b></div>
        <div>Fine ID: <b>{fineId || '-'}</b></div>
        <div>Transaction: <b>{txn || '-'}</b></div>
      </div>
      <div className="hint">Updating your fines… You’ll be redirected to Owner Dashboard.</div>
    </div>
  )
}
