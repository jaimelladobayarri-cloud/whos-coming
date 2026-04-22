# Who's Coming? — Setup Guide

## 1. Supabase — Create the database table

1. Go to your Supabase project → SQL Editor
2. Paste the contents of `supabase-setup.sql` and click Run
3. That's it — the table is ready

## 2. GitHub — Upload the project

1. Create a new repository on github.com (name it `whos-coming`)
2. Upload all the files in this folder keeping the same structure:
   ```
   whos-coming/
   ├── index.html
   ├── package.json
   ├── vite.config.js
   └── src/
       ├── main.jsx
       ├── App.jsx
       └── supabase.js
   ```

## 3. Vercel — Publish the app

1. Go to vercel.com and sign up with your GitHub account
2. Click "Add New Project"
3. Select your `whos-coming` repository
4. Vercel auto-detects it as a Vite project — click Deploy
5. In ~1 minute you get a live URL like `whos-coming.vercel.app`

## 4. iPhone — Add to home screen

1. Open the URL in Safari on your iPhone
2. Tap the Share button (box with arrow)
3. Tap "Add to Home Screen"
4. Name it "Who's Coming?" and tap Add
5. The app appears on your home screen like a native app

## Updating the app

When Claude makes changes:
1. Download the new `App.jsx` file
2. Replace the old one in your GitHub repository
3. Vercel automatically redeploys in ~30 seconds
