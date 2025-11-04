import React, { useState, useEffect } from "react";
import questions from "../../data/questions.json";
import TestAreaHeader from "./TestAreaHeader";

export default function SpatialSkillTestScreen({
  initialTime,
  timeLeft,
  setTimeLeft,
  testAnswers,
  handleSpatialSkillsTestAnswersChange,
  submitPhbTest,
  loading,
  userId,
}) {
  const questionIdsCubeCounting = Object.keys(
    questions.phbQuestions.spatialSkills.cubeCounting
  );
  const questionIdsFoldedPaper = Object.keys(
    questions.phbQuestions.spatialSkills.foldedPaper
  );
  const questionIdsAssemblySolidForms = Object.keys(
    questions.phbQuestions.spatialSkills.assemblySolidForms
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
        localStorage.setItem(`timeLeftSpatialSkills${userId}`, timeLeft - 1);
      } else {
        clearInterval(timer);
        alert("¡Tiempo agotado!");
        finishPhbTest();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  const handleCubeCountingChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/[^0-9.]/g, "");

    let updatedValue = parseFloat(cleanedValue);
    if (isNaN(updatedValue)) {
      updatedValue = "";
    }
    handleSpatialSkillsTestAnswersChange("cubeCounting", name, updatedValue);
  };
  const handleFoldedPaperChange = (e) => {
    const { name, value } = e.target;
    handleSpatialSkillsTestAnswersChange("foldedPaper", name, value);
  };
  const handleAssemblySolidFormsChange = (e) => {
    const { name, value } = e.target;
    handleSpatialSkillsTestAnswersChange("assemblySolidForms", name, value);
  };

  return (
    <form className="flex flex-col lg:m-" onSubmit={submitPhbTest}>
      <TestAreaHeader
        areaTitle={" 5: Habilidad espacial"}
        timeLeft={timeLeft}
        testStarted={true}
        initialTime={initialTime}
      />
      <h3 className="text-2xl font-bold dark:text-white py-4">
        Sección I: Conteo de cubos
      </h3>
      <div className="grid gap-6 mb-6 lg:grid-cols-3 md:grid-cols-2 mt-1">
        {questionIdsCubeCounting.map((questionId) => (
          <div
            key={questionId}
            className="bg-gray-200 dark:bg-gray-700 p-2 mb-3 rounded-2xl"
          >
            <div className="flex flex-row items-center my-2">
              <h1 className="font-extrabold text-2xl text-blue-700 mr-1">
                Ejercicio
              </h1>
              <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                <h4 className="text-white">{questionId}</h4>
              </div>
            </div>
            <div className="w-full text-center">
              <img
                className="lg:h-40 md:h-20 sm:h-10 mx-auto"
                src={
                  questions.phbQuestions.spatialSkills.cubeCounting[questionId]
                    .imgUrlStatement
                }
              />
            </div>
            <div>
              <label
                htmlFor={"cubeCountingAnswer" + questionId}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tu respuesta:
              </label>
              <input
                type="text"
                id={"cubeCountingAnswer" + questionId}
                name={questionId}
                value={
                  testAnswers.spatialSkills.cubeCounting[questionId] === null
                    ? ""
                    : testAnswers.spatialSkills.cubeCounting[questionId]
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center mb-4"
                onChange={handleCubeCountingChange}
                placeholder="Escribe aqui tu respuesta..."
                required
              />{" "}
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-2xl font-bold dark:text-white py-4">
        Sección II: Papel doblado
      </h3>
      <div className="max-w-screen-lg mx-auto">
        {questionIdsFoldedPaper.map((questionId) => (
          <div
            key={questionId}
            className="bg-gray-200 dark:bg-gray-700 p-2 mb-3 rounded-2xl"
          >
            <div className="flex flex-row items-center my-2">
              <h1 className="font-extrabold text-2xl text-blue-700 mr-1">
                Ejercicio
              </h1>
              <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                <h4 className="text-white">{questionId}</h4>
              </div>
            </div>
            <div className="w-full text-center">
              <img
                className="lg:h-40 md:h-20 sm:h-10 mx-auto"
                src={
                  questions.phbQuestions.spatialSkills.foldedPaper[questionId]
                    .imgUrlStatement
                }
              />
            </div>
            <div className="h-2 bg-blue-700 my-5"></div>
            <div className="flex flex-wrap justify-center">
              {questions.phbQuestions.spatialSkills.foldedPaper[
                questionId
              ].alternatives.map((alternative, index) => (
                <div key={index} className="flex items-center mr-6 mb-6">
                  <input
                    id={"foldedPaper" + questionId + "alternative" + index}
                    type="radio"
                    checked={
                      testAnswers.spatialSkills.foldedPaper[questionId] ===
                      String.fromCharCode(65 + index)
                    }
                    onChange={handleFoldedPaperChange}
                    value={String.fromCharCode(65 + index)}
                    name={questionId}
                    className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                  <label
                    htmlFor={"foldedPaper" + questionId + "alternative" + index}
                    className="ms-2 text-2xl font-medium text-gray-900 dark:text-gray-300"
                  >
                    {`${String.fromCharCode(97 + index)}. `}
                  </label>
                  <img
                    className="lg:h-40 md:h-20 sm:h-10 ml-2"
                    src={alternative}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-2xl font-bold dark:text-white py-4">
        Sección III: Armado de formas sólidas
      </h3>
      <div className="max-w-screen-lg mx-auto">
        {questionIdsAssemblySolidForms.map((questionId) => (
          <div
            key={questionId}
            className="bg-gray-200 dark:bg-gray-700 p-2 mb-3 rounded-2xl"
          >
            <div className="flex flex-row items-center my-2">
              <h1 className="font-extrabold text-2xl text-blue-700 mr-1">
                Ejercicio
              </h1>
              <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                <h4 className="text-white">{questionId}</h4>
              </div>
            </div>
            <div className="w-full text-center">
              <img
                className="lg:h-40 md:h-20 sm:h-10 mx-auto"
                src={
                  questions.phbQuestions.spatialSkills.assemblySolidForms[
                    questionId
                  ].imgUrlStatement
                }
              />
            </div>
            <div className="h-2 bg-blue-700 my-5"></div>
            <div className="flex flex-wrap justify-center">
              {questions.phbQuestions.spatialSkills.assemblySolidForms[
                questionId
              ].alternatives.map((alternative, index) => (
                <div key={index} className="flex items-center mr-6 mb-6">
                  <input
                    id={
                      "assemblySolidForms" + questionId + "alternative" + index
                    }
                    type="radio"
                    checked={
                      testAnswers.spatialSkills.assemblySolidForms[
                        questionId
                      ] === String.fromCharCode(65 + index)
                    }
                    onChange={handleAssemblySolidFormsChange}
                    value={String.fromCharCode(65 + index)}
                    name={questionId}
                    className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                  <label
                    htmlFor={
                      "assemblySolidForms" + questionId + "alternative" + index
                    }
                    className="ms-2 text-2xl font-medium text-gray-900 dark:text-gray-300"
                  >
                    {`${String.fromCharCode(97 + index)}. `}
                  </label>
                  <img className="lg:h-40 md:h-20 sm:h-10" src={alternative} />
                </div>
              ))}
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
}
