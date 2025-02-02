import { useEffect, useState } from "react";
import "./App.css";
import Members from "./components/Members";
import { use } from "react";

function App() {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/members"); // making request to node server
        if (!response.ok) {
          throw new Error(`http Error: ${response.status}`);
        }
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMembers();
  }, []);

  return (
    <>
      just a bill
      {members.map((member, index) => (
        <Members key={index} member={member} />
      ))}
    </>
  );
}

export default App;
