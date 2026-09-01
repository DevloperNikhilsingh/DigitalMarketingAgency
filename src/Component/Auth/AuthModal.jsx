import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Mail, Lock, User, Building2, ShieldCheck, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '../../Context/AuthContext'

const AuthModal = ({ onClose }) => {
    const { loginEmployer, registerEmployer, loginAdmin } = useAuth()
    const navigate = useNavigate()

    const [isClosing, setIsClosing] = useState(false)
    const [activeTab, setActiveTab] = useState('employer')
    const [employerMode, setEmployerMode] = useState('login')
    const [error, setError] = useState('')

    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [registerData, setRegisterData] = useState({ name: '', company: '', email: '', password: '' })
    const [adminData, setAdminData] = useState({ email: '', password: '' })

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(onClose, 250)
    }

    const switchTab = (tab) => {
        setActiveTab(tab)
        setEmployerMode('login')
        setError('')
    }

    const handleEmployerLogin = (e) => {
        e.preventDefault()
        setError('')
        if (!loginData.email || !loginData.password) {
            setError('Please fill in both fields.')
            return
        }
        const result = loginEmployer(loginData)
        if (!result.success) return setError(result.message)
        handleClose()
        setTimeout(() => navigate('/employer/dashboard'), 250)
    }

    const handleEmployerRegister = (e) => {
        e.preventDefault()
        setError('')
        if (!registerData.name || !registerData.email || !registerData.password) {
            setError('Please fill in all required fields.')
            return
        }
        const result = registerEmployer(registerData)
        if (!result.success) return setError(result.message)
        setEmployerMode('login')
        setLoginData({ email: registerData.email, password: '' })
    }

    const handleAdminLogin = (e) => {
        e.preventDefault()
        setError('')
        if (!adminData.email || !adminData.password) {
            setError('Please fill in both fields.')
            return
        }
        const result = loginAdmin(adminData)
        if (!result.success) return setError(result.message)
        handleClose()
        setTimeout(() => navigate('/admin/dashboard'), 250)
    }

    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center px-4'>
            <div
                onClick={handleClose}
                className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-250 ease-out
                    ${isClosing ? 'opacity-0' : 'opacity-100'}`}
            />

            <div
                className={`relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl p-7
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

                <div className='text-center mb-6'>
                    <h2 className='text-xl font-extrabold text-white'>
                        Digi<span className='text-yellow-400'>Service</span>
                    </h2>
                </div>

                <div className='flex bg-white/5 rounded-lg p-1 mb-6'>
                    <button
                        onClick={() => switchTab('employer')}
                        className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold py-2 rounded-md transition-all duration-300
                            ${activeTab === 'employer' ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Building2 size={14} /> Employer
                    </button>
                    <button
                        onClick={() => switchTab('admin')}
                        className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold py-2 rounded-md transition-all duration-300
                            ${activeTab === 'admin' ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        <ShieldCheck size={14} /> Admin
                    </button>
                </div>

                {activeTab === 'employer' && (
                    <>
                        <div className='flex items-center justify-center gap-6 mb-6 text-sm font-semibold'>
                            <button
                                onClick={() => { setEmployerMode('login'); setError('') }}
                                className={`pb-1.5 border-b-2 transition-colors duration-300
                                    ${employerMode === 'login' ? 'text-yellow-400 border-yellow-400' : 'text-gray-500 border-transparent hover:text-white'}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => { setEmployerMode('register'); setError('') }}
                                className={`pb-1.5 border-b-2 transition-colors duration-300
                                    ${employerMode === 'register' ? 'text-yellow-400 border-yellow-400' : 'text-gray-500 border-transparent hover:text-white'}`}
                            >
                                Register
                            </button>
                        </div>

                        {employerMode === 'login' ? (
                            <form onSubmit={handleEmployerLogin} className='flex flex-col gap-4'>
                                <div className='flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-yellow-400 transition-colors duration-300'>
                                    <Mail className='text-gray-500 shrink-0' size={17} />
                                    <input
                                        type='email'
                                        placeholder='Email address'
                                        value={loginData.email}
                                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                        className='w-full text-sm outline-none bg-transparent text-white placeholder:text-gray-600'
                                    />
                                </div>
                                <div className='flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-yellow-400 transition-colors duration-300'>
                                    <Lock className='text-gray-500 shrink-0' size={17} />
                                    <input
                                        type='password'
                                        placeholder='Password'
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                        className='w-full text-sm outline-none bg-transparent text-white placeholder:text-gray-600'
                                    />
                                </div>

                                {error && <p className='text-red-400 text-xs'>{error}</p>}

                                <button
                                    type='submit'
                                    className='flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold text-sm py-3 rounded-lg mt-1
                                        transition-all duration-300 ease-out hover:bg-yellow-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-400/30 active:scale-95 active:translate-y-0'
                                >
                                    Login <LogIn size={16} />
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleEmployerRegister} className='flex flex-col gap-4'>
                                <div className='flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-yellow-400 transition-colors duration-300'>
                                    <User className='text-gray-500 shrink-0' size={17} />
                                    <input
                                        type='text'
                                        placeholder='Full name'
                                        value={registerData.name}
                                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                        className='w-full text-sm outline-none bg-transparent text-white placeholder:text-gray-600'
                                    />
                                </div>
                                <div className='flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-yellow-400 transition-colors duration-300'>
                                    <Building2 className='text-gray-500 shrink-0' size={17} />
                                    <input
                                        type='text'
                                        placeholder='Company name'
                                        value={registerData.company}
                                        onChange={(e) => setRegisterData({ ...registerData, company: e.target.value })}
                                        className='w-full text-sm outline-none bg-transparent text-white placeholder:text-gray-600'
                                    />
                                </div>
                                <div className='flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-yellow-400 transition-colors duration-300'>
                                    <Mail className='text-gray-500 shrink-0' size={17} />
                                    <input
                                        type='email'
                                        placeholder='Email address'
                                        value={registerData.email}
                                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                        className='w-full text-sm outline-none bg-transparent text-white placeholder:text-gray-600'
                                    />
                                </div>
                                <div className='flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-yellow-400 transition-colors duration-300'>
                                    <Lock className='text-gray-500 shrink-0' size={17} />
                                    <input
                                        type='password'
                                        placeholder='Create a password'
                                        value={registerData.password}
                                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                        className='w-full text-sm outline-none bg-transparent text-white placeholder:text-gray-600'
                                    />
                                </div>

                                {error && <p className='text-red-400 text-xs'>{error}</p>}

                                <button
                                    type='submit'
                                    className='flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold text-sm py-3 rounded-lg mt-1
                                        transition-all duration-300 ease-out hover:bg-yellow-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-400/30 active:scale-95 active:translate-y-0'
                                >
                                    Create Account <UserPlus size={16} />
                                </button>
                            </form>
                        )}
                    </>
                )}

                {activeTab === 'admin' && (
                    <form onSubmit={handleAdminLogin} className='flex flex-col gap-4'>
                        <p className='text-center text-gray-500 text-xs -mt-2 mb-2'>Restricted access. Login only.</p>

                        <div className='flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-yellow-400 transition-colors duration-300'>
                            <Mail className='text-gray-500 shrink-0' size={17} />
                            <input
                                type='email'
                                placeholder='Admin email'
                                value={adminData.email}
                                onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                                className='w-full text-sm outline-none bg-transparent text-white placeholder:text-gray-600'
                            />
                        </div>
                        <div className='flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus-within:border-yellow-400 transition-colors duration-300'>
                            <Lock className='text-gray-500 shrink-0' size={17} />
                            <input
                                type='password'
                                placeholder='Admin password'
                                value={adminData.password}
                                onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                                className='w-full text-sm outline-none bg-transparent text-white placeholder:text-gray-600'
                            />
                        </div>

                        {error && <p className='text-red-400 text-xs'>{error}</p>}

                        <button
                            type='submit'
                            className='flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold text-sm py-3 rounded-lg mt-1
                                transition-all duration-300 ease-out hover:bg-yellow-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-400/30 active:scale-95 active:translate-y-0'
                        >
                            Access Dashboard <LogIn size={16} />
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default AuthModal