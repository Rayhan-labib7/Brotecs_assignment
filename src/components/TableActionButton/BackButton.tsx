import React from 'react';
import { ArrowLeft, ArrowUp2, ArrowDown2 } from 'iconsax-react';
import Button from '../../components/buttons/ButtonRC';
import cn from '../../utils/cn';

interface ActionButtonsProps {
  handleBackToHome?: () => void;
  handleToggleInsights?: () => void;
  showInsights?: boolean;
  backToHomeLabel?: string;
  toggleInsightsLabels?: {
    show: string;
    close: string;
  };
}

const BackButton: React.FC<ActionButtonsProps> = ({
  handleBackToHome,
  handleToggleInsights,
  showInsights,
  backToHomeLabel,
  toggleInsightsLabels,
}) => {
  return (
    <div className="flex items-center p-5 pb-0">
      {backToHomeLabel && (
        <Button variant="iconBtn" onClick={handleBackToHome}>
          <ArrowLeft className="mr-2" size="16" />
          {backToHomeLabel}
        </Button>
      )}
      {toggleInsightsLabels && (
        <Button
          variant="iconBtn"
          hoverColor="hover:bg-blue-100"
          bgColor={cn({ 'bg-blue-100': showInsights })}
          onClick={handleToggleInsights}
        >
          {showInsights ? toggleInsightsLabels.close : toggleInsightsLabels.show}
          <div className={cn(`p-1 rounded-full ml-2`, showInsights ? 'bg-white' : 'bg-blue-100')}>
            {showInsights ? <ArrowUp2 size="12" /> : <ArrowDown2 size="12" />}
          </div>
        </Button>
      )}
    </div>
  );
};

export default BackButton;
