import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Characters from "./pages/Characters";
import About from "./pages/About";
import LessonTest from "./components/LessonTest";
import AudioButton from "./components/ButtonTest";
import Landing from "./pages/Landing";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { UserContextProvider } from "./context/userContext";
import RootLayout from "./RootLayout/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Landing />} />
      <Route path="home" element={<Home />} />
      <Route path="vocabs">
        <Route path="lesson" element={<LessonTest />} />
      </Route>
      <Route path="characters">
        <Route path="display" element={<Characters />} />
        <Route path="hiragana/lesson" element={<LessonTest />} />
        <Route path="katakana/lesson" element={<LessonTest />} />
      </Route>
      <Route path="profile">
        <Route path="user" element={<Profile />} />
        <Route path="edit" element={<EditProfile />} />
      </Route>
      <Route path="about">
        <Route path="about" element={<About />} />
        <Route path="landing" element={<AudioButton />} />
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
