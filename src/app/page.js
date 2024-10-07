'use client';

import { useState, useEffect } from 'react';
import { supabase } from './lib/supaBaseClient.js';

export default function Home() {
  const [tasks, setTasks] = useState([]);;
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks 
  const fetchTasks = async () => {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) {
      setError('Error fetching tasks');
    } else {
      setTasks(data);
    }
    setLoading(false);
  }
  // Add a new task 
  const addTask = async () => {
    if (!newTask.trim()) {
      setError('Taks title cannot be empty');
      return;
    }
    const { error } = await supabase.from('tasks').insert({ title: newTask, completed: false });
    if (error) {
      setError('Error adding task');
    } else {
      setNewTask('');
      fetchTasks();
    }
  };
  // Delete a task
  const deleteTask = async (id) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) {
      setError('Error deleting task');
    } else {
      fetchTasks();
    }
  }

}