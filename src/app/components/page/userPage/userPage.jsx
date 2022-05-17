import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api/index";
import Qualities from "../../ui/qualities";
import Spiner from "../../common/Spiner";
import EditUserPage from "../../editUserPage";
import { useHistory, useParams } from "react-router-dom";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then(data => setUser(data));
    }, []);
    const profession = (profession) => {
        return <span key={profession._id} >{profession.name}</span>;
    };
    const { edit, userId } = useParams();
    const history = useHistory();
    // ==========================================================================================
    const [qualities, setQualities] = useState([]);
    const [data, setData] = useState({ email: "", name: "", profession: "", sex: "male", qualities: [] });
    const [professions, setProfession] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { profession, qualities } = data;
        api.users.update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            }).then((data) => history.push(`/users/${data._id}`));
        };
        // =================================================
        const handleLink = (id) => {
            console.log(data);
            setData({ ...user });
            history.push(`/Users/${id}/edit`);
        };
        return <>
            {edit ? <EditUserPage
                id={userId}
                onChange={handleChange}
                onSubmit={handleSubmit}
                user={user}
                data={data}
                qualities={qualities}
                professions={professions} /> : user
                ? <div>
                    <h1>{user.name}</h1>
                    <h2>Профессия: {profession(user.profession)}</h2>
                    <div>{<Qualities qualities={user.qualities} />}</div>
                    <div>completedMeetings: {user.completedMeetings}</div>
                    <h2>Rate: {user.rate}</h2>
                    <button onClick={() => handleLink(userId)}>Изменить</button>
                </div>
                : <Spiner />}
        </>;
    };
    UserPage.propTypes = {
        id: PropTypes.string
    };

    export default UserPage;
