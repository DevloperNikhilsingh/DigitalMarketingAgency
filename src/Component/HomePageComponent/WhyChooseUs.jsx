import React, { useRef, useEffect } from 'react'
import { BarChart3, FileText, Users, Heart } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
    {
        icon: BarChart3,
        title: 'Data-Driven Strategies',
        desc: 'We use data and insights to fuel real growth.',
    },
    {
        icon: FileText,
        title: 'Transparent Reporting',
        desc: 'Real-time reports and clear communication.',
    },
    {
        icon: Users,
        title: 'Experienced Team',
        desc: 'Certified experts with years of experience.',
    },
    {
        icon: Heart,
        title: 'Client-First Approach',
        desc: 'Your success is our top priority.',
    },
]

const WhyChooseUs = () => {
    const sectionRef = useRef(null)
    const headingRef = useRef(null)
    const imageRef = useRef(null)
    const itemRefs = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headingRef.current.children, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            })

            gsap.from(imageRef.current, {
                x: -60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            })

            gsap.from(itemRefs.current, {
                x: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className='w-full bg-black py-16 md:py-24 overflow-hidden'>
            <div className='max-w-6xl mx-auto px-4 md:px-6'>

                {/* Heading */}
                <div ref={headingRef} className='text-center mb-12 md:mb-16'>
                    <h2 className='text-3xl md:text-4xl font-extrabold text-white'>
                        Why Choose Us?
                    </h2>
                    <p className='text-gray-400 text-sm md:text-base mt-3'>
                        We're not just another agency. We're your growth partners.
                    </p>
                </div>

                <div className='grid md:grid-cols-2 gap-10 md:gap-16 items-center'>

                    {/* Left image */}
                    <div
                        ref={imageRef}
                        className='rounded-2xl overflow-hidden shadow-2xl group'
                    >
                        <img
                            src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
                            alt='Team collaborating'
                            className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105'
                        />
                    </div>

                    {/* Right features */}
                    <div className='flex flex-col gap-8'>
                        {features.map((feature, i) => {
                            const Icon = feature.icon
                            return (
                                <div
                                    key={feature.title}
                                    ref={(el) => (itemRefs.current[i] = el)}
                                    className='flex items-start gap-4 group cursor-default'
                                >
                                    <div className='shrink-0 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center
                                        transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-yellow-400/40'>
                                        <Icon className='text-black transition-transform duration-300 group-hover:rotate-6' size={18} />
                                    </div>
                                    <div>
                                        <h3 className='text-white font-bold text-base md:text-lg transition-colors duration-300 group-hover:text-yellow-400'>
                                            {feature.title}
                                        </h3>
                                        <p className='text-gray-400 text-sm mt-1'>
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs