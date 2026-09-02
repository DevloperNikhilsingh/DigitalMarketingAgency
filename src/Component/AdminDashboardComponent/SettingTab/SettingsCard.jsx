import React from 'react'

const SettingsCard = ({ icon: Icon, title, children }) => (
    <div className='bg-white border border-gray-100 rounded-2xl p-5 shadow-sm'>
        <div className='flex items-center gap-2 mb-4'>
            <Icon size={18} className='text-amber-500' />
            <h3 className='font-extrabold text-gray-900'>{title}</h3>
        </div>
        {children}
    </div>
)

export default SettingsCard