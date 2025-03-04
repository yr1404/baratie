import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  //local state variable - very powerful state variable
  //always call use state inside function of component on top level like here.
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filterRestaurant, setfilterRestaurant] = useState([]);

  const [searchText, setSearchText] = useState(""); //bind this search text to input box

  //whenever state variable is triggered, react triggers a reconciliation cycle(re-renders the components)
  console.log("Body Rendered");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4697247&lng=77.4956607&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    //converting this fetch data to json
    const json = await data.json();

    setListOfRestaurant(
      //optional chaining
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    setfilterRestaurant(
      //optional chaining
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  //Conditional Rendering
  /*if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }  */

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            className="search-btn"
            onClick={() => {
              //filter the restaurant cards and update the UI
              //searchText

              console.log(searchText);
              const filterRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setfilterRestaurant(filterRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            setListOfRestaurant(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>

      <div className="res-container">
        {
          //javascript map function to loop over restraunt cards
          filterRestaurant.map((restaurant) => (
            <RestaurantCard key={restaurant.info.id} resData={restaurant} />
          ))
        }
      </div>
    </div>
  );
};

export default Body;
