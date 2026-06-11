import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, normalize, relative, resolve } from "node:path";

const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";
const root = process.cwd();

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

function resolvePath(url) {
  const pathname = new URL(url, `http://localhost:${port}`).pathname;
  const requested = pathname === "/" ? "index.html" : decodeURIComponent(pathname.slice(1));
  const filePath = resolve(root, normalize(requested));
  const relativePath = relative(root, filePath);

  if (relativePath.startsWith("..")) {
    const error = new Error("Forbidden");
    error.code = "EACCES";
    throw error;
  }

  return filePath;
}

const server = createServer(async (req, res) => {
  try {
    const filePath = resolvePath(req.url || "/");
    let servedPath = filePath;
    let body;

    try {
      body = await readFile(filePath);
    } catch (error) {
      const pathname = new URL(req.url || "/", `http://localhost:${port}`).pathname;
      const canFallbackToApp = !extname(pathname);

      if (!canFallbackToApp || (error.code !== "ENOENT" && error.code !== "EISDIR")) {
        throw error;
      }

      servedPath = resolve(root, "index.html");
      body = await readFile(servedPath);
    }

    res.writeHead(200, {
      "Content-Type": contentTypes[extname(servedPath)] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(body);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "EACCES") {
      res.writeHead(error.code === "EACCES" ? 403 : 404, {
        "Content-Type": "text/plain; charset=utf-8"
      });
      res.end(error.code === "EACCES" ? "Forbidden" : "Not found");
      return;
    }

    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Server error");
  }
});

server.listen(port, host, () => {
  console.log(`Holden's Terminal running at http://${host}:${port}`);
});
