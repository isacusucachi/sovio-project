import Footer from "../components/Footer";
import Header from "../components/Header";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header/>
      <section class="py-8 bg-white lg:py-24 dark:bg-gray-900">
        <div class="max-w-4xl px-4 mx-auto lg:px-4 format dark:format-invert">
          <h1 class="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl dark:text-white">
            Políticas de Privacidad
          </h1>
          <p class="mb-10 text-lg text-gray-600 dark:text-gray-400 lg:text-lg">
            Lea las políticas de privacidad. Si tiene alguna pregunta, por favor
            <a
              class="mx-2 font-normal text-blue-600 no-underline dark:text-blue-400 hover:underline"
              href="https://www.gob.pe/institucion/regioncusco-grtpe/contacto-y-numeros-de-emergencias"
              target="_blank"
              rel="noreferrer"
            >
              contactanos
            </a>
            y le ayudaremos tan pronto como podamos.
          </p>
          <hr class="my-12 border-gray-200 dark:border-gray-800" />
          <ol className="space-y-5 text-gray-500 list-decimal list-inside dark:text-gray-400">
            <li className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
              Información Recopilada
              <ol className="space-y-1 text-lg list-disc list-inside lg:text-xl font-semibold text-gray-900 dark:text-white">
                <li>
                  <span>Información Personal: </span>
                  <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    Podemos recopilar información personal, como nombres,
                    direcciones de correo electrónico y cualquier otra
                    información identificable, cuando los usuarios nos la
                    proporcionan voluntariamente al registrarse o al completar
                    formularios. Esto incluye información de menores de edad,
                    proporcionada con el consentimiento de sus padres o tutores
                    legales.
                  </span>
                </li>
                <li>
                  <span>Información No Personal: </span>
                  <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    También podemos recopilar información no personal, como
                    datos demográficos, patrones de uso del sitio web y otra
                    información estadística, con el fin de mejorar nuestros
                    servicios y optimizar la experiencia del usuario.
                  </span>
                </li>
              </ol>
            </li>
            <li className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
              Uso de la Información
              <ol className="space-y-1 list-disc list-inside text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                <li>
                  La información recopilada se utiliza para proporcionar los
                  resultados de las orientaciones vocacionales y otros servicios
                  relacionados.
                </li>
                <li>
                  No compartiremos, venderemos ni alquilaremos su información
                  personal a terceros sin su consentimiento, excepto cuando sea
                  requerido por la ley.
                </li>
              </ol>
            </li>
            <li className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
              Información de Menores de Edad
              <ol className="space-y-1 list-disc list-inside text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                <li>
                  En <b>soviocusco.com</b>, reconocemos la importancia de
                  proteger la privacidad de los menores de edad. Requerimos que
                  cualquier información personal de menores sea proporcionada
                  con el consentimiento de un padre, madre o tutor legal. Si
                  detectamos que hemos recopilado información personal de un
                  menor sin el debido consentimiento, tomaremos las medidas
                  necesarias para eliminar dicha información de nuestros
                  registros.
                </li>
              </ol>
            </li>
            <li className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
              Seguridad
              <ol className="space-y-1 list-disc list-inside text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                <li>
                  Implementamos medidas de seguridad razonables para proteger su
                  información contra accesos no autorizados, divulgación o
                  destrucción. Sin embargo, ninguna medida de seguridad es
                  completamente infalible.
                </li>
              </ol>
            </li>
            <li className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
              Cookies
              <ol className="space-y-1 list-disc list-inside text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                <li>
                  Utilizamos cookies únicamente con fines de autenticación de
                  los usuarios registrados. Estas cookies son esenciales para
                  garantizar el acceso seguro y personalizado a su cuenta.
                </li>
              </ol>
            </li>
            <li className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
              Enlaces a Sitios de Terceros
              <ol className="space-y-1 list-disc list-inside text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                <li>
                  Nuestro sitio web puede contener enlaces a sitios web de
                  terceros. No somos responsables de las prácticas de privacidad
                  o el contenido de dichos sitios. Le recomendamos que revise
                  las políticas de privacidad de esos sitios antes de
                  proporcionarles información personal.
                </li>
              </ol>
            </li>
            <li className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
              Cambios en la Política de Privacidad
              <ol className="space-y-1 list-disc list-inside text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                <li>
                  Nos reservamos el derecho de modificar esta política de
                  privacidad en cualquier momento. Los cambios entrarán en vigor
                  desde el momento de su publicación en nuestro sitio web. Le
                  recomendamos revisar esta política periódicamente para
                  mantenerse informado.
                </li>
              </ol>
            </li>
            <li className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
              Consentimiento
              <ol className="space-y-1 list-disc list-inside text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                <li>
                  Al utilizar nuestro sitio, usted consiente nuestra política de
                  privacidad.
                </li>
              </ol>
            </li>
            <li className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
              Preguntas y Contacto
              <ol className="space-y-1 list-disc list-inside text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                <li>
                  Si tiene alguna pregunta o inquietud sobre esta política de
                  privacidad, puede ponerse en contacto con nosotros en{" "}
                  <a
                    className="text-blue-700 dark:text-blue-600 hover:underline"
                    href="mailto:soviogrtpecusco@gmail.com"
                  >
                    soviogrtpecusco@gmail.com
                  </a>
                  .
                </li>
              </ol>
            </li>
          </ol>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default PrivacyPolicy;
