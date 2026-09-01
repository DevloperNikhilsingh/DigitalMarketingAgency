import React from 'react'
import { useParams } from 'react-router-dom'
import { serviceDetails } from '../data/ServicesDetailData'
import ServiceHero from '../Component/ServicesDetailComponent/ServiceHero'
import ExampleProjects from '../Component/ServicesDetailComponent/ExampleProjects'
import ServiceRequestForm from '../Component/ServicesDetailComponent/ServiceRequestForm'
import Footer from '../Component/Layout/Footer '
import Navbar from '../Component/Layout/Navbar'

const ServiceDetailPage = () => {
    const { serviceId } = useParams()
    const service = serviceDetails[serviceId]

    if (!service) {
        return <div className='py-20 text-center text-gray-500'>Service not found.</div>
    }

    return (
        <div>
            <Navbar />
            <ServiceHero
                title={service.title}
                tagline={service.tagline}
                description={service.description}
                badge={service.title.toUpperCase()}
                titleLine1="Beautiful, Fast &"
                titleLine2="Conversion-Focused"
            />
            <ExampleProjects examples={service.examples} />
            <div className='pb-16 px-4'>
                <ServiceRequestForm serviceName={service.title} />
            </div>
            <Footer />
        </div>
    )
}

export default ServiceDetailPage