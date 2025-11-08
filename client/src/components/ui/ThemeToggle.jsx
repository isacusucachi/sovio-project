import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = ({ theme, handleChangeTheme }) => {
  return (
    <button
      type="button"
      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 w-10 h-10 inline-flex items-center justify-center"
      onClick={handleChangeTheme}
    >
      {theme === "light" ? (
        <FaSun className="size-3 md:size-5" />
      ) : (
        <FaMoon className="size-3 md:size-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
