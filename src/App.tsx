import { BrowserRouter, Route, Routes } from "react-router-dom";

import Room from "./pages/room/Room";
import MainPage from "./pages/main/MainPage";
import SignIn from "./pages/sign-in/SignIn";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<MainPage />} />
          <Route index path="/room" element={<Room />} />
          <Route index path="/sign-in" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
