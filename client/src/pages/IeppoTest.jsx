import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useVocationalTests } from "../context/vocationalTestContext";
import { useUsers } from "../context/userContext";
import { useAuth } from "../context/authContext";
import questions from "../data/questions.json";
import { FaSave } from "react-icons/fa";

// ============================================
// IMPORTS PARA FICHA PERSONAL
// ============================================

const QUESTIONS_PER_PAGE = 5;

// ============================================
// CONFIGURACIÓN DE FASES
// ============================================

const PHASES = {
  LOADING: 'loading',
  FICHA: 'ficha',
  TEST: 'test',
  COMPLETED: 'completed'
};

// ============================================
// DATOS DE FICHA PERSONAL
// ============================================

const FICHA_STEPS = [
  {
    id: 1,
    title: "Estado Físico",
    icon: "💪",
    description: "Cuéntanos sobre tu salud y actividad física",
  },
  {
    id: 2,
    title: "Educación",
    icon: "📚",
    description: "Tu situación académica actual",
  },
  {
    id: 3,
    title: "Cursos Destacados",
    icon: "⭐",
    description: "Áreas donde más destacas",
  },
  {
    id: 4,
    title: "Cursos Favoritos",
    icon: "❤️",
    description: "Lo que más te gusta estudiar",
  },
  {
    id: 5,
    title: "Habilidades Artísticas",
    icon: "🎨",
    description: "Tus talentos creativos",
  },
  { 
    id: 6, 
    title: "Futuro", 
    icon: "🚀", 
    description: "Tus planes y metas" 
  },
];

const COURSE_LIST = [
  { course: "Lenguaje / Comunicación", value: "languageOrCommunication", emoji: "📝" },
  { course: "Idioma extranjero", value: "foreignLanguage", emoji: "🌍" },
  { course: "Matemáticas", value: "math", emoji: "🔢" },
  { course: "Ciencias, tecnología y ambiente", value: "scienceTechnologyEnvironmentOrBiology", emoji: "🔬" },
  { course: "Persona, familia y relaciones", value: "personFamilyHumanRelationships", emoji: "👨‍👩‍👧" },
  { course: "Ciencias Sociales", value: "socialSciences", emoji: "🏛️" },
  { course: "Educación física", value: "physicalEducation", emoji: "⚽" },
  { course: "Arte", value: "Art", emoji: "🎭" },
  { course: "Educación para el trabajo", value: "educationForWork", emoji: "💼" },
];

const SPORTS_LIST = [
  { value: "Fútbol", emoji: "⚽" },
  { value: "Voleibol", emoji: "🏐" },
  { value: "Tenis", emoji: "🎾" },
  { value: "Boxeo", emoji: "🥊" },
  { value: "Baloncesto", emoji: "🏀" },
  { value: "Natación", emoji: "🏊" },
  { value: "Surf", emoji: "🏄" },
  { value: "Ciclismo", emoji: "🚴" },
  { value: "Senderismo", emoji: "🥾" },
  { value: "Otro", emoji: "🎯" },
];

const DISABILITY_TYPES = [
  { value: "Visual", emoji: "👁️" },
  { value: "Motora", emoji: "🦿" },
  { value: "Auditiva", emoji: "👂" },
  { value: "Del habla", emoji: "🗣️" },
  { value: "Otro", emoji: "📋" },
];

const FREQUENCY_OPTIONS = [
  { value: "Diario", label: "Diario", emoji: "📅" },
  { value: "3 veces por semana", label: "3x/semana", emoji: "🗓️" },
  { value: "1 vez por semana", label: "1x/semana", emoji: "📆" },
  { value: "2 veces al mes", label: "2x/mes", emoji: "🌙" },
  { value: "Pocas veces", label: "Ocasional", emoji: "✨" },
];

const INITIAL_FICHA_STATE = {
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
};

// ============================================
// CONFIGURACIÓN TEST IEPPO
// ============================================

