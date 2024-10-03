import Background from "../Background"
import Board from "../Board"
import { useAuthState } from "react-firebase-hooks/auth"
import { fireAuth } from "../../util/firebase"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Home = () => {
    const navigate = useNavigate()
    const [user, loading] = useAuthState(fireAuth)

    useEffect( () => {
        if (!loading && !user) {
            navigate('/auth')
        }
        
    } , [loading, user])
    
    return (
        <Background>
            {/* <p onClick={() => console.log("hi")}>Logout</p> */}
            <p onClick={() => fireAuth.signOut()}>Logout</p>
            <Board/>
        </Background> 
    )
}

export default Home
