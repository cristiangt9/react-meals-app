import { useEffect, useState } from "react";
import useAxioshttp from "../../hooks/use-axioshttp";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import DUMMY_MEALS from "./dataDummyMeals";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest } = useAxioshttp();

  useEffect(() => {
    const setMealsFn = (res) => {
      console.log(res);
      // setMeals(res);
    };
    sendRequest(
      {
        method: "GET",
        url: "http://backendmeals.test/meals",
        headers: { "Content-Type": "application/json" },
        data: null,
      },
      setMealsFn
    );
  }, [sendRequest]);

  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
