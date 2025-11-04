import React from "react";
import questions from "../../data/questions.json";

const TraitsTestScreen = ({
  testAnswers,
  handleTestAnswersChange,
  startAffirmationsTest,
}) => {
  const questionIds = Object.keys(questions.tepeQuestions.traits);

  const handleTraitsChange = (e) => {
    const { name, value } = e.target;
    handleTestAnswersChange("traits", name, value);
  };

  const handleNextPart = (e) => {
    e.preventDefault();
    startAffirmationsTest();
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <form onSubmit={handleNextPart}>
      <h2 className="text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-500 mb-2 uppercase font-arima">
        Sección 1. Rasgos
      </h2>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-6">
        Marca si en tu caso está presente o no las características que a
        continuación te presentamos. Señala las palabras que desees y consideres
        te describen tal como eres y no como te gustaría ser.
      </p>
      <h3 className="text-lg md:text-xl font-semibold dark:text-white mb-2">
        Soy ...
      </h3>
      <div className="mb-4">
        {questionIds.map((questionId) => (
          <div key={questionId} className="mb-6">
            <p
              className="block mb-2 sm:mb-0 text-lg font-medium text-gray-500 dark:text-gray-400"
              htmlFor={questionId + "1"}
            >
              <b>{questionId}.</b> {questions.tepeQuestions.traits[questionId]}
            </p>
            <div
              id={questionId + "traits_radio"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <label
                htmlFor={questionId + "traits_radio_1"}
                className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                  testAnswers.traits[questionId] === true
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-700"
                }`}
              >
                <input
                  id={questionId + "traits_radio_1"}
                  type="radio"
                  checked={testAnswers.traits[questionId] === true}
                  onChange={handleTraitsChange}
                  value={true}
                  name={questionId}
                  className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
                Sí
              </label>
              
              <label
                htmlFor={questionId + "traits_radio_2"}
                className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                  testAnswers.traits[questionId] === false
                    ? "bg-blue-500 text-white "
                    : "bg-white dark:bg-gray-700"
                }`}
              >
              <input
                id={questionId + "traits_radio_2"}
                type="radio"
                checked={testAnswers.traits[questionId] === false}
                onChange={handleTraitsChange}
                value={false}
                name={questionId}
                className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                required
              />
                No
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

export default TraitsTestScreen;
