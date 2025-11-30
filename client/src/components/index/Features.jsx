import { FaChartLine, FaClipboardList, FaIdCard } from "react-icons/fa6";

export default function Features() {
  return (
    <section className="antialiased">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">¿Cómo funciona?</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Tres simples pasos para descubrir tu camino profesional
          </p>
        </div>

        <div className="grid grid-cols-1 mt-12 sm:mt-16 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <FaIdCard className="w-16 h-16 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                1. Completa tu ficha personal
              </h3>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">(2 minutos)</span>
              <p className="text-gray-600 dark:text-gray-400">
                Proporciona información personal sobre ti para personalizar tus
                resultados de orientación vocacional.
              </p>
            </div>
          </div>

          <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <FaClipboardList className="w-16 h-16 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                2. Realiza los tests vocacionales
              </h3>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                (30-45 minutos por prueba)
              </span>
              <p className="text-gray-400">
                Completa nuestros tests de orientación vocacional: test de
                intereses, test de habilidades y test de potencial empresarial.
              </p>
            </div>
          </div>

          <div className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <FaChartLine className="w-16 h-16 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                3. Obtén tus resultados y recomendaciones
              </h3>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                (Instantáneamente)
              </span>
              <p className="text-gray-600 dark:text-gray-400">
                Recibe un informe personalizado con tu perfil vocacional
                completo, carreras recomendadas según tus fortalezas y un plan
                de acción.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
