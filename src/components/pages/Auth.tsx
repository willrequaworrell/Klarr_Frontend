import Background from "../Background"
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { fireAuth } from "../../util/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import Toast from "../Toast";
import { isValidEmail, isValidPassword } from "../../util/AuthValidation";
import ResetPasswordForm from "../ResetPasswordForm";
import { useToast } from "../../context/ToastContext";
import { useDemoContext } from "../../context/DemoContext";
import AuthHeader from "../AuthHeader";

interface userCredentialsInputType {
    email: string
    password: string
    passwordRepeat?: string
}

const Auth = () => {
    const navigate = useNavigate()
    const [user, loading] = useAuthState(fireAuth)
    
    const [signinOrSignup, setSigninOrSignup] = useState<("signin" | "signup")>("signin")
    const [userCredentialsInput, setUserCredentialsInput] = useState<userCredentialsInputType>({
        email: "",
        password: "", 
        passwordRepeat: ""
    })
    const [showResetPassword, setShowResetPassword] = useState<boolean>(false)

    const { showToast, toastMessage, setShowToast, setToastMessage } = useToast();
    const {setIsDemoMode} = useDemoContext()

    const googleProvider = new GoogleAuthProvider()

    const toggleSigninSignup = () => {
        setSigninOrSignup(pv => {
            return pv === "signin" ? "signup" : "signin"
        })
    }

    const handleUserCredentialsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserCredentialsInput(pv => ({
            ...pv,
            [e.target.name]: e.target.value
        }))
    }

    const googleLogin = async () => {
        try {
            await signInWithPopup(fireAuth, googleProvider)
        } catch (error) {
            console.log(error)
        }
    }

    const emailSignup = async () => {
        if (!isValidEmail(userCredentialsInput.email)) {
            setToastMessage("error/invalid-email");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            return;
        } else if (!isValidPassword(userCredentialsInput.password)) {
            setToastMessage("error/invalid-password");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 6000);
            return;
        } else if (userCredentialsInput.password !== userCredentialsInput.passwordRepeat) {
            setToastMessage("error/invalid-password-repeat");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 6000);
        } else {

            try {
                await createUserWithEmailAndPassword(fireAuth, userCredentialsInput.email, userCredentialsInput.password)
    
            } catch (error) {
                if (error instanceof FirebaseError) {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setToastMessage(errorCode)
                    setShowToast(true)
                    setTimeout(() => setShowToast(false), 3000)
                    setUserCredentialsInput(pv => ({...pv,email: "", password: "", passwordRepeat: ""}))
                    console.log(errorCode, errorMessage);
                } else {
                    console.log("Unknown Error:", error)
                }
            }
        }
    }

    const emailSignin = async () => {
        try {
            await signInWithEmailAndPassword(fireAuth, userCredentialsInput.email, userCredentialsInput.password)
        } catch (error) {
            if (error instanceof FirebaseError) {
                const errorCode = error.code;
                const errorMessage = error.message;
                setToastMessage(errorCode)
                setShowToast(true)
                setUserCredentialsInput(pv => ({...pv, password: ""}))
                setTimeout(() => setShowToast(false), 3000)
                console.log(errorCode, errorMessage);
            } else {
                console.log("Unknown Error:", error)
            }
        }
    }

    const enableDemoMode = () => {
        setIsDemoMode(true)
        navigate("/demo")    
    }

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
                            <form className="flex flex-col gap-[1vh] font-Barlow" onSubmit={e => e.preventDefault()}>
                                <div className="flex flex-col w-full gap-2 mb-[1vh]">
                                    {showResetPassword ? 
                                        <ResetPasswordForm setShowPasswordReset={setShowResetPassword}/>
                                    :
                                    <>
                                        <input 
                                            name="email"
                                            value={userCredentialsInput.email}
                                            onChange={handleUserCredentialsInputChange}
                                            placeholder="Email" 
                                            className="p-[.5vh] text-[1.75vh] border-t-4 border-b-8 border-l-8 border-r-4 border-offblack rounded-xl" 
                                            type="text" 
                                            aria-label="Email"
                                        />
                                        <input 
                                            name="password"
                                            value={userCredentialsInput.password}
                                            onChange={handleUserCredentialsInputChange}
                                            placeholder="Password" 
                                            className="p-[.5vh] text-[1.75vh] border-t-4 border-b-8 border-l-8 border-r-4 border-offblack rounded-xl" 
                                            type="password"
                                            aria-label="Password"
                                        />
                                        {signinOrSignup === "signin" && 
                                            <div className="flex justify-start">
                                                <button onClick={() => setShowResetPassword(true)} className="px-4 text-[1.5vh] font-Staat underline cursor-pointer hover:text-offblack/50">Forgot password?</button>
                                            </div>
                                        }
                                        {signinOrSignup === "signup" && 
                                            <input 
                                                name="passwordRepeat"
                                                value={userCredentialsInput.passwordRepeat}
                                                onChange={handleUserCredentialsInputChange}
                                                placeholder="Repeat password" 
                                                className="p-[.5vh] text-[1.75vh] border-t-4 border-b-8 border-l-8 border-r-4 border-offblack rounded-xl" 
                                                type="password" 
                                                aria-label="Repeat Password"
                                            />
                                        }
                                    </>

                                    }
                                </div>
                               
                               {!showResetPassword && 
                                    <div className="flex justify-between gap-x-2">
                                        <button 
                                            onClick={signinOrSignup === "signin" ? emailSignin : emailSignup }
                                            className="flex w-1/2 items-center justify-center p-[1vh] text-[2.25vh] text-white rounded-lg bg-offblack hover:bg-offblack/50"
                                        >
                                            <p className="flex-1">Sign {signinOrSignup === "signin" ? "in" : "up"}</p>
                                        </button>
                                        <button 
                                            onClick={enableDemoMode}
                                            className="flex w-1/2 items-center justify-center p-[1vh] text-[2.25vh] text-white rounded-lg bg-offblack hover:bg-offblack/50"
                                        >
                                            <p className="flex-1">Try a Demo</p>
                                        </button>
                                    </div>
                               }
                                                           
                            </form>
                            {!showResetPassword && 
                                <>
                                    <a onClick={googleLogin} className="flex items-center justify-center w-full p-[.5vh] mt-[1vh] text-[2.25vh] bg-white font-Barlow hover:bg-offblack/50 text-offblack rounded-xl cursor-pointer">
                                        <div className="flex items-center justify-center h-full mr-2">
                                            <FcGoogle className="p-[.5vh] text-[4vh]" />
                                        </div>
                                        <p className="">Continue with Google</p>
                                    </a>
                                    <p className="mt-2 text-[1.5vh] text-center">{signinOrSignup === "signup" ? "Already" : "Don't"} have an account? <span onClick={toggleSigninSignup} className="underline cursor-pointer hover:text-offblack/50">Sign {signinOrSignup === "signin" ? "Up" : "In"}</span></p>
                                </>
                            }
                        </div>


                    </div>
                </main>

            </div>

            {showToast && <Toast message={toastMessage} position="top"/>}
        </Background>
    )
}

export default Auth

