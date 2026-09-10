import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroBanner from "../Component/ContactPage/HeroBanner/HeroBanner";
import ContactForm from "../Component/ContactPage/ContactForm/ContactForm";
import ContactInfoList from "../Component/ContactPage/ContactInfoList/ContactInfoList";
import MapSection from "../Component/ContactPage/MapSection/MapSection";
import InfoStrip from "../Component/ContactPage/InfoStrip/InfoStrip";
import CTABanner from "../Component/ContactPage/CTABanner/CTABanner";
import Navbar from "../Component/Layout/Navbar";
import Footer from "../Component/Layout/Footer ";
import CTASection from "../Component/HomePageComponent/CTASection";

const Contact = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#contact-form") {
      const el = document.getElementById("contact-form");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <main className="w-full bg-white">
      <Navbar />
      <HeroBanner />

      <section id="contact-form" className="w-full bg-[#F7F5F2] py-10 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-14">
          <ContactInfoList />
          <ContactForm />
        </div>
      </section>
      <MapSection />
      <InfoStrip />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Contact;