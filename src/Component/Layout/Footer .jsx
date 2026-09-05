import React from 'react'
import { MessageCircle, Phone, Mail, MapPin, Sparkles } from 'lucide-react'
import { FaFacebook, FaXTwitter, FaWhatsapp } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/service' },
    { name: 'About Us', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact Us', path: '/contact' },
]

const services = [
    { name: 'SEO', path: '/services/seo' },
    { name: 'Social Media Marketing', path: '/services/social-media-marketing' },
    { name: 'Google Ads', path: '/services/google-ads' },
    { name: 'Content Marketing', path: '/services/content-marketing' },
    { name: 'Email Marketing', path: '/services/email-marketing' },
    { name: 'All Services', path: '/service' },
]

const whatsappMessage = "Hello Sir! I would like to know more about your digital marketing services. Please share more details.";

const socialLinks = [
    { Icon: FaFacebook, href: 'https://facebook.com/yourpage' },
    { Icon: FaXTwitter, href: 'https://twitter.com/yourpage' },
    { Icon: FaWhatsapp, href: `https://wa.me/917007314944?text=${encodeURIComponent(whatsappMessage)}` },
    { Icon: MessageCircle, href: '/contact' },
]

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
                            {socialLinks.map(({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target='_blank'
                                    rel='noopener noreferrer'
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
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className='text-gray-400 text-sm transition-colors duration-300 hover:text-yellow-400'
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className='text-white font-bold text-sm mb-5'>Services</h4>
                        <ul className='flex flex-col gap-3'>
                            {services.map((service) => (
                                <li key={service.name}>
                                    <Link
                                        to={service.path}
                                        className='text-gray-400 text-sm transition-colors duration-300 hover:text-yellow-400'
                                    >
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className='text-white font-bold text-sm mb-5'>Contact Us</h4>
                        <ul className='flex flex-col gap-4'>
                            <a href="tel:+917007314944">
                                <li className='flex items-center gap-2 text-gray-400 text-sm'>
                                    <Phone className='text-yellow-400 shrink-0' size={15} />
                                    +91 7007314944
                                </li>
                            </a>
                            <li className='flex items-center gap-2 text-gray-400 text-sm'>
                                <Mail className='text-yellow-400 shrink-0' size={15} />
                                amerjeet13vns@gmail.com
                            </li>
                            <li className='flex items-start gap-2 text-gray-400 text-sm'>
                                <MapPin className='text-yellow-400 shrink-0 mt-0.5' size={15} />
                                15/46 A-R, Shivpur Bypass, Near Tomer Children School, Shuddhipur Tarna, Varanasi, UP
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