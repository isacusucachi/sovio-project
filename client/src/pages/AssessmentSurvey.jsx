import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAssessmentSurveys } from "../context/assessmentSurveyContex";
import { useAuth } from "../context/authContext";
import { FaX } from "react-icons/fa6";

// ============================================
// SURVEY CONFIGURATION
// ============================================

const SURVEY_QUESTIONS = [
  {
    id: "navigationDifficulty",
    question: "¿Cómo de difícil te resulta la navegación por la plataforma?",
    icon: "🧭",
    type: "scale",
    options: [
      {
        value: "Muy sencilla",
        label: "Muy sencilla",
        emoji: "😊",
        color: "green",
      },
      {
        value: "Relativamente sencilla",
        label: "Relativamente sencilla",
        emoji: "🙂",
        color: "green",
      },
      { value: "Normal", label: "Normal", emoji: "😐", color: "amber" },
      {
        value: "Algo compleja",
        label: "Algo compleja",
        emoji: "😕",
        color: "red",
      },
      {
        value: "Muy compleja",
        label: "Muy compleja",
        emoji: "😣",
        color: "red",
      },
    ],
  },
  {
    id: "appereanceRating",
    question: "¿Cómo valoras el aspecto de nuestra plataforma?",
    icon: "🎨",
    type: "scale",
    options: [
      { value: "Muy bueno", label: "Muy bueno", emoji: "🤩", color: "green" },
      { value: "Normal", label: "Normal", emoji: "😐", color: "amber" },
      {
        value: "Peor que la media",
        label: "Peor que la media",
        emoji: "😕",
        color: "red",
      },
      {
        value: "No me gusta nada",
        label: "No me gusta nada",
        emoji: "😞",
        color: "red",
      },
    ],
  },
  {
    id: "satisfactionRating",
    question:
      "¿Cómo de satisfecho/a te encuentras respecto a los datos obtenidos de nuestra plataforma?",
    icon: "📊",
    type: "scale",
    options: [
      {
        value: "Muy satisfecho/a",
        label: "Muy satisfecho/a",
        emoji: "🤩",
        color: "green",
      },
      {
        value: "Satisfecho/a",
        label: "Satisfecho/a",
        emoji: "😊",
        color: "green",
      },
      {
        value: "Medianamente satisfecho/a",
        label: "Medianamente satisfecho/a",
        emoji: "😐",
        color: "amber",
      },
      {
        value: "Insatisfecho/a",
        label: "Insatisfecho/a",
        emoji: "😕",
        color: "red",
      },
      {
        value: "Muy insatisfecho/a",
        label: "Muy insatisfecho/a",
        emoji: "😞",
        color: "red",
      },
    ],
  },
  {
    id: "recommendationToOthers",
    question: "¿Recomendarías nuestra plataforma a otras personas?",
    icon: "💬",
    type: "scale",
    options: [
      {
        value: "Sí, definitivamente",
        label: "Sí, definitivamente",
        emoji: "👍",
        color: "green",
      },
      {
        value: "Probablemente sí",
        label: "Probablemente sí",
        emoji: "🙂",
        color: "green",
      },
      { value: "No lo sé", label: "No lo sé", emoji: "🤔", color: "amber" },
      {
        value: "Probablemente no",
        label: "Probablemente no",
        emoji: "😕",
        color: "red",
      },
      {
        value: "No, para nada",
        label: "No, para nada",
        emoji: "👎",
        color: "red",
      },
    ],
  },
  {
    id: "comments",
    question: "¿Tienes algún comentario o sugerencia para nosotros?",
    icon: "✏️",
    type: "textarea",
    placeholder:
      "Escribe aquí tus comentarios, sugerencias o ideas para mejorar la plataforma...",
    optional: true,
  },
  {
    id: "rating",
    question: "Por último, ¿qué calificación general le darías a SOVIO?",
    icon: "⭐",
    type: "stars",
    labels: ["Muy malo", "Malo", "Regular", "Bueno", "Excelente"],
  },
];

// ============================================
// SUBCOMPONENTS
// ============================================

