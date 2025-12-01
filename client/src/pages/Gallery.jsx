import { useState } from "react";
import Lightbox from "../components/Gallery/Lightbox";
import Footer from "../components/Footer";
import Header from "../components/Header";

const images = [
  {
    id: 1,
    src: "/service-images/TD1.webp",
    alt: "Evaluación - Orientación Vocacional",
  },
  {
    id: 2,
    src: "/service-images/PO1.webp",
    alt: "Paneles Profesionales",
  },
  {
    id: 3,
    src: "/service-images/FE14.webp",
    alt: "Ferias Laborales y de Orientación Vocacional",
  },
  {
    id: 4,
    src: "/service-images/EP4.webp",
    alt: "Escuela de Padres",
  },
  {
    id: 5,
    src: "/service-images/VG10.webp",
    alt: "Visitas Guiadas a Empresas",
  },
  {
    id: 6,
    src: "/service-images/CH5.webp",
    alt: "Charlas Motivacionales a Estudiantes",
  },
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <>
    <Header/>
      <div className="w-full max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Galería de Fotos
        </h1>

        {/* Grid estilo Next.js Conf */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <button
              key={img.id}
              onClick={() => setSelected(img)}
              className="group relative overflow-hidden rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="rounded-xl w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay accesible */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  Ver foto
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        <Lightbox image={selected} onClose={() => setSelected(null)} />
      </div>
      <Footer />
    </>
  );
}
