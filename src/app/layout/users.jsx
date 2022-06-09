import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import Edit from "../components/page/editUserPage/edit";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return <>
        <UserProvider>
            {userId
                ? edit
                    ? <Edit />
                    : <UserPage id={userId} />
                : <UsersListPage />}
        </UserProvider>
    </>;
};

export default Users;
