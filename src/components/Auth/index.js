import React from 'react'
import Logo from "../Logo"
import "./style.scss"
import OAuthButtonTheme from '../../themes/OAuthButtonTheme'
import { ThemeProvider, Button } from '@mui/material'
import githubIcon from "../../assets/images/github_icon.png"
import googleIcon from "../../assets/images/google_icon.png"

const Auth = ({ label, image, formComponent, showOAuth = false }) => {
    return (
        <div className="auth__page">
            <div className="grid-bg">
                <div></div>
            </div>
            <div className='auth__content'>
                <div className="auth__page__nav">
                    <Logo />
                </div>
                <div className="auth__page-left">
                    <div className="auth__page-left__body">
                        <img src={image} alt={label} />
                    </div>
                </div>
                <div className="auth__page-right">
                    <h1>{label}</h1>
                    {showOAuth && <OAuth />}
                    {formComponent}
                </div>
            </div>
        </div>
    )
}

const OAuth = () => {
    return (
        <div className="oauth">
            <p className="oauth__label"><span>Sign in with</span></p>
            <div className="oauth__buttons">
                <OAuthButton
                    logo={googleIcon}
                    label="Google"
                />
                <OAuthButton
                    logo={githubIcon}
                    label="Github"
                />
            </div>
            <p className="oauth__label"><span>or</span></p>
        </div>
    )
}

const OAuthButton = ({ logo, label }) => {
    return (
        <ThemeProvider theme={OAuthButtonTheme}>
            <div className="oauth__button">
                <Button
                    type="outlined"
                    size="large"
                    fullWidth={true}
                    startIcon={<img className="oauth__button_img" src={logo} alt={label} />}
                >
                    Sign in with {label}
                </Button >
            </div >
        </ThemeProvider>
    )
}

export default Auth
