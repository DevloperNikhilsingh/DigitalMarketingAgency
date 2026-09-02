import React, { useState, useRef, useEffect } from 'react'
import { MoreVertical, Ban, CheckCircle2, Trash2, Eye } from 'lucide-react'

const EmployerActionsMenu = ({ employer, onView, onSuspend, onActivate, onDelete }) => {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className='relative' ref={ref}>
            <button
                onClick={() => setOpen((p) => !p)}
                className='p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors duration-200'
                aria-label='Actions'
            >
                <MoreVertical size={16} />
            </button>

            <div
                className={`absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-30
                    transition-all duration-200 origin-top-right
                    ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
                <button
                    onClick={() => { setOpen(false); onView(employer) }}
                    className='w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200'
                >
                    <Eye size={15} /> View Details
                </button>

                {employer.status === 'Active' ? (
                    <button
                        onClick={() => { setOpen(false); onSuspend(employer.id) }}
                        className='w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors duration-200'
                    >
                        <Ban size={15} /> Suspend
                    </button>
                ) : (
                    <button
                        onClick={() => { setOpen(false); onActivate(employer.id) }}
                        className='w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200'
                    >
                        <CheckCircle2 size={15} /> Activate
                    </button>
                )}

                <button
                    onClick={() => { setOpen(false); onDelete(employer.id) }}
                    className='w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors duration-200 border-t border-gray-50'
                >
                    <Trash2 size={15} /> Remove
                </button>
            </div>
        </div>
    )
}

export default EmployerActionsMenu