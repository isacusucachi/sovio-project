import { FaArrowRight } from "react-icons/fa6";

export default function Hero() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            ¿Qué carrera es perfecta para ti?
          </h1>
          <div className="max-w-3xl text-lg leading-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-6 md:mb-8">
            <p>
              Descúbrelo en <span className="underline">soviocusco.com</span>,
              la plataforma online desarrollada por la GRTPE Cusco, donde los
              usuarios pueden realizar de forma virtual las siguientes pruebas
              de orientación vocacional:
            </p>
            <ul className="list-disc px-8 mt-2">
              <li>
                Inventario de Estilos Personales y Preferencias Ocupacionales
                (IEPPO)
              </li>
              <li>Prueba de Habilidades Básicas (PHB)</li>
              <li>Test de Evaluación del Potencial Empresarial (TEPE)</li>
            </ul>
          </div>
          <a
            href="/login"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-bold text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            INGRESAR
            <FaArrowRight className="w-5 h-5 ml-2 -mr-1" />
          </a>
          <a
            href="/register"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-bold text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            REGISTRARSE
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src="/hero.png" alt="mockup" />
        </div>
      </div>
    </section>
  );
}
