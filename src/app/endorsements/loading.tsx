import PageSkeleton from '@/components/atoms/PageSkeleton';

/** Endorsements page: card grid of endorsement entries */
export default function Loading() {
    return <PageSkeleton variant="page" cards={6} showSpinner />;
}
