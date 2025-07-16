import { Button, Typography } from "@material-tailwind/react"
import WalletConnect from "../../useHook/walletConnect"

const ConnetctedWallet = () => {
  const { account, connectedWallet, disconnetWallet } = WalletConnect()

  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100">
       <div className="text-center text-lg text-gray-800">
        {
          account ? (
            <>
              <Typography className="text-gray-900">
                <span className="font-mono">
                  Wallet connected: {account.slice(0, 6)}...{account.slice(-4)}
                </span>
              </Typography>
            
              <div>
                {account !== null ? (
                  <Button
                    onClick={disconnetWallet}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  >
                    Disconnect wallet
                  </Button>
                ) : null}
              </div></>
          ) : (
              <Button
                onClick={connectedWallet}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Connect Wallet
              </Button>
          )
        }
      </div>
    </div>
  )
}

export default ConnetctedWallet