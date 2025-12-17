import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, useWatch } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { useRecaptcha } from "../context/recaptchaContext";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/authSchema";
import {
  getProvinceRequest,
  getDistrictRequest,
  getInstitutionRequest,
} from "../api/educationalService";
import paises from "../data/paises.json";
import { 
  FaArrowLeft, 
  FaArrowRight,
  FaEye, 
  FaEyeSlash, 
  FaIdCard, 
  FaCheck, 
  FaCircleExclamation,
  FaCircleInfo,
  FaSpinner
} from "react-icons/fa6";
import { IoSchool } from "react-icons/io5";
import { TbPasswordUser } from "react-icons/tb";
import { HiOutlineDocumentText, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaCalendar, FaUser } from "react-icons/fa";

// ============================================================================
// CONSTANTES
// ============================================================================

const departamentos_peru = [
  "AMAZONAS", "ANCASH", "APURIMAC", "AREQUIPA", "AYACUCHO", "CAJAMARCA",
  "CALLAO", "CUSCO", "HUANCAVELICA", "HUANUCO", "ICA", "JUNIN", "LA LIBERTAD",
  "LAMBAYEQUE", "LIMA", "LORETO", "MADRE DE DIOS", "MOQUEGUA", "PASCO",
  "PIURA", "PUNO", "SAN MARTIN", "TACNA", "TUMBES", "UCAYALI",
];

// Campos por paso para validación parcial
const step1Fields = [
  "nationality", "typeOfIdentityDocument", "identityDocumentNumber",
  "names", "surnames", "birthdate", "gender", "height",
];
const step2Fields = [
  "department", "province", "district", "educationalService", "grade_section_cycle",
];
const step3Fields = [
  "email", "phoneNumber", "password", "confirmPassword", "termsAndConditions",
];

// ============================================================================
// COMPONENTES AUXILIARES CON HCI
// ============================================================================

// HCI: Indicador de paso mejorado con feedback visual claro
const StepIndicator = ({ step, currentStep, isLast, completedSteps }) => {
  const isActive = currentStep === step.number;
  const isCompleted = completedSteps.includes(step.number);
  const isPending = !isActive && !isCompleted;
  const Icon = step.icon;

  return (
    <li className={`flex items-center ${!isLast ? "flex-1" : ""}`}>
      <div className="flex flex-col items-center">
        <div
          className={`
            relative flex items-center justify-center w-12 h-12 rounded-2xl
            transition-all duration-500 ease-out
            ${isCompleted 
              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-100" 
              : isActive 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110 ring-4 ring-blue-500/20" 
                : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
            }
          `}
          aria-current={isActive ? "step" : undefined}
        >
          {isCompleted ? (
            <FaCheck className="w-5 h-5 animate-scale-in" />
          ) : (
            <Icon className="w-5 h-5" />
          )}
          
          {/* HCI: Indicador de progreso animado */}
          {isActive && (
            <span className="absolute -inset-1 rounded-2xl border-2 border-blue-500/50 animate-pulse" />
          )}
        </div>
        
        {/* HCI: Título del paso con estado */}
        <span 
          className={`
            mt-2 text-xs font-medium text-center max-w-[80px] leading-tight
            transition-colors duration-300
            ${isActive 
              ? "text-blue-600 dark:text-blue-400" 
              : isCompleted 
                ? "text-emerald-600 dark:text-emerald-400" 
                : "text-gray-400 dark:text-gray-500"
            }
          `}
        >
          {step.title}
        </span>
      </div>
      
      {/* Línea conectora con progreso */}
      {!isLast && (
        <div className="flex-1 mx-3 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div 
            className={`
              h-full rounded-full transition-all duration-500 ease-out
              ${isCompleted ? "w-full bg-emerald-500" : "w-0 bg-blue-500"}
            `}
          />
        </div>
      )}
    </li>
  );
};

// HCI: Indicador de requisito de contraseña mejorado
const PasswordRequirement = ({ text, valid }) => (
  <div 
    className={`
      flex items-center gap-2 text-sm transition-all duration-300
      ${valid 
        ? "text-emerald-600 dark:text-emerald-400" 
        : "text-gray-400 dark:text-gray-500"
      }
    `}
    role="status"
    aria-live="polite"
  >
    <span 
      className={`
        flex items-center justify-center w-4 h-4 rounded-full
        transition-all duration-300
        ${valid 
          ? "bg-emerald-100 dark:bg-emerald-900/30" 
          : "bg-gray-100 dark:bg-gray-800"
        }
      `}
    >
      {valid ? (
        <FaCheck className="w-2.5 h-2.5 animate-scale-in" />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
      )}
    </span>
    <span className={valid ? "opacity-60" : ""}>{text}</span>
  </div>
);

