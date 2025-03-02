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
    console.log("HERE IS THE DATA: ", data);
    return data;
  } catch (error) {
    console.error("error fetching data ", error);
    throw error;
  }
};

export default fetchAPIData;
