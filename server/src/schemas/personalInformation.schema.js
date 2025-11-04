import { z } from "zod";

const masteredCoursesListSchema = z.object({
  languageOrCommunication: z.string({
    required_error:
      "El orden de enumeración de cursos que más destacabas en la secundaria para el curso 'Lenguaje / Comunicación' es requerido.",
  }),
  foreignLanguage: z.string({
    required_error:
      "El orden de enumeración de cursos que más destacabas en la secundaria para el curso 'Idioma extranjero' es requerido.",
  }),
  math: z.string({
    required_error:
      "El orden de enumeración de cursos que más destacabas en la secundaria para el curso 'Matemáticas' es requerido.",
  }),
  scienceTechnologyEnvironmentOrBiology: z.string({
    required_error:
      "El orden de enumeración de cursos que más destacabas en la secundaria para el curso 'Ciencias, tecnología y ambiente / Biología' es requerido.",
  }),
  personFamilyHumanRelationships: z.string({
    required_error:
      "El orden de enumeración de cursos que más destacabas en la secundaria para el curso 'Persona familia y relaciones humanas' es requerido.",
  }),
  socialSciences: z.string({
    required_error:
      "El orden de enumeración de cursos que más destacabas en la secundaria para el curso 'Ciencias Sociales' es requerido.",
  }),
  physicalEducation: z.string({
    required_error:
      "El orden de enumeración de cursos que más destacabas en la secundaria para el curso 'Educación física' es requerido.",
  }),
  Art: z.string({
    required_error:
      "El orden de enumeración de cursos que más destacabas en la secundaria para el curso 'Arte' es requerido.",
  }),
  educationForWork: z.string({
    required_error:
      "El orden de enumeración de cursos que más destacabas en la secundaria para el curso 'Educación para el trabajo' es requerido.",
  }),
});

const likedCoursesListSchema = z.object({
  languageOrCommunication: z.string({
    required_error:
      "El orden de enumeración de cursos que más te gustaban en la secundaria para el curso 'Lenguaje / Comunicación' es requerido.",
  }),
  foreignLanguage: z.string({
    required_error:
      "El orden de enumeración de cursos que más te gustaban en la secundaria para el curso 'Idioma extranjero' es requerido.",
  }),
  math: z.string({
    required_error:
      "El orden de enumeración de cursos que más te gustaban en la secundaria para el curso 'Matemáticas' es requerido.",
  }),
  scienceTechnologyEnvironmentOrBiology: z.string({
    required_error:
      "El orden de enumeración de cursos que más te gustaban en la secundaria para el curso 'Ciencias, tecnología y ambiente / Biología' es requerido.",
  }),
  personFamilyHumanRelationships: z.string({
    required_error:
      "El orden de enumeración de cursos que más te gustaban en la secundaria para el curso 'Persona familia y relaciones humanas' es requerido.",
  }),
  socialSciences: z.string({
    required_error:
      "El orden de enumeración de cursos que más te gustaban en la secundaria para el curso 'Ciencias Sociales' es requerido.",
  }),
  physicalEducation: z.string({
    required_error:
      "El orden de enumeración de cursos que más te gustaban en la secundaria para el curso 'Educación física' es requerido.",
  }),
  Art: z.string({
    required_error:
      "El orden de enumeración de cursos que más te gustaban en la secundaria para el curso 'Arte' es requerido.",
  }),
  educationForWork: z.string({
    required_error:
      "El orden de enumeración de cursos que más te gustaban en la secundaria para el curso 'Educación para el trabajo' es requerido.",
  }),
});

export const personalInformationSchema = z.object({
  disability: z.boolean({
    required_error: "La afirmación a 'discapacidad' es requerida.",
  }),
  typeOfDisability: z.string().optional(),
  practiceSport: z.boolean({
    required_error: "La afirmación a 'practicar desportes' es requerida.",
  }),
  sport: z.string().optional(),
  amountSportPractice: z.string().optional(),
  academicLevel: z.string({
    required_error: "El nivel académico es requerido.",
  }),
  cycle: z.string({
    required_error: "El Grado / Sección / Ciclo es requerido.",
  }),
  specialty: z.string().optional(),
  institutionName: z.string({
    required_error: "El nombre de la institución educativa es requerido.",
  }),
  typeOfInstitution: z.string({
    required_error: "El tipo de institucion educativa es requerido.",
  }),
  masteredCoursesList: masteredCoursesListSchema,
  likedCoursesList: likedCoursesListSchema,
  playInstrument: z.boolean({
    required_error: "La afirmación a 'tocar instrumento' es requerida.",
  }),
  readPentagram: z.boolean({
    required_error: "La afirmación a 'leer pentagrama' es requerida.",
  }),
  composeSongs: z.boolean({
    required_error: "La afirmación a 'componer canciones' es requerida.",
  }),
  doTheater: z.boolean({
    required_error:
      "La afirmación a 'pertenecer a un taller de teatro' es requerida.",
  }),
  paintPictures: z.boolean({
    required_error: "La afirmación a 'pintar cuadros' es requerida.",
  }),
  doDance: z.boolean({
    required_error:
      "La afirmación a 'pertenecer a un taller de danzas' es requerida.",
  }),
  didMilitaryService: z.boolean({
    required_error: "La afirmación a 'hacer servico militar' es requerida.",
  }),
  otherSkills: z.string().optional(),
  futureCareer: z.boolean({
    required_error:
      "La afirmación a 'pensar en alguna especualidad/carrera a seguir' es requerida.",
  }),
  career1: z.string().optional(),
  career2: z.string().optional(),
  career3: z.string().optional(),
  levelOfStudiesCanBeFinanced: z.string({
    required_error: "El nivel de estudio que se puede financiar es requerida.",
  }),
  typeOfInstitutionCanBeFinanced: z.string({
    required_error: "El nivel de estudio que se puede financiar es requerida.",
  }),
  ocupationNeverWork: z.string().optional(),
});
