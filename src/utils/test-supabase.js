// test-supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ibkilfsoblzlyksbmafu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpb3NucXJvYmZzcGx4ZWFmcnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzMDQ5MTEsImV4cCI6MjAzNjg4MDkxMX0.6NxATrxPj8uNAt2hR4lhveSAiM4_O85cpGUCbeKhxZA'; // Replace with your anon key

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) {
    console.error('Error fetching tasks:', error);
  } else {
    console.log('Tasks:', data);
  }
})();
