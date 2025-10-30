# Supabase Setup Instructions

## Prerequisites
- A Supabase account and project (sign up at https://supabase.com)

## Step 1: Create the Database Table

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase-schema.sql`
4. Click **Run** to create the table and policies

## Step 2: Get Your Supabase Credentials

1. In your Supabase Dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. Open the `.env` file in your project root
2. Add your credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Open the app in your browser
3. Try submitting an email to the waitlist
4. Check your Supabase Dashboard → **Table Editor** → **waitlist** to see the new entry

## Security Features

- **Row Level Security (RLS)** is enabled
- Anonymous users can only INSERT emails (submit to waitlist)
- Only authenticated users can view the waitlist
- Duplicate emails are prevented with a UNIQUE constraint

## Viewing Your Waitlist

To view all waitlist subscribers:
1. Go to Supabase Dashboard → **Table Editor**
2. Select the **waitlist** table
3. You'll see all emails with timestamps

## Optional: Export Waitlist Data

You can export your waitlist to CSV from the Supabase Table Editor for use with email marketing tools.
