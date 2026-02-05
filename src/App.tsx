import "./App.css";
import Assests from "./component/Assests";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./component/Index";
import Signup from "./component/Signup";
import Landing from "./component/Landing";
import Setupb from "./component/Setupb";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/setup" element={<Assests />} />
          <Route path="/fianl-setup" element={<Setupb />} />
        </Routes>
      </Router>
      {/* <Landing />

      {/* <Assests /> */}
    </>
  );
}

export default App;
