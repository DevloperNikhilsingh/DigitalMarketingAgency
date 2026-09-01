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
  return (
   
    <main className="w-full bg-white">
       <Navbar />
      <HeroBanner />

      <section id="contact-form" className="w-full bg-[#F7F5F2] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14">
          <ContactInfoList />
          <ContactForm />
        </div>
      </section>
      <MapSection />
      <InfoStrip />
      {/* <CTABanner /> */}
      <CTASection />
      <Footer />
    </main>
  );
};

export default Contact;
