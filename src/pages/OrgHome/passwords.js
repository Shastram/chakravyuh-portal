import React, { useState, useEffect } from 'react'
import "./style.scss"
import axios from "../../axios"
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import "../Auth/style.scss"
import CustomPasswordField from '../../components/CustomPasswordField'
import CustomTextField from '../../components/CustomTextField'
import CustomButton from "../../components/CustomButton"
import { useFormik } from 'formik'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider } from '@emotion/react';
import ButtonTheme from '../../themes/ButtonTheme';
import * as Yup from "yup"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #00000033',
    boxShadow: 24,
    p: 4,
};

const Passwords = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [editModalCredential, seteditModalCredential] = useState({})
    const [editModalopen, seteditModalOpen] = useState(false);
    const handleEditOpen = () => seteditModalOpen(true);
    const handleEditClose = () => seteditModalOpen(false);
    const [addModalopen, setaddModalOpen] = useState(false);
    const handleAddOpen = () => setaddModalOpen(true);
    const handleAddClose = () => setaddModalOpen(false);
    const onSubmit = (values) => {
        console.log(values)
    }
    const initialValues = {
        credential_name: "",
        credential_code: ""
    }
    const validationSchema = Yup.object({
        credential_name: Yup.string().required('Required'),
        credential_code: Yup.string().required('Required')
    })
    const formik = useFormik({ initialValues, onSubmit, validationSchema });
    const [credentials, setCredentials] = useState([
        {
            _id: 1,
            name: "GitHub",
            code: "wibiwrobwobobe",
        },
        {
            _id: 2,
            name: "GitHub",
            code: "wibiwrobwobobe",
        },
        {
            _id: 3,
            name: "GitHub",
            code: "wibiwrobwobobe",
        }
    ]);
    // useEffect(() => {
    //     const getProjectDetails = () => {
    //         const config = {
    //             headers: {
    //                 "x-auth-token": localStorage.getItem("authToken")
    //             }
    //         }
    //         axios.get(`/project/${id}`, config).then((response) => {
    //             if (response.data.status === "success") {
    //                 setProjectDetails(response.data.result)
    //             }
    //             else {
    //                 navigate("*")
    //             }
    //         }).catch((error) => console.log(error))
    //     }
    //     getProjectDetails()
    // }, [id, navigate])
    return (
        <div className="projectDashboard">
            <div className="projectMembers">
                <h2>Credentials</h2>
                <div className="projectMembersTable">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Credential Name</TableCell>
                                    <TableCell>Credential Code</TableCell>
                                    <TableCell align="center">View Code</TableCell>
                                    <TableCell align="center">Copy Code</TableCell>
                                    <TableCell align="center">Edit Code</TableCell>
                                    <TableCell align="center">Delete Code</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {credentials?.map((credential) => (
                                    <PasswordTableEntry credential={credential} openModal={(credential) => { seteditModalCredential(credential); handleEditOpen(); }} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Modal
                        open={addModalopen}
                        onClose={handleAddClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <form>
                                <div className="authForm">
                                    <CustomTextField
                                        label="Credentail Name"
                                        name="credential_name"
                                        value={formik.values.credential_name}
                                        handleChange={formik.handleChange}
                                        error={Boolean(formik.touched.credential_name && formik.errors.credential_name)}
                                        helperText={formik.errors.credential_name}
                                    />
                                    <CustomPasswordField
                                        label="Credential Code"
                                        name="credential_code"
                                        value={formik.values.credential_code}
                                        handleChange={formik.handleChange}
                                        error={Boolean(formik.touched.credential_code && formik.errors.credential_code)}
                                        helperText={formik.errors.credential_code}
                                    />
                                    <CustomButton
                                        label="Add Credential"
                                        onPress={formik.handleSubmit}
                                    />
                                </div>
                            </form>
                        </Box>
                    </Modal>
                    <Modal
                        open={editModalopen}
                        onClose={handleEditClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <form>
                                <div className="authForm">
                                    <CustomTextField
                                        label="Credentail Name"
                                        name="credential_name"
                                        value={editModalCredential?.name}
                                        handleChange={(event) => {
                                            seteditModalCredential((prev) => ({ ...prev, name: event.target.value }))
                                        }}
                                        error={editModalCredential?.name?.length <= 0}
                                        helperText={editModalCredential?.name?.length <= 0 ? "Credential Name is Required" : ""}
                                    />
                                    <CustomPasswordField
                                        label="Credential Code"
                                        name="credential_code"
                                        value={editModalCredential?.code}
                                        handleChange={(event) => {
                                            seteditModalCredential((prev) => ({ ...prev, code: event.target.value }))
                                        }}
                                        error={editModalCredential?.code?.length <= 0}
                                        helperText={editModalCredential?.code?.length <= 0 ? "Credential Code is Required" : ""}
                                    />
                                    <CustomButton
                                        label="Update Credential"
                                        onPress={formik.handleSubmit}
                                    />
                                </div>
                            </form>
                        </Box>
                    </Modal>
                </div>
                <ThemeProvider theme={ButtonTheme}>
                    <Fab
                        sx={{
                            position: "absolute",
                            right: 25,
                            bottom: 25,
                        }}
                        color="primary"
                        aria-label="add"
                        onClick={handleAddOpen}
                    >
                        <AddIcon />
                    </Fab>
                </ThemeProvider>
            </div>
        </div>
    )
}

const PasswordTableEntry = ({ credential, openModal }) => {
    const [showCred, setshowCred] = useState(false)
    return (
        <TableRow
            key={credential._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {credential.name}
            </TableCell>
            <TableCell>{showCred ? credential.code : "**********"}</TableCell>
            <TableCell align="center">
                <IconButton onClick={() => setshowCred(!showCred)}>{showCred ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton>
            </TableCell>
            <TableCell align="center">
                <CopyToClipboard text={credential.code}>
                    <IconButton><ContentCopyIcon /></IconButton>
                </CopyToClipboard>
            </TableCell>
            <TableCell align="center">
                <IconButton onClick={() => openModal(credential)}><EditIcon /></IconButton>
            </TableCell>
            <TableCell align="center">
                <IconButton><DeleteIcon /></IconButton>
            </TableCell>
        </TableRow>
    )
}

export default Passwords
