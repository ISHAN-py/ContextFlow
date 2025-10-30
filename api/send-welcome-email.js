import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Send welcome email
    const data = await resend.emails.send({
      from: 'Ishan from ContextFlow <ishansrivastava@contextflow.tech>',
      to: email,
      subject: 'Welcome to ContextFlow! 🚀',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
              }
              .container {
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              }
              .header {
                background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
                color: white;
                padding: 40px 20px;
                text-align: center;
              }
              .content {
                padding: 40px 30px;
              }
              .button {
                display: inline-block;
                background: #000000;
                color: white !important;
                padding: 14px 30px;
                text-decoration: none;
                border-radius: 25px;
                margin: 20px 0;
                font-weight: 600;
              }
              .footer {
                text-align: center;
                color: #666;
                font-size: 12px;
                margin-top: 30px;
                padding: 20px 30px;
                background: #f9f9f9;
                border-top: 1px solid #eee;
              }
              ul {
                padding-left: 20px;
              }
              li {
                margin: 10px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 32px; font-weight: 800;">Context Flow.</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Your Clarity Engine</p>
              </div>
              <div class="content">
                <h2 style="color: #000; margin-top: 0;">Welcome to the Waitlist! 🎉</h2>
                <p>Hey there,</p>
                <p>Thanks for joining the <strong>ContextFlow</strong> waitlist! You're one step closer to reclaiming your attention and transforming your scattered digital life into synthesized, queryable knowledge.</p>
                
                <p style="margin-top: 30px;"><strong>What's ContextFlow?</strong></p>
                <p>For creators drowning in saved posts and notes — we're your clarity engine. Every week, get ideas, insights, and scripts built from what you consume with ContextFlow.</p>
                
                <p style="margin-top: 30px;"><strong>What happens next?</strong></p>
                <ul>
                  <li>You'll be among the first to know when we launch</li>
                  <li>Get exclusive early access to the platform</li>
                  <li>Receive updates on our development progress</li>
                  <li>Special perks for early supporters</li>
                </ul>
                
                <p style="margin-top: 30px;">We're building something special, and we can't wait to share it with you!</p>
                
                <p style="margin-top: 30px;">Stay tuned! 🚀</p>
                
                <p style="margin-top: 40px;">Best regards,<br>
                <strong>The ContextFlow Team</strong></p>
              </div>
              <div class="footer">
                <p>You're receiving this email because you signed up for the ContextFlow waitlist.</p>
                <p style="margin-top: 10px;">© 2025 ContextFlow. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to send email' 
    });
  }
}
