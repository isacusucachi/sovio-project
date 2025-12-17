import { useEffect, useState, useCallback, useMemo } from "react";
import { useVocationalTests } from "../context/vocationalTestContext";
import { useAuth } from "../context/authContext";
import questions from "../data/questions.json";
import { FaSave } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

// ============================================
// CONSTANTS & CONFIGURATION
// ============================================

const AREAS = [
  {
    id: "attentionSkills",
    title: "Atención",
    icon: "👁️",
    color: "from-cyan-500 to-teal-600",
    bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
    borderColor: "border-cyan-200 dark:border-cyan-800",
    description: "Encuentra pares de números que suman 10",
    timeLimit: 720, // 12 minutos
    type: "numberInput",
    storageKey: "timeLeftAttentionSkills",
  },
  {
    id: "numericalSkills",
    title: "Habilidad Numérica",
    icon: "🔢",
    color: "from-amber-500 to-yellow-600",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    description: "Resuelve problemas matemáticos",
    timeLimit: 1500, // 25 minutos
    type: "numberInput",
    storageKey: "timeLeftNumericalSkills",
  },
  {
    id: "reasoningSkills",
    title: "Razonamiento",
    icon: "🧠",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50 dark:bg-violet-900/20",
    borderColor: "border-violet-200 dark:border-violet-800",
    description: "Clasificación, analogías y secuencias lógicas",
    timeLimit: 300, // 5 minutos
    type: "multipleChoice",
    storageKey: "timeLeftReasoningSkills",
  },
  {
    id: "vocabularySkills",
    title: "Vocabulario",
    icon: "📚",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    description: "Encuentra sinónimos de palabras",
    timeLimit: 360, // 6 minutos
    type: "multipleChoice",
    storageKey: "timeLeftVocabularySkills",
  },
  {
    id: "spatialSkills",
    title: "Habilidad Espacial",
    icon: "🧊",
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-50 dark:bg-sky-900/20",
    borderColor: "border-sky-200 dark:border-sky-800",
    description: "Conteo de cubos, papel doblado y formas sólidas",
    timeLimit: 540, // 9 minutos
    type: "spatial",
    storageKey: "timeLeftSpatialSkills",
  },
];

// ============================================
// INITIAL STATE GENERATOR
// ============================================

const generateInitialState = () => ({
  attentionSkills: Object.fromEntries(
    Array.from({ length: 14 }, (_, i) => [`A${i + 1}`, null])
  ),
  numericalSkills: Object.fromEntries(
    Array.from({ length: 9 }, (_, i) => [`N${i + 1}`, null])
  ),
  reasoningSkills: Object.fromEntries(
    Array.from({ length: 11 }, (_, i) => [`R${i + 1}`, null])
  ),
  vocabularySkills: Object.fromEntries(
    Array.from({ length: 32 }, (_, i) => [`V${i + 1}`, null])
  ),
  spatialSkills: {
    cubeCounting: Object.fromEntries(
      Array.from({ length: 9 }, (_, i) => [`ES${i + 1}`, null])
    ),
    foldedPaper: Object.fromEntries(
      Array.from({ length: 4 }, (_, i) => [`ES${i + 10}`, null])
    ),
    assemblySolidForms: Object.fromEntries(
      Array.from({ length: 4 }, (_, i) => [`ES${i + 14}`, null])
    ),
  },
});

// ============================================
// HELPER FUNCTIONS
// ============================================

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const getAreaQuestionCount = (areaId) => {
  if (areaId === "spatialSkills") {
    return 17; // 9 + 4 + 4
  }
  const areaQuestions = questions.phbQuestions[areaId];
  return areaQuestions ? Object.keys(areaQuestions).length : 0;
};

const countAreaAnswered = (testAnswers, areaId) => {
  if (areaId === "spatialSkills") {
    const spatial = testAnswers.spatialSkills;
    let count = 0;
    Object.values(spatial.cubeCounting).forEach((v) => v !== null && count++);
    Object.values(spatial.foldedPaper).forEach((v) => v !== null && count++);
    Object.values(spatial.assemblySolidForms).forEach(
      (v) => v !== null && count++
    );
    return count;
  }
  return Object.values(testAnswers[areaId] || {}).filter((v) => v !== null)
    .length;
};

const getTotalQuestions = () => {
  return AREAS.reduce(
    (total, area) => total + getAreaQuestionCount(area.id),
    0
  );
};

const getTotalAnswered = (testAnswers) => {
  return AREAS.reduce(
    (total, area) => total + countAreaAnswered(testAnswers, area.id),
    0
  );
};

// ============================================
// REUSABLE UI COMPONENTS
// ============================================

