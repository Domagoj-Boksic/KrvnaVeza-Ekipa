import styles from "./AuthPage.module.css";
import logo from "../../assets/medical.png";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/button/Button";

import { Navigate } from 'react-router'

const AuthPage = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  // ako je user ulogiran proslijedi ga na home
  if (user) return <Navigate to="/" replace />;
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="logo picture" />
      </div>
      <div className={styles.info}>
        <h1>Spasi život!</h1>
        <p>
          Doniraj krv u obližnjim transfuzijskim centrima i aktualnim akcijama
          darivanja!
        </p>
      </div>
      <div className={styles["sign-in"]}>
        <Button to="/" variant="secondary-btn">
          Nastavi kao gost
        </Button>
        <Button href="/auth/google" variant="primary-btn">
          Nastavi s Googleom
        </Button>
      </div>
    </div>
  );
};

export default AuthPage;
