import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { generateApproveSuccessHtml, generateAlreadyApprovedHtml, EmailService } from '@/lib/emails';
import { EndorsementItem } from '@/app/api/endorsements/route';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id');

        // Basic validation for MongoDB ObjectId
        if (!id || typeof id !== 'string' || id.length !== 24) {
            return new NextResponse('Invalid ID format missing', { status: 400 });
        }

        const db = await getDb();
        
        // Find the endorsement first to check its current status
        const endorsement = await db.collection('endorsements').findOne({ _id: new ObjectId(id) });

        if (!endorsement) {
            return new NextResponse('Endorsement not found', { status: 404 });
        }

        const appUrl = process.env.APP_URL || 'http://localhost:3000';

        // Check if it's already approved to prevent redundant saves and show clear UI
        if (endorsement.isApprove) {
            const html = generateAlreadyApprovedHtml(appUrl);
            return new NextResponse(html, {
                status: 200,
                headers: { 'Content-Type': 'text/html' }
            });
        }

        // Update the endorsement to be approved
        await db.collection('endorsements').updateOne(
            { _id: new ObjectId(id) },
            { $set: { isApprove: true } }
        );

        // Send a notification email to the friend who submitted the endorsement
        if (endorsement.email) {
            await EmailService.sendEndorsementApprovedNotification(endorsement as unknown as EndorsementItem);
        }

        // Return a beautifully styled HTML response for the user
        const html = generateApproveSuccessHtml(appUrl);

        return new NextResponse(html, {
            status: 200,
            headers: { 'Content-Type': 'text/html' }
        });

    } catch (error) {
        console.error('Error approving endorsement:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
