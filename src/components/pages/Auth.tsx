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

    const [showToast, setShowToast] = useState<boolean>(false)
    const [toastMessage, setToastMessage] = useState<string>("")

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
            const res = await signInWithPopup(fireAuth, googleProvider)
            console.log(res.user)
        } catch (error) {
            console.log(error)
        }
    }

    const emailSignup = async () => {
        console.log(userCredentialsInput.password === userCredentialsInput.passwordRepeat)
        if (!isValidEmail(userCredentialsInput.email)) {
            console.log("bad email")
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
                const userCredential = await createUserWithEmailAndPassword(fireAuth, userCredentialsInput.email, userCredentialsInput.password)
                const user = userCredential.user;
                console.log(user)
    
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
            const userCredential = await signInWithEmailAndPassword(fireAuth, userCredentialsInput.email, userCredentialsInput.password)
            const user = userCredential.user
            console.log(user)
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

    

    useEffect(() => {

        if (user) {
            navigate('/')
            return
        }
    }, [loading, user])


    return (
        <Background>
            
            <div className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-y-[2vh]">
                <header aria-labelledby="title">
                    <div className="flex items-center justify-center scale-125 md:scale-150 gap-x-1">
                        
                        {/* HTML to make logo */}
                        {/* <div className="relative flex items-center bg-white border-b-4 border-l-4 rounded-full border-offblack size-10">
                            <div className="absolute flex items-center border-t-4 border-r-4 border-white rounded-full bg-offblack left-5 size-10">
                                <div className="w-full h-2 bg-white "></div>
                            </div>
                            
                            <div className="w-full h-4 bg-offblack"></div>
                            
                        </div> */}
                        <img 
                            src="src/assets/klarr.png" 
                            alt="Klarr Logo - overlapping black and white circles & rectangles" 
                            className="object-cover object-center w-full h-[9vh]"
                        />

                        <h1 className="text-[8vh] tracking-wider text-offblack font-Staat ">
                            KLARR
                        </h1>
                    </div>

                </header>
                
                <main className={` flex flex-col text-offblack w-4/5 lg:w-2/5 h-1/2 font-Staat size-full p-[1.5vh] rounded-xl transition-colors border-l-8 border-b-8 border-t-4 border-r-4 border-offblack`}>
                    <div className="flex items-center mb-[1.5vh]">
                        <h3 className={`font-bold text-[3vh] `}>
                            {showResetPassword ? 
                                <p>
                                    <span className="text-[5vh]">R</span>eset Password
                                </p>
                            :
                            <p>
                                <span className="text-[5vh]">S</span>ign {signinOrSignup === "signin" ? "in" : "up"}
                            </p>
                            }
                            
                        </h3>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1">
                        <div className="w-[90%] p-2 md:w-2/3">
                            <form className="flex flex-col gap-[1vh] font-Barlow" onSubmit={e => e.preventDefault()}>
                                <div className="flex flex-col w-full gap-2 mb-[1vh]">
                                    {showResetPassword ? 
                                        <ResetPasswordForm setShowPasswordReset={setShowResetPassword} setToastMessage={setToastMessage} setShowToast={setShowToast}/>
                                    :
                                    <>
                                        <input 
                                            name="email"
                                            value={userCredentialsInput.email}
                                            onChange={handleUserCredentialsInputChange}
                                            placeholder="Email" 
                                            className="p-[.5vh] text-[1.75vh] border-t-4 border-b-8 border-l-8 border-r-4 border-offblack rounded-xl" 
                                            type="text" 
                                        />
                                        <input 
                                            name="password"
                                            value={userCredentialsInput.password}
                                            onChange={handleUserCredentialsInputChange}
                                            placeholder="Password" 
                                            className="p-[.5vh] text-[1.75vh] border-t-4 border-b-8 border-l-8 border-r-4 border-offblack rounded-xl" 
                                            type="password" 
                                        />
                                        {signinOrSignup === "signin" && 
                                            <p onClick={() => setShowResetPassword(true)} className="px-4 text-[1.5vh] font-Staat underline cursor-pointer hover:text-offblack/50">Forgot password?</p>
                                        }
                                        {signinOrSignup === "signup" && 
                                            <input 
                                                name="passwordRepeat"
                                                value={userCredentialsInput.passwordRepeat}
                                                onChange={handleUserCredentialsInputChange}
                                                placeholder="Repeat password" 
                                                className="p-[.5vh] text-[1.75vh] border-t-4 border-b-8 border-l-8 border-r-4 border-offblack rounded-xl" 
                                                type="password" 
                                            />
                                        }
                                    </>

                                    }
                                </div>
                               
                               {!showResetPassword && 
                                    <button 
                                        onClick={signinOrSignup === "signin" ? emailSignin : emailSignup }
                                        className="flex items-center justify-center p-[1vh] text-[2.25vh] text-white rounded-lg bg-offblack hover:bg-offblack/50"
                                    >
                                        <p className="flex-1">Sign {signinOrSignup === "signin" ? "in" : "up"}</p>
                                    </button>
                               }
                                                           
                            </form>
                            {!showResetPassword && 
                                <>
                                    <button onClick={googleLogin} className="flex items-center justify-center w-full p-[.5vh] mt-[1vh] text-[2.25vh] bg-white font-Barlow hover:bg-offblack/50 text-offblack rounded-xl">
                                        <div className="flex items-center justify-center h-full mr-2">
                                            <FcGoogle className="p-[.5vh] text-[4vh]" />
                                        </div>
                                        <p className="">Continue with Google</p>
                                    </button>
                                    <p className="mt-2 text-[1.5vh] text-center">{signinOrSignup === "signup" ? "Already" : "Don't"} have an account? <span onClick={toggleSigninSignup} className="underline cursor-pointer hover:text-offblack/50">Sign {signinOrSignup === "signin" ? "Up" : "In"}</span></p>
                                </>
                            }
                        </div>


                    </div>
                </main>

            </div>

            {showToast && <Toast message={toastMessage}/>}
        </Background>
    )
}

export default Auth

