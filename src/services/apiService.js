import https from "https";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.API_KEY;

//function to fetch data from the Congress API
const fetchDataFromCongressAPI = (endpoint) => {
  return new Promise((resolve, reject) => {
    if (!endpoint) {
      reject(new Error("API endpoint is required"));
      return;
    }

    const url = `https://api.congress.gov/v3/member/${stateCode}?api_key=${apiKey}`;

    https
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          if (res.statusCode === 200) {
            try {
              const parsedData = JSON.parse(data);
              resolve(parsedData);
            } catch (e) {
              reject(new Error(`Error parsing JSON: ${e.message}`));
            }
          } else {
            reject(new Error(`HTTPS Error: ${res.statusCode}`));
          }
        });
        res.on("error", (err) =>
          reject(new Error(`Response Error: ${err.message}`))
        );
      })
      .on("error", (err) => reject(new Error(`Request Error: ${err.message}`)));
  });
};

// get members by state
export const getStateSpecificMembers = (stateCode) => {
  if (!stateCode) {
    return Promise.reject(new Error("State code is required"));
  }
  return fetchDataFromCongressAPI(`member/${stateCode}?format=json`);
};
