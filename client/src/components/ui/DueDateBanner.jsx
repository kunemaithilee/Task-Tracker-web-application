import { FiClock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const DueDateBanner = ({ tasks = [] }) => {
  const safe = tasks || [];
  const now = new Date();
  const overdue = safe.filter((t) => new Date(t.dueDate) < now && t.status !== 'Completed');
  const dueSoon = safe.filter((t) => {
    const due = new Date(t.dueDate);
    const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    return diff >= 0 && diff <= 2 && t.status !== 'Completed';
  });
  const completedToday = safe.filter((t) => {
    const today = new Date().toDateString();
    return t.status === 'Completed' && new Date(t.updatedAt).toDateString() === today;
  });

  if (!overdue.length && !dueSoon.length && !completedToday.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {overdue.length > 0 && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm dark:border-red-900/50 dark:bg-red-950/30">
          <FiAlertCircle className="shrink-0 text-red-500" size={16} />
          <span className="font-medium text-red-700 dark:text-red-400">
            {overdue.length} task{overdue.length > 1 ? 's' : ''} overdue
          </span>
        </div>
      )}
      {dueSoon.length > 0 && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm dark:border-amber-900/50 dark:bg-amber-950/30">
          <FiClock className="shrink-0 text-amber-500" size={16} />
          <span className="font-medium text-amber-700 dark:text-amber-400">
            {dueSoon.length} task{dueSoon.length > 1 ? 's' : ''} due soon
          </span>
        </div>
      )}
      {completedToday.length > 0 && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <FiCheckCircle className="shrink-0 text-emerald-500" size={16} />
          <span className="font-medium text-emerald-700 dark:text-emerald-400">
            {completedToday.length} completed today
          </span>
        </div>
      )}
    </div>
  );
};

export default DueDateBanner;
