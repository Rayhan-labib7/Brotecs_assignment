import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Button from '../buttons/ButtonRC';
import cn from '../../utils/cn';
import { useNavigate } from 'react-router-dom';
import ComboBox from '../CustomInput/ComboBox';
import { TableData } from '../../global';
import ImageUpload from '../CustomInput/ImageInput';

interface FormFieldProps {
  name: string;
  required?: boolean;
  label: string;
  // inputType?: string;
  inputType?: React.ComponentType<any>;
  type?: string; // Optional: For different input types (e.g., text, number, password)
  placeholder?: string;
  options?: { id: number | string; value: string }[];
  icon?: React.ElementType; // Optional: The icon component
  iconClick?: () => void; // Optional: The function to execute when the icon is clicked
}

interface FormProps {
  fields: FormFieldProps[]; // Array of form fields to dynamically render
  onSubmit: SubmitHandler<Record<string, any>>;
  submitLabel?: string;
  gridClassName?: string;
  inputClassName?: string;
  buttonWidth?: string;
  cancel?: boolean;
  title?: string;
  background?: string;
  navigateLink?: any;
  employeeRowData?: TableData[];
}

const FieldError: React.FC<{ error?: string }> = ({ error }) => {
  return <span className="text-sm text-red-500 mt-1 mb-1">{error || '\u00A0'}</span>;
};

const FormRC: React.FC<FormProps> = ({
  background,
  fields,
  title,
  cancel,
  onSubmit,
  submitLabel,
  buttonWidth,
  gridClassName,
  inputClassName,
  navigateLink,
  employeeRowData,
}) => {


  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<Record<string, any>>({
    defaultValues: employeeRowData || {},
  }); // Generic type for dynamic fields
  console.log("check labib ", employeeRowData);
  //Reset form when contactRowData changes
  useEffect(() => {
    if (employeeRowData) {
      reset(employeeRowData);
    }
  }, [employeeRowData, reset]);

  const navigateToCancel = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  console.log("preview", preview);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(background, 'dark:bg-gray-900 dark:text-white')}>
        <h1 className="mb-4 text-brotecs-blue text-base dark:text-brotecs-light-blue">{title}</h1>
        <div className={cn(`grid`, gridClassName)}>
          {fields.map((
            field,

          ) => {

            console.log("hlw :", field.inputType?.displayName);
            if (field.inputType?.displayName === "ComboBox") {
              return (
                <div key={field.name} className="flex justify-center flex-col relative">
                  <Controller
                    name={field.name || ""}
                    control={control}
                    rules={{ required: `${field.label} is required` }}
                    render={({ field: { onChange, value } }) => {
                      const selectedOption = field.options?.find((option) => option.id === value);

                      return (
                        <ComboBox
                          options={field.options || []}
                          label={field.label}
                          placeholder={field.placeholder}
                          onSelect={(option) => onChange(option.id)}
                          value={selectedOption?.value || ""}
                          border="border-brotecs-black-4 dark:border-gray-700"
                          inputClassName={inputClassName}
                          parentClassName="mt-0"
                        />
                      );
                    }}
                  />
                  <FieldError error={errors[field.name]?.message?.toString()} />
                </div>
              );
            }

            if (field.inputType?.displayName === "ImageUpload") {
              return (
                <div key={field.name} className="flex justify-center flex-col relative">
                  <Controller
                    name={field.name}
                    control={control}
                    rules={{ required: `${field.label} is required` }}
                    render={({ field: { onChange } }) => (
                      <ImageUpload
                        label="Upload Image"
                        // onImageUpload={(file) => console.log("-----inline chekc : ",file)}
                        onImageUpload={(file) => {
                          onChange(file ? URL.createObjectURL(file) : null); // Store the File object in React Hook Form
                          setPreview(file ? URL.createObjectURL(file) : null);

                        }}
                        placeholder={field.placeholder}
                        inputClassName={inputClassName}
                      // imagePreview={true}
                      />
                    )}
                  />
                  <FieldError error={errors[field.name]?.message?.toString()} />
                </div>
              );
            }

            return (
              <div key={field.name} className="flex justify-center flex-col relative">
                <label
                  htmlFor={field.name}
                  className={cn(
                    `font-normal leading-5 tracking-wide text-brotecs-black-1/80 dark:text-gray-300 mb-1`,
                    submitLabel === "Create Contact" ? "text-sm" : "text-base"
                  )}
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  {...register(field.name, { required: `${field.label} is required` })}
                  type={field.type || "text"}
                  placeholder={field.placeholder || ""}
                  className={cn(
                    `w-full placeholder:text-brotecs-black-1/40 dark:placeholder:text-gray-400 
          text-brotecs-black dark:text-white text-sm font-normal px-3 py-3 border 
          border-brotecs-black-4 dark:border-gray-700 bg-white dark:bg-gray-900 
          rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 
          dark:focus:border-blue-400 dark:focus:ring-blue-400 placeholder:text-sm 
          ${inputClassName} ${field.type === "number" ? "no-spinner" : ""}`
                  )}
                />
                <FieldError error={errors[field.name]?.message?.toString()} />
              </div>
            );
          })}

        </div>
      </div>
      <div className={cn('mt-2', buttonWidth)}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <Button
            size={submitLabel === 'Create Contact' ? 'xs' : 'md'}
            bgColor="bg-brotecs-blue dark:bg-gray-700"
            className={cn(submitLabel !== 'Create Contact' && 'w-full sm:w-auto')}
            textColor="text-white dark:text-white"
            type="submit"
            hoverColor="hover:bg-brotecs-blue/90 dark:hover:bg-brotecs-blue-600"
          >
            {submitLabel}
          </Button>

          {cancel && (
            <Button
              size="md"
              hoverColor="hover:bg-red-400 "
              hoverTextColor="hover:text-white "
              textColor="text-red-600 dark:text-red-700 "
              bgColor="bg-brotecs-light-red dark:bg-red-200"
              className="w-full sm:w-1/4"
              onClick={() => navigateToCancel(navigateLink)}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

    </form>
  );
};

export default FormRC;
