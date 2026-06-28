import { FiFilter, FiArrowUp } from 'react-icons/fi';
import { STATUS_OPTIONS, PRIORITY_OPTIONS, SORT_OPTIONS } from '../utils/constants';

const FilterSelect = ({ icon: Icon, value, onChange, children }) => (
  <div className="relative">
    <Icon
      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
      size={15}
    />
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-8 text-sm text-gray-700 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
    >
      {children}
    </select>
    <svg
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const FilterBar = ({
  statusFilter,
  priorityFilter,
  sort,
  onStatusChange,
  onPriorityChange,
  onSortChange,
  tasks = [],
}) => {
  const safe = tasks || [];
  const countByStatus = (status) => safe.filter((t) => t.status === status).length;
  const countByPriority = (priority) => safe.filter((t) => t.priority === priority).length;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterSelect icon={FiFilter} value={statusFilter} onChange={onStatusChange}>
        <option value="">All Status ({safe.length})</option>
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>{s} ({countByStatus(s)})</option>
        ))}
      </FilterSelect>

      <FilterSelect icon={FiFilter} value={priorityFilter} onChange={onPriorityChange}>
        <option value="">All Priority ({safe.length})</option>
        {PRIORITY_OPTIONS.map((p) => (
          <option key={p} value={p}>{p} ({countByPriority(p)})</option>
        ))}
      </FilterSelect>

      <FilterSelect icon={FiArrowUp} value={sort} onChange={onSortChange}>
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </FilterSelect>
    </div>
  );
};

export default FilterBar;
