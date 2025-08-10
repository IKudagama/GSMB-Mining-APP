import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { useLang } from '../context/LangContext.jsx'

export default function Login(){
  const { t } = useLang()
  const { login } = useApp()
  const [username, setUsername] = useState('police1')
  const [password, setPassword] = useState('police123')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    try {
      login(username, password)
      if (username.startsWith('police')) nav('/police')
      else if (username.startsWith('gsmb')) nav('/gsmb')
      else nav('/owner')
    } catch (e) {
      setErr(t('login.invalidCreds'))
    }
  }

  return (
    <div className="card">
      <h2>{t('login.title')}</h2>
      <form onSubmit={onSubmit} className="row">
        <input className="input" value={username} onChange={e=>setUsername(e.target.value)} placeholder={t('login.username')} />
        <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder={t('login.password')} />
        <button className="btn primary" type="submit">{t('login.loginBtn')}</button>
      </form>
      {err && <div className="hint" style={{color:'#fecaca'}}>{err}</div>}

      <div className="card">
        <b>{t('login.demo')}</b>
        <ul className="hint">
          <li>{t('login.police')}: <code>police1 / police123</code></li>
          <li>{t('login.gsmb')}: <code>gsmb1 / gsmb123</code></li>
          <li>{t('login.owner')}: <code>owner1 / owner123</code></li>
        </ul>
      </div>
    </div>
  )
}
