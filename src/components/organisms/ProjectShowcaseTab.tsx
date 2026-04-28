import React from 'react';
import Image from 'next/image';

interface ShowcaseItem {
    id: string;
    title: string;
    description: string;
    type: 'video' | 'image';
    url: string;
}

interface ProjectShowcaseTabProps {
    data: ShowcaseItem[];
}

const VideoIcon = () => (
    <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const ImageIcon = () => (
    <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export default function ProjectShowcaseTab({ data }: ProjectShowcaseTabProps) {
    const safeData = Array.isArray(data) ? data : [];
    const baseURL = process.env.NEXT_PUBLIC_BLOB_STORAGE_URL || '';

    const processUrl = (url: string) => {
        if (!url) return '';
        return url.startsWith('/') ? `${baseURL}${url}` : url;
    };
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {safeData.map((item) => {
                const fullUrl = processUrl(item.url);
                
                return (
                    <div
                        key={item.id}
                        className="group flex flex-col h-full bg-gray-900/40 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 will-change-transform"
                    >
                        <div className="relative w-full aspect-video bg-gray-950 overflow-hidden">
                            {item.type === 'video' ? (
                                <iframe
                                    src={fullUrl}
                                    className="absolute inset-0 w-full h-full border-0 transform transition-transform duration-700 group-hover:scale-[1.02]"
                                    allow="autoplay; fullscreen"
                                    allowFullScreen
                                    title={item.title}
                                ></iframe>
                            ) : (
                                <div className="absolute inset-0 w-full h-full overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={fullUrl}
                                        alt={item.title}
                                        className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            )}

                            {/* Type Badge Overlay */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm ${item.type === 'video'
                                        ? 'bg-indigo-600/90 text-white border-indigo-400/30 dark:bg-indigo-500/80'
                                        : 'bg-emerald-600/90 text-white border-emerald-400/30 dark:bg-emerald-500/80'
                                    }`}>
                                    {item.type === 'video' ? <VideoIcon /> : <ImageIcon />}
                                    {item.type === 'video' ? 'Video Demo' : 'Visual Gallery'}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col flex-grow p-6 md:p-8 bg-gray-900/20">
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                {item.description}
                            </p>

                            <div className="mt-auto pt-6 flex items-center justify-between">
                                <a
                                    href={`/view-media?url=${encodeURIComponent(fullUrl.replace('/preview', '/view'))}&title=${encodeURIComponent(item.title)}&type=${item.type}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-sm font-bold text-indigo-400 hover:text-indigo-300 group/link"
                                >
                                    Open Source Media
                                    <svg className="w-4 h-4 ml-1.5 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
