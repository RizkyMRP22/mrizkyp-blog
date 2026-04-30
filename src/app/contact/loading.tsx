import PageSkeleton from '@/components/atoms/PageSkeleton';

/** Contact page: info cards (left) + contact form (right) */
export default function Loading() {
    return <PageSkeleton variant="page" cards={4} showSpinner />;
}
