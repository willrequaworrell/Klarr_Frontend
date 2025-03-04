import { useState } from "react"
import ResetPasswordForm from "./ResetPasswordForm"
import { useToast } from "../context/ToastContext"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { fireAuth } from "../util/firebase"
import { FirebaseError } from "firebase/app"
import { useDemoContext } from "../context/DemoContext"
import { useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { isValidEmail, isValidPassword } from "../util/AuthValidation"
import AuthInput from "./AuthInput"

interface userCredentialsInputType {
    email: string
    password: string
    passwordRepeat?: string
}

interface AuthFormPropsType {
    // userCredentialsInput: userCredentialsInputType
    // setUserCredentialsInput: React.Dispatch<React.SetStateAction<userCredentialsInputType>>
    showResetPassword: boolean
    setShowResetPassword: React.Dispatch<React.SetStateAction<boolean>>
}


const AuthForm = ({showResetPassword, setShowResetPassword}: AuthFormPropsType) => {
    const navigate = useNavigate()
    const {setIsDemoMode} = useDemoContext()
    const { setShowToast, setToastMessage } = useToast();
    const googleProvider = new GoogleAuthProvider()
    const [userCredentialsInput, setUserCredentialsInput] = useState<userCredentialsInputType>({
        email: "",
        password: "", 
        passwordRepeat: ""
    })
    const [signinOrSignup, setSigninOrSignup] = useState<("signin" | "signup")>("signin")

    
    const handleUserCredentialsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserCredentialsInput(pv => ({
            ...pv,
            [e.target.name]: e.target.value
        }))
    }

    const toggleSigninSignup = () => {
        setSigninOrSignup(pv => {
            return pv === "signin" ? "signup" : "signin"
        })
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

    const googleLogin = async () => {
        try {
            await signInWithPopup(fireAuth, googleProvider)
        } catch (error) {
            console.log(error)
        }
    }

    const enableDemoMode = () => {
        setIsDemoMode(true)
        navigate("/demo")    
    }

    
    return (
        <>
            <form className="flex flex-col gap-[1vh] font-Barlow" onSubmit={e => e.preventDefault()}>
                <div className="flex flex-col w-full gap-2 mb-[1vh]">
                    {showResetPassword ? 
                        <ResetPasswordForm setShowResetPassword={setShowResetPassword}/>
                    :
                    <>
                        <AuthInput
                            type="email"
                            name="email"
                            value={userCredentialsInput.email}
                            placeholder={"Email"} 
                            ariaLabel="Email"
                            onChange={handleUserCredentialsInputChange}
                        />
                        <AuthInput
                            type="password"
                            name="password"
                            value={userCredentialsInput.password}
                            placeholder={"Password"} 
                            ariaLabel="Password"
                            onChange={handleUserCredentialsInputChange}
                        />
                        
                        {signinOrSignup === "signin" && 
                            <div className="flex justify-start">
                                <button type="button" onClick={() => setShowResetPassword(true)} className="px-4 text-[1.5vh] font-Staat underline cursor-pointer hover:text-offblack/50">Forgot password?</button>
                            </div>
                        }
                        {signinOrSignup === "signup" && 
                            
                            <AuthInput
                                type="password"
                                name="passwordRepeat"
                                value={userCredentialsInput.passwordRepeat}
                                placeholder={"Repeat Password"} 
                                ariaLabel="Repeat Password"
                                onChange={handleUserCredentialsInputChange}
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
        </>
    )
}

export default AuthForm
