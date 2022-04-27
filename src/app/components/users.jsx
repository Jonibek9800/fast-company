import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import renderPhrase from "./searchStatus";
import api from "../api/index";
import GroupList from "./groupList";
import UserTable from "./usersTable";
import _ from "lodash";
import { useParams } from "react-router-dom";
import UserPage from "./userPage";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 6;
    const [users, setUsers] = useState();
    const params = useParams();
    const { userId } = params;
    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };
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
    const handleSort = (item) => {
        setSortBy(item);
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };
        return userId
            ? <UserPage id={userId}/>
            : (
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
                                <UserTable
                                    users={userCrop}
                                    onDelete={handleDelete}
                                    onSort={handleSort}
                                    selectedSort={sortBy} />
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
    }
    return "loading...";
};

export default Users;
