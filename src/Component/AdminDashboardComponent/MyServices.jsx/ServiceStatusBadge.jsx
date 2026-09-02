import React from 'react'

const statusStyles = {
    'Active': 'bg-green-50 text-green-600',
    'Paused': 'bg-amber-50 text-amber-600',
}

const ServiceStatusBadge = ({ status }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusStyles[status]}`}>
        {status}
    </span>
)

export default ServiceStatusBadge