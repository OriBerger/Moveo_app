import { useNavigate } from "react-router-dom";

// A list of predefined code blocks with unique IDs
const codeBlocks = [
  { id: "1", title: "Async Case", code: "async function fetchData() {}" },
  { id: "2", title: "Closure Example", code: "function outer() { return function inner() {}; }" },
  { id: "3", title: "Promise Chain", code: "fetch(url).then(res => res.json())" },
  { id: "4", title: "Arrow Function", code: "const add = (a, b) => a + b;" },
];

export default function Lobby() {
  const navigate = useNavigate(); // Hook to navigate to other pages

  return (
    <div>
      <h1>Choose Code Block</h1>
      {/* List of code blocks displayed as buttons */}
      <ul>
        {codeBlocks.map((block) => (
          <li key={block.id}>
            {/* When a button is clicked, navigate to the corresponding code block page */}
            <button onClick={() => navigate(`/code/${block.id}`)}>{block.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
