const variants = {
  default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  red: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  teal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
};

const sizes = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => (
  <span className={`inline-flex items-center rounded-full font-medium ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}>
    {children}
  </span>
);

export default Badge;
