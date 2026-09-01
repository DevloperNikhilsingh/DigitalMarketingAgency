import React from 'react'
import { MessageCircle, Phone, Mail, MapPin, Sparkles } from 'lucide-react'
import { FaFacebook, FaXTwitter, FaWhatsapp } from 'react-icons/fa6'

const quickLinks = ['Home', 'Services', 'About Us', 'Portfolio', 'Contact Us']
const services = ['SEO', 'Social Media Marketing', 'Google Ads', 'Content Marketing', 'Email Marketing']

const Footer = () => {
    return (
        <footer className='w-full bg-black pt-14 pb-6 px-4'>
            <div className='max-w-6xl mx-auto'>
                <div className='grid md:grid-cols-4 gap-10 pb-10 border-b border-white/10'>

                    {/* Brand */}
                    <div>
                        <div className='flex items-center gap-2 mb-4'>
                            <Sparkles className='text-yellow-400' size={20} />
                            <span className='text-white font-extrabold text-lg'>DigiServices</span>
                        </div>
                        <p className='text-gray-400 text-sm mb-5'>
                            We help brands grow with smart digital marketing strategies.
                        </p>
                        <div className='flex items-center gap-3'>
                          {[FaFacebook, FaXTwitter, FaWhatsapp, MessageCircle].map((Icon, i) => (
                                <a
                                    key={i}
                                    href='#'
                                    className='w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center
                                        transition-all duration-300 ease-out hover:bg-yellow-400 hover:-translate-y-1'
                                >
                                    <Icon className='text-white transition-colors duration-300 hover:text-black' size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className='text-white font-bold text-sm mb-5'>Quick Links</h4>
                        <ul className='flex flex-col gap-3'>
                            {quickLinks.map((link) => (
                                <li key={link}>
                                    <a href='#' className='text-gray-400 text-sm transition-colors duration-300 hover:text-yellow-400'>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className='text-white font-bold text-sm mb-5'>Services</h4>
                        <ul className='flex flex-col gap-3'>
                            {services.map((service) => (
                                <li key={service}>
                                    <a href='#' className='text-gray-400 text-sm transition-colors duration-300 hover:text-yellow-400'>
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className='text-white font-bold text-sm mb-5'>Contact Us</h4>
                        <ul className='flex flex-col gap-4'>
                            <li className='flex items-center gap-2 text-gray-400 text-sm'>
                                <Phone className='text-yellow-400 shrink-0' size={15} />
                                +91 9876543210
                            </li>
                            <li className='flex items-center gap-2 text-gray-400 text-sm'>
                                <Mail className='text-yellow-400 shrink-0' size={15} />
                                hello@digiservices.com
                            </li>
                            <li className='flex items-start gap-2 text-gray-400 text-sm'>
                                <MapPin className='text-yellow-400 shrink-0 mt-0.5' size={15} />
                                123, Digital Street, Mohali, India
                            </li>
                        </ul>
                    </div>
                </div>

                <p className='text-center text-gray-500 text-xs pt-6'>
                    © 2026 DigiServices Marketing Agency. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer