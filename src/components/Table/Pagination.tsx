import React from 'react';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import Button from '../buttons/ButtonRC';
import cn from '../../utils/cn';
import svgIcons from '../../service/svgService';
import { useTheme } from '../../ContextProvider/ThemeContext';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  rowsPerPage: number;
  handlePageChange: (page: number) => void;
  handleRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  rowsPerPage,
  handlePageChange,
  handleRowsPerPageChange,
}) => {
  const pageSize = [2, 5, 10, 20, 50];
  const { isDarkMode } = useTheme();

  const generatePageNumbers = (): (string | number)[] => {
    const pageNumbers: (string | number)[] = [];
    const maxVisiblePages = 2;
    const leftFlag = currentPage - maxVisiblePages;
    const rightFlag = currentPage + maxVisiblePages;
    const startPage = Math.max(2, leftFlag);
    const endPage = Math.min(totalPages - 1, rightFlag);

    pageNumbers.push(1);

    if (leftFlag > 2) pageNumbers.push('...');
    for (let i: number = startPage; i <= endPage; i += 1) {
      pageNumbers.push(i);
    }
    if (rightFlag < totalPages - 1) pageNumbers.push('...');
    if (totalPages > 1) pageNumbers.push(totalPages);

    return pageNumbers;
  };

  const renderPageButton = (page: number | string) =>
    typeof page === 'string' ? (
      <span key={page} className="px-3 py-1 mx-1 text-gray-500">
        {page}
      </span>
    ) : (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={cn(
          'px-3 py-1 border rounded-md mx-1 transition-colors',
          isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50',
          currentPage === page ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : ''
        )}
      >
        {page}
      </button>
    );

  return (
    <div className={cn('flex flex-col sm:flex-row justify-between p-4 border-t', isDarkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white')}>
      {/* Inputs column */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-5 items-center sm:mb-0">
        {/* Rows per page */}
        <div className="flex items-center">
          <span className={cn('mr-2 text-xs', isDarkMode ? 'text-gray-300' : 'text-brotecs-black-2')}>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className={cn(
              'border rounded-md px-1 py-1 w-12 transition-colors',
              isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'border-brotecs-black-1'
            )}
          >
            {pageSize.map((rows) => (
              <option key={rows} value={rows}>
                {rows}
              </option>
            ))}
          </select>
        </div>

        {/* Go to page */}
        <div className="flex items-center">
          <span className={cn('mr-2 text-xs', isDarkMode ? 'text-gray-300' : 'text-brotecs-black-2')}>Go to</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className={cn(
              'border rounded-md w-12 px-2 py-1 transition-colors',
              isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'border-brotecs-black-1'
            )}
          />
        </div>
      </div>

      {/* Buttons column */}
      <div className="flex justify-center sm:justify-end mt-2 sm:mt-0">
        {/* Pagination buttons */}
        <Button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={cn(
            'border mr-2 transition-colors',
            isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
          )}
          size="sm"
        >
          <span dangerouslySetInnerHTML={{ __html: svgIcons.previousBtn }} />
        </Button>

        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            'border transition-colors',
            isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
          )}
          size="sm"
        >
          <ArrowLeft2 size="16" color={isDarkMode ? '#D1D5DB' : '#566573'} />
        </Button>

        {generatePageNumbers().map(renderPageButton)}

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            'border transition-colors',
            isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
          )}
          size="sm"
        >
          <ArrowRight2 size="16" color={isDarkMode ? '#D1D5DB' : '#566573'} />
        </Button>

        <Button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={cn(
            'border ml-2 transition-colors',
            isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
          )}
          size="sm"
        >
          <span dangerouslySetInnerHTML={{ __html: svgIcons.forwardBtn }} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;