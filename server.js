// Petit serveur local pour tester l'appli : node server.js puis http://localhost:5173
const http = require("http"), fs = require("fs"), path = require("path");
const port = 5173;
http.createServer((req, res) => {
  const file = path.join(__dirname, "index.html");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  fs.createReadStream(file).pipe(res);
}).listen(port, () => console.log(`http://localhost:${port}`));
