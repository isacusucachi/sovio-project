import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {
  getVocationalTestReportRequest,
  evaluateVocationalTestReportRequest,
} from "../../services/vocationalTest";
import { carrerasPorTiposVocacionales } from "../../data/carrerasPorTiposVocacionales";
import Button from "../../components/ui/button/Button";
import { ArrowLeftIcon, ArrowRightIcon, DocsIcon } from "../../icons";
import Label from "../../components/form/Label";
import TextArea from "../../components/form/input/TextArea";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Loader from "../../components/common/Loader";
import { EvaluateVocationalTestData } from "../../types/VocationalTypes";
interface VocationalTestReport {
  fullname: string;
  dni: string;
  age: string;
  gender: string;
  height: string;
  evaluationDate: string;
  educationalService: string;
  personalInformation: Record<string, any>;
  ieppoTestResult: Record<string, any>;
  phbTestResult: Record<string, any>;
  tepeTestResult: Record<string, any>;
  vocationalTypes: {
    vocationalTypes1: string;
    vocationalTypes2: string;
  };
  careersOption: {
    careersOption1: string;
    careersOption2: string;
  };
  observations: string;
}

const skillLabels: Record<string, string> = {
  attentionSkills: "Atención",
  numericalSkills: "Habilidad numérica",
  reasoningSkills: "Razonamiento",
  vocabularySkills: "Vocabulario",
  spatialSkills: "Área espacial",
};

const vocationalLabels: Record<string, string> = {
  leaderShip: "Liderazgo",
  mechanicalTechnician: "Técnico-Mecánico",
  social: "Social",
  organized: "Organizado",
  artistic: "Artístico",
  entrepreneur: "Emprendimiento",
  investigative: "Investigación",
};

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

