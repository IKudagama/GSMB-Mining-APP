import LanguageSwitcher from './LanguageSwitcher.jsx'

export default function PageHeader({ title, subtitle, right=null }) {
  return (
    <div className="page-header card" style={{display:'flex',gap:12,alignItems:'center',justifyContent:'space-between',flexWrap:'wrap'}}>
      <div>
        <div style={{fontSize:'1.25rem',fontWeight:700}}>{title}</div>
        {subtitle ? <div className="hint" style={{marginTop:6}}>{subtitle}</div> : null}
      </div>
      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        {right}
        <LanguageSwitcher compact />
      </div>
    </div>
  )
}
