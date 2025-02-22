import http from "http";
import { router } from "../src/routes/router.js";

const PORT = 5001;

// Create server
const server = http.createServer(router);

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
