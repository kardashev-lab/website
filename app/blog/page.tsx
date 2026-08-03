import type { Metadata } from 'next';
import BlogIndex from '@/components/blog/BlogIndex';
import { getAllPosts } from '@/lib/blog';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Notes from the grid. Essays on interconnection queues, curtailment, wholesale prices, and US power markets from Kardashev Labs measured data.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description:
      'Essays from measured ISO records: interconnection queues, curtailment, prices, and the operating regimes around them.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blog | ${SITE_NAME}`,
    description:
      'Essays from measured ISO records: interconnection queues, curtailment, prices, and the operating regimes around them.',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogIndex posts={posts} />;
}
