import "./App.css";
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Characters from "./pages/Characters";
import About from "./pages/About";
import LessonTest from "./components/LessonTest";
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
          <Route path="landing" element={<Landing />} />
          <Route path="vocab" element={<Lesson />} />
          <Route path="vocab/vocab/lesson" element={<LessonTest />} />
          <Route path="characters" element={<Characters />} />
          <Route path="characters/hiragana/lesson" element={<LessonTest />} />
          <Route path="characters/katakana/lesson" element={<LessonTest />} />
          <Route path="profile" element={<Profile />}>
            <Route path="edit" element={<EditProfile />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="test" element={<LessonTest />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
