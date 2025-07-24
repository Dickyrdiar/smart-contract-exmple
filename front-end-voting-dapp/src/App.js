import './App.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card, Typography } from "@material-tailwind/react";
import { useAccount } from 'wagmi';

function App() {
  const { isConnected, address } = useAccount()

  console.log("address", address)

  return (
   <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <Card className="p-6 w-full max-w-md shadow-xl rounded-2xl bg-black">
        <Typography variant="h4" color="white" className="text-center mb-4">
          Voting DApp
        </Typography>

        <div className="flex justify-center mb-4">
          <ConnectButton />
        </div>

        {isConnected && (
          <Typography
            variant="small"
            color="gray"
            className="text-center"
          >
            ✅ Connected: {address.slice(0, 6)}...{address.slice(-4)}
          </Typography>
        )}
      </Card>
    </div>
  );
}

export default App;
