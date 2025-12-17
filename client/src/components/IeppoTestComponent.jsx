import { useEffect, useState, useCallback, useMemo } from "react";
import { useVocationalTests } from "../context/vocationalTestContext";
import { useAuth } from "../context/authContext";
import questions from "../data/questions.json";
import { FaSave } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

// ============================================
// CONSTANTS & CONFIGURATION
// ============================================

const QUESTIONS_PER_PAGE = 5; // Show 5 questions at a time for better UX

const SECTIONS = [
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

// ============================================
// INITIAL STATE GENERATOR
// ============================================

const generateInitialState = () => ({
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
// HELPER FUNCTIONS
// ============================================

const getQuestionsForSection = (sectionId) => {
  return Object.entries(questions.ieppoQuestions[sectionId] || {});
};

const countAnswered = (answers) => {
  return Object.values(answers).filter((v) => v !== null).length;
};

const getTotalQuestions = () => {
  return (
    Object.keys(questions.ieppoQuestions.personalStyles || {}).length +
    Object.keys(questions.ieppoQuestions.preferredActivities || {}).length +
    Object.keys(questions.ieppoQuestions.perceptionOfAbility || {}).length
  );
};

// ============================================
// REUSABLE COMPONENTS
// ============================================

// Main Progress Bar (Overall)
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
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Section Progress Indicator
const SectionProgress = ({ sections, currentSectionIndex, testAnswers }) => {
  return (
    <div className="flex justify-center gap-3 mb-6">
      {sections.map((section, index) => {
        const sectionQuestions = getQuestionsForSection(section.id);
        const answered = countAnswered(testAnswers[section.id]);
        const total = sectionQuestions.length;
        const isComplete = answered === total;
        const isCurrent = index === currentSectionIndex;
        const isPast = index < currentSectionIndex;

        return (
          <div key={section.id} className="flex flex-col items-center">
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center text-xl
                transition-all duration-300 transform
                ${
                  isCurrent
                    ? `bg-gradient-to-r ${section.color} text-white scale-110 shadow-lg`
                    : isComplete
                    ? "bg-green-500 text-white"
                    : isPast
                    ? "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                }
              `}
            >
              {isComplete && !isCurrent ? "✓" : section.icon}
            </div>
            <span
              className={`text-xs mt-1 font-medium ${
                isCurrent
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {answered}/{total}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Page Progress (within section)
const PageProgress = ({ currentPage, totalPages, sectionColor }) => {
  return (
    <div className="flex justify-center gap-1.5 mb-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <div
          key={i}
          className={`
            h-1.5 rounded-full transition-all duration-300
            ${i === currentPage ? "w-8" : "w-3"}
            ${
              i <= currentPage
                ? `bg-gradient-to-r ${sectionColor}`
                : "bg-gray-300 dark:bg-gray-600"
            }
          `}
        />
      ))}
    </div>
  );
};

// Question Card
const QuestionCard = ({
  questionId,
  questionText,
  answer,
  onChange,
  optionTrue,
  optionFalse,
  index,
  sectionColor,
}) => {
  const numericId = questionId.replace(/[^0-9]/g, "");

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm 
        border-2 transition-all duration-300
        ${
          answer !== null
            ? "border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10"
            : "border-gray-100 dark:border-gray-700"
        }
      `}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className={`
          w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
          bg-gradient-to-r ${sectionColor} text-white flex-shrink-0
        `}
        >
          {numericId}
        </div>
        <p className="text-gray-700 dark:text-gray-200 font-medium leading-relaxed">
          {questionText}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange(questionId, true)}
          className={`
            py-3 px-4 rounded-xl font-semibold text-sm
            transition-all duration-300 transform
            ${
              answer === true
                ? `bg-gradient-to-r ${sectionColor} text-white scale-[1.02] shadow-md`
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }
          `}
        >
          ✓ {optionTrue}
        </button>
        <button
          type="button"
          onClick={() => onChange(questionId, false)}
          className={`
            py-3 px-4 rounded-xl font-semibold text-sm
            transition-all duration-300 transform
            ${
              answer === false
                ? `bg-gradient-to-r ${sectionColor} text-white scale-[1.02] shadow-md`
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }
          `}
        >
          ✗ {optionFalse}
        </button>
      </div>
    </div>
  );
};

// Navigation Buttons
const NavigationButtons = ({
  onPrev,
  onNext,
  isFirst,
  isLast,
  loading,
  isLastSection,
}) => {
  return (
    <div className="flex gap-4 mt-6">
      {!isFirst && (
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
          Anterior
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
            isLast && isLastSection
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
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
        ) : isLast && isLastSection ? (
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
            Siguiente
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};

// Section Intro Screen
const SectionIntro = ({ section, onStart, questionsCount }) => {
  return (
    <div className="text-center py-8 animate-fadeIn">
      <div
        className={`
        w-24 h-24 mx-auto mb-6 rounded-3xl
        bg-gradient-to-br ${section.color}
        flex items-center justify-center shadow-xl
      `}
      >
        <span className="text-5xl">{section.icon}</span>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        {section.title}
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
        {section.description}
      </p>

      <div
        className={`
        ${section.bgColor} ${section.borderColor}
        border-2 rounded-2xl p-4 mb-6 max-w-sm mx-auto
      `}
      >
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-bold">{questionsCount}</span> preguntas •
          Responde según tu forma de ser
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 mb-6 max-w-md mx-auto">
        <p className="text-blue-800 dark:text-blue-200 font-medium">
          💡 <span className="font-bold">Instrucción:</span>{" "}
          {section.instruction}
        </p>
      </div>

      <button
        onClick={onStart}
        className={`
          bg-gradient-to-r ${section.color} text-white
          px-8 py-4 rounded-xl font-bold text-lg
          shadow-lg hover:shadow-xl
          transition-all duration-300 transform hover:scale-105
          inline-flex items-center gap-2
        `}
      >
        Comenzar
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
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
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
        Has completado con éxito el Test de Inventario de Estilos Personales y
        Preferencias Ocupacionales (IEPPO).
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
          Ver Resultados
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
              Volver a realizar
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
        testName="Test IEPPO"
      />
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
          ${saved ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"}
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
        <div className="absolute bottom-16 right-0 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-sm px-3 py-1 rounded-lg whitespace-nowrap">
          {saved ? "¡Guardado!" : "Guardar progreso"}
        </div>
      )}
    </div>
  );
};

// Unanswered Questions Warning
const UnansweredWarning = ({ count, onFix }) => {
  if (count === 0) return null;

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4 mt-4 animate-fadeIn">
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
            Responde todas las preguntas para continuar
          </p>
        </div>
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

export default function IeppoTestComponent() {
  const { user } = useAuth();
  const {
    createUpdateIeppoTest,
    finishIeppoTest,
    generateResultIeppoTest,
    getIeppoTest,
    resetIeppoTest,
  } = useVocationalTests();

  // State
  const [loading, setLoading] = useState(false);
  const [progressLoading, setProgressLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [progressSaved, setProgressSaved] = useState(false);
  const [completedTest, setCompletedTest] = useState(null);
  const [testAnswers, setTestAnswers] = useState(generateInitialState());

  // Navigation state
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showSectionIntro, setShowSectionIntro] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showRetakeModal, setShowRetakeModal] = useState(false);

  // Derived values
  const currentSection = SECTIONS[currentSectionIndex];
  const sectionQuestions = useMemo(
    () => getQuestionsForSection(currentSection.id),
    [currentSection.id]
  );
  const totalPages = Math.ceil(sectionQuestions.length / QUESTIONS_PER_PAGE);
  const currentQuestions = sectionQuestions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  // Calculate totals
  const totalAnswered = useMemo(() => {
    return (
      countAnswered(testAnswers.personalStyles) +
      countAnswered(testAnswers.preferredActivities) +
      countAnswered(testAnswers.perceptionOfAbility)
    );
  }, [testAnswers]);

  const totalQuestions = useMemo(() => getTotalQuestions(), []);

  // Check if current page is complete
  const currentPageAnswered = currentQuestions.filter(
    ([id]) => testAnswers[currentSection.id][id] !== null
  ).length;
  const isCurrentPageComplete = currentPageAnswered === currentQuestions.length;

  // Check unanswered on current page
  const unansweredOnPage = currentQuestions.length - currentPageAnswered;

  // Handlers
  const handleAnswerChange = useCallback(
    (questionId, value) => {
      setShowWarning(false);
      setTestAnswers((prev) => {
        const newAnswers = {
          ...prev,
          [currentSection.id]: {
            ...prev[currentSection.id],
            [questionId]: value,
          },
        };
        // Save to localStorage
        localStorage.setItem(
          `ieppoTestAnswers${user?.id}`,
          JSON.stringify(newAnswers)
        );
        return newAnswers;
      });
    },
    [currentSection.id, user?.id]
  );

  const handleNext = useCallback(() => {
    // Check if current page is complete
    if (!isCurrentPageComplete) {
      setShowWarning(true);
      return;
    }

    setShowWarning(false);

    if (currentPage < totalPages - 1) {
      // Next page in current section
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentSectionIndex < SECTIONS.length - 1) {
      // Next section
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentPage(0);
      setShowSectionIntro(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Submit test
      handleSubmit();
    }
  }, [currentPage, totalPages, currentSectionIndex, isCurrentPageComplete]);

  const handlePrev = useCallback(() => {
    setShowWarning(false);

    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentSectionIndex > 0) {
      // Go to previous section's last page
      const prevSection = SECTIONS[currentSectionIndex - 1];
      const prevSectionQuestions = getQuestionsForSection(prevSection.id);
      const prevTotalPages = Math.ceil(
        prevSectionQuestions.length / QUESTIONS_PER_PAGE
      );

      setCurrentSectionIndex((prev) => prev - 1);
      setCurrentPage(prevTotalPages - 1);
      setShowSectionIntro(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, currentSectionIndex]);

  const handleStartSection = useCallback(() => {
    setShowSectionIntro(false);
  }, []);

  const handleExitClick = () => {
    completedTest ? (window.location.href = "/main") : setShowExitModal(true);
  };

  const handleExitConfirm = async () => {
    try {
      await createUpdateIeppoTest({ testAnswers });
    } catch (error) {
      console.error("Error saving progress:", error);
    }
    window.location.href = "/main";
  };

  const handleExitCancel = () => {
    setShowExitModal(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await finishIeppoTest({ testAnswers });
      if (res) {
        await generateResultIeppoTest();
        localStorage.removeItem(`ieppoTestAnswers${user?.id}`);
        setCompletedTest(true);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSaveProgress = async () => {
    try {
      setProgressLoading(true);
      const res = await createUpdateIeppoTest({ testAnswers });
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
      const res = await resetIeppoTest();
      if (res) {
        setCompletedTest(false);
        setTestAnswers(generateInitialState());
        setCurrentSectionIndex(0);
        setCurrentPage(0);
        setShowSectionIntro(true);
        localStorage.removeItem(`ieppoTestAnswers${user?.id}`);
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
        const savedAnswers = localStorage.getItem(
          `ieppoTestAnswers${user?.id}`
        );

        if (savedAnswers) {
          setTestAnswers(JSON.parse(savedAnswers));
        } else {
          const response = await getIeppoTest();
          if (response?.testAnswers) {
            setTestAnswers(response.testAnswers);
            localStorage.setItem(
              `ieppoTestAnswers${user?.id}`,
              JSON.stringify(response.testAnswers)
            );
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (completedTest === false) {
      fetchData();
    }
  }, [user?.id, getIeppoTest, completedTest]);

  // Load completion status
  useEffect(() => {
    setCompletedTest(user?.completedIeppoTest);
  }, [user]);

  // Determine if we're on the last page of the last section
  const isLastSection = currentSectionIndex === SECTIONS.length - 1;
  const isLastPage = currentPage === totalPages - 1;
  const isFirstPage = currentPage === 0 && currentSectionIndex === 0;

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}</style>

      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto mt-20">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30 mb-4">
              <span className="text-3xl">📋</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Test IEPPO
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Inventario de Estilos Personales y Preferencias Ocupacionales
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

                {/* Section Progress */}
                <SectionProgress
                  sections={SECTIONS}
                  currentSectionIndex={currentSectionIndex}
                  testAnswers={testAnswers}
                />

                {showSectionIntro ? (
                  <SectionIntro
                    section={currentSection}
                    onStart={handleStartSection}
                    questionsCount={sectionQuestions.length}
                  />
                ) : (
                  <>
                    {/* Section Header */}
                    <div
                      className={`${currentSection.bgColor} ${currentSection.borderColor} border-2 rounded-2xl p-4 mb-4`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{currentSection.icon}</span>
                        <div>
                          <h2 className="font-bold text-gray-800 dark:text-white">
                            {currentSection.title}
                          </h2>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {currentSection.instruction}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Page Progress */}
                    <PageProgress
                      currentPage={currentPage}
                      totalPages={totalPages}
                      sectionColor={currentSection.color}
                    />

                    {/* Questions */}
                    <div className="space-y-4 animate-fadeIn">
                      {currentQuestions.map(([id, text], index) => (
                        <QuestionCard
                          key={id}
                          questionId={id}
                          questionText={text}
                          answer={testAnswers[currentSection.id][id]}
                          onChange={handleAnswerChange}
                          optionTrue={currentSection.optionTrue}
                          optionFalse={currentSection.optionFalse}
                          index={index}
                          sectionColor={currentSection.color}
                        />
                      ))}
                    </div>

                    {/* Warning */}
                    {showWarning && (
                      <UnansweredWarning count={unansweredOnPage} />
                    )}

                    {/* Navigation */}
                    <NavigationButtons
                      onPrev={handlePrev}
                      onNext={handleNext}
                      isFirst={
                        isFirstPage &&
                        showSectionIntro === false &&
                        currentPage === 0 &&
                        currentSectionIndex === 0
                      }
                      isLast={isLastPage}
                      isLastSection={isLastSection}
                      loading={loading}
                      canProceed={true}
                    />
                  </>
                )}
              </>
            )}
          </div>

          {/* Help text */}
          {!completedTest && (
            <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-6">
              Tu progreso se guarda automáticamente. Usa el botón flotante para
              guardar manualmente.
            </p>
          )}
        </div>

        {/* Floating Save Button */}
        {!completedTest && !showSectionIntro && (
          <FloatingSaveButton
            onSave={handleSaveProgress}
            loading={progressLoading}
            saved={progressSaved}
          />
        )}
      </div>
      <ExitConfirmModal
        isOpen={showExitModal}
        onConfirm={handleExitConfirm}
        onCancel={handleExitCancel}
      />

      {/* Exit Button */}
      <ExitButton onClick={handleExitClick} />
    </>
  );
}
