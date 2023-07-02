import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Detail from "./pages/Detail";
import Error from "./pages/Error";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [copyRecipes, setCopyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/recipes");

      setRecipes(
        response.data.combinedRecipes.sort((a, b) =>
          a.title.localeCompare(b.title)
        )
      );
      setCopyRecipes(
        response.data.combinedRecipes.sort((a, b) =>
          a.title.localeCompare(b.title)
        )
      );
      setLoading(false);
    };
    fetchRecipes();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <Home
              recipes={recipes}
              setRecipes={setRecipes}
              copyRecipes={copyRecipes}
              setCopyRecipes={setCopyRecipes}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route path="/form" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
