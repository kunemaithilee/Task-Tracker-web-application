import { FiAlertTriangle } from 'react-icons/fi';
import Modal from '../Modal';
import Button from './Button';

const ConfirmDialog = ({ isOpen, onClose, title, message, confirmLabel = 'Delete', onConfirm }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title}>
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 shadow-sm dark:bg-red-900/30">
        <FiAlertTriangle className="text-red-400" size={28} />
      </div>
      <p className="text-gray-600 dark:text-gray-300">{message}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button variant="danger" onClick={onConfirm} className="flex-1">
          {confirmLabel}
        </Button>
        <Button variant="ghost" onClick={onClose} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  </Modal>
);

export default ConfirmDialog;
