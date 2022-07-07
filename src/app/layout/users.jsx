import React from "react";
import { Redirect, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import Edit from "../components/page/editUserPage/edit";
import UsersListPage from "../components/page/usersListPage";
import UsersLoader from "../components/ui/hoc/usersLoader";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());
    return <>
        <UsersLoader>
            {userId
                ? (
                    edit
                ) ? (
                    userId === currentUserId
                ) ? (
                    <Edit />
                ) : (
                    <Redirect to={`users/${currentUserId}/edit`} />
                ) : (
                    <UserPage id={userId} />
                )
                : (
                    <UsersListPage />
                )}
        </UsersLoader>
    </>;
};

export default Users;
