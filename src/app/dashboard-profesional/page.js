// src/app/dashboard-profesional/page.js
import PostEditor from "@/components/PostEditor";
import ProfessionalPostList from "@/components/ProfessionalPostList";
import ProfileEditor from "@/components/ProfileEditor";

export default function DashboardProfesionalPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">
            Panel del Profesional
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Gestiona tu contenido y tu perfil.
          </p>
        </div>

        {/* Sección para editar el perfil */}
        <div className="mb-12">
          <ProfileEditor />
        </div>

        {/* Sección para gestionar artículos */}
        <div className="border-t pt-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Gestionar Artículos</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Columna 1: Editor para crear nuevos posts */}
            <PostEditor />

            {/* Columna 2: Lista de posts ya enviados */}
            <ProfessionalPostList />
            </div>
        </div>
      </div>
    </div>
  );
}