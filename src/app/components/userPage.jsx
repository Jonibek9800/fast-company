import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api/index";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then(data => setUser(data));
    }, []);
    const profession = (profession) => {
        return <span key={profession._id} >{profession.name}</span>;
    };
    const history = useHistory();
    const handleUsers = () => {
        history.replace("/Users");
    };
    return <>
        {user
            ? <div>
                <h2>{user.name}</h2>
                <h4>Профессия: {profession(user.profession)}</h4>
                <div>{<QualitiesList qualities={user.qualities}/>}</div>
                <div>completedMeetings: {user.completedMeetings}</div>
                <h2>Rate: {user.rate}</h2>
                <button onClick={() => handleUsers()}>Все Пользователи</button>
            </div>
            : <h1>loading...</h1>}
    </>;
};
UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
