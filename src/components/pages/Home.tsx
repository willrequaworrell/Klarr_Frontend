import Background from "../Background"
import Board from "../Board"
import { useAuthState } from "react-firebase-hooks/auth"
import { fireAuth } from "../../util/firebase"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { CardProvider } from "../../context/CardContext"
import SettingsModal from "../SettingsModal"
import Toast from "../Toast"
import { useToast } from "../../context/ToastContext"
import { useDemoContext } from "../../context/DemoContext"
import MobileModal from "../MobileModal"
import HomeHeader from "../HomeHeader"



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
                <HomeHeader setShowSettings={setShowSettings}/>
                <Board/>

                <SettingsModal showSettings={showSettings} setShowSettings={setShowSettings}/>
                <MobileModal/>

                {showToast && <Toast message={toastMessage} position="top"/>}
            </Background> 

        </CardProvider>
    )
}

export default Home
