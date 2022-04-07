import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../api/utils/paginate";
import PropTypes from "prop-types";

const Users = ({ onDelete, users }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const count = users.length;
    const pageSize = 4;
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const userCrop = paginate(users, currentPage, pageSize);
    return (
        <>
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
                                <User user={user} onDelete={onDelete} key={user._id} />
                            ))}
                        </tbody>
                    </table>
                )
                : (
                    ""
                )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange} />
        </>
    );
};

Users.propTypes = {
    onDelete: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

export default Users;
