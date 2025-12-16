import { useState, useEffect, useCallback, useRef } from "react";
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

// ============================================
// LIGHTBOX - DISEÑO ANTERIOR + COLORES FLOWBITE
// ============================================
function EnhancedLightbox({ image, images, onClose, onNavigate }) {
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const dialogRef = useRef(null);

  const currentIndex = images.findIndex((img) => img.id === image?.id);
  const hasNext = currentIndex < images.length - 1;
  const hasPrev = currentIndex > 0;

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && hasNext) onNavigate(images[currentIndex + 1]);
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(images[currentIndex - 1]);
    },
    [onClose, onNavigate, hasNext, hasPrev, currentIndex, images]
  );

  useEffect(() => {
    if (image) {
      setIsLoading(true);
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      dialogRef.current?.focus();
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [image, handleKeyDown]);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && hasNext) onNavigate(images[currentIndex + 1]);
      if (diff < 0 && hasPrev) onNavigate(images[currentIndex - 1]);
    }
    setTouchStart(null);
  };

  if (!image) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Imagen: ${image.alt}`}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      {/* Backdrop con blur */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

      {/* Contenido principal */}
      <div
        className="relative z-10 flex flex-col items-center max-w-6xl mx-4"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: "scaleIn 0.3s ease-out",
        }}
      >
        {/* Indicador de posición (dots) */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(images[idx])}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-blue-500 w-6"
                  : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Ir a imagen ${idx + 1}`}
            />
          ))}
        </div>

        {/* Contador textual */}
        <span className="absolute -top-12 right-0 text-white/60 text-sm font-mono">
          {currentIndex + 1} / {images.length}
        </span>

        {/* Imagen con estado de carga */}
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div role="status">
                <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Cargando...</span>
              </div>
            </div>
          )}
          <img
            src={image.src}
            alt={image.alt}
            onLoad={() => setIsLoading(false)}
            className={`max-h-[75vh] max-w-full rounded-lg shadow-2xl transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>

        {/* Descripción */}
        <div className="mt-6 text-center">
          <p className="text-white text-lg font-medium max-w-md">{image.alt}</p>
        </div>

        {/* Botones de navegación - Estilo Flowbite */}
        {hasPrev && (
          <button
            onClick={() => onNavigate(images[currentIndex - 1])}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            aria-label="Imagen anterior"
          >
            <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
          </button>
        )}
        {hasNext && (
          <button
            onClick={() => onNavigate(images[currentIndex + 1])}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            aria-label="Siguiente imagen"
          >
            <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </button>
        )}

        {/* Instrucciones de teclado */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-6 text-white/40 text-xs">
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">←</kbd>
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">→</kbd>
            navegar
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">ESC</kbd>
            cerrar
          </span>
        </div>
      </div>

      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:rotate-90 focus:ring-4 focus:ring-blue-300 focus:outline-none"
        aria-label="Cerrar galería"
      >
        <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// ============================================
// TARJETA DE IMAGEN - COLORES FLOWBITE
// ============================================
function ImageCard({ image, index, onClick, isInView }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <button
      onClick={onClick}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="group relative overflow-hidden rounded-lg focus:outline-none text-left w-full"
      aria-label={`Ver imagen: ${image.alt}`}
      style={{
        animation: isInView ? `slideUp 0.6s ease-out ${index * 0.1}s both` : "none",
      }}
    >
      {/* Indicador de foco - Color Flowbite */}
      <div
        className={`absolute inset-0 rounded-lg transition-all duration-300 pointer-events-none z-20 ${
          isFocused ? "ring-4 ring-blue-300 dark:ring-blue-800" : ""
        }`}
      />

      {/* Imagen con lazy loading */}
      <div className="relative aspect-[4/3] bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-lg">
        {/* Skeleton loader */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
            </svg>
          </div>
        )}

        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } group-hover:scale-110 group-focus:scale-110`}
        />

        {/* Overlay con affordance */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300" />

        {/* Icono de acción */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-blue-600/80 backdrop-blur-sm flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 11V5m-2 3h4"/>
            </svg>
          </div>
        </div>

        {/* Información de la imagen */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm font-medium line-clamp-2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
            {image.alt}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </button>
  );
}

// ============================================
// GALERÍA PRINCIPAL - ESTILO FLOWBITE
// ============================================
export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const galleryRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (galleryRef.current) observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />

      <div className="w-full max-w-7xl mx-auto px-4 py-10">
        {/* Título */}
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Galería de Fotos
        </h1>
        <p className="mb-10 text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-xl">
          Explora nuestra colección de actividades y eventos.
        </p>

        {/* Grid de galería */}
        <div
          ref={galleryRef}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Galería de imágenes"
        >
          {images.map((img, idx) => (
            <ImageCard
              key={img.id}
              image={img}
              index={idx}
              onClick={() => setSelected(img)}
              isInView={isInView}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <EnhancedLightbox
        image={selected}
        images={images}
        onClose={() => setSelected(null)}
        onNavigate={setSelected}
      />

      <Footer />
    </>
  );
}