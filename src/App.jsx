import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/Notestate";
import Home from "./components/Home";
import About from "./components/Addnote";
import UpdateNote from "./components/UpdateNote";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Private Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/addnote"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-note"
            element={
              <PrivateRoute>
                <UpdateNote />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
