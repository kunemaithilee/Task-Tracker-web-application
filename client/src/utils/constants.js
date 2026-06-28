export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed'];

export const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];

export const PRIORITY_ORDER = { High: 3, Medium: 2, Low: 1 };

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'dueDate', label: 'Due Date (Earliest)' },
  { value: 'dueDateDesc', label: 'Due Date (Latest)' },
  { value: 'priority', label: 'Priority (High-Low)' },
  { value: 'priorityAsc', label: 'Priority (Low-High)' },
  { value: 'titleAsc', label: 'Title (A-Z)' },
  { value: 'titleDesc', label: 'Title (Z-A)' },
  { value: 'status', label: 'Status' },
];

export const PRIORITY_COLORS = {
  Low: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  High: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
};

export const STATUS_COLORS = {
  Pending: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  'In Progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  Completed: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
};
