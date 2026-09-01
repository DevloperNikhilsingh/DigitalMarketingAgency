import React, { useEffect, useRef } from 'react'
import { Check } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const plans = [
    {
        name: 'Starter',
        price: '₹4,999',
        desc: 'Perfect for small businesses',
        features: ['SEO Audit', 'Keyword Research', 'On-Page SEO', 'Monthly Report'],
        featured: false,
    },
    {
        name: 'Growth',
        price: '₹9,999',
        desc: 'Ideal for growing businesses',
        features: ['Everything in Starter', 'Social Media Marketing', 'Google Ads (₹15000 Ad spend)', 'Priority Support'],
        featured: true,
    },
    {
        name: 'Pro',
        price: '₹17,499',
        desc: 'For established businesses',
        features: ['Everything in Growth', 'Advanced SEO', 'Conversion Optimization', 'Dedicated Manager'],
        featured: false,
    },
]

const PricingSection = () => {
    const sectionRef = useRef(null)
    const cardRefs = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(cardRefs.current, { opacity: 1, y: 0 })
            gsap.from(cardRefs.current, {
                y: 40,
                opacity: 0,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    once: true,
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className='w-full bg-neutral-50 py-16 md:py-24'>
            <div className='max-w-5xl mx-auto px-4 md:px-6'>

                {/* Heading */}
                <div className='text-center mb-12'>
                    <h2 className='text-3xl md:text-4xl font-extrabold text-gray-900'>
                        Simple, Transparent Pricing
                    </h2>
                    <p className='text-gray-500 text-sm md:text-base mt-3'>
                        Choose the best plan for your business.
                    </p>
                </div>

                {/* Cards */}
                <div className='grid md:grid-cols-3 gap-6 items-start'>
                    {plans.map((plan, i) => (
                        <div
                            key={plan.name}
                            ref={(el) => (cardRefs.current[i] = el)}
                            className={`relative bg-white rounded-2xl p-8 transition-all duration-300 ease-out hover:-translate-y-2
                                ${plan.featured
                                    ? 'border-2 border-yellow-400 shadow-xl md:scale-105 hover:shadow-2xl'
                                    : 'border border-gray-100 shadow-sm hover:shadow-lg'
                                }`}
                        >
                            {plan.featured && (
                                <span className='absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-4 py-1 rounded-full shadow-md'>
                                    Most Popular
                                </span>
                            )}

                            <h3 className='text-gray-500 font-semibold text-sm mb-4'>
                                {plan.name}
                            </h3>

                            <div className='flex items-end gap-1 mb-1'>
                                <span className='text-3xl md:text-4xl font-extrabold text-gray-900'>
                                    {plan.price}
                                </span>
                                <span className='text-gray-400 text-sm mb-1'>/month</span>
                            </div>

                            <p className='text-gray-400 text-xs mb-6'>
                                {plan.desc}
                            </p>

                            <ul className='flex flex-col gap-3 mb-8'>
                                {plan.features.map((feature) => (
                                    <li key={feature} className='flex items-center gap-2 text-sm text-gray-600'>
                                        <span className='shrink-0 w-4 h-4 rounded-full bg-yellow-100 flex items-center justify-center'>
                                            <Check className='text-yellow-500' size={10} strokeWidth={3} />
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className='w-full bg-yellow-400 text-black font-bold text-sm py-3 rounded-md
                                transition-all duration-300 ease-out hover:bg-yellow-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-400/40 active:scale-95'>
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PricingSection