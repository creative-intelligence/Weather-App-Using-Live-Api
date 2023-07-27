// import React, { useState, useEffect } from "react";
// import "./css/style.css";

// const Tempapp = () => {
//   const [city, setCity] = useState(null);
//   const [search, setSearch] = useState("London");

//   useEffect(() => {
//     const fetchApi = async () => {
//       const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=95a0a0e7c1818476fecfd8a22d931d5e`;
//       const response = await fetch(url);
//       // console.log(response)

//       const resJson = await response.json();
//       // console.log(resJson)
//       setCity(resJson.main);
//     };
//     fetchApi();
//   }, [search]);

//   const userSearchHandler = (e) => {
//     setSearch(e.target.value);
//   };
//   return (
//     <>
//       <div className="box">
//         <div className="inputData">
//           <input
//             type="search"
//             className="inputField"
//             value={}
//             onChange={(e) => {
//               setSearch(e.target.value);
//             }}
//             // value={city}
//           />
//         </div>

//         {!city ? (
//           <p>No Data Found</p>
//         ) : (
//           <div>
//             <div className="info">
//               <div className="up">
//                 <h2 className="location">
//                   <i className="fa-solid fa-street-view"></i>
//                   {search}
//                 </h2>
//               </div>
//               <h1 className="temp">{city.main.temp}</h1>

//               <div className="down">
//                 <h3 className="temptmin_max">Min:10 cel</h3>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Tempapp;

import React, { useState, useEffect } from "react";
import "./css/style.css";

const Tempapp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("");

  const fetchApi = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=95a0a0e7c1818476fecfd8a22d931d5e`;
      const response = await fetch(url);
      const resJson = await response.json();

      if (response.ok) {
        setCity(resJson.main);
      } else {
        console.log("Error:", resJson.message);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [search]);

  const userSearchHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            className="inputField"
            onChange={userSearchHandler}
          />
          <button className="searchButton" onClick={fetchApi}>
            Search
          </button>
        </div>

        {!city ? (
          <p>No Data Found</p>
        ) : (
          <div>
            <div className="info">
              <div className="up">
                <h2 className="location">
                  <i className="fa-solid fa-street-view"></i>
                  {search}
                </h2>
              </div>
              {city.temp ? (
                <h1 className="temp">
                  {Math.round(city.temp - 273.15)}°C
                </h1>
              ) : (
                <p>Loading...</p>
              )}
              <div className="down">
                <h3 className="temptmin_max">
                Min: {Math.round(city.temp_min - 273.15)}°C | Max:{" "}
                    {Math.round(city.temp_max - 273.15)}°C
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tempapp;

