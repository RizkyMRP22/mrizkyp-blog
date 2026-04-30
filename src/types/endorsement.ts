export interface Endorsement {
    _id: string;
    fullName: string;
    role: string;
    relation: string;
    description: string;
    linkedinUrl?: string;
    rating?: number;
    isApprove: boolean;
    createdAt: string;
    ipAddress?: string;
}
