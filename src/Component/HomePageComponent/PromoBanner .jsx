import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Target, TrendingUp, Rocket } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAuth } from '../../Context/AuthContext'
import AuthModal from '../Auth/AuthModal'
import EmployerCTAModal from '../Auth/EmployerCTAModal'

gsap.registerPlugin(ScrollTrigger)

const features = [
    { icon: Target, label: 'Targeted Audience' },
    { icon: TrendingUp, label: 'Higher Conversions' },
    { icon: Rocket, label: 'Maximum Growth' },
]

const PromoBanner = () => {
    const sectionRef = useRef(null)
    const contentRef = useRef(null)
    const imageRef = useRef(null)
    const featuresRef = useRef(null)

    const { user } = useAuth()
    const navigate = useNavigate()
    const [showCTAModal, setShowCTAModal] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)

    const handleStartCampaign = () => {
        if (user && user.role === 'employer') {
            navigate('/employer/dashboard?tab=list-service')
        } else {
            setShowCTAModal(true)
        }
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set([contentRef.current.children, imageRef.current, featuresRef.current.children], {
                opacity: 1,
                y: 0,
                x: 0,
            })

            gsap.from(contentRef.current.children, {
                y: 30,
                opacity: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    once: true,
                },
            })

            gsap.from(imageRef.current, {
                x: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    once: true,
                },
            })

            gsap.from(featuresRef.current.children, {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    once: true,
                },
            })

            gsap.to(imageRef.current, {
                y: -12,
                duration: 2.2,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

        return (
    <section
        ref={sectionRef}
        className='w-full bg-neutral-50 py-10 md:py-16 px-4'
    >
        <div className='max-w-6xl mx-auto'>

            {/* Promo Banner */}
            <div className='relative bg-[#151515] rounded-3xl overflow-hidden px-8 py-10 md:px-14 md:py-12 border border-yellow-400/70'>

                {/* Yellow Dot Pattern */}
                <div className='absolute right-10 top-10 grid grid-cols-4 gap-2 opacity-60'>
                    {Array.from({ length: 16 }).map((_, d) => (
                        <span
                            key={d}
                            className='w-1.5 h-1.5 rounded-full bg-yellow-400'
                        ></span>
                    ))}
                </div>

                <div className='grid md:grid-cols-2 gap-10 items-center relative z-10'>

                    {/* Content */}
                    <div ref={contentRef}>

                        <h2 className='text-2xl md:text-4xl font-extrabold text-white leading-snug'>
                            Want To Promote Your{' '}
                            <span className='text-yellow-400'>
                                Business With Us?
                            </span>
                        </h2>

                        <p className='text-neutral-300 text-sm md:text-base mt-4 max-w-md'>
                            Reach thousands of potential customers and grow your
                            business with powerful digital marketing.
                        </p>

                        <button
                            onClick={handleStartCampaign}
                            className='flex items-center gap-2 bg-yellow-400 text-black font-bold text-sm px-6 py-3 rounded-md mt-7 shadow-md
                            transition-all duration-300 ease-out
                            hover:bg-yellow-300 hover:-translate-y-1
                            hover:shadow-yellow-400/40 hover:shadow-xl
                            active:scale-95'
                        >
                            Start Your Campaign
                            <ArrowRight size={16} />
                        </button>

                    </div>

                    {/* Image */}
                    <div
                        ref={imageRef}
                        className='flex justify-center md:justify-end'
                    >
                        <img
                            src='https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=500&q=80'
                            alt='Marketing dashboard'
                            className='w-72 md:w-80 rounded-2xl shadow-2xl object-cover'
                        />
                    </div>

                </div>

                {/* Features */}
                <div
                    ref={featuresRef}
                    className='flex flex-wrap items-center justify-center md:justify-start
                    gap-8 md:gap-12 mt-10 pt-8
                    border-t border-yellow-400/30
                    relative z-10'
                >
                    {features.map((feature) => {
                        const Icon = feature.icon

                        return (
                            <div
                                key={feature.label}
                                className='flex items-center gap-3 group cursor-default'
                            >

                                {/* Icon */}
                                <div
                                    className='w-9 h-9 rounded-full
                                    border border-yellow-400/40
                                    bg-[#1A1A1A]
                                    flex items-center justify-center
                                    transition-all duration-300 ease-out
                                    group-hover:bg-yellow-400
                                    group-hover:border-yellow-400
                                    group-hover:scale-110'
                                >
                                    <Icon
                                        className='text-yellow-400
                                        transition-colors duration-300
                                        group-hover:text-black'
                                        size={16}
                                    />
                                </div>

                                {/* Label */}
                                <span
                                    className='text-neutral-200 text-sm font-semibold
                                    transition-colors duration-300
                                    group-hover:text-white'
                                >
                                    {feature.label}
                                </span>

                            </div>
                        )
                    })}
                </div>

            </div>
        </div>

        {showCTAModal && (
            <EmployerCTAModal
                onClose={() => setShowCTAModal(false)}
                onAuthRequest={() => setShowAuthModal(true)}
            />
        )}

        {showAuthModal && (
            <AuthModal onClose={() => setShowAuthModal(false)} />
        )}
    </section>
)
}

export default PromoBanner