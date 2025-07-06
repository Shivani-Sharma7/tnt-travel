import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tnt-travel';

// Connect to MongoDB
if (!mongoose.connections[0].readyState) {
  mongoose.connect(MONGODB_URI, { dbName: 'tnt-travel' });
}

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  password: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export async function POST(req: Request) {
  try {
    const { name, email, mobile, password, address, city, state, pincode } = await req.json();
    if (!name || !email || !mobile || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    // Check for existing user
    const existing = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existing) {
      return NextResponse.json({ error: 'User already exists.' }, { status: 409 });
    }
    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    // Create user
    const user = await User.create({ 
      name, 
      email, 
      mobile, 
      password: hashed,
      address: address || '',
      city: city || '',
      state: state || '',
      pincode: pincode || ''
    });
    return NextResponse.json({ 
      message: 'Signup successful', 
      user: { 
        name: user.name, 
        email: user.email, 
        mobile: user.mobile,
        address: user.address,
        city: user.city,
        state: user.state,
        pincode: user.pincode
      } 
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    return NextResponse.json({ error: 'Server error', details: errorMessage }, { status: 500 });
  }
} 