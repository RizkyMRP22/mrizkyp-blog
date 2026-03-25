export const dynamic = 'force-static';
import { NextResponse } from 'next/server';

export interface ProfileItem {
  photo: string;
  name: string;
  nickName: string;
  title: string;
  titles: string[];
  tagline: string;
  bio: string;
  philosophy: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  avatar: string;
  resumeUrl: string;
  stats: {
    yearsExperience: number;
    projectsCompleted: number;
    bugsFound: number;
    testCasesWritten: number;
  };
  education: {
    degree: string;
    institution: string;
    period: string;
  }[];
  openFor: string[];
}

export async function getProfiles(): Promise<ProfileItem> {
  try {
    const response = await fetch(`${process.env.API_BASEURL}/profiles` as string, {
      headers: {
        'x-api-key': process.env.API_KEY as string
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.error('Failed to fetch profile data');
      return response as any;
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;
  }
}

// export async function GET() {
//   return NextResponse.json(profileData);
// }

export async function GET() {
  const data = await getProfiles();
  return NextResponse.json(data);
}
