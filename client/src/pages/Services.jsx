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
      hasCTA: true,
      subtitle: "Descubre tu camino profesional con nuestro test especializado",
    },
    {
      id: 2,
      title: "Paneles Profesionales",
      image: "/service-images/PO1.webp",
      description:
        "Son espacios donde se comparten temas de interés vinculados a la vocación, las carreras profesionales, la situación de las ocupaciones en el mercado de trabajo, a través de entrevistas a profesionales y técnicos de la región.",
      hasCTA: false,
    },
    {
      id: 3,
      title: "Ferias Laborales y de Orientación Vocacional",
      image: "/service-images/FE14.webp",
      description:
        "Eventos donde se comparten temas de interés vinculados a la vocación, las carreras profesionales, la situación de las ocupaciones en el mercado de trabajo, consejos para elegir una carrera profesional exitosa, entre otras. Contamos con la participación de instituciones académicas públicas y privadas que dan información de primera mano.",
      hasCTA: false,
    },
    {
      id: 4,
      title: "Escuela de Padres",
      image: "/service-images/EP4.webp",
      description:
        "El Servicio de Orientación Vocacional e Información Ocupacional ofrece el acompañamiento y apoyo con diversas estrategias y recursos al mejor desarrollo de las 'Escuelas de Padres' y puedan comprender diferentes aspectos relacionados con su crecimiento, maduración socialización durante las etapas de su niñez y adolescencia.",
      hasCTA: false,
    },
    {
      id: 5,
      title: "Visitas Guiadas a Empresas",
      image: "/service-images/VG10.webp",
      description:
        "Brindamos la oportunidad de conocer de cerca el desarrollo de una ocupación a través de visitas a empresas representativas de las actividades económicas y productivas que destacan en la región Cusco.",
      hasCTA: false,
    },
    {
      id: 6,
      title: "Charlas Motivacionales a Estudiantes",
      image: "/service-images/CH5.webp",
      description:
        "Con el objetivo de mantener o impulsar la conducta positiva de los estudiantes ante el proceso de aprendizaje; así como desarrollar sus capacidades, superar sus limitaciones y plantearse objetivos claros en cuanto a su desarrollo personal, estudiantil y en el futuro sus proyectos profesionales.",
      hasCTA: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <div>
        {/* Hero Section */}
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Nuestros Servicios
              </h1>
              <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                Descubre nuestra gama completa de servicios diseñados para
                guiarte en tu desarrollo profesional y vocacional
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services - Alternating Layout */}
        {services.map((service, index) => {
          const imageOnLeft = index % 2 === 0;

          return (
            <section key={service.id} className="bg-white dark:bg-gray-900">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6"
              >
                {imageOnLeft ? (
                  <>
                    {/* Image Left */}
                    <img
                      className="w-full"
                      src={service.image}
                      alt={service.title}
                    />
                    {/* Content Right */}
                    <div className="mt-4 md:mt-0">
                      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        {service.title}
                      </h2>
                      {service.subtitle && (
                        <p className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                          {service.subtitle}
                        </p>
                      )}
                      <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                        {service.description}
                      </p>
                      {service.hasCTA && (
                        <a
                          href="/login"
                          className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 uppercase"
                        >
                          Realizar Test Vocacional
                          <svg
                            className="ml-2 -mr-1 w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Content Left */}
                    <div className="mt-4 md:mt-0">
                      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        {service.title}
                      </h2>
                      {service.subtitle && (
                        <p className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                          {service.subtitle}
                        </p>
                      )}
                      <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                        {service.description}
                      </p>
                      {service.hasCTA && (
                        <a
                          href="#"
                          className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900"
                        >
                          Realizar Test Vocacional
                          <svg
                            className="ml-2 -mr-1 w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                    {/* Image Right */}
                    <img
                      className="w-full"
                      src={service.image}
                      alt={service.title}
                    />
                  </>
                )}
              </motion.div>
            </section>
          );
        })}

        {/* CTA Section */}
        <section className="bg-gray-50 dark:bg-gray-800">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h2 className="mb-4 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
                ¿Listo para comenzar?
              </h2>
              <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
                Contáctanos hoy mismo para obtener más información sobre
                cualquiera de nuestros servicios
              </p>
              <a
                href="https://www.gob.pe/institucion/regioncusco-grtpe/contacto-y-numeros-de-emergencias"
                className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 uppercase"
              >
                Contactar ahora
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
