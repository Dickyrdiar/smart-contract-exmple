/* eslint-disable no-unused-vars */
// frontend/src/App.js
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import votingAbi from "./abi/Voting.json";

const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [voted, setVoted] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      const prov = new ethers.providers.Web3Provider(window.ethereum);
      await prov.send("eth_requestAccounts", []);
      const signer = prov.getSigner();
      const votingContract = new ethers.Contract(contractAddress, votingAbi.abi, signer);

      setProvider(prov);
      setSigner(signer);
      setContract(votingContract);

      const count = await votingContract.getCandidateCount();
      const fetchedCandidates = [];

      for (let i = 0; i < count; i++) {
        const candidate = await votingContract.candidates(i);
        fetchedCandidates.push({ name: candidate.name, voteCount: candidate.voteCount.toString() });
      }

      setCandidates(fetchedCandidates);
    };

    init();
  }, [voted]);

  const vote = async (index) => {
    try {
      const tx = await contract.vote(index);
      await tx.wait();
      setVoted(true);
    } catch (err) {
      alert("You might have already voted or there's an error.");
    }
  };

  return (
    <div className="App">
      <h1>Voting DApp</h1>
      <ul>
        {candidates.map((c, i) => (
          <li key={i}>
            {c.name} - Votes: {c.voteCount}
            <button onClick={() => vote(i)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
