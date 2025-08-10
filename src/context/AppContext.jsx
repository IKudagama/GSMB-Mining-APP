import React, { createContext, useContext, useMemo, useState } from 'react'
import { seed } from '../data/seed.js'
import { nanoid } from 'nanoid'

const AppCtx = createContext(null)
export const useApp = () => useContext(AppCtx)

export function AppProvider({ children }) {
  // Clone seed so edits don’t mutate original
  const [users] = useState([...seed.users])
  const [lorries, setLorries] = useState([...seed.lorries])
  const [licenses, setLicenses] = useState([...seed.licenses])
  const [reports, setReports] = useState([...seed.reports])
  const [fines, setFines] = useState([...seed.fines])
  const [user, setUser] = useState(null)

  const login = (username, password) => {
    const u = users.find(u => u.username===username && u.password===password)
    if (!u) throw new Error('Invalid credentials')
    setUser({ id: u.id, username: u.username, role: u.role, name: u.name })
  }
  const logout = () => setUser(null)

  // Helpers
  const getLicenseByPlate = (plate) => licenses.find(x => x.plate.toUpperCase()===plate.toUpperCase())
  const isLicenseCurrentlyValid = (lic) => {
    const now = new Date()
    const from = new Date(lic.validFrom)
    const to = new Date(lic.validTo)
    return lic.status==='active' && now>=from && now<=to
  }

  const submitReport = ({ plate, note, location }) => {
    const r = { id: nanoid(8), plate: plate.toUpperCase(), note, location, status:'open', createdAt: new Date().toISOString(), assignedTo:null, fineId:null }
    setReports(prev => [r, ...prev])
    return r.id
  }

  const policeTakeAction = (reportId, action, payload={}) => {
    // action: 'reject', 'validate_ok', 'fine'
    setReports(prev => prev.map(r => r.id===reportId ? { ...r, status: action==='fine' ? 'fined' : (action==='reject' ? 'rejected' : 'validated'), note: r.note, assignedTo: user?.id } : r))
    if (action==='fine') {
      const { plate, amount } = payload
      const lic = getLicenseByPlate(plate)
      if (lic) {
        // suspend license
        setLicenses(prev => prev.map(l => l.id===lic.id ? { ...l, status:'suspended' } : l))
      }
      const f = { id: nanoid(6).toUpperCase(), plate, reportId, amount, status:'unpaid', paidAt:null, ref:null }
      setFines(prev => [f, ...prev])
      setReports(prev => prev.map(r => r.id===reportId ? { ...r, fineId: f.id } : r))
    }
  }

  const markFinePaid = (fineId, ref='TXN-'+nanoid(5).toUpperCase()) => {
    let finePlate = null
    setFines(prev => prev.map(f => {
      if (f.id===fineId) { finePlate = f.plate; return { ...f, status:'paid', paidAt: new Date().toISOString(), ref } }
      return f
    }))
    return { fineId, ref, plate:finePlate }
  }

  const gsmbReactivate = (plate) => {
    setLicenses(prev => prev.map(l => l.plate.toUpperCase()===plate.toUpperCase() ? { ...l, status:'active' } : l))
    // close related reports
    setReports(prev => prev.map(r => (r.plate.toUpperCase()===plate.toUpperCase() && r.status==='fined') ? { ...r, status:'closed' } : r))
  }

  const value = useMemo(() => ({
    user, login, logout,
    users, lorries, licenses, reports, fines,
    getLicenseByPlate, isLicenseCurrentlyValid,
    submitReport, policeTakeAction, markFinePaid, gsmbReactivate
  }), [user, users, lorries, licenses, reports, fines])

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}
