'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supaBaseClient';
import TaskItem from '../components/TaskItem';

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Fetch tasks from Supabase
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) {
      setError('Error fetching tasks. Please try again.');
      console.error('Error fetching tasks:', error);
    } else {
      setTasks(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (!newTaskTitle) {
      setError('Task title cannot be empty.');
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from('tasks').insert([{ title: newTaskTitle, completed: false }]);
    if (error) {
      setError('Error adding task. Please try again.');
      console.error('Error adding task:', error);
    } else {
      setTasks((prevTasks) => [...prevTasks, ...data]);
      setNewTaskTitle('');
    }
    setLoading(false);
  };

  // Edit a task
  const editTask = async (taskId, updatedTitle) => {
    if (!updatedTitle) {
      setError('Task title cannot be empty.');
      return;
    }
    setLoading(true);
    setError(null);
    const { error } = await supabase.from('tasks').update({ title: updatedTitle }).eq('id', taskId);
    if (error) {
      setError('Error editing task. Please try again.');
      console.error('Error editing task:', error);
    } else {
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, title: updatedTitle } : task)));
    }
    setLoading(false);
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    if (error) {
      setError('Error deleting task. Please try again.');
      console.error('Error deleting task:', error);
    } else {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Task List */}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} editTask={editTask} deleteTask={deleteTask} />
        ))}
      </ul>

      {/* Add Task Form */}
      <div className="mt-6 flex items-center text-black">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title..."
          className="border p-2 flex-grow mr-4 rounded-md"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}