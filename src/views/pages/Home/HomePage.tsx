
import Table from '../../../components/Table/Table'
import ActionButtons from '../../../components/TableActionButton/Actions';
import EditableField from '../../../components/TableActionButton/EditableField';
import { useSignal } from '@preact/signals-react';
import { TableData } from '../../../global';
import EditableButton from '../../../components/TableActionButton/EditableButton';
import cn from '../../../utils/cn';
import { showSuccessToast } from '../../../components/Toast/toastUtils';
import { ToastContainer } from 'react-toastify';
import DeleteModal from '../../../components/Modal/DeleteModal';
import { useNavigate } from 'react-router-dom';
import { useEmployee } from '../../../ContextProvider/EmployeeProvider';
import SkeletonLoader from '../../../components/loader/SkeletonLoader';
import { useEffect } from 'react';
import { useTheme } from '../../../ContextProvider/ThemeContext';

type Status = 'Open' | 'Contacted' | 'Qualified' | 'Unqualified' | 'Closed';

const HomePage = () => {

  const editingRowId = useSignal<number | null>(null);
  const editedData = useSignal<TableData | null>(null);
  const taskToDelete = useSignal<TableData | null>(null);
  const { employees, deleteEmployee, updateEmployee } = useEmployee();
  const isDeleteModalOpen = useSignal(false);
  const loadingSkeleton = useSignal(true);
  const deletedID = useSignal<number>(0);
  const { isDarkMode } = useTheme();
  console.log("size of employee :", employees.length);
  const navigate = useNavigate();


  const goToViewPage = (data: any) => {
    navigate('/create-empolyee', { state: { TableData: data } });
  };

  const goToCreatePage = () => {
    navigate('/create-empolyee');
  };


  const handleEditClick = (row: TableData) => {
    editingRowId.value = row.id;
    editedData.value = { ...row };
  };

  const handleCancelClick = () => {
    editingRowId.value = null;
    editedData.value = null;
  };

  const handleInputChange = (key: keyof TableData, value: string) => {
    if (editedData.value) {
      editedData.value = { ...editedData.value, [key]: value };
    }
  };

  const handleDeleteClick = (task: any) => {
    console.log(task);
    taskToDelete.value = task;
    deletedID.value = task?.id;
    isDeleteModalOpen.value = true;
  };

  const handleSaveClick = async () => {
    const updatedData = editedData.value;
    if (!updatedData) return;
    updateEmployee(updatedData)
    showSuccessToast("data update successfully");
    editingRowId.value = null;
    editedData.value = null;
  };

  const handleDelete = async () => {
    deleteEmployee(deletedID.value)
    showSuccessToast('Employee successfully deleted');
    handleCloseModal();
  };

  const handleCloseModal = () => {
    isDeleteModalOpen.value = false;
  };
  const columns = [
    {
      key: 'firstName',
      label: 'Name',
      render: (row: TableData) => (
        <EditableField
          value={editingRowId.value === row.id ? editedData.value?.firstName || '' : row.firstName}
          isEditing={editingRowId.value === row.id}
          onChange={(value) => handleInputChange('firstName', value)}
        />
      ),
    },
    {
      key: 'title',
      label: 'Title',
      render: (row: TableData) => (
        <EditableField
          value={editingRowId.value === row.id ? editedData.value?.title || '' : row.title}
          isEditing={editingRowId.value === row.id}
          onChange={(value) => handleInputChange('title', value)}
        />
      ),
    },
    {
      key: 'companyName',
      label: 'Company',
      render: (row: TableData) => (
        <EditableField
          value={editingRowId.value === row.id ? editedData.value?.companyName || '' : row.companyName}
          isEditing={editingRowId.value === row.id}
          onChange={(value) => handleInputChange('companyName', value)}
        />
      ),
    },
    {
      key: 'companyPhone',
      label: 'Phone',
      render: (row: TableData) => (
        <EditableField
          value={editingRowId.value === row.id ? editedData.value?.companyPhone || '' : row.companyPhone}
          isEditing={editingRowId.value === row.id}
          onChange={(value) => handleInputChange('companyPhone', value)}
        />
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (row: TableData) => (
        <EditableField
          value={editingRowId.value === row.id ? editedData.value?.email || '' : row.email}
          isEditing={editingRowId.value === row.id}
          onChange={(value) => handleInputChange('email', value)}
        />
      ),
    },
    {
      key: 'leadStatusKey',
      label: 'Lead Status',
      render: (lead: TableData) => {
        const statusMap: Record<number, Status> = {
          0: 'Open',
          1: 'Contacted',
          2: 'Qualified',
          3: 'Unqualified',
          4: 'Closed',
        };

        const statusColors: Record<Status, string> = {
          Open: 'bg-blue-100 text-blue-800',
          Contacted: 'bg-yellow-100 text-yellow-800',
          Qualified: 'bg-green-100 text-green-800',
          Unqualified: 'bg-red-100 text-red-800',
          Closed: 'bg-gray-100 text-gray-800',
        };

        const statusLabel = statusMap[lead.leadStatusKey] || 'Unknown';
        const statusClass = statusColors[statusLabel as Status] || 'bg-gray-100 text-gray-800';

        return (
          <span className={cn(`px-2 inline-flex text-xs leading-5 font-normal rounded-full ${statusClass}`)}>
            {statusLabel}
          </span>
        );
      },
    },

    {
      key: 'owner',
      label: 'Owner',
      render: (row: TableData) => (
        <EditableField
          value={editingRowId.value === row.id ? editedData.value?.owner || '' : row.owner}
          isEditing={editingRowId.value === row.id}
          onChange={(value) => handleInputChange('owner', value)}
        />
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row: TableData) =>
        editingRowId.value === row.id ? (
          <>
            <EditableButton onSave={handleSaveClick} onCancel={handleCancelClick} />
          </>
        ) : (
          <ActionButtons
            onViewClick={() => goToViewPage(row)}
            onEditClick={() => handleEditClick(row)}
            onDeleteClick={() => handleDeleteClick(row)}
          />
        ),
    },
  ];
  useEffect(() => {
    const timer = setTimeout(() => {
      loadingSkeleton.value = false;
    }, 1000);
    return () => clearTimeout(timer)
  })
  return (
    <div >
      {loadingSkeleton.value ? (
        <SkeletonLoader />
      ) : (
        <div className="p-5">
          <Table
            columns={columns}
            title="My Employee Data"
            data={employees}
            onAddClick={goToCreatePage}
            addBtnName="+ Create data"
          />
          <DeleteModal
            isOpen={isDeleteModalOpen.value}
            onClose={handleCloseModal}
            onDelete={handleDelete}
            taskName={taskToDelete.value?.firstName || ''}
            titleName="Leads"
          />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={isDarkMode ? 'dark' : 'light'} // Apply dark mode to ToastContainer
          />
        </div>
      )}
    </div>
  )
}

export default HomePage