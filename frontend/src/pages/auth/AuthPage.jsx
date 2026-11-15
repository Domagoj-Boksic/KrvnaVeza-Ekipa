import { Navigate } from 'react-router'

import styles from "./AuthPage.module.css";
import { useAuth } from "../../hooks/AuthContext";
import Button from "../../components/button/Button";
import Logo from "../../components/logo/Logo"

const AuthPage = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  // ako je user ulogiran proslijedi ga na home
  if (user) return <Navigate to="/" replace />;
  return (
    <div className={styles.container}>
      <Logo variant="auth" />
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
