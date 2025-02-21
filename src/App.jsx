import { useEffect, useState } from "react";
import "./App.css";
import Members from "./components/Members";
import { use } from "react";

function App() {
  const [message, setMessage] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/test");
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <>
      just a bill
      <button onClick={fetchData}>Fetch Data</button>
    </>
  );
}

export default App;