const VocationalTestReport: React.FC = () => {
  const [evaluation, setEvaluation] = useState<EvaluateVocationalTestData>({
    observations: "",
    vocationalTypes1: "",
    vocationalTypes2: "",
    careersOption1: "",
    careersOption2: "",
  });

  const [vocationalTestReport, setVocationalTestReport] =
    useState<VocationalTestReport | null>(null);

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [showPersonalInformation, setShowPersonalInformation] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleEvaluationChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEvaluation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await evaluateVocationalTestReportRequest(
        params.id!,
        evaluation
      );
      if (res) {
        navigate(-1);
      }
    } catch (error: any) {
      setErrors([error.message]);
    } finally {
    }
  };

  useEffect(() => {
    setLoading(true);
    getVocationalTestReportRequest(params.id!)
      .then((response) => {
        setVocationalTestReport(response.data);
        setEvaluation((prevState) => ({
          ...prevState,
          vocationalTypes1:
            response.data?.vocationalTypes?.vocationalTypes1 || "",
          vocationalTypes2:
            response.data?.vocationalTypes?.vocationalTypes2 || "",
        }));
      })
      .catch((error) => setErrors([error.message]));
    setLoading(false);
  }, [params.id]);
  
  if (loading) return <Loader />;
  return (
    <div>
      <PageMeta
        title="Reporte | Sovio Cusco Admin Dashboard"
        description="Esta es una página para mostrar el reporte individual de cada estudiante - Sovio Cusco Admin Dashboard"
      />
      <PageBreadcrumb pageTitle="Reporte" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full">
          <div className="md:flex justify-between mb-6">
            <Button
              size="sm"
              variant="primary"
              startIcon={<ArrowLeftIcon className="size-5" />}
              onClick={() => navigate(-1)}
            >
              Volver
            </Button>
            <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
              INFORME CONFIDENCIAL SOVIO
            </h3>
            <Button
              size="sm"
              variant="primary"
              startIcon={<DocsIcon className="size-5" />}
              onClick={() => setShowPersonalInformation((prev) => !prev)}
            >
              {showPersonalInformation ? "Ocultar Ficha" : "Ver Ficha"}
            </Button>
          </div>
          <form onSubmit={handleSubmitEvaluation} className="h-full space-y-6">
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6 underline">
                    I. Información Personal
                  </h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Nombres
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {vocationalTestReport?.fullname}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        DNI
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {vocationalTestReport?.dni}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Edad
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {vocationalTestReport?.age}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Genero
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {vocationalTestReport?.gender}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Estatura
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {vocationalTestReport?.height}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Fecha de Evaluación
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {vocationalTestReport?.evaluationDate}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Institución Educativa
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {vocationalTestReport?.educationalService}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showPersonalInformation &&
              vocationalTestReport?.personalInformation && (
                <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h3 className="text-lg text-center font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                        FICHA DE INFORMACIÓN PERSONAL
                      </h3>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 my-4 lg:mb-6 underline">
                        II. Estado Físico
                      </h4>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            ¿Tiene alguna limitación o discapacidad?
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {vocationalTestReport.personalInformation.disability
                              ? "Sí"
                              : "No"}
                          </p>
                        </div>
                        {vocationalTestReport.personalInformation
                          .disability && (
                          <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                              Tipo de discapacidad
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                              {
                                vocationalTestReport.personalInformation
                                  .typeOfDisability
                              }
                            </p>
                          </div>
                        )}

                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            ¿Practica algún deporte?
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {vocationalTestReport.personalInformation
                              .practiceSport
                              ? "Sí"
                              : "No"}
                          </p>
                        </div>
                        {vocationalTestReport.personalInformation
                          .practiceSport && (
                          <>
                            <div>
                              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                Deporte
                              </p>
                              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                {vocationalTestReport.personalInformation.sport}
                              </p>
                            </div>

                            <div>
                              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                Frecuencia
                              </p>
                              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                {
                                  vocationalTestReport.personalInformation
                                    .amountSportPractice
                                }
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 my-4 lg:my-6 underline">
                        III. Situación Academica
                      </h4>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Último nivel alcanzado
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {
                              vocationalTestReport.personalInformation
                                .academicLevel
                            }
                          </p>
                        </div>

                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Ciclo / Grado
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {vocationalTestReport.personalInformation.cycle}
                          </p>
                        </div>

                        {vocationalTestReport.personalInformation
                          .academicLevel === "Superior" && (
                          <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                              Especialidad
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                              {
                                vocationalTestReport.personalInformation
                                  .specialty
                              }
                            </p>
                          </div>
                        )}

                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Institución educativa
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {
                              vocationalTestReport.personalInformation
                                .institutionName
                            }
                          </p>
                        </div>

                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Tipo de institución
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {
                              vocationalTestReport.personalInformation
                                .typeOfInstitution
                            }
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 my-4">
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Enumeración del 1 al 9 de las áreas académicas en
                            que más destacaba en la secundaria
                          </p>
                          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                            <div className="max-w-full overflow-x-auto">
                              <div className="">
                                <Table>
                                  {/* Table Body */}
                                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                    {courseListOrder.map((course) => (
                                      <TableRow key={course.value}>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                          {course.course}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                          {
                                            vocationalTestReport
                                              ?.personalInformation
                                              ?.masteredCoursesList[
                                              course.value
                                            ]
                                          }
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Enumeración del 1 al 9 de las áreas académicas que
                            más gustaban en la secundaria
                          </p>
                          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                            <div className="max-w-full overflow-x-auto">
                              <div className="">
                                <Table>
                                  {/* Table Body */}
                                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                    {courseListOrder.map((course) => (
                                      <TableRow key={course.value}>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                          {course.course}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                          {
                                            vocationalTestReport
                                              ?.personalInformation
                                              ?.likedCoursesList[course.value]
                                          }
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            ¿Toca un instrumento?
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {vocationalTestReport?.personalInformation
                              ?.playInstrument === true
                              ? "Sí"
                              : "No"}
                          </p>
                        </div>

                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            ¿Lee pentagrama?
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {vocationalTestReport?.personalInformation
                              ?.readPentagram === true
                              ? "Sí"
                              : "No"}
                          </p>
                        </div>

                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            ¿Compone canciones?
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {vocationalTestReport?.personalInformation
                              ?.composeSongs === true
                              ? "Sí"
                              : "No"}
                          </p>
                        </div>

                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            ¿Pertenece a un taller de teatro?
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {vocationalTestReport?.personalInformation
                              ?.doTheater === true
                              ? "Sí"
                              : "No"}
                          </p>
                        </div>

                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            ¿Pinta cuadros, oleos a carbón?
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {vocationalTestReport?.personalInformation
                              ?.paintPictures === true
                              ? "Sí"
                              : "No"}
                          </p>
                        </div>

                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            ¿Pertenece a un taller de danzas?
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {vocationalTestReport?.personalInformation
                              ?.doDance === true
                              ? "Sí"
                              : "No"}
                          </p>
                        </div>

                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            ¿Hizo servicio militar?
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {vocationalTestReport?.personalInformation
                              ?.didMilitaryService === true
                              ? "Sí"
                              : "No"}
                          </p>
                        </div>
                        {vocationalTestReport.personalInformation.otherSkills !=
                          "" && (
                          <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                              Otras habilidades / Aptitudes / Pasatiempos
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                              {
                                vocationalTestReport?.personalInformation
                                  ?.otherSkills
                              }
                            </p>
                          </div>
                        )}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 my-4 lg:my-6 underline">
                        IV. Futuro Formativo
                      </h4>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            ¿Tiene una carrera en mente?
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {vocationalTestReport.personalInformation
                              .futureCareer
                              ? "Sí"
                              : "No"}
                          </p>
                        </div>

                        {vocationalTestReport.personalInformation
                          .futureCareer && (
                          <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                              Sus opciones
                            </p>

                            <ul className="text-sm font-medium list-inside list-disc text-gray-800 dark:text-white/90">
                              <li>
                                {
                                  vocationalTestReport.personalInformation
                                    .career1
                                }
                              </li>
                              <li>
                                {
                                  vocationalTestReport.personalInformation
                                    .career2
                                }
                              </li>
                              <li>
                                {
                                  vocationalTestReport.personalInformation
                                    .career3
                                }
                              </li>
                            </ul>
                          </div>
                        )}

                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Nivel de estudios que puede financiar
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {
                              vocationalTestReport.personalInformation
                                .levelOfStudiesCanBeFinanced
                            }
                          </p>
                        </div>

                        <div>
                          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                            Tipo de institución
                          </p>
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {
                              vocationalTestReport.personalInformation
                                .typeOfInstitutionCanBeFinanced
                            }
                          </p>
                        </div>

                        {vocationalTestReport.personalInformation
                          .ocupationNeverWork != "" && (
                          <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                              Ocupaciones que NO aceptaría
                            </p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                              {
                                vocationalTestReport.personalInformation
                                  .ocupationNeverWork
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            {/* Resultados */}
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="w-full">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6 underline">
                    V. Resultados
                  </h4>
                  {Object.keys(vocationalTestReport?.phbTestResult || {})
                    .length !== 0 && (
                    <div className="mb-4">
                      <p className="mb-2 text-base leading-normal text-gray-500 dark:text-gray-400">
                        &#10148; Habilidades básicas
                      </p>
                      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                        <div className="max-w-full overflow-x-auto">
                          <div className="">
                            <Table>
                              {/*Table Header*/}
                              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                  <TableCell
                                    isHeader
                                    className="px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                                  >
                                    Nº
                                  </TableCell>
                                  <TableCell
                                    isHeader
                                    className="px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                                  >
                                    Área
                                  </TableCell>
                                  <TableCell
                                    isHeader
                                    className="px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                                  >
                                    Puntaje Directo Total (PD)
                                  </TableCell>
                                  <TableCell
                                    isHeader
                                    className="px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                                  >
                                    Puntaje T (Baremos)
                                  </TableCell>
                                  <TableCell
                                    isHeader
                                    className="px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                                  >
                                    Nivel de habilidad
                                  </TableCell>
                                </TableRow>
                              </TableHeader>
                              {/* Table Body */}
                              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {Object.entries(skillLabels).map(
                                  ([key, label], index) => (
                                    <TableRow key={key}>
                                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {index + 1}
                                      </TableCell>
                                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {label}
                                      </TableCell>
                                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {vocationalTestReport?.phbTestResult[
                                          key
                                        ].directScore ?? 0}
                                      </TableCell>
                                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {vocationalTestReport?.phbTestResult[
                                          key
                                        ].baremosScore ?? 0}
                                      </TableCell>
                                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {vocationalTestReport?.phbTestResult[
                                          key
                                        ].skillLevel ?? 0}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {Object.keys(vocationalTestReport?.ieppoTestResult || {})
                    .length !== 0 && (
                    <div className="my-4">
                      <p className="mb-2 text-base leading-normal text-gray-500 dark:text-gray-400">
                        &#10148; Tipificación vocacional (Estilo personal y
                        preferencia ocupacional)
                      </p>
                      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                        <div className="max-w-full overflow-x-auto">
                          <div className="">
                            <Table>
                              {/*Table Header*/}
                              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                  <TableCell
                                    isHeader
                                    className="px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                                  >
                                    Nº
                                  </TableCell>
                                  <TableCell
                                    isHeader
                                    className="px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                                  >
                                    Tipos Vocacionales
                                  </TableCell>
                                  <TableCell
                                    isHeader
                                    className="px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                                  >
                                    Suma Estilos Personales
                                  </TableCell>
                                  <TableCell
                                    isHeader
                                    className="px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                                  >
                                    Suma Actividades Preferencias
                                  </TableCell>
                                  <TableCell
                                    isHeader
                                    className="px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                                  >
                                    Suma Percepción de Habilidades
                                  </TableCell>
                                  <TableCell
                                    isHeader
                                    className="px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                                  >
                                    Suma Total
                                  </TableCell>

                                  <TableCell
                                    isHeader
                                    className="px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                                  >
                                    Baremos Final
                                  </TableCell>
                                  <TableCell
                                    isHeader
                                    className="px-5 py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                                  >
                                    Nivel de correspondencia
                                  </TableCell>
                                </TableRow>
                              </TableHeader>
                              {/* Table Body */}
                              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {Object.entries(vocationalLabels).map(
                                  ([key, label], index) => (
                                    <TableRow key={key}>
                                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {index + 1}
                                      </TableCell>
                                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {label}
                                      </TableCell>
                                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {vocationalTestReport?.ieppoTestResult[
                                          key
                                        ].personalStylesScore ?? 0}
                                      </TableCell>
                                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {vocationalTestReport?.ieppoTestResult[
                                          key
                                        ].preferredActivitiesScore ?? 0}
                                      </TableCell>
                                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {vocationalTestReport?.ieppoTestResult[
                                          key
                                        ].perceptionOfAbilityScore ?? 0}
                                      </TableCell>

                                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {vocationalTestReport?.ieppoTestResult[
                                          key
                                        ].totalScore ?? 0}
                                      </TableCell>
                                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {vocationalTestReport?.ieppoTestResult[
                                          key
                                        ].finalBaremosValue ?? 0}
                                      </TableCell>
                                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {vocationalTestReport?.ieppoTestResult[
                                          key
                                        ].correspondenceLevel ?? 0}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {Object.keys(vocationalTestReport?.tepeTestResult || {})
                    .length !== 0 && (
                    <div>
                      <p className="mb-2 text-base leading-normal text-gray-500 dark:text-gray-400">
                        &#10148; Potencial Empresarial
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {vocationalTestReport?.tepeTestResult.result}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Evaluación */}
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="w-full">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6 underline">
                    VI. Recomendaciones
                  </h4>
                  <div className="w-full">
                    <Label>Observaciones:</Label>
                    <TextArea
                      className="w-full"
                      value={evaluation.observations}
                      onChange={() => handleEvaluationChange}
                      rows={2}
                      placeholder="Ingrese aqui sus observaciones"
                    />
                  </div>
                  <div className="w-full">
                    <Label>Tipos Vocacionales:</Label>
                    <div className="flex gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <select
                        name="vocationalTypes1"
                        value={evaluation.vocationalTypes1}
                        onChange={handleEvaluationChange}
                        className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        required
                        disabled
                      >
                        <option
                          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                          value={""}
                          disabled
                        >
                          Selecione una opción...
                        </option>
                        {carrerasPorTiposVocacionales.map((category) => (
                          <option
                            className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                            key={category.key}
                            value={category.key}
                          >
                            {category.label}
                          </option>
                        ))}
                      </select>

                      <select
                        name="vocationalTypes2"
                        value={evaluation.vocationalTypes2}
                        onChange={handleEvaluationChange}
                        className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        required
                        disabled
                      >
                        <option
                          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                          value={""}
                          disabled
                        >
                          Selecione una opción...
                        </option>
                        {carrerasPorTiposVocacionales.map((category) => (
                          <option
                            className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                            key={category.key}
                            value={category.key}
                          >
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Label>Carreras Recomendadas:</Label>
                    <div className="flex gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <select
                        name="careersOption1"
                        value={evaluation.careersOption1}
                        onChange={handleEvaluationChange}
                        className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        required
                      >
                        <option
                          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                          value={""}
                          disabled
                        >
                          Selecione una opción...
                        </option>
                        {carrerasPorTiposVocacionales
                          .find(
                            (cat) => cat.key === evaluation.vocationalTypes1
                          )
                          ?.careers.map((career) => (
                            <option
                              className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                              key={career}
                              value={career}
                            >
                              {career}
                            </option>
                          ))}
                      </select>

                      <select
                        name="careersOption2"
                        value={evaluation.careersOption2}
                        onChange={handleEvaluationChange}
                        className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        required
                      >
                        <option
                          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                          value={""}
                          disabled
                        >
                          Selecione una opción...
                        </option>
                        {carrerasPorTiposVocacionales
                          .find(
                            (cat) => cat.key === evaluation.vocationalTypes2
                          )
                          ?.careers.map((career) => (
                            <option
                              className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                              key={career}
                              value={career}
                            >
                              {career}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {errors.map((error, i) => (
              <p key={i} className="text-red-500">
                {error}
              </p>
            ))}
            <div className="flex w-full justify-center">
              <Button
                size="md"
                type="submit"
                variant="primary"
                endIcon={<ArrowRightIcon className="size-5" />}
              >
                Evaluar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VocationalTestReport;
