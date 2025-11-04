import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  LuGraduationCap,
  LuBuilding,
  LuBookOpen,
  LuBriefcase,
  LuArrowRight,
  LuChevronRight,
} from "react-icons/lu";
import Footer from "../components/Footer";
const cards = [
  {
    title: "Apoyo vocacional",
    icon: LuBriefcase,
    href: "https://micarrera.trabajo.gob.pe/apoyo-vocacional/",
    color: "from-green-500 to-green-600",
    description: "Recibe orientación personalizada para tu futuro profesional.",
  },
  {
    title: "Carreras profesionales",
    icon: LuGraduationCap,
    href: "https://micarrera.trabajo.gob.pe/carreras-profesionales/",
    color: "from-red-500 to-red-600",
    description:
      "Explora diversas opciones de carreras y encuentra tu vocación.",
  },
  {
    title: "Universidades e Institutos",
    icon: LuBuilding,
    href: "https://micarrera.trabajo.gob.pe/universidades-e-institutos/",
    color: "from-blue-500 to-blue-600",
    description: "Conoce las mejores instituciones educativas del país.",
  },

  {
    title: "Becas y créditos",
    icon: LuBookOpen,
    href: "https://micarrera.trabajo.gob.pe/financiamiento-y-becas/",
    color: "from-yellow-500 to-yellow-600 ",
    description: "Descubre oportunidades de financiamiento para tus estudios.",
  },
];
const MiCarrera = () => {
  const [activeCard, setActiveCard] = useState(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, []);

  return (
    <>
      <div className="bg-gradient-to-br from-white to-gray-200 dark:from-slate-900 dark:to-slate-800 min-h-screen flex flex-col items-center justify-center p-8 dark:text-white">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-6">
            Descubre Tu Futuro con
          </h1>
          <motion.img
            src="/logo-micarrera.png"
            alt="MiCarrera Logo"
            className="mx-auto mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
          <div className="text-xl max-w-5xl mx-auto leading-relaxed">
            <p className="mb-4">
              Una plataforma digital auspiciada por el <b>Ministerio de Trabajo y
              Promoción del Empleo</b>, creada especialmente para jóvenes que están
              por salir del colegio, o que ya culminaron la educación básica
              pero aún no deciden qué estudiar. Para ellos, “Mi carrera” pone a
              disposición información actualizada y amigable sobre: Además,
              contiene un Test Vocacional para identificar las carreras afines a
              tu perfil vocacional; recomendaciones para gestionar adecuadamente
              las trayectorias formativas y laborales; y una orientación
              personalizada a través del Servicio de Orientación Vocacional e
              Información Ocupacional (SOVIO), el que se brinda en todas las
              regiones del país.
            </p>
            <ul className="list-decimal pl-8 mb-4">
              <li>
                <b>Carreras profesionales:</b> contiene un listado de carreras
                universitarias y técnicas con información específica, como años
                de estudio, remuneraciones salariales promedio, planes de
                estudio, demanda laboral, entre otros.
              </li>
              <li>
                <b>Universidades e institutos</b> reconocidas por la Sunedu y
                localizadas por región y tipo de gestión (pública o privada).
              </li>
              <li>
                <b>Becas y créditos educativos</b> de diversas instituciones, a
                fin de que las y los jóvenes logren culminar sus trayectorias
                formativas.
              </li>
            </ul>
            <p className="mb-4">
              Además, contiene un Test Vocacional para identificar las carreras
              afines a tu perfil vocacional; recomendaciones para gestionar
              adecuadamente las trayectorias formativas y laborales; y una
              orientación personalizada a través del Servicio de Orientación
              Vocacional e Información Ocupacional (SOVIO), el que se brinda en
              todas las regiones del país.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 w-full max-w-6xl">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${card.color} rounded-xl p-6 cursor-pointer shadow-lg`}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setActiveCard(index)}
              onHoverEnd={() => setActiveCard(null)}
            >
              <card.icon className="text-white mb-4 h-12 w-12" />
              <h3 className="text-white text-2xl font-semibold mb-2">
                {card.title}
              </h3>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0,
                  height: activeCard === index ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-white text-sm mb-4">{card.description}</p>
                <motion.a
                  className="bg-white text-slate-800 px-4 py-2 rounded-full flex items-center text-sm font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={card.href}
                  target="_blank"
                >
                  Explorar <LuArrowRight className="ml-2 h-4 w-4" />
                </motion.a>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xl font-bold py-4 px-8 rounded-full flex items-center shadow-lg"
            href="https://micarrera.trabajo.gob.pe/"
            target="_blank"
          >
            Comienza Tu Viaje
            <LuChevronRight className="ml-2 h-6 w-6" />
          </motion.a>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default MiCarrera;
