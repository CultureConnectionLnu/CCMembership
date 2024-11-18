import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './fontawesome';

const SocialIcons = () => {
  return (
    <div className="flex space-x-4 justify-center mt-4 gap-4 p-4">
      <a href="https://instagram.com/cultureconnectionlnu" className="text-white hover:text-gray-900" target='_blank'>
        <FontAwesomeIcon icon={['fab', 'instagram']} size="2x" />
      </a>
      <a href="https://discord.gg/jTSNbTneyx" className="text-white hover:text-gray-900" target='_blank'>
        <FontAwesomeIcon icon={['fab', 'discord']} size="2x" />
      </a>
      <a href="https://chat.whatsapp.com/BQwvpZUYekY4IP0xTTgPOv" className="text-white hover:text-gray-900" target='_blank'>
        <FontAwesomeIcon icon={['fab', 'whatsapp']} size="2x" />
      </a>
      <a href="https://www.facebook.com/groups/1380602086168241" className="text-white hover:text-gray-900" target='_blank'>
        <FontAwesomeIcon icon={['fab', 'facebook']} size="2x" />
      </a>
    </div>
  );
};

export default SocialIcons;