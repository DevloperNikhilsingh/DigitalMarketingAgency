import React, { useState, useMemo } from 'react'
import { filters, portfolioItems } from "../../data/portfolioData";
import PortfolioFilterTabs from "../PortFolioComponent/PortfolioFilterTabs";
import PortfolioCard from "../PortFolioComponent/PortfolioCard";

const PortfolioSection = () => {
    const [activeFilter, setActiveFilter] = useState('All')

    const filteredItems = useMemo(() => {
        if (activeFilter === 'All') return portfolioItems
        return portfolioItems.filter((item) => item.category === activeFilter)
    }, [activeFilter])

    return (
        <section className='w-full bg-neutral-50 py-16 md:py-24'>
            <div className='max-w-6xl mx-auto px-4 md:px-6'>

                {/* Heading */}
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

                {/* Filter tabs */}
                <PortfolioFilterTabs
                    filters={filters}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />

                {/* Cards grid - only active filter's items show */}
                <div className='grid md:grid-cols-3 gap-6'>
                    {filteredItems.map((item) => (
                        <PortfolioCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PortfolioSection