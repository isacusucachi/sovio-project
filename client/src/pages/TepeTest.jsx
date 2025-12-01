import { useEffect, useState, useCallback, useMemo } from "react";
import { useVocationalTests } from "../context/vocationalTestContext";
import { useAuth } from "../context/authContext";
import questions from "../data/questions.json";
import { FaSave } from "react-icons/fa";

// ============================================
// CONSTANTS & CONFIGURATION
// ============================================

const QUESTIONS_PER_PAGE = 5;

const SECTIONS = [
  {
    id: "traits",
    title: "Rasgos Personales",
    icon: "🎯",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50 dark:bg-violet-900/20",
    borderColor: "border-violet-200 dark:border-violet-800",
    description: "Identifica las características que te describen",
    instruction: "Soy una persona...",
    optionTrue: "Sí, me describe",
    optionFalse: "No me describe",
    prefix: "N",
    startIndex: 1,
    endIndex: 21,
  },
  {
    id: "affirmations",
    title: "Afirmaciones",
    icon: "💼",
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-50 dark:bg-sky-900/20",
    borderColor: "border-sky-200 dark:border-sky-800",
    description: "Evalúa tu situación actual de vida",
    instruction: "En mi situación actual...",
    optionTrue: "Sí",
    optionFalse: "No",
    prefix: "N",
    startIndex: 22,
    endIndex: 100,
  },
];

// ============================================
// INITIAL STATE GENERATOR
// ============================================

const generateInitialState = () => ({
  traits: Object.fromEntries(
    Array.from({ length: 21 }, (_, i) => [`N${i + 1}`, null])
  ),
  affirmations: Object.fromEntries(
    Array.from({ length: 79 }, (_, i) => [`N${i + 22}`, null])
  ),
});

// ============================================
// HELPER FUNCTIONS
// ============================================

const getQuestionsForSection = (sectionId) => {
  return Object.entries(questions.tepeQuestions[sectionId] || {});
};

const countAnswered = (answers) => {
  return Object.values(answers).filter((v) => v !== null).length;
};

const getTotalQuestions = () => {
  return (
    Object.keys(questions.tepeQuestions.traits || {}).length +
    Object.keys(questions.tepeQuestions.affirmations || {}).length
  );
};

// ============================================
// REUSABLE COMPONENTS
// ============================================

// Main Progress Bar
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
          className="h-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Section Progress Indicator
