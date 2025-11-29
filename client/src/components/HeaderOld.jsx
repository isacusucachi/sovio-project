import { useState, useEffect } from "react";
import { FaXmark, FaBars } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import ThemeToggle from "./ui/ThemeToggle";
import { useTheme } from "../context/themeContext";
import { useAuth } from "../context/authContext";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTestsMenuOpen, setTestsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showTopSection, setShowTopSection] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTestsMenu = () => {
    setTestsMenuOpen(!isTestsMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowTopSection(false);
      } else {
        setShowTopSection(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 flex-none mx-auto w-full bg-white dark:bg-gray-900">
      {showTopSection && (
        <div
          id="banner"
          tabindex="-1"
          className="z-50 flex justify-center w-full px-4 py-3 border border-b border-gray-200 bg-gray-50 dark:border-gray-600 lg:py-4 dark:bg-gray-700"
          bis_skin_checked="1"
        >
          <div className="items-center md:flex" bis_skin_checked="1">
            <p className="text-sm font-medium text-gray-900 md:my-0 dark:text-white">
              Plataforma 100% gratuita
            </p>
          </div>
        </div>
      )}
      <div className="px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a
            href="/"
            className="flex items-center justify-center space-x-2 md:space-x-4"
          >
            <img
              src={"./Logo GORE_Nuevo_negativo_vertical.png"}
              className="h-10 w-auto"
              alt="Logo GORE Cusco"
            />
            <span className="font-arima text-[6px] md:text-[8px] font-extrabold text-center dark:text-white">
              GERENCIA REGIONAL DE TRABAJO
              <br />Y PROMOCIÓN DEL EMPLEO CUSCO
            </span>
          </a>
          <div className="flex items-center lg:order-2 space-x-2">
            <ThemeToggle theme={theme} handleChangeTheme={toggleTheme} />
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-1 md:ml-3"
              >
                INGRESAR
              </Link>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded={isUserMenuOpen}
                  onClick={toggleUserMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <FaUserCircle className="size-8 text-gray-300" />
                </button>
                {isUserMenuOpen && (
                  <div
                    className="z-50 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="user-dropdown"
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {user != null &&
                          user.typeOfIdentityDocument +
                            ": " +
                            user.identityDocumentNumber}
                      </span>
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                        {user != null && user.names + " " + user.surnames}
                      </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <a
                          href="/personal-information"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Ficha personal
                        </a>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            logout();
                          }}
                          className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400 w-full text-start"
                        >
                          Cerrar sesión
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-white hover:text-red-gore-3 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="mobile-menu-2"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FaXmark className="size-6" />
              ) : (
                <FaBars className="size-6" />
              )}
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {isAuthenticated && (
                <>
                  <li>
                    <a
                      href="/main"
                      className={`block py-2 pr-4 pl-3 text-white font-bold border-b border-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 hover:bg-white hover:text-red-500 ${
                        location.pathname === "/main" && "lg:text-red-500"
                      }`}
                    >
                      INICIO
                    </a>
                  </li>
                  <li className="relative">
                    <button
                      id="doubleDropdownButton"
                      onClick={toggleTestsMenu}
                      type="button"
                      className={`flex items-center w-full py-2 pr-4 pl-3 text-white font-bold border-b border-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 hover:bg-white hover:text-red-500 ${
                        (location.pathname === "/ieppo-test" ||
                          location.pathname === "/phb-test" ||
                          location.pathname === "/tepe-test") &&
                        "lg:text-red-500"
                      }`}
                    >
                      PRUEBAS
                      <IoIosArrowDown className="size-5" />
                    </button>
                    {isTestsMenuOpen && (
                      <div
                        id="doubleDropdown"
                        className="z-10 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
                      >
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="doubleDropdownButton"
                        >
                          <li>
                            <a
                              href="/ieppo-test"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              IEPPO
                            </a>
                          </li>
                          <li>
                            <a
                              href="/phb-test"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              PHB
                            </a>
                          </li>
                          <li>
                            <a
                              href="/tepe-test"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              TEPE
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>
                  <li>
                    <a
                      href="/final-vocational-test-report"
                      className={`block py-2 pr-4 pl-3 text-white font-bold border-b border-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 hover:bg-white hover:text-red-500 ${
                        location.pathname === "/final-vocational-test-report" &&
                        "lg:text-red-500"
                      }`}
                    >
                      RESULTADOS
                    </a>
                  </li>
                </>
              )}
              <li>
                <a
                  href="/mi-carrera"
                  className={`block py-2 pr-4 pl-3 text-white font-bold border-b border-gray-100 lg:hover:bg-transparent lg:border-0 lg:p-0 hover:bg-white hover:text-red-500 ${
                    location.pathname === "/mi-carrera" && "lg:text-red-500"
                  }`}
                >
                  MI CARRERA
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
