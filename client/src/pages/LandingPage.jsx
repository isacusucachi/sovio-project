import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/index/Hero";
import Features from "../components/index/Features";
import VocationalTestsDescription from "../components/index/VocationalTestsDescription";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <main className="min-w-0 flex-auto">
        <Hero />
        <Features />
        <VocationalTestsDescription />
        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
