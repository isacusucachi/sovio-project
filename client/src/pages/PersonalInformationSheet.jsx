import { useState, useEffect, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";

import Footer from "../components/Footer";
import { useUsers } from "../context/userContext";
import { useAuth } from "../context/authContext";

// ============================================
// CONSTANTS & DATA
// ============================================

const STEPS = [
  { id: 1, title: "Estado Físico", icon: "💪", description: "Cuéntanos sobre tu salud y actividad física" },
  { id: 2, title: "Educación", icon: "📚", description: "Tu situación académica actual" },
  { id: 3, title: "Cursos Destacados", icon: "⭐", description: "Áreas donde más destacas" },
  { id: 4, title: "Cursos Favoritos", icon: "❤️", description: "Lo que más te gusta estudiar" },
  { id: 5, title: "Habilidades Artísticas", icon: "🎨", description: "Tus talentos creativos" },
  { id: 6, title: "Futuro", icon: "🚀", description: "Tus planes y metas" },
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

// ============================================
// INITIAL STATE
// ============================================

const INITIAL_STATE = {
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
// REUSABLE COMPONENTS
// ============================================

// Animated Progress Bar
const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = ((currentStep) / totalSteps) * 100;
  
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Paso {currentStep} de {totalSteps}
        </span>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
          {Math.round(progress)}% completado
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Step Indicator (Mini dots) with validation status
const StepIndicator = ({ steps, currentStep, onStepClick, data, attemptedSteps }) => {
  // Calculate the highest completed step to know which steps are accessible
  const getHighestAccessibleStep = () => {
    for (let i = 1; i <= steps.length; i++) {
      if (!isStepComplete(i, data)) {
        return i;
      }
    }
    return steps.length;
  };
  
  const highestAccessible = getHighestAccessibleStep();
  
  return (
    <div className="flex justify-center gap-2 mb-6">
      {steps.map((step) => {
        const stepComplete = isStepComplete(step.id, data);
        const wasAttempted = attemptedSteps.has(step.id);
        const hasError = wasAttempted && !stepComplete && step.id !== currentStep;
        const isAccessible = step.id <= currentStep || step.id <= highestAccessible;
        
        return (
          <button
            key={step.id}
            onClick={() => onStepClick(step.id)}
            disabled={!isAccessible && step.id > currentStep}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center text-lg
              transition-all duration-300 transform relative
              ${currentStep === step.id 
                ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-500/50' 
                : stepComplete
                  ? 'bg-green-500 text-white hover:scale-105 cursor-pointer'
                  : hasError
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-500 border-2 border-red-400 hover:scale-105 cursor-pointer'
                    : isAccessible || step.id < currentStep
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50'
              }
            `}
            title={isAccessible || step.id <= currentStep ? step.title : `Completa los pasos anteriores primero`}
            aria-label={`Ir al paso ${step.id}: ${step.title}`}
          >
            {stepComplete && currentStep !== step.id ? '✓' : step.icon}
            {hasError && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">!</span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// Yes/No Toggle Button
const YesNoToggle = ({ value, onChange, name, yesLabel = "Sí", noLabel = "No" }) => {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => onChange({ target: { name, value: false } })}
        className={`
          flex-1 py-3 px-6 rounded-xl font-semibold text-lg
          transition-all duration-300 transform
          ${value === false 
            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white scale-105 shadow-lg shadow-blue-500/30' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }
        `}
      >
        {noLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange({ target: { name, value: true } })}
        className={`
          flex-1 py-3 px-6 rounded-xl font-semibold text-lg
          transition-all duration-300 transform
          ${value === true 
            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white scale-105 shadow-lg shadow-blue-500/30' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }
        `}
      >
        {yesLabel}
      </button>
    </div>
  );
};

// Option Card (for selections with emoji)
const OptionCard = ({ selected, onClick, emoji, label, small = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${small ? 'p-3' : 'p-4'} rounded-xl border-2 
        transition-all duration-300 transform
        ${selected 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-105 shadow-md' 
          : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-300 hover:shadow-sm'
        }
      `}
    >
      <span className={`${small ? 'text-xl' : 'text-2xl'} block mb-1`}>{emoji}</span>
      <span className={`${small ? 'text-xs' : 'text-sm'} font-medium text-gray-700 dark:text-gray-200`}>
        {label}
      </span>
    </button>
  );
};

// Question Card Wrapper
const QuestionCard = ({ children, title, subtitle, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6 transition-all duration-300 hover:shadow-md">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
};

// Input Field with floating label effect
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
        className="
          w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600
          bg-white dark:bg-gray-800 text-gray-800 dark:text-white
          focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
          transition-all duration-300 outline-none
          placeholder:text-gray-400
        "
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

// Ranking Selector for courses
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
          className={`
            flex items-center gap-4 p-3 rounded-xl
            transition-all duration-300
            ${rankings[course.value] ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-50 dark:bg-gray-800'}
          `}
          style={{ animationDelay: `${index * 50}ms` }}
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
            className={`
              w-20 py-2 px-3 rounded-lg border-2 font-bold text-center
              transition-all duration-300 outline-none cursor-pointer
              ${rankings[course.value] 
                ? 'border-blue-500 bg-blue-500 text-white' 
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }
            `}
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
const NavigationButtons = ({ onPrev, onNext, isFirst, isLast, loading, hasErrors = false }) => {
  return (
    <div className="flex gap-4 mt-8">
      {!isFirst && (
        <button
          type="button"
          onClick={onPrev}
          className="
            flex-1 py-4 px-6 rounded-xl font-bold text-lg
            bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200
            hover:bg-gray-200 dark:hover:bg-gray-600
            transition-all duration-300 transform hover:scale-[1.02]
            flex items-center justify-center gap-2
          "
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
        className={`
          flex-1 py-4 px-6 rounded-xl font-bold text-lg
          transition-all duration-300 transform hover:scale-[1.02]
          flex items-center justify-center gap-2
          ${hasErrors 
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl animate-pulse' 
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl'
          }
          ${loading ? 'opacity-70 cursor-wait' : ''}
        `}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Enviando...
          </>
        ) : isLast ? (
          <>
            Enviar
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
// STEP COMPONENTS
// ============================================

// Step 1: Physical State
const Step1PhysicalState = ({ data, onChange }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <QuestionCard 
        icon="🏥" 
        title="¿Tienes alguna limitación o discapacidad física?"
        subtitle="Esta información nos ayuda a ofrecerte mejor orientación"
      >
        <YesNoToggle 
          value={data.disability} 
          onChange={onChange} 
          name="disability"
        />
        
        {data.disability === true && (
          <div className="mt-6 animate-slideDown">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
              ¿De qué tipo?
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {DISABILITY_TYPES.map((type) => (
                <OptionCard
                  key={type.value}
                  selected={data.typeOfDisability === type.value}
                  onClick={() => onChange({ target: { name: 'typeOfDisability', value: type.value } })}
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
          value={data.practiceSport} 
          onChange={onChange} 
          name="practiceSport"
        />
        
        {data.practiceSport === true && (
          <div className="mt-6 space-y-6 animate-slideDown">
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                ¿Cuál deporte?
              </p>
              <div className="grid grid-cols-5 gap-3">
                {SPORTS_LIST.map((sport) => (
                  <OptionCard
                    key={sport.value}
                    selected={data.sport === sport.value}
                    onClick={() => onChange({ target: { name: 'sport', value: sport.value } })}
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
                    selected={data.amountSportPractice === freq.value}
                    onClick={() => onChange({ target: { name: 'amountSportPractice', value: freq.value } })}
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
};

// Step 2: Education
const Step2Education = ({ data, onChange }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <QuestionCard 
        icon="🎓" 
        title="¿Cuál es tu nivel académico actual?"
        subtitle="Marca el último nivel alcanzado o en curso"
      >
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: 'Primaria', emoji: '📖', label: 'Primaria' },
            { value: 'Secundaria', emoji: '📚', label: 'Secundaria' },
            { value: 'Superior', emoji: '🎓', label: 'Superior' },
          ].map((level) => (
            <OptionCard
              key={level.value}
              selected={data.academicLevel === level.value}
              onClick={() => onChange({ target: { name: 'academicLevel', value: level.value } })}
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
            value={data.cycle}
            onChange={onChange}
            placeholder="Ej: 5to A, III Ciclo..."
            required
          />
          
          {data.academicLevel === "Superior" && (
            <div className="animate-slideDown">
              <InputField
                label="Especialidad"
                name="specialty"
                value={data.specialty}
                onChange={onChange}
                placeholder="Ej: Contabilidad, Ingeniería..."
                required
              />
            </div>
          )}
          
          <InputField
            label="Nombre de la institución"
            name="institutionName"
            value={data.institutionName}
            onChange={onChange}
            placeholder="Ej: I.E. San Martín"
            required
          />
          
          <div>
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
              Tipo de institución
            </p>
            <div className="grid grid-cols-2 gap-4">
              <OptionCard
                selected={data.typeOfInstitution === 'Público'}
                onClick={() => onChange({ target: { name: 'typeOfInstitution', value: 'Público' } })}
                emoji="🏛️"
                label="Público"
              />
              <OptionCard
                selected={data.typeOfInstitution === 'Privado'}
                onClick={() => onChange({ target: { name: 'typeOfInstitution', value: 'Privado' } })}
                emoji="🏢"
                label="Privado"
              />
            </div>
          </div>
        </div>
      </QuestionCard>
    </div>
  );
};

// Step 3: Mastered Courses
const Step3MasteredCourses = ({ data, onChange, onReset }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      target: {
        name: 'masteredCoursesList',
        value: { ...data.masteredCoursesList, [name]: value }
      }
    });
  };

  const completedCount = Object.values(data.masteredCoursesList).filter(v => v !== "").length;

  return (
    <div className="space-y-6 animate-fadeIn">
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

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500">
            {completedCount}/9 cursos ordenados
          </span>
          <button
            type="button"
            onClick={onReset}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reiniciar
          </button>
        </div>

        <RankingSelector
          courses={COURSE_LIST}
          rankings={data.masteredCoursesList}
          onChange={handleChange}
          listName="masteredCoursesList"
        />
      </QuestionCard>
    </div>
  );
};

// Step 4: Liked Courses
const Step4LikedCourses = ({ data, onChange, onReset }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      target: {
        name: 'likedCoursesList',
        value: { ...data.likedCoursesList, [name]: value }
      }
    });
  };

  const completedCount = Object.values(data.likedCoursesList).filter(v => v !== "").length;

  return (
    <div className="space-y-6 animate-fadeIn">
      <QuestionCard 
        icon="❤️" 
        title="Cursos que más te gustaban"
        subtitle="Enumera del 1 (favorito) al 9 (menos favorito)"
      >
        <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4 mb-6 border border-pink-200 dark:border-pink-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💖</span>
            <div>
              <p className="text-sm font-semibold text-pink-800 dark:text-pink-200">
                Consejo: Piensa en lo que disfrutabas
              </p>
              <p className="text-xs text-pink-600 dark:text-pink-400">
                1 = tu clase favorita • 9 = la que menos te gustaba
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500">
            {completedCount}/9 cursos ordenados
          </span>
          <button
            type="button"
            onClick={onReset}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reiniciar
          </button>
        </div>

        <RankingSelector
          courses={COURSE_LIST}
          rankings={data.likedCoursesList}
          onChange={handleChange}
          listName="likedCoursesList"
        />
      </QuestionCard>
    </div>
  );
};

// Step 5: Artistic Skills
const Step5ArtisticSkills = ({ data, onChange }) => {
  const artisticQuestions = [
    { name: 'playInstrument', icon: '🎸', title: '¿Tocas algún instrumento?' },
    { name: 'readPentagram', icon: '🎼', title: '¿Lees pentagrama?' },
    { name: 'composeSongs', icon: '🎵', title: '¿Compones canciones?' },
    { name: 'doTheater', icon: '🎭', title: '¿Perteneces a un taller de teatro?' },
    { name: 'paintPictures', icon: '🖼️', title: '¿Pintas cuadros, óleos o dibujas?' },
    { name: 'doDance', icon: '💃', title: '¿Perteneces a un taller de danza?' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <QuestionCard 
        icon="🎨" 
        title="Tus habilidades artísticas"
        subtitle="Cuéntanos sobre tus talentos creativos"
      >
        <div className="grid gap-4">
          {artisticQuestions.map((q) => (
            <div 
              key={q.name}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300
                ${data[q.name] === true 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                }
              `}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{q.icon}</span>
                  <span className="font-medium text-gray-700 dark:text-gray-200">{q.title}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onChange({ target: { name: q.name, value: false } })}
                    className={`
                      px-4 py-2 rounded-lg font-semibold text-sm transition-all
                      ${data[q.name] === false 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }
                    `}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ target: { name: q.name, value: true } })}
                    className={`
                      px-4 py-2 rounded-lg font-semibold text-sm transition-all
                      ${data[q.name] === true 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }
                    `}
                  >
                    Sí
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </QuestionCard>

      <QuestionCard 
        icon="🎖️" 
        title="¿Hiciste servicio militar?"
      >
        <YesNoToggle 
          value={data.didMilitaryService} 
          onChange={onChange} 
          name="didMilitaryService"
        />
      </QuestionCard>

      <QuestionCard 
        icon="✨" 
        title="Otras habilidades o pasatiempos"
        subtitle="¿Tienes otras habilidades que quieras mencionar?"
      >
        <InputField
          label="Otros talentos, hobbies o habilidades"
          name="otherSkills"
          value={data.otherSkills}
          onChange={onChange}
          placeholder="Ej: Cocinar, programar, hacer manualidades..."
        />
      </QuestionCard>
    </div>
  );
};

// Step 6: Future
const Step6Future = ({ data, onChange }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <QuestionCard 
        icon="🎯" 
        title="¿Ya pensaste en alguna carrera?"
        subtitle="No te preocupes si aún no estás seguro"
      >
        <YesNoToggle 
          value={data.futureCareer} 
          onChange={onChange} 
          name="futureCareer"
          yesLabel="Sí, tengo ideas"
          noLabel="Aún no sé"
        />
        
        {data.futureCareer === true && (
          <div className="mt-6 space-y-4 animate-slideDown">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Menciona hasta 3 opciones que te interesan:
            </p>
            <InputField
              label="Primera opción"
              name="career1"
              value={data.career1}
              onChange={onChange}
              placeholder="Ej: Medicina, Ingeniería..."
            />
            <InputField
              label="Segunda opción"
              name="career2"
              value={data.career2}
              onChange={onChange}
              placeholder="Ej: Derecho, Arquitectura..."
            />
            <InputField
              label="Tercera opción"
              name="career3"
              value={data.career3}
              onChange={onChange}
              placeholder="Ej: Diseño, Administración..."
            />
          </div>
        )}
      </QuestionCard>

      <QuestionCard 
        icon="💰" 
        title="¿Qué nivel de estudios puedes financiar?"
        subtitle="Esto nos ayuda a darte opciones realistas"
      >
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: 'Universitario', emoji: '🎓', label: 'Universitario' },
            { value: 'Técnico', emoji: '🔧', label: 'Técnico' },
            { value: 'CETPRO / Ocupacional', emoji: '📋', label: 'CETPRO' },
          ].map((level) => (
            <OptionCard
              key={level.value}
              selected={data.levelOfStudiesCanBeFinanced === level.value}
              onClick={() => onChange({ target: { name: 'levelOfStudiesCanBeFinanced', value: level.value } })}
              emoji={level.emoji}
              label={level.label}
            />
          ))}
        </div>
      </QuestionCard>

      <QuestionCard 
        icon="🏫" 
        title="¿En qué tipo de institución?"
      >
        <div className="grid grid-cols-2 gap-4">
          <OptionCard
            selected={data.typeOfInstitutionCanBeFinanced === 'Público'}
            onClick={() => onChange({ target: { name: 'typeOfInstitutionCanBeFinanced', value: 'Público' } })}
            emoji="🏛️"
            label="Público"
          />
          <OptionCard
            selected={data.typeOfInstitutionCanBeFinanced === 'Privado'}
            onClick={() => onChange({ target: { name: 'typeOfInstitutionCanBeFinanced', value: 'Privado' } })}
            emoji="🏢"
            label="Privado"
          />
        </div>
      </QuestionCard>

      <QuestionCard 
        icon="🚫" 
        title="¿Hay alguna ocupación en la que NUNCA trabajarías?"
        subtitle="Esto nos ayuda a descartar opciones"
      >
        <InputField
          label="Ocupación que evitarías"
          name="ocupationNeverWork"
          value={data.ocupationNeverWork}
          onChange={onChange}
          placeholder="Ej: Trabajo en alturas, ventas puerta a puerta..."
        />
      </QuestionCard>
    </div>
  );
};

// ============================================
// VALIDATION FUNCTIONS
// ============================================

const validateStep1 = (data) => {
  const errors = [];
  
  if (data.disability === "") {
    errors.push("Por favor indica si tienes alguna limitación o discapacidad");
  }
  
  if (data.disability === true && !data.typeOfDisability) {
    errors.push("Por favor selecciona el tipo de discapacidad");
  }
  
  if (data.practiceSport === "") {
    errors.push("Por favor indica si practicas algún deporte");
  }
  
  if (data.practiceSport === true) {
    if (!data.sport) {
      errors.push("Por favor selecciona qué deporte practicas");
    }
    if (!data.amountSportPractice) {
      errors.push("Por favor indica con qué frecuencia practicas deporte");
    }
  }
  
  return errors;
};

const validateStep2 = (data) => {
  const errors = [];
  
  if (!data.academicLevel) {
    errors.push("Por favor selecciona tu nivel académico");
  }
  
  if (!data.cycle || data.cycle.trim() === "") {
    errors.push("Por favor indica tu grado, sección o ciclo");
  }
  
  if (data.academicLevel === "Superior" && (!data.specialty || data.specialty.trim() === "")) {
    errors.push("Por favor indica tu especialidad");
  }
  
  if (!data.institutionName || data.institutionName.trim() === "") {
    errors.push("Por favor indica el nombre de tu institución educativa");
  }
  
  if (!data.typeOfInstitution) {
    errors.push("Por favor indica si tu institución es pública o privada");
  }
  
  return errors;
};

const validateStep3 = (data) => {
  const errors = [];
  const masteredValues = Object.values(data.masteredCoursesList);
  const filledCount = masteredValues.filter(v => v !== "").length;
  
  if (filledCount < 9) {
    errors.push(`Debes ordenar los 9 cursos. Te faltan ${9 - filledCount} por asignar`);
  }
  
  // Check for duplicates
  const nonEmptyValues = masteredValues.filter(v => v !== "");
  const uniqueValues = new Set(nonEmptyValues);
  if (nonEmptyValues.length !== uniqueValues.size) {
    errors.push("Hay números repetidos. Cada curso debe tener un número único del 1 al 9");
  }
  
  return errors;
};

const validateStep4 = (data) => {
  const errors = [];
  const likedValues = Object.values(data.likedCoursesList);
  const filledCount = likedValues.filter(v => v !== "").length;
  
  if (filledCount < 9) {
    errors.push(`Debes ordenar los 9 cursos. Te faltan ${9 - filledCount} por asignar`);
  }
  
  // Check for duplicates
  const nonEmptyValues = likedValues.filter(v => v !== "");
  const uniqueValues = new Set(nonEmptyValues);
  if (nonEmptyValues.length !== uniqueValues.size) {
    errors.push("Hay números repetidos. Cada curso debe tener un número único del 1 al 9");
  }
  
  return errors;
};

const validateStep5 = (data) => {
  const errors = [];
  
  const artisticFields = ['playInstrument', 'readPentagram', 'composeSongs', 'doTheater', 'paintPictures', 'doDance'];
  
  for (const field of artisticFields) {
    if (data[field] === "") {
      errors.push("Por favor responde todas las preguntas sobre habilidades artísticas");
      break;
    }
  }
  
  if (data.didMilitaryService === "") {
    errors.push("Por favor indica si hiciste servicio militar");
  }
  
  return errors;
};

const validateStep6 = (data) => {
  const errors = [];
  
  if (data.futureCareer === "") {
    errors.push("Por favor indica si ya has pensado en alguna carrera");
  }
  
  if (data.futureCareer === true) {
    if (!data.career1 || data.career1.trim() === "") {
      errors.push("Por favor indica al menos tu primera opción de carrera");
    }
  }
  
  if (!data.levelOfStudiesCanBeFinanced) {
    errors.push("Por favor indica qué nivel de estudios puedes financiar");
  }
  
  if (!data.typeOfInstitutionCanBeFinanced) {
    errors.push("Por favor indica en qué tipo de institución puedes estudiar");
  }
  
  return errors;
};

const getStepValidation = (step, data) => {
  switch (step) {
    case 1: return validateStep1(data);
    case 2: return validateStep2(data);
    case 3: return validateStep3(data);
    case 4: return validateStep4(data);
    case 5: return validateStep5(data);
    case 6: return validateStep6(data);
    default: return [];
  }
};

// Check if a step is complete (for visual indicators)
const isStepComplete = (step, data) => {
  return getStepValidation(step, data).length === 0;
};

// ============================================
// VALIDATION ERROR DISPLAY COMPONENT
// ============================================

const ValidationErrors = ({ errors, onDismiss }) => {
  if (errors.length === 0) return null;
  
  return (
    <div className="mt-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4 animate-fadeIn">
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
            {errors.map((error, i) => (
              <li key={i} className="text-sm text-red-700 dark:text-red-300 flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                {error}
              </li>
            ))}
          </ul>
        </div>
        <button 
          onClick={onDismiss}
          className="text-red-400 hover:text-red-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

const PersonalInformationSheet = () => {
  const { user } = useAuth();
  const [completedUserInformation, setCompletedUserInformation] = useState(null);
  const { createPersonalInformation, errors: personalInformationErrors } = useUsers();

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [personalInformation, setPersonalInformation] = useState(INITIAL_STATE);
  const [validationErrors, setValidationErrors] = useState([]);
  const [attemptedSteps, setAttemptedSteps] = useState(new Set());
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Handle field changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    // Clear validation errors when user makes changes
    setValidationErrors([]);
    
    // Handle nested objects (course lists)
    if (name === 'masteredCoursesList' || name === 'likedCoursesList') {
      setPersonalInformation(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      // Handle boolean conversion for radio-like inputs
      const updatedValue = value === 'true' ? true : value === 'false' ? false : value;
      setPersonalInformation(prev => ({
        ...prev,
        [name]: updatedValue
      }));
    }
  }, []);

  // Reset mastered courses
  const handleResetMasteredCourses = useCallback(() => {
    setPersonalInformation(prev => ({
      ...prev,
      masteredCoursesList: INITIAL_STATE.masteredCoursesList
    }));
    setValidationErrors([]);
  }, []);

  // Reset liked courses
  const handleResetLikedCourses = useCallback(() => {
    setPersonalInformation(prev => ({
      ...prev,
      likedCoursesList: INITIAL_STATE.likedCoursesList
    }));
    setValidationErrors([]);
  }, []);

  // Clear validation errors
  const clearValidationErrors = useCallback(() => {
    setValidationErrors([]);
  }, []);

  // Validate current step before proceeding
  const validateCurrentStep = useCallback(() => {
    const errors = getStepValidation(currentStep, personalInformation);
    setValidationErrors(errors);
    return errors.length === 0;
  }, [currentStep, personalInformation]);

  // Navigation with validation
  const goToStep = useCallback((step) => {
    // Always allow going to previous steps
    if (step < currentStep) {
      setValidationErrors([]);
      setHasAttemptedSubmit(false); // Reset submit attempt when navigating back
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // If trying to go to the same step, do nothing
    if (step === currentStep) {
      return;
    }
    
    // If trying to go forward, must validate ALL steps in between
    if (step > currentStep) {
      // First validate current step
      setAttemptedSteps(prev => new Set([...prev, currentStep]));
      const currentErrors = getStepValidation(currentStep, personalInformation);
      
      if (currentErrors.length > 0) {
        setValidationErrors(currentErrors);
        return;
      }
      
      // Then check all intermediate steps (if jumping more than 1 step)
      for (let i = currentStep + 1; i < step; i++) {
        const intermediateErrors = getStepValidation(i, personalInformation);
        if (intermediateErrors.length > 0) {
          // Go to the first incomplete step instead
          setCurrentStep(i);
          setAttemptedSteps(prev => new Set([...prev, i]));
          setValidationErrors(intermediateErrors);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      
      // All validations passed, go to target step
      setValidationErrors([]);
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, personalInformation]);

  const nextStep = useCallback(() => {
    setAttemptedSteps(prev => new Set([...prev, currentStep]));
    
    if (validateCurrentStep()) {
      if (currentStep < STEPS.length) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [currentStep, validateCurrentStep]);

  const prevStep = useCallback(() => {
    setValidationErrors([]);
    setHasAttemptedSubmit(false); // Reset submit attempt when going back
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  // Submit handler with final validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark step as attempted
    setAttemptedSteps(prev => new Set([...prev, currentStep]));
    
    // Validate current step first
    if (!validateCurrentStep()) {
      return;
    }
    
    // Mark that we've attempted to submit
    setHasAttemptedSubmit(true);
    
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

  // Load user state
  useEffect(() => {
    setCompletedUserInformation(user.completedUserInformation);
  }, [user]);

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1PhysicalState data={personalInformation} onChange={handleChange} />;
      case 2:
        return <Step2Education data={personalInformation} onChange={handleChange} />;
      case 3:
        return <Step3MasteredCourses data={personalInformation} onChange={handleChange} onReset={handleResetMasteredCourses} />;
      case 4:
        return <Step4LikedCourses data={personalInformation} onChange={handleChange} onReset={handleResetLikedCourses} />;
      case 5:
        return <Step5ArtisticSkills data={personalInformation} onChange={handleChange} />;
      case 6:
        return <Step6Future data={personalInformation} onChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 500px; }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
      `}</style>
      
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto mt-20">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30 mb-4">
              <span className="text-3xl">📋</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Ficha de Información Personal
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Completa tu perfil para recibir orientación vocacional personalizada
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 md:p-8">
            
            {completedUserInformation ? (
              // Success State
              <div className="text-center py-12 animate-fadeIn">
                <div className="w-32 h-32 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <span className="text-6xl">🎉</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  ¡Genial! Has completado tu ficha
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  Tu información ha sido guardada correctamente
                </p>
                <a
                  href="/main"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Ir a las pruebas
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ) : (
              // Form
              <form onSubmit={handleSubmit}>
                {/* Progress */}
                <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} />
                
                {/* Step Indicator */}
                <StepIndicator 
                  steps={STEPS} 
                  currentStep={currentStep} 
                  onStepClick={goToStep}
                  data={personalInformation}
                  attemptedSteps={attemptedSteps}
                />
                
                {/* Current Step Info */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    {STEPS[currentStep - 1].title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {STEPS[currentStep - 1].description}
                  </p>
                </div>

                {/* Step Content */}
                {renderStepContent()}

                {/* Validation Errors */}
                <ValidationErrors 
                  errors={validationErrors} 
                  onDismiss={clearValidationErrors}
                />

                {/* Server Errors - Only show after submit attempt on last step */}
                {hasAttemptedSubmit && currentStep === STEPS.length && personalInformationErrors.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-red-600 dark:text-red-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">
                            Error del servidor:
                          </h4>
                          <ul className="space-y-1">
                            {personalInformationErrors.map((error, i) => (
                              <li key={i} className="text-sm text-red-700 dark:text-red-300 flex items-start gap-2">
                                <span className="text-red-400 mt-0.5">•</span>
                                {error}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <NavigationButtons
                  onPrev={prevStep}
                  onNext={nextStep}
                  isFirst={currentStep === 1}
                  isLast={currentStep === STEPS.length}
                  loading={loading}
                  hasErrors={validationErrors.length > 0}
                />
              </form>
            )}
          </div>
          
          {/* Help text */}
          <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-6">
            ¿Necesitas ayuda? Puedes volver a cualquier paso haciendo clic en los círculos
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PersonalInformationSheet;