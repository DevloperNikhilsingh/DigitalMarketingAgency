import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { filters, portfolioItems } from "../../data/portfolioData";
import PortfolioFilterTabs from "../PortFolioComponent/PortfolioFilterTabs";
import PortfolioCard from "../PortFolioComponent/PortfolioCard";
import { ArrowRight } from 'lucide-react';

const HOME_LIMIT = 6

// Home page ke filter names -> Portfolio (Gallery) page ke actual category names
// Gallery ke categories: "All Works", "Graphics", "Video Editing", "ADS", "SEO", "Web Development", "Other"
const categoryMap = {
    'All': 'All Works',
    'SEO': 'SEO',
    'Social Media': 'ADS',
    'Google Ads': 'ADS',
    'Web Design': 'Web Development',
}

const PortfolioSection = () => {
    const [activeFilter, setActiveFilter] = useState('All')
    const navigate = useNavigate()

    const filteredItems = useMemo(() => {
        const items = activeFilter === 'All'
            ? portfolioItems
            : portfolioItems.filter((item) => item.category === activeFilter)
        return items.slice(0, HOME_LIMIT)
    }, [activeFilter])

    const handleViewMore = () => {
        const mappedCategory = categoryMap[activeFilter] || 'All Works'
        navigate(`/portfolio?category=${encodeURIComponent(mappedCategory)}`)
    }

    return (
        <section className='w-full bg-neutral-50 py-16 md:py-24'>
            <div className='max-w-6xl mx-auto px-4 md:px-6'>

                
                <div className='text-center mb-10'>
                    <span className='inline-block border border-yellow-400 text-yellow-500 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-4'>
                        RESULT THAT MATTER
                    </span>
                    <h2 className='text-4xl md:text-5xl font-extrabold text-gray-900'>
                        Work That <span className='text-amber-400'>Speaks</span> For Itself
                    </h2>
                    <p className='text-gray-500 text-base mt-3'>
                        A glimpse of <span className='text-blue-600 font-semibold'>results</span> we've delivered.
                    </p>
                </div>

               
                <PortfolioFilterTabs
                    filters={filters}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />

                
                <div className='grid md:grid-cols-3 gap-6'>
                    {filteredItems.map((item) => (
                        <PortfolioCard key={item.id} item={item} />
                    ))}
                </div>

                
                <div className='flex justify-center mt-10'>
                    <button
                        onClick={handleViewMore}
                        className='flex items-center gap-2 border-2 border-yellow-400 text-gray-900 font-bold text-sm px-8 py-3.5 rounded-md
                            transition-all duration-300 ease-out hover:bg-yellow-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-400/40 active:scale-95'
                    >
                        View More  <ArrowRight size={16}/>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default PortfolioSection