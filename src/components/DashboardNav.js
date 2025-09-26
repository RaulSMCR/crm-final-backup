import Link from 'next/link';

export default function DashboardNav() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Link href="/servicios" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
        <h2 className="text-xl font-bold text-brand-primary mb-2">Ver Profesionales y Servicios</h2>
        <p className="text-gray-600">Explora nuestro catálogo de especialistas y agenda una nueva cita.</p>
      </Link>
      <Link href="/blog" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
        <h2 className="text-xl font-bold text-brand-primary mb-2">Leer Artículos</h2>
        <p className="text-gray-600">Encuentra recursos e información valiosa en nuestro blog.</p>
      </Link>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Tus Próximas Citas</h2>
        <p className="text-gray-600">Aún no tienes citas programadas.</p>
        <div className="mt-4">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm mr-2" disabled>Reagendar</button>
          <Link href="/servicios" className="bg-brand-primary text-white px-4 py-2 rounded-md text-sm">Agendar Nueva Cita</Link>
        </div>
      </div>
    </div>
  );
}