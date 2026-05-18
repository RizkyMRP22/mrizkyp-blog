import { sendNotificationEmail, sendEmailToAddress } from '@/lib/resend';
import { LeadItem } from '@/app/api/leads/route';
import { EndorsementItem } from '@/app/api/endorsements/route';

// ── HTML escape ────────────────────────────────────────────────────────────────
// Escapes user-supplied strings before interpolation into HTML email bodies,
// preventing HTML injection / XSS in the recipient's email client.
function htmlEscape(value: string | number | undefined | null): string {
    if (value === undefined || value === null) return '';
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Modern, clean inline email styles for high readability
const styles = {
    wrapper: `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; padding: 40px 20px;`,
    card: `max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;`,
    header: `background-color: #111827; color: #ffffff; padding: 24px 30px; text-align: center;`,
    headerTitle: `margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px;`,
    body: `padding: 30px; color: #374151;`,
    row: `margin-bottom: 16px; font-size: 15px;`,
    label: `font-weight: 600; color: #6b7280; display: block; margin-bottom: 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;`,
    value: `color: #111827; font-size: 16px;`,
    link: `color: #3b82f6; text-decoration: none; font-weight: 500;`,
    messageBox: `margin-top: 24px; padding: 20px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #3b82f6; font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #374151;`,
    button: `display: inline-block; padding: 14px 28px; background-color: #10b981; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 6px; text-align: center; margin-top: 30px; font-size: 16px; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);`,
    footer: `padding: 20px 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center; font-size: 13px; color: #6b7280;`
};

export const EmailService = {
    async sendNewLead(lead: LeadItem) {
        const subject = `New Lead: ${lead.opportunityType.toUpperCase()} - ${lead.fullName}`;
        const html = `
            <div style="${styles.wrapper}">
                <div style="${styles.card}">
                    <div style="${styles.header}">
                        <h1 style="${styles.headerTitle}">New Lead Opportunity</h1>
                    </div>
                    <div style="${styles.body}">
                        <div style="${styles.row}">
                            <span style="${styles.label}">Name</span>
                            <span style="${styles.value}">${htmlEscape(lead.fullName)}</span>
                        </div>
                        <div style="${styles.row}">
                            <span style="${styles.label}">Email</span>
                            <span style="${styles.value}"><a href="mailto:${htmlEscape(lead.email)}" style="${styles.link}">${htmlEscape(lead.email)}</a></span>
                        </div>
                        ${lead.company ? `
                        <div style="${styles.row}">
                            <span style="${styles.label}">Company</span>
                            <span style="${styles.value}">${htmlEscape(lead.company)}</span>
                        </div>` : ''}
                        ${lead.role ? `
                        <div style="${styles.row}">
                            <span style="${styles.label}">Role &amp; Opportunity</span>
                            <span style="${styles.value}">${htmlEscape(lead.role)} &mdash; <strong style="color: #3b82f6;">${htmlEscape(lead.opportunityType)}</strong></span>
                        </div>` : `
                        <div style="${styles.row}">
                            <span style="${styles.label}">Opportunity Type</span>
                            <span style="${styles.value}"><strong style="color: #3b82f6;">${htmlEscape(lead.opportunityType)}</strong></span>
                        </div>`}
                        ${lead.timeline ? `
                        <div style="${styles.row}">
                            <span style="${styles.label}">Timeline</span>
                            <span style="${styles.value}">${htmlEscape(lead.timeline)}</span>
                        </div>` : ''}
                        ${lead.linkedinUrl ? `
                        <div style="${styles.row}">
                            <span style="${styles.label}">LinkedIn</span>
                            <span style="${styles.value}"><a href="${htmlEscape(lead.linkedinUrl)}" style="${styles.link}">View Profile &rarr;</a></span>
                        </div>` : ''}

                        <div style="${styles.row}">
                            <span style="${styles.label}">Subject</span>
                            <span style="${styles.value}"><strong>${htmlEscape(lead.subject)}</strong></span>
                        </div>

                        <div style="${styles.label}; margin-top: 30px;">Message</div>
                        <div style="${styles.messageBox}">${htmlEscape(lead.message)}</div>
                    </div>
                    <div style="${styles.footer}">
                        Submitted via your Portfolio Contact Form &bull; ${new Date(lead.submittedAt || Date.now()).toLocaleDateString()}
                    </div>
                </div>
            </div>
        `;
        return sendNotificationEmail(subject, html);
    },

    async sendNewEndorsement(endorsement: EndorsementItem, endorsementId: string) {
        const appUrl = process.env.APP_URL || 'http://localhost:3000';
        const approveUrl = `${appUrl}/api/endorsements/approve?id=${endorsementId}`;

        const subject = `New Endorsement Pending: ${endorsement.fullName}`;
        const html = `
            <div style="${styles.wrapper}">
                <div style="${styles.card}">
                    <div style="${styles.header}">
                        <h1 style="${styles.headerTitle}">New Endorsement Submission</h1>
                    </div>
                    <div style="${styles.body}">
                        <div style="${styles.row}">
                            <span style="${styles.label}">Name</span>
                            <span style="${styles.value}">${htmlEscape(endorsement.fullName)}</span>
                        </div>
                        <div style="${styles.row}">
                            <span style="${styles.label}">Role &amp; Relation</span>
                            <span style="${styles.value}">${htmlEscape(endorsement.role)} (${htmlEscape(endorsement.relation)})</span>
                        </div>
                        ${endorsement.rating !== undefined ? `
                        <div style="${styles.row}">
                            <span style="${styles.label}">Rating</span>
                            <span style="${styles.value}"><span style="color: #10b981; font-weight: bold;">${htmlEscape(endorsement.rating)}</span> / 100</span>
                        </div>` : ''}
                        ${endorsement.linkedinUrl ? `
                        <div style="${styles.row}">
                            <span style="${styles.label}">LinkedIn</span>
                            <span style="${styles.value}"><a href="${htmlEscape(endorsement.linkedinUrl)}" style="${styles.link}">View Profile &rarr;</a></span>
                        </div>` : ''}

                        <div style="${styles.label}; margin-top: 30px;">Endorsement Message</div>
                        <div style="${styles.messageBox}">${htmlEscape(endorsement.description)}</div>

                        <div style="text-align: center;">
                            <a href="${approveUrl}" style="${styles.button}">Approve Endorsement &rarr;</a>
                        </div>
                    </div>
                    <div style="${styles.footer}">
        This endorsement requires your manual approval to display.<br/>
                        Submitted &bull; ${new Date(endorsement.createdAt || Date.now()).toLocaleDateString()}
                    </div>
                </div>
            </div>
        `;
        return sendNotificationEmail(subject, html);
    },

    async sendEndorsementApprovedNotification(endorsement: EndorsementItem) {
        if (!endorsement.email) return null;

        const appUrl = process.env.APP_URL || 'http://localhost:3000';
        const endorsementsUrl = `${appUrl}/endorsements`;

        const subject = `Your Endorsement is Now Live on mrizkyp.my.id`;
        const html = `
            <div style="${styles.wrapper}">
                <!-- Preheader (hidden preview text in inbox) -->
                <div style="display:none;max-height:0;overflow:hidden;font-size:1px;color:#f9fafb;">
                    Your endorsement has been approved and is now live! Click to see it on the website.
                    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
                </div>
                <div style="${styles.card}">
                    <div style="${styles.header}">
                        <h1 style="${styles.headerTitle}">Endorsement Approved!</h1>
                    </div>
                    <div style="${styles.body}">
                        <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-top: 0;">
                            Hi <strong>${htmlEscape(endorsement.fullName)}</strong>,
                        </p>
                        <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                            Thank you so much for taking the time to write an endorsement!
                            It has been reviewed, approved, and is now <strong>publicly visible</strong> on the website.
                        </p>

                        <div style="${styles.messageBox}">&ldquo;${htmlEscape(endorsement.description)}&rdquo;</div>

                        <div style="text-align: center;">
                            <a href="${endorsementsUrl}" style="${styles.button}">View it on the website &rarr;</a>
                        </div>
                    </div>
                    <div style="${styles.footer}">
                        You received this email because you submitted an endorsement on
                        <a href="${appUrl}" style="color: #3b82f6; text-decoration: none;">mrizkyp.my.id</a>
                        and opted in to receive approval notifications.<br/>
                        &copy; ${new Date().getFullYear()} MRizkyP Portfolio &bull; mrizkyp.my.id
                    </div>
                </div>
            </div>
        `;
        return sendEmailToAddress(endorsement.email, subject, html);
    }
};

/**
 * Generates the HTML for the success page shown after clicking the email approval link.
 */
export function generateApproveSuccessHtml(appUrl: string) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Endorsement Approved</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                .card { background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center; max-width: 400px; width: 100%; border: 1px solid #e5e7eb; box-sizing: border-box; }
                .icon { color: #10b981; font-size: 60px; margin-bottom: 20px; line-height: 1; }
                h1 { margin: 0 0 10px; color: #111827; font-size: 24px; font-weight: 600; }
                p { color: #6b7280; font-size: 16px; margin: 0 0 30px; line-height: 1.5; }
                .btn { display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 15px; box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2); }
                .btn:hover { background-color: #2563eb; }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="icon">✓</div>
                <h1>Endorsement Live!</h1>
                <p>This endorsement has been successfully approved and is now publicly visible on your website.</p>
                <a href="${appUrl}/endorsements" class="btn">View Website</a>
            </div>
        </body>
        </html>
    `;
}

/**
 * Generates the HTML for the page shown when an endorsement was already previously approved.
 */
export function generateAlreadyApprovedHtml(appUrl: string) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Already Approved</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                .card { background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center; max-width: 400px; width: 100%; border: 1px solid #e5e7eb; box-sizing: border-box; }
                .icon { color: #6b7280; font-size: 60px; margin-bottom: 20px; line-height: 1; }
                h1 { margin: 0 0 10px; color: #111827; font-size: 24px; font-weight: 600; }
                p { color: #6b7280; font-size: 16px; margin: 0 0 30px; line-height: 1.5; }
                .btn { display: inline-block; padding: 12px 24px; background-color: #f3f4f6; color: #374151; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 15px; border: 1px solid #d1d5db; transition: background-color 0.2s; }
                .btn:hover { background-color: #e5e7eb; }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="icon">ℹ️</div>
                <h1>Already Approved</h1>
                <p>This endorsement was already approved previously and is live on your website.</p>
                <a href="${appUrl}/endorsements" class="btn">Return to Website</a>
            </div>
        </body>
        </html>
    `;
}
