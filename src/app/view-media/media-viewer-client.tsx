'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function MediaViewerContent() {
    const searchParams = useSearchParams();
    const [mediaData, setMediaData] = useState<{ url: string | null, title: string | null, type: string | null }>({
        url: null,
        title: null,
        type: null
    });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const urlParam = searchParams.get('url');
        const titleParam = searchParams.get('title');
        const typeParam = searchParams.get('type') || 'image';

        let currentUrl = urlParam;
        let currentTitle = titleParam;
        let currentType = typeParam;

        // If params are missing, try to get them from sessionStorage
        if (!urlParam && typeof window !== 'undefined') {
            currentUrl = sessionStorage.getItem('last_media_url');
            currentTitle = sessionStorage.getItem('last_media_title');
            currentType = sessionStorage.getItem('last_media_type') || 'image';
        }

        setMediaData({ url: currentUrl, title: currentTitle, type: currentType });

        if (currentTitle) {
            document.title = `${currentTitle} | Media Viewer`;
        }

        // Save to sessionStorage and Clean up the URL in the address bar
        if (typeof window !== 'undefined' && urlParam) {
            sessionStorage.setItem('last_media_url', urlParam);
            sessionStorage.setItem('last_media_title', titleParam || '');
            sessionStorage.setItem('last_media_type', typeParam);

            const timer = setTimeout(() => {
                const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.replaceState({ path: newUrl }, '', newUrl);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [searchParams]);

    if (!mediaData.url) {
        return (
            <div className="h-screen w-screen bg-black flex items-center justify-center text-white">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white/90">No Media Found</h2>
                    <p className="text-white/40 text-sm max-w-xs mx-auto leading-relaxed">
                        The media URL is missing or has expired. Please try opening it again from the portfolio.
                    </p>
                </div>
            </div>
        );
    }

    // Process Google Drive URL if needed
    const isGoogleDrive = mediaData.url.includes('drive.google.com');
    const processedUrl = isGoogleDrive && mediaData.url.includes('/view') 
        ? mediaData.url.replace('/view', '/preview') 
        : mediaData.url;

    const isDirectVideo = !isGoogleDrive && (mediaData.url.endsWith('.mp4') || mediaData.url.endsWith('.webm') || mediaData.url.endsWith('.ogg'));

    return (
        <div className="h-screen w-screen bg-black flex flex-col overflow-hidden">
            {/* Header / Overlay */}
            <div className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="flex items-center justify-between max-w-7xl mx-auto pointer-events-auto">
                    <div className="flex flex-col">
                        <h1 className="text-white font-bold text-lg sm:text-2xl drop-shadow-md">
                            {mediaData.title || 'Media Viewer'}
                        </h1>
                        <p className="text-white/60 text-xs sm:text-sm font-medium">
                            Viewing {mediaData.type === 'video' ? 'Video Demo' : 'Visual Gallery'}
                        </p>
                    </div>
                    <button 
                        onClick={() => window.close()}
                        className="p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/10 backdrop-blur-md shadow-lg"
                        title="Close Tab"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Media Content */}
            <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8 md:p-12">
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                )}
                
                <div className={`relative w-full h-full max-w-6xl flex items-center justify-center transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    {mediaData.type === 'video' ? (
                        isDirectVideo ? (
                            <video
                                src={mediaData.url}
                                controls
                                autoPlay
                                playsInline
                                className="max-w-full max-h-full rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
                                onLoadedData={() => setIsLoaded(true)}
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <iframe
                                src={processedUrl}
                                className="w-full h-full border-0 rounded-xl shadow-2xl"
                                allow="autoplay; fullscreen"
                                allowFullScreen
                                onLoad={() => setIsLoaded(true)}
                            ></iframe>
                        )
                    ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={mediaData.url}
                            alt={mediaData.title || 'Media'}
                            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                            onLoad={() => setIsLoaded(true)}
                        />
                    )}
                </div>
            </div>
            
            {/* Footer shadow for depth */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </div>
    );
}

export default function MediaViewerClient() {
    return (
        <Suspense fallback={<div className="h-screen w-screen bg-black flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>}>
            <MediaViewerContent />
        </Suspense>
    );
}
