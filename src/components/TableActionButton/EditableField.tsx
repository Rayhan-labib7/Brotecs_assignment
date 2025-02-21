import React, { useEffect, useState } from 'react';

interface EditableFieldProps {
  value: any;
  isEditing: boolean;
  onChange: (value: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ value, isEditing, onChange }) => {
  const [rawValue, setRawValue] = useState(value); // Store raw value with spaces
  useEffect(() => {
    setRawValue(value);
  }, [value]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setRawValue(newValue); // Update raw value to include spaces
    onChange(newValue.trimEnd()); // Trim value only when passing to parent for processing
  };

  return isEditing ? (
    <div>
      <input
        type="text"
        value={rawValue}
        onChange={handleInputChange}
        className="border rounded p-2 border-nps-black-1 bg-nps-black-3 w-full"
      />
    </div>
  ) : (
    <span>{value}</span>
  );
};

export default EditableField;
