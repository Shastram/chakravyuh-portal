import React, { useState, useEffect } from 'react'
import "./style.scss"
import axios from "../../axios"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CustomTextField from '../../components/CustomTextField'
import CustomButton from "../../components/CustomButton"

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

const OrgDashboard = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const [modalMember, setmodalMember] = useState({});
    const [orgMembers, setorgMembers] = useState([
        {
            _id: 1,
            name: "Aryak Roy",
            email: "aryakroy63@gmail.com",
            role: "owner",
        },
        {
            _id: 2,
            name: "Aryak Roy",
            email: "aryakroy63@gmail.com",
            role: "owner",
        }
        , {
            _id: 3,
            name: "Aryak Roy",
            email: "aryakroy63@gmail.com",
            role: "owner",
        }
    ])
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
            <div className="projectAccessCode">
                <CopyToClipboard text={"Hazza P and the Smart Man's Rock"}>
                    <IconButton>
                        <ContentCopyIcon />
                    </IconButton>
                </CopyToClipboard>
                <span>Copy Organization Access Code</span>
            </div>
            <div className="projectMembers">
                <h2>Organization Members</h2>
                <div className="projectMembersTable">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell align="center">Role</TableCell>
                                    <TableCell align="center">Edit Role</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orgMembers?.map((member) => (
                                    <MemberTableEntry member={member} openModal={(member) => { setmodalMember(member); handleModalOpen(); }} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form>
                        <h2>Member : {modalMember?.name}</h2>
                        <div className="authForm">
                            <CustomTextField
                                label="Member Role"
                                name="member_role"
                                value={modalMember?.role}
                                handleChange={(event) => {
                                    setmodalMember((prev) => ({ ...prev, role: event.target.value }))
                                }}
                                error={modalMember?.role?.length <= 0}
                                helperText={modalMember?.role?.length <= 0 ? "Member Role is Required" : ""}
                            />
                            <CustomButton
                                label="Update Role"
                                onPress={() => { console.log(modalMember) }}
                            />
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

const MemberTableEntry = ({ member, openModal }) => {
    return (
        <TableRow
            key={member._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {member.name}
            </TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell align="center">{member.role}</TableCell>
            <TableCell align="center"><IconButton onClick={() => openModal(member)}><EditIcon /></IconButton></TableCell>
        </TableRow>
    )
}

export default OrgDashboard
