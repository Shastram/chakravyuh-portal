import React, { useEffect, useState } from 'react'
import Auth from '../../components/Auth'
import loginSvg from "../../assets/vectors/login.svg"
import CustomButton from "../../components/CustomButton"
import { Link } from 'react-router-dom'
import CustomTextField from '../../components/CustomTextField'
import "./style.scss"
import CustomPasswordField from '../../components/CustomPasswordField'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useDispatch } from 'react-redux'
import { login2 } from "../../redux/actions/Auth";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Login = () => {
    useEffect(() => {
        document.title = "Login"
    }, [])
    return (
        <div>
            <Auth
                showOAuth={true}
                image={loginSvg}
                label="Login"
                formComponent={<LoginForm />}
            />
        </div>
    )
}

const LoginForm = () => {
    const dispatch = useDispatch();
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
        // axios.post("/login", values).then((response) => {
        //     if (response.data.status === true) {
        //         dispatch(login(response.data.result.token, response.data.result.user))
        //     }
        //     else {
        //         setSnackbarMessage(response.data.errors[0].msg)
        //         handleSnackbarOpen()
        //     }
        // }).catch((error) => console.log(error.message))
        dispatch(login2())
    }
    const initialValues = {
        username: '',
        password: ''
    }
    const validationSchema = Yup.object({
        username: Yup.string().required('Required'),
        password: Yup.string().required('Required').min(8, "Min Length 8").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Must Contain One Uppercase, One Lowercase, One Number and one special case Character")
    })
    const formik = useFormik({ initialValues, onSubmit, validationSchema });
    return (
        <form>
            <div className="authForm">
                <div className="authFields">
                    <div className="authField">
                        <CustomTextField
                            label="Username"
                            name="username"
                            value={formik.values.username}
                            handleChange={formik.handleChange}
                            error={Boolean(formik.touched.username && formik.errors.username)}
                            helperText={formik.errors.username}
                        />
                    </div>
                    <div className="authField">
                        <CustomPasswordField
                            label="Password"
                            name="password"
                            value={formik.values.password}
                            handleChange={formik.handleChange}
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            helperText={formik.errors.password}
                        />
                    </div>
                </div>
                <CustomButton
                    label="Let's Catch up!"
                    onPress={formik.handleSubmit}
                />
                <div className="authForm__labels">
                    <Link to="/forgot-password"><span>Forgot Password ?</span></Link>
                    <p>Don’t have an account? <Link to="/signup"><span>Sign up</span></Link></p>
                </div>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                    action={action}
                />
            </div>
        </form>
    )
}

export default Login
