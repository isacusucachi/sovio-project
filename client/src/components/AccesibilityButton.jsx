import { useState, useEffect, useRef } from "react";
import {
  FaUniversalAccess,
  FaSun,
  FaMoon,
  FaPlus,
  FaMinus,
  FaTextHeight,
  FaFont,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useTheme } from "../context/themeContext";

export default function AccessibilityButton() {
  const { theme, toggleTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [easyFont, setEasyFont] = useState(false);
  const [textSpacing, setTextSpacing] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const accessibilyButtonRef = useRef(null);

  // Cerrar el menú de usuario cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accessibilyButtonRef.current && !accessibilyButtonRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cargar valores desde localStorage
  useEffect(() => {
    const savedFont = localStorage.getItem("access_font_size");
    const savedEasy = localStorage.getItem("access_easy_font");
    const savedSpacing = localStorage.getItem("access_text_spacing");

    if (savedFont) {
      const fs = parseInt(savedFont, 10);
      if (!isNaN(fs)) {
        setFontSize(fs);
        document.documentElement.style.fontSize = `${fs}%`;
      }
    }

    if (savedEasy === "true") {
      setEasyFont(true);
      document.documentElement.classList.add("easy-font");
    }

    if (savedSpacing === "true") {
      setTextSpacing(true);
      document.documentElement.classList.add("text-spacing");
    }
  }, []);

  // Tamaño de texto
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem("access_font_size", fontSize.toString());
  }, [fontSize]);

  // Texto fácil
  useEffect(() => {
    if (easyFont) {
      document.documentElement.classList.add("easy-font");
    } else {
      document.documentElement.classList.remove("easy-font");
    }
    localStorage.setItem("access_easy_font", easyFont ? "true" : "false");
  }, [easyFont]);

  // Espaciado
  useEffect(() => {
    if (textSpacing) {
      document.documentElement.classList.add("text-spacing");
    } else {
      document.documentElement.classList.remove("text-spacing");
    }
    localStorage.setItem("access_text_spacing", textSpacing ? "true" : "false");
  }, [textSpacing]);

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const increaseFontSize = () =>
    setFontSize((prev) => clamp(prev + 10, 80, 200));
  const decreaseFontSize = () =>
    setFontSize((prev) => clamp(prev - 10, 80, 200));

  const toggleEasyFont = () => setEasyFont((prev) => !prev);
  const toggleTextSpacing = () => setTextSpacing((prev) => !prev);

  // Lectura en voz alta
  const handleReadPage = () => {
    if (!("speechSynthesis" in window)) {
      alert("Tu navegador no soporta lectura en voz alta.");
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const text = document.body.innerText || "";
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";

    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    setIsReading(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50" ref={accessibilyButtonRef}>
      {/* Botón principal */}
      <button
        id="accessibility-btn"
        data-tooltip-id="tooltip-main"
        data-tooltip-content="Opciones de accesibilidad"
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <FaUniversalAccess className="size-6 md:size-8" />
      </button>

      <Tooltip id="tooltip-main" place="right" />

      {open && (
        <div className="mt-3 p-4 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Accesibilidad
          </h3>

          {/* Tema */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-700 dark:text-gray-300">Tema</span>

            <button
              id="theme-btn"
              data-tooltip-id="tooltip-theme"
              data-tooltip-content={
                theme === "dark"
                  ? "Cambiar a modo claro"
                  : "Cambiar a modo oscuro"
              }
              onClick={toggleTheme}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-100"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>

            <Tooltip id="tooltip-theme" place="right" />
          </div>

          {/* Tamaño de texto */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-700 dark:text-gray-300">
              Tamaño de texto
            </span>

            <div className="flex items-center gap-2">
              <button
                id="font-minus-btn"
                data-tooltip-id="tooltip-font-minus"
                data-tooltip-content="Reducir tamaño de texto"
                onClick={decreaseFontSize}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-100"
              >
                <FaMinus />
              </button>
              <Tooltip id="tooltip-font-minus" place="bottom" />

              <span className="text-gray-900 dark:text-gray-100 min-w-[50px] text-center font-semibold">
                {fontSize}%
              </span>

              <button
                id="font-plus-btn"
                data-tooltip-id="tooltip-font-plus"
                data-tooltip-content="Aumentar tamaño de texto"
                onClick={increaseFontSize}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-100"
              >
                <FaPlus />
              </button>
              <Tooltip id="tooltip-font-plus" place="bottom" />
            </div>
          </div>

          {/* Texto fácil */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-700 dark:text-gray-300">
              Texto fácil
            </span>

            <button
              id="easy-font-btn"
              data-tooltip-id="tooltip-easy-font"
              data-tooltip-content={
                easyFont
                  ? "Desactivar texto fácil"
                  : "Activar texto fácil (fuente accesible)"
              }
              onClick={toggleEasyFont}
              className={`p-2 rounded-lg ${
                easyFont
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              }`}
            >
              <FaFont />
            </button>

            <Tooltip id="tooltip-easy-font" place="right" />
          </div>

          {/* Espaciado de texto */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-700 dark:text-gray-300">
              Espaciado de texto
            </span>

            <button
              id="text-spacing-btn"
              data-tooltip-id="tooltip-text-spacing"
              data-tooltip-content={
                textSpacing
                  ? "Desactivar espaciado de texto"
                  : "Activar espaciado de texto"
              }
              onClick={toggleTextSpacing}
              className={`p-2 rounded-lg ${
                textSpacing
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              }`}
            >
              <FaTextHeight />
            </button>

            <Tooltip id="tooltip-text-spacing" place="right" />
          </div>

          {/* Lectura en voz alta */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300">
              Lectura en voz alta
            </span>

            <button
              id="tts-btn"
              data-tooltip-id="tooltip-tts"
              data-tooltip-content={
                isReading ? "Detener lectura" : "Leer contenido"
              }
              onClick={handleReadPage}
              className={`p-2 rounded-lg ${
                isReading
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              }`}
            >
              {isReading ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>

            <Tooltip id="tooltip-tts" place="right" />
          </div>
        </div>
      )}
    </div>
  );
}
