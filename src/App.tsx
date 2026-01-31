import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Index from "./component/Index";
// import Signup from "./component/Signup";
import Landing from "./component/Landing";

function App() {
  return (
    <>
      {/* <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router> */}
      <Landing />
    </>
  );
}

export default App;
