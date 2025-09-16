# Kardashev Labs - Coming Soon

A professional "Coming Soon" placeholder website for Kardashev Labs, built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Smooth Animations**: Framer Motion with reduced-motion support
- **Accessibility**: WCAG 2.1 AA compliant with proper focus management
- **SEO Optimized**: Open Graph, Twitter Cards, sitemap, robots.txt
- **Email Collection**: Configurable form submission (Formspree ready)
- **Countdown Timer**: Dynamic countdown to launch date
- **Responsive Design**: Mobile-first approach with 360px+ support
- **Professional Design**: Clean, minimal aesthetic ready for branding

## Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd kardashev-labs-website
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your values:
   ```env
   NEXT_PUBLIC_FORM_ACTION="https://formspree.io/f/your-form-id"
   NEXT_PUBLIC_LAUNCH_DATE="2025-08-01"
   NEXT_PUBLIC_SITE_URL="https://kardashevlabs.org"
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_FORM_ACTION` | Form submission endpoint (e.g., Formspree) | Yes | - |
| `NEXT_PUBLIC_LAUNCH_DATE` | Launch date in YYYY-MM-DD format | No | 60 days from now |
| `NEXT_PUBLIC_SITE_URL` | Site URL for SEO | No | https://kardashevlabs.org |

### Form Setup (Formspree)

1. Create a Formspree account at [formspree.io](https://formspree.io)
2. Create a new form
3. Copy the form endpoint URL
4. Add it to your `.env.local` file

## Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push**

### Manual Deployment

```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── privacy/           # Privacy page
│   ├── robots.txt         # SEO robots file
│   ├── sitemap.ts         # Dynamic sitemap
│   └── opengraph-image.tsx # OG image generator
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── Section.tsx        # Generic section wrapper
│   ├── ValueStrip.tsx     # Value propositions
│   ├── ApproachCards.tsx  # Approach cards
│   ├── Countdown.tsx      # Launch countdown
│   ├── EmailForm.tsx      # Email subscription
│   └── Footer.tsx         # Site footer
├── lib/                   # Utilities
│   └── motion.ts          # Framer Motion variants
└── public/                # Static assets
```

## Customization

### Content Updates

- **Hero text**: Edit `components/Hero.tsx`
- **Vision section**: Edit `app/page.tsx` vision section
- **Approach cards**: Edit `components/ApproachCards.tsx`
- **Footer links**: Edit `components/Footer.tsx`

### Styling

- **Colors**: Update CSS variables in `app/globals.css`
- **Typography**: Modify Tailwind config in `tailwind.config.ts`
- **Animations**: Adjust motion variants in `lib/motion.ts`

### Branding

The design is intentionally minimal and brand-neutral. To add your branding:

1. Replace the wordmark in `components/Header.tsx`
2. Add your logo to `public/` directory
3. Update color scheme in `app/globals.css`
4. Customize the OG image in `app/opengraph-image.tsx`

## Performance

The site is optimized for performance:

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Bundle Size**: Minimal with tree-shaking
- **Images**: WebP/AVIF support with Next.js Image

## Accessibility

Built with accessibility in mind:

- **WCAG 2.1 AA** compliant
- **Keyboard navigation** support
- **Screen reader** friendly
- **Focus management** with visible focus rings
- **Reduced motion** support
- **Semantic HTML** structure

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors
pnpm format       # Format code with Prettier
pnpm type-check   # Run TypeScript checks
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions or support, contact [contact@kardashevlabs.org](mailto:contact@kardashevlabs.org).
