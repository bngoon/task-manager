'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supaBaseClient';
import TaskItem from '../components/TaskItem';

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Mock data to use when Supabase connection fails
  const mockTasks = [
    { id: 1, title: 'Mock Task 1', completed: false },
    { id: 2, title: 'Mock Task 2', completed: true },
  ];

  // Fetch tasks from Supabase or use mock data
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    if (supabase) {
      try {
        const { data, error } = await supabase.from('tasks').select('*');
        if (error) {
          throw error;
        }
        setTasks(data);
      } catch (error) {
        setError('Error fetching tasks. Using mock data instead.');
        console.error('Error fetching tasks:', error);
        setTasks(mockTasks);
      } finally {
        setLoading(false);
      }
    } else {
      console.warn('Using mock data as Supabase is not available.');
      setTasks(mockTasks);
      setLoading(false);
    }
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
    if (supabase) {
      try {
        const { data, error } = await supabase.from('tasks').insert([{ title: newTaskTitle, completed: false }]);
        if (error) {
          throw error;
        }
        if (data) {
          setTasks((prevTasks) => [...prevTasks, ...data]);
          setError(null);
        }
      } catch (error) {
        setError('Error adding task. Please try again.');
        console.error('Error adding task:', error);
      } finally {
        setLoading(false);
      }
    } else {
      // Mock task addition
      const newTask = { id: tasks.length + 1, title: newTaskTitle, completed: false };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setError(null);
      setLoading(false);
    }
    setNewTaskTitle('');
  };

  // Edit a task
  const editTask = async (taskId, updatedTitle) => {
    if (!updatedTitle) {
      setError('Task title cannot be empty.');
      return;
    }
    setLoading(true);
    setError(null);
    if (supabase) {
      try {
        const { error } = await supabase.from('tasks').update({ title: updatedTitle }).eq('id', taskId);
        if (error) {
          throw error;
        }
        setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, title: updatedTitle } : task)));
        setError(null);
      } catch (error) {
        setError('Error editing task. Please try again.');
        console.error('Error editing task:', error);
      } finally {
        setLoading(false);
      }
    } else {
      // Mock task editing
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, title: updatedTitle } : task)));
      setError(null);
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    setLoading(true);
    setError(null);
    if (supabase) {
      try {
        const { error } = await supabase.from('tasks').delete().eq('id', taskId);
        if (error) {
          throw error;
        }
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        setError(null); // Clear error on successful deletion
      } catch (error) {
        setError('Error deleting task. Please try again.');
        console.error('Error deleting task:', error);
      } finally {
        setLoading(false);
      }
    } else {
      // Mock task deletion
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setError(null);
      setLoading(false);
    }
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
      <div className="mt-6 flex items-center">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title..."
          className="border p-2 flex-grow mr-4 rounded-md text-black"
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