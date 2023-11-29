import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { RootState } from "../store/store"
import { useSelector } from "react-redux"

const RequireAuth = ({ children }: { children: ReactNode }) => {
    const jwt = useSelector((s: RootState) => s.user.jwt)
    if (!jwt) {
        return <Navigate to="/auth/login" replace />
    }
    return children
}

export default RequireAuth
