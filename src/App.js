import "./App.css";
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Characters from "./pages/Characters";
import About from "./pages/About";
import LessonTest from "./components/LessonTest";
import Landing from "./pages/Landing";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { UserContextProvider } from "./context/userContex";
import RootLayout from "./RootLayout/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="vocabs/lesson" element={<Lesson />} />
      <Route path="characters" element={<Characters />} />
      <Route path="profile">
        <Route path="test" element={<Profile />} />
        <Route path="edit" element={<EditProfile />} />
      </Route>
      <Route path="characters/hiragana/lesson" element={<LessonTest />} />
      <Route path="characters/katakana/lesson" element={<LessonTest />} />
      <Route path="about">
        <Route path="about" element={<About />} />
        <Route path="landing" element={<Landing />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
