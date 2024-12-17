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
            setToastMessage("invalid email");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            return;
        } else if (!isValidPassword(userCredentialsInput.password)) {
            setToastMessage("invalid password");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 6000);
            return;
        } else if (userCredentialsInput.password !== userCredentialsInput.passwordRepeat) {
            setToastMessage("password repeat invalid");
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
                    setUserCredentialsInput(pv => ({...pv, password: ""}))
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
            
            <div className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-y-8">
                <div className="flex items-center justify-center scale-125 md:scale-150 gap-x-8">
                    <div className="relative flex items-center bg-white border-b-4 border-l-4 rounded-full border-offblack size-10">
                        <div className="absolute flex items-center border-t-4 border-r-4 border-white rounded-full bg-offblack left-5 size-10">
                            <div className="w-full h-2 bg-white "></div>
                        </div>
                        
                        <div className="w-full h-4 bg-offblack"></div>
                        
                    </div>
                    <p className="text-6xl tracking-wider text-offblack font-Staat ">
                        KLARR
                    </p>
                </div>
                <div className={` flex flex-col text-offblack w-4/5 lg:w-1/3 h-1/2 font-Staat size-full p-2 rounded-xl transition-colors border-l-8 border-b-8 border-t-4 border-r-4 border-offblack`}>
                    <div className="flex items-center mb-3">
                        <h3 className={`font-bold text-2xl `}>
                            <span className="text-4xl">S</span>ign {signinOrSignup === "signin" ? "in" : "up"}
                        </h3>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1 gap-4">
                        <div className="w-[90%] p-2 md:w-2/3">
                            <form className="flex flex-col gap-2" onSubmit={e => e.preventDefault()}>
                                <input 
                                    name="email"
                                    value={userCredentialsInput.email}
                                    onChange={handleUserCredentialsInputChange}
                                    placeholder="Email" 
                                    className="p-1 border-t-4 border-b-8 border-l-8 border-r-4 border-offblack rounded-xl" 
                                    type="text" 
                                />
                                <input 
                                    name="password"
                                    value={userCredentialsInput.password}
                                    onChange={handleUserCredentialsInputChange}
                                    placeholder="Password" 
                                    className="p-1 border-t-4 border-b-8 border-l-8 border-r-4 border-offblack rounded-xl" 
                                    type="password" 
                                />
                                {signinOrSignup === "signup" && 
                                    <input 
                                        name="passwordRepeat"
                                        value={userCredentialsInput.passwordRepeat}
                                        onChange={handleUserCredentialsInputChange}
                                        placeholder="Repeat password" 
                                        className="p-1 border-t-4 border-b-8 border-l-8 border-r-4 border-offblack rounded-xl" 
                                        type="password" 
                                    />
                                }
                               
                                <button 
                                    onClick={signinOrSignup === "signin" ? emailSignin : emailSignup }
                                    className="flex items-center p-1 text-xl text-white rounded-lg bg-offblack hover:bg-black/50"
                                >
                                    <p className="flex-1">Sign {signinOrSignup === "signin" ? "in" : "up"}</p>
                                </button>
                            </form>
                            <button onClick={googleLogin} className="flex items-center justify-center w-full mt-2 text-xl bg-white hover:bg-offblack/50 text-offblack rounded-xl">
                                <div className="flex items-center justify-center h-full mr-2 border-offblack">
                                    <FcGoogle className="p-1 text-4xl" />
                                </div>
                                <p className="">Continue with Google</p>
                            </button>
                            <p className="mt-2 text-sm text-center">{signinOrSignup === "signup" ? "Already" : "Don't"} have an account? <span onClick={toggleSigninSignup} className="underline cursor-pointer hover:text-offblack/50">Sign {signinOrSignup === "signin" ? "Up" : "In"}</span></p>
                        </div>


                    </div>
                </div>
            </div>

            {showToast && <Toast message={toastMessage} type="error"/>}
        </Background>
    )
}

export default Auth


{/* <div className="flex justify-center w-full gap-2 p-2">
    <div className="size-4 bg-red animate-spin"></div>
    <div className="size-4 bg-blue animate-spin"></div>
    <div className="size-4 bg-yellow animate-spin"></div>
</div> */}

{/* <button onClick={googleLogin} className="flex items-center w-full text-xl border-t-4 border-b-8 border-l-8 border-r-4 border-offblack rounded-xl">
    <div className="flex items-center justify-center h-full text-white border-r-4 bg-offblack border-offblack">
        <FcGoogle className="p-1 text-4xl" />
    </div>
    <p className="flex-1">Sign {signinOrSignup === "signin" ? "in" : "up"} with Google</p>
</button> */}