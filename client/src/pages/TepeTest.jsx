import { useEffect, useState } from "react";
import { FaSave, FaCheck } from "react-icons/fa";

import { useVocationalTests } from "../context/vocationalTestContext";
import AffirmationsTestScreen from "../components/tepeTest/AffirmationsTestScreen";
import TraitsTestScreen from "../components/tepeTest/TraitsTestScreen";
import { useAuth } from "../context/authContext";
import completedImage from "../assets/Completed.svg";

const TepeTest = () => {
  const [loading, setLoading] = useState(false);
  const [progressLoading, setProgressLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [progressSended, setProgressSended] = useState(false);
  const [isSaveHovered, setIsSaveHovered] = useState(false);
  const [completedTepeTest, setCompletedTepeTest] = useState(null);

  const { user } = useAuth();
  const {
    createUpdateTepeTest,
    finishTepeTest,
    generateResultTepeTest,
    getTepeTest,
    resetTepeTest,
  } = useVocationalTests();

  const [testAnswers, setTestAnswers] = useState({
    traits: {
      N1: null,
      N2: null,
      N3: null,
      N4: null,
      N5: null,
      N6: null,
      N7: null,
      N8: null,
      N9: null,
      N10: null,
      N11: null,
      N12: null,
      N13: null,
      N14: null,
      N15: null,
      N16: null,
      N17: null,
      N18: null,
      N19: null,
      N20: null,
      N21: null,
    },
    affirmations: {
      N22: null,
      N23: null,
      N24: null,
      N25: null,
      N26: null,
      N27: null,
      N28: null,
      N29: null,
      N30: null,
      N31: null,
      N32: null,
      N33: null,
      N34: null,
      N35: null,
      N36: null,
      N37: null,
      N38: null,
      N39: null,
      N40: null,
      N41: null,
      N42: null,
      N43: null,
      N44: null,
      N45: null,
      N46: null,
      N47: null,
      N48: null,
      N49: null,
      N50: null,
      N51: null,
      N52: null,
      N53: null,
      N54: null,
      N55: null,
      N56: null,
      N57: null,
      N58: null,
      N59: null,
      N60: null,
      N61: null,
      N62: null,
      N63: null,
      N64: null,
      N65: null,
      N66: null,
      N67: null,
      N68: null,
      N69: null,
      N70: null,
      N71: null,
      N72: null,
      N73: null,
      N74: null,
      N75: null,
      N76: null,
      N77: null,
      N78: null,
      N79: null,
      N80: null,
      N81: null,
      N82: null,
      N83: null,
      N84: null,
      N85: null,
      N86: null,
      N87: null,
      N88: null,
      N89: null,
      N90: null,
      N91: null,
      N92: null,
      N93: null,
      N94: null,
      N95: null,
      N96: null,
      N97: null,
      N98: null,
      N99: null,
      N100: null,
    },
  });

  const [isAffirmationsTestStarted, setIsAffirmationsTestStarted] =
    useState(false);

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
        `tepeTestAnswers${user?.id}`,
        JSON.stringify(newTestAnswers)
      );
      return newTestAnswers;
    });
  };

  const handleTepeTestSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await finishTepeTest({ testAnswers });
      if (res) {
        await generateResultTepeTest();
        localStorage.removeItem(`tepeTestAnswers${user?.id}`);
        setCompletedTepeTest(true);
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
      const res = await createUpdateTepeTest({ testAnswers });
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
      const res = await resetTepeTest();
      if(res){
        setCompletedTepeTest(false);
        localStorage.removeItem(`tepeTestAnswers${user?.id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setResetLoading(false);
    }
  };

  useEffect(() => {
    const fetchTepeTest = async () => {
      try {
        const tepeTestAnswers = localStorage.getItem(
          `tepeTestAnswers${user?.id}`
        );

        if (tepeTestAnswers) {
          const parsedData = JSON.parse(tepeTestAnswers);
          setTestAnswers(parsedData);
        } else {
          const response = await getTepeTest();
          if (response) {
            const tepeTest = response.testAnswers;
            setTestAnswers(tepeTest);
            localStorage.setItem(
              `tepeTestAnswers${user?.id}`,
              JSON.stringify(tepeTest)
            );
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (completedTepeTest === false) {
      fetchTepeTest();
    }
  }, [user?.id, getTepeTest, completedTepeTest]);

  useEffect(() => {
    if (progressSended === true) {
      const timer = setTimeout(() => {
        setProgressSended(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [progressSended]);

  useEffect(() => {
    setCompletedTepeTest(user.completedTepeTest);
  }, [user]);

  return (
    <div className="bg-[url('/Fondo-blanco-GORE.svg')] dark:bg-[url('/Fondo-oscuro-GORE.svg')] bg-cover bg-center bg-fixed w-full min-h-screen relative md:p-9 flex justify-center items-center">
      <section className="dark:bg-custom-black relative bg-custom-gray rounded-lg shadow-lg max-w-4xl mx-auto lg:w-1/2 mt-[104px]">
        <div className="w-full bg-blue-600 flex justify-center items-center p-4 mb-9 md:rounded-t-lg">
          <h1 className="font-bold text-2xl md:text-3xl text-white text-center font-arima">
            Test de Evaluación del Potencial Empresarial
          </h1>
        </div>
        <div className="px-6 pb-6 md:px-10 md:pb-10">
          {completedTepeTest === true ? (
            <div className="flex flex-col items-center justify-center space-y-6">
              <img src={completedImage} className="w-2/3 md:w-1/3" />
              <h2 className="text-center text-lg font-medium dark:text-white">
                ¡Felicidades! Has completado con éxito el Test de Evaluación de
                Potencial Empresarial (TEPE).
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
              {isAffirmationsTestStarted ? (
                <AffirmationsTestScreen
                  testAnswers={testAnswers}
                  handleTestAnswersChange={handleTestAnswersChange}
                  submitTepeTest={handleTepeTestSubmit}
                  loading={loading}
                />
              ) : (
                <TraitsTestScreen
                  testAnswers={testAnswers}
                  handleTestAnswersChange={handleTestAnswersChange}
                  startAffirmationsTest={() =>
                    setIsAffirmationsTestStarted(true)
                  }
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
};
export default TepeTest;