const SectionProgress = ({ sections, currentSectionIndex, testAnswers }) => {
  return (
    <div className="flex justify-center gap-6 mb-6">
      {sections.map((section, index) => {
        const sectionQuestions = getQuestionsForSection(section.id);
        const answered = countAnswered(testAnswers[section.id]);
        const total = sectionQuestions.length;
        const isComplete = answered === total;
        const isCurrent = index === currentSectionIndex;

        return (
          <div key={section.id} className="flex flex-col items-center">
            <div
              className={`
                w-14 h-14 rounded-2xl flex items-center justify-center text-2xl
                transition-all duration-300 transform
                ${
                  isCurrent
                    ? `bg-gradient-to-br ${section.color} text-white scale-110 shadow-lg`
                    : isComplete
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                }
              `}
            >
              {isComplete && !isCurrent ? "✓" : section.icon}
            </div>
            <span
              className={`text-xs mt-2 font-semibold ${
                isCurrent
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {answered}/{total}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
              {section.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Page Progress Dots
const PageProgress = ({ currentPage, totalPages, sectionColor }) => {
  return (
    <div className="flex justify-center gap-1.5 mb-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <div
          key={i}
          className={`
            h-2 rounded-full transition-all duration-300
            ${i === currentPage ? "w-8" : "w-2"}
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
            : "border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
        }
      `}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className={`
          w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold
          bg-gradient-to-br ${sectionColor} text-white flex-shrink-0 shadow-sm
        `}
        >
          {numericId}
        </div>
        <p className="text-gray-700 dark:text-gray-200 font-medium leading-relaxed pt-1">
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
          <span className="flex items-center justify-center gap-2">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            {optionTrue}
          </span>
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
          <span className="flex items-center justify-center gap-2">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            {optionFalse}
          </span>
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
const SectionIntro = ({ section, onStart, questionsCount, sectionNumber }) => {
  return (
    <div className="text-center py-8 animate-fadeIn">
      <div className="inline-block mb-2">
        <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          Sección {sectionNumber} de 2
        </span>
      </div>

      <div
        className={`
        w-24 h-24 mx-auto mb-6 rounded-3xl
        bg-gradient-to-br ${section.color}
        flex items-center justify-center shadow-xl
        transform transition-transform hover:scale-105
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
        className={`${section.bgColor} ${section.borderColor} border-2 rounded-2xl p-4 mb-6 max-w-sm mx-auto`}
      >
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">📝</span>
            <span className="font-bold text-gray-700 dark:text-gray-200">
              {questionsCount}
            </span>
            <span className="text-gray-500 dark:text-gray-400">preguntas</span>
          </div>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
          <div className="flex items-center gap-2">
            <span className="text-lg">⏱️</span>
            <span className="text-gray-500 dark:text-gray-400">
              ~{Math.ceil(questionsCount / 5)} min
            </span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-8 max-w-md mx-auto">
        <p className="text-blue-800 dark:text-blue-200">
          <span className="font-bold">💡 Instrucción:</span>{" "}
          {section.id === "traits"
            ? "Marca SI o NO según las características que te describen tal como eres."
            : "Marca SI o NO según consideres que la frase describa tu situación actual de vida."}
        </p>
      </div>

      <button
        onClick={onStart}
        className={`
          bg-gradient-to-r ${section.color} text-white
          px-10 py-4 rounded-xl font-bold text-lg
          shadow-lg hover:shadow-xl
          transition-all duration-300 transform hover:scale-105
          inline-flex items-center gap-3
        `}
      >
        Comenzar Sección
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
const CompletionScreen = ({ onRetake, loading, showRetakeModal, setShowRetakeModal }) => {
  return (
    <div className="text-center py-8 animate-fadeIn">
      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-xl">
        <span className="text-6xl">🎉</span>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        ¡Felicidades!
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Has completado con éxito el Test de Evaluación del Potencial Empresarial
        (TEPE).
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

        <a
          href="/main"
          className="
            bg-gray-100 dark:bg-gray-700
            text-gray-700 dark:text-gray-200
            px-8 py-4 rounded-xl font-bold text-lg
            hover:bg-gray-200 dark:hover:bg-gray-600
            transition-all duration-300
            inline-flex items-center justify-center gap-2
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Volver al Inicio
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
        testName="Test TEPE"
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
          ${saved ? "bg-green-500" : "bg-violet-500 hover:bg-violet-600"}
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

// Warning Component
const UnansweredWarning = ({ count }) => {
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
      className="fixed top-4 left-4 z-40
                 flex items-center gap-2 px-4 py-2 rounded-xl
                 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg
                 border-2 border-gray-200 dark:border-gray-700
                 text-gray-600 dark:text-gray-300
                 hover:bg-red-50 dark:hover:bg-red-900/20
                 hover:border-red-300 dark:hover:border-red-700
                 hover:text-red-600 dark:hover:text-red-400
                 transition-all duration-300 shadow-lg
                 group"
    >
      <svg
        className="w-5 h-5 transition-transform group-hover:-translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
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

const TepeTest = () => {
  const { user } = useAuth();
  const {
    createUpdateTepeTest,
    finishTepeTest,
    generateResultTepeTest,
    getTepeTest,
    resetTepeTest,
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
      countAnswered(testAnswers.traits) +
      countAnswered(testAnswers.affirmations)
    );
  }, [testAnswers]);

  const totalQuestions = useMemo(() => getTotalQuestions(), []);

  // Check current page completion
  const currentPageAnswered = currentQuestions.filter(
    ([id]) => testAnswers[currentSection.id][id] !== null
  ).length;
  const isCurrentPageComplete = currentPageAnswered === currentQuestions.length;
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
        localStorage.setItem(
          `tepeTestAnswers${user?.id}`,
          JSON.stringify(newAnswers)
        );
        return newAnswers;
      });
    },
    [currentSection.id, user?.id]
  );

  const handleNext = useCallback(() => {
    if (!isCurrentPageComplete) {
      setShowWarning(true);
      return;
    }

    setShowWarning(false);

    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentSectionIndex < SECTIONS.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentPage(0);
      setShowSectionIntro(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  }, [currentPage, totalPages, currentSectionIndex, isCurrentPageComplete]);

  const handlePrev = useCallback(() => {
    setShowWarning(false);

    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentSectionIndex > 0) {
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
    setShowExitModal(true);
  };

  const handleExitConfirm = async () => {
    try {
      await createUpdateTepeTest({ testAnswers });
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
      const res = await finishTepeTest({ testAnswers });
      if (res) {
        await generateResultTepeTest();
        localStorage.removeItem(`tepeTestAnswers${user?.id}`);
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
      const res = await createUpdateTepeTest({ testAnswers });
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
      const res = await resetTepeTest();
      if (res) {
        setCompletedTest(false);
        setTestAnswers(generateInitialState());
        setCurrentSectionIndex(0);
        setCurrentPage(0);
        setShowSectionIntro(true);
        localStorage.removeItem(`tepeTestAnswers${user?.id}`);
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
        const savedAnswers = localStorage.getItem(`tepeTestAnswers${user?.id}`);

        if (savedAnswers) {
          setTestAnswers(JSON.parse(savedAnswers));
        } else {
          const response = await getTepeTest();
          if (response?.testAnswers) {
            setTestAnswers(response.testAnswers);
            localStorage.setItem(
              `tepeTestAnswers${user?.id}`,
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
  }, [user?.id, getTepeTest, completedTest]);

  // Load completion status
  useEffect(() => {
    setCompletedTest(user?.completedTepeTest);
  }, [user]);

  // Navigation flags
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
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
      `}</style>

      <div className="bg-gradient-to-br from-slate-50 via-violet-50 to-blue-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto mt-20">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg shadow-violet-500/30 mb-4">
              <span className="text-3xl">💼</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Test TEPE
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Test de Evaluación del Potencial Empresarial
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl p-6">
            {completedTest ? (
              <CompletionScreen onRetake={handleReset} loading={resetLoading} showRetakeModal={showRetakeModal} setShowRetakeModal={setShowRetakeModal} />
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
                    sectionNumber={currentSectionIndex + 1}
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
                        <div className="ml-auto text-right">
                          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                            Página {currentPage + 1}/{totalPages}
                          </span>
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
                      isFirst={isFirstPage}
                      isLast={isLastPage}
                      isLastSection={isLastSection}
                      loading={loading}
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

        {/* Floating Save Button */}
        {!completedTest && !showSectionIntro && (
          <FloatingSaveButton
            onSave={handleSaveProgress}
            loading={progressLoading}
            saved={progressSaved}
          />
        )}
      </div>

      {/* Exit Confirmation Modal */}
      <ExitConfirmModal
        isOpen={showExitModal}
        onConfirm={handleExitConfirm}
        onCancel={handleExitCancel}
      />

      {/* Exit Button */}
      {!completedTest && <ExitButton onClick={handleExitClick} />}
    </>
  );
};

export default TepeTest;
