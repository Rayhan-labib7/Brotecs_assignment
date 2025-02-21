import { SearchNormal1, ArrowDown2, ArrowUp2 } from 'iconsax-react';
import React, { Dispatch, SetStateAction } from 'react';
import { useSignal } from '@preact/signals-react';
import cn from '../../utils/cn';
import Button from '../buttons/ButtonRC';
// import { BasicButton } from '../customTool/Buttons/BasicButton';
// import ComboBox from '../textfield/ComboBox';
import { PaginationData } from '../../global';
import Pagination from './Pagination';
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
  paginationData?: PaginationData;
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
  setPaginationData?: Dispatch<SetStateAction<PaginationData>>;
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
  showStatusBarOnHeader = false,
  paginationData,
  convertBtn,
}) => {
  // const currentPage = useSignal(1);
  const currentPage = useSignal(1);
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
    if (!sortConfig.value.key || !sortConfig.value.order) {
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
    <div className="bg-white rounded-lg shadow">
      {header && (
        <div className="flex flex-col">
          <div className="flex justify-between items-center p-6">
            <div className="flex flex-row gap-6 items-center">
              {title && <h2 className="text-2xl leading-[26.63px] font-medium text-brotecs-black-1/90">{title}</h2>}
              {showHeaderSearchbar == true ? (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brotecs-blue"
                  />
                  <SearchNormal1 className="absolute left-2 top-3 text-gray-400 w-4 h-4" />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="flex space-x-4">
              {convertBtn && (
                <Button
                  size="xs"
                  bgColor="bg-white"
                  className="border border-brotecs-default"
                  textColor="text-brotecs-black-1"
                  hoverColor="hover:bg-brotecs-default/80"
                >
                  {convertBtn}
                </Button>
              )}
              {addBtnName && (
                <Button
                  size="xs"
                  onClick={onAddClick}
                  bgColor="bg-[#3498DB]"
                  textColor="text-white"
                  hoverColor="hover:bg-brotecs-blue/80"
                >
                  {addBtnName}
                </Button>
              )}
            </div>
          </div>

          {showStatusBarOnHeader == true ? (
            <div className="border rounded-md border-gray-300 p-7 mx-6 mb-6">
              <div className="flex flex-col">
                <div className="flex flex-row justify-between align-baseline gap-3">
                  {/* <ComboBox
                    options={[]}
                    label={'Status'}
                    placeholder={''}
                    onSelect={() => { }}
                    value={''}
                    border="border-brotecs-black-4"
                    inputClassName={'Class'}
                    parentClassName="mt-0"
                  />
                  <ComboBox
                    options={[]}
                    label={'Group'}
                    placeholder={''}
                    onSelect={() => { }}
                    value={''}
                    border="border-brotecs-black-4"
                    inputClassName={'Class'}
                    parentClassName="mt-0"
                  /> */}
                  <div className="w-full">
                    <label
                      htmlFor="name"
                      className={cn(`font-normal leading-5 tracking-wide text-brotecs-black-1/80 mb-1`, 'text-sm')}
                    >
                      {'Name'}
                    </label>
                    <input
                      id="name"
                      // {'...register(field.name, { required: `${'field.label'} is required` })'}
                      type={'text'}
                      placeholder={''}
                      className={cn(
                        `p-3 w-full border text-brotecs-black text-sm font-normal border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 placeholder:text-sm placeholder:text-brotecs-black-1/40`
                      )}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    size={'xs'}
                    bgColor="bg-brotecs-blue"
                    className="mr-2"
                    textColor="text-white"
                    type="submit"
                    hoverColor="hover:bg-nps-blue/90"
                  >
                    Apply
                  </Button>
                  <Button
                    size={'xs'}
                    bgColor="bg-nps-red"
                    className=""
                    textColor="text-white"
                    type="submit"
                    hoverColor="hover:bg-nps-blue/90"
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
      <div className="overflow-x-auto scrollbar">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-nps-black-3 border-t-[0.5px] border-b border-solid border-nps-default">
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
                  className="text-left p-0 text-xs font-medium text-gray-500 uppercase tracking-wide"
                >
                  <div className="flex flex-col divide-y divide-gray-200">
                    <span
                      className={cn(
                        `m-2 h-[35px]  flex items-center  p-2 text-center font-semibold  text-nps-black-1`,
                        { 'border-l': allowCheckbox }
                      )}
                    >
                      <span className="mr-1 font-medium text-nps-black text-xs">{column.label}</span>
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
                              `w-full p-3 bg-nps-black-3 text-xs border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-nps-blue mx-2`,
                              column.key === 'actions' && 'invisible'
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
          <tbody className="bg-white divide-y divide-gray-200 text-sm font-light">
            {paginatedTasks?.map((row, rowIndex) => {
              const isChecked = selectedItem?.some((item) => item.id === row.id);
              return (
                <tr
                  key={rowIndex}
                  className={cn(
                    `text-xs font-normal hover:bg-gray-100 leading-[14.52px] text-left decoration-slice text-nps-black-1`,
                    { 'bg-nps-black-3': editedData?.id === row.id },
                    !editedData && 'bg-white'
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
                    <td key={column.key} className="p-3 pl-6">
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
