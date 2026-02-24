import "./App.css";
import Assests from "./component/Assests";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./component/Index";
import Signup from "./component/Signup";
import Landing from "./component/Landing";
import Setupb from "./component/Setupb";
import Chatbot from "./component/Chatbot";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/setup" element={<Assests />} />
          <Route path="/dashboard" element={<Setupb />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Router>
      {/* <Landing />

      {/* <Assests /> */}
    </>
  );
}

export default App;
