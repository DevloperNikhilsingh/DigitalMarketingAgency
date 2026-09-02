import React from 'react'

const NotificationToggle = ({ label, desc, checked, onToggle }) => (
    <div className='flex items-center justify-between py-3.5'>
        <div>
            <p className='text-sm font-bold text-gray-900'>{label}</p>
            <p className='text-xs text-gray-400'>{desc}</p>
        </div>
        <button
            onClick={onToggle}
            className={`w-11 h-6 rounded-full relative transition-colors duration-300 shrink-0
                ${checked ? 'bg-amber-400' : 'bg-gray-200'}`}
        >
            <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300
                    ${checked ? 'translate-x-5.5' : 'translate-x-0.5'}`}
            />
        </button>
    </div>
)

export default NotificationToggle