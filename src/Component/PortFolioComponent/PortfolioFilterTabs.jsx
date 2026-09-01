import React from 'react'
import { LayoutGrid, Search, Heart, Sparkle, Code2 } from 'lucide-react'

const filterIcons = {
    All: LayoutGrid,
    SEO: Search,
    'Social Media': Heart,
    'Google Ads': Sparkle,
    'Web Design': Code2,
}

const PortfolioFilterTabs = ({ filters, activeFilter, onFilterChange }) => {
    return (
        <div className='flex flex-wrap justify-center gap-3 mb-12'>
            {filters.map((filter) => {
                const Icon = filterIcons[filter]
                const isActive = activeFilter === filter
                return (
                    <button
                        key={filter}
                        onClick={() => onFilterChange(filter)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
                            transition-all duration-300 ease-out active:scale-95
                            ${isActive
                                ? 'bg-gray-900 text-white shadow-md'
                                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:-translate-y-0.5'
                            }`}
                    >
                        <Icon size={16} className={isActive ? 'text-white' : 'text-gray-500'} />
                        {filter}
                    </button>
                )
            })}
        </div>
    )
}

export default PortfolioFilterTabs