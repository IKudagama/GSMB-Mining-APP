import { useLang } from '../context/LangContext.jsx'

export default function LanguageSwitcher({ compact=false }) {
  const { lang, setLang, t } = useLang()
  return (
    <div style={{display:'flex',alignItems:'center',gap:8}}>
      {!compact && <span className="hint">{t('lang.label')}:</span>}
      <select
        className={`input ${compact ? 'input-compact' : ''}`}
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
