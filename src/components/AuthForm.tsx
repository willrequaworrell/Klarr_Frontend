import { useState } from "react"
import ResetPasswordForm from "./ResetPasswordForm"
import { useToast } from "../context/ToastContext"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { fireAuth } from "../util/firebase"
import { FirebaseError } from "firebase/app"
import { useDemoContext } from "../context/DemoContext"
import { useNavigate } from "react-router-dom"
import { isValidEmail, isValidPassword } from "../util/AuthValidation"
import AuthInput from "./AuthInput"
import AuthButton from "./AuthButton"

interface userCredentialsInputType {
    email: string
    password: string
    passwordRepeat?: string
}

interface AuthFormPropsType {
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
                        <AuthButton
                            text={`Sign ${signinOrSignup === "signin" ? "in" : "up"}`}
                            onClick={signinOrSignup === "signin" ? emailSignin : emailSignup}
                        />
                        <AuthButton
                            text="Try a Demo"
                            onClick={enableDemoMode}
                        />
                    </div>
                }
                                            
            </form>
            
            {!showResetPassword && 
                <>
                    <AuthButton
                        text="Continue with Google"
                        onClick={googleLogin}
                        google
                    />
                    <AuthButton
                        text={
                            <>
                                {signinOrSignup === "signup" ? "Already" : "Don't"} have an account? <span onClick={toggleSigninSignup} className="underline cursor-pointer hover:text-offblack/50">Sign {signinOrSignup === "signin" ? "Up" : "In"}</span>
                            </>
                        }
                        account={true}
                    />

                </>
            }
        </>
    )
}

export default AuthForm
