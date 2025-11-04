import React, { useEffect } from "react";
import questions from "../../data/questions.json";
import TestAreaHeader from "./TestAreaHeader";

const NumericalSkillTestScreen = ({
  initialTime,
  timeLeft,
  setTimeLeft,
  testAnswers,
  handleTestAnswersChange,
  startReasoningTest,
  userId,
}) => {
  const questionIds = Object.keys(questions.phbQuestions.numericalSkills);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
        localStorage.setItem(`timeLeftNumericalSkills${userId}`, timeLeft - 1);
      } else {
        clearInterval(timer);
        alert("¡Tiempo agotado!");
        startReasoningTest();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  const handleNumericalSkillsChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/[^0-9.]/g, "");

    let updatedValue = parseFloat(cleanedValue);
    if (isNaN(updatedValue)) {
      updatedValue = "";
    }

    handleTestAnswersChange("numericalSkills", name, updatedValue);
  };

  const handleNextArea = (e) => {
    e.preventDefault();
    startReasoningTest();
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <form className="flex flex-col lg:m-" onSubmit={handleNextArea}>
      <TestAreaHeader
        areaTitle={" 2: Habilidad numérica"}
        timeLeft={timeLeft}
        testStarted={true}
        initialTime={initialTime}
      />
      <div className="max-w-screen-lg mx-auto mt-10">
        {questionIds.map((questionId) => (
          <div
            key={questionId}
            className="bg-gray-200 dark:bg-gray-700 p-2 mb-3 rounded-2xl"
          >
            <div className="flex flex-row items-center my-2">
              <h1 className="font-extrabold text-2xl text-blue-700 dark:text-blue-500 mr-1">
                EJERCICIO
              </h1>
              <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                <h4 className="text-white">{questionId}</h4>
              </div>
            </div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {questions.phbQuestions.numericalSkills[questionId].statement}
            </h3>
            <div>
              <input
                type="text"
                id={"numericalSkillsAnswer" + questionId}
                name={questionId}
                value={
                  testAnswers.numericalSkills[questionId] === null
                    ? ""
                    : testAnswers.numericalSkills[questionId]
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4 text-lg font-semibold"
                onChange={handleNumericalSkillsChange}
                placeholder="Escribe aqui tu respuesta..."
                required
              />{" "}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Siguiente
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default NumericalSkillTestScreen;
