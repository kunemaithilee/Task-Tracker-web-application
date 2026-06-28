import { FiEdit2, FiTrash2, FiCalendar, FiClock } from 'react-icons/fi';
import { PRIORITY_COLORS, STATUS_COLORS } from '../utils/constants';

const priorityBorder = {
  High: 'border-l-red-500',
  Medium: 'border-l-amber-500',
  Low: 'border-l-blue-500',
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysRemaining = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    return Math.ceil((due - now) / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = getDaysRemaining(task.dueDate);

  return (
    <div
      className={`group animate-fadeIn rounded-2xl border border-gray-100 border-l-4 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 ${priorityBorder[task.priority] || 'border-l-gray-200 dark:border-l-gray-600'}`}
    >
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-tight text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:text-lg">
            {task.title}
          </h3>
          <div className="flex shrink-0 gap-0.5">
            <button
              onClick={() => onEdit(task)}
              className="rounded-lg p-2 text-gray-400 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 active:scale-90 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
              title="Edit task"
            >
              <FiEdit2 size={15} />
            </button>
            <button
              onClick={() => onDelete(task)}
              className="rounded-lg p-2 text-gray-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500 active:scale-90 dark:hover:bg-red-900/30 dark:hover:text-red-400"
              title="Delete task"
            >
              <FiTrash2 size={15} />
            </button>
          </div>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {task.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${PRIORITY_COLORS[task.priority]}`}
          >
            {task.priority}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_COLORS[task.status]}`}
          >
            {task.status}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3 text-xs text-gray-400 dark:border-gray-800">
          <div className="flex items-center gap-1">
            <FiCalendar size={13} />
            <span>Due {formatDate(task.dueDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiClock size={13} />
            <span className={daysRemaining < 0 ? 'font-medium text-red-500' : daysRemaining <= 2 ? 'font-medium text-amber-500' : ''}>
              {daysRemaining < 0 ? `${Math.abs(daysRemaining)}d overdue` : daysRemaining === 0 ? 'Due today' : `${daysRemaining}d left`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
