import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tnt-travel';

if (!mongoose.connections[0].readyState) {
  mongoose.connect(MONGODB_URI, { dbName: 'tnt-travel' });
}

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  password: String,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export async function POST(req: Request) {
  try {
    const { emailOrMobile, password } = await req.json();
    if (!emailOrMobile || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    // Find user by email or mobile
    const user = await User.findOne({ $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }] });
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }
    // Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Login successful', user: { name: user.name, email: user.email, mobile: user.mobile } });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    return NextResponse.json({ error: 'Server error', details: errorMessage }, { status: 500 });
  }
} 