import Footer from "../components/Footer";
import Portrait from "../components/index/Portrait";
import AboutUs from "../components/index/AboutUs";
import Services from "../components/index/Services";

const Index = () => {
  return (
    <>
      <Portrait />
      <div className="flex flex-col justify-center items-center">
        <AboutUs />
        <Services />
      </div>
      <Footer />
    </>
  );
};

export default Index;
