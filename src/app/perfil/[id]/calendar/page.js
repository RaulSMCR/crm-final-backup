import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import { professionals } from '@/data/mockData';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function CalendarRedirectPage({ params }) {
  const sessionToken = cookies().get('sessionToken')?.value;
  const professionalId = params.id;
  const professional = professionals.find(p => p.id.toString() === professionalId);

  if (!professional) {
    redirect('/404');
  }

  let isAuthenticated = false;
  if (sessionToken) {
    try {
      await jwtVerify(sessionToken, JWT_SECRET);
      isAuthenticated = true;
    } catch (error) {
      // Token is invalid, treat as not authenticated
    }
  }

  if (isAuthenticated) {
    const calendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?text=Cita+con+${professional.name}&details=Cita+programada+a+través+de+nuestra+plataforma.&location=Online`;
    redirect(calendarUrl);
  } else {
    redirect(`/login?redirect=/perfil/${professionalId}/calendar`);
  }
}