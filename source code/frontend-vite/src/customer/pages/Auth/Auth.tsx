import React, { useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import { Alert, Button, Snackbar } from '@mui/material';
import SignupForm from './SignupForm';
import { useAppSelector } from '../../../Redux Toolkit/Store';

const Auth = () => {
    const [isLoginPage, setIsLoginPage] = useState(true);
    const handleCloseSnackbar = () => setSnackbarOpen(false)
    const { auth } = useAppSelector(store => store)
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {

        if (auth.otpSent || auth.error) {
            setSnackbarOpen(true);
            console.log("store ", auth.error)
        }

    }, [auth.otpSent,auth.error])

    return (
        <div className='flex justify-center min-h-[90vh] items-center bg-ink px-4 py-10'>
            <div className='w-full max-w-md rounded-[24px] border border-line bg-coal shadow-card overflow-hidden'>
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
                <div className='px-8 pt-8 pb-3 text-center'>
                    <h1 className="font-display text-3xl luxury-gradient-text">Zentro</h1>
                    <p className="mt-1 text-[10px] tracking-[0.35em] uppercase text-muted">
                        {isLoginPage ? "Welcome back" : "Join the maison"}
                    </p>
                </div>
                <div className='px-8 pb-8 pt-4'>
                    {isLoginPage ? <LoginForm /> : <SignupForm />}

                    <div className='flex items-center gap-1 justify-center mt-5 text-sm text-cream/70'>
                        <p>{isLoginPage && "Don't"} have Account ?</p>
                        <Button onClick={() => setIsLoginPage(!isLoginPage)} size='small' sx={{ color: "#e8c96a" }}>{isLoginPage ? "create account" : "login"}</Button>
                    </div>
                </div>


            </div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackbarOpen} autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={auth.error?"error":"success"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {auth.error?auth.error : " otp sent to your email!"}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Auth
