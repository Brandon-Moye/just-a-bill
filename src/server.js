// Node module
import https from "https";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const apiKey = process.env.API_KEY;
const url = `https://api.congress.gov/v3/member/AL?api_key=${apiKey}`;

// GET request
https
  .get(url, (res) => {
    let data = "";

    // 'data' event is triggered when a chunk of data is received
    res.on("data", (chunk) => {
      data += chunk;
    });

    // 'end' event is triggered when the entire response has been received
    res.on("end", () => {
      if (res.statusCode === 200) {
        console.log("connected");
        try {
          const parsedData = JSON.parse(data);
          console.log(parsedData); // Log the parsed JSON response
        } catch (e) {
          console.error("Error parsing JSON:", e.message);
        }
      } else {
        console.error(`HTTP Status Code: ${res.statusCode}`);
      }
    });

    // Handle errors specific to the response stream
    res.on("error", (err) => {
      console.error("Response stream error:", err.message);
    });
  })
  .on("error", (err) => {
    // Handle errors from the https.get request itself
    console.error("Request error:", err.message);
  });
