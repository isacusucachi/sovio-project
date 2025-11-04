import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const Portrait = () => {

  return (
    <section
      className="bg-cover bg-center bg-[url('/Fondo-blanco-GORE.svg')] dark:bg-[url('/Fondo-rojo-GORE.svg')] pt-[40px] sm:p-9 h-screen flex items-center justify-center shadow-xl overflow-hidden"
      id="portada"
    >
      <motion.div
        initial={{ opacity: 0, y: 200  }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }} 
      >
        <div className="w-full px-4 max-w-7xl">
          <h1 className="mb-5 text-lg md:text-2xl lg:text-3xl !leading-[1.208] font-semibold dark:text-white text-center font-arima">
            <b className="text-2xl md:text-3xl lg:text-6xl uppercase font-extrabold">
              ¿Qué carrera es perfecta para ti?
            </b>
            <br />
            Descúbrelo con nuestros tests vocacionales.
          </h1>
          <div className="text-base sm:text-xl dark:text-white font-normal text-justify font-montserrat mb-6">
            <p className="text-center">
              Plataforma desarrollada por la GRTPE Cusco, donde los usuarios
              pueden realizar de forma virtual las siguientes pruebas de
              orientación vocacional:
            </p>
            <ul className="list-disc px-8 md:px-32 lg:px-64">
              <li>
                Inventario de Estilos Personales y Preferencias Ocupacionales
                (IEPPO)
              </li>
              <li>Prueba de Habilidades Básicas (PHB)</li>
              <li>Test de Evaluación del Potencial Empresarial (TEPE)</li>
            </ul>
          </div>
          <ul className="flex flex-wrap justify-center">
            <li>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2 text-center text-lg font-medium dark:text-white hover:bg-blue-dark lg:px-7 border-2 border-black dark:border-white  hover:rounded-full w-40 m-3"
              >
                Ingresar
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-2 text-center text-lg font-medium hover:text-primary text-white dark:text-red-gore-3 bg-red-gore-1 dark:bg-white rounded-xl hover:rounded-full  border-2 dark:border-white border-red-gore-1 w-40 m-3"
              >
                Registrarse
              </Link>
            </li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
};
export default Portrait;
