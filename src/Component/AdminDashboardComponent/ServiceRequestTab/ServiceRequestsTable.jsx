import React, { useState, useMemo } from 'react'
import { Search, Eye, ChevronDown } from 'lucide-react'
import StatusBadge from './StatusBadge'
import RequestDetailModal from './RequestDetailModal'
import { statusOptions } from '../../../data/ServiceRequestData'

const ServiceRequestsTable = ({ requests: initialRequests }) => {
    const [requests, setRequests] = useState(initialRequests)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const [selectedRequest, setSelectedRequest] = useState(null)

    const handleStatusChange = (id, newStatus) => {
        setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)))
    }

    const filtered = useMemo(() => {
        return requests.filter((r) => {
            const matchesSearch =
                r.name.toLowerCase().includes(search.toLowerCase()) ||
                r.service.toLowerCase().includes(search.toLowerCase()) ||
                r.id.toLowerCase().includes(search.toLowerCase())
            const matchesStatus = statusFilter === 'All' || r.status === statusFilter
            return matchesSearch && matchesStatus
        })
    }, [requests, search, statusFilter])

    return (
        <div className='bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden'>
            {/* Header controls */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-gray-100'>
                <h3 className='font-extrabold text-gray-900'>All Service Requests</h3>
                <div className='flex flex-col sm:flex-row gap-3'>
                    <div className='relative'>
                        <Search size={15} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search name, service, ID...'
                            className='w-full sm:w-56 pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-amber-400 transition-colors duration-300'
                        />
                    </div>
                    <div className='relative'>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className='appearance-none w-full sm:w-40 pl-3 pr-8 py-2 text-sm font-semibold border border-gray-200 rounded-lg outline-none focus:border-amber-400 transition-colors duration-300 bg-white'
                        >
                            {statusOptions.map((s) => (
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
                            <th className='text-left px-5 py-3 font-semibold'>Name</th>
                            <th className='text-left px-5 py-3 font-semibold'>Service</th>
                            <th className='text-left px-5 py-3 font-semibold'>Contact</th>
                            <th className='text-left px-5 py-3 font-semibold'>Date</th>
                            <th className='text-left px-5 py-3 font-semibold'>Status</th>
                            <th className='text-left px-5 py-3 font-semibold'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                        {filtered.map((r) => (
                            <tr key={r.id} className='hover:bg-gray-50/60 transition-colors duration-200'>
                                <td className='px-5 py-3.5 font-semibold text-gray-700 whitespace-nowrap'>{r.id}</td>
                                <td className='px-5 py-3.5 font-bold text-gray-900 whitespace-nowrap'>{r.name}</td>
                                <td className='px-5 py-3.5 text-gray-600 whitespace-nowrap'>{r.service}</td>
                                <td className='px-5 py-3.5 text-gray-500 whitespace-nowrap'>{r.phone}</td>
                                <td className='px-5 py-3.5 text-gray-500 whitespace-nowrap'>{r.date}</td>
                                <td className='px-5 py-3.5'><StatusBadge status={r.status} /></td>
                                <td className='px-5 py-3.5'>
                                    <button
                                        onClick={() => setSelectedRequest(r)}
                                        className='p-1.5 rounded-md text-gray-500 hover:bg-amber-50 hover:text-amber-500 transition-colors duration-200'
                                    >
                                        <Eye size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <p className='text-center text-gray-400 text-sm py-10'>No requests found.</p>
                )}
            </div>

            {/* Mobile cards */}
            <div className='md:hidden flex flex-col divide-y divide-gray-50'>
                {filtered.map((r) => (
                    <div key={r.id} className='p-4 flex flex-col gap-2'>
                        <div className='flex items-start justify-between gap-2'>
                            <div>
                                <p className='font-bold text-gray-900 text-sm'>{r.name}</p>
                                <p className='text-gray-400 text-xs'>{r.id}</p>
                            </div>
                            <StatusBadge status={r.status} />
                        </div>
                        <p className='text-gray-600 text-sm font-semibold'>{r.service}</p>
                        <div className='flex items-center justify-between text-xs text-gray-500'>
                            <span>{r.phone}</span>
                            <span>{r.date}</span>
                        </div>
                        <button
                            onClick={() => setSelectedRequest(r)}
                            className='self-end flex items-center gap-1 text-xs font-semibold text-amber-500 mt-1'
                        >
                            <Eye size={14} /> View
                        </button>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <p className='text-center text-gray-400 text-sm py-10'>No requests found.</p>
                )}
            </div>

            {selectedRequest && (
                <RequestDetailModal
                    request={selectedRequest}
                    onClose={() => setSelectedRequest(null)}
                    onStatusChange={handleStatusChange}
                />
            )}
        </div>
    )
}

export default ServiceRequestsTable