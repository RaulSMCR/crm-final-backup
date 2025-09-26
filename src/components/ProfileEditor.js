'use client';

import { useState } from 'react';

// Mock data to simulate fetching professional's data
const mockProfessional = {
  name: 'Dra. Ana Pérez',
  role: 'Psicóloga Clínica',
  location: 'Online',
};

export default function ProfileEditor() {
  const [name, setName] = useState(mockProfessional.name);
  const [role, setRole] = useState(mockProfessional.role);
  const [location, setLocation] = useState(mockProfessional.location);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission, e.g., send to an API
    console.log('Profile updated:', { name, role, location });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); // Hide message after 3 seconds
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 font-bold mb-2">
            Especialidad
          </label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
            Ubicación (o "Online")
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-brand-primary text-white font-bold px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Guardar Cambios
          </button>
          {isSaved && (
            <span className="text-green-600 font-semibold">
              ¡Guardado!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}