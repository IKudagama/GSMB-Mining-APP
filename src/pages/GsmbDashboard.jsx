import { useApp } from '../context/AppContext.jsx'
import StatusPill from '../components/StatusPill.jsx'
import { useState } from 'react'

export default function GsmbDashboard(){
  const { fines, licenses, gsmbReactivate } = useApp()
  const [filter, setFilter] = useState('paid')

  const suspendedPlates = new Set(licenses.filter(l=>l.status==='suspended').map(l=>l.plate))

  return (
    <div className="card">
      <h2>GSMB Dashboard</h2>

      <div className="card">
        <h3>Fines</h3>
        <div className="row">
          <select className="input" style={{maxWidth:200}} value={filter} onChange={e=>setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
        <table className="table">
          <thead><tr><th>Fine ID</th><th>Plate</th><th>Amount</th><th>Status</th><th>Reference</th><th>Action</th></tr></thead>
          <tbody>
            {fines.filter(f=>filter==='all' || f.status===filter).map(f=>(
              <tr key={f.id}>
                <td>{f.id}</td><td>{f.plate}</td><td>Rs. {f.amount}</td>
                <td><StatusPill status={f.status}/></td>
                <td>{f.ref || '-'}</td>
                <td>
                  {f.status==='paid' && suspendedPlates.has(f.plate) &&
                    <button className="btn success" onClick={()=>gsmbReactivate(f.plate)}>Reactivate License</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="hint">Only paid fines for suspended plates can be reactivated.</div>
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
