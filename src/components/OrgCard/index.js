import { Avatar } from '@mui/material'
import React from 'react'
import "./style.scss"

const OrgCard = ({ organization }) => {
    return (
        <div className="orgCard">
            <div className='orgCard__header'></div>
            <div className="orgCard__details">
                <Avatar sx={{ width: 40, height: 40, bgcolor: "#7F70F1", border: 0 }}>{organization.name[0].toUpperCase()}</Avatar>
                <h1>{organization.name}</h1>
            </div>
        </div>
    );
}

export default OrgCard
