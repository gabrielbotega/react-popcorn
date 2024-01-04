import React from "react";
import ReactDOM from "react-dom/client";
// import { useState } from "react";
import "./index.css";
import App from "./App";
// import StartRating from "./StarRating";

// Allowing the possibility of use the rating (state) outside of the component is
//quite important. Maybe the consumer wants to use this information in its UI.
// That's why we need to add the "onSetRating" prop in the root component.
//However using this cause the necessity to always use this onSetRating as a function.
//The others are not working properly.

// We also need to check the Type of input the user is inserting. Therefore,
// we need to use type checking (check and specify the type of input).
// We gonna use the PropTypes from "prop-types" library (in the StarRating.js file)
// function Test() {
//   const [movieRating, setMovieRating] = useState(0);

//   return (
//     <div>
//       <StartRating color="blue" onSetRating={setMovieRating} />
//       <p>The movie was rated {movieRating} stars</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StartRating />
    <StartRating
      maxRating={10}
      size={24}
      color="red"
      className="test"
      defaultRating={3}
    />
    <Test /> */}
  </React.StrictMode>
);
