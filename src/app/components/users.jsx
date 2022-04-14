import React, { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import renderPhrase from "./searchStatus";
import api from "../api/index";
import GroupList from "./groupList";

const Users = ({ onDelete, users }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 2;
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf
        ? users.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
        : users;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions &&
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect} />
                    <button className="btn btn-secondary mt-2" onClick={clearFilter}> Очистить</button>
                </div>}
            <div className="d-flex flex-column">
                <h4>{renderPhrase(count)}</h4>
                {count > 0
                    ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Имя</th>
                                    <th scope="col">Качество</th>
                                    <th scope="col">Профессия</th>
                                    <th scope="col">Встретился,раз</th>
                                    <th scope="col">Оценка</th>
                                    <th scope="col">Избранное</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {userCrop.map((user) => (
                                    <User
                                        user={user}
                                        onDelete={onDelete}
                                        key={user._id}
                                    />
                                ))}
                            </tbody>
                        </table>
                    )
                    : (
                        ""
                    )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    onDelete: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

export default Users;
