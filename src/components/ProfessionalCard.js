'use client';
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const ProfessionalCard = ({ professional }) => {
  const { data: session } = useSession();
  const isUserLoggedIn = !!session;

  return (
    <div className="p-6 mt-12 bg-brand-background rounded-lg shadow-lg text-center">
      <h3 className="text-2xl font-bold text-brand-primary mb-2">Sobre el autor</h3>
      <p className="text-xl text-brand-text">{professional.name}</p>
      <p className="text-md text-gray-500 mb-6">{professional.specialty}</p>

      <div className="mt-4">
        {isUserLoggedIn ? (
          <Link href={`/perfil/${professional.id}/agendar`} className="px-6 py-3 text-white bg-brand-primary rounded-full hover:bg-brand-secondary transition-colors duration-300 shadow-md">
            Agendar una cita
          </Link>
        ) : (
          <Link href="/login" className="px-6 py-3 text-white bg-brand-primary rounded-full hover:bg-brand-secondary transition-colors duration-300 shadow-md">
            Agendar una cita
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfessionalCard;