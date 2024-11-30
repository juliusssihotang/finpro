import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Self from "./pages/Self";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/self" element={<Self />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
