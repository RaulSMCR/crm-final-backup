// src/app/servicios/page.js
import ServiceCard from "@/components/ServiceCard";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtiene categorías de servicios únicas de la base de datos.
async function getServiceCategories() {
  const categories = await prisma.service.findMany({
    // Usa 'distinct' para obtener una entrada por cada 'title' único.
    distinct: ['title'],
    select: {
      id: true, // ID del primer servicio de la categoría, para el enlace.
      title: true,
      description: true,
      imageUrl: true,
    },
    orderBy: {
      title: 'asc', // Ordena las categorías alfabéticamente.
    },
  });
  return categories;
}

// La página de servicios ahora muestra categorías.
export default async function ServiciosPage() {
  // Obtiene las categorías de servicios de la base de datos.
  const categories = await getServiceCategories();

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Nuestros Servicios
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            // Pasa los datos de la categoría a la tarjeta.
            // La prop 'service' ahora contiene la información de la categoría.
            <ServiceCard 
              key={category.id}
              service={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}