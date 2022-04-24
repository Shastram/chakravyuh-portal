import React, { useEffect, useState } from 'react'
import Auth from '../../components/Auth'
import settingSvg from "../../assets/vectors/settings.svg"
import CustomButton from "../../components/CustomButton"
import { Link } from 'react-router-dom'
import CustomTextField from '../../components/CustomTextField'
import "../Auth/style.scss"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from "../../axios"
import { useSelector } from 'react-redux'
import { setUser } from "../../redux/actions/Auth"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const UserSettings = () => {
    useEffect(() => {
        document.title = "Settings"
    }, [])
    return (
        <>
            <Auth
                showOAuth={false}
                image={settingSvg}
                label="Settings"
                formComponent={<SettingsForm />}
            />
        </>
    )
}

const SettingsForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user)
    const initialValues = {
        name: user?.name ? user?.name : "",
        email: user?.email ? user?.email : "",
        username: user?.username ? user?.username : ""
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
            name: values.name,
            email: values.email,
            username: values.username === "" ? null : values.username
        }
        axios.post("/users/update", data, config).then((response) => {
            if (response.data.status === "success") {
                dispatch(setUser(response.data.result.user))
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
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid Email').required('Required'),
        username: Yup.string().required('Required'),
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });
    return (
        <div>
            <div className="authForm">
                <div className="authFields">
                    <div className="authField">
                        <CustomTextField
                            label="Name"
                            name="name"
                            value={formik.values.name}
                            handleChange={formik.handleChange}
                            error={Boolean(formik.touched.name && formik.errors.name)}
                            helperText={formik.errors.name}
                        />
                    </div>
                    <div className="authField">
                        <CustomTextField
                            label="Email"
                            name="email"
                            value={formik.values.email}
                            type="email"
                            handleChange={formik.handleChange}
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            helperText={formik.errors.email}
                        />
                    </div>
                </div>
                <div className="authFields">
                    <div className="authField">
                        <CustomTextField
                            label="Username"
                            name="username"
                            value={formik.values.username}
                            type="text"
                            handleChange={formik.handleChange}
                            error={Boolean(formik.touched.username && formik.errors.username)}
                            helperText={formik.errors.username}
                        />
                    </div>
                </div>
                <CustomButton
                    label="Update"
                    onPress={formik.handleSubmit}
                />
                <div className="authForm__labels">
                    <Link to="/settings/changepassword"><span>Change Password</span></Link>
                </div>
            </div>
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

export default UserSettings
