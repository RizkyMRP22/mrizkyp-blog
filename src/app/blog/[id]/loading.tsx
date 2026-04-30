import PageSkeleton from '@/components/atoms/PageSkeleton';

/** Blog detail page: single article */
export default function Loading() {
    return <PageSkeleton variant="page" cards={2} showSpinner />;
}
