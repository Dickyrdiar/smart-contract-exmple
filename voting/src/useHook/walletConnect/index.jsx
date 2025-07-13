/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from "react"
import { ethers } from "ethers";

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
        method: 'eth_requestAccount'
      })

      setAccount(accounts[0])
    } catch (err) {
      console.error("Gagal konek wallet:", err);

    }
  }

  useEffect(() => {
    checkWallet()

    if (window.ethereum) {
      window.ethereum.on('Account changed', (accounts) => {
        setAccount(accounts[0] || null)
      })
    }
  }, [checkWallet])

  return {
    checkWallet,
    connectedWallet,
    account
  }
}

export default WalletConnect