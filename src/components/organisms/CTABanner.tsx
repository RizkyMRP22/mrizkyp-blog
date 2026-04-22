'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CTABanner() {
    const pathname = usePathname();

    // Do not show on coming-soon page or contact page
    if (pathname === '/' || pathname === '/about' || pathname === '/coming-soon' || pathname === '/contact' || pathname === '/endorsements') {
        return null;
    }

    return (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 w-full">
            {/* CTA Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-700 dark:via-indigo-700 dark:to-violet-700 p-px shadow-2xl shadow-indigo-500/20">
                <div className="relative rounded-3xl bg-gradient-to-br from-blue-600/90 via-indigo-600/90 to-violet-600/90 px-8 py-10 md:px-14 md:py-16 overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-indigo-300/10 blur-3xl" />

                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div className="space-y-4 md:flex-1">
                            <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
                                Like what you see?
                            </p>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                                Impressed? Let&rsquo;s work together.
                            </h2>
                            <p className="text-base text-blue-100 max-w-xl mx-auto md:mx-0 leading-relaxed">
                                I&rsquo;d love to bring this level of quality assurance to your next project. Reach out and let&rsquo;s talk.
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            data-testid="cta-contact-link"
                            className="
                            group inline-flex items-center justify-center gap-3 flex-shrink-0
                            bg-white text-indigo-700 font-bold text-base
                            px-8 py-4 rounded-2xl shadow-lg
                            hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-0.5
                            active:translate-y-0 active:shadow-md
                            transition-all duration-200
                            w-full sm:w-auto
                        "
                        >
                            Let&rsquo;s work together
                            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
