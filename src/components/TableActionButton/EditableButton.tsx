import Button from '../../components/buttons/ButtonRC';
import Tooltip from '../../components/tooltip/tooltip';
import React from 'react';
import svgIcons from '../../service/svgService';

interface EditableButtonProps {
  onSave: () => void;
  onCancel: () => void;
}

const EditableButton: React.FC<EditableButtonProps> = ({ onSave, onCancel }) => {
  const buttons = [
    {
      icon: <span dangerouslySetInnerHTML={{ __html: svgIcons.deleteTable }} className="w-5 h-5" />,
      tooltip: 'Cancel',
      onClick: onCancel,
      colorClasses: 'text-nps-red hover:bg-red-100 hover:text-red-700',
    },
    {
      icon: <span dangerouslySetInnerHTML={{ __html: svgIcons.saveTable }} className="w-5 h-5" />,
      tooltip: 'Save',
      onClick: onSave,
      colorClasses: 'text-nps-blue hover:bg-blue-100 hover:text-blue-700',
    },
  ];

  return (
    <div className="flex gap-11">
      {buttons.map(({ icon, tooltip, onClick, colorClasses }, index) => (
        <Tooltip key={index} content={tooltip}>
          <Button onClick={onClick} size="sm" className={colorClasses}>
            {icon}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};

export default EditableButton;
