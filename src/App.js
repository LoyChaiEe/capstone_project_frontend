import "./App.css";
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import Profile from "./pages/Profile";
import Characters from "./pages/Characters";
import About from "./pages/About";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="lesson" element={<Lesson />} />
        <Route path="characters" element={<Characters />} />
        <Route path="profile" element={<Profile />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
