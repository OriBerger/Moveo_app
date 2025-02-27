import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import connectDB from "./config/db";
import CodeBlock from "./models/CodeBlock";
import codeBlockRoutes from "./routes/codeBlockRoutes";

// Load environment variables
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this for production security
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use("/api", codeBlockRoutes);
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});

const rooms: Record<string, string[]> = {}; // Track users in each room

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("join-room", async (roomId) => {
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    rooms[roomId].push(socket.id);
    const isMentor = rooms[roomId].length === 1; // First user is mentor

    console.log(`User ${socket.id} joined room: ${roomId} as ${isMentor ? "Mentor" : "Student"}`);
    socket.join(roomId);
    socket.emit("assign-role", isMentor ? "mentor" : "student"); // Send role to client

    // Fetch existing code and send it
    try {
      const codeBlock = await CodeBlock.findById(roomId);
      if (codeBlock) {
        socket.emit("code-update", codeBlock.code);
      }
    } catch (err) {
      console.error("Error fetching code block:", err);
    }
  });

  socket.on("code-change", async ({ roomId, code }) => {
    socket.to(roomId).emit("code-update", code);

    try {
      await CodeBlock.findByIdAndUpdate(roomId, { code }, { new: true, upsert: true });
    } catch (err) {
      console.error("Error updating code block:", err);
    }
  });

  socket.on("leave-room", (roomId) => {
    console.log(`User ${socket.id} left room: ${roomId}`);
    socket.leave(roomId);

    if (rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter((id) => id !== socket.id);
      if (rooms[roomId].length === 0) {
        delete rooms[roomId];
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (const roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter((id) => id !== socket.id);
      if (rooms[roomId].length === 0) {
        delete rooms[roomId];
      }
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
