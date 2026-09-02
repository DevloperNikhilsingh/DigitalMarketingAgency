import React, { useState } from 'react'
import { Plus, Briefcase } from 'lucide-react'
import ServiceCard from '../Component/AdminDashboardComponent/MyServices.jsx/ServiceCard'
import AddServiceModal from '../Component/AdminDashboardComponent/MyServices.jsx/AddServiceModal'
import { myServices as initialServices } from '../data/myServicesData'
import AdminSidebar from '../Component/AdminDashboardComponent/OverviewTab/AdminSidebar'

const AdminMyServices = () => {
    const [services, setServices] = useState(initialServices)
    const [showAddModal, setShowAddModal] = useState(false)

    const handleAddService = (newService) => {
        setServices((prev) => [newService, ...prev])
    }

    const handleToggleStatus = (id) => {
        setServices((prev) =>
            prev.map((s) => (s.id === id ? { ...s, status: s.status === 'Active' ? 'Paused' : 'Active' } : s))
        )
    }

    const handleDelete = (id) => {
        setServices((prev) => prev.filter((s) => s.id !== id))
    }

    return (
        <div className='flex flex-col lg:flex-row bg-gray-50 min-h-screen'>
            <AdminSidebar />
            <main className='flex-1 p-4 md:p-6 flex flex-col gap-6 w-full min-w-0'>
                {/* Page header — more like a real header bar */}
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm'>
                    <div>
                        <h1 className='font-extrabold text-lg text-gray-900'>My Services</h1>
                        <p className='text-gray-500 text-sm'>Manage the services you're currently offering.</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className='flex items-center justify-center gap-2 bg-amber-400 text-black text-sm font-bold px-4 py-2.5 rounded-lg shadow-md
                transition-all duration-300 hover:bg-amber-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95'
                    >
                        <Plus size={16} /> Add Service
                    </button>
                </div>

                {/* Cards, with top margin below header */}
                {services.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-1'>
                        {services.map((service) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                onToggleStatus={handleToggleStatus}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center gap-3 py-20 text-center'>
                        <div className='w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center'>
                            <Briefcase className='text-amber-500' size={24} />
                        </div>
                        <p className='text-gray-500 text-sm'>You haven't added any services yet.</p>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className='text-sm font-semibold text-amber-500 hover:underline'
                        >
                            Add your first service
                        </button>
                    </div>
                )}

                {showAddModal && (
                    <AddServiceModal onClose={() => setShowAddModal(false)} onAdd={handleAddService} />
                )}
            </main>
        </div>
    )
}

export default AdminMyServices