import { useEffect, useState } from "react";
import "./App.css";
import Members from "./components/Members";
import { use } from "react";

function App() {
  const [message, setMessage] = useState([]);
  const [stateCode, setStateCode] = useState("");

  const fetchData = async () => {
    try {
      // const response = await fetch("http://localhost:5001/api/test");
      //utilizing ?state query parameter to pass data to the server
      const stateMembers = await fetch(
        `http://localhost:5001/api/membersByState?state=${stateCode}`
      );
      // const data = await response.json();
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <>
      <h1>just a bill</h1>
      <label for="stateCode">Enter State Code: </label>
      <input
        type="text"
        id="stateCode"
        maxLength="2"
        onChange={(e) => setStateCode(e.target.value.toUpperCase())}
      ></input>
      <button onClick={fetchData}>Fetch Data</button>
    </>
  );
}

export default App;
