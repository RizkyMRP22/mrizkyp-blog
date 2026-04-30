import { useState, useEffect } from 'react';

// Cloudflare Turnstile is loaded via an external script; we type its global here
// so we avoid `(window as any)` throughout this file.
interface TurnstileAPI {
    render: (container: HTMLElement, options: {
        sitekey: string | undefined;
        theme: string;
        callback: (token: string) => void;
    }) => void;
}

declare global {
    interface Window { turnstile?: TurnstileAPI; }
}

export function useTurnstile(containerRef: React.RefObject<HTMLDivElement | null>, enabled: boolean) {
    const [token, setToken] = useState('');

    useEffect(() => {
        if (!enabled || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return;

        let intervalId: NodeJS.Timeout;
        const attempt = () => {
            const ts = window.turnstile;
            if (ts && containerRef.current) {
                try {
                    containerRef.current.innerHTML = '';
                    setToken('');
                    ts.render(containerRef.current, {
                        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
                        theme: 'dark',
                        callback: setToken,
                    });
                    if (intervalId) clearInterval(intervalId);
                } catch (e) {
                    console.error("Turnstile explicit render error:", e);
                }
            }
        };

        if (window.turnstile) {
            attempt();
        } else {
            intervalId = setInterval(attempt, 500);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [enabled, containerRef]);

    return { token, setToken };
}
