import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import FindMe from "../components/Findme";
import FindMe2 from "../components/Findme2";
import Findme_test from "../components/Findme_test";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/findme" element={<FindMe />} /> */}
        <Route path="/findme2" element={<FindMe2 />} />
        {/* <Route path="/findme" element={<Findme_test/>} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
