import Card from "../../components/ui/Card";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <section
      className="p-9 lg:px-20 lg:pb-24 w-full h-full shadow-xl overflow-hidden flex flex-col justify-center items-center"
      id="services"
    >
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
      >
        <div className="mb-14">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-2 text-center uppercase font-arima">
            Nuestros Servicios
          </h2>
          <div className="w-full flex justify-center">
            <div className="w-28 h-2 bg-red-gore-3 rounded-full"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 lg:px-5 xl:px-40">
          <Card
            title={"Evaluación - Orientación Vocacional"}
            image={"/service-images/TD1.webp"}
            description={
              "El servicio dispone de herramientas pedagógicas e instrumentos psicológicos para desarrollar un proceso integral, puntual y especializado en la identificación de las preferencias profesionales y características personales, orientando de mejor manera a la forma de decisiones, informada y responsable de una carrera profesional, técnica u ocupacional."
            }
            alt={"Evaluación - Orientación Vocacional"}
          />
          <Card
            title={"Paneles Profesionales"}
            image={"/service-images/PO1.webp"}
            description={
              "Son espacios donde se comparten temas de interés vinculados a la vocación, las carreras profesionales, la situación de las ocupaciones en el mercado de trabajo, a través de entrevistas a profesionales y técnicos de la región."
            }
            alt={"Paneles Profesionales"}
          />
          <Card
            title={"Ferias Laborales y de Orientación Vocacional"}
            image={"/service-images/FE14.webp"}
            description={
              "Eventos donde se comparten temas de interés vinculados a la vocación, las carreras profesionales, la situación de las ocupaciones en el mercado de trabajo, consejos para elegir una carrera profesional exitosa, entre otras. Contamos con la participación de instituciones académicas públicas y privadas que dan información de primera mano."
            }
            alt={"Ferias Laborales y de Orientación Vocacional"}
          />
          <Card
            title={"Escuela de Padres"}
            image={"/service-images/EP4.webp"}
            description={
              "EI Servicio de Orientación Vocacional e Información Ocupacional ofrece el acompañamiento y apoyo con diversas estrategias y recursos al mejor desarrollo de las 'Escuelas de Padres' y puedan comprender diferentes aspectos relacionados con su crecimiento, maduración socialización durante las etapas de su niñez y adolescencia."
            }
            alt={"Escuela de Padres"}
          />
          <Card
            title={"Visitas Guiadas a Empresas"}
            image={"/service-images/VG10.webp"}
            description={
              "Brindamos la oportunidad de conocer de cerca el desarrollo de una ocupación a través de visitas a empresas representativas de las actividades económicas y productivas que destacan en la región Cusco."
            }
            alt={"Visitas Guiadas a Empresas"}
          />
          <Card
            title={"Charlas Motivacionales a Estudiantes"}
            image={"/service-images/CH5.webp"}
            description={
              "Con el objetivo de mantener o impulsar la conducta positiva de los estudiantes ante el proceso de aprendizaje; así como desarrollar sus capacidades, superar sus limitaciones y plantearse objetivos claros en cuanto a su desarrollo personal, estudiantil y en el futuro sus proyectos profesionales."
            }
            alt={"Charlas Motivacionales a Estudiantes"}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Services;
