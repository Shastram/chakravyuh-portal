import { ThemeProvider } from '@mui/material'
import React from 'react'
import "./style.scss"
import ButtonTheme from "../../themes/ButtonTheme"
import LoadingButton from '@mui/lab/LoadingButton';
const CustomButton = ({ onPress, label, variant = "outlined", loading = false }) => {
    return (
        <ThemeProvider theme={ButtonTheme}>
            <div className="custom_button" onClick={onPress}>
                <LoadingButton
                    fullWidth={true}
                    size="large"
                    variant={variant}
                    loading={loading}
                    sx={{
                        "& .MuiSvgIcon-root:hover": {
                            color: "primary.main"
                        },
                        color: variant === "outlined" ? "primary.main" : "#fff",
                        "& .MuiLoadingButton-loadingIndicator": {
                            color: "#fff"
                        },
                    }}
                >
                    {label}
                </LoadingButton>
            </div>
        </ThemeProvider>
    )
}

export default CustomButton
