import PageSkeleton from '@/components/atoms/PageSkeleton';

/** About page: profile card (left) + bio/education/cert blocks (right) → 4 sections */
export default function Loading() {
    return <PageSkeleton variant="page" cards={4} showSpinner />;
}
