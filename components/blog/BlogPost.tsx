import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogMarkdown from '@/components/blog/BlogMarkdown';
import {
  formatPostDate,
  type BlogPost as BlogPostType,
} from '@/lib/blog';

type Props = {
  post: BlogPostType;
};

export default function BlogPost({ post }: Props) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20">
        <article className="max-w-3xl mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45 hover:text-white/70 transition-colors mb-10"
          >
            <span aria-hidden>←</span>
            Blog
          </Link>

          <header className="mb-12">
            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
              <span className="text-primary">{post.category}</span>
              <span className="text-white/20">·</span>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span className="text-white/20">·</span>
              <span>{post.readingTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-[1.15] tracking-tight mb-5">
              {post.title}
            </h1>

            <p className="text-lg text-white/55 leading-relaxed max-w-2xl">
              {post.description}
            </p>
          </header>

          {post.image ? (
            <figure className="mb-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.imageAlt ?? ''}
                className="w-full border border-white/10 bg-white/[0.02]"
              />
              {post.imageAlt ? (
                <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-white/35">
                  {post.imageAlt}
                </figcaption>
              ) : null}
            </figure>
          ) : null}

          <div className="blog-body">
            <BlogMarkdown content={post.content} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
