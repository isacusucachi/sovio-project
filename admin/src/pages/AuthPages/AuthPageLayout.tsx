import React, { useEffect } from "react";
/* import GridShape from "../../components/common/GridShape"; */
import { Link, useNavigate } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import { useAuth } from "../../context/AuthContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirige al Dashboard si ya está autenticado
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-[url('/images/Fondo-rojo-GORE.svg')] bg-cover bg-center lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            {/* <GridShape /> */}
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                <img
                  width={231}
                  height={48}
                  src="/images/logo/logo y eslogan opcion 2_negativo.webp"
                  alt="Logo"
                />
              </Link>
              <p className="text-center text-white">
                GERENCIA REGIONAL DE TRABAJO Y PROMOCION DEL EMPLEO CUSCO
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
