import logoSrc from '~/assets/images/logo.svg';
import { HeaderLink, UserPopover } from './libs/components/components.js';
import styles from './styles.module.css';
import { useAppSelector, usePopover } from '~/hooks/hooks.js';
import { AppPath } from '~/common/enums/enums.js';
import { Avatar, NavLink } from '../components.js';
import { useLocation } from 'react-router-dom';
import { getValidClassNames } from '~/helpers/helpers.js';

const Header = (): JSX.Element => {
  const location = useLocation();
  const { isOpened: isUserOpened, onClose: onUserClose, onOpen: onUserOpen } = usePopover();

  const authenticatedUser = useAppSelector(({ auth }) => auth.user);

  if (!authenticatedUser) {
    return <></>;
  }

  const { name, photos } = authenticatedUser;

  const isBigMargin = [AppPath.PROFILE].some((path) => path === location.pathname);

  return (
    <header
      className={getValidClassNames(styles['header'], {
        [styles['big-margin']]: isBigMargin,
      })}
    >
      <NavLink className={styles['logo-link'] as string} to={AppPath.ROOT}>
        <img alt="logo" className={styles['logo-img']} src={logoSrc} />
      </NavLink>
      <div className={styles['header-links']}>
        <HeaderLink label="Astro Profile" link={AppPath.ASTROPROFILE} />
        <HeaderLink label="Find Matches" link={AppPath.FIND_MATCH} />
        <UserPopover isOpened={isUserOpened} name={name} onClose={onUserClose}>
          <button className={styles['user-popover-trigger']} onClick={isUserOpened ? onUserClose : onUserOpen}>
            <Avatar name={name} imageUrl={photos && photos.length > 0 ? photos[0] : undefined} />
          </button>
        </UserPopover>
      </div>
    </header>
  );
};

export { Header };
