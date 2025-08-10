import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({ open, title, children, onClose, actions=null }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fade-in" style={{
          position:'fixed', inset:0, background:'rgba(0,0,0,.5)', display:'grid', placeItems:'center', zIndex:60
        }} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
          <motion.div onClick={e=>e.stopPropagation()}
            initial={{scale:.98, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:.98, opacity:0}}
            className="card" style={{width:'min(560px, 92vw)'}}>
            <div style={{fontWeight:800, marginBottom:8}}>{title}</div>
            <div className="hint" style={{marginBottom:12}}>{children}</div>
            <div className="row" style={{justifyContent:'flex-end'}}>{actions}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
