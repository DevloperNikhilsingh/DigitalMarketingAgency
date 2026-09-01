import React from 'react'
import Navbar from '../Component/Layout/Navbar'
import HeroSection from '../Component/HomePageComponent/HeroSection'
import Brand from '../Component/HomePageComponent/TrustedBrand'
import WhyChooseUs from '../Component/HomePageComponent/WhyChooseUs'
import OurServices from '../Component/HomePageComponent/OurServices'
import PortfolioSection from '../Component/HomePageComponent/Portfolio'
import PromoBanner from '../Component/HomePageComponent/PromoBanner '
import PricingSection from '../Component/HomePageComponent/PricingSection '
import CTASection from '../Component/HomePageComponent/CTASection'
import Footer from '../Component/Layout/Footer '

const HomePage = () => {
  return (
    <>
    <Navbar />
    <HeroSection />
    <Brand />
    <OurServices />
    <WhyChooseUs />
    <PromoBanner />
    <PortfolioSection />
    <PricingSection />
    <CTASection />
    <Footer />
    </>
  )
}

export default HomePage
