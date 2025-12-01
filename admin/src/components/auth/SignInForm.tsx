import { useState, useCallback } from "react";

import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { useAuth } from "../../context/AuthContext";
import { useRecaptcha } from "../../context/RecaptchaContext";

interface LoginCredentials {
  username: string;
  password: string;
}

export default function SignInForm() {
  const { login, errors: authErrors } = useAuth();
  const { getRecaptchaToken } = useRecaptcha();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string>("");

  // Manejar cambios en los inputs
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCredentials((prev) => ({
        ...prev,
        [name]: value,
      }));
      // Limpiar error local cuando el usuario empieza a escribir
      if (localError) {
        setLocalError("");
      }
    },
    [localError]
  );

  // Validar formulario
  const validateForm = (): boolean => {
    if (!credentials.username.trim()) {
      setLocalError("Por favor, ingresa tu usuario.");
      return false;
    }

    if (!credentials.password) {
      setLocalError("Por favor, ingresa tu contraseña.");
      return false;
    }

    return true;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");

    // Validar antes de enviar
    if (!validateForm()) {
      return;
    }

    // Verificar que reCAPTCHA esté disponible
    if (!getRecaptchaToken) {
      setLocalError("Error al cargar reCAPTCHA. Por favor, recarga la página.");
      return;
    }

    setIsLoading(true);

    try {
      // Ejecutar reCAPTCHA v3 y obtener token
      const recaptchaToken = await getRecaptchaToken("login");

      if (!recaptchaToken) {
        setLocalError(
          "Error al verificar reCAPTCHA. Por favor, inténtalo de nuevo."
        );
        setIsLoading(false);
        return;
      }

      // Llamar al login con el token
      await login(credentials, rememberMe, recaptchaToken);
    } catch (err) {
      console.error("Error durante el login:", err);

      if (err instanceof Error) {
        setLocalError(err.message);
      } else {
        setLocalError(
          "Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle para mostrar/ocultar contraseña
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Toggle para "recordarme"
  const toggleRememberMe = useCallback(() => {
    setRememberMe((prev) => !prev);
  }, []);

  // Combinar errores del contexto y locales para mostrar
  const displayErrors = [...authErrors];
  if (localError && !displayErrors.includes(localError)) {
    displayErrors.unshift(localError);
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Iniciar Sesión
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingresa tu usuario y contraseña para iniciar sesión
            </p>
          </div>

          <div>
            {/* Mostrar errores */}
            {displayErrors.length > 0 && (
              <div
                className="bg-red-500 text-white p-3 rounded-lg mb-5 sm:mb-8"
                role="alert"
                aria-live="polite"
              >
                {displayErrors.length === 1 ? (
                  <p>{displayErrors[0]}</p>
                ) : (
                  <ul className="list-disc list-inside space-y-1">
                    {displayErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-6">
                {/* Campo de usuario */}
                <div>
                  <Label htmlFor="username">
                    Usuario <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu usuario"
                    disabled={isLoading}
                  />
                </div>

                {/* Campo de contraseña */}
                <div>
                  <Label htmlFor="password">
                    Contraseña <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      placeholder="Ingresa tu contraseña"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                      aria-label={
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeIcon className="size-5" />
                      ) : (
                        <EyeCloseIcon className="size-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Checkbox "Mantener sesión" */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={toggleRememberMe}
                      disabled={isLoading}
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-gray-700 dark:text-gray-400 cursor-pointer select-none"
                    >
                      Mantener sesión iniciada
                    </label>
                  </div>
                </div>

                {/* Botón de envío */}
                <div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                    size="sm"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
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
                        <span>Iniciando sesión...</span>
                      </span>
                    ) : (
                      "Ingresar"
                    )}
                  </Button>
                </div>

                {/* Texto de protección reCAPTCHA */}
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  Este sitio está protegido por reCAPTCHA y aplican la{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    Política de Privacidad
                  </a>{" "}
                  y los{" "}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    Términos de Servicio
                  </a>{" "}
                  de Google.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
