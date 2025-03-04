import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import FindMe from "../components/Findme";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/findme" element={<FindMe />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
