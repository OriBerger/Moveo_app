import { useNavigate } from "react-router-dom";

const codeBlocks = [
  { id: "1", title: "Async Case", code: "async function fetchData() {}" },
  { id: "2", title: "Closure Example", code: "function outer() { return function inner() {}; }" },
  { id: "3", title: "Promise Chain", code: "fetch(url).then(res => res.json())" },
  { id: "4", title: "Arrow Function", code: "const add = (a, b) => a + b;" },
];

export default function Lobby() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Choose Code Block</h1>
      <ul>
        {codeBlocks.map((block) => (
          <li key={block.id}>
            <button onClick={() => navigate(`/code/${block.id}`)}>{block.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
