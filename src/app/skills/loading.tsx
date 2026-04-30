import PageSkeleton from '@/components/atoms/PageSkeleton';

/** Skills page: 3-column category card grid */
export default function Loading() {
    return <PageSkeleton variant="page" cards={6} showSpinner />;
}
