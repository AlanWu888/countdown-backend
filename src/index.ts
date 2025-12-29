import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? "http://localhost:3000";

const app = express();
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
app.get("/health", (_req, res) => res.json({ ok: true }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: FRONTEND_ORIGIN, credentials: true },
});

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
