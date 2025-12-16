import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Evaluación - Orientación Vocacional",
      image: "/service-images/TD1.webp",
      description:
        "El servicio dispone de herramientas pedagógicas e instrumentos psicológicos para desarrollar un proceso integral, puntual y especializado en la identificación de las preferencias profesionales y características personales, orientando de mejor manera a la forma de decisiones, informada y responsable de una carrera profesional, técnica u ocupacional.",
      isPrimary: true,
      subtitle: "Descubre tu camino profesional con nuestro test especializado",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Paneles Profesionales",
      image: "/service-images/PO1.webp",
      description:
        "Son espacios donde se comparten temas de interés vinculados a la vocación, las carreras profesionales, la situación de las ocupaciones en el mercado de trabajo, a través de entrevistas a profesionales y técnicos de la región.",
      isPrimary: false,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Ferias Laborales y de Orientación Vocacional",
      image: "/service-images/FE14.webp",
      description:
        "Eventos donde se comparten temas de interés vinculados a la vocación, las carreras profesionales, la situación de las ocupaciones en el mercado de trabajo, consejos para elegir una carrera profesional exitosa, entre otras. Contamos con la participación de instituciones académicas públicas y privadas que dan información de primera mano.",
      isPrimary: false,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Escuela de Padres",
      image: "/service-images/EP4.webp",
      description:
        "El Servicio de Orientación Vocacional e Información Ocupacional ofrece el acompañamiento y apoyo con diversas estrategias y recursos al mejor desarrollo de las 'Escuelas de Padres' y puedan comprender diferentes aspectos relacionados con su crecimiento, maduración socialización durante las etapas de su niñez y adolescencia.",
      isPrimary: false,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Visitas Guiadas a Empresas",
      image: "/service-images/VG10.webp",
      description:
        "Brindamos la oportunidad de conocer de cerca el desarrollo de una ocupación a través de visitas a empresas representativas de las actividades económicas y productivas que destacan en la región Cusco.",
      isPrimary: false,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 6,
      title: "Charlas Motivacionales a Estudiantes",
      image: "/service-images/CH5.webp",
      description:
        "Con el objetivo de mantener o impulsar la conducta positiva de los estudiantes ante el proceso de aprendizaje; así como desarrollar sus capacidades, superar sus limitaciones y plantearse objetivos claros en cuanto a su desarrollo personal, estudiantil y en el futuro sus proyectos profesionales.",
      isPrimary: false,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section - HCI: Jerarquía visual clara */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="relative py-12 px-4 mx-auto max-w-screen-xl text-center lg:py-20 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* HCI: Badge informativo */}
            <span className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
              <svg
                className="w-3 h-3 mr-1.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Servicios de Orientación Vocacional e Información Ocupacional
            </span>

            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Nuestros Servicios
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Descubre nuestra gama completa de servicios diseñados para guiarte
              en tu desarrollo profesional y vocacional
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services - Alternating Layout */}
      <div className="bg-white dark:bg-gray-900">
        {services.map((service, index) => {
          const imageOnLeft = index % 2 === 0;

          return (
            <section
              key={service.id}
              className={`relative ${
                service.isPrimary
                  ? "bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900"
                  : index % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              }`}
            >
              {/* HCI: Indicador visual para servicio principal - removido */}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="gap-8 items-center py-12 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6"
              >
                {imageOnLeft ? (
                  <>
                    {/* Image Left */}
                    <div className="flex justify-center">
                      <img
                        className="w-full max-w-md h-64 object-cover rounded-lg shadow-lg"
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                      />
                    </div>
                    {/* Content Right */}
                    <div className="mt-6 md:mt-0">
                      {/* HCI: Badge para servicio principal */}
                      {service.isPrimary && (
                        <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                          <svg
                            className="w-3 h-3 mr-1.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Disponible en línea
                        </span>
                      )}

                      <h2 className="mb-4 text-3xl md:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        {service.title}
                      </h2>

                      {service.subtitle && (
                        <p className="mb-4 text-lg font-semibold text-blue-600 dark:text-blue-400">
                          {service.subtitle}
                        </p>
                      )}

                      <p className="mb-6 text-gray-500 md:text-lg dark:text-gray-400 leading-relaxed">
                        {service.description}
                      </p>

                      {/* HCI: CTA claro para servicio principal */}
                      {service.isPrimary && (
                        <div className="flex flex-col sm:flex-row gap-3">
                          <a
                            href="/login"
                            className="uppercase inline-flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-6 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/30"
                          >
                            Realizar Test Vocacional
                            <svg
                              className="ml-2 w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                          <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <svg
                              className="w-4 h-4 mr-1.5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Resultados inmediatos
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Content Left */}
                    <div className="mt-6 md:mt-0 order-2 md:order-1">
                      <h2 className="mb-4 text-3xl md:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        {service.title}
                      </h2>

                      {service.subtitle && (
                        <p className="mb-4 text-lg font-semibold text-blue-600 dark:text-blue-400">
                          {service.subtitle}
                        </p>
                      )}

                      <p className="mb-6 text-gray-500 md:text-lg dark:text-gray-400 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    {/* Image Right */}
                    <div className="order-1 md:order-2 flex justify-center">
                      <img
                        className="w-full max-w-md h-64 object-cover rounded-lg shadow-lg"
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                      />
                    </div>
                  </>
                )}
              </motion.div>
            </section>
          );
        })}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900">
        <div className="py-12 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h2 className="mb-4 text-3xl md:text-4xl font-extrabold leading-tight text-white">
              ¿Listo para comenzar?
            </h2>
            <p className="mb-8 text-blue-100 md:text-lg">
              Realiza tu test vocacional en línea o contáctanos para más
              información sobre nuestros servicios presenciales
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/login"
                className="uppercase inline-flex items-center justify-center px-6 py-3.5 text-base font-bold text-blue-700 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                Realizar Test Vocacional
              </a>
              <a
                href="https://www.gob.pe/institucion/regioncusco-grtpe/contacto-y-numeros-de-emergencias"
                className="uppercase inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-white bg-transparent border-2 border-white rounded-lg hover:bg-white/10 focus:ring-4 focus:ring-white/30 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Contactar ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* HCI: Botón flotante para Test Vocacional */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50 md:hidden"
      >
        <a
          href="/login"
          className="uppercase flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200"
          aria-label="Realizar Test Vocacional"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </a>
      </motion.div>
    </div>
  );
};

export default Services;
