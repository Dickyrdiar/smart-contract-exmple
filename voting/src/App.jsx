import WalletConnect from "./useHook/walletConnect";

function App() {
 const { account, connectedWallet } = WalletConnect()


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-4 border rounded-xl w-fit">
        {account ? (
          <div className="text-green-600">
            Wallet Connected:{' '}
            <span className="font-mono">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          </div>
        ) : (
          <button
            onClick={connectedWallet}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            connect wallet
          </button>
        )}
      </div>
    </div>

  );
}

export default App;
