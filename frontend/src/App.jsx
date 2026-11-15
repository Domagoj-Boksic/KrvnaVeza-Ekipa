import { Routes, Route } from "react-router";

import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/auth/AuthPage";
import HomePage from "./pages/home/HomePage";
import Layout from "./components/Layout";
import { ROLES } from "./utils/uloge";

const Placeholder = ({ title }) => <h1>{title}</h1>;

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/zalihe" element={<Placeholder title="Zalihe" />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/termini" element={<Placeholder title="termini" />} />
          <Route
            path="/moja-darivanja"
            element={<Placeholder title="Moja darivanja" />}
          />
          <Route
            path="/moj-profil"
            element={<Placeholder title="Moj profil" />}
          />
        </Route>

        <Route element={<ProtectedRoute roles={[ROLES.DJELATNIK]} />}>
          <Route path="/pregled" element={<Placeholder title="Pregled" />} />
          <Route
            path="/statistika"
            element={<Placeholder title="Statistika" />}
          />
        </Route>

        <Route element={<ProtectedRoute roles={[ROLES.ORGANIZATOR]} />}>
          <Route
            path="/moje-akcije"
            element={<Placeholder title="Moje akcije" />}
          />
        </Route>

        <Route element={<ProtectedRoute roles={[ROLES.ADMINISTRATOR]} />}>
          <Route path="/admin" element={<Placeholder title="Upravljanje" />} />
        </Route>
      </Route>

      <Route path="*" element={<Placeholder title="404" />} />
    </Routes>
  );
};

export default App;
