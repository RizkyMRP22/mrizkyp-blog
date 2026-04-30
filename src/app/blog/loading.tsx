import PageSkeleton from '@/components/atoms/PageSkeleton';

/** Blog page: 3-column grid of post cards */
export default function Loading() {
    return <PageSkeleton variant="page" cards={6} showSpinner />;
}
