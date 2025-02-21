import { Trash } from 'iconsax-react';
import React from 'react';
import cn from '../../utils/cn';

interface DeleteModalProps {
  taskName: string;
  titleName: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete, taskName, titleName }) => {
  return (
    <div
      className={cn(
        'fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div
        className={cn(
          'bg-white flex flex-col p-6 rounded-lg shadow-lg max-w-md w-full items-center font-inter transition-transform duration-300 transform',
          isOpen ? 'scale-100' : 'scale-95'
        )}
      >
        <div className="bg-red-100 rounded-full p-8 mb-6">
          <Trash size="22" color="#dc2626" />
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-brot-black-1">Are you sure you want to delete?</h3>
        <p className="text-sm leading-6 text-brot-black-2 mb-8 text-center font-normal">
          By deleting &quot;<span className="font-bold">{taskName}</span>&quot;, its details will also be removed from
          the {titleName}.
        </p>
        <div className="flex justify-end space-x-4 w-full">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md text-gray-500 border border-gray-400 w-1/2"
          >
            Cancel
          </button>
          <button onClick={onDelete} className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 w-1/2">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
