import React, { useEffect } from "react";
import questions from "../../data/questions.json";
import TestAreaHeader from "./TestAreaHeader";

const ReasoningSkillTestScreen = ({
  initialTime,
  timeLeft,
  setTimeLeft,
  testAnswers,
  handleTestAnswersChange,
  startVocabularyTest,
  userId,
}) => {
  const questionIds = Object.keys(questions.phbQuestions.reasoningSkills);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
        localStorage.setItem(`timeLeftReasoningSkills${userId}`, timeLeft - 1);
      } else {
        clearInterval(timer);
        alert("¡Tiempo agotado!");
        startVocabularyTest();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  const handleReasoningSkillsChange = (e) => {
    const { name, value } = e.target;
    handleTestAnswersChange("reasoningSkills", name, value);
  };

  const handleNextArea = (e) => {
    e.preventDefault();
    startVocabularyTest();
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <form className="flex flex-col lg:m-" onSubmit={handleNextArea}>
      <TestAreaHeader
        areaTitle={" 3: Razonamiento"}
        timeLeft={timeLeft}
        testStarted={true}
        initialTime={initialTime}
      />
      <div className="max-w-screen-lg mx-auto mt-10">
        {questionIds.map((questionId) => (
          <div
            key={questionId}
            className="bg-gray-200 dark:bg-gray-700 p-4 mb-3 rounded-2xl"
          >
            <div className="flex flex-row items-center my-2">
              <h1 className="font-extrabold text-2xl text-blue-700 mr-1">
                Ejercicio
              </h1>
              <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                <h4 className="text-white">{questionId}</h4>
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                {questions.phbQuestions.reasoningSkills[questionId].statement}
              </h3>
              <div
                className="space-y-4"
              >
                {questions.phbQuestions.reasoningSkills[
                  questionId
                ].alternatives.map((alternative, index) => (
                  <label
                    key={index}
                    htmlFor={
                      "reasoningSkills" + questionId + "alternative" + index
                    }
                    className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                      testAnswers.reasoningSkills[questionId] ===
                      String.fromCharCode(65 + index)
                        ? "bg-blue-500 text-white"
                        : "bg-white dark:bg-gray-900"
                    }`}
                  >
                    <input
                      id={
                        "reasoningSkills" + questionId + "alternative" + index
                      }
                      type="radio"
                      checked={
                        testAnswers.reasoningSkills[questionId] ===
                        String.fromCharCode(65 + index)
                      }
                      onChange={handleReasoningSkillsChange}
                      value={String.fromCharCode(65 + index)}
                      name={questionId}
                      className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />

                    {String.fromCharCode(97 + index) + ". "}
                    {alternative}
                  </label>
                ))}
              </div>
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

export default ReasoningSkillTestScreen;
