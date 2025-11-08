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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTestsMenu = () => {
    setTestsMenuOpen(!isTestsMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  return (
    <header className="sticky top-0 z-40 flex-none mx-auto w-full bg-white dark:bg-gray-900 ">
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

      <div
        className="w-full px-3 py-3 mx-auto lg:flex lg:justify-between max-w-8xl lg:px-3"
        bis_skin_checked="1"
      >
        <div className="flex justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center justify-between">
              <img
                src={"./Logo GORE_Nuevo_negativo_vertical.png"}
                className="h-10 w-auto"
                alt="Logo GORE Cusco"
              />
              <span className="font-arima text-[6px] md:text-[10px] font-extrabold text-center whitespace-nowrap dark:text-white ml-2">
                GERENCIA REGIONAL DE TRABAJO
                <br />Y PROMOCIÓN DEL EMPLEO CUSCO
              </span>
            </a>
          </div>
        </div>
        <div
          className="flex items-center w-full lg:w-auto"
          bis_skin_checked="1"
        >
          <ul className="flex flex-col py-2 lg:py-0 lg:flex-row lg:self-center w-full lg:w-auto collapsed">
            <li>
              <a
                className="block py-2 text-sm font-bold text-gray-900 lg:px-3 lg:py-0 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                href="/docs/getting-started/introduction/"
              >
                NOSOTROS
              </a>
            </li>
            <li>
              <a
                className="block py-2 text-sm font-bold text-gray-900 lg:px-3 lg:py-0 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                href="/blocks/"
              >
                SERVICIOS
              </a>
            </li>
            <li>
              <a
                className="block py-2 text-sm font-bold text-gray-900 lg:px-3 lg:py-0 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                href="/figma/"
              >
                PRUEBAS
              </a>
            </li>
            <li>
              <a
                className="block py-2 text-sm font-bold text-gray-900 lg:px-3 lg:py-0 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500"
                href="/icons/"
              >
                GALERÍA
              </a>
            </li>
          </ul>
          <div
            className="lg:self-center flex items-center mb-4 lg:mb-0"
            bis_skin_checked="1"
          >
            <div
              className="items-center hidden mr-3 lg:flex"
              bis_skin_checked="1"
            >
              
              <ThemeToggle theme={theme} handleChangeTheme={toggleTheme} />
              <a
                className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-1 md:ml-3"
                href="/login/"
              >
                <span className="md:hidden">Login</span>
                <span className="hidden md:inline">Sign in</span>
                <svg
                  className="hidden w-3 h-3 ml-2 xl:inline"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  ></path>
                </svg>
              </a>
              <button className="ml-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center justify-center w-10 h-10">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
