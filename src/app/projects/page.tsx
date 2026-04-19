import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import ProjectClient from './projectClient';
import { getProjects } from '@/app/api/projects/route';

export default async function ProjectsPage() {
    const projectsData = await getProjects();

    return (
        <PageLayout>
            <section data-testid="section-projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionTitle title="Projects" subtitle="QA projects and test automation frameworks I've built" />
                <ProjectClient projects={projectsData?.projects || []} />
            </section>
        </PageLayout>
    );
}
