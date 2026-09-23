import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Mail, Lock, LogIn, User, Building2, UserCog, Briefcase, KeyRound } from 'lucide-react'
import { useAuth } from '../../Context/AuthContext'

const AuthModal = ({ onClose, defaultRole = 'employer', lockRole = false }) => {
    const { loginAdmin, loginEmployer, registerEmployer, verifyOtp, resendOtp } = useAuth()
    const navigate = useNavigate()

    const [role, setRole] = useState(defaultRole)
    const [mode, setMode] = useState('login') // 'login' | 'register' | 'otp'

    const [name, setName] = useState('')
    const [company, setCompany] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const resetFields = () => {
        setName('')
        setCompany('')
        setEmail('')
        setPassword('')
        setOtp('')
        setError('')
    }

    const switchRole = (newRole) => {
        setRole(newRole)
        setMode('login')
        resetFields()
    }

    const switchMode = (newMode) => {
        setMode(newMode)
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (role === 'admin') {
            if (!email || !password) {
                setError('Please fill in both fields.')
                return
            }
            setLoading(true)
            const result = await loginAdmin({ email, password })
            setLoading(false)
            if (!result.success) {
                setError(result.message)
                return
            }
            onClose()
            navigate('/admin/dashboard')
            return
        }

        if (mode === 'register') {
            if (!name || !company || !email || !password) {
                setError('Please fill in all fields.')
                return
            }
            setLoading(true)
            const result = await registerEmployer({ name, email, password, company })
            setLoading(false)
            if (!result.success) {
                setError(result.message)
                return
            }
            // Registration successful -> move to OTP verification step
            setMode('otp')
            return
        }

        if (mode === 'otp') {
            if (!otp) {
                setError('Please enter the OTP sent to your email.')
                return
            }
            setLoading(true)
            const result = await verifyOtp({ email, otp })
            if (!result.success) {
                setLoading(false)
                setError(result.message)
                return
            }
            // OTP verified -> now log the user in
            const loginResult = await loginEmployer({ email, password })
            setLoading(false)
            if (!loginResult.success) {
                setMode('login')
                setError('Verified! Please login now.')
                return
            }
            onClose()
            navigate('/employer/dashboard')
            return
        }

        // mode === 'login'
        if (!email || !password) {
            setError('Please fill in both fields.')
            return
        }
        setLoading(true)
        const result = await loginEmployer({ email, password })
        setLoading(false)
        if (!result.success) {
            setError(result.message)
            return
        }
        onClose()
        navigate('/employer/dashboard')
    }

    const handleResendOtp = async () => {
        setError('')
        setLoading(true)
        const result = await resendOtp(email)
        setLoading(false)
        setError(result.message)
    }

    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center px-4'>
            <div
                onClick={onClose}
                className='absolute inset-0 bg-black/70 backdrop-blur-sm'
            />

            <div className='relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl p-7'>
                <button
                    type='button'
                    onClick={(e) => {
                        e.stopPropagation()
                        onClose()
                    }}
                    className='absolute top-4 right-4 z-10 text-gray-500 hover:text-white cursor-pointer'
                >
                    <X size={20} />
                </button>

                <div className='text-center mb-5'>
                    <h2 className='text-xl font-extrabold text-white'>
                        Digi<span className='text-yellow-400'>Service</span>
                    </h2>
                    <p className='text-gray-500 text-sm mt-1'>
                        {role === 'admin'
                            ? 'Admin Login'
                            : mode === 'register'
                            ? 'Create employer account'
                            : mode === 'otp'
                            ? 'Verify your email'
                            : 'Login to your account'}
                    </p>
                </div>

                {!lockRole && mode !== 'otp' && (
                    <div className='flex bg-white/5 border border-white/10 rounded-lg p-1 mb-5'>
                        <button
                            type='button'
                            onClick={() => switchRole('employer')}
                            className={`flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2 rounded-md transition-colors
                                ${role === 'employer' ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Briefcase size={15} /> Employer
                        </button>
                        <button
                            type='button'
                            onClick={() => switchRole('admin')}
                            className={`flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2 rounded-md transition-colors
                                ${role === 'admin' ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:text-white'}`}
                        >
                            <UserCog size={15} /> Admin
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    {role === 'employer' && mode === 'register' && (
                        <>
                            <div className='flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-yellow-400'>
                                <User className='text-gray-500 shrink-0' size={17} />
                                <input
                                    type='text'
                                    placeholder='Full name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='w-full text-sm outline-none bg-transparent text-white placeholder:text-gray-600'
                                />
                            </div>

                            <div className='flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-yellow-400'>
                                <Building2 className='text-gray-500 shrink-0' size={17} />
                                <input
                                    type='text'
                                    placeholder='Company name'
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className='w-full text-sm outline-none bg-transparent text-white placeholder:text-gray-600'
                                />
                            </div>
                        </>
                    )}

                    {mode === 'otp' ? (
                        <>
                            <p className='text-gray-400 text-xs -mt-1'>
                                We sent a 6-digit code to <span className='text-white'>{email}</span>
                            </p>
                            <div className='flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-yellow-400'>
                                <KeyRound className='text-gray-500 shrink-0' size={17} />
                                <input
                                    type='text'
                                    placeholder='Enter OTP'
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                    className='w-full text-sm outline-none bg-transparent text-white placeholder:text-gray-600'
                                />
                            </div>
                            <button
                                type='button'
                                onClick={handleResendOtp}
                                disabled={loading}
                                className='text-yellow-400 text-xs hover:underline self-start'
                            >
                                Resend OTP
                            </button>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}

                    {error && <p className='text-red-400 text-xs'>{error}</p>}

                    <button
                        type='submit'
                        disabled={loading}
                        className='flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold text-sm py-3 rounded-lg mt-1 hover:bg-yellow-300 disabled:opacity-60'
                    >
                        {loading
                            ? 'Please wait...'
                            : role === 'admin'
                            ? 'Login'
                            : mode === 'register'
                            ? 'Register'
                            : mode === 'otp'
                            ? 'Verify & Continue'
                            : 'Login'}{' '}
                        <LogIn size={16} />
                    </button>
                </form>

                {role === 'employer' && mode !== 'otp' && (
                    <p className='text-center text-gray-500 text-xs mt-4'>
                        {mode === 'login' ? (
                            <>
                                Don't have an account?{' '}
                                <button
                                    type='button'
                                    onClick={() => switchMode('register')}
                                    className='text-yellow-400 hover:underline font-semibold'
                                >
                                    Register
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button
                                    type='button'
                                    onClick={() => switchMode('login')}
                                    className='text-yellow-400 hover:underline font-semibold'
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </p>
                )}
            </div>
        </div>
    )
}

export default AuthModal