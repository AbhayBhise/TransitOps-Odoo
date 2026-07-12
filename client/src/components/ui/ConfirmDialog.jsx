import React from 'react';
import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col items-center text-center p-2">
        <div className={`p-3 rounded-full mb-4 ${isDestructive ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>
          <AlertTriangle size={32} />
        </div>
        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          {message}
        </p>
        <div className="flex items-center gap-3 w-full justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-800 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white rounded-lg transition-colors ${
              isDestructive
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
