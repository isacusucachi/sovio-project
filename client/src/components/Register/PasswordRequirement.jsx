import { FaCheckCircle, FaTimes } from "react-icons/fa";

export const PasswordRequirement = ({ text, valid }) => {
  return (
    <div className="flex items-center gap-2">
      {valid ? (
        <FaCheckCircle className="text-green-500" />
      ) : (
        <FaTimes className="text-gray-400" />
      )}
      <span className={"text-gray-500"}>
        {text}
      </span>
    </div>
  );
}
