import React, { useState } from 'react'
import { X, Rocket } from 'lucide-react'

const EmployerCTAModal = ({ onClose, onAuthRequest }) => {
    const [isClosing, setIsClosing] = useState(false)

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(onClose, 250)
    }

    const handleGetStarted = () => {
        setIsClosing(true)
        setTimeout(() => {
            onClose()
            onAuthRequest()
        }, 250)
    }

    return (
        <div className='fixed inset-0 z-[100] flex items-center justify-center px-4'>
            <div
                onClick={handleClose}
                className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-250 ease-out
                    ${isClosing ? 'opacity-0' : 'opacity-100'}`}
            />

            <div
                className={`relative w-full max-w-sm bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl p-7 text-center
                    transition-all duration-250 ease-out
                    ${isClosing ? 'opacity-0 scale-90 translate-y-4' : 'opacity-100 scale-100 translate-y-0 animate-[modalPop_0.3s_ease-out]'}`}
            >
                <button
                    onClick={handleClose}
                    className='absolute top-4 right-4 text-gray-500 hover:text-white transition-all duration-300 hover:rotate-90'
                    aria-label='Close'
                >
                    <X size={20} />
                </button>

                <div className='w-14 h-14 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center mx-auto mb-5'>
                    <Rocket className='text-yellow-400' size={24} />
                </div>

                <h2 className='text-white font-extrabold text-lg mb-2'>
                    Create an account to get started
                </h2>
                <p className='text-gray-400 text-sm mb-7'>
                    An employer account is required to list your services and launch a campaign with us. It only takes a minute to set up.
                </p>

                <button
                    onClick={handleGetStarted}
                    className='w-full flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold text-sm py-3 rounded-lg
                        transition-all duration-300 ease-out hover:bg-yellow-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-400/30 active:scale-95 active:translate-y-0'
                >
                    Continue to Login / Register
                </button>
            </div>
        </div>
    )
}

export default EmployerCTAModal