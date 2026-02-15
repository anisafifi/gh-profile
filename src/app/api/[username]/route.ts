import { NextRequest, NextResponse } from 'next/server';
import { getUserData, getLangData, getRepoData, getRateLimit } from '@/actions/user';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  const rateLimit = await getRateLimit();
  
  if (rateLimit && rateLimit.remaining < 1) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 403 });
  }

  const [userResult, langResult, repoResult] = await Promise.all([
    getUserData(username),
    getLangData(username),
    getRepoData(username),
  ]);

  const response = {
    userData: userResult.data,
    langData: langResult.data,
    repoData: repoResult.data,
    error: userResult.error || langResult.error || repoResult.error,
    rateLimit,
  };

  return NextResponse.json(response);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  // For POST, we'll do the same as GET for simplicity
  return GET(request, { params });
}