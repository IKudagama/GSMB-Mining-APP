export default function StatusPill({ status }){
  const s = (status||'').toLowerCase()
  const cls = s.includes('active')||s.includes('paid')||s.includes('ok') ? 'ok' :
              s.includes('suspend')||s.includes('rejected')||s.includes('invalid')||s.includes('unpaid') ? 'bad' : 'warn'
  return <span className={`pill ${cls}`}>{status}</span>
}
