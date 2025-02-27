import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL || process.env.VITE_SERVER_URL);

export default function CodeBlockPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [role, setRole] = useState<"mentor" | "student" | null>(null);
  const hasJoinedRoom = useRef(false);

  useEffect(() => {
    // Emit join-room only once
    if (!hasJoinedRoom.current) {
      socket.emit("join-room", id);
      hasJoinedRoom.current = true;
    }

    socket.on("assign-role", (assignedRole) => {
      setRole(assignedRole);
      console.log(`Assigned role: ${assignedRole}`);
    });

    socket.on("code-update", (newCode) => setCode(newCode));

    return () => {
      console.log(`User left room: ${id}`);
      socket.emit("leave-room", id); // Emit leave-room event
      socket.off("code-update"); // Clean up event listeners
      socket.off("assign-role");
      hasJoinedRoom.current = false; // Reset join-room flag on unmount
    };
  }, [id]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    socket.emit("code-change", { roomId: id, code: newCode });
  };

  const handleBackToLobby = () => {
    navigate("/");
  };
  const Role = role ?? "student"; // Fallback to "student" if null
  return (
    <div>
      <h1>Code Block {id}</h1>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: hljs.highlightAuto(code).value }} />
      </pre>
      {Role === "student" && (
      <textarea 
        value={code} 
        onChange={handleCodeChange} 
      />
    )}      
    <button onClick={handleBackToLobby}>Back to Lobby</button>
    </div>
  );
}  