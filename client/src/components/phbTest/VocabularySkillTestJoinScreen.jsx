import { useEffect, useState } from "react";
import VocabularySkillTestScreen from "./VocabularySkillTestScreen";
import communicationImg from "../../assets/icons8-communication-skill-96.png";
import TestAreaHeader from "./TestAreaHeader";
import BottonPhbTestInstruccions from "./BottonPhbTestInstruccions";

export default function VocabularySkillTestJoinScreen({
  testAnswers,
  handleTestAnswersChange,
  startSpatialTest,
  userId,
}) {
  const [isVocabularyTestStarted, setIsVocabularyTestStarted] = useState(false);
  const initialTime = 360;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const handleVocabularyTestStarted = () => {
    window.scrollTo({
      top: 0,
    });
    setIsVocabularyTestStarted(true);
  };

  useEffect(() => {
    const timeLeftVocabularySkills = localStorage.getItem(
      `timeLeftVocabularySkills${userId}`
    );
    if (timeLeftVocabularySkills) setTimeLeft(timeLeftVocabularySkills);
  }, []);

  return isVocabularyTestStarted ? (
    <VocabularySkillTestScreen
      initialTime={initialTime}
      timeLeft={timeLeft}
      setTimeLeft={setTimeLeft}
      testAnswers={testAnswers}
      handleTestAnswersChange={handleTestAnswersChange}
      startSpatialTest={startSpatialTest}
      userId={userId}
    />
  ) : (
    <>
      <TestAreaHeader
        areaTitle={" 4: Vocabulario"}
        areaImg={communicationImg}
        timeLeft={timeLeft}
      />
      <h3 className="text-1xl font-bold dark:text-white pt-3">INSTRUCCIONES</h3>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        En esta área tu tarea consiste en leer la palabra ubicada en la parte
        superior que está en mayúsculas y encontrar cuál de las cuatro
        alternativas que siguen en la parte inferior es la que significa lo
        mismo
      </p>
      <h3 className="text-1xl font-bold dark:text-white pt-3">EJEMPLO:</h3>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        <br />
        <b>ASISTIR</b>
      </p>
      <div className="w-full flex flex-col items-center">
        <div className="bg-gray-300 w-1/3 m-3 p-2 rounded-md">a. Agregar</div>
        <div
          className="bg-gray-300 w-1/3 m-3 p-2 rounded-md"
          style={{ backgroundColor: "#1b3f89", color: "#FFFFFF" }}
        >
          b. Concurrir
        </div>
        <div className="bg-gray-300 w-1/3 m-3 p-2 rounded-md">c. Vigilar</div>
        <div className="bg-gray-300 w-1/3 m-3 p-2 rounded-md">d. Consentir</div>
      </div>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        En este ejercicio, la respuesta correcta es “Concurrir”, porque
        significa lo mismo que ASISTIR.
      </p>
      <BottonPhbTestInstruccions
        onClick={handleVocabularyTestStarted}
        initialTime={initialTime}
      />
    </>
  );
}
