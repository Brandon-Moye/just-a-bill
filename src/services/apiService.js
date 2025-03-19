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
export { fetchAPIData, fetchSponsoredLegislation };
