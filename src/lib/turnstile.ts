export interface TurnstileResult {
    success: boolean;
    error?: string;
}

/**
 * Verifies a Cloudflare Turnstile token server-side.
 * If the TURNSTILE_SECRET_KEY environment variable is not set, verification is skipped.
 * 
 * @param token The cf-turnstile-response string passed from the client
 * @returns A boolean indicating success and an optional error message if validation failed.
 */
export async function verifyTurnstileToken(token: string | undefined | null): Promise<TurnstileResult> {
    const secretKey = process.env.TURNSTILE_SECRET_KEY;

    if (!secretKey) {
        // Bypass if no secret key is configured (useful for certain test environments without dummy keys)
        return { success: true };
    }

    if (!token) {
        return { success: false, error: 'CAPTCHA token is missing. Please refresh and try again.' };
    }

    try {
        const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${secretKey}&response=${token}`,
        });

        const verifyData = await verifyRes.json();

        if (!verifyData.success) {
            console.error('Turnstile verification failed:', verifyData['error-codes']);
            return { success: false, error: 'CAPTCHA verification failed. Are you a bot?' };
        }

        return { success: true };
    } catch (error) {
        console.error('Turnstile verification network error:', error);
        return { success: false, error: 'Could not verify CAPTCHA. Please try again later.' };
    }
}
