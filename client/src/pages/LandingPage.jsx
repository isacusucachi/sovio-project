import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaBolt,
  FaBrain,
  FaBullseye,
  FaInfo,
  FaSchool,
  FaStar,
  FaUsers,
} from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";

// ============================================
// LANDING PAGE - SOVIO
// ============================================

const LandingPage = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Intersection Observer para animaciones al scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
        }
      });
    }, observerOptions);

    // Observar todas las secciones
    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: "+200", label: "Colegios Evaluados", icon: <FaSchool /> },
    { number: "+3000", label: "Estudiantes Evaluados", icon: <FaUsers /> },
    { number: "5.0 / 5", label: "Satisfacción de usuarios", icon: <FaStar /> },
  ];

  const tests = [
    {
      id: "ieppo",
      imgBgColor: "from-blue-500 to-indigo-600",
      srcImg: "/man-question-marks.png",
      srcImgDark: "/man-question-marks-dark.png",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-700",
      title: "IEPPO",
      subtitle: "Inventario de Estilos Personales y Preferencias Ocupacionales",
      description:
        "Descubre qué carreras se alinean con tu personalidad, intereses y estilo de vida",
      duration: "~20 min",
      questions: "60 preguntas",
    },
    {
      id: "phb",
      imgBgColor: "from-purple-500 to-pink-600",
      srcImg: "/group-brainstorming.png",
      srcImgDark: "/group-brainstorming-dark.png",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-700",
      title: "PHB",
      subtitle: "Prueba de Habilidades Básicas",
      description:
        "Evalúa tus capacidades en razonamiento, comprensión verbal y resolución de problemas",
      duration: "~45 min",
      questions: "5 áreas",
    },
    {
      id: "tepe",
      imgBgColor: "from-green-500 to-emerald-600",
      srcImg: "/man-clock-shopping-charts.png",
      srcImgDark: "/man-clock-shopping-charts-dark.png",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-700",
      title: "TEPE",
      subtitle: "Test de Evalución del Potencial Empresarial",
      description:
        "Identifica tu espíritu emprendedor y aptitudes para desarrollar proyectos propios",
      duration: "~18 min",
      questions: "100 preguntas",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: "📝",
      title: "Regístrate gratis",
      description:
        "Crea tu cuenta en menos de 1 minuto. Sin costos ocultos, sin tarjetas de crédito.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "02",
      icon: "🎯",
      title: "Completa los tests",
      description:
        "Responde honestamente los 3 tests a tu propio ritmo. Puedes pausar y retomar cuando quieras.",
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "03",
      icon: "📊",
      title: "Recibe tu perfil",
      description:
        "Obtén resultados inmediatos con recomendaciones de carreras personalizadas para ti.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const faqs = [
    {
      question: "¿Realmente es gratis?",
      answer:
        "Sí, SOVIO es 100% gratuito. No hay costos ocultos, periodos de prueba ni necesitas tarjeta de crédito. Es una iniciativa del GRTPE Cusco para ayudar a estudiantes en su orientación vocacional.",
    },
    {
      question: "¿Cuánto tiempo toman los tests?",
      answer:
        "En total, los 3 tests toman aproximadamente 1 hora y 20 minutos. Pero no tienes que hacerlos todos de una vez - puedes pausar y continuar cuando quieras. Tu progreso se guarda automáticamente.",
    },
    {
      question: "¿Los tests son confiables?",
      answer:
        "Sí, los tests están respaldados por el GRTPE Cusco y se basan en metodologías validadas de orientación vocacional. Miles de estudiantes ya los han usado para tomar decisiones informadas sobre su futuro.",
    },
    {
      question: "¿Qué obtengo al finalizar?",
      answer:
        "Recibirás un informe completo con tu perfil vocacional, incluyendo: tus áreas de interés principales, habilidades destacadas, potencial emprendedor, y una lista de carreras recomendadas específicamente para ti.",
    },
    {
      question: "¿Mis datos están seguros?",
      answer:
        "Absolutamente. Tu información es confidencial y solo tú tienes acceso a tus resultados. No compartimos datos personales con terceros y cumplimos con todas las normativas de privacidad.",
    },
    {
      question: "¿Puedo hacer los tests en mi celular?",
      answer:
        "¡Sí! SOVIO funciona perfectamente en cualquier dispositivo: celular, tablet o computadora. La interfaz se adapta automáticamente a tu pantalla para una experiencia óptima.",
    },
  ];

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  // Función para scroll suave a sección
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .animate-on-scroll {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-scale {
          opacity: 0;
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-slide-left {
          opacity: 0;
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-right {
          opacity: 0;
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

        /* Scroll indicator */
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        .scroll-indicator {
          animation: bounce 2s ease-in-out infinite;
        }

        /* Gradient text */
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Glass effect */
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      <Header />

      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        {/* ============================================ */}
        {/* HERO SECTION - Ocupa 75% de la pantalla */}
        {/* ============================================ */}
        <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pb-20">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl animate-float delay-200"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/5 to-purple-400/5 dark:from-blue-600/5 dark:to-purple-600/5 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold mb-8 animate-on-scroll border border-blue-200 dark:border-blue-800">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                Respaldado por la GRTPE Cusco
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight animate-on-scroll delay-100">
                ¿No sabes qué estudiar?
                <br />
                <span className="gradient-text">
                  Encuentra tu vocación hoy mismo
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-on-scroll delay-200">
                Olvídate de las dudas. Realiza nuestros 3 tests de orientación
                vocacional y descubre la carrera ideal para ti
              </p>

              {/* USP Points */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10 animate-on-scroll delay-300">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">100% Gratis</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">3 Tests vocacionales</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">Resultados inmediatos</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-on-scroll delay-400">
                <Link
                  to="/login"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-3 w-full sm:w-auto justify-center"
                >
                  <span>COMENZAR AHORA</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>

                <button
                  onClick={() => scrollToSection("tests")}
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-lg font-bold rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center hover:shadow-lg"
                >
                  <span>MÁS INFORMACIÓN</span>
                  <FaInfoCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Scroll indicator - Visible y animado */}
          <div className="absolute bottom-6 transform -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Desliza para explorar
            </span>
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </section>

        {/* ============================================ */}
        {/* STATS SECTION */}
        {/* ============================================ */}
        <section
          id="stats"
          data-animate
          className={`py-16 bg-gradient-to-r from-blue-400 to-indigo-400 dark:from-blue-800 dark:to-indigo-900 ${
            isVisible.stats ? "animate-on-scroll" : ""
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center ${
                    isVisible.stats ? "animate-scale" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className="text-6xl mb-4 animate-float justify-center flex text-white"
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-5xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xl text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* TESTS SHOWCASE SECTION */}
        {/* ============================================ */}
        <section
          id="tests"
          data-animate
          className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-gray-900"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center mb-16 ${
                isVisible.tests ? "animate-on-scroll" : ""
              }`}
            >
              <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold mb-4">
                Evaluación Completa
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                3 Tests que revelan tu perfil completo
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Cada test evalúa diferentes aspectos de tu personalidad y
                habilidades para darte recomendaciones precisas
              </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              {tests.map((test, index) => (
                <div
                  key={test.id}
                  className={`${
                    isVisible.tests
                      ? index % 2 === 0
                        ? "animate-slide-left"
                        : "animate-slide-right"
                      : ""
                  } delay-${(index + 1) * 100}`}
                >
                  <div
                    className={`${test.bgColor} rounded-3xl p-8 border-2 ${test.borderColor} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    <div className="flex flex-col items-center text-center gap-6">
                      {/* Icon side */}
                      <div
                        className={`flex-shrink-0 w-32 h-32 bg-gradient-to-br ${test.imgBgColor} rounded-3xl flex items-center justify-center text-6xl shadow-xl transform hover:scale-110 transition-transform duration-300`}
                      >
                        <img
                          src={test.srcImg}
                          alt={test.title}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-contain dark:hidden"
                        />
                        <img
                          src={test.srcImgDark}
                          alt={test.title}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-contain hidden dark:block"
                        />
                      </div>

                      {/* Content side */}
                      <div className="flex-1">
                        <div className="flex flex-col items-center mb-3">
                          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {test.title}
                          </h3>
                          <span
                            className={`px-3 py-1 ${test.color} text-base font-semibold rounded-full`}
                          >
                            {test.subtitle}
                          </span>
                        </div>

                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                          {test.description}
                        </p>

                        <div className="flex justify-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="font-semibold">
                              {test.duration}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              />
                            </svg>
                            <span className="font-semibold">
                              {test.questions}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Info adicional */}
            <div
              className={`mt-12 max-w-4xl mx-auto ${
                isVisible.tests ? "animate-on-scroll delay-400" : ""
              }`}
            >
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      ¿Por qué 3 tests diferentes?
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Cada test evalúa aspectos únicos de tu perfil.{" "}
                      <strong>IEPPO</strong> analiza tu personalidad e
                      intereses, <strong>PHB</strong> mide tus habilidades
                      cognitivas, y <strong>TEPE</strong> identifica tu
                      potencial emprendedor. Juntos, te dan una visión 360° de
                      tu perfil vocacional para recomendaciones más precisas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`text-center mt-16 ${
                isVisible["tests"] ? "animate-on-scroll delay-400" : ""
              }`}
            >
              <Link
                to="/login"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <span>EMPEZAR TESTS</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* HOW IT WORKS SECTION */}
        {/* ============================================ */}
        <section
          id="how-it-works"
          data-animate
          className="py-20 bg-white dark:bg-gray-900"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center mb-16 ${
                isVisible["how-it-works"] ? "animate-on-scroll" : ""
              }`}
            >
              <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
                Proceso Simple
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                ¿Cómo funciona?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Solo 3 pasos te separan de descubrir tu vocación
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="relative">
                {/* Connection line */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 dark:from-blue-900 dark:via-purple-900 dark:to-green-900 transform -translate-y-1/2"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`${
                        isVisible["how-it-works"] ? "animate-on-scroll" : ""
                      } delay-${(index + 1) * 100}`}
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border-2 border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative">
                        {/* Step number badge */}
                        <div
                          className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                        >
                          {index + 1}
                        </div>

                        {/* Icon */}
                        <div className="text-6xl mb-4 text-center mt-4">
                          {step.icon}
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA después del proceso */}
            <div
              className={`text-center mt-16 ${
                isVisible["how-it-works"] ? "animate-on-scroll delay-400" : ""
              }`}
            >
              <Link
                to="/login"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <span>INICIAR MI ORIENTACIÓN VOCACIONAL</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* VIDEO SECTION */}
        {/* ============================================ */}
        <section
          id="video"
          data-animate
          className="py-20 bg-white dark:bg-gray-900"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div
              className={`text-center mb-12 ${
                isVisible?.video ? "animate-on-scroll" : ""
              }`}
            >
              <span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold mb-4">
                Conoce SOVIO
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Descubre cómo funciona en 2 minutos
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Mira este video breve para entender todo lo que SOVIO puede
                hacer por ti
              </p>
            </div>

            {/* Video */}
            <div
              className={`max-w-4xl mx-auto ${
                isVisible?.video ? "animate-scale delay-200" : ""
              }`}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 aspect-video">
                <iframe
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ftrabajocusco%2Fvideos%2F1223666205586911%2F&show_text=false&autoplay=1"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: "none" }}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  title="Video explicativo de SOVIO"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* FAQ SECTION */}
        {/* ============================================ */}
        <section
          id="faq"
          data-animate
          className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-gray-900"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center mb-16 ${
                isVisible.faq ? "animate-on-scroll" : ""
              }`}
            >
              <span className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm font-semibold mb-4">
                Preguntas Frecuentes
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                ¿Tienes dudas?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Estas son las preguntas que más nos hacen
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`${
                    isVisible.faq ? "animate-on-scroll" : ""
                  } delay-${(index + 1) * 100}`}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <span className="text-lg font-bold text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </span>
                      <svg
                        className={`w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 transition-transform duration-300 ${
                          activeQuestion === index ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        activeQuestion === index
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      } overflow-hidden`}
                    >
                      <div className="px-6 pb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* FINAL CTA SECTION */}
        {/* ============================================ */}
        <section
          id="final-cta"
          data-animate
          className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float delay-200"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div
              className={`text-center max-w-4xl mx-auto ${
                isVisible["final-cta"] ? "animate-on-scroll" : ""
              }`}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                ¿Listo para descubrir tu futuro?
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed">
                Únete a miles de estudiantes que ya encontraron su camino
                profesional con SOVIO
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/login"
                  className="group px-10 py-5 bg-white text-blue-600 text-xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 w-full sm:w-auto justify-center"
                >
                  <span>COMENZAR AHORA</span>
                  <svg
                    className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default LandingPage;
