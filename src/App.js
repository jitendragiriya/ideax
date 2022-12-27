import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GAME_OVER_URL, HOME_URL, LOGIN_URL } from "./constants/urls";
import LoginPage from "./pages/auth/LoginPage";
import ProtectedRoutes from "./middleware/ProtectedRoutes";
import HomePage from "./pages/home/HomePage";
import GameOver from "./pages/GameOver";

function App() {
  return (
    <div className={`bg-[#f7f7f7] text-[#383838] duration-75`}>
      <Router>
        <Routes>
          {/* public routes */}
          <Route exact path={LOGIN_URL} element={<LoginPage />} />
          {/* protected routes */}
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path={HOME_URL} element={<HomePage/>}></Route>
            <Route path={GAME_OVER_URL} element={<GameOver/>}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
