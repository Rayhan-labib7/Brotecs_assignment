import { Trash } from 'iconsax-react';
import React from 'react';
import cn from '../../utils/cn';
import { useTheme } from '../../ContextProvider/ThemeContext';

interface DeleteModalProps {
  taskName: string;
  titleName: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete, taskName, titleName }) => {
  const { isDarkMode } = useTheme()
  return (
    <div
      className={cn(
        'fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div
        className={cn(
          'flex flex-col p-6 rounded-lg shadow-lg w-full items-center font-inter transition-transform duration-300 transform',
          isOpen ? 'scale-100' : 'scale-95',
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black', // Dark mode background and text color
          'sm:w-72 md:w-[85%] lg:w-[50%]' // Decreased width on mobile
        )}
      >
        <div className={cn('rounded-full p-8 mb-6', isDarkMode ? 'bg-red-700' : 'bg-red-100')}>
          <Trash size="22" color={isDarkMode ? "#FFFFFF" : "#dc2626"} />
        </div>
        <h3 className={cn('text-xl font-semibold mb-4', isDarkMode ? 'text-white' : 'text-brot-black-1')}>
          Are you sure you want to delete?
        </h3>
        <p
          className={cn(
            'text-sm leading-6 mb-8 text-center font-normal',
            isDarkMode ? 'text-gray-300' : 'text-brot-black-2',
            'sm:text-base md:text-lg'
          )}
        >
          By deleting &quot;<span className="font-bold">{taskName}</span>&quot;, its details will also be removed from
          the {titleName}.
        </p>
        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-x-4 w-full">
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'px-4 py-2 rounded-md w-full sm:w-1/2',
              isDarkMode ? 'text-gray-400 border-gray-600' : 'text-gray-500 border-gray-400',
              'border'
            )}
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className={cn(
              'px-4 py-2 rounded-md text-white w-full sm:w-1/2',
              isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
            )}
          >
            Delete
          </button>
        </div>
      </div>
    </div>



  );
};

export default DeleteModal;
