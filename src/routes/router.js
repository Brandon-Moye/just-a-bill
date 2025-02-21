export const router = (req, res) => {
  // setting Headers (metadata that is sent along with the req/res)
  // adds or modifies individual headers BEFORE sending the response (mainly preflight requests)
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Allow frontend
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS"); // Allow specific methods

  // tells the browswer to allow requests with Content-Type headers
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers

  // handle CORS preflight requests
  // browser will send OPTIONS req before the req to check permissions
  if (req.method === "OPTIONS") {
    // set all headers at once and defines status code
    res.writeHead(204); // no content response
    res.end();
    return;
  }

  if (req.url === "/api/membersByState" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "API is working!" }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
  if (req.url === "/api/test" && req.method === "GET") {
    // .writeHead(statusCode, headersObject)
    // sets all headers at once and defines status code
    res.writeHead(200, { "Content-Type": "application/json" });
    // .end will end the response and sends data back to the client
    // without .end the server won't know when to stop and not send data
    res.end(JSON.stringify({ message: "API is working!" }));
    console.log("API is working!");
  } else {
    // sets all headers at once and defines status code
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
};
