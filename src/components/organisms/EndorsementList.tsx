'use client';

import React, { useState, useEffect, useRef } from 'react';
import EndorsementCard from '@/components/molecules/EndorsementCard';
import EndorsementFormModal from './EndorsementFormModal';
import EndorsementDetailModal from './EndorsementDetailModal';
import Button from '@/components/atoms/Button';
import { SkeletonCard, SkeletonStyles } from '@/components/atoms/PageSkeleton';
import type { Endorsement } from '@/types/endorsement';
import type { ApiResponse } from '@/types/api';
import { fetcher } from '@/lib/api';

export default function EndorsementList() {
    const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEndorsement, setSelectedEndorsement] = useState<Endorsement | null>(null);
    const [fetchTrigger, setFetchTrigger] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const totalPages = Math.ceil(endorsements.length / itemsPerPage);
    const currentEndorsements = endorsements.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        const fetchEndorsements = async () => {
            setIsLoading(true);
            try {
                const data = await fetcher<ApiResponse<Endorsement[]>>('/endorsements');

                if (data.success && data.data) {
                    setEndorsements(data.data);
                    setCurrentPage(1);
                } else {
                    setError('Failed to load endorsements.');
                }
            } catch (err) {
                console.error('Error fetching endorsements:', err);
                setError('Failed to load endorsements. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEndorsements();
    }, [fetchTrigger]);

    // Scroll to top of section when page changes
    useEffect(() => {
        if (currentPage > 1) {
            containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [currentPage]);

    const handleSuccess = () => {
        // Trigger a re-fetch of the endorsements list when a new one is successfully submitted
        setFetchTrigger(prev => prev + 1);
        setIsModalOpen(false);
    };

    return (
        <div className="w-full" ref={containerRef}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-semibold mb-1 text-foreground">What They Say</h2>
                    <p className="text-muted text-sm">Words from people I&apos;ve had the pleasure of working with.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="whitespace-nowrap shrink-0 group w-full sm:w-auto mt-2 sm:mt-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:scale-110 transition-transform">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Leave a Message
                </Button>
            </div>

            {error && (
                <div className="p-4 bg-danger/10 border border-danger/30 rounded-xl text-center text-danger">
                    {error}
                </div>
            )}

            {isLoading ? (
                <>
                    <SkeletonStyles />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <SkeletonCard key={i} delay={i * 80} />
                        ))}
                    </div>
                </>
            ) : endorsements.length === 0 ? (
                <div className="text-center p-12 border border-dashed border-card-border rounded-3xl bg-surface/30">
                    <h3 className="text-xl font-medium text-muted mb-2">No endorsements yet</h3>
                    <p className="text-muted/60 mb-6 font-light">Be the first to share your experience!</p>
                    <Button variant="ghost" onClick={() => setIsModalOpen(true)}>
                        Write an Endorsement
                    </Button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentEndorsements.map((endorsement) => (
                            <div key={endorsement._id}>
                                <EndorsementCard
                                    endorsement={endorsement}
                                    onReadMore={() => setSelectedEndorsement(endorsement)}
                                />
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex flex-wrap justify-center items-center gap-4 mt-16 w-full">
                            <Button
                                variant="ghost"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                className="!px-5 !py-2.5 shrink-0 bg-surface/50 border border-white/5 backdrop-blur-sm disabled:opacity-30 text-sm hover:border-primary/50 transition-all active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                                Previous
                            </Button>

                            <div className="flex items-center gap-1.5 px-4 py-2 bg-white/5 rounded-full border border-white/5 backdrop-blur-sm text-xs font-bold">
                                <span className="text-primary-light tabular-nums">{currentPage}</span>
                                <span className="text-muted opacity-30">/</span>
                                <span className="text-muted tabular-nums">{totalPages}</span>
                            </div>

                            <Button
                                variant="ghost"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                className="!px-5 !py-2.5 shrink-0 bg-surface/50 border border-white/5 backdrop-blur-sm disabled:opacity-30 text-sm hover:border-primary/50 transition-all active:scale-95"
                            >
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </Button>
                        </div>
                    )}
                </>
            )}

            <EndorsementFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
            />

            <EndorsementDetailModal
                endorsement={selectedEndorsement}
                onClose={() => setSelectedEndorsement(null)}
            />
        </div>
    );
}
