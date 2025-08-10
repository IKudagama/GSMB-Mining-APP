import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { useLang } from '../context/LangContext.jsx'
import { FaBars, FaTimes } from 'react-icons/fa'
import LanguageSwitcher from './LanguageSwitcher.jsx'

export default function Navbar(){
  const { user, logout } = useApp()
  const { t } = useLang()
  const [open, setOpen] = useState(false)

  const Links = () => (<>
    <Link className="btn ghost" to="/" onClick={()=>setOpen(false)}>{t('nav.public')}</Link>
    <Link className="btn ghost" to="/login" onClick={()=>setOpen(false)}>{t('nav.login')}</Link>
    {user?.role==='police' && <Link className="btn ghost" to="/police" onClick={()=>setOpen(false)}>{t('nav.police')}</Link>}
    {user?.role==='gsmb' && <Link className="btn ghost" to="/gsmb" onClick={()=>setOpen(false)}>{t('nav.gsmb')}</Link>}
    {user?.role==='owner' && <Link className="btn ghost" to="/owner" onClick={()=>setOpen(false)}>{t('nav.owner')}</Link>}
    {user && <button className="btn danger" onClick={()=>{logout(); setOpen(false)}}>Logout</button>}
  </>)

  return (
    <div className="nav">
      <div className="nav-inner">
        <div className="brand"><div className="brand-badge">⛏️</div><div>GSMB</div></div>
        <div className="row" style={{gap:8, alignItems:'center'}}>
          <LanguageSwitcher compact />
          <button className="btn" aria-label="Menu" onClick={()=>setOpen(v=>!v)}>{open ? <FaTimes/> : <FaBars/>}</button>
        </div>
      </div>
      {open && <div className="card" style={{margin:'8px 12px', display:'grid', gap:8}}><Links/></div>}
    </div>
  )
}
