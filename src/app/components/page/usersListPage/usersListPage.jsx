import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import SearchStatus from "../../ui/searchStatus";
import GroupList from "../../common/groupList";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import Spiner from "../../common/Spiner";
import SearchEngine from "../../ui/searchEngine";
import { useSelector } from "react-redux";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professions";
import { getCurrentUserId, getUsersList } from "../../../store/users";

function UsersListPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const professions = useSelector(getProfessions());
    const professionLoading = useSelector(getProfessionsLoadingStatus());
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [inputItem, setInputItem] = useState("");
    const pageSize = 6;
    const currentUserId = useSelector(getCurrentUserId());
    const users = useSelector(getUsersList());
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleProfessionSelect = (item) => {
        setInputItem("");
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    if (users) {
        const filterUsers = (data) => {
            const filteredUsers = data
                ? data.filter((user) => {
                    return user.name.toLowerCase().includes(inputItem.toLowerCase());
                }) : selectedProf
                    ? data.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
                    : data;
            return filteredUsers.filter((u) => u._id !== currentUserId);
        };
        const filteredUsers = filterUsers(users);
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setInputItem("");
            setSelectedProf();
        };
        const handleChange = ({ target }) => {
            const { inputItem } = target;
            clearFilter();
            setInputItem(inputItem);
        };
        return (
            <div className="d-flex">
                {professions && !professionLoading &&
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect} />
                        <button className="btn btn-secondary mt-2" onClick={clearFilter}> Очистить</button>
                    </div>}
                <div className="d-flex flex-column">
                    <h4>{<SearchStatus count={count} />}</h4>
                    <SearchEngine inputItem={inputItem} onChange={handleChange} />
                    {count > 0
                        ? (
                            <UserTable
                                users={userCrop}
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

export default UsersListPage;
