import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/authContext";
import { useRecaptcha } from "../context/recaptchaContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/authSchema";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const { getRecaptchaToken } = useRecaptcha();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const recaptchaToken = await getRecaptchaToken("login_form");
      const res = await signin({ ...data, recaptchaToken: recaptchaToken });
      setLoading(false);
      if (res) {
        toast.success("Inicio de sesión exitoso");
      }
    } catch (error) {
      toast.error("Error al iniciar sesión");
      throw error;
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
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <Link
        to="/"
        className="absolute top-4 left-4 inline-flex items-center justify-center px-5 py-3 text-base font-bold text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        <FaArrowLeft className="w-4 h-4 sm:mr-2" />
        <span className="hidden sm:inline">VOLVER A INICIO</span>
      </Link>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center justify-center space-x-2 md:space-x-4 mb-6"
        >
          <img
            src={"./Logo GORE_Nuevo_negativo_vertical.png"}
            className="h-16 w-auto hidden dark:block"
            alt="Logo GORE Cusco"
          />
          <img
            src={"./Logo GORE_Nuevo_positivo_vertical.png"}
            className="h-16 w-auto block dark:hidden"
            alt="Logo GORE Cusco"
          />
          <span className="font-arima text-[6px] md:text-[8px] font-extrabold text-center dark:text-white">
            GERENCIA REGIONAL DE TRABAJO
            <br />Y PROMOCIÓN DEL EMPLEO CUSCO
          </span>
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Inicia sesión en tu cuenta
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="identifier"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  <span>N° de documento de identidad o correo electrónico</span>
                  <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                    {" "}
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="identifier"
                  id="identifier"
                  {...register("identifier")}
                  className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                    errors.identifier
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                      : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }`}
                  placeholder="Ej. 74###### o correo@ejemplo.com"
                />
                {errors.identifier?.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.identifier?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  <span>Contraseña</span>
                  <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                    {" "}
                    *
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    {...register("password")}
                    placeholder="••••••••"
                    className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                        : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-4 h-4" />
                    ) : (
                      <FaEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password?.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 justify-center items-center flex"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 mr-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : (
                  "INGRESAR"
                )}
              </button>
              <div
                className="text-base font-medium text-gray-500 dark:text-gray-400 text-center"
                bis_skin_checked="1"
              >
                ¿Aún no tienes una cuenta?
                <a
                  className="ml-1 text-blue-700 dark:text-blue-500 hover:underline font-bold"
                  href="/register"
                >
                  Regístrese aquí
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
