-- Create the waitlist table in your Supabase project
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create an index on subscribed_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_subscribed_at ON waitlist(subscribed_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert to waitlist" ON waitlist;
DROP POLICY IF EXISTS "Authenticated users can read waitlist" ON waitlist;

-- Create a policy to allow anyone (including anonymous users) to insert
CREATE POLICY "Enable insert for anonymous users" 
ON waitlist 
FOR INSERT 
TO public
WITH CHECK (true);

-- Create a policy to allow authenticated users to read (for admin purposes)
CREATE POLICY "Enable read for authenticated users" 
ON waitlist 
FOR SELECT 
TO authenticated 
USING (true);

-- Optional: Create a view to see waitlist stats (only accessible by authenticated users)
CREATE OR REPLACE VIEW waitlist_stats AS
SELECT 
  COUNT(*) as total_subscribers,
  COUNT(CASE WHEN subscribed_at >= NOW() - INTERVAL '24 hours' THEN 1 END) as last_24h,
  COUNT(CASE WHEN subscribed_at >= NOW() - INTERVAL '7 days' THEN 1 END) as last_7d,
  COUNT(CASE WHEN subscribed_at >= NOW() - INTERVAL '30 days' THEN 1 END) as last_30d
FROM waitlist;
