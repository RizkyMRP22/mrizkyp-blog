import PageSkeleton from '@/components/atoms/PageSkeleton';

/** Case Studies page: vertical list of case study cards */
export default function Loading() {
    return <PageSkeleton variant="page" cards={4} showSpinner />;
}
