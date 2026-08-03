import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type BlogCategory = 'Queues' | 'Markets' | 'Curtailment' | 'Methods';

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  readingTime: string;
  image?: string;
  imageAlt?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

function readingTimeFromContent(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min`;
}

function parsePost(slug: string, raw: string): BlogPost {
  const { data, content } = matter(raw);
  const category = data.category as BlogCategory;
  const readingTime =
    typeof data.readingTime === 'string'
      ? data.readingTime
      : readingTimeFromContent(content);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    category,
    readingTime,
    image: data.image ? String(data.image) : undefined,
    imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
    content,
  };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, 'utf8');
  return parsePost(slug, raw);
}

export function getAllPosts(): BlogPostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      const { content: _content, ...meta } = post;
      return meta;
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatPostDate(date: string): string {
  const d = new Date(`${date}T12:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
