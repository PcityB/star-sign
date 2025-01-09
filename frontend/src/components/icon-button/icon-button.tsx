import { IconName } from '~/common/types/types.js';
import { ICON_SIZE } from './libs/constants/constants.js';
import styles from './styles.module.css';
import { getValidClassNames } from '~/helpers/helpers.js';
import { Icon } from '../components.js';

type Properties = {
  iconName: IconName;
  isDisabled?: boolean;
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'outlined' | 'primary';
  iconSize?: number;
};

const IconButton = ({
  iconName,
  isDisabled = false,
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  iconSize,
}: Properties): JSX.Element => {
  const isOutlined = variant === 'outlined';
  const buttonClasses = getValidClassNames({
    [styles['icon-button'] as string]: true,
    [styles['outlined'] as string]: isOutlined,
  });

  return (
    <button aria-label={label} className={buttonClasses} disabled={isDisabled} onClick={onClick} type={type}>
      <span className="visually-hidden">{label}</span>
      <Icon height={iconSize || ICON_SIZE} name={iconName} width={iconSize || ICON_SIZE} />
    </button>
  );
};

export { IconButton };
