import React from 'react';

export default function TaskItem({ task, editTask, deleteTask }) {
  return (
    <li className="flex justify-between items-center p-4 border rounded-md shadow-sm">
      <input
        type="text"
        value={task.title}
        onChange={(e) => editTask(task.id, e.target.value)}
        className="border-none focus:ring-0 flex-grow mr-4"
      />
      <button
        onClick={() => deleteTask(task.id)}
        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
      >
        Delete
      </button>
    </li>
  );
}