// Progress Bar
const ProgressBar = ({ current, total, answeredCount }) => {
  const percentage = (answeredCount / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Progreso de la encuesta
        </span>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
          {answeredCount} de {total} preguntas
        </span>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Question Card Wrapper
const QuestionCard = ({
  number,
  icon,
  question,
  children,
  isAnswered,
  isOptional,
}) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 transition-all duration-300
        ${
          isAnswered
            ? "border-green-300 dark:border-green-700 shadow-md"
            : "border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
        }
      `}
    >
      {/* Question Header */}
      <div className="flex items-start gap-4 mb-5">
        <div
          className={`
          w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0
          ${
            isAnswered
              ? "bg-green-100 dark:bg-green-900/30"
              : "bg-blue-100 dark:bg-blue-900/30"
          }
        `}
        >
          {isAnswered ? "✓" : icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
              Pregunta {number}
            </span>
            {isOptional && (
              <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">
                Opcional
              </span>
            )}
            {isAnswered && (
              <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                ✓ Respondida
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {question}
          </h3>
        </div>
      </div>

      {/* Question Content */}
      <div className="ml-0 md:ml-16">{children}</div>
    </div>
  );
};

// Scale Option Button (for radio questions)
const ScaleOptionButton = ({ option, isSelected, onSelect }) => {
  const colorClasses = {
    green: {
      selected:
        "bg-green-100 dark:bg-green-900/40 border-green-400 dark:border-green-600 ring-2 ring-green-200 dark:ring-green-800",
      hover:
        "hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300",
    },
    amber: {
      selected:
        "bg-amber-100 dark:bg-amber-900/40 border-amber-400 dark:border-amber-600 ring-2 ring-amber-200 dark:ring-amber-800",
      hover:
        "hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:border-amber-300",
    },
    red: {
      selected:
        "bg-red-100 dark:bg-red-900/40 border-red-400 dark:border-red-600 ring-2 ring-red-200 dark:ring-red-800",
      hover: "hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300",
    },
  };

  const colors = colorClasses[option.color] || colorClasses.amber;

  return (
    <button
      type="button"
      onClick={() => onSelect(option.value)}
      className={`
        w-full p-4 rounded-xl border-2 transition-all duration-200 text-left
        flex items-center gap-3
        ${
          isSelected
            ? colors.selected
            : `border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 ${colors.hover}`
        }
      `}
    >
      <span className="text-2xl">{option.emoji}</span>
      <span
        className={`font-medium ${
          isSelected
            ? "text-gray-800 dark:text-white"
            : "text-gray-600 dark:text-gray-300"
        }`}
      >
        {option.label}
      </span>
      {isSelected && (
        <svg
          className="w-5 h-5 ml-auto text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
};

// Star Rating Component
const StarRating = ({ value, onChange, labels }) => {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className="text-center">
      <div className="flex justify-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(0)}
            className="transition-transform duration-200 hover:scale-110 focus:outline-none focus:scale-110"
          >
            <svg
              className={`w-12 h-12 md:w-14 md:h-14 transition-colors duration-200 ${
                (hoverValue || value) >= star
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>

      {/* Label indicator */}
      <div className="h-8">
        {(hoverValue || value) > 0 && (
          <span
            className={`
            inline-block px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200
            ${
              (hoverValue || value) >= 4
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : (hoverValue || value) >= 3
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }
          `}
          >
            {labels[(hoverValue || value) - 1]}
          </span>
        )}
      </div>

      {/* Star scale labels */}
      <div className="flex justify-between mt-2 px-2 text-xs text-gray-400">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>
    </div>
  );
};

// Textarea Component
const TextareaInput = ({ value, onChange, placeholder }) => {
  const maxLength = 500;
  const charCount = value?.length || 0;

  return (
    <div>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={4}
        className="
          w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600
          bg-gray-50 dark:bg-gray-700/50
          text-gray-800 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900
          transition-all duration-200 resize-none
        "
      />
      <div className="flex justify-end mt-2">
        <span
          className={`text-xs ${
            charCount > maxLength * 0.8 ? "text-amber-500" : "text-gray-400"
          }`}
        >
          {charCount}/{maxLength} caracteres
        </span>
      </div>
    </div>
  );
};

// Success Screen
const SuccessScreen = () => {
  return (
    <div className="text-center py-12 animate-fadeIn">
      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-xl">
        <span className="text-5xl">🎉</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
        ¡Gracias por tu opinión!
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Tu feedback nos ayuda a mejorar SOVIO para ti y para todos los usuarios.
      </p>
      <a
        href="/home"
        className="
          inline-flex items-center gap-2 px-8 py-4 
          bg-gradient-to-r from-blue-500 to-blue-600 text-white
          font-bold rounded-xl shadow-lg
          hover:shadow-xl transition-all duration-300 transform hover:scale-105
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
    </div>
  );
};

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
          ¿Desea Salir de la Encuesta?
        </h3>

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
            CANCELAR
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
            SALIR
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

// ============================================
// MAIN COMPONENT
// ============================================

const AssessmentSurvey = () => {
  const { createAssessmentSurvey, errors } = useAssessmentSurveys();

  const { user } = useAuth();

  const [assessmentSurvey, setAssessmentSurvey] = useState({
    navigationDifficulty: null,
    appereanceRating: null,
    satisfactionRating: null,
    recommendationToOthers: null,
    comments: "",
    rating: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [completedAssessmentSurvey, setCompletedAssessmentSurvey] =
    useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Calculate progress
  const answeredCount = useMemo(() => {
    let count = 0;
    if (assessmentSurvey.navigationDifficulty) count++;
    if (assessmentSurvey.appereanceRating) count++;
    if (assessmentSurvey.satisfactionRating) count++;
    if (assessmentSurvey.recommendationToOthers) count++;
    if (assessmentSurvey.comments?.trim()) count++;
    if (assessmentSurvey.rating > 0) count++;
    return count;
  }, [assessmentSurvey]);

  const handleChange = (field, value) => {
    setAssessmentSurvey((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!assessmentSurvey.navigationDifficulty) {
      errors.navigationDifficulty = "Por favor, responde esta pregunta";
    }
    if (!assessmentSurvey.appereanceRating) {
      errors.appereanceRating = "Por favor, responde esta pregunta";
    }
    if (!assessmentSurvey.satisfactionRating) {
      errors.satisfactionRating = "Por favor, responde esta pregunta";
    }
    if (!assessmentSurvey.recommendationToOthers) {
      errors.recommendationToOthers = "Por favor, responde esta pregunta";
    }
    if (assessmentSurvey.rating === 0) {
      errors.rating = "Por favor, califica nuestra plataforma";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(`question-${firstErrorField}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await createAssessmentSurvey(assessmentSurvey);
      if (res) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExitClick = () => {
    completedAssessmentSurvey
      ? (window.location.href = "/main")
      : setShowExitModal(true);
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setCompletedAssessmentSurvey(user?.completedAssessmentSurvey);
  }, [user]);

  if (completedAssessmentSurvey) {
    return (
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8">
            <SuccessScreen />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>

      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto mt-16">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 mb-6 text-white shadow-xl">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <span className="text-4xl">📋</span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-3">
              Encuesta de Valoración
            </h1>
            <p className="text-blue-100 text-center max-w-md mx-auto">
              Tu opinión es muy importante para nosotros. Ayúdanos a mejorar
              SOVIO respondiendo esta breve encuesta.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-blue-200">
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
              <span>~2 minutos para completar</span>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 md:p-8">
            {/* Progress Bar */}
            <ProgressBar
              current={0}
              total={SURVEY_QUESTIONS.length}
              answeredCount={answeredCount}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Questions */}
              {SURVEY_QUESTIONS.map((q, index) => {
                const isAnswered =
                  q.type === "stars"
                    ? assessmentSurvey.rating > 0
                    : q.type === "textarea"
                    ? assessmentSurvey.comments?.trim()
                    : assessmentSurvey[q.id];

                return (
                  <div
                    key={q.id}
                    id={`question-${q.id}`}
                    className={validationErrors[q.id] ? "animate-shake" : ""}
                  >
                    <QuestionCard
                      number={index + 1}
                      icon={q.icon}
                      question={q.question}
                      isAnswered={!!isAnswered}
                      isOptional={q.optional}
                    >
                      {/* Scale type questions */}
                      {q.type === "scale" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {q.options.map((option) => (
                            <ScaleOptionButton
                              key={option.value}
                              option={option}
                              isSelected={
                                assessmentSurvey[q.id] === option.value
                              }
                              onSelect={(value) => handleChange(q.id, value)}
                            />
                          ))}
                        </div>
                      )}

                      {/* Textarea type */}
                      {q.type === "textarea" && (
                        <TextareaInput
                          value={assessmentSurvey.comments}
                          onChange={(value) => handleChange("comments", value)}
                          placeholder={q.placeholder}
                        />
                      )}

                      {/* Star rating type */}
                      {q.type === "stars" && (
                        <StarRating
                          value={assessmentSurvey.rating}
                          onChange={(value) => handleChange("rating", value)}
                          labels={q.labels}
                        />
                      )}

                      {/* Validation error */}
                      {validationErrors[q.id] && (
                        <div className="mt-3 flex items-center gap-2 text-red-500 text-sm">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {validationErrors[q.id]}
                        </div>
                      )}
                    </QuestionCard>
                  </div>
                );
              })}

              {/* Server Errors */}
              {errors?.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                  {errors.map((error, i) => (
                    <p
                      key={i}
                      className="text-red-600 dark:text-red-400 text-sm"
                    >
                      {error}
                    </p>
                  ))}
                </div>
              )}

              {/* Submit Section */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      flex items-center justify-center gap-3 px-8 py-4
                      bg-gradient-to-r from-blue-500 to-blue-600 text-white
                      font-bold text-lg rounded-xl shadow-lg
                      transition-all duration-300
                      ${
                        isSubmitting
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:shadow-xl hover:scale-105"
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin w-5 h-5"
                          viewBox="0 0 24 24"
                        >
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
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        Enviar Encuesta
                      </>
                    )}
                  </button>
                </div>

                {/* Completion hint */}
                {answeredCount < 5 && (
                  <p className="text-center text-sm text-gray-400 mt-4">
                    Responde al menos las 4 preguntas obligatorias y la
                    calificación para enviar
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6">
            Tu respuesta es anónima y nos ayuda a mejorar la plataforma.
          </p>
        </div>

        {/* Exit Confirmation Modal */}
        <ExitConfirmModal
          isOpen={showExitModal}
          onConfirm={handleExitConfirm}
          onCancel={handleExitCancel}
        />
        <ExitButton onClick={handleExitClick} />
      </section>
    </>
  );
};

export default AssessmentSurvey;
