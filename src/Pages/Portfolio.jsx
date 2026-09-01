import PortfolioBanner from "../Component/PortfolioPage/PortfolioBanner/PortfolioBanner";
import PortfolioGallery from "../Component/PortfolioPage/PortfolioGallery/PortfolioGallery";
import TrendingProjects from "../Component/PortfolioPage/TrendingProjects/TrendingProjects";
import WhyChooseWork from "../Component/PortfolioPage/WhyChooseWork/WhyChooseWork";
import BeforeAfterShowcase from "../Component/PortfolioPage/BeforeAfterShowcase/BeforeAfterShowcase";
import PortfolioCTA from "../Component/PortfolioPage/PortfolioCTA/PortfolioCTA";
import Navbar from "../Component/Layout/Navbar";
import Footer from "../Component/Layout/Footer ";

const Portfolio = () => {
  return (
    <>
      <Navbar />
      <PortfolioBanner />
      <PortfolioGallery />
      <TrendingProjects />
      <WhyChooseWork />
      <BeforeAfterShowcase />
      <PortfolioCTA />
      <Footer />
    </>
  );
};

export default Portfolio;
