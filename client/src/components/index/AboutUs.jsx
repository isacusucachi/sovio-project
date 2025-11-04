import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section
      className="p-9 lg:p-20 w-full h-full flex flex-col justify-center items-center"
      id="nosotros"
    >
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }} 
      >
        <div className="container mx-auto">
          <div className="mb-14">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-2 text-center uppercase font-arima">
              NOSOTROS
            </h2>
            <div className="w-full flex justify-center">
              <div className="w-28 h-2 bg-red-gore-3 rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <p className="md:text-lg lg:text-xl md:hidden dark:text-white pb-6 text-justify">
              El Servicio de Orientación Vocacional e Información Ocupacional
              (SOVIO) de la Gerencia Regional de Trabajo y Promoción del Empleo
              Cusco brinda atención a través de evaluaciones de orientación
              vocacional, paneles profesionales, talleres grupales e
              individuales en orientación vocacional y soporte personalizado
              para la elección de una carrera profesional, dirigido a los
              estudiantes de las academias pre universitarias, instituciones
              educativas nacionales y particulares, jóvenes que estén en busca
              de asesoría en su proyecto de vida, información ocupacional y al
              público en general.
            </p>
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <img
                src="/soviocusco.webp"
                alt="Equipo de Kusi Peru brindando"
                className="rounded-xl w-3/4"
              />
            </div>
            <div className="w-full md:w-1/2 lg:max-h-[510px] flex flex-col justify-center space-y-6">
              <p className="md:text-lg lg:text-xl  hidden md:block dark:text-white pb-6 text-justify">
                El Servicio de Orientación Vocacional e Información Ocupacional
                (SOVIO) de la Gerencia Regional de Trabajo y Promoción del
                Empleo Cusco brinda atención a través de evaluaciones de
                orientación vocacional, paneles profesionales, talleres grupales
                e individuales en orientación vocacional y soporte personalizado
                para la elección de una carrera profesional, dirigido a los
                estudiantes de las academias pre universitarias, instituciones
                educativas nacionales y particulares, jóvenes que estén en busca
                de asesoría en su proyecto de vida, información ocupacional y al
                público en general.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
export default AboutUs;
