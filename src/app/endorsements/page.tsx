import React from 'react';
import type { Metadata } from 'next';
import SectionTitle from '@/components/atoms/SectionTitle';
import CTABanner from '@/components/organisms/CTABanner';
import EndorsementList from '@/components/organisms/EndorsementList';
import PageLayout from '@/components/templates/PageLayout';

export const metadata: Metadata = {
    title: 'Endorsements | Rizky',
    description: 'Recommendations and feedback from colleagues, friends, and connections.',
};

export default function EndorsementsPage() {
    return (
        <PageLayout>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 animate-fade-in-up">
                <div className="flex flex-col gap-12 max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col gap-4 animate-fade-in-up">
                        <SectionTitle
                            title="Endorsements"
                            subtitle="Feedback and recommendations from people I've had the pleasure of working with."
                        />
                    </div>

                    {/* Main Content Area */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <EndorsementList />
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
