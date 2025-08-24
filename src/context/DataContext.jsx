import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { storage } from '../utils/storage.js'

const DataContext = createContext(null)

const seedUsers = [
  { id: 'u1', name: 'Admin User', email: 'admin@demo.com', password: 'admin123', role: 'admin' },
  { id: 'u2', name: 'Member User', email: 'member@demo.com', password: 'member123', role: 'member' },
]

const seedTasks = [
  {
    id: 't1',
    title: 'Prepare project brief',
    description: 'Draft and share the initial project brief with the team.',
    status: 'Pending',
    assigneeId: 'u2',
    creatorId: 'u1',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: 't2',
    title: 'Build login page',
    description: 'Implement login page and route protection.',
    status: 'In Progress',
    assigneeId: 'u1',
    creatorId: 'u2',
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    updatedAt: Date.now() - 1000 * 60 * 60 * 3,
  },
]

const newId = (prefix='id') => `${prefix}_${Math.random().toString(36).slice(2,8)}${Date.now().toString(36).slice(-4)}`

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState(() => storage.get('users', null) ?? seedUsers)
  const [tasks, setTasks] = useState(() => storage.get('tasks', null) ?? seedTasks)

  useEffect(() => { storage.set('users', users) }, [users])
  useEffect(() => { storage.set('tasks', tasks) }, [tasks])

  const addUser = ({ name, email, password, role }) => {
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Email already exists')
    }
    const user = { id: newId('u'), name, email, password, role: role || 'member' }
    setUsers(prev => [...prev, user])
    return user
  }

  const addTask = ({ title, description, assigneeId, status='Pending', creatorId }) => {
    const task = {
      id: newId('t'),
      title, description, assigneeId, status,
      creatorId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setTasks(prev => [task, ...prev])
    return task
  }

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates, updatedAt: Date.now() } : t))
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const getUser = (id) => users.find(u => u.id === id)
  const getTask = (id) => tasks.find(t => t.id === id)

  const value = useMemo(() => ({
    users, tasks, addUser, addTask, updateTask, deleteTask, getUser, getTask
  }), [users, tasks])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)