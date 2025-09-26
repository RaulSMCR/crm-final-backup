// src/app/layout.js
import './globals.css'; // <-- ESTA LÍNEA ES LA MÁS IMPORTANTE
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';

export const metadata = {
  title: 'Salud Mental Costa Rica',
  description: 'Profesionales al servicio de tu bienestar',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen bg-brand-background text-brand-dark">
        <SessionProviderWrapper>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  )
}