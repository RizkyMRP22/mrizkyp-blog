import PageSkeleton from '@/components/atoms/PageSkeleton';

/**
 * Root-level loading.tsx – Next.js App Router automatically wraps
 * every page segment in a <Suspense> boundary and renders this
 * component while the server component is streaming.
 *
 * Because this sits at src/app/loading.tsx it acts as the global
 * fallback for ALL routes.  Individual routes can define their own
 * loading.tsx that renders <PageSkeleton> with different props
 * (e.g. fewer cards, no spinner) for a more tailored experience.
 */
export default function Loading() {
    return <PageSkeleton variant="page" cards={6} showSpinner={true} />;
}
