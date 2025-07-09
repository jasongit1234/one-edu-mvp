# ONE EDU MVP - Setup Instructions

## Overview
This is the ONE EDU MVP project, implementing a simplified authentication system with child profiles and AI mentor chat functionality.

## Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Supabase account

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to find your project URL and anon key
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
OPENAI_API_KEY=your-openai-api-key
```

**⚠️ Important:** For AI Mentor Chat functionality, you'll need an **OpenAI API key**. Get yours at [platform.openai.com](https://platform.openai.com/api-keys)

### 3. Set up Database Tables

Go to your Supabase SQL Editor and run the database schema:

**📋 Go to:** https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql

**Copy and paste the contents of the `database/schema.sql` file:**

The schema includes:
- Enhanced child profiles with avatar emojis and interests
- User preferences for parent/child switching
- Comprehensive Row Level Security (RLS) policies

### 4. Configure Authentication

1. Go to Authentication > Settings in your Supabase dashboard
2. Turn off "Enable email confirmations" for development (optional)
3. Set up any additional authentication providers if needed

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
src/
├── app/
│   ├── auth/                    # Authentication page (login/signup)
│   ├── child-onboarding/        # Child profile creation/editing
│   ├── parent-dashboard/        # Parent dashboard for managing child profiles
│   ├── mentor-chat/             # AI mentor chat interface
│   ├── xp-dashboard/            # XP and achievement system (localStorage-based)
│   └── layout.tsx               # Root layout with AuthProvider
├── contexts/
│   └── AuthContext.tsx          # Authentication context
├── components/
│   └── LoadingSpinner.tsx       # Loading spinner component
└── lib/
    ├── supabase.ts              # Supabase client configuration
    ├── openai.ts                # OpenAI integration
    └── mock-xp-system.ts        # Mock XP system for MVP
```

## User Flow

1. **Landing Page** (`/`) - Redirects based on authentication state
2. **Authentication** (`/auth`) - Login/signup with email/password
3. **Child Onboarding** (`/child-onboarding`) - Create/edit child profile
4. **Parent Dashboard** (`/parent-dashboard`) - Parent dashboard for managing child profiles
5. **Mentor Chat** (`/mentor-chat`) - Chat with AI mentor Astra
6. **XP Dashboard** (`/xp-dashboard`) - View achievements and progress

## Features Implemented

✅ **Authentication:**
- Supabase email/password authentication
- Simplified user flow without role selection
- Child profile creation and management

✅ **AI Mentor Chat:**
- Chat with GPT-4o powered AI mentor "Astra"
- Child-friendly personality and safety guidelines
- Personalized responses based on child profile
- Real-time chat interface with animations

✅ **XP Dashboard (UI-Only MVP):**
- Achievement system using localStorage
- Badge collection and progression
- Daily streaks and engagement tracking
- Visual progress indicators
- Integrated XP earning through chat

✅ **Parent Dashboard:**
- Parent dashboard for managing child profiles
- Quick actions and learning resources
- Child management features (coming soon)

## Database Schema

### child_profiles
- `id` (UUID) - Primary key
- `user_id` (UUID) - References auth.users
- `name` (VARCHAR) - Child's name
- `age` (INTEGER) - Child's age (8-13)
- `interests` (TEXT) - Child's interests
- `avatar_emoji` (VARCHAR) - Child's avatar emoji
- `is_primary` (BOOLEAN) - Primary child profile flag
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

### user_preferences
- `id` (UUID) - Primary key
- `user_id` (UUID) - References auth.users
- `display_name` (VARCHAR) - User display name
- `preferred_child_profile_id` (UUID) - Default child profile
- `enable_parent_dashboard` (BOOLEAN) - Parent dashboard access
- `email_notifications` (BOOLEAN) - Email notification preferences
- `weekly_reports` (BOOLEAN) - Weekly report preferences

## Troubleshooting

### Common Issues

1. **Authentication not working**
   - Check your Supabase URL and keys in `.env.local`
   - Make sure RLS policies are set up correctly

2. **Database errors**
   - Ensure all tables are created with the correct schema
   - Check that RLS policies allow the operations you're trying to perform

3. **Chat not working**
   - Verify your OpenAI API key is set correctly
   - Check browser console for any errors

4. **XP Dashboard empty**
   - The XP system uses localStorage - make sure browser storage is enabled
   - Chat with the mentor to start earning XP

### Environment Variables
Make sure your `.env.local` file is properly configured and not committed to version control (it should be in `.gitignore`).

## Architecture Notes

- **Simplified Authentication**: No role-based system - users go directly to child onboarding
- **Multiple Child Profiles**: One user account can have multiple child profiles
- **localStorage XP System**: XP and achievements are stored locally for MVP simplicity
- **Supabase Integration**: Real-time data with Row Level Security
- **AI Safety**: Child-appropriate conversations with safety guidelines

## Next Steps

For production deployment:
1. Enable email confirmations in Supabase
2. Set up proper error monitoring
3. Implement backend XP system (replace localStorage)
4. Add chat history persistence
5. Implement parent progress insights 