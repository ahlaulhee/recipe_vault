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
  // const [searchTerm, setSearchTerm] = useState("");

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

  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  // const changeOrder = (e) => {
  //   switch (e.target.value) {
  //     case "ASC":
  //       const sortedRecipesAsc = [...recipes].sort((a, b) =>
  //         a.title.localeCompare(b.title)
  //       );
  //       setRecipes(sortedRecipesAsc);
  //       break;
  //     case "DESC":
  //       const sortedRecipesDesc = [...recipes].sort((a, b) =>
  //         b.title.localeCompare(a.title)
  //       );
  //       setRecipes(sortedRecipesDesc);
  //       break;
  //     case "HEALTHSCORE":
  //       const sortedRecipesHealthScore = [...recipes].sort(
  //         (a, b) => b.healthScore - a.healthScore
  //       );
  //       setRecipes(sortedRecipesHealthScore);
  //       break;

  //     default:
  //       break;
  //   }
  // };

  // const changeDiet = (e) => {
  //   switch (e.target.value) {
  //     case "Vegan":
  //       const filteredRecipesVegan = [...copyRecipes].filter((rec) =>
  //         rec.diets.includes("vegan")
  //       );
  //       setRecipes(filteredRecipesVegan);
  //       break;
  //     case "Vegetarian":
  //       const filteredRecipesVegetarian = [...copyRecipes].filter((rec) =>
  //         rec.diets.includes("lacto ovo vegetarian")
  //       );
  //       setRecipes(filteredRecipesVegetarian);
  //       break;
  //     case "Gluten Free":
  //       const filteredRecipesGlutenFree = [...copyRecipes].filter((rec) =>
  //         rec.diets.includes("gluten free")
  //       );
  //       setRecipes(filteredRecipesGlutenFree);
  //       break;

  //     case "Ketogenic":
  //       const filteredRecipesKetogenic = [...copyRecipes].filter((rec) =>
  //         rec.diets.includes("ketogenic")
  //       );
  //       setRecipes(filteredRecipesKetogenic);
  //       break;
  //     case "Pescetarian":
  //       const filteredRecipesPescetarian = [...copyRecipes].filter((rec) =>
  //         rec.diets.includes("pescatarian")
  //       );
  //       setRecipes(filteredRecipesPescetarian);
  //       break;
  //     case "Paleo":
  //       const filteredRecipesPaleolithic = [...copyRecipes].filter((rec) =>
  //         rec.diets.includes("paleolithic")
  //       );
  //       setRecipes(filteredRecipesPaleolithic);
  //       break;
  //     case "Primal":
  //       const filteredRecipesPrimal = [...copyRecipes].filter((rec) =>
  //         rec.diets.includes("primal")
  //       );
  //       setRecipes(filteredRecipesPrimal);
  //       break;
  //     case "Whole30":
  //       const filteredRecipesWhole30 = [...copyRecipes].filter((rec) =>
  //         rec.diets.includes("whole 30")
  //       );
  //       setRecipes(filteredRecipesWhole30);
  //       break;
  //     case "Low FODMAP":
  //       const filteredRecipesLowFodmap = [...copyRecipes].filter((rec) =>
  //         rec.diets.includes("fodmap friendly")
  //       );
  //       setRecipes(filteredRecipesLowFodmap);
  //       break;
  //     case "Ovo-Vegetarian":
  //       const filteredRecipesOvoVegetarian = [...copyRecipes].filter((rec) =>
  //         rec.diets.includes("dairy free")
  //       );
  //       setRecipes(filteredRecipesOvoVegetarian);
  //       break;
  //     // didnt found lacto vegetarian tag on diets
  //     default:
  //       setRecipes(copyRecipes);
  //       break;
  //   }
  // };

  // const fetchRecipesByName = async () => {
  //   if (searchTerm) {
  //     setLoading(true);
  //     const response = await axios.get(
  //       `http://localhost:3001/recipes?name=${searchTerm}`
  //     );
  //     setRecipes(response.data.combinedRecipes);
  //     setLoading(false);
  //   } else {
  //     setLoading(true);
  //     const response = await axios.get("http://localhost:3001/recipes");
  //     setRecipes(response.data.combinedRecipes);
  //     setLoading(false);
  //   }
  // };

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
              // searchTerm={searchTerm}
              // setSearchTerm={setSearchTerm}
              // handleSearchChange={handleSearchChange}
              // changeOrder={changeOrder}
              // changeDiet={changeDiet}
              // fetchRecipesByName={fetchRecipesByName}
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
