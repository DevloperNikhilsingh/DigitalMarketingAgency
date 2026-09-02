import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/Home'
import ServiceDetailPage from './Pages/ServiceDetailPage'
import ServicePage from './Pages/ServicePage'
import AboutPage from './Pages/AboutPage'
import Contact from './Pages/Contact'
import ScrollToTop from './Component/AnimationUI/ScrollToTop'
import Portfolio from './Pages/Portfolio'
import { AuthProvider } from './Context/AuthContext'
import AdminDashboard from './Pages/AdminDashboard'
import EmployerDashboard from './Pages/EmployerDashboard'
import AdminServiceRequests from './Pages/AdminServiceRequests'
import AdminEmployers from './Pages/AdminEmployers'
import AdminMyServices from './Pages/AdminMyServices'
import AdminSettings from './Pages/AdminSetting'
import AdminNewServices from './Pages/AdminNewServices'

function App() {
  return (
    <>
    <AuthProvider >
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/service' element={ <ServicePage /> } />
        <Route path='/services/:serviceId' element={<ServiceDetailPage />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/employer/dashboard' element={<EmployerDashboard />} />
        <Route path='/admin/dashboard/requests' element={<AdminServiceRequests />} />
        <Route path='/admin/dashboard/employers' element={<AdminEmployers />} />
        <Route path='/admin/dashboard/services' element={<AdminMyServices />} />
        <Route path='/admin/dashboard/settings' element={<AdminSettings />} />
        <Route path='/admin/dashboard/newservices' element={<AdminNewServices />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App