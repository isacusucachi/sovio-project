import { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TbAlertSquareFilled } from "react-icons/tb";
import { useAssessmentSurveys } from "../context/assessmentSurveyContex";

const AssessmentSurvey = () => {
  const { createAssessmentSurvey, errors } = useAssessmentSurveys();

  const navigate = useNavigate();

  const [assessmentSurvey, setAssesmentSurvey] = useState({
    navigationDifficulty: null,
    appereanceRating: null,
    satisfactionRating: null,
    recommendationToOthers: null,
    comments: "",
    rating: 0,
  });

  const [starError, setStarError] = useState(null);

  const handleAssessmentSurveyChange = (e) => {
    const { name, value } = e.target;
    setAssesmentSurvey({
      ...assessmentSurvey,
      [name]: value,
    });
  };

  const handleStarAssessmentSurveyChange = (value) => {
    setAssesmentSurvey({
      ...assessmentSurvey,
      rating: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (assessmentSurvey.rating === 0) {
      setStarError("Por favor, califique nuestra plataforma");
      return;
    }

    const res = await createAssessmentSurvey(assessmentSurvey);
    if (res) navigate("/home");
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // clear errors after 5 seconds
  useEffect(() => {
    if (starError) {
      const timer = setTimeout(() => {
        setStarError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [starError]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 w-full h-full relative pb-[110px] pt-[120px] lg:pt-[100px] lg:p-9">
      <form
        onSubmit={handleSubmit}
        className="dark:bg-gray-800 lg:p-10 p-5 relative bg-white rounded-lg shadow dark:border dark:border-gray-700"
      >
        <h1 className="font-extrabold text-4xl text-blue-700 text-center">
          Encuesta de valoración de plataforma sovio.com
        </h1>
        <p className="text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 text-justify mb-5">
          Hola, por favor, invierte unos pocos minutos de tu tiempo para
          rellenar el siguiente cuestionario. Esta información nos servirá para seguir mejorando.
        </p>
        <div>
          <p className="text-lg font-bold text-gray-500 lg:text-xl dark:text-gray-400 text-justify mt-10">
            1. ¿Cómo de difícil te resulta la navegación por la plataforma?
          </p>
          <div className="flex items-center mb-4">
            <input
              id="Muy sencilla"
              type="radio"
              checked={assessmentSurvey.navigationDifficulty === "Muy sencilla"}
              onChange={handleAssessmentSurveyChange}
              value="Muy sencilla"
              name="navigationDifficulty"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="Muy sencilla"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              Muy sencilla
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="Relativamente sencilla"
              type="radio"
              checked={
                assessmentSurvey.navigationDifficulty ===
                "Relativamente sencilla"
              }
              onChange={handleAssessmentSurveyChange}
              value="Relativamente sencilla"
              name="navigationDifficulty"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="Relativamente sencilla"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              Relativamente sencilla
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="Normal"
              type="radio"
              checked={assessmentSurvey.navigationDifficulty === "Normal"}
              onChange={handleAssessmentSurveyChange}
              value="Normal"
              name="navigationDifficulty"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="Normal"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              Normal
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="Algo compleja"
              type="radio"
              checked={
                assessmentSurvey.navigationDifficulty === "Algo compleja"
              }
              onChange={handleAssessmentSurveyChange}
              value="Algo compleja"
              name="navigationDifficulty"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="Algo compleja"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              Algo compleja
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="Muy compleja"
              type="radio"
              checked={assessmentSurvey.navigationDifficulty === "Muy compleja"}
              onChange={handleAssessmentSurveyChange}
              value="Muy compleja"
              name="navigationDifficulty"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="Muy compleja"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              Muy compleja
            </label>
          </div>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-500 lg:text-xl dark:text-gray-400 text-justify mt-10">
            2. ¿Cómo valoras el aspecto de nuestra plataforma?
          </p>
          <div className="flex items-center mb-4">
            <input
              id="Muy bueno"
              type="radio"
              checked={assessmentSurvey.appereanceRating === "Muy bueno"}
              onChange={handleAssessmentSurveyChange}
              value="Muy bueno"
              name="appereanceRating"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="Muy bueno"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              Muy bueno
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="Normal-appearance"
              type="radio"
              checked={assessmentSurvey.appereanceRating === "Normal"}
              onChange={handleAssessmentSurveyChange}
              value="Normal"
              name="appereanceRating"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="Normal-appearance"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              Normal
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="Peor que la media"
              type="radio"
              checked={
                assessmentSurvey.appereanceRating === "Peor que la media"
              }
              onChange={handleAssessmentSurveyChange}
              value="Peor que la media"
              name="appereanceRating"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="Peor que la media"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              Peor que la media
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="No me gusta nada"
              type="radio"
              checked={assessmentSurvey.appereanceRating === "No me gusta nada"}
              onChange={handleAssessmentSurveyChange}
              value="No me gusta nada"
              name="appereanceRating"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="No me gusta nada"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              No me gusta nada
            </label>
          </div>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-500 lg:text-xl dark:text-gray-400 text-justify mt-10">
            3. ¿Cómo de satisfecho/a estás con nuestra plataforma?
          </p>
          <div className="flex items-center mb-4">
            <input
              id="Muy satisfecho/a"
              type="radio"
              checked={
                assessmentSurvey.satisfactionRating === "Muy satisfecho/a"
              }
              onChange={handleAssessmentSurveyChange}
              value="Muy satisfecho/a"
              name="satisfactionRating"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="Muy satisfecho/a"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              Muy satisfecho/a
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="Satisfecho/a"
              type="radio"
              checked={assessmentSurvey.satisfactionRating === "Satisfecho/a"}
              onChange={handleAssessmentSurveyChange}
              value="Satisfecho/a"
              name="satisfactionRating"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="Satisfecho/a"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              Satisfecho/a
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="Medianamente satisfecho/a"
              type="radio"
              checked={
                assessmentSurvey.satisfactionRating ===
                "Medianamente satisfecho/a"
              }
              onChange={handleAssessmentSurveyChange}
              value="Medianamente satisfecho/a"
              name="satisfactionRating"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="Medianamente satisfecho/a"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              Medianamente satisfecho/a
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="Insatisfecho/a"
              type="radio"
              checked={assessmentSurvey.satisfactionRating === "Insatisfecho/a"}
              onChange={handleAssessmentSurveyChange}
              value="Insatisfecho/a"
              name="satisfactionRating"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="Insatisfecho/a"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              Insatisfecho/a
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="Muy insatisfecho/a"
              type="radio"
              checked={
                assessmentSurvey.satisfactionRating === "Muy insatisfecho/a"
              }
              onChange={handleAssessmentSurveyChange}
              value="Muy insatisfecho/a"
              name="satisfactionRating"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="Muy insatisfecho/a"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              Muy insatisfecho/a
            </label>
          </div>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-500 lg:text-xl dark:text-gray-400 text-justify mt-10">
            4. ¿Recomendarías nuestra plataforma a otras personas?
          </p>
          <div className="flex items-center mb-4">
            <input
              id="Sí, definitivamente"
              type="radio"
              checked={
                assessmentSurvey.recommendationToOthers ===
                "Sí, definitivamente"
              }
              onChange={handleAssessmentSurveyChange}
              value="Sí, definitivamente"
              name="recommendationToOthers"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="Sí, definitivamente"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              Sí, definitivamente
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="Probablemente sí"
              type="radio"
              checked={
                assessmentSurvey.recommendationToOthers === "Probablemente sí"
              }
              onChange={handleAssessmentSurveyChange}
              value="Probablemente sí"
              name="recommendationToOthers"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="Probablemente sí"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              Probablemente sí
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="No lo sé"
              type="radio"
              checked={assessmentSurvey.recommendationToOthers === "No lo sé"}
              onChange={handleAssessmentSurveyChange}
              value="No lo sé"
              name="recommendationToOthers"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="No lo sé"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              No lo sé
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="Probablemente no"
              type="radio"
              checked={
                assessmentSurvey.recommendationToOthers === "Probablemente no"
              }
              onChange={handleAssessmentSurveyChange}
              value="Probablemente no"
              name="recommendationToOthers"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="Probablemente no"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              Probablemente no
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="No, para nada"
              type="radio"
              checked={
                assessmentSurvey.recommendationToOthers === "No, para nada"
              }
              onChange={handleAssessmentSurveyChange}
              value="No, para nada"
              name="recommendationToOthers"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label
              htmlFor="No, para nada"
              className="ms-2 font-normal text-gray-900 dark:text-gray-300"
            >
              No, para nada
            </label>
          </div>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-500 lg:text-xl dark:text-gray-400 text-justify mt-10">
            5. Dejanos tus comentarios y/o recomendaciones
          </p>
          <textarea
            className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="comments"
            value={assessmentSurvey.comments}
            onChange={handleAssessmentSurveyChange}
            required
          />
        </div>
        <div>
          <p className="text-lg font-bold text-gray-500 lg:text-xl dark:text-gray-400 text-justify mt-10">
            6. Calificación
          </p>
          <div className="flex flex-row w-full text-yellow-500">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                name="rating"
                value={value}
                onClick={() => handleStarAssessmentSurveyChange(value)}
                className="cursor-pointer mr-5"
              >
                {assessmentSurvey.rating >= value ? (
                  <FaStar size={40} />
                ) : (
                  <FaRegStar size={40} />
                )}
              </button>
            ))}
          </div>
          {starError && (
            <div className="mt-4 p-2 border rounded-md bg-white border-gray-500 inline-flex items-center text-sm">
              <TbAlertSquareFilled size={30} color="#ff8c00" />
              <p>{starError}</p>
            </div>
          )}
        </div>
        {errors.map((error, i) => (
          <p
            key={i}
            className="w-full text-white bg-red-500 mb-1 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {error}
          </p>
        ))}
        <div className="w-full text-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex flex-row mx-auto items-center justify-center mt-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
            ENVIAR
          </button>
        </div>
      </form>
      <button onClick={() => console.log(errors)}>
        {" "}
        gaaaaaaaaaaaaaaaaaaaa
      </button>
    </section>
  );
};
export default AssessmentSurvey;
