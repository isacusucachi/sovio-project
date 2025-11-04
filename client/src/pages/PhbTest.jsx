import { useEffect, useState } from "react";
import { FaSave, FaCheck } from "react-icons/fa";

import { useVocationalTests } from "../context/vocationalTestContext";
import AttentionSkillTestJoinScreen from "../components/phbTest/AttentionSkillTestJoinScreen";
import NumericalSkillTestJoinScreen from "../components/phbTest/NumericalSkillTestJoinScreen";
import ReasoningSkillTestJoinScreen from "../components/phbTest/ReasoningSkillTestJoinScreen,";
import VocabularySkillTestJoinScreen from "../components/phbTest/VocabularySkillTestJoinScreen";
import SpatialSkillTestJoinScreen from "../components/phbTest/SpatialSkillTestJoinScreen";
import { useAuth } from "../context/authContext";

import completedImage from "../assets/Completed.svg";

const PhbTest = () => {
  const [loading, setLoading] = useState(false);
  const [progressLoading, setProgressLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [progressSended, setProgressSended] = useState(false);
  const [isSaveHovered, setIsSaveHovered] = useState(false);
  const [completedPhbTest, setCompletedPhbTest] = useState(null);

  const { user } = useAuth();
  const userId = user?.id;
  const {
    createUpdatePhbTest,
    finishPhbTest,
    generateResultPhbTest,
    getPhbTest,
    resetPhbTest,
  } = useVocationalTests();
  const [testAnswers, setTestAnswers] = useState({
    attentionSkills: {
      A1: null,
      A2: null,
      A3: null,
      A4: null,
      A5: null,
      A6: null,
      A7: null,
      A8: null,
      A9: null,
      A10: null,
      A11: null,
      A12: null,
      A13: null,
      A14: null,
    },
    numericalSkills: {
      N1: null,
      N2: null,
      N3: null,
      N4: null,
      N5: null,
      N6: null,
      N7: null,
      N8: null,
      N9: null,
    },
    reasoningSkills: {
      R1: null,
      R2: null,
      R3: null,
      R4: null,
      R5: null,
      R6: null,
      R7: null,
      R8: null,
      R9: null,
      R10: null,
      R11: null,
    },
    vocabularySkills: {
      V1: null,
      V2: null,
      V3: null,
      V4: null,
      V5: null,
      V6: null,
      V7: null,
      V8: null,
      V9: null,
      V10: null,
      V11: null,
      V12: null,
      V13: null,
      V14: null,
      V15: null,
      V16: null,
      V17: null,
      V18: null,
      V19: null,
      V20: null,
      V21: null,
      V22: null,
      V23: null,
      V24: null,
      V25: null,
      V26: null,
      V27: null,
      V28: null,
      V29: null,
      V30: null,
      V31: null,
      V32: null,
    },
    spatialSkills: {
      cubeCounting: {
        ES1: null,
        ES2: null,
        ES3: null,
        ES4: null,
        ES5: null,
        ES6: null,
        ES7: null,
        ES8: null,
        ES9: null,
      },
      foldedPaper: {
        ES10: null,
        ES11: null,
        ES12: null,
        ES13: null,
      },
      assemblySolidForms: {
        ES14: null,
        ES15: null,
        ES16: null,
        ES17: null,
      },
    },
  });

  const [isNumericalTestStarted, setIsNumericalTestStarted] = useState(false);
  const [isReasoningTestStarted, setIsReasoningTestStarted] = useState(false);
  const [isVocabularyTestStarted, setIsVocabularyTestStarted] = useState(false);
  const [isSpatialTestStarted, setIsSpatialTestStarted] = useState(false);

  const handleTestAnswersChange = (areaName, questionId, value) => {
    setTestAnswers((prevTestAnswers) => {
      const newTestAnswers = {
        ...prevTestAnswers,
        [areaName]: {
          ...prevTestAnswers[areaName],
          [questionId]: value,
        },
      };
      localStorage.setItem(
        `phbTestAnswers${userId}`,
        JSON.stringify(newTestAnswers)
      );
      return newTestAnswers;
    });
  };

  const handleSpatialSkillsTestAnswersChange = (
    sectionName,
    questionId,
    value
  ) => {
    setTestAnswers((prevTestAnswers) => {
      const newTestAnswers = {
        ...prevTestAnswers,
        spatialSkills: {
          ...prevTestAnswers.spatialSkills,
          [sectionName]: {
            ...prevTestAnswers.spatialSkills[sectionName],
            [questionId]: value,
          },
        },
      };
      localStorage.setItem(
        `phbTestAnswers${userId}`,
        JSON.stringify(newTestAnswers)
      );
      return newTestAnswers;
    });
  };

  const handlePhbTestSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await finishPhbTest({ testAnswers });
      if (res) {
        await generateResultPhbTest();
        localStorage.removeItem(`phbTestAnswers${userId}`);
        localStorage.removeItem(`timeLeftAttentionSkills${userId}`);
        localStorage.removeItem(`timeLeftNumericalSkills${userId}`);
        localStorage.removeItem(`timeLeftReasoningSkills${userId}`);
        localStorage.removeItem(`timeLeftVocabularySkills${userId}`);
        localStorage.removeItem(`timeLeftSpatialSkills${userId}`);
        setCompletedPhbTest(true);
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
      const res = await createUpdatePhbTest({ testAnswers });
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
      const res = await resetPhbTest();
      if (res) {
        setCompletedPhbTest(false);
        localStorage.removeItem(`phbTestAnswers${user?.id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setResetLoading(false);
    }
  };

  useEffect(() => {
    const fetchPhbTest = async () => {
      try {
        const phbTestAnswers = localStorage.getItem(
          `phbTestAnswers${user?.id}`
        );

        if (phbTestAnswers) {
          const parsedData = JSON.parse(phbTestAnswers);
          setTestAnswers(parsedData);
        } else {
          const response = await getPhbTest();
          if (response) {
            const phbTest = response.testAnswers;
            setTestAnswers(phbTest);
            localStorage.setItem(
              `phbTestAnswers${user?.id}`,
              JSON.stringify(phbTest)
            );
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (completedPhbTest === false) {
      fetchPhbTest();
    }
  }, [user?.id, getPhbTest, completedPhbTest]);

  useEffect(() => {
    if (progressSended === true) {
      const timer = setTimeout(() => {
        setProgressSended(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [progressSended]);

  useEffect(() => {
    setCompletedPhbTest(user.completedPhbTest);
  }, [user]);

  return (
    <div className="bg-[url('/Fondo-blanco-GORE.svg')] dark:bg-[url('/Fondo-oscuro-GORE.svg')] bg-cover bg-center bg-fixed w-full min-h-screen relative md:p-9 flex justify-center items-center lg:px-64">
      <section className="dark:bg-custom-black relative bg-custom-gray rounded-lg shadow-lg mx-auto mt-[104px]">
        <div className="w-full bg-blue-600 flex justify-center items-center p-4 mb-9 md:rounded-t-lg">
          <h1 className="font-bold text-2xl md:text-3xl text-white text-center font-arima">
            Test de Habilidades Básicas
          </h1>
        </div>
        <div className="px-6 pb-6 md:px-10 md:pb-10">
          {completedPhbTest === true ? (
            <div className="flex flex-col items-center justify-center space-y-6">
              <img src={completedImage} className="w-2/3 md:w-1/3" />
              <h2 className="text-center text-lg font-medium dark:text-white">
                ¡Felicidades! Has completado con éxito el Test de Habilidades
                Básicas (PHB).
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
              {isSpatialTestStarted ? (
                <SpatialSkillTestJoinScreen
                  testAnswers={testAnswers}
                  handleSpatialSkillsTestAnswersChange={
                    handleSpatialSkillsTestAnswersChange
                  }
                  submitPhbTest={handlePhbTestSubmit}
                  loading={loading}
                  userId={userId}
                />
              ) : isVocabularyTestStarted ? (
                <VocabularySkillTestJoinScreen
                  testAnswers={testAnswers}
                  handleTestAnswersChange={handleTestAnswersChange}
                  startSpatialTest={() => setIsSpatialTestStarted(true)}
                  userId={userId}
                />
              ) : isReasoningTestStarted ? (
                <ReasoningSkillTestJoinScreen
                  testAnswers={testAnswers}
                  handleTestAnswersChange={handleTestAnswersChange}
                  startVocabularyTest={() => setIsVocabularyTestStarted(true)}
                  userId={userId}
                />
              ) : isNumericalTestStarted ? (
                <NumericalSkillTestJoinScreen
                  testAnswers={testAnswers}
                  handleTestAnswersChange={handleTestAnswersChange}
                  startReasoningTest={() => setIsReasoningTestStarted(true)}
                  userId={userId}
                />
              ) : (
                <AttentionSkillTestJoinScreen
                  testAnswers={testAnswers}
                  handleTestAnswersChange={handleTestAnswersChange}
                  startNumericalTest={() => setIsNumericalTestStarted(true)}
                  userId={userId}
                />
              )}
              <div className="fixed bottom-24 right-4">
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

export default PhbTest;
