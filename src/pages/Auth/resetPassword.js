import React, { useEffect } from 'react'
import Auth from '../../components/Auth'
import resetPassword from "../../assets/vectors/resetpassword.svg"
import CustomButton from "../../components/CustomButton"
import CustomPasswordField from '../../components/CustomPasswordField'
import "./style.scss"
import { useFormik } from 'formik'
import * as Yup from "yup"

const ResetPassword = () => {
    useEffect(() => {
        document.title = "Reset Password"
    }, [])
    return (
        <div>
            <Auth
                showOAuth={false}
                image={resetPassword}
                label="Reset Password"
                formComponent={<ResetPasswordForm />}
            />
        </div>
    )
}

const ResetPasswordForm = () => {
    const initialValues = {
        password: "",
        confirmPassword: ""
    }
    const onSubmit = (values) => {
        console.log(values);
    }
    const validationSchema = Yup.object({
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
    })
    return (
        <form>
            <div className="authForm">
                <p>Don’t worry we got you! Enter your email address and we will send you a mail to reset your password.</p>
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
                    label="Confirm"
                    onPress={formik.handleSubmit}
                />
            </div>
        </form>
    )
}

export default ResetPassword
