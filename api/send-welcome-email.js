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
              .highlight {
                background: #f0f0f0;
                padding: 20px;
                border-radius: 8px;
                margin: 25px 0;
                border-left: 4px solid #000;
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
              strong {
                color: #000;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 32px; font-weight: 800;">Context Flow.</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Stop drowning in saved tabs.</p>
              </div>
              <div class="content">
                <h2 style="color: #000; margin-top: 0;">Welcome to the Waitlist! 🎉</h2>
                <p>Hey there,</p>
                <p>Thanks for joining the <strong>ContextFlow</strong> waitlist! You're taking the first step toward transforming your digital chaos into clarity and creation.</p>
                
                <div class="highlight">
                  <p style="margin: 0; font-size: 16px; line-height: 1.7;">
                    <strong>You scroll, save, and learn — we turn it all into weekly content gold.</strong><br>
                    Your ideas, synthesized and ready to create.
                  </p>
                </div>
                
                <p style="margin-top: 30px;"><strong>What is ContextFlow?</strong></p>
                <p>Your personal AI that organizes everything you consume into insights and content ideas. We're turning your saved content, notes, and links into weekly idea digests and actionable scripts — powered by AI.</p>
                
                <p style="margin-top: 30px;"><strong>What you'll get:</strong></p>
                <ul>
                  <li><strong>Weekly content gold</strong> — synthesized from everything you save</li>
                  <li><strong>Actionable scripts</strong> — ready-to-use content ideas</li>
                  <li><strong>AI-powered insights</strong> — your consumption, organized</li>
                  <li><strong>Early access</strong> — be the first to create smarter, not harder</li>
                </ul>
                
                <div class="highlight">
                  <p style="margin: 0; font-style: italic; text-align: center;">
                    Focus less on collecting, and more on creating.
                  </p>
                </div>
                
                <p style="margin-top: 30px;">Coming soon to help you create smarter, not harder. We'll keep you updated on our progress and let you know the moment we launch.</p>
                
                <p style="margin-top: 30px;">Stay tuned! 🚀</p>
                
                <p style="margin-top: 40px;">Best regards,<br>
                <strong>Ishan & The ContextFlow Team</strong></p>
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
