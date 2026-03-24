import { useEffect } from "react";
import axios from "axios";

interface Task {
    id: number;
    taskname: string;
    taskdescription: string;
}


interface TaskItemProps {
    tasks: Task[];
    onTasksChange: React.Dispatch<React.SetStateAction<Task[]>>;
    fetchTasks: () => void;
    onEditTask: (task: Task) => void;
}

function TaskItem({ tasks, onTasksChange, fetchTasks, onEditTask }: TaskItemProps) {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/tasks/${id}`);
            onTasksChange((prev) => prev.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };
    useEffect(() => {
        
        fetchTasks();
    }, [fetchTasks]);

    return (
        <div className="flex flex-col gap-4 w-full max-w-4xl justify-left align-items-left mx-auto text-white px-4">
            <h1 className="text-2xl font-bold mt-5 justify-center items-center">Task Item</h1>
            <div className="flex flex-row gap-4 justify-center mx-auto text-white">

            <ul className="w-full">
                {tasks.length > 0 &&
                    tasks.map((task) => (
                        <li key={task.id} className="border border-gray-300 rounded-md p-4 bg-white/10 text-white w-full text-left">
                            <div className="text-xl"><span className="text-blue-500 font-bold">TASKNAME: </span>
                            {task.taskname}
                            </div>
                            <div className="text-xl mb-3">
                            <span className="text-blue-500 font-bold">TASKDESCRIPTION: </span>
                            {task.taskdescription}
                            </div>
                            <button onClick={() => handleDelete(task.id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
                            <button onClick={() => onEditTask(task)} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-sm">Edit</button>
                        </li>
                    ))}
            </ul>

            </div>
        </div>
    );
}

export default TaskItem;
