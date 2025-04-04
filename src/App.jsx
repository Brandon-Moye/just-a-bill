import { useEffect, useState } from "react";
import "./App.css";
import Members from "./components/Members";
import SponsoredLegislation from "./components/SponsoredLegislation";
import { use } from "react";

function App() {
  const [message, setMessage] = useState([]);
  const [stateCode, setStateCode] = useState("");
  const [stateCongressMembers, setStateCongressMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [listOfSponsLegsln, setListOfSponsLegsln] = useState([]);
  const [selectedBill, setSelectedBill] = useState([]);

  const [prompt, setPrompt] = useState("");
  const [ollamaResponse, setOllamaResponse] = useState("");
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
      console.log(stateCongressMembers);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleMemberSelect = async (bioguideId) => {
    setSelectedMemberId(bioguideId);
    setListOfSponsLegsln([]);

    try {
      const sponsoredLegislation = await fetch(
        `http://localhost:5001/api/sponsoredLegislation?bioguideId=${bioguideId}&t=${Date.now()}`
      );
      const memberSponsored = await sponsoredLegislation.json();
      setListOfSponsLegsln(memberSponsored.sponsoredLegislation);
      console.log("--- THEY SPONSORED ----", listOfSponsLegsln);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleBillSelect = async (billType, billNumber) => {
    setSelectedBill([billType, billNumber]);
    console.log("I want to learn about ", selectedBill);
  };
  const ollamaZero = async () => {
    try {
      const ollamaRes = await fetch("http://localhost:5001/api/ollama", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prompt),
      });

      if (!ollamaRes.ok) {
        throw new Error("Failed to fetch response from Ollama");
      }

      const ollamaData = await ollamaRes.json();
      setOllamaResponse(ollamaData.response); // Store response in state
      console.log("Ollama said: ", ollamaResponse);
    } catch (error) {
      console.error("Error fetching Ollama response:", error);
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
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <button onClick={ollamaZero}>Ask</button>
      <div className="membersLegsFlex">
        <Members
          members={stateCongressMembers}
          onSelectedMember={handleMemberSelect}
        />
        <SponsoredLegislation
          sponsored={listOfSponsLegsln}
          onSelectedBill={handleBillSelect}
        />
      </div>
    </>
  );
}

export default App;
