import { useSignal } from '@preact/signals-react';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import cn from '../../utils/cn';
import svgIcons from '../../service/svgService';

interface ImageUploadProps {
  label?: string;
  onImageUpload: (file: File | null) => void;
  inputClassName?: string;
  placeholder?: string;
  imagePreview?: boolean;
}

const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
  ({ label = '', onImageUpload, inputClassName = '', imagePreview,placeholder }, ref) => {
    // console.log("onImageUpload ---------------------------",onImageUpload);
    console.log("labib bbbbbbbbbbbbbbbbbbbb");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const preview = useSignal<string | null>(null);
    const isDragging = useSignal<boolean>(false);
    const fileName = useSignal<string | null>(null);

    // Expose the file input ref to the parent component
    useImperativeHandle(ref, () => fileInputRef.current as HTMLInputElement);

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    };

    // Handle drag events
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      isDragging.value = true;
    };

    const handleDragLeave = () => {
      isDragging.value = false;
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      isDragging.value = false;

      const file = e.dataTransfer.files?.[0];
      handleFile(file);
    };

    // Common file handler
    const handleFile = (file: File | undefined) => {
      // file ? URL.createObjectURL(file) 
      console.log("chekc file ",file);
      if (file && file.type.startsWith('image/')) {
        preview.value = URL.createObjectURL(file);
        console.log("url :",preview.value);
        fileName.value =preview.value;
        onImageUpload(file);
      } else {
        alert('Please select a valid image file.');
        preview.value = null;
        fileName.value = null;
        onImageUpload(null);
      }
    };

    // Trigger hidden file input
    const handleUploadClick = () => {
      fileInputRef.current?.click();
    };

    return (
      <div
      className={cn(`relative w-full`, {
        'mb-0.5 mt-0': !imagePreview,
      })}
    >
      {/* Display Area with Drag-and-Drop */}
      {!imagePreview && <label className="text-sm text-brotecs-black-1 dark:text-gray-300">{label}</label>}
      <div
        className={cn(
          'flex items-center border rounded-md justify-center bg-white dark:bg-gray-900 cursor-pointer transition-all',
          isDragging.value ? 'border-blue-500 dark:border-blue-400' : 'border-brotecs-black-4 dark:border-gray-700',
          !imagePreview ? 'h-10' : 'h-20',
          inputClassName
        )}
        onClick={handleUploadClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview.value ? (
          imagePreview ? (
            <img src={preview.value} alt="Preview" className="h-full object-contain" />
          ) : (
            <span className="text-brotecs-black dark:text-white text-sm font-normal truncate max-w-full">
              {fileName.value || 'No file selected'}
            </span>
          )
        ) : (
          <div
            className={cn(`flex items-center gap-2 text-brotecs-black dark:text-white text-sm font-normal`, {
              'w-full justify-between': !imagePreview,
            })}
          >
            <span className="text-brotecs-black-1/40 dark:text-gray-400 text-sm">
              {isDragging.value ? 'Drop image here' : placeholder}
            </span>
            <span dangerouslySetInnerHTML={{ __html: svgIcons.upload }} />
          </div>
        )}
      </div>
    
      {/* Hidden File Input */}
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
    </div>
    
    );
  }
);

ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
