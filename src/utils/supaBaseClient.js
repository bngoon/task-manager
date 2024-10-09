// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// console.log('Supabase URL:', supabaseUrl);
// console.log('Supabase Key is loaded:', !!supabaseKey);

// export const supabase = createClient(supabaseUrl, supabaseKey);


import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key Loaded:', !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
    throw new Error('supabaseUrl and supabaseKey are required. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

