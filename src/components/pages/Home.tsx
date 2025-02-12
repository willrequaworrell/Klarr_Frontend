import Background from "../Background"
import Board from "../Board"
import { useAuthState } from "react-firebase-hooks/auth"
import { fireAuth } from "../../util/firebase"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { CardProvider } from "../../context/CardContext"
import SettingsModal from "../SettingsModal"
import { IoSettingsSharp } from "react-icons/io5"
import Toast from "../Toast"
import { useToast } from "../../context/ToastContext"
import { useDemoContext } from "../../context/DemoContext"
import MobileModal from "../MobileModal"
// import { IoMdLogOut } from "react-icons/io"



const Home = () => {
    const navigate = useNavigate()
    const [user, loading] = useAuthState(fireAuth)

    const [showSettings, setShowSettings] = useState<boolean>(false)

    const { showToast, toastMessage } = useToast();
    const {isDemoMode} = useDemoContext()

    useEffect( () => {
        if (!loading && !user && !isDemoMode) {
            navigate('/auth')
        }
        
    } , [loading, user, isDemoMode])

    
    
    return (
        <CardProvider>

            <Background>
                <header aria-labelledby="title">
                    <div className="absolute top-0 flex items-center w-full px-8 py-2">
                        <div className="flex items-center flex-1 gap-x-1">
                            {/* <div aria-label="Klarr Logo Image" className="relative flex items-center bg-white border-b-[1vh] border-l-[1vh] rounded-full border-offblack size-[6vh]">
                                <div className="absolute flex items-center border-t-[1vh] border-r-[1vh] border-white rounded-full bg-offblack left-5 size-[6vh]">
                                    <div className="w-full h-[1vh] bg-white "></div>
                                </div>
                                
                                <div className="w-full h-[2vh] bg-offblack"></div>
                                
                            </div> */}
                            <img 
                                src="klarr.png" 
                                alt="Klarr Logo - overlapping black and white circles & rectangles" 
                                className="object-cover object-center h-[7vh]"
                            />
                            {/* <img className="h-12 w-min" src="Bauhaus.png" alt="logo" /> */}
                            <h1 aria-label="Klarr Logo Text" className="tracking-wider text-[6vh] text-offblack font-Staat">
                                KLARR {isDemoMode && <span className="text-2xl text-red animate-pulse">DEMO</span>}
                            </h1>
                        </div>
                        {/* <div onClick={() => fireAuth.signOut()} className="text-[5vh] text-offblack"> */}
                        <div onClick={() => setShowSettings(true)} className="text-[4vh] text-offblack">
                            <IoSettingsSharp aria-labelledby="Settings menu button" className="transition-all cursor-pointer hover:text-offblack/50 hover:animate-spin" />
                        </div>


                    </div>

                </header>
                <main className="flex size-full">
                    <Board/>
                </main>
                <SettingsModal showSettings={showSettings} setShowSettings={setShowSettings}/>
                <MobileModal></MobileModal>
                {showToast && <Toast message={toastMessage} position="top"/>}
            </Background> 
        </CardProvider>
    )
}

export default Home
