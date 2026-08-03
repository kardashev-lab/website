'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-14 mb-4 text-2xl font-semibold text-foreground tracking-tight first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 mb-3 text-lg font-semibold text-foreground tracking-tight">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-5 text-[1.05rem] leading-[1.75] text-white/72">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 ml-5 list-disc space-y-2 text-[1.05rem] leading-[1.75] text-white/72">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 ml-5 list-decimal space-y-2 text-[1.05rem] leading-[1.75] text-white/72">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-white/80">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-primary/60 pl-5 text-[1.1rem] leading-relaxed text-foreground/85 italic">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => {
    const external = href?.startsWith('http');
    return (
      <a
        href={href}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-colors"
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => {
    if (!src || typeof src !== 'string') return null;
    return (
      // Essay figures are authored assets under /public/blog
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ''}
        className="my-10 w-full border border-white/10 bg-white/[0.02]"
      />
    );
  },
  hr: () => <hr className="my-12 border-white/10" />,
  code: ({ children, className }) => {
    const isBlock = Boolean(className);
    if (isBlock) {
      return (
        <code className="block overflow-x-auto border border-white/10 bg-white/[0.03] p-4 font-mono text-[13px] text-white/70">
          {children}
        </code>
      );
    }
    return (
      <code className="rounded-sm bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-primary/90">
        {children}
      </code>
    );
  },
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto border border-white/10">
      <table className="w-full text-left text-[0.95rem] text-white/70">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-white/50">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-white/[0.06] px-4 py-3 align-top">
      {children}
    </td>
  ),
};

export default function BlogMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
