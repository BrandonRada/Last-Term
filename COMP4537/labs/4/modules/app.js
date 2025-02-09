// const http = require("http");
// const url = require("url");

// let dictionary = []; // Stores word-definition pairs
// let requestCount = 0; // Track total requests

// const server = http.createServer((req, res) => {
//     requestCount++;
//     const parsedUrl = url.parse(req.url, true);

//     if (req.method === "GET" && parsedUrl.pathname === "/api/definitions") {
//         const queryWord = parsedUrl.query.word;
//         if (!queryWord) {
//             res.writeHead(400, { "Content-Type": "application/json" });
//             res.end(JSON.stringify({ error: "Missing 'word' query parameter." }));
//             return;
//         }

//         const entry = dictionary.find((entry) => entry.word === queryWord);
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({
//             requestCount,
//             definition: entry ? entry.definition : `Word '${queryWord}' not found!`
//         }));

//     } else if (req.method === "POST" && parsedUrl.pathname === "/api/definitions") {
//         let body = "";

//         req.on("data", chunk => { body += chunk.toString(); });
//         req.on("end", () => {
//             try {
//                 const data = JSON.parse(body);
//                 if (!data.word || !data.definition || typeof data.word !== "string" || typeof data.definition !== "string") {
//                     throw new Error("Invalid input. Both 'word' and 'definition' must be non-empty strings.");
//                 }

//                 if (dictionary.some(entry => entry.word === data.word)) {
//                     res.writeHead(409, { "Content-Type": "application/json" });
//                     res.end(JSON.stringify({ message: `Warning! '${data.word}' already exists.` }));
//                     return;
//                 }

//                 dictionary.push({ word: data.word, definition: data.definition });

//                 res.writeHead(201, { "Content-Type": "application/json" });
//                 res.end(JSON.stringify({
//                     requestCount,
//                     totalEntries: dictionary.length,
//                     message: `New entry recorded: "${data.word} : ${data.definition}"`
//                 }));
//             } catch (error) {
//                 res.writeHead(400, { "Content-Type": "application/json" });
//                 res.end(JSON.stringify({ error: error.message }));
//             }
//         });

//     } else {
//         res.writeHead(404, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ error: "Endpoint not found." }));
//     }
// });

// server.listen(8080, () => console.log("API Server running on port 8080"));
