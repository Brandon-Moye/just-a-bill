import https from "https";
import * as dotenv from "dotenv";
import { rejects } from "assert";
dotenv.config();

const apiKey = process.env.API_KEY;
const url = `https://api.congress.gov/v3/member/AL?api_key=${apiKey}`;
console.log("fetching data");
const fetchAPIData = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTPS error Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("error fetching data ", error);
    throw error;
  }
};

export default fetchAPIData;
