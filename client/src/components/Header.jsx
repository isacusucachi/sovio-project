import { useState, useRef, useEffect } from "react";
import { FaBars, FaX } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Header({ onToggleSidebar, isSidebarOpen }) {
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const userMenuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setIsUserMenuOpen(false);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const shouldShowPublicMenu = () => {
    const privateRoutes = ["/main"];
    if (privateRoutes.some((route) => location.pathname.startsWith(route))) {
      return false;
    }
    return true;
  };

  const isPrivateRoute = () => {
    const privateRoutes = ["/main"];
    return privateRoutes.some((route) => location.pathname.startsWith(route));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInitials = () => {
    if (!user) return "U";

    const firstName = user.names || "";
    const lastName = user.surnames || user.lastName || "";

    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();

    return firstInitial && lastInitial
      ? `${firstInitial}${lastInitial}`
      : firstInitial || "U";
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const baseStyles =
    "block py-2 px-3 font-bold rounded-sm transition-colors duration-200";

  const getLinkStyles = (path) => {
    if (isActive(path)) {
      return `${baseStyles} text-blue-700 underline underline-offset-4 decoration-2 bg-blue-50 md:bg-transparent dark:text-blue-500 dark:bg-blue-900/20 md:dark:bg-transparent`;
    }
    return `${baseStyles} text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:hover:underline md:hover:underline-offset-4 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500 dark:border-gray-700`;
  };

  const menuItems = [
    { path: "/", label: "INICIO" },
    { path: "/services", label: "SERVICIOS" },
    { path: "/gallery", label: "GALERÍA" },
  ];

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 w-full z-50 start-0 border-b border-gray-200 dark:border-gray-600 sticky top-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center gap-3">
            {isPrivateRoute() && onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                type="button"
                className="lg:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="sidebar-menu"
                aria-expanded={isSidebarOpen}
              >
                <span className="sr-only">Toggle sidebar</span>
                {isSidebarOpen ? (
                  <FaX className="size-5" />
                ) : (
                  <FaBars className="size-5" />
                )}
              </button>
            )}

            <a
              href="/"
              className="flex items-center justify-center space-x-2 md:space-x-4"
            >
              <img
                src={"./Logo GORE_Nuevo_negativo_vertical.png"}
                className="h-10 w-auto hidden dark:block"
                alt="Logo GORE Cusco"
              />
              <img
                src={"./Logo GORE_Nuevo_positivo_vertical.png"}
                className="h-10 w-auto block dark:hidden"
                alt="Logo GORE Cusco"
              />
              <span className="font-arima text-[6px] md:text-[8px] font-extrabold text-center dark:text-white">
                GERENCIA REGIONAL DE TRABAJO
                <br />Y PROMOCIÓN DEL EMPLEO CUSCO
              </span>
            </a>
          </div>

          <div className="flex md:order-2 space-x-1 md:space-x-3 rtl:space-x-reverse items-center">
            {!isAuthenticated ? (
              <a
                href="/login"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                INGRESAR
              </a>
            ) : (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 text-sm font-bold text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={toggleUserMenu}
                  aria-expanded={isUserMenuOpen}
                >
                  <span className="sr-only">Open user menu</span>
                  {getInitials()}
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {user?.names} {user?.surnames}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {user?.email}
                      </p>
                    </div>

                    <ul className="py-1">
                      {/* <li>
                        <a
                          href="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 font-semibold uppercase"
                        >
                          CONFIGURACIÓN
                        </a>
                      </li> */}
                      <li>
                        <button
                          onClick={handleLogoutClick}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-700 font-semibold"
                        >
                          CERRAR SESIÓN
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {!isPrivateRoute() && (
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <FaX className="size-5" />
                ) : (
                  <FaBars className="size-5" />
                )}
              </button>
            )}
          </div>

          <div
            className={`items-center justify-between ${
              isMenuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            {shouldShowPublicMenu() && (
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      className={getLinkStyles(item.path)}
                      aria-current={isActive(item.path) ? "page" : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>

      {/* Modal de confirmación de cierre de sesión */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          onClick={cancelLogout}
        >
          <div
            className="relative p-4 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button
                type="button"
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={cancelLogout}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <svg
                className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="mb-4 text-gray-500 dark:text-gray-300 font-semibold">
                ¿Estás seguro de que quieres cerrar sesión?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={cancelLogout}
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancelar
                </button>
                <button
                  onClick={confirmLogout}
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Sí, cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
