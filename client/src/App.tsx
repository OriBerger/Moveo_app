import { BrowserRouter, Route, Routes } from "react-router-dom";
import CodeBlockPage from "./pages/CodeBlock";
import Lobby from "./pages/Lobby";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/code/:id" element={<CodeBlockPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
