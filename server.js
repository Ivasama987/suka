// Petit serveur local pour tester l'appli : node server.js puis http://localhost:5173
const http = require("http"), fs = require("fs"), path = require("path");
const port = 5173;
const types = { ".html": "text/html; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png",
  ".webmanifest": "application/manifest+json", ".js": "text/javascript" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const file = path.join(__dirname, path.normalize(p).replace(/^([\\/]\.\.)+/, ""));
  if (!file.startsWith(__dirname) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); return res.end("Introuvable");
  }
  res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
}).listen(port, () => console.log(`http://localhost:${port}`));
