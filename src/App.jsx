import { useEffect, useState } from "react";
import "./App.css";
import Members from "./components/Members";
import { use } from "react";

function App() {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [stateCode, setStateCode] = useState("AL"); //default
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!stateCode) return;
    const fetchMembers = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/members?state=${stateCode}`
        ); // making request to node server
        if (!response.ok) {
          throw new Error(`http Error: ${response.status}`);
        }
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  };

  return (
    <>
      just a bill
      <input
        type="text"
        value={stateCode}
        onChange={(e) => setStateCode(e.target.value.toUpperCase())}
        maxLength={2}
      ></input>
      <button onClick={handleFetch} disabled={loading}>
        Submit
      </button>
      {members.map((member, index) => (
        <Members key={index} member={member} />
      ))}
    </>
  );
}

export default App;
