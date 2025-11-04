import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import Footer from "../components/Footer";
import { useUsers } from "../context/userContext";
import { useAuth } from "../context/authContext";

import greatImage from "../assets/great.svg";

const PersonalInformationSheet = () => {
  const { user } = useAuth();
  const [completedUserInformation, setCompletedUserInformation] =
    useState(null);
  const { createPersonalInformation, errors: personalInformationErrors } =
    useUsers();

  const [loading, setLoading] = useState(false);

  const [personalInformation, setPersonalInformation] = useState({
    disability: "",
    typeOfDisability: "",
    practiceSport: "",
    sport: "",
    amountSportPractice: "",
    academicLevel: "",
    cycle: "",
    specialty: "",
    institutionName: "",
    typeOfInstitution: "",
    masteredCoursesList: {
      languageOrCommunication: "",
      foreignLanguage: "",
      math: "",
      scienceTechnologyEnvironmentOrBiology: "",
      personFamilyHumanRelationships: "",
      socialSciences: "",
      physicalEducation: "",
      Art: "",
      educationForWork: "",
    },
    likedCoursesList: {
      languageOrCommunication: "",
      foreignLanguage: "",
      math: "",
      scienceTechnologyEnvironmentOrBiology: "",
      personFamilyHumanRelationships: "",
      socialSciences: "",
      physicalEducation: "",
      Art: "",
      educationForWork: "",
    },
    playInstrument: "",
    readPentagram: "",
    composeSongs: "",
    doTheater: "",
    paintPictures: "",
    doDance: "",
    didMilitaryService: "",
    otherSkills: "",
    futureCareer: "",
    career1: "",
    career2: "",
    career3: "",
    levelOfStudiesCanBeFinanced: "",
    typeOfInstitutionCanBeFinanced: "",
    ocupationNeverWork: "",
  });

  const courseListOrder = [
    {
      course: "Lenguaje / Comunicación",
      value: "languageOrCommunication",
    },
    {
      course: "Idioma extranjero",
      value: "foreignLanguage",
    },
    {
      course: "Matemáticas",
      value: "math",
    },
    {
      course: "Ciencias, tecnología y ambiente / Biología",
      value: "scienceTechnologyEnvironmentOrBiology",
    },
    {
      course: "Persona familia y relaciones humanas",
      value: "personFamilyHumanRelationships",
    },
    {
      course: "Ciencias Sociales",
      value: "socialSciences",
    },
    {
      course: "Educación física",
      value: "physicalEducation",
    },
    {
      course: "Arte (teatro, música, danza, pintura)",
      value: "Art",
    },
    {
      course: "Educación para el trabajo",
      value: "educationForWork",
    },
  ];

  const rankOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const handleReenumerarMasteredCourses = () => {
    setPersonalInformation((prevState) => ({
      ...prevState,
      masteredCoursesList: {
        ...{
          languageOrCommunication: "",
          foreignLanguage: "",
          math: "",
          scienceTechnologyEnvironmentOrBiology: "",
          personFamilyHumanRelationships: "",
          socialSciences: "",
          physicalEducation: "",
          Art: "",
          educationForWork: "",
        },
      },
    }));
  };

  const handleReenumerarLikedCourses = () => {
    setPersonalInformation((prevState) => ({
      ...prevState,
      likedCoursesList: {
        ...{
          languageOrCommunication: "",
          foreignLanguage: "",
          math: "",
          scienceTechnologyEnvironmentOrBiology: "",
          personFamilyHumanRelationships: "",
          socialSciences: "",
          physicalEducation: "",
          Art: "",
          educationForWork: "",
        },
      },
    }));
  };

  const handlePersonalInformationChange = (e) => {
    const { name, value } = e.target;

    const updatedValue =
      e.target.type === "number"
        ? parseFloat(value)
        : value === "true"
        ? true
        : value === "false"
        ? false
        : value;

    setPersonalInformation({
      ...personalInformation,
      [name]: updatedValue,
    });
  };

  const handleChangeMasteredCoursesList = (e) => {
    const { name, value } = e.target;
    setPersonalInformation((prevState) => ({
      ...prevState,
      masteredCoursesList: {
        ...prevState.masteredCoursesList,
        [name]: value,
      },
    }));
  };

  const handleChangeLikedCoursesList = (e) => {
    const { name, value } = e.target;
    setPersonalInformation((prevState) => ({
      ...prevState,
      likedCoursesList: {
        ...prevState.likedCoursesList,
        [name]: value,
      },
    }));
  };

  const getAvailableOptionsMasteredCourses = (currentCourse) => {
    const selectedRanks = Object.values(
      personalInformation.masteredCoursesList
    );
    return rankOptions.filter(
      (option) =>
        !selectedRanks.includes(option) ||
        personalInformation.masteredCoursesList[currentCourse] === option
    );
  };

  const getAvailableOptionsLikedCourses = (currentCourse) => {
    const selectedRanks = Object.values(personalInformation.likedCoursesList);
    return rankOptions.filter(
      (option) =>
        !selectedRanks.includes(option) ||
        personalInformation.likedCoursesList[currentCourse] === option
    );
  };

  const handlePersonalInformationSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await createPersonalInformation(personalInformation);
      if (res) setCompletedUserInformation(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setCompletedUserInformation(user.completedUserInformation);
  }, [user]);

  return (
    <>
      <div className="bg-[url('/Fondo-blanco-GORE.svg')] dark:bg-[url('/Fondo-oscuro-GORE.svg')] bg-cover bg-center bg-fixed w-full min-h-screen relative md:p-9 flex justify-center items-center">
        <section className="dark:bg-custom-black relative bg-custom-gray rounded-lg shadow-lg max-w-4xl mx-auto xl:w-1/2 mt-[104px]">
          <div className="w-full bg-blue-600 flex justify-center items-center p-4 mb-9 rounded-t-lg">
            <h1 className="font-bold text-2xl md:text-3xl text-white text-center font-arima">
              FICHA DE INFORMACIÓN PERSONAL
            </h1>
          </div>
          <div className="px-6 pb-6 md:px-10 md:pb-10">
            {completedUserInformation ? (
              <div className="flex flex-col items-center justify-center">
                <img
                  src={greatImage}
                  className="w-full md:w-1/4 aspect-square"
                />
                <h2 className="text-2xl font-bold dark:text-white py-10 text-center">
                  ¡Genial!, completaste el formulario de información personal.
                </h2>
                <a
                  href="/main"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Ir a pruebas
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
                </a>
              </div>
            ) : (
              <form onSubmit={handlePersonalInformationSubmit}>
                <div className="space-y-4 mb-8">
                  <h2 className="block mb-2 text-lg font-black text-blue-700 dark:text-blue-400 font-arima">
                    &#x27BD; ESTADO FÍSICO
                  </h2>
                  <div className="pl-3 space-y-4">
                    <div>
                      <h3 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        ¿Tienes alguna limitación, discapacidad o problema
                        físico?
                      </h3>
                      <div className="flex flex-row">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                          <label
                            htmlFor="disability-radio-1"
                            className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                              personalInformation.disability === false
                                ? "bg-blue-500 text-white"
                                : "bg-white dark:bg-gray-700"
                            }`}
                          >
                            <input
                              id="disability-radio-1"
                              type="radio"
                              checked={personalInformation.disability === false}
                              onChange={handlePersonalInformationChange}
                              value={false}
                              name="disability"
                              className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              required
                            />
                            No
                          </label>
                          <label
                            htmlFor="disability-radio-2"
                            className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                              personalInformation.disability === true
                                ? "bg-blue-500 text-white "
                                : "bg-white dark:bg-gray-700"
                            }`}
                          >
                            <input
                              id="disability-radio-2"
                              type="radio"
                              checked={personalInformation.disability === true}
                              onChange={handlePersonalInformationChange}
                              value={true}
                              name="disability"
                              className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              required
                            />
                            Sí
                          </label>
                        </div>
                      </div>
                    </div>
                    {personalInformation.disability === true && (
                      <div>
                        <label
                          htmlFor="type-of-disability"
                          className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 mr-2"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          ¿De qué tipo?
                        </label>
                        <select
                          id="type-of-disability"
                          name="typeOfDisability"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={personalInformation.typeOfDisability}
                          onChange={handlePersonalInformationChange}
                        >
                          <option value={""} disabled>
                            Selecione una opción...
                          </option>
                          <option value="Visual">Visual</option>
                          <option value="Motora">Motora</option>
                          <option value="Auditiva">Auditiva</option>
                          <option value="Del habla">Del habla</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>
                    )}
                    <div>
                      <h3 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        ¿Prácticas algún deporte?
                      </h3>
                      <div className="flex flex-row">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                          <label
                            htmlFor="practice-sport-radio-1"
                            className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                              personalInformation.practiceSport === false
                                ? "bg-blue-500 text-white"
                                : "bg-white dark:bg-gray-700"
                            }`}
                          >
                            <input
                              id="practice-sport-radio-1"
                              type="radio"
                              checked={
                                personalInformation.practiceSport === false
                              }
                              onChange={handlePersonalInformationChange}
                              value={false}
                              name="practiceSport"
                              className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              required
                            />
                            No
                          </label>
                          <label
                            htmlFor="practice-sport-radio-2"
                            className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                              personalInformation.practiceSport === true
                                ? "bg-blue-500 text-white"
                                : "bg-white dark:bg-gray-700"
                            }`}
                          >
                            <input
                              id="practice-sport-radio-2"
                              type="radio"
                              checked={
                                personalInformation.practiceSport === true
                              }
                              onChange={handlePersonalInformationChange}
                              value={true}
                              name="practiceSport"
                              className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            Sí
                          </label>
                        </div>
                      </div>
                    </div>
                    {personalInformation.practiceSport === true && (
                      <>
                        <div>
                          <label
                            htmlFor="sport"
                            className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-6 mr-2"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                clipRule="evenodd"
                              />
                            </svg>
                            ¿Cúal?
                          </label>
                          <select
                            id="sport"
                            name="sport"
                            value={personalInformation.sport}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handlePersonalInformationChange}
                          >
                            <option value={""} disabled>
                              Selecione una opción...
                            </option>
                            <option value="Fútbol">Fútbol</option>
                            <option value="Voleibol">Voleibol</option>
                            <option value="Tenis">Tenis</option>
                            <option value="Boxeo">Boxeo</option>
                            <option value="Baloncesto">Baloncesto</option>
                            <option value="Natación">Natación</option>
                            <option value="Surf">Surf</option>
                            <option value="Ciclismo">Ciclismo</option>
                            <option value="Senderismo">Senderismo</option>
                            <option value="Otro">Otro</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="amount-sport-practice"
                            className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-6 mr-2"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                clipRule="evenodd"
                              />
                            </svg>
                            ¿Cuánto?
                          </label>
                          <select
                            id="amount-sport-practice"
                            name="amountSportPractice"
                            value={personalInformation.amountSportPractice}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handlePersonalInformationChange}
                          >
                            <option value={""} disabled>
                              Selecione una opción...
                            </option>
                            <option value="Diario">Diario</option>
                            <option value="3 veces por semana">
                              3 veces por semana
                            </option>
                            <option value="1 vez por semana">
                              1 vez por semana
                            </option>
                            <option value="2 veces al mes">
                              2 veces al mes
                            </option>
                            <option value="Pocas veces">Pocas veces</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <h2 className="block mb-2 text-lg font-black text-blue-700 dark:text-blue-400 font-arima">
                    &#x27BD; SITUACIÓN ACADÉMICA Y APTITUDES
                  </h2>
                  <div className="pl-3 space-y-4">
                    <div>
                      <h3 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Marca el ultimo nivel alcanzado / en curso
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <label
                          htmlFor="academic-level-radio-1"
                          className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                            personalInformation.academicLevel === "Primaria"
                              ? "bg-blue-500 text-white"
                              : "bg-white dark:bg-gray-700"
                          }`}
                        >
                          <input
                            id="academic-level-radio-1"
                            type="radio"
                            checked={
                              personalInformation.academicLevel === "Primaria"
                            }
                            onChange={handlePersonalInformationChange}
                            value={"Primaria"}
                            name="academicLevel"
                            className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                          Primaria
                        </label>
                        <label
                          htmlFor="academic-level-radio-2"
                          className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                            personalInformation.academicLevel === "Secundaria"
                              ? "bg-blue-500 text-white"
                              : "bg-white dark:bg-gray-700"
                          }`}
                        >
                          <input
                            id="academic-level-radio-2"
                            type="radio"
                            checked={
                              personalInformation.academicLevel === "Secundaria"
                            }
                            onChange={handlePersonalInformationChange}
                            value={"Secundaria"}
                            name="academicLevel"
                            className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                          Secundaria
                        </label>
                        <label
                          htmlFor="academic-level-radio-3"
                          className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                            personalInformation.academicLevel === "Superior"
                              ? "bg-blue-500 text-white "
                              : "bg-white dark:bg-gray-700"
                          }`}
                        >
                          <input
                            id="academic-level-radio-3"
                            type="radio"
                            checked={
                              personalInformation.academicLevel === "Superior"
                            }
                            onChange={handlePersonalInformationChange}
                            value={"Superior"}
                            name="academicLevel"
                            className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                          Superior
                        </label>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="cycle"
                        className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Indica el Grado / Sección / Ciclo
                      </label>
                      <input
                        type="text"
                        id="cycle"
                        name="cycle"
                        value={personalInformation.cycle}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handlePersonalInformationChange}
                        placeholder="5to A"
                        required
                      />
                    </div>
                    {personalInformation.academicLevel === "Superior" && (
                      <div>
                        <label
                          htmlFor="specialty"
                          className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center"
                        >
                          Especialidad(Si es de nivel Superior)
                        </label>
                        <input
                          type="text"
                          id="specialty"
                          name="specialty"
                          value={personalInformation.specialty}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={handlePersonalInformationChange}
                          placeholder="Contabilidad"
                          required
                        />
                      </div>
                    )}
                    <div>
                      <label
                        htmlFor="institution-name"
                        className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Nombre de la institución educativa
                      </label>
                      <input
                        type="text"
                        id="institution-name"
                        name="institutionName"
                        value={personalInformation.institutionName}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handlePersonalInformationChange}
                        placeholder="I.E. El Sol"
                        required
                      />
                    </div>
                    <div>
                      <h3 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Es ...
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label
                          htmlFor="type-institution-radio-1"
                          className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                            personalInformation.typeOfInstitution === "Público"
                              ? "bg-blue-500 text-white"
                              : "bg-white dark:bg-gray-700"
                          }`}
                        >
                          <input
                            id="type-institution-radio-1"
                            type="radio"
                            checked={
                              personalInformation.typeOfInstitution ===
                              "Público"
                            }
                            onChange={handlePersonalInformationChange}
                            value={"Público"}
                            name="typeOfInstitution"
                            className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                          Público
                        </label>
                        <label
                          htmlFor="type-institution-radio-2"
                          className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                            personalInformation.typeOfInstitution === "Privado"
                              ? "bg-blue-500 text-white "
                              : "bg-white dark:bg-gray-700"
                          }`}
                        >
                          <input
                            id="type-institution-radio-2"
                            type="radio"
                            checked={
                              personalInformation.typeOfInstitution ===
                              "Privado"
                            }
                            onChange={handlePersonalInformationChange}
                            value={"Privado"}
                            name="typeOfInstitution"
                            className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                          Privado
                        </label>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Enumera del 1 al 9 las áreas académicas en que más
                        destacabas en la secundaria:
                      </h3>
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                        <div className="flex items-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 mr-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                            />
                          </svg>

                          <div>
                            <p className="">
                              Debes asignar un número del 1 al 9 a cada curso,
                              donde:
                            </p>
                            <ul className="list-disc pl-6">
                              <li>
                                <b>1</b> representa el curso donde{" "}
                                <b>más destacabas</b>
                              </li>
                              <li>
                                <b>9</b> representa el curso donde{" "}
                                <b>menos destacabas</b>.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {courseListOrder.map((course) => (
                        <div
                          key={course.value}
                          className="flex flex-row items-center pl-6 mb-2 w-full"
                        >
                          <h4 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pr-2 w-2/3">
                            {course.course}:
                          </h4>
                          <select
                            id={course.value + "masteredCourses"}
                            name={course.value}
                            value={
                              personalInformation.masteredCoursesList[
                                course.value
                              ]
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/3"
                            onChange={handleChangeMasteredCoursesList}
                            required
                          >
                            <option value={""} disabled>
                              Enumere...
                            </option>
                            {getAvailableOptionsMasteredCourses(
                              course.value
                            ).map((number) => (
                              <option key={number} value={number}>
                                {number}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold text-lg px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={handleReenumerarMasteredCourses}
                        >
                          <span className="hidden md:block">Reenumerar</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 md:ml-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Enumera del 1 al 9 las áreas que más te gustaban en la
                        secundaria:
                      </h3>
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                        <div className="flex items-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 mr-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                            />
                          </svg>

                          <div>
                            <p className="">
                              Debes asignar un número del 1 al 9 a cada curso,
                              donde:
                            </p>
                            <ul className="list-disc pl-6">
                              <li>
                                <b>1</b> representa el curso que{" "}
                                <b>más te gustaba</b>
                              </li>
                              <li>
                                <b>9</b> representa el curso que{" "}
                                <b>menos te gustaba</b>.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {courseListOrder.map((course) => (
                        <div
                          key={course.value}
                          className="flex flex-row items-center pl-6 mb-2"
                        >
                          <h4 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pr-2 w-2/3">
                            {course.course}:
                          </h4>
                          <select
                            id={course.value + "likedCourses"}
                            name={course.value}
                            value={
                              personalInformation.likedCoursesList[course.value]
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/3"
                            onChange={handleChangeLikedCoursesList}
                            required
                          >
                            <option value={""} disabled>
                              Enumere...
                            </option>
                            {getAvailableOptionsLikedCourses(course.value).map(
                              (number) => (
                                <option key={number} value={number}>
                                  {number}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      ))}
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold text-lg px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={handleReenumerarLikedCourses}
                        >
                          <span className="hidden md:block">Reenumerar</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 md:ml-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        ¿Tienes habilidades artisticas?
                      </h3>
                      <div className="pl-4">
                        <div>
                          <h4 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                            ¿Tocas un instrumento?
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label
                              htmlFor="play-instrument-radio-1"
                              className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                                personalInformation.playInstrument === true
                                  ? "bg-blue-500 text-white"
                                  : "bg-white dark:bg-gray-700"
                              }`}
                            >
                              <input
                                id="play-instrument-radio-1"
                                type="radio"
                                checked={
                                  personalInformation.playInstrument === true
                                }
                                onChange={handlePersonalInformationChange}
                                value={true}
                                name="playInstrument"
                                className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                required
                              />
                              Sí
                            </label>
                            <label
                              htmlFor="play-instrument-radio-2"
                              className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                                personalInformation.playInstrument === false
                                  ? "bg-blue-500 text-white"
                                  : "bg-white dark:bg-gray-700"
                              }`}
                            >
                              <input
                                id="play-instrument-radio-2"
                                type="radio"
                                checked={
                                  personalInformation.playInstrument === false
                                }
                                onChange={handlePersonalInformationChange}
                                value={false}
                                name="playInstrument"
                                className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                required
                              />
                              No
                            </label>
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                            ¿Lees pentagrama?
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label
                              htmlFor="read-pentagram-radio-1"
                              className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                                personalInformation.readPentagram === true
                                  ? "bg-blue-500 text-white"
                                  : "bg-white dark:bg-gray-700"
                              }`}
                            >
                              <input
                                id="read-pentagram-radio-1"
                                type="radio"
                                checked={
                                  personalInformation.readPentagram === true
                                }
                                onChange={handlePersonalInformationChange}
                                value={true}
                                name="readPentagram"
                                className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                required
                              />
                              Sí
                            </label>
                            <label
                              htmlFor="read-pentagram-radio-2"
                              className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                                personalInformation.readPentagram === false
                                  ? "bg-blue-500 text-white"
                                  : "bg-white dark:bg-gray-700"
                              }`}
                            >
                              <input
                                id="read-pentagram-radio-2"
                                type="radio"
                                checked={
                                  personalInformation.readPentagram === false
                                }
                                onChange={handlePersonalInformationChange}
                                value={false}
                                name="readPentagram"
                                className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                required
                              />
                              No
                            </label>
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                            ¿Compones canciones?
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label
                              htmlFor="compose-songs-radio-1"
                              className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                                personalInformation.composeSongs === true
                                  ? "bg-blue-500 text-white"
                                  : "bg-white dark:bg-gray-700"
                              }`}
                            >
                              <input
                                id="compose-songs-radio-1"
                                type="radio"
                                checked={
                                  personalInformation.composeSongs === true
                                }
                                onChange={handlePersonalInformationChange}
                                value={true}
                                name="composeSongs"
                                className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                required
                              />
                              Sí
                            </label>
                            <label
                              htmlFor="compose-songs-radio-2"
                              className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                                personalInformation.composeSongs === false
                                  ? "bg-blue-500 text-white"
                                  : "bg-white dark:bg-gray-700"
                              }`}
                            >
                              <input
                                id="compose-songs-radio-2"
                                type="radio"
                                checked={
                                  personalInformation.composeSongs === false
                                }
                                onChange={handlePersonalInformationChange}
                                value={false}
                                name="composeSongs"
                                className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                required
                              />
                              No
                            </label>
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                            ¿Perteneces a un taller de teatro?
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label
                              htmlFor="do-theater-radio-1"
                              className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                                personalInformation.doTheater === true
                                  ? "bg-blue-500 text-white"
                                  : "bg-white dark:bg-gray-700"
                              }`}
                            >
                              <input
                                id="do-theater-radio-1"
                                type="radio"
                                checked={personalInformation.doTheater === true}
                                onChange={handlePersonalInformationChange}
                                value={true}
                                name="doTheater"
                                className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                required
                              />
                              Sí
                            </label>
                            <label
                              htmlFor="do-theater-radio-2"
                              className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                                personalInformation.doTheater === false
                                  ? "bg-blue-500 text-white"
                                  : "bg-white dark:bg-gray-700"
                              }`}
                            >
                              <input
                                id="do-theater-radio-2"
                                type="radio"
                                checked={
                                  personalInformation.doTheater === false
                                }
                                onChange={handlePersonalInformationChange}
                                value={false}
                                name="doTheater"
                                className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                required
                              />
                              No
                            </label>
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                            ¿Pintas cuadros, oleos a carbón?
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label
                              htmlFor="paint-pictures-radio-1"
                              className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                                personalInformation.paintPictures === true
                                  ? "bg-blue-500 text-white"
                                  : "bg-white dark:bg-gray-700"
                              }`}
                            >
                              <input
                                id="paint-pictures-radio-1"
                                type="radio"
                                checked={
                                  personalInformation.paintPictures === true
                                }
                                onChange={handlePersonalInformationChange}
                                value={true}
                                name="paintPictures"
                                className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                required
                              />
                              Sí
                            </label>
                            <label
                              htmlFor="paint-pictures-radio-2"
                              className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                                personalInformation.paintPictures === false
                                  ? "bg-blue-500 text-white"
                                  : "bg-white dark:bg-gray-700"
                              }`}
                            >
                              <input
                                id="paint-pictures-radio-2"
                                type="radio"
                                checked={
                                  personalInformation.paintPictures === false
                                }
                                onChange={handlePersonalInformationChange}
                                value={false}
                                name="paintPictures"
                                className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                required
                              />
                              No
                            </label>
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                            ¿Perteneces a un taller de danzas?
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label
                              htmlFor="do-dance-radio-1"
                              className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                                personalInformation.doDance === true
                                  ? "bg-blue-500 text-white"
                                  : "bg-white dark:bg-gray-700"
                              }`}
                            >
                              <input
                                id="do-dance-radio-1"
                                type="radio"
                                checked={personalInformation.doDance === true}
                                onChange={handlePersonalInformationChange}
                                value={true}
                                name="doDance"
                                className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                required
                              />
                              Sí
                            </label>
                            <label
                              htmlFor="do-dance-radio-2"
                              className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                                personalInformation.doDance === false
                                  ? "bg-blue-500 text-white"
                                  : "bg-white dark:bg-gray-700"
                              }`}
                            >
                              <input
                                id="do-dance-radio-2"
                                type="radio"
                                checked={personalInformation.doDance === false}
                                onChange={handlePersonalInformationChange}
                                value={false}
                                name="doDance"
                                className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                required
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        ¿Hiciste servicio militar?
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label
                          htmlFor="did-military-service-radio-1"
                          className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                            personalInformation.didMilitaryService === true
                              ? "bg-blue-500 text-white"
                              : "bg-white dark:bg-gray-700"
                          }`}
                        >
                          <input
                            id="did-military-service-radio-1"
                            type="radio"
                            checked={
                              personalInformation.didMilitaryService === true
                            }
                            onChange={handlePersonalInformationChange}
                            value={true}
                            name="didMilitaryService"
                            className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                          Sí
                        </label>
                        <label
                          htmlFor="did-military-service-radio-2"
                          className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                            personalInformation.didMilitaryService === false
                              ? "bg-blue-500 text-white"
                              : "bg-white dark:bg-gray-700"
                          }`}
                        >
                          <input
                            id="did-military-service-radio-2"
                            type="radio"
                            checked={
                              personalInformation.didMilitaryService === false
                            }
                            onChange={handlePersonalInformationChange}
                            value={false}
                            name="didMilitaryService"
                            className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                          No
                        </label>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="other-skills"
                        className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Otras habilidades / Aptitudes / Pasatiempos
                      </label>
                      <input
                        type="text"
                        id="other-skills"
                        name="otherSkills"
                        value={personalInformation.otherSkills}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handlePersonalInformationChange}
                        placeholder="..."
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <h2 className="block mb-2 text-lg font-black text-blue-700 dark:text-blue-400 font-arima">
                    &#x27BD; FUTURO FORMATIVO
                  </h2>
                  <div className="pl-3 space-y-4">
                    <div>
                      <h3 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        ¿Ya haz pensado en alguna especialidad / carrera a
                        seguir?
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label
                          htmlFor="future-career-radio-1"
                          className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                            personalInformation.futureCareer === true
                              ? "bg-blue-500 text-white"
                              : "bg-white dark:bg-gray-700"
                          }`}
                        >
                          <input
                            id="future-career-radio-1"
                            type="radio"
                            checked={personalInformation.futureCareer === true}
                            onChange={handlePersonalInformationChange}
                            value={true}
                            name="futureCareer"
                            className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                          Sí
                        </label>
                        <label
                          htmlFor="future-career-radio-2"
                          className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                            personalInformation.futureCareer === false
                              ? "bg-blue-500 text-white"
                              : "bg-white dark:bg-gray-700"
                          }`}
                        >
                          <input
                            id="future-career-radio-2"
                            type="radio"
                            checked={personalInformation.futureCareer === false}
                            onChange={handlePersonalInformationChange}
                            value={false}
                            name="futureCareer"
                            className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                          No
                        </label>
                      </div>
                    </div>
                    {personalInformation.futureCareer === true && (
                      <div>
                        <h3 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 mr-2"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                              clipRule="evenodd"
                            />
                          </svg>{" "}
                          Menciona tus opciones
                        </h3>
                        <input
                          type="text"
                          id="career1"
                          name="career1"
                          value={personalInformation.career1}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          onChange={handlePersonalInformationChange}
                          placeholder="Opcion 1"
                        />
                        <input
                          type="text"
                          id="career2"
                          name="career2"
                          value={personalInformation.career2}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                          onChange={handlePersonalInformationChange}
                          placeholder="Opcion 2"
                        />
                        <input
                          type="text"
                          id="career3"
                          name="career3"
                          value={personalInformation.career3}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={handlePersonalInformationChange}
                          placeholder="Opcion 3"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>{" "}
                        ¿Qué nivel de estudios puedes financiar?
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <label
                          htmlFor="level-of-studies-can-be-financed-radio-1"
                          className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                            personalInformation.levelOfStudiesCanBeFinanced ===
                            "Universitario"
                              ? "bg-blue-500 text-white"
                              : "bg-white dark:bg-gray-700"
                          }`}
                        >
                          <input
                            id="level-of-studies-can-be-financed-radio-1"
                            type="radio"
                            checked={
                              personalInformation.levelOfStudiesCanBeFinanced ===
                              "Universitario"
                            }
                            onChange={handlePersonalInformationChange}
                            value={"Universitario"}
                            name="levelOfStudiesCanBeFinanced"
                            className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                          Universitario
                        </label>
                        <label
                          htmlFor="level-of-studies-can-be-financed-radio-2"
                          className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                            personalInformation.levelOfStudiesCanBeFinanced ===
                            "Técnico"
                              ? "bg-blue-500 text-white"
                              : "bg-white dark:bg-gray-700"
                          }`}
                        >
                          <input
                            id="level-of-studies-can-be-financed-radio-2"
                            type="radio"
                            checked={
                              personalInformation.levelOfStudiesCanBeFinanced ===
                              "Técnico"
                            }
                            onChange={handlePersonalInformationChange}
                            value={"Técnico"}
                            name="levelOfStudiesCanBeFinanced"
                            className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                          Técnico
                        </label>
                        <label
                          htmlFor="level-of-studies-can-be-financed-radio-3"
                          className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                            personalInformation.levelOfStudiesCanBeFinanced ===
                            "CETPRO / Ocupacional"
                              ? "bg-blue-500 text-white"
                              : "bg-white dark:bg-gray-700"
                          }`}
                        >
                          <input
                            id="level-of-studies-can-be-financed-radio-3"
                            type="radio"
                            checked={
                              personalInformation.levelOfStudiesCanBeFinanced ===
                              "CETPRO / Ocupacional"
                            }
                            onChange={handlePersonalInformationChange}
                            value={"CETPRO / Ocupacional"}
                            name="levelOfStudiesCanBeFinanced"
                            className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                          CETPRO / Ocupacional
                        </label>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        ¿Y en qué tipo de institución?
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label
                          htmlFor="type-institution-can-be-financed-radio-1"
                          className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                            personalInformation.typeOfInstitutionCanBeFinanced ===
                            "Público"
                              ? "bg-blue-500 text-white"
                              : "bg-white dark:bg-gray-700"
                          }`}
                        >
                          <input
                            id="type-institution-can-be-financed-radio-1"
                            type="radio"
                            checked={
                              personalInformation.typeOfInstitutionCanBeFinanced ===
                              "Público"
                            }
                            onChange={handlePersonalInformationChange}
                            value={"Público"}
                            name="typeOfInstitutionCanBeFinanced"
                            className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                          Público
                        </label>
                        <label
                          htmlFor="type-institution-can-be-financed-radio-2"
                          className={`py-2 px-4 rounded-md cursor-pointer dark:text-white hover:bg-blue-400 hover:text-white text-center focus:bg-blue-500 flex items-center ${
                            personalInformation.typeOfInstitutionCanBeFinanced ===
                            "Privado"
                              ? "bg-blue-500 text-white"
                              : "bg-white dark:bg-gray-700"
                          }`}
                        >
                          <input
                            id="type-institution-can-be-financed-radio-2"
                            type="radio"
                            checked={
                              personalInformation.typeOfInstitutionCanBeFinanced ===
                              "Privado"
                            }
                            onChange={handlePersonalInformationChange}
                            value={"Privado"}
                            name="typeOfInstitutionCanBeFinanced"
                            className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          Privado
                        </label>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="ocupation-never-work"
                        className="mb-2 sm:mb-0 text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6 mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        ¿En que ocupación NO trabajarias por ningun motivo?
                      </label>
                      <input
                        type="text"
                        id="ocupation-never-work"
                        name="ocupationNeverWork"
                        value={personalInformation.ocupationNeverWork}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handlePersonalInformationChange}
                        placeholder="..."
                      />
                    </div>
                    {personalInformationErrors.map((error, i) => (
                      <p
                        key={i}
                        className="w-full text-white bg-red-500 mb-1 font-medium rounded-lg text-sm px-5 py-2.5"
                      >
                        {error}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                        Cargando ...
                      </>
                    ) : (
                      <>
                        Enviar
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-send ml-2"
                        >
                          <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                          <path d="m21.854 2.147-10.94 10.939" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
export default PersonalInformationSheet;
