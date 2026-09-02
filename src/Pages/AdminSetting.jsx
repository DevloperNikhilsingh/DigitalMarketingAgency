import React, { useState } from 'react'
import AdminSidebar from '../Component/AdminDashboardComponent/OverviewTab/AdminSidebar'
import SettingsPanel from '../Component/AdminDashboardComponent/SettingTab/SettingsPanel'
import { useAuth } from '../Context/AuthContext'

const AdminSettings = () => {
    const { user } = useAuth()
    const [savedMsg, setSavedMsg] = useState('')

    const handleSaved = (msg) => {
        setSavedMsg(msg)
        setTimeout(() => setSavedMsg(''), 2500)
    }

    return (
        <div className='flex flex-col lg:flex-row bg-gray-50 min-h-screen'>
            <AdminSidebar />
            <main className='flex-1 p-4 md:p-6 flex flex-col gap-6 w-full min-w-0'>
                <div className='bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm'>
                    <h1 className='font-extrabold text-lg text-gray-900'>Settings</h1>
                    <p className='text-gray-500 text-sm'>Manage your admin profile, security, and notifications.</p>
                </div>

                {savedMsg && (
                    <div className='bg-green-50 text-green-600 text-sm font-semibold px-4 py-3 rounded-lg'>
                        {savedMsg}
                    </div>
                )}

                <SettingsPanel user={user} onSaved={handleSaved} />
            </main>
        </div>
    )
}

export default AdminSettings