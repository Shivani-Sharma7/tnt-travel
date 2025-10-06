import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tnt-travel';

// Connect to MongoDB
if (!mongoose.connections[0].readyState) {
  mongoose.connect(MONGODB_URI, { dbName: 'tnt-travel' });
}

// Visit log schema
const visitLogSchema = new mongoose.Schema({
  ipAddress: String,
  userAgent: String,
  page: String,
  referer: String,
  timestamp: { type: Date, default: Date.now },
  country: String,
  city: String,
  region: String,
  isp: String,
  userId: String, // If user is logged in
  sessionId: String,
  deviceType: String,
  browser: String,
  os: String,
});

const VisitLog = mongoose.models.VisitLog || mongoose.model('VisitLog', visitLogSchema);

// Function to get client IP address
function getClientIP(request: NextRequest): string {
  // Check various headers for IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  // Fallback to connection remote address
  return request.ip || 'unknown';
}

// Function to parse user agent
function parseUserAgent(userAgent: string) {
  const ua = userAgent.toLowerCase();
  
  let browser = 'Unknown';
  let os = 'Unknown';
  let deviceType = 'Desktop';
  
  // Browser detection
  if (ua.includes('chrome')) browser = 'Chrome';
  else if (ua.includes('firefox')) browser = 'Firefox';
  else if (ua.includes('safari')) browser = 'Safari';
  else if (ua.includes('edge')) browser = 'Edge';
  else if (ua.includes('opera')) browser = 'Opera';
  
  // OS detection
  if (ua.includes('windows')) os = 'Windows';
  else if (ua.includes('mac')) os = 'macOS';
  else if (ua.includes('linux')) os = 'Linux';
  else if (ua.includes('android')) os = 'Android';
  else if (ua.includes('ios')) os = 'iOS';
  
  // Device type detection
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    deviceType = 'Mobile';
  } else if (ua.includes('tablet') || ua.includes('ipad')) {
    deviceType = 'Tablet';
  }
  
  return { browser, os, deviceType };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page, userId, sessionId } = body;
    
    // Get client information
    const ipAddress = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const referer = request.headers.get('referer') || 'Direct';
    
    // Parse user agent
    const { browser, os, deviceType } = parseUserAgent(userAgent);
    
    // Create visit log entry
    const visitLog = new VisitLog({
      ipAddress,
      userAgent,
      page,
      referer,
      userId: userId || null,
      sessionId: sessionId || null,
      browser,
      os,
      deviceType,
    });
    
    await visitLog.save();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Visit logged successfully',
      logId: visitLog._id 
    });
    
  } catch (error) {
    console.error('Error logging visit:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log visit' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve visit logs (for admin purposes)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 50;
    const userId = searchParams.get('userId');
    
    const query: any = {};
    if (userId) {
      query.userId = userId;
    }
    
    const visits = await VisitLog.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit.toString()) * 1)
      .skip((parseInt(page.toString()) - 1) * parseInt(limit.toString()));
    
    const total = await VisitLog.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: visits,
      pagination: {
        page: parseInt(page.toString()),
        limit: parseInt(limit.toString()),
        total,
        pages: Math.ceil(total / parseInt(limit.toString()))
      }
    });
    
  } catch (error) {
    console.error('Error fetching visit logs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch visit logs' },
      { status: 500 }
    );
  }
}
