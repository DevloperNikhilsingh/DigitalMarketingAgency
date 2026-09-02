import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutGrid, Layers, Users, Settings, LogOut, Globe, Menu, X, Briefcase, FileCheck  } from 'lucide-react'
import { useAuth } from '../../../Context/AuthContext'

const navItems = [
    { icon: LayoutGrid, label: 'Overview', path: '/admin/dashboard' },
    {icon: Briefcase , label: 'My Services', path: '/admin/dashboard/services' },
    { icon: Layers, label: 'Service Requests', path: '/admin/dashboard/requests' },
    { icon: Users, label: 'Employers', path: '/admin/dashboard/employers' },
    { icon: FileCheck, label: 'New Services', path: '/admin/dashboard/newservices' },
    { icon: Settings, label: 'Settings', path: '/admin/dashboard/settings' },
]

const AdminSidebar = () => {
    const location = useLocation()
    const { logout } = useAuth()
    const [mobileOpen, setMobileOpen] = useState(false)

    const SidebarContent = () => (
        <>
            <div>
                <div className='flex flex-col items-center text-center mb-8'>
                    <div className='relative w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center font-extrabold text-xl text-black mb-2'>
                        A
                        <span className='absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white'></span>
                    </div>
                    <p className='font-bold text-gray-900 text-sm'>Admin User</p>
                    <p className='text-gray-400 text-xs'>Super Admin</p>
                </div>

                <nav className='flex flex-col gap-1'>
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const active = location.pathname === item.path
                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300
                                    ${active ? 'bg-yellow-400 text-black' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Icon size={18} />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className='flex flex-col gap-3'>
                <button
                    onClick={logout}
                    className='flex items-center gap-2 text-gray-500 text-sm font-semibold px-4 py-2 transition-colors duration-300 hover:text-red-500'
                >
                    <LogOut size={16} /> Logout
                </button>

                <Link
                    to='/'
                    className='flex items-center justify-center gap-2 border border-yellow-400 text-gray-900 text-sm font-semibold px-4 py-2.5 rounded-lg
        transition-all duration-300 hover:bg-yellow-400'
                >
                    <Globe size={15} /> Visit Website
                </Link>
            </div>
        </>
    )

    return (
        <>
            {/* Mobile top bar */}
            <div className='lg:hidden sticky top-0 z-40 bg-white border-b border-gray-100 flex items-center justify-between px-4 py-3'>
                <h2 className='font-extrabold text-gray-900'>Admin Panel</h2>
                <button
                    onClick={() => setMobileOpen(true)}
                    className='p-2 text-gray-700'
                    aria-label='Open menu'
                >
                    <Menu size={22} />
                </button>
            </div>

            {/* Mobile overlay */}
            <div
                onClick={() => setMobileOpen(false)}
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden
                    ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />

            {/* Mobile drawer */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-2xl px-5 py-6 flex flex-col justify-between
                    transform transition-transform duration-300 ease-in-out lg:hidden
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <button
                    onClick={() => setMobileOpen(false)}
                    className='absolute top-4 right-4 text-gray-500 hover:text-gray-800'
                    aria-label='Close menu'
                >
                    <X size={20} />
                </button>
                <SidebarContent />
            </aside>

            {/* Desktop fixed sidebar */}
            <aside className='hidden lg:flex w-60 shrink-0 bg-white border-r border-gray-100 flex-col justify-between h-screen sticky top-0 px-5 py-6'>
                <SidebarContent />
            </aside>
        </>
    )
}

export default AdminSidebar