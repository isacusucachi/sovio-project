import { MdCheckCircle } from "react-icons/md";
import { FaArrowRight, FaClock } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import {
  HiHome,
  HiChartBar,
  HiChatBubbleLeftRight,
  HiInformationCircle,
  HiAcademicCap,
} from "react-icons/hi2";

import Footer from "../components/Footer";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const MainPage = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("mis-tests");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [completedUserInformation, setCompletedUserInformation] =
    useState(null);
  const [completedIeppoTest, setCompletedIeppoTest] = useState(null);
  const [completedPhbTest, setCompletedPhbTest] = useState(null);
  const [completedTepeTest, setCompletedTepeTest] = useState(null);
  const [completedAssessmentSurvey, setCompletedAssessmentSurvey] =
    useState(null);

  useEffect(() => {
    setCompletedUserInformation(user.completedUserInformation);
    setCompletedIeppoTest(user.completedIeppoTest);
    setCompletedPhbTest(user.completedPhbTest);
    setCompletedTepeTest(user.completedTepeTest);
    setCompletedAssessmentSurvey(user.completedAssessmentSurvey);
  }, [user]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Cerrar sidebar cuando se selecciona una sección en móvil
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setIsSidebarOpen(false);
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
                  {/* Hero Section */}
                  <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-gray-900 dark:to-gray-800 rounded-xl lg:rounded-2xl p-6 sm:p-8 md:p-12 mb-8 lg:mb-12 border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                      <div className="flex-1 w-full">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                          Descubre tu camino profesional
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 md:mb-6">
                          Completa tu ficha personal y los tres tests de
                          orientación vocacional para obtener un perfil completo
                        </p>
                      </div>
                      <div className="flex-shrink-0 hidden sm:block">
                        <img
                          src="https://img.icons8.com/dusk/200/student-center.png"
                          alt="Estudiantes"
                          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ficha Personal */}
                  <section className="mb-8 lg:mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                      Ficha de Información Personal
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 md:mb-6">
                      Completa tu información básica para acceder a las pruebas
                    </p>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 dark:bg-sky-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                            <img
                              className="h-6 w-6 sm:h-7 sm:w-7"
                              src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/50/0EA5E9/external-personal-file-user-tanah-basah-basic-outline-tanah-basah.png"
                              alt="ficha-personal"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                              Ficha Personal
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                              Necesitamos conocer algunos datos básicos para
                              personalizar tu experiencia
                            </p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
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
                              <span className="truncate">
                                5 minutos aproximadamente
                              </span>
                            </div>
                          </div>
                        </div>
                        {completedUserInformation ? (
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium self-start sm:self-center">
                            <MdCheckCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">Completado</span>
                          </div>
                        ) : (
                          <a
                            href="/personal-information"
                            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-bold text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 space-x-2"
                          >
                            <span>COMPLETAR</span>
                            <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Pruebas Vocacionales */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                      Pruebas de Orientación Vocacional
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 md:mb-6">
                      Completa los tres tests para obtener tu perfil vocacional
                      completo
                    </p>

                    <div className="space-y-4">
                      {/* IEPPO */}
                      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                            <div className="flex-shrink-0">
                              <img
                                src="/man-question-marks.png"
                                alt="IEPPO Icon"
                                className="w-20 h-20 object-contain hidden md:block dark:md:hidden"
                              />
                              <img
                                src="/man-question-marks-dark.png"
                                alt="IEPPO Icon"
                                className="w-20 h-20 object-contain hidden dark:md:block"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
                                IEPPO
                              </h3>
                              <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                                Inventario de Estilos Personales y Preferencias
                                Ocupacionales
                              </p>
                              {!completedUserInformation ? (
                                <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                  </svg>
                                  <span>
                                    Completar información personal primero
                                  </span>
                                </div>
                              ) : completedIeppoTest ? (
                                <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 mt-1">
                                  <MdCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                  <span>Completado</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400 mt-1">
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
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  <span>Listo para iniciar</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {!completedUserInformation ? (
                            <div className="px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-lg font-medium text-xs sm:text-sm w-full sm:w-auto text-center self-start sm:self-center">
                              Bloqueado
                            </div>
                          ) : completedIeppoTest ? (
                            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium self-start sm:self-center">
                              <MdCheckCircle className="w-5 h-5 flex-shrink-0" />
                              <span className="text-sm">Completado</span>
                            </div>
                          ) : (
                            <a
                              href="/ieppo-test"
                              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-bold text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 space-x-2"
                            >
                              <span>INICIAR</span>
                              <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* PHB */}
                      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                            <div className="flex-shrink-0">
                              <img
                                src="/group-brainstorming.png"
                                alt="PHB Icon"
                                className="w-20 h-20 object-contain hidden md:block dark:md:hidden"
                              />
                              <img
                                src="/group-brainstorming-dark.png"
                                alt="PHB Icon"
                                className="w-20 h-20 object-contain hidden dark:md:block"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
                                PHB
                              </h3>
                              <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                                Prueba de Habilidades Básicas
                              </p>
                              {completedPhbTest ? (
                                <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 mt-1">
                                  <MdCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                  <span>Completado</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400 mt-1">
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
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  <span>Listo para iniciar</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {completedPhbTest ? (
                            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium self-start sm:self-center">
                              <MdCheckCircle className="w-5 h-5 flex-shrink-0" />
                              <span className="text-sm">Completado</span>
                            </div>
                          ) : (
                            <a
                              href="/phb-test"
                              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-bold text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 space-x-2"
                            >
                              <span>INICIAR</span>
                              <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* TEPE */}
                      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                            <div className="flex-shrink-0">
                              <img
                                src="/man-clock-shopping-charts.png"
                                alt="TEPE Icon"
                                className="w-20 h-20 object-contain hidden md:block dark:md:hidden"
                              />
                              <img
                                src="/man-clock-shopping-charts-dark.png"
                                alt="TEPE Icon"
                                className="w-20 h-20 object-contain hidden dark:md:block"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
                                TEPE
                              </h3>
                              <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                                Test de Evaluación del Potencial Empresarial
                              </p>
                              {completedTepeTest ? (
                                <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 mt-1">
                                  <MdCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                  <span>Completado</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400 mt-1">
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
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  <span>Listo para iniciar</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {completedTepeTest ? (
                            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium self-start sm:self-center">
                              <MdCheckCircle className="w-5 h-5 flex-shrink-0" />
                              <span className="text-sm">Completado</span>
                            </div>
                          ) : (
                            <a
                              href="/tepe-test"
                              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-bold text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 space-x-2"
                            >
                              <span>INICIAR</span>
                              <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Info adicional */}
                      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-4 sm:p-6">
                        <div className="flex gap-3">
                          <svg
                            className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
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
                          <div>
                            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1 text-sm sm:text-base">
                              Aprende más sobre los tests
                            </h4>
                            <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-400">
                              Cada test evalúa diferentes aspectos de tu perfil
                              educacional. Tómate tu tiempo y responde con
                              honestidad.
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
                    Visualiza tu perfil vocacional completo basado en los tests
                    completados
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
                            Perfil Vocacional Completo
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Accede al informe detallado con recomendaciones de
                            carreras y áreas profesionales
                          </p>
                          <div className="flex items-start gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
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
                            <span>
                              Completa todos los tests para ver tus resultados
                            </span>
                          </div>
                        </div>
                      </div>
                      <a
                        href="/final-vocational-test-report"
                        className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base w-full sm:w-auto"
                      >
                        <span>VER INFORME</span>
                        <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </a>
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
                            Comparte tu experiencia con la plataforma y los
                            tests
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
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
                        </div>
                      </div>
                      {completedAssessmentSurvey ? (
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium self-start sm:self-center">
                          <MdCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                          <span className="text-sm">Completado</span>
                        </div>
                      ) : (
                        <a
                          href="/assessment-survey"
                          className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-bold text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 space-x-2"
                        >
                          <span>COMPLETAR ENCUESTA</span>
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
