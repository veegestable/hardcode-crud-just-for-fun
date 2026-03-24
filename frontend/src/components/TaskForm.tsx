import { useState, useEffect, type FormEvent } from "react";

import axios from "axios";

interface Task {
    id: number;
    taskname: string;
    taskdescription: string;
}

interface TaskFormProps {
    onTaskAdded?: () => void;
    onTaskUpdated?: () => void;
    editingTask?: Task | null;
    onCancelEdit?: () => void;
}

function TaskForm({ onTaskAdded, onTaskUpdated, editingTask, onCancelEdit }: TaskFormProps) {

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    useEffect(() => {
        if (editingTask) {
            setTaskName(editingTask.taskname);
            setTaskDescription(editingTask.taskdescription);
        } else {
            setTaskName("");
            setTaskDescription("");
        }
    }, [editingTask]);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (editingTask) {
                const response = await axios.put(`${API_URL}/tasks/${editingTask.id}`, {
                    taskname: taskName,
                    taskdescription: taskDescription,
                });
                console.log("Task updated", response.data);
                onTaskUpdated?.();
                onCancelEdit?.();
            } else {
                const response = await axios.post(`${API_URL}/tasks`, {
                    taskname: taskName,
                    taskdescription: taskDescription,
                });
                console.log("Task added", response.data);
                onTaskAdded?.();
            }
            setTaskName("");
            setTaskDescription("");
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };

    return (
        <div className="flex flex-col gap-4 justify-center items-center text-white">
            <h1 className="text-2xl font-bold">Task Form</h1> 
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/4 justify-center items-center">
                <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} className="border border-gray-300 rounded-md p-2 text-gray-900 bg-white"/>
                <input type="text" placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className="border border-gray-300 rounded-md p-2 text-gray-900 bg-white"/>
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
                    {editingTask ? "Update Task" : "Add Task"}
                </button>
                {editingTask && (
                    <button type="button" onClick={onCancelEdit} className="bg-gray-500 text-white rounded-md p-2">
                        Cancel Edit
                    </button>
                )}
            </form>
        </div>
    )
}

export default TaskForm;