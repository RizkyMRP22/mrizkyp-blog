import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import ProjectClient from './projectClient';
import { getProjects } from '@/app/api/projects/route';
import { siteConfig } from '@/config/site';

export default async function ProjectsPage() {
    const projectsData = await getProjects();

    return (
        <PageLayout>
            <section data-testid="section-projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionTitle title={`${siteConfig.pages.projects.title}`} subtitle={`${siteConfig.pages.projects.description}`} />
                <ProjectClient projects={projectsData?.projects || []} />
            </section>
        </PageLayout>
    );
}
