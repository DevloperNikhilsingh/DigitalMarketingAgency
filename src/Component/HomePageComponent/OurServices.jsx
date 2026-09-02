import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, LayoutGrid, Triangle, Video, Mail, Code, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
    {
        number: '01',
        icon: Search,
        title: 'Search Engine Optimization',
        desc: 'Improve rankings and drive organic traffic that converts.',
        link: '/services/seo',
        bg: 'bg-yellow-400',
        text: 'text-yellow-500',
        underline: 'bg-yellow-400',
        glow: 'from-yellow-200/40',
        btn: 'bg-yellow-400',
    },
    {
        number: '02',
        icon: LayoutGrid,
        title: 'Social Media Marketing',
        desc: 'Engage your audience and build your brand on social media.',
        link: '/services/social-media-marketing',
        bg: 'bg-red-400',
        text: 'text-red-500',
        underline: 'bg-red-400',
        glow: 'from-red-200/40',
        btn: 'bg-red-400',
    },
    {
        number: '03',
        icon: Triangle,
        title: 'Google Ads Management',
        desc: 'Get more leads and sales with high-performing ad campaigns.',
        link: '/services/google-ads',
        bg: 'bg-blue-400',
        text: 'text-blue-500',
        underline: 'bg-blue-400',
        glow: 'from-blue-200/40',
        btn: 'bg-blue-400',
    },
    {
    number: '04',
    icon: Video,
    title: 'Video Editing',
    desc: 'Polished, professional videos that capture attention.',
    link: '/services/video-editing',
    bg: 'bg-purple-400',
    text: 'text-purple-500',
    underline: 'bg-purple-400',
    glow: 'from-purple-200/40',
    btn: 'bg-purple-400',
},
    {
        number: '05',
        icon: Mail,
        title: 'Email Marketing',
        desc: 'Nurture leads and increase conversions with email.',
        link: '/services/email-marketing',
        bg: 'bg-teal-400',
        text: 'text-teal-500',
        underline: 'bg-teal-400',
        glow: 'from-teal-200/40',
        btn: 'bg-teal-400',
    },
    {
        number: '06',
        icon: Code,
        title: 'Website Design',
        desc: 'Beautiful, fast & conversion-focused websites.',
        link: '/services/website-design',
        bg: 'bg-orange-400',
        text: 'text-orange-500',
        underline: 'bg-orange-400',
        glow: 'from-orange-200/40',
        btn: 'bg-orange-400',
    },
]

const OurServices = () => {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const cardRefs = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(cardRefs.current, { opacity: 1, y: 0 })
            gsap.set(headingRef.current.children, { opacity: 1, y: 0 })

            gsap.from(headingRef.current.children, {
                y: 30,
                opacity: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 90%',
                    once: true,
                },
            })

            gsap.from(cardRefs.current, {
                y: 50,
                opacity: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 90%',
                    once: true,
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className='w-full bg-neutral-50 py-16 md:py-24 overflow-hidden'>
            <div className='max-w-6xl mx-auto px-4 md:px-6'>

                {/* Heading */}
                <div ref={headingRef} className='text-center mb-14'>
                    <span className='inline-block border border-yellow-400 text-yellow-500 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-4'>
                        WHAT WE DO
                    </span>
                    <h2 className='text-4xl md:text-5xl font-extrabold text-gray-900'>
                        Our <span className='text-yellow-500'>Services</span>
                    </h2>
                    <p className='text-gray-500 text-sm md:text-base mt-3'>
                        Result-driven services to <span className='font-bold text-gray-900'>grow your brand</span> online.
                    </p>
                </div>

                {/* Cards */}
                <div className='grid md:grid-cols-3 gap-6'>
                    {services.map((service, i) => {
                        const Icon = service.icon
                        return (
                            <Link
                                key={service.title}
                                to={service.link}
                                ref={(el) => (cardRefs.current[i] = el)}
                                className='relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm overflow-hidden group block
                                    transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl'
                            >
                                {/* Glow background */}
                                <div className={`absolute -top-10 -left-10 w-40 h-40 bg-linear-to-br ${service.glow} to-transparent rounded-full blur-2xl
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                                {/* Number */}
                                <span className='absolute top-6 right-6 text-4xl font-extrabold text-gray-100 select-none'>
                                    {service.number}
                                </span>

                                {/* Dotted pattern */}
                                <div className='absolute top-16 right-6 grid grid-cols-3 gap-1'>
                                    {Array.from({ length: 9 }).map((_, d) => (
                                        <span key={d} className='w-1 h-1 rounded-full bg-gray-200'></span>
                                    ))}
                                </div>

                                {/* Icon */}
                                <div className={`relative z-10 w-14 h-14 rounded-xl ${service.bg} flex items-center justify-center mb-6
                                    transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3`}>
                                    <Icon className='text-black' size={26} strokeWidth={2.2} />
                                </div>

                                {/* Title */}
                                <h3 className='relative z-10 text-xl font-extrabold text-gray-900 leading-snug mb-3'>
                                    {service.title}
                                </h3>
                                <div className={`relative z-10 w-8 h-0.5 ${service.underline} mb-4 transition-all duration-300 group-hover:w-14`}></div>

                                {/* Description */}
                                <p className='relative z-10 text-gray-500 text-sm mb-8'>
                                    {service.desc}
                                </p>

                                {/* Learn more */}
                                <div className='relative z-10 flex items-center justify-between'>
                                    <span className={`font-semibold text-sm ${service.text}`}>Learn More</span>
                                    <div className={`w-9 h-9 rounded-full ${service.btn} flex items-center justify-center
                                        transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:rotate-45`}>
                                        <ArrowRight className='text-white' size={16} />
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                <div className='flex justify-center mt-14'>
                    <Link
                        to='/service'
                        className='flex items-center gap-2 border-2 border-yellow-400 text-gray-900 font-bold text-sm px-8 py-3.5 rounded-md
                            transition-all duration-300 ease-out hover:bg-yellow-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-400/40 active:scale-95'
                    >
                        View More Services <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default OurServices