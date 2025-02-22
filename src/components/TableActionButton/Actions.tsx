import { Eye, Edit, Trash } from 'iconsax-react';
import Button from '../../components/buttons/ButtonRC';
import Tooltip from '../../components/tooltip/tooltip';

interface ActionButtonsProps {
  onViewClick?: (item: any) => void;
  onEditClick?: (item: any) => void;
  onDeleteClick?: (item: any) => void;
  showOnlyDelete?: boolean;
  viewButton?: boolean;
  item?: any; // Pass the item or task for the handlers
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onViewClick,
  onEditClick,
  onDeleteClick,
  item,
  showOnlyDelete,
  viewButton,
}) => {
  const buttons = [
    {
      icon: <Eye className="w-5 h-5" />,
      tooltip: 'View',
      onClick: onViewClick,
      colorClasses: 'text-brotecs-black-1/80 hover:bg-gray-200 hover:text-gray-700',
    },
    {
      icon: <Edit className="w-5 h-5" />,
      tooltip: 'Edit',
      onClick: onEditClick,
      colorClasses: 'text-blue-500 hover:bg-blue-100 hover:text-blue-700',
    },
    {
      icon: <Trash className="w-5 h-5" />,
      tooltip: 'Delete',
      onClick: onDeleteClick,
      colorClasses: 'text-red-500 hover:bg-red-100 hover:text-red-700',
    },
  ];

  const buttonsToRender = showOnlyDelete ? buttons.filter((btn) => btn.tooltip === 'Delete') : buttons;

  return (
    <div className="flex space-x-1">
      {buttonsToRender.map(({ icon, tooltip, onClick, colorClasses }, index) => (
        <Tooltip key={index} content={tooltip}>
          <Button onClick={() => onClick?.(item)} size="sm" className={colorClasses}>
            {icon}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};

export default ActionButtons;
