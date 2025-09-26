// src/components/PostNavigation.js
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function PostNavigation({ prevPost, nextPost }) {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex justify-between items-start">
        {/* Enlace al artículo anterior */}
        <div className="w-1/2 pr-4">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="group block">
              <div className="flex items-center text-gray-500 group-hover:text-brand-primary">
                <FaArrowLeft className="mr-3" />
                <span>Anterior</span>
              </div>
              <h4 className="font-semibold text-gray-800 group-hover:text-brand-primary mt-1">
                {prevPost.title}
              </h4>
            </Link>
          ) : (
            <div className="text-gray-400">
              <div className="flex items-center">
                <FaArrowLeft className="mr-3" />
                <span>No hay más artículos</span>
              </div>
            </div>
          )}
        </div>

        {/* Enlace al artículo siguiente */}
        <div className="w-1/2 pl-4 text-right">
          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className="group block">
              <div className="flex items-center justify-end text-gray-500 group-hover:text-brand-primary">
                <span>{nextPost.isSuggestion ? 'Sugerencia' : 'Siguiente'}</span>
                <FaArrowRight className="ml-3" />
              </div>
              <h4 className="font-semibold text-gray-800 group-hover:text-brand-primary mt-1">
                {nextPost.title}
              </h4>
              {nextPost.isSuggestion && (
                <p className="text-sm text-gray-500 mt-1">
                  de {nextPost.authorName}
                </p>
              )}
            </Link>
          ) : (
            <div className="text-gray-400">
              <div className="flex items-center justify-end">
                <span>No hay más artículos</span>
                <FaArrowRight className="ml-3" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}