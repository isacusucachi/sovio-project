import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const TermsAndConditions = () => {
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 w-full h-full relative lg:p-9 flex justify-center mt-[104px]">
        <div className="max-w-5xl dark:bg-gray-800 lg:p-10 p-8 relative bg-white  rounded-lg shadow dark:border dark:border-gray-700">
          <h1 className="font-extrabold text-4xl text-blue-700 dark:text-blue-600 text-center">
            Términos y Condiciones
          </h1>
          <ol className="space-y-1 text-gray-500 list-decimal dark:text-gray-400">
            <li className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
              Aceptación de Términos
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Al acceder y utilizar el sitio web <a>soviocusco.com</a>,
                aceptas cumplir con estos términos y condiciones de uso. Si no
                estás de acuerdo con alguno de estos términos, por favor, no
                utilices este sitio.
              </p>
            </li>
            <li className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
              Uso del Sitio
              <ol className="space-y-1 text-lg font-normal list-inside list-disc text-gray-500 lg:text-xl dark:text-gray-400">
                <li>
                  El contenido y los servicios de esta plataforma están
                  destinados exclusivamente para fines informativos y para la
                  aplicación de test vocacionales.
                </li>
                <li>
                  No está permitido utilizar este sitio de manera que infrinja
                  las leyes locales, nacionales o internacionales, ni para
                  ningún propósito ilegal o no autorizado.
                </li>
              </ol>
            </li>
            <li className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
              Propiedad Intelectual
              <ol className="space-y-1 text-lg font-normal list-inside list-disc text-gray-500 lg:text-xl dark:text-gray-400">
                <li>
                  Todo el contenido de soviocusco.com, incluyendo, pero no
                  limitado a, textos, gráficos, logotipos, imágenes y software,
                  está protegido por derechos de autor y otras leyes de
                  propiedad intelectual.
                </li>
                <li>
                  No se permite la reproducción, distribución, modificación o
                  uso del contenido sin el consentimiento expreso por escrito
                  del titular de los derechos.
                </li>
              </ol>
            </li>
            <li className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
              Privacidad
              <p className="space-y-1 text-lg font-normal list-inside list-disc text-gray-500 lg:text-xl dark:text-gray-400">
                LLa privacidad de nuestros usuarios es de suma importancia.
                Consulta nuestra{" "}
                <Link
                  to="/privacy-policy"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Política de Privacidad
                </Link>{" "}
                para obtener información detallada sobre cómo recopilamos,
                utilizamos y protegemos tu información personal.
              </p>
            </li>
            <li className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
              Enlaces a Terceros
              <p className="space-y-1 text-lg font-normal list-inside list-disc text-gray-500 lg:text-xl dark:text-gray-400">
                Este sitio web puede contener enlaces a sitios web de terceros.
                No somos responsables del contenido o las prácticas de
                privacidad de dichos sitios. Te recomendamos que revises los
                términos y condiciones de cada sitio que visites a través de
                estos enlaces.
              </p>
            </li>
            <li className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
              Responsabilidad
              <ol className="space-y-1 text-lg list-disc list-inside lg:text-xl font-semibold text-gray-900 dark:text-white">
                <li>
                  <span>Limitación de Responsabilidad: </span>
                  <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    <a>soviocusco.com</a> no garantiza que los resultados
                    obtenidos a través de nuestros test vocacionales cumplan las
                    expectativas de los usuarios. No asumimos ninguna
                    responsabilidad por decisiones académicas o profesionales
                    basadas en los resultados proporcionados por la plataforma.
                  </span>
                </li>
                <li>
                  <span>Disponibilidad del Servicio: </span>
                  <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    No garantizamos que el acceso al sitio sea ininterrumpido o
                    esté libre de errores. Tampoco somos responsables de
                    cualquier daño o pérdida derivados del uso de este sitio web
                    o de los servicios ofrecidos, ya sean directos, indirectos,
                    incidentales o consecuentes.
                  </span>
                </li>
              </ol>
            </li>
            <li className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
              Obligaciones de los Usuarios
              <ol className="space-y-1 text-lg font-normal list-inside list-disc text-gray-500 lg:text-xl dark:text-gray-400">
                <li>
                  Los usuarios se comprometen a no compartir resultados de
                  terceros obtenidos a través de los test vocacionales sin su
                  consentimiento.
                </li>
              </ol>
              <ol className="space-y-1 text-lg font-normal list-inside list-disc text-gray-500 lg:text-xl dark:text-gray-400">
                <li>
                  Está prohibido el uso de este sitio para difundir contenido
                  malicioso, acceder sin autorización a sistemas de terceros, o
                  cualquier actividad que infrinja la ley.
                </li>
              </ol>
              <ol className="space-y-1 text-lg font-normal list-inside list-disc text-gray-500 lg:text-xl dark:text-gray-400">
                <li>
                  Los usuarios deben proporcionar información veraz y precisa
                  durante el registro y la utilización de los servicios del
                  sitio.
                </li>
              </ol>
            </li>
            <li className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
              Cambios en los Términos
              <p className="space-y-1 text-lg font-normal list-inside list-disc text-gray-500 lg:text-xl dark:text-gray-400">
                Nos reservamos el derecho de modificar estos términos en
                cualquier momento. Los cambios serán efectivos tan pronto como
                se publiquen en el sitio. Se recomienda revisar periódicamente
                los términos y condiciones.
              </p>
            </li>
            <li className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
              Ley Aplicable y Jurisdicción
              <p className="space-y-1 text-lg font-normal list-inside list-disc text-gray-500 lg:text-xl dark:text-gray-400">
                Estos términos y condiciones se regirán e interpretarán de
                acuerdo con las leyes de la República del Perú. Cualquier
                disputa relacionada con estos términos estará sujeta a la
                jurisdicción exclusiva de los tribunales del departamento de
                Cusco, Perú.
              </p>
            </li>
          </ol>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default TermsAndConditions;
