import React from 'react'
import { X, User, Building2, Phone, Mail, MapPin, Calendar, Hash, Layers, ListChecks } from 'lucide-react'
import EmployerStatusBadge from './EmployerStatusBadge'

const EmployerDetailModal = ({ employer, onClose, onSuspend, onActivate }) => {
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            <div onClick={onClose} className='absolute inset-0 bg-black/50 backdrop-blur-sm' />

            <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto'>
                <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white'>
                    <h3 className='font-extrabold text-gray-900'>Employer Details</h3>
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
                            <Hash size={13} /> {employer.id}
                        </span>
                        <EmployerStatusBadge status={employer.status} />
                    </div>

                    <div className='flex flex-col gap-3'>
                        <div className='flex items-start gap-3'>
                            <User size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-gray-400'>Contact Person</p>
                                <p className='text-sm font-bold text-gray-900'>{employer.name}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <Building2 size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-gray-400'>Company</p>
                                <p className='text-sm font-bold text-gray-900'>{employer.company}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <Phone size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-gray-400'>Phone</p>
                                <p className='text-sm font-bold text-gray-900'>{employer.phone}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <Mail size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-gray-400'>Email</p>
                                <p className='text-sm font-bold text-gray-900 break-all'>{employer.email}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <MapPin size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-gray-400'>Address</p>
                                <p className='text-sm font-bold text-gray-900'>{employer.address}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <Calendar size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-gray-400'>Joined On</p>
                                <p className='text-sm font-bold text-gray-900'>{employer.joinedDate}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <ListChecks size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-gray-400'>Total Requests Handled</p>
                                <p className='text-sm font-bold text-gray-900'>{employer.totalRequests}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <Layers size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div className='flex-1'>
                                <p className='text-xs text-gray-400 mb-1.5'>Services Running</p>
                                {employer.servicesRunning.length > 0 ? (
                                    <div className='flex flex-wrap gap-1.5'>
                                        {employer.servicesRunning.map((s) => (
                                            <span key={s} className='px-2.5 py-1 bg-amber-50 text-amber-600 text-xs font-semibold rounded-md'>
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className='text-sm text-gray-400 italic'>No active services</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex gap-3 px-5 py-4 border-t border-gray-100 sticky bottom-0 bg-white'>
                    <button
                        onClick={onClose}
                        className='flex-1 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300'
                    >
                        Close
                    </button>
                    {employer.status === 'Active' ? (
                        <button
                            onClick={() => { onSuspend(employer.id); onClose() }}
                            className='flex-1 py-2.5 text-sm font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-300'
                        >
                            Suspend Employer
                        </button>
                    ) : (
                        <button
                            onClick={() => { onActivate(employer.id); onClose() }}
                            className='flex-1 py-2.5 text-sm font-bold text-black bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors duration-300'
                        >
                            Activate Employer
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EmployerDetailModal