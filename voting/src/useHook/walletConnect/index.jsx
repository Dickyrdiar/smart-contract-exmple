import { useEffect, useState, useCallback } from "react"


const WalletConnect = () => {
  const [account, setAccount] = useState(null)

  const checkWallet = useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      if (accounts.length > 0) {
        setAccount(accounts[0])
      }
    } else {
      alert("MetaMask belum terpasang. Silakan install terlebih dahulu.")
    }
  }, [])

  const connectedWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("metamask tidak tersedia")
        return
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      setAccount(accounts[0])
    } catch (err) {
      console.error("Gagal konek wallet:", err);

    }
  }

  useEffect(() => {
    checkWallet()

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || null)
      })
    }
  }, [checkWallet])

  const disconnetWallet = () => {
    setAccount(null)
  }

  return {
    connectedWallet,
    account,
    disconnetWallet
  }
}

export default WalletConnect