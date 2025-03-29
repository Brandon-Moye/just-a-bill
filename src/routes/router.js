import {
  fetchAPIData,
  fetchSponsoredLegislation,
  fetchOllamaResponse,
} from "../services/apiService.js";

export const router = async (req, res) => {
  // setting Headers (metadata that is sent along with the req/res)
  // adds or modifies individual headers BEFORE sending the response (mainly preflight requests)
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow frontend
  res.setHeader("Access-Control-Allow-Methods", "GET, POST ,OPTIONS"); // Allow specific methods

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

  const urlParams = new URL(req.url, `https://${req.headers.host}`); //FOLLOW UP
  const stateCode = urlParams.searchParams.get("state"); //FOLLOW UP
  const bioguideId = urlParams.searchParams.get("bioguideId");
  if (req.url.startsWith("/api/membersByState") && req.method === "GET") {
    console.log(stateCode);
    try {
      const data = await fetchAPIData(stateCode);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
      return; // have to get out of statement when done
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
    }
    return; // have to get out of statement when done
  }

  if (req.url.startsWith("/api/sponsoredLegislation") && req.method === "GET") {
    console.log("I am trying to show sponsored legislation");
    try {
      const sponsoredData = await fetchSponsoredLegislation(bioguideId);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(sponsoredData));
      return; // have to get out of statement when done
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
    }
    return; // have to get out of statement when done
  }

  //new ollama
  if (req.url.startsWith("/api/ollama") && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        console.log("received ollama request body: ", body);
        const prompt = JSON.parse(body);
        console.log("parsed body: ", prompt);

        if (!prompt) {
          throw new Error("prompt is missing from the request body");
        }
        const ollamaResponse = await fetchOllamaResponse(prompt);
        console.log("final response to send: ", ollamaResponse);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ response: ollamaResponse }));
      } catch (error) {
        console.error("Error fetching ollama response: ", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ error: "Failed to fetch response from Ollama" })
        );
      }
    });
    return;
  }
  // if no route matched, return 404
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
};
