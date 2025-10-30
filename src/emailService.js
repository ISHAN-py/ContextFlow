import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email) {
  try {
    const data = await resend.emails.send({
      from: 'ContextFlow <onboarding@resend.dev>',
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
              }
              .header {
                background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
                color: white;
                padding: 40px 20px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #ffffff;
                padding: 40px 30px;
                border-radius: 0 0 10px 10px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
                padding-top: 20px;
                border-top: 1px solid #eee;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 32px;">Context Flow.</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Your Clarity Engine</p>
            </div>
            <div class="content">
              <h2>Welcome to the Waitlist! 🎉</h2>
              <p>Hey there,</p>
              <p>Thanks for joining the <strong>ContextFlow</strong> waitlist! You're one step closer to reclaiming your attention and transforming your scattered digital life into synthesized, queryable knowledge.</p>
              
              <p><strong>What's ContextFlow?</strong></p>
              <p>For creators drowning in saved posts and notes — we're your clarity engine. Every week, get ideas, insights, and scripts built from what you consume with ContextFlow.</p>
              
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>You'll be among the first to know when we launch</li>
                <li>Get exclusive early access to the platform</li>
                <li>Receive updates on our development progress</li>
              </ul>
              
              <p>We're building something special, and we can't wait to share it with you!</p>
              
              <p>Stay tuned! 🚀</p>
              
              <p>Best regards,<br>
              <strong>The ContextFlow Team</strong></p>
              
              <div class="footer">
                <p>You're receiving this email because you signed up for the ContextFlow waitlist.</p>
                <p>© 2025 ContextFlow. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error };
  }
}
