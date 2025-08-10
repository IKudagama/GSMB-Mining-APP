import { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ToastCtx = createContext(null)
export const useToast = () => useContext(ToastCtx)

export default function ToastProvider({ children }) {
  const [items, setItems] = useState([])
  const push = useCallback((msg, type='info')=>{
    const id = Math.random().toString(36).slice(2,9)
    setItems(arr => [...arr, { id, msg, type }])
    setTimeout(()=> setItems(arr=>arr.filter(x=>x.id!==id)), 2200)
  }, [])
  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div style={{position:'fixed', right:16, bottom:16, display:'grid', gap:8, zIndex:50}}>
        <AnimatePresence>
          {items.map(t=>(
            <motion.div key={t.id}
              initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:8}}
              className={`banner ${t.type==='error'?'error': t.type==='success'?'success':'warn'}`}>
              {t.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  )
}
