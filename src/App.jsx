import { Routes, Route, Navigate, Outlet, Link } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NewTask from './pages/NewTask.jsx'
import EditTask from './pages/EditTask.jsx'
import AllTasks from './pages/AllTasks.jsx'
import { useAuth } from './context/AuthContext.jsx'

const Layout = () => {
  const { user, logout } = useAuth()
  return (
    <div>
      <nav className="nav">
        <div className="nav-inner container">
          <div className="brand">
            <span className="brand-badge">✓</span>
            Role Task Tracker
          </div>
          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            {user ? (
              <>
                <span className="muted" style={{fontSize:14}}>
                  {user.name} <span className="kbd">{user.role}</span>
                </span>
                <Link className="btn ghost" to="/dashboard">Dashboard</Link>
                <Link className="btn ghost" to="/tasks/new">New Task</Link>
                {user.role === 'admin' && <Link className="btn ghost" to="/admin/tasks">All Tasks</Link>}
                <button className="btn" onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link className="btn ghost" to="/login">Login</Link>
                <Link className="btn primary" to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </div>
  )
}

const Protected = ({ roles }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />
  return <Outlet />
}

const Unauthorized = () => (
  <div className="card">
    <h2>Unauthorized</h2>
    <p className="muted">You don't have permission to view this page.</p>
    <Link className="btn" to="/dashboard">Go to Dashboard</Link>
  </div>
)

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<Protected />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks/new" element={<NewTask />} />
          <Route path="tasks/:id/edit" element={<EditTask />} />
        </Route>

        <Route element={<Protected roles={['admin']} />}>
          <Route path="admin/tasks" element={<AllTasks />} />
        </Route>

        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<div className="card"><h2>404</h2><p>Not found</p></div>} />
      </Route>
    </Routes>
  )
}