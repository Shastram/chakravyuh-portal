import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PasswordIcon from '@mui/icons-material/Password';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import UserAvatar from "../../components/UserAvatar";
import Logo from "../../components/Logo";
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import "./style.scss";
import { Avatar } from '@mui/material';
import { TabContext } from '@mui/lab';
import { useNavigate, useParams } from 'react-router';
import OrgDashboard from './dashboard';
import OrgSettings from "./settings";
import Passwords from './passwords';
import { useDispatch } from 'react-redux';
import axios from "../../axios"
const drawerWidth = 240;

function ProjectHome(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    let { id } = useParams();
    const [projectDetails, setProjectDetails] = useState()
    const [value, setValue] = useState('0');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // useEffect(() => {
    //     const getProjectDetails = () => {
    //         const config = {
    //             headers: {
    //                 "x-auth-token": localStorage.getItem("authToken")
    //             }
    //         }
    //         axios.get(`/project/${id}`, config).then((response) => {
    //             if (response.data.status === "success") {
    //                 // dispatch(setProject(response.data.result))
    //                 document.title = response.data.result.project.name
    //                 setProjectDetails(response.data.result)
    //             }
    //         }).catch((error) => {
    //             console.log(error)
    //             navigate("/*")
    //         })
    //     }
    //     getProjectDetails()
    // }, [id, dispatch, navigate])
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const sidebarElements = [
        {
            text: "Dashboard",
            icon: <DashboardIcon />
        },
        {
            text: "Passwords",
            icon: <PasswordIcon />
        },
        {
            text: "Settings",
            icon: <SettingsIcon />
        },
    ]
    const drawer = (
        <div>
            <div className="logo__wrapper">
                <Logo className="logo" />
            </div>
            <Divider />
            <TabList
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                    "& .MuiTabs-indicator": {
                        backgroundColor: "#7f70f1"
                    },
                    "& .MuiTab-root.Mui-selected": {
                        color: "#7f70f1"
                    }
                }}
            >
                {sidebarElements.map(({ text, icon }, index) => (
                    <Tab
                        value={String(index)}
                        label={
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    alignSelf: "flex-start"
                                }}
                            >
                                <Avatar
                                    sx={{
                                        color: "#7f70f1",
                                        bgcolor: "#7f70f144"
                                    }}>
                                    {icon}
                                </Avatar>
                                <span
                                    style={{
                                        marginLeft: 10,
                                    }}
                                >
                                    {text}
                                </span>
                            </div>
                        }
                        {...a11yProps(index)}
                    />
                ))}
            </TabList>
            <Divider />
        </div>
    )
    const TabPanel = (props) => {
        const { children, value, index } = props;
        return (
            <Box role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} component="main" sx={{ flexGrow: 1, p: 1, bgcolor: "#fff", height: "100%" }}>
                <Toolbar />
                {children}
            </Box>
        )
    }
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    };
    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
            key: index
        };
    }
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', padding: 0, height: "100vh" }}>
            <TabContext value={value}>
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        bgcolor: "#7f70f133",
                        color: "#acacac",
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <h3 className="appbar__title">{projectDetails?.project?.name}</h3>
                        <Box sx={{ flexGrow: 1 }} />
                        <UserAvatar />
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="persistent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open={true}
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <div style={{ flexGrow: 1, height: "100vh" }}>
                    <TabPanel value={value} index={"0"}>
                        <OrgDashboard />
                    </TabPanel>
                    <TabPanel value={value} index={"1"}>
                        <Passwords />
                    </TabPanel>
                    <TabPanel value={value} index={"2"}>
                        <OrgSettings />
                    </TabPanel>
                </div>
            </TabContext>
        </Box>
    );
}

ProjectHome.propTypes = {
    window: PropTypes.func,
};

export default ProjectHome;
