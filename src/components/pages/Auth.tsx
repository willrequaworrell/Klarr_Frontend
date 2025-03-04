import Background from "../Background"
import { fireAuth } from "../../util/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Toast from "../Toast";
import { useToast } from "../../context/ToastContext";
import { useDemoContext } from "../../context/DemoContext";
import AuthHeader from "../AuthHeader";
import AuthForm from "../AuthForm";


const Auth = () => {
    const navigate = useNavigate()
    const [user, loading] = useAuthState(fireAuth)
    const {setIsDemoMode} = useDemoContext()
    const { showToast, toastMessage } = useToast();
    const [signinOrSignup] = useState<("signin" | "signup")>("signin")
    const [showResetPassword, setShowResetPassword] = useState<boolean>(false)


    useEffect(() => {

        if (user) {
            setIsDemoMode(false)
            navigate('/')
            return
        }
    }, [loading, user])


    return (
        <Background>
            
            <div className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-y-[2vh]">

                <AuthHeader/>

                <main className={` flex flex-col text-offblack w-4/5 lg:w-2/5 h-1/2 font-Staat size-full p-[1.5vh] rounded-xl transition-colors border-l-8 border-b-8 border-t-4 border-r-4 border-offblack`}>
                    
                    <div className="flex items-center mb-[1.5vh]">
                        <div className={`font-bold text-[3vh]`}>
                            {showResetPassword ? 
                                <h2>
                                    <span className="text-[5vh]">R</span>eset Password
                                </h2>
                            :
                                <h2>
                                    <span className="text-[5vh]">S</span>ign {signinOrSignup === "signin" ? "in" : "up"}
                                </h2>
                            }
                            
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center flex-1">
                        
                        <div className="w-[90%] p-2 md:w-2/3">
                            
                            <AuthForm 
                                showResetPassword={showResetPassword} 
                                setShowResetPassword={setShowResetPassword}
                            />

                        </div>

                    </div>
                    
                </main>

            </div>

            {showToast && <Toast message={toastMessage} position="top"/>}
        </Background>
    )
}

export default Auth

