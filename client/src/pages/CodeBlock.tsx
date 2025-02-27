import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

// Connecting to the backend socket.io server
const socket = io(import.meta.env.VITE_SERVER_URL);

export default function CodeBlockPage() {
  const { id } = useParams(); // Get the room id (code block id) from the URL
  const navigate = useNavigate();
  const [code, setCode] = useState(""); // State to hold the code content
  const [role, setRole] = useState<"mentor" | "student" | null>(null); // User's role
  const hasJoinedRoom = useRef(false); // To prevent re-joining

  useEffect(() => {
    // Emit the 'join-room' event only once when the component mounts
    if (!hasJoinedRoom.current) {
      socket.emit("join-room", id);
      hasJoinedRoom.current = true;
    }

    // Listen for the 'assign-role' event to set the user's role
    socket.on("assign-role", (assignedRole) => {
      setRole(assignedRole);
      console.log(`Assigned role: ${assignedRole}`);
    });

    // Listen for 'code-update' event to get the latest code
    socket.on("code-update", (newCode) => {
      setCode(newCode);
    });

    // Clean up when component unmounts
    return () => {
      console.log(`User left room: ${id}`);
      socket.emit("leave-room", id);
      socket.off("code-update");
      socket.off("assign-role");
      hasJoinedRoom.current = false; // Reset join-room flag
    };
  }, [id]);

  // Handle changes to the code text area by students
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    socket.emit("code-change", { roomId: id, code: newCode });
  };

  // Navigate back to the lobby page
  const handleBackToLobby = () => {
    navigate("/");
  };

  const Role = role ?? "student"; // Default to 'student' if null

  return (
    <div>
      <h1>Code Block {id}</h1>
      {/* Use Highlight.js to highlight the code syntax */}
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: hljs.highlightAuto(code).value,
          }}
        />
      </pre>
      {/* Show a text area for students to edit the code */}
      {Role === "student" && (
        <textarea value={code} onChange={handleCodeChange} />
      )}
      <button onClick={handleBackToLobby}>Back to Lobby</button>
    </div>
  );
}
