import { NavLink, useNavigate, Link } from "react-router";
import { CgProfile } from "react-icons/cg";

import styles from "./Header.module.css";
import { useDropdown } from "../../hooks/useDropdown";
import { useAuth } from "../../hooks/AuthContext";
import { useProfileLinks } from "../../hooks/useLinks";

const ProfileIcon = () => {
  const { open, toggle, close, ref } = useDropdown();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      close();
      navigate("/login");
    }
  }

  const iconClasses = `${styles.navIcon} ${styles.profileIcon}`;
  const labelClasses = `${styles.navLabel} ${styles.profileLabel}`;

  const profileLinks = useProfileLinks();

  return (
    <div className={styles.profileIconContainer} ref={ref}>
      <button className={styles.navItem} onClick={toggle}>
        <CgProfile className={iconClasses} />
        <span className={labelClasses}>Moj profil</span>
      </button>

      {open && (
        <div className={styles.drop}>
          {user ? (
            <NavLink
              to="/moj-profil"
              className={styles.dropItem}
              onClick={close}
            >
              Moj profil
            </NavLink>
          ) : (
            ""
          )}
          {profileLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={styles.dropItem}
              onClick={close}
            >
              {label}
            </NavLink>
          ))}
          {!user ? (
            <Link to="/login" className={styles.dropItem} onClick={close}>
              Sign in
            </Link>
          ) : (
            <button onClick={handleLogout} className={styles.dropItem}>
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
