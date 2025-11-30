import React from "react";

const Footer = () => {
  // Configuración dinámica del footer
  const footerConfig = {
    logo: {
      dark: "./Logo GORE_Nuevo_negativo_vertical.png",
      light: "./Logo GORE_Nuevo_positivo_vertical.png",
      alt: "Logo GORE Cusco",
      title: "GERENCIA REGIONAL DE TRABAJO Y PROMOCIÓN DEL EMPLEO CUSCO",
    },
    sections: [
      {
        title: "ENLACES EXTERNOS",
        links: [
          { name: "GRTPE Cusco", url: "https://www.gob.pe/regioncusco-grtpe" },
          { name: "Mi Carrera", url: "https://micarrera.trabajo.gob.pe" },
          { name: "Test Elige", url: "https://testvocacional.trabajo.gob.pe/" },
        ],
      },
      {
        title: "NOSOTROS",
        links: [
          { name: "Servicios", url: "/services" },
          { name: "Galería", url: "/gallery" },
          { name: "Preguntas Frecuentes", url: "/faq" },
        ],
      },
      {
        title: "LEGAL",
        links: [
          { name: "Políticas de Privacidad", url: "/privacy-policy" },
          { name: "Términos y Condiciones", url: "/terms-and-conditions" },
        ],
      },
    ],
    socialMedia: [
      {
        name: "Facebook",
        url: "https://www.facebook.com/trabajocusco",
        icon: (
          <path
            fillRule="evenodd"
            d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
            clipRule="evenodd"
          />
        ),
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/grtpecusco",
        icon: (
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        ),
      },
      {
        name: "Twitter",
        url: "https://twitter.com/GrtpeCusco",
        icon: (
          <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
        ),
      },
    ],
    copyright: {
      year: new Date().getFullYear(),
      name: "GRTPE-CUSCO",
      url: "https://www.gob.pe/regioncusco-grtpe",
      text: "Todos los derechos reservados.",
    },
  };

  return (
    <footer className="bg-white dark:bg-[#0B1120]">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          {/* Logo Section */}
          <div className="mb-6 md:mb-0">
            <a
              href="/"
              className="flex flex-col items-center justify-center space-y-2 md:space-y-4"
            >
              <img
                src={footerConfig.logo.dark}
                className="h-20 w-auto hidden dark:block"
                alt={footerConfig.logo.alt}
              />
              <img
                src={footerConfig.logo.light}
                className="h-20 w-auto block dark:hidden"
                alt={footerConfig.logo.alt}
              />
              <span className="font-arima text-[6px] md:text-[8px] font-extrabold text-center text-gray-900 dark:text-white">
                {footerConfig.logo.title.split(" Y ")[0]}
                <br />Y {footerConfig.logo.title.split(" Y ")[1]}
              </span>
            </a>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {footerConfig.sections.map((section, index) => (
              <div key={index}>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 dark:text-white uppercase">
                  {section.title}
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  {section.links.map((link, linkIndex) => (
                    <li
                      key={linkIndex}
                      className={linkIndex < section.links.length - 1 ? "mb-4" : ""}
                    >
                      <a href={link.url} className="hover:underline">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />

        {/* Bottom Section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © {footerConfig.copyright.year}{" "}
            <a
              href={footerConfig.copyright.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {footerConfig.copyright.name}
            </a>
            . {footerConfig.copyright.text}
          </span>

          {/* Social Media Links */}
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            {footerConfig.socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className={`text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white ${
                  index > 0 ? "ms-5" : ""
                }`}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {social.icon}
                </svg>
                <span className="sr-only">{social.name} page</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;