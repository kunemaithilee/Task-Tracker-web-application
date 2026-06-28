import { FiInbox } from 'react-icons/fi';
import Button from './Button';

const EmptyState = ({ icon: Icon = FiInbox, title, description, actionLabel, onAction }) => (
  <div className="animate-fadeInUp mt-12 flex flex-col items-center justify-center text-center">
    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 shadow-sm dark:bg-gray-800">
      <Icon className="text-gray-400" size={34} />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
    {description && <p className="mt-1.5 max-w-sm text-sm text-gray-500 dark:text-gray-400">{description}</p>}
    {actionLabel && onAction && (
      <Button onClick={onAction} className="mt-6" size="md">
        {actionLabel}
      </Button>
    )}
  </div>
);

export default EmptyState;
