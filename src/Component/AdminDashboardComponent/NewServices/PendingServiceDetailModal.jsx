import React from 'react'
import { X, Tag, Clock, Building2, Mail, Calendar, ListChecks, Check, XCircle } from 'lucide-react'
import PendingStatusBadge from './PendingStatusBadge'

const PendingServiceDetailModal = ({ service, onClose, onApprove, onReject }) => {
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            <div onClick={onClose} className='absolute inset-0 bg-black/50 backdrop-blur-sm' />

            <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto'>
                <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white'>
                    <h3 className='font-extrabold text-gray-900'>Service Request Details</h3>
                    <button onClick={onClose} className='p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors duration-200'>
                        <X size={18} />
                    </button>
                </div>

                <div className='p-5 flex flex-col gap-4'>
                    <div className='flex items-center justify-between'>
                        <span className='text-xs font-semibold text-gray-400'>{service.id}</span>
                        <PendingStatusBadge status={service.status} />
                    </div>

                    <div>
                        <h4 className='font-extrabold text-gray-900 text-base mb-1'>{service.title}</h4>
                        <p className='text-gray-500 text-sm leading-relaxed'>{service.description}</p>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <div className='flex items-start gap-3'>
                            <Tag size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-gray-400'>Category</p>
                                <p className='text-sm font-bold text-gray-900'>{service.category}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <Clock size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-gray-400'>Delivery Time</p>
                                <p className='text-sm font-bold text-gray-900'>{service.deliveryTime}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <Building2 size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-gray-400'>Submitted By</p>
                                <p className='text-sm font-bold text-gray-900'>{service.submittedBy}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <Mail size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-gray-400'>Employer Email</p>
                                <p className='text-sm font-bold text-gray-900 break-all'>{service.submittedByEmail}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <Calendar size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-gray-400'>Submitted On</p>
                                <p className='text-sm font-bold text-gray-900'>{service.submittedDate}</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-3'>
                            <ListChecks size={16} className='text-amber-500 mt-0.5 shrink-0' />
                            <div className='flex-1'>
                                <p className='text-xs text-gray-400 mb-1.5'>Example Results</p>
                                <div className='flex flex-col gap-1.5'>
                                    {service.examples.map((ex) => (
                                        <div key={ex.name} className='flex items-center justify-between text-sm bg-gray-50 rounded-lg px-3 py-2'>
                                            <span className='text-gray-700 font-semibold'>{ex.name}</span>
                                            <span className='text-amber-600 text-xs font-bold'>{ex.result}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {service.status === 'Pending' && (
                    <div className='flex gap-3 px-5 py-4 border-t border-gray-100 sticky bottom-0 bg-white'>
                        <button
                            onClick={() => { onReject(service.id); onClose() }}
                            className='flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-300'
                        >
                            <XCircle size={15} /> Reject
                        </button>
                        <button
                            onClick={() => { onApprove(service.id); onClose() }}
                            className='flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-black bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors duration-300'
                        >
                            <Check size={15} /> Approve
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PendingServiceDetailModal