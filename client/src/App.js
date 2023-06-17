import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Landing, Home, Form, Detail, Error } from "./pages";
// import Landing from "./pages/Landing";
// import Home from "./pages/Home";
// import Form from "./pages/Form";
// import Detail from "./pages/Detail";
// import Error from "./pages/Error";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
