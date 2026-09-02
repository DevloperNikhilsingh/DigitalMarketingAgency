import React, { useState } from 'react'
import { X, User, Briefcase, Phone, Mail, Calendar, Hash } from 'lucide-react'
import StatusBadge from './StatusBadge'
import { statusOptions } from '../../../data/ServiceDetailData'

const RequestDetailModal = ({ request, onClose, onStatusChange }) => {
    const [status, setStatus] = useState(request.status)

    const handleSave = () => {
        onStatusChange(request.id, status)
        onClose()
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            <div
                onClick={onClose}
                className='absolute inset-0 bg-black/50 backdrop-blur-sm'
            />

            <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto'>
                <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white'>
                    <h3 className='font-extrabold text-gray-900'>Request Details</h3>
                    <button
                        onClick={onClose}
                        className='p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors duration-200'
                        aria-label='Close'
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className='p-5 flex flex-col gap-4'>
                    <div className='flex items-center justify-between'>
                        <span className='flex items-center gap-2 text-xs font-semibold text-gray-400'>
                            <Hash size={13} /> {request.id}
                        </span>
                        <StatusBadge status={request.status} />
                    </div>

                    <div className='flex flex-col gap-3'>
                        <div className='flex items-start gap-3'>
                            <User size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-gray-400'>Full Name</p>
                                <p className='text-sm font-bold text-gray-900'>{request.name}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <Briefcase size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-gray-400'>Service Requested</p>
                                <p className='text-sm font-bold text-gray-900'>{request.service}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <Phone size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-gray-400'>Phone</p>
                                <p className='text-sm font-bold text-gray-900'>{request.phone}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <Mail size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-gray-400'>Email</p>
                                <p className='text-sm font-bold text-gray-900 break-all'>{request.email}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <Calendar size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-gray-400'>Date Submitted</p>
                                <p className='text-sm font-bold text-gray-900'>{request.date}</p>
                            </div>
                        </div>
                    </div>

                    <div className='pt-2 border-t border-gray-100'>
                        <label className='text-xs font-semibold text-gray-500 mb-1.5 block'>Update Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className='w-full px-3 py-2 text-sm font-semibold border border-gray-200 rounded-lg outline-none focus:border-amber-400 transition-colors duration-300 bg-white'
                        >
                            {statusOptions.filter((s) => s !== 'All').map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='flex gap-3 px-5 py-4 border-t border-gray-100 sticky bottom-0 bg-white'>
                    <button
                        onClick={onClose}
                        className='flex-1 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className='flex-1 py-2.5 text-sm font-bold text-black bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors duration-300'
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RequestDetailModal