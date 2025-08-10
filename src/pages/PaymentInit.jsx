import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { nanoid } from 'nanoid'

/**
 * For real LankaPay:
 * - Replace `buildLankaPayUrl` with their actual endpoint & required params.
 * - Keep returnUrl = `${location.origin}/payment/callback`
 */
function buildLankaPayUrl({ fine, merchantId, returnUrl }) {
  const query = new URLSearchParams({
    merchantId,
    amount: String(fine.amount),
    currency: 'LKR',
    reference: fine.id,
    plate: fine.plate,
    // any extra metadata the gateway supports:
    description: `GSMB Fine ${fine.id} for ${fine.plate}`,
    returnUrl,
  })
  // DEMO endpoint (placeholder). In prod, point to LankaPay gateway URL.
  return `https://pay.sandbox.lankapay.lk/checkout?${query.toString()}`
}

export default function PaymentInit() {
  const { fines, user } = useApp()
  const nav = useNavigate()
  const loc = useLocation()
  const params = new URLSearchParams(loc.search)
  const fineId = params.get('fineId')

  const fine = useMemo(() => fines.find(f => f.id === (fineId||'').toUpperCase()), [fines, fineId])
  const merchantId = 'GSMB-DEMO-001' // replace with your real merchant id when ready
  const returnUrl = `${window.location.origin}/payment/callback`

  useEffect(() => {
    if (!fine) return
    if (fine.status !== 'unpaid') {
      // already paid or invalid
      nav('/owner')
    }
  }, [fine, nav])

  if (!fine) {
    return (
      <div className="card">
        <h2>Payment</h2>
        <div>Fine not found. Go back to <a href="/owner">Owner Dashboard</a>.</div>
      </div>
    )
  }

  const lpUrl = buildLankaPayUrl({ fine, merchantId, returnUrl })

  return (
    <div className="card">
      <h2>Pay via LankaPay</h2>
      <div className="hint">You are paying fine <b>{fine.id}</b> for plate <b>{fine.plate}</b></div>
      <div className="card">
        <div>Amount: <b>Rs. {fine.amount}</b></div>
        <div>Merchant: <b>{merchantId}</b></div>
        <div>Will return to: <code>{returnUrl}</code></div>
      </div>

      {/* In production you would do: window.location.assign(lpUrl) */}
      <div className="row">
        <button className="btn primary" onClick={()=>{
          // Simulate external redirect and success callback from the gateway
          const txn = 'LP-' + nanoid(8).toUpperCase()
          // For real gateway: they will redirect back to returnUrl with params
          // e.g., ?status=success&fineId=...&txn=...
          window.location.assign(`${returnUrl}?status=success&fineId=${fine.id}&txn=${txn}`)
        }}>Proceed to LankaPay</button>

        <button className="btn" onClick={()=>{
          const txn = 'LP-' + nanoid(5).toUpperCase()
          window.location.assign(`${returnUrl}?status=failed&fineId=${fine.id}&txn=${txn}`)
        }}>Simulate Fail</button>

        {/* If you want to actually visit sandbox URL for manual testing */}
        <a className="btn" href={lpUrl} target="_blank" rel="noreferrer">
          Open Sandbox URL
        </a>
      </div>

      <div className="hint">
        <b>Note:</b> Replace the simulation with real redirect once you have the official LankaPay gateway URL and params.
      </div>
    </div>
  )
}
