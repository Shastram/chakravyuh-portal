import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/vectors/logo.svg"
import "./style.scss"
const Logo = () => {
    return (
        <Link to="/">
            <div className="logo">
                <img className="logo__image" src={logo} alt="Chakravyuh" />
                <h1 className="logo__text">hakravyuh</h1>
            </div>
        </Link>
    )
}

export default Logo
