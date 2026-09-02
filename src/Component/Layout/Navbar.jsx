import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import AuthModal from '../Auth/AuthModal'
import UserMenu from './UserMenu'
import { useAuth } from '../../Context/AuthContext'

const navLinks = [
    { name: 'Home', link: '/' },
    { name: 'Service', link: '/service' },
    { name: 'PortFolio', link: '/portfolio' },
    { name: 'About Us', link: '/about' },
    { name: 'Contact', link: '/contact' }
]

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [authOpen, setAuthOpen] = useState(false)
    const location = useLocation()
    const { user, logout } = useAuth()

    const isActive = (linkPath) => {
        if (linkPath === '/') return location.pathname === '/'
        return location.pathname.startsWith(linkPath)
    }

    const dashboardPath = user?.role === 'admin' ? '/admin/dashboard' : '/employer/dashboard'

    return (
        <nav className='w-full bg-black sticky top-0 z-50 shadow-lg'>
            <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-4'>
                <div className='flex items-center'>
                    <Link to='/'>
                        <h1 className='text-xl font-semibold text-white transition-transform duration-300 hover:scale-105'>
                            Digi<span className='text-yellow-500'>Service</span>
                        </h1>
                    </Link>
                </div>

                <div className='hidden md:flex items-center gap-8'>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.link}
                            className={`relative text-sm font-semibold cursor-pointer py-1 transition-colors duration-300
                                ${isActive(link.link) ? 'text-amber-400' : 'text-white hover:text-amber-400'}
                                after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-amber-400
                                after:transition-all after:duration-300 after:ease-out
                                ${isActive(link.link) ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                            `}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop: avatar menu if logged in, else Login & Register */}
                <div className='hidden md:block'>
                    {user ? (
                        <UserMenu />
                    ) : (
                        <button
                            onClick={() => setAuthOpen(true)}
                            className='flex w-32.5 h-9.5 justify-center items-center bg-amber-400 text-black text-sm font-bold rounded-md shadow-md
                                transition-all duration-300 ease-in-out hover:bg-amber-300 hover:shadow-amber-400/40 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95'
                        >
                            Login & Register
                        </button>
                    )}
                </div>

                <button
                    className='md:hidden text-white p-1 transition-transform duration-300 active:scale-90'
                    onClick={() => setIsOpen(true)}
                    aria-label='Open menu'
                >
                    <Menu size={26} />
                </button>
            </div>

            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />

            <div
                className={`fixed top-0 right-0 h-full w-1/2 max-w-xs bg-black z-50 shadow-2xl
                    transform transition-transform duration-300 ease-in-out md:hidden
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className='flex justify-between items-center px-5 py-4 border-b border-white/10'>
                    <h1 className='text-lg font-semibold text-white'>
                        Digi<span className='text-yellow-500'>Service</span>
                    </h1>
                    <button
                        onClick={() => setIsOpen(false)}
                        className='text-white p-1 transition-transform duration-300 active:scale-90 hover:text-amber-400'
                        aria-label='Close menu'
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className='flex flex-col gap-4 px-5 py-6'>
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.name}
                            to={link.link}
                            onClick={() => setIsOpen(false)}
                            style={{ transitionDelay: isOpen ? `${index * 60}ms` : '0ms' }}
                            className={`text-sm font-semibold transition-all duration-300 border-l-2 pl-3
                                transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
                                ${isActive(link.link) ? 'text-amber-400 border-amber-400' : 'text-white border-transparent hover:text-amber-400 hover:border-amber-400 hover:pl-4'}
                            `}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Mobile: Dashboard/Logout if logged in, else Login & Register */}
                    {user ? (
                        <div className='flex flex-col gap-2 mt-2'>
                            <Link
                                to={dashboardPath}
                                onClick={() => setIsOpen(false)}
                                className='w-full h-9.5 flex justify-center items-center bg-amber-400 text-black text-sm font-bold rounded-md
                                    transition-all duration-300 hover:bg-amber-300 active:scale-95'
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={() => { setIsOpen(false); logout() }}
                                className='w-full h-9.5 flex justify-center items-center border border-amber-400 text-white text-sm font-bold rounded-md
                                    transition-all duration-300 hover:bg-amber-400 hover:text-black active:scale-95'
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => { setIsOpen(false); setAuthOpen(true) }}
                            className='w-full h-9.5 mt-2 flex justify-center items-center bg-amber-400 text-black text-sm font-bold rounded-md shadow-md
                                transition-all duration-300 hover:bg-amber-300 active:scale-95'
                        >
                            Login & Register
                        </button>
                    )}
                </div>
            </div>

            {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
        </nav>
    )
}

export default Navbar