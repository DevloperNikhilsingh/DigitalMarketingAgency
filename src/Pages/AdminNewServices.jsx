import React from 'react'
import AdminSidebar from '../Component/AdminDashboardComponent/OverviewTab/AdminSidebar'
import PendingServicesTable from '../Component/AdminDashboardComponent/NewServices/PendingServicesTable'
import { pendingServices } from '../data/AdminpendingServicesData'

const AdminNewServices = () => {
    const handleApprove = (service) => {
        // TODO: once backend exists, push this into the live `services` array
        // that powers ServicePage.jsx — for now this is a placeholder hook
        console.log('Approved — add to live services:', service)
    }

    const handleReject = (id) => {
        console.log('Rejected:', id)
    }

    return (
        <div className='flex flex-col lg:flex-row bg-gray-50 min-h-screen'>
            <AdminSidebar />
            <main className='flex-1 p-4 md:p-6 flex flex-col gap-5 w-full min-w-0'>
                <div className='bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm'>
                    <h1 className='font-extrabold text-lg text-gray-900'>Pending Services</h1>
                    <p className='text-gray-500 text-sm'>Review and approve services submitted by employers.</p>
                </div>
                <PendingServicesTable services={pendingServices} onApprove={handleApprove} onReject={handleReject} />
            </main>
        </div>
    )
}

export default AdminNewServices