# Plan - Future Bloom Marketing Manager

Building a complete, responsive marketing campaign and task manager called **Future Bloom** using React, TypeScript, Tailwind CSS, and Lovable Cloud.

## Design System

- **Primary Color:** Deep Purple (oklch(0.45 0.25 285))
- **Accents:** Pink gradients, light backgrounds, soft borders, discrete shadows.
- **Typography:** Modern sans-serif (Inter/Geist).
- **Layout:** Sidebar navigation for desktop, bottom/compact navigation for mobile.

## Backend Schema (Lovable Cloud)

### Table: `profiles`
- `id`: uuid (PK, references auth.users)
- `full_name`: text
- `avatar_url`: text
- `theme_preference`: text ('light' | 'dark')
- `updated_at`: timestamptz

### Table: `campaigns`
- `id`: uuid (PK)
- `user_id`: uuid (FK to auth.users)
- `name`: text (required)
- `description`: text
- `channel`: text (Instagram, Facebook, Google, WhatsApp, Email, TikTok, Others)
- `budget`: numeric
- `start_date`: date
- `end_date`: date
- `status`: text (planning, active, paused, completed)
- `color`: text (hex/identifier)
- `created_at`: timestamptz

### Table: `tasks`
- `id`: uuid (PK)
- `user_id`: uuid (FK to auth.users)
- `campaign_id`: uuid (FK to campaigns, optional)
- `title`: text (required)
- `description`: text
- `due_date`: date
- `priority`: text (low, medium, high)
- `status`: text (pending, in_progress, completed)
- `created_at`: timestamptz

## RLS Policies
- Enable RLS on all tables.
- `profiles`: Users can read/write their own profile.
- `campaigns`: Users can read/write only their own campaigns (`user_id = auth.uid()`).
- `tasks`: Users can read/write only their own tasks (`user_id = auth.uid()`).

## Implementation Steps

### 1. Infrastructure & Auth
- Enable Lovable Cloud.
- Create migrations for `profiles`, `campaigns`, and `tasks` with RLS and GRANTS.
- Set up auth routes (`/auth/login`, `/auth/register`, `/auth/reset-password`).
- Implement Auth context/hooks.

### 2. Design System & Global Styles
- Update `src/styles.css` with Future Bloom tokens.
- Set up Lucide icons and basic UI components (Buttons, Cards, Inputs, Toasts).

### 3. Public Landing Page
- Build Hero, Benefits, Demo, How it Works, CTA, and Footer.
- Ensure "Start Free" leads to registration.

### 4. Authenticated Layout
- Create a Sidebar/Mobile Nav layout wrapper.
- Add user profile dropdown and theme toggle.

### 5. Dashboard
- Summary cards (Total campaigns, Active, Tasks stats).
- Simple bar/pie chart for task status.
- Recent activity lists.

### 6. Campaign Management
- List view with search and status filters.
- Create/Edit/Delete modals/forms.
- Details page with related tasks.

### 7. Task Management
- List view with filters (status, priority) and search.
- Inline creation/editing.
- Confirmation dialogs for deletions.

### 8. User Profile & Settings
- Update name, view email, toggle theme.

### 9. Polish & QA
- Add skeletons/loading states.
- Custom 404 and Error pages.
- Mobile responsiveness check.
- Form validations with Zod.

## Technical Details

- **Framework:** TanStack Start v1 (React 19).
- **Styling:** Tailwind CSS v4.
- **Database:** Supabase (via Lovable Cloud).
- **Icons:** Lucide-react.
- **Charts:** Recharts.
- **Components:** Shadcn UI (customized).
