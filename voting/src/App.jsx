import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConnectedWallet from "./pages/connectWallet"; // typo: ConnetctedWallet → ConnectedWallet

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConnectedWallet />} />
      </Routes>
    </Router>
  );
}

export default App;
