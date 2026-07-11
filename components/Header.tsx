'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import GitHubIcon from '@/components/GitHubIcon';
import { GITHUB_URL } from '@/lib/site';

const navLinks = [
  { label: 'Tools', href: '#tools' },
  { label: 'Forecast', href: '/forecast' },
  { label: 'Vision', href: '#vision' },
  { label: 'Approach', href: '#approach' },
  { label: 'Notes', href: '#notes' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 z-40 border-b transition-colors duration-500 pt-[env(safe-area-inset-top)] ${
          scrolled
            ? 'bg-background/85 backdrop-blur-md border-white/10'
            : 'bg-background/40 backdrop-blur-sm border-white/0'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center gap-8 px-4 py-4">
          <Link
            href="/"
            className="text-sm font-semibold text-foreground tracking-tight hover:text-white/80 transition-colors duration-300"
          >
            Kardashev<span className="text-primary">Labs</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 ml-auto">
            {navLinks.map((link) =>
              link.href.startsWith('#') ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/50 hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/50 hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 text-[13px] font-semibold text-foreground border border-white/15 hover:border-white/30 hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
          >
            <GitHubIcon className="w-4 h-4" />
            GitHub
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden ml-auto min-w-11 min-h-11 flex flex-col items-center justify-center gap-[5px] relative"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="block w-4 h-px bg-white/70 origin-center"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="block w-4 h-px bg-white/70 origin-center"
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
            onClick={() => setMenuOpen(false)}
          >
            {navLinks.map((link, i) =>
              link.href.startsWith('#') ? (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollTo(e, link.href);
                  }}
                  className="text-3xl font-semibold text-white/80 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </motion.a>
              ) : (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => e.stopPropagation()}
                    className="text-3xl font-semibold text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            )}
            <motion.a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: navLinks.length * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-3 text-3xl font-semibold text-white/80 hover:text-white transition-colors duration-200"
            >
              <GitHubIcon className="w-8 h-8" />
              GitHub
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
