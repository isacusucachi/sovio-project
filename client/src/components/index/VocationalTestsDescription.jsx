export default function VocationalTestsDescription() {
  return (
    <section className="bg-white dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nuestros tests de orientación vocacional
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Tres evaluaciones especializadas para un perfil vocacional completo
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* IEPPO */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <img
                  src="/man-question-marks.png"
                  alt="IEPPO Icon"
                  className="w-40 h-40 object-contain hidden md:block dark:md:hidden"
                />
                <img
                  src="/man-question-marks-dark.png"
                  alt="IEPPO Icon"
                  className="w-40 h-40 object-contain hidden dark:md:block"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  IEPPO
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  Inventario de Estilos Personales y Preferencias Ocupacionales
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Identifica preferencias personales, intereses y estilos de
                  trabajo para identificar las áreas profesionales que mejor se
                  alinean con tu personalidad y motivaciones intrínsecas.
                </p>
              </div>
            </div>
          </div>

          {/* PHB */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <img
                  src="/group-brainstorming.png"
                  alt="PHB Icon"
                  className="w-40 h-40 object-contain hidden md:block dark:md:hidden"
                />
                <img
                  src="/group-brainstorming-dark.png"
                  alt="PHB Icon"
                  className="w-40 h-40 object-contain hidden dark:md:block"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  PHB
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  Prueba de Habilidades Básicas
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Mide tus competencias fundamentales en áreas como razonamiento
                  verbal, numérico, espacial y lógico. Identifica tus fortalezas
                  cognitivas para orientarte hacia carreras que aprovechen al
                  máximo tus capacidades naturales.
                </p>
              </div>
            </div>
          </div>

          {/* TEPE */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <img
                  src="/man-clock-shopping-charts.png"
                  alt="TEPE Icon"
                  className="w-40 h-40 object-contain hidden md:block dark:md:hidden"
                />
                <img
                  src="/man-clock-shopping-charts-dark.png"
                  alt="TEPE Icon"
                  className="w-40 h-40 object-contain hidden dark:md:block"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  TEPE
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  Test de Evaluación del Potencial Empresarial
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Evalúa tu aptitud para el liderazgo, innovación, toma de
                  decisiones y gestión. Determina si tienes el perfil
                  emprendedor y las habilidades necesarias para carreras en
                  administración, negocios o emprendimiento.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/login"
            className="uppercase px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
          >
            Comenzar los tests ahora
          </a>
        </div>
      </div>
    </section>
  );
}
