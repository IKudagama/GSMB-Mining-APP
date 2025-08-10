import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

/**
 * Replace this with LankaPay's actual endpoint and params.
 * For example, they might need:
 * - merchantId
 * - orderId / referenceNo
 * - amount
 * - currency
 * - returnUrl
 * - hash/signature
 */
function buildLankaPayUrl({ fine, merchantId, returnUrl }) {
  const params = new URLSearchParams({
    merchantId,
    orderId: fine.id,         // your reference for this fine
    amount: fine.amount,
    currency: 'LKR',
    returnUrl,                // where LankaPay will redirect after payment
    // other params LankaPay requires...
  })

  // Example sandbox endpoint (replace with live one when ready)
  return `https://sandbox.lankapay.lk/pay?${params.toString()}`
}

export default function PaymentInit() {
  const { fines } = useApp()
  const loc = useLocation()
  const params = new URLSearchParams(loc.search)
  const fineId = params.get('fineId')
  const fine = useMemo(
    () => fines.find(f => f.id === (fineId || '').toUpperCase()),
    [fines, fineId]
  )

  useEffect(() => {
    if (!fine) return
    if (fine.status !== 'unpaid') return

    const merchantId = 'GSMB-DEMO-001' // replace with your merchant ID
    const returnUrl = `${window.location.origin}/payment/callback`
    const payUrl = buildLankaPayUrl({ fine, merchantId, returnUrl })

    // Redirect user to LankaPay gateway
    window.location.assign(payUrl)
  }, [fine])

  if (!fine) {
    return (
      <div className="card">
        <h2>Payment</h2>
        <div>Fine not found. Go back to Owner Dashboard.</div>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Redirecting to LankaPay...</h2>
      <div>Please wait while we connect you to the payment gateway.</div>
    </div>
  )
}
