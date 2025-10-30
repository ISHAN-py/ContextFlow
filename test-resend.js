import { Resend } from 'resend';
import 'dotenv/config';

const resend = new Resend(process.env.RESEND_API_KEY);

async function testResend() {
  try {
    console.log('Testing Resend email...');
    
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'contextflow.tech@gmail.com',
      subject: 'Hello World - Test Email',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });

    console.log('✅ Email sent successfully!');
    console.log('Response:', data);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

testResend();
