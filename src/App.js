import "./App.css";
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Characters from "./pages/Characters";
import About from "./pages/About";
import Landing from "./pages/Landing";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="app-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="lesson" element={<Lesson />} />
          <Route path="characters" element={<Characters />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
