import PageSkeleton from '@/components/atoms/PageSkeleton';

/** Test Artifacts page: tabbed bug reports / test cases / automation results */
export default function Loading() {
    return <PageSkeleton variant="page" cards={6} showSpinner />;
}
