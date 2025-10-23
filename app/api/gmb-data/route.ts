import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // GMB integration is temporarily disabled
  return NextResponse.json({
    success: false,
    error: 'Service Disabled',
    message: 'Google My Business integration is currently disabled',
    details: 'This feature is temporarily unavailable while being configured.'
  }, { status: 503 });
}
