// Placeholder for ProfessionalCard component
export default function ProfessionalCard({ professional }) {
  return (
    <div className="p-4 my-8 border border-gray-200 rounded-lg shadow-md bg-gray-50">
      <h3 className="text-xl font-bold text-gray-800">{professional.name}</h3>
      <p className="text-gray-600">{professional.specialty}</p>
      <p className="mt-2 text-sm text-gray-700">{professional.bio}</p>
    </div>
  );
}