// src/app/perfil/[id]/page.js
import Link from 'next/link';
import { professionals, posts } from '@/data/mockData';

export default function ProfilePage({ params }) {
  const professional = professionals.find(p => p.id.toString() === params.id);

  if (!professional) {
    // ... (código de "no encontrado" sigue igual)
  }

  const professionalPosts = posts.filter(p => p.authorId === professional.id);

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">{professional.name}</h1>
          <p className="text-xl text-brand-primary mt-2">{professional.role}</p>
          <div className="mt-4 flex items-center justify-center text-gray-600">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{professional.location}</span>
          </div>
          {/* BOTÓN AÑADIDO */}
          <div className="mt-6">
            <Link href="/servicios" className="bg-brand-primary text-white font-bold px-8 py-3 rounded-md text-lg hover:bg-opacity-90">
              Agendar Cita con este Profesional
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Artículos de este profesional:</h2>
          {/* ... (la lista de artículos sigue igual) ... */}
        </div>
      </div>
    </div>
  );
}