import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useData } from '../context/DataContext.jsx'

export default function NewTask() {
  const { user } = useAuth()
  const { users, addTask } = useData()
  const nav = useNavigate()

  const [form, setForm] = useState({
    title: '',
    description: '',
    assigneeId: users.find(u => u.id !== user.id)?.id || '',
    status: 'Pending',
  })
  const [error, setError] = useState('')

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    try {
      if (!form.title.trim()) throw new Error('Title is required')
      if (!form.assigneeId) throw new Error('Assignee is required')
      addTask({ ...form, creatorId: user.id })
      nav('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form className="card" onSubmit={onSubmit} style={{display:'grid', gap:12, maxWidth:700}}>
      <h2 style={{marginTop:0}}>Create Task</h2>
      {error && <div className="card" style={{padding:12, borderColor:'#ef4444', background:'rgba(239,68,68,0.1)'}}>{error}</div>}
      <label className="field">
        <span>Title</span>
        <input name="title" value={form.title} onChange={onChange} placeholder="Short title" />
      </label>
      <label className="field">
        <span>Description</span>
        <textarea name="description" rows="4" value={form.description} onChange={onChange} placeholder="What needs to be done?"></textarea>
      </label>
      <div className="field-row">
        <label className="field" style={{flex:1}}>
          <span>Assignee</span>
          <select name="assigneeId" value={form.assigneeId} onChange={onChange}>
            <option value="">-- Select user --</option>
            {users.filter(u => u.id !== user.id).map(u => (
              <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
            ))}
          </select>
        </label>
        <label className="field" style={{width:200}}>
          <span>Status</span>
          <select name="status" value={form.status} onChange={onChange}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </label>
      </div>
      <div style={{display:'flex', gap:8}}>
        <button className="btn primary" type="submit">Save</button>
        <button className="btn ghost" type="button" onClick={() => nav(-1)}>Cancel</button>
      </div>
    </form>
  )
}