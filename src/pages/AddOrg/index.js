import React, { useEffect, useState } from 'react'
import Auth from '../../components/Auth'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ThemeProvider } from '@emotion/react';
import ButtonTheme from '../../themes/ButtonTheme';
import addOrg from "../../assets/vectors/addOrg.svg"
import CustomButton from "../../components/CustomButton"
import CustomTextField from '../../components/CustomTextField'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from "../../axios"
import { useNavigate } from 'react-router';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const AddOrg = () => {
    useEffect(() => {
        document.title = "Add Organization"
    }, [])
    return (
        <div>
            <Auth
                showOAuth={false}
                image={addOrg}
                label="Add Organization"
                formComponent={<AddOrgTabs />}
            />
        </div>
    )
}

const AddOrgTabs = () => {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="add_projects">
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <ThemeProvider theme={ButtonTheme}>
                            <TabList indicatorColor="primary" sx={{
                                "& .MuiTabs-indicator": {
                                    backgroundColor: "primary.main"
                                }
                            }}
                                variant="fullWidth"
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                            >
                                <Tab label="Create Organization" value="1" />
                                <Tab label="Join Organization" value="2" />
                            </TabList>
                        </ThemeProvider>
                    </Box>
                    <TabPanel value="1">{<CreateOrg />}</TabPanel>
                    <TabPanel value="2">{<JoinOrg />}</TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

const CreateOrg = () => {
    const navigate = useNavigate()
    const initialValues = {
        'name': ""
    }
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
        setSnackbarMessage("");
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    const onSubmit = (values) => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = {
            title: values.name
        }
        axios.post("/project/create", data, config).then((response) => {
            if (response.data.status === "success") {
                navigate("/home")
            }
            else {
                setSnackbarMessage(response.data.errors[0].msg)
                handleSnackbarOpen()
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const validationSchema = Yup.object({
        name: Yup.string().required("Required")
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    return (
        <div className="authForm">
            <p>Let's start with a name for your Organization.</p>
            <div className="authField">
                <CustomTextField
                    label="Organization Name"
                    name="name"
                    value={formik.values.name}
                    handleChange={formik.handleChange}
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    helperText={formik.errors.name}
                />
            </div>
            <CustomButton
                label="Create Organization"
                onPress={formik.handleSubmit}
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                action={action}
            />
        </div>
    )
}

const JoinOrg = () => {
    const navigate = useNavigate()
    const initialValues = {
        'code': ""
    }
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
        setSnackbarMessage("");
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    const onSubmit = (values) => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
        const data = {
            accessCode: values.code
        }
        axios.post("/project/join", data, config).then((response) => {
            if (response.data.status === "success") {
                navigate("/home")
            }
            else {
                setSnackbarMessage(response.data.errors[0].msg)
                handleSnackbarOpen()
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    const validationSchema = Yup.object({
        code: Yup.string().required("Required")
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    return (
        <div className="authForm">
            <p>Enter the secret access code to join the Organization</p>
            <div className="authField">
                <CustomTextField
                    label="Access Code"
                    name="code"
                    value={formik.values.name}
                    handleChange={formik.handleChange}
                    error={Boolean(formik.touched.code && formik.errors.code)}
                    helperText={formik.errors.code}
                />
            </div>
            <CustomButton
                label="Join Organization"
                onPress={formik.handleSubmit}
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                action={action}
            />
        </div>
    )
}

export default AddOrg
