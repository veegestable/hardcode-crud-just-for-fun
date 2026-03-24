import { useState, useCallback } from 'react'
import './App.css'
import TaskForm from './components/TaskForm.tsx'
import Header from './components/Header.jsx'
import TaskItem from './components/TaskItem.tsx'
import img from './assets/LEBRON.webp'
import axios from 'axios'

interface Task {
  id: number;
  taskname: string;
  taskdescription: string;
}

function App() {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const fetchTasks = useCallback(() => {
    axios.get(`${API_URL}/tasks`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error('Error fetching tasks:', err))
  }, [API_URL])

  return (
    <div className='App text-white min-h-screen' style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${img})` ,backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh"}}>
      <Header/>
      <TaskForm
        onTaskAdded={fetchTasks}
        onTaskUpdated={fetchTasks}
        editingTask={editingTask}
        onCancelEdit={() => setEditingTask(null)}
      />
      <TaskItem
        tasks={tasks}
        onTasksChange={setTasks}
        fetchTasks={fetchTasks}
        onEditTask={setEditingTask}
      />
    </div>
  )
}

export default App
