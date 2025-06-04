import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import Overview from '../components/dashboard/Overview'
import Messages from './Messages'
import { useAuth } from '../context/AuthContext'
import Notifications from './Notifications'
import Booking from '../components/Generics/Booking'
import Transactions from '../components/Generics/Transactions'
import Profile from '../components/settings/Profile'
import Support from '../components/settings/Support'
import Security from '../components/settings/Security'
import Listings from './Listings'
import ServiceRequest from './ServiceRequest'
import ServiceContractor from './ServiceContractor'
import AddListCar from './AddListCar'
import ClubMembership from './ClubMembership'
import Accounting from '../components/Integration/Accounting'
import Xero from '../components/Integration/Xero'
import Myob from '../components/Integration/Myob'

const Dashboard = () => {
  const { user } = useAuth()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log("Toggling sidebar, new state:", !isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isSidebarOpen) {
      console.log("Closing sidebar on overlay click");
      setIsSidebarOpen(false);
    }
  };
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} onClose={closeSidebar} />
      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/bookings" element={<Booking />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/support" element={<Support />} />
            <Route path="/security" element={<Security />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/service-request" element={<ServiceRequest />} />
            <Route path="/service-contractor" element={<ServiceContractor />} />
            <Route path="/addlistcar" element={<AddListCar />} />
            <Route path="/ClubMembership" element={<ClubMembership />} />
            <Route path="/accounting" element={<Accounting />} />
            
             <Route path="xero" element={<Xero/>} />
              <Route path="/myob" element={<Myob />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default Dashboard