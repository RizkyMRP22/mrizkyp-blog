import PageLayout from '@/components/templates/PageLayout';
import BugReportDemo from '@/components/organisms/BugReportDemo';
import TestCaseRunner from '@/components/organisms/TestCaseRunner';
import AutomationDashboard from '@/components/organisms/AutomationDashboard';
import automationData from '@/data/automationResults.json';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Test Artifacts | QA Portfolio',
    description: 'Interactive QA demos: bug report creator, test case runner, and automation result dashboard.',
};

export default function TestArtifactsPage() {
    return (
        <PageLayout>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
                <BugReportDemo />
                <TestCaseRunner />
                <AutomationDashboard data={automationData} />
            </div>
        </PageLayout>
    );
}
