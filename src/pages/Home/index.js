import React, { useEffect } from 'react'
import Nav from "../../components/Nav"
import "./style.scss"
import OrgCard from "../../components/OrgCard"
import { Link } from "react-router-dom"
import AddIcon from '@mui/icons-material/Add';

const organizations = [
    {
        _id: "1",
        name: "IWP Project"
    },
    {
        _id: "2",
        name: "IWP Project"
    },
    {
        _id: "3",
        name: "IWP Project"
    }
]

const Home = () => {
    useEffect(() => {
        document.title = "Home";
    }, [])
    return (
        <div className="home">
            <Nav />
            <div className="home__body">
                <div className="orgs">
                    <div className="orgs__head">
                        <h1>Organizations</h1>
                    </div>
                    <div className="orgs__content">
                        <Link to={`/org/addOrg`}>
                            <AddOrganization />
                        </Link>
                        {organizations?.map((org) => (
                            <Link key={org._id} to={`/org/${org._id}`}>
                                <OrgCard
                                    organization={org}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const AddOrganization = () => (
    <div className="orgCard">
        <div className="addProject">
            <AddIcon fontSize="large" />
            <span>Add Organization</span>
        </div>
    </div>
)

export default Home;