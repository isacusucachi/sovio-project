import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = ({ theme, handleChangeTheme }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleChangeTheme}
        className={`relative w-10 md:w-14 h-5 md:h-7 rounded-full bg-white transition-colors duration-300`}
      >
        <div
          className={`flex justify-center items-center absolute top-0.5 left-0.5 w-4 md:w-6 h-4 md:h-6 rounded-full bg-gray-900 dark:bg-gray-200 transform transition-transform duration-300 ${
            theme === "dark" ? "translate-x-5 md:translate-x-7" : ""
          }`}
        >
          {theme === "light" ? <FaSun className="text-white size-3 md:size-5" /> : <FaMoon className="size-3 md:size-5"/>}
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
