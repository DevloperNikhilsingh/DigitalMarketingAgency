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
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'
import AdminEnquiries from './Pages/AdminEnquiries'
import HomeDashboard from './Component/EmployeeDashboard/Common/HomeDashboard'
import ServiceRequests from './Component/EmployeeDashboard/ServiceRequestMenu/ServiceRequests'

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

        <Route path='/admin/dashboard' element={
          <ProtectedRoute role='admin'><AdminDashboard /></ProtectedRoute>
        } />
        <Route path='/admin/dashboard/requests' element={
          <ProtectedRoute role='admin'><AdminServiceRequests /></ProtectedRoute>
        } />
        <Route path='/admin/dashboard/employers' element={
          <ProtectedRoute role='admin'><AdminEmployers /></ProtectedRoute>
        } />
        <Route path='/admin/dashboard/services' element={
          <ProtectedRoute role='admin'><AdminMyServices /></ProtectedRoute>
        } />
        <Route path='/admin/dashboard/settings' element={
          <ProtectedRoute role='admin'><AdminSettings /></ProtectedRoute>
        } />
        <Route path='/admin/dashboard/newservices' element={
          <ProtectedRoute role='admin'><AdminNewServices /></ProtectedRoute>
        } />
        <Route path='/admin/dashboard/enquiry' element={<ProtectedRoute><AdminEnquiries /></ProtectedRoute>
        } />

        <Route path='/employer/dashboard' element={
          <ProtectedRoute role='employer'><HomeDashboard /></ProtectedRoute>
        } />
        <Route path='/employer/dashboard/servicerequest' element={
          <ProtectedRoute><ServiceRequests /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App