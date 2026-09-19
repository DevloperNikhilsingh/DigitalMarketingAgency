import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import GetListedModal from '../GetListedForm/GetListedForm'
import AuthModal from '../Auth/AuthModal'
import { useAuth } from '../../Context/AuthContext'
import logo from '../../../src/assets/digital-marketing.png'


const navLinks = [
    { name: 'Home', link: '/' },
    { name: 'Service', link: '/service' },
    { name: 'About Us', link: '/about' },
    { name: 'Listing', link: '/listing' },
    { name: 'PortFolio', link: '/portfolio' },
    { name: 'Contact', link: '/contact' }
]

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [showListingModal, setShowListingModal] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const [showAuthModal, setShowAuthModal] = useState(false)

    const { user, logout } = useAuth()

    const isActive = (linkPath) => {
        if (linkPath === '/') return location.pathname === '/'
        return location.pathname.startsWith(linkPath)
    }

    return (
        <nav className='w-full bg-black sticky top-0 z-50 shadow-lg'>
            <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 h-16 md:h-20'>
                <div className='flex items-center shrink-0 h-full'>
                    <Link to='/' className='flex items-center h-full'>
                        <img
                            src={logo}
                            alt="logo"
                            className='h-full max-h-20 md:max-h-20  w-auto max-w-50 object-contain py-1'
                        />
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


                <div className='hidden md:block'>
                    {user ? (
                        <div className='relative group'>
                            <button
                                className='w-9.5 h-9.5 flex items-center justify-center rounded-full bg-amber-400 text-black font-bold text-sm uppercase
                    transition-all duration-300 hover:bg-amber-300'
                            >
                                {user.name ? user.name.charAt(0) : user.email.charAt(0)}
                            </button>

                            {/* Dropdown */}
                            <div className='absolute right-0 mt-2 w-40 bg-neutral-900 border border-white/10 rounded-lg shadow-xl
                             opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
                                <button
                                    onClick={() => {
                                        navigate(user.role == 'admin' ? '/admin/dashboard' : '/employer/dashboard')
                                    }}
                                    className='w-full text-left px-4 py-2.5 text-sm text-yellow-400 hover:bg-white/5 transition-colors'
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => {
                                        logout()
                                        navigate('/')
                                    }}
                                    className='w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 transition-colors'
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowAuthModal(true)}
                            className='flex w-32.5 h-9.5 justify-center items-center bg-amber-400 text-black text-sm font-bold rounded-md shadow-md
                transition-all duration-300 ease-in-out hover:bg-amber-300 hover:shadow-amber-400/40 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95'
                        >
                            Free Listed
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
                    <div className='flex items-center shrink-0 h-full'>
                        <Link to='/' className='flex items-center h-full'>
                            <img
                                src={logo}
                                alt="logo"
                                className='h-full max-h-20 md:max-h-20  w-auto max-w-50 object-contain py-1'
                            />
                        </Link>
                    </div>
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

                    <button
                        onClick={() => setShowAuthModal(true)}
                        className='w-full h-9.5 mt-2 flex justify-center items-center bg-amber-400 text-black text-sm font-bold rounded-md shadow-md
                                transition-all duration-300 hover:bg-amber-300 active:scale-95'
                    >
                        Free Listed
                    </button>
                </div>
            </div>

            {showAuthModal && (
                <AuthModal
                    onClose={() => setShowAuthModal(false)}
                    defaultRole='employer'
                    lockRole={true}
                />
            )}
        </nav>
    )
}

export default Navbar