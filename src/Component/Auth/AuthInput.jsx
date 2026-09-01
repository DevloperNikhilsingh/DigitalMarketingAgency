import React from 'react'

const AuthInput = ({ icon: Icon, ...props }) => {
    return (
        <div className='flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3 focus-within:border-yellow-400 transition-colors duration-300'>
            <Icon className='text-gray-400 shrink-0' size={18} />
            <input
                {...props}
                className='w-full text-sm outline-none bg-transparent'
            />
        </div>
    )
}

export default AuthInput