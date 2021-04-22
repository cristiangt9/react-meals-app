import { useEffect, useState } from "react";
import useAxioshttp from "../../hooks/use-axioshttp";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
// import DUMMY_MEALS from "./dataDummyMeals";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest } = useAxioshttp();

  useEffect(() => {
    const setMealsFn = (res) => {
      console.log(res);
      setMeals(res.meals);
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

  if (isLoading) {
    return <section className={classes.mealsLoading}>Loading...</section>;
  }
  if (error) {
    return <section className={classes.mealsError}>{error}</section>;
  }
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
