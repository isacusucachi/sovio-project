import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function AccordionItem({ question, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-900 dark:text-gray-100 font-medium bg-white dark:bg-gray-800 rounded-lg"
      >
        {question}

        <span
          className={`transform transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 px-4 pb-4" : "max-h-0"
        } text-gray-700 dark:text-gray-300`}
      >
        {children}
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
            Preguntas Frecuentes (FAQ)
          </h1>

          <div className="space-y-8">
            {/* 1. SOBRE SOVIO */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                1. Sobre SOVIO Cusco
              </h2>

              <div className="space-y-3">
                <AccordionItem question="¿Qué es SOVIO Cusco?">
                  SOVIO Cusco es una plataforma digital de orientación
                  vocacional con pruebas diseñadas para ayudarte a conocer tus
                  intereses, habilidades y estilos personales.
                </AccordionItem>

                <AccordionItem question="¿Qué tipos de pruebas ofrece la plataforma?">
                  <ul className="list-disc ml-6 mt-2">
                    <li>
                      IEPPO – Estilos personales y preferencias ocupacionales
                    </li>
                    <li>PHB – Prueba de habilidades básicas</li>
                    <li>TEPE – Potencial empresarial</li>
                  </ul>
                </AccordionItem>
              </div>
            </section>

            {/* 2. REGISTRO */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                2. Cuenta y Registro
              </h2>

              <div className="space-y-3">
                <AccordionItem question="¿Necesito crear una cuenta para usar la plataforma?">
                  Sí. Crear una cuenta te permite guardar tu progreso, historial
                  y resultados.
                </AccordionItem>

                <AccordionItem question="Olvidé mi contraseña, ¿qué puedo hacer?">
                  Puedes usar la opción “¿Olvidaste tu contraseña?” para recibir
                  un enlace de recuperación.
                </AccordionItem>
              </div>
            </section>

            {/* 3. PRUEBAS */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                3. Sobre las Pruebas
              </h2>

              <div className="space-y-3">
                <AccordionItem question="¿Cuánto duran las pruebas?">
                  IEPPO (20–25 min), PHB (10–15 min), TEPE (15–20 min).
                </AccordionItem>

                <AccordionItem question="¿Puedo pausar una prueba?">
                  Sí. Puedes salir y continuar después. El progreso se guarda
                  automáticamente.
                </AccordionItem>
              </div>
            </section>

            {/* 4. RESULTADOS */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                4. Resultados y Reportes
              </h2>

              <div className="space-y-3">
                <AccordionItem question="¿Cuándo recibiré mis resultados?">
                  Los resultados se generan automáticamente al finalizar cada
                  prueba.
                </AccordionItem>

                <AccordionItem question="¿Puedo descargar mis resultados?">
                  Sí, puedes descargar tus reportes en PDF o verlos desde tu
                  panel personal.
                </AccordionItem>
              </div>
            </section>

            {/* 5. PRIVACIDAD */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                5. Privacidad y Seguridad
              </h2>

              <div className="space-y-3">
                <AccordionItem question="¿Mi información es segura?">
                  Sí. Toda la información está cifrada y protegida bajo
                  estándares modernos.
                </AccordionItem>

                <AccordionItem question="¿Puedo eliminar mi cuenta?">
                  Sí, desde la sección Configuración puedes solicitar la
                  eliminación completa.
                </AccordionItem>
              </div>
            </section>

            {/* 6. CONTACTO */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                6. Contacto y Soporte
              </h2>

              <AccordionItem question="¿Cómo puedo comunicarme con el equipo de SOVIO Cusco?">
                Puedes escribirnos a <strong>soviogrtpecusco@gmail.com</strong>.
              </AccordionItem>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
