import styles from "./Button.module.css";
import { Link } from 'react-router'

const Button = ({ children, to, href, onClick, variant = "primary-btn" }) => {
  const combinedClassName = `${styles["btn-base"]} ${styles[variant]}`;
  // ako ima atribut 'to' onda napravi Link
  if (to)
    return (
      <Link to={to} className={combinedClassName}>
        {children}
      </Link>
    );
  // ako ima atribut href onda napravi a
  if (href)
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
    );

  // inace obican button
  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default Button;
