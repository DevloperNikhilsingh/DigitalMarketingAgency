import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, LogOut } from 'lucide-react'
import { useAuth } from '../../Context/AuthContext'

const UserMenu = () => {
    const { user, logout } = useAuth()
    const [open, setOpen] = useState(false)
    const menuRef = useRef(null)
    const navigate = useNavigate()

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (!user) return null

    const dashboardPath = user.role === 'admin' ? '/admin/dashboard' : '/employer/dashboard'
    const firstLetter = user.name?.charAt(0).toUpperCase() || 'U'

    const handleLogout = () => {
        setOpen(false)
        logout()
        navigate('/')
    }

    return (
        <div className='relative' ref={menuRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className='w-9.5 h-9.5 rounded-full bg-amber-400 text-black font-bold text-sm
                    flex items-center justify-center shadow-md transition-all duration-300
                    hover:bg-amber-300 hover:shadow-amber-400/40 hover:shadow-lg active:scale-95'
                aria-label='User menu'
            >
                {firstLetter}
            </button>

            <div
                className={`absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden
                    transition-all duration-200 origin-top-right z-50
                    ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
                <div className='px-4 py-3 border-b border-gray-100'>
                    <p className='text-sm font-bold text-gray-900 truncate'>{user.name}</p>
                    <p className='text-xs text-gray-400 truncate'>{user.email}</p>
                </div>

                <Link
                    to={dashboardPath}
                    onClick={() => setOpen(false)}
                    className='flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700
                        hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200'
                >
                    <LayoutDashboard size={16} /> Dashboard
                </Link>

                <button
                    onClick={handleLogout}
                    className='w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700
                        hover:bg-red-50 hover:text-red-500 transition-colors duration-200'
                >
                    <LogOut size={16} /> Logout
                </button>
            </div>
        </div>
    )
}

export default UserMenu