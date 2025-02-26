import { useEffect, useState } from "react";
import "./App.css";
import Members from "./components/Members";
import { use } from "react";

function App() {
  const [message, setMessage] = useState([]);

  const fetchData = async () => {
    try {
      // const response = await fetch("http://localhost:5001/api/test");
      const stateMembers = await fetch(
        "http://localhost:5001/api/membersByState"
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
      <input type="text" id="stateCode" maxLength="2"></input>
      <button onClick={fetchData}>Fetch Data</button>
    </>
  );
}

export default App;
