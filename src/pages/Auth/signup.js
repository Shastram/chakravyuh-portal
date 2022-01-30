import React, { useEffect, useState } from 'react'
import Auth from '../../components/Auth'
import signup from "../../assets/vectors/signup.svg"
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

const Signup = () => {
    useEffect(() => {
        document.title = "Sign Up"
    }, [])
    return (
        <>
            <Auth
                showOAuth={true}
                image={signup}
                label="Sign Up"
                formComponent={<SignupForm />}
            />
        </>
    )
}

const SignupForm = () => {
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
    const onSubmit = (values) => {
        // axios.post("/auth/register", values).then((response) => {
        //     if (response.data.status === "success") {
        //         dispatch(login(response.data.result.token, response.data.result.user))
        //     }
        //     else {
        //         setSnackbarMessage(response.data.errors[0].msg)
        //         handleSnackbarOpen()
        //     }
        // }).catch((error) => console.log(error.message))
        dispatch(login2());
    }
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
    const initialValues = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    const validationSchema = Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        username: Yup.string().required('Required'),
        email: Yup.string().email('Invalid Email').required('Required'),
        password: Yup.string().required('Required').min(8, "Min Length 8").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"),
        confirmPassword: Yup.string().required('Required').min(8, "Min Length 8").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Must Contain One Uppercase, One Lowercase, One Number and one special case Character").when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Both password need to be the same"
            )
        })
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });
    return (
        <form>
            <div className="authForm">
                <div className="authFields">
                    <div className="authField">
                        <CustomTextField
                            label="First Name"
                            name="firstName"
                            value={formik.values.firstName}
                            handleChange={formik.handleChange}
                            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                            helperText={formik.errors.firstName}
                        />
                    </div>
                    <div className="authField">
                        <CustomTextField
                            label="Last Name"
                            name="lastName"
                            value={formik.values.lastName}
                            handleChange={formik.handleChange}
                            error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                            helperText={formik.errors.lastName}
                        />
                    </div>
                </div>
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
                        <CustomPasswordField
                            label="Password"
                            name="password"
                            value={formik.values.password}
                            handleChange={formik.handleChange}
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            helperText={formik.errors.password}
                        />
                    </div>
                    <div className="authField">
                        <CustomPasswordField
                            label="Confirm Password"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            handleChange={formik.handleChange}
                            error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                            helperText={formik.errors.confirmPassword}
                        />
                    </div>
                </div>
                <CustomButton
                    label="Sign me up !"
                    onPress={formik.handleSubmit}
                />
                <div className="authForm__labels">
                    <p>Already have an account ? <Link to="/login"><span>Sign In</span></Link></p>
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

export default Signup
