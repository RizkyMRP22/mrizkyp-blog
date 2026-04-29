export const dynamic = 'force-dynamic';
import PageLayout from '@/components/templates/PageLayout';
import HeroSection from '@/components/organisms/HeroSection';
import { getProfiles } from '@/app/api/profile/route';
import { getQuickLinks } from '@/app/api/quicklinks/route';
import TrackingLink from '@/components/atoms/TrackingLink';
import SectionTitle from '@/components/atoms/SectionTitle';
import { navItems } from '@/config/navigation';
import { siteConfig } from '@/config/site';

export default async function HomePage() {
  const profileData = await getProfiles();
  const quickLinksData = await getQuickLinks();

  return (
    <PageLayout>
      <HeroSection profileData={profileData} />

      {/* Quick Links Section */}
      <section data-testid="section-home-quicklinks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionTitle
          title="Explore My Work"
          subtitle={siteConfig.description}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinksData.quickLink.map((link) => {
            const navItem = navItems.find((item) => item.label === link.label);
            const targetHref = navItem ? navItem.href : link.href;

            return (
              <TrackingLink key={link.href} href={targetHref} eventName="select_content" eventParams={{ value: `quicklink_${link.label}` }}>
                <div className="glass rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 h-full cursor-pointer">
                  <div className="text-4xl mb-4">{link.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{link.label}</h3>
                  <p className="text-sm text-muted">{link.desc}</p>
                </div>
              </TrackingLink>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
}
