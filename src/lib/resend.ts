import { Resend } from 'resend';

// Initialize the Resend client using the API key from environment variables.
export const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends an email notification using Resend.
 * @param subject The subject of the email
 * @param htmlContent The HTML content of the email
 */
export async function sendNotificationEmail(subject: string, htmlContent: string) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is not set. Skipping email notification.');
        return null; // Fail gracefully
    }

    const toEmail = process.env.NOTIFICATION_EMAIL;
    if (!toEmail) {
        console.warn('NOTIFICATION_EMAIL is not set. Skipping email notification.');
        return null; // Fail gracefully
    }

    try {
        const data = await resend.emails.send({
            from: 'Portfolio Notification <onboarding@resend.dev>', 
            to: [toEmail],
            subject: subject,
            html: htmlContent,
        });

        console.log(`Notification email sent: ${subject}`, data);
        return data;
    } catch (error) {
        // We catch the error so it doesn't crash the calling API route
        console.error('Failed to send email via Resend:', error);
        return null;
    }
}
