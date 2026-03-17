export const dynamic = 'force-static';
import { NextResponse } from 'next/server';
import profileData from '@/data/profile.json';

export async function GET() {
  return NextResponse.json(profileData);
}
