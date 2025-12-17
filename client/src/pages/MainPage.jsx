import { MdCheckCircle } from "react-icons/md";
import { FaArrowRight, FaClock } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import {
  HiHome,
  HiChartBar,
  HiChatBubbleLeftRight,
} from "react-icons/hi2";

import Footer from "../components/Footer";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const MainPage = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("mis-tests");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [completedUserInformation, setCompletedUserInformation] = useState(null);
  const [completedIeppoTest, setCompletedIeppoTest] = useState(null);
  const [completedPhbTest, setCompletedPhbTest] = useState(null);
  const [completedTepeTest, setCompletedTepeTest] = useState(null);
  const [completedAssessmentSurvey, setCompletedAssessmentSurvey] = useState(null);
  const [showSurveyPrompt, setShowSurveyPrompt] = useState(false);

  useEffect(() => {
    setCompletedUserInformation(user.completedUserInformation);
    setCompletedIeppoTest(user.completedIeppoTest);
    setCompletedPhbTest(user.completedPhbTest);
    setCompletedTepeTest(user.completedTepeTest);
    setCompletedAssessmentSurvey(user.completedAssessmentSurvey);
  }, [user]);

  // Detectar cuando el usuario completa su primer test y mostrar prompt de encuesta
  useEffect(() => {
    const completedAnyTest = completedIeppoTest || completedPhbTest || completedTepeTest;
    const shouldShowPrompt = completedAnyTest && !completedAssessmentSurvey;
    
    // Si ya completó al menos un test y no ha hecho la encuesta, mostrar prompt
    if (shouldShowPrompt && !localStorage.getItem('surveyPromptDismissed')) {
      setShowSurveyPrompt(true);
    }
  }, [completedIeppoTest, completedPhbTest, completedTepeTest, completedAssessmentSurvey]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calcular progreso
  const calculateProgress = () => {
    let completed = 0;
    let total = 3;
    if (completedIeppoTest) completed++;
    if (completedPhbTest) completed++;
    if (completedTepeTest) completed++;
    return { completed, total };
  };

  const progress = calculateProgress();

  // Verificar si puede ver resultados (necesita al menos 1 test completado)
  const canViewResults = completedIeppoTest || completedPhbTest || completedTepeTest;

  // Función para cerrar prompt de encuesta
  const dismissSurveyPrompt = () => {
    setShowSurveyPrompt(false);
    localStorage.setItem('surveyPromptDismissed', 'true');
  };

  const menuItems = [
    {
      id: "mis-tests",
      label: "MIS PRUEBAS",
      icon: HiHome,
    },
    {
      id: "resultados",
      label: "RESULTADOS",
      icon: HiChartBar,
    },
    {
      id: "tu-opinion",
      label: "TU OPINIÓN",
      icon: HiChatBubbleLeftRight,
    },
  ];

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      {/* Survey Prompt Modal - Aparece después del primer test completado */}
      {showSurveyPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-gray-200 dark:border-gray-700 animate-scaleIn">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                ¡Felicitaciones!
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
                Has completado tu primer test. ¿Te gustaría ayudarnos a mejorar compartiendo tu experiencia?
              </p>
              
              <div className="space-y-3">
                <a
                  href="/assessment-survey"
                  className="block w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Responder encuesta (3 min)
                </a>
                <button
                  onClick={dismissSurveyPrompt}
                  className="block w-full py-3 px-6 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  Tal vez después
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Overlay para cerrar sidebar en móvil */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden top-16"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        <div className="flex pt-16">
          {/* Sidebar - Fixed siempre */}
          <aside
            className={`${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 fixed top-16 left-0 z-30 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out overflow-y-auto`}
          >
            <nav className="p-6 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    />
                    <span className="text-sm font-bold">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-gray-50 dark:bg-gray-950 w-full lg:ml-72 min-h-[calc(100vh-4rem)]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
              {activeSection === "mis-tests" && (
                <>
                  {/* Hero Section con Progreso */}
                  <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-6 sm:p-8 md:p-12 mb-8 lg:mb-12 border border-blue-100 dark:border-gray-700 shadow-sm">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
                      <div className="flex-1">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                          Descubre tu camino profesional
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                          Completa los tests de orientación vocacional para obtener tu perfil profesional completo
                        </p>
                      </div>
                      
                      {/* Indicador de Progreso */}
                      <div className="flex flex-col items-start md:items-end gap-2 bg-white dark:bg-gray-800 rounded-xl px-6 py-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Tu Progreso
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                            {progress.completed}
                          </span>
                          <span className="text-2xl text-gray-400 dark:text-gray-500">
                            / {progress.total}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          tests completados
                        </div>
                      </div>
                    </div>

                    {/* Barra de progreso visual */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${(progress.completed / progress.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Tests de Orientación Vocacional */}
                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                          Tests de Orientación Vocacional
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                          Completa los tres tests independientes en cualquier orden
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      {/* Test IEPPO */}
                      <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6 sm:p-8 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                          {/* Icono */}
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-2xl flex items-center justify-center border border-blue-200 dark:border-blue-800">
                              <img
                                src="/man-question-marks.png"
                                alt="IEPPO"
                                className="w-16 h-16 sm:w-20 sm:h-20 object-contain dark:hidden"
                              />
                              <img
                                src="/man-question-marks-dark.png"
                                alt="IEPPO"
                                className="w-16 h-16 sm:w-20 sm:h-20 object-contain hidden dark:block"
                              />
                            </div>
                          </div>

                          {/* Contenido */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-3 mb-2">
                              <div className="flex-1">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                  Test IEPPO
                                </h3>
                                <p className="text-sm sm:text-base text-blue-600 dark:text-blue-400 font-semibold mb-3">
                                  Inventario de Estilos Personales y Preferencias Ocupacionales
                                </p>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                                  Descubre qué áreas profesionales se alinean con tus intereses, personalidad y preferencias vocacionales
                                </p>
                              </div>
                            </div>

                            {/* Metadata del test */}
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                <FaClock className="w-4 h-4 text-gray-400" />
                                <span className="font-medium">~20 minutos</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-medium">60 preguntas</span>
                              </div>
                              {!completedUserInformation && (
                                <div className="flex items-center gap-2 text-xs sm:text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                  </svg>
                                  <span className="font-semibold">Incluye ficha personal</span>
                                </div>
                              )}
                            </div>

                            {/* Estado */}
                            <div className="flex items-center gap-2">
                              {completedIeppoTest ? (
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg border border-green-200 dark:border-green-800">
                                  <MdCheckCircle className="w-5 h-5 flex-shrink-0" />
                                  <span className="font-semibold">Test completado</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
                                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                  <span className="font-semibold">Listo para iniciar</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Botón de acción */}
                          <div className="flex-shrink-0 w-full lg:w-auto">
                            <a
                              href="/ieppo-test"
                              className="inline-flex items-center justify-center w-full lg:w-auto gap-2 px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                            >
                              <span>{completedIeppoTest ? "VER RESULTADOS" : "INICIAR TEST"}</span>
                              <FaArrowRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Test PHB */}
                      <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6 sm:p-8 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-2xl flex items-center justify-center border border-purple-200 dark:border-purple-800">
                              <img
                                src="/group-brainstorming.png"
                                alt="PHB"
                                className="w-16 h-16 sm:w-20 sm:h-20 object-contain dark:hidden"
                              />
                              <img
                                src="/group-brainstorming-dark.png"
                                alt="PHB"
                                className="w-16 h-16 sm:w-20 sm:h-20 object-contain hidden dark:block"
                              />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                              Test PHB
                            </h3>
                            <p className="text-sm sm:text-base text-purple-600 dark:text-purple-400 font-semibold mb-3">
                              Prueba de Habilidades Básicas
                            </p>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                              Evalúa tus capacidades en razonamiento lógico, comprensión verbal y resolución de problemas
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mb-4">
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                <FaClock className="w-4 h-4 text-gray-400" />
                                <span className="font-medium">~45 minutos</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-medium">5 áreas</span>
                              </div>
                            </div>

                            {completedPhbTest ? (
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg border border-green-200 dark:border-green-800 w-fit">
                                <MdCheckCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="font-semibold">Test completado</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 w-fit">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="font-semibold">Listo para iniciar</span>
                              </div>
                            )}
                          </div>

                          <div className="flex-shrink-0 w-full lg:w-auto">
                            <a
                              href="/phb-test"
                              className="inline-flex items-center justify-center w-full lg:w-auto gap-2 px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                            >
                              <span>{completedPhbTest ? "VER RESULTADOS" : "INICIAR TEST"}</span>
                              <FaArrowRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Test TEPE */}
                      <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 p-6 sm:p-8 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-2xl flex items-center justify-center border border-green-200 dark:border-green-800">
                              <img
                                src="/man-clock-shopping-charts.png"
                                alt="TEPE"
                                className="w-16 h-16 sm:w-20 sm:h-20 object-contain dark:hidden"
                              />
                              <img
                                src="/man-clock-shopping-charts-dark.png"
                                alt="TEPE"
                                className="w-16 h-16 sm:w-20 sm:h-20 object-contain hidden dark:block"
                              />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                              Test TEPE
                            </h3>
                            <p className="text-sm sm:text-base text-green-600 dark:text-green-400 font-semibold mb-3">
                              Test de Evaluación del Potencial Empresarial
                            </p>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                              Identifica tu potencial emprendedor y aptitudes para desarrollar proyectos propios
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mb-4">
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                <FaClock className="w-4 h-4 text-gray-400" />
                                <span className="font-medium">~18 minutos</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                <span className="font-medium">100 preguntas</span>
                              </div>
                            </div>

                            {completedTepeTest ? (
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg border border-green-200 dark:border-green-800 w-fit">
                                <MdCheckCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="font-semibold">Test completado</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 w-fit">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="font-semibold">Listo para iniciar</span>
                              </div>
                            )}
                          </div>

                          <div className="flex-shrink-0 w-full lg:w-auto">
                            <a
                              href="/tepe-test"
                              className="inline-flex items-center justify-center w-full lg:w-auto gap-2 px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                            >
                              <span>{completedTepeTest ? "VER RESULTADOS" : "INICIAR TEST"}</span>
                              <FaArrowRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Info adicional */}
                      <div className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/10 dark:to-sky-900/10 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6 sm:p-8">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
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
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2 text-lg">
                              Consejos para obtener mejores resultados
                            </h4>
                            <p className="text-sm sm:text-base text-blue-800 dark:text-blue-400 leading-relaxed">
                              Los tests son independientes y puedes realizarlos en cualquier orden. Responde con honestidad y tómate el tiempo necesario. 
                              Cada test evalúa diferentes aspectos de tu perfil vocacional para brindarte recomendaciones personalizadas.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )}

              {activeSection === "resultados" && (
                <section>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Resultados
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
                    Visualiza tu perfil vocacional basado en los tests completados
                  </p>

                  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 dark:bg-sky-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-6 h-6 sm:w-7 sm:h-7 text-sky-600 dark:text-sky-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                            Perfil Vocacional
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {canViewResults 
                              ? "Accede al informe con recomendaciones de carreras basado en tus resultados"
                              : "Completa al menos un test para ver tu informe vocacional"
                            }
                          </p>
                          {canViewResults && (
                            <div className="flex items-start gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <svg
                                className="w-4 h-4 flex-shrink-0 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span>Los resultados se actualizan a medida que completas más tests</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {canViewResults ? (
                        <a
                          href="/final-vocational-test-report"
                          className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-bold text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 space-x-2"
                        >
                          <span>VER INFORME</span>
                          <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </a>
                      ) : (
                        <div className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-bold text-center text-gray-400 dark:text-gray-500 rounded-lg bg-gray-200 dark:bg-gray-700 cursor-not-allowed">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span>BLOQUEADO</span>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {activeSection === "tu-opinion" && (
                <section>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Encuesta de Valoración
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
                    Tu opinión nos ayuda a mejorar la plataforma
                  </p>

                  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 dark:bg-sky-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-6 h-6 sm:w-7 sm:h-7 text-sky-600 dark:text-sky-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                            Tu opinión es importante
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Comparte tu experiencia con la plataforma y los tests
                          </p>

                          {completedAssessmentSurvey ? (
                            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium self-start sm:self-center mt-2">
                              <MdCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                              <span className="text-sm">Completado - ¡Gracias por tu feedback!</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
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
                              <span>3 minutos aproximadamente</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {!completedAssessmentSurvey && (
                        <a
                          href="/assessment-survey"
                          className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-bold text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 space-x-2"
                        >
                          <span>IR A LA ENCUESTA</span>
                          <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </section>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainPage;