# Role-Based Task Tracker (React + Vite, Static Data)

A simple role-based task tracker with **Admin** and **Member** roles. No backend – data is stored in `localStorage`. Includes login, registration, role-protected routes, task creation, status updates, and dashboards for:

- **Tasks assigned to me**
- **Tasks I assigned to others**

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

## Features Checklist

- ✅ Authentication: login, register; roles: **admin**, **member**
- ✅ Role-based access: `/admin/tasks` is **admin-only**
- ✅ Create task: title, description, assignee, status
- ✅ Dashboard: "assigned to me" & "assigned by me"
- ✅ Update status: allowed to **assignee or creator**
- ✅ Edit/delete: **only the creator** can edit or delete a task
- ✅ Clean UI (no external UI libraries)

## How to Reset Demo Data

Open DevTools console and run:

```js
localStorage.clear();
location.reload();
```
