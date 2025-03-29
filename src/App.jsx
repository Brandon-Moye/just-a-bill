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
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleMemberSelect = async (bioguideId) => {
    setSelectedMemberId(bioguideId);

    try {
      const sponsoredLegislation = await fetch(
        `http://localhost:5001/api/sponsoredLegislation?bioguideId=${selectedMemberId}&t=${Date.now()}`
      );
      const memberSponsored = await sponsoredLegislation.json();
      console.log("--- THEY SPONSORED ----", memberSponsored);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
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
      console.log("Ollama said: ", ollamaData);
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
      <Members
        members={stateCongressMembers}
        onSelectedMember={handleMemberSelect}
      />
      <Bills />
    </>
  );
}

export default App;
