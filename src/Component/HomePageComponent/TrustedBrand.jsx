import React from 'react'

const brands = [
    { name: 'Google', logo: 'https://cdn.simpleicons.org/google' },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
    { name: 'Airbnb', logo: 'https://cdn.simpleicons.org/airbnb' },
    { name: 'HubSpot', logo: 'https://cdn.simpleicons.org/hubspot' },
    { name: 'Walmart', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg' },
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
]

const TrustedBrands = () => {
    return (
        <section className='w-full bg-white py-10 md:py-14'>
            <div className='max-w-6xl mx-auto px-4 text-center'>
                <h3 className='text-gray-900 font-semibold text-base md:text-lg mb-8'>
                    Top Brands We've Worked With
                </h3>

                <div className='flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14'>
                    {brands.map((brand) => (
                        <img
                            key={brand.name}
                            src={brand.logo}
                            alt={brand.name}
                            className='h-6 md:h-7 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300'
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TrustedBrands