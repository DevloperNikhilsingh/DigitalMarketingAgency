import React from 'react'

const statusStyles = {
    'Pending': 'bg-amber-50 text-amber-600',
    'Approved': 'bg-green-50 text-green-600',
    'Rejected': 'bg-red-50 text-red-500',
}

const PendingStatusBadge = ({ status }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusStyles[status]}`}>
        {status}
    </span>
)

export default PendingStatusBadge