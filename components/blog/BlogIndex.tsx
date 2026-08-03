import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatPostDate, type BlogPostMeta } from '@/lib/blog';

type Props = {
  posts: BlogPostMeta[];
};

export default function BlogIndex({ posts }: Props) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
            <span className="h-1.5 w-1.5 bg-primary" />
            Blog
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight mb-5">
            Notes from the grid.
          </h1>

          <p className="text-[1.05rem] text-white/55 leading-relaxed max-w-2xl mb-14">
            Essays from measured ISO records: interconnection queues,
            curtailment, prices, and the operating regimes around them. Built
            from Kardashev Labs tools, not product pitches.
          </p>

          <ul className="divide-y divide-white/10 border-y border-white/10">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block py-8 transition-colors"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
                    <span className="text-primary/90">{post.category}</span>
                    <span className="text-white/15">·</span>
                    <time dateTime={post.date}>
                      {formatPostDate(post.date)}
                    </time>
                    <span className="text-white/15">·</span>
                    <span>{post.readingTime}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors duration-200 mb-3">
                    {post.title}
                  </h2>

                  <p className="text-[0.95rem] text-white/50 leading-relaxed max-w-2xl mb-4">
                    {post.description}
                  </p>

                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/35 group-hover:text-primary/80 transition-colors">
                    Read the essay →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
