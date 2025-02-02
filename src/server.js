// Node module
import https from "https";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;
const PORT = 5001;
const state = "CA";
const url = `https://api.congress.gov/v3/member/${state}?api_key=${apiKey}`;

// GET request
export const getStateSpecificMembers = () => {
  console.log("api key is ", apiKey);
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";

        console.log(res.statusCode);

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
              resolve(members);
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
  if (req.url === "/api/members" && req.method === "GET") {
    try {
      const members = await getStateSpecificMembers();
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
