import React from "react";
import { useParams } from "react-router-dom";
// import PropTypes from "prop-types";
import UsersList from "../components/usersList";
import UserPage from "../components/userPage";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>
        {userId ? <UserPage id={userId}/> : <UsersList />}
    </>;
};

export default Users;
