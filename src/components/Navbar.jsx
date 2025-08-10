import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { useLang } from '../context/LangContext.jsx'

function LangSwitcher(){
  const { lang, setLang, t } = useLang()
  return (
    <div className="lang">
      <label className="visually-hidden">{t('lang.label')}</label>
      <select
        className="input input-compact"
        value={lang}
        onChange={(e)=>setLang(e.target.value)}
        aria-label={t('lang.label')}
      >
        <option value="en">{t('lang.en')}</option>
        <option value="si">{t('lang.si')}</option>
        <option value="ta">{t('lang.ta')}</option>
      </select>
    </div>
  )
}

export default function Navbar(){
  const { user, logout } = useApp()
  const { t } = useLang()
  return (
    <div className="nav">
      <div className="brand">🪨 {t('appTitle')}</div>
      <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
        <Link className="btn" to="/">{t('nav.public')}</Link>
        <Link className="btn" to="/login">{t('nav.login')}</Link>
        {user?.role==='police' && <Link className="btn" to="/police">{t('nav.police')}</Link>}
        {user?.role==='gsmb' && <Link className="btn" to="/gsmb">{t('nav.gsmb')}</Link>}
        {user?.role==='owner' && <Link className="btn" to="/owner">{t('nav.owner')}</Link>}
        {user ? <button className="btn danger" onClick={logout}>Logout</button> : null}
        <LangSwitcher />
      </div>
    </div>
  )
}
