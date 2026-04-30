import PageSkeleton from '@/components/atoms/PageSkeleton';

/** Projects page: 3-column project card grid */
export default function Loading() {
    return <PageSkeleton variant="page" cards={6} showSpinner />;
}
