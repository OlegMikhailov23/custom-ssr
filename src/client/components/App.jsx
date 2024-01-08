import { Route, Routes } from "react-router-dom"
import Navbar from "./Navbar";
import { Home } from "./Home/";
import { About } from "./About";
import '../styles/normalize.css';

export const App = () => {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  );
}
