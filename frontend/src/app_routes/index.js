import { Routes, Route } from "react-router-dom";

/* Components */
import Home from "../home";
import Room from "../room";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/:roomId" element={<Room />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;