import { useState, useEffect } from 'react';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../utils/constants';

const initialFormState = {
  title: '',
  description: '',
  status: 'Pending',
  priority: 'Medium',
  dueDate: '',
};

const TaskForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'Pending',
        priority: initialData.priority || 'Medium',
        dueDate: initialData.dueDate
          ? new Date(initialData.dueDate).toISOString().split('T')[0]
          : '',
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (!formData[name]?.trim() && (name === 'title' || name === 'description' || name === 'dueDate')) {
      setErrors((prev) => ({ ...prev, [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required` }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
    setTouched({ title: true, description: true, dueDate: true, status: true, priority: true });
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 shadow-sm transition-all duration-200 placeholder-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 ${
      errors[field] && touched[field]
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500'
        : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:focus:border-blue-400'
    } focus:outline-none`;

  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5 dark:text-gray-300';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass}>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter task title"
          className={inputClass('title')}
          autoFocus
        />
        {errors.title && touched.title && (
          <p className="mt-1.5 animate-slideDown text-xs font-medium text-red-500">{errors.title}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter task description"
          rows={3}
          className={`${inputClass('description')} resize-none`}
        />
        {errors.description && touched.description && (
          <p className="mt-1.5 animate-slideDown text-xs font-medium text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Status</label>
          <div className="relative">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`${inputClass('status')} appearance-none cursor-pointer`}
            >
              {STATUS_OPTIONS.map((status) => (<option key={status} value={status}>{status}</option>))}
            </select>
            <svg className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div>
          <label className={labelClass}>Priority</label>
          <div className="relative">
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={`${inputClass('priority')} appearance-none cursor-pointer`}
            >
              {PRIORITY_OPTIONS.map((priority) => (<option key={priority} value={priority}>{priority}</option>))}
            </select>
            <svg className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label className={labelClass}>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${inputClass('dueDate')} [color-scheme:light] dark:[color-scheme:dark]`}
        />
        {errors.dueDate && touched.dueDate && (
          <p className="mt-1.5 animate-slideDown text-xs font-medium text-red-500">{errors.dueDate}</p>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-md hover:shadow-blue-500/30 active:scale-[0.98]"
        >
          {initialData ? 'Update Task' : 'Add Task'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 active:scale-[0.98] dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
