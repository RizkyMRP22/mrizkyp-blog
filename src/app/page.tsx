import PageLayout from '@/components/templates/PageLayout';
import HeroSection from '@/components/organisms/HeroSection';
import Link from 'next/link';
import quickLinks from '@/data/quicklinks.json';

export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      {/* Quick Links Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Explore My Work</h2>
          <p className="text-muted text-lg">Discover My QA expertise through strategy, projects, case studies, and interactive demos</p>
          <div className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.quickLink.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="glass rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 h-full cursor-pointer">
                <div className="text-4xl mb-4">{link.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{link.label}</h3>
                <p className="text-sm text-muted">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
