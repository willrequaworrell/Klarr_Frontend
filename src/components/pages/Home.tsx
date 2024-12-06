import Background from "../Background"
import Board from "../Board"
import { useAuthState } from "react-firebase-hooks/auth"
import { fireAuth } from "../../util/firebase"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { IoMdLogOut } from "react-icons/io"
import { CardProvider } from "../../context/CardContext"



const Home = () => {
    const navigate = useNavigate()
    const [user, loading] = useAuthState(fireAuth)


    useEffect( () => {
        if (!loading && !user) {
            navigate('/auth')
        }
        
    } , [loading, user])

    
    
    return (
        <CardProvider>

            <Background>
                <div className="absolute top-0 flex items-center w-full px-8 py-2">
                    <div className="flex items-center flex-1 gap-x-8">
                        <div className="relative flex items-center bg-white border-b-[1vh] border-l-[1vh] rounded-full border-offblack size-[6vh]">
                            <div className="absolute flex items-center border-t-[1vh] border-r-[1vh] border-white rounded-full bg-offblack left-5 size-[6vh]">
                                <div className="w-full h-[1vh] bg-white "></div>
                            </div>
                            
                            <div className="w-full h-[2vh] bg-offblack"></div>
                            
                        </div>
                        {/* <img className="h-12 w-min" src="Bauhaus.png" alt="logo" /> */}
                        <p className="tracking-wider text-[6vh] text-offblack font-Staat">
                            KLARR
                        </p>
                    </div>
                    <div onClick={() => fireAuth.signOut()} className="text-[5vh] text-offblack">
                        <IoMdLogOut className="cursor-pointer hover:text-white" />
                    </div>


                </div>
                {/* <p onClick={() => fireAuth.signOut()}>Logout</p> */}
                <Board/>
            </Background> 
        </CardProvider>
    )
}

export default Home
