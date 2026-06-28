const Loader = () => {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="relative">
        <div className="h-14 w-14 rounded-full border-[3px] border-gray-100 dark:border-gray-800" />
        <div className="absolute left-0 top-0 h-14 w-14 animate-spin rounded-full border-[3px] border-transparent border-t-blue-500 shadow-sm shadow-blue-500/10" />
        <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 blur-sm dark:opacity-20" />
      </div>
    </div>
  );
};

export default Loader;
