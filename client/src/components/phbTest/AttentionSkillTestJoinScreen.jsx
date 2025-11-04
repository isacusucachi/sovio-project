import { useEffect, useState } from "react";
import AttentionSkillTestScreen from "./AttentionSkillTestScreen";
import attentionImg from "../../assets/icons8-attentiveness-96.png";
import TestAreaHeader from "./TestAreaHeader";
import BottonPhbTestInstruccions from "./BottonPhbTestInstruccions";

const AttentionSkillTestJoinScreen = ({
  testAnswers,
  handleTestAnswersChange,
  startNumericalTest,
  userId,
}) => {
  const [isAttentionTestStarted, setIsAttentionTestStarted] = useState(false);
  const initialTime = 720;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const handleAttentionTestStarted = () => {
    setIsAttentionTestStarted(true);
    window.scrollTo({
      top: 0,
    });
  };
  useEffect(() => {
    const timeLeftAttentionSkills = localStorage.getItem(
      `timeLeftAttentionSkills${userId}`
    );
    if (timeLeftAttentionSkills) setTimeLeft(timeLeftAttentionSkills);
  }, []);
  return isAttentionTestStarted ? (
    <AttentionSkillTestScreen
      initialTime={initialTime}
      timeLeft={timeLeft}
      setTimeLeft={setTimeLeft}
      testAnswers={testAnswers}
      handleTestAnswersChange={handleTestAnswersChange}
      startNumericalTest={startNumericalTest}
      userId={userId}
    />
  ) : (
    <>
      <TestAreaHeader
        areaTitle={" 1: Atención"}
        areaImg={attentionImg}
        timeLeft={timeLeft}
      />

      <div className="space-y-2 mt-4">
        <h3 className="text-xl font-bold dark:text-white">INSTRUCCIONES</h3>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
          En los ejercicios de esta área encontraras una lista de números, en la
          que se puede encontrar varios pares de números juntos que <b>suman</b>{" "}
          diez (10). Los números tienen que estar juntos, uno al lado del otro.
          Tu tarea consiste en encontrar cuántos pares de números juntos que
          suman 10 hay en cada ejercicio. Encuentra cada par y luego cuenta
          cuántos pares has encontrado y escribe esa cantidad en la casilla
          inferior de respuesta.
          <br />
          En el ejemplo podrás ver cómo tienes que resolver este tipo de
          ejercicio:
          <br />
        </p>
      </div>
      <div className="bg-gray-300 dark:bg-gray-900 p-4 rounded-md my-4">
        <h3 className="text-1xl font-bold dark:text-white pt-3">EJEMPLO:</h3>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
          Lista de números
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {[2, 7, 5, 5, 4, 3, 1, 2, 8, 6, 8, 5, 9, 1, 3, 3].map(
            (num, index) => (
              <span
                key={index}
                className={`w-8 h-8 flex items-center justify-center rounded-md ${
                  [2, 3, 7, 8, 12, 13].includes(index)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {num}
              </span>
            )
          )}
        </div>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
          <b className="dark:text-white text-black">Solución:</b> <br /> En este
          ejemplo, hay <b>3 pares</b> de números juntos que suman diez (10), por
          lo tanto, la respuesta correcta es 3. Este resultado se debe escribir
          en la casilla de la inferior del ejercicio.
        </p>
      </div>
      <div className="bg-red-100 p-4 rounded-md my-4 text-gray-900">
        <div className="text-3xl font-bold pt-3 flex text-red-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8"
          >
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path
              fillRule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
              clipRule="evenodd"
            />
          </svg>
          J
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8"
          >
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path
              fillRule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-lg font-normal lg:text-xl text-justify">
          Lista de números en varias filas
        </p>
        <div className="flex flex-wrap gap-1 mb-4 w-[300px]">
          {[2, 7, 5, 5, 4, 3, 1, 2, 8, 6, 8, 5, 9, 1, 3, 3].map(
            (num, index) => (
              <span
                key={index}
                className={`w-8 h-8 flex items-center justify-center rounded-md ${
                  [2, 3, 12, 13].includes(index)
                    ? "bg-blue-500 text-white"
                    : [7, 8].includes(index)
                    ? "bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {num}
              </span>
            )
          )}
        </div>

        <p className="text-lg font-normal lg:text-xl text-justify">
          <b className="text-red-500">Solución:</b> <br /> En este ejemplo, la
          lista de numeros esta en 2 filas donde
          <b> 3 pares</b> de números juntos que suman diez (10), Si encuentras
          listas con varias filas, recuerda que{" "}
          <b className="text-red-500">
            el último número de una fila todavía está conectado con el primer
            número de la fila siguiente
          </b>
          . En el ejemplo podemos ver que{" "}
          <b className="text-red-500">
            el ultimo de la primera fila y el primero de la segunda fila suman
            10 (2 + 8)
          </b>
          . Así, ese también es un par que suma diez (10).
        </p>
      </div>
      <BottonPhbTestInstruccions
        onClick={handleAttentionTestStarted}
        initialTime={initialTime}
      />
    </>
  );
};

export default AttentionSkillTestJoinScreen;
