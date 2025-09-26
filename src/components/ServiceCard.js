// src/components/ServiceCard.js
import Image from 'next/image';
import Link from 'next/link';

// Este componente ahora muestra una categoría de servicio, no un servicio individual.
export default function ServiceCard({ service }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48">
        <Image
          src={service.imageUrl}
          alt={`Imagen de ${service.title}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
        <p className="text-gray-700 mb-4 line-clamp-2">{service.description}</p>
        <div className="flex justify-end items-center mt-4">
          {/* El botón ahora lleva a la página de la categoría. */}
          <Link href={`/servicios/${service.id}`} className="bg-brand-primary text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-opacity-90 transition-transform transform hover:scale-105">
            Ver Profesionales
          </Link>
        </div>
      </div>
    </div>
  );
}