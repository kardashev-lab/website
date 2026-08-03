import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPost from '@/components/blog/BlogPost';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import { SITE_NAME, SITE_URL } from '@/lib/site';

type Params = { slug: string };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Not found' };

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      images: post.image
        ? [{ url: post.image, alt: post.imageAlt ?? post.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: url,
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
    articleSection: post.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPost post={post} />
    </>
  );
}