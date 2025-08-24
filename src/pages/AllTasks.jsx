import { useMemo, useState } from 'react'
import { useData } from '../context/DataContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const Status = ({ s }) => <span className={'status ' + s.toLowerCase().replace(' ', '')}>{s}</span>

export default function AllTasks() {
  const { tasks, users, updateTask } = useData()
  const { user } = useAuth()
  const [filter, setFilter] = useState('')

  const rows = useMemo(() => {
    const lower = filter.trim().toLowerCase()
    return tasks.filter(t =>
      !lower ||
      t.title.toLowerCase().includes(lower) ||
      t.description.toLowerCase().includes(lower)
    )
  }, [tasks, filter])

  const onStatusChange = (id, status) => {

    const t = tasks.find(x => x.id === id)
    if (!t) return
    if (t.assigneeId !== user.id && t.creatorId !== user.id) {
      alert('Only assignee or creator can update status')
      return
    }
    updateTask(id, { status })
  }

  const getUser = (id) => users.find(u => u.id === id)

  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2 style={{marginTop:0}}>All Tasks (Admin)</h2>
        <input placeholder="Search tasks..." value={filter} onChange={e=>setFilter(e.target.value)} style={{width:260}} />
      </div>
      <div style={{overflowX:'auto'}}>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Assignee</th>
              <th>Creator</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(t => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td className="muted">{t.description}</td>
                <td>
                  <select value={t.status} onChange={e=>onStatusChange(t.id, e.target.value)}>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                </td>
                <td>{getUser(t.assigneeId)?.name}</td>
                <td>{getUser(t.creatorId)?.name}</td>
                <td>{new Date(t.createdAt).toLocaleString()}</td>
                <td>{new Date(t.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan="7" className="muted">No tasks found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}