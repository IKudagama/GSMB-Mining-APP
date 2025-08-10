import { Routes, Route, Navigate, Link } from 'react-router-dom'
import PublicPortal from './pages/PublicPortal.jsx'
import Login from './pages/Login.jsx'
import PoliceDashboard from './pages/PoliceDashboard.jsx'
import GsmbDashboard from './pages/GsmbDashboard.jsx'
import OwnerDashboard from './pages/OwnerDashboard.jsx'
import NotFound from './pages/NotFound.jsx'
import { useApp } from './context/AppContext.jsx'
import Navbar from './components/Navbar.jsx'
import PaymentInit from './pages/PaymentInit.jsx'
import PaymentCallback from './pages/PaymentCallback.jsx'

export default function App() {
  const { user } = useApp()
  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<PublicPortal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/police" element={user?.role==='police' ? <PoliceDashboard/> : <Navigate to="/login" />} />
          <Route path="/gsmb" element={user?.role==='gsmb' ? <GsmbDashboard/> : <Navigate to="/login" />} />
          <Route path="/owner" element={user?.role==='owner' ? <OwnerDashboard/> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/pay" element={user?.role==='owner' ? <PaymentInit/> : <Navigate to="/login" />} />
          <Route path="/payment/callback" element={<PaymentCallback/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <footer className="footer">
        <Link to="/">Public</Link> · <Link to="/login">Login</Link> · <Link to="/police">Police</Link> · <Link to="/gsmb">GSMB</Link> · <Link to="/owner">Owner</Link>
      </footer>
    </div>
  )
}
