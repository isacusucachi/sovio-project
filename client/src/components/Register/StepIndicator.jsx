import { FaCheck } from "react-icons/fa6";

const StepIndicator = ({ step, currentStep, isLast }) => {
  const isActive = currentStep >= step.number;
  const isCompleted = currentStep > step.number;

  const Icon = step.icon;

  return (
    <li
      className={`flex items-center ${
        !isLast
          ? `w-full after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block ${
              isActive
                ? "after:border-blue-100 dark:after:border-blue-800"
                : "after:border-gray-100 dark:after:border-gray-700"
            }`
          : "last:after:content-none"
      }`}
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 transition-colors ${
          isActive
            ? "bg-blue-100 dark:bg-blue-800"
            : "bg-gray-100 dark:bg-gray-700"
        }`}
      >
        {isCompleted ? (
          <FaCheck className="w-4 h-4 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
        ) : (
          <Icon
            className={`w-4 h-4 lg:w-6 lg:h-6 ${
              isActive
                ? "text-blue-600 dark:text-blue-300"
                : "text-gray-500 dark:text-gray-100"
            }`}
          />
        )}
      </div>
    </li>
  );
};
export default StepIndicator;
