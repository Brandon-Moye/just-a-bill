// Node module
import https from "https";
import http from "http";
import dotenv from "dotenv";
import { rejects } from "assert";
import url from "url";
dotenv.config();

const apiKey = process.env.API_KEY;
const PORT = 5001;
// GET request
export const getStateSpecificMembers = (stateCode) => {
  return new Promise((resolve, reject) => {
    if (!stateCode) {
      reject(new Error("State code is required"));
      return;
    }
    const url = `https://api.congress.gov/v3/member/${stateCode}?api_key=${apiKey}`;

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
              const members = parsedData.members.map((member) => ({
                name: member.name,
              }));
              resolve(members); // successful result of Promise
            } catch (e) {
              console.error("Error parsing JSON:", e.message);
              reject(new Error(`${e.message}`));
            }
          } else {
            console.error(`http Status Code: ${res.statusCode}`);
          }
        });

        // Handle errors specific to the response stream
        res.on("error", (err) => {
          console.error("Response stream error:", err.message);
        });
      })
      .on("error", (err) => {
        // Handle errors from the http.get request itself
        console.error("Request error:", err.message);
      });
  });
};

// Node.js server
const server = http.createServer(async (req, res) => {
  console.log(`server received req. ${req.method} ${req.url}`);

  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;
  // Handle CORS Preflight Requests
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }
  if (pathname === "/api/members" && req.method === "GET") {
    const state = query.state?.toUpperCase();
    try {
      const members = await getStateSpecificMembers(state);
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(JSON.stringify(members));
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });

      res.end(JSON.stringify({ error: error.message }));
    }
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

//starting the server
server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

// export { getStateSpecificMembers };
