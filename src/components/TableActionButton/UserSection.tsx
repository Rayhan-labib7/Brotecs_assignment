import Badge from '../../components/badge/BadgeRC';
import { ContactDetail } from '../../global';
import cn from '../../utils/cn';

const ContactCard: React.FC<{ contact: ContactDetail[] }> = ({ contact }) => (
  <div className="flex mb-4 border border-nps-default bg-white rounded-2xl">
    {contact.map((detail, index) => (
      <div key={index} className="flex-1 flex items-start m-4 relative">
        {detail.badgeText && (
          <img alt="Badge" src="./../../../public/assets/images/user.jpg" className="w-10 h-10 rounded-full" />
        )}
        <div className={cn('flex flex-col', { 'items-start ml-4': detail.badgeText })}>
          {detail.badgeText && <Badge variant="info" text={detail.badgeText} />}
          {!detail.badgeText && <p className="text-sm text-nps-black-1 mb-1">{detail.label}</p>}
          <p className={cn(`text-sm text-nps-black`, { 'text-lg font-semibold': detail.label === 'Name' })}>
            {detail.value}
          </p>
        </div>
        {index !== contact.length - 1 && <div className="absolute right-0 top-0 bottom-0 w-px bg-nps-default" />}
      </div>
    ))}
  </div>
);
export default ContactCard;
