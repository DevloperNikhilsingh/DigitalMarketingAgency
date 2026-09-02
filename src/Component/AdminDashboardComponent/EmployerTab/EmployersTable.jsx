import React, { useState, useMemo } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import EmployerStatusBadge from './EmployerStatusBadge'
import EmployerActionsMenu from './EmployerActionsMenu'
import EmployerDetailModal from './EmployerDetailModal'
import { employerStatusOptions } from '../../../data/employersData'

const EmployersTable = ({ employers: initialEmployers }) => {
    const [employers, setEmployers] = useState(initialEmployers)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const [selectedEmployer, setSelectedEmployer] = useState(null)

    const updateStatus = (id, newStatus) => {
        setEmployers((prev) => prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e)))
    }

    const handleSuspend = (id) => updateStatus(id, 'Suspended')
    const handleActivate = (id) => updateStatus(id, 'Active')
    const handleDelete = (id) => setEmployers((prev) => prev.filter((e) => e.id !== id))

    const filtered = useMemo(() => {
        return employers.filter((e) => {
            const matchesSearch =
                e.name.toLowerCase().includes(search.toLowerCase()) ||
                e.company.toLowerCase().includes(search.toLowerCase()) ||
                e.id.toLowerCase().includes(search.toLowerCase())
            const matchesStatus = statusFilter === 'All' || e.status === statusFilter
            return matchesSearch && matchesStatus
        })
    }, [employers, search, statusFilter])

    return (
        <div className='bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden'>
            {/* Header controls */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-gray-100'>
                <h3 className='font-extrabold text-gray-900'>All Employers</h3>
                <div className='flex flex-col sm:flex-row gap-3'>
                    <div className='relative'>
                        <Search size={15} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search name, company, ID...'
                            className='w-full sm:w-56 pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-amber-400 transition-colors duration-300'
                        />
                    </div>
                    <div className='relative'>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className='appearance-none w-full sm:w-40 pl-3 pr-8 py-2 text-sm font-semibold border border-gray-200 rounded-lg outline-none focus:border-amber-400 transition-colors duration-300 bg-white'
                        >
                            {employerStatusOptions.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' />
                    </div>
                </div>
            </div>

            {/* Desktop table */}
            <div className='hidden md:block overflow-x-auto'>
                <table className='w-full text-sm'>
                    <thead>
                        <tr className='bg-gray-50 text-gray-500 text-xs uppercase tracking-wide'>
                            <th className='text-left px-5 py-3 font-semibold'>ID</th>
                            <th className='text-left px-5 py-3 font-semibold'>Company</th>
                            <th className='text-left px-5 py-3 font-semibold'>Contact Person</th>
                            <th className='text-left px-5 py-3 font-semibold'>Services Running</th>
                            <th className='text-left px-5 py-3 font-semibold'>Joined</th>
                            <th className='text-left px-5 py-3 font-semibold'>Status</th>
                            <th className='text-left px-5 py-3 font-semibold'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                        {filtered.map((e) => (
                            <tr key={e.id} className='hover:bg-gray-50/60 transition-colors duration-200'>
                                <td className='px-5 py-3.5 font-semibold text-gray-700 whitespace-nowrap'>{e.id}</td>
                                <td className='px-5 py-3.5 font-bold text-gray-900 whitespace-nowrap'>{e.company}</td>
                                <td className='px-5 py-3.5 text-gray-600 whitespace-nowrap'>{e.name}</td>
                                <td className='px-5 py-3.5'>
                                    {e.servicesRunning.length > 0 ? (
                                        <div className='flex flex-wrap gap-1 max-w-[220px]'>
                                            {e.servicesRunning.slice(0, 2).map((s) => (
                                                <span key={s} className='px-2 py-0.5 bg-amber-50 text-amber-600 text-xs font-semibold rounded whitespace-nowrap'>
                                                    {s}
                                                </span>
                                            ))}
                                            {e.servicesRunning.length > 2 && (
                                                <span className='px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-semibold rounded'>
                                                    +{e.servicesRunning.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <span className='text-gray-400 text-xs italic'>None</span>
                                    )}
                                </td>
                                <td className='px-5 py-3.5 text-gray-500 whitespace-nowrap'>{e.joinedDate}</td>
                                <td className='px-5 py-3.5'><EmployerStatusBadge status={e.status} /></td>
                                <td className='px-5 py-3.5'>
                                    <EmployerActionsMenu
                                        employer={e}
                                        onView={setSelectedEmployer}
                                        onSuspend={handleSuspend}
                                        onActivate={handleActivate}
                                        onDelete={handleDelete}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <p className='text-center text-gray-400 text-sm py-10'>No employers found.</p>
                )}
            </div>

            {/* Mobile cards */}
            <div className='md:hidden flex flex-col divide-y divide-gray-50'>
                {filtered.map((e) => (
                    <div key={e.id} className='p-4 flex flex-col gap-2'>
                        <div className='flex items-start justify-between gap-2'>
                            <div>
                                <p className='font-bold text-gray-900 text-sm'>{e.company}</p>
                                <p className='text-gray-400 text-xs'>{e.name} • {e.id}</p>
                            </div>
                            <EmployerActionsMenu
                                employer={e}
                                onView={setSelectedEmployer}
                                onSuspend={handleSuspend}
                                onActivate={handleActivate}
                                onDelete={handleDelete}
                            />
                        </div>

                        <div className='flex flex-wrap gap-1'>
                            {e.servicesRunning.length > 0 ? (
                                e.servicesRunning.map((s) => (
                                    <span key={s} className='px-2 py-0.5 bg-amber-50 text-amber-600 text-xs font-semibold rounded'>
                                        {s}
                                    </span>
                                ))
                            ) : (
                                <span className='text-gray-400 text-xs italic'>No active services</span>
                            )}
                        </div>

                        <div className='flex items-center justify-between text-xs text-gray-500 mt-1'>
                            <span>Joined {e.joinedDate}</span>
                            <EmployerStatusBadge status={e.status} />
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <p className='text-center text-gray-400 text-sm py-10'>No employers found.</p>
                )}
            </div>

            {selectedEmployer && (
                <EmployerDetailModal
                    employer={selectedEmployer}
                    onClose={() => setSelectedEmployer(null)}
                    onSuspend={handleSuspend}
                    onActivate={handleActivate}
                />
            )}
        </div>
    )
}

export default EmployersTable