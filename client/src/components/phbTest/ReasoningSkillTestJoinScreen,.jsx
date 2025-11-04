import { useEffect, useState } from "react";
import ReasoningSkillTestScreen from "./ReasoningSkillTestScreen";
import reasoningImg from "../../assets/icons8-reasoning-skill-96.png";
import TestAreaHeader from "./TestAreaHeader";
import BottonPhbTestInstruccions from "./BottonPhbTestInstruccions";

const ReasoningSkillTestJoinScreen = ({
  testAnswers,
  handleTestAnswersChange,
  startVocabularyTest,
  userId,
}) => {
  const [isReasoningTestStarted, setIsReasoningTestStarted] = useState(false);
  const initialTime = 300;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const handleReasoningTestStarted = () => {
    setIsReasoningTestStarted(true);
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    const timeLeftReasoningSkills = localStorage.getItem(
      `timeLeftReasoningSkills${userId}`
    );
    if (timeLeftReasoningSkills) setTimeLeft(timeLeftReasoningSkills);
  }, []);

  return isReasoningTestStarted ? (
    <ReasoningSkillTestScreen
      initialTime={initialTime}
      timeLeft={timeLeft}
      setTimeLeft={setTimeLeft}
      testAnswers={testAnswers}
      handleTestAnswersChange={handleTestAnswersChange}
      startVocabularyTest={startVocabularyTest}
      userId={userId}
    />
  ) : (
    <>
      <TestAreaHeader
        areaTitle={" 3: Razonamiento"}
        areaImg={reasoningImg}
        timeLeft={timeLeft}
      />
      <h3 className="text-1xl font-bold dark:text-white pt-3">INSTRUCCIONES</h3>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        En esta área, deberás realiazar tres tipos de ejercicios:
      </p>

      <h3 className="text-1xl font-bold dark:text-white pt-3">
        1. EJERCICIOS DE CLASIFICACIÓN:
      </h3>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        En estos ejercicios tu tarea consiste en encontrar la palabra que
        pertenece a una clase diferente de las demás.
      </p>
      <h3 className="text-1xl font-bold dark:text-white pt-3">Ejemplo:</h3>

      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        De estas cinco palabras, una pertenece a una clase diferente, ¿cuál es?
      </p>
      <div className="w-full flex flex-col items-center">
        <div className="bg-gray-300 w-1/3 m-3 p-2 rounded-md">a. Perú</div>
        <div className="bg-gray-300 w-1/3 m-3 p-2 rounded-md">b. Francia</div>
        <div className="bg-gray-300 w-1/3 m-3 p-2 rounded-md">c. Alemania</div>
        <div
          className="bg-gray-300 w-1/3 m-3 p-2 rounded-md"
          style={{ backgroundColor: "#1b3f89", color: "#FFFFFF" }}
        >
          d. Piura
        </div>
        <div className="bg-gray-300 w-1/3 m-3 p-2 rounded-md">e. Argentina</div>
      </div>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        En este ejercicio, la respuesta correcta es “Piura”, porque todas las
        otras palabras se refieren a países y Piura es la única que se refiere a
        una ciudad. Por tanto haré click en "d. Piura"”.
      </p>

      <h3 className="text-1xl font-bold dark:text-white pt-3">
        2. EJERCICIOS DE ANALOGÍAS:
      </h3>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        En estos ejercicios tu tarea consiste en encontrar la alternativa que
        completa la analogía presentada.
      </p>
      <h3 className="text-1xl font-bold dark:text-white pt-3">Ejemplo:</h3>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        BLANCO es a NEGRO; como CALOR es a:
      </p>
      <div className="w-full flex flex-col items-center">
        <div className="bg-gray-300 w-1/3 m-3 p-2 rounded-md">a. Helado</div>
        <div className="bg-gray-300 w-1/3 m-3 p-2 rounded-md">b. Templado</div>
        <div
          className="bg-gray-300 w-1/3 m-3 p-2 rounded-md"
          style={{ backgroundColor: "#1b3f89", color: "#FFFFFF" }}
        >
          c. Frío
        </div>
        <div className="bg-gray-300 w-1/3 m-3 p-2 rounded-md">d. Húmedo</div>
        <div className="bg-gray-300 w-1/3 m-3 p-2 rounded-md">e. Tibio</div>
      </div>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        En este ejercicio, la respuesta correcta es la “frío”, porque la
        relación entre blanco y negro es de opuestos; y el opuesto de “calor” es
        “frío”. Por tanto haré click en "c. frio".
      </p>

      <h3 className="text-1xl font-bold dark:text-white pt-3">
        3. EJERCICIOS DE SECUENCIA LÓGICA:
      </h3>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        En estos ejercicios tu tarea consiste en encontrar el patrón que sigue
        la secuencia en la serie de números y hallar los números faltantes.
      </p>
      <h3 className="text-1xl font-bold dark:text-white pt-3">Ejemplo:</h3>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        Escoge la alternativa que tenga los números que completan la siguiente
        serie: 3 6 9 12 .… 18 21 …. 27 30
      </p>
      <div className="w-full flex flex-col items-center">
        <div
          className="bg-gray-300 w-1/3 m-3 p-2 rounded-md"
          style={{ backgroundColor: "#1b3f89", color: "#FFFFFF" }}
        >
          a. 15 y 24
        </div>
        <div className="bg-gray-300 w-1/3 m-3 p-2 rounded-md">b. 14 y 24</div>
        <div className="bg-gray-300 w-1/3 m-3 p-2 rounded-md">c. 16 y 25</div>
        <div className="bg-gray-300 w-1/3 m-3 p-2 rounded-md">d. 15 y 26</div>
        <div className="bg-gray-300 w-1/3 m-3 p-2 rounded-md">e. 13 y 24</div>
      </div>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        En este ejercicio, la serie avanza de tres en tres. Por lo tanto, luego
        de 12 continúa 15; de 21 continúa 24. Por lo tanto, la respuesta
        correcta es la alternativa “a)”, en donde aparecen los dos números que
        completan la serie.
      </p>
      <BottonPhbTestInstruccions
        onClick={handleReasoningTestStarted}
        initialTime={initialTime}
      />
    </>
  );
};

export default ReasoningSkillTestJoinScreen;
