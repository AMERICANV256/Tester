import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import App from "../App";

import { AuthProvider } from "../context/AuthProvider";

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
