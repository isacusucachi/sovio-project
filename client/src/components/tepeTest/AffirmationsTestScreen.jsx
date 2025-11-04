import React from "react";
import questions from "../../data/questions.json";

const AffirmationsTestScreen = ({
  testAnswers,
  handleTestAnswersChange,
  submitTepeTest,
  loading,
}) => {
  const questionIds = Object.keys(questions.tepeQuestions.affirmations);

  const handleAffirmationsChange = (e) => {
    const { name, value } = e.target;
    handleTestAnswersChange("affirmations", name, value);
  };

  return (
    <form onSubmit={submitTepeTest}>
      <h2 className="text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-500 mb-2 uppercase font-arima">
        Sección 2. Afirmaciones
      </h2>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-6">
        Marca la opción SI o NO según consideres que la frase describa una
        característica de tu situación actual de vida.
      </p>
      <h3 className="text-lg md:text-xl font-semibold dark:text-white mb-2">
        ...
      </h3>
      <div className="mb-4">
        {questionIds.map((questionId) => (
          <div key={questionId} className="mb-6">
            <p
              className="block mb-2 sm:mb-0 text-lg font-medium text-gray-500 dark:text-gray-400"
              htmlFor={questionId + "1"}
            >
              <b>{questionId}.</b>{" "}
              {questions.tepeQuestions.affirmations[questionId]}
            </p>
            <div
              id={questionId + "affirmations-radio"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <label
                htmlFor={questionId + "affirmations-radio-1"}
                className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                  testAnswers.affirmations[questionId] === true
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-700"
                }`}
              >
                <input
                  id={questionId + "affirmations-radio-1"}
                  type="radio"
                  checked={testAnswers.affirmations[questionId] === true}
                  onChange={handleAffirmationsChange}
                  value={true}
                  name={questionId}
                  className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
                Sí
              </label>
              <label
                htmlFor={questionId + "affirmations-radio-2"}
                className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                  testAnswers.affirmations[questionId] === false
                    ? "bg-blue-500 text-white "
                    : "bg-white dark:bg-gray-700"
                }`}
              >
                <input
                  id={questionId + "affirmations-radio-2"}
                  type="radio"
                  checked={testAnswers.affirmations[questionId] === false}
                  onChange={handleAffirmationsChange}
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
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                aria-hidden="true"
                className="w-6 h-6 mr-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
              Enviando ...
            </>
          ) : (
            <>
              Finalizar
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M20.337 3.664c.213.212.354.486.404.782.294 1.711.657 5.195-.906 6.76-1.77 1.768-8.485 5.517-10.611 6.683a.987.987 0 0 1-1.176-.173l-.882-.88-.877-.884a.988.988 0 0 1-.173-1.177c1.165-2.126 4.913-8.841 6.682-10.611 1.562-1.563 5.046-1.198 6.757-.904.296.05.57.191.782.404ZM5.407 7.576l4-.341-2.69 4.48-2.857-.334a.996.996 0 0 1-.565-1.694l2.112-2.111Zm11.357 7.02-.34 4-2.111 2.113a.996.996 0 0 1-1.69-.565l-.422-2.807 4.563-2.74Zm.84-6.21a1.99 1.99 0 1 1-3.98 0 1.99 1.99 0 0 1 3.98 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AffirmationsTestScreen;
