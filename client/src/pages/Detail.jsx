import React, { useState, useEffect } from "react";
import styles from "./detail.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [foodDetail, setFoodDetail] = useState({
    id: 1, // id
    name: "Fried Anchovies with Sage", // title
    image: "https://spoonacular.com/recipeImages/1-556x370.jpg", // image
    summary:
      'Fried Anchovies with Sage might be a good recipe to expand your main course collection. Watching your figure? This dairy free and pescatarian recipe has <b>396 calories</b>, <b>37g of protein</b>, and <b>12g of fat</b> per serving. This recipe serves 3. For <b>$5.61 per serving</b>, this recipe <b>covers 26%</b> of your daily requirements of vitamins and minerals. From preparation to the plate, this recipe takes around <b>45 minutes</b>. This recipe from latavolamarcherecipebox.blogspot.com requires anchovies, baking powder, salt, and vegetable oil. This recipe is liked by 3 foodies and cooks. Taking all factors into account, this recipe <b>earns a spoonacular score of 75%</b>, which is solid. <a href="https://spoonacular.com/recipes/fried-anchovies-with-sage-1189555">Fried Anchovies with Sage</a>, <a href="https://spoonacular.com/recipes/fried-anchovies-with-sage-1355669">Fried Anchovies with Sage</a>, and <a href="https://spoonacular.com/recipes/fried-anchovies-with-sage-1201577">Fried Anchovies with Sage</a> are very similar to this recipe.', // summary
    healthScore: 23, // healthScore
    steps: [
      'If you have not tried anchovies before - you must try them now! Get over any weird apprehensions or that its just bait or a punchline for a joke about pizza ("extra anchovies")! These little suckers are delicious &amp; actually good for you!',
      "Baked, fried &amp; grilled - they are ohh so good and worth a try. If your not up to it, then pass me your plate because I love'em!Here is my favorite - Fried Anchovies - the recipe below adds a sage leave to each piece of fish as well for an extra burst of flavor &amp; color.Fried Anchovies with Sage",
      "Acciughe fritte con Salvia1lb of anchovies cleaned, spine removedsage leaves (optional - if you are not a fan of sage just omit)batter1 cup of flour1 egg1 teaspoon of salt1 teaspoon of baking powderseltzer watervegetable oil for frying",
      "In a bowl combine flour, eggs, salt &amp; baking powder. Slowly add in seltzer water &amp; mix until forms a thin batter. Cover with plastic &amp; set in the fridge for at least an hour.",
      "Heat oil in a pot to 350 degree.",
      "Remove batter from fridge and mix once or twice (batter will have separated).Take a sage leaf &amp; anchovy put them together &amp; dip into the batter - allowing access batter to drip off.Fry 20 seconds a side until golden brown.",
      "Remove from oil &amp; drain on a paper towel.",
      "Sprinkle with salt &amp; serve immediately.Pairs great with prosecco or white wine.",
    ], // analyzedInstructions.steps
    diets: ["dairy free", "pescatarian"], // diets
  });

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await axios.get(`http://localhost:3001/recipes/${id}`);
      setFoodDetail({
        id: response.data.id,
        name: response.data.title,
        image: response.data.image,
        summary: response.data.summary,
        healthScore: response.data.healthScore,
        steps: response.data.instructions, // maybe i should change this to instructions
        diets: response.data.diets,
      });
      setLoading(false);
    };
    fetchDetail();
  }, [id]);

  return (
    <div className={styles.container}>
      {!loading ? (
        <>
          <div className={styles.card}>
            <h2 className={styles.name}>{foodDetail.name}</h2>
            <img
              className={styles.image}
              src={foodDetail.image}
              alt={foodDetail.name}
            />
            <p
              className={styles.summary}
              dangerouslySetInnerHTML={{ __html: foodDetail.summary }}
            ></p>
            <div className={styles.tags}>
              <span
                className={
                  foodDetail.healthScore > 30
                    ? styles.healthScoreGood
                    : styles.healthScoreBad
                }
              >
                {foodDetail.healthScore}
              </span>
              <span className={styles.diets}>
                {foodDetail.diets.join(", ")}
              </span>
            </div>
          </div>
          <div className={styles.instructions}>
            <h2>Instructions: </h2>
            <ul className={styles.list}>
              {foodDetail.steps.replace(/<[^>]*>/g, "\n")}

              {/* {foodDetail.steps.map((e, i) => (
                <li key={i} className={styles.item}>
                  {e}
                </li>
              ))} */}
            </ul>
          </div>
        </>
      ) : (
        <div className={styles.loader}></div>
      )}
    </div>
  );
};

export default Detail;