// HCI: Campo de formulario mejorado con feedback visual
const FormField = ({ 
  label, 
  name, 
  type = "text", 
  placeholder, 
  register, 
  error, 
  required = true,
  hint,
  children,
  className = "",
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!error;
  const hasValue = props.value?.length > 0;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label
        htmlFor={name}
        className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        <span className="flex items-center gap-1">
          {label}
          {required && <span className="text-red-500" aria-hidden="true">*</span>}
          {!required && <span className="text-gray-400 text-xs ml-1">(Opcional)</span>}
        </span>
        <span className="sr-only">{required ? "(campo requerido)" : "(campo opcional)"}</span>
      </label>
      
      <div className="relative">
        {children || (
          <input
            type={type}
            id={name}
            {...register(name)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            aria-required={required}
            aria-invalid={hasError}
            aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
            className={`
              w-full px-4 py-3
              text-gray-900 dark:text-white
              bg-white dark:bg-gray-800
              border-2 rounded-xl
              text-sm
              transition-all duration-300 ease-out
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              outline-none
              ${hasError 
                ? "border-red-400 dark:border-red-500 bg-red-50/50 dark:bg-red-900/10" 
                : isFocused 
                  ? "border-blue-500 dark:border-blue-400 ring-4 ring-blue-500/10" 
                  : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
              }
            `}
            {...props}
          />
        )}
        
        {/* Indicador de estado */}
        {hasError && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <FaCircleExclamation className="w-4 h-4" />
          </span>
        )}
      </div>
      
      {/* Texto de ayuda */}
      {hint && !error && (
        <p id={`${name}-hint`} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 ml-1">
          <FaCircleInfo className="w-3 h-3 flex-shrink-0" />
          {hint}
        </p>
      )}
      
      {/* Mensaje de error */}
      {error && (
        <p 
          id={`${name}-error`} 
          className="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400 ml-1 animate-slide-down"
          role="alert"
        >
          <FaCircleExclamation className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
};

// HCI: Select mejorado con estado de carga
const FormSelect = ({ 
  label, 
  name, 
  options, 
  register, 
  error, 
  required = true,
  disabled = false,
  loading = false,
  placeholder = "Seleccione una opción",
  hint,
  renderOption,
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!error;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label
        htmlFor={name}
        className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        <span className="flex items-center gap-1">
          {label}
          {required && <span className="text-red-500" aria-hidden="true">*</span>}
        </span>
      </label>
      
      <div className="relative">
        <select
          id={name}
          {...register(name)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled || loading}
          aria-required={required}
          aria-invalid={hasError}
          aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
          className={`
            w-full px-4 py-3
            text-gray-900 dark:text-white
            bg-white dark:bg-gray-800
            border-2 rounded-xl
            text-sm
            transition-all duration-300 ease-out
            outline-none
            appearance-none
            cursor-pointer
            ${disabled || loading
              ? "opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-900"
              : ""
            }
            ${hasError 
              ? "border-red-400 dark:border-red-500 bg-red-50/50 dark:bg-red-900/10" 
              : isFocused 
                ? "border-blue-500 dark:border-blue-400 ring-4 ring-blue-500/10" 
                : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
            }
          `}
        >
          <option value="">{loading ? "Cargando..." : placeholder}</option>
          {options.map((option) => 
            renderOption ? renderOption(option) : (
              <option key={option} value={option}>{option}</option>
            )
          )}
        </select>
        
        {/* Icono de dropdown o loading */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {loading ? (
            <FaSpinner className="w-4 h-4 text-gray-400 animate-spin" />
          ) : (
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
      </div>
      
      {hint && !error && (
        <p id={`${name}-hint`} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 ml-1">
          <FaCircleInfo className="w-3 h-3 flex-shrink-0" />
          {hint}
        </p>
      )}
      
      {error && (
        <p 
          id={`${name}-error`} 
          className="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400 ml-1 animate-slide-down"
          role="alert"
        >
          <FaCircleExclamation className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const Register = () => {
  // Estados principales
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingInstitutions, setLoadingInstitutions] = useState(false);

  // Refs para autofocus
  const firstFieldRefs = useRef({});
  const formContainerRef = useRef(null);

  // Hooks de autenticación y navegación
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const { getRecaptchaToken } = useRecaptcha();
  const navigate = useNavigate();

  // Configuración del formulario con react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      identityDocumentNumber: "",
      nationality: "PERÚ",
      names: "",
      surnames: "",
      birthdate: "",
      gender: "",
      height: "",
      department: "CUSCO",
      province: "",
      district: "",
      educationalService: "",
      grade_section_cycle: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      termsAndConditions: false,
    },
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  // Estados de ubicación e instituciones
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [institutions, setInstitutions] = useState([]);

  // Valores observados
  const selectedDepartment = useWatch({ control, name: "department" });
  const selectedProvince = useWatch({ control, name: "province" });
  const selectedDistrict = useWatch({ control, name: "district" });
  const passwordValue = watch("password") || "";
  const confirmPasswordValue = watch("confirmPassword") || "";

  // Calcular fechas mínima y máxima permitidas (13–24 años)
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 24, today.getMonth(), today.getDate())
    .toISOString()
    .split("T")[0];
  const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate())
    .toISOString()
    .split("T")[0];

  // Validaciones de contraseña
  const passwordChecks = {
    hasMinLength: passwordValue.length >= 8,
    hasUppercase: /[A-Z]/.test(passwordValue),
    hasLowercase: /[a-z]/.test(passwordValue),
    hasNumber: /[0-9]/.test(passwordValue),
    hasSpecialChar: /[^A-Za-z0-9]/.test(passwordValue),
  };
  const passwordStrength = Object.values(passwordChecks).filter(Boolean).length;
  const passwordsMatch = passwordValue && confirmPasswordValue && passwordValue === confirmPasswordValue;

  // Configuración de pasos
  const steps = [
    { number: 1, title: "Información Personal", icon: FaIdCard },
    { number: 2, title: "Institución Educativa", icon: IoSchool },
    { number: 3, title: "Credenciales", icon: TbPasswordUser },
  ];

  // HCI: Scroll suave al cambiar de paso
  useEffect(() => {
    if (formContainerRef.current) {
      formContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentStep]);

  // HCI: Autofocus en el primer campo de cada paso
  useEffect(() => {
    const focusFirstField = () => {
      const fieldMap = {
        1: "nationality",
        2: "department", 
        3: "email",
      };
      const fieldName = fieldMap[currentStep];
      if (fieldName) {
        const field = document.getElementById(fieldName);
        if (field) {
          setTimeout(() => field.focus(), 100);
        }
      }
    };
    focusFirstField();
  }, [currentStep]);

  // Navegación entre pasos
  const handleNext = async () => {
    let fieldsToValidate;
    if (currentStep === 1) fieldsToValidate = step1Fields;
    else if (currentStep === 2) fieldsToValidate = step2Fields;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
      setCurrentStep(currentStep + 1);
      
      // HCI: Feedback positivo al completar paso
      toast.success(`Paso ${currentStep} completado ✓`, {
        autoClose: 1500,
        hideProgressBar: true,
      });
    } else {
      // HCI: Feedback de error con guía
      toast.error("Por favor completa todos los campos requeridos", {
        autoClose: 3000,
      });
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  // Envío del formulario
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const recaptchaToken = await getRecaptchaToken("register_form");
      const res = await signup({ ...data, recaptchaToken });
      
      if (res) {
        toast.success("¡Registro exitoso! Bienvenido al sistema 🎉", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Hubo un problema al registrar tu cuenta. Por favor intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const isValid = await trigger(step3Fields);
    if (isValid) {
      handleSubmit(onSubmit)(e);
    } else {
      toast.error("Por favor completa todos los campos requeridos");
    }
  };

  // Efectos de navegación y errores
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/main");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (registerErrors.length > 0) {
      registerErrors.forEach((error) => toast.error(error));
    }
  }, [registerErrors]);

  // Cargar provincias
  useEffect(() => {
    const fetchProvinces = async () => {
      if (selectedDepartment) {
        setLoadingProvinces(true);
        try {
          const response = await getProvinceRequest(selectedDepartment);
          setProvinces(response.data);
          setValue("province", "");
          setValue("district", "");
          setValue("educationalService", "");
          setDistricts([]);
          setInstitutions([]);
        } catch (error) {
          console.error("Error fetching provinces:", error);
          toast.error("Error al cargar las provincias");
        } finally {
          setLoadingProvinces(false);
        }
      }
    };
    fetchProvinces();
  }, [selectedDepartment, setValue]);

  // Cargar distritos
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvince) {
        setLoadingDistricts(true);
        try {
          const response = await getDistrictRequest(selectedDepartment, selectedProvince);
          setDistricts(response.data);
          setValue("district", "");
          setValue("educationalService", "");
          setInstitutions([]);
        } catch (error) {
          console.error("Error fetching districts:", error);
          toast.error("Error al cargar los distritos");
        } finally {
          setLoadingDistricts(false);
        }
      }
    };
    fetchDistricts();
  }, [selectedProvince, setValue, selectedDepartment]);

  // Cargar instituciones
  useEffect(() => {
    const fetchInstitutions = async () => {
      if (selectedDistrict) {
        setLoadingInstitutions(true);
        try {
          const response = await getInstitutionRequest(
            selectedDepartment,
            selectedProvince,
            selectedDistrict
          );
          setInstitutions(response.data);
          setValue("educationalService", "");
        } catch (error) {
          console.error("Error fetching institutions:", error);
          toast.error("Error al cargar las instituciones educativas");
        } finally {
          setLoadingInstitutions(false);
        }
      }
    };
    fetchInstitutions();
  }, [selectedDistrict, setValue, selectedProvince, selectedDepartment]);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-200/20 to-purple-200/20 dark:from-blue-800/10 dark:to-purple-800/10 rounded-full blur-3xl" />
      </div>

      {/* HCI: Navegación clara con affordance visible */}
      <Link
        to="/"
        className="
          uppercase font-bold absolute top-6 left-6 z-10
          inline-flex items-center gap-2
          px-4 py-2.5
          text-sm
          text-gray-700 dark:text-gray-200
          bg-white/80 dark:bg-gray-800/80
          backdrop-blur-sm
          border border-gray-200 dark:border-gray-700
          rounded-lg
          shadow-sm
          transition-all duration-300
          hover:bg-white dark:hover:bg-gray-800
          hover:shadow-md
          hover:-translate-x-1
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          group
        "
        aria-label="Volver a la página de inicio"
      >
        <FaArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
        <span className="hidden sm:inline">Volver al inicio</span>
      </Link>

      <main className="relative py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto" ref={formContainerRef}>
          {/* Logo y branding */}
          <div className="text-center mb-8 pt-16 sm:pt-8 animate-fade-in-down">
            <a
              href="/"
              className="inline-flex flex-col items-center gap-4 group"
              aria-label="Ir a página principal"
            >
              <div className="relative">
                <img
                  src="./Logo GORE_Nuevo_negativo_vertical.png"
                  className="h-20 w-auto hidden dark:block transition-transform duration-300 group-hover:scale-105"
                  alt="Logo del Gobierno Regional de Cusco"
                />
                <img
                  src="./Logo GORE_Nuevo_positivo_vertical.png"
                  className="h-20 w-auto block dark:hidden transition-transform duration-300 group-hover:scale-105"
                  alt="Logo del Gobierno Regional de Cusco"
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-xs tracking-wider text-gray-600 dark:text-gray-300 uppercase">
                  Gerencia Regional de Trabajo
                </p>
                <p className="text-[10px] tracking-wide text-gray-500 dark:text-gray-400 uppercase">
                  y Promoción del Empleo Cusco
                </p>
              </div>
            </a>
          </div>

          {/* Card principal */}
          <div 
            className="
              bg-white/90 dark:bg-gray-800/90
              backdrop-blur-xl
              rounded-3xl
              shadow-xl shadow-gray-200/50 dark:shadow-none
              border border-gray-100 dark:border-gray-700
              p-6 sm:p-8 lg:p-10
              animate-fade-in-up
            "
            role="main"
          >
            {/* Encabezado */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Crear una cuenta
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {currentStep === 0 
                  ? "Completa el formulario para registrarte en el sistema"
                  : `Paso ${currentStep} de 3 - ${steps[currentStep - 1]?.title}`
                }
              </p>
            </div>

            {/* HCI: Indicador de progreso visual (solo en pasos activos) */}
            {currentStep > 0 && (
              <nav aria-label="Progreso del registro" className="mb-10">
                <ol className="flex justify-between items-start">
                  {steps.map((step, index) => (
                    <StepIndicator
                      key={step.number}
                      step={step}
                      currentStep={currentStep}
                      isLast={index === steps.length - 1}
                      completedSteps={completedSteps}
                    />
                  ))}
                </ol>
                
                {/* HCI: Barra de progreso general */}
                <div className="mt-6 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                    role="progressbar"
                    aria-valuenow={currentStep}
                    aria-valuemin={0}
                    aria-valuemax={3}
                    aria-label={`Progreso: paso ${currentStep} de 3`}
                  />
                </div>
              </nav>
            )}

            {/* ================================================================ */}
            {/* PASO 0: Pantalla de bienvenida */}
            {/* ================================================================ */}
            {currentStep === 0 && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Antes de comenzar...
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
                    Por favor revisa que tengas a la mano la siguiente información para completar tu registro.
                  </p>
                </div>

                {/* HCI: Lista de requisitos con iconos claros */}
                <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {[
                    { icon: FaIdCard, text: "Documento de identidad (DNI, CE o Pasaporte)" },
                    { icon: FaCalendar, text: "Fecha de nacimiento (entre 13 y 24 años)" },
                    { icon: FaUser, text: "Información personal (nombres, apellidos, género)" },
                    { icon: IoSchool, text: "Institución educativa donde estudias" },
                    { icon: HiOutlineMail, text: "Correo electrónico válido" },
                    { icon: HiOutlinePhone, text: "Número de celular activo" },
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      {typeof item.icon === "string" ? (
                        <span className="text-2xl">{item.icon}</span>
                      ) : (
                        <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      )}
                      <span className="text-sm text-gray-700 dark:text-gray-200">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* HCI: Indicador de campos requeridos */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="text-red-500 font-bold">*</span>
                  <span>indica los campos obligatorios</span>
                </div>
              </div>
            )}

            {/* ================================================================ */}
            {/* PASO 1: Información Personal */}
            {/* ================================================================ */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5">
                  {/* Nacionalidad */}
                  <FormSelect
                    label="Nacionalidad"
                    name="nationality"
                    register={register}
                    error={errors.nationality?.message}
                    options={["PERÚ", ...paises.map(p => p.nombre)]}
                    placeholder="Selecciona tu nacionalidad"
                  />

                  {/* Tipo de documento */}
                  <FormSelect
                    label="Tipo de documento"
                    name="typeOfIdentityDocument"
                    register={register}
                    error={errors.typeOfIdentityDocument?.message}
                    options={[
                      { value: "DNI", label: "DNI - Documento Nacional" },
                      { value: "CE", label: "CE - Carné de Extranjería" },
                      { value: "PTP", label: "PTP - Permiso Temporal" },
                    ]}
                    renderOption={(opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    )}
                    placeholder="Selecciona tipo"
                  />

                  {/* Número de documento */}
                  <FormField
                    label="N° de documento"
                    name="identityDocumentNumber"
                    register={register}
                    error={errors.identityDocumentNumber?.message}
                    placeholder="Ej: 74123456"
                    hint="Solo números, máximo 9 dígitos"
                  >
                    <input
                      type="text"
                      id="identityDocumentNumber"
                      {...register("identityDocumentNumber")}
                      onInput={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        e.target.value = value.length > 9 ? value.slice(0, 9) : value;
                      }}
                      placeholder="Ej: 74123456"
                      aria-describedby="identityDocumentNumber-hint"
                      className={`
                        w-full px-4 py-3 text-gray-900 dark:text-white
                        bg-white dark:bg-gray-800 border-2 rounded-xl text-sm
                        transition-all duration-300 ease-out
                        placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none
                        ${errors.identityDocumentNumber 
                          ? "border-red-400 dark:border-red-500 bg-red-50/50 dark:bg-red-900/10" 
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        }
                      `}
                    />
                  </FormField>

                  {/* Nombres */}
                  <FormField
                    label="Nombres"
                    name="names"
                    register={register}
                    error={errors.names?.message}
                    placeholder="Ej: Juan Carlos"
                  />

                  {/* Apellidos */}
                  <FormField
                    label="Apellidos"
                    name="surnames"
                    register={register}
                    error={errors.surnames?.message}
                    placeholder="Ej: Flores Gómez"
                  />

                  {/* Fecha de nacimiento */}
                  <FormField
                    label="Fecha de nacimiento"
                    name="birthdate"
                    type="date"
                    register={register}
                    error={errors.birthdate?.message}
                    hint="Debes tener entre 13 y 24 años"
                  >
                    <input
                      type="date"
                      id="birthdate"
                      {...register("birthdate")}
                      min={minDate}
                      max={maxDate}
                      aria-describedby="birthdate-hint"
                      className={`
                        w-full px-4 py-3 text-gray-900 dark:text-white
                        bg-white dark:bg-gray-800 border-2 rounded-xl text-sm
                        transition-all duration-300 ease-out outline-none
                        ${errors.birthdate 
                          ? "border-red-400 dark:border-red-500 bg-red-50/50 dark:bg-red-900/10" 
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        }
                      `}
                    />
                  </FormField>

                  {/* Género */}
                  <FormSelect
                    label="Género"
                    name="gender"
                    register={register}
                    error={errors.gender?.message}
                    options={[
                      { value: "femenino", label: "Femenino" },
                      { value: "masculino", label: "Masculino" },
                    ]}
                    renderOption={(opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    )}
                    placeholder="Selecciona género"
                  />

                  {/* Estatura */}
                  <FormField
                    label="Estatura (cm)"
                    name="height"
                    register={register}
                    error={errors.height?.message}
                    required={false}
                    placeholder="Ej: 165"
                    hint="En centímetros (opcional)"
                  >
                    <input
                      type="text"
                      id="height"
                      {...register("height")}
                      onInput={(e) => {
                        let value = e.target.value.replace(/[^0-9.]/g, "");
                        const parts = value.split(".");
                        if (parts.length > 2) value = parts[0] + "." + parts.slice(1).join("");
                        if (parts[0]?.length > 3) value = parts[0].slice(0, 3) + (parts[1] ? "." + parts[1] : "");
                        if (parts[1]?.length > 1) value = parts[0] + "." + parts[1].slice(0, 1);
                        e.target.value = value;
                      }}
                      placeholder="Ej: 165"
                      className={`
                        w-full px-4 py-3 text-gray-900 dark:text-white
                        bg-white dark:bg-gray-800 border-2 rounded-xl text-sm
                        transition-all duration-300 ease-out outline-none
                        ${errors.height 
                          ? "border-red-400 dark:border-red-500 bg-red-50/50 dark:bg-red-900/10" 
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        }
                      `}
                    />
                  </FormField>
                </div>
              </div>
            )}

            {/* ================================================================ */}
            {/* PASO 2: Institución Educativa */}
            {/* ================================================================ */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                {/* HCI: Información contextual */}
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                  <FaCircleInfo className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Selecciona primero el departamento, luego la provincia y distrito. 
                    Las instituciones educativas se cargarán automáticamente según tu ubicación.
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Departamento */}
                  <FormSelect
                    label="Departamento"
                    name="department"
                    register={register}
                    error={errors.department?.message}
                    options={departamentos_peru}
                    placeholder="Selecciona departamento"
                  />

                  {/* Provincia */}
                  <FormSelect
                    label="Provincia"
                    name="province"
                    register={register}
                    error={errors.province?.message}
                    options={provinces}
                    disabled={!selectedDepartment}
                    loading={loadingProvinces}
                    placeholder={!selectedDepartment ? "Primero selecciona departamento" : "Selecciona provincia"}
                  />

                  {/* Distrito */}
                  <FormSelect
                    label="Distrito"
                    name="district"
                    register={register}
                    error={errors.district?.message}
                    options={districts}
                    disabled={!selectedProvince}
                    loading={loadingDistricts}
                    placeholder={!selectedProvince ? "Primero selecciona provincia" : "Selecciona distrito"}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Institución Educativa */}
                  <FormSelect
                    label="Institución Educativa"
                    name="educationalService"
                    register={register}
                    error={errors.educationalService?.message}
                    options={institutions}
                    disabled={!selectedDistrict}
                    loading={loadingInstitutions}
                    placeholder={!selectedDistrict ? "Primero selecciona distrito" : "Selecciona institución"}
                    renderOption={(inst) => (
                      <option key={inst._id} value={inst._id}>
                        {inst.CEN_EDU} - ({inst.D_NIV_MOD})
                      </option>
                    )}
                  />

                  {/* Grado/Sección/Ciclo */}
                  <FormField
                    label="Grado / Sección / Ciclo"
                    name="grade_section_cycle"
                    register={register}
                    error={errors.grade_section_cycle?.message}
                    placeholder="Ej: 5to A"
                    hint="Indica tu grado y sección actual"
                  />
                </div>
              </div>
            )}

            {/* ================================================================ */}
            {/* PASO 3: Credenciales */}
            {/* ================================================================ */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <FormField
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    register={register}
                    error={errors.email?.message}
                    placeholder="ejemplo@correo.com"
                    hint="Usaremos este correo para comunicarnos contigo"
                  />

                  {/* Teléfono */}
                  <FormField
                    label="Número de celular"
                    name="phoneNumber"
                    register={register}
                    error={errors.phoneNumber?.message}
                    placeholder="9########"
                    hint="9 dígitos, sin espacios"
                  >
                    <input
                      type="text"
                      id="phoneNumber"
                      {...register("phoneNumber")}
                      maxLength={9}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "").slice(0, 9);
                      }}
                      placeholder="9########"
                      className={`
                        w-full px-4 py-3 text-gray-900 dark:text-white
                        bg-white dark:bg-gray-800 border-2 rounded-xl text-sm
                        transition-all duration-300 ease-out outline-none
                        ${errors.phoneNumber 
                          ? "border-red-400 dark:border-red-500 bg-red-50/50 dark:bg-red-900/10" 
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        }
                      `}
                    />
                  </FormField>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Contraseña */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="password"
                      className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Contraseña
                      <span className="text-red-500 ml-1" aria-hidden="true">*</span>
                    </label>
                    
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        {...register("password")}
                        placeholder="Crea tu contraseña"
                        aria-describedby="password-requirements"
                        className={`
                          w-full px-4 py-3 pr-12 text-gray-900 dark:text-white
                          bg-white dark:bg-gray-800 border-2 rounded-xl text-sm
                          transition-all duration-300 ease-out outline-none
                          ${errors.password 
                            ? "border-red-400 dark:border-red-500 bg-red-50/50 dark:bg-red-900/10" 
                            : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                          }
                        `}
                      />
                      
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* HCI: Indicador de fortaleza de contraseña */}
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              passwordStrength <= 1 ? "bg-red-500 w-1/5" :
                              passwordStrength <= 2 ? "bg-orange-500 w-2/5" :
                              passwordStrength <= 3 ? "bg-yellow-500 w-3/5" :
                              passwordStrength <= 4 ? "bg-lime-500 w-4/5" :
                              "bg-emerald-500 w-full"
                            }`}
                          />
                        </div>
                        <span className={`text-xs font-medium ${
                          passwordStrength <= 1 ? "text-red-500" :
                          passwordStrength <= 2 ? "text-orange-500" :
                          passwordStrength <= 3 ? "text-yellow-600" :
                          passwordStrength <= 4 ? "text-lime-600" :
                          "text-emerald-600"
                        }`}>
                          {passwordStrength <= 1 ? "Muy débil" :
                           passwordStrength <= 2 ? "Débil" :
                           passwordStrength <= 3 ? "Regular" :
                           passwordStrength <= 4 ? "Fuerte" :
                           "Muy fuerte"}
                        </span>
                      </div>
                      
                      {/* Requisitos de contraseña */}
                      <div id="password-requirements" className="grid grid-cols-2 gap-1">
                        <PasswordRequirement text="8+ caracteres" valid={passwordChecks.hasMinLength} />
                        <PasswordRequirement text="Una mayúscula" valid={passwordChecks.hasUppercase} />
                        <PasswordRequirement text="Una minúscula" valid={passwordChecks.hasLowercase} />
                        <PasswordRequirement text="Un número" valid={passwordChecks.hasNumber} />
                        <PasswordRequirement text="Un especial (!$@#%*)" valid={passwordChecks.hasSpecialChar} />
                      </div>
                    </div>
                    
                    {errors.password?.message && (
                      <p className="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400 mt-2" role="alert">
                        <FaCircleExclamation className="w-3.5 h-3.5 flex-shrink-0" />
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirmar contraseña */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="confirmPassword"
                      className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Confirmar contraseña
                      <span className="text-red-500 ml-1" aria-hidden="true">*</span>
                    </label>
                    
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        {...register("confirmPassword")}
                        placeholder="Repite tu contraseña"
                        className={`
                          w-full px-4 py-3 pr-12 text-gray-900 dark:text-white
                          bg-white dark:bg-gray-800 border-2 rounded-xl text-sm
                          transition-all duration-300 ease-out outline-none
                          ${errors.confirmPassword 
                            ? "border-red-400 dark:border-red-500 bg-red-50/50 dark:bg-red-900/10" 
                            : passwordsMatch
                              ? "border-emerald-400 dark:border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10"
                              : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                          }
                        `}
                      />
                      
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                        aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {showConfirmPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* HCI: Indicador de coincidencia */}
                    {confirmPasswordValue && (
                      <p className={`flex items-center gap-1.5 text-sm mt-2 ${
                        passwordsMatch 
                          ? "text-emerald-600 dark:text-emerald-400" 
                          : "text-red-600 dark:text-red-400"
                      }`}>
                        {passwordsMatch ? (
                          <>
                            <FaCheck className="w-3.5 h-3.5" />
                            Las contraseñas coinciden
                          </>
                        ) : (
                          <>
                            <FaCircleExclamation className="w-3.5 h-3.5" />
                            Las contraseñas no coinciden
                          </>
                        )}
                      </p>
                    )}
                    
                    {errors.confirmPassword?.message && (
                      <p className="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400 mt-2" role="alert">
                        <FaCircleExclamation className="w-3.5 h-3.5 flex-shrink-0" />
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Términos y condiciones */}
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input
                        type="checkbox"
                        id="termsAndConditions"
                        {...register("termsAndConditions")}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 peer-focus:ring-2 peer-focus:ring-blue-500/50">
                        <FaCheck className="w-full h-full p-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <FaCheck className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      Estoy de acuerdo con los{" "}
                      <a 
                        href="/terms-and-conditions/" 
                        target="_blank" 
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Términos y Condiciones
                      </a>
                      {" "}y la{" "}
                      <a 
                        href="/privacy-policy/" 
                        target="_blank" 
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Política de Privacidad
                      </a>
                    </span>
                  </label>
                  
                  {errors.termsAndConditions?.message && (
                    <p className="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400 mt-2 ml-8" role="alert">
                      <FaCircleExclamation className="w-3.5 h-3.5 flex-shrink-0" />
                      {errors.termsAndConditions.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ================================================================ */}
            {/* BOTONES DE NAVEGACIÓN */}
            {/* ================================================================ */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100 dark:border-gray-700">
              {/* Botón Atrás */}
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`
                  uppercase inline-flex items-center gap-2 px-8 py-3.5
                  text-sm font-bold rounded-xl
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                  ${currentStep === 0 
                    ? "invisible opacity-0 cursor-default pointer-events-none" 
                    : "text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }
                `}
              >
                <FaArrowLeft className="w-4 h-4" />
                Atrás
              </button>

              {/* Botón Siguiente / Registrar */}
              {currentStep === 0 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="
                    uppercase inline-flex items-center gap-2 px-8 py-3.5
                    text-white font-bold text-base
                    bg-gradient-to-r from-blue-600 to-blue-700
                    hover:from-blue-700 hover:to-blue-800
                    rounded-xl
                    shadow-lg shadow-blue-500/30
                    hover:shadow-xl hover:shadow-blue-500/40
                    hover:-translate-y-0.5 active:translate-y-0
                    transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  "
                >
                  Iniciar registro
                  <FaArrowRight className="w-4 h-4" />
                </button>
              ) : currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="
                    uppercase inline-flex items-center gap-2 px-8 py-3.5
                    text-white font-bold text-base
                    bg-gradient-to-r from-blue-600 to-blue-700
                    hover:from-blue-700 hover:to-blue-800
                    rounded-xl
                    shadow-lg shadow-blue-500/30
                    hover:shadow-xl hover:shadow-blue-500/40
                    hover:-translate-y-0.5 active:translate-y-0
                    transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  "
                >
                  Siguiente
                  <FaArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFormSubmit}
                  disabled={loading}
                  className={`
                    uppercase inline-flex items-center justify-center gap-2 px-8 py-3.5
                    text-white font-bold text-base
                    rounded-xl
                    transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                    min-w-[180px]
                    ${loading 
                      ? "bg-emerald-400 cursor-wait" 
                      : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0"
                    }
                  `}
                  aria-busy={loading}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="w-5 h-5 animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    <>
                      <FaCheck className="w-4 h-4" />
                      Completar registro
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Link a login */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                ¿Ya tienes una cuenta?{" "}
                <Link 
                  to="/login" 
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Estilos CSS para animaciones */}
      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in-down { animation: fade-in-down 0.5s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
        .animate-scale-in { animation: scale-in 0.2s ease-out; }
      `}</style>
    </div>
  );
};

export default Register;