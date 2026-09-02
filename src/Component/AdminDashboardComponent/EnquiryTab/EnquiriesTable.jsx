import React, { useState, useMemo } from 'react'
import { Search, ChevronDown, Eye } from 'lucide-react'
import EnquiryStatusBadge from './EnquiryStatusBadge'
import EnquiryDetailModal from './EnquiryDetailModal'
import { enquiryStatusOptions } from '../../../data/AdminenquiriesData'

const EnquiriesTable = ({ enquiries: initialEnquiries }) => {
    const [enquiries, setEnquiries] = useState(initialEnquiries)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const [selected, setSelected] = useState(null)

    const handleStatusChange = (id, newStatus) => {
        setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e)))
    }

    const filtered = useMemo(() => {
        return enquiries.filter((e) => {
            const matchesSearch =
                e.name.toLowerCase().includes(search.toLowerCase()) ||
                e.subject.toLowerCase().includes(search.toLowerCase()) ||
                e.id.toLowerCase().includes(search.toLowerCase())
            const matchesStatus = statusFilter === 'All' || e.status === statusFilter
            return matchesSearch && matchesStatus
        })
    }, [enquiries, search, statusFilter])

    return (
        <div className='bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-gray-100'>
                <h3 className='font-extrabold text-gray-900'>All Enquiries</h3>
                <div className='flex flex-col sm:flex-row gap-3'>
                    <div className='relative'>
                        <Search size={15} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search name, subject...'
                            className='w-full sm:w-56 pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-amber-400 transition-colors duration-300'
                        />
                    </div>
                    <div className='relative'>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className='appearance-none w-full sm:w-40 pl-3 pr-8 py-2 text-sm font-semibold border border-gray-200 rounded-lg outline-none focus:border-amber-400 transition-colors duration-300 bg-white'
                        >
                            {enquiryStatusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown size={14} className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' />
                    </div>
                </div>
            </div>

            {/* Desktop */}
            <div className='hidden md:block overflow-x-auto'>
                <table className='w-full text-sm'>
                    <thead>
                        <tr className='bg-gray-50 text-gray-500 text-xs uppercase tracking-wide'>
                            <th className='text-left px-5 py-3 font-semibold'>Name</th>
                            <th className='text-left px-5 py-3 font-semibold'>Subject</th>
                            <th className='text-left px-5 py-3 font-semibold'>Email</th>
                            <th className='text-left px-5 py-3 font-semibold'>Date</th>
                            <th className='text-left px-5 py-3 font-semibold'>Status</th>
                            <th className='text-left px-5 py-3 font-semibold'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50'>
                        {filtered.map((e) => (
                            <tr key={e.id} className='hover:bg-gray-50/60 transition-colors duration-200'>
                                <td className='px-5 py-3.5 font-bold text-gray-900 whitespace-nowrap'>{e.name}</td>
                                <td className='px-5 py-3.5 text-gray-600 whitespace-nowrap'>{e.subject}</td>
                                <td className='px-5 py-3.5 text-gray-500 whitespace-nowrap'>{e.email}</td>
                                <td className='px-5 py-3.5 text-gray-500 whitespace-nowrap'>{e.date}</td>
                                <td className='px-5 py-3.5'><EnquiryStatusBadge status={e.status} /></td>
                                <td className='px-5 py-3.5'>
                                    <button
                                        onClick={() => setSelected(e)}
                                        className='p-1.5 rounded-md text-gray-500 hover:bg-amber-50 hover:text-amber-500 transition-colors duration-200'
                                    >
                                        <Eye size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && <p className='text-center text-gray-400 text-sm py-10'>No enquiries found.</p>}
            </div>

            {/* Mobile */}
            <div className='md:hidden flex flex-col divide-y divide-gray-50'>
                {filtered.map((e) => (
                    <div key={e.id} className='p-4 flex flex-col gap-2'>
                        <div className='flex items-start justify-between gap-2'>
                            <p className='font-bold text-gray-900 text-sm'>{e.name}</p>
                            <EnquiryStatusBadge status={e.status} />
                        </div>
                        <p className='text-gray-600 text-sm font-semibold'>{e.subject}</p>
                        <div className='flex items-center justify-between text-xs text-gray-500'>
                            <span>{e.date}</span>
                            <button onClick={() => setSelected(e)} className='flex items-center gap-1 text-amber-500 font-semibold'>
                                <Eye size={14} /> View
                            </button>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && <p className='text-center text-gray-400 text-sm py-10'>No enquiries found.</p>}
            </div>

            {selected && (
                <EnquiryDetailModal
                    enquiry={selected}
                    onClose={() => setSelected(null)}
                    onStatusChange={handleStatusChange}
                />
            )}
        </div>
    )
}

export default EnquiriesTable