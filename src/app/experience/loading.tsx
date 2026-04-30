import PageSkeleton from '@/components/atoms/PageSkeleton';

/** Experience page: vertical timeline of experience cards */
export default function Loading() {
    return <PageSkeleton variant="page" cards={3} showSpinner />;
}
