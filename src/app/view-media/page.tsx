import { Metadata } from 'next';
import { Suspense } from 'react';
import MediaViewerClient from './media-viewer-client';

type Props = {
    searchParams: Promise<{ title?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { title } = await searchParams;
    const displayTitle = title || 'Media Viewer';
    return {
        title: `${displayTitle} | Portfolio`,
    };
}

export default function MediaViewerPage() {
    return (
        <Suspense fallback={<div className="h-screen w-screen bg-black flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>}>
            <MediaViewerClient />
        </Suspense>
    );
}
