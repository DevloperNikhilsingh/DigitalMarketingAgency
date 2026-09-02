import React from 'react'

const statusStyles = {
    'New': 'bg-amber-50 text-amber-600',
    'Contacted': 'bg-blue-50 text-blue-600',
    'Resolved': 'bg-green-50 text-green-600',
}

const EnquiryStatusBadge = ({ status }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusStyles[status]}`}>
        {status}
    </span>
)

export default EnquiryStatusBadge