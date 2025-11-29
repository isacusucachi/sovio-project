import Footer from "../components/Footer";
import AboutUs from "../components/index/AboutUs";
import Services from "../components/index/Services";
import Header from "../components/Header";
import Hero from "../components/index/Hero";

const Index = () => {
  return (
    <div>
      <Header />
      <main className="min-w-0 flex-auto divide-y dark:divide-gray-700">
        <Hero />
        <div className="flex flex-col justify-center items-center">
          <AboutUs />
          <Services />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Index;
