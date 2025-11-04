import React from "react";
import questions from "../../data/questions.json";

const PersonalStylesTestScreen = ({
  testAnswers,
  handleTestAnswersChange,
  startPreferredActivitiesTest,
}) => {
  const questionIds = Object.keys(questions.ieppoQuestions.personalStyles);

  const handlePersonalStylesChange = (e) => {
    const { name, value } = e.target;
    handleTestAnswersChange("personalStyles", name, value);
  };

  const handleNextPart = (e) => {
    e.preventDefault();
    startPreferredActivitiesTest();
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <form onSubmit={handleNextPart}>
      <h2 className="text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-500 mb-2 uppercase font-arima">
        Parte 1. Estilos personales
      </h2>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-6">
        A continuación, te presentamos algunas afirmaciones que describen cómo
        son y qué suelen hacer algunas personas como tú. Lee con atención cada
        afirmación y luego índica si se parece a ti, a tu manera de ser y
        actuar. Para ello, debes marcar "No se parece a mí" o "Se parece a mí".
        Recuerda que debes contestar todas las afirmaciones.
      </p>
      <h3 className="text-lg md:text-xl font-semibold dark:text-white mb-2">
        Soy una persona que ...
      </h3>
      <div className="mb-4">
        {questionIds.map((questionId) => (
          <div key={questionId} className="mb-6">
            <p
              className="block mb-2 sm:mb-0 text-lg font-medium text-gray-500 dark:text-gray-400"
              htmlFor={questionId + "1"}
            >
              <b>{questionId}.</b>{" "}
              {questions.ieppoQuestions.personalStyles[questionId]}
            </p>
            <div
              id={questionId + "1"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <label
                htmlFor={questionId + "a"}
                className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                  testAnswers.personalStyles[questionId] === true
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-700"
                }`}
              >
                <input
                  id={questionId + "a"}
                  type="radio"
                  checked={testAnswers.personalStyles[questionId] === true}
                  onChange={handlePersonalStylesChange}
                  value={true}
                  name={questionId}
                  className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
                Se parece a mí
              </label>
              <label
                htmlFor={questionId + "b"}
                className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                  testAnswers.personalStyles[questionId] === false
                    ? "bg-blue-500 text-white "
                    : "bg-white dark:bg-gray-700"
                }`}
              >
                <input
                  id={questionId + "b"}
                  type="radio"
                  checked={testAnswers.personalStyles[questionId] === false}
                  onChange={handlePersonalStylesChange}
                  value={false}
                  name={questionId}
                  className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
                No se parece a mí
              </label>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
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

export default PersonalStylesTestScreen;
