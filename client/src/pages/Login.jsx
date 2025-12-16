import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/authContext";
import { useRecaptcha } from "../context/recaptchaContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/authSchema";
import { FaArrowLeft, FaEye, FaEyeSlash, FaCheck, FaCircleExclamation } from "react-icons/fa6";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const identifierRef = useRef(null);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // Validación en tiempo real para feedback inmediato
  });
  
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const { getRecaptchaToken } = useRecaptcha();
  const navigate = useNavigate();

  // Valores observados para feedback visual en tiempo real
  const identifierValue = watch("identifier");
  const passwordValue = watch("password");

  // HCI: Autofocus en el primer campo al cargar (eficiencia)
  useEffect(() => {
    if (identifierRef.current) {
      identifierRef.current.focus();
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const recaptchaToken = await getRecaptchaToken("login_form");
      const res = await signin({ ...data, recaptchaToken });
      
      if (res) {
        // HCI: Feedback positivo claro con mensaje específico
        toast.success("¡Bienvenido! Redirigiendo al panel principal...", {
          icon: "👋",
          autoClose: 2000,
        });
      }
    } catch (error) {
      setLoginAttempts(prev => prev + 1);
      
      // HCI: Mensajes de error constructivos y específicos
      if (loginAttempts >= 2) {
        toast.error(
          "Múltiples intentos fallidos. ¿Olvidaste tu contraseña?",
          { autoClose: 5000 }
        );
      } else {
        toast.error("Credenciales incorrectas. Verifica tus datos e intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/main");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (loginErrors.length > 0) {
      loginErrors.forEach((error) => toast.error(error));
    }
  }, [loginErrors]);

  // HCI: Función para determinar el estado visual del campo
  const getFieldStatus = (fieldName, errorObj, dirtyObj, value) => {
    if (!dirtyObj[fieldName]) return "neutral";
    if (errorObj[fieldName]) return "error";
    if (value && value.length > 0) return "valid";
    return "neutral";
  };

  const identifierStatus = getFieldStatus("identifier", errors, dirtyFields, identifierValue);
  const passwordStatus = getFieldStatus("password", errors, dirtyFields, passwordValue);

  // HCI: Clases dinámicas según estado del campo
  const getInputClasses = (status, isFocused) => {
    const baseClasses = `
      w-full px-4 py-3.5 
      text-gray-900 dark:text-white 
      bg-white dark:bg-gray-800
      border-2 rounded-xl
      text-base
      transition-all duration-300 ease-out
      placeholder:text-gray-400 dark:placeholder:text-gray-500
      outline-none
    `;
    
    const statusClasses = {
      neutral: `
        border-gray-200 dark:border-gray-600
        ${isFocused 
          ? "border-blue-500 dark:border-blue-400 ring-4 ring-blue-500/10 dark:ring-blue-400/10" 
          : "hover:border-gray-300 dark:hover:border-gray-500"
        }
      `,
      error: `
        border-red-400 dark:border-red-500
        ${isFocused 
          ? "ring-4 ring-red-500/10 dark:ring-red-400/10" 
          : ""
        }
        bg-red-50/50 dark:bg-red-900/10
      `,
      valid: `
        border-emerald-400 dark:border-emerald-500
        ${isFocused 
          ? "ring-4 ring-emerald-500/10 dark:ring-emerald-400/10" 
          : ""
        }
        bg-emerald-50/30 dark:bg-emerald-900/10
      `,
    };

    return `${baseClasses} ${statusClasses[status]}`;
  };

  // HCI: Indicador visual del estado del campo
  const FieldStatusIcon = ({ status }) => {
    if (status === "valid") {
      return (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 animate-scale-in">
          <FaCheck className="w-4 h-4" />
        </span>
      );
    }
    if (status === "error") {
      return (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 animate-shake">
          <FaCircleExclamation className="w-4 h-4" />
        </span>
      );
    }
    return null;
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Fondo decorativo con formas geométricas sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-200/20 to-purple-200/20 dark:from-blue-800/10 dark:to-purple-800/10 rounded-full blur-3xl" />
      </div>

      {/* HCI: Navegación clara con affordance visible */}
      <Link
        to="/"
        className="
          uppercase absolute top-6 left-6 z-10
          inline-flex items-center gap-2
          px-4 py-2.5
          text-sm font-bold
          text-gray-700 dark:text-gray-200
          bg-white/80 dark:bg-gray-800/80
          backdrop-blur-sm
          border border-gray-200 dark:border-gray-700
          rounded-xl
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

      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo y branding */}
        <div className="mb-8 text-center animate-fade-in-down">
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

        {/* Card principal del formulario */}
        <div 
          className="
            w-full max-w-md
            bg-white/90 dark:bg-gray-800/90
            backdrop-blur-xl
            rounded-3xl
            shadow-xl shadow-gray-200/50 dark:shadow-none
            border border-gray-100 dark:border-gray-700
            p-8 sm:p-10
            animate-fade-in-up
          "
          role="main"
        >
          {/* HCI: Título claro con jerarquía visual */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Bienvenido de nuevo
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Ingresa tus credenciales para acceder al sistema
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate // Usamos validación personalizada
          >
            {/* Campo de identificador */}
            <div className="space-y-2">
              <label
                htmlFor="identifier"
                className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                <span className="flex items-center gap-1">
                  Documento o correo electrónico
                  <span className="text-red-500" aria-hidden="true">*</span>
                </span>
                {/* HCI: Indicador de campo requerido para lectores de pantalla */}
                <span className="sr-only">(campo requerido)</span>
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  id="identifier"
                  autoComplete="username"
                  aria-required="true"
                  aria-invalid={errors.identifier ? "true" : "false"}
                  aria-describedby={errors.identifier ? "identifier-error" : "identifier-hint"}
                  {...register("identifier")}
                  ref={(e) => {
                    register("identifier").ref(e);
                    identifierRef.current = e;
                  }}
                  onFocus={() => setFocusedField("identifier")}
                  onBlur={() => setFocusedField(null)}
                  className={`${getInputClasses(identifierStatus, focusedField === "identifier")} ${identifierStatus !== "neutral" ? "pr-10" : ""}`}
                  placeholder="Ej: 72345678 o correo@ejemplo.com"
                />
                {identifierStatus !== "neutral" && <FieldStatusIcon status={identifierStatus} />}
              </div>
              
              {/* HCI: Texto de ayuda contextual */}
              {!errors.identifier && (
                <p id="identifier-hint" className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 ml-1">
                  Puedes usar tu DNI, CE o tu correo registrado
                </p>
              )}
              
              {/* HCI: Mensaje de error claro y constructivo */}
              {errors.identifier?.message && (
                <p 
                  id="identifier-error" 
                  className="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400 mt-1.5 ml-1 animate-slide-down"
                  role="alert"
                >
                  <FaCircleExclamation className="w-3.5 h-3.5 flex-shrink-0" />
                  {errors.identifier.message}
                </p>
              )}
            </div>

            {/* Campo de contraseña */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  <span className="flex items-center gap-1">
                    Contraseña
                    <span className="text-red-500" aria-hidden="true">*</span>
                  </span>
                  <span className="sr-only">(campo requerido)</span>
                </label>
                
                {/* HCI: Enlace de recuperación visible */}
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  aria-required="true"
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  {...register("password")}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className={`${getInputClasses(passwordStatus, focusedField === "password")} pr-12`}
                  placeholder="Ingresa tu contraseña"
                />
                
                {/* HCI: Botón de mostrar/ocultar con feedback claro */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute right-3 top-1/2 -translate-y-1/2
                    p-1.5 rounded-lg
                    text-gray-400 hover:text-gray-600
                    dark:text-gray-500 dark:hover:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  "
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-4 h-4" />
                  ) : (
                    <FaEye className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              {errors.password?.message && (
                <p 
                  id="password-error" 
                  className="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400 mt-1.5 ml-1 animate-slide-down"
                  role="alert"
                >
                  <FaCircleExclamation className="w-3.5 h-3.5 flex-shrink-0" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* HCI: Botón de envío con estados claros */}
            <button
              type="submit"
              disabled={loading}
              className={`
                uppercase relative w-full
                py-3.5 px-6
                text-white font-semibold text-base
                rounded-xl
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${loading 
                  ? "bg-blue-400 dark:bg-blue-500 cursor-wait" 
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0"
                }
              `}
              aria-busy={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  {/* HCI: Indicador de carga con animación suave */}
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Verificando credenciales...</span>
                </span>
              ) : (
                "Iniciar sesión"
              )}
            </button>

            {/* HCI: Separador visual para opciones secundarias */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-800 px-3 text-gray-400 dark:text-gray-500 font-medium">
                  ¿Nuevo usuario?
                </span>
              </div>
            </div>

            {/* HCI: CTA secundario claramente diferenciado */}
            <Link
              to="/register"
              className="
                uppercase flex items-center justify-center
                w-full py-3.5 px-6
                text-gray-700 dark:text-gray-200 font-semibold text-base
                bg-gray-50 dark:bg-gray-700/50
                border-2 border-gray-200 dark:border-gray-600
                rounded-xl
                transition-all duration-300
                hover:bg-gray-100 dark:hover:bg-gray-700
                hover:border-gray-300 dark:hover:border-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              "
            >
              Crear una cuenta nueva
            </Link>
          </form>
        </div>
      </div>

      {/* HCI: Estilos CSS para animaciones */}
      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out 0.3s both;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.4s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Login;