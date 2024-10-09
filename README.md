# Task Manager App

This is a simple Task Manager web application built using Next.js, Supabase, and Tailwind CSS. The app allows users to add, edit, and delete tasks. This guide will help you set up the project locally.

# Features

- **Full CRUD (Create, Read, Update, Delete) Operations**: Users can create new tasks, read task details, update existing tasks, and delete tasks.
- **Next.js for UI**: Utilizes React with Next.js for the frontend.
- **Supabase for Backend**: Uses Supabase as a backend to perform CRUD operations on tasks.
- **Tailwind CSS for Styling**: Tailwind CSS is used for styling the app.

# Prerequisites

- Node.js installed (>= 14.x recommended)
- Yarn or npm
- Supabase account and API keys

# Getting Started

## 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager
```

## 2. Install Dependencies

Install the necessary dependencies using Yarn or npm:

```bash
# Using Yarn
yarn install

# Using npm
npm install
```

## 3. Set Up Supabase Credentials

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the placeholders with your Supabase project values.

## 4. Run the App

To run the app locally:

```bash
# Using Yarn
yarn dev

# Using npm
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

# Using the App

* Add tasks using the input field.
* Edit tasks using the "Edit" button.
* Delete tasks using the "Delete" button.
* Mock data will be used if Supabase is unavailable.

# Folder Structure

* **src/utils/supabaseClient.js**: Supabase client setup.
* **src/components/TaskItem.js**: Task item component.
* **src/app/page.js**: Main app logic for managing tasks.

# Troubleshooting

* **Unauthorized Errors**: Ensure `.env.local` is correctly configured.
* **Mock Data**: Displayed if Supabase fails.

# Technologies Used

* **Next.js**
* **Supabase**
* **Tailwind CSS**

# License

This project is open source and available under the [MIT License](LICENSE).