import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4 dark:from-gray-950 dark:to-gray-900">
      <div className="text-center">
        <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Page not found</p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-md"
        >
          <FiHome size={18} />
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
