import React from 'react'

const statusStyles = {
    'Active': 'bg-green-50 text-green-600',
    'Suspended': 'bg-red-50 text-red-500',
    'Pending Review': 'bg-amber-50 text-amber-600',
}

const EmployerStatusBadge = ({ status }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusStyles[status]}`}>
        {status}
    </span>
)

export default EmployerStatusBadge