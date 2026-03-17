import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import ComingSoon from '@/components/molecules/ComingSoon';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Test Artifacts | QA Portfolio',
    description: 'Interactive QA demos: bug report creator, test case runner, and automation result dashboard.',
};

export default function TestArtifactsPage() {
    return (
        <PageLayout>
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-white/5">
                <SectionTitle title="Test Artifacts" subtitle="Interactive QA demonstrations and testing tools built for real-world scenarios" />
                <div className="mt-8">
                    <ComingSoon 
                        title="Workshop Under Construction"
                        description="I am currently building interactive test demonstrations including a bug reporter and automation dashboard. Please visit again soon!"
                    />
                </div>
            </section>
        </PageLayout>
    );
}
