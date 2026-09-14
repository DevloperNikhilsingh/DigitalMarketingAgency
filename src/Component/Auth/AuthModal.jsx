import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Mail, Lock, LogIn } from 'lucide-react'
import { useAuth } from '../../Context/AuthContext'

const AuthModal = ({ onClose }) => {
    const { loginAdmin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        setError('')

        if (!email || !password) {
            setError('Please fill in both fields.')
            return
        }

        const result = loginAdmin({ email, password })

        if (!result.success) {
            setError(result.message)
            return
        }

        onClose()
        navigate('/admin/dashboard')
    }

    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center px-4'>
            <div
                onClick={onClose}
                className='absolute inset-0 bg-black/70 backdrop-blur-sm'
            />

            <div className='relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl p-7'>
                <button
                    onClick={onClose}
                    className='absolute top-4 right-4 text-gray-500 hover:text-white'
                >
                    <X size={20} />
                </button>

                <div className='text-center mb-6'>
                    <h2 className='text-xl font-extrabold text-white'>
                        Digi<span className='text-yellow-400'>Service</span>
                    </h2>
                    <p className='text-gray-500 text-sm mt-1'>Login to your account</p>
                </div>

                <form onSubmit={handleLogin} className='flex flex-col gap-4'>
                    <div className='flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-yellow-400'>
                        <Mail className='text-gray-500 shrink-0' size={17} />
                        <input
                            type='email'
                            placeholder='Email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full text-sm outline-none bg-transparent text-white placeholder:text-gray-600'
                        />
                    </div>

                    <div className='flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-yellow-400'>
                        <Lock className='text-gray-500 shrink-0' size={17} />
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full text-sm outline-none bg-transparent text-white placeholder:text-gray-600'
                        />
                    </div>

                    {error && <p className='text-red-400 text-xs'>{error}</p>}

                    <button
                        type='submit'
                        className='flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold text-sm py-3 rounded-lg mt-1 hover:bg-yellow-300'
                    >
                        Login <LogIn size={16} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AuthModal