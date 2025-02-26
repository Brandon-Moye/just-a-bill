import * as dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;
const url = `https://api.congress.gov/v3/member/AL?api_key=${apiKey}`;
console.log("fetching data");
const fetchAPIData = async () => {
  try {
    const response = await fetch(url); //metadata (status codes)

    if (!response.ok) {
      throw new Error(`HTTPS error Status: ${response.status}`);
    }
    //extract data, returns a Promise
    // await ensures that the data is converted to from JSON to object
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("error fetching data ", error);
    throw error;
  }
};

export default fetchAPIData;