const IEPPO_SECTIONS = [
  {
    id: "personalStyles",
    title: "Estilos Personales",
    icon: "🎭",
    color: "from-purple-500 to-indigo-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    borderColor: "border-purple-200 dark:border-purple-800",
    description: "Descubre cómo es tu manera de ser y actuar",
    instruction: "Soy una persona que...",
    optionTrue: "Se parece a mí",
    optionFalse: "No se parece a mí",
    prefix: "E",
  },
  {
    id: "preferredActivities",
    title: "Actividades Preferidas",
    icon: "⚡",
    color: "from-sky-500 to-cyan-600",
    bgColor: "bg-sky-50 dark:bg-sky-900/20",
    borderColor: "border-sky-200 dark:border-sky-800",
    description: "Identifica las actividades que te interesan",
    instruction: "Me interesa...",
    optionTrue: "Me interesa",
    optionFalse: "No me interesa",
    prefix: "P",
  },
  {
    id: "perceptionOfAbility",
    title: "Percepción de Habilidad",
    icon: "💪",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    description: "Evalúa tus habilidades y capacidades",
    instruction: "Soy hábil para...",
    optionTrue: "Soy Hábil",
    optionFalse: "No soy Hábil",
    prefix: "H",
  },
];

const generateInitialIeppoState = () => ({
  personalStyles: Object.fromEntries(
    Array.from({ length: 33 }, (_, i) => [`E${i + 1}`, null])
  ),
  preferredActivities: Object.fromEntries(
    Array.from({ length: 47 }, (_, i) => [`P${i + 1}`, null])
  ),
  perceptionOfAbility: Object.fromEntries(
    Array.from({ length: 38 }, (_, i) => [`H${i + 1}`, null])
  ),
});

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

const getQuestionsForSection = (sectionId) => {
  return Object.entries(questions.ieppoQuestions[sectionId] || {});
};

const countAnswered = (answers) => {
  return Object.values(answers).filter((v) => v !== null).length;
};

const getTotalIeppoQuestions = () => {
  return (
    Object.keys(questions.ieppoQuestions.personalStyles || {}).length +
    Object.keys(questions.ieppoQuestions.preferredActivities || {}).length +
    Object.keys(questions.ieppoQuestions.perceptionOfAbility || {}).length
  );
};

// ============================================
// COMPONENTES REUTILIZABLES
// ============================================

// Stepper Unificado (9 pasos totales)
const UnifiedStepper = ({ currentPhase, fichaStep, testSection }) => {
  const TOTAL_STEPS = 9; // 6 (ficha) + 3 (IEPPO)
  
  const getCurrentStep = () => {
    if (currentPhase === PHASES.FICHA) return fichaStep;
    if (currentPhase === PHASES.TEST) return 6 + testSection;
    return 9;
  };

  const currentStep = getCurrentStep();
  const progress = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Paso {currentStep} de {TOTAL_STEPS}
        </span>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
          {Math.round(progress)}% completado
        </span>
      </div>
      
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Label descriptivo */}
      <div className="mt-3 text-center">
        {currentPhase === PHASES.FICHA && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            📝 <strong>Ficha Personal</strong> - {FICHA_STEPS[fichaStep - 1]?.title} ({fichaStep}/6)
          </p>
        )}
        {currentPhase === PHASES.TEST && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            🎯 <strong>Test IEPPO</strong> - {IEPPO_SECTIONS[testSection - 1]?.title} (Sección {testSection}/3)
          </p>
        )}
      </div>
    </div>
  );
};

// Loading Screen
const LoadingScreen = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
    <div className="text-center">
      <div className="w-20 h-20 mx-auto mb-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
    </div>
  </div>
);

// Yes/No Toggle
const YesNoToggle = ({ value, onChange, name, yesLabel = "Sí", noLabel = "No" }) => {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => onChange({ target: { name, value: false } })}
        className={`flex-1 py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform
          ${value === false
            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white scale-105 shadow-lg shadow-blue-500/30"
            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
      >
        {noLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange({ target: { name, value: true } })}
        className={`flex-1 py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform
          ${value === true
            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white scale-105 shadow-lg shadow-blue-500/30"
            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
      >
        {yesLabel}
      </button>
    </div>
  );
};

