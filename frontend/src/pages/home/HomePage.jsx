import MapView from "../../components/map/MapView";
import Header from "../../components/header/Header";
import styles from "./HomePage.module.css";

/*
  Treba razradit kako će funkcionirat home page 
  u odnosu na uloge
*/

const HomePage = () => {
  return (
    <>
      <Header />
      <MapView />
      <form action="/auth/logout" method="POST">
        <button type="submit">
          Logout
        </button>
      </form>
    </>
  );
};

export default HomePage;
