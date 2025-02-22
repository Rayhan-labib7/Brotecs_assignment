import { SearchNormal1, ArrowDown2, ArrowUp2 } from 'iconsax-react';
import React from 'react';
import { useSignal } from '@preact/signals-react';
import cn from '../../utils/cn';
import Button from '../buttons/ButtonRC';
// import { BasicButton } from '../customTool/Buttons/BasicButton';
// import ComboBox from '../textfield/ComboBox';
import Pagination from './Pagination';
import { useTheme } from '../../ContextProvider/ThemeContext';
// import { BasicButton } from '../../views/pages/customTool/Buttons/BasicButton';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: any) => React.ReactNode; // Optional custom renderer for column data
  name?: string;
}
interface SelectedItem {
  id: number;
  name: string;
  title: string;
}
interface TableProps {
  data?: any[]; // Array of data objects
  selectedItem?: SelectedItem[];
  columns: Column[]; // Array of column definitions
  title?: string; // Optional title for the table
  convertBtn?: string; // Optional convert btn for the table
  onAddClick?: () => void; // Callback for "Add" button
  addBtnName?: string;
  isEdit?: boolean;
  editedData?: any;
  header?: boolean;
  allowCheckbox?: boolean;
  allowSearchInColumns?: boolean;
  showHeaderSearchbar?: boolean;
  showStatusBarOnHeader?: boolean;
  onSelectionChange?: (updatedSelectedItems: SelectedItem[]) => void;
  onCloseTable?: () => void;
  origin?: string;
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  onAddClick,
  title = '',
  addBtnName,
  editedData,
  selectedItem,
  onSelectionChange,
  header = true,
  allowCheckbox = true,
  allowSearchInColumns = true,
  showHeaderSearchbar = true,
  showStatusBarOnHeader = false
}) => {
  // const currentPage = useSignal(1);
  const currentPage = useSignal(1);
  const { isDarkMode } = useTheme();
  const rowsPerPage = useSignal(5);
  const searchInputs = useSignal<Record<string, string>>({});
  const sortConfig = useSignal<{ key: string; order: 'asc' | 'desc' | null }>({
    key: '',
    order: null,
  });
  console.log('table data', data);
  // console.log('pagination ', pagination);
  const totalPages = Math.ceil((data?.length || 0) / rowsPerPage.value);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      currentPage.value = page;
    }
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    rowsPerPage.value = Number(e.target.value);
    currentPage.value = 1; // Reset to first page when changing page size
  };

  const handleSearchChange = (key: string, value: string) => {
    searchInputs.value = { ...searchInputs.value, [key]: value };
  };

  const handleSort = (key: string, order: 'asc' | 'desc') => {
    sortConfig.value =
      sortConfig.value.key === key && sortConfig.value.order === order
        ? { key: '', order: null } // Reset sorting if clicked twice
        : { key, order };
  };

  const filteredData = data?.filter((row) =>
    columns.every((column) => {
      const searchValue = searchInputs.value[column.key];
      return !searchValue || row[column.key]?.toString().toLowerCase().includes(searchValue.toLowerCase());
    })
  );

  const sortedData = React.useMemo(() => {
    if (!filteredData || !sortConfig.value.key || !sortConfig.value.order) {
      return filteredData;
    }
    const sorted = [...filteredData].sort((a, b) => {
      if (a[sortConfig.value.key] < b[sortConfig.value.key]) return sortConfig.value.order === 'asc' ? -1 : 1;
      if (a[sortConfig.value.key] > b[sortConfig.value.key]) return sortConfig.value.order === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredData, sortConfig.value]);

  const paginatedTasks = sortedData?.slice(
    (currentPage.value - 1) * rowsPerPage.value,
    currentPage.value * rowsPerPage.value
  );

  const handleCheckboxChange = (row: SelectedItem) => {
    const selectedItems = selectedItem || [];
    const isAlreadySelected = selectedItems.some((item) => item.id === row.id);
    const updatedSelectedItems = isAlreadySelected
      ? selectedItems.filter((item) => item.id !== row.id)
      : [...selectedItems, row];
    onSelectionChange?.(updatedSelectedItems);
  };

  return (
    <div className={cn(
     'bg-white rounded-md shadow-lg ',
      isDarkMode ? 'bg-gray-800 text-white  rounded-lg shadow' : ''
    )}>
      {header && (
        <div className="flex flex-col ">
          <div className="flex justify-between items-center p-6">
            <div className="flex flex-row gap-6 items-center">
              {title && <h2 className={cn(
                "text-2xl leading-[26.63px] font-medium",
                isDarkMode ? "text-gray-200" : "text-brotecs-black-1/90"
              )}>{title}</h2>}
              {showHeaderSearchbar == true ? (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className={cn(
                      "pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2",
                      isDarkMode
                        ? "bg-gray-700 text-white border-gray-600 focus:ring-gray-500"
                        : "border-gray-300 focus:ring-brotecs-blue"
                    )}
                  />
                  <SearchNormal1 className="absolute left-2 top-3 text-gray-400 w-4 h-4" />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="flex space-x-4">

              {addBtnName && (
                <Button
                  size="xs"
                  onClick={onAddClick}
                  bgColor={isDarkMode ? "bg-gray-700" : "bg-[#3498DB]"}
                  textColor="text-white"
                  hoverColor={isDarkMode ? "hover:bg-gray-600" : "hover:bg-brotecs-blue/80"}
                >
                  {addBtnName}
                </Button>
              )}
            </div>
          </div>

          {showStatusBarOnHeader == true ? (
            <div className={cn(
              "border rounded-md p-7 mx-6 mb-6 transition-colors duration-300",
              isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-white"
            )}>
              <div className="flex flex-col">
                <div className="flex flex-row justify-between align-baseline gap-3">

                  <div className="w-full">
                    <label
                      htmlFor="name"
                      className={cn("font-normal leading-5 tracking-wide mb-1 text-sm",
                        isDarkMode ? "text-gray-300" : "text-brotecs-black-1/80"
                      )}
                    >
                      {'Name'}
                    </label>
                    <input
                      id="name"
                      // {'...register(field.name, { required: `${'field.label'} is required` })'}
                      type={'text'}
                      placeholder={''}
                      className={cn(
                        "p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring placeholder:text-sm",
                        isDarkMode
                          ? "bg-gray-800 text-white border-gray-600 focus:border-gray-500 placeholder-gray-400"
                          : "border-gray-300 text-brotecs-black focus:border-blue-500 placeholder-brotecs-black-1/40"
                      )}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    size={'xs'}
                    bgColor={isDarkMode ? "bg-gray-600" : "bg-brotecs-blue"}
                    className="mr-2"
                    textColor="text-white"
                    type="submit"
                    hoverColor={isDarkMode ? "hover:bg-gray-500" : "hover:bg-brotecs-blue/90"}
                  >
                    Apply
                  </Button>
                  <Button
                    size={'xs'}
                    bgColor={isDarkMode ? "bg-red-700" : "bg-brotecs-red"}
                    className=""
                    textColor="text-white"
                    type="submit"
                    hoverColor={isDarkMode ? "hover:bg-red-600" : "hover:bg-brotecs-blue/90"}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
      <div className={cn('overflow-x-auto scrollbar', isDarkMode ? 'bg-gray-900' : 'bg-white')}>
        <table className={cn('min-w-full divide-y', isDarkMode ? 'divide-gray-700' : 'divide-gray-200')}>
          <thead className={cn(
            'border-t-[0.5px] border-b border-solid',
            isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-brotecs-black-3 text-gray-500 border-brotecs-default'
          )}>
            <tr>
              {allowCheckbox == true ? (
                <th className="flex flex-col divide-y divide-gray-200">
                  <div className="px-6 py-3 h-[50px]">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div className="flex flex-grow"></div>
                </th>
              ) : (
                <></>
              )}

              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'text-left p-0 text-xs font-medium uppercase tracking-wide', isDarkMode ? 'text-gray-300' : 'text-gray-500'
                  )}
                >
                  <div className="flex flex-col divide-y divide-gray-200">
                    <span
                      className={cn(
                        'm-2 h-[35px] flex items-center p-2 text-center font-semibold',
                        { 'border-l': allowCheckbox },
                        isDarkMode ? 'text-gray-300' : 'text-brotecs-black-1'
                      )}
                    >

                      <span className={cn(
                        'mr-1 font-medium text-xs',
                        isDarkMode ? 'text-gray-300' : 'text-brotecs-black'
                      )}>{column.label}</span>
                      <span className={cn(column.key === 'actions' && 'invisible')}>
                        <ArrowUp2
                          onClick={() => handleSort(column.key, 'asc')}
                          size="14"
                          color={
                            sortConfig.value.key === column.key && sortConfig.value.order === 'asc'
                              ? '#5b6b79'
                              : '#b0bec5'
                          }
                          variant="Bold"
                          className="cursor-pointer p-0 "
                        />
                        <ArrowDown2
                          onClick={() => handleSort(column.key, 'desc')}
                          size="14"
                          color={
                            sortConfig.value.key === column.key && sortConfig.value.order === 'desc'
                              ? '#5b6b79'
                              : '#b0bec5'
                          }
                          variant="Bold"
                          className="cursor-pointer p-0 -mt-2"
                        />
                      </span>
                    </span>

                    {allowSearchInColumns == true ? (
                      <div className="flex items-center ">
                        <div className="p-2 m-2 border-l">
                          <input
                            type="text"
                            placeholder={column.label}
                            className={cn(
                              'w-full p-3 text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-brotecs-blue mx-2',
                              column.key === 'actions' && 'invisible',
                              isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'
                            )}
                            value={searchInputs.value[column.key] || ''}
                            onChange={(e) => handleSearchChange(column.key, e.target.value)}
                          />
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={cn('text-sm font-light', isDarkMode ? 'bg-gray-900 text-white divide-gray-700' : 'bg-white divide-gray-200')}>
            {paginatedTasks?.map((row, rowIndex) => {
              const isChecked = selectedItem?.some((item) => item.id === row.id);
              return (
                <tr
                  key={rowIndex}
                  className={cn(
                    'text-xs font-normal leading-[14.52px] text-left',
                    { 'bg-brotecs-black-3 text-gray-100': editedData?.id === row.id },
                    !editedData && (isDarkMode ? 'bg-gray-800' : 'bg-white'), // Set background color based on dark mode
                    isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                  )}
                >
                  {allowCheckbox == true ? (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(row)} // Handle toggle selection
                      />
                    </td>
                  ) : (
                    <></>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn('p-3 pl-6', isDarkMode ? 'text-gray-500' : 'text-brotecs-black')}
                    >
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage.value}
        rowsPerPage={rowsPerPage.value}
        // totalPages={3}
        // currentPage={2}
        // rowsPerPage={5}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />

    </div>
  );
};

export default Table;
