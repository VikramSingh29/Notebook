import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/Addnote";
import NoteState from "./context/notes/Notestate";
function App() {
  return (
    <NoteState>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addnote" element={<About />} />
      </Routes>
    </Router>
    </NoteState>
  );
}

export default App;
