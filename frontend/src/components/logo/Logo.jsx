import { Link } from "react-router";

import styles from "./Logo.module.css";
import logoIcon from "../../assets/medical.png";

const Logo = ({to, withText = false, variant = "auth" }) => {
  const logoClass = styles[`${variant}Logo`];
  const content = (
    <>
        <img src={logoIcon} alt="Logo" className={styles.icon}/>
        {withText && <h2 className={styles.text}>KrvnaVeza</h2>}
    </>
  )
  
  if (to) {
    return (
        <Link to={to} className={logoClass}>
            {content}
        </Link>
    );
  }

  return <div className={logoClass}>
    {content}
  </div>
}

export default Logo;