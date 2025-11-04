import React, { useState } from "react";

interface SearchInputProps {
  onSearch: (dni: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="flex items-center space-x-2" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar por DNI"
        className="px-3 py-2 border border-gray-300 rounded-lg"
        maxLength={8}
      />
      <button
        type="submit"
        className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchInput;
