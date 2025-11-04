import { useEffect, useState } from "react";
import SpatialSkillTestScreen from "./SpatialSkillTestScreen";
import vizualizationImg from "../../assets/icons8-visualization-skill-96.png";
import TestAreaHeader from "./TestAreaHeader";
import BottonPhbTestInstruccions from "./BottonPhbTestInstruccions";

export default function SpatialSkillTestJoinScreen({
  testAnswers,
  handleSpatialSkillsTestAnswersChange,
  submitPhbTest,
  loading,
  userId,
}) {
  const [isSpatialTestStarted, setIsSpatialTestStarted] = useState(false);
  const initialTime = 540;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const handleSpatialTestStarted = () => {
    setIsSpatialTestStarted(true);
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    const timeLeftSpatialSkills = localStorage.getItem(
      `timeLeftSpatialSkills${userId}`
    );
    if (timeLeftSpatialSkills) setTimeLeft(timeLeftSpatialSkills);
  }, []);

  return isSpatialTestStarted ? (
    <SpatialSkillTestScreen
      initialTime={initialTime}
      timeLeft={timeLeft}
      setTimeLeft={setTimeLeft}
      testAnswers={testAnswers}
      handleSpatialSkillsTestAnswersChange={
        handleSpatialSkillsTestAnswersChange
      }
      submitPhbTest={submitPhbTest}
      loading={loading}
      userId={userId}
    />
  ) : (
    <>
      <TestAreaHeader
        areaTitle={" 5: Habilidad espacial"}
        areaImg={vizualizationImg}
        timeLeft={timeLeft}
      />
      <h3 className="text-1xl font-bold dark:text-white pt-3">INSTRUCCIONES</h3>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        En esta área de la prueba deberás resolver tres secciones de ejercicios
        distintos. Para cada sección deberás responder o marcar las respectivas
        respuesas
      </p>
      <h3 className="text-lg font-bold dark:text-white pt-3">
        Sección I: Conteo de cubos
      </h3>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        En esta sección se te presentan sólidos divididos en cubos pequeños y tu
        tarea consiste en contar cuántos de estos cubos hay en cada sólido. Solo
        se cuentan los cubos pequeños que dividen al sólido. Tienes que contar
        todos los cubos pequeños, aun cuando no se vean totalmente. Escribe tu
        respuesta en el casillero que corresponde a esta sección en la Hoja de
        respuestas.
      </p>
      <h3 className="text-lg font-bold dark:text-white pt-3">Ejemplo:</h3>
      <div className="items-center justify-center">
        <img className="h-40" src={"./SpatialSkillImages/cubeExample.png"} />
      </div>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        En la figura del ejemplo se puede contar 8 cubos: 4 en la parte
        delantera y 4 en la parte trasera, aun cuando no todos se vean
        completamente. Por lo tanto, la respuesta correcta es 8 (ocho).
      </p>
      <h3 className="text-lg font-bold dark:text-white pt-3">
        Sección II: Papel doblado
      </h3>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        En esta sección tu tarea consiste en identificar cómo se verá el papel
        de la izquierda desdoblado (abierto) después de haberlo doblado y
        haberle hecho un orificio cuando estaba doblado. Al lado izquierdo de la
        barra se muestra los pasos que se han llevado a cabo para doblar el
        papel y en qué lugar se ha hecho el orificio. La línea punteada señala
        hacia donde se ha doblado el papel; el círculo pequeño señala en donde
        se hizo el orificio. Debajo de la barra se presentan cuatro alternativas
        de respuesta y deberás seleccionar cuál representa al papel de arriba al
        final cuando se desdobla.
      </p>
      <h3 className="text-lg font-bold dark:text-white pt-3">Ejemplo:</h3>
      <div className="items-center justify-center">
        <img
          className="h-40"
          src={"./SpatialSkillImages/foldedPaperExample.png"}
        />
      </div>
      <div className="h-2 bg-blue-700 my-5"></div>
      <div className="flex flex-wrap">
        <img
          className="h-40 mr-5"
          src={"./SpatialSkillImages/foldedPaperExampleAlternativeA.png"}
        />
        <img
          className="h-40 mr-5"
          src={"./SpatialSkillImages/foldedPaperExampleAlternativeB.png"}
        />
        <img
          className="h-40 mr-5"
          src={"./SpatialSkillImages/foldedPaperExampleAlternativeC.png"}
        />
        <img
          className="h-40 mr-5"
          src={"./SpatialSkillImages/foldedPaperExampleAlternativeD.png"}
        />
        <img
          className="h-40 mr-5"
          src={"./SpatialSkillImages/foldedPaperExampleAlternativeE.png"}
        />
      </div>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        En la primera figura de la izquierda, la línea punteada demuestra que el
        papel ha sido doblado en mitad hacia arriba; en la segunda figura se
        muestra que el orificio se hizo en la esquina inferior izquierda de ese
        papel doblado. Si este papel se desdoblara, se observaría una imagen
        como la alternativa “c)”, con dos orificios alineados en el margen
        izquierdo del papel, de tal manera que si la hoja se volviera a doblar
        en mitad hacia arriba los orificios coincidirían. Por lo tanto, la
        respuesta correcta es “c)”.
      </p>
      <h3 className="text-lg font-bold dark:text-white pt-3">
        Sección III: Armado de formas sólidas
      </h3>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        En esta sección, se muestra al lado izquierdo de la fila, una figura
        armada. Abajo aparecen otros gráficos de figuras, uno de las cuales es
        la figura de arriba desarmada. Tu tarea consiste en encontrar cuál de
        estas alternativas, cuando se arman y cierran sus partes, será la figura
        de la izquierda.
      </p>
      <h3 className="text-lg font-bold dark:text-white pt-3">Ejemplo:</h3>
      <div className="items-center justify-center">
        <img
          className="h-40"
          src={"./SpatialSkillImages/solidFormExample.png"}
        />
      </div>
      <div className="h-2 bg-blue-700 my-5"></div>
      <div className="flex flex-wrap">
        <img
          className="h-40 mr-5"
          src={"./SpatialSkillImages/solidFormExampleAlternativeA.png"}
        />
        <img
          className="h-40 mr-5"
          src={"./SpatialSkillImages/solidFormExampleAlternativeB.png"}
        />
        <img
          className="h-40 mr-5"
          src={"./SpatialSkillImages/solidFormExampleAlternativeC.png"}
        />
        <img
          className="h-40 mr-5"
          src={"./SpatialSkillImages/solidFormExampleAlternativeD.png"}
        />
      </div>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-justify">
        En este ejemplo la alternativa correcta es la “a)” porque cuenta con
        cuatro triángulos, uno de los cuales es la base y los otros tres son los
        lados de la pirámide que se observa al lado izquierdo. Las piezas de
        esta alternativa se encuentran en una posición que si se doblaran y
        cerraran sus partes, se formaría la pirámide de la izquierda.
        <br />
        Otras alternativas (“c” y “d”) podrían parecer correctas pero debes
        recordar que las figuras que se presentarán son sólidos sin lados vacios
        (deben cerrarse completamente).
        <br />
        Como habrás visto esta última parte de la prueba tiene 3 secciones. Sin
        embargo a diferencia del resto de la prueba no es necesario que te
        detengas cada vez que culminas una sección, por el contrario deber
        continuar hasta desarrollar las 3 secciones.
      </p>
      <BottonPhbTestInstruccions
        onClick={handleSpatialTestStarted}
        initialTime={initialTime}
      />
    </>
  );
}
