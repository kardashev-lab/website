import Link from 'next/link';
import GitHubIcon from '@/components/GitHubIcon';
import LinkedInIcon from '@/components/LinkedInIcon';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, TOOLS } from '@/lib/site';

const Footer = () => (
  <footer className="border-t border-white/[0.06] px-4 py-12">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        {/* Brand */}
        <div className="md:col-span-2 space-y-3">
          <div className="text-sm font-semibold text-white tracking-tight">
            Kardashev<span className="text-blue-400">Labs</span>
          </div>
          <p className="text-[13px] text-white/50 leading-relaxed max-w-xs">
            Open-source tools for the energy transition. Accelerating humanity
            toward Kardashev Type I.
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold text-white bg-white/8 hover:bg-white/12 ring-1 ring-white/12 hover:ring-white/20 transition-all duration-300"
          >
            <GitHubIcon className="w-4 h-4" />
            github.com/kardashev-lab
          </a>
        </div>

        {/* Tools */}
        <div className="space-y-3">
          <h4 className="text-[11px] uppercase tracking-[0.15em] text-white/50 font-medium">
            Tools
          </h4>
          <div className="space-y-2">
            {TOOLS.map((tool) => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[13px] text-white/38 hover:text-white/70 transition-colors duration-200"
              >
                {tool.name}
              </a>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div className="space-y-3">
          <h4 className="text-[11px] uppercase tracking-[0.15em] text-white/50 font-medium">
            Connect
          </h4>
          <div className="space-y-2">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] text-white/50 hover:text-white/80 transition-colors duration-200"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] text-white/50 hover:text-white/80 transition-colors duration-200"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              LinkedIn
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="block text-[13px] text-white/38 hover:text-white/70 transition-colors duration-200"
            >
              {CONTACT_EMAIL}
            </a>
            <Link
              href="/privacy"
              className="block text-[13px] text-white/38 hover:text-white/70 transition-colors duration-200"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[12px] text-white/45 font-mono">
          © {new Date().getFullYear()} Kardashev Labs
        </p>
        <p className="text-[12px] text-white/45 font-mono">
          kardashevlabs.org
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
