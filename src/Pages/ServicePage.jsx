import React from "react";

import HeroSection from "../Component/ServicePage/HeroSection/HeroSection";
import ServicesSection from "../Component/ServicePage/ServicesSection/ServicesSection";
import ProcessSection from "../Component/ServicePage/ProcessSection/ProcessSection";
import WhyChooseUsSection from "../Component/ServicePage/WhyChooseUsSection/WhyChooseUsSection";
import ResultsSection from "../Component/ServicePage/ResultsSection/ResultsSection";
import CTASection from "../Component/ServicePage/CTASection/CTASection";
import Footer from "../Component/Layout/Footer ";
import Navbar from "../Component/Layout/Navbar";

const ServicePage = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <WhyChooseUsSection />
      <ResultsSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default ServicePage;