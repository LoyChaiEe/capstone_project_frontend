import Vocab from "./pages/Vocab";
import Lesson from "./components/Lesson";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Characters from "./pages/Characters";
import Voices from "./pages/Voices";
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
      <Route path="lesson" element={<Vocab />} />
      <Route path="vocabs">
        <Route path="lesson" element={<Lesson />} />
      </Route>
      <Route path="characters">
        <Route path="display" element={<Characters />} />
        <Route path="hiragana/lesson" element={<Lesson />} />
        <Route path="katakana/lesson" element={<Lesson />} />
      </Route>
      <Route path="profile">
        <Route path="user" element={<Profile />} />
        <Route path="edit" element={<EditProfile />} />
      </Route>
      <Route path="voicevox">
        <Route path="voices" element={<Voices />} />
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
