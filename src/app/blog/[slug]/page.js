// src/app/blog/[slug]/page.js
import Image from 'next/image';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import PostNavigation from '../../../components/PostNavigation';

const prisma = new PrismaClient();

// Función que busca un solo artículo en la BD por su 'slug'
async function getPost(slug) {
  const post = await prisma.post.findUnique({
    where: { slug: slug, status: 'PUBLISHED' },
    include: { author: true }, // También trae los datos del autor
  });

  if (!post) {
    return { post: null, prevPost: null, nextPost: null };
  }

  // Buscar artículo anterior del mismo autor
  const prevPost = await prisma.post.findFirst({
    where: {
      authorId: post.authorId,
      createdAt: { lt: post.createdAt },
      status: 'PUBLISHED',
    },
    orderBy: { createdAt: 'desc' },
    select: { slug: true, title: true },
  });

  // Buscar artículo siguiente del mismo autor
  let nextPost = await prisma.post.findFirst({
    where: {
      authorId: post.authorId,
      createdAt: { gt: post.createdAt },
      status: 'PUBLISHED',
    },
    orderBy: { createdAt: 'asc' },
    select: { slug: true, title: true },
  });

  // Si no hay siguiente, buscar uno de otro profesional
  if (!nextPost) {
    const otherPosts = await prisma.post.findMany({
      where: {
        authorId: { not: post.authorId },
        status: 'PUBLISHED',
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    if (otherPosts.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherPosts.length);
      const randomPost = otherPosts[randomIndex];
      nextPost = {
        slug: randomPost.slug,
        title: randomPost.title,
        isSuggestion: true,
        authorName: randomPost.author.name,
      };
    }
  }

  return { post, prevPost, nextPost };
}

// Componente "ayudante" que decide si mostrar una imagen, video o audio
function PostMedia({ post }) {
  if (post.postType === 'video' && post.mediaUrl) {
    return (
      <div className="aspect-video my-8">
        <iframe src={post.mediaUrl} title={post.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full rounded-lg shadow-lg"></iframe>
      </div>
    );
  }
  if (post.postType === 'audio' && post.mediaUrl) {
    return (
      <div className="my-8">
        <iframe src={post.mediaUrl} width="100%" height="152" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" className="rounded-lg shadow-lg"></iframe>
      </div>
    );
  }
  // ESTA ES LA PARTE QUE MUESTRA LA IMAGEN PARA ARTÍCULOS DE TEXTO
  if (post.postType === 'text' && post.imageUrl) {
    return (
      <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg my-8">
        <Image
          src={post.imageUrl}
          alt={`Imagen para ${post.title}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
    );
  }
  return null; // No muestra nada si no hay medio visual
}

export default async function PostDetailPage({ params }) {
  const { post, prevPost, nextPost } = await getPost(params.slug);

  if (!post) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold">Artículo no encontrado</h1>
        <Link href="/blog" className="text-brand-primary mt-4 inline-block">
          Volver al blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{post.title}</h1>
        <div className="mb-4">
          <span className="text-gray-600">Escrito por: </span>
          <Link href={`/perfil/${post.author.id}`} className="text-brand-primary font-semibold hover:underline">
            {post.author.name}
          </Link>
        </div>

        {/* ESTA PARTE ES RESPONSABLE DE DIBUJAR LA IMAGEN/VIDEO */}
        <PostMedia post={post} />

        {/* ESTA PARTE ES RESPONSABLE DE DIBUJAR EL TEXTO */}
        <div className="prose lg:prose-xl max-w-none">
          <p>{post.content}</p>
        </div>

        {/* Componente de navegación entre artículos */}
        <PostNavigation prevPost={prevPost} nextPost={nextPost} />
      </div>
    </div>
  );
}