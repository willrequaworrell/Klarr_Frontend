export function generateFirebaseErrorMessage(code: string): string {
    switch (code) {

        // Firebase auth error cases
        case 'auth/email-already-in-use':
            return 'This email is already in use. Please try a different email.';
        case 'auth/invalid-email':
            return 'The email address is not valid.';
        case 'auth/operation-not-allowed':
            return 'Email/password accounts are not enabled. Please contact support.';
        case 'auth/weak-password':
            return 'The password is too weak. Please choose a stronger password.';
        case 'auth/user-disabled':
            return 'This account has been disabled. Please contact support.';
        case 'auth/user-not-found':
            return 'No account found with this email. Please sign up.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/too-many-requests':
            return 'Too many unsuccessful login attempts. Please try again later.';
        case 'auth/invalid-credential':
            return 'Invalid email or password. Please check your credentials and try again.';

        // Extra error cases 
        case 'error/invalid-email':
            return 'Please enter a valid email address.'
        case 'error/invalid-password':
            return 'Password must contain: 8 characters, an uppercase letter, lowercase letter, number, and special character';
        case 'error/invalid-password-repeat':
            return 'Passwords don\'t match'
            
        // Success Cases
        case 'success/reset-email-sent':
            return "Password reset email sent"
        default:
            return 'An error occurred. Please try again.';
    }
}