import React from 'react'
import AdminSidebar from '../Component/AdminDashboardComponent/OverviewTab/AdminSidebar'
import ServiceRequestsTable from '../Component/AdminDashboardComponent/ServiceRequestTab/ServiceRequestsTable'
import { serviceRequests } from '../data/ServiceDetailData'

const AdminServiceRequests = () => {
    return (
        <div className='flex flex-col lg:flex-row bg-gray-50 min-h-screen'>
            <AdminSidebar />
            <main className='flex-1 p-4 md:p-6 flex flex-col gap-5 w-full min-w-0'>
                <div>
                    <h1 className='font-extrabold text-lg text-gray-900'>Service Requests</h1>
                    <p className='text-gray-500 text-sm'>Manage and track all incoming service requests.</p>
                </div>
                <ServiceRequestsTable requests={serviceRequests} />
            </main>
        </div>
    )
}

export default AdminServiceRequests