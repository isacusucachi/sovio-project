import { MdCheckCircle } from "react-icons/md";
import { FaArrowRight, FaClock } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

import Footer from "../components/Footer";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";

const MainPage = () => {
  const { user } = useAuth();
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

  return (
    <>
      <div className="relative bg-white pb-[110px] dark:bg-gray-900 p-9 text-center bg-[url('/Fondo-blanco-GORE.svg')] dark:bg-[url('/Fondo-oscuro-GORE.svg')] bg-cover bg-center bg-fixed items-center justify-center flex">
        <div className="container mt-[104px]">
          <h1 className="font-extrabold text-4xl mb-2 text-blue-700 dark:text-blue-600 font-arima">
            FICHA DE INFORMACIÓN PERSONAL
          </h1>
          <div className="w-full md:w-1/3 text-center p-5 rounded-lg mx-auto bg-custom-gray dark:bg-custom-black">
            <div className="mx-auto w-16 h-16 bg-red-gore-1 dark:bg-red-gore-3 rounded-full flex items-center justify-center mb-4">
              <img
                className="h-10 w-10 mx-auto"
                src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/50/FFFFFF/external-personal-file-user-tanah-basah-basic-outline-tanah-basah.png"
                alt="brainstorm-skill"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 md:text-4xl dark:text-white font-arima mb-4">
              Ficha Personal
            </h2>
            <div className="flex flex-col items-center space-y-4">
              {completedUserInformation ? (
                <div className="flex flex-col font-bold text-[#30ca4d]  dark:text-[#4ad063] items-center justify-center space-y-2">
                  <MdCheckCircle className="size-14" />
                  <span className="text-xs">Completado</span>
                </div>
              ) : (
                <a
                  href="/personal-information"
                  className="flex flex-row justify-center items-center space-x-1 text-white bg-blue-700 px-4 py-2 rounded-lg font-extrabold hover:bg-blue-500"
                >
                  <span>COMPLETAR</span>
                  <FaArrowRight />
                </a>
              )}
            </div>
          </div>
          <h1 className="font-extrabold text-4xl mb-2 text-blue-700 dark:text-blue-600 mt-24 font-arima">
            PRUEBAS DE ORIENTACIÓN VOCACIONAL
          </h1>
          <div className="grid gap-16 lg:gap-36 mb-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="w-full text-center rounded-lg bg-custom-gray dark:bg-custom-black shadow-lg p-5 flex flex-col justify-between">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-red-gore-1 dark:bg-red-gore-3 rounded-full flex items-center justify-center mb-2">
                  <img
                    className="h-10 w-10 mx-auto"
                    src="https://img.icons8.com/ios/50/FFFFFF/transformation-skill.png"
                    alt="brainstorm-skill"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 md:text-4xl dark:text-white font-arima">
                  IEPPO
                </h2>
              </div>
              <p className="mb-4 text-lg font-medium text-gray-500 dark:text-gray-400 flex-grow">
                Inventario de Estilos Personales y Preferencias Ocupacionales
              </p>
              {!completedUserInformation ? (
                <div className="flex flex-col justify-center items-center font-bold text-red-500 space-y-2">
                  <IoCloseCircle className="size-14" />
                  <span className="text-xs">
                    Completar información personal
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  {completedIeppoTest ? (
                    <div className="flex flex-col font-bold text-[#4ad063] items-center justify-center space-y-2">
                      <MdCheckCircle className="size-14" />
                      <span className="text-xs">Completado</span>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center text-yellow-500 font-bold space-y-2">
                      <FaClock className="size-14" />
                      <span className="text-xs">Pendiente</span>
                    </div>
                  )}
                  <a
                    href="/ieppo-test"
                    className="flex flex-row justify-center items-center space-x-1 text-white bg-blue-700 px-4 py-2 rounded-lg font-extrabold hover:bg-blue-500"
                  >
                    <span>IR</span>
                    <FaArrowRight />
                  </a>
                </div>
              )}
            </div>

            <div className="w-full text-center rounded-lg bg-custom-gray dark:bg-custom-black shadow-lg p-5 flex flex-col justify-between">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-red-gore-1 dark:bg-red-gore-3 rounded-full flex items-center justify-center mb-2">
                  <img
                    className="h-10 w-10 mx-auto"
                    src="https://img.icons8.com/ios/50/FFFFFF/brainstorm-skill.png"
                    alt="brainstorm-skill"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 md:text-4xl dark:text-white font-arima">
                  PHB
                </h2>
              </div>
              <p className="mb-4 text-lg font-medium text-gray-500 dark:text-gray-400 flex-grow">
                Prueba de Habilidades Básicas
              </p>
              <div className="flex flex-col items-center space-y-4">
                {completedPhbTest ? (
                  <div className="flex flex-col font-bold text-[#4ad063] items-center justify-center space-y-2">
                    <MdCheckCircle className="size-14" />
                    <span className="text-xs">Completado</span>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center text-yellow-500 font-bold space-y-2">
                    <FaClock className="size-14" />
                    <span className="text-xs">Pendiente</span>
                  </div>
                )}
                <a
                  href="/phb-test"
                  className="flex flex-row justify-center items-center space-x-1 text-white bg-blue-700 px-4 py-2 rounded-lg font-extrabold hover:bg-blue-500"
                >
                  <span>IR</span>
                  <FaArrowRight />
                </a>
              </div>
            </div>

            <div className="w-full text-center rounded-lg bg-custom-gray dark:bg-custom-black shadow-lg p-5 flex flex-col justify-between">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-red-gore-1 dark:bg-red-gore-3 rounded-full flex items-center justify-center mb-2">
                  <img
                    className="h-10 w-10 mx-auto"
                    src="https://img.icons8.com/ios/50/FFFFFF/analyzing-skill.png"
                    alt="analyzing-skill"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 md:text-4xl dark:text-white font-arima">
                  TEPE
                </h2>
              </div>
              <p className="mb-4 text-lg font-medium text-gray-500 dark:text-gray-400 flex-grow">
                Test de Evaluación del Potencial Empresarial
              </p>
              <div className="flex flex-col items-center space-y-4">
                {completedTepeTest ? (
                  <div className="flex flex-col font-bold text-[#4ad063] items-center justify-center space-y-2">
                    <MdCheckCircle className="size-14" />
                    <span className="text-xs">Completado</span>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center text-yellow-500 font-bold space-y-2">
                    <FaClock className="size-14" />
                    <span className="text-xs">Pendiente</span>
                  </div>
                )}
                <a
                  href="/tepe-test"
                  className="flex flex-row justify-center items-center space-x-1 text-white bg-blue-700 px-4 py-2 rounded-lg font-extrabold hover:bg-blue-500"
                >
                  <span>IR</span>
                  <FaArrowRight />
                </a>
              </div>
            </div>
          </div>
          <h1 className="font-extrabold text-4xl mb-2 text-blue-700 dark:text-blue-600 mt-24 font-arima">
            RESULTADOS
          </h1>
          <div className="w-full md:w-1/3 text-center px-3 py-2 rounded-lg bg-custom-gray dark:bg-custom-black mx-auto">
            <div className="mx-auto w-16 h-16 bg-red-gore-1 dark:bg-red-gore-3 rounded-full flex items-center justify-center mb-2">
              <img
                className="h-10 w-10 mx-auto"
                src="https://img.icons8.com/fluency-systems-regular/50/FFFFFF/test-results.png"
                alt="brainstorm-skill"
              />
            </div>

            <div className="flex flex-col items-center space-y-4">
              <a
                href="/final-vocational-test-report"
                className="flex flex-row justify-center items-center space-x-1 text-white bg-blue-700 px-4 py-2 rounded-lg font-extrabold hover:bg-blue-500"
              >
                <span>VER</span>
                <FaArrowRight />
              </a>
            </div>
          </div>
          <h1 className="font-extrabold text-4xl mb-2 text-blue-700 dark:text-blue-600 mt-24 font-arima">
            ENCUESTA DE VALORACIÓN
          </h1>
          <div className="w-full md:w-1/3 text-center px-3 py-2 rounded-lg bg-custom-gray dark:bg-custom-black mx-auto">
            <div className="mx-auto w-16 h-16 bg-red-gore-1 dark:bg-red-gore-3 rounded-full flex items-center justify-center mb-2">
              <img
                className="h-10 w-10 mx-auto"
                src="https://img.icons8.com/ios-glyphs/50/FFFFFF/inspection.png"
                alt="inspection"
              />
            </div>
            <div className="flex flex-col items-center space-y-4">
              {completedAssessmentSurvey ? (
                <div className="flex flex-col font-bold text-[#30ca4d]  dark:text-[#4ad063] items-center justify-center space-y-2">
                  <MdCheckCircle className="size-14" />
                  <span className="text-xs">Completado</span>
                </div>
              ) : (
                <a
                  href="/assessment-survey"
                  className="flex flex-row justify-center items-center space-x-1 text-white bg-blue-700 px-4 py-2 rounded-lg font-extrabold hover:bg-blue-500"
                >
                  <span>COMPLETAR</span>
                  <FaArrowRight />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default MainPage;