// Overall Progress Bar
const OverallProgressBar = ({ answered, total }) => {
  const percentage = Math.round((answered / total) * 100);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Progreso total
        </span>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
          {answered} / {total} ({percentage}%)
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-500 via-violet-500 to-sky-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Area Progress Indicators
const AreaProgress = ({ areas, currentAreaIndex, testAnswers, timers }) => {
  return (
    <div className="flex justify-center flex-wrap gap-3 mb-6">
      {areas.map((area, index) => {
        const answered = countAreaAnswered(testAnswers, area.id);
        const total = getAreaQuestionCount(area.id);
        const isComplete = answered === total;
        const isCurrent = index === currentAreaIndex;
        const isPast = index < currentAreaIndex;
        const timeLeft = timers[area.id] || area.timeLimit;
        const timeExpired = timeLeft <= 0;

        return (
          <div key={area.id} className="flex flex-col items-center">
            <div
              className={`
                w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl
                transition-all duration-300 transform
                ${
                  isCurrent
                    ? `bg-gradient-to-br ${area.color} text-white scale-110 shadow-lg`
                    : isComplete || isPast
                    ? "bg-green-500 text-white"
                    : timeExpired
                    ? "bg-red-400 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                }
              `}
            >
              {(isComplete || isPast) && !isCurrent ? "✓" : area.icon}
            </div>
            <span
              className={`text-xs mt-1.5 font-semibold ${
                isCurrent
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {answered}/{total}
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 hidden sm:block max-w-[60px] text-center truncate">
              {area.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Timer Display Component
const TimerDisplay = ({ timeLeft, initialTime, isUrgent }) => {
  const percentage = (timeLeft / initialTime) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Tiempo restante
        </span>
        <span
          className={`text-lg font-bold ${
            isUrgent
              ? "text-red-500 animate-pulse"
              : "text-blue-600 dark:text-blue-400"
          }`}
        >
          {formatTime(timeLeft)}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isUrgent
              ? "bg-red-500"
              : percentage > 50
              ? "bg-green-500"
              : percentage > 25
              ? "bg-yellow-500"
              : "bg-orange-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Floating Timer Button
const FloatingTimer = ({ timeLeft, isUrgent, areaColor }) => {
  return (
    <div className="fixed bottom-24 right-5 z-40">
      <div
        className={`
          w-16 h-16 rounded-full shadow-lg flex items-center justify-center
          font-bold text-white text-sm
          ${
            isUrgent
              ? "bg-red-500 animate-pulse"
              : `bg-gradient-to-br ${areaColor}`
          }
        `}
      >
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

// Floating Save Button
const FloatingSaveButton = ({ onSave, loading, saved }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onSave}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        disabled={loading || saved}
        className={`
          w-14 h-14 rounded-full shadow-lg
          flex items-center justify-center
          transition-all duration-300 transform hover:scale-110
          ${saved ? "bg-green-500" : "bg-indigo-500 hover:bg-indigo-600"}
        `}
      >
        {loading ? (
          <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : saved ? (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <FaSave className="w-6 h-6 text-white" />
        )}
      </button>

      {showTooltip && (
        <div className="absolute bottom-16 right-0 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
          {saved ? "✓ Guardado" : "Guardar progreso"}
        </div>
      )}
    </div>
  );
};

// Area Introduction Screen
const AreaIntro = ({ area, onStart, questionsCount, areaNumber, timeLeft }) => {
  const instructions = {
    attentionSkills: {
      main: "En los ejercicios de esta área encontrarás una lista de números. Tu tarea es encontrar cuántos pares de números juntos suman 10.",
      example: {
        numbers: [2, 7, 5, 5, 4, 3, 1, 2, 8, 6, 8, 5, 9, 1, 3, 3],
        highlighted: [2, 3, 7, 8, 12, 13],
        explanation:
          "En este ejemplo, hay 3 pares de números juntos que suman 10 (5+5, 2+8, 9+1).",
      },
      warning:
        "Si la lista tiene varias filas, el último número de una fila está conectado con el primero de la siguiente.",
    },
    numericalSkills: {
      main: "Tu tarea consiste en resolver distintos problemas matemáticos. Usa papel para realizar los cálculos necesarios.",
      example: {
        problem:
          "¿Cuánto costará una docena y media de borradores a S/. 10 cada docena?",
        solution:
          "Si una docena cuesta S/. 10, entonces media docena cuesta S/. 5. Una docena y media = S/. 15",
      },
    },
    reasoningSkills: {
      main: "Deberás realizar tres tipos de ejercicios: Clasificación (encontrar la palabra diferente), Analogías (completar relaciones) y Secuencias Lógicas (encontrar patrones numéricos).",
      examples: [
        {
          type: "Clasificación",
          question: "Perú, Francia, Alemania, Piura, Argentina",
          answer: "Piura (es ciudad, no país)",
        },
        {
          type: "Analogía",
          question: "BLANCO es a NEGRO como CALOR es a:",
          answer: "Frío (son opuestos)",
        },
        {
          type: "Secuencia",
          question: "3, 6, 9, 12, ?, 18, 21, ?, 27, 30",
          answer: "15 y 24 (avanza de 3 en 3)",
        },
      ],
    },
    vocabularySkills: {
      main: "Tu tarea es leer la palabra en mayúsculas y encontrar cuál de las alternativas significa lo mismo (sinónimo).",
      example: {
        word: "ASISTIR",
        options: ["Agregar", "Concurrir", "Vigilar", "Consentir"],
        answer: "Concurrir",
      },
    },
    spatialSkills: {
      main: "Esta área tiene 3 secciones: Conteo de cubos (contar cubos en figuras 3D), Papel doblado (visualizar orificios al desdoblar) y Armado de formas sólidas (identificar figuras desarmadas).",
      sections: [
        {
          name: "Conteo de cubos",
          desc: "Cuenta todos los cubos, incluyendo los que no se ven completamente",
        },
        {
          name: "Papel doblado",
          desc: "Identifica cómo se verá el papel al desdoblarlo después de hacerle un orificio",
        },
        {
          name: "Armado de formas",
          desc: "Encuentra cuál alternativa, al armarse, forma la figura mostrada",
        },
      ],
    },
  };

  const areaInstructions = instructions[area.id];

  return (
    <div className="text-center py-6 animate-fadeIn">
      <div className="inline-block mb-2">
        <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          Área {areaNumber} de 5
        </span>
      </div>

      <div
        className={`
          w-20 h-20 mx-auto mb-4 rounded-3xl
          bg-gradient-to-br ${area.color}
          flex items-center justify-center shadow-xl
          transform transition-transform hover:scale-105
        `}
      >
        <span className="text-4xl">{area.icon}</span>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        {area.title}
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
        {area.description}
      </p>

      {/* Stats */}
      <div
        className={`${area.bgColor} ${area.borderColor} border-2 rounded-2xl p-4 mb-4 max-w-sm mx-auto`}
      >
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">📝</span>
            <span className="font-bold text-gray-700 dark:text-gray-200">
              {questionsCount}
            </span>
            <span className="text-gray-500 dark:text-gray-400">ejercicios</span>
          </div>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
          <div className="flex items-center gap-2">
            <span className="text-lg">⏱️</span>
            <span className="font-bold text-gray-700 dark:text-gray-200">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      {/* Instructions Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-4 max-w-lg mx-auto text-left">
        <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
          <span>📋</span> Instrucciones
        </h3>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          {areaInstructions.main}
        </p>
      </div>

      {/* Warning */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700 rounded-2xl p-4 mb-6 max-w-lg mx-auto">
        <div className="flex items-center gap-3 text-amber-800 dark:text-amber-200">
          <span className="text-2xl">⚠️</span>
          <div className="text-left">
            <p className="font-bold text-sm">¡PARA AQUÍ!</p>
            <p className="text-xs">
              No inicies hasta que estés listo. El temporizador comenzará
              inmediatamente.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className={`
          bg-gradient-to-r ${area.color} text-white
          px-10 py-4 rounded-xl font-bold text-lg
          shadow-lg hover:shadow-xl
          transition-all duration-300 transform hover:scale-105
          inline-flex items-center gap-3
        `}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Iniciar Área
      </button>
    </div>
  );
};

// Number Input Question (Attention & Numerical)
const NumberInputQuestion = ({
  questionId,
  questionData,
  answer,
  onChange,
  areaId,
  areaColor,
}) => {
  const isAttention = areaId === "attentionSkills";
  const displayId = questionId.replace(/[^0-9]/g, "");

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm
        border-2 transition-all duration-300
        ${
          answer !== null && answer !== ""
            ? "border-green-300 dark:border-green-700"
            : "border-gray-100 dark:border-gray-700"
        }
      `}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`
            w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold
            bg-gradient-to-br ${areaColor} text-white shadow-sm
          `}
        >
          {displayId}
        </div>
        <span className="font-semibold text-gray-700 dark:text-gray-200">
          Ejercicio {displayId}
        </span>
      </div>

      {isAttention ? (
        <div className="flex flex-wrap gap-1.5 mb-4 justify-center bg-gray-100 dark:bg-gray-700 p-3 rounded-xl">
          {questionData.numbersList.map((num, idx) => (
            <span
              key={idx}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-gray-600 text-gray-800 dark:text-white font-bold text-lg shadow-sm"
            >
              {num}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-200 mb-4 font-medium">
          {questionData.statement}
        </p>
      )}

      <input
        type="text"
        value={answer === null ? "" : answer}
        onChange={(e) => {
          const cleaned = e.target.value.replace(/[^0-9.]/g, "");
          const value = cleaned === "" ? null : parseFloat(cleaned) || cleaned;
          onChange(questionId, value);
        }}
        placeholder="Escribe tu respuesta..."
        className="w-full p-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 
                   bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white
                   focus:border-blue-400 dark:focus:border-blue-500 focus:outline-none
                   transition-colors text-center font-semibold text-lg"
      />
    </div>
  );
};

// Multiple Choice Question (Reasoning & Vocabulary)
const MultipleChoiceQuestion = ({
  questionId,
  questionData,
  answer,
  onChange,
  areaId,
  areaColor,
}) => {
  const displayId = questionId.replace(/[^0-9]/g, "");
  const isVocabulary = areaId === "vocabularySkills";

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm
        border-2 transition-all duration-300
        ${
          answer !== null
            ? "border-green-300 dark:border-green-700"
            : "border-gray-100 dark:border-gray-700"
        }
      `}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`
            w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold
            bg-gradient-to-br ${areaColor} text-white shadow-sm
          `}
        >
          {displayId}
        </div>
        {isVocabulary ? (
          <span className="font-bold text-xl text-gray-800 dark:text-white uppercase">
            {questionData.word}
          </span>
        ) : (
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {questionData.statement}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {questionData.alternatives.map((alt, idx) => {
          const optionValue = String.fromCharCode(65 + idx);
          const isSelected = answer === optionValue;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(questionId, optionValue)}
              className={`
                p-3 rounded-xl font-medium text-left
                transition-all duration-300 transform
                ${
                  isSelected
                    ? `bg-gradient-to-r ${areaColor} text-white scale-[1.02] shadow-md`
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }
              `}
            >
              <span className="font-bold mr-2">
                {String.fromCharCode(97 + idx)}.
              </span>
              {alt}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Spatial Section - Cube Counting
const CubeCountingQuestion = ({
  questionId,
  questionData,
  answer,
  onChange,
  areaColor,
}) => {
  const displayId = questionId.replace(/[^0-9]/g, "");

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm
        border-2 transition-all duration-300
        ${
          answer !== null && answer !== ""
            ? "border-green-300 dark:border-green-700"
            : "border-gray-100 dark:border-gray-700"
        }
      `}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`
            w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold
            bg-gradient-to-br ${areaColor} text-white
          `}
        >
          {displayId}
        </div>
      </div>

      <div className="flex justify-center mb-3">
        <img
          src={questionData.imgUrlStatement}
          alt={`Ejercicio ${displayId}`}
          className="h-32 object-contain"
        />
      </div>

      <input
        type="text"
        value={answer === null ? "" : answer}
        onChange={(e) => {
          const cleaned = e.target.value.replace(/[^0-9]/g, "");
          const value = cleaned === "" ? null : parseInt(cleaned);
          onChange(questionId, value);
        }}
        placeholder="¿Cuántos cubos?"
        className="w-full p-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 
                   bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white
                   focus:border-blue-400 focus:outline-none text-center font-semibold"
      />
    </div>
  );
};

// Spatial Section - Folded Paper & Solid Forms
const ImageChoiceQuestion = ({
  questionId,
  questionData,
  answer,
  onChange,
  areaColor,
  sectionType,
}) => {
  const displayId = questionId.replace(/[^0-9]/g, "");

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm
        border-2 transition-all duration-300
        ${
          answer !== null
            ? "border-green-300 dark:border-green-700"
            : "border-gray-100 dark:border-gray-700"
        }
      `}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`
            w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold
            bg-gradient-to-br ${areaColor} text-white
          `}
        >
          {displayId}
        </div>
        <span className="font-semibold text-gray-700 dark:text-gray-200">
          Ejercicio {displayId}
        </span>
      </div>

      <div className="flex justify-center mb-4">
        <img
          src={questionData.imgUrlStatement}
          alt={`Ejercicio ${displayId}`}
          className="h-32 object-contain"
        />
      </div>

      <div className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded mb-4" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {questionData.alternatives.map((alt, idx) => {
          const optionValue = String.fromCharCode(65 + idx);
          const isSelected = answer === optionValue;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(questionId, optionValue)}
              className={`
                p-2 rounded-xl transition-all duration-300
                ${
                  isSelected
                    ? `ring-4 ring-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-105`
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }
              `}
            >
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">
                {String.fromCharCode(97 + idx)})
              </div>
              <img
                src={alt}
                alt={`Opción ${idx + 1}`}
                className="h-20 mx-auto object-contain"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Completion Screen
const CompletionScreen = ({
  onRetake,
  loading,
  showRetakeModal,
  setShowRetakeModal,
}) => {
  return (
    <div className="text-center py-8 animate-fadeIn">
      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-xl">
        <span className="text-6xl">🎉</span>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        ¡Felicidades!
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Has completado con éxito el Test de Prueba de Habilidades Básicas (PHB).
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/final-vocational-test-report"
          className="
            bg-gradient-to-r from-blue-500 to-indigo-600 text-white
            px-8 py-4 rounded-xl font-bold text-lg
            shadow-lg hover:shadow-xl
            transition-all duration-300 transform hover:scale-105
            inline-flex items-center justify-center gap-2
          "
        >
          VER RESULTADOS
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </a>

        <button
          onClick={() => setShowRetakeModal(true)}
          disabled={loading}
          className="
            border-2 border-gray-300 dark:border-gray-600
            text-gray-700 dark:text-gray-200
            px-8 py-4 rounded-xl font-bold text-lg
            hover:bg-gray-100 dark:hover:bg-gray-700
            transition-all duration-300
            inline-flex items-center justify-center gap-2
          "
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              VOLVER A REALIZAR
            </>
          )}
        </button>
      </div>
      <RetakeConfirmModal
        isOpen={showRetakeModal}
        onClose={() => setShowRetakeModal(false)}
        onConfirm={() => {
          setShowRetakeModal(false);
          onRetake();
        }}
        loading={loading}
        testName="Test PHB"
      />
    </div>
  );
};

// Unanswered Questions Warning
const UnansweredWarning = ({ count, areaTitle }) => {
  if (count === 0) return null;

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4 mt-4 animate-fadeIn mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-red-100 dark:bg-red-800  rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-xl">⚠️</span>
        </div>
        <div className="flex-1">
          <p className="font-bold text-red-600 dark:text-red-300">
            {count}{" "}
            {count === 1 ? "pregunta sin responder" : "preguntas sin responder"}
          </p>
          <p className="text-sm text-red-600 dark:text-red-400">
            Debes completar todos los ejercicios de "{areaTitle}" antes de
            continuar, o esperar a que se agote el tiempo.
          </p>
        </div>
      </div>
    </div>
  );
};

// Navigation Buttons Component
const AreaNavigationButtons = ({
  onPrev,
  onNext,
  isFirst,
  isLast,
  loading,
  canGoBack,
  currentAreaComplete,
  timeExpired,
  areaCompleted,
}) => {
  const canProceed = currentAreaComplete || timeExpired || areaCompleted;

  return (
    <div className="flex gap-4 mt-6">
      {!isFirst && canGoBack && (
        <button
          type="button"
          onClick={onPrev}
          className="
            flex-1 py-3.5 px-6 rounded-xl font-bold
            bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200
            hover:bg-gray-200 dark:hover:bg-gray-600
            transition-all duration-300 transform hover:scale-[1.02]
            flex items-center justify-center gap-2
          "
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Área Anterior
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={loading}
        className={`
          flex-1 py-3.5 px-6 rounded-xl font-bold
          transition-all duration-300 transform hover:scale-[1.02]
          flex items-center justify-center gap-2
          ${
            isLast
              ? canProceed
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                : "bg-gradient-to-r from-green-400 to-emerald-500 text-white/80"
              : canProceed
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
              : "bg-gradient-to-r from-blue-400 to-indigo-500 text-white/80"
          }
        `}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Enviando...
          </>
        ) : isLast ? (
          <>
            Finalizar Test
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </>
        ) : (
          <>
            Siguiente Área
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};

// Time Expired Modal Component
const TimeExpiredModal = ({ isOpen, areaTitle, onContinue }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-4xl">⏰</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-2">
          ¡Tiempo agotado!
        </h3>

        {/* Message */}
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
          El tiempo para el área de{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            "{areaTitle}"
          </span>{" "}
          ha terminado. Continuarás a la siguiente área.
        </p>

        {/* Button */}
        <button
          onClick={onContinue}
          className="w-full py-3 px-6 rounded-xl font-bold text-white
                     bg-gradient-to-r from-blue-500 to-indigo-600
                     hover:from-blue-600 hover:to-indigo-700
                     transition-all duration-300 transform hover:scale-[1.02]
                     shadow-lg shadow-blue-500/30
                     flex items-center justify-center gap-2"
        >
          Continuar
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Exit Confirmation Modal Component
const ExitConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-4xl">🚪</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-2">
          ¿Salir del test?
        </h3>

        {/* Message */}
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
          Tu progreso se guardará automáticamente. Podrás continuar donde lo
          dejaste cuando regreses.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-6 rounded-xl font-bold
                       bg-gray-100 dark:bg-gray-700 
                       text-gray-700 dark:text-gray-200
                       hover:bg-gray-200 dark:hover:bg-gray-600
                       transition-all duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-6 rounded-xl font-bold text-white
                       bg-gradient-to-r from-red-500 to-rose-600
                       hover:from-red-600 hover:to-rose-700
                       transition-all duration-300 transform hover:scale-[1.02]
                       shadow-lg shadow-red-500/30
                       flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};

// Exit Button Component
const ExitButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 z-40
                 flex items-center gap-2 px-5 py-3 rounded-xl
                 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg
                 border-2 border-gray-200 dark:border-gray-700
                 text-gray-600 dark:text-gray-300
                 hover:bg-red-50 dark:hover:bg-red-900/20
                 hover:border-red-300 dark:hover:border-red-700
                 hover:text-red-600 dark:hover:text-red-400
                 transition-all duration-300 shadow-lg
                 group"
    >
      <FaX className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
      <span className="font-bold text-sm md:text-base">SALIR</span>
    </button>
  );
};

// Modal de Confirmación para Volver a Realizar
const RetakeConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  testName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
          <span className="text-4xl">⚠️</span>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-2">
          ¿Volver a realizar el test?
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
          Si vuelves a realizar el <strong>{testName}</strong>, tus respuestas
          anteriores serán eliminadas y deberás completar el test nuevamente.
        </p>

        {/* Warning box */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 mb-6">
          <p className="text-amber-700 dark:text-amber-400 text-sm text-center">
            <strong>⚠️ Esta acción no se puede deshacer</strong>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Procesando...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Sí, volver a realizar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

const PhbTest = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const {
    createUpdatePhbTest,
    finishPhbTest,
    generateResultPhbTest,
    getPhbTest,
    resetPhbTest,
  } = useVocationalTests();

  // State
  const [loading, setLoading] = useState(false);
  const [progressLoading, setProgressLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [progressSaved, setProgressSaved] = useState(false);
  const [completedTest, setCompletedTest] = useState(null);
  const [testAnswers, setTestAnswers] = useState(generateInitialState());

  // Navigation state
  const [currentAreaIndex, setCurrentAreaIndex] = useState(0);
  const [showAreaIntro, setShowAreaIntro] = useState(true);
  const [areaStarted, setAreaStarted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showTimeExpiredModal, setShowTimeExpiredModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showRetakeModal, setShowRetakeModal] = useState(false);

  // Track which areas have been completed (by answering all or time expired)
  const [completedAreas, setCompletedAreas] = useState({
    attentionSkills: false,
    numericalSkills: false,
    reasoningSkills: false,
    vocabularySkills: false,
    spatialSkills: false,
  });

  // Timers state - one for each area
  const [timers, setTimers] = useState({
    attentionSkills: 720,
    numericalSkills: 1500,
    reasoningSkills: 300,
    vocabularySkills: 360,
    spatialSkills: 540,
  });

  // Current area
  const currentArea = AREAS[currentAreaIndex];

  // Check if current area is fully answered
  const isCurrentAreaComplete = useMemo(() => {
    const answered = countAreaAnswered(testAnswers, currentArea.id);
    const total = getAreaQuestionCount(currentArea.id);
    return answered === total;
  }, [testAnswers, currentArea.id]);

  // Count unanswered in current area
  const unansweredCount = useMemo(() => {
    const answered = countAreaAnswered(testAnswers, currentArea.id);
    const total = getAreaQuestionCount(currentArea.id);
    return total - answered;
  }, [testAnswers, currentArea.id]);

  // Calculations
  const totalQuestions = useMemo(() => getTotalQuestions(), []);
  const totalAnswered = useMemo(
    () => getTotalAnswered(testAnswers),
    [testAnswers]
  );

  // Timer logic
  useEffect(() => {
    if (!areaStarted || showAreaIntro || completedTest) return;

    const timer = setInterval(() => {
      setTimers((prev) => {
        const currentTime = prev[currentArea.id];
        if (currentTime <= 0) {
          clearInterval(timer);
          handleTimeExpired();
          return prev;
        }
        const newTime = currentTime - 1;
        localStorage.setItem(`${currentArea.storageKey}${userId}`, newTime);
        return { ...prev, [currentArea.id]: newTime };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [areaStarted, showAreaIntro, currentArea.id, completedTest]);

  const handleTimeExpired = () => {
    // Mark area as completed due to time expiration
    setCompletedAreas((prev) => ({ ...prev, [currentArea.id]: true }));

    // Show custom modal instead of alert
    setShowTimeExpiredModal(true);
  };

  const handleTimeExpiredContinue = () => {
    setShowTimeExpiredModal(false);

    // Auto-advance to next area
    if (currentAreaIndex < AREAS.length - 1) {
      setCurrentAreaIndex((prev) => prev + 1);
      setShowAreaIntro(true);
      setAreaStarted(false);
      setShowWarning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  };

  const handleExitClick = () => {
    completedTest ? (window.location.href = "/main") : setShowExitModal(true);
  };

  const handleExitConfirm = async () => {
    // Save progress before exiting
    try {
      await createUpdatePhbTest({ testAnswers });
    } catch (error) {
      console.error("Error saving progress:", error);
    }
    // Redirect to home page
    window.location.href = "/main";
  };

  const handleExitCancel = () => {
    setShowExitModal(false);
  };

  // Handlers
  const handleAnswerChange = useCallback(
    (questionId, value) => {
      setShowWarning(false);
      setTestAnswers((prev) => {
        const newAnswers = {
          ...prev,
          [currentArea.id]: {
            ...prev[currentArea.id],
            [questionId]: value,
          },
        };
        localStorage.setItem(
          `phbTestAnswers${userId}`,
          JSON.stringify(newAnswers)
        );
        return newAnswers;
      });
    },
    [currentArea.id, userId]
  );

  const handleSpatialAnswerChange = useCallback(
    (sectionName, questionId, value) => {
      setShowWarning(false);
      setTestAnswers((prev) => {
        const newAnswers = {
          ...prev,
          spatialSkills: {
            ...prev.spatialSkills,
            [sectionName]: {
              ...prev.spatialSkills[sectionName],
              [questionId]: value,
            },
          },
        };
        localStorage.setItem(
          `phbTestAnswers${userId}`,
          JSON.stringify(newAnswers)
        );
        return newAnswers;
      });
    },
    [userId]
  );

  const handleStartArea = useCallback(() => {
    setShowAreaIntro(false);
    setAreaStarted(true);
    setShowWarning(false);
  }, []);

  const handleNextArea = useCallback(() => {
    // Validate: must complete all questions OR time must have expired
    const timeExpired = timers[currentArea.id] <= 0;
    const areaAlreadyCompleted = completedAreas[currentArea.id];

    if (!isCurrentAreaComplete && !timeExpired && !areaAlreadyCompleted) {
      setShowWarning(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Mark area as completed
    setCompletedAreas((prev) => ({ ...prev, [currentArea.id]: true }));
    setShowWarning(false);

    if (currentAreaIndex < AREAS.length - 1) {
      setCurrentAreaIndex((prev) => prev + 1);
      setShowAreaIntro(true);
      setAreaStarted(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  }, [
    currentAreaIndex,
    isCurrentAreaComplete,
    timers,
    currentArea.id,
    completedAreas,
  ]);

  const handlePrevArea = useCallback(() => {
    if (currentAreaIndex > 0) {
      setCurrentAreaIndex((prev) => prev - 1);
      setShowAreaIntro(false);
      setAreaStarted(true);
      setShowWarning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentAreaIndex]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await finishPhbTest({ testAnswers });
      if (res) {
        await generateResultPhbTest();
        // Clear all localStorage
        localStorage.removeItem(`phbTestAnswers${userId}`);
        AREAS.forEach((area) => {
          localStorage.removeItem(`${area.storageKey}${userId}`);
        });
        setCompletedTest(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProgress = async () => {
    try {
      setProgressLoading(true);
      const res = await createUpdatePhbTest({ testAnswers });
      if (res) {
        setProgressSaved(true);
        setTimeout(() => setProgressSaved(false), 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProgressLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      setResetLoading(true);
      const res = await resetPhbTest();
      if (res) {
        setCompletedTest(false);
        setTestAnswers(generateInitialState());
        setCurrentAreaIndex(0);
        setShowAreaIntro(true);
        setAreaStarted(false);
        setShowWarning(false);
        setCompletedAreas({
          attentionSkills: false,
          numericalSkills: false,
          reasoningSkills: false,
          vocabularySkills: false,
          spatialSkills: false,
        });
        setTimers({
          attentionSkills: 720,
          numericalSkills: 1500,
          reasoningSkills: 300,
          vocabularySkills: 360,
          spatialSkills: 540,
        });
        localStorage.removeItem(`phbTestAnswers${userId}`);
        AREAS.forEach((area) => {
          localStorage.removeItem(`${area.storageKey}${userId}`);
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setResetLoading(false);
    }
  };

  // Load saved progress
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load saved answers
        const savedAnswers = localStorage.getItem(`phbTestAnswers${userId}`);
        if (savedAnswers) {
          setTestAnswers(JSON.parse(savedAnswers));
        } else {
          const response = await getPhbTest();
          if (response?.testAnswers) {
            setTestAnswers(response.testAnswers);
            localStorage.setItem(
              `phbTestAnswers${userId}`,
              JSON.stringify(response.testAnswers)
            );
          }
        }

        // Load saved timers
        const newTimers = { ...timers };
        AREAS.forEach((area) => {
          const savedTime = localStorage.getItem(`${area.storageKey}${userId}`);
          if (savedTime) {
            newTimers[area.id] = parseInt(savedTime);
          }
        });
        setTimers(newTimers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (completedTest === false) {
      fetchData();
    }
  }, [userId, getPhbTest, completedTest]);

  // Load completion status
  useEffect(() => {
    setCompletedTest(user?.completedPhbTest);
  }, [user]);

  // Render questions based on area type
  const renderQuestions = () => {
    const areaId = currentArea.id;

    if (areaId === "spatialSkills") {
      const spatialData = questions.phbQuestions.spatialSkills;

      return (
        <div className="space-y-8">
          {/* Cube Counting Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white text-sm">
                I
              </span>
              Conteo de Cubos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(spatialData.cubeCounting).map(([qId, qData]) => (
                <CubeCountingQuestion
                  key={qId}
                  questionId={qId}
                  questionData={qData}
                  answer={testAnswers.spatialSkills.cubeCounting[qId]}
                  onChange={(id, val) =>
                    handleSpatialAnswerChange("cubeCounting", id, val)
                  }
                  areaColor={currentArea.color}
                />
              ))}
            </div>
          </div>

          {/* Folded Paper Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white text-sm">
                II
              </span>
              Papel Doblado
            </h3>
            <div className="space-y-4">
              {Object.entries(spatialData.foldedPaper).map(([qId, qData]) => (
                <ImageChoiceQuestion
                  key={qId}
                  questionId={qId}
                  questionData={qData}
                  answer={testAnswers.spatialSkills.foldedPaper[qId]}
                  onChange={(id, val) =>
                    handleSpatialAnswerChange("foldedPaper", id, val)
                  }
                  areaColor={currentArea.color}
                  sectionType="foldedPaper"
                />
              ))}
            </div>
          </div>

          {/* Assembly Solid Forms Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white text-sm">
                III
              </span>
              Armado de Formas Sólidas
            </h3>
            <div className="space-y-4">
              {Object.entries(spatialData.assemblySolidForms).map(
                ([qId, qData]) => (
                  <ImageChoiceQuestion
                    key={qId}
                    questionId={qId}
                    questionData={qData}
                    answer={testAnswers.spatialSkills.assemblySolidForms[qId]}
                    onChange={(id, val) =>
                      handleSpatialAnswerChange("assemblySolidForms", id, val)
                    }
                    areaColor={currentArea.color}
                    sectionType="assemblySolidForms"
                  />
                )
              )}
            </div>
          </div>
        </div>
      );
    }

    const areaQuestions = questions.phbQuestions[areaId];
    if (!areaQuestions) return null;

    if (currentArea.type === "numberInput") {
      return (
        <div className="space-y-4">
          {Object.entries(areaQuestions).map(([qId, qData]) => (
            <NumberInputQuestion
              key={qId}
              questionId={qId}
              questionData={qData}
              answer={testAnswers[areaId][qId]}
              onChange={handleAnswerChange}
              areaId={areaId}
              areaColor={currentArea.color}
            />
          ))}
        </div>
      );
    }

    if (currentArea.type === "multipleChoice") {
      return (
        <div className="space-y-4">
          {Object.entries(areaQuestions).map(([qId, qData]) => (
            <MultipleChoiceQuestion
              key={qId}
              questionId={qId}
              questionData={qData}
              answer={testAnswers[areaId][qId]}
              onChange={handleAnswerChange}
              areaId={areaId}
              areaColor={currentArea.color}
            />
          ))}
        </div>
      );
    }

    return null;
  };

  const isLastArea = currentAreaIndex === AREAS.length - 1;
  const isFirstArea = currentAreaIndex === 0;
  const currentTimeLeft = timers[currentArea.id];
  const isUrgentTime = currentTimeLeft <= 60;
  const timeExpiredForArea = currentTimeLeft <= 0;

  // Can go back if previous areas exist and were completed
  const canGoBack = currentAreaIndex > 0;

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
      `}</style>

      <div className="bg-gradient-to-br from-slate-50 via-rose-50 to-sky-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 min-h-screen py-8 px-4">
        <div className="max-w-3xl mx-auto mt-20">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/30 mb-4">
              <span className="text-3xl">🧪</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Test PHB
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Test de Habilidades Básicas
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl p-6">
            {completedTest ? (
              <CompletionScreen
                onRetake={handleReset}
                loading={resetLoading}
                showRetakeModal={showRetakeModal}
                setShowRetakeModal={setShowRetakeModal}
              />
            ) : (
              <>
                {/* Overall Progress */}
                <OverallProgressBar
                  answered={totalAnswered}
                  total={totalQuestions}
                />

                {/* Area Progress */}
                <AreaProgress
                  areas={AREAS}
                  currentAreaIndex={currentAreaIndex}
                  testAnswers={testAnswers}
                  timers={timers}
                />

                {showAreaIntro ? (
                  <AreaIntro
                    area={currentArea}
                    onStart={handleStartArea}
                    questionsCount={getAreaQuestionCount(currentArea.id)}
                    areaNumber={currentAreaIndex + 1}
                    timeLeft={currentTimeLeft}
                  />
                ) : (
                  <>
                    {/* Area Header with Timer */}
                    <div
                      className={`${currentArea.bgColor} ${currentArea.borderColor} border-2 rounded-2xl p-4 mb-4`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{currentArea.icon}</span>
                          <h2 className="font-bold text-gray-800 dark:text-white">
                            {currentArea.title}
                          </h2>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Área {currentAreaIndex + 1}/5
                        </span>
                      </div>
                      <TimerDisplay
                        timeLeft={currentTimeLeft}
                        initialTime={currentArea.timeLimit}
                        isUrgent={isUrgentTime}
                      />
                    </div>

                    {/* Warning for unanswered questions */}
                    {showWarning && (
                      <UnansweredWarning
                        count={unansweredCount}
                        areaTitle={currentArea.title}
                      />
                    )}

                    {/* Time expired notice */}
                    {timeExpiredForArea && !isCurrentAreaComplete && (
                      <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-2xl p-4 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">⏰</span>
                          <div>
                            <p className="font-bold text-red-800 dark:text-red-200">
                              Tiempo agotado
                            </p>
                            <p className="text-sm text-red-600 dark:text-red-400">
                              Puedes continuar a la siguiente área o revisar tus
                              respuestas actuales.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Completion status for current area */}
                    {isCurrentAreaComplete && (
                      <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-700 rounded-2xl p-4 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">✅</span>
                          <div>
                            <p className="font-bold text-green-800 dark:text-green-200">
                              ¡Área completada!
                            </p>
                            <p className="text-sm text-green-600 dark:text-green-400">
                              Has respondido todos los ejercicios. Puedes
                              continuar o revisar tus respuestas.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Questions */}
                    <div className="animate-fadeIn">{renderQuestions()}</div>

                    {/* Navigation Buttons */}
                    <AreaNavigationButtons
                      onPrev={handlePrevArea}
                      onNext={handleNextArea}
                      isFirst={isFirstArea}
                      isLast={isLastArea}
                      loading={loading}
                      canGoBack={canGoBack}
                      currentAreaComplete={isCurrentAreaComplete}
                      timeExpired={timeExpiredForArea}
                      areaCompleted={completedAreas[currentArea.id]}
                    />
                  </>
                )}
              </>
            )}
          </div>

          {/* Help text */}
          {!completedTest && (
            <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-6">
              💾 Tu progreso se guarda automáticamente
            </p>
          )}
        </div>

        {/* Floating Elements */}
        {!completedTest && !showAreaIntro && (
          <>
            <FloatingTimer
              timeLeft={currentTimeLeft}
              isUrgent={isUrgentTime}
              areaColor={currentArea.color}
            />
            <FloatingSaveButton
              onSave={handleSaveProgress}
              loading={progressLoading}
              saved={progressSaved}
            />
          </>
        )}

        <TimeExpiredModal
          isOpen={showTimeExpiredModal}
          areaTitle={currentArea.title}
          onContinue={handleTimeExpiredContinue}
        />

        {/* Exit Confirmation Modal */}
        <ExitConfirmModal
          isOpen={showExitModal}
          onConfirm={handleExitConfirm}
          onCancel={handleExitCancel}
        />

        {/* Exit Button - Only show when test is not completed */}
        <ExitButton onClick={handleExitClick} />
      </div>
    </>
  );
};

export default PhbTest;
