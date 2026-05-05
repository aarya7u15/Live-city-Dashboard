import { useEffect, useState } from "react";

const Food = ({ setPage,city, weather }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=12.9716&longitude=77.5946&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US",
        {
          method: "GET",
          headers: {
          "X-RapidAPI-Key": "01d5c31566mshcbe0ec4a25cfa81p1671e4jsnce345d0edb5e",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        }
      );

      const result = await response.json();
      console.log(result);


        let filteredData = result.data.filter(function(item) {
            return (
                item.name &&
                item.photo &&
                item.photo.images &&
                item.photo.images.medium &&
                item.photo.images.medium.url
            );
        });

      setRestaurants(filteredData);
      setLoading(false);
      
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // weather recommendation 
  const getRecommendation = () => {
    if (!weather) return "";

    let temp = 0;

    if (weather && weather.main) {
    temp = weather.main.temp;
    }

    
    if (temp > 30) {
      return "🥤 Hot weather! Try cold drinks or ice cream";
    } else if (temp < 15) {
      return "🍲 Cold weather! Enjoy hot meals";
    } else {
      return "Cozy weather calls for warm cafes !"
    }
  };
// - - -
  

  if (loading) {
    return (
      <h2 className="text-center text-xl mt-10">
        Loading restaurants...
      </h2>
    );
  }

  return (
    <div>
     

      <div className="bg-linear-to-r from-orange-500 to-red-500 text-white py-16 px-10 ">

        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Food & Dining
        </h1>
        <h2 className="p-2 pl-2 drop-shadow-lg">Discover the best food options in {city}</h2>
      </div>

        {/* recomendation */}
      <h3 className="px-6 mt-2 text-orange-500 font-medium">
        {getRecommendation()}
      </h3>

 
      <div className="grid grid-cols-3 gap-6 p-6">
        {restaurants.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >

            <img
              src={item.photo.images.medium.url}
              alt={item.name}
              className="w-full h-48 object-cover"
            />

            
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                {item.name}
              </h3>

              <p className="text-gray-500 text-sm">
                {item.location_string}
              </p>

              <p className="text-yellow-500 mt-1">
                ⭐ {item.rating ? item.rating : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;