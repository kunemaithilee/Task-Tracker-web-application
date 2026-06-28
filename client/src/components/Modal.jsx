import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg animate-scaleIn rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl shadow-black/10 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600 active:scale-90 dark:hover:bg-gray-800"
          >
            <FiX size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
