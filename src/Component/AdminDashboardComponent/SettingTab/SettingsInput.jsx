import React from 'react'

const SettingsInput = ({ label, type = 'text', value, onChange, required = false }) => (
    <div>
        <label className='text-xs font-semibold text-gray-600 mb-1.5 block'>{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            className='w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-amber-400 transition-colors duration-300'
        />
    </div>
)

export default SettingsInput