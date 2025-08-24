import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useData } from '../context/DataContext.jsx'

const Status = ({ s }) => <span className={'status ' + s.toLowerCase().replace(' ', '')}>{s}</span>

const TaskRow = ({ t, users, currentUser }) => {
  const creator = users.find(u => u.id === t.creatorId)
  const assignee = users.find(u => u.id === t.assigneeId)
  const canEdit = currentUser.id === t.creatorId
  return (
    <div className="card" style={{display:'grid', gap:8}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
        <h3 style={{margin:0}}>{t.title}</h3>
        <Status s={t.status} />
      </div>
      <p className="muted" style={{marginTop:-6}}>{t.description}</p>
      <div className="muted" style={{display:'flex', gap:16, fontSize:14}}>
        <span>Assignee: <b>{assignee?.name}</b></span>
        <span>Creator: <b>{creator?.name}</b></span>
      </div>
      <div style={{display:'flex', gap:8}}>
        {canEdit && <Link className="btn" to={`/tasks/${t.id}/edit`}>Edit</Link>}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const { tasks, users } = useData()

  const assignedToMe = tasks.filter(t => t.assigneeId === user.id)
  const iAssigned = tasks.filter(t => t.creatorId === user.id)

  return (
    <div className="grid" style={{gap:16}}>
      <div className="card">
        <h2 style={{marginTop:0}}>Dashboard</h2>
        <p className="muted">Your quick view. Update statuses from the <b>All Tasks</b> or <b>Edit</b> pages.</p>
        <div style={{display:'flex', gap:12}}>
          <div className="card" style={{minWidth:180}}>
            <div className="muted" style={{fontSize:12}}>Assigned to me</div>
            <div style={{fontSize:28, fontWeight:800}}>{assignedToMe.length}</div>
          </div>
          <div className="card" style={{minWidth:180}}>
            <div className="muted" style={{fontSize:12}}>Assigned by me</div>
            <div style={{fontSize:28, fontWeight:800}}>{iAssigned.length}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <section className="card">
          <h3 style={{marginTop:0}}>Tasks assigned to me</h3>
          <div className="list">
            {assignedToMe.length === 0 && <p className="muted">No tasks yet.</p>}
            {assignedToMe.map(t => <TaskRow key={t.id} t={t} users={users} currentUser={user} />)}
          </div>
        </section>
        <section className="card">
          <h3 style={{marginTop:0}}>Tasks I assigned to others</h3>
          <div className="list">
            {iAssigned.length === 0 && <p className="muted">No tasks yet.</p>}
            {iAssigned.map(t => <TaskRow key={t.id} t={t} users={users} currentUser={user} />)}
          </div>
        </section>
      </div>
    </div>
  )
}