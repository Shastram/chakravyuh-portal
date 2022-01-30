import React, { useEffect } from 'react'
import Logo from '../../../components/Logo'
import CustomButton from '../../../components/CustomButton'
import pageNotFound from "../../../assets/vectors/404.svg"
import { useNavigate } from 'react-router'
import "./style.scss"
const NotFound = () => {
    const navigate = useNavigate()
    useEffect(() => {
        document.title = "404 Not Found"
    }, [])
    return (
        <div className='notFound'>
            <div className="grid-bg">
                <div></div>
            </div>
            <div className="notFound__content">
                <div className="notFound__nav">
                    <Logo />
                </div>
                <div className="notFound__body">
                    <div className="notFound__body-left">
                        <h1>Something's Missing</h1>
                        <p>This page doesn’t exist or has been removed. We suggest you go back to home.</p>
                        <CustomButton
                            onPress={() => navigate("/login", { replace: true })}
                            label="Back to Home"
                            variant="contained"
                        />
                    </div>
                    <div className="notFound__body-right">
                        <img className="notFound__image" src={pageNotFound} alt="Page Not Found" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
