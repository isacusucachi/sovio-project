import { useEffect } from "react";

export default function Lightbox({ image, onClose }) {
  // Cerrar con tecla ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close image"
          className="absolute -top-10 right-0 text-white text-3xl font-bold hover:scale-110 transition"
        >
          ✕
        </button>

        <img
          src={image.src}
          alt={image.alt}
          className="rounded-xl shadow-2xl w-full h-auto object-contain animate-fadeIn"
        />
      </div>
    </div>
  );
}
