import GoogleCalendarButton from '@/components/GoogleCalendarButton';
import { professionals, posts } from '@/data/mockData';

export default function ProfilePage({ params }) {
  const professional = professionals.find(p => p.id.toString() === params.id);

  if (!professional) {
    return <p>Profesional no encontrado.</p>;
  }

  const professionalPosts = posts.filter(p => p.authorId === professional.id);

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">{professional.name}</h1>
          <p className="text-xl text-brand-primary mt-2">{professional.role}</p>
          <div className="mt-6">
            <GoogleCalendarButton professional={professional} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Artículos de este profesional:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professionalPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Publicado el {new Date(post.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}