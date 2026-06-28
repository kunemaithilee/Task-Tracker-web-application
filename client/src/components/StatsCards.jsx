import { FiClipboard, FiClock, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

const StatCard = ({ icon: Icon, label, value, gradient, delay }) => (
  <div
    className={`group animate-fadeIn rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 ${delay}`}
  >
    <div className="flex items-center gap-4">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${gradient}`}
      >
        <Icon className="text-white" size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold tracking-tight text-gray-900 transition-all duration-300 dark:text-white">
          {value}
        </p>
        <p className="truncate text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  </div>
);

const StatsCards = ({ tasks = [] }) => {
  const safe = tasks || [];
  const total = safe.length;
  const pending = safe.filter((t) => t.status === 'Pending').length;
  const inProgress = safe.filter((t) => t.status === 'In Progress').length;
  const completed = safe.filter((t) => t.status === 'Completed').length;

  const stats = [
    { icon: FiClipboard, label: 'Total Tasks', value: total, gradient: 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/20', delay: 'stagger-1' },
    { icon: FiClock, label: 'Pending', value: pending, gradient: 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/20', delay: 'stagger-2' },
    { icon: FiTrendingUp, label: 'In Progress', value: inProgress, gradient: 'bg-gradient-to-br from-purple-500 to-pink-600 shadow-purple-500/20', delay: 'stagger-3' },
    { icon: FiCheckCircle, label: 'Completed', value: completed, gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20', delay: 'stagger-4' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
    </div>
  );
};

export default StatsCards;
