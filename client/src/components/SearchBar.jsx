import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="group relative">
      <FiSearch
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500"
        size={18}
      />
      <input
        type="text"
        placeholder="Search tasks by title or description..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
        >
          <FiX size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
