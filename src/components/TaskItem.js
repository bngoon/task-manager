import React, { useState } from 'react';

export default function TaskItem({ task, editTask, deleteTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(task.title);

    const handleEdit = () => {
        if (isEditing && updatedTitle !== task.title) {
            editTask(task.id, updatedTitle);
        }
        setIsEditing(!isEditing);
    };

    return (
        <li className="flex justify-between items-center p-4 border rounded-md shadow-sm">
            {isEditing ? (
                <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    className="border p-2 flex-grow mr-4 rounded-md text-black"
                />
            ) : (
                <span>{task.title}</span>
            )}
            <button
                onClick={handleEdit}
                className={`${isEditing ? 'bg-green-500' : 'bg-yellow-500'
                    } text-white px-3 py-1 rounded-md hover:${isEditing ? 'bg-green-600' : 'bg-yellow-600'
                    } ml-2`}
            >
                {isEditing ? 'Save' : 'Edit'}
            </button>
            <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ml-2"
            >
                Delete
            </button>
        </li>
    );
}