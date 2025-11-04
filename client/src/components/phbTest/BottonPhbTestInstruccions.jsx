const BottonPhbTestInstruccions = ({ onClick, initialTime }) => {
  return (
    <div className="w-full text-center justify-center">
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        Si aún no queda claro qué debes hacer en esta sección, puedes
        consultarle al evaluador(a) antes de empezar, para que te guíe.
        <br />
        Recuerda que el tiempo límite es de {Math.floor(initialTime / 60)}{" "}
        minutos.
      </p>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center text-red-500 my-4">
          <div className="flex space-x-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
            <p className="font-bold text-sm sm:text-base">¡PARA AQUÍ!</p>
          </div>
          <p className="font-bold text-sm sm:text-base">
            NO INICIES HASTA QUE SE TE AVISE.
          </p>
        </div>
        <button
          className="w-1/3 mt-3 text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center justify-center dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onClick}
        >
          INICIAR
        </button>
      </div>
    </div>
  );
};
export default BottonPhbTestInstruccions;
