'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import PageLayout from '@/components/templates/PageLayout';
import SectionTitle from '@/components/atoms/SectionTitle';
import ComingSoon from '@/components/molecules/ComingSoon';

function ComingSoonContent() {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || 'This Page';

    return (
        <PageLayout>
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <SectionTitle title={page} subtitle="This section is currently under development" />
                <div className="mt-8">
                    <ComingSoon
                        title={`Coming Soon`}
                        description={`I'm actively working on the ${page} section. It will be available shortly. Stay tuned!`}
                    />
                </div>
            </section>
        </PageLayout>
    );
}

export default function ComingSoonPage() {
    return (
        <Suspense fallback={
            <PageLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            </PageLayout>
        }>
            <ComingSoonContent />
        </Suspense>
    );
}
