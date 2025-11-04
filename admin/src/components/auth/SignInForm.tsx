import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { useAuth } from "../../context/AuthContext";
import { RECAPTCHA_SITE_KEY } from "../../config";

export default function SignInForm() {
  const { login, errors } = useAuth();
  const [user, setUser] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const resetCaptcha = () => {
    (recaptchaRef.current as any)?.reset();
    setRecaptchaToken(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!recaptchaToken) {
      setError("Por favor, completa el reCAPTCHA.");
      return;
    }

    setLoading(true);
    try {
      await login(user, isChecked, recaptchaToken);
      resetCaptcha();
    } catch (err) {
      console.error("Error durante el login:", err);
      setError(
        "Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

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
            {errors.length > 0 && (
              <div className="bg-red-500 text-white p-2 rounded mb-5 sm:mb-8">
                <ol className="list-disc list-inside">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ol>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Usuario <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Ingresa tu usuario"
                  />
                </div>
                <div>
                  <Label>
                    Contraseña <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      placeholder="Ingresa tu contraseña"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="size-5" />
                      ) : (
                        <EyeCloseIcon className="size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                    />
                    <span className="text-gray-700 dark:text-gray-400">
                      Mantener sesión iniciada
                    </span>
                  </div>
                </div>

                {/* reCAPTCHA */}
                <div className="mb-4">
                  <ReCAPTCHA
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={(token) => setRecaptchaToken(token)}
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                    size="sm"
                  >
                    {loading ? (
                      <svg
                        width="20"
                        height="20"
                        fill="hsl(228, 97%, 42%)"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="4" cy="12" r="3">
                          <animate
                            id="spinner_qFRN"
                            begin="0;spinner_OcgL.end+0.25s"
                            attributeName="cy"
                            calcMode="spline"
                            dur="0.6s"
                            values="12;6;12"
                            keySplines=".33,.66,.66,1;.33,0,.66,.33"
                          />
                        </circle>
                        <circle cx="12" cy="12" r="3">
                          <animate
                            begin="spinner_qFRN.begin+0.1s"
                            attributeName="cy"
                            calcMode="spline"
                            dur="0.6s"
                            values="12;6;12"
                            keySplines=".33,.66,.66,1;.33,0,.66,.33"
                          />
                        </circle>
                        <circle cx="20" cy="12" r="3">
                          <animate
                            id="spinner_OcgL"
                            begin="spinner_qFRN.begin+0.2s"
                            attributeName="cy"
                            calcMode="spline"
                            dur="0.6s"
                            values="12;6;12"
                            keySplines=".33,.66,.66,1;.33,0,.66,.33"
                          />
                        </circle>
                      </svg>
                    ) : (
                      "Ingresar"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
