import React from 'react'
import AdminSidebar from '../Component/AdminDashboardComponent/OverviewTab/AdminSidebar'
import EnquiriesTable from '../Component/AdminDashboardComponent/EnquiryTab/EnquiriesTable'
import { enquiries } from '../data/AdminenquiriesData'

const AdminEnquiries = () => {
    return (
        <div className='flex flex-col lg:flex-row bg-gray-50 min-h-screen'>
            <AdminSidebar />
            <main className='flex-1 p-4 md:p-6 flex flex-col gap-5 w-full min-w-0'>
                <div className='bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm'>
                    <h1 className='font-extrabold text-lg text-gray-900'>Enquiries</h1>
                    <p className='text-gray-500 text-sm'>Messages submitted by visitors through the contact form.</p>
                </div>
                <EnquiriesTable enquiries={enquiries} />
            </main>
        </div>
    )
}

export default AdminEnquiries