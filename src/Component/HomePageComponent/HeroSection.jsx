import React, { useEffect, useRef } from 'react'
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroImage from '../../assets/HeroImage.png'

gsap.registerPlugin(ScrollTrigger)

const stats = [
    { value: 200, suffix: '+', label: 'Projects Done' },
    { value: 150, suffix: '+', label: 'Happy Clients' },
    { value: 98, suffix: '%', label: 'Client Retention' },
    { value: 10, suffix: '+', label: 'Years Experience' },
]

const HeroSection = () => {
    const statsRef = useRef(null)
    const numberRefs = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            numberRefs.current.forEach((el, i) => {
                const obj = { val: 0 }
                gsap.to(obj, {
                    val: stats[i].value,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: () => {
                        if (el) el.textContent = Math.floor(obj.val) + stats[i].suffix
                    },
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 85%',
                        once: true,
                    },
                })
            })
        }, statsRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className='relative w-full bg-black overflow-hidden'>
            <div className='max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-10 md:pt-20 md:pb-0 grid md:grid-cols-2 gap-10 items-center relative z-10'>

                {/* Left content */}
                <div className='order-2 md:order-1'>
                    <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight'>
                        We Grow Brands <br />
                        <span className='text-yellow-400'>Digitally.</span>
                    </h1>

                    <p className='text-gray-400 text-sm md:text-base mt-5 max-w-md'>
                        Smart strategies. Stunning creatives. Real results. We help
                        businesses grow with data-driven digital marketing.
                    </p>

                    <div className='flex flex-wrap gap-4 mt-8'>
                        <button className='flex items-center gap-2 bg-yellow-400 text-black font-bold text-sm px-6 py-3 rounded-md shadow-md
                            transition-all duration-300 ease-out hover:bg-yellow-300 hover:-translate-y-1 hover:shadow-yellow-400/50 hover:shadow-xl active:scale-90 active:translate-y-0'>
                            Get Started <ArrowRight size={16} className='transition-transform duration-300 group-hover:translate-x-1' />
                        </button>
                        <button className='border border-white/30 text-white font-bold text-sm px-6 py-3 rounded-md
                            transition-all duration-300 ease-out hover:border-yellow-400 hover:text-yellow-400 hover:-translate-y-1 hover:bg-white/5 active:scale-90 active:translate-y-0'>
                            View Our Work
                        </button>
                    </div>
                </div>

                {/* Right image */}
                <div className='order-1 md:order-2 relative flex justify-center items-end h-95 sm:h-110 md:h-130'>
                    <div className='hidden md:block absolute w-105 h-105 border border-dashed border-yellow-400/20 rounded-full animate-[spin_25s_linear_infinite]'></div>

                    <div className='hidden md:flex absolute left-2 top-16 w-11 h-11 rounded-full bg-white/5 border border-white/10 items-center justify-center backdrop-blur-sm animate-bounce z-20'>
                        <Sparkles className='text-yellow-400' size={16} />
                    </div>
                    <div className='hidden md:flex absolute right-4 top-1/4 w-11 h-11 rounded-full bg-white/5 border border-white/10 items-center justify-center backdrop-blur-sm z-20'>
                        <TrendingUp className='text-yellow-400' size={16} />
                    </div>
                    <div className='hidden md:flex absolute left-4 bottom-16 w-11 h-11 rounded-full bg-white/5 border border-white/10 items-center justify-center backdrop-blur-sm z-20'>
                        <ArrowRight className='text-yellow-400 -rotate-45' size={16} />
                    </div>
                    <div className='hidden md:flex absolute right-8 bottom-4 w-11 h-11 rounded-full bg-white/5 border border-white/10 items-center justify-center backdrop-blur-sm z-20'>
                        <Sparkles className='text-yellow-400' size={16} />
                    </div>

                    <img
                        src={HeroImage}
                        alt="Digital marketing expert"
                        className='relative z-10 w-full max-w-md h-full object-contain object-bottom drop-shadow-2xl'
                    />
                </div>
            </div>

            {/* Stats bar */}
            <div ref={statsRef} className='relative z-20 max-w-5xl mx-auto px-6 md:px-0 -mt-6 md:-mt-16 mb-10 md:mb-0
                bg-neutral-900/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl
                grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 px-6 md:px-10 py-6'>
                {stats.map((stat, i) => (
                    <div key={stat.label} className={`text-center ${i < 3 ? 'md:border-r md:border-white/10' : ''}`}>
                        <p
                            ref={(el) => (numberRefs.current[i] = el)}
                            className='text-yellow-400 text-xl md:text-2xl font-extrabold'
                        >
                            0{stat.suffix}
                        </p>
                        <p className='text-gray-400 text-xs md:text-sm mt-1'>{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default HeroSection