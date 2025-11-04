import { useEffect, useState } from "react";
import NumericalSkillTestScreen from "./NumericalSkillTestScreen";
import numericalImg from "../../assets/icons8-analyzing-skill-96.png";
import TestAreaHeader from "./TestAreaHeader";
import BottonPhbTestInstruccions from "./BottonPhbTestInstruccions";

const NumericalSkillTestJoinScreen = ({
  testAnswers,
  handleTestAnswersChange,
  startReasoningTest,
  userId,
}) => {
  const [isNumericalTestStarted, setIsNumericTestStarted] = useState(false);
  const initialTime = 1500;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const handleNumericalTestStarted = () => {
    setIsNumericTestStarted(true);
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    const timeLeftNumericalSkills = localStorage.getItem(
      `timeLeftNumericalSkills${userId}`
    );
    if (timeLeftNumericalSkills) setTimeLeft(timeLeftNumericalSkills);
  }, []);

  return isNumericalTestStarted ? (
    <NumericalSkillTestScreen
      initialTime={initialTime}
      timeLeft={timeLeft}
      setTimeLeft={setTimeLeft}
      testAnswers={testAnswers}
      handleTestAnswersChange={handleTestAnswersChange}
      startReasoningTest={startReasoningTest}
      userId={userId}
    />
  ) : (
    <>
      <TestAreaHeader
        areaTitle={" 2: Habilidad numérica"}
        areaImg={numericalImg}
        timeLeft={timeLeft}
      />
      <h3 className="text-1xl font-bold dark:text-white pt-3">INSTRUCCIONES</h3>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        En esta área, tu tarea consiste resolver distintos problemas
        matemáticos. Usa la hoja que se te brinda para realizar los cálculos
        necesarios. Cuando hayas encontrado la solución al problema, escribe
        sólo tu respuesta final en la casilla inferior de respuesta. Observa el
        siguiente ejemplo:
      </p>
      <h3 className="text-1xl font-bold dark:text-white pt-3">EJEMPLO:</h3>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        ¿Cuánto costará una docena y media de borradores a S/. 10 cada docena?
        <br />
        <b>Solución:</b> <br /> Si una docena cuesta S/. 10, entonces media
        docena cuesta la mitad, es decir, S/. 5; por lo tanto una docena y media
        costará S/. 10 + S/. 5. La respuesta correcta es: S/. 15.
      </p>

      <BottonPhbTestInstruccions
        onClick={handleNumericalTestStarted}
        initialTime={initialTime}
      />
    </>
  );
};

export default NumericalSkillTestJoinScreen;
