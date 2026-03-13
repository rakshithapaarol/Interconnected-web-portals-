# TaskFlow - Interconnected Web Portals

A Next.js application featuring an Admin Portal and a User Portal, both synchronized in real-time using Firebase Firestore.

## Features

### Admin Portal
- **Create Tasks:** Set title, description, and assign to specific users.
- **Real-time Tracking:** View all tasks and their live status updates as users progress.
- **Visual Feedback:** Status badges for Pending, In Progress, and Completed states.

### User Portal
- **Personal Workspace:** View only tasks assigned to your User ID.
- **Workflow Management:** Update task status through the lifecycle (Pending -> In Progress -> Completed).
- **One-click Completion:** Quick "Mark as Completed" button.

## Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Database:** [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Styling:** Vanilla CSS (Glassmorphism design)
- **Language:** TypeScript

---

## Getting Started

### 1. Clone & Install
```bash
# Navigate to project directory
cd taskFlow

# Install dependencies
npm install
```

### 2. Firebase Setup
To connect your own database:
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. In the project settings, add a "Web App" to get your configuration object.
4. Enable **Firestore Database** and create a database in "Test Mode" (or set rules to allow read/write).
5. Update `src/lib/firebase.ts` with your config or create a `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## Project Structure
- `src/app/admin`: Admin Portal page and logic.
- `src/app/user`: User Portal page with status controls.
- `src/lib/firebase.ts`: Firebase initialization.
- `src/lib/tasks.ts`: Data layer with Firestore listeners (`onSnapshot`).
- `src/app/globals.css`: Custom design system.

---

## Submission Details
- **Objective:** build two interconnected portals sharing the same Firestore database.
- **Developer:** Antigravity AI
