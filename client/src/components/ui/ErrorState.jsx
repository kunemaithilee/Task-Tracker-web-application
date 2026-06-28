import { FiAlertTriangle } from 'react-icons/fi';
import Button from './Button';

const ErrorState = ({ message, onRetry }) => (
  <div className="animate-fadeInUp mt-12 flex flex-col items-center justify-center text-center">
    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 shadow-sm dark:bg-red-900/30">
      <FiAlertTriangle className="text-red-400" size={34} />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Something went wrong</h3>
    <p className="mt-1.5 max-w-sm text-sm text-gray-500 dark:text-gray-400">{message}</p>
    {onRetry && (
      <Button onClick={onRetry} icon={FiAlertTriangle} className="mt-6">
        Try Again
      </Button>
    )}
  </div>
);

export default ErrorState;
