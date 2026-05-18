import { Resend } from 'resend';

// Initialize the Resend client using the API key from environment variables.
export const resend = new Resend(process.env.RESEND_API_KEY);

const TO_SENDER = 'Web Submission <no-reply@mrizkyp.my.id>';
const FROM_SENDER = 'MRizkyP Approval <no-reply@mrizkyp.my.id>';
const APP_URL = process.env.APP_URL || 'https://mrizkyp.my.id';

/**
 * Strips HTML tags to generate a plain-text fallback for email clients.
 */
function htmlToText(html: string): string {
    return html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&mdash;/g, '—')
        .replace(/&rarr;/g, '->')
        .replace(/&bull;/g, '•')
        .replace(/[ \t]{2,}/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

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
            from: TO_SENDER,
            to: [toEmail],
            subject: subject,
            html: htmlContent,
            text: htmlToText(htmlContent),
            headers: {
                'List-Unsubscribe': `<mailto:no-reply@mrizkyp.my.id?subject=unsubscribe>, <${APP_URL}>`,
                'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
                'X-Entity-Ref-ID': `portfolio-notification-${Date.now()}`,
            },
        });

        console.log(`Notification email sent: ${subject}`, data);
        return data;
    } catch (error) {
        // We catch the error so it doesn't crash the calling API route
        console.error('Failed to send email via Resend:', error);
        return null;
    }
}

/**
 * Sends an email to a specific address using Resend.
 * @param toEmail The recipient's email address
 * @param subject The subject of the email
 * @param htmlContent The HTML content of the email
 */
export async function sendEmailToAddress(toEmail: string, subject: string, htmlContent: string) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is not set. Skipping email notification.');
        return null;
    }

    try {
        const data = await resend.emails.send({
            from: FROM_SENDER,
            to: [toEmail],
            subject: subject,
            html: htmlContent,
            text: htmlToText(htmlContent),
            headers: {
                'List-Unsubscribe': `<mailto:no-reply@mrizkyp.my.id?subject=unsubscribe>, <${APP_URL}>`,
                'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
                'X-Entity-Ref-ID': `portfolio-endorsement-${Date.now()}`,
            },
        });

        console.log(`Email sent to ${toEmail}: ${subject}`, data);
        return data;
    } catch (error) {
        console.error('Failed to send email via Resend:', error);
        return null;
    }
}
