import { useApp } from '../context/AppContext.jsx'
import { useState } from 'react'
import StatusPill from '../components/StatusPill.jsx'

export default function OwnerDashboard(){
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
    <div className="card">
      <h2>Owner Dashboard</h2>
      <div className="card">
        <h3>My Licenses</h3>
        <table className="table">
          <thead><tr><th>Plate</th><th>From</th><th>To</th><th>Status</th></tr></thead>
          <tbody>
            {myLicenses.map(l=>(
              <tr key={l.id}><td>{l.plate}</td><td>{l.validFrom}</td><td>{l.validTo}</td><td><StatusPill status={l.status}/></td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>My Fines</h3>
        <table className="table">
          <thead><tr><th>Fine ID</th><th>Plate</th><th>Amount</th><th>Status</th><th>Ref</th><th>Action</th>
          </tr></thead>
          <tbody>
  {myFines.map(f=>(
    <tr key={f.id}>
      <td>{f.id}</td>
      <td>{f.plate}</td>
      <td>Rs. {f.amount}</td>
      <td><StatusPill status={f.status}/></td>
      <td>{f.ref || '-'}</td>
      <td>
        {f.status === 'unpaid' ? (
          <a className="btn primary" href={`/pay?fineId=${f.id}`}>Pay via LankaPay</a>
        ) : (
          <span className="hint">—</span>
        )}
      </td>
    </tr>
  ))}
</tbody>
        </table>
        <div className="row">
          <input className="input" placeholder="Enter Fine ID to pay" value={fineId} onChange={e=>setFineId(e.target.value.toUpperCase())}/>
          <button className="btn success" onClick={pay}>Mark Paid</button>
        </div>
        {receipt && <div className="hint">Payment recorded. Ref: <b>{receipt.ref}</b> for Fine <b>{receipt.fineId}</b>.</div>}
      </div>
    </div>
  )
}
