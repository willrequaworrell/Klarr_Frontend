import {  } from "firebase/auth";
import { isValidEmail } from "../util/AuthValidation";
import { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { fireAuth } from "../util/firebase";
import React from "react";


interface ResetPasswordFormPropTypes {
    setShowPasswordReset: (showResetPassword: boolean) => void
    setToastMessage: React.Dispatch<React.SetStateAction<string>>
    setShowToast: (showToast: boolean) => void
}

const ResetPasswordForm = ({setShowPasswordReset, setToastMessage, setShowToast}: ResetPasswordFormPropTypes) => {
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(fireAuth);
    const [resetEmail, setResetEmail] = useState<string>("");
    
    const handlePasswordReset = async () => {
        if (!isValidEmail(resetEmail)) {
            setToastMessage("invalid email");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            return;
        }
        try {
            await sendPasswordResetEmail(resetEmail);
            setToastMessage("reset email sent");
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
                className="p-1 mb-2 border-t-4 border-b-8 border-l-8 border-r-4 border-offblack rounded-xl" 
                type="text" 
            />
            <button 
                onClick={handlePasswordReset} 
                className="flex items-center justify-center p-2 text-xl text-white rounded-lg bg-offblack hover:bg-offblack/50"
            >
                <p>Send Reset Email</p>
            </button>
            <p onClick={() => setShowPasswordReset(false)} className="text-sm text-center underline cursor-pointer hover:text-offblack/50">Back to Sign In</p>
        </>
    )
}

export default ResetPasswordForm