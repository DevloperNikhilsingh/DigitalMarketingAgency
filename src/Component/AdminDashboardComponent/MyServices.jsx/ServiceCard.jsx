import React from 'react'
import { Clock, Tags, Users, Trash2, Pause, Play } from 'lucide-react'
import ServiceStatusBadge from './ServiceStatusBadge'

const ServiceCard = ({ service, onToggleStatus, onDelete }) => {
    return (
        <div className='bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3'>
            <div className='flex items-start justify-between gap-2'>
                <h3 className='font-extrabold text-gray-900 text-sm leading-snug'>{service.title}</h3>
                <ServiceStatusBadge status={service.status} />
            </div>

            <p className='text-gray-500 text-xs leading-relaxed line-clamp-2'>{service.description}</p>

            <div className='flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500'>
                <span className='flex items-center gap-1'>
                    <Tags size={12} className='text-amber-500' /> {service.category}
                </span>
                <span className='flex items-center gap-1'>
                    <Clock size={12} className='text-amber-500' /> {service.deliveryTime}
                </span>
                <span className='flex items-center gap-1'>
                    <Users size={12} className='text-amber-500' /> {service.requests} Requests
                </span>
            </div>

            <div className='flex items-center justify-end pt-2 border-t border-gray-50'>
                <div className='flex items-center gap-2'>
                    <button
                        onClick={() => onToggleStatus(service.id)}
                        className='p-2 rounded-lg text-gray-500 hover:bg-amber-50 hover:text-amber-500 transition-colors duration-200'
                        aria-label={service.status === 'Active' ? 'Pause service' : 'Activate service'}
                    >
                        {service.status === 'Active' ? <Pause size={15} /> : <Play size={15} />}
                    </button>
                    <button
                        onClick={() => onDelete(service.id)}
                        className='p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors duration-200'
                        aria-label='Delete service'
                    >
                        <Trash2 size={15} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard