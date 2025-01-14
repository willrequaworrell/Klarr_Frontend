import {  } from "firebase/auth";
import { isValidEmail } from "../util/AuthValidation";
import { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { fireAuth } from "../util/firebase";
import { useToast } from "../context/ToastContext";


interface ResetPasswordFormPropTypes {
    setShowPasswordReset: (showResetPassword: boolean) => void
}

const ResetPasswordForm = ({setShowPasswordReset}: ResetPasswordFormPropTypes) => {
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(fireAuth);
    const [resetEmail, setResetEmail] = useState<string>("");
    const {setShowToast, setToastMessage } = useToast();
    
    const handlePasswordReset = async () => {
        if (!isValidEmail(resetEmail)) {
            setToastMessage("error/invalid-email");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            return;
        }
        try {
            await sendPasswordResetEmail(resetEmail);
            setToastMessage("success/reset-email-sent");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.log(error)
            setToastMessage("error");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    }

    return (
        <>
            <input 
                name="resetEmail" 
                value={resetEmail} 
                onChange={(e) => setResetEmail(e.target.value)} 
                placeholder="Email" 
                className="p-[.5vh] text-[1.75vh] mb-[1vh] border-t-4 border-b-8 border-l-8 border-r-4 border-offblack rounded-xl" 
                type="text" 
            />
            <button 
                onClick={handlePasswordReset} 
                className="flex items-center justify-center p-[1vh] text-[2.25vh] text-white rounded-lg bg-offblack hover:bg-offblack/50"
            >
                <p>Send Reset Email</p>
            </button>
            <p onClick={() => setShowPasswordReset(false)} className="text-[1.5vh] text-center underline cursor-pointer font-Staat hover:text-offblack/50">Back to Sign In</p>
        </>
    )
}

export default ResetPasswordForm
