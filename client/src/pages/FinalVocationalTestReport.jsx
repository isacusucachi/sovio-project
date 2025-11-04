import { useEffect } from "react";
import { useVocationalTests } from "../context/vocationalTestContext";
import { useAuth } from "../context/authContext";
import carreras_por_tipos_vocacionales from "../data/carreras_por_tipos_vocacionales.json";

const FinalVocationalTestReport = () => {
  const { user } = useAuth();
  const { vocationalTestReport, getVocationalTestReport } =
    useVocationalTests();

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0];

    return formattedDate;
  };

  useEffect(() => {
    getVocationalTestReport();
  }, []);

  return (
    <div className="bg-[url('/Fondo-blanco-GORE.svg')] dark:bg-[url('/Fondo-oscuro-GORE.svg')] bg-cover bg-center bg-fixed w-full min-h-screen relative md:p-9 flex justify-center items-center">
      <section className="dark:bg-custom-black relative bg-white p-6 md:p-10 rounded-lg shadow-lg max-w-4xl mx-auto print:shadow-none mt-[104px]">
        <div className="dark:bg-gray-800 lg:p-10 p-5 relative bg-white rounded-lg print:shadow-none">
          <div className="flex flex-row justify-between mb-5 print:mb-0">
            <img src={"./PCM-Trabajo.png"} className="sm:h-10 h-7" />
            <img src={"./Mtpe.webp"} className="sm:h-12 h-8" />
          </div>
          <h1 className="font-extrabold text-2xl text-blue-700 text-center mb-5 print:mb-1 print:text-lg">
            INFORME CONFIDENCIAL SOVIO
          </h1>
          <div className="font-normal text-base text-gray-500 dark:text-gray-400 mb-10 print:mb-1">
            <div className="grid gap-1 print:gap-0 lg:grid-cols-1">
              <div>
                <span className="font-bold">Nombre del evaluado(a): </span>
                <span>{user != null && user.names + " " + user.surnames}</span>
              </div>
            </div>
            <div className="grid gap-1 print:gap-0 lg:grid-cols-4 sm:grid-cols-4">
              <div>
                <span className="font-bold">{user != null && user.typeOfIdentityDocument}:</span>
                <span> {user != null && user.identityDocumentNumber}</span>
              </div>
              <div>
                <span className="font-bold">F. de eval.:</span>
                <span> {formatDate(vocationalTestReport?.evaluationDate)}</span>
              </div>
              <div>
                <span className="font-bold">Edad:</span>
                <span>
                  {" "}
                  {user != null && user.age}
                </span>
              </div>
              <div>
                <span className="font-bold">Género:</span>
                <span>
                  {" "}
                  {user != null && user.gender}
                </span>
              </div>
            </div>
            <div className="grid gap-1 print:gap-0 lg:grid-cols-2 sm:grid-cols-2">
              <div>
                <span className="font-bold">Grado de instruc:</span>
                <span>
                  {" "}
                  {
                    vocationalTestReport?.userId?.personalInformation?.cycle
                  }{" "}
                  {
                    vocationalTestReport?.userId?.personalInformation
                      ?.academicLevel
                  }
                </span>
              </div>
              <div>
                <span className="font-bold">Inst. Educativa:</span>
                <span>
                  {" "}
                  {
                    vocationalTestReport?.userId?.personalInformation
                      ?.institutionName
                  }
                </span>
              </div>
            </div>
            <div className="grid gap-1 print:gap-0 lg:grid-cols-1">
              <div>
                <span className="font-bold">Evaluador(a): </span>
                <span>{vocationalTestReport?.evaluator?.fullname}</span>
              </div>
            </div>
          </div>
          <h2 className="font-bold text-xl dark:text-white my-4 underline print:my-1 print:text-base dark:print:text-black">
            I- DESCRIPCIÓN DE LAS ÁREAS MEDIDAS
          </h2>
          {vocationalTestReport.phbTestResult && (
            <div>
              <h3 className="font-bold text-xl dark:text-white my-4 print:my-1 print:text-base dark:print:text-black">
                &gt;Habilidades básicas
              </h3>
              <ol className="space-y-2 print:space-y-0 text-lg print:text-sm lg:text-xl font-bold text-gray-900 dark:text-white text-justify dark:print:text-black">
                <li>
                  <span>1. Atención:</span>
                  <span className="font-normal">
                    {" "}
                    Capacidad de atención y concentración a detalles.
                  </span>
                </li>
                <li>
                  <span>2. Habilidad numérica:</span>
                  <span className="font-normal">
                    {" "}
                    Capacidad de raciocinio y cálculo numérico para resolver
                    problemas aritméticos.
                  </span>
                </li>
                <li>
                  <span>3. Razonamiento:</span>
                  <span className="font-normal">
                    {" "}
                    Capacidad para discriminar entre conceptos y encontrar
                    relaciones verbales y numéricas.
                  </span>
                </li>
                <li>
                  <span>4. Vocabulario:</span>
                  <span className="font-normal">
                    {" "}
                    Bagaje verbal y capacidad de identificación de sinónimos.
                  </span>
                </li>
                <li>
                  <span>5. Área espacial:</span>
                  <span className="font-normal">
                    {" "}
                    Capacidad para ubicarse en el espacio y manipular imágenes
                    de manera mental.
                  </span>
                </li>
              </ol>
            </div>
          )}
          {vocationalTestReport.ieppoTestResult && (
            <div>
              <h3 className="font-bold text-xl dark:text-white my-4 print:my-1 print:text-base dark:print:text-black">
                &gt;Tipificación vocacional (Estilo personal y preferencia
                ocupacional)
              </h3>
              <ol className="space-y-2 print:space-y-0 text-lg print:text-sm lg:text-xl font-bold text-gray-900 dark:text-white text-justify dark:print:text-black">
                <li>
                  <span>1. Tipo Liderazgo: </span>
                  <span className="font-normal">
                    Caracteriza a personas dominantes, ambiciosas y seguras de
                    sí mismas. Se interesan comúnmente por actividades que
                    impliquen un rol directivo y de manejo de personas. Por
                    ello, suelen tener habilidades para organizar y dirigir a
                    personas, así como capacidad de persuasión y de
                    concertación.
                  </span>
                </li>
                <li>
                  <span>2. Tipo Técnico - mecánico: </span>
                  <span className="font-normal">
                    Caracteriza a personas con interés en actividades
                    relacionadas a la manipulación de objetos, instrumentos,
                    máquinas, etc. Suele tener habilidades manuales y mecánicas,
                    así como destreza física.
                  </span>
                </li>
                <li>
                  <span>3. Tipo Social: </span>
                  <span className="font-normal">
                    Caracteriza a personas cooperativas, serviciales y
                    sociables. Muestran comúnmente interés en actividades que
                    involucren educar, curar o servir a otras personas. Por
                    ello, usualmente poseen habilidades para ejercer un rol
                    instructivo, de apoyo o atención a otras personas.
                  </span>
                </li>

                <li>
                  <span>4. Tipo Organizado: </span>
                  <span className="font-normal">
                    Suelen ser organizados y mantienen un orden y planificación
                    en sus acciones. Por ello, se muestran interesados en
                    actividades que implican organizar sistemáticamente datos,
                    materiales, documentos, etc. Suelen tener una alta capacidad
                    de organización y eficiencia.
                  </span>
                </li>
                <li>
                  <span>5. Tipo Artístico: </span>
                  <span className="font-normal">
                    Caracteriza a personas creativas y originales. Suelen
                    mostrar interés por actividades que involucran la creación e
                    imaginación. Comúnmente las personas de este tipo poseen
                    habilidades artísticas ya sea en la música, en la pintura o
                    en otras expresiones artísticas.
                  </span>
                </li>
                <li>
                  <span>6. Tipo Investigativo: </span>
                  <span className="font-normal">
                    Caracteriza a personas intelectuales, metódicas y curiosas.
                    Suelen interesarse por actividades que involucran el recojo
                    sistemático y el análisis de información, así como en la
                    comprensión de fenómenos naturales y/o sociales. Las
                    personas de este tipo comúnmente tienen capacidad de
                    observación, análisis y de aprendizaje constante.
                  </span>
                </li>
                <li>
                  <span>7. Tipo Emprendedor: </span>
                  <span className="font-normal">
                    Las personas de este tipo tienen interés en actividades que
                    implican tomar la iniciativa, iniciar nuevas empresas y/o
                    negocios. Por ello, tienen capacidades para vender,
                    publicitar productos y negociar.
                  </span>
                </li>
              </ol>
            </div>
          )}
          {vocationalTestReport.tepeTestResult && (
            <div>
              <h3 className="font-bold text-xl dark:text-white my-4 print:my-1 print:text-base dark:print:text-black">
                &gt;Potencial Empresarial
              </h3>
              <ol className="space-y-2 print:space-y-0 text-lg print:text-sm lg:text-xl font-bold text-gray-900 dark:text-white text-justify dark:print:text-black">
                <li>
                  <span>1. Potencial empresarial muy elevado:</span>
                  <span className="font-normal">
                    {" "}
                    El perfil del candidato es similar al del pequeño empresario
                    urbano exitoso. La probabilidad de crear un negocio y de
                    hacerlo crecer es muy elevada.
                  </span>
                </li>
                <li>
                  <span>2. Potencial empresarial elevado:</span>
                  <span className="font-normal">
                    {" "}
                    El perfil del candidato es bastante similar al del pequeño
                    empresario urbano exitoso. La probabilidad de crear un
                    negocio y de hacerlo crecer es elevada.
                  </span>
                </li>
                <li>
                  <span>3. Potencial empresarial por desarrollar:</span>
                  <span className="font-normal">
                    <br />
                    <b>3.1. Potencial empresarial relativo:</b> El perfil del
                    candidato no es muy similar al del pequeño empresario urbano
                    exitoso y si bien tiene aspectos favorables al
                    emprendimiento tambien los tiene en contra. La probabilidad
                    de crear un negocio y de hacerlo crecer es relativa.
                    <br />
                    <b>3.2. Potencial empresarial bajo:</b> El perfil del
                    candidato no se asemeja al del pequeño empresario urbano
                    exitoso. La probabilidad de crear un negocio y de hacerlo es
                    baja.
                  </span>
                </li>
              </ol>
            </div>
          )}
          <h2 className="font-bold text-xl dark:text-white my-4 underline print:my-1 print:text-base dark:print:text-black">
            II- RESULTADOS
          </h2>
          {vocationalTestReport.phbTestResult && (
            <div>
              <h3 className="font-bold text-xl dark:text-white my-4 print:my-1 print:text-base dark:print:text-black">
                &gt;Habilidades básicas
              </h3>

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 dark:print:text-black">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-3 sm:px-6 py-3">
                        Nº
                      </th>
                      <th scope="col" className="px-3 sm:px-6 py-3">
                        Área
                      </th>
                      <th scope="col" className="px-3 sm:px-6 py-3">
                        Nivel de habilidad
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span className="font-medium text-gray-900 dark:text-white">
                          1
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">Atención</td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span
                          className={`font-medium ${
                            vocationalTestReport.phbTestResult.attentionSkills
                              .skillLevel == "BAJO"
                              ? "text-red-600"
                              : vocationalTestReport.phbTestResult
                                  .attentionSkills.skillLevel === "MEDIO"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        >
                          {
                            vocationalTestReport.phbTestResult.attentionSkills
                              .skillLevel
                          }
                        </span>
                      </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span className="font-medium text-gray-900 dark:text-white">
                          2
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        Habilidad numérica
                      </td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span
                          className={`font-medium ${
                            vocationalTestReport.phbTestResult.numericalSkills
                              .skillLevel == "BAJO"
                              ? "text-red-600"
                              : vocationalTestReport.phbTestResult
                                  .numericalSkills.skillLevel === "MEDIO"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        >
                          {
                            vocationalTestReport.phbTestResult.numericalSkills
                              .skillLevel
                          }
                        </span>
                      </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span className="font-medium text-gray-900 dark:text-white">
                          3
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">Razonamiento</td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span
                          className={`font-medium ${
                            vocationalTestReport.phbTestResult.reasoningSkills
                              .skillLevel == "BAJO"
                              ? "text-red-600"
                              : vocationalTestReport.phbTestResult
                                  .reasoningSkills.skillLevel === "MEDIO"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        >
                          {
                            vocationalTestReport.phbTestResult.reasoningSkills
                              .skillLevel
                          }
                        </span>
                      </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span className="font-medium text-gray-900 dark:text-white">
                          4
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">Vocabulario</td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span
                          className={`font-medium ${
                            vocationalTestReport.phbTestResult.vocabularySkills
                              .skillLevel == "BAJO"
                              ? "text-red-600"
                              : vocationalTestReport.phbTestResult
                                  .vocabularySkills.skillLevel === "MEDIO"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        >
                          {
                            vocationalTestReport.phbTestResult.vocabularySkills
                              .skillLevel
                          }
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span className="font-medium text-gray-900 dark:text-white">
                          5
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">Área espacial</td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span
                          className={`font-medium ${
                            vocationalTestReport.phbTestResult.spatialSkills
                              .skillLevel == "BAJO"
                              ? "text-red-600"
                              : vocationalTestReport.phbTestResult.spatialSkills
                                  .skillLevel === "MEDIO"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        >
                          {
                            vocationalTestReport.phbTestResult.spatialSkills
                              .skillLevel
                          }
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {vocationalTestReport.ieppoTestResult && (
            <div>
              <h3 className="font-bold text-xl dark:text-white my-4 print:my-1 print:text-base dark:print:text-black">
                &gt;Tipificación vocacional (Estilo personal y preferencia
                ocupacional)
              </h3>

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 dark:print:text-black">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-3 sm:px-6 py-3">
                        Nº
                      </th>
                      <th scope="col" className="px-3 sm:px-6 py-3">
                        Tipos vocacionales
                      </th>
                      <th scope="col" className="px-3 sm:px-6 py-3">
                        Nivel de correspondencia
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span className="font-medium text-gray-900 dark:text-white">
                          1
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">Liderazgo</td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span
                          className={`font-medium ${
                            vocationalTestReport.ieppoTestResult.leaderShip
                              .correspondenceLevel == "BAJO"
                              ? "text-red-600"
                              : vocationalTestReport.ieppoTestResult.leaderShip
                                  .correspondenceLevel === "MEDIO"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        >
                          {
                            vocationalTestReport.ieppoTestResult.leaderShip
                              .correspondenceLevel
                          }
                        </span>
                      </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span className="font-medium text-gray-900 dark:text-white">
                          2
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">Técnico-Mecánico</td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span
                          className={`font-medium ${
                            vocationalTestReport.ieppoTestResult
                              .mechanicalTechnician.correspondenceLevel ==
                            "BAJO"
                              ? "text-red-600"
                              : vocationalTestReport.ieppoTestResult
                                  .mechanicalTechnician.correspondenceLevel ===
                                "MEDIO"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        >
                          {
                            vocationalTestReport.ieppoTestResult
                              .mechanicalTechnician.correspondenceLevel
                          }
                        </span>
                      </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span className="font-medium text-gray-900 dark:text-white">
                          3
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">Social</td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span
                          className={`font-medium ${
                            vocationalTestReport.ieppoTestResult.social
                              .correspondenceLevel == "BAJO"
                              ? "text-red-600"
                              : vocationalTestReport.ieppoTestResult.social
                                  .correspondenceLevel === "MEDIO"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        >
                          {
                            vocationalTestReport.ieppoTestResult.social
                              .correspondenceLevel
                          }
                        </span>
                      </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span className="font-medium text-gray-900 dark:text-white">
                          4
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">Organizado</td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span
                          className={`font-medium ${
                            vocationalTestReport.ieppoTestResult.organized
                              .correspondenceLevel == "BAJO"
                              ? "text-red-600"
                              : vocationalTestReport.ieppoTestResult.organized
                                  .correspondenceLevel === "MEDIO"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        >
                          {
                            vocationalTestReport.ieppoTestResult.organized
                              .correspondenceLevel
                          }
                        </span>
                      </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span className="font-medium text-gray-900 dark:text-white">
                          5
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">Artístico</td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span
                          className={`font-medium ${
                            vocationalTestReport.ieppoTestResult.artistic
                              .correspondenceLevel == "BAJO"
                              ? "text-red-600"
                              : vocationalTestReport.ieppoTestResult.artistic
                                  .correspondenceLevel === "MEDIO"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        >
                          {
                            vocationalTestReport.ieppoTestResult.artistic
                              .correspondenceLevel
                          }
                        </span>
                      </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span className="font-medium text-gray-900 dark:text-white">
                          6
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">Emprendimiento</td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span
                          className={`font-medium ${
                            vocationalTestReport.ieppoTestResult.entrepreneur
                              .correspondenceLevel == "BAJO"
                              ? "text-red-600"
                              : vocationalTestReport.ieppoTestResult
                                  .entrepreneur.correspondenceLevel === "MEDIO"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        >
                          {
                            vocationalTestReport.ieppoTestResult.entrepreneur
                              .correspondenceLevel
                          }
                        </span>
                      </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span className="font-medium text-gray-900 dark:text-white">
                          7
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">Investigación</td>
                      <td className="px-3 sm:px-6 py-2 print:py-0">
                        <span
                          className={`font-medium ${
                            vocationalTestReport.ieppoTestResult.investigative
                              .correspondenceLevel == "BAJO"
                              ? "text-red-600"
                              : vocationalTestReport.ieppoTestResult
                                  .investigative.correspondenceLevel === "MEDIO"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        >
                          {
                            vocationalTestReport.ieppoTestResult.investigative
                              .correspondenceLevel
                          }
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {vocationalTestReport.tepeTestResult && (
            <div>
              <h3 className="font-bold text-xl dark:text-white my-4 print:my-1 print:text-base dark:print:text-black">
                &gt;Potencial Empresarial
              </h3>
              <div className="w-full rounded-lg shadow dark:border dark:border-gray-700 dark:text-white text-center py-2 dark:print:text-black print:text-sm">
                {vocationalTestReport.tepeTestResult.result}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-bold text-xl dark:text-white my-4 print:my-1 print:text-base dark:print:text-black">
              &gt;Obs:
            </h3>
            <div className="w-full rounded-lg shadow dark:border dark:border-gray-700 text-center py-2 dark:text-white dark:print:text-black print:text-sm">
              {vocationalTestReport?.observations
                ? vocationalTestReport.observations
                : null}
            </div>
          </div>
          <h2 className="font-bold text-xl dark:text-white my-4 underline print:my-1 print:text-base dark:print:text-black">
            III. RECOMENDACIONES
          </h2>
          {vocationalTestReport.ieppoTestResult && (
            <div className="w-full rounded-lg shadow dark:border dark:border-gray-700 text-center py-4 dark:text-white dark:print:text-black print:text-sm">
              De acuerdo a los resultados obtenidos podemos mencionar que el
              alumno puede desarrollar sus habilidades dentro de los tipos
              vocacionales{" "}
              <b>
                {vocationalTestReport?.vocationalTypes?.vocationalTypes1 ==
                "leaderShip"
                  ? "Liderazgo"
                  : vocationalTestReport?.vocationalTypes?.vocationalTypes1 ==
                    "mechanicalTechnician"
                  ? "Técnico - mecánico"
                  : vocationalTestReport?.vocationalTypes?.vocationalTypes1 ==
                    "social"
                  ? "Social"
                  : vocationalTestReport?.vocationalTypes?.vocationalTypes1 ==
                    "organized"
                  ? "Organizado"
                  : vocationalTestReport?.vocationalTypes?.vocationalTypes1 ==
                    "artistic"
                  ? "Artístico"
                  : vocationalTestReport?.vocationalTypes?.vocationalTypes1 ==
                    "entrepreneur"
                  ? "Emprendedor"
                  : vocationalTestReport?.vocationalTypes?.vocationalTypes1 ==
                    "investigative"
                  ? "Investigativo"
                  : ""}{" "}
              </b>
              y{" "}
              <b>
                {vocationalTestReport?.vocationalTypes?.vocationalTypes2 ==
                "leaderShip"
                  ? "Liderazgo"
                  : vocationalTestReport?.vocationalTypes?.vocationalTypes2 ==
                    "mechanicalTechnician"
                  ? "Técnico - mecánico"
                  : vocationalTestReport?.vocationalTypes?.vocationalTypes2 ==
                    "social"
                  ? "Social"
                  : vocationalTestReport?.vocationalTypes?.vocationalTypes2 ==
                    "organized"
                  ? "Organizado"
                  : vocationalTestReport?.vocationalTypes?.vocationalTypes2 ==
                    "artistic"
                  ? "Artístico"
                  : vocationalTestReport?.vocationalTypes?.vocationalTypes2 ==
                    "entrepreneur"
                  ? "Emprendedor"
                  : vocationalTestReport?.vocationalTypes?.vocationalTypes2 ==
                    "investigative"
                  ? "Investigativo"
                  : ""}
              </b>
              {". "}
              {vocationalTestReport?.careersOption ? (
                "Dentro de las carreras opcionales como primera opción " +
                vocationalTestReport?.careersOption?.careersOption1 +
                " y " +
                vocationalTestReport?.careersOption?.careersOption2 +
                "."
              ) : (
                <>
                  <span>
                    Los resultados preliminares se presentan a continuación:
                  </span>
                  <div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 dark:print:text-black">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-3 sm:px-6 py-3">
                            Tipo vocacional
                          </th>
                          <th scope="col" className="px-3 sm:px-6 py-3">
                            Carreras preliminares
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                          <td className="px-3 sm:px-6 py-2 print:py-0">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {vocationalTestReport?.vocationalTypes
                                ?.vocationalTypes1 == "leaderShip"
                                ? "Liderazgo"
                                : vocationalTestReport?.vocationalTypes
                                    ?.vocationalTypes1 == "mechanicalTechnician"
                                ? "Técnico - mecánico"
                                : vocationalTestReport?.vocationalTypes
                                    ?.vocationalTypes1 == "social"
                                ? "Social"
                                : vocationalTestReport?.vocationalTypes
                                    ?.vocationalTypes1 == "organized"
                                ? "Organizado"
                                : vocationalTestReport?.vocationalTypes
                                    ?.vocationalTypes1 == "artistic"
                                ? "Artístico"
                                : vocationalTestReport?.vocationalTypes
                                    ?.vocationalTypes1 == "entrepreneur"
                                ? "Emprendedor"
                                : vocationalTestReport?.vocationalTypes
                                    ?.vocationalTypes1 == "investigative"
                                ? "Investigativo"
                                : ""}{" "}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-2 print:py-0">
                            <div>
                              {carreras_por_tipos_vocacionales[
                                vocationalTestReport?.vocationalTypes
                                  ?.vocationalTypes1
                              ].map((career, index) => (
                                <div key={index} className="columna">
                                  <span>{career}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                          <td className="px-3 sm:px-6 py-2 print:py-0">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {vocationalTestReport?.vocationalTypes
                                ?.vocationalTypes2 == "leaderShip"
                                ? "Liderazgo"
                                : vocationalTestReport?.vocationalTypes
                                    ?.vocationalTypes2 == "mechanicalTechnician"
                                ? "Técnico - mecánico"
                                : vocationalTestReport?.vocationalTypes
                                    ?.vocationalTypes2 == "social"
                                ? "Social"
                                : vocationalTestReport?.vocationalTypes
                                    ?.vocationalTypes2 == "organized"
                                ? "Organizado"
                                : vocationalTestReport?.vocationalTypes
                                    ?.vocationalTypes2 == "artistic"
                                ? "Artístico"
                                : vocationalTestReport?.vocationalTypes
                                    ?.vocationalTypes2 == "entrepreneur"
                                ? "Emprendedor"
                                : vocationalTestReport?.vocationalTypes
                                    ?.vocationalTypes2 == "investigative"
                                ? "Investigativo"
                                : ""}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-2 print:py-0">
                            <div>
                              {carreras_por_tipos_vocacionales[
                                vocationalTestReport?.vocationalTypes
                                  ?.vocationalTypes2
                              ].map((career, index) => (
                                <div key={index} className="columna">
                                  <span>{career}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}
          <div className="w-full text-center">
            <img
              src={
                vocationalTestReport?.evaluator?.signature?.secure_url
                  ? vocationalTestReport.evaluator.signature.secure_url
                  : null
              }
              className="mx-auto w-60"
            />
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="flex mx-auto justify-center w-1/2 md:w-1/4 items-center text-center text-white bg-blue-700 p-2 rounded-2xl font-bold text-2xl mt-5 print:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
            />
          </svg>
          Imprimir
        </button>
      </section>
    </div>
  );
};

export default FinalVocationalTestReport;
