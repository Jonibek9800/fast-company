import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import SearchStatus from "./searchStatus";
import api from "../api/index";
import GroupList from "./groupList";
import UserTable from "./usersTable";
import _ from "lodash";
import Spiner from "./Spiner";

function Users() {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 6;
    const [users, setUsers] = useState();
    const [value, setValue] = useState("");
    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId)
        );
    };
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleProfessionSelect = (item) => {
        setValue("");
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSearch = () => {
        if (value) {
            const filterUser = users && users.filter((user) => {
                return user.name.toLowerCase().includes(value.toLowerCase());
            });
            return filterUser;
        } else {
            return users;
        }
    };
    const search = handleSearch();
    if (users) {
        const filteredUsers = selectedProf
            ? search.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : search;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setValue("");
            setSelectedProf();
        };
        const handleChange = ({ target }) => {
            const { value } = target;
            clearFilter();
            setValue(value);
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
                    <h4>{<SearchStatus count={count} />}</h4>
                    <div className="m-2 w-100">
                        <input type="text" className="w-100 p-1" onChange={handleChange} />
                    </div>
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
                            onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>
        );
    }
    return <Spiner />;
}

export default Users;
