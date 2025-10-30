import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      console.log('Submitting email:', email);
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      
      // Insert email into Supabase
      const { data, error } = await supabase
        .from('waitlist')
        .insert([
          { 
            email: email,
            subscribed_at: new Date().toISOString()
          }
        ])
        .select();

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        // Check if it's a duplicate email error
        if (error.code === '23505') {
          setStatus('error');
          setMessage('This email is already on the waitlist!');
        } else {
          setStatus('error');
          setMessage(`Error: ${error.message || 'Something went wrong'}`);
        }
      } else {
        // Email successfully added to database, now send welcome email
        console.log('Sending welcome email to:', email);
        
        try {
          const emailResponse = await fetch('/api/send-welcome-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });

          const emailResult = await emailResponse.json();
          console.log('Email API response:', emailResult);

          if (!emailResult.success) {
            console.error('Failed to send welcome email, but user was added to waitlist');
          }
        } catch (emailError) {
          console.error('Error sending welcome email:', emailError);
          // Don't show error to user since they were successfully added to waitlist
        }

        setStatus('success');
        setMessage('Thanks for joining! Check your email for confirmation.');
        setEmail('');
        
        setTimeout(() => {
          setStatus('');
          setMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      setStatus('error');
      setMessage(`Error: ${error.message || 'Something went wrong. Please try again.'}`);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center">
  {/* Subtle Spotlight/Orb Glow Background - consulting.com style */}
  <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        
        {/* Large soft spotlight orb 1 */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.12) 35%, transparent 70%)',
            animation: 'spotlight-1 45s ease-in-out infinite alternate',
            filter: 'blur(60px)',
            willChange: 'transform, opacity',
            top: '10%',
            left: '-20%',
          }}
        />
        
        {/* Large soft spotlight orb 2 */}
        <div 
          className="absolute w-[900px] h-[900px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.10) 35%, transparent 70%)',
            animation: 'spotlight-2 50s ease-in-out infinite alternate',
            filter: 'blur(65px)',
            willChange: 'transform, opacity',
            bottom: '5%',
            right: '-25%',
          }}
        />
        
        {/* Medium spotlight orb 3 */}
        <div 
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.08) 40%, transparent 70%)',
            animation: 'spotlight-3 40s ease-in-out infinite alternate',
            filter: 'blur(55px)',
            willChange: 'transform, opacity',
            top: '40%',
            left: '30%',
          }}
        />
        
        {/* Sweeping satin ribbon bands for prominence */}
        <div
          className="absolute -left-1/3 -top-1/4 w-[180%] h-[60%]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 60%, transparent 100%)',
            filter: 'blur(40px)',
            animation: 'ribbon-sweep-1 36s ease-in-out infinite',
            mixBlendMode: 'screen',
            borderRadius: '80px',
            willChange: 'transform, opacity',
          }}
        />

        <div
          className="absolute -right-1/3 bottom-0 w-[180%] h-[55%]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 65%, transparent 100%)',
            filter: 'blur(36px)',
            animation: 'ribbon-sweep-2 40s ease-in-out infinite',
            mixBlendMode: 'screen',
            borderRadius: '80px',
            willChange: 'transform, opacity',
          }}
        />

        {/* Ambient background glow - static with pulse */}
        <div 
          className="absolute w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 55%)',
            animation: 'ambient-pulse 12s ease-in-out infinite',
            willChange: 'transform, opacity',
          }}
        />
      </div>

      {/* Minimal dark overlay for perfect text contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-black/5 to-black/20" />

      {/* Main Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        {/* Main Heading with Logo */}
        <div className="flex items-center justify-center gap-2 md:gap-3 lg:gap-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight leading-none md:whitespace-nowrap">
            Context Flow.
          </h1>
          <img 
            src="/logo.png" 
            alt="ContextFlow Logo" 
            className="h-[80px] md:h-[120px] lg:h-[160px] w-auto"
            style={{ 
              marginTop: '-0.2em',
              objectFit: 'contain',
              objectPosition: 'center',
              transform: 'scale(1.5)'
            }}
          />
        </div>

        {/* Subheading */}
        <p className="mt-4 text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90 tracking-tight">
          Coming Soon
        </p>

        {/* New Subheading */}
        <p className="mt-8 text-lg md:text-xl lg:text-2xl font-normal text-white/85 leading-relaxed max-w-3xl mx-auto">
          For the creators drowning in saved posts and notes — meet your clarity engine.
          Every week, get ideas, insights, and scripts built from what you consume with ContextFlow
        </p>

        {/* Waitlist Form */}
        <form onSubmit={handleSubmit} className="mt-12 max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={status === 'loading'}
              className="w-full sm:flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
            </button>
          </div>
          
          {/* Status Messages */}
          {message && (
            <p className={`mt-4 text-sm md:text-base font-medium transition-all duration-300 ${
              status === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {message}
            </p>
          )}
        </form>

        
      </div>

      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-white/5 to-transparent blur-2xl" />
    </div>
  );
}

export default App;
