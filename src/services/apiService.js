import * as dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;
console.log("fetching data");
const fetchAPIData = async (stateCode) => {
  const url = `https://api.congress.gov/v3/member/${stateCode}?currentMember=True&api_key=${apiKey}`;

  try {
    const response = await fetch(url); //metadata (status codes)

    if (!response.ok) {
      throw new Error(`HTTPS error Status: ${response.status}`);
    }
    //extract data, returns a Promise
    // await ensures that the data is converted to from JSON to object
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error fetching data ", error);
    throw error;
  }
};

const fetchSponsoredLegislation = async (bioguideId) => {
  const sponsoredUrl = `https://api.congress.gov/v3/member/${bioguideId}/sponsored-legislation?api_key=${apiKey}`;
  try {
    const responseSponsoredLegislation = await fetch(sponsoredUrl);

    if (!responseSponsoredLegislation.ok) {
      throw new Error(
        `HTTPS error Status: ${responseSponsoredLegislation.status}`
      );
    }
    const sponsoredData = await responseSponsoredLegislation.json();
    return sponsoredData;
  } catch (error) {
    console.error("error fetching data ", error);
  }
};

const fetchOllamaResponse = async (prompt) => {
  const ollamaServer = "http://localhost:11434/api/generate";

  try {
    console.log("sending request to Ollama with prompt: ", prompt);
    const responseOllama = await fetch(ollamaServer, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2",
        prompt: prompt,
        stream: false,
      }),
    });

    console.log("received response status: ", responseOllama.status);
    if (!responseOllama.ok) {
      const errorText = await responseOllama.text();
      throw new Error(
        `Failed to fetch Ollama response: ${responseOllama.status} - ${errorText}`
      );
    }
    const ollamadata = await responseOllama.json();
    console.log("ollama response ", ollamadata.response);
    return ollamadata.response || "No response from Ollama";
  } catch (error) {
    console.error("error communicating with ollama: ", error);
    throw new Error("failed to get response from ollama");
  }
};
export { fetchAPIData, fetchSponsoredLegislation, fetchOllamaResponse };
