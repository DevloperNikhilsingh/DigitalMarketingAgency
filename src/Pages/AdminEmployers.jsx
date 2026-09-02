import React from 'react'
import AdminSidebar from '../Component/AdminDashboardComponent/OverviewTab/AdminSidebar'
import EmployersTable from '../Component/AdminDashboardComponent/EmployerTab/EmployersTable'
import { employers } from '../data/employersData'
const AdminEmployers = () => {
    return (
        <div className='flex flex-col lg:flex-row bg-gray-50 min-h-screen'>
            <AdminSidebar />
            <main className='flex-1 p-4 md:p-6 flex flex-col gap-5 w-full min-w-0'>
                <div>
                    <h1 className='font-extrabold text-lg text-gray-900'>Employers</h1>
                    <p className='text-gray-500 text-sm'>Manage registered employers and their running services.</p>
                </div>
                <EmployersTable employers={employers} />
            </main>
        </div>
    )
}

export default AdminEmployers