import { NavLink } from "react-router";

import styles from "./Header.module.css";
import ProfileIcon from "./ProfileIcon";
import Logo from "../logo/Logo";
import { useNavLinks } from "../../hooks/useLinks";

const Header = () => {
  const links = useNavLinks();
  return (
    <header className={styles.header}>
      <Logo to="/" withText={true} variant="header" />
      <div className={styles.right}>
        {links.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            <Icon className={styles.navIcon} aria-hidden="true" />
            <span className={styles.navLabel}>{label}</span>
          </NavLink>
        ))}
        <ProfileIcon />
      </div>
    </header>
  );
};

export default Header;