// Option Card
const OptionCard = ({ selected, onClick, emoji, label, small = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${small ? "p-2" : "p-4"}
        rounded-xl border-2 font-semibold text-center
        transition-all duration-300 transform hover:scale-105
        ${selected
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 scale-105 shadow-lg"
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-blue-300"
        }
      `}
    >
      <div className={`${small ? "text-xl" : "text-3xl"} mb-1`}>{emoji}</div>
      <div className={`${small ? "text-xs" : "text-sm"}`}>{label}</div>
    </button>
  );
};

// Input Field
const InputField = ({ label, value, onChange, name, placeholder, required = false }) => {
  return (
    <div className="relative">
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600
                   bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                   transition-all duration-300 outline-none placeholder:text-gray-400"
      />
      <label
        htmlFor={name}
        className="absolute -top-2.5 left-3 px-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800"
      >
        {label}
      </label>
    </div>
  );
};

// Question Card
const QuestionCard = ({ icon, title, subtitle, children }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-2xl">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

// Ranking Selector
const RankingSelector = ({ courses, rankings, onChange, listName }) => {
  const getAvailableOptions = (currentCourse) => {
    const selectedRanks = Object.values(rankings);
    return ["1", "2", "3", "4", "5", "6", "7", "8", "9"].filter(
      (option) => !selectedRanks.includes(option) || rankings[currentCourse] === option
    );
  };

  return (
    <div className="space-y-3">
      {courses.map((course, index) => (
        <div
          key={course.value}
          className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300
            ${rankings[course.value]
              ? "bg-blue-50 dark:bg-blue-900/20"
              : "bg-gray-50 dark:bg-gray-800"
            }`}
        >
          <span className="text-2xl">{course.emoji}</span>
          <span className="flex-1 text-gray-700 dark:text-gray-200 font-medium">
            {course.course}
          </span>
          <select
            name={course.value}
            value={rankings[course.value]}
            onChange={onChange}
            required
            className={`w-20 py-2 px-3 rounded-lg border-2 font-bold text-center
                       transition-all duration-300 outline-none cursor-pointer
              ${rankings[course.value]
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
          >
            <option value="" disabled>-</option>
            {getAvailableOptions(course.value).map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

// Navigation Buttons
const NavigationButtons = ({ onPrev, onNext, isFirst, isLast, loading }) => {
  return (
    <div className="flex gap-4 mt-8">
      {!isFirst && (
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 py-4 px-6 rounded-xl font-bold text-lg
                     bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200
                     hover:bg-gray-200 dark:hover:bg-gray-600
                     transition-all duration-300 transform hover:scale-[1.02]
                     flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Anterior
        </button>
      )}
      <button
        type={isLast ? "submit" : "button"}
        onClick={isLast ? undefined : onNext}
        disabled={loading}
        className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg
                   transition-all duration-300 transform hover:scale-[1.02]
                   flex items-center justify-center gap-2
                   bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
                   shadow-lg shadow-blue-500/30
                   ${loading ? "opacity-70 cursor-wait" : ""}`}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {isLast ? "Guardando..." : "Procesando..."}
          </>
        ) : isLast ? (
          <>
            {FICHA_STEPS.length === 6 ? "Continuar al Test" : "Finalizar Test"}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </>
        ) : (
          <>
            Siguiente
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const IeppoTestIntegrated = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createPersonalInformation } = useUsers();
  const { 
    saveIeppoTest, 
    ieppoTest, 
    loadIeppoTest,
    ieppoTestErrors 
  } = useVocationalTests();

  // Estados de fase
  const [currentPhase, setCurrentPhase] = useState(PHASES.LOADING);
  
  // Estados de Ficha Personal
  const [fichaStep, setFichaStep] = useState(1);
  const [fichaData, setFichaData] = useState(INITIAL_FICHA_STATE);
  const [fichaLoading, setFichaLoading] = useState(false);
  const [fichaErrors, setFichaErrors] = useState([]);

  // Estados de Test IEPPO
  const [testSection, setTestSection] = useState(0);
  const [testAnswers, setTestAnswers] = useState(generateInitialIeppoState());
  const [currentPage, setCurrentPage] = useState(0);
  const [testLoading, setTestLoading] = useState(false);

  // Determinar fase inicial
  useEffect(() => {
    if (!user) {
      setCurrentPhase(PHASES.LOADING);
      return;
    }

    // Si ya completó la ficha, ir directo al test
    if (user.completedUserInformation) {
      setCurrentPhase(PHASES.TEST);
      setTestSection(1);
      
      // Cargar respuestas guardadas del test si existen
      if (ieppoTest) {
        setTestAnswers(ieppoTest);
      }
    } else {
      // Si no tiene ficha, empezar por la ficha
      setCurrentPhase(PHASES.FICHA);
    }
  }, [user, ieppoTest]);

  // ============================================
  // HANDLERS FICHA PERSONAL
  // ============================================

  const handleFichaChange = (e) => {
    const { name, value } = e.target;
    setFichaData(prev => ({ ...prev, [name]: value }));
  };

  const validateFichaStep = (step) => {
    const errors = [];
    
    switch (step) {
      case 1: // Estado Físico
        if (fichaData.disability === "") errors.push("Indica si tienes alguna discapacidad");
        if (fichaData.disability === true && !fichaData.typeOfDisability) {
          errors.push("Especifica el tipo de discapacidad");
        }
        if (fichaData.practiceSport === "") errors.push("Indica si practicas algún deporte");
        if (fichaData.practiceSport === true) {
          if (!fichaData.sport) errors.push("Selecciona qué deporte practicas");
          if (!fichaData.amountSportPractice) errors.push("Indica la frecuencia de práctica");
        }
        break;
        
      case 2: // Educación
        if (!fichaData.academicLevel) errors.push("Selecciona tu nivel académico");
        if (!fichaData.cycle) errors.push("Indica tu grado/ciclo");
        if (fichaData.academicLevel === "Superior" && !fichaData.specialty) {
          errors.push("Indica tu especialidad");
        }
        if (!fichaData.institutionName) errors.push("Escribe el nombre de tu institución");
        if (!fichaData.typeOfInstitution) errors.push("Selecciona el tipo de institución");
        break;
        
      case 3: // Cursos Destacados
        const masteredCompleted = Object.values(fichaData.masteredCoursesList).filter(v => v !== "").length;
        if (masteredCompleted < 9) errors.push("Debes clasificar los 9 cursos");
        break;
        
      case 4: // Cursos Favoritos
        const likedCompleted = Object.values(fichaData.likedCoursesList).filter(v => v !== "").length;
        if (likedCompleted < 9) errors.push("Debes clasificar los 9 cursos");
        break;
        
      case 5: // Habilidades Artísticas
        if (fichaData.playInstrument === "") errors.push("Indica si tocas algún instrumento");
        if (fichaData.readPentagram === "") errors.push("Indica si lees pentagrama");
        if (fichaData.composeSongs === "") errors.push("Indica si compones canciones");
        if (fichaData.doTheater === "") errors.push("Indica si haces teatro");
        if (fichaData.paintPictures === "") errors.push("Indica si pintas cuadros");
        if (fichaData.doDance === "") errors.push("Indica si practicas danza");
        break;
        
      case 6: // Futuro
        if (!fichaData.futureCareer) errors.push("Escribe tus planes futuros");
        if (!fichaData.career1) errors.push("Indica tu primera opción de carrera");
        if (!fichaData.career2) errors.push("Indica tu segunda opción de carrera");
        if (!fichaData.career3) errors.push("Indica tu tercera opción de carrera");
        if (!fichaData.levelOfStudiesCanBeFinanced) errors.push("Indica el nivel de estudios que puedes financiar");
        if (!fichaData.typeOfInstitutionCanBeFinanced) errors.push("Indica el tipo de institución que puedes financiar");
        break;
    }
    
    return errors;
  };

  const nextFichaStep = () => {
    const errors = validateFichaStep(fichaStep);
    
    if (errors.length > 0) {
      setFichaErrors(errors);
      return;
    }
    
    setFichaErrors([]);
    
    if (fichaStep < FICHA_STEPS.length) {
      setFichaStep(prev => prev + 1);
    }
  };

  const prevFichaStep = () => {
    if (fichaStep > 1) {
      setFichaStep(prev => prev - 1);
      setFichaErrors([]);
    }
  };

  const handleFichaSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateFichaStep(fichaStep);
    if (errors.length > 0) {
      setFichaErrors(errors);
      return;
    }

    try {
      setFichaLoading(true);
      const res = await createPersonalInformation(fichaData);
      
      if (res) {
        // Ficha completada, pasar al test
        setCurrentPhase(PHASES.TEST);
        setTestSection(1);
      }
      
      setFichaLoading(false);
    } catch (error) {
      console.error("Error al guardar ficha:", error);
      setFichaErrors(["Error al guardar la información. Intenta nuevamente."]);
      setFichaLoading(false);
    }
  };

  // ============================================
  // HANDLERS TEST IEPPO
  // ============================================

  const handleTestAnswer = (sectionId, questionKey, value) => {
    setTestAnswers(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [questionKey]: value
      }
    }));
  };

  const saveProgress = async () => {
    try {
      setTestLoading(true);
      await saveIeppoTest(testAnswers);
      setTestLoading(false);
    } catch (error) {
      console.error("Error al guardar progreso:", error);
      setTestLoading(false);
    }
  };

  const nextTestPage = () => {
    const section = IEPPO_SECTIONS[testSection - 1];
    const questions = getQuestionsForSection(section.id);
    const maxPage = Math.ceil(questions.length / QUESTIONS_PER_PAGE) - 1;
    
    if (currentPage < maxPage) {
      setCurrentPage(prev => prev + 1);
    } else if (testSection < IEPPO_SECTIONS.length) {
      // Pasar a la siguiente sección
      setTestSection(prev => prev + 1);
      setCurrentPage(0);
    }
  };

  const prevTestPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    } else if (testSection > 1) {
      // Volver a la sección anterior
      setTestSection(prev => prev - 1);
      const prevSection = IEPPO_SECTIONS[testSection - 2];
      const prevQuestions = getQuestionsForSection(prevSection.id);
      const lastPage = Math.ceil(prevQuestions.length / QUESTIONS_PER_PAGE) - 1;
      setCurrentPage(lastPage);
    }
  };

  const handleTestSubmit = async () => {
    try {
      setTestLoading(true);
      await saveIeppoTest(testAnswers);
      setCurrentPhase(PHASES.COMPLETED);
      setTestLoading(false);
    } catch (error) {
      console.error("Error al finalizar test:", error);
      setTestLoading(false);
    }
  };

  // ============================================
  // RENDER FICHA PERSONAL
  // ============================================

  const renderFichaStep = () => {
    switch (fichaStep) {
      case 1: // Estado Físico
        return (
          <div className="space-y-6">
            <QuestionCard
              icon="🏥"
              title="¿Tienes alguna limitación o discapacidad física?"
              subtitle="Esta información nos ayuda a ofrecerte mejor orientación"
            >
              <YesNoToggle
                value={fichaData.disability}
                onChange={handleFichaChange}
                name="disability"
              />
              
              {fichaData.disability === true && (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                    ¿De qué tipo?
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {DISABILITY_TYPES.map((type) => (
                      <OptionCard
                        key={type.value}
                        selected={fichaData.typeOfDisability === type.value}
                        onClick={() => handleFichaChange({
                          target: { name: "typeOfDisability", value: type.value }
                        })}
                        emoji={type.emoji}
                        label={type.value}
                        small
                      />
                    ))}
                  </div>
                </div>
              )}
            </QuestionCard>

            <QuestionCard
              icon="🏃"
              title="¿Practicas algún deporte?"
              subtitle="El deporte dice mucho sobre tus intereses"
            >
              <YesNoToggle
                value={fichaData.practiceSport}
                onChange={handleFichaChange}
                name="practiceSport"
              />
              
              {fichaData.practiceSport === true && (
                <div className="mt-6 space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                      ¿Cuál deporte?
                    </p>
                    <div className="grid grid-cols-5 gap-3">
                      {SPORTS_LIST.map((sport) => (
                        <OptionCard
                          key={sport.value}
                          selected={fichaData.sport === sport.value}
                          onClick={() => handleFichaChange({
                            target: { name: "sport", value: sport.value }
                          })}
                          emoji={sport.emoji}
                          label={sport.value}
                          small
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                      ¿Con qué frecuencia?
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {FREQUENCY_OPTIONS.map((freq) => (
                        <OptionCard
                          key={freq.value}
                          selected={fichaData.amountSportPractice === freq.value}
                          onClick={() => handleFichaChange({
                            target: { name: "amountSportPractice", value: freq.value }
                          })}
                          emoji={freq.emoji}
                          label={freq.label}
                          small
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </QuestionCard>
          </div>
        );

      case 2: // Educación
        return (
          <div className="space-y-6">
            <QuestionCard
              icon="🎓"
              title="¿Cuál es tu nivel académico actual?"
              subtitle="Marca el último nivel alcanzado o en curso"
            >
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "Primaria", emoji: "📖", label: "Primaria" },
                  { value: "Secundaria", emoji: "📚", label: "Secundaria" },
                  { value: "Superior", emoji: "🎓", label: "Superior" },
                ].map((level) => (
                  <OptionCard
                    key={level.value}
                    selected={fichaData.academicLevel === level.value}
                    onClick={() => handleFichaChange({
                      target: { name: "academicLevel", value: level.value }
                    })}
                    emoji={level.emoji}
                    label={level.label}
                  />
                ))}
              </div>
            </QuestionCard>

            <QuestionCard
              icon="📝"
              title="Detalles de tu institución"
              subtitle="Cuéntanos más sobre dónde estudias"
            >
              <div className="space-y-4">
                <InputField
                  label="Grado / Sección / Ciclo"
                  name="cycle"
                  value={fichaData.cycle}
                  onChange={handleFichaChange}
                  placeholder="Ej: 5to A, III Ciclo..."
                  required
                />

                {fichaData.academicLevel === "Superior" && (
                  <InputField
                    label="Especialidad"
                    name="specialty"
                    value={fichaData.specialty}
                    onChange={handleFichaChange}
                    placeholder="Ej: Contabilidad, Ingeniería..."
                    required
                  />
                )}

                <InputField
                  label="Nombre de la institución"
                  name="institutionName"
                  value={fichaData.institutionName}
                  onChange={handleFichaChange}
                  placeholder="Ej: I.E. San Martín"
                  required
                />

                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                    Tipo de institución
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <OptionCard
                      selected={fichaData.typeOfInstitution === "Público"}
                      onClick={() => handleFichaChange({
                        target: { name: "typeOfInstitution", value: "Público" }
                      })}
                      emoji="🏛️"
                      label="Público"
                    />
                    <OptionCard
                      selected={fichaData.typeOfInstitution === "Privado"}
                      onClick={() => handleFichaChange({
                        target: { name: "typeOfInstitution", value: "Privado" }
                      })}
                      emoji="🏢"
                      label="Privado"
                    />
                  </div>
                </div>
              </div>
            </QuestionCard>
          </div>
        );

      case 3: // Cursos Destacados
        return (
          <div className="space-y-6">
            <QuestionCard
              icon="⭐"
              title="Cursos donde más destacabas"
              subtitle="Enumera del 1 (más destacado) al 9 (menos destacado)"
            >
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 mb-6 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                      Consejo: Piensa en tus calificaciones
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      1 = donde siempre sacabas las mejores notas • 9 = donde más te costaba
                    </p>
                  </div>
                </div>
              </div>

              <RankingSelector
                courses={COURSE_LIST}
                rankings={fichaData.masteredCoursesList}
                onChange={(e) => {
                  const { name, value } = e.target;
                  handleFichaChange({
                    target: {
                      name: "masteredCoursesList",
                      value: { ...fichaData.masteredCoursesList, [name]: value }
                    }
                  });
                }}
                listName="masteredCoursesList"
              />
            </QuestionCard>
          </div>
        );

      case 4: // Cursos Favoritos
        return (
          <div className="space-y-6">
            <QuestionCard
              icon="❤️"
              title="Cursos que más te gustan"
              subtitle="Enumera del 1 (más favorito) al 9 (menos favorito)"
            >
              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4 mb-6 border border-pink-200 dark:border-pink-800">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💭</span>
                  <div>
                    <p className="text-sm font-semibold text-pink-800 dark:text-pink-200">
                      Consejo: Piensa en lo que disfrutas
                    </p>
                    <p className="text-xs text-pink-600 dark:text-pink-400">
                      1 = el que más te entusiasma • 9 = el que menos te interesa
                    </p>
                  </div>
                </div>
              </div>

              <RankingSelector
                courses={COURSE_LIST}
                rankings={fichaData.likedCoursesList}
                onChange={(e) => {
                  const { name, value } = e.target;
                  handleFichaChange({
                    target: {
                      name: "likedCoursesList",
                      value: { ...fichaData.likedCoursesList, [name]: value }
                    }
                  });
                }}
                listName="likedCoursesList"
              />
            </QuestionCard>
          </div>
        );

      case 5: // Habilidades Artísticas
        return (
          <div className="space-y-6">
            <QuestionCard
              icon="🎨"
              title="Habilidades Artísticas"
              subtitle="Indícanos tus talentos creativos"
            >
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    ¿Tocas algún instrumento musical?
                  </p>
                  <YesNoToggle
                    value={fichaData.playInstrument}
                    onChange={handleFichaChange}
                    name="playInstrument"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    ¿Lees pentagrama?
                  </p>
                  <YesNoToggle
                    value={fichaData.readPentagram}
                    onChange={handleFichaChange}
                    name="readPentagram"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    ¿Compones canciones o música?
                  </p>
                  <YesNoToggle
                    value={fichaData.composeSongs}
                    onChange={handleFichaChange}
                    name="composeSongs"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    ¿Practicas teatro o actuación?
                  </p>
                  <YesNoToggle
                    value={fichaData.doTheater}
                    onChange={handleFichaChange}
                    name="doTheater"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    ¿Pintas cuadros o dibujas?
                  </p>
                  <YesNoToggle
                    value={fichaData.paintPictures}
                    onChange={handleFichaChange}
                    name="paintPictures"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    ¿Practicas danza o baile?
                  </p>
                  <YesNoToggle
                    value={fichaData.doDance}
                    onChange={handleFichaChange}
                    name="doDance"
                  />
                </div>
              </div>
            </QuestionCard>
          </div>
        );

      case 6: // Futuro
        return (
          <div className="space-y-6">
            <QuestionCard
              icon="🚀"
              title="Tus planes y metas"
              subtitle="Cuéntanos sobre tu futuro profesional"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    ¿Qué quieres hacer en el futuro?
                  </label>
                  <textarea
                    name="futureCareer"
                    value={fichaData.futureCareer}
                    onChange={handleFichaChange}
                    placeholder="Describe tus aspiraciones profesionales..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600
                             bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                             transition-all duration-300 outline-none placeholder:text-gray-400"
                  />
                </div>

                <InputField
                  label="Primera opción de carrera"
                  name="career1"
                  value={fichaData.career1}
                  onChange={handleFichaChange}
                  placeholder="Ej: Medicina"
                  required
                />

                <InputField
                  label="Segunda opción de carrera"
                  name="career2"
                  value={fichaData.career2}
                  onChange={handleFichaChange}
                  placeholder="Ej: Enfermería"
                  required
                />

                <InputField
                  label="Tercera opción de carrera"
                  name="career3"
                  value={fichaData.career3}
                  onChange={handleFichaChange}
                  placeholder="Ej: Psicología"
                  required
                />

                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    ¿Qué nivel de estudios puedes financiar?
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {["Técnico", "Universitario", "Posgrado"].map((level) => (
                      <OptionCard
                        key={level}
                        selected={fichaData.levelOfStudiesCanBeFinanced === level}
                        onClick={() => handleFichaChange({
                          target: { name: "levelOfStudiesCanBeFinanced", value: level }
                        })}
                        emoji={level === "Técnico" ? "🔧" : level === "Universitario" ? "🎓" : "📜"}
                        label={level}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    ¿En qué tipo de institución puedes estudiar?
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <OptionCard
                      selected={fichaData.typeOfInstitutionCanBeFinanced === "Pública"}
                      onClick={() => handleFichaChange({
                        target: { name: "typeOfInstitutionCanBeFinanced", value: "Pública" }
                      })}
                      emoji="🏛️"
                      label="Pública"
                    />
                    <OptionCard
                      selected={fichaData.typeOfInstitutionCanBeFinanced === "Privada"}
                      onClick={() => handleFichaChange({
                        target: { name: "typeOfInstitutionCanBeFinanced", value: "Privada" }
                      })}
                      emoji="🏢"
                      label="Privada"
                    />
                  </div>
                </div>
              </div>
            </QuestionCard>
          </div>
        );

      default:
        return null;
    }
  };

  // ============================================
  // RENDER TEST IEPPO
  // ============================================

  const renderTestContent = () => {
    if (testSection === 0) return null;

    const section = IEPPO_SECTIONS[testSection - 1];
    const allQuestions = getQuestionsForSection(section.id);
    const startIdx = currentPage * QUESTIONS_PER_PAGE;
    const endIdx = startIdx + QUESTIONS_PER_PAGE;
    const currentQuestions = allQuestions.slice(startIdx, endIdx);
    
    const totalAnswered = countAnswered(testAnswers[section.id]);
    const totalQuestions = allQuestions.length;
    const sectionProgress = (totalAnswered / totalQuestions) * 100;

    const isLastPageOfSection = endIdx >= allQuestions.length;
    const isLastSection = testSection === IEPPO_SECTIONS.length;

    return (
      <div className={`${section.bgColor} rounded-2xl p-6 sm:p-8 border-2 ${section.borderColor}`}>
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${section.color} rounded-2xl shadow-lg mb-4`}>
            <span className="text-3xl">{section.icon}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {section.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {section.description}
          </p>
          
          {/* Section Progress */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">Progreso de esta sección</span>
              <span className="font-bold text-gray-900 dark:text-white">{totalAnswered}/{totalQuestions}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${section.color} rounded-full transition-all duration-500`}
                style={{ width: `${sectionProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {currentQuestions.map(([key, question]) => (
            <div key={key} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
                <span className="font-semibold text-gray-900 dark:text-white">{section.instruction}</span> {question}
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => handleTestAnswer(section.id, key, true)}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform
                    ${testAnswers[section.id][key] === true
                      ? `bg-gradient-to-r ${section.color} text-white scale-105 shadow-lg`
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                >
                  {section.optionTrue}
                </button>
                <button
                  onClick={() => handleTestAnswer(section.id, key, false)}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform
                    ${testAnswers[section.id][key] === false
                      ? `bg-gradient-to-r ${section.color} text-white scale-105 shadow-lg`
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                >
                  {section.optionFalse}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={prevTestPage}
            disabled={testSection === 1 && currentPage === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
                     bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200
                     hover:bg-gray-200 dark:hover:bg-gray-600 transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={saveProgress}
              disabled={testLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
                       text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <FaSave className="w-4 h-4" />
              Guardar progreso
            </button>
          </div>

          {isLastPageOfSection && isLastSection ? (
            <button
              onClick={handleTestSubmit}
              disabled={testLoading}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white
                       bg-gradient-to-r from-green-500 to-emerald-600
                       hover:from-green-600 hover:to-emerald-700
                       shadow-lg transition-all transform hover:scale-105
                       disabled:opacity-70 disabled:cursor-wait"
            >
              {testLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Finalizando...
                </>
              ) : (
                <>
                  Finalizar Test
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={nextTestPage}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
                       bg-gradient-to-r from-blue-500 to-indigo-600 text-white
                       hover:from-blue-600 hover:to-indigo-700
                       shadow-lg transition-all transform hover:scale-105"
            >
              Siguiente
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  };

  // ============================================
  // RENDER PRINCIPAL
  // ============================================

  if (currentPhase === PHASES.LOADING) {
    return <LoadingScreen />;
  }

  if (currentPhase === PHASES.COMPLETED) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12 max-w-2xl w-full text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <span className="text-6xl">🎉</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ¡Test IEPPO Completado!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Has completado exitosamente el test de Inventario de Estilos Personales y Preferencias Ocupacionales
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/main"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold
                       bg-gradient-to-r from-blue-500 to-indigo-600 text-white
                       hover:from-blue-600 hover:to-indigo-700
                       shadow-lg transition-all transform hover:scale-105"
            >
              Volver al inicio
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </a>
            
            <a
              href="/final-vocational-test-report"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-600
                       hover:bg-gray-50 dark:hover:bg-gray-600
                       transition-all transform hover:scale-105"
            >
              Ver resultados
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30 mb-4">
            <span className="text-3xl">{currentPhase === PHASES.FICHA ? "📋" : "🎯"}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {currentPhase === PHASES.FICHA ? "Ficha de Información Personal" : "Test IEPPO"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {currentPhase === PHASES.FICHA 
              ? "Completa tu perfil para personalizar tu experiencia" 
              : "Descubre tus estilos personales y preferencias ocupacionales"
            }
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 md:p-8">
          {/* Stepper Unificado */}
          <UnifiedStepper 
            currentPhase={currentPhase}
            fichaStep={fichaStep}
            testSection={testSection}
          />

          {/* Contenido según fase */}
          {currentPhase === PHASES.FICHA ? (
            <form onSubmit={handleFichaSubmit}>
              {/* Current Step Info */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {FICHA_STEPS[fichaStep - 1].title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {FICHA_STEPS[fichaStep - 1].description}
                </p>
              </div>

              {/* Step Content */}
              {renderFichaStep()}

              {/* Validation Errors */}
              {fichaErrors.length > 0 && (
                <div className="mt-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600 dark:text-red-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">
                        Por favor completa lo siguiente:
                      </h4>
                      <ul className="space-y-1">
                        {fichaErrors.map((error, i) => (
                          <li key={i} className="text-sm text-red-700 dark:text-red-300 flex items-start gap-2">
                            <span className="text-red-400 mt-0.5">•</span>
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <NavigationButtons
                onPrev={prevFichaStep}
                onNext={nextFichaStep}
                isFirst={fichaStep === 1}
                isLast={fichaStep === FICHA_STEPS.length}
                loading={fichaLoading}
              />
            </form>
          ) : (
            renderTestContent()
          )}
        </div>

        {/* Help text */}
        {currentPhase === PHASES.FICHA && (
          <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-6">
            💡 Tu progreso se guarda automáticamente al completar la ficha
          </p>
        )}
      </div>
    </div>
  );
};

export default IeppoTestIntegrated;