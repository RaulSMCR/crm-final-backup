// src/app/servicios/[id]/page.js
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import ProfessionalCard from '@/components/ProfessionalCard';

const prisma = new PrismaClient();

// Obtiene los profesionales que ofrecen un servicio de una categoría específica.
async function getProfessionalsByCategory(serviceId) {
  // 1. Encuentra el servicio original para obtener el título de la categoría.
  const serviceCategory = await prisma.service.findUnique({
    where: { id: parseInt(serviceId, 10) },
  });

  if (!serviceCategory) {
    return { category: null, professionals: [] };
  }

  // 2. Busca todos los servicios con el mismo título (la categoría).
  const servicesInCategory = await prisma.service.findMany({
    where: { title: serviceCategory.title },
    include: {
      professional: true, // Incluye los datos del profesional asociado.
    },
  });

  // 3. Extrae solo los datos de los profesionales.
  const professionals = servicesInCategory.map(s => s.professional);

  return { category: serviceCategory, professionals };
}

export default async function ServiceProfessionalsPage({ params }) {
  const { category, professionals } = await getProfessionalsByCategory(params.id);

  if (!category) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold">Categoría de servicio no encontrada</h1>
        <Link href="/servicios" className="text-brand-primary mt-4 inline-block">
          Volver a la lista de servicios
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Profesionales en {category.title}
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          {category.description}
        </p>

        {professionals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professionals.map((prof) => (
              <ProfessionalCard key={prof.id} professional={prof} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>No hay profesionales disponibles para esta categoría en este momento.</p>
            <Link href="/servicios" className="text-brand-primary mt-4 inline-block">
              Explorar otras categorías
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}