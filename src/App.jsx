import { useEffect, useState } from "react";
import "./App.css";
import Members from "./components/Members";
import Bills from "./components/Bills";
import { use } from "react";

function App() {
  const [message, setMessage] = useState([]);
  const [stateCode, setStateCode] = useState("");
  const [stateCongressMembers, setStateCongressMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  useState(null);

  const fetchData = async () => {
    try {
      // const response = await fetch("http://localhost:5001/api/test");
      //utilizing ?state query parameter to pass data to the server
      const stateMembers = await fetch(
        `http://localhost:5001/api/membersByState?state=${stateCode}`
      );

      if (!stateMembers.ok) {
        throw new Error("failed to fetch members");
      }

      const members = await stateMembers.json();
      setStateCongressMembers(members.members);
      // const data = await response.json();
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleMemberSelect = (bioguideId) => {
    console.log(bioguideId);
    setSelectedMemberId(bioguideId);
  };

  const fetchSponsoredLegislation = async () => {
    try {
      const sponsoredLegislation = await fetch(
        `http://localhost:5001/api/sponsoredLegislation?bioguideId=${stateCongressMembers}`
      );
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <>
      <a href="https://www.youtube.com/watch?v=SZ8psP4S6BQ&pp=ygUPaSdtIGp1c3QgYSBiaWxs">
        just a bill
      </a>
      <label for="stateCode">Enter State Code: </label>
      <input
        type="text"
        id="stateCode"
        maxLength="2"
        onChange={(e) => setStateCode(e.target.value.toUpperCase())}
      ></input>
      <button onClick={fetchData}>Fetch Data</button>
      <Members
        members={stateCongressMembers}
        onSelectedMember={handleMemberSelect}
      />
      <Bills />
    </>
  );
}

export default App;
