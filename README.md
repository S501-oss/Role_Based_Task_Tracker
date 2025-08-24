# Role-Based Task Tracker (React + Vite, Static Data)

A simple role-based task tracker with **Admin** and **Member** roles. No backend – data is stored in `localStorage`. Includes login, registration, role-protected routes, task creation, status updates, and dashboards for:
- **Tasks assigned to me**
- **Tasks I assigned to others**

> ⚠️ For demo only. Passwords are stored in `localStorage` in plain text. Do not use as-is in production.

## Demo Credentials

- Admin: `admin@demo.com` / `admin123`
- Member: `member@demo.com` / `member123`

---

## Quick Start

```bash
npm install
npm run dev
# open the printed localhost URL
```

## Folder Structure

```text
role-task-tracker-react/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── index.css
    ├── main.jsx
    ├── App.jsx
    ├── utils/
    │   └── storage.js
    ├── context/
    │   ├── AuthContext.jsx
    │   └── DataContext.jsx
    ├── pages/
    │   ├── Login.jsx
    │   ├── Register.jsx
    │   ├── Dashboard.jsx
    │   ├── NewTask.jsx
    │   ├── EditTask.jsx
    │   └── AllTasks.jsx   # Admin only
    └── components/ (kept for future components)
```

## Features Checklist

- ✅ Authentication: login, register; roles: **admin**, **member**
- ✅ Role-based access: `/admin/tasks` is **admin-only**
- ✅ Create task: title, description, assignee, status
- ✅ Dashboard: "assigned to me" & "assigned by me"
- ✅ Update status: allowed to **assignee or creator**
- ✅ Edit/delete: **only the creator** can edit or delete a task
- ✅ Clean UI (no external UI libraries) 

## Implementation Notes

- Data is seeded once with two users and two example tasks. State is persisted to `localStorage`:
  - `users`: all registered users
  - `tasks`: created tasks
  - `currentUser`: logged in user
- IDs are generated with a simple helper (non-secure).
- For simplicity, registration lets you pick a role. In a real app, only admins should set roles.

## How to Reset Demo Data

Open DevTools console and run:
```js
localStorage.clear()
location.reload()
```

## Extend Ideas

- Add filters and grouping on dashboard
- Add comments/attachments to tasks
- Add pagination and sorting
- Replace localStorage with an API (Express, Firebase, Supabase)