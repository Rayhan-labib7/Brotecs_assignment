import React, { useState } from 'react';

// import ComboBox from '../../../components/textfield/ComboBox';
// import TextAreaField from '../../../components/textfield/TextArea';
// import ImageUpload from '../../../components/textfield/ImageInput';
import Button from '../../../components/buttons/ButtonRC';
// import FileInputModal from '../../../components/modal/FileInputModal';
import { ProductData, ProductInformation } from '../../../global';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/Form/InputField';
import ActionButtons from '../../../components/TableActionButton/Actions';

interface Field {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  inputType: React.FC<any>;
  options?: { id: number; value: string }[];
  imagePreview?: boolean;
}

const CreateEmployee: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [formData, setFormData] = useState({
    productCode: '',
    productGroup: '',
    unitMeasurement: 0,
    salePrice: 0,
    purchasePrice: 0,
    currency: 0,
    uploadImage: null,
    additionalDocument: null,
    status: '',
    productName: '',
    productDescription: '',
  });

  const handleSubmit = async () => {
    const productData: ProductData = {
      name: formData.productName || '',
      description: formData.productDescription || '',
      image: formData.uploadImage || '',
      productGroup: formData.productGroup || '',
      productCode: formData.productCode,
      salesPrice: formData.salePrice,
      purchasePrice: formData.purchasePrice,
      unitOfMeasurement: formData.unitMeasurement,
      currency: formData.currency,
    };

    try {
    //   const response = await AddProduct(productData, 'lead/v1/pvt/product');
    //   console.log('API Response:', response);

      // Perform any additional actions after a successful API call
      navigate('/product');
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const inputFields: Field[] = [
    { label: 'Product Code', name: 'productCode', type: 'text', placeholder: '', inputType: InputField },
    {
      label: 'Sale Price',
      name: 'salePrice',
      type: 'text',
      placeholder: 'Ex: 20',
      required: true,
      inputType: InputField,
    },
    {
      label: 'Purchase Price',
      name: 'purchasePrice',
      type: 'text',
      placeholder: 'Ex: 20',
      required: true,
      inputType: InputField,
    },
   
   
    {
      label: 'Attach Additional Document',
      name: 'additionalDocument',
      type: 'file',
      placeholder: '2 files attached',
      required: true,
      inputType: InputField,
      imagePreview: false,
    },
   
  ];

  const renderInputField = (field: Field) => {
    const InputComponent = field.inputType;

    const commonProps = {
      name: field.name,
      placeholder: field.placeholder,
      required: field.required,
      label: field.label,
      inputClassName: 'px-2 py-2 border-brotecs-black-2-1/80',
      parentClassName: 'mt-2 mb-2',
      labelClassName: 'text-sm text-brotecs-black-1',
      value: formData[field.name as keyof typeof formData] || '',
      onChange: field.type === 'file' ? handleFileChange : handleChange,
    };

    if (field.name === 'additionalDocument') {
      return (
        <div onClick={openModal}>
          <InputComponent {...commonProps} imagePreview={field.imagePreview} />
        </div>
      );
    }

   
    return <InputComponent {...commonProps} type={field.type} />;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  return (
    <div>
      <h1 className="py-5 text-lg font-bold text-brotecs-black">Create Employee</h1>
      <div className="p-5 bg-white rounded-lg shadow">
        {/* Language Selector */}
      
        {/* Product Name and Description */}
        

        {/* Input Fields */}
        <div className="grid grid-cols-3 gap-x-4 max-sm:grid-cols-1">
          {inputFields.map((field, index) => (
            <div key={index} className="mb-4">
              {renderInputField(field)}
            </div>
          ))}
        </div>
        <Button
          className="mb-4"
          size="xs"
          bgColor="bg-brotecs-blue"
          textColor="text-white"
          hoverColor="hover:bg-brotecs-blue/80"
          onClick={handleSubmit}
        >
          Add to list
        </Button>
       

        {/* {isModalOpen && <FileInputModal onClose={closeModal} isOpen={isModalOpen}></FileInputModal>} */}
      </div>
    </div>
  );
};

export default CreateEmployee;
