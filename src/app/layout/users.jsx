import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Users from "../components/usersList";
import UserPage from "../components/userPage";

const UsersList = () => {
    const params = useParams();
    const { userId } = params;
    return <>
        {userId ? <UserPage id={userId}/> : <Users />}
    </>;
};
UsersList.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    users: PropTypes.array
};

export default UsersList;
