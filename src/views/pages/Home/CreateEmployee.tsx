import { SubmitHandler } from 'react-hook-form';
// import NPS_Loader from '../../../components/NPS_Loader/NPS_Loader';
// import { Contact } from '../../../global';
import { useSignal } from '@preact/signals-react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormRC from '../../../components/Form/FormRC';
import {  TableData } from '../../../global';
import { useEmployee } from '../../../ContextProvider/EmployeeProvider';
import { showSuccessToast } from '../../../components/Toast/toastUtils';
import { ToastContainer } from 'react-toastify';
import ImageUpload from '../../../components/CustomInput/ImageInput';
import ComboBox from '../../../components/CustomInput/ComboBox';
import { useTheme } from '../../../ContextProvider/ThemeContext';
import cn from '../../../utils/cn';
// import { Addcontact, updateContact } from '../../../services/ContactApi/contact';

const CreateContact = () => {
  const loadingSkeleton = useSignal(false);
  const navigate = useNavigate();
  const location = useLocation();
  const employeeRowData = location.state?.TableData;
  console.log("employeeRowData :", employeeRowData);
  const { addEmployee, updateEmployee } = useEmployee();
  const { isDarkMode } = useTheme()

  const formFields = [
    {
      label: 'First Name',
      name: 'firstName',
      type: 'text',
      placeholder: 'Enter your first name',
      required: true,
    },
    {
      label: 'Upload Image',
      name: 'profilePicture',
      type: 'file',
      placeholder: 'Upload file',
      required: true,
      inputType: ImageUpload,
      imagePreview: true,
    },
    {
      label: 'Last Name',
      name: 'lastName',
      type: 'text',
      placeholder: 'Enter your last name',
      required: true,
    },
    {
      label: 'Title',
      name: 'title',
      type: 'text',
      placeholder: 'Title',
      required: true,
    },

    {
      label: 'Company Name',
      name: 'companyName',
      type: 'text',
      placeholder: 'Company Name',
      required: true,
    },
    {
      label: 'Phone',
      name: 'phone',
      type: 'text',
      placeholder: 'Phone',
      required: true,
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
    },
    {
      label: 'Owner',
      name: 'owner',
      type: 'text',
      placeholder: 'owner',
      required: true,
    },
    {
      label: 'Company Phone',
      name: 'companyPhone',
      type: 'text',
      placeholder: 'company phone',
      required: true,
    },
    {
      label: 'Lead',
      name: 'leadStatusKey',
      inputType: ComboBox,
      options: [
        { id: 1, value: 'Technology' },
        { id: 2, value: 'Healthcare' },
        { id: 3, value: 'Finance' },
        { id: 4, value: 'Education' },
      ],
      placeholder: 'Select an industry',
      required: true,
    },
    {
      label: 'Address',
      name: 'address',
      type: 'text',
      placeholder: 'address',
      required: true,
    },
    {
      label: 'Industry',
      name: 'industry',
      type: 'text',
      placeholder: 'industry',
      required: true,
    },
    {
      label: 'Created At',
      name: 'createdAt',
      type: 'date',
      placeholder: 'createdAt',
      required: true,
    },
    {
      label: 'Last Contacted',
      name: 'lastContacted',
      type: 'date',
      placeholder: 'last contacted',
      required: true,
    },
    {
      label: 'Notes',
      name: 'notes',
      type: 'text',
      placeholder: 'notes',
      required: true,
    },



  ];

  const handleFormSubmit: SubmitHandler<Record<string, any>> = async (data) => {
    console.log("profile : ", data);
    const newData: TableData = {
      id: employeeRowData?.id ? employeeRowData.id : Date.now(), // Generate unique ID
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      profilePicture: data.profilePicture || '',
      title: data.title || "",
      companyName: data.companyName || "",
      phone: data.phone || "",
      email: data.email || "",
      owner: data.owner || "",
      companyPhone: data.companyPhone || "",
      leadStatusKey: Number(data.leadStatusKey) || 0,
      address: data.address || "",
      industry: data.industry || "",
      createdAt: new Date().toISOString().split("T")[0],
      lastContacted: new Date().toISOString().split("T")[0],
      notes: data.notes || "",
    };

    try {

      if (employeeRowData) {


        updateEmployee(newData);
        showSuccessToast("Employee updated successfully");
      } else {
        console.log("hlw ----------------------");
        addEmployee(newData)
        showSuccessToast("add new employee successfully")
      }

      // console.log('API Response:', response);

      // Perform any additional actions after a successful API call
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      console.error('Error submitting the form:', error);
    } finally {
      loadingSkeleton.value = false;
    }
  };

  return (
    <>
      {loadingSkeleton.value ? (
        <div>
          {/* <NPS_Loader /> */}
        </div>
      ) : (
        <>
          <div className="p-4 font-inter">
            <h1
              className={cn(
                'font-semibold leading-5 mb-4 text-base transition-colors',
                isDarkMode ? 'text-gray-300' : 'text-brotecs-black-1'
              )}
            >
              Create Contact
            </h1>
            <div
              className={cn(
                'p-6 mx-auto rounded-lg border-[.8px] transition-colors',
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-brotecs-gray'
              )}
            >

              <FormRC
                background="bg-brotecs-outline p-4 rounded border border-brotecs-default mb-4"
                gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8"
                fields={formFields}
                employeeRowData={employeeRowData}
                onSubmit={handleFormSubmit}
                submitLabel={employeeRowData ? "update employee" : "Create employee"}
                buttonWidth="w-1/5 flex gap-3"
                cancel={true}
                title="Employee Information"
                inputClassName="p-2"
                navigateLink="/"
              />
            </div>
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
            />
          </div>
        </>
      )}
    </>
  );
};

export default CreateContact;
