import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoSVG from "../../../assets/vectors/logo.svg"
import Lottie from 'react-lottie-player'
import serverJson from '../../../assets/lottie/server.json'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ListIcon from '@mui/icons-material/List';
import GitHubIcon from '@mui/icons-material/GitHub';
import CustomButton from "../../../components/CustomButton"
import Nav from "../../../components/Nav"
import "./style.scss"
const Landing = () => {
    useEffect(() => {
        document.title = "Chakravyuh"
    }, [])
    const intro = [
        {
            icon: <PersonOutlineIcon sx={{ fontSize: 25, color: "#142D4C" }} />,
            title: "Built for Students",
            description: "Developed in view of VIT students to help them manage J Components."
        },
        {
            icon: <DesignServicesIcon sx={{ fontSize: 25, color: "#142D4C" }} />,
            title: "Designed for all",
            description: "Designed to provide a solution for all major roadblocks in project development."
        },
        {
            icon: <ListIcon sx={{ fontSize: 25, color: "#142D4C" }} />,
            title: "Realtime collaboration",
            description: "Manage tasks and work flow of all members in realtime using Kanban boards."
        },
    ]
    return (
        <div className='landing'>
            <div className='grid-wrapper'>
                <div></div>
            </div>
            <div className='landing__content'>
                <div className='landing__nav'>
                    <Nav />
                </div>
                <div className='landing__hero'>
                    <div className='landing__hero-left'>
                        <h1>Runtime security for cloud infrastructure_</h1>
                        <p>A powerful yet lightweight security platform that provides insightful observability, proactive controls, threat detection and response for your Linux infrastructure in the cloud or datacenter.</p>
                    </div>
                    <div className='landing__hero-right'>
                        <Lottie
                            loop
                            animationData={serverJson}
                            play
                            style={{ width: "90%", height: "90%" }}
                        />
                    </div>
                </div>
                <div className="intro">
                    <div className="intro_sections">
                        {intro.map((intro_element, index) => (
                            <IntroSection
                                key={index}
                                icon={intro_element.icon}
                                title={intro_element.title}
                                description={intro_element.description}
                            />
                        ))}
                    </div>
                </div>
                <div className="features">
                    <div className="features__header">
                        <span>FEATURES</span>
                        <h1>The powerful features make it suitable for all projects</h1>
                    </div>
                    {/* {features.map((feature_element, index) => (
                        <FeaturesSection
                            key={index}
                            animation={feature_element.animation}
                            title={feature_element.title}
                            description={feature_element.description}
                        />
                    ))} */}
                </div>
                <div className="get_started">
                    <span>GET STARTED</span>
                    <h2>Get Started with JBoards today</h2>
                    <Link to="/signup">
                        <CustomButton
                            label="Get Started"
                            variant="contained"
                        />
                    </Link>
                </div>
                <hr />
                <div className="footer">
                    <div className='footer-left'>
                        <img src={logoSVG} alt="logo" className='footer-logo' />
                        <span>&copy; Chakravyuh. {new Date().getFullYear()}. All Rights Reserved.</span>
                        <p>Experience the Linux security monitoring, protection, and authorization platform that’s powerful yet easy to use.</p>
                    </div>
                    <div className='footer-right'>
                        <div className='footer-right-col'>
                            <h2>Organization</h2>
                            <div className='footer-right-col-links'>
                                <p className='footer-right-col-link'>About_Us</p>
                            </div>
                        </div>
                        <div className='footer-right-col'>
                            <h2>Contact_Us</h2>
                            <div className='footer-right-col-links'>
                                <div className='footer-right-col-button'>
                                    <GitHubIcon sx={{ fontSize: 25, color: "#fff" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

const IntroSection = ({ icon, title, description }) => {
    return (
        <div className="introSection">
            <div className="introSection__body">
                <div className="introSection__icon">
                    {icon}
                </div>
                <div className="introSection__details">
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default Landing;
