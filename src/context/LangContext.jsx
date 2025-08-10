import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from '../i18n/translations.js'

const LangCtx = createContext(null)
export const useLang = () => useContext(LangCtx)

const FALLBACK = 'en'
const SUPPORTED = ['en','si','ta']

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('lang')
    if (saved && SUPPORTED.includes(saved)) return saved
    // Try browser language
    const nav = (navigator.language || 'en').slice(0,2)
    if (SUPPORTED.includes(nav)) return nav
    return FALLBACK
  })

  useEffect(()=> localStorage.setItem('lang', lang), [lang])

  const dict = translations[lang] || translations[FALLBACK]

  // Simple translator. Supports value injection: t('hello', {name:'Sam'})
  const t = (key, vars={}) => {
    const parts = key.split('.')
    let cur = dict
    for (const p of parts) {
      if (cur && typeof cur === 'object' && p in cur) cur = cur[p]
      else return key
    }
    if (typeof cur === 'string') {
      return cur.replace(/\{(\w+)\}/g, (_,k)=> (vars[k] ?? `{${k}}`))
    }
    return key
  }

  const value = useMemo(()=>({ lang, setLang, t, dict }), [lang, dict])

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>
}
