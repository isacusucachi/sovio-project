import { useEffect, useState } from "react";
import { FaSave, FaCheck } from "react-icons/fa";

import { useVocationalTests } from "../context/vocationalTestContext";
import PersonalStylesTestScreen from "../components/ieppoTest/PersonalStylesTestScreen";
import PreferredActivitiesTestScreen from "../components/ieppoTest/PreferredActivitiesTestScreen";
import PerceptionOfAbilityTestScreen from "../components/ieppoTest/PerceptionOfAbilityTestScreen";
import { useAuth } from "../context/authContext";
import completedImage from "../assets/Completed.svg";

export default function IeppoTest() {
  const [loading, setLoading] = useState(false);
  const [progressLoading, setProgressLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [progressSended, setProgressSended] = useState(false);
  const [isSaveHovered, setIsSaveHovered] = useState(false);
  const [completedIeppoTest, setCompletedIeppoTest] = useState(null);

  const { user } = useAuth();
  const {
    createUpdateIeppoTest,
    finishIeppoTest,
    generateResultIeppoTest,
    getIeppoTest,
    resetIeppoTest,
  } = useVocationalTests();
  const [testAnswers, setTestAnswers] = useState({
    personalStyles: {
      E1: null,
      E2: null,
      E3: null,
      E4: null,
      E5: null,
      E6: null,
      E7: null,
      E8: null,
      E9: null,
      E10: null,
      E11: null,
      E12: null,
      E13: null,
      E14: null,
      E15: null,
      E16: null,
      E17: null,
      E18: null,
      E19: null,
      E20: null,
      E21: null,
      E22: null,
      E23: null,
      E24: null,
      E25: null,
      E26: null,
      E27: null,
      E28: null,
      E29: null,
      E30: null,
      E31: null,
      E32: null,
      E33: null,
    },
    preferredActivities: {
      P1: null,
      P2: null,
      P3: null,
      P4: null,
      P5: null,
      P6: null,
      P7: null,
      P8: null,
      P9: null,
      P10: null,
      P11: null,
      P12: null,
      P13: null,
      P14: null,
      P15: null,
      P16: null,
      P17: null,
      P18: null,
      P19: null,
      P20: null,
      P21: null,
      P22: null,
      P23: null,
      P24: null,
      P25: null,
      P26: null,
      P27: null,
      P28: null,
      P29: null,
      P30: null,
      P31: null,
      P32: null,
      P33: null,
      P34: null,
      P35: null,
      P36: null,
      P37: null,
      P38: null,
      P39: null,
      P40: null,
      P41: null,
      P42: null,
      P43: null,
      P44: null,
      P45: null,
      P46: null,
      P47: null,
    },
    perceptionOfAbility: {
      H1: null,
      H2: null,
      H3: null,
      H4: null,
      H5: null,
      H6: null,
      H7: null,
      H8: null,
      H9: null,
      H10: null,
      H11: null,
      H12: null,
      H13: null,
      H14: null,
      H15: null,
      H16: null,
      H17: null,
      H18: null,
      H19: null,
      H20: null,
      H21: null,
      H22: null,
      H23: null,
      H24: null,
      H25: null,
      H26: null,
      H27: null,
      H28: null,
      H29: null,
      H30: null,
      H31: null,
      H32: null,
      H33: null,
      H34: null,
      H35: null,
      H36: null,
      H37: null,
      H38: null,
    },
  });

  const [
    isPreferredActivitiesTestStarted,
    setIsPreferredActivitiesTestStarted,
  ] = useState(false);
  const [
    isPerceptionOfAbilityTestStarted,
    setIsPerceptionOfAbilityTestStarted,
  ] = useState(false);

  const handleTestAnswersChange = (partName, questionId, value) => {
    setTestAnswers((prevTestAnswers) => {
      const newTestAnswers = {
        ...prevTestAnswers,
        [partName]: {
          ...prevTestAnswers[partName],
          [questionId]: value === "true",
        },
      };
      localStorage.setItem(
        `ieppoTestAnswers${user?.id}`,
        JSON.stringify(newTestAnswers)
      );
      return newTestAnswers;
    });
  };

  const handleIeppoTestSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await finishIeppoTest({ testAnswers });
      if (res) {
        await generateResultIeppoTest();
        localStorage.removeItem(`ieppoTestAnswers${user?.id}`);
        setCompletedIeppoTest(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleProgressTestSubmit = async (e) => {
    e.preventDefault();
    try {
      setProgressLoading(true);
      const res = await createUpdateIeppoTest({ testAnswers });
      if (res) {
        setProgressSended(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProgressLoading(false);
    }
  };

  const handleResetTestSubmit = async (e) => {
    e.preventDefault();
    try {
      setResetLoading(true);
      const res = await resetIeppoTest();
      if(res){
        setCompletedIeppoTest(false);
        localStorage.removeItem(`ieppoTestAnswers${user?.id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setResetLoading(false);
    }
  };

  useEffect(() => {
    const fetchIeppoTest = async () => {
      try {
        const ieppoTestAnswers = localStorage.getItem(
          `ieppoTestAnswers${user?.id}`
        );

        if (ieppoTestAnswers) {
          const parsedData = JSON.parse(ieppoTestAnswers);
          setTestAnswers(parsedData);
        } else {
          const response = await getIeppoTest();
          if (response) {
            const ieppoTest = response.testAnswers;
            setTestAnswers(ieppoTest);
            localStorage.setItem(
              `ieppoTestAnswers${user?.id}`,
              JSON.stringify(ieppoTest)
            );
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (completedIeppoTest === false) {
      fetchIeppoTest();
    }
  }, [user?.id, getIeppoTest, completedIeppoTest]);

  useEffect(() => {
    if (progressSended === true) {
      const timer = setTimeout(() => {
        setProgressSended(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [progressSended]);

  useEffect(() => {
    setCompletedIeppoTest(user.completedIeppoTest);
  }, [user]);

  return (
    <div className="bg-[url('/Fondo-blanco-GORE.svg')] dark:bg-[url('/Fondo-oscuro-GORE.svg')] bg-cover bg-center bg-fixed w-full min-h-screen relative md:p-9 flex justify-center items-center">
      <section className="dark:bg-custom-black relative bg-custom-gray rounded-lg shadow-lg max-w-4xl mx-auto lg:w-1/2 mt-[104px]">
        <div className="w-full bg-blue-600 flex justify-center items-center p-4 mb-9 md:rounded-t-lg">
          <h1 className="font-bold text-2xl md:text-3xl text-white text-center font-arima">
            Test de Inventario de Estilos Personales y Preferencias
            Ocupacionales
          </h1>
        </div>
        <div className="px-6 pb-6 md:px-10 md:pb-10">
          {completedIeppoTest === true ? (
            <div className="flex flex-col items-center justify-center space-y-6">
              <img src={completedImage} className="w-2/3 md:w-1/3" />
              <h2 className="text-center text-lg font-medium dark:text-white">
                ¡Felicidades! Has completado con éxito el Test de Inventario de Estilos Personales y Preferencias Ocupacionales (IEPPO).
              </h2>
              {
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
                  <a
                    href="/final-vocational-test-report"
                    className="w-full md:w-64 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Ver Resultados
                  </a>
                  <button
                    onClick={handleResetTestSubmit}
                    className="w-full md:w-64  text-gray-700 dark:text-white font-semibold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-lg px-5 py-2.5 text-center inline-flex  items-center justify-center border-gray-500 border-2 hover:bg-gray-100 hover:dark:bg-gray-600"
                    disabled={resetLoading}
                  >
                    {resetLoading ? (
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#FFFFFF"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    ) : (
                      <span>Volver a realizar el test</span>
                    )}
                  </button>
                </div>
              }
            </div>
          ) : (
            <>
              {isPerceptionOfAbilityTestStarted ? (
                <PerceptionOfAbilityTestScreen
                  testAnswers={testAnswers}
                  handleTestAnswersChange={handleTestAnswersChange}
                  submitIeepoTest={handleIeppoTestSubmit}
                  loading={loading}
                />
              ) : isPreferredActivitiesTestStarted ? (
                <PreferredActivitiesTestScreen
                  testAnswers={testAnswers}
                  handleTestAnswersChange={handleTestAnswersChange}
                  startPerceptionOfAbilityTest={() =>
                    setIsPerceptionOfAbilityTestStarted(true)
                  }
                />
              ) : (
                <PersonalStylesTestScreen
                  testAnswers={testAnswers}
                  handleTestAnswersChange={handleTestAnswersChange}
                  startPreferredActivitiesTest={() => {
                    setIsPreferredActivitiesTestStarted(true);
                  }}
                />
              )}
               <div className="fixed bottom-20 right-4">
                <button
                  className="bg-blue-500 text-white text-xl font-bold rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition duration-300 hover:bg-blue-700"
                  onMouseEnter={() => setIsSaveHovered(true)}
                  onMouseLeave={() => setIsSaveHovered(false)}
                  onClick={handleProgressTestSubmit}
                  disabled={progressLoading || progressSended}
                >
                  {progressLoading ? (
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#FFFFFF"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ) : progressSended ? (
                    <FaCheck
                      className="h-6 w-6 md:h-9 md:w-9"
                      color="#08ff08"
                    />
                  ) : (
                    <FaSave className="h-6 w-6 md:h-9 md:w-9" />
                  )}
                </button>
                {isSaveHovered && (
                  <span className="absolute bottom-16 right-0 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-700 text-sm p-1 rounded">
                    Guardar Avance
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
