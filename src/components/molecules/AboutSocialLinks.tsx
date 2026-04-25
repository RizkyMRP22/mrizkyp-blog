'use client';

import React, { useState } from 'react';
import TrackingLink from '@/components/atoms/TrackingLink';
import EmailContactModal from '@/components/organisms/EmailContactModal';
import { sendGAEvent } from '@next/third-parties/google';

interface AboutSocialLinksProps {
    github: string;
    linkedin: string;
    email: string;
}

export default function AboutSocialLinks({ github, linkedin, email }: AboutSocialLinksProps) {
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

    const openEmailModal = (e: React.MouseEvent) => {
        e.preventDefault();
        sendGAEvent('event', 'generate_lead', { value: 'email_modal_open' });
        setIsEmailModalOpen(true);
    };

    return (
        <>
            <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-slate-700/50">
                <TrackingLink 
                    href={github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg hover:bg-primary/80 transition-all duration-300 shadow hover:shadow-primary/50 hover:-translate-y-1" 
                    eventName="click_outbound" 
                    eventParams={{ link_url: github, link_type: 'github' }}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </TrackingLink>
                
                <TrackingLink 
                    href={linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg hover:bg-[#0A66C2] transition-all duration-300 shadow hover:shadow-[#0A66C2]/50 hover:-translate-y-1" 
                    eventName="click_outbound" 
                    eventParams={{ link_url: linkedin, link_type: 'linkedin' }}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.3333 4H4.66667C4.3013 4 4 4.3013 4 4.66667V19.3333C4 19.6987 4.3013 20 4.66667 20H19.3333C19.6987 20 20 19.6987 20 19.3333V4.66667C20 4.3013 19.6987 4 19.3333 4ZM10.5187 17.3333H8.16533V10.1653H10.5187V17.3333ZM9.34133 9.096C8.58667 9.096 7.97333 8.48267 7.97333 7.728C7.97333 6.97333 8.58667 6.36 9.34133 6.36C10.096 6.36 10.7093 6.97333 10.7093 7.728C10.7093 8.48267 10.096 9.096 9.34133 9.096ZM17.3333 17.3333H14.9813V13.84C14.9813 13.008 14.9653 11.9333 13.816 11.9333C12.6507 11.9333 12.472 12.8427 12.472 13.7813V17.3333H10.1187V10.1653H12.3787V11.144H12.4107C12.7253 10.548 13.4933 9.93333 14.6187 9.93333C16.9813 9.93333 17.3333 11.488 17.3333 13.504V17.3333Z" /></svg>
                </TrackingLink>
                
                <button 
                    onClick={openEmailModal}
                    className="p-2.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-600 transition-all duration-300 shadow hover:-translate-y-1"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </button>
            </div>

            <EmailContactModal 
                email={email}
                isOpen={isEmailModalOpen}
                onClose={() => setIsEmailModalOpen(false)}
            />
        </>
    );
}
