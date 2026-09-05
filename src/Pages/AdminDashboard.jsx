import React from 'react'
import AdminSidebar from '../Component/AdminDashboardComponent/OverviewTab/AdminSidebar'
import StatCard from '../Component/AdminDashboardComponent/OverviewTab/StatCard'
import OverviewChart from '../Component/AdminDashboardComponent/OverviewTab/OverviewChart'
import RecentActivity from '../Component/AdminDashboardComponent/OverviewTab/RecentActivity'
import CategoryDonut from '../Component/AdminDashboardComponent/OverviewTab/CategoryDonut'
import TopServices from '../Component/AdminDashboardComponent/OverviewTab/TopServices'
import { statCards, overviewData, recentActivity, categoryData, topServices } from '../data/dashBoardData'

const AdminDashboard = () => {
    const totalRequests = categoryData.reduce((sum, c) => sum + c.value, 0)

    return (
        <div className='flex flex-col lg:flex-row bg-gray-50 min-h-screen'>
    <AdminSidebar />

    <main className='flex-1 p-4 md:p-6 flex flex-col gap-5 md:gap-6 w-full min-w-0'>
                <div className='bg-white border border-yellow-300 rounded-2xl p-5 flex items-center gap-4'>
                    <div className='w-11 h-11 rounded-full bg-yellow-50 flex items-center justify-center text-2xl shrink-0'>
                        👋
                    </div>
                    <div>
                        <h1 className='font-extrabold text-lg text-gray-900'>
                            Welcome back, <span className='text-yellow-500'>Admin!</span>
                        </h1>
                        <p className='text-gray-500 text-sm'>Here's what's happening with your platform today.</p>
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                    {statCards.map((stat) => (
                        <StatCard key={stat.key} statKey={stat.key} label={stat.label} value={stat.value} change={stat.change} trend={stat.trend} />
                    ))}
                </div>

                <div className='grid lg:grid-cols-3 gap-5'>
                    <div className='lg:col-span-2'>
                        <OverviewChart data={overviewData} />
                    </div>
                    <RecentActivity activity={recentActivity} />
                </div>

                <div className='grid lg:grid-cols-2 gap-5'>
                    <CategoryDonut data={categoryData} total={totalRequests} />
                    <TopServices services={topServices} />
                </div>
            </main>
        </div>
    )
}

export default AdminDashboard