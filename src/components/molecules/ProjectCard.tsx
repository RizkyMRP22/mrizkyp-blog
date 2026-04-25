'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import { sendGAEvent } from '@next/third-parties/google';

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    highlights: string[];
    image?: string | string[];
    onImageClick?: () => void;
    category?: string | string[];
    githubUrl?: string;
    webUrl?: string;
    mobileUrl?: string;
}

export default function ProjectCard({ title, description, tags, highlights, image, onImageClick, category, githubUrl, webUrl, mobileUrl }: ProjectCardProps) {
    const [imgError, setImgError] = useState(false);

    return (
        <Card className="!p-0 flex flex-col w-full h-full overflow-hidden group border border-white/5 bg-surface/40 backdrop-blur-sm hover:border-primary/30 transition-all duration-500">
            {/* Image Header or Fallback */}
            <div 
                className={`relative h-48 sm:h-56 w-full shrink-0 overflow-hidden bg-black/20 ${onImageClick ? 'cursor-pointer' : ''}`}
                onClick={() => onImageClick?.()}
            >
                {image && !imgError ? (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10 pointer-events-none" />
                        <Image 
                            src={Array.isArray(image) ? image[0] : image}
                            alt={`Project: ${title}`}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            onError={() => setImgError(true)}
                        />
                        {/* Multiple Images Indicator */}
                        {Array.isArray(image) && image.length > 1 && (
                            <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {image.length} Photos
                            </div>
                        )}
                        {/* Hover Overlay Icon */}
                        {onImageClick && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                                <div className="p-3 rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-surface/50 to-surface-light flex flex-col items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
                        <svg className="w-12 h-12 text-white/5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-white/10 text-xs font-semibold uppercase tracking-[0.2em] px-4 text-center">
                            {title.length > 20 ? title.substring(0, 20) + '...' : title}
                        </span>
                    </div>
                )}
                
                {category && (
                    <div className="absolute top-4 right-4 z-20 flex gap-1.5 flex-wrap justify-end max-w-[70%]">
                        {Array.isArray(category) ? (
                            category.map((cat, i) => <Badge key={i} label={cat} variant="default" />)
                        ) : (
                            <Badge label={category} variant="default" />
                        )}
                    </div>
                )}
            </div>

            {/* Card Body */}
            <div className="flex flex-col flex-1 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-primary-light transition-colors duration-300 line-clamp-2">{title}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-1 line-clamp-3 sm:line-clamp-4">{description}</p>

                {/* Highlights */}
                {highlights && highlights.length > 0 && (
                    <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/5 z-10 transition-colors group-hover:bg-white/10">
                        <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Key Highlights</h4>
                        <div className="space-y-2">
                            {highlights.map((h, i) => (
                                <div key={i} className="flex items-start gap-2.5 text-sm">
                                    <span className="text-primary text-[10px] mt-1 shrink-0">✦</span>
                                    <span className="text-slate-300 leading-snug">{h}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {tags.map((tag) => (
                            <Badge key={tag} label={tag} variant="info" />
                        ))}
                    </div>
                )}
            </div>

            {/* Card Footer (Links) */}
            <div className="flex flex-wrap gap-4 px-6 sm:px-8 py-5 border-t border-white/5 bg-black/40 items-center justify-between min-h-[72px] mt-auto">
                <div className="flex gap-5">
                    {githubUrl && githubUrl !== '#' && githubUrl !== '' && (
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5" onClick={() => sendGAEvent('event', 'click_outbound', { link_url: githubUrl, link_type: 'github', item_name: title })}>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                            GitHub
                        </a>
                    )}
                    {webUrl && webUrl !== '#' && webUrl !== '' && (
                        <a href={webUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-400 hover:text-secondary transition-colors flex items-center gap-1.5" onClick={() => sendGAEvent('event', 'click_outbound', { link_url: webUrl, link_type: 'web', item_name: title })}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            Web
                        </a>
                    )}
                    {mobileUrl && mobileUrl !== '#' && mobileUrl !== '' && (
                        <a href={mobileUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5" onClick={() => sendGAEvent('event', 'click_outbound', { link_url: mobileUrl, link_type: 'mobile', item_name: title })}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            Mobile
                        </a>
                    )}
                </div>
            </div>
        </Card>
    );
}
