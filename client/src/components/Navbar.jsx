import { FiCheckSquare, FiMoon, FiSun, FiGrid, FiList } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ viewMode, onViewModeChange }) => {
  const { dark, toggle } = useTheme();

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200/60 bg-white/80 shadow-sm shadow-gray-200/50 backdrop-blur-2xl dark:border-gray-800/60 dark:bg-gray-950/80 dark:shadow-gray-950/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
            <FiCheckSquare className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl">
              Task Tracker
            </h1>
            <p className="hidden text-xs text-gray-500 dark:text-gray-400 sm:block">
              Stay organized, stay productive
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onViewModeChange && (
            <button
              onClick={() => onViewModeChange(viewMode === 'grid' ? 'list' : 'grid')}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition-all hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
              title={viewMode === 'grid' ? 'List view' : 'Grid view'}
            >
              {viewMode === 'grid' ? <FiList size={14} /> : <FiGrid size={14} />}
              <span className="hidden sm:inline">{viewMode === 'grid' ? 'List' : 'Grid'}</span>
            </button>
          )}

          <button
            onClick={toggle}
            className="rounded-lg p-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            <span className="hidden sm:inline">Online</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
