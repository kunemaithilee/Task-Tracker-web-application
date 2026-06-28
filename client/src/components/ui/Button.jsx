const variants = {
  primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm shadow-blue-500/20 hover:from-blue-700 hover:to-purple-700 hover:shadow-md hover:shadow-blue-500/30',
  danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm hover:from-red-600 hover:to-red-700',
  ghost: 'border border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800',
  outline: 'border border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/30',
};

const sizes = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-3 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

const Button = ({ children, variant = 'primary', size = 'md', icon: Icon, onClick, type = 'button', className = '', disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
  >
    {Icon && <Icon size={16} />}
    {children}
  </button>
);

export default Button;
