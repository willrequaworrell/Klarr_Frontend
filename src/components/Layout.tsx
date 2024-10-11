import { Outlet } from "react-router-dom"
import { fireAuth } from "../util/firebase"


const Layout = () => {
    return (
        <>
            <Outlet/>
        </>
    )
}

export default Layout
