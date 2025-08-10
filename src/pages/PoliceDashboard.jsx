import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import StatusPill from '../components/StatusPill.jsx'

export default function PoliceDashboard(){
  const { reports, licenses, policeTakeAction } = useApp()
  const [amount, setAmount] = useState(5000)

  const makeFine = (r) => {
    policeTakeAction(r.id, 'fine', { plate:r.plate, amount:Number(amount)||0 })
  }

  const reject = (r) => policeTakeAction(r.id, 'reject')
  const validateOk = (r) => policeTakeAction(r.id, 'validate_ok')

  return (
    <div className="card">
      <h2>Police Dashboard</h2>

      <div className="card">
        <h3>Incoming Reports</h3>
        <table className="table">
          <thead><tr><th>ID</th><th>Plate</th><th>Note</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {reports.map(r=>(
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.plate}</td>
                <td>{r.note}</td>
                <td><StatusPill status={r.status}/></td>
                <td style={{display:'flex',gap:8}}>
                  <button className="btn" onClick={()=>validateOk(r)}>Valid</button>
                  <button className="btn danger" onClick={()=>reject(r)}>Reject</button>
                  <div style={{display:'flex',gap:6,alignItems:'center'}}>
                    <input className="input" style={{width:110}} value={amount} onChange={e=>setAmount(e.target.value)} />
                    <button className="btn warn" onClick={()=>makeFine(r)}>Fine & Suspend</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="hint">Issuing a fine automatically suspends the related license.</div>
      </div>

      <div className="card">
        <h3>Licenses</h3>
        <table className="table">
          <thead><tr><th>Plate</th><th>Valid From</th><th>Valid To</th><th>Status</th></tr></thead>
          <tbody>
            {licenses.map(l=>(
              <tr key={l.id}><td>{l.plate}</td><td>{l.validFrom}</td><td>{l.validTo}</td><td><StatusPill status={l.status}/></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
