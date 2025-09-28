
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  await supabase.from('password_otps').insert({ email, otp, expires_at: expiresAt });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP is: ${otp}`,
  });
  res.json({ success: true });
});

app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const { data, error } = await supabase
    .from('password_otps')
    .select('*')
    .eq('email', email)
    .eq('otp', otp)
    .eq('verified', false)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  if (error || !data) return res.status(400).json({ error: 'Invalid OTP' });
  if (new Date(data.expires_at) < new Date()) return res.status(400).json({ error: 'OTP expired' });
  await supabase.from('password_otps').update({ verified: true }).eq('id', data.id);
  res.json({ success: true });
});

app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  
  try {
    console.log('Resetting password for email:', email);
    
    // First verify that OTP was verified for this email
    const { data: otpData, error: otpError } = await supabase
      .from('password_otps')
      .select('*')
      .eq('email', email)
      .eq('verified', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (otpError || !otpData) {
      console.log('OTP verification failed:', otpError);
      return res.status(400).json({ error: 'OTP not verified or expired' });
    }
    
    // Find user by email using admin API
    const { data: listResponse, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.log('Error listing users:', listError);
      return res.status(500).json({ error: 'Failed to find user' });
    }
    
    const user = listResponse.users.find(u => u.email === email);
    
    if (!user) {
      console.log('User not found with email:', email);
      return res.status(400).json({ error: 'User not found' });
    }
    
    console.log('Found user:', user.id);
    
    // Update password
    const { data, error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      password: newPassword
    });
    
    if (updateError) {
      console.log('Error updating password:', updateError);
      return res.status(400).json({ error: 'Failed to update password: ' + updateError.message });
    }
    
    console.log('Password updated successfully for user:', user.id);
    res.json({ success: true, message: 'Password updated successfully.' });
    
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`OTP backend running on port ${PORT}`));
