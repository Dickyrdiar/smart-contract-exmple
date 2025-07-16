import { Navigate, Outlet } from "react-router-dom"
import WalletConnect from "../../useHook/walletConnect"

export const PrivateRoute = () => {
  const { account } = WalletConnect()

  return account !== null ? <Outlet /> : <Navigate to="/connect" replace />
}