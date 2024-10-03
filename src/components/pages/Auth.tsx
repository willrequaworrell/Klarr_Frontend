import Background from "../Background"
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { fireAuth } from "../../util/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CgSpinner } from "react-icons/cg";

const Auth = () => {
    const navigate = useNavigate()
    const [user, loading] = useAuthState(fireAuth)

    const googleProvider = new GoogleAuthProvider()
    const googleLogin = async () => {
        try {
            const res = await signInWithPopup(fireAuth, googleProvider)
            console.log(res.user)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        if (user) {
            navigate('/')
            return
        }
    } , [loading, user])


    return (
        <Background>
            <div className="flex items-center justify-center w-full h-full min-h-screen">
                
                <div className={`flex flex-col text-offblack w-1/3 h-1/2 font-Staat size-full p-2 rounded-xl transition-colors border-l-8 border-b-8 border-t-4 border-r-4 border-offblack`}>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className={`font-bold text-2xl `}>
                            <span className="text-4xl ">S</span>ign in
                        </h3>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1">
                        <button onClick={googleLogin} className="flex items-center w-1/2 text-xl border-t-4 border-b-8 border-l-8 border-r-4 border-offblack rounded-xl">
                            {loading
                            ? (
                                <div className="flex justify-center w-full gap-2 p-2">
                                    <div className="size-4 bg-red animate-spin"></div>
                                    <div className="size-4 bg-blue animate-spin"></div>
                                    <div className="size-4 bg-yellow animate-spin"></div>
                                </div>
                            )
                                
                            : (
                                <>
                                    <div className="flex items-center justify-center h-full text-white border-r-4 bg-offblack border-offblack">
                                        <FcGoogle className="p-1 text-4xl" />
                                    </div>
                                    <p className="flex-1">Sign in with Google</p>
                                </>
                            )
                            }
                        </button>
                        
                    </div>
                </div>
            </div>
                
                
        </Background>
    )
}

export default Auth
